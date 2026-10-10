import React from 'react';
import { Route, ShieldCheck, Anchor, BarChart3, ArrowRight, Check } from 'lucide-react';
import type { ModuleItem } from '../../types/module';

interface ModuleCardProps {
  module: ModuleItem;
  onExplore?: (moduleId: string) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onExplore }) => {
  const renderIcon = () => {
    switch (module.iconName) {
      case 'route':
        return <Route className="w-6 h-6 text-sustainability-green" />;
      case 'shieldCheck':
        return <ShieldCheck className="w-6 h-6 text-sky-700" />;
      case 'anchor':
        return <Anchor className="w-6 h-6 text-emerald-700" />;
      case 'chartNoAxesCombined':
        return <BarChart3 className="w-6 h-6 text-cyan-700" />;
      default:
        return <Route className="w-6 h-6 text-sustainability-green" />;
    }
  };

  const getThemeStyles = () => {
    switch (module.colorTheme) {
      case 'mint':
        return {
          cardBg: 'bg-white hover:border-sustainability-green/70',
          iconBg: 'bg-mint-soft/80 border-mint-border text-sustainability-green',
          badgeBg: 'bg-mint-soft text-maritime-navy',
          tagBg: 'bg-mint-pale text-maritime-navy border-mint-border/60',
          ctaStyle: 'text-sustainability-green hover:text-sustainability-hover',
        };
      case 'ocean':
        return {
          cardBg: 'bg-white hover:border-ocean-accent/80',
          iconBg: 'bg-ocean-blue border-ocean-border text-maritime-navy',
          badgeBg: 'bg-ocean-blue text-maritime-navy',
          tagBg: 'bg-ocean-subtle text-maritime-dark border-ocean-border/60',
          ctaStyle: 'text-sky-700 hover:text-sky-900',
        };
      default:
        return {
          cardBg: 'bg-white hover:border-sustainability-green/70',
          iconBg: 'bg-mint-soft border-mint-border text-sustainability-green',
          badgeBg: 'bg-mint-soft text-maritime-navy',
          tagBg: 'bg-mint-pale text-maritime-navy border-mint-border/60',
          ctaStyle: 'text-sustainability-green hover:text-sustainability-hover',
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div
      id={module.id}
      className={`rounded-2xl p-6 lg:p-7 border border-slate-subtle/80 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between ${theme.cardBg} group`}
    >
      <div>
        {/* Top Header: Number and Badge */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-xs font-bold text-slate-muted bg-slate-subtle/40 px-2.5 py-1 rounded">
            {module.number}
          </span>
          {module.badge && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme.badgeBg}`}>
              {module.badge}
            </span>
          )}
        </div>

        {/* Icon and Subtitle */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${theme.iconBg}`}>
            {renderIcon()}
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-muted uppercase block">
              {module.subtitle}
            </span>
            <h3 className="text-xl font-display font-extrabold text-maritime-dark tracking-tight group-hover:text-maritime-navy transition-colors">
              {module.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-text leading-relaxed mb-5">
          {module.description}
        </p>

        {/* Highlight Stat / Capability */}
        {module.highlightStat && (
          <div className="mb-5 p-2.5 rounded-lg bg-warm-white/80 border border-slate-subtle/60 text-[11px] text-maritime-navy flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5 text-sustainability-green shrink-0" />
            <span className="truncate">{module.highlightStat}</span>
          </div>
        )}

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {module.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[11px] font-medium px-2.5 py-1 rounded-md border ${theme.tagBg}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Link / Button */}
      <div className="pt-4 border-t border-slate-subtle/60">
        <button
          onClick={() => onExplore ? onExplore(module.id) : null}
          type="button"
          className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-between transition-colors ${theme.ctaStyle} group-hover:bg-warm-white`}
        >
          <span>{module.ctaLabel}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
