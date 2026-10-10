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
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

interface NavItem {
  label: string;
  subtitle?: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const navSections: NavSection[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Platform Modules',
      items: [
        { label: 'GreenTwin', subtitle: 'Smart Voyage', path: '/dashboard/greentwin', icon: Route },
        { label: 'FuelTrust', subtitle: 'Fuel Verification', path: '/dashboard/fueltrust', icon: ShieldCheck },
        { label: 'SmartDock', subtitle: 'Port Coordination', path: '/dashboard/smartdock', icon: Anchor },
        { label: 'GreenPulse', subtitle: 'Sustainability Intel', path: '/dashboard/greenpulse', icon: BarChart3 },
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
        { label: 'Help & Docs', path: '/dashboard/help', icon: HelpCircle },
      ],
    },
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col bg-maritime-dark border-r border-maritime-border text-slate-subtle transition-all duration-300 select-none z-30 sticky top-0 h-screen ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-maritime-border/80">
        <Link
          to="/"
          className="flex items-center gap-3 overflow-hidden group focus:outline-none"
          title="Back to Landing Page"
        >
          <div className="w-10 h-10 rounded-xl bg-maritime-navy border border-sustainability-green/40 flex items-center justify-center shrink-0 shadow-inner group-hover:border-sustainability-green transition-colors">
            {/* Custom SVG Icon combining ship bow, ocean wave, and leaf */}
            <svg
              className="w-5 h-5 text-sustainability-green"
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
              <path
                d="M2 17.5C4.5 16 7.5 16 10 17.5C12.5 19 15.5 19 18 17.5C19.5 16.5 21 16.8 22 17.5"
                stroke="#DFF2E5"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          {!collapsed && (
            <div className="flex flex-col text-left truncate">
              <span className="font-display font-bold text-sm text-warm-white tracking-tight leading-none">
                Green Corridor
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-sustainability-green uppercase mt-1">
                INDIA × SINGAPORE
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          type="button"
          className="p-1.5 rounded-lg text-slate-muted hover:text-warm-white hover:bg-maritime-surface transition-colors focus:outline-none"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navSections.map((sec) => (
          <div key={sec.title} className="space-y-1">
            {!collapsed && (
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                {sec.title}
              </span>
            )}
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-sustainability-green text-warm-white shadow-sm shadow-sustainability-green/20'
                          : 'text-slate-subtle hover:text-warm-white hover:bg-maritime-surface/70'
                      } ${collapsed ? 'justify-center px-2' : ''}`
                    }
                    title={collapsed ? item.label : undefined}
                  >
                    <ItemIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                    {!collapsed && (
                      <div className="flex flex-col truncate">
                        <span className="truncate">{item.label}</span>
                        {item.subtitle && (
                          <span className="text-[10px] text-slate-muted group-hover:text-slate-subtle -mt-0.5 font-normal">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Back to Landing */}
      <div className="p-3 border-t border-maritime-border/80 bg-maritime-navy/30">
        <Link
          to="/"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-subtle hover:text-warm-white hover:bg-maritime-surface/80 transition-colors ${
            collapsed ? 'justify-center px-2' : ''
          }`}
          title="Return to Public Website"
        >
          <ArrowLeft className="w-4 h-4 shrink-0 text-sustainability-green" />
          {!collapsed && <span>Back to Home</span>}
        </Link>
      </div>
    </aside>
  );
};
