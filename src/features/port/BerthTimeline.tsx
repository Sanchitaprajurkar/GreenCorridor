import React, { useState } from 'react';
import { Calendar, Ship, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import type { PortBerth, BerthReservation } from '../../types/port';

interface BerthTimelineProps {
  berths: PortBerth[];
  reservations: BerthReservation[];
}

const AVAILABLE_DATES = ['2026-10-20', '2026-10-21', '2026-10-22', '2026-10-23'];
const TIME_SLOTS = [
  { hour: 0, label: '00:00' },
  { hour: 4, label: '04:00' },
  { hour: 8, label: '08:00' },
  { hour: 12, label: '12:00' },
  { hour: 16, label: '16:00' },
  { hour: 20, label: '20:00' },
  { hour: 24, label: '24:00' },
];

export const BerthTimeline: React.FC<BerthTimelineProps> = ({
  berths,
  reservations,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-21');
  const [hoveredReservation, setHoveredReservation] = useState<BerthReservation | null>(null);

  const handlePrevDate = () => {
    const idx = AVAILABLE_DATES.indexOf(selectedDate);
    if (idx > 0) setSelectedDate(AVAILABLE_DATES[idx - 1]);
  };

  const handleNextDate = () => {
    const idx = AVAILABLE_DATES.indexOf(selectedDate);
    if (idx < AVAILABLE_DATES.length - 1) setSelectedDate(AVAILABLE_DATES[idx + 1]);
  };

  // Calculate percentage left and width for a 24-hour window
  const calculateBlockStyles = (startTime: string, endTime: string) => {
    const dayStart = new Date(`${selectedDate}T00:00:00`).getTime();
    const dayEnd = new Date(`${selectedDate}T23:59:59`).getTime();
    const resStart = new Date(startTime).getTime();
    const resEnd = new Date(endTime).getTime();

    // If outside the active day
    if (resEnd < dayStart || resStart > dayEnd) {
      return null;
    }

    const clampedStart = Math.max(dayStart, resStart);
    const clampedEnd = Math.min(dayEnd, resEnd);

    const totalDayMs = 24 * 60 * 60 * 1000;
    const leftPercent = ((clampedStart - dayStart) / totalDayMs) * 100;
    const widthPercent = Math.max(2, ((clampedEnd - clampedStart) / totalDayMs) * 100);

    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`,
    };
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-subtle/80 shadow-card">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-slate-subtle/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-display font-extrabold text-maritime-dark tracking-tight">
              Berth Schedule Timeline
            </h2>
            <span className="text-xs font-bold text-sustainability-green bg-mint-pale px-2.5 py-0.5 rounded-full border border-mint-border">
              24-Hour Gantt Window
            </span>
          </div>
          <p className="text-xs text-slate-muted mt-0.5">
            Hourly occupancy visualization across active terminal quay lanes.
          </p>
        </div>

        {/* Date Selector Navigation */}
        <div className="flex items-center gap-2 bg-[#FAFBF8] p-1.5 rounded-2xl border border-slate-subtle self-start sm:self-auto">
          <button
            type="button"
            onClick={handlePrevDate}
            disabled={AVAILABLE_DATES.indexOf(selectedDate) === 0}
            className="p-1 rounded-xl text-slate-muted hover:text-maritime-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl border border-slate-subtle/80 text-xs font-bold text-maritime-dark shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-sustainability-green" />
            <span>{selectedDate}</span>
          </div>

          <button
            type="button"
            onClick={handleNextDate}
            disabled={AVAILABLE_DATES.indexOf(selectedDate) === AVAILABLE_DATES.length - 1}
            className="p-1 rounded-xl text-slate-muted hover:text-maritime-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timeline Visual Container with Controlled Horizontal Scroll */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[700px] border border-slate-subtle/80 rounded-2xl bg-white overflow-hidden">
          
          {/* Time Axis Header */}
          <div className="grid grid-cols-12 bg-[#FAFBF8] border-b border-slate-subtle/80 text-[10px] font-mono font-bold text-slate-muted">
            <div className="col-span-3 p-3 border-r border-slate-subtle/80 uppercase tracking-wider">
              Berth Quay Lane
            </div>
            <div className="col-span-9 relative h-10 flex items-center justify-between px-3">
              {TIME_SLOTS.map((slot) => (
                <div key={slot.hour} className="flex flex-col items-center">
                  <span>{slot.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Berth Lanes */}
          <div className="divide-y divide-slate-subtle/60 text-xs">
            {berths.map((berth) => {
              // Find reservations for this berth
              const berthReservations = reservations.filter((r) => r.berthId === berth.id);

              return (
                <div key={berth.id} className="grid grid-cols-12 items-center hover:bg-slate-50/50 transition-colors">
                  
                  {/* Left Column: Berth info */}
                  <div className="col-span-3 p-3.5 border-r border-slate-subtle/70 bg-[#FAFCF9]/60">
                    <span className="font-mono text-[10px] text-slate-muted font-bold block">
                      {berth.id}
                    </span>
                    <span className="font-bold text-maritime-dark block truncate text-xs" title={berth.name}>
                      {berth.name.split('(')[0]}
                    </span>
                    <span className="text-[10px] text-slate-muted">
                      LOA {berth.maxLoaMeters}m • Draft {berth.maxDraftMeters}m
                    </span>
                  </div>

                  {/* Right Column: 24h Lane Bar */}
                  <div className="col-span-9 relative h-14 bg-white px-1 flex items-center">
                    
                    {/* Grid hour reference vertical guide lines */}
                    <div className="absolute inset-0 flex justify-between pointer-events-none px-3">
                      {TIME_SLOTS.map((slot) => (
                        <div key={slot.hour} className="w-px h-full bg-slate-100" />
                      ))}
                    </div>

                    {/* Maintenance lane state */}
                    {berth.status === 'Maintenance' && (
                      <div className="absolute inset-x-2 inset-y-2 bg-slate-100 border border-slate-300 rounded-xl flex items-center justify-center text-[11px] font-semibold text-slate-500">
                        <span>Maintenance Lockout (Dredging in progress)</span>
                      </div>
                    )}

                    {/* Reservation Blocks */}
                    {berth.status !== 'Maintenance' &&
                      berthReservations.map((res) => {
                        const style = calculateBlockStyles(res.startTime, res.endTime);
                        if (!style) return null;

                        const isActive = res.status === 'Active';
                        const isUpcoming = res.status === 'Upcoming';

                        return (
                          <div
                            key={res.id}
                            style={style}
                            onMouseEnter={() => setHoveredReservation(res)}
                            onMouseLeave={() => setHoveredReservation(null)}
                            className={`absolute top-2 bottom-2 rounded-xl px-2.5 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs overflow-hidden ${
                              isActive
                                ? 'bg-sustainability-green text-white hover:bg-sustainability-hover'
                                : isUpcoming
                                ? 'bg-sky-700 text-white hover:bg-sky-800'
                                : 'bg-slate-700 text-white hover:bg-slate-800'
                            }`}
                          >
                            <Ship className="w-3.5 h-3.5 shrink-0 opacity-90" />
                            <span className="font-bold text-xs truncate max-w-[150px]">
                              {res.vesselName}
                            </span>
                            <span className="text-[9px] font-mono opacity-80 hidden lg:inline">
                              ({res.startTime.split('T')[1]} - {res.endTime.split('T')[1]})
                            </span>
                          </div>
                        );
                      })}

                    {/* Empty Available lane hint */}
                    {berth.status === 'Available' && berthReservations.length === 0 && (
                      <span className="text-[10px] text-slate-300 font-semibold italic pl-4">
                        Unreserved / Ready for vessel allocation
                      </span>
                    )}

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Hovered Reservation Details Callout */}
      {hoveredReservation ? (
        <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-subtle/80 flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <Ship className="w-4 h-4 text-sustainability-green" />
            <div>
              <span className="font-bold text-maritime-dark">{hoveredReservation.vesselName}</span>
              <span className="text-slate-muted ml-2 font-mono">({hoveredReservation.voyageId})</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-text">
            <span>
              Service Window:{' '}
              <strong className="text-maritime-navy">
                {hoveredReservation.startTime.replace('T', ' ')} → {hoveredReservation.endTime.replace('T', ' ')}
              </strong>
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                hoveredReservation.status === 'Active'
                  ? 'bg-mint-soft text-sustainability-hover'
                  : 'bg-sky-50 text-sky-800'
              }`}
            >
              {hoveredReservation.status}
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between text-xs text-slate-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-sustainability-green" />
              <span>Active Berthed Service</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-700" />
              <span>Confirmed Upcoming Reservation</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300" />
              <span>Available Slot</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-muted">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Hover reservation blocks to inspect window</span>
          </div>
        </div>
      )}

    </div>
  );
};
