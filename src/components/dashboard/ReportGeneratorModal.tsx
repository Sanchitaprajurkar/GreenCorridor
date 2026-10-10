import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, Sparkles } from 'lucide-react';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [reportType, setReportType] = useState('IMO CII Corridor Compliance Report');
  const [dateRange, setDateRange] = useState('October 2026 (Current Cycle)');
  const [format, setFormat] = useState('PDF');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedSuccess(true);
    }, 1200);
  };

  const handleDownload = () => {
    alert(`Downloading ${reportType} (${format}) - Corridors Verified Package`);
    setGeneratedSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maritime-dark/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-subtle/80 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-muted hover:text-maritime-dark hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-ocean-blue border border-ocean-border flex items-center justify-center text-maritime-navy shadow-sm">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-extrabold text-maritime-dark">
              Generate Corridor Report
            </h3>
            <span className="text-xs text-slate-muted">
              Produce auditable sustainability & green tariff compliance documentation
            </span>
          </div>
        </div>

        {generatedSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-sustainability-light text-sustainability-green flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-maritime-dark">
                Report Generated Successfully
              </h4>
              <p className="text-xs text-slate-muted mt-1 max-w-xs mx-auto">
                Ready for submission to Singapore MPA and Indian Ministry of Ports, Shipping and Waterways.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-subtle text-xs font-mono text-maritime-navy text-left">
              <span className="block font-bold mb-0.5">{reportType}</span>
              <span className="text-[11px] text-slate-muted">Period: {dateRange} • Format: {format}</span>
            </div>

            <button
              onClick={handleDownload}
              type="button"
              className="w-full py-3 rounded-xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover transition-all flex items-center justify-center gap-2 shadow-md shadow-sustainability-green/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Report Package</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Report Type */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Report Standard / Template
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 outline-none bg-white"
              >
                <option value="IMO CII Corridor Compliance Report">IMO CII Corridor Compliance Report</option>
                <option value="Port Green Tariff Rebate Application (PSA / JNPA)">Port Green Tariff Rebate Application (PSA / JNPA)</option>
                <option value="Well-to-Wake Lifecycle Fuel Audit Package">Well-to-Wake Lifecycle Fuel Audit Package</option>
                <option value="Executive Decarbonization Summary">Executive Decarbonization Summary (Ministry Briefing)</option>
              </select>
            </div>

            {/* Reporting Period */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Reporting Period
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 outline-none bg-white"
              >
                <option value="October 2026 (Current Cycle)">October 2026 (Current Cycle)</option>
                <option value="Q3 2026 (Jul - Sep 2026)">Q3 2026 (Jul - Sep 2026)</option>
                <option value="Last 30 Days Rolling">Last 30 Days Rolling</option>
                <option value="Year-to-Date 2026">Year-to-Date 2026</option>
              </select>
            </div>

            {/* Format Selector */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Output Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['PDF Document', 'CSV Dataset', 'JSON Ledger'].map((f) => {
                  const val = f.split(' ')[0];
                  const isSelected = format === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFormat(val)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        isSelected
                          ? 'border-sustainability-green bg-sustainability-subtle text-sustainability-hover'
                          : 'border-slate-subtle/80 hover:bg-slate-50 text-slate-dark'
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-subtle/80">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-muted hover:text-maritime-dark"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isGenerating}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-warm-white bg-maritime-navy hover:bg-maritime-surface active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md"
              >
                {isGenerating ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-warm-white border-t-transparent rounded-full animate-spin" />
                    <span>Compiling Data...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-sustainability-green" />
                    <span>Generate Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
