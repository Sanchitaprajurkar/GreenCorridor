import React from 'react';
import { Ship, ShieldCheck, Leaf, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import type { DashboardKpi } from '../../types/dashboard';

interface StatCardProps {
  kpi: DashboardKpi;
}

export const StatCard: React.FC<StatCardProps> = ({ kpi }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ship':
        return <Ship className="w-5 h-5 text-maritime-navy" />;
      case 'shieldCheck':
        return <ShieldCheck className="w-5 h-5 text-sustainability-green" />;
      case 'leaf':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'clockAlert':
        return <Clock className="w-5 h-5 text-amber-600" />;
      default:
        return <Ship className="w-5 h-5 text-maritime-navy" />;
    }
  };

  const getThemeStyles = () => {
    switch (kpi.themeColor) {
      case 'green':
        return {
          iconBg: 'bg-sustainability-light border-sustainability-green/30 text-sustainability-green',
          borderHover: 'hover:border-sustainability-green/60',
          accent: 'text-sustainability-green',
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-50 border-amber-200 text-amber-700',
          borderHover: 'hover:border-amber-400',
          accent: 'text-amber-700',
        };
      case 'blue':
        return {
          iconBg: 'bg-ocean-blue border-ocean-border text-sky-700',
          borderHover: 'hover:border-ocean-accent',
          accent: 'text-sky-700',
        };
      case 'navy':
      default:
        return {
          iconBg: 'bg-slate-100 border-slate-200 text-maritime-navy',
          borderHover: 'hover:border-maritime-navy/60',
          accent: 'text-maritime-navy',
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div
      className={`bg-white rounded-2xl p-5 sm:p-6 border border-slate-subtle/80 shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between ${theme.borderHover} group`}
    >
      <div>
        {/* Card Header: Title & Icon */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-muted uppercase tracking-wider">
            {kpi.title}
          </span>
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${theme.iconBg}`}>
            {getIcon(kpi.iconName)}
          </div>
        </div>

        {/* Primary Metric Value */}
        <div className="flex items-baseline gap-1.5 my-2">
          <span className="text-3xl sm:text-4xl font-display font-extrabold text-maritime-dark tracking-tight">
            {kpi.value}
          </span>
          {kpi.unit && (
            <span className="text-xs font-semibold text-slate-muted">
              {kpi.unit}
            </span>
          )}
        </div>
      </div>

      {/* Supporting Text & Trend Indicator */}
      <div className="pt-3 border-t border-slate-subtle/50 mt-2 flex flex-col gap-0.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-text font-medium truncate">
            {kpi.supportingText}
          </span>
          {kpi.trendText && (
            <span
              className={`font-semibold text-[11px] flex items-center gap-0.5 shrink-0 ${
                kpi.trendDirection === 'down'
                  ? 'text-sustainability-green'
                  : kpi.trendDirection === 'up'
                  ? 'text-sustainability-green'
                  : 'text-slate-muted'
              }`}
            >
              {kpi.trendDirection === 'down' && <TrendingDown className="w-3 h-3" />}
              {kpi.trendDirection === 'up' && <TrendingUp className="w-3 h-3" />}
              <span>{kpi.trendText}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
