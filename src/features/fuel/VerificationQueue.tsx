import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  FileCheck2,
  Calendar,
  Fuel,
  Ship,
  Building2,
  RotateCcw,
} from 'lucide-react';
import type { FuelRecord, VerificationStatus } from '../../types/fuel';
import { StatusBadge } from '../../components/dashboard/StatusBadge';

interface VerificationQueueProps {
  records: FuelRecord[];
  onSelectRecord: (record: FuelRecord) => void;
  selectedRecordId?: string;
}

type SortField = 'date' | 'quantity' | 'id';
type SortOrder = 'asc' | 'desc';

const STATUS_FILTERS: (VerificationStatus | 'All')[] = [
  'All',
  'Pending Review',
  'Under Review',
  'Verified',
  'Flagged',
  'Additional Evidence Required',
  'Draft',
  'Rejected',
];

export const VerificationQueue: React.FC<VerificationQueueProps> = ({
  records,
  onSelectRecord,
  selectedRecordId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<VerificationStatus | 'All'>('All');
  const [fuelTypeFilter, setFuelTypeFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Extract unique fuel types for filter
  const fuelTypes = useMemo(() => {
    const set = new Set<string>();
    records.forEach((r) => {
      if (r.fuelType) set.add(r.fuelType);
    });
    return Array.from(set);
  }, [records]);

  // Filter and sort records
  const filteredRecords = useMemo(() => {
    return records
      .filter((rec) => {
        // Status filter
        if (statusFilter !== 'All' && rec.verificationStatus !== statusFilter) {
          return false;
        }

        // Fuel Type filter
        if (fuelTypeFilter !== 'All' && rec.fuelType !== fuelTypeFilter) {
          return false;
        }

        // Search query
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchId = rec.id.toLowerCase().includes(query);
          const matchVoyage = rec.voyageId.toLowerCase().includes(query);
          const matchVessel = rec.vesselName.toLowerCase().includes(query);
          const matchSupplier = rec.supplierName.toLowerCase().includes(query);
          const matchBdn = (rec.bdnNumber || '').toLowerCase().includes(query);
          return matchId || matchVoyage || matchVessel || matchSupplier || matchBdn;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortField === 'quantity') {
          const diff = a.quantityTonnes - b.quantityTonnes;
          return sortOrder === 'asc' ? diff : -diff;
        }
        if (sortField === 'id') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        }
        // Default: submission date
        const dateA = new Date(a.submissionDate.split(' ')[0]).getTime() || 0;
        const dateB = new Date(b.submissionDate.split(' ')[0]).getTime() || 0;
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [records, statusFilter, fuelTypeFilter, searchTerm, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  const handleToggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setFuelTypeFilter('All');
    setCurrentPage(1);
  };

  return (
    <div id="verification-queue" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-subtle/80 shadow-card">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-subtle/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-display font-extrabold text-maritime-dark tracking-tight">
              Verification Queue
            </h2>
            <span className="text-xs font-bold text-sustainability-green bg-mint-pale px-2.5 py-0.5 rounded-full border border-mint-border">
              {filteredRecords.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-muted mt-0.5">
            Filterable maritime fuel ledger for bilateral compliance monitoring and auditor inspections.
          </p>
        </div>

        {/* Quick count highlights */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-subtle font-medium text-slate-muted">
            Total in Ledger: <strong className="text-maritime-navy">{records.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-muted absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by Record ID, Voyage ID, Vessel Name, BDN, or Supplier..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
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

          {/* Fuel Type Dropdown Filter */}
          <div className="flex items-center gap-2">
            <Fuel className="w-4 h-4 text-slate-muted hidden sm:block" />
            <select
              value={fuelTypeFilter}
              onChange={(e) => {
                setFuelTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs font-semibold text-maritime-dark bg-white outline-none focus:border-sustainability-green shadow-xs"
            >
              <option value="All">All Fuel Types</option>
              {fuelTypes.map((ft) => (
                <option key={ft} value={ft}>
                  {ft}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleToggleSort('date')}
              className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs ${
                sortField === 'date'
                  ? 'bg-maritime-navy text-white border-maritime-navy'
                  : 'bg-white text-slate-text border-slate-subtle hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Date {sortField === 'date' ? (sortOrder === 'desc' ? '↓' : '↑') : ''}</span>
            </button>

            <button
              type="button"
              onClick={() => handleToggleSort('quantity')}
              className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs ${
                sortField === 'quantity'
                  ? 'bg-maritime-navy text-white border-maritime-navy'
                  : 'bg-white text-slate-text border-slate-subtle hover:bg-slate-50'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Qty {sortField === 'quantity' ? (sortOrder === 'desc' ? '↓' : '↑') : ''}</span>
            </button>
          </div>

        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-muted uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Status:</span>
          </span>
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-maritime-dark text-white shadow-xs scale-[1.02]'
                  : 'bg-slate-100 text-slate-text hover:bg-slate-200/70 border border-slate-200/60'
              }`}
            >
              {st}
            </button>
          ))}

          {(searchTerm || statusFilter !== 'All' || fuelTypeFilter !== 'All') && (
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

      {/* Verification Queue Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-subtle/80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFBF8] border-b border-slate-subtle/80 text-[10px] font-bold uppercase tracking-wider text-slate-muted">
              <th className="py-3 px-4">Record ID</th>
              <th className="py-3 px-4">Voyage / Vessel</th>
              <th className="py-3 px-4">Fuel Supplier</th>
              <th className="py-3 px-4">Fuel Type</th>
              <th className="py-3 px-4 text-right">Quantity</th>
              <th className="py-3 px-4">Submitted</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-subtle/60 text-xs">
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-muted">
                  <FileCheck2 className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-sm text-maritime-dark">No matching fuel records found</p>
                  <p className="text-xs text-slate-muted mt-1">
                    Try adjusting your search criteria or clear status filters.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-3 px-3.5 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-dark hover:bg-slate-200 transition-colors"
                  >
                    Clear Filters
                  </button>
                </td>
              </tr>
            ) : (
              paginatedRecords.map((rec) => {
                const isSelected = selectedRecordId === rec.id;
                return (
                  <tr
                    key={rec.id}
                    className={`transition-colors hover:bg-slate-50/70 ${
                      isSelected ? 'bg-mint-pale/30 border-l-4 border-l-sustainability-green' : ''
                    }`}
                  >
                    {/* Record ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-maritime-navy">
                      <div className="flex items-center gap-1.5">
                        <span>{rec.id}</span>
                        {rec.documents && rec.documents.length > 0 && (
                          <span
                            className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-normal"
                            title={`${rec.documents.length} attached documents`}
                          >
                            {rec.documents.length} docs
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Voyage & Vessel */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-maritime-dark flex items-center gap-1.5">
                        <Ship className="w-3.5 h-3.5 text-slate-400" />
                        <span>{rec.vesselName}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-muted block mt-0.5">
                        {rec.voyageId}
                      </span>
                    </td>

                    {/* Supplier */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-dark font-medium">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate max-w-[150px]" title={rec.supplierName}>
                          {rec.supplierName}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-muted truncate max-w-[150px] block" title={rec.bunkerPort}>
                        {rec.bunkerPort.split(',')[0]}
                      </span>
                    </td>

                    {/* Fuel Type */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-maritime-navy block">
                        {rec.fuelType}
                      </span>
                      <span className="text-[10px] text-slate-muted">
                        Factor: {rec.co2Factor} tCO₂/t
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono font-bold text-maritime-dark">
                        {rec.quantityTonnes.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-muted ml-1">t</span>
                    </td>

                    {/* Submitted Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-muted text-[11px]">
                      {rec.submissionDate}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={rec.verificationStatus} size="sm" />
                      {rec.flagReason && (
                        <span
                          className="block text-[9px] text-rose-600 font-semibold truncate max-w-[130px] mt-0.5"
                          title={rec.flagReason}
                        >
                          ⚠ {rec.flagReason}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onSelectRecord(rec)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-maritime-navy bg-white border border-slate-subtle/80 hover:bg-slate-100 hover:border-slate-300 transition-all inline-flex items-center gap-1 shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-sustainability-green" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-5 mt-2 text-xs text-slate-muted">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of{' '}
            {filteredRecords.length} records
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-subtle bg-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Previous
            </button>
            <span className="px-2 font-bold text-maritime-dark">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-subtle bg-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
