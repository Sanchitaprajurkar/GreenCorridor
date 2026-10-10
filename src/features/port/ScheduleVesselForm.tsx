import React, { useState } from 'react';
import {
  Calendar,
  Anchor,
  Clock,
  AlertCircle,
  X,
  Send,
  Save,
} from 'lucide-react';
import type {
  ArrivalSchedule,
  PortId,
  PortBerth,
  ScheduleVesselFormData,
} from '../../types/port';
import { DEMO_PORTS_CONFIG } from '../../data/portMockData';
import { INITIAL_PLANNED_VOYAGES } from '../../data/voyageMockData';

interface ScheduleVesselFormProps {
  currentPortId: PortId;
  berths: PortBerth[];
  onConfirmSchedule: (newArrival: ArrivalSchedule, asDraft: boolean) => void;
  onCancel: () => void;
}

export const ScheduleVesselForm: React.FC<ScheduleVesselFormProps> = ({
  currentPortId,
  berths,
  onConfirmSchedule,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ScheduleVesselFormData>({
    voyageId: 'VY-2026-0910',
    vesselName: 'Eco Horizon XI',
    vesselType: 'Container Ship',
    loaMeters: 310,
    draftMeters: 13.5,
    cargoType: 'Containerized Dry',
    portId: currentPortId,
    eta: '2026-10-22T08:00',
    etd: '2026-10-23T04:00',
    serviceDurationHours: 20,
    assignedBerthId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSelectPreloadedVoyage = (voyageId: string) => {
    const found = INITIAL_PLANNED_VOYAGES.find((v) => v.id === voyageId);
    if (found) {
      setFormData((prev) => ({
        ...prev,
        voyageId: found.id,
        vesselName: found.vesselName,
        vesselType: found.vesselType || prev.vesselType,
        cargoType: found.cargoType || 'Containerized Dry',
      }));
    } else {
      setFormData((prev) => ({ ...prev, voyageId }));
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.voyageId.trim()) errs.voyageId = 'Voyage ID is required.';
    if (!formData.vesselName.trim()) errs.vesselName = 'Vessel name is required.';
    if (!formData.loaMeters || formData.loaMeters <= 0) {
      errs.loaMeters = 'Length Overall (LOA) must be a positive number in meters.';
    }
    if (!formData.draftMeters || formData.draftMeters <= 0) {
      errs.draftMeters = 'Draft must be a positive number in meters.';
    }

    const arrivalMs = new Date(formData.eta).getTime();
    const departureMs = new Date(formData.etd).getTime();

    if (isNaN(arrivalMs)) errs.eta = 'Valid arrival date/time is required.';
    if (isNaN(departureMs)) errs.etd = 'Valid departure date/time is required.';

    if (arrivalMs >= departureMs) {
      errs.etd = 'Estimated departure must be after arrival date and time.';
    }

    // If a berth was selected manually, verify compatibility
    if (formData.assignedBerthId) {
      const selectedBerth = berths.find((b) => b.id === formData.assignedBerthId);
      if (selectedBerth) {
        if (formData.loaMeters > selectedBerth.maxLoaMeters) {
          errs.assignedBerthId = `Vessel LOA (${formData.loaMeters}m) exceeds ${selectedBerth.name} limit (${selectedBerth.maxLoaMeters}m).`;
        } else if (formData.draftMeters > selectedBerth.maxDraftMeters) {
          errs.assignedBerthId = `Vessel draft (${formData.draftMeters}m) exceeds berth depth (${selectedBerth.maxDraftMeters}m).`;
        }
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (asDraft: boolean) => {
    if (!validate()) return;

    const assignedBerthObj = berths.find((b) => b.id === formData.assignedBerthId);

    const newArrival: ArrivalSchedule = {
      id: `arr-usr-${Date.now()}`,
      voyageId: formData.voyageId,
      vesselName: formData.vesselName,
      vesselType: formData.vesselType,
      originPort: 'Corridor Bilateral Terminal',
      destinationPort: DEMO_PORTS_CONFIG.find((p) => p.id === formData.portId)?.name || 'Singapore Port',
      portId: formData.portId,
      eta: formData.eta,
      etd: formData.etd,
      serviceDurationHours: formData.serviceDurationHours,
      loaMeters: formData.loaMeters,
      draftMeters: formData.draftMeters,
      assignedBerthId: formData.assignedBerthId || undefined,
      assignedBerthName: assignedBerthObj ? assignedBerthObj.name : undefined,
      arrivalStatus: asDraft ? 'Scheduled' : formData.assignedBerthId ? 'Approaching' : 'Awaiting Berth',
      fuelVerificationStatus: 'Verified',
      fuelType: 'Bio-Methanol (80% blend)',
      cargoDescription: `${formData.cargoType} corridor transit`,
    };

    onConfirmSchedule(newArrival, asDraft);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-subtle/80 relative">
      
      {/* Modal Close Button */}
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-5 right-5 p-2 rounded-full text-slate-muted hover:text-maritime-dark hover:bg-slate-100 transition-colors"
        aria-label="Close form"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-subtle/80">
        <div className="w-10 h-10 rounded-2xl bg-mint-soft border border-mint-border flex items-center justify-center text-sustainability-green shrink-0">
          <Anchor className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-display font-extrabold text-maritime-dark tracking-tight">
            Schedule Vessel Arrival
          </h2>
          <p className="text-xs text-slate-muted mt-0.5">
            Coordinate port entry ETA, vessel dimensions, and quay reservation window.
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(false);
        }}
        className="space-y-4"
      >
        {/* Voyage & Vessel identification */}
        <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-slate-subtle/80 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Voyage ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.voyageId}
                onChange={(e) => setFormData({ ...formData, voyageId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs font-mono outline-none bg-white focus:border-sustainability-green"
              />
              <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-muted">
                <span className="shrink-0">Preload:</span>
                {INITIAL_PLANNED_VOYAGES.slice(0, 3).map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleSelectPreloadedVoyage(v.id)}
                    className="underline hover:text-sustainability-green font-mono"
                  >
                    {v.id}
                  </button>
                ))}
              </div>
              {errors.voyageId && <p className="text-[10px] text-rose-600 mt-0.5">{errors.voyageId}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Vessel Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.vesselName}
                onChange={(e) => setFormData({ ...formData, vesselName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              />
              {errors.vesselName && <p className="text-[10px] text-rose-600 mt-0.5">{errors.vesselName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Vessel Type
              </label>
              <select
                value={formData.vesselType}
                onChange={(e) => setFormData({ ...formData, vesselType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              >
                <option value="Container Ship">Container Ship</option>
                <option value="Bulk Carrier">Bulk Carrier</option>
                <option value="LNG Carrier">LNG Carrier</option>
                <option value="Tanker">Tanker</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                LOA (Length, m) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={formData.loaMeters}
                onChange={(e) => setFormData({ ...formData, loaMeters: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs font-mono outline-none bg-white focus:border-sustainability-green"
              />
              {errors.loaMeters && <p className="text-[10px] text-rose-600 mt-0.5">{errors.loaMeters}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Draft (Depth, m) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.draftMeters}
                onChange={(e) => setFormData({ ...formData, draftMeters: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs font-mono outline-none bg-white focus:border-sustainability-green"
              />
              {errors.draftMeters && <p className="text-[10px] text-rose-600 mt-0.5">{errors.draftMeters}</p>}
            </div>
          </div>
        </div>

        {/* Port & Timings */}
        <div className="p-4 rounded-2xl bg-[#FAFCF9] border border-slate-subtle/80 space-y-3">
          <div>
            <label className="block text-xs font-bold text-maritime-dark mb-1">
              Destination Port
            </label>
            <select
              value={formData.portId}
              onChange={(e) => setFormData({ ...formData, portId: e.target.value as PortId })}
              className="w-full px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
            >
              {DEMO_PORTS_CONFIG.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sustainability-green" />
                <span>Estimated Arrival (ETA) <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="datetime-local"
                value={formData.eta}
                onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              />
              {errors.eta && <p className="text-[10px] text-rose-600 mt-0.5">{errors.eta}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sustainability-green" />
                <span>Estimated Departure (ETD) <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="datetime-local"
                value={formData.etd}
                onChange={(e) => setFormData({ ...formData, etd: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              />
              {errors.etd && <p className="text-[10px] text-rose-600 mt-0.5">{errors.etd}</p>}
            </div>
          </div>

          {/* Optional Direct Berth Allocation */}
          <div>
            <label className="block text-xs font-bold text-maritime-dark mb-1">
              Designated Berth (Optional, or leave unassigned for engine recommendation)
            </label>
            <select
              value={formData.assignedBerthId || ''}
              onChange={(e) => setFormData({ ...formData, assignedBerthId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
            >
              <option value="">Leave Unassigned (Recommend Berth)</option>
              {berths.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — Status: {b.status} (Max LOA {b.maxLoaMeters}m, Draft {b.maxDraftMeters}m)
                </option>
              ))}
            </select>
            {errors.assignedBerthId && (
              <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.assignedBerthId}</span>
              </p>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-3 border-t border-slate-subtle/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-muted hover:text-maritime-dark"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-dark bg-white border border-slate-subtle hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>Save as Draft</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover transition-all flex items-center gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Confirm Arrival Schedule</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
};
