import React from 'react';
import { Ship, Fuel, Anchor, Landmark, Lock, CheckCircle2 } from 'lucide-react';
import { STAKEHOLDERS } from '../../data/homeData';

interface StakeholdersSectionProps {
  onSelectRole?: (role: string) => void;
}

export const StakeholdersSection: React.FC<StakeholdersSectionProps> = ({ onSelectRole }) => {
  const getStakeholderIcon = (iconName: string) => {
    switch (iconName) {
      case 'ship':
        return <Ship className="w-6 h-6 text-sustainability-green" />;
      case 'fuel':
        return <Fuel className="w-6 h-6 text-sky-700" />;
      case 'anchor':
        return <Anchor className="w-6 h-6 text-emerald-700" />;
      case 'landmark':
        return <Landmark className="w-6 h-6 text-maritime-navy" />;
      default:
        return <Ship className="w-6 h-6 text-sustainability-green" />;
    }
  };

  return (
    <section id="stakeholders" className="py-20 lg:py-28 bg-white border-t border-slate-subtle/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-sustainability-green bg-mint-pale px-3 py-1 rounded-full border border-mint-border inline-block">
            ONE CONNECTED ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-maritime-dark tracking-tight">
            Designed for Every Stakeholder in the Voyage.
          </h2>
          <p className="text-base sm:text-lg text-slate-text leading-relaxed font-normal">
            Role-based governance guarantees data sovereignty: each participant interacts with an auditable workspace tailored to their legal mandate and operational duties.
          </p>
        </div>

        {/* 4 Stakeholder Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAKEHOLDERS.map((stk) => (
            <div
              key={stk.role}
              className="bg-warm-white/70 hover:bg-white rounded-2xl p-6 border border-slate-subtle/80 hover:border-sustainability-green/60 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-subtle flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    {getStakeholderIcon(stk.iconName)}
                  </div>
                  <span className="text-[10px] font-bold text-slate-muted uppercase tracking-wider bg-white px-2 py-1 rounded border border-slate-subtle/60">
                    {stk.category}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="text-lg font-display font-bold text-maritime-dark mb-2 group-hover:text-maritime-navy transition-colors">
                  {stk.role}
                </h3>

                <p className="text-xs text-slate-text leading-relaxed mb-4">
                  {stk.description}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-bold text-slate-muted uppercase tracking-wider block">
                    Core Workflows:
                  </span>
                  {stk.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-dark">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sustainability-green shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Privacy / Access Scope Badge */}
              <div className="pt-4 border-t border-slate-subtle/60">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-muted">
                  <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate" title={stk.accessScope}>
                    {stk.accessScope}
                  </span>
                </div>
                
                <button
                  onClick={() => onSelectRole ? onSelectRole(stk.role) : null}
                  type="button"
                  className="mt-3 w-full py-1.5 px-3 rounded-lg text-[11px] font-bold text-maritime-navy bg-white hover:bg-mint-pale border border-slate-subtle/80 transition-colors text-center"
                >
                  View Portal Scope
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Access Rule Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-muted max-w-xl mx-auto flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 text-sustainability-green" />
            <span>Commercial fuel pricing and proprietary cargo manifests remain strictly confidential to authorized parties.</span>
          </p>
        </div>

      </div>
    </section>
  );
};
