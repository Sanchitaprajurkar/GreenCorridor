import React, { useState } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, AlertTriangle, FileCheck, Download } from 'lucide-react';
import type { FuelRecord } from '../../types/fuel';
import { StatusBadge } from './StatusBadge';

interface FuelRecordModalProps {
  record: FuelRecord | null;
  onClose: () => void;
  onUpdateStatus?: (recordId: string, newStatus: 'Verified' | 'Flagged') => void;
}

export const FuelRecordModal: React.FC<FuelRecordModalProps> = ({
  record,
  onClose,
  onUpdateStatus,
}) => {
  const [actionDone, setActionDone] = useState<string | null>(null);

  if (!record) return null;

  const handleAction = (status: 'Verified' | 'Flagged') => {
    if (onUpdateStatus) {
      onUpdateStatus(record.id, status);
    }
    setActionDone(`Record marked as ${status}.`);
    setTimeout(() => {
      setActionDone(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maritime-dark/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-subtle/80 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-muted hover:text-maritime-dark hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-mint-soft border border-mint-border flex items-center justify-center text-sustainability-green shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-slate-muted bg-slate-100 px-2 py-0.5 rounded">
                {record.id}
              </span>
              <StatusBadge status={record.verificationStatus} />
            </div>
            <h3 className="text-xl font-display font-extrabold text-maritime-dark tracking-tight">
              Fuel Verification Dossier
            </h3>
            <span className="text-xs text-slate-muted">
              Voyage: <strong className="text-maritime-navy">{record.voyageId}</strong> ({record.vesselName})
            </span>
          </div>
        </div>

        {/* Bunker Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 bg-[#FAFBF8] p-4 rounded-2xl border border-slate-subtle/80">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-0.5">
              Fuel Type
            </span>
            <span className="text-xs font-extrabold text-maritime-dark">
              {record.fuelType}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-0.5">
              Delivered Quantity
            </span>
            <span className="text-xs font-mono font-extrabold text-sustainability-green">
              {record.quantityTonnes} tonnes
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-0.5">
              Bunker Port & Pier
            </span>
            <span className="text-xs font-bold text-slate-dark">
              {record.bunkerPort}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-0.5">
              Fuel Supplier
            </span>
            <span className="text-xs font-bold text-slate-dark">
              {record.supplierName}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-0.5">
              Bunker Delivery Note (BDN)
            </span>
            <span className="text-xs font-mono font-bold text-maritime-navy">
              {record.bdnNumber}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-0.5">
              Well-to-Wake CO₂ Factor
            </span>
            <span className="text-xs font-mono font-bold text-slate-dark">
              {record.co2Factor} tCO₂/tFuel
            </span>
          </div>
        </div>

        {/* Discrepancy / Flag Notice if any */}
        {record.flagReason && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Verification Variance Detected:</span>
              <span>{record.flagReason}</span>
            </div>
          </div>
        )}

        {/* Evidence Documents List */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-maritime-dark mb-2.5 flex items-center justify-between">
            <span>Supporting Digital Evidence ({record.evidenceDocuments?.length || 0})</span>
            <span className="text-[10px] text-slate-muted font-normal">Corridor Hash Chain</span>
          </h4>
          <div className="space-y-2">
            {(record.evidenceDocuments || []).map((doc, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white border border-slate-subtle/80 flex items-center justify-between hover:bg-slate-50 transition-colors text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="font-medium text-maritime-dark block">
                      {doc.name}
                    </span>
                    <span className="text-[10px] text-slate-muted">
                      {doc.type} • {doc.size}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {doc.verified ? (
                    <span className="text-[10px] font-bold text-sustainability-green bg-mint-pale px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      Pending Audit
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => alert(`Downloaded file ${doc.name}`)}
                    className="p-1 rounded text-slate-400 hover:text-maritime-dark"
                    title="Download document"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cryptographic Ledger Info */}
        <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-subtle text-[11px] font-mono text-slate-muted flex items-center justify-between">
          <span>Corridor Blockchain Fingerprint:</span>
          <span className="text-maritime-navy font-bold">
            {record.certificateHash || '0x49e...b27f (Pending Hash)'}
          </span>
        </div>

        {/* Action Buttons */}
        {actionDone ? (
          <div className="p-3 rounded-xl bg-mint-soft text-sustainability-hover text-xs font-semibold text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionDone}</span>
          </div>
        ) : (
          <div className="pt-3 border-t border-slate-subtle/80 flex items-center justify-between gap-3">
            <button
              onClick={() => handleAction('Flagged')}
              type="button"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              Flag Inconsistency
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 text-xs font-semibold text-slate-muted hover:text-maritime-dark"
              >
                Close
              </button>
              <button
                onClick={() => handleAction('Verified')}
                type="button"
                className="px-4 py-2 rounded-xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md shadow-sustainability-green/20"
              >
                <FileCheck className="w-4 h-4" />
                <span>Verify & Approve BDN</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
