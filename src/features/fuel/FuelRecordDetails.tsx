import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Ship,
  Fuel,
  FileText,
  Download,
  Lock,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import type { FuelRecord, VerificationStatus } from '../../types/fuel';
import { StatusBadge } from '../../components/dashboard/StatusBadge';
import { DocumentCompleteness } from './DocumentCompleteness';
import { ReviewRecord } from './ReviewRecord';
import { VerificationHistory } from './VerificationHistory';

interface FuelRecordDetailsProps {
  record: FuelRecord | null;
  onClose: () => void;
  onUpdateStatus: (
    recordId: string,
    newStatus: VerificationStatus,
    comment: string,
    reviewerName: string
  ) => void;
  isReviewerMode?: boolean;
}

export const FuelRecordDetails: React.FC<FuelRecordDetailsProps> = ({
  record,
  onClose,
  onUpdateStatus,
  isReviewerMode = true,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'review' | 'history'>('overview');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!record) return null;

  const docList = record.documents || [];
  const historyList = record.history || [];

  const handleMockDownload = (docName: string) => {
    setDownloadNotice(`Downloading authenticated digital copy of "${docName}"...`);
    setTimeout(() => setDownloadNotice(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-maritime-dark/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-subtle/80 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-muted hover:text-maritime-dark hover:bg-slate-100 transition-colors z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 pb-5 mb-5 border-b border-slate-subtle/70">
          <div className="w-12 h-12 rounded-2xl bg-mint-soft border border-mint-border flex items-center justify-center text-sustainability-green shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0 pr-8">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-slate-muted bg-slate-100 px-2 py-0.5 rounded">
                {record.id}
              </span>
              <StatusBadge status={record.verificationStatus} />
              {record.certificateHash && (
                <span className="font-mono text-[10px] text-slate-muted bg-slate-50 border border-slate-subtle px-2 py-0.5 rounded flex items-center gap-1">
                  <Lock className="w-3 h-3 text-sustainability-green" />
                  <span>Ledger Hash: {record.certificateHash.substring(0, 10)}...</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-maritime-dark tracking-tight">
              Fuel Verification Dossier
            </h2>

            <p className="text-xs text-slate-muted mt-0.5">
              Voyage: <strong className="text-maritime-navy">{record.voyageId}</strong> • Vessel:{' '}
              <strong className="text-maritime-navy">{record.vesselName}</strong>
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-subtle/70 pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-maritime-navy text-white shadow-xs'
                : 'text-slate-muted hover:text-maritime-dark hover:bg-slate-50'
            }`}
          >
            Record Overview & Evidence
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'review'
                ? 'bg-maritime-navy text-white shadow-xs'
                : 'text-slate-muted hover:text-maritime-dark hover:bg-slate-50'
            }`}
          >
            <span>Review & Data Checks</span>
            {record.validationResult && !record.validationResult.allPassed && (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-maritime-navy text-white shadow-xs'
                : 'text-slate-muted hover:text-maritime-dark hover:bg-slate-50'
            }`}
          >
            <span>Verification Audit Trail</span>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full">
              {historyList.length}
            </span>
          </button>
        </div>

        {/* Download notification */}
        {downloadNotice && (
          <div className="mb-4 p-3 rounded-xl bg-mint-soft border border-mint-border text-xs text-sustainability-hover flex items-center gap-2 animate-fadeIn">
            <FileCheck2 className="w-4 h-4 text-sustainability-green shrink-0" />
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Primary Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Vessel & Delivery Card */}
              <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-slate-subtle/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-muted flex items-center gap-1.5">
                  <Ship className="w-3.5 h-3.5 text-sustainability-green" />
                  <span>Vessel & Delivery Metadata</span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-subtle/60">
                    <span className="text-slate-muted">Vessel Name:</span>
                    <strong className="text-maritime-dark">{record.vesselName}</strong>
                  </div>
                  {record.imoNumber && (
                    <div className="flex justify-between py-1 border-b border-slate-subtle/60">
                      <span className="text-slate-muted">IMO Number:</span>
                      <span className="font-mono font-bold text-maritime-dark">{record.imoNumber}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-slate-subtle/60">
                    <span className="text-slate-muted">Voyage ID:</span>
                    <span className="font-mono font-bold text-maritime-dark">{record.voyageId}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-subtle/60">
                    <span className="text-slate-muted">Bunkering Port:</span>
                    <strong className="text-maritime-dark">{record.bunkerPort}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-muted">Delivery Timestamp:</span>
                    <strong className="text-maritime-dark">{record.deliveryDateTime || record.submissionDate}</strong>
                  </div>
                </div>
              </div>

              {/* Fuel & Supplier Card */}
              <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-slate-subtle/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-muted flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-sustainability-green" />
                  <span>Fuel Specification & Supplier</span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-subtle/60">
                    <span className="text-slate-muted">Fuel Type:</span>
                    <strong className="text-maritime-navy">{record.fuelType}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-subtle/60">
                    <span className="text-slate-muted">Quantity Delivered:</span>
                    <span className="font-mono font-bold text-maritime-dark">
                      {record.quantityTonnes.toLocaleString()} metric tonnes
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-subtle/60">
                    <span className="text-slate-muted">Supplier:</span>
                    <strong className="text-maritime-dark">{record.supplierName}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-subtle/60">
                    <span className="text-slate-muted">BDN Number:</span>
                    <span className="font-mono font-bold text-maritime-dark">{record.bdnNumber}</span>
                  </div>
                  {record.fuelPricePerTonne && (
                    <div className="flex justify-between py-1">
                      <span className="text-slate-muted">Fuel Price:</span>
                      <strong className="text-maritime-dark">${record.fuelPricePerTonne} USD / tonne</strong>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Flag Callout if present */}
            {record.flagReason && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-rose-900">Active Discrepancy Flag</h4>
                  <p className="mt-0.5 leading-relaxed">{record.flagReason}</p>
                </div>
              </div>
            )}

            {/* Document Completeness Widget */}
            <DocumentCompleteness record={record} />

            {/* Attached Supporting Documents */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-maritime-dark">
                  Attached Digital Documents ({docList.length})
                </h4>
                <span className="text-[10px] text-slate-muted">Stored in local demo sandbox</span>
              </div>

              {docList.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-muted bg-slate-50 rounded-2xl border border-slate-subtle">
                  No documents attached yet for this record.
                </div>
              ) : (
                <div className="divide-y divide-slate-subtle/70 rounded-2xl border border-slate-subtle/80 bg-white overflow-hidden">
                  {docList.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-maritime-dark">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-semibold text-slate-dark bg-slate-100 px-2 py-0.2 rounded-full">
                              {doc.category}
                            </span>
                            <span className="text-[10px] font-mono text-slate-muted">{doc.fileSize}</span>
                            <span className="text-[10px] text-slate-muted">• {doc.uploadedAt}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => handleMockDownload(doc.name)}
                          className="px-3 py-1.5 rounded-lg border border-slate-subtle text-xs font-semibold text-slate-dark hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: REVIEW & DATA CHECKS */}
        {activeTab === 'review' && (
          <ReviewRecord
            record={record}
            onUpdateStatus={onUpdateStatus}
            isReviewerMode={isReviewerMode}
          />
        )}

        {/* TAB 3: AUDIT HISTORY */}
        {activeTab === 'history' && (
          <VerificationHistory history={historyList} recordId={record.id} />
        )}

        {/* Footer Close */}
        <div className="pt-6 mt-6 border-t border-slate-subtle/80 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-dark bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
