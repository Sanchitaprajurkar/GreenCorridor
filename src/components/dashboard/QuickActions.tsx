import React from 'react';
import { PlusCircle, FileUp, CheckSquare, FileText, ArrowRight } from 'lucide-react';

interface QuickActionsProps {
  onRegisterVoyage: () => void;
  onSubmitFuel: () => void;
  onReviewQueue: () => void;
  onGenerateReport: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onRegisterVoyage,
  onSubmitFuel,
  onReviewQueue,
  onGenerateReport,
}) => {
  const actions = [
    {
      title: 'Register New Voyage',
      desc: 'Add ship, route, and cargo baseline',
      icon: PlusCircle,
      action: onRegisterVoyage,
      color: 'text-sustainability-green bg-sustainability-light border-sustainability-green/30',
    },
    {
      title: 'Submit Fuel Record',
      desc: 'Upload BDN & Mass-Balance proof',
      icon: FileUp,
      action: onSubmitFuel,
      color: 'text-sky-700 bg-ocean-blue border-ocean-border',
    },
    {
      title: 'Review Verification Queue',
      desc: 'Audit pending fuel certificates',
      icon: CheckSquare,
      action: onReviewQueue,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      title: 'Generate Sustainability Report',
      desc: 'Export IMO CII & Port Rebate dossier',
      icon: FileText,
      action: onGenerateReport,
      color: 'text-emerald-700 bg-mint-pale border-mint-border',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-subtle/80 shadow-subtle mb-8">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-subtle/60">
        <div>
          <h2 className="text-base font-display font-bold text-maritime-dark">
            Quick Operations Actions
          </h2>
          <p className="text-xs text-slate-muted">
            Direct shortcuts for port officers, shipping managers, and bunkering coordinators
          </p>
        </div>
        <span className="text-[10px] font-mono text-slate-muted bg-slate-100 px-2.5 py-1 rounded-md">
          Role: Operations Ready
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {actions.map((act) => {
          const ActIcon = act.icon;
          return (
            <button
              key={act.title}
              onClick={act.action}
              type="button"
              className="p-4 rounded-xl border border-slate-subtle/80 hover:border-sustainability-green/60 hover:shadow-card bg-warm-white/70 hover:bg-white text-left transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 shadow-sm ${act.color}`}>
                  <ActIcon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sustainability-green group-hover:translate-x-0.5 transition-all" />
              </div>

              <div>
                <h3 className="text-xs font-bold text-maritime-dark group-hover:text-maritime-navy">
                  {act.title}
                </h3>
                <p className="text-[11px] text-slate-muted mt-0.5 leading-snug">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
