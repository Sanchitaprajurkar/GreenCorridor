import React from 'react';
import { ShieldCheck, Anchor, Globe, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-maritime-dark text-slate-subtle border-t border-maritime-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-maritime-navy to-maritime-surface border border-sustainability-green/40 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-sustainability-green"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 13.5L5.5 17.5C6.5 19 8.2 19.8 10 19.8H14C15.8 19.8 17.5 19 18.5 17.5L21 13.5H3Z"
                    fill="currentColor"
                    fillOpacity="0.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M12 4C12 4 17 6 17 11C14 11 12 8.5 12 4Z" fill="#2F8F68" />
                  <path d="M12 4V11" stroke="#DFF2E5" strokeWidth="1.2" strokeLinecap="round" />
                  <path
                    d="M2 17.5C4.5 16 7.5 16 10 17.5C12.5 19 15.5 19 18 17.5C19.5 16.5 21 16.8 22 17.5"
                    stroke="#DFF2E5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-warm-white tracking-tight">
                  Green Corridor
                </span>
                <span className="block text-[11px] font-semibold text-sustainability-green uppercase tracking-wider">
                  India × Singapore Maritime Digital Network
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-muted leading-relaxed max-w-sm">
              An integrated digital intelligence platform connecting voyage planning, verified green fuel data, smart port operations, and sustainability analytics across the India–Singapore shipping corridor.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-maritime-surface border border-maritime-border text-warm-white">
                <Globe className="w-3.5 h-3.5 text-sustainability-green" />
                <span>JNPA / Chennai ⇄ PSA Singapore</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-maritime-surface border border-maritime-border text-warm-white">
                <ShieldCheck className="w-3.5 h-3.5 text-mint-soft" />
                <span>Auditable Voyage Ledger</span>
              </span>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-warm-white mb-4">
              Platform Modules
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#greentwin"
                  className="hover:text-warm-white transition-colors flex items-center justify-between group"
                >
                  <span>GreenTwin</span>
                  <span className="text-[10px] text-sustainability-green bg-sustainability-green/10 px-1.5 py-0.5 rounded">
                    Voyage
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#fueltrust"
                  className="hover:text-warm-white transition-colors flex items-center justify-between group"
                >
                  <span>FuelTrust</span>
                  <span className="text-[10px] text-ocean-accent bg-ocean-blue/10 px-1.5 py-0.5 rounded">
                    Verification
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#smartdock"
                  className="hover:text-warm-white transition-colors flex items-center justify-between group"
                >
                  <span>SmartDock</span>
                  <span className="text-[10px] text-sustainability-green bg-sustainability-green/10 px-1.5 py-0.5 rounded">
                    Port JIT
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#greenpulse"
                  className="hover:text-warm-white transition-colors flex items-center justify-between group"
                >
                  <span>GreenPulse</span>
                  <span className="text-[10px] text-mint-soft bg-mint-soft/10 px-1.5 py-0.5 rounded">
                    Intelligence
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-warm-white mb-4">
              Explore Corridor
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#problem" className="hover:text-warm-white transition-colors">
                  The Challenge
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-warm-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#novelty" className="hover:text-warm-white transition-colors">
                  Corridor Novelty
                </a>
              </li>
              <li>
                <a href="#analytics" className="hover:text-warm-white transition-colors">
                  Sustainability Intelligence
                </a>
              </li>
              <li>
                <a href="#stakeholders" className="hover:text-warm-white transition-colors">
                  Multi-Stakeholder Access
                </a>
              </li>
            </ul>
          </div>

          {/* Methodology & Contact */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-warm-white mb-4">
              Governance & Contact
            </h2>
            <div className="space-y-3 text-sm text-slate-muted">
              <p className="text-xs leading-relaxed">
                Adhering to IMO Net-Zero 2050 framework, Mass-Balance fuel accounting, and Port JIT coordination principles.
              </p>
              
              <div className="pt-2 border-t border-maritime-border/50">
                <span className="block text-[11px] font-medium text-slate-light uppercase tracking-wider mb-1">
                  Corridor Initiative Desk
                </span>
                <a
                  href="mailto:contact@greencorridor-project.maritime"
                  className="inline-flex items-center gap-1.5 text-xs text-sustainability-green hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>contact@greencorridor-project.maritime</span>
                </a>
              </div>

              <div className="pt-1 flex items-center gap-2 text-xs text-slate-light">
                <Anchor className="w-3.5 h-3.5 text-mint-soft" />
                <span>India–Singapore Bilateral Scope</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider and disclaimers */}
        <div className="mt-12 pt-8 border-t border-maritime-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-muted">
          <p>© 2026 Green Corridor. Project concept and demonstration platform.</p>
          <p className="text-center md:text-right max-w-xl text-[11px] leading-relaxed text-slate-muted/80">
            Platform demonstrations may use illustrative data. Verification and operational recommendations depend on the availability and quality of supporting information.
          </p>
        </div>
      </div>
    </footer>
  );
};
