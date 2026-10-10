import React from 'react';
import { DatabaseZap, ShieldAlert, GitFork, ArrowDown } from 'lucide-react';
import { PROBLEM_CARDS } from '../../data/homeData';

export const ProblemSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'databaseZap':
        return <DatabaseZap className="w-5 h-5 text-amber-600" />;
      case 'shieldAlert':
        return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      case 'split':
        return <GitFork className="w-5 h-5 text-maritime-navy" />;
      default:
        return <DatabaseZap className="w-5 h-5 text-amber-600" />;
    }
  };

  const getBorderBadge = (index: number) => {
    switch (index) {
      case 0:
        return 'border-amber-200 bg-amber-50/50';
      case 1:
        return 'border-rose-200 bg-rose-50/50';
      case 2:
        return 'border-sky-200 bg-sky-50/50';
      default:
        return 'border-slate-200 bg-slate-50';
    }
  };

  return (
    <section id="problem" className="py-20 lg:py-28 bg-warm-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-sustainability-green bg-sustainability-light px-3 py-1 rounded-full border border-sustainability-green/30 inline-block">
            THE CHALLENGE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-maritime-dark tracking-tight">
            Green Shipping Needs More Than Good Intentions.
          </h2>
          <p className="text-base sm:text-lg text-slate-text leading-relaxed font-normal">
            Fuel records, voyage information, port operations, and environmental reporting often exist in separate systems. Without a consistent and auditable source of information, sustainability claims become difficult to verify and compare.
          </p>
        </div>

        {/* 3 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROBLEM_CARDS.map((card, idx) => (
            <div
              key={card.number}
              className={`rounded-2xl p-7 bg-white border border-slate-subtle/80 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                {/* Header with Number and Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold tracking-wider text-slate-muted bg-slate-subtle/40 px-2.5 py-1 rounded-md">
                    {card.number}
                  </span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${getBorderBadge(idx)}`}>
                    {getIcon(card.iconName)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-maritime-dark mb-3 group-hover:text-maritime-navy transition-colors">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-text leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              {/* Consequence callout */}
              <div className="pt-4 border-t border-slate-subtle/60">
                <span className="text-[11px] font-semibold text-slate-muted uppercase tracking-wider block mb-1">
                  Corridor Impact
                </span>
                <p className="text-xs font-medium text-slate-dark/90">
                  {card.consequence}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transition statement */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3.5 rounded-2xl bg-sustainability-subtle border border-sustainability-border/60 shadow-subtle max-w-2xl mx-auto">
            <span className="w-8 h-8 rounded-full bg-sustainability-green text-warm-white flex items-center justify-center shrink-0">
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </span>
            <p className="text-sm sm:text-base font-semibold text-maritime-dark">
              Green Corridor brings these fragmented workflows into{' '}
              <span className="text-sustainability-green underline decoration-sustainability-green/40 underline-offset-4">
                one connected intelligence layer
              </span>.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
