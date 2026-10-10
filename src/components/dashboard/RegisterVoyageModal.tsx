import React, { useState } from 'react';
import { X, Ship, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Voyage } from '../../types/voyage';

interface RegisterVoyageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterVoyage: (voyage: Voyage) => void;
}

export const RegisterVoyageModal: React.FC<RegisterVoyageModalProps> = ({
  isOpen,
  onClose,
  onRegisterVoyage,
}) => {
  const [vesselName, setVesselName] = useState('');
  const [imoNumber, setImoNumber] = useState('');
  const [originPort, setOriginPort] = useState('JNPA (Mumbai)');
  const [destinationPort, setDestinationPort] = useState('PSA Singapore');
  const [departureDate, setDepartureDate] = useState('2026-10-15');
  const [estimatedArrival, setEstimatedArrival] = useState('2026-10-22 14:00 SGT');
  const [fuelType, setFuelType] = useState('Bio-Methanol (80% blend)');
  const [fuelTonnes, setFuelTonnes] = useState('320');
  const [notes, setNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vesselName.trim() || !imoNumber.trim()) return;

    const newVoyage: Voyage = {
      id: `VOY-REG-${Math.floor(1000 + Math.random() * 9000)}`,
      vesselName,
      imoNumber,
      originPort,
      originCountry: originPort.includes('Singapore') ? 'Singapore' : 'India',
      destinationPort,
      destinationCountry: destinationPort.includes('Singapore') ? 'Singapore' : 'India',
      departureDate,
      estimatedArrival,
      voyageStatus: 'Scheduled',
      fuelType,
      fuelBunkeredTonnes: Number(fuelTonnes) || 280,
      fuelVerificationStatus: 'Draft',
      estimatedEmissionsTonnes: Math.round((Number(fuelTonnes) || 280) * 0.16 * 10) / 10,
      carbonIntensityScore: 'A (3.2 gCO2/dwt-nm)',
      notes: notes || 'Voyage registered via Corridor Operations Portal.',
    };

    onRegisterVoyage(newVoyage);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maritime-dark/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-subtle/80 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-muted hover:text-maritime-dark hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-sustainability-light border border-sustainability-green/40 flex items-center justify-center text-sustainability-green shadow-sm">
            <Ship className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-extrabold text-maritime-dark">
              Register Corridor Voyage
            </h3>
            <span className="text-xs text-slate-muted">
              Add a new transit between India and Singapore into the corridor registry
            </span>
          </div>
        </div>

        {submittedSuccess ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-sustainability-light text-sustainability-green flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-maritime-dark">
              Voyage Successfully Registered!
            </h4>
            <p className="text-xs text-slate-muted max-w-sm mx-auto">
              The voyage record has been broadcast to the shared corridor ledger and is ready for fuel evidence submission.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Vessel Name & IMO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-maritime-dark mb-1">
                  Vessel Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eco Horizon IX"
                  value={vesselName}
                  onChange={(e) => setVesselName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 focus:border-sustainability-green outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-maritime-dark mb-1">
                  IMO Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 9812456"
                  value={imoNumber}
                  onChange={(e) => setImoNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 focus:border-sustainability-green outline-none font-mono"
                />
              </div>
            </div>

            {/* Ports */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-maritime-dark mb-1">
                  Origin Port
                </label>
                <select
                  value={originPort}
                  onChange={(e) => setOriginPort(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 focus:border-sustainability-green outline-none bg-white"
                >
                  <option value="JNPA (Mumbai)">JNPA (Mumbai, India)</option>
                  <option value="Chennai Port">Chennai Port (India)</option>
                  <option value="Cochin Port">Cochin Port (India)</option>
                  <option value="Mundra Port">Mundra Port (India)</option>
                  <option value="PSA Singapore">PSA Singapore</option>
                  <option value="Jurong Port">Jurong Port (Singapore)</option>
                  <option value="Tuas Port">Tuas Port (Singapore)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-maritime-dark mb-1">
                  Destination Port
                </label>
                <select
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 focus:border-sustainability-green outline-none bg-white"
                >
                  <option value="PSA Singapore">PSA Singapore</option>
                  <option value="Jurong Port">Jurong Port (Singapore)</option>
                  <option value="Tuas Port">Tuas Port (Singapore)</option>
                  <option value="JNPA (Mumbai)">JNPA (Mumbai, India)</option>
                  <option value="Chennai Port">Chennai Port (India)</option>
                </select>
              </div>
            </div>

            {/* Fuel & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-maritime-dark mb-1">
                  Planned Marine Fuel Type
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 focus:border-sustainability-green outline-none bg-white"
                >
                  <option value="Bio-Methanol (80% blend)">Bio-Methanol (80% blend)</option>
                  <option value="B24 Marine Biofuel">B24 Marine Biofuel Blend</option>
                  <option value="Bio-LNG Dual Fuel">Bio-LNG Dual Fuel</option>
                  <option value="100% Green E-Methanol">100% Green E-Methanol</option>
                  <option value="Low-Sulfur VLSFO (Optimized)">Low-Sulfur VLSFO (Optimized)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-maritime-dark mb-1">
                  Bunkered Quantity (tonnes)
                </label>
                <input
                  type="number"
                  min="50"
                  max="5000"
                  value={fuelTonnes}
                  onChange={(e) => setFuelTonnes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 focus:border-sustainability-green outline-none font-mono"
                />
              </div>
            </div>

            {/* Departure & Arrival */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-maritime-dark mb-1">
                  Estimated Departure
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 focus:border-sustainability-green outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-maritime-dark mb-1">
                  Estimated Arrival Window
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2026-10-22 14:00 SGT"
                  value={estimatedArrival}
                  onChange={(e) => setEstimatedArrival(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 focus:border-sustainability-green outline-none"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-maritime-dark mb-1">
                Operational Notes & Route Preferences
              </label>
              <textarea
                rows={2}
                placeholder="Include details about charterer, speed optimization preferences, or shore power needs..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-subtle/80 text-xs focus:ring-2 focus:ring-sustainability-green/50 focus:border-sustainability-green outline-none resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="pt-3 border-t border-slate-subtle/80 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-muted hover:text-maritime-dark transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md shadow-sustainability-green/20"
              >
                <span>Register Voyage</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
