import React, { useState } from 'react';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { CorridorStrip } from '../components/home/CorridorStrip';
import { ProblemSection } from '../components/home/ProblemSection';
import { ModuleGrid } from '../components/home/ModuleGrid';
import { WorkflowSection } from '../components/home/WorkflowSection';
import { NoveltySection } from '../components/home/NoveltySection';
import { AnalyticsPreview } from '../components/home/AnalyticsPreview';
import { StakeholdersSection } from '../components/home/StakeholdersSection';
import { FinalCTA } from '../components/home/FinalCTA';
import { RoleModal } from '../components/home/RoleModal';
import { ModuleDetailModal } from '../components/home/ModuleDetailModal';

export const Home: React.FC = () => {
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('Shipping Companies');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const handleOpenRoleModal = (role?: string) => {
    if (role) {
      setSelectedRole(role);
    }
    setRoleModalOpen(true);
  };

  const handleCloseRoleModal = () => {
    setRoleModalOpen(false);
  };

  const handleOpenModuleDetail = (moduleId: string) => {
    setActiveModuleId(moduleId);
  };

  const handleCloseModuleDetail = () => {
    setActiveModuleId(null);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-warm-white text-maritime-dark selection:bg-mint-soft selection:text-maritime-navy">
      {/* Section 1: Announcement Bar */}
      <AnnouncementBar />

      {/* Section 2: Navigation Bar */}
      <Navbar onOpenSignIn={() => handleOpenRoleModal()} />

      <main className="flex-grow">
        {/* Section 3: Hero Section */}
        <HeroSection
          onExploreClick={() => scrollToSection('platform')}
          onHowItWorksClick={() => scrollToSection('how-it-works')}
        />

        {/* Section 4: Corridor Context Strip */}
        <CorridorStrip />

        {/* Section 5: Problem and Opportunity */}
        <ProblemSection />

        {/* Section 6: Four Core Platform Modules */}
        <ModuleGrid onModuleSelect={handleOpenModuleDetail} />

        {/* Section 7: How It Works */}
        <WorkflowSection />

        {/* Section 8: Novelty and Differentiation */}
        <NoveltySection />

        {/* Section 9: Sustainability Intelligence Preview */}
        <AnalyticsPreview
          onExploreAnalytics={() => handleOpenModuleDetail('greenpulse')}
        />

        {/* Section 10: Stakeholders and Collaboration */}
        <StakeholdersSection onSelectRole={(role) => handleOpenRoleModal(role)} />

        {/* Section 11: Final Call to Action */}
        <FinalCTA
          onExploreClick={() => scrollToSection('platform')}
          onApproachClick={() => scrollToSection('how-it-works')}
        />
      </main>

      {/* Section 12: Footer */}
      <Footer />

      {/* Interactive Modals */}
      <RoleModal
        isOpen={roleModalOpen}
        onClose={handleCloseRoleModal}
        selectedRole={selectedRole}
      />

      <ModuleDetailModal
        moduleId={activeModuleId}
        onClose={handleCloseModuleDetail}
      />
    </div>
  );
};
