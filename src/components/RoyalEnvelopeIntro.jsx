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
        className={`relative w-full max-w-sm sm:max-w-md rounded-3xl p-8 sm:p-10 text-center shadow-2xl border border-gold-hairline/50 bg-[#FAF6F0] text-ink-plum overflow-hidden transition-transform duration-1000 ${
          isOpening ? 'scale-105 -translate-y-4' : 'scale-100'
        }`}
      >
        {/* Fine gold corner borders */}
        <div className="absolute top-3.5 left-3.5 w-6 h-6 border-t border-l border-gold-hairline/80"></div>
        <div className="absolute top-3.5 right-3.5 w-6 h-6 border-t border-r border-gold-hairline/80"></div>
        <div className="absolute bottom-3.5 left-3.5 w-6 h-6 border-b border-l border-gold-hairline/80"></div>
        <div className="absolute bottom-3.5 right-3.5 w-6 h-6 border-b border-r border-gold-hairline/80"></div>

        {/* Envelope Flap Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-14 pointer-events-none opacity-20">
          <svg viewBox="0 0 400 70" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 0 L200 70 L400 0" fill="none" stroke="#C9A66B" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Bismillah Header */}
        <div 
          dir="rtl" 
          lang="ar" 
          className="font-arabic text-xl sm:text-2xl text-ink-plum/90 mb-3 select-all"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-terracotta-dark font-semibold mb-1.5">
          Wedding Invitation
        </p>

        <h1 className="font-calligraphy italic text-4xl sm:text-5xl text-warm-espresso mb-2 tracking-wide font-normal">
          Naqiyah &amp; Abbas
        </h1>

        <p className="font-serif italic text-[11px] sm:text-sm text-warm-bronze/85 max-w-xs mx-auto mb-5 leading-relaxed whitespace-nowrap">
          Two families · Two hearts · One beautiful beginning
        </p>

        {/* Bespoke Royal Wax Seal Medallion with Client Monogram (NO 2026) */}
        <div className="my-4 relative flex justify-center">
          <button
            onClick={handleOpen}
            className={`group relative p-1 rounded-full transition-transform duration-500 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none ${
              isOpening ? 'scale-125 opacity-0' : 'animate-gentle-pulse'
            }`}
            aria-label="Open Invitation"
          >
            {/* Photorealistic Royal Wax Medallion */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center shadow-xl border border-gold-bright/30 bg-gradient-to-br from-[#A63628] via-[#85251B] to-[#5C1610] p-3">
              {/* Inner gold embossed ring */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-gold-bright/60 pointer-events-none"></div>
              <div className="absolute inset-2.5 rounded-full border border-gold-hairline/40 pointer-events-none"></div>
              
              {/* Client's exact interlocking N&A monogram */}
              <img 
                src="/images/na_monogram_gold.png" 
                alt="Naqiyah & Abbas Monogram" 
                className="w-12 h-10 object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </button>
        </div>

        {/* Action Prompt */}
        <div className="space-y-3 pt-1">
          <button
            onClick={handleOpen}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-warm-espresso text-gold-bright text-xs font-medium tracking-widest uppercase shadow-md hover:bg-warm-dark transition-all active:scale-95 cursor-pointer border border-gold-hairline/40"
          >
            <span>Open Invitation</span>
          </button>

          <p className="text-[10px] font-sans text-warm-bronze/70 tracking-wider">
            18 – 19 December 2026 · Nagpur
          </p>
        </div>
      </div>
    </aside>
  );
}
