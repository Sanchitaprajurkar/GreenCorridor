import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import {
  Route,
  ShieldCheck,
  Anchor,
  BarChart3,
  Ship,
  FileCheck2,
  FileText,
  History,
  Settings,
  HelpCircle,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const ModuleView: React.FC = () => {
  const { moduleKey } = useParams<{ moduleKey: string }>();

  const getModuleConfig = (key?: string) => {
    switch (key) {
      case 'greentwin':
        return {
          title: 'GreenTwin — Smart Voyage Planning',
          subtitle: 'Digital Twin simulation and weather-optimized passage routing',
          icon: Route,
          accentColor: 'text-sustainability-green',
          badge: 'Voyage Planning Layer',
          stats: [
            { label: 'Active Passage Plans', val: '14 voyages' },
            { label: 'Avg Fuel Abatement', val: '12.8%' },
            { label: 'Weather Forecast Sync', val: 'Live (Malacca Strait)' },
          ],
          workflows: [
            'Simulate alternative route legs comparing hydrodynamic resistance',
            'Pre-calculate Tank-to-Wake (TtW) and Well-to-Wake (WtW) emissions baselines',
            'Synchronize planned ETA with SmartDock arrival windows',
            'Push certified voyage declaration to FuelTrust bunker queue',
          ],
        };
      case 'fueltrust':
        return {
          title: 'FuelTrust — Fuel & Emissions Verification',
          subtitle: 'Cryptographic validation of bunker notes, mass-balance certificates, and life-cycle GHG factors',
          icon: ShieldCheck,
          accentColor: 'text-sky-700',
          badge: 'Fuel Verification Layer',
          stats: [
            { label: 'Verified BDNs', val: '18 of 22 batches' },
            { label: 'Flagged Discrepancies', val: '1 active review' },
            { label: 'Audit Standard', val: 'ISCC & IMO DCS compliant' },
          ],
          workflows: [
            'Parse electronic Bunker Delivery Notes (BDNs) and cross-reference supplier meters',
            'Validate chain of custody for certified green methanol, bio-LNG, and B24 blends',
            'Identify and isolate volumetric discrepancies before port customs submission',
            'Generate immutable tamper-proof cryptographic audit receipts',
          ],
        };
      case 'smartdock':
        return {
          title: 'SmartDock — Smart Port Coordination',
          subtitle: 'Just-in-Time (JIT) arrival synchronization and green berth allocation',
          icon: Anchor,
          accentColor: 'text-emerald-700',
          badge: 'Port Operations Layer',
          stats: [
            { label: 'Assigned Green Berths', val: '6 active slots' },
            { label: 'Anchorage Waiting Saved', val: '38.4 hours this week' },
            { label: 'Shore Power Allocation', val: '4 vessels plugged in' },
          ],
          workflows: [
            'Synchronize real-time vessel speed with berth availability at Singapore and JNPA',
            'Automate clearance dossiers utilizing verified voyage and fuel records',
            'Prioritize green-rated vessels for priority docking and lower port tariff rates',
            'Mitigate auxiliary generator emissions during port turnaround',
          ],
        };
      case 'greenpulse':
        return {
          title: 'GreenPulse — Sustainability Intelligence',
          subtitle: 'Aggregated corridor emissions monitoring, CII ratings, and policy incentive models',
          icon: BarChart3,
          accentColor: 'text-cyan-700',
          badge: 'Sustainability Intelligence Layer',
          stats: [
            { label: 'Corridor Carbon Abated', val: '128.4 tonnes CO₂e' },
            { label: 'Fleet CII Average', val: 'Grade A (3.3 gCO2/t-nm)' },
            { label: 'Port Rebates Claimed', val: '$42,500 SGD verified' },
          ],
          workflows: [
            'Calculate voyage-level and fleet-level operational Carbon Intensity Indicator (CII)',
            'Evaluate eligibility for Singapore Maritime and Port Authority green incentives',
            'Benchmark carrier performance across the bilateral shipping lane',
            'One-click export of ESG and regulatory disclosures for international maritime audits',
          ],
        };
      case 'voyages':
        return {
          title: 'Voyage Operations Management',
          subtitle: 'Comprehensive registry of all authorized corridor transits',
          icon: Ship,
          accentColor: 'text-maritime-navy',
          badge: 'Registry Workspace',
          stats: [
            { label: 'Registered Vessels', val: '24 fleet units' },
            { label: 'Active Enroute', val: '12 transits' },
            { label: 'Average Transit Time', val: '5.8 days' },
          ],
          workflows: [
            'Register new cross-border vessel voyages with IMO numbers and route profiles',
            'Inspect origin and destination port schedules',
            'Manage passage speed and bunker delivery allocations',
          ],
        };
      case 'verification':
        return {
          title: 'Fuel Verification Queue',
          subtitle: 'Operational audit desk for pending bunker delivery documents and affidavits',
          icon: FileCheck2,
          accentColor: 'text-amber-700',
          badge: 'Verification Desk',
          stats: [
            { label: 'Pending Queue', val: '3 submissions' },
            { label: 'Flagged Variances', val: '1 document' },
            { label: 'Turnaround Time', val: '4.2 hours avg' },
          ],
          workflows: [
            'Review supplier delivery affidavits and lab certificates',
            'Resolve volume variances between bunker barge and shipboard receiver meters',
            'Issue cryptographic verification tokens for berth priority',
          ],
        };
      case 'reports':
        return {
          title: 'Corridor Reports & Disclosures',
          subtitle: 'Audited environmental reporting packages for maritime regulators and port authorities',
          icon: FileText,
          accentColor: 'text-emerald-700',
          badge: 'Reporting Engine',
          stats: [
            { label: 'Monthly Packages', val: '12 generated' },
            { label: 'Audited Standards', val: 'IMO DCS / EU ETS / CII' },
            { label: 'Rebate Certificates', val: '8 issued' },
          ],
          workflows: [
            'Generate official bilateral corridor progress briefings',
            'Export green tariff rebate certificates for port dues discounts',
            'Download verifiable CSV and JSON data packages for ministry audits',
          ],
        };
      case 'audit':
        return {
          title: 'Immutable Audit Trail',
          subtitle: 'Verifiable chronological ledger of all fuel approvals and port clearances',
          icon: History,
          accentColor: 'text-indigo-700',
          badge: 'Audit Ledger',
          stats: [
            { label: 'Ledger Records', val: '412 entries' },
            { label: 'Cryptographic Proof', val: '100% verified' },
            { label: 'Consensus Nodes', val: 'India & Singapore Testbed' },
          ],
          workflows: [
            'Trace the complete chain-of-custody for any bunker batch',
            'Verify digital signatures submitted by accredited fuel testing agencies',
            'Ensure zero double-counting of carbon offset claims across borders',
          ],
        };
      case 'settings':
        return {
          title: 'Corridor Platform Settings',
          subtitle: 'Organization profiles, API keys, and role-based access rules',
          icon: Settings,
          accentColor: 'text-slate-700',
          badge: 'System Governance',
          stats: [
            { label: 'Active Organization', val: 'Bilateral Port Authority' },
            { label: 'Access Policy', val: 'Role-Based Data Sovereignty' },
            { label: 'API Integrations', val: 'REST & IMO DSC Connectors' },
          ],
          workflows: [
            'Configure stakeholder data access boundaries and confidential pricing protection',
            'Manage authorized fuel supplier credentials and certificates',
            'Set corridor CII performance alert thresholds',
          ],
        };
      case 'help':
      default:
        return {
          title: 'Help, Documentation & Corridor Guide',
          subtitle: 'Technical manuals, methodology whitepapers, and operational tutorials',
          icon: HelpCircle,
          accentColor: 'text-sky-700',
          badge: 'Knowledge Hub',
          stats: [
            { label: 'Guide Version', val: 'v2.4 (2026 Edition)' },
            { label: 'Bilateral Scope', val: 'India–Singapore MoC' },
            { label: 'Support Desk', val: 'contact@greencorridor.maritime' },
          ],
          workflows: [
            'Review IMO Net-Zero 2050 calculation methodologies',
            'Access sample Bunker Delivery Note (BDN) electronic schemas',
            'Explore Just-in-Time (JIT) port coordination operational standards',
          ],
        };
    }
  };

  const config = getModuleConfig(moduleKey);
  const IconComp = config.icon;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sustainability-green hover:underline mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Corridor Overview</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-subtle/80 flex items-center justify-center shadow-subtle shrink-0">
              <IconComp className={`w-6 h-6 ${config.accentColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-maritime-navy">
                  {config.badge}
                </span>
                <span className="text-[10px] text-sustainability-green bg-sustainability-light px-2 py-0.5 rounded-full font-semibold">
                  Active in Demo Sandbox
                </span>
              </div>
              <h1 className="text-2xl font-display font-extrabold text-maritime-dark tracking-tight mt-0.5">
                {config.title}
              </h1>
              <p className="text-xs text-slate-muted mt-0.5">
                {config.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-dark bg-white border border-slate-subtle/80 hover:bg-slate-50 transition-colors shadow-subtle"
            >
              Overview Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Module KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {config.stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-subtle/80 shadow-subtle">
            <span className="text-xs font-semibold text-slate-muted uppercase tracking-wider block mb-1">
              {stat.label}
            </span>
            <span className="text-2xl font-display font-extrabold text-maritime-dark">
              {stat.val}
            </span>
          </div>
        ))}
      </div>

      {/* Core Workflows Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-subtle/80 shadow-subtle mb-8">
        <h2 className="text-base font-display font-bold text-maritime-dark mb-4">
          Integrated Corridor Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.workflows.map((wf, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-warm-white border border-slate-subtle/70 flex items-start gap-3"
            >
              <CheckCircle2 className="w-4 h-4 text-sustainability-green shrink-0 mt-0.5" />
              <span className="text-xs text-slate-dark leading-relaxed font-medium">
                {wf}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-ocean-subtle border border-ocean-border text-xs text-slate-text flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              Connected to <strong>Corridor Shared Ledger #VR-2026</strong>. Changes here synchronize with port authorities and bunker desks.
            </span>
          </div>
          <Link
            to="/dashboard"
            className="text-xs font-bold text-sky-800 hover:underline shrink-0 ml-4 hidden sm:inline"
          >
            View Live Transits ➔
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};
