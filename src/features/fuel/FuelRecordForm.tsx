import React, { useState } from 'react';
import {
  Ship,
  Fuel,
  MapPin,
  Calendar,
  Building2,
  DollarSign,
  FileCheck,
  RotateCcw,
  Save,
  Send,
  AlertCircle,
  X,
} from 'lucide-react';
import type {
  FuelRecord,
  FuelDocument,
  FuelSubmissionFormData,
} from '../../types/fuel';
import { DEMO_SUPPLIERS, DEMO_BUNKER_PORTS } from '../../data/fuelMockData';
import { DEMO_FUELS, INITIAL_PLANNED_VOYAGES } from '../../data/voyageMockData';
import { DocumentUpload } from './DocumentUpload';
import { runDataQualityChecks } from '../../utils/fuelCalculations';

interface FuelRecordFormProps {
  onSuccess: (newRecord: FuelRecord, message: string) => void;
  onCancel?: () => void;
  initialVoyageId?: string;
  isModal?: boolean;
}

export const FuelRecordForm: React.FC<FuelRecordFormProps> = ({
  onSuccess,
  onCancel,
  initialVoyageId = '',
  isModal = false,
}) => {
  const [formData, setFormData] = useState<FuelSubmissionFormData>({
    voyageId: initialVoyageId || 'VY-2026-0891',
    vesselName: 'Eco Horizon IX',
    imoNumber: '9890123',
    bunkerPort: DEMO_BUNKER_PORTS[0],
    deliveryDateTime: new Date().toISOString().substring(0, 16),
    supplierName: DEMO_SUPPLIERS[0].name,
    supplierRef: 'IOC-REF-2026-904',
    fuelType: DEMO_FUELS[0].name,
    quantityTonnes: 250,
    quantityUnit: 'metric tonnes',
    fuelPricePerTonne: 780,
    bdnNumber: `BDN-IOC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
  });

  const [documents, setDocuments] = useState<FuelDocument[]>([
    {
      id: 'doc-init-1',
      name: 'BDN_Signed_Delivery_Receipt.pdf',
      category: 'Bunker Delivery Note',
      fileSize: '1.2 MB',
      fileType: 'application/pdf',
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Attached',
    },
    {
      id: 'doc-init-2',
      name: 'ISCC_EU_Sustainability_Certificate.pdf',
      category: 'Fuel Certificate',
      fileSize: '2.4 MB',
      fileType: 'application/pdf',
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Attached',
    },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When user selects a known GreenTwin voyage, autofill vessel details
  const handleSelectVoyage = (voyageId: string) => {
    const found = INITIAL_PLANNED_VOYAGES.find((v) => v.id === voyageId);
    if (found) {
      setFormData((prev) => ({
        ...prev,
        voyageId: found.id,
        vesselName: found.vesselName,
        imoNumber: found.imoNumber,
        fuelType: found.fuelType || prev.fuelType,
      }));
    } else {
      setFormData((prev) => ({ ...prev, voyageId }));
    }
  };

  const handleAddDocument = (newDoc: FuelDocument) => {
    setDocuments((prev) => [...prev, newDoc]);
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.voyageId.trim()) {
      errs.voyageId = 'Voyage ID is required.';
    }
    if (!formData.vesselName.trim()) {
      errs.vesselName = 'Vessel name is required.';
    }
    if (!formData.bunkerPort.trim()) {
      errs.bunkerPort = 'Delivery port is required.';
    }
    if (!formData.deliveryDateTime) {
      errs.deliveryDateTime = 'Delivery date & time is required.';
    }
    if (!formData.supplierName.trim()) {
      errs.supplierName = 'Supplier name is required.';
    }
    if (!formData.quantityTonnes || formData.quantityTonnes <= 0) {
      errs.quantityTonnes = 'Quantity must be a positive number of metric tonnes.';
    }
    if (!formData.fuelType.trim()) {
      errs.fuelType = 'Fuel type is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (asDraft: boolean) => {
    if (!asDraft && !validate()) {
      return;
    }

    setIsSubmitting(true);

    const recordId = `FR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const fuelMatched = DEMO_FUELS.find((f) => f.name === formData.fuelType);
    const co2Factor = fuelMatched ? fuelMatched.emissionFactor : 0.88;

    const newRecord: FuelRecord = {
      id: recordId,
      voyageId: formData.voyageId,
      vesselName: formData.vesselName,
      imoNumber: formData.imoNumber,
      fuelType: formData.fuelType,
      quantityTonnes: Number(formData.quantityTonnes),
      quantityUnit: 'metric tonnes',
      bunkerPort: formData.bunkerPort,
      deliveryDateTime: formData.deliveryDateTime,
      supplierName: formData.supplierName,
      supplierRef: formData.supplierRef,
      bdnNumber: formData.bdnNumber || `BDN-GEN-${Math.floor(1000 + Math.random() * 9000)}`,
      submissionDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      verificationStatus: asDraft ? 'Draft' : 'Pending Review',
      fuelPricePerTonne: formData.fuelPricePerTonne ? Number(formData.fuelPricePerTonne) : undefined,
      co2Factor,
      documents,
      history: [
        {
          id: `hist-${Date.now()}-1`,
          recordId,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
          action: asDraft ? 'Fuel record saved as draft' : 'Fuel record submitted',
          newStatus: asDraft ? 'Draft' : 'Pending Review',
          actor: 'Bunker Operator (Submitting Entity)',
          comment: asDraft
            ? 'Draft created in FuelTrust local session.'
            : `Submitted ${formData.quantityTonnes} tonnes of ${formData.fuelType} for corridor bilateral audit.`,
        },
      ],
      evidenceDocuments: documents.map((d) => ({
        name: d.name,
        type: d.category === 'Bunker Delivery Note' ? 'BDN' : 'ISCC_Certificate',
        size: d.fileSize,
        verified: false,
      })),
    };

    // Run deterministic validation rules immediately
    newRecord.validationResult = runDataQualityChecks(newRecord);

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(
        newRecord,
        asDraft
          ? `Record ${recordId} successfully saved as Draft.`
          : `Record ${recordId} submitted into the Verification Queue.`
      );
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      voyageId: 'VY-2026-0891',
      vesselName: 'Eco Horizon IX',
      imoNumber: '9890123',
      bunkerPort: DEMO_BUNKER_PORTS[0],
      deliveryDateTime: new Date().toISOString().substring(0, 16),
      supplierName: DEMO_SUPPLIERS[0].name,
      supplierRef: '',
      fuelType: DEMO_FUELS[0].name,
      quantityTonnes: 250,
      quantityUnit: 'metric tonnes',
      fuelPricePerTonne: 780,
      bdnNumber: '',
    });
    setDocuments([]);
    setErrors({});
  };

  return (
    <div className={`bg-white rounded-3xl ${isModal ? '' : 'p-6 sm:p-8 border border-slate-subtle/80 shadow-card'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-subtle/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-display font-extrabold text-maritime-dark tracking-tight">
              Submit Fuel Record
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-mint-soft text-sustainability-hover px-2.5 py-0.5 rounded-full border border-sustainability-green/30">
              Module 02
            </span>
          </div>
          <p className="text-xs text-slate-muted mt-1">
            Submit bunker delivery data, attach chain-of-custody documentation, and initiate bilateral verification.
          </p>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl text-slate-muted hover:text-maritime-dark hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
        className="space-y-6"
      >
        {/* Section A: Voyage & Vessel Information */}
        <div className="p-5 rounded-2xl bg-[#FAFCF9] border border-slate-subtle/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-maritime-dark flex items-center gap-2">
              <Ship className="w-4 h-4 text-sustainability-green" />
              <span>A. Voyage & Vessel Information</span>
            </h3>
            <span className="text-[10px] text-slate-muted">Connected to GreenTwin Voyages</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Voyage ID */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Voyage ID <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={formData.voyageId}
                  onChange={(e) => setFormData({ ...formData, voyageId: e.target.value })}
                  placeholder="e.g. VY-2026-0891"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none bg-white ${
                    errors.voyageId
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-subtle/80 focus:border-sustainability-green'
                  }`}
                />
              </div>
              {/* Quick pre-select helper */}
              <div className="mt-1.5 flex items-center gap-1 overflow-x-auto text-[10px] text-slate-muted">
                <span className="shrink-0 font-medium">Quick pick:</span>
                {INITIAL_PLANNED_VOYAGES.slice(0, 3).map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleSelectVoyage(v.id)}
                    className="underline hover:text-sustainability-green shrink-0 font-mono"
                  >
                    {v.id}
                  </button>
                ))}
              </div>
              {errors.voyageId && (
                <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.voyageId}</span>
                </p>
              )}
            </div>

            {/* Vessel Name */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Vessel Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.vesselName}
                onChange={(e) => setFormData({ ...formData, vesselName: e.target.value })}
                placeholder="e.g. Eco Horizon IX"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none bg-white ${
                  errors.vesselName
                    ? 'border-rose-400 focus:border-rose-500'
                    : 'border-slate-subtle/80 focus:border-sustainability-green'
                }`}
              />
              {errors.vesselName && (
                <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.vesselName}</span>
                </p>
              )}
            </div>

            {/* Vessel Identifier / IMO */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                IMO Number <span className="text-slate-muted font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.imoNumber || ''}
                onChange={(e) => setFormData({ ...formData, imoNumber: e.target.value })}
                placeholder="7-digit IMO"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs font-mono outline-none bg-white focus:border-sustainability-green"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Delivery Port */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sustainability-green" />
                <span>Bunker Delivery Port <span className="text-rose-500">*</span></span>
              </label>
              <select
                value={formData.bunkerPort}
                onChange={(e) => setFormData({ ...formData, bunkerPort: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              >
                {DEMO_BUNKER_PORTS.map((port) => (
                  <option key={port} value={port}>
                    {port}
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Date & Time */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sustainability-green" />
                <span>Delivery Date & Time <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="datetime-local"
                value={formData.deliveryDateTime}
                onChange={(e) => setFormData({ ...formData, deliveryDateTime: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              />
            </div>
          </div>
        </div>

        {/* Section B: Supplier & Fuel Information */}
        <div className="p-5 rounded-2xl bg-[#FAFCF9] border border-slate-subtle/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-maritime-dark flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sustainability-green" />
              <span>B. Supplier & Fuel Information</span>
            </h3>
            <span className="text-[10px] text-slate-muted">Accredited Corridor Bunkering</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Supplier Name */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Fuel Supplier Name <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.supplierName}
                onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              >
                {DEMO_SUPPLIERS.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Supplier Ref / Transaction # */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Supplier Reference / Transaction # <span className="text-slate-muted font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.supplierRef || ''}
                onChange={(e) => setFormData({ ...formData, supplierRef: e.target.value })}
                placeholder="e.g. IOC-TXN-2026-904"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs font-mono outline-none bg-white focus:border-sustainability-green"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Fuel Type */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1 flex items-center gap-1">
                <Fuel className="w-3.5 h-3.5 text-sustainability-green" />
                <span>Fuel Type <span className="text-rose-500">*</span></span>
              </label>
              <select
                value={formData.fuelType}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              >
                {DEMO_FUELS.map((f) => (
                  <option key={f.id} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Quantity & Unit */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Fuel Quantity (Metric Tonnes) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={formData.quantityTonnes}
                  onChange={(e) =>
                    setFormData({ ...formData, quantityTonnes: parseFloat(e.target.value) || 0 })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none bg-white ${
                    errors.quantityTonnes
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-subtle/80 focus:border-sustainability-green'
                  }`}
                />
                <span className="absolute right-3 top-2.5 text-xs font-semibold text-slate-muted pointer-events-none">
                  tonnes
                </span>
              </div>
              {errors.quantityTonnes && (
                <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.quantityTonnes}</span>
                </p>
              )}
            </div>

            {/* Fuel Price per Tonne */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-sustainability-green" />
                <span>Fuel Price ($ USD/tonne)</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.fuelPricePerTonne || ''}
                onChange={(e) =>
                  setFormData({ ...formData, fuelPricePerTonne: parseFloat(e.target.value) || undefined })
                }
                placeholder="e.g. 780"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs font-mono outline-none bg-white focus:border-sustainability-green"
              />
            </div>
          </div>

          {/* Bunker Delivery Note # */}
          <div>
            <label className="block text-xs font-bold text-maritime-dark mb-1 flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-sustainability-green" />
              <span>Bunker Delivery Note (BDN) Number</span>
            </label>
            <input
              type="text"
              value={formData.bdnNumber || ''}
              onChange={(e) => setFormData({ ...formData, bdnNumber: e.target.value })}
              placeholder="e.g. BDN-IOC-2026-8812"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs font-mono outline-none bg-white focus:border-sustainability-green"
            />
          </div>
        </div>

        {/* Section C: Supporting Documents */}
        <div className="p-5 rounded-2xl bg-[#FAFCF9] border border-slate-subtle/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-maritime-dark flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-sustainability-green" />
              <span>C. Supporting Documents & Digital Proofs</span>
            </h3>
            <span className="text-[10px] text-slate-muted">PDF, PNG, JPEG up to 10 MB</span>
          </div>

          <DocumentUpload
            documents={documents}
            onAddDocument={handleAddDocument}
            onRemoveDocument={handleRemoveDocument}
          />
        </div>

        {/* Form Actions Footer */}
        <div className="pt-4 border-t border-slate-subtle/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-muted hover:text-maritime-dark hover:bg-slate-50 border border-transparent hover:border-slate-subtle transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSave(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-dark bg-white border border-slate-subtle/80 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>Save as Draft</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-sustainability-green/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit for Verification'}</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
