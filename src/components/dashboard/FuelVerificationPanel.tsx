import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import type { FuelRecord } from '../../types/fuel';
import { StatusBadge } from './StatusBadge';

interface FuelVerificationPanelProps {
  fuelRecords: FuelRecord[];
  onSelectRecord: (record: FuelRecord) => void;
  onViewAll?: () => void;
}

export const FuelVerificationPanel: React.FC<FuelVerificationPanelProps> = ({
  fuelRecords,
  onSelectRecord,
  onViewAll,
}) => {
  const verifiedCount = fuelRecords.filter((r) => r.verificationStatus === 'Verified').length;
  const pendingCount = fuelRecords.filter((r) => r.verificationStatus === 'Pending Review').length;
  const flaggedCount = fuelRecords.filter((r) => r.verificationStatus === 'Flagged').length;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-subtle/80 shadow-subtle flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-subtle/60">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-display font-bold text-maritime-dark">
                Fuel Verification Status
              </h2>
              <span className="text-[10px] bg-mint-pale text-sustainability-green px-2 py-0.5 rounded-full font-bold">
                FuelTrust
              </span>
            </div>
            <p className="text-xs text-slate-muted">
              Bunker Delivery Note (BDN) & Mass-Balance audits
            </p>
          </div>

          <button
            onClick={onViewAll}
            type="button"
            className="text-xs font-bold text-sustainability-green hover:underline flex items-center gap-1"
          >
            <span>Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Summary Badges / Mini Counts */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <div className="bg-mint-pale/60 p-2.5 rounded-xl border border-mint-border text-center">
            <span className="text-lg font-display font-extrabold text-sustainability-hover block leading-tight">
              {verifiedCount}
            </span>
            <span className="text-[10px] font-semibold text-slate-dark">
              Verified
            </span>
          </div>

          <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 text-center">
            <span className="text-lg font-display font-extrabold text-amber-800 block leading-tight">
              {pendingCount}
            </span>
            <span className="text-[10px] font-semibold text-slate-dark">
              Pending
            </span>
          </div>

          <div className="bg-rose-50/70 p-2.5 rounded-xl border border-rose-200 text-center">
            <span className="text-lg font-display font-extrabold text-rose-700 block leading-tight">
              {flaggedCount}
            </span>
            <span className="text-[10px] font-semibold text-slate-dark">
              Flagged
            </span>
          </div>
        </div>

        {/* Compact List of Submissions */}
        <div className="space-y-2.5">
          {fuelRecords.slice(0, 4).map((record) => (
            <div
              key={record.id}
              className="p-3 rounded-xl bg-warm-white border border-slate-subtle/70 hover:border-sustainability-green/50 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="truncate">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-maritime-dark truncate">
                    {record.voyageId}
                  </span>
                  <StatusBadge status={record.verificationStatus} size="sm" />
                </div>
                <div className="text-[11px] text-slate-muted truncate">
                  <span className="font-medium text-slate-text">{record.fuelType}</span>
                  <span className="mx-1">•</span>
                  <span>{record.quantityTonnes} t</span>
                </div>
                <div className="text-[10px] text-slate-light truncate">
                  Submitted: {record.submissionDate}
                </div>
              </div>

              <button
                onClick={() => onSelectRecord(record)}
                type="button"
                className="p-2 rounded-lg bg-white border border-slate-subtle/80 hover:bg-sustainability-light hover:text-sustainability-green text-slate-muted transition-colors shrink-0 flex items-center gap-1 text-[11px] font-bold"
                title="View fuel record details"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Details</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer prompt */}
      <div className="mt-4 pt-3 border-t border-slate-subtle/50 text-center">
        <span className="text-[11px] text-slate-muted">
          All fuel records link to verifiable mass balance certificates
        </span>
      </div>

    </div>
  );
};
