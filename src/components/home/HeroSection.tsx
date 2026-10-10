import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Play,
  Pause,
  X,
  Volume2,
  Compass,
  Ship,
  Anchor,
  CheckCircle2,
  Sparkles,
  Navigation,
  Globe,
  Waves,
  TrendingDown,
  Clock,
  Fuel,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onHowItWorksClick?: () => void;
  onSelectRole?: (role: string) => void;
}

// Count-up hook with smooth ease-out
const useCountUp = (target: number, duration: number = 1600, start: boolean = false, decimals: number = 1) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out exponential curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(parseFloat((easeProgress * target).toFixed(decimals)));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, start, decimals]);

  return val;
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onHowItWorksClick,
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'vessel' | 'mariners' | 'dock'>('vessel');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Scroll offset for restrained parallax
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  // Statistics Viewport Trigger
  const [statsInView, setStatsInView] = useState<boolean>(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // 3D Tilt State
  const [tilt, setTilt] = useState<{ x: number; y: number; glareX: number; glareY: number; isHovered: boolean }>({
    x: 0,
    y: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Count-up Animated Statistics
  const co2Count = useCountUp(16.4, 1800, statsInView, 1);
  const timeCount = useCountUp(4.2, 1600, statsInView, 1);
  const fuelCount = useCountUp(94.6, 2000, statsInView, 1);
  const nmCount = useCountUp(1840, 1800, statsInView, 0);

  // Media items
  const mediaData = {
    vessel: {
      image: '/images/hero-ship.jpg',
      alt: 'Eco-Horizon modern green container ship navigating the India-Singapore corridor',
      title: 'Voyage #GC-2026-08 • 1,840 NM Track',
      badge: 'Verified Corridor Transit',
      quote: '"Dynamic speed and weather routing reduced our auxiliary boiler emissions by 18% during transit."',
      author: 'Chief Engineer Sandra Lee',
      role: 'Technical Superintendent • Ocean Blue Fleet',
      heading: 'Malacca TSS Traffic Lane',
      speed: '14.2 knots Eco-Transit',
      fuel: 'Bio-Methanol B24 Certified',
    },
    mariners: {
      image: '/images/hero-mariners.jpg',
      alt: 'Captain Rajesh Deshmukh and First Officer Sandra navigating on bridge of M/V Eco-Horizon',
      title: 'Bridge Operations • Malacca Strait Passage',
      badge: 'Real Human Operators',
      quote: '"SmartDock cut our vessel idle time by 4 hours in Singapore, giving our crew a predictable rest window."',
      author: 'Capt. Rajesh Deshmukh & Officer Sandra',
      role: 'Master Mariner & First Officer • M/V Eco-Horizon',
      heading: '098° ESE Compass Track',
      speed: 'Optimal CII Speed',
      fuel: '100% Audited Mass-Balance',
    },
    dock: {
      image: '/images/hero-dock-team.jpg',
      alt: 'JNPA and PSA Singapore port operations coordinators collaborating on container berth',
      title: 'Quayside Operations • PSA Tuas Terminal',
      badge: 'Bilateral Port Logistics',
      quote: '"Having verified bunker notes 48 hours in advance means zero paperwork disputes at berth."',
      author: 'Marcus Tan & Priya Sharma',
      role: 'Corridor Berth Coordinators • PSA Singapore & JNPA',
      heading: 'Berth 04 / Crane 12',
      speed: 'JIT Arrival Synchronized',
      fuel: 'Cold-Ironing Shore Power Ready',
    },
  };

  const currentMedia = mediaData[activeMediaTab];

  // Subtle parallax listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for Stats count-up
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Angle of tilt up to 10 degrees
    const tiltX = -((y - centerY) / centerY) * 10;
    const tiltY = ((x - centerX) / centerX) * 10;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      x: tiltX,
      y: tiltY,
      glareX,
      glareY,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  };

  // Click 3D impulse reaction
  const handleCardClick = () => {
    setTilt((prev) => ({
      ...prev,
      x: prev.x * 1.3,
      y: prev.y * 1.3,
    }));
    setTimeout(() => {
      setTilt((prev) => ({
        ...prev,
        x: prev.x / 1.3,
        y: prev.y / 1.3,
      }));
    }, 180);
  };

  return (
    <section
      ref={heroContainerRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#0B202B] via-[#102D3A] to-[#0B202B] text-[#FAFBF8] pt-8 pb-20 lg:pt-14 lg:pb-28 select-none border-b border-white/10"
    >
      {/* Background ambient lighting and subtle corridor grid */}
      <div className="absolute inset-0 bg-corridor-grid-dark opacity-25 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#2F8F68]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* =========================================================================
            SECTION A: EYEBROW BADGE & PROGRESSIVELY DRAWN SHIPPING ROUTE LINE
           ========================================================================= */}
        <div className="flex flex-col items-center text-center space-y-4 mb-6 sm:mb-8">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-xs font-bold text-[#AEE1C2] tracking-wider uppercase backdrop-blur-md shadow-sm animate-fade-in-up">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>INDIA–SINGAPORE GREEN & DIGITAL SHIPPING CORRIDOR</span>
          </div>

          {/* Progressively Drawn Maritime Route Line (SVG Animation) */}
          <div className="w-full max-w-4xl px-4 py-2 relative">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 mb-1.5 px-2">
              <span className="flex items-center gap-1.5 text-[#AEE1C2] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                JNPA MUMBAI (18°56&apos;N)
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
                <Compass className="w-3.5 h-3.5 text-[#2F8F68]" />
                MALACCA TSS TRANSIT WAYPOINT
              </span>
              <span className="flex items-center gap-1.5 text-sky-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                PSA SINGAPORE (01°16&apos;N)
              </span>
            </div>

            {/* SVG Corridor Track Line with Progressive Green Draw Animation */}
            <div className="relative h-8 sm:h-10 w-full overflow-hidden">
              <svg
                className="w-full h-full"
                viewBox="0 0 800 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background dashed corridor track */}
                <path
                  d="M 20 20 C 220 5, 400 35, 580 15 S 760 25, 780 20"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Animated Green Shipping-Route Line drawing from left to right */}
                <path
                  d="M 20 20 C 220 5, 400 35, 580 15 S 760 25, 780 20"
                  stroke="url(#routeGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="animate-route-draw"
                />

                {/* Waypoint circles */}
                <circle cx="20" cy="20" r="5" fill="#2F8F68" />
                <circle cx="400" cy="22" r="3.5" fill="#AEE1C2" />
                <circle cx="780" cy="20" r="5" fill="#38BDF8" />

                {/* Route Gradients */}
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2F8F68" />
                    <stop offset="50%" stopColor="#AEE1C2" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Animated Vessel Indicator along Route */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-[58%] -translate-x-1/2 flex items-center gap-1 bg-[#102D3A]/90 border border-[#2F8F68]/70 px-2 py-0.5 rounded-full text-[10px] font-mono text-[#AEE1C2] shadow-lg animate-vessel-pulse pointer-events-none"
              >
                <Ship className="w-3 h-3 text-[#10B981]" />
                <span className="hidden sm:inline">M/V ECO-HORIZON • 14.2 KN</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION B: STAGGERED HEADLINE REVEAL
            "A GREENER COURSE FOR GLOBAL TRADE."
           ========================================================================= */}
        <div className="max-w-5xl mx-auto text-center space-y-4 mb-8 sm:mb-12">
          <h1 className="font-display font-black tracking-tight uppercase text-[#FDFBF7] leading-[1.05]">
            {/* Line 1: Staggered reveal (0ms delay) */}
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[92px] animate-fade-in-up">
              A{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AEE1C2] via-emerald-300 to-[#2F8F68] relative inline-block">
                GREENER COURSE
                <svg
                  className="absolute left-0 -bottom-2 w-full text-[#2F8F68]/50 h-2"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 5.5C45 1.5 155 1.5 199 5.5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>

            {/* Line 2: Staggered reveal (150ms delay) */}
            <span
              className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] text-slate-100 mt-1 sm:mt-2 animate-fade-in-up"
              style={{ animationDelay: '150ms' }}
            >
              FOR GLOBAL TRADE.
            </span>
          </h1>

          {/* Supporting Text: Fades in after main headline (300ms delay) */}
          <p
            className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal pt-2 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            An integrated digital intelligence platform connecting voyage planning, verified green fuel provenance, and Just-In-Time smart port coordination across India and Singapore.
          </p>

          {/* Primary and Secondary CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 animate-fade-in-up"
            style={{ animationDelay: '450ms' }}
          >
            <a
              href="#platform"
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white bg-[#2F8F68] hover:bg-[#267957] active:scale-[0.98] shadow-xl shadow-[#2F8F68]/30 transition-all group"
            >
              <span>Explore the Platform</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-base text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-[#2F8F68]/60 transition-all shadow-sm"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Watch Mariner Story</span>
            </button>

            <a
              href="#how-it-works"
              onClick={onHowItWorksClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all"
            >
              <Waves className="w-4 h-4 text-[#AEE1C2]" />
              <span>How It Works</span>
            </a>
          </div>
        </div>

        {/* =========================================================================
            SECTION C: CENTRAL 3D TILT MEDIA CARD WITH IMAGE PARALLAX & SCENE TABS
           ========================================================================= */}
        <div
          className="relative max-w-5xl mx-auto my-6 sm:my-10"
          style={{
            transform: `translateY(${Math.min(scrollOffset * 0.08, 40)}px)`,
            transition: 'transform 0.15s ease-out',
            perspective: '1200px',
          }}
        >
          <div
            ref={cardRef}
            onClick={handleCardClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/15 hover:border-[#2F8F68]/70 bg-white/[0.04] backdrop-blur-md cursor-pointer group transition-all duration-300 shadow-[0_25px_80px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
            style={{
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
                tilt.isHovered ? 1.01 : 1
              }, ${tilt.isHovered ? 1.01 : 1}, 1)`,
              transformStyle: 'preserve-3d',
              boxShadow: tilt.isHovered
                ? '0 30px 80px rgba(16, 185, 129, 0.35), 0 20px 40px rgba(0,0,0,0.95)'
                : undefined,
            }}
          >
            {/* Dynamic Specular Light Glare following pointer */}
            <div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.22) 0%, rgba(16,185,129,0.08) 35%, transparent 70%)`,
                opacity: tilt.isHovered ? 1 : 0,
              }}
            />

            {/* Media Image Frame with Subtle Image Zoom on Hover */}
            <div className="relative h-[320px] sm:h-[440px] md:h-[500px] lg:h-[540px] w-full overflow-hidden bg-[#0B202B]">
              <img
                src={currentMedia.image}
                alt={currentMedia.alt}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />

              {/* Subtle dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B202B] via-[#0B202B]/20 to-transparent pointer-events-none" />

              {/* Top Floating Pill Bar (Strictly inside overflow:hidden boundaries - Zero Clipping) */}
              <div className="absolute top-0 inset-x-0 p-4 sm:p-5 z-20 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none">
                
                {/* Left: Badge & Live Coordinates */}
                <div className="flex items-center gap-2 pointer-events-auto">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#0B202B]/90 backdrop-blur-md border border-[#2F8F68]/60 text-xs sm:text-sm font-bold text-[#AEE1C2] shadow-xl flex items-center gap-2">
                    <Navigation
                      className="w-4 h-4 text-sky-400 fill-sky-400 transition-transform duration-150"
                      style={{
                        transform: `rotate(${tilt.y * 3 + tilt.x * 2}deg)`,
                      }}
                    />
                    <span>{currentMedia.badge}</span>
                  </span>

                  <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-emerald-300">
                    <span>HDG {currentMedia.heading}</span>
                    <span>•</span>
                    <span>{currentMedia.speed}</span>
                  </span>
                </div>

                {/* Right: Scene Switcher Tabs */}
                <div className="flex items-center gap-1 bg-[#0B202B]/90 backdrop-blur-md p-1 rounded-2xl border border-white/15 shadow-xl pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab('vessel')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeMediaTab === 'vessel'
                        ? 'bg-[#2F8F68] text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Ship className="w-3.5 h-3.5" />
                    <span>Eco-Horizon</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab('mariners')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeMediaTab === 'mariners'
                        ? 'bg-[#2F8F68] text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Mariners</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab('dock')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeMediaTab === 'dock'
                        ? 'bg-[#2F8F68] text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Anchor className="w-3.5 h-3.5" />
                    <span>Dock Team</span>
                  </button>
                </div>

              </div>

              {/* Center Circular Play Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVideoModalOpen(true);
                  }}
                  className="pointer-events-auto group/btn relative w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-sky-500/90 hover:bg-sky-400 text-white flex items-center justify-center shadow-2xl shadow-sky-500/60 hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-sky-300"
                  aria-label="Play Mariner Bridge Audio Documentary"
                >
                  <span className="absolute -inset-3 rounded-full border-2 border-sky-400/60 animate-ping opacity-60 pointer-events-none" />
                  <span className="absolute -inset-6 rounded-full border border-sky-400/30 animate-pulse pointer-events-none" />
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white text-white translate-x-0.5" />
                </button>
              </div>

              {/* Bottom Quote & Detail Overlay Box */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-[#0B202B] via-[#0B202B]/90 to-transparent z-20">
                <div className="bg-white/[0.05] backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/15 shadow-2xl text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-white/95 italic">
                      {currentMedia.quote}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#AEE1C2]">
                      <span className="font-bold text-white">{currentMedia.author}</span>
                      <span>•</span>
                      <span className="text-slate-300">{currentMedia.role}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVideoModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2F8F68] hover:bg-[#267957] text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bridge Telemetry</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION D: CORRIDOR STATISTICS THAT COUNT UP ONCE ENTERING VIEWPORT
           ========================================================================= */}
        <div
          ref={statsRef}
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {/* Stat 1: CO2e Abated */}
          <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-[#2F8F68]/60 transition-all text-left shadow-[0_8px_30px_rgba(0,0,0,0.3)] group">
            <div className="flex items-center justify-between text-xs text-[#AEE1C2] mb-1 font-bold">
              <span>CO₂e ABATED</span>
              <TrendingDown className="w-4 h-4 text-[#10B981] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-black text-white font-display">
              {co2Count} <span className="text-lg text-[#AEE1C2] font-semibold">kt</span>
            </div>
            <div className="mt-2.5 text-xs text-slate-300 leading-snug bg-black/40 p-2 rounded-xl border border-white/5">
              🌱 <strong className="text-white">Equivalent to:</strong> taking ~3,500 passenger cars off the road for a year.
            </div>
          </div>

          {/* Stat 2: Port Dwell Saved */}
          <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-[#2F8F68]/60 transition-all text-left shadow-[0_8px_30px_rgba(0,0,0,0.3)] group">
            <div className="flex items-center justify-between text-xs text-[#AEE1C2] mb-1 font-bold">
              <span>PORT DWELL SAVED</span>
              <Clock className="w-4 h-4 text-[#10B981] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-black text-white font-display">
              {timeCount} <span className="text-lg text-[#AEE1C2] font-semibold">hrs</span>
            </div>
            <div className="mt-2.5 text-xs text-slate-300 leading-snug bg-black/40 p-2 rounded-xl border border-white/5">
              ⏰ <strong className="text-white">Crew Benefit:</strong> guaranteed rest window & zero idle anchorage queue.
            </div>
          </div>

          {/* Stat 3: Verified Green Fuel */}
          <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-[#2F8F68]/60 transition-all text-left shadow-[0_8px_30px_rgba(0,0,0,0.3)] group">
            <div className="flex items-center justify-between text-xs text-[#AEE1C2] mb-1 font-bold">
              <span>VERIFIED GREEN FUEL</span>
              <Fuel className="w-4 h-4 text-[#10B981] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-black text-white font-display">
              {fuelCount}<span className="text-lg text-[#AEE1C2] font-semibold">%</span>
            </div>
            <div className="mt-2.5 text-xs text-slate-300 leading-snug bg-black/40 p-2 rounded-xl border border-white/5">
              📜 <strong className="text-white">Audit Proof:</strong> 100% digital bunker delivery notes with instant validation.
            </div>
          </div>

          {/* Stat 4: Bilateral Corridor Span */}
          <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-[#2F8F68]/60 transition-all text-left shadow-[0_8px_30px_rgba(0,0,0,0.3)] group">
            <div className="flex items-center justify-between text-xs text-[#AEE1C2] mb-1 font-bold">
              <span>CORRIDOR SPAN</span>
              <Globe className="w-4 h-4 text-[#10B981] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-black text-white font-display">
              {nmCount.toLocaleString()} <span className="text-lg text-[#AEE1C2] font-semibold">NM</span>
            </div>
            <div className="mt-2.5 text-xs text-slate-300 leading-snug bg-black/40 p-2 rounded-xl border border-white/5">
              🌊 <strong className="text-white">Cross-Border:</strong> JNPA (India) to Singapore PSA in single shared ledger.
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          INTERACTIVE MARINER STORY & VHF AUDIO MODAL
         ========================================================================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-[#102D3A] rounded-3xl border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden text-left ring-1 ring-white/10">
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-[#0B202B]/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2F8F68]/20 border border-[#2F8F68]/50 flex items-center justify-center text-[#10B981]">
                  <Ship className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Voices of the Green Corridor • Bridge & Quayside
                  </h3>
                  <p className="text-xs text-slate-300">
                    Real human operators navigating the India–Singapore route
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  setIsPlayingAudio(false);
                }}
                className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Media Preview Box with Simulation Visual */}
              <div className="relative rounded-2xl overflow-hidden border border-[#2F8F68]/40 bg-black aspect-video flex items-center justify-center">
                <img
                  src={currentMedia.image}
                  alt="Bridge simulator"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 flex flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      LIVE VHF CHANNEL 12 • 02:45 UTC
                    </span>
                    <span className="text-xs text-slate-300 font-mono">JNPA ➔ SINGAPORE</span>
                  </div>

                  <div className="text-center my-auto">
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#2F8F68] hover:bg-[#267957] text-white font-bold text-sm shadow-xl hover:scale-105 transition-all"
                    >
                      {isPlayingAudio ? (
                        <>
                          <Pause className="w-5 h-5" />
                          <span>Pause Bridge Transmission</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-5 h-5" />
                          <span>Play Bridge Transmission</span>
                        </>
                      )}
                    </button>
                    {isPlayingAudio && (
                      <p className="text-xs text-emerald-300 mt-2 font-mono animate-pulse">
                        ● Streaming VHF Ch 12 Audio Simulation... &quot;PSA Vessel Traffic, Eco-Horizon reports 14.2 knots on Bio-Bunker B24...&quot;
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-slate-300 font-sans">
                    Audio documentary recorded aboard M/V Eco-Horizon during transit through Malacca Strait.
                  </div>
                </div>
              </div>

              {/* Human Testimonials List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#AEE1C2] uppercase tracking-wider">
                  Testimonials from the Helm
                </h4>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Capt. Rajesh Deshmukh • Master Mariner</span>
                    <span className="text-[#AEE1C2] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Mariner
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    &quot;Before Green Corridor, berth waiting in Singapore could take up to 9 hours at anchorage with engines running idle. SmartDock cut our vessel idle time by 4 hours, giving our crew a predictable rest window and cutting 14 tons of fuel burn.&quot;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Mei Lin Tan • Head of Bunker Operations, Jurong</span>
                    <span className="text-[#AEE1C2] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Fuel Verification Partner
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    &quot;FuelTrust digitizes our mass-flow meter readings and sustainability certificates. Bunkering disputes that used to take three business days are now resolved instantly upon vessel arrival.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 bg-[#0B202B] border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                India–Singapore Green Corridor Digital Initiative
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  if (onExploreClick) onExploreClick();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#2F8F68] hover:bg-[#267957] text-white text-xs font-bold transition-colors"
              >
                Explore Corridor Tools
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
