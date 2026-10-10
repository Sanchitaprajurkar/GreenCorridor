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
  Maximize2,
  Minimize2,
  Rotate3d,
  Navigation,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onHowItWorksClick?: () => void;
  onSelectRole?: (role: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onHowItWorksClick,
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'mariners' | 'dock' | 'vessel'>('mariners');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Scroll Progress State (0 to 1) for Word-by-Word Fading and Media Expansion
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isManualExpanded, setIsManualExpanded] = useState<boolean>(false);

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

  // Media data with real human presence
  const mediaData = {
    mariners: {
      image: '/images/hero-mariners.jpg',
      alt: 'Captain Rajesh Deshmukh and First Officer Sandra navigating on the bridge of M/V Eco-Horizon',
      title: 'Bridge Command • Malacca Strait Passage',
      badge: 'Real Human Operators',
      quote: '"SmartDock cut our vessel idle time by 4 hours in Singapore, giving our crew a predictable rest window."',
      author: 'Capt. Rajesh Deshmukh & Officer Sandra',
      role: 'Master Mariner & First Officer • M/V Eco-Horizon (JNPA ⇄ PSA)',
      heading: '098° ESE',
      speed: '14.2 knots (Optimal CII Speed)',
      fuel: 'Bio-Methanol B24 Verified',
    },
    dock: {
      image: '/images/hero-dock-team.jpg',
      alt: 'JNPA and PSA Singapore port operations coordinators collaborating on dock with container berths',
      title: 'Quayside Berth Operations • PSA Tuas Terminal',
      badge: 'Port Logistics Team',
      quote: '"Having verified bunker notes 48 hours in advance means zero paperwork disputes at berth."',
      author: 'Marcus Tan & Priya Sharma',
      role: 'Joint Corridor Berth Operations • PSA Singapore & JNPA',
      heading: 'Berth 04 / Crane 12',
      speed: 'JIT Arrival Synchronized',
      fuel: 'Shore Power (Cold-Ironing) Ready',
    },
    vessel: {
      image: '/images/hero-ship.jpg',
      alt: 'Eco-Horizon container vessel sailing through green maritime corridor',
      title: 'Voyage #GC-2026-08 • 1,840 NM Track',
      badge: 'Verified Corridor Track',
      quote: '"We reduced auxiliary boiler emissions by 18% through dynamic Just-In-Time arrival scheduling."',
      author: 'Chief Engineer Sandra Lee',
      role: 'Technical Superintendent • Ocean Blue Fleet',
      heading: 'Malacca TSS Traffic Lane',
      speed: '15.4 knots Eco-Transit',
      fuel: 'Well-to-Wake Tracked',
    },
  };

  const currentMedia = mediaData[activeMediaTab];

  // Scroll listener for Word-by-Word Fade and Video Expansion
  useEffect(() => {
    const handleScroll = () => {
      if (!heroContainerRef.current) return;
      const rect = heroContainerRef.current.getBoundingClientRect();
      const start = rect.top;
      const totalScrollRange = 600;
      const progress = Math.min(Math.max(-start / totalScrollRange, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effective progress accounts for manual expand toggle
  const effectiveProgress = isManualExpanded ? 1 : scrollProgress;

  // Word-by-word fade opacities based on scroll progress:
  // Word 1: 'SAIL' fades out (0.00 to 0.18)
  const word1Opacity = Math.max(0, Math.min(1, 1 - effectiveProgress / 0.18));
  const word1TranslateY = -effectiveProgress * 40;

  // Word 2: 'CLEANER' fades out (0.12 to 0.32)
  const word2Opacity = Math.max(0, Math.min(1, 1 - Math.max(0, effectiveProgress - 0.12) / 0.20));
  const word2TranslateY = -effectiveProgress * 30;

  // Word 3: 'TOGETHER' fades out (0.26 to 0.46)
  const word3Opacity = Math.max(0, Math.min(1, 1 - Math.max(0, effectiveProgress - 0.26) / 0.20));
  const word3TranslateY = -effectiveProgress * 25;

  // Word 4: 'FORWARD' fades out (0.38 to 0.56)
  const word4Opacity = Math.max(0, Math.min(1, 1 - Math.max(0, effectiveProgress - 0.38) / 0.18));
  const word4TranslateY = -effectiveProgress * 15;

  // Check if text has finished fading out
  const isTextFinished = effectiveProgress >= 0.55;

  // Video Transformation calculation:
  // Starts with small width (560px), blurred (8px blur), dimmed
  // After text finishes (progress > 0.55), transforms to crystal clear normal (0 blur) and expands to whole screen!
  const expansionProgress = Math.min(Math.max((effectiveProgress - 0.2) / 0.8, 0), 1);
  const mediaBlur = Math.max(0, (1 - expansionProgress) * 8); // 8px -> 0px
  const mediaBrightness = 0.75 + expansionProgress * 0.25; // 0.75 -> 1.00
  const mediaOpacity = 0.88 + expansionProgress * 0.12; // 0.88 -> 1.00

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Angle of tilt up to 12 degrees
    const tiltX = -((y - centerY) / centerY) * 12;
    const tiltY = ((x - centerX) / centerX) * 12;

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

  // Click 3D impulse effect & toggle play / expand
  const handleCardClick = () => {
    // Lively micro 3D click impulse
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
      className="relative overflow-hidden bg-[#0B202B] text-[#FAFBF8] pt-6 pb-20 lg:pt-10 lg:pb-28 select-none transition-colors duration-500"
    >
      {/* =========================================================================
          BACKGROUND LAYER: Sixes-Style Bold Horizontal Sustainability Stripes
          Vibrant sustainability green (#2F8F68) & luminous mint (#10B981 / #34D399)
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-stretch opacity-90 overflow-hidden">
        {/* Subtle dark corridor grid */}
        <div className="absolute inset-0 bg-corridor-grid-dark opacity-30" />

        {/* 5 Bold Horizontal Energy Stripes (Sixes Signature Composition) */}
        <div className="relative w-full space-y-4 sm:space-y-6 lg:space-y-8 my-auto translate-y-8 sm:translate-y-12 lg:translate-y-16">
          <div className="w-full h-8 sm:h-12 md:h-16 lg:h-20 bg-[#2F8F68] opacity-95 shadow-lg shadow-[#2F8F68]/25" />
          <div className="w-full h-8 sm:h-12 md:h-16 lg:h-20 bg-[#102D3A] opacity-90 border-y border-[#2F8F68]/30" />
          <div className="w-full h-8 sm:h-12 md:h-16 lg:h-20 bg-[#2F8F68] opacity-95 shadow-lg shadow-[#2F8F68]/25" />
          <div className="w-full h-8 sm:h-12 md:h-16 lg:h-20 bg-[#102D3A] opacity-90 border-y border-[#2F8F68]/30" />
          <div className="w-full h-8 sm:h-12 md:h-16 lg:h-20 bg-[#2F8F68] opacity-95 shadow-lg shadow-[#2F8F68]/25" />
        </div>

        {/* Radial ambient light glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-emerald-500/12 blur-[130px] rounded-full pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Top Eyebrow Tag + Scroll Expansion Scrub Pill (Polished Depth & Separation) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-xs sm:text-sm font-bold text-[#AEE1C2] tracking-wider uppercase backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>INDIA–SINGAPORE GREEN & DIGITAL SHIPPING CORRIDOR</span>
          </div>

          {/* Interactive Scrub / Expand Pill */}
          <div className="inline-flex items-center gap-2 bg-white/[0.05] backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <Rotate3d className="w-3.5 h-3.5 text-[#10B981] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Scroll or Click:</span>
            <button
              type="button"
              onClick={() => setIsManualExpanded(!isManualExpanded)}
              className="ml-1 px-3 py-1 rounded-full bg-[#2F8F68] hover:bg-[#267957] text-white font-bold text-[11px] transition-all flex items-center gap-1.5 shadow-sm"
              title="Toggle full screen video expansion"
            >
              {isManualExpanded ? (
                <>
                  <Minimize2 className="w-3 h-3" />
                  <span>Show Text Framing</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3" />
                  <span>Expand Video Screen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* =========================================================================
            SIXES CRICKET SIGNATURE COMPOSITION (POLISHED & REFINED):
            - Typography scaled to clamp(2.75rem, 5.5vw, 5.5rem) so it frames the card cleanly
            - Top text: SAIL CLEANER above the card
            - Bottom text: TOGETHER FORWARD below the card
            - Media Card starts small & blurred with subtle dark backdrop, expands on scroll
           ========================================================================= */}
        <div className="relative text-center mx-auto flex flex-col items-center justify-center">

          {/* TOP TYPOGRAPHY CLUSTER: SAIL CLEANER (Clean framing above the card) */}
          <div className="font-display font-black tracking-tight uppercase text-[#FDFBF7] drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] z-30 pointer-events-none mb-2 sm:mb-4 select-none">
            <div
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight transition-all duration-300"
              style={{
                opacity: word1Opacity,
                transform: `translateY(${word1TranslateY}px)`,
                filter: `blur(${Math.max(0, (1 - word1Opacity) * 5)}px)`,
              }}
            >
              SAIL
            </div>
            <div
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight text-[#FAFBF8] mt-1 transition-all duration-300"
              style={{
                opacity: word2Opacity,
                transform: `translateY(${word2TranslateY}px)`,
                filter: `blur(${Math.max(0, (1 - word2Opacity) * 5)}px)`,
              }}
            >
              CLEANER
            </div>
          </div>

          {/* =========================================================================
              CENTRAL 3D TILT MEDIA CARD
              - overflow-hidden on container
              - Safe inner padding on top badges to eliminate clipping
              - Subtle border highlight (border: 1px solid rgba(255,255,255,0.12)) and warm glow
             ========================================================================= */}
          <div
            className="relative z-20 mx-auto transition-all duration-700 ease-out flex justify-center w-full my-1 sm:my-3"
            style={{
              perspective: '1200px',
            }}
          >
            <div
              ref={cardRef}
              onClick={handleCardClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/15 hover:border-[#2F8F68]/70 bg-white/[0.04] backdrop-blur-md cursor-pointer group transition-all duration-500 ease-out ring-1 ring-white/10 ${
                isTextFinished || isManualExpanded
                  ? 'w-full max-w-6xl shadow-[0_30px_90px_rgba(0,0,0,0.95)]'
                  : 'w-[92%] sm:w-[540px] md:w-[620px] shadow-[0_20px_60px_rgba(0,0,0,0.85)]'
              }`}
              style={{
                transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
                  isTextFinished ? 1.02 : 0.96
                }, ${isTextFinished ? 1.02 : 0.96}, 1)`,
                transformStyle: 'preserve-3d',
                boxShadow: tilt.isHovered
                  ? '0 30px 80px rgba(16, 185, 129, 0.4), 0 20px 40px rgba(0,0,0,0.95)'
                  : undefined,
              }}
            >
              {/* Dynamic Specular Light Glare following pointer */}
              <div
                className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.25) 0%, rgba(16,185,129,0.1) 35%, transparent 70%)`,
                  opacity: tilt.isHovered ? 1 : 0,
                }}
              />

              {/* Media Image Container with Smooth Blur & Height Transition */}
              <div
                className={`relative w-full overflow-hidden bg-[#0B202B] transition-all duration-700 ease-out ${
                  isTextFinished || isManualExpanded
                    ? 'h-[380px] sm:h-[480px] md:h-[560px] lg:h-[620px]'
                    : 'h-[300px] sm:h-[380px] md:h-[420px]'
                }`}
              >
                <img
                  src={currentMedia.image}
                  alt={currentMedia.alt}
                  className="w-full h-full object-cover object-center transform transition-all duration-700 ease-out group-hover:scale-105"
                  style={{
                    filter: `blur(${mediaBlur}px) brightness(${mediaBrightness})`,
                    opacity: mediaOpacity,
                  }}
                  loading="eager"
                />

                {/* Subtle dark vignette overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0B202B] via-[#0B202B]/20 to-transparent pointer-events-none transition-opacity duration-500"
                  style={{
                    opacity: isTextFinished ? 0.75 : 0.45,
                  }}
                />

                {/* =========================================================================
                    REFINED FLOATING PILLS TOP BAR (NEATLY ALIGNED INSIDE OVERFLOW-HIDDEN CARD)
                    Safe inner padding: p-4 sm:p-5 (top: 16px; left: 16px) - ZERO clipping!
                   ========================================================================= */}
                <div className="absolute top-0 inset-x-0 p-4 sm:p-5 z-20 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none">
                  
                  {/* Left Badges (Status & Telemetry) */}
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#0B202B]/90 backdrop-blur-md border border-[#2F8F68]/60 text-xs sm:text-sm font-bold text-[#AEE1C2] shadow-xl flex items-center gap-2">
                      {/* Live Blue 3D Tilt Arrow */}
                      <Navigation
                        className="w-4 h-4 text-sky-400 fill-sky-400 transition-transform duration-150"
                        style={{
                          transform: `rotate(${tilt.y * 3 + tilt.x * 2}deg)`,
                        }}
                      />
                      <span>{currentMedia.badge}</span>
                    </span>

                    {/* 3D Telemetry Pill */}
                    <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-emerald-300">
                      <span>HDG {currentMedia.heading}</span>
                      <span>•</span>
                      <span>{currentMedia.speed}</span>
                    </span>
                  </div>

                  {/* Right Scene Switcher Tabs (Neatly contained with safe padding) */}
                  <div className="flex items-center gap-1 bg-[#0B202B]/90 backdrop-blur-md p-1 rounded-2xl border border-white/15 shadow-xl pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab('mariners')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeMediaTab === 'mariners'
                          ? 'bg-[#2F8F68] text-white shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Ship className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Bridge Mariners</span>
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
                      <span className="hidden sm:inline">Dock Team</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab('vessel')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeMediaTab === 'vessel'
                          ? 'bg-[#2F8F68] text-white shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Vessel Track</span>
                    </button>
                  </div>

                </div>

                {/* CENTER GLOWING PLAY BUTTON */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVideoModalOpen(true);
                    }}
                    className="pointer-events-auto group/btn relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-sky-500/90 hover:bg-sky-400 text-white flex items-center justify-center shadow-2xl shadow-sky-500/60 hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-sky-300"
                    aria-label="Play Mariner Documentary and Real Story"
                  >
                    {/* Animated Pulse Rings */}
                    <span className="absolute -inset-3 rounded-full border-2 border-sky-400/60 animate-ping opacity-60 pointer-events-none" />
                    <span className="absolute -inset-6 rounded-full border border-sky-400/30 animate-pulse pointer-events-none" />
                    
                    <Play className="w-7 h-7 sm:w-10 sm:h-10 fill-white text-white translate-x-0.5" />
                  </button>
                </div>

                {/* Bottom Card Overlay: Human Quote & Operator Detail (Subtle Depth & Separation) */}
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

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsVideoModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2F8F68] hover:bg-[#267957] text-white text-xs font-bold transition-all shadow-md active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Hear Bridge Audio</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsManualExpanded(!isManualExpanded);
                        }}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
                        title={isManualExpanded ? 'Collapse' : 'Expand full width'}
                      >
                        {isManualExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* BOTTOM TYPOGRAPHY CLUSTER: TOGETHER FORWARD (Clean framing below the card) */}
          <div className="font-display font-black tracking-tight uppercase text-[#FDFBF7] drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] z-30 pointer-events-none mt-2 sm:mt-4 select-none">
            <div
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight transition-all duration-300"
              style={{
                opacity: word3Opacity,
                transform: `translateY(${word3TranslateY}px)`,
                filter: `blur(${Math.max(0, (1 - word3Opacity) * 5)}px)`,
              }}
            >
              TOGETHER
            </div>
            <div
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight text-[#AEE1C2] mt-1 transition-all duration-300"
              style={{
                opacity: word4Opacity,
                transform: `translateY(${word4TranslateY}px)`,
                filter: `blur(${Math.max(0, (1 - word4Opacity) * 5)}px)`,
              }}
            >
              FORWARD
            </div>
          </div>

        </div>

        {/* =========================================================================
            HUMANIZED CORE HEADLINE & COPYWRITING (Shift 1 from Prompt)
           ========================================================================= */}
        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#FDFBF7] leading-tight">
            Empowering Captains, Ports, and Traders to Sail Cleaner, Together.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Four simple tools designed for the people moving global trade — uniting master mariners, bunker testing crews, and quayside coordinators across India and Singapore.
          </p>

          {/* Sixes-style High Impact Pill Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <a
              href="#platform"
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-base text-white bg-[#2F8F68] hover:bg-[#267957] active:scale-95 shadow-xl shadow-[#2F8F68]/30 transition-all group"
            >
              <span>Explore the 4 Tools</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-bold text-base text-white bg-[#153A4B]/80 hover:bg-[#153A4B] border border-[#2F8F68]/50 hover:border-[#2F8F68] transition-all"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Watch Mariner Story</span>
            </button>

            <a
              href="#how-it-works"
              onClick={onHowItWorksClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-sm text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <span>How It Works</span>
            </a>
          </div>
        </div>

      </div>

      {/* =========================================================================
          INTERACTIVE MARINER STORY & VIDEO MODAL (Polished with Subtle Depth & Rim Glow)
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
