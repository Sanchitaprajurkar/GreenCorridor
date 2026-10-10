import React from 'react';
import { AlertTriangle, Info, ArrowRight, Clock, ShieldAlert } from 'lucide-react';
import type { DashboardAlert } from '../../types/dashboard';

interface AlertsPanelProps {
  alerts: DashboardAlert[];
  onActionClick: (alert: DashboardAlert) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, onActionClick }) => {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: ShieldAlert,
          bg: 'bg-rose-50 border-rose-200 text-rose-700',
          badgeText: 'Critical Flag',
          btnBg: 'bg-rose-600 hover:bg-rose-700 text-white',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          badgeText: 'Action Required',
          btnBg: 'bg-amber-700 hover:bg-amber-800 text-white',
        };
      case 'info':
      default:
        return {
          icon: Info,
          bg: 'bg-sky-50 border-sky-200 text-sky-800',
          badgeText: 'Port Notice',
          btnBg: 'bg-sky-700 hover:bg-sky-800 text-white',
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-subtle/80 shadow-subtle flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-subtle/60">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-display font-bold text-maritime-dark">
              Needs Attention
            </h2>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </div>
          <span className="text-xs text-slate-muted font-medium">
            {alerts.length} Pending Flags
          </span>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {alerts.map((alert) => {
            const config = getSeverityBadge(alert.severity);
            const SeverityIcon = config.icon;

            return (
              <div
                key={alert.id}
                className={`p-3.5 rounded-xl border transition-all ${config.bg} flex flex-col justify-between gap-2.5`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border border-current flex items-center gap-1">
                      <SeverityIcon className="w-3 h-3" />
                      <span>{config.badgeText}</span>
                    </span>
                    <span className="text-[10px] text-slate-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-maritime-dark mt-1">
                    {alert.title}
                  </h3>
                  <p className="text-[11px] text-slate-text mt-0.5 leading-relaxed">
                    {alert.explanation}
                  </p>
                </div>

                <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-semibold text-slate-muted">
                    Module: <strong className="text-maritime-navy">{alert.relatedModule}</strong>
                  </span>
                  <button
                    onClick={() => onActionClick(alert)}
                    type="button"
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white text-maritime-dark border border-slate-subtle/80 hover:bg-slate-50 transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>{alert.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mock notice */}
      <div className="mt-4 pt-3 border-t border-slate-subtle/50 text-center">
        <span className="text-[10px] text-slate-muted">
          Illustrative operational notifications — configured for India-Singapore demo testbed
        </span>
      </div>

    </div>
  );
};
