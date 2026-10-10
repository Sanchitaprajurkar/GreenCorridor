export interface DashboardKpi {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  supportingText: string;
  trendText?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  iconName: 'ship' | 'shieldCheck' | 'leaf' | 'clockAlert';
  themeColor: 'navy' | 'green' | 'amber' | 'blue';
}

export interface EmissionsDataPoint {
  date: string;
  estimatedEmissions: number;
  verifiedEmissions: number;
  baselineEmissions: number;
}

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface DashboardAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  explanation: string;
  timestamp: string;
  relatedModule: 'GreenTwin' | 'FuelTrust' | 'SmartDock' | 'GreenPulse';
  relatedId?: string;
  actionLabel: string;
}

export interface CorridorShipTransit {
  id: string;
  vesselName: string;
  voyageId: string;
  origin: string;
  destination: string;
  progressPercent: number;
  fuelType: string;
  eta: string;
  status: 'In Transit' | 'Berthing' | 'Anchored';
}
