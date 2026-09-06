import React, { useState, useEffect } from 'react';
import { Sparkles, Music, ArrowDown } from 'lucide-react';

export default function RoyalEnvelopeIntro({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      if (onOpen) onOpen();
    }, 1100);
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
      <div className="absolute w-96 h-96 bg-gold-hairline/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Royal Physical Card Envelope Canvas */}
      <div 
        className={`relative w-full max-w-sm sm:max-w-md rounded-3xl p-8 sm:p-10 text-center shadow-2xl border border-gold-hairline/60 bg-[#F8F3EA] text-ink-plum overflow-hidden transition-transform duration-1000 ${
          isOpening ? 'scale-105 -translate-y-6' : 'scale-100'
        }`}
      >
        {/* Fine gold corner borders */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold-hairline/70"></div>
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold-hairline/70"></div>
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold-hairline/70"></div>
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold-hairline/70"></div>

        {/* Envelope Top Flap Triangle Lines */}
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none opacity-20">
          <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 0 L200 80 L400 0 Z" fill="none" stroke="#C9A66B" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Bismillah Header */}
        <div 
          dir="rtl" 
          lang="ar" 
          className="font-arabic text-xl sm:text-2xl text-ink-plum/90 mb-4"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-terracotta-dark font-semibold mb-2">
          Wedding Invitation
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl text-ink-plum mb-3 tracking-tight font-normal">
          Naqiyah &amp; Abbas
        </h1>

        <p className="font-serif italic text-sm sm:text-base text-ink-plum/75 max-w-xs mx-auto mb-8">
          Two families · Two hearts · One beautiful beginning
        </p>

        {/* Wax Seal Medallion Trigger */}
        <div className="my-6 relative flex justify-center">
          <button
            onClick={handleOpen}
            className={`group relative p-4 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#C9A66B] to-[#997A3B] text-ink-deep shadow-2xl transition-transform duration-500 hover:scale-110 active:scale-95 cursor-pointer border-2 border-[#FBF6EF] ${
              isOpening ? 'rotate-180 scale-125 opacity-0' : 'animate-gentle-pulse'
            }`}
            aria-label="Open Invitation"
          >
            {/* Custom Monogram Seal Graphic */}
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="28" stroke="#3A2C33" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
              <circle cx="30" cy="30" r="24" stroke="#3A2C33" strokeWidth="0.8" opacity="0.4" />
              {/* Interlocking geometric N & A emblem */}
              <path d="M30 8L40 30L30 52L20 30Z" stroke="#3A2C33" strokeWidth="1.2" />
              <path d="M8 30L30 20L52 30L30 40Z" stroke="#3A2C33" strokeWidth="1.2" />
              <circle cx="30" cy="30" r="4.5" fill="#3A2C33" />
            </svg>
            <span className="absolute inset-0 rounded-full border border-white/50 pointer-events-none"></span>
          </button>
        </div>

        {/* Action Prompt */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleOpen}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ink-plum text-gold-bright text-xs font-medium tracking-widest uppercase shadow-lg hover:bg-ink-light transition-all active:scale-95 cursor-pointer"
          >
            <span>Tap to Open Invitation</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          <p className="text-[10px] font-sans text-ink-plum/50 tracking-wider">
            18 – 19 December 2026 · Nagpur
          </p>
        </div>
      </div>
    </aside>
  );
}
