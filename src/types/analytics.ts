export interface CorridorKpi {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  unit?: string;
  trendText: string;
  trendDirection: 'up' | 'down' | 'neutral';
  status: 'verified' | 'progress' | 'pending' | 'active';
  helperText: string;
}

export interface EmissionsTrendPoint {
  month: string;
  standardVoyages: number;
  corridorVerified: number;
  projectedTarget: number;
}

export interface FuelSharePoint {
  fuelType: string;
  sharePercentage: number;
  metricTonnes: number;
  reductionScore: string;
  color: string;
}

export interface RecentVoyageActivity {
  id: string;
  vesselName: string;
  route: string;
  fuelType: string;
  status: 'Audited & Verified' | 'In Verification' | 'Berth Assigned' | 'Pending Review';
  statusColor: 'green' | 'blue' | 'amber' | 'slate';
  etaOrDate: string;
}
