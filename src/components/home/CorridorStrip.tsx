import React from 'react';
import { MapPin, Globe, Shield } from 'lucide-react';

export const CorridorStrip: React.FC = () => {
  return (
    <section className="bg-ocean-subtle/70 border-b border-ocean-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Label */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-text/90 flex items-center justify-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sustainability-green" />
            <span>CROSS-BORDER MARITIME CORRIDOR ARCHITECTURE</span>
          </span>
        </div>

        {/* 3 Nodes with Connecting Path */}
        <div className="relative">
          {/* Subtle dotted connector line behind nodes (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] -translate-y-1/2 h-0.5 border-t-2 border-dashed border-ocean-accent/70 -z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            {/* Element 1: INDIA */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-ocean-border shadow-subtle flex flex-col items-center md:items-start text-center md:text-left transition-all hover:border-sustainability-green/60 hover:shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-sustainability-light border border-sustainability-green/40 flex items-center justify-center text-sustainability-green font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-sustainability-green uppercase tracking-wider block">
                    ORIGIN ECOSYSTEM
                  </span>
                  <h2 className="text-base font-bold text-maritime-dark tracking-tight">
                    INDIA
                  </h2>
                </div>
              </div>
              <p className="text-xs text-slate-text leading-relaxed">
                Origin-side stakeholder ecosystem including Jawaharlal Nehru Port (JNPA), Chennai Port, bunkering terminals, and export shipping operators.
              </p>
              <div className="mt-3 pt-2.5 border-t border-slate-subtle/40 w-full flex items-center justify-between text-[11px] text-slate-muted">
                <span>Voyage Registration & BDN</span>
                <span className="font-semibold text-sustainability-green">West & East Coasts</span>
              </div>
            </div>

            {/* Element 2: CONNECTED CORRIDOR */}
            <div className="bg-maritime-navy text-warm-white rounded-xl p-5 border border-maritime-border shadow-card flex flex-col items-center md:items-start text-center md:text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sustainability-green/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-maritime-surface border border-sustainability-green/60 flex items-center justify-center text-sustainability-green">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-mint-soft uppercase tracking-wider block">
                    SHARED INTELLIGENCE
                  </span>
                  <h2 className="text-base font-bold text-warm-white tracking-tight flex items-center gap-1.5">
                    <span>CONNECTED CORRIDOR</span>
                  </h2>
                </div>
              </div>
              <p className="text-xs text-slate-subtle leading-relaxed">
                Shared maritime intelligence, auditable fuel verification ledger, and transparent emissions accounting accessible to all authorized participants.
              </p>
              <div className="mt-3 pt-2.5 border-t border-maritime-border/80 w-full flex items-center justify-between text-[11px] text-slate-subtle">
                <span className="flex items-center gap-1 text-mint-soft font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-sustainability-green animate-pulse"></span>
                  Single Voyage Identity
                </span>
                <span className="text-warm-white font-mono text-[10px]">IN ⇄ SG LEDGER</span>
              </div>
            </div>

            {/* Element 3: SINGAPORE */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-ocean-border shadow-subtle flex flex-col items-center md:items-start text-center md:text-left transition-all hover:border-sustainability-green/60 hover:shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-ocean-blue border border-ocean-accent/60 flex items-center justify-center text-maritime-navy font-bold text-sm">
                  <MapPin className="w-4 h-4 text-maritime-navy" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-text uppercase tracking-wider block">
                    DESTINATION ECOSYSTEM
                  </span>
                  <h2 className="text-base font-bold text-maritime-dark tracking-tight">
                    SINGAPORE
                  </h2>
                </div>
              </div>
              <p className="text-xs text-slate-text leading-relaxed">
                Destination-side stakeholder ecosystem including Port of Singapore (PSA / Jurong), bunker testing authorities, and maritime regulatory bodies.
              </p>
              <div className="mt-3 pt-2.5 border-t border-slate-subtle/40 w-full flex items-center justify-between text-[11px] text-slate-muted">
                <span>JIT Berthing & Incentives</span>
                <span className="font-semibold text-maritime-navy">Global Bunker Hub</span>
              </div>
            </div>

          </div>
        </div>

        {/* Small Caption */}
        <div className="mt-4 text-center">
          <p className="text-[11px] text-slate-muted">
            Conceptual bilateral operational corridor — linking verified voyage data with port operations and green incentive decisions.
          </p>
        </div>

      </div>
    </section>
  );
};
