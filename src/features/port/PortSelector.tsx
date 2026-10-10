import React from 'react';
import { Anchor, MapPin, Clock, Layers } from 'lucide-react';
import type { PortId, PortOptionInfo } from '../../types/port';
import { DEMO_PORTS_CONFIG } from '../../data/portMockData';

interface PortSelectorProps {
  selectedPortId: PortId;
  onSelectPort: (portId: PortId) => void;
}

export const PortSelector: React.FC<PortSelectorProps> = ({
  selectedPortId,
  onSelectPort,
}) => {
  const currentPort = DEMO_PORTS_CONFIG.find((p) => p.id === selectedPortId) || DEMO_PORTS_CONFIG[0];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-subtle/80 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      {/* Port Switcher Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-muted flex items-center gap-1.5 shrink-0">
          <Anchor className="w-3.5 h-3.5 text-sustainability-green" />
          <span>Active Port Terminal:</span>
        </span>

        <div className="flex items-center gap-1.5 flex-wrap">
          {DEMO_PORTS_CONFIG.map((port: PortOptionInfo) => {
            const isSelected = port.id === selectedPortId;
            return (
              <button
                key={port.id}
                type="button"
                onClick={() => onSelectPort(port.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-maritime-navy text-white shadow-xs scale-[1.02]'
                    : 'bg-slate-100/80 text-slate-text hover:bg-slate-200/60 border border-slate-200/50'
                }`}
              >
                <span>{port.country === 'Singapore' ? '🇸🇬' : '🇮🇳'}</span>
                <span>{port.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Port Metadata Banner */}
      <div className="flex items-center gap-3 text-xs text-slate-muted bg-[#FAFBF8] px-3.5 py-2 rounded-xl border border-slate-subtle/70">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-maritime-dark">{currentPort.code}</span>
        </div>
        <span className="text-slate-300">•</span>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{currentPort.timezone}</span>
        </div>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <div className="hidden sm:flex items-center gap-1 text-[11px]">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <span>{currentPort.terminals.length} Terminals Monitored</span>
        </div>
      </div>

    </div>
  );
};
