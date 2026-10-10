import type { FuelVerificationStatus } from './voyage';

export interface FuelRecord {
  id: string;
  voyageId: string;
  vesselName: string;
  fuelType: string;
  quantityTonnes: number;
  bunkerPort: string;
  supplierName: string;
  bdnNumber: string; // Bunker Delivery Note number
  submissionDate: string;
  verificationStatus: FuelVerificationStatus;
  certificateHash?: string;
  co2Factor: number; // e.g. 3.114 tCO2/tFuel or 0.82 for bio-methanol
  flagReason?: string;
  auditorNotes?: string;
  evidenceDocuments: {
    name: string;
    type: 'BDN' | 'MassBalance' | 'LabReport' | 'ISCC_Certificate';
    size: string;
    verified: boolean;
  }[];
}
