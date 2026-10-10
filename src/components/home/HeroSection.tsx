import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Navigation2,
  Cpu,
  Layers,
  Anchor,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onHowItWorksClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onHowItWorksClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-maritime-dark via-maritime-navy to-maritime-dark text-warm-white py-16 lg:py-24 border-b border-maritime-border/40">
      {/* Background ambient lighting and grid */}
      <div className="absolute inset-0 bg-corridor-grid-dark opacity-40 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sustainability-green/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-ocean-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-maritime-surface border border-sustainability-green/30 text-xs font-semibold text-sustainability-green tracking-wide">
              <span className="w-2 h-2 rounded-full bg-sustainability-green animate-pulse"></span>
              <span>THE FUTURE OF GREEN MARITIME LOGISTICS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-warm-white leading-[1.12]">
              Making Every Voyage Count Toward a{' '}
              <span className="text-sustainability-green relative inline-block">
                Greener Future.
                <svg
                  className="absolute left-0 -bottom-2 w-full text-sustainability-green/40 h-2"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 5.5C45 1.5 155 1.5 199 5.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-subtle/90 leading-relaxed max-w-2xl font-normal">
              An integrated digital intelligence platform connecting voyage planning, verified green fuel data, smart port operations, and sustainability analytics across the India–Singapore shipping corridor.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#platform"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] shadow-lg shadow-sustainability-green/20 transition-all text-sm group"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#how-it-works"
                onClick={onHowItWorksClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-warm-white bg-maritime-surface/70 hover:bg-maritime-surface border border-maritime-border hover:border-slate-muted/60 transition-all text-sm"
              >
                <Navigation2 className="w-4 h-4 text-mint-soft" />
                <span>Discover How It Works</span>
              </a>
            </div>

            {/* Compact Trust Statement */}
            <div className="pt-4 border-t border-maritime-border/50 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-muted">
              <div className="flex items-center gap-2 text-warm-white/90 font-medium">
                <ShieldCheck className="w-4 h-4 text-sustainability-green shrink-0" />
                <span>One connected corridor. Verified data. Smarter maritime decisions.</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-light">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mint-soft" />
                  <span>Cross-Border Audit</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mint-soft" />
                  <span>IMO CII Aligned</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Container Ship (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Image Frame with glowing border */}
              <div className="relative rounded-2xl overflow-hidden border border-maritime-border/80 shadow-2xl shadow-maritime-dark bg-maritime-navy group">
                <img
                  src="/images/hero-ship.jpg"
                  alt="Modern Eco-Horizon green container ship sailing the India-Singapore corridor"
                  className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />

                {/* Subtle gradient vignette over image for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-maritime-dark/85 via-maritime-dark/20 to-transparent pointer-events-none" />

                {/* Floating Overlay 1: Corridor Intelligence (Top Right) */}
                <div className="absolute top-4 right-4 bg-maritime-dark/90 backdrop-blur-md border border-sustainability-green/40 rounded-xl p-3 shadow-lg max-w-[210px] text-left transition-all">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-maritime-border/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sustainability-green flex items-center gap-1">
                      <Cpu className="w-3 h-3" />
                      <span>CORRIDOR INTEL</span>
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-sustainability-green animate-pulse"></span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-warm-white/90">
                    <li className="flex items-center justify-between gap-2">
                      <span className="text-slate-light">Voyage visibility</span>
                      <span className="text-sustainability-green font-semibold">Active</span>
                    </li>
                    <li className="flex items-center justify-between gap-2">
                      <span className="text-slate-light">Fuel verification</span>
                      <span className="text-mint-soft font-semibold">94.6%</span>
                    </li>
                    <li className="flex items-center justify-between gap-2">
                      <span className="text-slate-light">Emissions monitor</span>
                      <span className="text-ocean-blue font-semibold">Real-Time</span>
                    </li>
                  </ul>
                </div>

                {/* Floating Overlay 2: Connected Ecosystem (Bottom Left) */}
                <div className="absolute bottom-4 left-4 right-4 bg-maritime-dark/90 backdrop-blur-md border border-maritime-border rounded-xl p-3 text-left shadow-lg">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-mint-soft" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-warm-white">
                        CONNECTED ECOSYSTEM
                      </span>
                    </div>
                    <span className="text-[10px] text-sustainability-green bg-sustainability-green/15 px-2 py-0.5 rounded-full font-medium">
                      Single Record
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-light font-medium pt-1">
                    <span className="hover:text-warm-white transition-colors">Voyage</span>
                    <span className="text-sustainability-green">→</span>
                    <span className="hover:text-warm-white transition-colors">Verification</span>
                    <span className="text-sustainability-green">→</span>
                    <span className="hover:text-warm-white transition-colors">Port</span>
                    <span className="text-sustainability-green">→</span>
                    <span className="text-mint-soft font-bold">Intelligence</span>
                  </div>
                </div>

                {/* Floating Live Badge (Top Left) */}
                <div className="absolute top-4 left-4 bg-maritime-dark/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-maritime-border flex items-center gap-1.5 text-[11px] text-warm-white">
                  <Anchor className="w-3.5 h-3.5 text-mint-soft" />
                  <span>JNPA ⇄ Singapore</span>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-sustainability-green/20 rounded-full blur-xl -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
