import React, { useState } from 'react';
import { MapPin, Ship, Navigation } from 'lucide-react';
import { MOCK_CORRIDOR_SHIPS } from '../../data/dashboardMockData';
import type { CorridorShipTransit } from '../../types/dashboard';

interface CorridorOverviewProps {
  onSelectShip?: (ship: CorridorShipTransit) => void;
}

export const CorridorOverview: React.FC<CorridorOverviewProps> = ({ onSelectShip }) => {
  const [activeShipId, setActiveShipId] = useState<string>(MOCK_CORRIDOR_SHIPS[0].id);

  const activeShip = MOCK_CORRIDOR_SHIPS.find((s) => s.id === activeShipId) || MOCK_CORRIDOR_SHIPS[0];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-subtle/80 shadow-subtle flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-subtle/60 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-display font-bold text-maritime-dark">
              Corridor Activity
            </h2>
            <span className="text-[10px] bg-ocean-blue text-maritime-navy px-2 py-0.5 rounded-full font-bold">
              India ⇄ Singapore
            </span>
          </div>
          <p className="text-xs text-slate-muted">
            Stylized maritime transit corridor with shared voyage identity checkpoints
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-slate-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sustainability-green" />
            <span>Green Fuel Transit</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>JIT Arrival Approaching</span>
          </span>
        </div>
      </div>

      {/* Corridor Stylized Route SVG Illustration */}
      <div className="relative bg-[#0E2631] text-warm-white rounded-2xl p-6 sm:p-8 overflow-hidden shadow-inner my-2">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-corridor-grid-dark opacity-30 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-sustainability-green/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Origin: INDIA */}
          <div className="flex items-center gap-3 bg-maritime-dark/90 p-3.5 rounded-xl border border-sustainability-green/30 w-full md:w-auto">
            <div className="w-10 h-10 rounded-lg bg-sustainability-light border border-sustainability-green/40 flex items-center justify-center text-sustainability-green shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-sustainability-green uppercase tracking-wider block">
                CORRIDOR ORIGIN
              </span>
              <span className="text-sm font-bold text-warm-white block">
                INDIA PORTS
              </span>
              <span className="text-[10px] text-slate-light">
                JNPA (Mumbai) • Chennai • Cochin
              </span>
            </div>
          </div>

          {/* Dotted Route Connector with Ship Position Markers */}
          <div className="flex-1 w-full flex flex-col items-center px-4 relative my-4 md:my-0">
            <div className="w-full relative flex items-center justify-between">
              
              {/* Dotted line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-sustainability-green/50 -z-0" />

              {/* Transit Ships along the line */}
              {MOCK_CORRIDOR_SHIPS.map((ship) => {
                const isSelected = activeShipId === ship.id;
                return (
                  <button
                    key={ship.id}
                    onClick={() => {
                      setActiveShipId(ship.id);
                      if (onSelectShip) onSelectShip(ship);
                    }}
                    type="button"
                    style={{ left: `${ship.progressPercent}%` }}
                    className={`absolute -translate-x-1/2 -top-5 p-2 rounded-xl transition-all flex flex-col items-center group z-10 ${
                      isSelected
                        ? 'bg-sustainability-green text-warm-white scale-110 shadow-glow-green'
                        : 'bg-maritime-surface hover:bg-maritime-navy text-mint-soft hover:scale-105 border border-maritime-border'
                    }`}
                    title={`${ship.vesselName} (${ship.progressPercent}% transit)`}
                  >
                    <Ship className="w-4 h-4" />
                    <span className="text-[9px] font-mono mt-0.5 font-bold whitespace-nowrap hidden sm:block">
                      {ship.progressPercent}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Maritime Route Title */}
            <div className="mt-8 text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-mint-soft/80 block">
                MALACCA STRAIT & BAY OF BENGAL GREEN TRANSIT LANE
              </span>
            </div>
          </div>

          {/* Destination: SINGAPORE */}
          <div className="flex items-center gap-3 bg-maritime-dark/90 p-3.5 rounded-xl border border-ocean-accent/40 w-full md:w-auto">
            <div className="w-10 h-10 rounded-lg bg-ocean-blue border border-ocean-border flex items-center justify-center text-maritime-navy shrink-0">
              <MapPin className="w-5 h-5 text-maritime-navy" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-ocean-accent uppercase tracking-wider block">
                CORRIDOR DESTINATION
              </span>
              <span className="text-sm font-bold text-warm-white block">
                SINGAPORE PORTS
              </span>
              <span className="text-[10px] text-slate-light">
                PSA Terminals • Jurong • Tuas
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Selected Ship Detail Bar */}
      <div className="mt-4 p-4 rounded-xl bg-warm-white border border-slate-subtle/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sustainability-light text-sustainability-green flex items-center justify-center shrink-0">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-maritime-dark">
                {activeShip.vesselName}
              </span>
              <span className="text-[10px] font-mono font-semibold text-slate-muted">
                ({activeShip.voyageId})
              </span>
            </div>
            <span className="text-slate-text">
              {activeShip.origin} ➔ {activeShip.destination} • Fuel: <strong className="text-sustainability-green">{activeShip.fuelType}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-dark">
          <div className="text-right">
            <span className="text-[10px] text-slate-muted block">Estimated ETA:</span>
            <span className="font-semibold text-maritime-navy">{activeShip.eta}</span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-mint-pale text-sustainability-hover border border-mint-border">
            {activeShip.status}
          </span>
        </div>
      </div>

      {/* Notice */}
      <div className="mt-3 text-center">
        <p className="text-[11px] text-slate-muted">
          Illustrative route progression — vessel checkpoints are populated from voyage milestones and port clearance entries.
        </p>
      </div>

    </div>
  );
};
