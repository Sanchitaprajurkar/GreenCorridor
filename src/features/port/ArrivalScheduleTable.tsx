import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Calendar,
  Ship,
  Sparkles,
  Eye,
  RotateCcw,
  AlertCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import type { ArrivalSchedule, ArrivalStatus } from '../../types/port';
import { StatusBadge } from '../../components/dashboard/StatusBadge';

interface ArrivalScheduleTableProps {
  arrivals: ArrivalSchedule[];
  selectedVesselId?: string;
  onSelectVessel: (vessel: ArrivalSchedule) => void;
  onRequestRecommendation: (vessel: ArrivalSchedule) => void;
}

const STATUS_OPTIONS: (ArrivalStatus | 'All')[] = [
  'All',
  'Awaiting Berth',
  'Approaching',
  'Berthed',
  'Scheduled',
  'Delayed',
  'Departed',
];

const FUEL_STATUS_OPTIONS = [
  'All',
  'Verified',
  'Pending Review',
  'Under Review',
  'Flagged',
  'Additional Evidence Required',
  'No linked record',
];

export const ArrivalScheduleTable: React.FC<ArrivalScheduleTableProps> = ({
  arrivals,
  selectedVesselId,
  onSelectVessel,
  onRequestRecommendation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ArrivalStatus | 'All'>('All');
  const [fuelFilter, setFuelFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredArrivals = useMemo(() => {
    return arrivals
      .filter((arr) => {
        if (statusFilter !== 'All' && arr.arrivalStatus !== statusFilter) {
          return false;
        }
        if (fuelFilter !== 'All' && arr.fuelVerificationStatus !== fuelFilter) {
          return false;
        }
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          return (
            arr.vesselName.toLowerCase().includes(q) ||
            arr.voyageId.toLowerCase().includes(q) ||
            arr.originPort.toLowerCase().includes(q) ||
            (arr.assignedBerthName || '').toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.eta).getTime();
        const timeB = new Date(b.eta).getTime();
        return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
      });
  }, [arrivals, statusFilter, fuelFilter, searchTerm, sortOrder]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setFuelFilter('All');
  };

  const getArrivalStatusBadge = (status: ArrivalStatus) => {
    switch (status) {
      case 'Berthed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-mint-soft text-sustainability-hover border border-sustainability-green/40">
            <span className="w-1.5 h-1.5 rounded-full bg-sustainability-green" />
            <span>Berthed</span>
          </span>
        );
      case 'Awaiting Berth':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Awaiting Berth</span>
          </span>
        );
      case 'Approaching':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-300">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            <span>Approaching</span>
          </span>
        );
      case 'Delayed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Delayed</span>
          </span>
        );
      case 'Scheduled':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>{status}</span>
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
              Vessel Arrival Schedule
            </h2>
            <span className="text-xs font-bold text-sustainability-green bg-mint-pale px-2.5 py-0.5 rounded-full border border-mint-border">
              {filteredArrivals.length} Inward Vessels
            </span>
          </div>
          <p className="text-xs text-slate-muted mt-0.5">
            Monitor incoming corridor vessels, inspect berth assignments, and initiate automated compatibility checks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="px-3 py-1.5 rounded-xl border border-slate-subtle text-xs font-semibold text-slate-dark hover:bg-slate-50 transition-colors flex items-center gap-1 self-start sm:self-auto"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Sort ETA ({sortOrder === 'asc' ? 'Earliest first' : 'Latest first'})</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3 mb-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-muted absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by vessel name, voyage ID, origin port, or assigned berth..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green placeholder:text-slate-muted/80 shadow-xs"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-slate-muted hover:text-maritime-dark"
              >
                Clear
              </button>
            )}
          </div>

          {/* Fuel Verification Filter */}
          <div className="flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-4 h-4 text-slate-muted hidden sm:block" />
            <select
              value={fuelFilter}
              onChange={(e) => setFuelFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs font-semibold text-maritime-dark bg-white outline-none focus:border-sustainability-green shadow-xs"
            >
              <option value="All">All Fuel Statuses</option>
              {FUEL_STATUS_OPTIONS.filter((o) => o !== 'All').map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-muted uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Arrival:</span>
          </span>
          {STATUS_OPTIONS.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-maritime-dark text-white shadow-xs scale-[1.02]'
                  : 'bg-slate-100 text-slate-text hover:bg-slate-200/70 border border-slate-200/60'
              }`}
            >
              {st}
            </button>
          ))}

          {(searchTerm || statusFilter !== 'All' || fuelFilter !== 'All') && (
            <button
              type="button"
              onClick={resetFilters}
              className="px-2.5 py-1 text-xs text-rose-600 hover:underline flex items-center gap-1 ml-auto shrink-0 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-subtle/80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFBF8] border-b border-slate-subtle/80 text-[10px] font-bold uppercase tracking-wider text-slate-muted">
              <th className="py-3 px-4">Voyage / Vessel</th>
              <th className="py-3 px-4">Origin</th>
              <th className="py-3 px-4">ETA & ETD</th>
              <th className="py-3 px-4">Dimensions</th>
              <th className="py-3 px-4">Assigned Berth</th>
              <th className="py-3 px-4">Arrival Status</th>
              <th className="py-3 px-4">FuelTrust</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-subtle/60 text-xs">
            {filteredArrivals.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-slate-muted">
                  <Ship className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-sm text-maritime-dark">No vessel arrivals match criteria</p>
                  <p className="text-xs text-slate-muted mt-0.5">Try clearing your filters or changing the active port.</p>
                </td>
              </tr>
            ) : (
              filteredArrivals.map((arr) => {
                const isSelected = selectedVesselId === arr.id;
                return (
                  <tr
                    key={arr.id}
                    className={`transition-colors hover:bg-slate-50/80 cursor-pointer ${
                      isSelected ? 'bg-mint-pale/30 border-l-4 border-l-sustainability-green' : ''
                    }`}
                    onClick={() => onSelectVessel(arr)}
                  >
                    {/* Vessel & Voyage */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-maritime-dark flex items-center gap-1.5">
                        <Ship className="w-3.5 h-3.5 text-slate-400" />
                        <span>{arr.vesselName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-muted mt-0.5">
                        <span>{arr.voyageId}</span>
                        <span>•</span>
                        <span>{arr.vesselType}</span>
                      </div>
                    </td>

                    {/* Origin Port */}
                    <td className="py-3.5 px-4">
                      <span className="text-slate-dark font-medium block truncate max-w-[140px]" title={arr.originPort}>
                        {arr.originPort.split('(')[0]}
                      </span>
                      <span className="text-[10px] text-slate-muted">
                        Inward bound
                      </span>
                    </td>

                    {/* ETA & ETD */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 font-bold text-maritime-navy">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{arr.eta.replace('T', ' ')}</span>
                      </div>
                      <span className="text-[10px] text-slate-muted block mt-0.5">
                        ETD: {arr.etd.replace('T', ' ')} ({arr.serviceDurationHours}h)
                      </span>
                    </td>

                    {/* LOA & Draft */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono font-semibold text-slate-dark block">
                        LOA {arr.loaMeters}m
                      </span>
                      <span className="text-[10px] font-mono text-slate-muted">
                        Draft {arr.draftMeters}m
                      </span>
                    </td>

                    {/* Assigned Berth */}
                    <td className="py-3.5 px-4">
                      {arr.assignedBerthName ? (
                        <div className="font-semibold text-maritime-dark">
                          <span>{arr.assignedBerthName.split('(')[0]}</span>
                          <span className="block text-[10px] text-sustainability-green font-bold">
                            Allocated Quay
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80 font-bold inline-flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>Unassigned</span>
                        </span>
                      )}
                    </td>

                    {/* Arrival Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getArrivalStatusBadge(arr.arrivalStatus)}
                      {arr.delayHours && (
                        <span className="block text-[10px] text-rose-600 font-semibold mt-0.5">
                          Delayed +{arr.delayHours}h
                        </span>
                      )}
                    </td>

                    {/* Fuel Verification Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {arr.fuelVerificationStatus !== 'No linked record' ? (
                        <StatusBadge status={arr.fuelVerificationStatus} size="sm" />
                      ) : (
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                          No linked record
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onSelectVessel(arr)}
                          className="p-1.5 rounded-lg border border-slate-subtle/80 text-slate-muted hover:text-maritime-dark hover:bg-slate-100 transition-colors"
                          title="View Vessel Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onRequestRecommendation(arr)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-2xs ${
                            !arr.assignedBerthId
                              ? 'bg-sustainability-green hover:bg-sustainability-hover text-white'
                              : 'bg-white border border-slate-subtle/80 text-maritime-navy hover:bg-slate-100'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{arr.assignedBerthId ? 'Re-assign' : 'Recommend Berth'}</span>
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
