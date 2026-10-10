import React from 'react';
import { Check, Clock, Compass, DollarSign, Fuel, Leaf, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import type { RouteAlternative } from '../../types/voyage';
import { formatDuration } from '../../utils/voyageCalculations';

interface RouteCardProps {
  route: RouteAlternative;
  isSelected: boolean;
  onSelect: (route: RouteAlternative) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, isSelected, onSelect }) => {
  const getBadgeStyle = () => {
    switch (route.type) {
      case 'Lower Emissions':
        return 'bg-sustainability-light text-sustainability-hover border-sustainability-green/40';
      case 'Shorter Duration':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Balanced':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between border relative ${
        isSelected
          ? 'bg-white border-2 border-sustainability-green shadow-card ring-2 ring-sustainability-green/20'
          : 'bg-white border-slate-subtle/80 hover:border-slate-muted shadow-subtle hover:shadow-card'
      }`}
    >
      {/* Top Header Badge */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getBadgeStyle()}`}
          >
            {route.subtitle}
          </span>

          {isSelected ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-sustainability-green bg-mint-pale px-2.5 py-0.5 rounded-full border border-mint-border animate-fadeIn">
              <Check className="w-3.5 h-3.5" />
              <span>Selected Route</span>
            </span>
          ) : route.isBaseline ? (
            <span className="text-[10px] font-mono font-semibold text-slate-muted bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              Corridor Baseline
            </span>
          ) : null}
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-display font-bold text-maritime-dark tracking-tight mb-1">
          {route.name}
        </h3>
        <p className="text-xs text-slate-muted leading-relaxed mb-4">
          {route.description}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4 bg-[#FAFBF8] p-3.5 rounded-xl border border-slate-subtle/80 text-xs">
          {/* Distance */}
          <div>
            <span className="text-[10px] text-slate-muted uppercase font-bold tracking-wider block mb-0.5">
              Distance
            </span>
            <div className="flex items-center gap-1 font-mono font-bold text-maritime-dark">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>{route.distanceNm.toLocaleString()} nm</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <span className="text-[10px] text-slate-muted uppercase font-bold tracking-wider block mb-0.5">
              Duration
            </span>
            <div className="flex items-center gap-1 font-bold text-maritime-dark">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatDuration(route.durationHours)}</span>
            </div>
            {!route.isBaseline && (
              <span
                className={`text-[10px] font-semibold flex items-center gap-0.5 mt-0.5 ${
                  route.diffPercentDurationVsBaseline < 0 ? 'text-sustainability-green' : 'text-amber-700'
                }`}
              >
                {route.diffPercentDurationVsBaseline < 0 ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <TrendingUp className="w-3 h-3" />
                )}
                <span>
                  {route.diffPercentDurationVsBaseline > 0 ? '+' : ''}
                  {route.diffPercentDurationVsBaseline}% time
                </span>
              </span>
            )}
          </div>

          {/* Fuel Consumption */}
          <div>
            <span className="text-[10px] text-slate-muted uppercase font-bold tracking-wider block mb-0.5">
              Fuel Consumption
            </span>
            <div className="flex items-center gap-1 font-mono font-bold text-maritime-dark">
              <Fuel className="w-3.5 h-3.5 text-slate-400" />
              <span>{route.fuelConsumptionTonnes.toLocaleString()} t</span>
            </div>
          </div>

          {/* Estimated Emissions */}
          <div>
            <span className="text-[10px] text-slate-muted uppercase font-bold tracking-wider block mb-0.5">
              Est. CO₂e Emissions
            </span>
            <div className="flex items-center gap-1 font-mono font-extrabold text-sustainability-green">
              <Leaf className="w-3.5 h-3.5" />
              <span>{route.co2EmissionsTonnes.toLocaleString()} t</span>
            </div>
            {!route.isBaseline && (
              <span
                className={`text-[10px] font-semibold flex items-center gap-0.5 mt-0.5 ${
                  route.diffPercentEmissionsVsBaseline < 0 ? 'text-sustainability-green' : 'text-rose-600'
                }`}
              >
                {route.diffPercentEmissionsVsBaseline < 0 ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <TrendingUp className="w-3 h-3" />
                )}
                <span>
                  {route.diffPercentEmissionsVsBaseline > 0 ? '+' : ''}
                  {route.diffPercentEmissionsVsBaseline}% CO₂e
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Fuel Cost if available */}
        {route.fuelCostUSD !== undefined && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-slate-50 border border-slate-subtle/70 flex items-center justify-between text-xs">
            <span className="text-slate-muted flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              <span>Est. Bunker Cost:</span>
            </span>
            <span className="font-mono font-bold text-maritime-navy">
              ${route.fuelCostUSD.toLocaleString()} USD
            </span>
          </div>
        )}

        {/* Transit Lane & Weather Tag */}
        <div className="text-[11px] text-slate-muted flex items-center justify-between mb-4">
          <span>Via: <strong className="text-slate-dark">{route.transitVia}</strong></span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-medium">
            Weather: {route.weatherRating}
          </span>
        </div>
      </div>

      {/* Select Action */}
      <div className="pt-3 border-t border-slate-subtle/60">
        <button
          onClick={() => onSelect(route)}
          type="button"
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
            isSelected
              ? 'bg-sustainability-green text-warm-white shadow-md shadow-sustainability-green/20'
              : 'bg-warm-white hover:bg-slate-100 text-maritime-dark border border-slate-subtle/80 hover:border-slate-muted'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4" />
              <span>Selected Preferred Route</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-sustainability-green" />
              <span>Select This Route</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
