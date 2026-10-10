export type VoyageStatus = 'Scheduled' | 'In Transit' | 'Berthing' | 'Completed' | 'Anchored' | 'Draft';

export type FuelVerificationStatus = 'Verified' | 'Pending Review' | 'Flagged' | 'Draft';

export type VesselType = 'Container Ship' | 'Bulk Carrier' | 'Tanker' | 'General Cargo';

export type RoutePreference =
  | 'Balanced'
  | 'Lower Estimated Emissions'
  | 'Lower Estimated Cost'
  | 'Shorter Duration';

export type CargoType =
  | 'Containerized Dry'
  | 'Refrigerated Cargo'
  | 'Bulk Minerals & Grains'
  | 'Liquid Chemicals'
  | 'General Breakbulk';

export interface PortOption {
  id: string;
  name: string;
  country: 'India' | 'Singapore';
  code: string;
  coordinates: { lat: number; lng: number };
}

export interface FuelOption {
  id: string;
  name: string;
  emissionFactor: number; // tonnes of CO2 per tonne of fuel (IMO MEPC reference)
  defaultPricePerTonne: number; // in USD
  lifecycleAbatementScore: string; // e.g. -68% CO2e
  isGreen: boolean;
}

export interface VoyageFormData {
  // A. Vessel details
  vesselName: string;
  imoNumber: string;
  vesselType: VesselType;
  averageSpeedKnots: number;

  // B. Route details
  originPortId: string;
  destinationPortId: string;
  departureDateTime: string;
  arrivalDateTime: string;
  routePreference: RoutePreference;

  // C. Cargo details
  cargoType: CargoType;
  cargoWeightTonnes: number;
  cargoDescription?: string;

  // D. Fuel details
  fuelType: string;
  estimatedFuelConsumption?: number;
  fuelPricePerTonne?: number;
}

export interface RouteAlternative {
  id: 'route-a' | 'route-b' | 'route-c';
  type: 'Balanced' | 'Lower Emissions' | 'Shorter Duration';
  name: string;
  subtitle: string;
  description: string;
  distanceNm: number;
  averageSpeedKnots: number;
  durationHours: number;
  fuelConsumptionTonnes: number;
  fuelCostUSD?: number;
  co2EmissionsTonnes: number;
  diffPercentEmissionsVsBaseline: number;
  diffPercentDurationVsBaseline: number;
  diffPercentCostVsBaseline: number;
  isBaseline: boolean;
  transitVia: string;
  weatherRating: 'Favorable' | 'Moderate' | 'Challenging';
}

export interface Voyage {
  id: string;
  vesselName: string;
  imoNumber: string;
  vesselType?: VesselType;
  originPort: string;
  originCountry: 'India' | 'Singapore';
  destinationPort: string;
  destinationCountry: 'Singapore' | 'India';
  departureDate: string;
  estimatedArrival: string;
  actualArrival?: string;
  voyageStatus: VoyageStatus;
  fuelType: string;
  fuelBunkeredTonnes: number;
  fuelVerificationStatus: FuelVerificationStatus;
  estimatedEmissionsTonnes: number;
  verifiedEmissionsTonnes?: number;
  carbonIntensityScore: string;
  berthAssigned?: string;
  notes?: string;

  // GreenTwin specific fields
  selectedRouteId?: 'route-a' | 'route-b' | 'route-c';
  selectedRouteName?: string;
  distanceNm?: number;
  durationHours?: number;
  fuelCostUSD?: number;
  cargoWeightTonnes?: number;
  cargoType?: CargoType;
  isDraft?: boolean;
}
