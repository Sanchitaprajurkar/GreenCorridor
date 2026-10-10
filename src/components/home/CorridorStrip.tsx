import React from 'react';
import { MapPin, Globe, Shield, Clock, Users, ArrowRightLeft } from 'lucide-react';

export const CorridorStrip: React.FC = () => {
  return (
    <section className="bg-[#FDFBF7] border-y border-[#E8ECE7] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background soft wave accent */}
      <div className="absolute inset-0 bg-corridor-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Label */}
        <div className="text-center mb-8 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2F8F68] bg-[#EAF7EE] px-3.5 py-1.5 rounded-full border border-[#A7DCBF]/60 inline-flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#2F8F68]" />
            <span>BILATERAL HUMAN & MARITIME CORRIDOR ARCHITECTURE</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#102D3A] tracking-tight">
            Connecting Real Teams Across 1,840 Nautical Miles
          </h3>
          <p className="text-xs sm:text-sm text-[#52616A] max-w-xl mx-auto">
            From terminal managers at JNPA Mumbai to quayside crane coordinators at PSA Singapore.
          </p>
        </div>

        {/* 3 Connected Corridor Nodes with Softer Aesthetics */}
        <div className="relative">
          {/* Subtle dotted connector line behind nodes (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] -translate-y-1/2 h-0.5 border-t-2 border-dashed border-[#2F8F68]/30 -z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            {/* Node 1: INDIA ECOSYSTEM */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#2F8F68]/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#EAF7EE] border border-[#A7DCBF]/60 flex items-center justify-center text-[#2F8F68] font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#2F8F68] uppercase tracking-wider bg-[#EAF7EE] px-2.5 py-1 rounded-full border border-[#A7DCBF]/50">
                    ORIGIN ECOSYSTEM
                  </span>
                </div>

                <h4 className="text-lg font-display font-extrabold text-[#102D3A] tracking-tight mb-2">
                  India • West & East Coast
                </h4>
                <p className="text-xs text-[#52616A] leading-relaxed mb-4">
                  Jawaharlal Nehru Port (JNPA), Chennai Port, Indian bunker blenders, and commercial export operators registering voyage manifests.
                </p>

                {/* Humanized Relatable Benchmark */}
                <div className="bg-[#FAFBF8] p-3 rounded-xl border border-[#E8ECE7] space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-[#102D3A] font-semibold">
                    <Users className="w-3.5 h-3.5 text-[#2F8F68]" />
                    <span>Origin Dispatch Team</span>
                  </div>
                  <p className="text-[11px] text-[#52616A]">
                    Digital BDNs validated before departure — zero transit paperwork delays.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0F2EE] flex items-center justify-between text-[11px] text-[#71828D]">
                <span>Registered Vessels: <strong className="text-[#102D3A]">24 Active</strong></span>
                <span className="text-[#2F8F68] font-bold">JNPA ➔ SG</span>
              </div>
            </div>

            {/* Node 2: THE CONNECTED CORRIDOR (Featured Warm Navy / Mint) */}
            <div className="bg-[#102D3A] text-[#FAFBF8] rounded-2xl p-6 border-2 border-[#2F8F68]/60 shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2F8F68]/15 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#153A4B] border border-[#2F8F68] flex items-center justify-center text-[#AEE1C2]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#AEE1C2] uppercase tracking-wider bg-[#153A4B] px-2.5 py-1 rounded-full border border-[#2F8F68]/40">
                    SHARED INTELLIGENCE
                  </span>
                </div>

                <h4 className="text-lg font-display font-extrabold text-white tracking-tight mb-2 flex items-center gap-2">
                  <span>Connected Ledger</span>
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Single immutable voyage record shared between Indian port authorities and Maritime and Port Authority of Singapore (MPA).
                </p>

                {/* Humanized Relatable Benchmark */}
                <div className="bg-[#0B202B]/80 p-3 rounded-xl border border-white/10 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-[#AEE1C2] font-semibold">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Real-Time Voyage Sync</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    16.4 kt CO₂e abated — taking ~3,500 passenger cars off roads for 1 full year.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#AEE1C2]">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  CII Rating: A Grade
                </span>
                <span className="font-mono text-white text-[10px] bg-white/10 px-2 py-0.5 rounded">
                  #VR-2026-SG
                </span>
              </div>
            </div>

            {/* Node 3: SINGAPORE ECOSYSTEM */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#2F8F68]/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                    DESTINATION ECOSYSTEM
                  </span>
                </div>

                <h4 className="text-lg font-display font-extrabold text-[#102D3A] tracking-tight mb-2">
                  Singapore • Global Hub
                </h4>
                <p className="text-xs text-[#52616A] leading-relaxed mb-4">
                  PSA Singapore (Tuas & Pasir Panjang), Jurong Port bunkering, MPA green vessel incentive officers, and testing labs.
                </p>

                {/* Humanized Relatable Benchmark */}
                <div className="bg-[#FAFBF8] p-3 rounded-xl border border-[#E8ECE7] space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-[#102D3A] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>JIT Berthing Guaranteed</span>
                  </div>
                  <p className="text-[11px] text-[#52616A]">
                    4.2 hours saved per port call — predictable crew rest windows on arrival.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0F2EE] flex items-center justify-between text-[11px] text-[#71828D]">
                <span>Green Berth Allocation: <strong className="text-[#102D3A]">Priority 1</strong></span>
                <span className="text-sky-700 font-bold">PSA Tuas</span>
              </div>
            </div>

          </div>
        </div>

        {/* Small Caption */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#71828D]">
            Human-centered operational corridor — connecting seafarers, harbor pilots, and sustainability auditors in real time.
          </p>
        </div>

      </div>
    </section>
  );
};
