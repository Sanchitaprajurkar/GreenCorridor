import React from 'react';
import type { FuelVerificationStatus, VoyageStatus } from '../../types/voyage';

interface StatusBadgeProps {
  status: FuelVerificationStatus | VoyageStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const getBadgeStyle = () => {
    switch (status) {
      // Fuel Verification Statuses
      case 'Verified':
        return 'bg-mint-soft text-sustainability-hover border-sustainability-green/40';
      case 'Pending Review':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'Flagged':
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Draft':
        return 'bg-slate-100 text-slate-600 border-slate-200';

      // Voyage Statuses
      case 'In Transit':
        return 'bg-ocean-blue text-maritime-navy border-ocean-accent';
      case 'Berthing':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Scheduled':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Anchored':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';

      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getDotColor = () => {
    switch (status) {
      case 'Verified':
      case 'Completed':
        return 'bg-sustainability-green';
      case 'Pending Review':
        return 'bg-amber-500';
      case 'Flagged':
      case 'Rejected':
        return 'bg-rose-500';
      case 'In Transit':
        return 'bg-sky-600 animate-pulse';
      case 'Berthing':
        return 'bg-teal-500';
      default:
        return 'bg-slate-400';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${getBadgeStyle()} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`} />
      <span>{status}</span>
    </span>
  );
};
