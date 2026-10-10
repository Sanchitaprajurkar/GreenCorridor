import React from 'react';
import { X, Route, ShieldCheck, Anchor, BarChart3, CheckCircle2 } from 'lucide-react';
import { MODULE_ITEMS } from '../../data/homeData';

interface ModuleDetailModalProps {
  moduleId: string | null;
  onClose: () => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  moduleId,
  onClose,
}) => {
  if (!moduleId) return null;

  const currentModule = MODULE_ITEMS.find((m) => m.id === moduleId);
  if (!currentModule) return null;

  const getModuleDetails = (id: string) => {
    switch (id) {
      case 'greentwin':
        return {
          icon: Route,
          color: 'text-sustainability-green',
          kpis: [
            { label: 'Voyage Route Options', val: 'Weather-Optimized Great Circle' },
            { label: 'Projected Fuel Savings', val: 'Up to 14.2% per transit' },
            { label: 'Transit Time Variance', val: '± 2.5 hours predictability' },
          ],
          capabilities: [
            'Digital Twin simulation comparing Malacca Strait currents & weather',
            'Pre-departure energy consumption & greenhouse gas baseline calculation',
            'Engine operating load recommendation for optimal hydrodynamic trim',
            'Direct push of registered voyage manifest to FuelTrust & SmartDock',
          ],
        };
      case 'fueltrust':
        return {
          icon: ShieldCheck,
          color: 'text-sky-700',
          kpis: [
            { label: 'BDN Validation Speed', val: '< 15 seconds automated parse' },
            { label: 'Discrepancy Detection', val: 'Mass-Balance consistency checks' },
            { label: 'Chain of Custody', val: 'Cryptographic document fingerprint' },
          ],
          capabilities: [
            'Bunker Delivery Note (BDN) ingestion with AI-assisted optical verification',
            'Proof of sustainability verification for Bio-Methanol and B24 blends',
            'Immediate cross-reference against supplier bunkering certificates',
            'Automatic flagging of unverified or suspect volume declarations',
          ],
        };
      case 'smartdock':
        return {
          icon: Anchor,
          color: 'text-emerald-700',
          kpis: [
            { label: 'Anchor Idle Reduction', val: '-32% anchorage dwell time' },
            { label: 'Berth Slot Synchronization', val: 'Real-time JIT communication' },
            { label: 'Cold Ironing Readiness', val: 'Shore power pre-allocation' },
          ],
          capabilities: [
            'Just-in-Time arrival windows coordinated between vessel speed & berth availability',
            'Integration with Port of Singapore (PSA / Jurong) and Indian ports (JNPA / Chennai)',
            'Dynamic green priority berthing for certified high-sustainability vessels',
            'Auxiliary engine emissions mitigation during in-port dwell operations',
          ],
        };
      case 'greenpulse':
        return {
          icon: BarChart3,
          color: 'text-cyan-700',
          kpis: [
            { label: 'Corridor CII Accuracy', val: 'Audit-ready Well-to-Wake (WtW)' },
            { label: 'Port Tariff Rebates', val: 'Automated green incentive ranking' },
            { label: 'Reporting Standards', val: 'IMO Net-Zero 2050 & EU ETS aligned' },
          ],
          capabilities: [
            'Aggregated corridor emissions monitoring across all verified transits',
            'Dynamic Carbon Intensity Indicator (CII) operational score calculation',
            'Explainable incentive evaluation for port authority green tariff discounts',
            'One-click export of certified ESG and audit disclosure packages',
          ],
        };
      default:
        return {
          icon: Route,
          color: 'text-sustainability-green',
          kpis: [],
          capabilities: [],
        };
    }
  };

  const details = getModuleDetails(currentModule.id);
  const IconComp = details.icon;

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

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-warm-white border border-slate-subtle flex items-center justify-center shrink-0 shadow-sm">
            <IconComp className={`w-6 h-6 ${details.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-muted bg-slate-subtle/40 px-2 py-0.5 rounded">
                Module {currentModule.number}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sustainability-green bg-sustainability-light px-2 py-0.5 rounded-full">
                {currentModule.badge}
              </span>
            </div>
            <h3 className="text-2xl font-display font-extrabold text-maritime-dark tracking-tight mt-1">
              {currentModule.name}
            </h3>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-muted">
              {currentModule.subtitle}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-text leading-relaxed mb-6 bg-warm-white p-4 rounded-xl border border-slate-subtle/60">
          {currentModule.description}
        </p>

        {/* Technical Highlights / Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {details.kpis.map((kpi, i) => (
            <div key={i} className="bg-slate-50 p-3.5 rounded-xl border border-slate-subtle/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                {kpi.label}
              </span>
              <span className="text-xs font-extrabold text-maritime-dark">
                {kpi.val}
              </span>
            </div>
          ))}
        </div>

        {/* Core Capabilities */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-maritime-dark mb-3">
            Core Architecture Capabilities:
          </h4>
          <div className="space-y-2.5">
            {details.capabilities.map((cap, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-dark">
                <CheckCircle2 className="w-4 h-4 text-sustainability-green shrink-0 mt-0.5" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-subtle/60 flex items-center justify-between">
          <div className="text-[11px] text-slate-muted">
            Shares unified data with <strong className="text-maritime-navy">Corridor Ledger #VR-2026</strong>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-warm-white bg-maritime-navy hover:bg-maritime-surface transition-all flex items-center gap-1.5"
          >
            <span>Close Overview</span>
          </button>
        </div>

      </div>
    </div>
  );
};
