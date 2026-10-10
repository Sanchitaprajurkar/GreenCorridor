import React from 'react';
import {
  History,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  FileCheck2,
  Lock,
} from 'lucide-react';
import type { VerificationHistoryEntry } from '../../types/fuel';
import { StatusBadge } from '../../components/dashboard/StatusBadge';

interface VerificationHistoryProps {
  history: VerificationHistoryEntry[];
  recordId?: string;
  className?: string;
}

export const VerificationHistory: React.FC<VerificationHistoryProps> = ({
  history,
  recordId,
  className = '',
}) => {
  const sorted = [...history].reverse(); // newest first

  const getActionIcon = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes('verified')) {
      return <CheckCircle2 className="w-3.5 h-3.5 text-sustainability-green" />;
    }
    if (act.includes('flagged') || act.includes('rejected')) {
      return <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />;
    }
    if (act.includes('review')) {
      return <FileCheck2 className="w-3.5 h-3.5 text-sky-600" />;
    }
    return <Clock className="w-3.5 h-3.5 text-slate-500" />;
  };

  return (
    <div className={`bg-white rounded-2xl p-5 border border-slate-subtle/80 shadow-card ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-subtle/70">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-display font-extrabold text-maritime-dark">
              Verification History & Audit Trail
            </h3>
            {recordId && (
              <span className="text-[10px] font-mono text-slate-muted">
                Audit Record: {recordId}
              </span>
            )}
          </div>
        </div>

        <span className="text-[10px] font-bold text-slate-muted bg-slate-100 px-2 py-0.5 rounded-full">
          {history.length} Event{history.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="text-center py-6 text-slate-muted text-xs">
          No verification events logged yet for this record.
        </div>
      ) : (
        /* Timeline */
        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {sorted.map((entry) => (
            <div key={entry.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border border-slate-subtle flex items-center justify-center shadow-xs">
                {getActionIcon(entry.action)}
              </div>

              {/* Event Content */}
              <div className="bg-[#FAFBF8] p-3 rounded-xl border border-slate-subtle/70 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-maritime-dark">{entry.action}</span>
                  <span className="text-[10px] font-mono text-slate-muted">{entry.timestamp}</span>
                </div>

                {/* Status Transition */}
                <div className="flex items-center gap-1.5 my-1.5 flex-wrap">
                  {entry.previousStatus && (
                    <>
                      <StatusBadge status={entry.previousStatus} size="sm" />
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </>
                  )}
                  <StatusBadge status={entry.newStatus} size="sm" />
                </div>

                {/* Actor */}
                <div className="text-[11px] text-slate-text mt-1">
                  <span className="text-slate-muted font-medium">Actor: </span>
                  <strong className="text-maritime-navy">{entry.actor}</strong>
                </div>

                {/* Comment / Reason */}
                {entry.comment && (
                  <div className="mt-1.5 p-2 rounded-lg bg-white border border-slate-subtle text-[11px] text-slate-text italic">
                    "{entry.comment}"
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Production Notice */}
      <div className="mt-5 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 text-[11px] text-indigo-900 flex items-start gap-2">
        <Lock className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Production Audit Notice:</strong> Audit entries are maintained in an append-only sequence. Production grade corridor integrity employs bilateral cryptographic ledger tokens to prevent silent overwriting of previous verifier findings.
        </p>
      </div>
    </div>
  );
};
