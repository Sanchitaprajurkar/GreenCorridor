import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Plus,
  ChevronDown,
  Calendar,
  User,
  Shield,
} from 'lucide-react';

interface DashboardHeaderProps {
  onOpenRegisterVoyage: () => void;
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onOpenRegisterVoyage,
  selectedRange,
  onRangeChange,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { title: 'BDN Mismatch Flagged', desc: 'VOY-IN-SG-0112 quantity variance detected', time: '2h ago', unread: true },
    { title: 'Green Berth Assigned', desc: 'PSA Singapore confirmed Berth S-08 for Eco Horizon', time: '4h ago', unread: true },
    { title: 'Report Generated', desc: 'September CII Audit Package ready for download', time: '1d ago', unread: false },
  ];

  return (
    <div className="mb-8 space-y-4">
      {/* Top Breadcrumb & User Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-muted">
          <Link to="/" className="hover:text-maritime-dark transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-maritime-navy">
            Dashboard
          </span>
          <span className="text-slate-light">•</span>
          <span className="text-[11px] bg-mint-pale text-sustainability-green px-2 py-0.5 rounded-full font-medium">
            Demo Sandbox
          </span>
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3 self-end sm:self-auto relative">
          
          {/* Date Range Selector */}
          <div className="relative">
            <select
              value={selectedRange}
              onChange={(e) => onRangeChange(e.target.value)}
              className="appearance-none bg-white border border-slate-subtle/80 hover:border-slate-muted rounded-xl pl-8 pr-8 py-2 text-xs font-semibold text-slate-dark focus:outline-none focus:ring-2 focus:ring-sustainability-green/50 shadow-subtle cursor-pointer"
            >
              <option value="30D">Last 30 Days</option>
              <option value="90D">Last 90 Days</option>
              <option value="YTD">Year to Date (2026)</option>
            </select>
            <Calendar className="w-3.5 h-3.5 text-slate-muted absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              type="button"
              className="p-2 rounded-xl bg-white border border-slate-subtle/80 hover:border-slate-muted text-slate-dark hover:text-maritime-navy relative transition-colors shadow-subtle"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            </button>

            {/* Notification Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-elevated border border-slate-subtle p-3 z-40 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-subtle text-xs">
                  <span className="font-bold text-maritime-dark">Corridor Alerts</span>
                  <span className="text-[10px] bg-sustainability-light text-sustainability-green px-1.5 py-0.5 rounded font-semibold">
                    2 New
                  </span>
                </div>
                <div className="space-y-1.5">
                  {notifications.map((n, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-xl text-xs transition-colors ${
                        n.unread ? 'bg-warm-white' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-dark truncate">{n.title}</span>
                        <span className="text-[10px] text-slate-muted">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-text mt-0.5 leading-tight">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              type="button"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white border border-slate-subtle/80 hover:border-slate-muted text-xs shadow-subtle"
            >
              <div className="w-6 h-6 rounded-lg bg-maritime-navy text-warm-white flex items-center justify-center font-bold text-[10px]">
                PA
              </div>
              <div className="text-left hidden md:block">
                <span className="font-bold text-maritime-dark block leading-none text-[11px]">
                  Bilateral Desk
                </span>
                <span className="text-[9px] text-sustainability-green font-semibold">
                  Administrator
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-muted" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-slate-subtle p-3 z-40 text-xs animate-fadeIn">
                <div className="pb-2 mb-2 border-b border-slate-subtle">
                  <span className="font-bold text-maritime-dark block">Port & Corridor Officer</span>
                  <span className="text-[11px] text-slate-muted">admin@corridor.maritime.sg</span>
                </div>
                <div className="space-y-1 text-slate-dark">
                  <div className="p-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-sustainability-green" />
                    <span>Role: Bilateral Authority</span>
                  </div>
                  <div className="p-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-sky-600" />
                    <span>Switch Role View</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button: Register Voyage */}
          <button
            onClick={onOpenRegisterVoyage}
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md shadow-sustainability-green/20"
          >
            <Plus className="w-4 h-4" />
            <span>Register Voyage</span>
          </button>

        </div>
      </div>

      {/* Main Heading & Subtitle */}
      <div className="pt-2">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-maritime-dark tracking-tight">
          Corridor Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-text mt-1 leading-relaxed max-w-3xl">
          Monitor voyage activity, fuel verification, port operations and sustainability performance across the India–Singapore shipping corridor.
        </p>
      </div>
    </div>
  );
};
