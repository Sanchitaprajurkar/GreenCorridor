import React from 'react';
import { RouteCard } from './RouteCard';
import type { RouteAlternative } from '../../types/voyage';
import { Info, CheckCircle2 } from 'lucide-react';

interface RouteComparisonProps {
  routes: RouteAlternative[];
  selectedRoute: RouteAlternative | null;
  onSelectRoute: (route: RouteAlternative) => void;
}

export const RouteComparison: React.FC<RouteComparisonProps> = ({
  routes,
  selectedRoute,
  onSelectRoute,
}) => {
  return (
    <section id="route-comparison" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-subtle/80 shadow-subtle mb-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-subtle/60 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-display font-extrabold text-maritime-dark">
              Route Comparison Alternatives
            </h2>
            <span className="text-[10px] font-bold bg-mint-pale text-sustainability-hover px-2.5 py-0.5 rounded-full border border-mint-border">
              3 Passage Models Evaluated
            </span>
          </div>
          <p className="text-xs text-slate-muted mt-0.5">
            Compare alternative navigation paths based on current weather, propeller curve, and fuel lifecycle emissions
          </p>
        </div>

        {selectedRoute && (
          <div className="flex items-center gap-1.5 text-xs text-sustainability-green bg-sustainability-light px-3 py-1 rounded-xl border border-sustainability-green/30 font-semibold self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ready to Save: {selectedRoute.name.split('—')[0]}</span>
          </div>
        )}
      </div>

      {/* 3 Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {routes.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            isSelected={selectedRoute?.id === route.id}
            onSelect={onSelectRoute}
          />
        ))}
      </div>

      {/* Methodology & Disclaimer Callout */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-subtle/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-muted">
        <div className="flex items-start sm:items-center gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>Deterministic Model:</strong> Route A serves as baseline. Route B models eco-speed slow steaming (-22% emissions). Route C models high-speed transit (+15% speed, +24% fuel).
          </span>
        </div>
        <span className="text-[11px] text-slate-muted italic shrink-0">
          Illustrative maritime estimates
        </span>
      </div>

    </section>
  );
};
