import React from 'react';
import { ModuleCard } from './ModuleCard';
import { MODULE_ITEMS } from '../../data/homeData';
import { Layers, ArrowRightLeft } from 'lucide-react';

interface ModuleGridProps {
  onModuleSelect?: (moduleId: string) => void;
}

export const ModuleGrid: React.FC<ModuleGridProps> = ({ onModuleSelect }) => {
  return (
    <section id="platform" className="py-20 lg:py-28 bg-white border-y border-slate-subtle/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-sustainability-green bg-mint-pale px-3 py-1 rounded-full border border-mint-border inline-block">
            ONE PLATFORM. FOUR CONNECTED CAPABILITIES.
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-maritime-dark tracking-tight">
            From Voyage Planning to Verified Sustainability.
          </h2>
          <p className="text-base sm:text-lg text-slate-text leading-relaxed font-normal">
            Each module solves a specific maritime challenge while sharing information with the rest of the ecosystem through a common voyage record.
          </p>
        </div>

        {/* 4 Modules Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODULE_ITEMS.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onExplore={onModuleSelect}
            />
          ))}
        </div>

        {/* Central Record Unification Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-ocean-subtle via-mint-pale/50 to-ocean-subtle border border-ocean-border/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-subtle">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-maritime-navy text-warm-white flex items-center justify-center shrink-0 shadow-sm">
              <Layers className="w-6 h-6 text-sustainability-green" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-maritime-dark uppercase tracking-wider">
                  Shared Corridor Voyage Identity
                </h4>
                <span className="text-[10px] bg-sustainability-green/20 text-sustainability-green font-bold px-2 py-0.5 rounded-full">
                  Zero Data Fragmentation
                </span>
              </div>
              <p className="text-xs text-slate-text mt-0.5">
                Verified fuel quantities in <strong className="text-maritime-navy">FuelTrust</strong> flow automatically into <strong className="text-maritime-navy">SmartDock</strong> port coordination and <strong className="text-maritime-navy">GreenPulse</strong> CII analytics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-maritime-navy bg-white px-4 py-2 rounded-xl border border-slate-subtle/80 shrink-0">
            <ArrowRightLeft className="w-4 h-4 text-sustainability-green" />
            <span>Auditable Voyage Record #VR-2026</span>
          </div>
        </div>

      </div>
    </section>
  );
};
