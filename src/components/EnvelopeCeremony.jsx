import React, { useState, useEffect } from 'react';
import { enterFullscreen } from '../utils/fullscreen';
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
    
    const bufferSize = Math.floor(ctx.sampleRate * 0.09);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, ctx.currentTime);
    filter.Q.setValueAtTime(2.5, ctx.currentTime);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {}
}

/**
 * EnvelopeCeremony — The Royal Opening Ceremony
 * 
 * - Seal is located in the EXACT GEOMETRIC & OPTICAL CENTER (Fix for Screenshot 4).
 * - When opened, the card glides completely clear into center view, with ZERO occlusion (Fix for Screenshot 1).
 * - 100% visible Bismillah, Dua, and Allura calligraphy names.
 * - Luminous, light-first setting (warm ivory/champagne).
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

  const handleSealTap = () => {
    if (phase !== 'sealed') return;

    // 1. Gesture-safe fullscreen & crack sound
    enterFullscreen();
    playCrackSound();
    if (navigator.vibrate) {
      try { navigator.vibrate([18, 30, 20]); } catch (e) {}
    }

    // 2. Begin Act 0 Choreography
    setPhase('cracking');
    setIsBurstActive(true);

    // Sequence timers
    setTimeout(() => {
      setPhase('opening');
    }, 650);

    setTimeout(() => {
      setPhase('rising');
    }, 1500);

    setTimeout(() => {
      setPhase('revealing');
    }, 3200);

    setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 4100);
  };

  if (phase === 'done') return null;

  return (
    <aside
      aria-label="Ceremonial Royal Wedding Envelope"
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 select-none transition-all duration-1000 ${
        phase === 'revealing' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* 1. Luminous Warm Ivory & Champagne Ambient Backdrop (Light First!) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-[#FAF4EA] to-[#F5ECE0] pointer-events-none transition-colors duration-1000" />
      
      {/* Soft warm sunbeam & golden ambient radial glow */}
      <div className="absolute w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] bg-gradient-to-tr from-amber-200/35 via-rose-100/25 to-amber-100/40 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Subtle floating ivory watercolor wash texture */}
      <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />

      {/* 2. Light Flood Flash during 'revealing' phase */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F7EFE2] pointer-events-none transition-opacity duration-1000 z-50 ${
          phase === 'revealing' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3. The 3D Physical Royal Envelope Container */}
      <div 
        style={{ perspective: 1400 }}
        className="relative w-full max-w-[370px] sm:max-w-[460px] flex flex-col items-center justify-center z-10"
      >
        {/* Envelope & Card Wrapper */}
        <div className="relative w-full h-[250px] sm:h-[295px] flex items-center justify-center">

          {/* LAYER 1: The Royal Invitation Card (Elevates COMPLETELY out of envelope, floating in center!) */}
          <div
            style={{
              transform: phase === 'rising' || phase === 'revealing'
                ? 'translateY(-110px) scale(1.04)'
                : phase === 'opening'
                ? 'translateY(-30px) scale(1.0)'
                : 'translateY(0px) scale(0.96)',
              opacity: phase === 'sealed' ? 0 : 1, // Hidden when envelope is sealed!
              transition: 'transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
              filter: phase === 'revealing' ? 'blur(4px)' : 'none',
              boxShadow: '0 25px 50px rgba(130, 95, 50, 0.30)',
              zIndex: phase === 'rising' || phase === 'revealing' ? 35 : 10
            }}
            className="absolute inset-x-2 sm:inset-x-3 top-2 bottom-2 rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEDF] border-2 border-[#CBB084]/90 p-4 sm:p-6 flex flex-col items-center justify-between text-center select-none overflow-hidden"
          >
            {/* Card Filigree Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#CBB084] pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#CBB084] pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#CBB084] pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#CBB084] pointer-events-none" />

            {/* Inner delicate hairline border */}
            <div className="absolute inset-1.5 rounded-xl border border-[#CBB084]/40 pointer-events-none" />

            {/* Top: Sacred Bismillah with Radiant Glow */}
            <div className="pt-1 relative z-10">
              <div 
                dir="rtl" 
                lang="ar" 
                className="font-arabic text-2xl sm:text-3xl text-warm-espresso font-bold tracking-wide leading-relaxed drop-shadow-[0_1px_3px_rgba(201,166,107,0.4)]"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <p className="font-serif italic text-[9px] sm:text-[11px] text-warm-bronze/90 -mt-1 tracking-wider">
                In the name of Allah, the Most Beneficent, the Most Merciful
              </p>
            </div>

            {/* Middle: Couple Names in Royal Calligraphy (100% Unclipped & Pristine!) */}
            <div className="my-auto py-1 relative z-10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#CBB084]" />
                <span className="text-[8.5px] sm:text-[9.5px] font-sans tracking-[0.28em] uppercase text-terracotta-dark font-semibold">
                  Wedding Invitation
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#CBB084]" />
              </div>

              <h1 className="font-calligraphy not-italic text-4xl sm:text-5xl md:text-6xl text-warm-espresso tracking-normal font-normal drop-shadow-sm leading-tight">
                Naqiyah &amp; Abbas
              </h1>

              <p className="font-serif italic text-[10px] sm:text-xs text-warm-bronze/85 mt-1">
                Two families · Two hearts · One beautiful beginning
              </p>
            </div>

            {/* Bottom: Dates and Venue City */}
            <div className="pb-1 relative z-10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#CBB084]" />
                <span className="text-[#B88E3E] text-xs">✦</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#CBB084]" />
              </div>
              <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-warm-espresso font-semibold">
                18 – 19 December 2026 · Nagpur
              </p>
            </div>
          </div>

          {/* LAYER 2: The Physical Envelope Shell */}
          <div 
            onClick={phase === 'sealed' ? handleSealTap : undefined}
            className={`absolute inset-0 [transform-style:preserve-3d] transition-all duration-1000 ${
              phase === 'sealed' ? 'cursor-pointer' : ''
            } ${
              phase === 'rising' || phase === 'revealing'
                ? 'translate-y-24 opacity-0 pointer-events-none' 
                : 'translate-y-0 opacity-100'
            }`}
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(160, 130, 90, 0.28))'
            }}
          >
            {/* 2A: Envelope Back Panel with Luxurious Gold Damask Interior Lining */}
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
                viewBox="0 0 460 295" 
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
                  <filter id="creaseShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="-3" stdDeviation="3.5" floodColor="#8A6E46" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* Left Flap: points from left to exact center (230, 147.5) */}
                <polygon 
                  points="0,0 230,147.5 0,295" 
                  fill="url(#leftFlapGrad)" 
                  stroke="#CBB084" 
                  strokeWidth="0.8" 
                />

                {/* Right Flap: points from right to exact center (230, 147.5) */}
                <polygon 
                  points="460,0 230,147.5 460,295" 
                  fill="url(#rightFlapGrad)" 
                  stroke="#CBB084" 
                  strokeWidth="0.8" 
                />

                {/* Bottom Flap: folds up to exact center (230, 147.5) */}
                <polygon 
                  points="0,295 460,295 230,147.5" 
                  fill="url(#pocketGrad)" 
                  stroke="#CBB084" 
                  strokeWidth="1" 
                  filter="url(#creaseShadow)"
                />

                {/* Gold foil debossed lines along bottom flap folds */}
                <line x1="20" y1="288" x2="225" y2="152" stroke="#E2C792" strokeWidth="0.8" opacity="0.85" />
                <line x1="440" y1="288" x2="235" y2="152" stroke="#E2C792" strokeWidth="0.8" opacity="0.85" />
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
                  : 'rotateX(-180deg)',
                transition: 'transform 1.05s cubic-bezier(0.16, 1, 0.3, 1)',
                transformStyle: 'preserve-3d',
                zIndex: 25
              }}
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
            >
              {/* Front of Flap (Visible when Sealed — Tip lands at EXACT CENTER) */}
              <div 
                style={{ backfaceVisibility: 'hidden' }}
                className="absolute inset-0 w-full h-full [clip-path:polygon(0_0,100%_0,50%_100%)] bg-gradient-to-b from-[#FAF4E8] to-[#F1E4CE] shadow-[0_10px_20px_rgba(130,100,60,0.22)]"
              >
                <svg viewBox="0 0 460 147.5" className="w-full h-full" preserveAspectRatio="none">
                  <polygon points="0,0 460,0 230,147.5" fill="none" stroke="#CBB084" strokeWidth="1.2" />
                  <polygon points="12,4 448,4 230,137" fill="none" stroke="#E2C792" strokeWidth="0.8" opacity="0.75" />
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

            {/* 2D: Wax Seal Medallion in the ABSOLUTE CENTER (Fix for Screenshot 4: "Should be Centre") */}
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

                {/* Photorealistic Wax Seal Image with Optically Centered Monogram */}
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
