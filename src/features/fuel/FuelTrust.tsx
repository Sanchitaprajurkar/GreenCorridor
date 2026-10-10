import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Plus,
  ArrowDown,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText,
  UserCheck,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import type { FuelRecord, VerificationStatus } from '../../types/fuel';
import {
  loadStoredFuelRecords,
  saveStoredFuelRecords,
} from '../../data/fuelMockData';
import { FuelRecordForm } from './FuelRecordForm';
import { VerificationQueue } from './VerificationQueue';
import { FuelRecordDetails } from './FuelRecordDetails';

export const FuelTrust: React.FC = () => {
  const [records, setRecords] = useState<FuelRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<FuelRecord | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isReviewerMode, setIsReviewerMode] = useState(true); // default to true so user can test verifier workflow easily
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize records from localStorage
  useEffect(() => {
    const loaded = loadStoredFuelRecords();
    setRecords(loaded);
  }, []);

  // Sync to localStorage on changes
  const updateRecords = (updater: (prev: FuelRecord[]) => FuelRecord[]) => {
    setRecords((prev) => {
      const next = updater(prev);
      saveStoredFuelRecords(next);
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // KPI Calculations dynamically computed from current dataset
  const totalCount = records.length;
  const verifiedCount = records.filter((r) => r.verificationStatus === 'Verified').length;
  const pendingCount = records.filter(
    (r) =>
      r.verificationStatus === 'Pending Review' ||
      r.verificationStatus === 'Under Review' ||
      r.verificationStatus === 'Additional Evidence Required'
  ).length;
  const flaggedCount = records.filter(
    (r) => r.verificationStatus === 'Flagged' || r.verificationStatus === 'Rejected'
  ).length;

  const handleCreateSuccess = (newRecord: FuelRecord, message: string) => {
    updateRecords((prev) => [newRecord, ...prev]);
    setIsSubmitModalOpen(false);
    showToast(message);
    // Optionally open the newly created record in details
    setSelectedRecord(newRecord);
  };

  const handleUpdateStatus = (
    recordId: string,
    newStatus: VerificationStatus,
    comment: string,
    reviewerName: string
  ) => {
    updateRecords((prev) =>
      prev.map((r) => {
        if (r.id !== recordId) return r;

        const newHistoryEntry = {
          id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          recordId: r.id,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
          action:
            newStatus === 'Verified'
              ? 'Record verified'
              : newStatus === 'Flagged'
              ? 'Record flagged'
              : newStatus === 'Rejected'
              ? 'Record rejected'
              : newStatus === 'Additional Evidence Required'
              ? 'Evidence requested'
              : 'Status updated',
          previousStatus: r.verificationStatus,
          newStatus,
          actor: reviewerName,
          comment,
        };

        const updated: FuelRecord = {
          ...r,
          verificationStatus: newStatus,
          reviewerNotes: comment,
          history: [...(r.history || []), newHistoryEntry],
        };

        if (newStatus === 'Flagged') {
          updated.flagReason = comment;
        }

        // Keep active selection in sync
        setSelectedRecord(updated);

        return updated;
      })
    );

    showToast(`Record ${recordId} updated to "${newStatus}".`);
  };

  const scrollToQueue = () => {
    const el = document.getElementById('verification-queue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn pb-12">
        
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-maritime-dark text-white px-5 py-3 rounded-2xl shadow-2xl border border-sustainability-green/40 flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-sustainability-green shrink-0" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* 1. Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-subtle/80 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-2">
              {/* Breadcrumb & Module Tag */}
              <div className="flex items-center gap-2 text-xs">
                <Link to="/dashboard" className="text-slate-muted hover:text-sustainability-green">
                  Dashboard
                </Link>
                <span className="text-slate-300">/</span>
                <span className="font-bold text-maritime-navy">FuelTrust</span>
                <span className="mx-1 text-slate-300">•</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  MODULE 02
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  DEMO DATA
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-mint-soft border border-mint-border flex items-center justify-center text-sustainability-green shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-maritime-dark tracking-tight">
                    Fuel & Emissions Verification
                  </h1>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-muted max-w-3xl leading-relaxed">
                Submit fuel records, validate supporting evidence, and track the verification status of maritime fuel transactions across the India–Singapore green shipping corridor.
              </p>
            </div>

            {/* Action Buttons & Role Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              
              {/* Role Toggle Switch */}
              <div className="p-1 rounded-2xl bg-slate-100 border border-slate-subtle flex items-center text-xs">
                <button
                  type="button"
                  onClick={() => setIsReviewerMode(false)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    !isReviewerMode
                      ? 'bg-white text-maritime-dark shadow-xs'
                      : 'text-slate-muted hover:text-maritime-dark'
                  }`}
                >
                  Submitter View
                </button>
                <button
                  type="button"
                  onClick={() => setIsReviewerMode(true)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1 ${
                    isReviewerMode
                      ? 'bg-maritime-navy text-white shadow-xs'
                      : 'text-slate-muted hover:text-maritime-dark'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-sustainability-green" />
                  <span>Reviewer Mode</span>
                </button>
              </div>

              {/* View Verification Queue Button */}
              <button
                type="button"
                onClick={scrollToQueue}
                className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-slate-dark bg-white border border-slate-subtle/80 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>View Verification Queue</span>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* + Submit Fuel Record Primary Button */}
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-sustainability-green/20"
              >
                <Plus className="w-4 h-4" />
                <span>+ Submit Fuel Record</span>
              </button>

            </div>

          </div>
        </div>

        {/* 2. Overview KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* KPI 1: Total Records */}
          <div className="bg-white p-5 rounded-2xl border border-slate-subtle/80 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-muted">
                Total Fuel Records
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <FileText className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-display font-extrabold text-maritime-dark">
                {totalCount}
              </span>
              <span className="text-xs font-medium text-slate-muted">records</span>
            </div>
            <p className="text-[11px] text-slate-muted mt-1">
              All submitted fuel delivery logs in corridor registry.
            </p>
          </div>

          {/* KPI 2: Verified */}
          <div className="bg-white p-5 rounded-2xl border border-sustainability-green/30 shadow-card bg-gradient-to-b from-white to-mint-soft/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sustainability-hover">
                Verified
              </span>
              <div className="w-7 h-7 rounded-lg bg-mint-soft flex items-center justify-center text-sustainability-green">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-display font-extrabold text-sustainability-green">
                {verifiedCount}
              </span>
              <span className="text-xs font-semibold text-sustainability-hover">
                ({Math.round((verifiedCount / (totalCount || 1)) * 100)}%)
              </span>
            </div>
            <p className="text-[11px] text-slate-muted mt-1">
              Passed defined checks and recorded as verified.
            </p>
          </div>

          {/* KPI 3: Pending Review */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Pending Review
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-display font-extrabold text-maritime-dark">
                {pendingCount}
              </span>
              <span className="text-xs font-medium text-amber-700">active</span>
            </div>
            <p className="text-[11px] text-slate-muted mt-1">
              Awaiting review or additional supporting evidence.
            </p>
          </div>

          {/* KPI 4: Flagged */}
          <div className="bg-white p-5 rounded-2xl border border-rose-200/80 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                Flagged / Discrepancy
              </span>
              <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-display font-extrabold text-rose-700">
                {flaggedCount}
              </span>
              <span className="text-xs font-medium text-rose-600">flagged</span>
            </div>
            <p className="text-[11px] text-slate-muted mt-1">
              Records with volumetric variances or failed checks.
            </p>
          </div>

        </div>

        {/* 3. Verification Queue Table */}
        <VerificationQueue
          records={records}
          onSelectRecord={(rec) => setSelectedRecord(rec)}
          selectedRecordId={selectedRecord?.id}
        />

        {/* 4. Submit Fuel Record Modal */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-maritime-dark/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-subtle/80 relative max-h-[92vh] overflow-y-auto">
              <FuelRecordForm
                onSuccess={handleCreateSuccess}
                onCancel={() => setIsSubmitModalOpen(false)}
                isModal={true}
              />
            </div>
          </div>
        )}

        {/* 5. Fuel Record Details Modal / Drawer */}
        {selectedRecord && (
          <FuelRecordDetails
            record={selectedRecord}
            onClose={() => setSelectedRecord(null)}
            onUpdateStatus={handleUpdateStatus}
            isReviewerMode={isReviewerMode}
          />
        )}

      </div>
    </DashboardLayout>
  );
};
