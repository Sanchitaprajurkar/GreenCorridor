import React from 'react';
import { ArrowRight, Compass, MapPin, Globe, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onExploreClick?: () => void;
  onApproachClick?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onExploreClick,
  onApproachClick,
}) => {
  return (
    <section className="bg-maritime-dark text-warm-white py-20 lg:py-28 relative overflow-hidden border-t border-maritime-border">
      {/* Background radial glow & corridor wave elements */}
      <div className="absolute inset-0 bg-corridor-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sustainability-green/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Decorative Route Graphic (India to Singapore) */}
        <div className="inline-flex items-center gap-3 sm:gap-6 px-6 py-2.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-mint-soft">
            <MapPin className="w-3.5 h-3.5 text-sustainability-green" />
            <span>MUMBAI / CHENNAI</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sustainability-green animate-ping"></span>
            <div className="w-16 sm:w-28 h-0.5 border-t border-dashed border-sustainability-green/60"></div>
            <Globe className="w-4 h-4 text-ocean-accent" />
            <div className="w-16 sm:w-28 h-0.5 border-t border-dashed border-sustainability-green/60"></div>
            <span className="w-1.5 h-1.5 rounded-full bg-sustainability-green"></span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-mint-soft">
            <MapPin className="w-3.5 h-3.5 text-sustainability-green" />
            <span>SINGAPORE</span>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-warm-white tracking-tight leading-tight">
            Let's Build a Smarter, More Sustainable Shipping Corridor.
          </h2>
          <p className="text-base sm:text-lg text-slate-subtle leading-relaxed font-normal">
            Connect maritime data, strengthen verification, and turn sustainability commitments into measurable operational insights.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#platform"
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] shadow-lg shadow-sustainability-green/20 transition-all text-sm group"
          >
            <span>Explore the Platform</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#how-it-works"
            onClick={onApproachClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-warm-white bg-maritime-surface hover:bg-maritime-navy border border-maritime-border hover:border-slate-muted/60 transition-all text-sm"
          >
            <Compass className="w-4 h-4 text-mint-soft" />
            <span>Discover Our Approach</span>
          </a>
        </div>

        {/* Bilateral Pilot Summary */}
        <div className="pt-8 text-xs text-slate-muted flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sustainability-green" />
            <span>Pilot Demonstration Ready</span>
          </span>
          <span className="text-maritime-border">•</span>
          <span>Zero Hardware Lock-In</span>
          <span className="text-maritime-border">•</span>
          <span>Open Standards Compliant</span>
        </div>

      </div>
    </section>
  );
};
