import React from 'react';
import { Link2, TrendingUp, Award, Users, Database } from 'lucide-react';
import { NOVELTY_FEATURES } from '../../data/homeData';

export const NoveltySection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'link':
        return <Link2 className="w-5 h-5 text-sustainability-green" />;
      case 'trendingUp':
        return <TrendingUp className="w-5 h-5 text-sky-600" />;
      case 'award':
        return <Award className="w-5 h-5 text-amber-600" />;
      case 'users':
        return <Users className="w-5 h-5 text-indigo-600" />;
      default:
        return <Link2 className="w-5 h-5 text-sustainability-green" />;
    }
  };

  return (
    <section id="novelty" className="py-20 lg:py-28 bg-maritime-dark text-warm-white relative overflow-hidden">
      {/* Subtle background grid & glow */}
      <div className="absolute inset-0 bg-corridor-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-sustainability-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-ocean-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-sustainability-green bg-maritime-surface px-3 py-1 rounded-full border border-sustainability-green/40 inline-block">
            WHAT MAKES US DIFFERENT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-warm-white tracking-tight">
            Built for Corridor-Level Trust, Not Isolated Dashboards.
          </h2>
          <p className="text-base sm:text-lg text-slate-subtle leading-relaxed font-normal">
            Most maritime solutions exist as siloed tools for a single ship or carrier. Green Corridor connects the entire chain of custody across international jurisdictions.
          </p>
        </div>

        {/* Two-Column Layout: Visual Architecture Diagram + 4 Novelty Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interconnected Architecture Graphic (5 cols) */}
          <div className="lg:col-span-5 bg-maritime-navy/80 rounded-2xl p-6 lg:p-8 border border-maritime-border shadow-elevated relative">
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-mint-soft block">
                CORRIDOR DATA TOPOLOGY
              </span>
              <h3 className="text-lg font-bold text-warm-white">
                Single Ledger Architecture
              </h3>
            </div>

            {/* Central Node Graphic */}
            <div className="relative flex items-center justify-center py-6">
              {/* Outer Pulse Ring */}
              <div className="w-56 h-56 rounded-full border border-sustainability-green/20 animate-spin-slow absolute pointer-events-none" />
              <div className="w-40 h-40 rounded-full border border-ocean-blue/30 absolute pointer-events-none" />
              
              {/* Center Core Node */}
              <div className="relative z-10 w-28 h-28 rounded-2xl bg-gradient-to-br from-maritime-surface to-maritime-dark border-2 border-sustainability-green shadow-glow-green flex flex-col items-center justify-center p-2 text-center">
                <Database className="w-6 h-6 text-sustainability-green mb-1" />
                <span className="text-[10px] font-extrabold text-warm-white uppercase tracking-wider">
                  SHARED
                </span>
                <span className="text-[9px] text-mint-soft font-semibold">
                  VOYAGE RECORD
                </span>
              </div>

              {/* 4 Surrounding Satellite Modules */}
              {/* Top: GreenTwin */}
              <div className="absolute -top-2 bg-maritime-surface px-3 py-1.5 rounded-lg border border-maritime-border text-[10px] font-bold text-warm-white flex items-center gap-1 shadow-md">
                <span className="w-2 h-2 rounded-full bg-sustainability-green"></span>
                <span>GreenTwin (Route)</span>
              </div>
              {/* Right: FuelTrust */}
              <div className="absolute -right-2 bg-maritime-surface px-3 py-1.5 rounded-lg border border-maritime-border text-[10px] font-bold text-warm-white flex items-center gap-1 shadow-md">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span>FuelTrust (BDN)</span>
              </div>
              {/* Bottom: SmartDock */}
              <div className="absolute -bottom-2 bg-maritime-surface px-3 py-1.5 rounded-lg border border-maritime-border text-[10px] font-bold text-warm-white flex items-center gap-1 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>SmartDock (Berth)</span>
              </div>
              {/* Left: GreenPulse */}
              <div className="absolute -left-2 bg-maritime-surface px-3 py-1.5 rounded-lg border border-maritime-border text-[10px] font-bold text-warm-white flex items-center gap-1 shadow-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>GreenPulse (CII)</span>
              </div>
            </div>

            {/* Architecture Explanatory text */}
            <div className="mt-6 pt-4 border-t border-maritime-border/80 text-center">
              <p className="text-xs text-slate-muted leading-relaxed">
                Immutable evidence chaining prevents double-counting and ensures data consistency across fuel suppliers, shipping lines, and port berths.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Novelty Cards Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {NOVELTY_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="bg-maritime-navy/60 hover:bg-maritime-navy border border-maritime-border/80 hover:border-sustainability-green/50 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-maritime-surface border border-maritime-border flex items-center justify-center">
                      {getIcon(feat.iconName)}
                    </div>
                    <span className="text-[10px] font-bold text-sustainability-green bg-sustainability-green/10 px-2 py-0.5 rounded-full">
                      {feat.tag}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-muted uppercase tracking-wider block mb-0.5">
                    {feat.subtitle}
                  </span>
                  <h4 className="text-base font-display font-bold text-warm-white mb-2 group-hover:text-mint-soft transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-subtle leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Compliance & Independence Note */}
        <div className="mt-12 text-center">
          <p className="text-[11px] text-slate-muted max-w-2xl mx-auto">
            Developed as an open digital architectural model for green maritime corridors. Integrations reflect standard maritime protocols (IMO DSC, Port CDM, BDN formats) rather than proprietary locks.
          </p>
        </div>

      </div>
    </section>
  );
};
