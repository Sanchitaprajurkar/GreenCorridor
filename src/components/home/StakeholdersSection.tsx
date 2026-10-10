import React from 'react';
import { Ship, Fuel, Anchor, Landmark, Lock, CheckCircle2, MessageSquareQuote } from 'lucide-react';
import { STAKEHOLDERS } from '../../data/homeData';

interface StakeholdersSectionProps {
  onSelectRole?: (role: string) => void;
}

export const StakeholdersSection: React.FC<StakeholdersSectionProps> = ({ onSelectRole }) => {
  const getStakeholderIcon = (iconName: string) => {
    switch (iconName) {
      case 'ship':
        return <Ship className="w-6 h-6 text-[#2F8F68]" />;
      case 'fuel':
        return <Fuel className="w-6 h-6 text-sky-700" />;
      case 'anchor':
        return <Anchor className="w-6 h-6 text-emerald-700" />;
      case 'landmark':
        return <Landmark className="w-6 h-6 text-[#102D3A]" />;
      default:
        return <Ship className="w-6 h-6 text-[#2F8F68]" />;
    }
  };

  // Real human personas & quotes
  const humanProfiles: Record<string, { name: string; title: string; quote: string; avatar: string }> = {
    'Shipping Companies': {
      name: 'Capt. Rajesh Deshmukh',
      title: 'Master Mariner • M/V Eco-Horizon',
      quote: '"SmartDock cut our vessel idle time by 4 hours in Singapore, giving our crew a predictable rest window."',
      avatar: '👨‍✈️',
    },
    'Fuel Suppliers & Bunkers': {
      name: 'Mei Lin Tan',
      title: 'Bunker Logistics Lead • Jurong Bunkering',
      quote: '"FuelTrust turned our 3-day bunker dispute into a 30-second digital verification."',
      avatar: '⛽',
    },
    'Port Authorities': {
      name: 'Marcus Tan & Priya Sharma',
      title: 'Port Coordinators • PSA Singapore & JNPA',
      quote: '"We schedule berths 48 hours before the ship hits the Malacca Strait, eliminating anchorage bottlenecks."',
      avatar: '⚓',
    },
    'Government & Policy Makers': {
      name: 'Dr. Anand Verma',
      title: 'Maritime Decarbonization Envoy',
      quote: '"Auditable emissions metrics give our bilateral green tariff policies complete credibility."',
      avatar: '🏛️',
    },
  };

  return (
    <section id="stakeholders" className="py-20 lg:py-28 bg-[#FDFBF7] border-t border-[#E8ECE7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2F8F68] bg-[#EAF7EE] px-4 py-1.5 rounded-full border border-[#A7DCBF]/60 inline-block">
            AUTHENTIC HUMAN PERSPECTIVES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#102D3A] tracking-tight">
            Designed for the Real People Moving Global Trade.
          </h2>
          <p className="text-base sm:text-lg text-[#52616A] leading-relaxed font-normal">
            Every screen and workflow reflects the operational reality of master mariners, bunker delivery teams, and port officers across India and Singapore.
          </p>
        </div>

        {/* 4 Stakeholder Cards Grid with Avatars and Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAKEHOLDERS.map((stk) => {
            const profile = humanProfiles[stk.role] || {
              name: 'Maritime Leader',
              title: stk.role,
              quote: 'Unified corridor visibility enables confident decarbonization decisions.',
              avatar: '👤',
            };

            return (
              <div
                key={stk.role}
                className="bg-white rounded-3xl p-6 border border-[#E2E8F0] hover:border-[#2F8F68]/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Avatar & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAFBF8] border border-[#CBD5E1] flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">
                        <span>{profile.avatar}</span>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-[#EAF7EE] flex items-center justify-center shadow-xs">
                        {getStakeholderIcon(stk.iconName)}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#71828D] uppercase tracking-wider bg-[#F1F5F9] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                      {stk.category.split('&')[0]}
                    </span>
                  </div>

                  {/* Human Identity */}
                  <div className="mb-3">
                    <h4 className="text-xs font-bold text-[#102D3A]">
                      {profile.name}
                    </h4>
                    <p className="text-[11px] text-[#71828D]">
                      {profile.title}
                    </p>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-lg font-display font-bold text-[#102D3A] mb-2 group-hover:text-[#2F8F68] transition-colors">
                    {stk.role}
                  </h3>

                  {/* Human Quote Badge */}
                  <div className="bg-[#FAFBF8] border-l-2 border-[#2F8F68] p-3 rounded-r-xl my-3 space-y-1">
                    <div className="flex items-center gap-1 text-[10px] text-[#2F8F68] font-bold">
                      <MessageSquareQuote className="w-3.5 h-3.5" />
                      <span>OPERATIONAL VOICE</span>
                    </div>
                    <p className="text-xs text-[#52616A] italic leading-snug">
                      {profile.quote}
                    </p>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="space-y-1.5 my-4">
                    <span className="text-[10px] font-bold text-[#71828D] uppercase tracking-wider block">
                      Daily Workflows:
                    </span>
                    {stk.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#2A3B44]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2F8F68] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Privacy & View Scope Button */}
                <div className="pt-4 border-t border-[#F1F5F9] mt-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#71828D] mb-3">
                    <Lock className="w-3 h-3 text-[#94A3B8] shrink-0" />
                    <span className="truncate" title={stk.accessScope}>
                      {stk.accessScope}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => onSelectRole ? onSelectRole(stk.role) : null}
                    type="button"
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold text-[#102D3A] bg-[#FAFBF8] hover:bg-[#EAF7EE] hover:text-[#2F8F68] border border-[#CBD5E1] hover:border-[#2F8F68]/50 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Inspect {profile.name}&apos;s Workspace</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Access Rule Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#71828D] max-w-xl mx-auto flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#2F8F68]" />
            <span>Commercial fuel pricing and proprietary cargo manifests remain strictly confidential to authorized parties.</span>
          </p>
        </div>

      </div>
    </section>
  );
};
