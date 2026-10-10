import React, { useState } from 'react';
import {
  Ship,
  MapPin,
  Package,
  Fuel,
  ArrowRight,
  RotateCcw,
  Save,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import type { VoyageFormData, VesselType, RoutePreference, CargoType } from '../../types/voyage';
import { DEMO_PORTS, DEMO_FUELS } from '../../data/voyageMockData';

interface VoyageFormProps {
  initialData?: Partial<VoyageFormData>;
  onCompareRoutes: (data: VoyageFormData) => void;
  onSaveAsDraft: (data: VoyageFormData) => void;
}

export const VoyageForm: React.FC<VoyageFormProps> = ({
  initialData,
  onCompareRoutes,
  onSaveAsDraft,
}) => {
  const [vesselName, setVesselName] = useState(initialData?.vesselName || 'Eco Horizon IX');
  const [imoNumber, setImoNumber] = useState(initialData?.imoNumber || '9890123');
  const [vesselType, setVesselType] = useState<VesselType>(initialData?.vesselType || 'Container Ship');
  const [averageSpeedKnots, setAverageSpeedKnots] = useState<number>(initialData?.averageSpeedKnots || 16.5);

  const [originPortId, setOriginPortId] = useState(initialData?.originPortId || 'port-jnpa');
  const [destinationPortId, setDestinationPortId] = useState(initialData?.destinationPortId || 'port-singapore-psa');
  const [departureDateTime, setDepartureDateTime] = useState(initialData?.departureDateTime || '2026-10-20T08:00');
  const [arrivalDateTime, setArrivalDateTime] = useState(initialData?.arrivalDateTime || '2026-10-26T18:00');
  const [routePreference, setRoutePreference] = useState<RoutePreference>(initialData?.routePreference || 'Balanced');

  const [cargoType, setCargoType] = useState<CargoType>(initialData?.cargoType || 'Containerized Dry');
  const [cargoWeightTonnes, setCargoWeightTonnes] = useState<number>(initialData?.cargoWeightTonnes || 28000);
  const [cargoDescription, setCargoDescription] = useState(initialData?.cargoDescription || 'Manufactured high-value electronics and auto components');

  const [fuelType, setFuelType] = useState(initialData?.fuelType || 'Bio-Methanol (80% blend)');
  const [estimatedFuelConsumption, setEstimatedFuelConsumption] = useState<string>(
    initialData?.estimatedFuelConsumption ? String(initialData.estimatedFuelConsumption) : ''
  );
  const [fuelPricePerTonne, setFuelPricePerTonne] = useState<number>(
    initialData?.fuelPricePerTonne || 780
  );

  // Inline Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!vesselName.trim()) {
      newErrors.vesselName = 'Vessel name is required.';
    }

    if (!averageSpeedKnots || averageSpeedKnots <= 0) {
      newErrors.averageSpeedKnots = 'Average speed must be greater than 0 knots.';
    } else if (averageSpeedKnots > 35) {
      newErrors.averageSpeedKnots = 'Commercial cargo vessels typically operate under 30 knots.';
    }

    if (originPortId === destinationPortId) {
      newErrors.destinationPortId = 'Destination port must differ from origin port.';
    }

    if (!departureDateTime) {
      newErrors.departureDateTime = 'Departure date and time are required.';
    }

    if (!arrivalDateTime) {
      newErrors.arrivalDateTime = 'Estimated arrival date and time are required.';
    } else if (departureDateTime && new Date(arrivalDateTime) <= new Date(departureDateTime)) {
      newErrors.arrivalDateTime = 'Estimated arrival must be after departure time.';
    }

    if (!cargoWeightTonnes || cargoWeightTonnes <= 0) {
      newErrors.cargoWeightTonnes = 'Cargo weight must be a positive number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFormData = (): VoyageFormData => ({
    vesselName: vesselName.trim(),
    imoNumber: imoNumber.trim(),
    vesselType,
    averageSpeedKnots: Number(averageSpeedKnots),
    originPortId,
    destinationPortId,
    departureDateTime,
    arrivalDateTime,
    routePreference,
    cargoType,
    cargoWeightTonnes: Number(cargoWeightTonnes),
    cargoDescription: cargoDescription.trim(),
    fuelType,
    estimatedFuelConsumption: estimatedFuelConsumption ? Number(estimatedFuelConsumption) : undefined,
    fuelPricePerTonne: Number(fuelPricePerTonne) || undefined,
  });

  const handleCompareClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onCompareRoutes(getFormData());
      // Smooth scroll to comparison section
      setTimeout(() => {
        const el = document.getElementById('route-comparison');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSaveDraftClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!vesselName.trim()) {
      setErrors({ vesselName: 'Vessel name is required even for draft records.' });
      return;
    }
    onSaveAsDraft(getFormData());
  };

  const handleReset = () => {
    setVesselName('Eco Horizon IX');
    setImoNumber('9890123');
    setVesselType('Container Ship');
    setAverageSpeedKnots(16.5);
    setOriginPortId('port-jnpa');
    setDestinationPortId('port-singapore-psa');
    setDepartureDateTime('2026-10-20T08:00');
    setArrivalDateTime('2026-10-26T18:00');
    setRoutePreference('Balanced');
    setCargoType('Containerized Dry');
    setCargoWeightTonnes(28000);
    setCargoDescription('Manufactured high-value electronics and auto components');
    setFuelType('Bio-Methanol (80% blend)');
    setEstimatedFuelConsumption('');
    setFuelPricePerTonne(780);
    setErrors({});
  };

  // Sync default price when fuel changes
  const handleFuelChange = (selectedFuelName: string) => {
    setFuelType(selectedFuelName);
    const matched = DEMO_FUELS.find((f) => f.name === selectedFuelName);
    if (matched) {
      setFuelPricePerTonne(matched.defaultPricePerTonne);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-subtle/80 shadow-subtle mb-8">
      
      {/* Form Title & Subtitle */}
      <div className="pb-4 mb-6 border-b border-slate-subtle/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-display font-bold text-maritime-dark flex items-center gap-2">
            <span>Register New Voyage</span>
            <span className="text-[10px] font-mono text-slate-muted bg-slate-100 px-2 py-0.5 rounded font-normal">
              GreenTwin Simulator
            </span>
          </h2>
          <p className="text-xs text-slate-muted">
            Configure vessel specifications, corridor route endpoints, cargo payload, and fuel profile
          </p>
        </div>

        <div className="text-[11px] text-slate-muted italic self-start sm:self-auto">
          * Required fields
        </div>
      </div>

      <form onSubmit={handleCompareClick} className="space-y-8">
        
        {/* GROUP A: Vessel details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-subtle/40">
            <div className="w-6 h-6 rounded-lg bg-sustainability-light text-sustainability-green flex items-center justify-center">
              <Ship className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-maritime-navy">
              A. Vessel Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Vessel Name *
              </label>
              <input
                type="text"
                value={vesselName}
                onChange={(e) => {
                  setVesselName(e.target.value);
                  if (errors.vesselName) setErrors({ ...errors, vesselName: '' });
                }}
                placeholder="e.g. Eco Horizon IX"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                  errors.vesselName
                    ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                    : 'border-slate-subtle/80 focus:border-sustainability-green focus:ring-2 focus:ring-sustainability-green/20'
                }`}
              />
              {errors.vesselName && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.vesselName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                IMO Number / Identifier
              </label>
              <input
                type="text"
                value={imoNumber}
                onChange={(e) => setImoNumber(e.target.value)}
                placeholder="e.g. 9890123"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs font-mono outline-none focus:border-sustainability-green focus:ring-2 focus:ring-sustainability-green/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Vessel Type
              </label>
              <select
                value={vesselType}
                onChange={(e) => setVesselType(e.target.value as VesselType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              >
                <option value="Container Ship">Container Ship</option>
                <option value="Bulk Carrier">Bulk Carrier</option>
                <option value="Tanker">Tanker</option>
                <option value="General Cargo">General Cargo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Average Speed (knots) *
              </label>
              <input
                type="number"
                step="0.5"
                min="5"
                max="35"
                value={averageSpeedKnots}
                onChange={(e) => {
                  setAverageSpeedKnots(parseFloat(e.target.value) || 0);
                  if (errors.averageSpeedKnots) setErrors({ ...errors, averageSpeedKnots: '' });
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none transition-colors ${
                  errors.averageSpeedKnots
                    ? 'border-rose-400 bg-rose-50/30'
                    : 'border-slate-subtle/80 focus:border-sustainability-green'
                }`}
              />
              {errors.averageSpeedKnots && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.averageSpeedKnots}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* GROUP B: Route details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-subtle/40">
            <div className="w-6 h-6 rounded-lg bg-ocean-blue text-maritime-navy flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-maritime-navy">
              B. Corridor Route Endpoints
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Origin Port *
              </label>
              <select
                value={originPortId}
                onChange={(e) => {
                  setOriginPortId(e.target.value);
                  if (errors.destinationPortId) setErrors({ ...errors, destinationPortId: '' });
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              >
                {DEMO_PORTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.country})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Destination Port *
              </label>
              <select
                value={destinationPortId}
                onChange={(e) => {
                  setDestinationPortId(e.target.value);
                  if (errors.destinationPortId) setErrors({ ...errors, destinationPortId: '' });
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none bg-white ${
                  errors.destinationPortId ? 'border-rose-400 bg-rose-50/20' : 'border-slate-subtle/80 focus:border-sustainability-green'
                }`}
              >
                {DEMO_PORTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.country})
                  </option>
                ))}
              </select>
              {errors.destinationPortId && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.destinationPortId}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Departure Date & Time *
              </label>
              <input
                type="datetime-local"
                value={departureDateTime}
                onChange={(e) => {
                  setDepartureDateTime(e.target.value);
                  if (errors.departureDateTime) setErrors({ ...errors, departureDateTime: '' });
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  errors.departureDateTime ? 'border-rose-400' : 'border-slate-subtle/80 focus:border-sustainability-green'
                }`}
              />
              {errors.departureDateTime && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.departureDateTime}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Estimated Arrival Date & Time *
              </label>
              <input
                type="datetime-local"
                value={arrivalDateTime}
                onChange={(e) => {
                  setArrivalDateTime(e.target.value);
                  if (errors.arrivalDateTime) setErrors({ ...errors, arrivalDateTime: '' });
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  errors.arrivalDateTime ? 'border-rose-400' : 'border-slate-subtle/80 focus:border-sustainability-green'
                }`}
              />
              {errors.arrivalDateTime && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.arrivalDateTime}</span>
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Initial Route Preference Objective
              </label>
              <select
                value={routePreference}
                onChange={(e) => setRoutePreference(e.target.value as RoutePreference)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              >
                <option value="Balanced">Balanced (Standard Speed, Cost & Emission Balance)</option>
                <option value="Lower Estimated Emissions">Lower Estimated Emissions (Eco-Speed & Favorable Currents)</option>
                <option value="Lower Estimated Cost">Lower Estimated Cost (Minimize Total Bunker Expenditure)</option>
                <option value="Shorter Duration">Shorter Duration (Direct Sprint to Meet JIT Berth Window)</option>
              </select>
            </div>
          </div>
        </div>

        {/* GROUP C: Cargo details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-subtle/40">
            <div className="w-6 h-6 rounded-lg bg-mint-soft text-emerald-800 flex items-center justify-center">
              <Package className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-maritime-navy">
              C. Cargo Payload Specifications
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Cargo Classification
              </label>
              <select
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value as CargoType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              >
                <option value="Containerized Dry">Containerized Dry</option>
                <option value="Refrigerated Cargo">Refrigerated Cargo</option>
                <option value="Bulk Minerals & Grains">Bulk Minerals & Grains</option>
                <option value="Liquid Chemicals">Liquid Chemicals</option>
                <option value="General Breakbulk">General Breakbulk</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Cargo Weight (metric tonnes) *
              </label>
              <input
                type="number"
                min="100"
                step="500"
                value={cargoWeightTonnes}
                onChange={(e) => {
                  setCargoWeightTonnes(parseFloat(e.target.value) || 0);
                  if (errors.cargoWeightTonnes) setErrors({ ...errors, cargoWeightTonnes: '' });
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                  errors.cargoWeightTonnes ? 'border-rose-400' : 'border-slate-subtle/80 focus:border-sustainability-green'
                }`}
              />
              {errors.cargoWeightTonnes && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.cargoWeightTonnes}</span>
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Cargo Description & Manifest Notes (Optional)
              </label>
              <input
                type="text"
                value={cargoDescription}
                onChange={(e) => setCargoDescription(e.target.value)}
                placeholder="e.g. 1,400 TEU high-value manufacturing freight"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs outline-none focus:border-sustainability-green"
              />
            </div>
          </div>
        </div>

        {/* GROUP D: Fuel details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-subtle/40">
            <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Fuel className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-maritime-navy">
              D. Marine Fuel Specifications
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Planned Fuel Type
              </label>
              <select
                value={fuelType}
                onChange={(e) => handleFuelChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs outline-none bg-white focus:border-sustainability-green"
              >
                {DEMO_FUELS.map((f) => (
                  <option key={f.id} value={f.name}>
                    {f.name} ({f.lifecycleAbatementScore})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Est. Fuel Consumption (tonnes, optional)
              </label>
              <input
                type="number"
                placeholder="Auto-calculated from speed & drag"
                value={estimatedFuelConsumption}
                onChange={(e) => setEstimatedFuelConsumption(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs font-mono outline-none focus:border-sustainability-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Fuel Price ($ USD per tonne)
              </label>
              <input
                type="number"
                value={fuelPricePerTonne}
                onChange={(e) => setFuelPricePerTonne(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs font-mono outline-none focus:border-sustainability-green"
              />
            </div>
          </div>
        </div>

        {/* Form Actions Footer */}
        <div className="pt-6 border-t border-slate-subtle/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-muted hover:text-maritime-dark hover:bg-slate-50 border border-transparent hover:border-slate-subtle transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Form</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSaveDraftClick}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-dark bg-white border border-slate-subtle/80 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>Save as Draft</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-sustainability-green/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Compare Routes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </form>

    </div>
  );
};
