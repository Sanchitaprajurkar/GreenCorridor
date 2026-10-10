import type {
  PortBerth,
  ArrivalSchedule,
  BerthRecommendation,
  BerthReservation,
} from '../types/port';

/**
 * Deterministic, explainable recommendation engine for berth allocation.
 *
 * Evaluation weights:
 * - 40% Schedule Fit: Berth availability alignment with vessel ETA and service duration.
 * - 30% Vessel Compatibility: LOA and draft safety headroom.
 * - 20% Estimated Waiting Time: Minimization of anchorage idle delay.
 * - 10% Operational Readiness: Green corridor documentation and fuel verification status.
 *
 * Important: Hard constraints (dimensions, maintenance, overlapping bookings) strictly
 * govern eligibility. A high readiness score cannot override safety constraints.
 */
export function generateBerthRecommendations(
  vessel: ArrivalSchedule,
  berths: PortBerth[],
  existingReservations: BerthReservation[]
): BerthRecommendation[] {
  const arrivalTime = new Date(vessel.eta).getTime();
  const departureTime = new Date(vessel.etd).getTime();

  return berths.map((berth) => {
    const reasons: string[] = [];
    const warnings: string[] = [];

    // HARD ELIGIBILITY CHECKS
    if (berth.status === 'Maintenance') {
      return {
        berthId: berth.id,
        berthName: berth.name,
        berthType: berth.type,
        score: 0,
        isEligible: false,
        ineligibilityReason: 'Berth currently closed for scheduled maintenance & dredging.',
        waitingTimeHours: 999,
        expectedServiceWindow: { start: vessel.eta, end: vessel.etd },
        breakdown: { scheduleFit: 0, vesselCompatibility: 0, waitingTimeScore: 0, operationalReadiness: 0 },
        compatibilitySummary: 'Maintenance downtime',
        reasons: [],
        warnings: ['Berth offline'],
      };
    }

    // Dimension checks
    const loaDiff = berth.maxLoaMeters - vessel.loaMeters;
    if (loaDiff < 0) {
      return {
        berthId: berth.id,
        berthName: berth.name,
        berthType: berth.type,
        score: 0,
        isEligible: false,
        ineligibilityReason: `Vessel LOA (${vessel.loaMeters}m) exceeds berth length limit (${berth.maxLoaMeters}m).`,
        waitingTimeHours: 999,
        expectedServiceWindow: { start: vessel.eta, end: vessel.etd },
        breakdown: { scheduleFit: 0, vesselCompatibility: 0, waitingTimeScore: 0, operationalReadiness: 0 },
        compatibilitySummary: `LOA deficit: ${Math.abs(loaDiff)}m too long`,
        reasons: [],
        warnings: ['Physical length violation'],
      };
    }

    const draftDiff = berth.maxDraftMeters - vessel.draftMeters;
    if (draftDiff < 0) {
      return {
        berthId: berth.id,
        berthName: berth.name,
        berthType: berth.type,
        score: 0,
        isEligible: false,
        ineligibilityReason: `Vessel draft (${vessel.draftMeters}m) exceeds channel depth (${berth.maxDraftMeters}m). Risk of grounding.`,
        waitingTimeHours: 999,
        expectedServiceWindow: { start: vessel.eta, end: vessel.etd },
        breakdown: { scheduleFit: 0, vesselCompatibility: 0, waitingTimeScore: 0, operationalReadiness: 0 },
        compatibilitySummary: `Draft deficit: ${Math.abs(draftDiff).toFixed(1)}m below safe depth`,
        reasons: [],
        warnings: ['Under-keel clearance violation'],
      };
    }

    // Overlapping reservations check for this berth
    const berthBookings = existingReservations.filter(
      (r) => r.berthId === berth.id && r.status !== 'Completed' && r.voyageId !== vessel.voyageId
    );

    let hasOverlap = false;
    let conflictReservation: BerthReservation | null = null;

    for (const b of berthBookings) {
      const bStart = new Date(b.startTime).getTime();
      const bEnd = new Date(b.endTime).getTime();
      // Overlap condition: startA < endB && endA > startB
      if (arrivalTime < bEnd && departureTime > bStart) {
        hasOverlap = true;
        conflictReservation = b;
        break;
      }
    }

    if (hasOverlap && conflictReservation) {
      return {
        berthId: berth.id,
        berthName: berth.name,
        berthType: berth.type,
        score: 0,
        isEligible: false,
        ineligibilityReason: `Schedule conflict: Reserved by "${conflictReservation.vesselName}" until ${conflictReservation.endTime.replace('T', ' ')}.`,
        waitingTimeHours: Math.max(0, (new Date(conflictReservation.endTime).getTime() - arrivalTime) / (1000 * 60 * 60)),
        expectedServiceWindow: { start: vessel.eta, end: vessel.etd },
        breakdown: { scheduleFit: 0, vesselCompatibility: 0, waitingTimeScore: 0, operationalReadiness: 0 },
        compatibilitySummary: `Overlaps with ${conflictReservation.vesselName}`,
        reasons: [],
        warnings: [`Occupied until ${conflictReservation.endTime.replace('T', ' ')}`],
      };
    }

    // ELIGIBLE BERTH: CALCULATE EXPLAINABLE COMPONENT SCORES

    // 1. Schedule Fit (40%)
    let scheduleFit = 95;
    if (berth.status === 'Available') {
      scheduleFit = 100;
      reasons.push('Berth is immediately available with zero quay congestion.');
    } else if (berth.status === 'Reserved' || berth.status === 'Occupied') {
      scheduleFit = 85;
      reasons.push('Current vessel vacates berth prior to scheduled arrival ETA.');
    }

    // 2. Vessel Compatibility (30%)
    let vesselCompatibility = 70;
    if (loaDiff >= 20 && loaDiff <= 80) {
      // Optimal fit (not oversized waste)
      vesselCompatibility += 20;
      reasons.push(`Optimal berth length utilization (${loaDiff}m safety margin).`);
    } else if (loaDiff > 80) {
      vesselCompatibility += 10;
      warnings.push(`Berth length exceeds requirements by ${loaDiff}m (large quay segment).`);
    }

    if (draftDiff >= 1.5) {
      vesselCompatibility += 10;
      reasons.push(`Generous under-keel safety depth (${draftDiff.toFixed(1)}m safe clearance).`);
    } else if (draftDiff < 1.0) {
      warnings.push(`Tight draft margin (${draftDiff.toFixed(1)}m under-keel clearance).`);
    }

    if (berth.hasShorePower) {
      reasons.push('Equipped with Cold Ironing (High-Voltage Shore Power) connection.');
    }

    if (berth.hasAlternativeBunker && vessel.fuelType?.includes('Methanol')) {
      reasons.push('Berth supports dual-pipe green methanol direct bunkering.');
    }

    // 3. Waiting Time Score (20%)
    let waitingTimeHours = 0;
    if (berth.status === 'Occupied' && berth.estimatedAvailableTime) {
      const availTime = new Date(berth.estimatedAvailableTime).getTime();
      if (availTime > arrivalTime) {
        waitingTimeHours = Math.round((availTime - arrivalTime) / (1000 * 60 * 60));
      }
    }
    const waitingTimeScore = Math.max(0, 100 - waitingTimeHours * 20);
    if (waitingTimeHours === 0) {
      reasons.push('Estimated anchorage waiting time: 0.0 hours (Just-In-Time docking).');
    } else {
      warnings.push(`Expected anchorage wait of ~${waitingTimeHours} hrs before quay clearance.`);
    }

    // 4. Operational Readiness (10%)
    let operationalReadiness = 60;
    if (vessel.fuelVerificationStatus === 'Verified') {
      operationalReadiness = 100;
      reasons.push('Corridor verification: FuelTrust BDN & emissions profile fully verified.');
    } else if (vessel.fuelVerificationStatus === 'Pending Review' || vessel.fuelVerificationStatus === 'Under Review') {
      operationalReadiness = 75;
      warnings.push('FuelTrust verification is currently under review by corridor desk.');
    } else if (vessel.fuelVerificationStatus === 'Flagged') {
      operationalReadiness = 40;
      warnings.push('Fuel record has active data flag; customs berth clearance requires verification.');
    } else {
      operationalReadiness = 60;
    }

    // Composite Weighted Score
    const totalScore = Math.round(
      scheduleFit * 0.4 +
      vesselCompatibility * 0.3 +
      waitingTimeScore * 0.2 +
      operationalReadiness * 0.1
    );

    return {
      berthId: berth.id,
      berthName: berth.name,
      berthType: berth.type,
      score: Math.min(100, Math.max(1, totalScore)),
      isEligible: true,
      waitingTimeHours,
      expectedServiceWindow: {
        start: vessel.eta,
        end: vessel.etd,
      },
      breakdown: {
        scheduleFit,
        vesselCompatibility,
        waitingTimeScore,
        operationalReadiness,
      },
      compatibilitySummary: `LOA margin +${loaDiff}m | Draft clearance +${draftDiff.toFixed(1)}m`,
      reasons,
      warnings,
    };
  }).sort((a, b) => {
    // Eligible berths first, then sorted by highest score
    if (a.isEligible && !b.isEligible) return -1;
    if (!a.isEligible && b.isEligible) return 1;
    return b.score - a.score;
  });
}
