import React from 'react';
import { ModuleCard } from './ModuleCard';
import { MODULE_ITEMS } from '../../data/homeData';
import { Layers, ArrowRightLeft, Users } from 'lucide-react';

interface ModuleGridProps {
  onModuleSelect?: (moduleId: string) => void;
}

export const ModuleGrid: React.FC<ModuleGridProps> = ({ onModuleSelect }) => {
  return (
    <section id="platform" className="py-20 lg:py-28 bg-[#FAFBF8] border-y border-[#E8ECE7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Humanized Copywriting */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2F8F68] bg-[#EAF7EE] px-4 py-1.5 rounded-full border border-[#A7DCBF]/60 inline-flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#2F8F68]" />
            <span>FOUR SIMPLE TOOLS DESIGNED FOR THE PEOPLE MOVING GLOBAL TRADE</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#102D3A] tracking-tight">
            Designed for the Hands and Minds at the Helm.
          </h2>
          <p className="text-base sm:text-lg text-[#52616A] leading-relaxed font-normal">
            Whether you are calculating bunker burn on the bridge, signing off mass-flow receipts at the jetty, or scheduling quay cranes in Singapore — each tool cuts cognitive load and shares verified data.
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
        <div className="mt-12 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#EAF7EE] via-white to-[#E2EFF8] border border-[#A7DCBF]/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#102D3A] text-white flex items-center justify-center shrink-0 shadow-md">
              <Layers className="w-7 h-7 text-[#2F8F68]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-[#102D3A] uppercase tracking-wider">
                  Shared Corridor Voyage Identity
                </h4>
                <span className="text-[10px] bg-[#2F8F68]/20 text-[#2F8F68] font-bold px-2.5 py-0.5 rounded-full">
                  Zero Data Fragmentation
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#52616A] mt-1">
                Verified fuel quantities in <strong className="text-[#102D3A]">FuelTrust</strong> flow automatically into <strong className="text-[#102D3A]">SmartDock</strong> port coordination and <strong className="text-[#102D3A]">GreenPulse</strong> CII analytics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#102D3A] bg-white px-4 py-2.5 rounded-xl border border-[#CBD5E1] shrink-0 shadow-sm">
            <ArrowRightLeft className="w-4 h-4 text-[#2F8F68]" />
            <span>Auditable Voyage Record #VR-2026-SG</span>
          </div>
        </div>

      </div>
    </section>
  );
};
