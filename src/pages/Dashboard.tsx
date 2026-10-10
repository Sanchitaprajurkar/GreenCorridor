import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { StatCard } from '../components/dashboard/StatCard';
import { CorridorOverview } from '../components/dashboard/CorridorOverview';
import { EmissionsChart } from '../components/dashboard/EmissionsChart';
import { FuelVerificationPanel } from '../components/dashboard/FuelVerificationPanel';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { RecentVoyagesTable } from '../components/dashboard/RecentVoyagesTable';
import { QuickActions } from '../components/dashboard/QuickActions';

// Modals
import { RegisterVoyageModal } from '../components/dashboard/RegisterVoyageModal';
import { VoyageDetailModal } from '../components/dashboard/VoyageDetailModal';
import { FuelRecordModal } from '../components/dashboard/FuelRecordModal';
import { ReportGeneratorModal } from '../components/dashboard/ReportGeneratorModal';

// Mock Data
import {
  DASHBOARD_KPIS,
  MOCK_VOYAGES,
  MOCK_FUEL_RECORDS,
  MOCK_ALERTS,
} from '../data/dashboardMockData';

import type { Voyage } from '../types/voyage';
import type { FuelRecord } from '../types/fuel';
import type { DashboardAlert, CorridorShipTransit } from '../types/dashboard';

export const Dashboard: React.FC = () => {
  const [voyages, setVoyages] = useState<Voyage[]>(MOCK_VOYAGES);
  const [fuelRecords, setFuelRecords] = useState<FuelRecord[]>(MOCK_FUEL_RECORDS);
  const [alerts] = useState<DashboardAlert[]>(MOCK_ALERTS);
  const [selectedRange, setSelectedRange] = useState<string>('30D');

  // Modal states
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedVoyage, setSelectedVoyage] = useState<Voyage | null>(null);
  const [selectedFuelRecord, setSelectedFuelRecord] = useState<FuelRecord | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Dynamic KPI calculations based on current state
  const dynamicKpis = DASHBOARD_KPIS.map((kpi) => {
    if (kpi.id === 'kpi-voyages') {
      return {
        ...kpi,
        value: voyages.length,
        supportingText: `${voyages.filter((v) => v.voyageStatus === 'In Transit').length} in transit across corridor`,
      };
    }
    if (kpi.id === 'kpi-fuel-verified') {
      const verified = fuelRecords.filter((r) => r.verificationStatus === 'Verified').length;
      const pending = fuelRecords.filter((r) => r.verificationStatus === 'Pending Review').length;
      return {
        ...kpi,
        value: verified,
        supportingText: `${pending} awaiting review • ${fuelRecords.filter((r) => r.verificationStatus === 'Flagged').length} flagged`,
      };
    }
    return kpi;
  });

  // Action handlers
  const handleRegisterVoyage = (newVoyage: Voyage) => {
    setVoyages((prev) => [newVoyage, ...prev]);
  };

  const handleUpdateFuelStatus = (recordId: string, newStatus: 'Verified' | 'Flagged') => {
    setFuelRecords((prev) =>
      prev.map((rec) => (rec.id === recordId ? { ...rec, verificationStatus: newStatus } : rec))
    );
  };

  const handleAlertAction = (alert: DashboardAlert) => {
    if (alert.relatedModule === 'FuelTrust') {
      const match = fuelRecords.find((f) => f.id === alert.relatedId || f.voyageId === alert.relatedId);
      if (match) {
        setSelectedFuelRecord(match);
      } else {
        setSelectedFuelRecord(fuelRecords[0]);
      }
    } else if (alert.relatedModule === 'SmartDock' || alert.relatedModule === 'GreenTwin') {
      const match = voyages.find((v) => v.id === alert.relatedId);
      if (match) {
        setSelectedVoyage(match);
      } else {
        setSelectedVoyage(voyages[0]);
      }
    }
  };

  const handleOpenFuelAuditForVoyage = (voyageId: string) => {
    const match = fuelRecords.find((f) => f.voyageId === voyageId);
    if (match) {
      setSelectedFuelRecord(match);
    } else {
      // Create provisional record for this voyage
      const provisional: FuelRecord = {
        id: `FR-${Math.floor(1000 + Math.random() * 9000)}`,
        voyageId,
        vesselName: voyages.find((v) => v.id === voyageId)?.vesselName || 'Corridor Vessel',
        fuelType: 'Bio-Methanol (80% blend)',
        quantityTonnes: 280,
        bunkerPort: 'PSA Singapore Pier #4',
        supplierName: 'Global Clean Bunkering Ltd',
        bdnNumber: `BDN-${Math.floor(1000 + Math.random() * 9000)}`,
        submissionDate: 'Just Now',
        verificationStatus: 'Pending Review',
        co2Factor: 1.15,
        evidenceDocuments: [
          { name: 'Bunker_Delivery_Note.pdf', type: 'BDN', size: '1.2 MB', verified: false },
        ],
      };
      setSelectedFuelRecord(provisional);
    }
  };

  return (
    <DashboardLayout>
      {/* 1. Header with Breadcrumbs, Controls, + Register Voyage */}
      <DashboardHeader
        onOpenRegisterVoyage={() => setIsRegisterModalOpen(true)}
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
      />

      {/* 2. Four KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {dynamicKpis.map((kpi) => (
          <StatCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* 3. Quick Actions Toolbar */}
      <QuickActions
        onRegisterVoyage={() => setIsRegisterModalOpen(true)}
        onSubmitFuel={() => setSelectedFuelRecord(fuelRecords[0])}
        onReviewQueue={() => {
          const pending = fuelRecords.find((r) => r.verificationStatus === 'Pending Review');
          setSelectedFuelRecord(pending || fuelRecords[0]);
        }}
        onGenerateReport={() => setIsReportModalOpen(true)}
      />

      {/* 4. Corridor Activity & Voyage Performance Trends Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-7">
          <CorridorOverview
            onSelectShip={(ship: CorridorShipTransit) => {
              const matchedVoyage = voyages.find((v) => v.id === ship.voyageId);
              if (matchedVoyage) setSelectedVoyage(matchedVoyage);
            }}
          />
        </div>
        <div className="lg:col-span-5">
          <EmissionsChart currentRange={selectedRange} />
        </div>
      </div>

      {/* 5. Fuel Verification Panel & Needs Attention Panel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-7">
          <FuelVerificationPanel
            fuelRecords={fuelRecords}
            onSelectRecord={(rec) => setSelectedFuelRecord(rec)}
            onViewAll={() => setSelectedFuelRecord(fuelRecords[0])}
          />
        </div>
        <div className="lg:col-span-5">
          <AlertsPanel
            alerts={alerts}
            onActionClick={handleAlertAction}
          />
        </div>
      </div>

      {/* 6. Recent Voyages Searchable and Filterable Table */}
      <div className="mb-8">
        <RecentVoyagesTable
          voyages={voyages}
          onSelectVoyage={(voyage) => setSelectedVoyage(voyage)}
        />
      </div>

      {/* Modals */}
      <RegisterVoyageModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterVoyage={handleRegisterVoyage}
      />

      <VoyageDetailModal
        voyage={selectedVoyage}
        onClose={() => setSelectedVoyage(null)}
        onOpenFuelAudit={handleOpenFuelAuditForVoyage}
      />

      <FuelRecordModal
        record={selectedFuelRecord}
        onClose={() => setSelectedFuelRecord(null)}
        onUpdateStatus={handleUpdateFuelStatus}
      />

      <ReportGeneratorModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </DashboardLayout>
  );
};
