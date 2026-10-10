import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Compass, ShieldCheck, Route, Anchor } from 'lucide-react';

interface NavbarProps {
  onOpenSignIn?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSignIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PLATFORM', href: '#platform' },
    { label: 'HOW IT WORKS', href: '#how-it-works' },
    { label: 'ANALYTICS', href: '#analytics' },
    { label: 'PEOPLE & ROLES', href: '#stakeholders' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B202B]/95 backdrop-blur-md border-b border-[#1F475B] shadow-2xl py-3'
          : 'bg-[#0B202B] border-b border-[#1F475B]/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Mobile Toggle & Core Nav Links (Sixes Cricket Layout) */}
          <div className="flex items-center gap-4 lg:gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#2F8F68]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Left Nav Links */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3 py-1.5 text-xs font-bold tracking-wider text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center: Sixes-Style Neon Dual-Stroke Glow Logo */}
          <a
            href="#top"
            className="flex flex-col items-center group focus:outline-none text-center select-none"
            aria-label="Green Corridor India-Singapore Home"
          >
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl sm:text-3xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#AEE1C2] via-white to-[#2F8F68] drop-shadow-[0_0_12px_rgba(47,143,104,0.6)] uppercase">
                CORRIDOR
              </span>
            </div>
            <span className="text-[9px] font-extrabold tracking-[0.25em] text-[#AEE1C2] uppercase -mt-1">
              INDIA ⇄ SINGAPORE
            </span>
          </a>

          {/* Right: High-Impact Action Buttons (Sixes Style Pills) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Indicator Pill (Sixes Christmas-style pill) */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#153A4B] border border-[#2F8F68]/50 text-xs font-bold text-[#AEE1C2]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>IN ⇄ SG LIVE</span>
            </div>

            {/* Sign In Portal Button */}
            <button
              onClick={onOpenSignIn}
              type="button"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-[#AEE1C2]" />
              <span>Role Portal</span>
            </button>

            {/* High-Contrast Action Button (Sixes BOOK NOW equivalent in our theme) */}
            <a
              href="/dashboard"
              className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold text-white bg-[#2F8F68] hover:bg-[#267957] active:scale-95 shadow-lg shadow-[#2F8F68]/30 transition-all flex items-center gap-1.5 tracking-wide uppercase"
            >
              <span>LAUNCH OPS</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#1F475B] bg-[#0B202B] px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-[#AEE1C2] uppercase tracking-wider px-1">
              Corridor Applications:
            </span>
            <a
              href="/greentwin"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-left text-white bg-[#102D3A] border border-[#2F8F68]/40 hover:bg-[#153A4B] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Route className="w-4 h-4 text-[#2F8F68]" />
                <span>GreenTwin — Voyage Planning</span>
              </span>
              <span className="text-[#AEE1C2]">→</span>
            </a>
            <a
              href="/fueltrust"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-left text-white bg-[#102D3A] border border-[#2F8F68]/40 hover:bg-[#153A4B] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2F8F68]" />
                <span>FuelTrust — Fuel Verification</span>
              </span>
              <span className="text-[#AEE1C2]">→</span>
            </a>
            <a
              href="/smartdock"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-left text-white bg-[#102D3A] border border-[#2F8F68]/40 hover:bg-[#153A4B] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-[#2F8F68]" />
                <span>SmartDock — Port Coordination</span>
              </span>
              <span className="text-[#AEE1C2]">→</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenSignIn) onOpenSignIn();
              }}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center text-white border border-white/20 hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#AEE1C2]" />
              <span>Sign In with Role Portal</span>
            </button>
            <a
              href="/dashboard"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-center text-white bg-[#2F8F68] hover:bg-[#267957] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#2F8F68]/30"
            >
              <span>Launch Operations Dashboard</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
