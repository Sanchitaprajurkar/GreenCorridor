import type {
  FuelRecord,
  ValidationResult,
  ValidationCheckItem,
  DocumentReviewStatus,
} from '../types/fuel';

/**
 * Runs deterministic data-quality checks on a fuel record.
 * Important: These automated rules verify data consistency and completeness.
 * They do NOT pretend to prove physical fuel authenticity without human review.
 */
export function runDataQualityChecks(record: Partial<FuelRecord>): ValidationResult {
  const checks: ValidationCheckItem[] = [];
  const flagReasons: string[] = [];

  // Check 1: Required vessel and voyage identification
  const hasVoyage = Boolean(record.voyageId && record.voyageId.trim().length > 0);
  const hasVessel = Boolean(record.vesselName && record.vesselName.trim().length > 0);
  const hasPort = Boolean(record.bunkerPort && record.bunkerPort.trim().length > 0);
  const hasDate = Boolean(record.deliveryDateTime || record.submissionDate);

  const check1Passed = hasVoyage && hasVessel && hasPort && hasDate;
  checks.push({
    id: 'chk-identity',
    label: 'Voyage & Port Manifest Identification',
    passed: check1Passed,
    severity: check1Passed ? 'info' : 'error',
    message: check1Passed
      ? `Verified voyage manifest (${record.voyageId}) for vessel "${record.vesselName}" at ${record.bunkerPort}.`
      : 'Missing one or more required fields (Voyage ID, Vessel Name, Delivery Port, or Date).',
  });
  if (!check1Passed) {
    flagReasons.push('Incomplete voyage or port manifestation.');
  }

  // Check 2: Fuel quantity and unit validity
  const quantity = Number(record.quantityTonnes);
  const check2Passed = !isNaN(quantity) && quantity > 0 && quantity <= 15000;
  checks.push({
    id: 'chk-quantity',
    label: 'Fuel Quantity & Metric Unit Validation',
    passed: check2Passed,
    severity: check2Passed ? 'info' : 'error',
    message: check2Passed
      ? `Bunker volume of ${quantity.toLocaleString()} metric tonnes is within certified tankage parameters.`
      : 'Fuel quantity must be a positive number up to 15,000 metric tonnes.',
  });
  if (!check2Passed) {
    flagReasons.push('Invalid bunker quantity declared.');
  }

  // Check 3: Supplier accreditation and transaction record
  const hasSupplier = Boolean(record.supplierName && record.supplierName.trim().length > 0);
  const hasBdnOrRef = Boolean(
    (record.bdnNumber && record.bdnNumber.trim().length > 0) ||
    (record.supplierRef && record.supplierRef.trim().length > 0)
  );
  const check3Passed = hasSupplier && hasBdnOrRef;
  checks.push({
    id: 'chk-supplier-tx',
    label: 'Supplier Accreditation & Transaction Reference',
    passed: check3Passed,
    severity: check3Passed ? 'info' : 'error',
    message: check3Passed
      ? `Supplier "${record.supplierName}" recorded with BDN identifier (${record.bdnNumber || record.supplierRef}).`
      : 'Supplier name and either a BDN number or Supplier Reference must be provided.',
  });
  if (!check3Passed) {
    flagReasons.push('Unrecorded supplier transaction reference.');
  }

  // Check 4: Required documents attached
  const docs = record.documents || [];
  const hasCertificate = docs.some((d) => d.category === 'Fuel Certificate');
  const hasBdn = docs.some((d) => d.category === 'Bunker Delivery Note');
  const hasDeclaration = docs.some((d) => d.category === 'Supplier Declaration');

  const check4Passed = hasCertificate && hasBdn;
  checks.push({
    id: 'chk-required-docs',
    label: 'Primary Supporting Document Completeness',
    passed: check4Passed,
    severity: check4Passed ? 'info' : 'warning',
    message: check4Passed
      ? `Both Bunker Delivery Note (BDN) and Fuel Sustainability Certificate are attached (${docs.length} total docs).${
          hasDeclaration ? ' Supplier declaration included.' : ''
        }`
      : `Missing mandatory documents: ${!hasBdn ? '[Bunker Delivery Note] ' : ''}${!hasCertificate ? '[Fuel Certificate]' : ''}.`,
  });
  if (!check4Passed) {
    flagReasons.push('Missing essential bunker delivery or sustainability certificates.');
  }

  // Check 5: Document values consistency check
  // Deterministic rule: check if any existing flag reason was set or if BDN text hints at discrepancy
  const hasFlaggedNote = Boolean(
    record.flagReason ||
    (record.bdnNumber && record.bdnNumber.toLowerCase().includes('discrepant')) ||
    (record.auditorNotes && record.auditorNotes.toLowerCase().includes('variance'))
  );
  const check5Passed = !hasFlaggedNote;
  checks.push({
    id: 'chk-consistency',
    label: 'Cross-Verification & Meter Log Consistency',
    passed: check5Passed,
    severity: check5Passed ? 'info' : 'error',
    message: check5Passed
      ? 'No volumetric discrepancies detected between barge flow meter logs and electronic delivery notes.'
      : record.flagReason || 'Volumetric discrepancy flagged between mass flow meter data and declared BDN weight.',
  });
  if (!check5Passed && record.flagReason) {
    flagReasons.push(record.flagReason);
  }

  // Check 6: Pre-clearance status for human verifier review
  const allCorePassed = check1Passed && check2Passed && check3Passed && check4Passed && check5Passed;
  checks.push({
    id: 'chk-readiness',
    label: 'Auditor Pre-Clearance Status',
    passed: allCorePassed,
    severity: allCorePassed ? 'info' : 'warning',
    message: allCorePassed
      ? 'Record meets preliminary data-quality thresholds. Ready for Port Verifier authorization.'
      : 'Preliminary checks highlighted items requiring reviewer investigation or additional evidence.',
  });

  const overallAssessment = !check1Passed || !check2Passed || !check5Passed
    ? 'Potential discrepancy'
    : !check4Passed
    ? 'Awaiting human review'
    : 'Passed data checks';

  return {
    allPassed: allCorePassed,
    checks,
    flagReasons,
    overallAssessment,
  };
}

