import type { VoyageFormData, RouteAlternative, FuelOption } from '../types/voyage';
import { DEMO_FUELS } from '../data/voyageMockData';

/**
 * Returns deterministic baseline nautical distance between ports in the corridor.
 */
export function getBaselineDistanceNm(originId: string, destId: string): number {
  const pairKey = [originId, destId].sort().join('__');

  // Mumbai (JNPA) <-> Singapore ports (~2450 nm)
  if (pairKey.includes('jnpa') && pairKey.includes('singapore')) return 2450;
  if (pairKey.includes('jnpa') && pairKey.includes('jurong')) return 2445;
  if (pairKey.includes('jnpa') && pairKey.includes('tuas')) return 2440;

  // Chennai <-> Singapore ports (~1580 nm)
  if (pairKey.includes('chennai') && pairKey.includes('singapore')) return 1580;
  if (pairKey.includes('chennai') && pairKey.includes('jurong')) return 1575;
  if (pairKey.includes('chennai') && pairKey.includes('tuas')) return 1570;

  // Cochin <-> Singapore ports (~1510 nm)
  if (pairKey.includes('cochin') && pairKey.includes('singapore')) return 1510;
  if (pairKey.includes('cochin') && pairKey.includes('jurong')) return 1505;
  if (pairKey.includes('cochin') && pairKey.includes('tuas')) return 1500;

  // Mundra <-> Singapore ports (~2680 nm)
  if (pairKey.includes('mundra') && pairKey.includes('singapore')) return 2680;
  if (pairKey.includes('mundra') && pairKey.includes('jurong')) return 2675;
  if (pairKey.includes('mundra') && pairKey.includes('tuas')) return 2670;

  // Domestic or inter-port pairings fallback
  return 1950;
}

/**
 * Calculates baseline fuel consumption rate in tonnes per nautical mile
 * based on vessel type, speed, and loaded cargo weight.
 */
function getFuelConsumptionPerNm(
  vesselType: string,
  speedKnots: number,
  cargoWeightTonnes: number
): number {
  let baseRatePerNm = 0.085; // default tonnes/nm

  switch (vesselType) {
    case 'Container Ship':
      baseRatePerNm = 0.105;
      break;
    case 'Bulk Carrier':
      baseRatePerNm = 0.075;
      break;
    case 'Tanker':
      baseRatePerNm = 0.095;
      break;
    case 'General Cargo':
      baseRatePerNm = 0.065;
      break;
  }

  // Displacement factor: heavier cargo slightly increases hull drag
  const weightFactor = 1 + Math.min(0.2, (cargoWeightTonnes || 20000) / 100000);

  // Cubic propeller power law: fuel consumption scales non-linearly with speed
  const speedRatio = Math.max(0.6, speedKnots / 16.0);
  const speedFactor = Math.pow(speedRatio, 2.2);

  return baseRatePerNm * weightFactor * speedFactor;
}

/**
 * Resolves fuel option to get emission factor and pricing.
 */
export function getFuelOption(fuelName: string): FuelOption {
  const match = DEMO_FUELS.find((f) => f.name.toLowerCase() === fuelName.toLowerCase());
  return match || DEMO_FUELS[0];
}

/**
 * Generates 3 deterministic alternative routes from form input parameters.
 */
