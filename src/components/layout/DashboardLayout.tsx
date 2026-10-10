import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MobileSidebar } from './MobileSidebar';
import { Menu, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-maritime-dark flex flex-col lg:flex-row antialiased selection:bg-mint-soft selection:text-maritime-navy">
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Mobile Drawer */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Mobile Header Bar */}
        <header className="lg:hidden bg-maritime-dark border-b border-maritime-border text-warm-white px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              type="button"
              className="p-2 -ml-2 rounded-lg text-slate-muted hover:text-warm-white hover:bg-maritime-surface"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-tight text-warm-white">
                Green Corridor
              </span>
              <span className="text-[10px] text-sustainability-green bg-sustainability-green/15 px-2 py-0.5 rounded font-mono">
                IN × SG
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs text-slate-subtle hover:text-warm-white px-2.5 py-1 rounded-lg border border-maritime-border"
            >
              Home
            </Link>
          </div>
        </header>

        {/* Top Corridor Status Ticker */}
        <div className="bg-white border-b border-slate-subtle/80 px-4 sm:px-6 lg:px-8 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-subtle">
          <div className="flex items-center gap-2 text-slate-muted">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-sustainability-light text-sustainability-green">
              <Globe className="w-3 h-3" />
            </span>
            <span className="font-medium text-slate-dark">
              Bilateral Maritime Corridor Pilot:
            </span>
            <span className="text-sustainability-green font-semibold">
              JNPA / Chennai ⇄ PSA / Jurong Port
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-slate-muted text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sustainability-green animate-pulse" />
              <span>IMO CII Benchmark Engine Active</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono text-maritime-navy">
              <ShieldCheck className="w-3.5 h-3.5 text-sustainability-green" />
              <span>Mass-Balance Ledger Synced</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
