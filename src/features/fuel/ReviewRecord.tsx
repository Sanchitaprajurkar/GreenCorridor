import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  HelpCircle,
  XCircle,
  Send,
  ShieldCheck,
  AlertCircle,
  FileSearch,
} from 'lucide-react';
import type { FuelRecord, VerificationStatus } from '../../types/fuel';
import { runDataQualityChecks } from '../../utils/fuelCalculations';

interface ReviewRecordProps {
  record: FuelRecord;
  onUpdateStatus: (
    recordId: string,
    newStatus: VerificationStatus,
    comment: string,
    reviewerName: string
  ) => void;
  isReviewerMode?: boolean;
}

export const ReviewRecord: React.FC<ReviewRecordProps> = ({
  record,
  onUpdateStatus,
  isReviewerMode = true,
}) => {
  const [selectedAction, setSelectedAction] = useState<VerificationStatus | null>(null);
  const [reasonComment, setReasonComment] = useState('');
  const [reviewerName, setReviewerName] = useState('Port Authority Verifier (Demo Desk)');
  const [actionError, setActionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validation = record.validationResult || runDataQualityChecks(record);

  const requiresComment = (status: VerificationStatus) => {
    return (
      status === 'Flagged' ||
      status === 'Rejected' ||
      status === 'Additional Evidence Required'
    );
  };

  const handleExecuteAction = (status: VerificationStatus) => {
    setActionError(null);

    if (requiresComment(status) && !reasonComment.trim()) {
      setSelectedAction(status);
      setActionError(`A specific comment/reason is required when marking a record as "${status}".`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onUpdateStatus(
        record.id,
        status,
        reasonComment.trim() || `Decision: ${status} approved by ${reviewerName}.`,
        reviewerName
      );
      setIsSubmitting(false);
      setSelectedAction(null);
      setReasonComment('');
    }, 300);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-subtle/80 shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-subtle/70">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <FileSearch className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-display font-extrabold text-maritime-dark">
              Data-Quality Checklist & Review Workflow
            </h3>
            <p className="text-[11px] text-slate-muted">
              Deterministic verification checks and reviewer actions
            </p>
          </div>
        </div>

        {/* Assessment Badge */}
        <span
          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
            validation.overallAssessment === 'Passed data checks'
              ? 'bg-mint-soft text-sustainability-hover border-sustainability-green/40'
              : validation.overallAssessment === 'Potential discrepancy'
              ? 'bg-rose-50 text-rose-700 border-rose-300'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}
        >
          {validation.overallAssessment}
        </span>
      </div>

      {/* 6 Deterministic Data-Quality Checks */}
      <div className="space-y-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block">
          Automated Data Quality Assessment (Deterministic Rules):
        </span>

        <div className="divide-y divide-slate-subtle/60 rounded-xl border border-slate-subtle/80 bg-[#FAFCF9] overflow-hidden">
          {validation.checks.map((chk) => (
            <div key={chk.id} className="p-3 flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {chk.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-sustainability-green" />
                ) : chk.severity === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-maritime-dark">
                    {chk.label}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                      chk.passed
                        ? 'text-sustainability-hover bg-mint-pale'
                        : chk.severity === 'error'
                        ? 'text-rose-700 bg-rose-50'
                        : 'text-amber-800 bg-amber-50'
                    }`}
                  >
                    {chk.passed ? 'Passed' : chk.severity === 'error' ? 'Failed' : 'Needs Review'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-muted mt-0.5 leading-relaxed">
                  {chk.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Distinction Callout */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-subtle text-[11px] text-slate-muted">
        <strong>Credibility Standard:</strong> Automated checks evaluate syntax, volumetric bounds, and document presence. They do NOT establish the physical authenticity of the fuel. Verification requires authorized reviewer oversight.
      </div>

      {/* Reviewer Actions Panel */}
      {isReviewerMode ? (
        <div className="pt-4 border-t border-slate-subtle/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-maritime-dark flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sustainability-green" />
                <span>Authorized Reviewer Actions</span>
              </h4>
              <p className="text-[11px] text-slate-muted">
                Executing actions appends an immutable entry to the corridor verification history.
              </p>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-dark">
              <span className="text-slate-muted">Acting as:</span>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="px-2 py-1 rounded-lg border border-slate-subtle text-[11px] font-semibold text-maritime-navy bg-white outline-none"
              />
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {/* 1. Under Review */}
            <button
              type="button"
              onClick={() => {
                setSelectedAction('Under Review');
                setActionError(null);
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                selectedAction === 'Under Review'
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 mx-auto mb-1" />
              <span>Under Review</span>
            </button>

            {/* 2. Approve Verified */}
            <button
              type="button"
              onClick={() => {
                setSelectedAction('Verified');
                setActionError(null);
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                selectedAction === 'Verified'
                  ? 'bg-sustainability-green text-white border-sustainability-green shadow-sm'
                  : 'bg-mint-soft text-sustainability-hover border-sustainability-green/40 hover:bg-mint-pale'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mx-auto mb-1 text-sustainability-green" />
              <span>Verify Record</span>
            </button>

            {/* 3. Flag */}
            <button
              type="button"
              onClick={() => {
                setSelectedAction('Flagged');
                setActionError(null);
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                selectedAction === 'Flagged'
                  ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                  : 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 mx-auto mb-1 text-orange-600" />
              <span>Flag Issue</span>
            </button>

            {/* 4. Request Evidence */}
            <button
              type="button"
              onClick={() => {
                setSelectedAction('Additional Evidence Required');
                setActionError(null);
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                selectedAction === 'Additional Evidence Required'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 mx-auto mb-1 text-amber-600" />
              <span>Need Evidence</span>
            </button>

            {/* 5. Reject */}
            <button
              type="button"
              onClick={() => {
                setSelectedAction('Rejected');
                setActionError(null);
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                selectedAction === 'Rejected'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                  : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <XCircle className="w-3.5 h-3.5 mx-auto mb-1 text-rose-600" />
              <span>Reject</span>
            </button>
          </div>

          {/* Action details input box */}
          {selectedAction && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-subtle animate-fadeIn space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-maritime-dark">
                  Decision Rationale for: <strong className="text-maritime-navy">{selectedAction}</strong>
                </span>
                {requiresComment(selectedAction) && (
                  <span className="text-[10px] text-rose-600 font-semibold">
                    * Justification required
                  </span>
                )}
              </div>

              <textarea
                rows={2}
                value={reasonComment}
                onChange={(e) => setReasonComment(e.target.value)}
                placeholder={
                  selectedAction === 'Flagged'
                    ? 'State the discrepancy details (e.g. Mass-flow meter mismatch or BDN volume variance)...'
                    : selectedAction === 'Rejected'
                    ? 'State the official rejection reason (e.g. Expired ISCC cert, uncertified supplier)...'
                    : selectedAction === 'Additional Evidence Required'
                    ? 'List specific missing documents needed from the bunkering entity...'
                    : 'Add optional auditor notes or notarization hash details...'
                }
                className="w-full p-2.5 rounded-lg border border-slate-subtle text-xs outline-none bg-white focus:border-sustainability-green"
              />

              {actionError && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  <span>{actionError}</span>
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAction(null);
                    setActionError(null);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-muted hover:bg-slate-200/60"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleExecuteAction(selectedAction)}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-maritime-navy hover:bg-maritime-dark flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Recording...' : `Confirm ${selectedAction}`}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-subtle text-xs text-slate-muted">
          Review actions are locked in Submitter View. Switch to <strong>Reviewer Mode</strong> in the page header to simulate port auditor verification decisions.
        </div>
      )}
    </div>
  );
};
