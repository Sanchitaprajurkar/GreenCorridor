import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { VoyageForm } from './VoyageForm';
import { RouteComparison } from './RouteComparison';
import { RouteOverview } from './RouteOverview';
import { VoyageSummary } from './VoyageSummary';
import { PlannedVoyagesTable } from './PlannedVoyagesTable';
import { VoyageDetailModal } from '../../components/dashboard/VoyageDetailModal';

import {
  Route,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import type { Voyage, VoyageFormData, RouteAlternative } from '../../types/voyage';
import { DEMO_PORTS, INITIAL_PLANNED_VOYAGES } from '../../data/voyageMockData';
import { calculateRouteAlternatives, calculateEstimatedCiiScore } from '../../utils/voyageCalculations';

const STORAGE_KEY = 'greentwin_planned_voyages_v1';

export const GreenTwin: React.FC = () => {
  // Voyages State with localStorage persistence
  const [voyages, setVoyages] = useState<Voyage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return INITIAL_PLANNED_VOYAGES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(voyages));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [voyages]);

  // Form & Route Comparison State
  const [currentFormData, setCurrentFormData] = useState<VoyageFormData | null>(null);
  const [routeAlternatives, setRouteAlternatives] = useState<RouteAlternative[] | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<RouteAlternative | null>(null);
  const [editingDraftData, setEditingDraftData] = useState<Partial<VoyageFormData> | undefined>(undefined);

  // Modals & UI notifications
  const [selectedVoyageForModal, setSelectedVoyageForModal] = useState<Voyage | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-generate initial comparison on mount for instant demonstration
  useEffect(() => {
    const initialForm: VoyageFormData = {
      vesselName: 'Eco Horizon IX',
      imoNumber: '9890123',
      vesselType: 'Container Ship',
      averageSpeedKnots: 16.5,
      originPortId: 'port-jnpa',
      destinationPortId: 'port-singapore-psa',
      departureDateTime: '2026-10-20T08:00',
      arrivalDateTime: '2026-10-26T18:00',
      routePreference: 'Balanced',
      cargoType: 'Containerized Dry',
      cargoWeightTonnes: 28000,
      cargoDescription: '1,400 TEU high-value manufacturing freight',
      fuelType: 'Bio-Methanol (80% blend)',
      fuelPricePerTonne: 780,
    };
    setCurrentFormData(initialForm);
    const routes = calculateRouteAlternatives(initialForm);
    setRouteAlternatives(routes);
    setSelectedRoute(routes[1]); // Default to Route B (Eco-Speed) to showcase green optimization
  }, []);

  const handleCompareRoutes = (data: VoyageFormData) => {
    setCurrentFormData(data);
    const calculatedRoutes = calculateRouteAlternatives(data);
    setRouteAlternatives(calculatedRoutes);
    // Auto-select preferred matching route
    if (data.routePreference === 'Lower Estimated Emissions') {
      setSelectedRoute(calculatedRoutes[1]);
    } else if (data.routePreference === 'Shorter Duration') {
      setSelectedRoute(calculatedRoutes[2]);
    } else {
      setSelectedRoute(calculatedRoutes[0]);
    }

    setNotificationMsg('Calculated 3 deterministic corridor route alternatives based on propeller curves and ocean currents.');
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  const handleSelectRoute = (route: RouteAlternative) => {
    setSelectedRoute(route);
  };

  const handleSaveVoyage = (asDraft: boolean) => {
    if (!currentFormData || !selectedRoute) return;

    setIsSaving(true);
    setTimeout(() => {
      const originPortObj = DEMO_PORTS.find((p) => p.id === currentFormData.originPortId) || DEMO_PORTS[0];
      const destPortObj = DEMO_PORTS.find((p) => p.id === currentFormData.destinationPortId) || DEMO_PORTS[4];

      const ciiScore = calculateEstimatedCiiScore(
        selectedRoute.co2EmissionsTonnes,
        selectedRoute.distanceNm,
        currentFormData.cargoWeightTonnes
      );

      const newVoyage: Voyage = {
        id: `VOY-GT-${Math.floor(100 + Math.random() * 900)}`,
        vesselName: currentFormData.vesselName,
        imoNumber: currentFormData.imoNumber || '9900000',
        vesselType: currentFormData.vesselType,
        originPort: originPortObj.name,
        originCountry: originPortObj.country,
        destinationPort: destPortObj.name,
        destinationCountry: destPortObj.country,
        departureDate: currentFormData.departureDateTime.replace('T', ' '),
        estimatedArrival: currentFormData.arrivalDateTime.replace('T', ' '),
        voyageStatus: asDraft ? 'Draft' : 'Scheduled',
        fuelType: currentFormData.fuelType,
        fuelBunkeredTonnes: selectedRoute.fuelConsumptionTonnes,
        fuelVerificationStatus: asDraft ? 'Draft' : 'Pending Review',
        estimatedEmissionsTonnes: selectedRoute.co2EmissionsTonnes,
        carbonIntensityScore: ciiScore,
        selectedRouteId: selectedRoute.id,
        selectedRouteName: selectedRoute.name,
        distanceNm: selectedRoute.distanceNm,
        durationHours: selectedRoute.durationHours,
        fuelCostUSD: selectedRoute.fuelCostUSD,
        cargoWeightTonnes: currentFormData.cargoWeightTonnes,
        cargoType: currentFormData.cargoType,
        notes: asDraft
          ? 'Draft voyage passage plan saved in GreenTwin.'
          : `Scheduled passage plan via ${selectedRoute.name.split('—')[0]}. Synchronized with corridor ledger.`,
        isDraft: asDraft,
      };

      setVoyages((prev) => [newVoyage, ...prev]);
      setIsSaving(false);
      setNotificationMsg(
        asDraft
          ? `Voyage ${newVoyage.id} saved as draft in the planned voyages table.`
          : `Voyage ${newVoyage.id} scheduled successfully with ${selectedRoute.name.split('—')[0]}!`
      );
      setTimeout(() => setNotificationMsg(null), 4000);

      // Scroll down to table
      const el = document.getElementById('planned-voyages-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  const handleEditDraft = (voyage: Voyage) => {
    const originMatch = DEMO_PORTS.find((p) => p.name === voyage.originPort);
    const destMatch = DEMO_PORTS.find((p) => p.name === voyage.destinationPort);

    setEditingDraftData({
      vesselName: voyage.vesselName,
      imoNumber: voyage.imoNumber,
      vesselType: voyage.vesselType || 'Container Ship',
      averageSpeedKnots: 16.0,
      originPortId: originMatch ? originMatch.id : 'port-jnpa',
      destinationPortId: destMatch ? destMatch.id : 'port-singapore-psa',
      cargoType: voyage.cargoType || 'Containerized Dry',
      cargoWeightTonnes: voyage.cargoWeightTonnes || 25000,
      fuelType: voyage.fuelType,
    });

    // Scroll to form
    const el = document.getElementById('voyage-form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteVoyage = (voyageId: string) => {
    setVoyages((prev) => prev.filter((v) => v.id !== voyageId));
    setNotificationMsg(`Deleted planned voyage record ${voyageId}.`);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const originPortObj = DEMO_PORTS.find((p) => p.id === currentFormData?.originPortId) || DEMO_PORTS[0];
  const destPortObj = DEMO_PORTS.find((p) => p.id === currentFormData?.destinationPortId) || DEMO_PORTS[4];
  const baselineRoute = routeAlternatives?.find((r) => r.isBaseline) || routeAlternatives?.[0];

  const scrollToForm = () => {
    const el = document.getElementById('voyage-form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-muted">
            <Link to="/dashboard" className="hover:text-maritime-dark transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-maritime-navy">
              GreenTwin
            </span>
            <span className="text-slate-light">•</span>
            <span className="text-[10px] bg-mint-pale text-sustainability-green px-2 py-0.5 rounded-full font-mono font-bold">
              DEMO DATA
            </span>
          </nav>

          {/* Primary Action Button */}
          <button
            onClick={scrollToForm}
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md shadow-sustainability-green/20 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Register Voyage</span>
          </button>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mint-soft border border-mint-border flex items-center justify-center text-sustainability-green shadow-sm">
              <Route className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-maritime-dark tracking-tight">
                Smart Voyage Planning
              </h1>
              <p className="text-xs sm:text-sm text-slate-text mt-0.5 max-w-3xl leading-relaxed">
                Register voyages, compare route alternatives, and evaluate projected maritime performance across the India–Singapore shipping corridor.
              </p>
            </div>
          </div>
        </div>

        {/* Global Alert / Toast */}
        {notificationMsg && (
          <div className="p-3.5 rounded-xl bg-mint-soft border border-mint-border text-xs text-sustainability-hover font-semibold flex items-center gap-2 animate-fadeIn shadow-subtle">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notificationMsg}</span>
          </div>
        )}
      </div>

      {/* 1. Voyage Registration Form */}
      <div id="voyage-form-section">
        <VoyageForm
          initialData={editingDraftData}
          onCompareRoutes={handleCompareRoutes}
          onSaveAsDraft={() => handleSaveVoyage(true)}
        />
      </div>

      {/* 2. Route Comparison Alternatives */}
      {routeAlternatives && (
        <RouteComparison
          routes={routeAlternatives}
          selectedRoute={selectedRoute}
          onSelectRoute={handleSelectRoute}
        />
      )}

      {/* 3. Nautical Route Overview Illustration */}
      <RouteOverview
        originPort={originPortObj}
        destinationPort={destPortObj}
        selectedRoute={selectedRoute}
        vesselName={currentFormData?.vesselName || 'Eco Horizon IX'}
      />

      {/* 4. Voyage Performance Summary */}
      {selectedRoute && baselineRoute && currentFormData && (
        <VoyageSummary
          selectedRoute={selectedRoute}
          baselineRoute={baselineRoute}
          formData={currentFormData}
          onSaveVoyage={handleSaveVoyage}
          isSaving={isSaving}
        />
      )}

      {/* 5. Planned Voyages Registry Table */}
      <div id="planned-voyages-section" className="mb-8">
        <PlannedVoyagesTable
          voyages={voyages}
          onViewDetails={(voyage) => setSelectedVoyageForModal(voyage)}
          onEditDraft={handleEditDraft}
          onDeleteVoyage={handleDeleteVoyage}
        />
      </div>

      {/* Modal for viewing voyage dossier */}
      <VoyageDetailModal
        voyage={selectedVoyageForModal}
        onClose={() => setSelectedVoyageForModal(null)}
      />
    </DashboardLayout>
  );
};
