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
export default function EnvelopeCeremony({ onComplete, onCardShow }) {
  const [phase, setPhase] = useState('sealed');
  const [isBurstActive, setIsBurstActive] = useState(false);

  // Prevent background scrolling while ceremony overlay is active
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

    // Force Fullscreen immediately on user gesture
    enterFullscreen();

    // Trigger instant crisp sound & haptic
    playCrackSound();
    if (navigator.vibrate) {
      try { navigator.vibrate([15, 25, 15]); } catch (err) {}
    }

    // Step 1: Cracking (0ms) - Wax fracture lines glow & gold burst particles erupt
    // *** Seal broken = fullscreen already forced above + music starts here,
    // inside the tap gesture so mobile autoplay never blocks ***
    setPhase('cracking');
    setIsBurstActive(true);
    try {
      window.dispatchEvent(new CustomEvent('wedding:card-shown'));
    } catch (err) {}
    if (onCardShow) {
      onCardShow();
    }

    // Step 2: Flap smoothly unhinges in 3D (750ms - allows crack & burst to be fully experienced)
    const timerFlap = setTimeout(() => {
      setPhase('opening');
    }, 750);

    // Step 3: Card emerges and rises majestically into full view (1650ms)
    const timerRise = setTimeout(() => {
      setPhase('rising');
    }, 1650);

    // Step 4: Card stays serenely displayed for comfortable reading (~4.85 seconds)
    // Seamless luminous transition begins (6500ms)
    const timerReveal = setTimeout(() => {
      setPhase('revealing');
    }, 6500);

    // Step 5: Smoothly hand off to main invitation narrative (7400ms)
    const timerDone = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 7400);

    return () => {
      clearTimeout(timerFlap);
      clearTimeout(timerRise);
      clearTimeout(timerReveal);
      clearTimeout(timerDone);
    };
  };

  // Instant fast-forward if user taps anywhere during presentation
  // (sealed taps are handled by the seal button itself, which starts music)
  const handleFastForward = () => {
    if (phase === 'sealed') return;
    enterFullscreen();
    try {
      window.dispatchEvent(new CustomEvent('wedding:card-shown'));
    } catch (err) {}
    if (onCardShow) {
      onCardShow();
    }
    if (phase === 'rising') {
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

      {/* 3. The 3D Physical Royal Envelope & Card Container (Zero-reflow fixed geometry) */}
      <div 
        style={{ perspective: 1400 }}
        className="relative w-full max-w-[360px] sm:max-w-[430px] h-[340px] sm:h-[380px] flex items-center justify-center z-10"
      >
        {/* ============================================================
            LAYER 1: The Royal Invitation Card
            Permanently absolute; glides majestically from inside envelope
            to full center stage with 100% visibility & zero layout jump.
            ============================================================ */}
        <div
          style={{
            transform: phase === 'rising'
              ? 'translate3d(0, 8px, 35px) scale(1.0)'
              : phase === 'revealing'
              ? 'translate3d(0, -16px, 50px) scale(1.04)'
              : phase === 'opening'
              ? 'translate3d(0, 20px, 12px) scale(0.96)'
              : 'translate3d(0, 28px, 0px) scale(0.92)',
            opacity: phase === 'sealed' || phase === 'cracking' ? 0 : 1,
            transition: phase === 'rising'
              ? 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              : 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
            boxShadow: '0 25px 55px rgba(120, 85, 45, 0.26)',
            zIndex: 35
          }}
          className={`absolute w-[91%] max-w-[325px] sm:max-w-[385px] rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEDF] border-2 border-[#CBB084]/90 p-5 sm:p-7 flex flex-col items-center justify-between text-center select-none overflow-hidden ${
            phase === 'rising' ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'
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
              className="font-arabic text-2xl sm:text-3xl text-ink-deep font-bold tracking-wide leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <p className="font-serif italic text-xs sm:text-sm text-ink-deep font-bold tracking-wider">
              In the name of Allah, the Most Beneficent, the Most Merciful
            </p>
          </div>

          {/* Middle: Couple Names in Royal Calligraphy */}
          <div className="my-4 py-1 relative z-10 space-y-1.5">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#CBB084]" />
              <span className="text-[9.5px] sm:text-[11px] font-sans tracking-[0.28em] uppercase text-ink-deep font-bold">
                Wedding Invitation
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#CBB084]" />
            </div>

            <h1 className="font-calligraphy not-italic text-4xl sm:text-5xl md:text-6xl text-ink-deep tracking-normal font-normal drop-shadow-sm leading-tight px-2">
              Naqiyah &amp; Abbas
            </h1>

            <p className="font-serif italic text-[10px] min-[390px]:text-[11px] sm:text-xs text-ink-deep font-semibold mt-1 whitespace-nowrap tracking-tight px-1">
              Two families · Two hearts · One beautiful beginning
            </p>
          </div>

          {/* Bottom: Dates and Venue City */}
          <div className="pb-1 space-y-2 relative z-10">
            <div className="flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#CBB084]" />
              <span className="text-[#9A7228] text-xs">✦</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#CBB084]" />
            </div>
            <p className="font-sans text-xs sm:text-sm tracking-[0.22em] uppercase text-ink-deep font-bold">
              18 – 19 December 2026 · Nagpur
            </p>
          </div>
        </div>

        {/* ============================================================
            LAYER 2: The Physical Envelope Shell
            Permanently absolute; flap unhinges smoothly in 3D,
            then the shell sinks downward and dissolves away gracefully.
            ============================================================ */}
        <div 
          onClick={phase === 'sealed' ? handleSealTap : undefined}
          style={{
            filter: 'drop-shadow(0 18px 36px rgba(160, 130, 90, 0.22))',
            transform: phase === 'rising'
              ? 'translate3d(0, 22px, -15px) scale(0.98)'
              : phase === 'revealing'
              ? 'translate3d(0, 42px, -30px) scale(0.92)'
              : 'translate3d(0, 0px, 0px) scale(1)',
            opacity: phase === 'revealing' ? 0 : 1,
            transition: 'transform 0.95s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out',
            transformStyle: 'preserve-3d',
            zIndex: phase === 'rising' || phase === 'revealing' ? 10 : 25
          }}
          className={`absolute w-full h-[230px] sm:h-[265px] ${
            phase === 'sealed' ? 'cursor-pointer' : 'pointer-events-none'
          }`}
        >
          {/* 2A: Envelope Back Panel with Gold Damask Interior Lining */}
          <div className="absolute inset-0 rounded-2xl bg-[#EFE4D2] border border-[#CBB084]/60 overflow-hidden shadow-inner">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
              <defs>
                <pattern id="envelopeGoldDamask" width="36" height="36" patternUnits="userSpaceOnUse">
                  <rect width="36" height="36" fill="#F8F3E9" />
                  <path d="M 18,0 L 36,18 L 18,36 L 0,18 Z" fill="none" stroke="#D4B678" strokeWidth="0.6" opacity="0.65" />
                  <path d="M 18,5 L 31,18 L 18,31 L 5,18 Z" fill="none" stroke="#C5A25D" strokeWidth="0.4" opacity="0.5" />
                  <circle cx="18" cy="18" r="3" fill="#C5A25D" opacity="0.8" />
                  <circle cx="18" cy="18" r="1.2" fill="#FCFAF6" />
                  <path d="M 18,11 Q 18,18 25,18 Q 18,18 18,25 Q 18,18 11,18 Q 18,18 18,11 Z" fill="#DDBE80" opacity="0.6" />
                  <circle cx="0" cy="0" r="1.8" fill="#C5A25D" opacity="0.45" />
                  <circle cx="36" cy="0" r="1.8" fill="#C5A25D" opacity="0.45" />
                  <circle cx="0" cy="36" r="1.8" fill="#C5A25D" opacity="0.45" />
                  <circle cx="36" cy="36" r="1.8" fill="#C5A25D" opacity="0.45" />
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

            {/* Dynamic Flap Contact Shadow on Front Pocket */}
            <div
              style={{
                transition: 'opacity 0.6s ease',
                opacity: phase === 'sealed' || phase === 'cracking' ? 1 : 0
              }}
              className="absolute inset-0 pointer-events-none z-22 overflow-hidden rounded-2xl"
            >
              <svg viewBox="0 0 460 290" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <filter id="flapShadowFilter" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="3.5" />
                  </filter>
                </defs>
                <path d="M 0,0 L 0,6 Q 0,16 16,24 L 212,135 Q 230,144 248,135 L 444,24 Q 460,16 460,6 L 460,0 Z" fill="rgba(80, 50, 30, 0.22)" filter="url(#flapShadowFilter)" />
              </svg>
            </div>

            {/* Subdued Elegant Watermark on Envelope Front Pocket */}
            <div className="absolute bottom-3 inset-x-0 flex flex-col items-center justify-center opacity-70 pointer-events-none">
              <span className="font-serif italic text-[10px] sm:text-xs text-warm-bronze tracking-wider">
                The Royal Wedding Invitation
              </span>
            </div>
          </div>

          {/* 2C: 3D Hinging Top Flap (Realistic Euro-Flap Contour & Luxury Damask Liner) */}
          <div
            style={{
              transformOrigin: 'top center',
              transform: phase === 'sealed' || phase === 'cracking'
                ? 'rotateX(0deg)'
                : 'rotateX(-172deg)',
              transition: 'transform 0.95s cubic-bezier(0.34, 1.2, 0.64, 1)',
              transformStyle: 'preserve-3d',
              zIndex: 28
            }}
            className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
          >
            {/* Top Hinge Crease Line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#CBB084]/80 to-transparent pointer-events-none z-30" />

            {/* Front of Flap (Facing forward when sealed) */}
            <div 
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
              className="absolute inset-0 w-full h-full filter drop-shadow-[0_4px_8px_rgba(120,85,45,0.18)]"
            >
              <svg viewBox="0 0 460 145" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="flapFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FAF4E8" />
                    <stop offset="60%" stopColor="#F5EBD8" />
                    <stop offset="100%" stopColor="#EFE3CB" />
                  </linearGradient>
                </defs>
                {/* Flap Outer Body with softened Euro-curve apex */}
                <path 
                  d="M 0,0 L 0,6 Q 0,16 16,24 L 212,135 Q 230,144 248,135 L 444,24 Q 460,16 460,6 L 460,0 Z" 
                  fill="url(#flapFrontGrad)" 
                  stroke="#CBB084" 
                  strokeWidth="1.2" 
                />
                {/* Debossed Gold Inner Inset Border */}
                <path 
                  d="M 16,4 Q 16,14 26,20 L 214,130 Q 230,137 246,130 L 434,20 Q 444,14 444,4" 
                  fill="none" 
                  stroke="#E2C792" 
                  strokeWidth="0.8" 
                  opacity="0.85" 
                />
              </svg>
            </div>

            {/* Back of Flap (Revealed when open — Symmetrical rotateY preserves downward tip) */}
            <div 
              style={{ 
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
              className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_6px_rgba(120,85,45,0.12)]"
            >
              <svg viewBox="0 0 460 145" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="backFlapShade" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.16)" />
                    <stop offset="40%" stopColor="transparent" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
                  </linearGradient>
                </defs>
                {/* Outer Flap Paper Base */}
                <path 
                  d="M 0,0 L 0,6 Q 0,16 16,24 L 212,135 Q 230,144 248,135 L 444,24 Q 460,16 460,6 L 460,0 Z" 
                  fill="#F5EDE1" 
                  stroke="#CBB084" 
                  strokeWidth="1.2" 
                />
                {/* Authentic Die-Cut Luxury Gold Liner with Exposed Paper Border */}
                <path 
                  d="M 12,3 L 12,8 Q 12,17 24,23 L 212,126 Q 230,134 248,126 L 436,23 Q 448,17 448,8 L 448,3 Z" 
                  fill="url(#envelopeGoldDamask)" 
                  stroke="#CBB084" 
                  strokeWidth="0.8" 
                />
                {/* Ambient Shading Gradient */}
                <path 
                  d="M 0,0 L 0,6 Q 0,16 16,24 L 212,135 Q 230,144 248,135 L 444,24 Q 460,16 460,6 L 460,0 Z" 
                  fill="url(#backFlapShade)" 
                />
                {/* Inner Debossed Accent Line on Liner */}
                <path 
                  d="M 18,5 L 18,10 Q 18,17 28,23 L 213,122 Q 230,129 247,122 L 432,23 Q 442,17 442,10 L 442,5" 
                  fill="none" 
                  stroke="#DFC48C" 
                  strokeWidth="0.7" 
                  opacity="0.9" 
                />
              </svg>
            </div>
          </div>

          {/* 2D: Wax Seal Medallion in the ABSOLUTE CENTER (50%, 50%) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Wax shard and gold dust burst canvas */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] pointer-events-none z-40 overflow-visible">
              <GoldBurstCanvas active={isBurstActive} />
            </div>

            {/* Interactive Seal Button */}
            <button
              onClick={handleSealTap}
              disabled={phase !== 'sealed'}
              className={`group relative p-1 rounded-full transition-all duration-700 ease-out focus:outline-none cursor-pointer ${
                phase === 'sealed' ? 'hover:scale-105 active:scale-95 animate-gentle-pulse' : ''
              } ${
                phase === 'cracking' ? 'scale-110' : ''
              } ${
                phase === 'opening' || phase === 'rising' || phase === 'revealing'
                  ? 'opacity-0 scale-125 rotate-6 blur-[3px] pointer-events-none'
                  : ''
              }`}
              aria-label="Tap royal wax seal to open invitation"
            >
              {/* Golden Shockwave Expanding Ring on Tap */}
              {phase === 'cracking' && (
                <span className="absolute -inset-4 rounded-full border-2 border-amber-300/80 animate-ping pointer-events-none" />
              )}

              {/* Natural Organic Wax Smudge Shadow (Pure circular radial gradient, 100% round on iPhone Safari) */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 55%, rgba(85, 15, 22, 0.45) 0%, rgba(85, 15, 22, 0.22) 48%, rgba(85, 15, 22, 0.05) 70%, transparent 85%)',
                  filter: 'blur(10px)',
                  WebkitFilter: 'blur(10px)',
                  transform: 'translateY(6px) scale(1.12)',
                }}
              />
              <div 
                className="absolute inset-1.5 rounded-full pointer-events-none"
                style={{
                  boxShadow: '0 8px 22px rgba(65, 10, 16, 0.38), 0 2px 6px rgba(45, 5, 10, 0.25)',
                }}
              />

              {/* Photorealistic Wax Seal with Letter-Core Centered Monogram */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <img
                  src="/images/seal_wax.png"
                  alt="Royal Wax Seal"
                  className="w-full h-full object-contain"
                />

                {/* Crack Fracture Lines Overlay */}
                {phase === 'cracking' && (
                  <img
                    src="/images/seal_crack.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain animate-pulse z-10 filter drop-shadow-[0_0_8px_rgba(245,180,50,0.9)]"
                  />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* 4. Elegant Action Button & Date Label anchored below envelope (zero layout reflow) */}
        <div 
          style={{
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            opacity: phase === 'sealed' ? 1 : 0,
            transform: phase === 'sealed' ? 'translateY(0)' : 'translateY(12px)',
            pointerEvents: phase === 'sealed' ? 'auto' : 'none'
          }}
          className="absolute -bottom-20 sm:-bottom-24 inset-x-0 flex flex-col items-center text-center z-20"
        >
          <button
            onClick={handleSealTap}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3 rounded-full bg-gradient-to-r from-[#422216] via-[#633522] to-[#422216] text-gold-bright text-xs sm:text-sm font-medium tracking-[0.22em] uppercase shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#CBB084]/60"
          >
            <span className="text-gold-bright text-xs">✦</span>
            <span>Tap Seal to Open</span>
            <span className="text-gold-bright text-xs">✦</span>
          </button>

          <span className="text-xs font-sans tracking-[0.22em] uppercase text-ink-deep font-bold mt-3">
            18 – 19 December 2026 · Nagpur
          </span>
        </div>
      </div>
    </aside>
  );
}
