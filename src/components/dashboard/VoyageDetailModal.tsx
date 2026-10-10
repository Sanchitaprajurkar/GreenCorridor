import React from 'react';
import { X, Ship, MapPin, ArrowRight, Download, ShieldCheck } from 'lucide-react';
import type { Voyage } from '../../types/voyage';
import { StatusBadge } from './StatusBadge';

interface VoyageDetailModalProps {
  voyage: Voyage | null;
  onClose: () => void;
  onOpenFuelAudit?: (voyageId: string) => void;
}

export const VoyageDetailModal: React.FC<VoyageDetailModalProps> = ({
  voyage,
  onClose,
  onOpenFuelAudit,
}) => {
  if (!voyage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maritime-dark/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-subtle/80 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-muted hover:text-maritime-dark hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-ocean-blue border border-ocean-border flex items-center justify-center text-maritime-navy shrink-0 shadow-sm">
            <Ship className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-slate-muted bg-slate-100 px-2.5 py-0.5 rounded">
                {voyage.id}
              </span>
              <StatusBadge status={voyage.voyageStatus} />
              <StatusBadge status={voyage.fuelVerificationStatus} />
            </div>
            <h3 className="text-2xl font-display font-extrabold text-maritime-dark tracking-tight">
              {voyage.vesselName}
            </h3>
            <span className="text-xs text-slate-muted font-mono">
              IMO: {voyage.imoNumber} • Bilateral Corridor Transit
            </span>
          </div>
        </div>

        {/* Corridor Route Visual Card */}
        <div className="bg-[#FAFBF8] rounded-2xl p-4 border border-slate-subtle/80 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Origin */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sustainability-light border border-sustainability-green/40 flex items-center justify-center text-sustainability-green shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-muted uppercase tracking-wider block">
                  Origin ({voyage.originCountry})
                </span>
                <span className="text-sm font-bold text-maritime-dark">
                  {voyage.originPort}
                </span>
                <span className="text-[11px] text-slate-muted block">
                  Departed: {voyage.departureDate}
                </span>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="hidden sm:flex flex-col items-center justify-center px-4">
              <span className="text-[10px] font-bold text-sustainability-green uppercase tracking-wider mb-1">
                TRANSIT
              </span>
              <div className="w-24 h-0.5 border-t border-dashed border-sustainability-green flex items-center justify-end">
                <ArrowRight className="w-3.5 h-3.5 text-sustainability-green -mr-1" />
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-ocean-blue border border-ocean-accent/60 flex items-center justify-center text-maritime-navy shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-muted uppercase tracking-wider block">
                  Destination ({voyage.destinationCountry})
                </span>
                <span className="text-sm font-bold text-maritime-dark">
                  {voyage.destinationPort}
                </span>
                <span className="text-[11px] text-slate-muted block">
                  ETA: {voyage.estimatedArrival}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Specs & Operational Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white p-3.5 rounded-xl border border-slate-subtle/80 shadow-subtle">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
              Fuel Bunkered
            </span>
            <span className="text-xs font-bold text-maritime-dark block">
              {voyage.fuelBunkeredTonnes} t
            </span>
            <span className="text-[10px] text-slate-muted truncate block" title={voyage.fuelType}>
              {voyage.fuelType}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-subtle/80 shadow-subtle">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
              Est. CO₂e Emissions
            </span>
            <span className="text-xs font-bold text-maritime-dark block">
              {voyage.estimatedEmissionsTonnes} t
            </span>
            <span className="text-[10px] text-sustainability-green block">
              Verified: {voyage.verifiedEmissionsTonnes ? `${voyage.verifiedEmissionsTonnes} t` : 'Pending'}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-subtle/80 shadow-subtle">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
              Carbon Rating
            </span>
            <span className="text-xs font-extrabold text-sustainability-green block">
              {voyage.carbonIntensityScore}
            </span>
            <span className="text-[10px] text-slate-muted block">
              IMO CII Scale
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-subtle/80 shadow-subtle">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
              SmartDock Berth
            </span>
            <span className="text-xs font-bold text-maritime-dark block">
              {voyage.berthAssigned || 'Queued for JIT'}
            </span>
            <span className="text-[10px] text-slate-muted block">
              Green Priority
            </span>
          </div>
        </div>

        {/* Notes & Verification Context */}
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-subtle text-xs text-slate-dark space-y-2">
          <span className="font-bold text-maritime-navy block">
            Corridor Ledger Notes:
          </span>
          <p className="text-slate-text leading-relaxed">
            {voyage.notes || 'All voyage checkpoints are cross-verified across Port Authorities and Bunker Suppliers.'}
          </p>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-slate-subtle/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              alert(`Exported auditable corridor disclosure package for ${voyage.id}`);
            }}
            type="button"
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-dark bg-white border border-slate-subtle/80 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-muted" />
            <span>Download Audit Dossier</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenFuelAudit && (
              <button
                onClick={() => {
                  onClose();
                  onOpenFuelAudit(voyage.id);
                }}
                type="button"
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Audit Fuel Evidence</span>
              </button>
            )}
            <button
              onClick={onClose}
              type="button"
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-warm-white bg-maritime-navy hover:bg-maritime-surface transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
