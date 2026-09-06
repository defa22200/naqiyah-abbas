import React, { useState } from 'react';
import { enterFullscreen } from '../utils/fullscreen';

export default function RoyalEnvelopeIntro({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    enterFullscreen();
    if (onOpen) onOpen();
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 900);
  };

  if (isOpen) return null;

  return (
    <aside 
      aria-label="Invitation Envelope Greeting"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/90 backdrop-blur-xl transition-opacity duration-1000 ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute w-96 h-96 bg-gold-hairline/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Royal Physical Card Envelope Canvas */}
      <div 
        className={`relative w-full max-w-sm sm:max-w-md max-h-[92dvh] rounded-3xl p-6 sm:p-10 text-center shadow-2xl border border-gold-hairline/50 bg-[#FAF6F0] text-ink-plum overflow-hidden flex flex-col items-center justify-between transition-transform duration-1000 ${
          isOpening ? 'scale-105 -translate-y-4' : 'scale-100'
        }`}
      >
        {/* Fine gold corner borders */}
        <div className="absolute top-3.5 left-3.5 w-6 h-6 border-t border-l border-gold-hairline/80"></div>
        <div className="absolute top-3.5 right-3.5 w-6 h-6 border-t border-r border-gold-hairline/80"></div>
        <div className="absolute bottom-3.5 left-3.5 w-6 h-6 border-b border-l border-gold-hairline/80"></div>
        <div className="absolute bottom-3.5 right-3.5 w-6 h-6 border-b border-r border-gold-hairline/80"></div>

        {/* Envelope Flap Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none opacity-20">
          <svg viewBox="0 0 400 70" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 0 L200 70 L400 0" fill="none" stroke="#C9A66B" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Top Content Group */}
        <div className="w-full flex flex-col items-center">
          {/* Bismillah Header */}
          <div 
            dir="rtl" 
            lang="ar" 
            className="font-arabic text-xl sm:text-2xl text-ink-plum/90 mb-2 select-all"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-terracotta-dark font-semibold mb-1">
            Wedding Invitation
          </p>

          {/* Primary Couple Name in Royal Calligraphy Script */}
          <h1 className="font-calligraphy not-italic text-5xl sm:text-6xl text-warm-espresso mb-1 tracking-normal font-normal drop-shadow-sm">
            Naqiyah &amp; Abbas
          </h1>

          <p className="font-serif italic text-[11px] sm:text-sm text-warm-bronze/85 max-w-xs mx-auto mb-4 leading-relaxed whitespace-nowrap">
            Two families · Two hearts · One beautiful beginning
          </p>
        </div>

        {/* Center Clasp: Royal Wax Seal Medallion with New 3D Sculptural Monogram (NO 2026) */}
        <div className="my-2 sm:my-3 relative flex flex-col items-center justify-center">
          {/* Subtle Golden Ribbon Flap Behind Seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 h-0.5 bg-gradient-to-r from-transparent via-gold-hairline/70 to-transparent pointer-events-none"></div>

          <button
            onClick={handleOpen}
            className={`group relative p-1.5 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none ${
              isOpening ? 'scale-125 opacity-0' : 'animate-gentle-pulse'
            }`}
            aria-label="Open Invitation"
          >
            {/* Outer Subtle Golden Aura Glow */}
            <div className="absolute -inset-1.5 rounded-full bg-gold-hairline/25 blur-sm group-hover:bg-gold-hairline/40 transition-colors pointer-events-none"></div>

            {/* Photorealistic Royal Wax Medallion */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-2xl border border-gold-bright/40 bg-gradient-to-br from-[#A63628] via-[#85251B] to-[#5C1610] p-2.5">
              {/* Inner gold embossed ring */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-gold-bright/60 pointer-events-none"></div>
              <div className="absolute inset-2.5 rounded-full border border-gold-hairline/40 pointer-events-none"></div>
              
              {/* Bespoke 3D Gold & Rose Gold Sculptural Monogram */}
              <img 
                src="/images/na_monogram_luxury.png" 
                alt="Naqiyah & Abbas Monogram" 
                className="w-14 h-12 sm:w-16 sm:h-14 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </button>

          <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-gold-burnished font-medium mt-1.5 opacity-90 animate-pulse">
            Tap Seal to Open
          </span>
        </div>

        {/* Centered Action Prompt Button */}
        <div className="w-full flex flex-col items-center space-y-2 pt-2">
          <button
            onClick={handleOpen}
            className="inline-flex items-center justify-center gap-2 px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-warm-espresso via-[#4C382A] to-warm-espresso text-gold-bright text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-gold-hairline/50"
          >
            <span>✦ Open Invitation ✦</span>
          </button>

          <p className="text-[10px] font-sans text-warm-bronze/70 tracking-wider">
            18 – 19 December 2026 · Nagpur
          </p>
        </div>
      </div>
    </aside>
  );
}
