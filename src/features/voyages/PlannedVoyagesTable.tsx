import React, { useState, useMemo } from 'react';
import {
  Search,
  Eye,
  Edit2,
  Trash2,
  Ship,
  AlertTriangle,
  RotateCcw,
  Leaf,
} from 'lucide-react';
import type { Voyage } from '../../types/voyage';
import { StatusBadge } from '../../components/dashboard/StatusBadge';

interface PlannedVoyagesTableProps {
  voyages: Voyage[];
  onViewDetails: (voyage: Voyage) => void;
  onEditDraft: (voyage: Voyage) => void;
  onDeleteVoyage: (voyageId: string) => void;
}

export const PlannedVoyagesTable: React.FC<PlannedVoyagesTableProps> = ({
  voyages,
  onViewDetails,
  onEditDraft,
  onDeleteVoyage,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredVoyages = useMemo(() => {
    return voyages.filter((v) => {
      const matchesSearch =
        v.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (v.selectedRouteName && v.selectedRouteName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        v.fuelType.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' || v.voyageStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [voyages, searchTerm, statusFilter]);

  const handleDeleteConfirm = (id: string) => {
    onDeleteVoyage(id);
    setConfirmDeleteId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-subtle/80 shadow-subtle overflow-hidden">
      
      {/* Table Header & Search Controls */}
      <div className="p-6 border-b border-slate-subtle/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-display font-bold text-maritime-dark">
              Planned & Registered Corridor Voyages
            </h2>
            <span className="text-xs font-mono font-bold bg-slate-100 text-maritime-navy px-2.5 py-0.5 rounded-full">
              {filteredVoyages.length} Transits
            </span>
          </div>
          <p className="text-xs text-slate-muted mt-0.5">
            Registry of planned passages with chosen route alternatives and baseline emission benchmarks
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search planned voyages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 outline-none bg-slate-50 focus:bg-white transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs font-medium text-slate-dark bg-slate-50 outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Draft">Draft</option>
              <option value="In Transit">In Transit</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {(searchTerm || statusFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('ALL');
              }}
              type="button"
              className="p-2 rounded-xl text-slate-muted hover:text-maritime-dark hover:bg-slate-100 text-xs font-semibold flex items-center gap-1"
              title="Reset filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Alert Bar */}
      {confirmDeleteId && (
        <div className="p-4 bg-rose-50 border-b border-rose-200 flex items-center justify-between gap-3 text-xs text-rose-800 animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              Are you sure you want to delete planned voyage record <strong>{confirmDeleteId}</strong>?
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setConfirmDeleteId(null)}
              type="button"
              className="px-3 py-1 rounded-lg bg-white border border-rose-200 text-slate-dark hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteConfirm(confirmDeleteId)}
              type="button"
              className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#FAFBF8] border-b border-slate-subtle/80 text-[11px] font-bold uppercase tracking-wider text-slate-muted">
              <th className="py-3 px-4">Voyage ID</th>
              <th className="py-3 px-4">Vessel</th>
              <th className="py-3 px-4">Origin Port</th>
              <th className="py-3 px-4">Destination Port</th>
              <th className="py-3 px-4">Selected Route</th>
              <th className="py-3 px-4">Departure</th>
              <th className="py-3 px-4">ETA</th>
              <th className="py-3 px-4">Est. Emissions</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-subtle/50 text-slate-dark">
            {filteredVoyages.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-muted">
                  <Ship className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-xs text-slate-text">
                    No planned voyages match your criteria.
                  </p>
                  <p className="text-[11px] text-slate-muted mt-1">
                    Use the registration form above to configure a new voyage and compare route alternatives.
                  </p>
                </td>
              </tr>
            ) : (
              filteredVoyages.map((voyage) => (
                <tr
                  key={voyage.id}
                  className="hover:bg-warm-white/90 transition-colors group cursor-pointer"
                  onClick={() => onViewDetails(voyage)}
                >
                  {/* Voyage ID */}
                  <td className="py-3.5 px-4 font-mono font-bold text-maritime-navy whitespace-nowrap">
                    {voyage.id}
                  </td>

                  {/* Vessel */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-maritime-dark block">
                      {voyage.vesselName}
                    </span>
                    <span className="text-[10px] text-slate-muted font-mono">
                      {voyage.vesselType || 'Vessel'} • IMO {voyage.imoNumber || 'N/A'}
                    </span>
                  </td>

                  {/* Origin */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-dark block truncate max-w-[140px]" title={voyage.originPort}>
                      {voyage.originPort}
                    </span>
                    <span className="text-[10px] text-slate-muted">
                      {voyage.originCountry}
                    </span>
                  </td>

                  {/* Destination */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-dark block truncate max-w-[140px]" title={voyage.destinationPort}>
                      {voyage.destinationPort}
                    </span>
                    <span className="text-[10px] text-slate-muted">
                      {voyage.destinationCountry}
                    </span>
                  </td>

                  {/* Selected Route */}
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-semibold text-sustainability-hover block truncate max-w-[160px]" title={voyage.selectedRouteName}>
                      {voyage.selectedRouteName || 'Route A — Balanced'}
                    </span>
                    <span className="text-[10px] text-slate-muted">
                      {voyage.distanceNm ? `${voyage.distanceNm.toLocaleString()} nm` : 'Estimated Track'}
                    </span>
                  </td>

                  {/* Departure */}
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-text whitespace-nowrap">
                    {voyage.departureDate}
                  </td>

                  {/* ETA */}
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-text whitespace-nowrap">
                    {voyage.estimatedArrival}
                  </td>

                  {/* Est. Emissions */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-mono font-bold text-sustainability-green whitespace-nowrap">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>{voyage.estimatedEmissionsTonnes} t</span>
                    </div>
                    <span className="text-[10px] text-slate-muted block">
                      {voyage.carbonIntensityScore}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={voyage.voyageStatus} />
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div
                      className="inline-flex items-center gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onViewDetails(voyage)}
                        type="button"
                        className="p-1.5 rounded-lg bg-white border border-slate-subtle/80 hover:bg-slate-100 text-maritime-dark transition-colors"
                        title="View passage dossier"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {voyage.voyageStatus === 'Draft' && (
                        <button
                          onClick={() => onEditDraft(voyage)}
                          type="button"
                          className="p-1.5 rounded-lg bg-white border border-slate-subtle/80 hover:bg-sky-50 text-sky-700 transition-colors"
                          title="Edit draft passage plan"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => setConfirmDeleteId(voyage.id)}
                        type="button"
                        className="p-1.5 rounded-lg bg-white border border-slate-subtle/80 hover:bg-rose-50 text-rose-600 transition-colors"
                        title="Delete passage record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-slate-50 border-t border-slate-subtle/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-muted gap-2">
        <span>
          Saved records are cached locally for demo continuity.
        </span>
        <span className="italic">
          Total Planned: {voyages.length} | Drafts: {voyages.filter((v) => v.voyageStatus === 'Draft').length}
        </span>
      </div>

    </div>
  );
};
