import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Anchor,
  Plus,
  ArrowDown,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import type {
  PortId,
  ArrivalSchedule,
  BerthReservation,
} from '../../types/port';
import {
  loadSmartDockState,
  saveSmartDockState,
} from '../../data/portMockData';
import { PortSelector } from './PortSelector';
import { PortKpiCards } from './PortKpiCards';
import { ArrivalScheduleTable } from './ArrivalScheduleTable';
import { BerthAvailabilityBoard } from './BerthAvailabilityBoard';
import { BerthTimeline } from './BerthTimeline';
import { BerthRecommendations } from './BerthRecommendations';
import { ScheduleVesselForm } from './ScheduleVesselForm';
import { OperationalAlerts } from './OperationalAlerts';
import { VoyageReadiness } from './VoyageReadiness';

export const SmartDock: React.FC = () => {
  const [selectedPortId, setSelectedPortId] = useState<PortId>('port-singapore');
  const [state, setState] = useState(() => loadSmartDockState());
  const [selectedVessel, setSelectedVessel] = useState<ArrivalSchedule | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  const updateState = (updater: (prev: typeof state) => typeof state) => {
    setState((prev) => {
      const next = updater(prev);
      saveSmartDockState(next);
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter current port's records
  const currentArrivals = state.arrivals.filter((a) => a.portId === selectedPortId);
  const currentBerths = state.berths.filter((b) => b.portId === selectedPortId);
  const currentAlerts = state.alerts.filter((a) => a.portId === selectedPortId);

  // Default select the first unassigned vessel for Singapore (Eco Horizon IX) on mount
  useEffect(() => {
    if (!selectedVessel || selectedVessel.portId !== selectedPortId) {
      const firstAwaiting = currentArrivals.find((a) => a.arrivalStatus === 'Awaiting Berth') || currentArrivals[0] || null;
      setSelectedVessel(firstAwaiting);
    }
  }, [selectedPortId, currentArrivals]);

  // Handle assigning an eligible berth
  const handleAssignBerth = (vesselToAssign: ArrivalSchedule, berthId: string) => {
    const targetBerth = currentBerths.find((b) => b.id === berthId);
    if (!targetBerth) return;

    updateState((prev) => {
      // 1. Update vessel arrival record
      const updatedArrivals = prev.arrivals.map((arr) => {
        if (arr.id === vesselToAssign.id) {
          return {
            ...arr,
            assignedBerthId: targetBerth.id,
            assignedBerthName: targetBerth.name,
            arrivalStatus: arr.arrivalStatus === 'Awaiting Berth' ? ('Approaching' as const) : arr.arrivalStatus,
          };
        }
        return arr;
      });

      // 2. Update berth status on the board
      const updatedBerths = prev.berths.map((b) => {
        if (b.id === targetBerth.id) {
          return {
            ...b,
            status: 'Reserved' as const,
            assignedVesselName: vesselToAssign.vesselName,
            assignedVoyageId: vesselToAssign.voyageId,
            estimatedAvailableTime: vesselToAssign.etd,
          };
        }
        return b;
      });

      // 3. Create reservation in schedule
      const newReservation: BerthReservation = {
        id: `res-${Date.now()}`,
        berthId: targetBerth.id,
        voyageId: vesselToAssign.voyageId,
        vesselName: vesselToAssign.vesselName,
        startTime: vesselToAssign.eta,
        endTime: vesselToAssign.etd,
        status: 'Upcoming',
      };

      // 4. Remove any "unassigned" alerts for this vessel
      const updatedAlerts = prev.alerts.filter(
        (alt) => !(alt.voyageId === vesselToAssign.voyageId && alt.category === 'unassigned')
      );

      return {
        ...prev,
        arrivals: updatedArrivals,
        berths: updatedBerths,
        reservations: [newReservation, ...prev.reservations],
        alerts: updatedAlerts,
      };
    });

    // Update selected vessel state
    setSelectedVessel((prev) =>
      prev && prev.id === vesselToAssign.id
        ? {
            ...prev,
            assignedBerthId: targetBerth.id,
            assignedBerthName: targetBerth.name,
            arrivalStatus: 'Approaching',
          }
        : prev
    );

    showToast(`Berth "${targetBerth.name}" successfully assigned to ${vesselToAssign.vesselName}.`);
  };

  // Handle scheduling a new vessel
  const handleConfirmSchedule = (newArrival: ArrivalSchedule, asDraft: boolean) => {
    updateState((prev) => ({
      ...prev,
      arrivals: [newArrival, ...prev.arrivals],
    }));

    setIsScheduleModalOpen(false);
    setSelectedVessel(newArrival);
    showToast(
      asDraft
        ? `Vessel arrival for ${newArrival.vesselName} saved as draft.`
        : `Vessel ${newArrival.vesselName} scheduled for port entry.`
    );
  };

  const scrollToSchedule = () => {
    const el = document.getElementById('berth-schedule-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRecommendations = () => {
    const el = document.getElementById('recommendations-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn pb-16">
        
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-maritime-dark text-white px-5 py-3 rounded-2xl shadow-2xl border border-sustainability-green/40 flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-sustainability-green shrink-0" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* 1. Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-subtle/80 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-2">
              {/* Breadcrumb & Module Tag */}
              <div className="flex items-center gap-2 text-xs">
                <Link to="/dashboard" className="text-slate-muted hover:text-sustainability-green">
                  Dashboard
                </Link>
                <span className="text-slate-300">/</span>
                <span className="font-bold text-maritime-navy">SmartDock</span>
                <span className="mx-1 text-slate-300">•</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  MODULE 03
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  DEMO DATA
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-mint-soft border border-mint-border flex items-center justify-center text-sustainability-green shrink-0">
                  <Anchor className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-maritime-dark tracking-tight">
                    Smart Port Coordination
                  </h1>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-muted max-w-3xl leading-relaxed">
                Monitor vessel arrivals, coordinate berth schedules, and evaluate operationally compatible berth recommendations across bilateral shipping corridor terminals.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              
              <button
                type="button"
                onClick={scrollToSchedule}
                className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-slate-dark bg-white border border-slate-subtle/80 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>View Berth Schedule</span>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(true)}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-sustainability-green/20"
              >
                <Plus className="w-4 h-4" />
                <span>+ Schedule Vessel</span>
              </button>

            </div>

          </div>
        </div>

        {/* 2. Port Selector */}
        <PortSelector
          selectedPortId={selectedPortId}
          onSelectPort={(pId) => setSelectedPortId(pId)}
        />

        {/* 3. Operational KPI Cards */}
        <PortKpiCards
          arrivals={currentArrivals}
          berths={currentBerths}
          alerts={currentAlerts}
        />

        {/* 4. Operational Alerts Banner */}
        <OperationalAlerts
          alerts={currentAlerts}
          onActionClick={(alt) => {
            if (alt.category === 'unassigned') {
              scrollToRecommendations();
            } else if (alt.category === 'eta_delayed') {
              scrollToSchedule();
            }
          }}
        />

        {/* 5. Vessel Arrival Schedule Table */}
        <ArrivalScheduleTable
          arrivals={currentArrivals}
          selectedVesselId={selectedVessel?.id}
          onSelectVessel={(v) => {
            setSelectedVessel(v);
            scrollToRecommendations();
          }}
          onRequestRecommendation={(v) => {
            setSelectedVessel(v);
            scrollToRecommendations();
          }}
        />

        {/* 6. Berth Recommendation Engine Card */}
        <div id="recommendations-section">
          <BerthRecommendations
            vessel={selectedVessel}
            berths={currentBerths}
            reservations={state.reservations}
            onAssignBerth={handleAssignBerth}
          />
        </div>

        {/* 7. Green Corridor Voyage Readiness Pipeline */}
        <VoyageReadiness vessel={selectedVessel} />

        {/* 8. Berth Availability Board */}
        <div id="berth-schedule-section">
          <BerthAvailabilityBoard
            berths={currentBerths}
            selectedBerthId={selectedVessel?.assignedBerthId}
          />
        </div>

        {/* 9. Berth Schedule Timeline (Gantt Chart) */}
        <BerthTimeline
          berths={currentBerths}
          reservations={state.reservations}
        />

        {/* Schedule Vessel Modal */}
        {isScheduleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-maritime-dark/80 backdrop-blur-sm animate-fadeIn">
            <ScheduleVesselForm
              currentPortId={selectedPortId}
              berths={currentBerths}
              onConfirmSchedule={handleConfirmSchedule}
              onCancel={() => setIsScheduleModalOpen(false)}
            />
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
