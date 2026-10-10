import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Info,
} from 'lucide-react';
import type { ArrivalSchedule } from '../../types/port';

interface VoyageReadinessProps {
  vessel: ArrivalSchedule | null;
}

export const VoyageReadiness: React.FC<VoyageReadinessProps> = ({ vessel }) => {
  if (!vessel) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-subtle/80 shadow-subtle text-center text-xs text-slate-muted">
        Select a vessel to inspect end-to-end Green Corridor readiness across GreenTwin, FuelTrust, and SmartDock.
      </div>
    );
  }

  const isFuelVerified = vessel.fuelVerificationStatus === 'Verified';
  const isFuelPending =
    vessel.fuelVerificationStatus === 'Pending Review' ||
    vessel.fuelVerificationStatus === 'Under Review' ||
    vessel.fuelVerificationStatus === 'Additional Evidence Required';
  const isBerthAssigned = Boolean(vessel.assignedBerthId);

  const steps = [
    {
      step: 1,
      label: 'Voyage Registered',
      module: 'GreenTwin',
      status: 'completed' as const,
      detail: `Passage plan confirmed (${vessel.voyageId}).`,
    },
    {
      step: 2,
      label: 'Fuel Record Submitted',
      module: 'FuelTrust',
      status: vessel.fuelVerificationStatus !== 'No linked record' ? ('completed' as const) : ('pending' as const),
      detail:
        vessel.fuelVerificationStatus !== 'No linked record'
          ? `Bunker manifest logged (${vessel.fuelType || 'Green Marine Blend'}).`
          : 'No linked record submitted in FuelTrust.',
    },
    {
      step: 3,
      label: 'Fuel Verified',
      module: 'FuelTrust',
      status: isFuelVerified
        ? ('completed' as const)
        : isFuelPending
        ? ('in_progress' as const)
        : vessel.fuelVerificationStatus === 'Flagged'
        ? ('warning' as const)
        : ('pending' as const),
      detail: isFuelVerified
        ? 'Digital BDN & ISCC emission factor verified.'
        : isFuelPending
        ? `Status: ${vessel.fuelVerificationStatus} (audit in progress).`
        : vessel.fuelVerificationStatus === 'Flagged'
        ? 'Volumetric variance flagged on fuel record.'
        : 'No verified bunker certificate on file.',
    },
    {
      step: 4,
      label: 'Arrival Confirmed',
      module: 'SmartDock',
      status: 'completed' as const,
      detail: `ETA scheduled for ${vessel.eta.replace('T', ' ')}.`,
    },
    {
      step: 5,
      label: 'Berth Assigned',
      module: 'SmartDock',
      status: isBerthAssigned ? ('completed' as const) : ('pending' as const),
      detail: isBerthAssigned
        ? `Allocated to ${vessel.assignedBerthName || vessel.assignedBerthId}.`
        : 'Awaiting quay slot allocation.',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-subtle/80 shadow-subtle space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-subtle/70 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-mint-soft border border-mint-border flex items-center justify-center text-sustainability-green">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-display font-extrabold text-maritime-dark">
              Corridor Voyage Readiness — {vessel.vesselName}
            </h3>
            <span className="text-[11px] text-slate-muted">
              Integrated bilateral workflow: GreenTwin → FuelTrust → SmartDock
            </span>
          </div>
        </div>

        <span
          className={`text-[11px] font-bold px-3 py-1 rounded-full border self-start sm:self-auto ${
            isBerthAssigned && isFuelVerified
              ? 'bg-mint-soft text-sustainability-hover border-sustainability-green/40'
              : 'bg-amber-50 text-amber-900 border-amber-300'
          }`}
        >
          {isBerthAssigned && isFuelVerified ? '✓ 100% Corridor Ready' : 'In Progress (Action Needed)'}
        </span>
      </div>

      {/* 5-Step Pipeline Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
        {steps.map((st) => {
          const isDone = st.status === 'completed';
          const isProg = st.status === 'in_progress';
          const isWarn = st.status === 'warning';

          return (
            <div
              key={st.step}
              className={`p-3.5 rounded-2xl border flex flex-col justify-between text-xs transition-colors ${
                isDone
                  ? 'border-sustainability-green/40 bg-[#FAFCF9]'
                  : isProg
                  ? 'border-sky-300 bg-sky-50/40'
                  : isWarn
                  ? 'border-rose-300 bg-rose-50/40'
                  : 'border-slate-200 bg-slate-50/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    Step {st.step}
                  </span>
                  <div>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-sustainability-green" />
                    ) : isProg ? (
                      <Clock className="w-4 h-4 text-sky-600 animate-pulse" />
                    ) : isWarn ? (
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                </div>

                <h4 className="font-bold text-maritime-dark text-xs mb-0.5">
                  {st.label}
                </h4>
                <span className="text-[9px] font-semibold text-slate-muted block mb-1">
                  [{st.module}]
                </span>

                <p className="text-[10px] text-slate-muted leading-relaxed">
                  {st.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footnote Notice */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-subtle/80 text-[11px] text-slate-muted flex items-start gap-2">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Bilateral Coordination Model:</strong> Readiness milestones represent proof-of-concept stages across green corridor prototype modules. Official customs and maritime port authority clearance requires regulatory sign-off.
        </p>
      </div>

    </div>
  );
};
