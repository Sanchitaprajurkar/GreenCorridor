import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  FileCheck,
  X,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';
import type { FuelDocument, DocumentCategory } from '../../types/fuel';

interface DocumentUploadProps {
  documents: FuelDocument[];
  onAddDocument: (doc: FuelDocument) => void;
  onRemoveDocument: (docId: string) => void;
}

const CATEGORIES: DocumentCategory[] = [
  'Fuel Certificate',
  'Bunker Delivery Note',
  'Supplier Declaration',
  'Additional Supporting Evidence',
];

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  documents,
  onAddDocument,
  onRemoveDocument,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('Bunker Delivery Note');
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    setErrorMessage(null);
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];

    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMessage(`Unsupported format "${file.type || 'unknown'}". Allowed: PDF, PNG, JPEG.`);
      return;
    }

    // Check file size
    if (file.size > MAX_SIZE_BYTES) {
      setErrorMessage(`File exceeds 10 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB).`);
      return;
    }

    const sizeFormatted =
      file.size < 1024 * 1024
        ? `${Math.round(file.size / 1024)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    const newDoc: FuelDocument = {
      id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: file.name,
      category: selectedCategory,
      fileSize: sizeFormatted,
      fileSizeBytes: file.size,
      fileType: file.type,
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Attached',
      blobUrl: URL.createObjectURL(file),
    };

    onAddDocument(newDoc);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const getCategoryBadgeColor = (cat: DocumentCategory) => {
    switch (cat) {
      case 'Fuel Certificate':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Bunker Delivery Note':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Supplier Declaration':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Category selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="text-xs font-bold text-maritime-dark flex items-center gap-1.5">
          <FileCheck className="w-3.5 h-3.5 text-sustainability-green" />
          <span>Select Document Category for Attachment:</span>
        </label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                selectedCategory === cat
                  ? 'bg-maritime-navy text-white border-maritime-navy shadow-xs'
                  : 'bg-white text-slate-text border-slate-subtle/80 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-sustainability-green bg-sustainability-light/40 scale-[1.01]'
            : 'border-slate-subtle hover:border-sustainability-green/60 bg-[#FAFCF9]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-white border border-slate-subtle flex items-center justify-center text-sustainability-green shadow-xs">
          <UploadCloud className="w-6 h-6" />
        </div>

        <p className="text-sm font-bold text-maritime-dark">
          Drag & drop your <span className="text-sustainability-green underline">{selectedCategory}</span> here
        </p>
        <p className="text-xs text-slate-muted mt-1">
          or click to browse local files (PDF, PNG, JPEG up to 10 MB)
        </p>
        <span className="inline-block mt-3 px-3 py-1 bg-white rounded-full border border-slate-subtle/80 text-[10px] font-semibold text-slate-text">
          Target Category: <strong>{selectedCategory}</strong>
        </span>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2 animate-fadeIn">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="ml-auto text-rose-600 hover:text-rose-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Distinction Note */}
      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Important Verification Distinction:</strong> Uploading a certificate is not the same as verifying the fuel. Attached documents are staged in local demo state and undergo automated data-consistency checks before authorized port auditor approval.
        </div>
      </div>

      {/* Attached Files List */}
      {documents.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-muted font-bold uppercase tracking-wider">
            <span>Staged Attachments ({documents.length})</span>
            <span className="text-[10px] text-sustainability-green font-normal">Ready for Submission</span>
          </div>

          <div className="divide-y divide-slate-subtle/70 rounded-xl border border-slate-subtle/80 bg-white overflow-hidden">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-maritime-dark truncate max-w-xs sm:max-w-md">
                      {doc.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${getCategoryBadgeColor(
                          doc.category
                        )}`}
                      >
                        {doc.category}
                      </span>
                      <span className="text-[10px] text-slate-muted font-mono">{doc.fileSize}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onRemoveDocument(doc.id)}
                    className="p-1.5 rounded-lg text-slate-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove attachment"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
