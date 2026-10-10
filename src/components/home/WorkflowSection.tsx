import React from 'react';
import { Ship, FileCheck2, Anchor, LineChart, Sparkles } from 'lucide-react';
import { WORKFLOW_STEPS } from '../../data/homeData';

export const WorkflowSection: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'ship':
        return <Ship className="w-5 h-5 text-sustainability-green" />;
      case 'fileCheck':
        return <FileCheck2 className="w-5 h-5 text-sky-700" />;
      case 'anchor':
        return <Anchor className="w-5 h-5 text-emerald-700" />;
      case 'lineChart':
        return <LineChart className="w-5 h-5 text-indigo-700" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-sustainability-green" />;
      default:
        return <Ship className="w-5 h-5 text-sustainability-green" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-warm-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-sustainability-green bg-sustainability-light px-3 py-1 rounded-full border border-sustainability-green/30 inline-block">
            THE CONNECTED WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-maritime-dark tracking-tight">
            One Voyage. A Complete Chain of Trust.
          </h2>
          <p className="text-base sm:text-lg text-slate-text leading-relaxed font-normal">
            From initial voyage registration to verified sustainability reporting, every stage contributes to a consistent and traceable operational record.
          </p>
        </div>

        {/* Workflow Steps Stepper */}
        <div className="relative">
          {/* Desktop horizontal connecting line */}
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-sustainability-green/30 via-sky-300 to-sustainability-green/30 -z-0" />

          {/* Stepper Grid (5 steps) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white rounded-2xl p-5 border border-slate-subtle/80 shadow-subtle hover:shadow-card hover:border-sustainability-green/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number Circle & Icon Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-warm-white border border-slate-subtle flex items-center justify-center font-mono font-bold text-xs text-maritime-dark shadow-sm group-hover:bg-sustainability-light group-hover:border-sustainability-green/40 transition-colors">
                      {step.stepNumber}
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-subtle/60">
                      {getStepIcon(step.iconName)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-display font-bold text-maritime-dark mb-2 group-hover:text-sustainability-green transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-text leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Sub-detail tag */}
                <div className="pt-3 border-t border-slate-subtle/50 text-[11px] text-slate-muted italic">
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Caption beneath */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-muted max-w-2xl mx-auto bg-white/70 backdrop-blur-sm py-2.5 px-6 rounded-xl border border-slate-subtle/60 inline-block">
            <span className="font-semibold text-maritime-dark">Corridor Transparency:</span> Shared voyage records connect every stage, reducing fragmented data and improving traceability across maritime jurisdictions.
          </p>
        </div>

      </div>
    </section>
  );
};
