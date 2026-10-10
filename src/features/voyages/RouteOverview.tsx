import React from 'react';
import { MapPin, Ship, Compass, Clock, Navigation2 } from 'lucide-react';
import type { RouteAlternative, PortOption } from '../../types/voyage';
import { formatDuration } from '../../utils/voyageCalculations';

interface RouteOverviewProps {
  originPort: PortOption | null;
  destinationPort: PortOption | null;
  selectedRoute: RouteAlternative | null;
  vesselName: string;
}

export const RouteOverview: React.FC<RouteOverviewProps> = ({
  originPort,
  destinationPort,
  selectedRoute,
  vesselName,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-subtle/80 shadow-subtle mb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-subtle/60 gap-2">
        <div>
          <h2 className="text-base font-display font-bold text-maritime-dark flex items-center gap-2">
            <span>Route Overview</span>
            {selectedRoute && (
              <span className="text-xs font-mono font-semibold text-sustainability-green bg-mint-pale px-2.5 py-0.5 rounded-full border border-mint-border">
                {selectedRoute.name}
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-muted">
            Stylized corridor navigation trajectory across the Arabian Sea, Bay of Bengal, and Malacca Strait
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-maritime-navy">
          <Navigation2 className="w-3.5 h-3.5 text-sustainability-green" />
          <span>Vessel: {vesselName || 'Corridor Vessel'}</span>
        </div>
      </div>

      {/* Stylized Nautical Map Graphic */}
      <div className="relative bg-[#0B202B] text-warm-white rounded-2xl p-6 sm:p-8 overflow-hidden shadow-inner my-2">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-corridor-grid-dark opacity-35 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-sustainability-green/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Origin Marker */}
          <div className="flex items-center gap-3 bg-maritime-navy/90 p-4 rounded-xl border border-sustainability-green/40 w-full md:w-auto shadow-md">
            <div className="w-10 h-10 rounded-xl bg-sustainability-light border border-sustainability-green/40 flex items-center justify-center text-sustainability-green shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-sustainability-green uppercase tracking-wider block">
                PORT OF ORIGIN
              </span>
              <span className="text-sm font-bold text-warm-white block truncate max-w-[200px]">
                {originPort?.name || 'JNPA (Mumbai)'}
              </span>
              <span className="text-[10px] text-slate-light font-mono">
                {originPort?.code || 'INNSA'} • {originPort?.country || 'India'}
              </span>
            </div>
          </div>

          {/* Dotted Route Connector with Ship Position */}
          <div className="flex-1 w-full flex flex-col items-center px-4 relative my-6 md:my-0">
            <div className="w-full relative flex items-center justify-between">
              
              {/* Dotted Curved Navigation Track */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-sustainability-green/60 -z-0" />

              {/* Waypoint 1 (Laccadive / Sri Lanka) */}
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-warm-white relative z-10 shadow-sm" title="Sri Lanka Waypoint" />

              {/* Waypoint 2 (Nicobar Island Entry) */}
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-warm-white relative z-10 shadow-sm" title="Nicobar Entry" />

              {/* Active Ship Icon (Centrally Progressing) */}
              <div className="p-2.5 rounded-xl bg-sustainability-green text-warm-white shadow-glow-green relative z-20 flex items-center gap-1.5 animate-pulse">
                <Ship className="w-4 h-4" />
                <span className="text-[10px] font-mono font-bold">Planned Track</span>
              </div>

              {/* Waypoint 3 (One Fathom Bank) */}
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-warm-white relative z-10 shadow-sm" title="One Fathom Bank" />
            </div>

            {/* Selected Route Specs on Route Track */}
            {selectedRoute && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-mint-soft">
                <span className="flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-sustainability-green" />
                  <span>{selectedRoute.distanceNm.toLocaleString()} nm</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-ocean-accent" />
                  <span>{formatDuration(selectedRoute.durationHours)}</span>
                </span>
                <span>•</span>
                <span className="text-sustainability-green font-bold">
                  {selectedRoute.averageSpeedKnots} knots avg
                </span>
              </div>
            )}
          </div>

          {/* Destination Marker */}
          <div className="flex items-center gap-3 bg-maritime-navy/90 p-4 rounded-xl border border-ocean-accent/40 w-full md:w-auto shadow-md">
            <div className="w-10 h-10 rounded-xl bg-ocean-blue border border-ocean-border flex items-center justify-center text-maritime-navy shrink-0">
              <MapPin className="w-5 h-5 text-maritime-navy" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-ocean-accent uppercase tracking-wider block">
                PORT OF DESTINATION
              </span>
              <span className="text-sm font-bold text-warm-white block truncate max-w-[200px]">
                {destinationPort?.name || 'PSA Singapore'}
              </span>
              <span className="text-[10px] text-slate-light font-mono">
                {destinationPort?.code || 'SGSIN'} • {destinationPort?.country || 'Singapore'}
              </span>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-[11px] text-slate-muted">
          Illustrative corridor route geometry — designed for pre-departure energy estimation and green fuel budgeting.
        </p>
      </div>

    </div>
  );
};
