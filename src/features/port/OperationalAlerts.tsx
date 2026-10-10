import React from 'react';
import { AlertTriangle, ArrowRight, Ship } from 'lucide-react';
import type { OperationalAlert } from '../../types/port';

interface OperationalAlertsProps {
  alerts: OperationalAlert[];
  onActionClick?: (alert: OperationalAlert) => void;
}

export const OperationalAlerts: React.FC<OperationalAlertsProps> = ({
  alerts,
  onActionClick,
}) => {
  if (alerts.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-subtle/80 shadow-subtle space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-subtle/70">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-display font-extrabold text-maritime-dark">
              Operational Alerts & Exceptions
            </h3>
            <p className="text-[11px] text-slate-muted">
              Active schedule variances, pending fuel verifications, and arrival delays
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
          {alerts.length} Alert{alerts.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {alerts.map((alt) => {
          const isHigh = alt.severity === 'high';
          const isFuelPending = alt.category === 'fuel_pending';

          return (
            <div
              key={alt.id}
              className={`p-3.5 rounded-2xl border flex flex-col justify-between text-xs transition-colors ${
                isHigh
                  ? 'border-rose-200 bg-rose-50/40 hover:bg-rose-50/70'
                  : 'border-slate-subtle bg-[#FAFCF9] hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span
                    className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isHigh
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : isFuelPending
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {alt.severity} Priority
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{alt.timestamp}</span>
                </div>

                <h4 className="font-bold text-maritime-dark text-xs mb-1">
                  {alt.title}
                </h4>

                <p className="text-[11px] text-slate-muted leading-relaxed mb-2">
                  {alt.description}
                </p>

                {alt.vesselName && (
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-text font-medium mb-3">
                    <Ship className="w-3 h-3 text-slate-400" />
                    <span>{alt.vesselName}</span>
                    {alt.voyageId && <span className="font-mono text-slate-400">({alt.voyageId})</span>}
                  </div>
                )}
              </div>

              {alt.actionLabel && (
                <div className="pt-2 border-t border-slate-subtle/50 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => onActionClick && onActionClick(alt)}
                    className="text-[11px] font-bold text-sustainability-green hover:underline flex items-center gap-1"
                  >
                    <span>{alt.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
