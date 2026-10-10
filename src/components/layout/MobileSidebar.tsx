import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
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
  X,
  ArrowLeft,
} from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navSections = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Platform Modules',
      items: [
        { label: 'GreenTwin — Smart Voyage', path: '/dashboard/greentwin', icon: Route },
        { label: 'FuelTrust — Fuel Verification', path: '/dashboard/fueltrust', icon: ShieldCheck },
        { label: 'SmartDock — Port Coordination', path: '/dashboard/smartdock', icon: Anchor },
        { label: 'GreenPulse — Sustainability Intel', path: '/dashboard/greenpulse', icon: BarChart3 },
      ],
    },
    {
      title: 'Management',
      items: [
        { label: 'Voyages', path: '/dashboard/voyages', icon: Ship },
        { label: 'Verification Queue', path: '/dashboard/verification', icon: FileCheck2 },
        { label: 'Reports', path: '/dashboard/reports', icon: FileText },
        { label: 'Audit Trail', path: '/dashboard/audit', icon: History },
      ],
    },
    {
      title: 'General',
      items: [
        { label: 'Settings', path: '/dashboard/settings', icon: Settings },
        { label: 'Help & Documentation', path: '/dashboard/help', icon: HelpCircle },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-maritime-dark/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-maritime-dark border-r border-maritime-border shadow-2xl z-10">
        
        {/* Drawer Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-maritime-border/80">
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-maritime-navy border border-sustainability-green/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-sustainability-green" viewBox="0 0 24 24" fill="none">
                <path d="M3 13.5L5.5 17.5C6.5 19 8.2 19.8 10 19.8H14C15.8 19.8 17.5 19 18.5 17.5L21 13.5H3Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 4C12 4 17 6 17 11C14 11 12 8.5 12 4Z" fill="#2F8F68" />
              </svg>
            </div>
            <div>
              <span className="font-display font-bold text-sm text-warm-white block">Green Corridor</span>
              <span className="text-[9px] font-semibold text-sustainability-green uppercase block">INDIA × SINGAPORE</span>
            </div>
          </Link>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-lg text-slate-muted hover:text-warm-white hover:bg-maritime-surface"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {navSections.map((sec) => (
            <div key={sec.title} className="space-y-1.5">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-muted block">
                {sec.title}
              </span>
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/dashboard'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-sustainability-green text-warm-white shadow-sm'
                            : 'text-slate-subtle hover:text-warm-white hover:bg-maritime-surface'
                        }`
                      }
                    >
                      <ItemIcon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div className="p-4 border-t border-maritime-border/80">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-subtle hover:text-warm-white hover:bg-maritime-surface"
          >
            <ArrowLeft className="w-4 h-4 text-sustainability-green" />
            <span>Return to Landing Page</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
