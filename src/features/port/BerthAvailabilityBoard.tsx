import React from 'react';
import {
  Ship,
  Clock,
  Zap,
  Fuel,
  Wrench,
} from 'lucide-react';
import type { PortBerth, BerthStatus } from '../../types/port';

interface BerthAvailabilityBoardProps {
  berths: PortBerth[];
  selectedBerthId?: string;
  onSelectBerth?: (berth: PortBerth) => void;
}

export const BerthAvailabilityBoard: React.FC<BerthAvailabilityBoardProps> = ({
  berths,
  selectedBerthId,
  onSelectBerth,
}) => {
  const getStatusBadge = (status: BerthStatus) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-mint-soft text-sustainability-hover border border-sustainability-green/40">
            <span className="w-1.5 h-1.5 rounded-full bg-sustainability-green" />
            <span>Available</span>
          </span>
        );
      case 'Occupied':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-800 border border-sky-300">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
            <span>Occupied</span>
          </span>
        );
      case 'Reserved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Reserved</span>
          </span>
        );
      case 'Maintenance':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <Wrench className="w-3 h-3 text-slate-500" />
            <span>Maintenance</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-subtle/80 shadow-card">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-slate-subtle/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-display font-extrabold text-maritime-dark tracking-tight">
              Berth Availability
            </h2>
            <span className="text-xs font-bold text-sustainability-green bg-mint-pale px-2.5 py-0.5 rounded-full border border-mint-border">
              {berths.length} Quays Monitored
            </span>
          </div>
          <p className="text-xs text-slate-muted mt-0.5">
            Operational status, physical limits, and green shore-power readiness across terminal berths.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-muted">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Shore Power (Cold Ironing)</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-muted">
            <Fuel className="w-3.5 h-3.5 text-sustainability-green" />
            <span>Green Bunkering</span>
          </span>
        </div>
      </div>

      {/* Berth Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {berths.map((b) => {
          const isSelected = selectedBerthId === b.id;
          return (
            <div
              key={b.id}
              onClick={() => onSelectBerth && onSelectBerth(b)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-sustainability-green bg-mint-pale/20 shadow-md ring-2 ring-sustainability-green/30'
                  : 'border-slate-subtle/80 bg-[#FAFCF9] hover:border-slate-300 hover:bg-white shadow-2xs'
              }`}
            >
              <div>
                {/* Card Top: Identifier & Status */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-muted block">
                      {b.id}
                    </span>
                    <h3 className="text-sm font-bold text-maritime-dark leading-snug">
                      {b.name}
                    </h3>
                  </div>
                  <div>{getStatusBadge(b.status)}</div>
                </div>

                {/* Berth Type Tag */}
                <div className="mb-3">
                  <span className="text-[10px] font-semibold text-maritime-navy bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                    {b.type}
                  </span>
                </div>

                {/* Assigned Vessel Information */}
                {(b.status === 'Occupied' || b.status === 'Reserved') && b.assignedVesselName && (
                  <div className="p-2.5 rounded-xl bg-white border border-slate-subtle/80 mb-3 text-xs">
                    <div className="flex items-center gap-1.5 text-maritime-dark font-bold">
                      <Ship className="w-3.5 h-3.5 text-slate-400" />
                      <span>{b.assignedVesselName}</span>
                    </div>
                    {b.estimatedAvailableTime && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-muted mt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Vacates: {b.estimatedAvailableTime.replace('T', ' ')}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Maintenance Note */}
                {b.status === 'Maintenance' && (
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 mb-3 text-[11px] text-slate-600 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Dredging / quay reinforcement in progress</span>
                  </div>
                )}
              </div>

              {/* Bottom: Physical limits & Green capabilities */}
              <div className="pt-3 border-t border-slate-subtle/60 flex items-center justify-between text-[11px] text-slate-muted">
                <div className="space-y-0.5">
                  <span className="block font-mono">
                    Max LOA: <strong className="text-maritime-dark">{b.maxLoaMeters}m</strong>
                  </span>
                  <span className="block font-mono">
                    Max Draft: <strong className="text-maritime-dark">{b.maxDraftMeters}m</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {b.hasShorePower && (
                    <span
                      className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600"
                      title="Equipped with Cold Ironing / High Voltage Shore Power"
                    >
                      <Zap className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {b.hasAlternativeBunker && (
                    <span
                      className="w-6 h-6 rounded-lg bg-mint-soft border border-mint-border flex items-center justify-center text-sustainability-green"
                      title="Equipped with Green Methanol & Biofuel Bunker Connections"
                    >
                      <Fuel className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
