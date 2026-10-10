import type { CorridorKpi, EmissionsTrendPoint, FuelSharePoint, RecentVoyageActivity } from '../types/analytics';

export const CORRIDOR_KPIS: CorridorKpi[] = [
  {
    id: 'kpi-voyages',
    label: 'Total Registered Voyages',
    value: '148',
    numericValue: 148,
    trendText: '+18 this month',
    trendDirection: 'up',
    status: 'active',
    helperText: 'Enroute India (JNPA / Chennai) ⇄ Singapore',
  },
  {
    id: 'kpi-fuel-verified',
    label: 'Fuel Records Verified',
    value: '94.6%',
    numericValue: 94.6,
    unit: 'audit rate',
    trendText: '382 of 404 batches verified',
    trendDirection: 'up',
    status: 'verified',
    helperText: 'Backed by digital bunker delivery notes',
  },
  {
    id: 'kpi-emissions',
    label: 'Estimated CO₂e Abated',
    value: '16.4 kt',
    numericValue: 16.4,
    unit: 'CO₂e',
    trendText: '-21.8% vs corridor baseline',
    trendDirection: 'down',
    status: 'progress',
    helperText: 'Well-to-Wake verified emissions reductions',
  },
  {
    id: 'kpi-pending-review',
    label: 'Voyages Awaiting Review',
    value: '07',
    numericValue: 7,
    trendText: 'Avg review time: 4.2h',
    trendDirection: 'neutral',
    status: 'pending',
    helperText: 'Awaiting evidence document validation',
  },
];

export const EMISSIONS_TREND_DATA: EmissionsTrendPoint[] = [
  { month: 'Oct 25', standardVoyages: 42.5, corridorVerified: 38.2, projectedTarget: 40.0 },
  { month: 'Nov 25', standardVoyages: 44.1, corridorVerified: 37.0, projectedTarget: 38.5 },
  { month: 'Dec 25', standardVoyages: 46.8, corridorVerified: 36.4, projectedTarget: 37.0 },
  { month: 'Jan 26', standardVoyages: 45.0, corridorVerified: 34.2, projectedTarget: 35.5 },
  { month: 'Feb 26', standardVoyages: 43.8, corridorVerified: 32.1, projectedTarget: 34.0 },
  { month: 'Mar 26', standardVoyages: 47.2, corridorVerified: 31.5, projectedTarget: 32.5 },
];

export const FUEL_DISTRIBUTION_DATA: FuelSharePoint[] = [
  { fuelType: 'Green Bio-Methanol', sharePercentage: 34, metricTonnes: 12450, reductionScore: '-68% CO₂e', color: '#2F8F68' },
  { fuelType: 'B24 Bio-Fuel Blend', sharePercentage: 28, metricTonnes: 10240, reductionScore: '-21% CO₂e', color: '#4BAE82' },
  { fuelType: 'LNG Dual-Fuel (Bio-LNG)', sharePercentage: 22, metricTonnes: 8050, reductionScore: '-18% CO₂e', color: '#68B6E3' },
  { fuelType: 'Low-Sulfur VLSFO (Optimized)', sharePercentage: 16, metricTonnes: 5860, reductionScore: '-9% CO₂e', color: '#94A3B8' },
];

export const RECENT_VOYAGES: RecentVoyageActivity[] = [
  {
    id: 'VOY-2026-081',
    vesselName: 'Ever Green Horizon',
    route: 'JNPA (Mumbai) → PSA Singapore',
    fuelType: 'Green Bio-Methanol (80% blend)',
    status: 'Audited & Verified',
    statusColor: 'green',
    etaOrDate: 'Arrival Today, 08:30 SGT',
  },
  {
    id: 'VOY-2026-084',
    vesselName: 'Ocean Sentinel IX',
    route: 'Chennai Port → Jurong Port',
    fuelType: 'B24 Marine Biofuel',
    status: 'In Verification',
    statusColor: 'blue',
    etaOrDate: 'ETA: 12 Oct, 14:00 SGT',
  },
  {
    id: 'VOY-2026-087',
    vesselName: 'Pacific Pioneer',
    route: 'Cochin Port → PSA Singapore',
    fuelType: 'Bio-LNG Dual Fuel',
    status: 'Berth Assigned',
    statusColor: 'amber',
    etaOrDate: 'Berth #B14 (Green Priority)',
  },
  {
    id: 'VOY-2026-089',
    vesselName: 'Bharat Star IV',
    route: 'Mundra → Tuas Port',
    fuelType: 'VLSFO with JIT Routing',
    status: 'Pending Review',
    statusColor: 'slate',
    etaOrDate: 'ETA: 15 Oct, 21:00 SGT',
  },
];
