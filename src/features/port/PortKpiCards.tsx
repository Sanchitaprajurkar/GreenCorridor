import React from 'react';
import { Ship, Clock, Anchor, AlertTriangle } from 'lucide-react';
import type { ArrivalSchedule, PortBerth, OperationalAlert } from '../../types/port';

interface PortKpiCardsProps {
  arrivals: ArrivalSchedule[];
  berths: PortBerth[];
  alerts: OperationalAlert[];
}

export const PortKpiCards: React.FC<PortKpiCardsProps> = ({
  arrivals,
  berths,
  alerts,
}) => {
  const scheduledCount = arrivals.length;
  const awaitingBerthCount = arrivals.filter((a) => a.arrivalStatus === 'Awaiting Berth').length;
  const availableBerthsCount = berths.filter((b) => b.status === 'Available').length;
  const totalBerthsCount = berths.length;
  const conflictsCount = alerts.filter((a) => a.severity === 'high' || a.category === 'conflict').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* KPI 1: Scheduled Arrivals */}
      <div className="bg-white p-5 rounded-2xl border border-slate-subtle/80 shadow-subtle">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-muted">
            Scheduled Arrivals
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <Ship className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-display font-extrabold text-maritime-dark">
            {scheduledCount}
          </span>
          <span className="text-xs font-semibold text-slate-muted">vessels</span>
        </div>
        <p className="text-[11px] text-slate-muted mt-1">
          Registered inward transits for selected port.
        </p>
      </div>

      {/* KPI 2: Awaiting Berth */}
      <div className={`bg-white p-5 rounded-2xl border shadow-subtle ${
        awaitingBerthCount > 0 ? 'border-amber-200/80 bg-gradient-to-b from-white to-amber-50/20' : 'border-slate-subtle/80'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
            Awaiting Berth
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-display font-extrabold text-maritime-dark">
            {awaitingBerthCount}
          </span>
          <span className="text-xs font-semibold text-amber-700">active</span>
        </div>
        <p className="text-[11px] text-slate-muted mt-1">
          Vessels at anchorage requiring quay allocation.
        </p>
      </div>

      {/* KPI 3: Available Berths */}
      <div className="bg-white p-5 rounded-2xl border border-sustainability-green/30 shadow-subtle bg-gradient-to-b from-white to-mint-soft/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sustainability-hover">
            Available Berths
          </span>
          <div className="w-8 h-8 rounded-xl bg-mint-soft flex items-center justify-center text-sustainability-green">
            <Anchor className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-display font-extrabold text-sustainability-green">
            {availableBerthsCount}
          </span>
          <span className="text-xs font-semibold text-sustainability-hover">
            of {totalBerthsCount} berths
          </span>
        </div>
        <p className="text-[11px] text-slate-muted mt-1">
          Ready for immediate docking allocation.
        </p>
      </div>

      {/* KPI 4: Scheduling Conflicts */}
      <div className={`bg-white p-5 rounded-2xl border shadow-subtle ${
        conflictsCount > 0 ? 'border-rose-200/80 bg-gradient-to-b from-white to-rose-50/20' : 'border-slate-subtle/80'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
            Scheduling Conflicts
          </span>
          <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-display font-extrabold text-rose-700">
            {conflictsCount}
          </span>
          <span className="text-xs font-semibold text-rose-600">alerts</span>
        </div>
        <p className="text-[11px] text-slate-muted mt-1">
          Overlaps, weather delays, or shallow draft flags.
        </p>
      </div>

    </div>
  );
};