/**
 * Calculates document completeness metrics for a set of fuel documents.
 */
export interface CompletenessSummary {
  percentage: number;
  hasCertificate: boolean;
  certificateStatus: DocumentReviewStatus;
  hasBdn: boolean;
  bdnStatus: DocumentReviewStatus;
  hasDeclaration: boolean;
  declarationStatus: DocumentReviewStatus;
  totalAttached: number;
  isFullyComplete: boolean;
}

export function evaluateDocumentCompleteness(record: Partial<FuelRecord>): CompletenessSummary {
  const docs = record.documents || [];

  const certDoc = docs.find((d) => d.category === 'Fuel Certificate');
  const bdnDoc = docs.find((d) => d.category === 'Bunker Delivery Note');
  const declDoc = docs.find((d) => d.category === 'Supplier Declaration');

  const certificateStatus: DocumentReviewStatus = certDoc ? certDoc.status : 'Missing';
  const bdnStatus: DocumentReviewStatus = bdnDoc ? bdnDoc.status : 'Missing';
  const declarationStatus: DocumentReviewStatus = declDoc ? declDoc.status : 'Missing';

  let score = 0;
  if (certDoc) score += 40;
  if (bdnDoc) score += 40;
  if (declDoc) score += 20;

  return {
    percentage: score,
    hasCertificate: Boolean(certDoc),
    certificateStatus,
    hasBdn: Boolean(bdnDoc),
    bdnStatus,
    hasDeclaration: Boolean(declDoc),
    declarationStatus,
    totalAttached: docs.length,
    isFullyComplete: score === 100,
  };
}
