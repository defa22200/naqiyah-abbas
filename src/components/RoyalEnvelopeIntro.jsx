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

        <h1 className="font-serif text-4xl sm:text-5xl text-ink-plum mb-2 tracking-tight font-light">
          Naqiyah &amp; Abbas
        </h1>

        <p className="font-serif italic text-[11px] sm:text-sm text-ink-plum/70 max-w-xs mx-auto mb-6 leading-relaxed whitespace-nowrap">
          Two families · Two hearts · One beautiful beginning
        </p>

        {/* Bespoke Royal Wax Seal Medallion */}
        <div className="my-5 relative flex justify-center">
          <button
            onClick={handleOpen}
            className={`group relative p-1 rounded-full transition-transform duration-500 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none ${
              isOpening ? 'scale-125 opacity-0' : 'animate-gentle-pulse'
            }`}
            aria-label="Open Invitation"
          >
            {/* Photorealistic Royal Wax Medallion SVG */}
            <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
              <defs>
                <linearGradient id="sealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C45A4C" />
                  <stop offset="50%" stopColor="#9E3B2E" />
                  <stop offset="100%" stopColor="#752419" />
                </linearGradient>
                <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DFC085" />
                  <stop offset="50%" stopColor="#C9A66B" />
                  <stop offset="100%" stopColor="#9C7738" />
                </linearGradient>
              </defs>

              {/* Wax base with soft natural scalloped rim */}
              <circle cx="42" cy="42" r="40" fill="url(#sealGrad)" />
              <circle cx="42" cy="42" r="37.5" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.25" />
              
              {/* Inner gold embossed ring */}
              <circle cx="42" cy="42" r="32" stroke="url(#goldRing)" strokeWidth="1" strokeDasharray="1.5 1.5" />
              <circle cx="42" cy="42" r="29" stroke="url(#goldRing)" strokeWidth="0.5" strokeOpacity="0.6" />

              {/* Crisp, Classical Serif Monogram */}
              <text 
                x="42" 
                y="43" 
                textAnchor="middle" 
                dominantBaseline="central"
                fill="#F7EEDC" 
                fontFamily="'Cormorant Garamond', 'Times New Roman', serif" 
                fontSize="21" 
                fontWeight="500"
                letterSpacing="1"
              >
                N &amp; A
              </text>

              {/* Auspicious Star Mark */}
              <text 
                x="42" 
                y="57" 
                textAnchor="middle" 
                fill="#DFC085" 
                fontSize="7"
                fontFamily="sans-serif"
                opacity="0.85"
              >
                ✦ 2026 ✦
              </text>
            </svg>
          </button>
        </div>

        {/* Action Prompt */}
        <div className="space-y-3 pt-1">
          <button
            onClick={handleOpen}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-ink-plum text-gold-bright text-xs font-medium tracking-widest uppercase shadow-md hover:bg-ink-light transition-all active:scale-95 cursor-pointer"
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
