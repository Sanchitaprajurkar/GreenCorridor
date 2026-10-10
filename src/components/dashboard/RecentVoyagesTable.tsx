import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpDown,
  Eye,
  Ship,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import type { Voyage } from '../../types/voyage';
import { StatusBadge } from './StatusBadge';

interface RecentVoyagesTableProps {
  voyages: Voyage[];
  onSelectVoyage: (voyage: Voyage) => void;
}

export const RecentVoyagesTable: React.FC<RecentVoyagesTableProps> = ({
  voyages,
  onSelectVoyage,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [voyageStatusFilter, setVoyageStatusFilter] = useState<string>('ALL');
  const [fuelStatusFilter, setFuelStatusFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'id' | 'vesselName' | 'departureDate'>('departureDate');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter & Search Logic
  const filteredVoyages = useMemo(() => {
    return voyages.filter((v) => {
      const matchesSearch =
        v.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.imoNumber.includes(searchTerm) ||
        v.fuelType.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesVoyageStatus =
        voyageStatusFilter === 'ALL' || v.voyageStatus === voyageStatusFilter;

      const matchesFuelStatus =
        fuelStatusFilter === 'ALL' || v.fuelVerificationStatus === fuelStatusFilter;

      return matchesSearch && matchesVoyageStatus && matchesFuelStatus;
    });
  }, [voyages, searchTerm, voyageStatusFilter, fuelStatusFilter]);

  // Sort Logic
  const sortedVoyages = useMemo(() => {
    return [...filteredVoyages].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredVoyages, sortField, sortAsc]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedVoyages.length / itemsPerPage) || 1;
  const paginatedVoyages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedVoyages.slice(start, start + itemsPerPage);
  }, [sortedVoyages, currentPage, itemsPerPage]);

  const handleSort = (field: 'id' | 'vesselName' | 'departureDate') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setVoyageStatusFilter('ALL');
    setFuelStatusFilter('ALL');
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-subtle/80 shadow-subtle overflow-hidden">
      
      {/* Table Header & Search Bar */}
      <div className="p-6 border-b border-slate-subtle/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-display font-bold text-maritime-dark">
              Recent Corridor Voyages
            </h2>
            <span className="text-xs font-mono font-bold bg-slate-100 text-maritime-navy px-2.5 py-0.5 rounded-full">
              {filteredVoyages.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-muted mt-0.5">
            Active cross-border transits linking India and Singapore with verified sustainability tracking
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by vessel or ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 outline-none bg-slate-50 focus:bg-white transition-colors"
            />
          </div>

          {/* Voyage Status Filter */}
          <div className="relative">
            <select
              value={voyageStatusFilter}
              onChange={(e) => {
                setVoyageStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs font-medium text-slate-dark bg-slate-50 outline-none cursor-pointer"
            >
              <option value="ALL">All Voyage States</option>
              <option value="In Transit">In Transit</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Berthing">Berthing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Fuel Verification Filter */}
          <div className="relative">
            <select
              value={fuelStatusFilter}
              onChange={(e) => {
                setFuelStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs font-medium text-slate-dark bg-slate-50 outline-none cursor-pointer"
            >
              <option value="ALL">All Fuel Audits</option>
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Flagged">Flagged</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {(searchTerm || voyageStatusFilter !== 'ALL' || fuelStatusFilter !== 'ALL') && (
            <button
              onClick={handleResetFilters}
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

      {/* Desktop Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#FAFBF8] border-b border-slate-subtle/80 text-[11px] font-bold uppercase tracking-wider text-slate-muted">
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort('id')}
                  type="button"
                  className="flex items-center gap-1 hover:text-maritime-dark font-bold"
                >
                  <span>Voyage ID</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort('vesselName')}
                  type="button"
                  className="flex items-center gap-1 hover:text-maritime-dark font-bold"
                >
                  <span>Vessel & IMO</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-4">Origin Port</th>
              <th className="py-3 px-4">Destination Port</th>
              <th className="py-3 px-4">Fuel Verification</th>
              <th className="py-3 px-4">Voyage Status</th>
              <th className="py-3 px-4">Estimated Arrival</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-subtle/50 text-slate-dark">
            {paginatedVoyages.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-muted">
                  <Ship className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-xs text-slate-text">No voyages matched your filters.</p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-2 text-xs font-bold text-sustainability-green hover:underline"
                  >
                    Clear search and filter criteria
                  </button>
                </td>
              </tr>
            ) : (
              paginatedVoyages.map((voyage) => (
                <tr
                  key={voyage.id}
                  className="hover:bg-warm-white/90 transition-colors group cursor-pointer"
                  onClick={() => onSelectVoyage(voyage)}
                >
                  {/* Voyage ID */}
                  <td className="py-3.5 px-4 font-mono font-bold text-maritime-navy">
                    {voyage.id}
                  </td>

                  {/* Vessel */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-maritime-dark block">
                      {voyage.vesselName}
                    </span>
                    <span className="text-[10px] text-slate-muted font-mono">
                      IMO {voyage.imoNumber}
                    </span>
                  </td>

                  {/* Origin */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-dark block">
                      {voyage.originPort}
                    </span>
                    <span className="text-[10px] text-slate-muted">
                      {voyage.originCountry}
                    </span>
                  </td>

                  {/* Destination */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-dark block">
                      {voyage.destinationPort}
                    </span>
                    <span className="text-[10px] text-slate-muted">
                      {voyage.destinationCountry}
                    </span>
                  </td>

                  {/* Fuel Verification Status */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={voyage.fuelVerificationStatus} />
                  </td>

                  {/* Voyage Status */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={voyage.voyageStatus} />
                  </td>

                  {/* ETA */}
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-text whitespace-nowrap">
                    {voyage.estimatedArrival}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVoyage(voyage);
                      }}
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-subtle/80 hover:bg-maritime-navy hover:text-warm-white text-maritime-navy font-bold text-xs transition-colors inline-flex items-center gap-1 shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-subtle/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-muted">
        <div>
          Showing <span className="font-bold text-maritime-dark">{sortedVoyages.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
          <span className="font-bold text-maritime-dark">{Math.min(currentPage * itemsPerPage, sortedVoyages.length)}</span> of{' '}
          <span className="font-bold text-maritime-dark">{sortedVoyages.length}</span> voyages
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            type="button"
            className="p-1.5 rounded-lg border border-slate-subtle bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-maritime-dark"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="px-2 font-semibold text-slate-dark">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            type="button"
            className="p-1.5 rounded-lg border border-slate-subtle bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-maritime-dark"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
