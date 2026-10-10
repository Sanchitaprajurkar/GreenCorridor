import React from 'react';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Info,
} from 'lucide-react';
import type {
  ArrivalSchedule,
  PortBerth,
  BerthReservation,
} from '../../types/port';
import { generateBerthRecommendations } from '../../utils/berthRecommendations';

interface BerthRecommendationsProps {
  vessel: ArrivalSchedule | null;
  berths: PortBerth[];
  reservations: BerthReservation[];
  onAssignBerth: (vessel: ArrivalSchedule, berthId: string) => void;
  onClose?: () => void;
}

export const BerthRecommendations: React.FC<BerthRecommendationsProps> = ({
  vessel,
  berths,
  reservations,
  onAssignBerth,
  onClose,
}) => {
  if (!vessel) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-subtle/80 shadow-card text-center">
        <Sparkles className="w-10 h-10 mx-auto text-sustainability-green mb-3 opacity-60" />
        <h3 className="text-base font-display font-extrabold text-maritime-dark">
          Berth Recommendation Engine
        </h3>
        <p className="text-xs text-slate-muted max-w-md mx-auto mt-1">
          Select a vessel from the arrival schedule above (such as <strong>Eco Horizon IX</strong>) to generate explainable, operationally compatible berth recommendations.
        </p>
      </div>
    );
  }

  const recommendations = generateBerthRecommendations(vessel, berths, reservations);
  const eligibleBerths = recommendations.filter((r) => r.isEligible);
  const ineligibleBerths = recommendations.filter((r) => !r.isEligible);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sustainability-green/40 shadow-card space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-subtle/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-mint-soft border border-mint-border flex items-center justify-center text-sustainability-green">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-display font-extrabold text-maritime-dark tracking-tight">
                Berth Recommendations for {vessel.vesselName}
              </h2>
              <span className="text-[10px] text-slate-muted font-medium">
                Voyage {vessel.voyageId} • LOA {vessel.loaMeters}m • Draft {vessel.draftMeters}m • ETA {vessel.eta.replace('T', ' ')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[10px] font-bold text-sustainability-hover bg-mint-soft px-2.5 py-1 rounded-full border border-sustainability-green/30">
            Recommended by demo scheduling model
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-slate-muted hover:text-maritime-dark px-2 py-1 rounded-lg hover:bg-slate-100"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Model Methodology Banner */}
      <div className="p-3.5 rounded-2xl bg-[#FAFCF9] border border-slate-subtle/80 text-xs text-slate-muted flex items-start gap-2.5">
        <Info className="w-4 h-4 text-sustainability-green shrink-0 mt-0.5" />
        <div className="leading-relaxed text-[11px]">
          <strong>Explainable Ranking Weights:</strong> Candidate berths are evaluated with hard dimension/overlap exclusions, followed by weighted ranking: <strong>40% Schedule Fit</strong>, <strong>30% Vessel Compatibility</strong> (keel depth & length safety margin), <strong>20% Waiting Time</strong>, and <strong>10% Operational Readiness</strong> (FuelTrust certification).
        </div>
      </div>

      {/* Eligible Recommendations Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-maritime-dark flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-sustainability-green" />
          <span>Eligible Compatible Berths ({eligibleBerths.length})</span>
        </h3>

        {eligibleBerths.length === 0 ? (
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-center">
            No compatible berths currently available without schedule conflict or dimension deficit.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibleBerths.map((rec, idx) => {
              const isTopPick = idx === 0;
              return (
                <div
                  key={rec.berthId}
                  className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                    isTopPick
                      ? 'border-sustainability-green bg-gradient-to-b from-white to-mint-soft/10 shadow-md ring-2 ring-sustainability-green/20'
                      : 'border-slate-subtle/80 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Top Row: Score & Badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        {isTopPick && (
                          <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider text-sustainability-hover bg-mint-pale px-2 py-0.5 rounded-full border border-mint-border mb-1">
                            ★ Top Recommendation
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-maritime-dark">
                          {rec.berthName}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-muted">
                          {rec.berthId} • {rec.berthType}
                        </span>
                      </div>

                      {/* Score Badge */}
                      <div className="text-right">
                        <div className="flex items-baseline justify-end gap-0.5">
                          <span className="text-2xl font-display font-extrabold text-sustainability-green">
                            {rec.score}
                          </span>
                          <span className="text-[10px] text-slate-muted">/100</span>
                        </div>
                        <span className="text-[9px] font-semibold text-slate-muted block">
                          Fit Index
                        </span>
                      </div>
                    </div>

                    {/* Operational Highlights */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-[11px] p-2.5 rounded-xl bg-[#FAFBF8] border border-slate-subtle/60">
                      <div>
                        <span className="text-slate-muted block text-[10px]">Estimated Wait:</span>
                        <strong className="text-maritime-dark flex items-center gap-1">
                          <Clock className="w-3 h-3 text-sustainability-green" />
                          <span>{rec.waitingTimeHours} hrs</span>
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-muted block text-[10px]">Service Window:</span>
                        <strong className="text-maritime-dark font-mono text-[10px]">
                          {rec.expectedServiceWindow.start.split('T')[1]} → {rec.expectedServiceWindow.end.split('T')[1]}
                        </strong>
                      </div>
                    </div>

                    {/* Compatibility Summary */}
                    <div className="text-xs mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                        Margin Analysis:
                      </span>
                      <p className="text-[11px] text-maritime-navy font-semibold">
                        {rec.compatibilitySummary}
                      </p>
                    </div>

                    {/* Why Recommended Reasons */}
                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                        Why this berth is recommended:
                      </span>
                      {rec.reasons.map((r, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-1.5 text-[11px] text-slate-text">
                          <CheckCircle2 className="w-3 h-3 text-sustainability-green shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>

                    {/* Warnings if any */}
                    {rec.warnings.length > 0 && (
                      <div className="space-y-1 mb-4 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900">
                        {rec.warnings.map((w, wIdx) => (
                          <div key={wIdx} className="flex items-start gap-1.5">
                            <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                            <span>{w}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 border-t border-slate-subtle/60">
                    <button
                      type="button"
                      onClick={() => onAssignBerth(vessel, rec.berthId)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                        isTopPick
                          ? 'bg-sustainability-green hover:bg-sustainability-hover text-white shadow-sustainability-green/20'
                          : 'bg-maritime-navy hover:bg-maritime-dark text-white'
                      }`}
                    >
                      <span>Assign to {rec.berthId}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Ineligible Berths Section (Explainable Exclusion) */}
      {ineligibleBerths.length > 0 && (
        <div className="pt-4 border-t border-slate-subtle/80 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-muted flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-500" />
            <span>Excluded Incompatible Berths ({ineligibleBerths.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ineligibleBerths.map((rec) => (
              <div
                key={rec.berthId}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-700">{rec.berthName}</span>
                    <span className="text-[10px] font-mono text-slate-muted">{rec.berthId}</span>
                  </div>
                  <div className="text-[11px] text-rose-700 flex items-start gap-1.5 mt-1 font-medium">
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{rec.ineligibilityReason}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
