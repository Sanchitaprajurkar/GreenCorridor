import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Compass, ShieldCheck, Route } from 'lucide-react';

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
    { label: 'Home', href: '#top' },
    { label: 'Platform', href: '#platform' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Novelty', href: '#novelty' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Stakeholders', href: '#stakeholders' },
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
          ? 'bg-maritime-dark/95 backdrop-blur-md border-b border-maritime-border shadow-elevated py-3'
          : 'bg-maritime-dark border-b border-maritime-border/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sustainability-green/50 rounded-lg p-1"
            aria-label="Green Corridor India-Singapore Home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-maritime-navy to-maritime-surface border border-sustainability-green/40 flex items-center justify-center shadow-inner group-hover:border-sustainability-green transition-colors">
              {/* Custom SVG Icon combining ship bow, ocean wave, and leaf */}
              <svg
                className="w-6 h-6 text-sustainability-green group-hover:scale-105 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ship hull & bow */}
                <path
                  d="M3 13.5L5.5 17.5C6.5 19 8.2 19.8 10 19.8H14C15.8 19.8 17.5 19 18.5 17.5L21 13.5H3Z"
                  fill="currentColor"
                  fillOpacity="0.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                {/* Green Leaf accent */}
                <path
                  d="M12 4C12 4 17 6 17 11C14 11 12 8.5 12 4Z"
                  fill="#2F8F68"
                />
                <path
                  d="M12 4V11"
                  stroke="#DFF2E5"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                {/* Ocean Wave lines */}
                <path
                  d="M2 17.5C4.5 16 7.5 16 10 17.5C12.5 19 15.5 19 18 17.5C19.5 16.5 21 16.8 22 17.5"
                  stroke="#DFF2E5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg text-warm-white tracking-tight leading-none group-hover:text-mint-soft transition-colors">
                  Green Corridor
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-sustainability-green inline-block"></span>
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-sustainability-green uppercase mt-0.5">
                India × Singapore
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-subtle hover:text-warm-white hover:bg-maritime-surface/60 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="/greentwin"
              className="px-3 py-2 text-sm font-medium text-warm-white/90 hover:text-warm-white hover:bg-maritime-surface/80 rounded-lg border border-maritime-border/60 hover:border-sustainability-green/50 transition-all flex items-center gap-1.5"
            >
              <Route className="w-4 h-4 text-sustainability-green" />
              <span>GreenTwin</span>
            </a>
            <button
              onClick={onOpenSignIn}
              type="button"
              className="px-3 py-2 text-sm font-medium text-warm-white/90 hover:text-warm-white hover:bg-maritime-surface/80 rounded-lg border border-transparent hover:border-maritime-border transition-all flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-slate-light" />
              <span>Sign In</span>
            </button>
            <a
              href="/dashboard"
              className="px-4 py-2 text-sm font-semibold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] rounded-lg shadow-sm shadow-sustainability-green/30 transition-all flex items-center gap-1.5"
            >
              <span>Launch Dashboard</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="#platform"
              onClick={(e) => handleLinkClick(e, '#platform')}
              className="px-3 py-1.5 text-xs font-semibold text-warm-white bg-sustainability-green rounded-md"
            >
              Explore
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-subtle hover:text-warm-white hover:bg-maritime-surface focus:outline-none focus:ring-2 focus:ring-sustainability-green"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-maritime-border/80 bg-maritime-dark px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-subtle hover:text-warm-white hover:bg-maritime-surface transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-maritime-border/60 flex flex-col gap-2.5">
            <a
              href="/greentwin"
              className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-center text-warm-white border border-sustainability-green/40 hover:bg-maritime-surface flex items-center justify-center gap-2"
            >
              <Route className="w-4 h-4 text-sustainability-green" />
              <span>GreenTwin — Voyage Planning</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenSignIn) onOpenSignIn();
              }}
              type="button"
              className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-center text-warm-white border border-maritime-border hover:bg-maritime-surface flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-slate-light" />
              <span>Sign In (Role Portal)</span>
            </button>
            <a
              href="/dashboard"
              className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-center text-warm-white bg-sustainability-green hover:bg-sustainability-hover flex items-center justify-center gap-1.5"
            >
              <span>Launch Corridor Dashboard</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-muted pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sustainability-green" />
              <span>India–Singapore Verified Corridor Prototype</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
