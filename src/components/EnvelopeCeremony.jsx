import React, { useState, useEffect } from 'react';
import GoldBurstCanvas from './GoldBurstCanvas';

/**
 * Play a realistic physical wax seal fracture snap sound using Web Audio API
 */
function playCrackSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const bufferSize = Math.floor(ctx.sampleRate * 0.08);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1500, ctx.currentTime);
    filter.Q.setValueAtTime(2.2, ctx.currentTime);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {}
}

/**
 * EnvelopeCeremony — Ultra-Smooth, Tidy & Realistic 60 FPS Ceremony
 * 
 * - Wax seal is at the ABSOLUTE OPTICAL & GEOMETRIC CENTER (50%, 50%).
 * - Zero GPU-stalling SVG filters; pure hardware-accelerated CSS.
 * - Flap unhinges smoothly, then neatly dissolves as the card rises,
 *   avoiding any awkward protruding triangles (tidy, realistic, smooth).
 * - Full-proportioned royal card with 100% visible Bismillah, Dua, and Allura calligraphy names.
 * - Tap anywhere during animation to fast-forward into the invitation immediately.
 */
export default function EnvelopeCeremony({ onComplete }) {
  const [phase, setPhase] = useState('sealed');
  const [isBurstActive, setIsBurstActive] = useState(false);

  // Lock body scroll during envelope ceremony
  useEffect(() => {
    if (phase !== 'done') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  const handleSealTap = (e) => {
    if (e) e.stopPropagation();
    if (phase !== 'sealed') return;

    // Trigger instant crisp sound & haptic (no fullscreen resize stutter)
    playCrackSound();
    if (navigator.vibrate) {
      try { navigator.vibrate([15, 25, 15]); } catch (err) {}
    }

    // Step 1: Cracking (0ms)
    setPhase('cracking');
    setIsBurstActive(true);

    // Step 2: Flap smoothly opens (380ms)
    const timerFlap = setTimeout(() => {
      setPhase('opening');
    }, 380);

    // Step 3: Card elevates majestically to center, envelope dissolves away (780ms)
    const timerRise = setTimeout(() => {
      setPhase('rising');
    }, 780);

    // Step 4: Seamless luminous transition begins (2100ms)
    const timerReveal = setTimeout(() => {
      setPhase('revealing');
    }, 2100);

    // Step 5: Complete and smoothly hand off to main invitation (2950ms)
    const timerDone = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 2950);

    return () => {
      clearTimeout(timerFlap);
      clearTimeout(timerRise);
      clearTimeout(timerReveal);
      clearTimeout(timerDone);
    };
  };

  // Instant fast-forward if user taps anywhere during presentation
  const handleFastForward = () => {
    if (phase === 'rising' || phase === 'opening') {
      setPhase('revealing');
      setTimeout(() => {
        setPhase('done');
        if (onComplete) onComplete();
      }, 500);
    }
  };


  if (phase === 'done') return null;

  return (
    <aside
      aria-label="Ceremonial Royal Wedding Envelope"
      onClick={handleFastForward}
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 select-none transition-all duration-1000 ${
        phase === 'revealing' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* 1. Luminous Warm Ivory & Champagne Ambient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-[#FAF4EA] to-[#F5ECE0] pointer-events-none transition-colors duration-1000" />
      
      {/* Soft warm sunbeam & golden ambient radial glow */}
      <div className="absolute w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] bg-gradient-to-tr from-amber-200/35 via-rose-100/25 to-amber-100/40 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />



      {/* 2. Light Flood Flash during 'revealing' phase */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F7EFE2] pointer-events-none transition-opacity duration-1000 z-50 ${
          phase === 'revealing' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3. The 3D Physical Royal Envelope & Card Container */}
      <div 
        style={{ perspective: 1200 }}
        className="relative w-full max-w-[360px] sm:max-w-[440px] flex flex-col items-center justify-center z-10"
      >
        {/* Envelope & Card Wrapper */}
        <div className="relative w-full min-h-[250px] sm:min-h-[290px] flex items-center justify-center">

          {/* ============================================================
              LAYER 1: The Royal Invitation Card
              When rising, takes complete center stage with 100% visibility!
              Generous royal height so all verses and names breathe freely.
              ============================================================ */}
          <div
            style={{
              transform: phase === 'rising' || phase === 'revealing'
                ? 'translate3d(0, -8px, 30px) scale(1.02)'
                : phase === 'opening'
                ? 'translate3d(0, 0px, 15px) scale(0.98)'
                : 'translate3d(0, 0px, 0px) scale(0.95)',
              opacity: phase === 'sealed' || phase === 'cracking' ? 0 : 1,
              transition: 'transform 0.95s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
              
              boxShadow: '0 25px 60px rgba(120, 85, 45, 0.28)',
              zIndex: 35
            }}
            className={`w-full max-w-[350px] sm:max-w-[420px] rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEDF] border-2 border-[#CBB084]/90 p-5 sm:p-7 flex flex-col items-center justify-between text-center select-none overflow-hidden ${
              phase === 'sealed' || phase === 'cracking' ? 'absolute pointer-events-none' : 'relative pointer-events-auto'
            }`}
          >
            {/* Card Filigree Corner Accents */}
            <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#CBB084] pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#CBB084] pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#CBB084] pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#CBB084] pointer-events-none" />
            <div className="absolute inset-2 rounded-2xl border border-[#CBB084]/40 pointer-events-none" />

            {/* Top: Sacred Bismillah with Radiant Glow */}
            <div className="pt-1 space-y-1 relative z-10">
              <div 
                dir="rtl" 
                lang="ar" 
                className="font-arabic text-2xl sm:text-3xl text-warm-espresso font-bold tracking-wide leading-relaxed drop-shadow-[0_1px_3px_rgba(201,166,107,0.4)]"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <p className="font-serif italic text-[10px] sm:text-xs text-warm-bronze/90 tracking-wider">
                In the name of Allah, the Most Beneficent, the Most Merciful
              </p>
            </div>

            {/* Middle: Couple Names in Royal Calligraphy (100% Unclipped & Pristine!) */}
            <div className="my-4 py-1 relative z-10 space-y-1">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#CBB084]" />
                <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.28em] uppercase text-terracotta-dark font-semibold">
                  Wedding Invitation
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#CBB084]" />
              </div>

              <h1 className="font-calligraphy not-italic text-4xl sm:text-5xl md:text-6xl text-warm-espresso tracking-normal font-normal drop-shadow-sm leading-tight px-2">
                Naqiyah &amp; Abbas
              </h1>

              <p className="font-serif italic text-[11px] sm:text-xs text-warm-bronze/90 mt-1">
                Two families · Two hearts · One beautiful beginning
              </p>
            </div>

            {/* Bottom: Dates and Venue City */}
            <div className="pb-1 space-y-2 relative z-10">
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#CBB084]" />
                <span className="text-[#B88E3E] text-xs">✦</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#CBB084]" />
              </div>
              <p className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-warm-espresso font-semibold">
                18 – 19 December 2026 · Nagpur
              </p>


            </div>
          </div>

          {/* ============================================================
              LAYER 2: The Physical Envelope Shell
              Silky 60fps opening: flap unhinges, then envelope neatly
              dissolves away so NO flaps awkwardly stick out into space!
              ============================================================ */}
          <div 
            onClick={phase === 'sealed' ? handleSealTap : undefined}
            className={`transition-all duration-700 [transform-style:preserve-3d] ${
              phase === 'sealed' || phase === 'cracking'
                ? 'relative w-full h-[240px] sm:h-[280px] cursor-pointer translate-y-0 opacity-100'
                : 'absolute inset-0 translate-y-10 opacity-0 pointer-events-none'
            }`}
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(160, 130, 90, 0.25))'
            }}
          >
            {/* 2A: Envelope Back Panel with Gold Damask Interior Lining */}
            <div className="absolute inset-0 rounded-2xl bg-[#EFE4D2] border border-[#CBB084]/60 overflow-hidden shadow-inner">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-35">
                <defs>
                  <pattern id="envelopeGoldDamask" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path d="M18 0 L36 18 L18 36 L0 18 Z" fill="none" stroke="#B89454" strokeWidth="0.75" />
                    <circle cx="18" cy="18" r="4" fill="#D4B06A" opacity="0.6" />
                    <path d="M9 9 L27 27 M27 9 L9 27" stroke="#D4B06A" strokeWidth="0.5" opacity="0.4" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#envelopeGoldDamask)" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/10 pointer-events-none" />
            </div>

            {/* 2B: Front Pocket (Left, Right, Bottom Flaps meeting at center 50%, 50%) */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
              <svg 
                viewBox="0 0 460 290" 
                className="w-full h-full" 
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="pocketGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#F5EBD8" />
                    <stop offset="100%" stopColor="#FAF4E8" />
                  </linearGradient>
                  <linearGradient id="leftFlapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F7F0E2" />
                    <stop offset="100%" stopColor="#EDE0CC" />
                  </linearGradient>
                  <linearGradient id="rightFlapGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F7F0E2" />
                    <stop offset="100%" stopColor="#EDE0CC" />
                  </linearGradient>
                </defs>

                {/* Left Flap: points from left to exact center (230, 145) */}
                <polygon 
                  points="0,0 230,145 0,290" 
                  fill="url(#leftFlapGrad)" 
                  stroke="#CBB084" 
                  strokeWidth="0.8" 
                />

                {/* Right Flap: points from right to exact center (230, 145) */}
                <polygon 
                  points="460,0 230,145 460,290" 
                  fill="url(#rightFlapGrad)" 
                  stroke="#CBB084" 
                  strokeWidth="0.8" 
                />

                {/* Bottom Flap: folds up to exact center (230, 145) */}
                <polygon 
                  points="0,290 460,290 230,145" 
                  fill="url(#pocketGrad)" 
                  stroke="#CBB084" 
                  strokeWidth="1" 
                />

                {/* Gold foil debossed lines along bottom flap folds */}
                <line x1="20" y1="284" x2="225" y2="149" stroke="#E2C792" strokeWidth="0.8" opacity="0.85" />
                <line x1="440" y1="284" x2="235" y2="149" stroke="#E2C792" strokeWidth="0.8" opacity="0.85" />
              </svg>

              {/* Subdued Elegant Watermark on Envelope Front Pocket */}
              <div className="absolute bottom-3 inset-x-0 flex flex-col items-center justify-center opacity-70 pointer-events-none">
                <span className="font-serif italic text-[10px] sm:text-xs text-warm-bronze tracking-wider">
                  The Royal Wedding Invitation
                </span>
              </div>
            </div>

            {/* 2C: 3D Hinging Top Flap (Triangular Closure — Meets at EXACT CENTER 50%, 50%) */}
            <div
              style={{
                transformOrigin: 'top center',
                transform: phase === 'sealed' || phase === 'cracking'
                  ? 'rotateX(0deg)'
                  : 'rotateX(-140deg)',
                transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                opacity: phase === 'opening' ? 0.8 : 1,
                transformStyle: 'preserve-3d',
                zIndex: 25
              }}
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
            >
              {/* Front of Flap (Visible when Sealed — Tip lands at EXACT CENTER) */}
              <div 
                style={{ backfaceVisibility: 'hidden' }}
                className="absolute inset-0 w-full h-full [clip-path:polygon(0_0,100%_0,50%_100%)] bg-gradient-to-b from-[#FAF4E8] to-[#F1E4CE] shadow-md"
              >
                <svg viewBox="0 0 460 145" className="w-full h-full" preserveAspectRatio="none">
                  <polygon points="0,0 460,0 230,145" fill="none" stroke="#CBB084" strokeWidth="1.2" />
                  <polygon points="12,4 448,4 230,135" fill="none" stroke="#E2C792" strokeWidth="0.8" opacity="0.75" />
                </svg>
              </div>

              {/* Back of Flap (Revealed when Open — Gold Damask Lining) */}
              <div 
                style={{ 
                  transform: 'rotateX(180deg)',
                  backfaceVisibility: 'hidden' 
                }}
                className="absolute inset-0 w-full h-full [clip-path:polygon(0_0,100%_0,50%_100%)] bg-[#EFE4D2] overflow-hidden shadow-md"
              >
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                  <rect width="100%" height="100%" fill="url(#envelopeGoldDamask)" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* 2D: Wax Seal Medallion in the ABSOLUTE CENTER (50%, 50%) */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-auto"
            >
              {/* Wax shard and gold dust burst canvas */}
              <GoldBurstCanvas active={isBurstActive} />

              {/* Interactive Seal Button */}
              <button
                onClick={handleSealTap}
                disabled={phase !== 'sealed'}
                className={`group relative p-1 rounded-full transition-all duration-500 focus:outline-none cursor-pointer ${
                  phase === 'sealed' ? 'hover:scale-105 active:scale-95 animate-gentle-pulse' : ''
                } ${
                  phase === 'cracking' ? 'scale-105' : ''
                } ${
                  phase === 'opening' || phase === 'rising' || phase === 'revealing' ? 'opacity-0 scale-125 pointer-events-none' : ''
                }`}
                aria-label="Tap royal wax seal to open invitation"
              >
                {/* Outer Golden Aura Glow */}
                <div className="absolute -inset-3 rounded-full bg-amber-400/30 blur-md group-hover:bg-amber-400/50 transition-colors pointer-events-none" />

                {/* Photorealistic Wax Seal with Letter-Core Centered Monogram */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  <img
                    src="/images/seal_wax.png"
                    alt="Royal Wax Seal"
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(115,20,28,0.5)]"
                  />

                  {/* Crack Fracture Lines Overlay */}
                  {phase === 'cracking' && (
                    <img
                      src="/images/seal_crack.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain animate-pulse z-10"
                    />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Elegant Action Button & Date Label beneath the envelope */}
        {phase === 'sealed' && (
          <div className="mt-8 flex flex-col items-center text-center animate-fade-in">
            <button
              onClick={handleSealTap}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3 rounded-full bg-gradient-to-r from-[#422216] via-[#633522] to-[#422216] text-gold-bright text-xs sm:text-sm font-medium tracking-[0.22em] uppercase shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#CBB084]/60"
            >
              <span className="text-gold-bright text-xs">✦</span>
              <span>Tap Seal to Open</span>
              <span className="text-gold-bright text-xs">✦</span>
            </button>

            <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-warm-espresso/80 font-semibold mt-3">
              18 – 19 December 2026 · Nagpur
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
