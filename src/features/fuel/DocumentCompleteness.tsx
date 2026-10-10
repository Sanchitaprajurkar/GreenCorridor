import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import type { FuelRecord, DocumentReviewStatus } from '../../types/fuel';
import { evaluateDocumentCompleteness } from '../../utils/fuelCalculations';

interface DocumentCompletenessProps {
  record: Partial<FuelRecord>;
  className?: string;
}

export const DocumentCompleteness: React.FC<DocumentCompletenessProps> = ({
  record,
  className = '',
}) => {
  const summary = evaluateDocumentCompleteness(record);

  const getStatusBadge = (status: DocumentReviewStatus) => {
    switch (status) {
      case 'Accepted by Reviewer':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sustainability-hover bg-mint-soft px-2.5 py-0.5 rounded-full border border-sustainability-green/30">
            <CheckCircle2 className="w-3 h-3 text-sustainability-green" />
            <span>Accepted</span>
          </span>
        );
      case 'Attached':
      case 'Awaiting Review':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>{status === 'Attached' ? 'Attached (Pending)' : 'Awaiting Review'}</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-300">
            <AlertCircle className="w-3 h-3 text-rose-600" />
            <span>Rejected</span>
          </span>
        );
      case 'Missing':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            <AlertCircle className="w-3 h-3 text-slate-400" />
            <span>Missing</span>
          </span>
        );
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-slate-subtle/80 shadow-card ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-subtle/70">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-mint-soft flex items-center justify-center text-sustainability-green">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-display font-extrabold text-maritime-dark">
              Document Completeness
            </h3>
            <p className="text-[11px] text-slate-muted">
              Corridor bilateral audit evidence requirement
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-maritime-navy">
            {summary.percentage}% Complete
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            summary.percentage === 100
              ? 'bg-sustainability-green'
              : summary.percentage >= 50
              ? 'bg-amber-500'
              : 'bg-rose-500'
          }`}
          style={{ width: `${summary.percentage}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {/* Item 1: Bunker Delivery Note */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBF8] border border-slate-subtle/70">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-sky-700" />
            <div>
              <span className="text-xs font-bold text-maritime-dark block">
                Bunker Delivery Note (BDN)
              </span>
              <span className="text-[10px] text-slate-muted">
                Mandatory MARPOL Annex VI physical or electronic receipt
              </span>
            </div>
          </div>
          <div>{getStatusBadge(summary.bdnStatus)}</div>
        </div>

        {/* Item 2: Fuel Quality / Sustainability Certificate */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBF8] border border-slate-subtle/70">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-emerald-700" />
            <div>
              <span className="text-xs font-bold text-maritime-dark block">
                Fuel Quality or Sustainability Certificate
              </span>
              <span className="text-[10px] text-slate-muted">
                ISCC EU / RED II certificate or accredited flashpoint lab report
              </span>
            </div>
          </div>
          <div>{getStatusBadge(summary.certificateStatus)}</div>
        </div>

        {/* Item 3: Supplier Declaration */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBF8] border border-slate-subtle/70">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-purple-700" />
            <div>
              <span className="text-xs font-bold text-maritime-dark block">
                Supplier Declaration & Provenance
              </span>
              <span className="text-[10px] text-slate-muted">
                Mass-balance batch chain-of-custody affidavit
              </span>
            </div>
          </div>
          <div>{getStatusBadge(summary.declarationStatus)}</div>
        </div>
      </div>

      {/* Footnote Credibility Notice */}
      <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-subtle text-[11px] text-slate-muted flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Auditor Notice:</strong> Completeness indicates attachment status. Document authenticity, supplier accreditation, and isotopic provenance require authorized human review or bilateral ledger notarization.
        </p>
      </div>
    </div>
  );
};
