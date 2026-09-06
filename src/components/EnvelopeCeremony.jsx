import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { enterFullscreen } from '../utils/fullscreen';
import GoldBurstCanvas from './GoldBurstCanvas';

/**
 * EnvelopeCeremony (PRD §5 Act 0 — The Opening)
 * Cinematic 5-phase physical ceremony:
 * sealed -> cracking -> opening -> rising -> revealing -> done
 * 
 * Includes CSS 3D folding flap, wax crack fracture, gold particle burst,
 * card elevation, and camera light-flood transition.
 */
export default function EnvelopeCeremony({ onComplete }) {
  // 'sealed' | 'cracking' | 'opening' | 'rising' | 'revealing' | 'done'
  const [phase, setPhase] = useState('sealed');
  const [isBurstActive, setIsBurstActive] = useState(false);

  // Lock body scroll while envelope is active
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

    // 1. Gesture-safe immediate fullscreen & audio trigger
    enterFullscreen();
    if (navigator.vibrate) {
      try { navigator.vibrate(15); } catch (e) {}
    }

    // 2. Begin Act 0 Choreography
    setPhase('cracking');
    setIsBurstActive(true);

    // Sequence timers
    setTimeout(() => {
      setPhase('opening');
    }, 600);

    setTimeout(() => {
      setPhase('rising');
    }, 1500);

    setTimeout(() => {
      setPhase('revealing');
    }, 2600);

    setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 3400);
  };

  if (phase === 'done') return null;

  return (
    <aside
      aria-label="Ceremonial Royal Wedding Envelope"
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 select-none transition-opacity duration-1000 ${
        phase === 'revealing' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Deep Plum Silk Backdrop with Vignette & Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[#1D141B]/95 backdrop-blur-2xl transition-colors duration-1000 pointer-events-none" />
      <div className="absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-gold-hairline/15 rounded-full blur-[100px] pointer-events-none" />

      {/* 2. Light Flood Flash during 'revealing' phase */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#FFF9F0] to-[#FBF6EF] pointer-events-none transition-opacity duration-700 z-50 ${
          phase === 'revealing' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3. The 3D Physical Royal Envelope Container */}
      <div 
        style={{ perspective: 1200 }}
        className="relative w-full max-w-sm sm:max-w-md max-h-[92dvh] flex flex-col items-center justify-center z-10"
      >
        {/* Envelope Shell with 3D Depth */}
        <div className="relative w-full rounded-3xl p-6 sm:p-9 text-center shadow-2xl border border-gold-hairline/60 bg-[#FAF6F0] text-ink-plum overflow-visible [transform-style:preserve-3d]">
          
          {/* Fine Corner Accents */}
          <div className="absolute top-3.5 left-3.5 w-6 h-6 border-t border-l border-gold-hairline/80 pointer-events-none"></div>
          <div className="absolute top-3.5 right-3.5 w-6 h-6 border-t border-r border-gold-hairline/80 pointer-events-none"></div>
          <div className="absolute bottom-3.5 left-3.5 w-6 h-6 border-b border-l border-gold-hairline/80 pointer-events-none"></div>
          <div className="absolute bottom-3.5 right-3.5 w-6 h-6 border-b border-r border-gold-hairline/80 pointer-events-none"></div>

          {/* Envelope Body Shading Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="none">
              <line x1="0" y1="300" x2="200" y2="170" stroke="#C9A66B" strokeWidth="0.8" />
              <line x1="400" y1="300" x2="200" y2="170" stroke="#C9A66B" strokeWidth="0.8" />
            </svg>
          </div>

          {/* 3D Hinging Envelope Top Flap */}
          <div
            style={{
              transformOrigin: 'top center',
              transform: phase === 'sealed' || phase === 'cracking'
                ? 'rotateX(0deg)'
                : 'rotateX(-175deg)',
              transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              transformStyle: 'preserve-3d'
            }}
            className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-20"
          >
            {/* Front of Flap */}
            <div className="w-full h-full bg-gradient-to-b from-[#FAF6F0] to-[#F3ECE0] border-b border-gold-hairline/50 [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-md" />
          </div>

          {/* 4. Rising Invitation Miniature Card (Slides upward during 'rising') */}
          <div
            style={{
              transform: phase === 'rising' || phase === 'revealing'
                ? 'translateY(-110px) scale(1.04)'
                : 'translateY(0) scale(0.95)',
              opacity: phase === 'revealing' ? 0 : 1,
              transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
              filter: phase === 'revealing' ? 'blur(8px)' : 'none'
            }}
            className="relative z-10 w-full flex flex-col items-center pointer-events-none"
          >
            {/* Bismillah Header */}
            <div 
              dir="rtl" 
              lang="ar" 
              className="font-arabic text-xl sm:text-2xl text-ink-plum/90 mb-1.5"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>

            <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-terracotta-dark font-semibold mb-1">
              Wedding Invitation
            </p>

            {/* Names in Royal Allura Calligraphy */}
            <h1 className="font-calligraphy not-italic text-5xl sm:text-6xl text-warm-espresso mb-1 tracking-normal font-normal drop-shadow-sm">
              Naqiyah &amp; Abbas
            </h1>

            <p className="font-serif italic text-[11px] sm:text-sm text-warm-bronze/85 max-w-xs mx-auto mb-3 leading-relaxed whitespace-nowrap">
              Two families · Two hearts · One beautiful beginning
            </p>
          </div>

          {/* 5. Center Stage Wax Seal Medallion & Interactive Clasp */}
          <div className="relative my-2 flex flex-col items-center justify-center z-30">
            {/* Wax shard and gold dust burst canvas */}
            <GoldBurstCanvas active={isBurstActive} />

            {/* Interactive Seal Button */}
            <button
              onClick={handleSealTap}
              disabled={phase !== 'sealed'}
              className={`group relative p-1 rounded-full transition-transform duration-500 focus:outline-none cursor-pointer ${
                phase === 'sealed' ? 'hover:scale-105 active:scale-95 animate-gentle-pulse' : ''
              } ${
                phase === 'cracking' ? 'scale-110' : ''
              } ${
                phase === 'opening' || phase === 'rising' || phase === 'revealing' ? 'opacity-0 scale-125 pointer-events-none' : ''
              }`}
              aria-label="Tap royal wax seal to open invitation"
            >
              {/* Outer Golden Aura Glow */}
              <div className="absolute -inset-2 rounded-full bg-gold-hairline/25 blur-md group-hover:bg-gold-hairline/45 transition-colors pointer-events-none" />

              {/* Royal Crimson Wax Seal Image Plate with Embedded 3D Monogram */}
              <div className="relative w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center">
                <img
                  src="/images/seal_wax.png"
                  alt="Royal Wax Seal"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(133,37,27,0.4)]"
                />

                {/* Crack Fracture Lines Overlay (Flashes during 'cracking') */}
                {phase === 'cracking' && (
                  <img
                    src="/images/seal_crack.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain animate-pulse z-10"
                  />
                )}
              </div>
            </button>

            {/* Sub-seal Centered Action Label */}
            {phase === 'sealed' && (
              <button
                onClick={handleSealTap}
                className="mt-3 inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full bg-gradient-to-r from-warm-espresso via-[#4C382A] to-warm-espresso text-gold-bright text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-gold-hairline/50"
              >
                <span>✦ Open Invitation ✦</span>
              </button>
            )}

            {phase === 'sealed' && (
              <span className="text-[9.5px] font-sans tracking-[0.16em] uppercase text-warm-bronze/80 mt-2">
                18 – 19 December 2026 · Nagpur
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
