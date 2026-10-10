import React from 'react';
import {
  TrendingDown,
  TrendingUp,
  Save,
} from 'lucide-react';
import type { RouteAlternative, VoyageFormData } from '../../types/voyage';
import { formatDuration, calculateEstimatedCiiScore, getFuelOption } from '../../utils/voyageCalculations';

interface VoyageSummaryProps {
  selectedRoute: RouteAlternative;
  baselineRoute: RouteAlternative;
  formData: VoyageFormData;
  onSaveVoyage: (asDraft: boolean) => void;
  isSaving: boolean;
}

export const VoyageSummary: React.FC<VoyageSummaryProps> = ({
  selectedRoute,
  baselineRoute,
  formData,
  onSaveVoyage,
  isSaving,
}) => {
  const fuel = getFuelOption(formData.fuelType);
  const ciiScore = calculateEstimatedCiiScore(
    selectedRoute.co2EmissionsTonnes,
    selectedRoute.distanceNm,
    formData.cargoWeightTonnes
  );

  const diffEmissions = selectedRoute.co2EmissionsTonnes - baselineRoute.co2EmissionsTonnes;
  const diffHours = selectedRoute.durationHours - baselineRoute.durationHours;
  const diffCost =
    selectedRoute.fuelCostUSD !== undefined && baselineRoute.fuelCostUSD !== undefined
      ? selectedRoute.fuelCostUSD - baselineRoute.fuelCostUSD
      : 0;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-sustainability-green/40 shadow-card mb-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-subtle/70 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-display font-extrabold text-maritime-dark">
              Voyage Performance Summary
            </h2>
            <span className="text-xs font-bold bg-sustainability-light text-sustainability-green px-2.5 py-0.5 rounded-full border border-sustainability-green/30">
              {selectedRoute.name.split('—')[0]}
            </span>
          </div>
          <p className="text-xs text-slate-muted mt-0.5">
            Verified mathematical calculations based on IMO MEPC standards and entered vessel parameters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSaveVoyage(true)}
            type="button"
            disabled={isSaving}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-dark bg-white border border-slate-subtle/80 hover:bg-slate-50 transition-colors"
          >
            Save as Draft
          </button>
          <button
            onClick={() => onSaveVoyage(false)}
            type="button"
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md shadow-sustainability-green/20"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Planned Voyage'}</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Metric 1: Distance & Speed */}
        <div className="bg-[#FAFBF8] p-4 rounded-xl border border-slate-subtle/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
            Distance & Speed
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-display font-extrabold text-maritime-dark">
              {selectedRoute.distanceNm.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-muted">nm</span>
          </div>
          <span className="text-[11px] text-slate-text mt-1 block">
            Avg speed: <strong className="text-maritime-navy">{selectedRoute.averageSpeedKnots} knots</strong>
          </span>
        </div>

        {/* Metric 2: Estimated Duration */}
        <div className="bg-[#FAFBF8] p-4 rounded-xl border border-slate-subtle/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
            Estimated Duration
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-display font-extrabold text-maritime-dark">
              {formatDuration(selectedRoute.durationHours).split(' ')[0]}
            </span>
            <span className="text-xs font-semibold text-slate-muted">transit</span>
          </div>
          <span className="text-[11px] text-slate-text mt-1 block">
            Total: <strong>{selectedRoute.durationHours} hours</strong>
          </span>
        </div>

        {/* Metric 3: Fuel Demand */}
        <div className="bg-[#FAFBF8] p-4 rounded-xl border border-slate-subtle/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
            Fuel Consumption
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-display font-extrabold text-maritime-dark">
              {selectedRoute.fuelConsumptionTonnes.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-muted">tonnes</span>
          </div>
          <span className="text-[11px] text-slate-text mt-1 block truncate" title={formData.fuelType}>
            Type: <strong>{formData.fuelType}</strong>
          </span>
        </div>

        {/* Metric 4: Projected Emissions */}
        <div className="bg-sustainability-subtle p-4 rounded-xl border border-sustainability-green/30">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sustainability-hover block mb-1">
            Projected Emissions
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-display font-extrabold text-sustainability-green">
              {selectedRoute.co2EmissionsTonnes.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-sustainability-hover">t CO₂e</span>
          </div>
          <span className="text-[11px] font-bold text-sustainability-hover mt-1 block">
            CII Rating: {ciiScore}
          </span>
        </div>

      </div>

      {/* Comparison against Baseline Callout */}
      <div className="p-4 rounded-xl bg-warm-white border border-slate-subtle/80 mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-maritime-dark mb-2 flex items-center justify-between">
          <span>Comparative Variance vs. Route A Baseline</span>
          <span className="text-[10px] text-slate-muted font-normal">Deterministic Model Reference</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-subtle">
            <span className="text-slate-muted">Emissions Impact:</span>
            <span
              className={`font-bold flex items-center gap-1 ${
                diffEmissions < 0 ? 'text-sustainability-green' : diffEmissions > 0 ? 'text-rose-600' : 'text-slate-muted'
              }`}
            >
              {diffEmissions < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : diffEmissions > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : null}
              <span>{diffEmissions > 0 ? `+${diffEmissions}` : diffEmissions} t ({selectedRoute.diffPercentEmissionsVsBaseline}%)</span>
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-subtle">
            <span className="text-slate-muted">Duration Variance:</span>
            <span
              className={`font-bold flex items-center gap-1 ${
                diffHours < 0 ? 'text-sustainability-green' : diffHours > 0 ? 'text-amber-700' : 'text-slate-muted'
              }`}
            >
              {diffHours < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : diffHours > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : null}
              <span>{diffHours > 0 ? `+${Math.round(diffHours)}h` : `${Math.round(diffHours)}h`} ({selectedRoute.diffPercentDurationVsBaseline}%)</span>
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-subtle">
            <span className="text-slate-muted">Fuel Cost Variance:</span>
            <span
              className={`font-mono font-bold ${
                diffCost < 0 ? 'text-sustainability-green' : diffCost > 0 ? 'text-rose-600' : 'text-slate-muted'
              }`}
            >
              {diffCost > 0 ? `+$${diffCost.toLocaleString()}` : `$${diffCost.toLocaleString()}`} USD
            </span>
          </div>
        </div>
      </div>

      {/* Documented Assumptions Section */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-subtle text-xs text-slate-muted space-y-1.5">
        <span className="font-bold text-maritime-navy block">
          Documented Calculation Assumptions & Parameters:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] leading-relaxed">
          <div>
            • <strong>Fuel Factor:</strong> {fuel.name} modeled at {fuel.emissionFactor} tCO₂ per tonne of fuel.
          </div>
          <div>
            • <strong>Displacement Drag:</strong> Calculated for {Number(formData.cargoWeightTonnes || 25000).toLocaleString()} metric tonnes of {formData.cargoType}.
          </div>
          <div>
            • <strong>Hydrodynamics:</strong> Propeller power scales at speed exp(2.2) according to marine naval architecture standards.
          </div>
          <div>
            • <strong>Notice:</strong> Illustrative values for pre-departure energy budgeting; verify against master's passage plan.
          </div>
        </div>
      </div>

    </div>
  );
};
