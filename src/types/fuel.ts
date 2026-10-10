import type { FuelVerificationStatus } from './voyage';

export type VerificationStatus = FuelVerificationStatus;

export type DocumentCategory =
  | 'Fuel Certificate'
  | 'Bunker Delivery Note'
  | 'Supplier Declaration'
  | 'Additional Supporting Evidence';

export type DocumentReviewStatus =
  | 'Missing'
  | 'Attached'
  | 'Awaiting Review'
  | 'Accepted by Reviewer'
  | 'Rejected';

export interface FuelDocument {
  id: string;
  name: string;
  category: DocumentCategory;
  fileSize: string; // e.g. '1.8 MB'
  fileSizeBytes?: number;
  fileType: string; // 'application/pdf', 'image/png', 'image/jpeg'
  uploadedAt: string;
  status: DocumentReviewStatus;
  reviewNotes?: string;
  blobUrl?: string;
}

export interface ValidationCheckItem {
  id: string;
  label: string;
  passed: boolean;
  severity: 'info' | 'warning' | 'error';
  message: string;
}

export interface ValidationResult {
  allPassed: boolean;
  checks: ValidationCheckItem[];
  flagReasons: string[];
  overallAssessment: 'Passed data checks' | 'Potential discrepancy' | 'Awaiting human review';
}

export interface VerificationHistoryEntry {
  id: string;
  recordId: string;
  timestamp: string;
  action: string;
  previousStatus?: VerificationStatus;
  newStatus: VerificationStatus;
  actor: string;
  comment?: string;
}

export interface FuelSupplierOption {
  id: string;
  name: string;
  code: string;
  basePort: string;
  accreditedUntil: string;
  isISCC_Certified: boolean;
}

export interface FuelRecord {
  id: string;
  voyageId: string;
  vesselName: string;
  imoNumber?: string;
  fuelType: string;
  quantityTonnes: number;
  quantityUnit?: string; // defaults to 'metric tonnes'
  bunkerPort: string;
  deliveryDateTime?: string;
  supplierName: string;
  supplierRef?: string;
  bdnNumber: string; // Bunker Delivery Note number
  submissionDate: string;
  verificationStatus: VerificationStatus;
  fuelPricePerTonne?: number;
  certificateHash?: string;
  co2Factor: number; // e.g. 3.114 tCO2/tFuel or 0.88 for bio-methanol
  flagReason?: string;
  auditorNotes?: string;
  reviewerNotes?: string;
  documents?: FuelDocument[];
  validationResult?: ValidationResult;
  history?: VerificationHistoryEntry[];
  
  // Backward compatibility with previous dashboard modal
  evidenceDocuments?: {
    name: string;
    type: 'BDN' | 'MassBalance' | 'LabReport' | 'ISCC_Certificate';
    size: string;
    verified: boolean;
  }[];
}

export interface FuelSubmissionFormData {
  voyageId: string;
  vesselName: string;
  imoNumber?: string;
  bunkerPort: string;
  deliveryDateTime: string;
  supplierName: string;
  supplierRef?: string;
  fuelType: string;
  quantityTonnes: number;
  quantityUnit: string;
  fuelPricePerTonne?: number;
  bdnNumber?: string;
}