export function calculateRouteAlternatives(formData: VoyageFormData): RouteAlternative[] {
  const baseDistance = getBaselineDistanceNm(formData.originPortId, formData.destinationPortId);
  const baseSpeed = Number(formData.averageSpeedKnots) || 16.0;
  const cargoWeight = Number(formData.cargoWeightTonnes) || 25000;
  const fuel = getFuelOption(formData.fuelType);
  const fuelPrice = formData.fuelPricePerTonne ?? fuel.defaultPricePerTonne;

  // 1. Route A — Balanced (Baseline)
  const distA = baseDistance;
  const speedA = baseSpeed;
  const durationA = Math.round((distA / speedA) * 10) / 10;
  const rateA = getFuelConsumptionPerNm(formData.vesselType, speedA, cargoWeight);
  // Allow manual override if user provided fuel consumption estimate
  const fuelA = formData.estimatedFuelConsumption
    ? Number(formData.estimatedFuelConsumption)
    : Math.round(distA * rateA * 10) / 10;
  const co2A = Math.round(fuelA * fuel.emissionFactor * 10) / 10;
  const costA = Math.round(fuelA * fuelPrice);

  // 2. Route B — Lower Estimated Emissions (Eco-Speed & Ocean Currents)
  // Distance is slightly longer (+1.5%) to follow favorable deep-water currents and avoid head-winds
  const distB = Math.round(baseDistance * 1.015);
  // Speed reduced by 12% (Slow Steaming)
  const speedB = Math.round(baseSpeed * 0.88 * 10) / 10;
  const durationB = Math.round((distB / speedB) * 10) / 10;
  // Due to cubic speed law, fuel consumption is ~22% lower
  const fuelB = Math.round(fuelA * 0.78 * 10) / 10;
  const co2B = Math.round(fuelB * fuel.emissionFactor * 10) / 10;
  const costB = Math.round(fuelB * fuelPrice);

  // 3. Route C — Shorter Estimated Duration (Direct Fast Transit)
  // Straight shortest line (-1.8% distance)
  const distC = Math.round(baseDistance * 0.982);
  // Speed increased by 15% (Sprint speed)
  const speedC = Math.round(baseSpeed * 1.15 * 10) / 10;
  const durationC = Math.round((distC / speedC) * 10) / 10;
  // Fuel consumption is ~24% higher
  const fuelC = Math.round(fuelA * 1.24 * 10) / 10;
  const co2C = Math.round(fuelC * fuel.emissionFactor * 10) / 10;
  const costC = Math.round(fuelC * fuelPrice);

  // Differences relative to Route A Baseline
  const diffEmissionsB = Math.round(((co2B - co2A) / co2A) * 100);
  const diffDurationB = Math.round(((durationB - durationA) / durationA) * 100);
  const diffCostB = Math.round(((costB - costA) / costA) * 100);

  const diffEmissionsC = Math.round(((co2C - co2A) / co2A) * 100);
  const diffDurationC = Math.round(((durationC - durationA) / durationA) * 100);
  const diffCostC = Math.round(((costC - costA) / costA) * 100);

  return [
    {
      id: 'route-a',
      type: 'Balanced',
      name: 'Route A — Balanced Direct Passage',
      subtitle: 'Standard Corridor Track',
      description: 'Standard navigation lane through Malacca Strait with optimal balance between speed, cost, and bunker demand.',
      distanceNm: distA,
      averageSpeedKnots: speedA,
      durationHours: durationA,
      fuelConsumptionTonnes: fuelA,
      fuelCostUSD: costA,
      co2EmissionsTonnes: co2A,
      diffPercentEmissionsVsBaseline: 0,
      diffPercentDurationVsBaseline: 0,
      diffPercentCostVsBaseline: 0,
      isBaseline: true,
      transitVia: 'Great Channel & One Fathom Bank',
      weatherRating: 'Moderate',
    },
    {
      id: 'route-b',
      type: 'Lower Emissions',
      name: 'Route B — Eco-Speed Green Transit',
      subtitle: 'Decarbonization Priority',
      description: 'Slow-steaming profile designed to exploit favorable monsoon currents and minimize hydrodynamic resistance.',
      distanceNm: distB,
      averageSpeedKnots: speedB,
      durationHours: durationB,
      fuelConsumptionTonnes: fuelB,
      fuelCostUSD: costB,
      co2EmissionsTonnes: co2B,
      diffPercentEmissionsVsBaseline: diffEmissionsB,
      diffPercentDurationVsBaseline: diffDurationB,
      diffPercentCostVsBaseline: diffCostB,
      isBaseline: false,
      transitVia: 'Deepwater Trench & South Malacca Lane',
      weatherRating: 'Favorable',
    },
    {
      id: 'route-c',
      type: 'Shorter Duration',
      name: 'Route C — High-Speed Direct Track',
      subtitle: 'Schedule Priority',
      description: 'Direct passage maximizing voyage velocity to meet tight port berth clearance windows at the cost of higher fuel expenditure.',
      distanceNm: distC,
      averageSpeedKnots: speedC,
      durationHours: durationC,
      fuelConsumptionTonnes: fuelC,
      fuelCostUSD: costC,
      co2EmissionsTonnes: co2C,
      diffPercentEmissionsVsBaseline: diffEmissionsC,
      diffPercentDurationVsBaseline: diffDurationC,
      diffPercentCostVsBaseline: diffCostC,
      isBaseline: false,
      transitVia: 'Direct Coastal Traffic Separation Scheme (TSS)',
      weatherRating: 'Challenging',
    },
  ];
}

/**
 * Formats duration in hours into days and hours (e.g. "6d 8h").
 */
export function formatDuration(hours: number): string {
  const days = Math.floor(hours / 24);
  const remainingHours = Math.round(hours % 24);
  if (days === 0) return `${remainingHours} hrs`;
  return `${days}d ${remainingHours}h (${hours} hrs)`;
}

/**
 * Estimates IMO operational Carbon Intensity Indicator (CII) score.
 */
export function calculateEstimatedCiiScore(
  co2EmissionsTonnes: number,
  distanceNm: number,
  cargoWeightTonnes: number
): string {
  if (!distanceNm || !cargoWeightTonnes) return 'A (3.4 gCO2/dwt-nm)';
  const gramsCo2 = co2EmissionsTonnes * 1_000_000;
  const tonMiles = cargoWeightTonnes * distanceNm;
  const ratio = Math.round((gramsCo2 / tonMiles) * 10) / 10;

  if (ratio <= 3.2) return `A+ (${ratio} gCO2/dwt-nm)`;
  if (ratio <= 4.0) return `A (${ratio} gCO2/dwt-nm)`;
  if (ratio <= 5.0) return `B (${ratio} gCO2/dwt-nm)`;
  if (ratio <= 6.2) return `C (${ratio} gCO2/dwt-nm)`;
  return `D (${ratio} gCO2/dwt-nm)`;
}
