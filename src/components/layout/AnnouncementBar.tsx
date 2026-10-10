import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-maritime-dark text-warm-white border-b border-maritime-border/40 py-2 px-4 text-xs tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-sustainability-green/20 text-sustainability-green">
            <Globe className="w-3 h-3" />
          </span>
          <span className="font-medium text-slate-subtle">
            Connecting India and Singapore through trusted digital maritime intelligence.
          </span>
          <span className="hidden md:inline-flex items-center text-sustainability-green font-semibold ml-2">
            Corridor Pilot Framework 2026
          </span>
        </div>
        
        <div className="hidden sm:flex items-center space-x-4 text-slate-muted text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sustainability-green animate-pulse"></span>
            <span className="text-warm-white/80">Testbed Active</span>
          </span>
          <span className="text-maritime-border">|</span>
          <a
            href="#platform"
            className="text-slate-subtle hover:text-warm-white transition-colors flex items-center gap-1 group"
          >
            <span>4 Connected Modules</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};
