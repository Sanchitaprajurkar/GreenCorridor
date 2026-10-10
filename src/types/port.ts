import type { FuelVerificationStatus } from './voyage';

export type PortId = 'port-singapore' | 'port-mumbai' | 'port-chennai';

export interface PortOptionInfo {
  id: PortId;
  name: string;
  shortName: string;
  country: 'Singapore' | 'India';
  code: string;
  terminals: string[];
  timezone: string;
  coordinates: { lat: number; lng: number };
}

export type BerthStatus = 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';

export type ArrivalStatus =
  | 'Scheduled'
  | 'Approaching'
  | 'Awaiting Berth'
  | 'Berthed'
  | 'Delayed'
  | 'Departed';

export type BerthType =
  | 'Container'
  | 'Clean Energy / Bunkering'
  | 'Multi-Purpose'
  | 'Bulk & General';

export interface PortBerth {
  id: string;
  name: string;
  portId: PortId;
  type: BerthType;
  status: BerthStatus;
  maxLoaMeters: number; // Length overall maximum
  maxDraftMeters: number; // Maximum depth clearance
  hasShorePower: boolean;
  hasAlternativeBunker: boolean;
  assignedVesselName?: string;
  assignedVoyageId?: string;
  estimatedAvailableTime?: string;
  currentReservationId?: string;
}

export interface BerthReservation {
  id: string;
  berthId: string;
  voyageId: string;
  vesselName: string;
  startTime: string; // ISO-like string e.g. 2026-10-21T08:00
  endTime: string;
  status: 'Active' | 'Upcoming' | 'Completed' | 'Conflict';
}

export interface ArrivalSchedule {
  id: string;
  voyageId: string;
  vesselName: string;
  vesselType: string;
  originPort: string;
  destinationPort: string;
  portId: PortId;
  eta: string;
  etd: string;
  serviceDurationHours: number;
  loaMeters: number;
  draftMeters: number;
  assignedBerthId?: string;
  assignedBerthName?: string;
  arrivalStatus: ArrivalStatus;
  fuelVerificationStatus: FuelVerificationStatus | 'No linked record';
  fuelType?: string;
  delayHours?: number;
  cargoDescription?: string;
}

export interface BerthRecommendation {
  berthId: string;
  berthName: string;
  berthType: BerthType;
  score: number; // 0 to 100
  isEligible: boolean;
  ineligibilityReason?: string;
  waitingTimeHours: number;
  expectedServiceWindow: {
    start: string;
    end: string;
  };
  breakdown: {
    scheduleFit: number; // 40%
    vesselCompatibility: number; // 30%
    waitingTimeScore: number; // 20%
    operationalReadiness: number; // 10%
  };
  compatibilitySummary: string;
  reasons: string[];
  warnings: string[];
}

export interface OperationalAlert {
  id: string;
  portId: PortId;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
  vesselName?: string;
  voyageId?: string;
  berthId?: string;
  category: 'conflict' | 'draft_exceeded' | 'eta_delayed' | 'fuel_pending' | 'unassigned';
  actionLabel?: string;
}

export interface VoyageReadinessStep {
  step: number;
  label: string;
  status: 'completed' | 'in_progress' | 'pending' | 'warning';
  details: string;
}

export interface VoyageReadiness {
  voyageId: string;
  vesselName: string;
  steps: VoyageReadinessStep[];
  overallReady: boolean;
}

export interface ScheduleVesselFormData {
  voyageId: string;
  vesselName: string;
  vesselType: string;
  loaMeters: number;
  draftMeters: number;
  cargoType: string;
  portId: PortId;
  eta: string;
  etd: string;
  serviceDurationHours: number;
  assignedBerthId?: string;
}
