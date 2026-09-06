import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function RoyalEnvelopeIntro({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      if (onOpen) onOpen();
    }, 1000);
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
        <div className="absolute top-3 left-3 w-7 h-7 border-t border-l border-gold-hairline/80"></div>
        <div className="absolute top-3 right-3 w-7 h-7 border-t border-r border-gold-hairline/80"></div>
        <div className="absolute bottom-3 left-3 w-7 h-7 border-b border-l border-gold-hairline/80"></div>
        <div className="absolute bottom-3 right-3 w-7 h-7 border-b border-r border-gold-hairline/80"></div>

        {/* Envelope Top Flap Triangle Lines */}
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none opacity-15">
          <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 0 L200 80 L400 0 Z" fill="none" stroke="#C9A66B" strokeWidth="1" />
          </svg>
        </div>

        {/* Bismillah Header */}
        <div 
          dir="rtl" 
          lang="ar" 
          className="font-arabic text-xl sm:text-2xl text-ink-plum/90 mb-3"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-terracotta-dark font-semibold mb-2">
          Wedding Invitation
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl text-ink-plum mb-2 tracking-tight font-light">
          Naqiyah &amp; Abbas
        </h1>

        <p className="font-serif italic text-sm text-ink-plum/70 max-w-xs mx-auto mb-7">
          Two families · Two hearts · One beautiful beginning
        </p>

        {/* Traditional Royal Wax Seal Stamp with N & A Calligraphy */}
        <div className="my-5 relative flex justify-center">
          <button
            onClick={handleOpen}
            className={`group relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#B35446] via-[#943F33] to-[#6E2A20] text-ivory shadow-2xl transition-transform duration-500 hover:scale-105 active:scale-95 cursor-pointer border-2 border-gold-hairline/60 flex items-center justify-center ${
              isOpening ? 'scale-125 opacity-0' : 'animate-gentle-pulse'
            }`}
            aria-label="Open Invitation"
          >
            {/* Elegant Serif Monogram Stamp */}
            <div className="flex flex-col items-center justify-center select-none pointer-events-none">
              <span className="font-serif text-lg sm:text-xl text-gold-pale tracking-widest font-normal">
                N &amp; A
              </span>
              <span className="text-[8px] font-sans text-gold-hairline/80 tracking-widest uppercase">
                18·12·26
              </span>
            </div>
            {/* Subtle outer gold ring */}
            <span className="absolute inset-1 rounded-full border border-gold-hairline/30 pointer-events-none"></span>
          </button>
        </div>

        {/* Action Prompt */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleOpen}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ink-plum text-gold-bright text-xs font-medium tracking-widest uppercase shadow-md hover:bg-ink-light transition-all active:scale-95 cursor-pointer"
          >
            <span>Open Invitation</span>
          </button>

          <p className="text-[10px] font-sans text-ink-plum/50 tracking-wider">
            18 – 19 December 2026 · Nagpur
          </p>
        </div>
      </div>
    </aside>
  );
}
