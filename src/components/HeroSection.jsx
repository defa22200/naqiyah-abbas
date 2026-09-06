import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection({ onOpenKeepsake }) {
  const scrollToLineage = () => {
    const el = document.getElementById('lineage');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="pt-4 pb-10 flex flex-col items-center justify-center text-center px-2 relative"
      aria-label="Couple Names and Wedding Title"
    >
      {/* Subtle Background Glow Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[480px] h-[280px] sm:h-[480px] bg-rose-dust/25 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Tagline */}
      <div className="mb-5 animate-blur-assemble max-w-full px-2">
        <span className="text-[9px] sm:text-xs font-sans tracking-[0.16em] sm:tracking-[0.22em] uppercase text-terracotta-dark font-medium inline-block px-3 py-1 rounded-full border border-terracotta-muted/25 bg-rose-dust/20 backdrop-blur-xs shadow-xs text-center leading-normal">
          Two families · Two hearts · One beautiful beginning
        </span>
      </div>

      {/* Primary Hero Names Beat */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center gap-0.5 sm:gap-2">
        
        {/* Bride Name: Naqiyah */}
        <div className="animate-blur-assemble w-full">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-ink-plum tracking-tight font-light select-none">
            Naqiyah
          </h1>
        </div>

        {/* Central Bespoke Interlocking Crescent & Geometric Mark (Interactive Easter Egg) */}
        <div className="animate-blur-assemble-delay-1 my-0.5 relative group">
          <button
            onClick={onOpenKeepsake}
            className="relative p-2 rounded-full hover:bg-gold-hairline/15 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-hairline/50 cursor-pointer"
            aria-label="Tap to reveal digital wedding keepsake card"
            title="Tap to reveal digital wedding keepsake card"
          >
            {/* Custom SVG Geometric Interlocking Monogram / Flourish */}
            <svg 
              width="44" 
              height="44" 
              viewBox="0 0 54 54" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-gold-hairline transition-transform duration-700 group-hover:rotate-45"
            >
              <circle cx="27" cy="27" r="24" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
              <circle cx="27" cy="27" r="20" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <path d="M27 9L36 27L27 45L18 27Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
              <path d="M9 27L27 18L45 27L27 36Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
              <circle cx="27" cy="27" r="3.5" fill="currentColor" opacity="0.9" />
            </svg>

            {/* Subtle floating hint */}
            <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-sans tracking-widest uppercase text-terracotta-muted/70 opacity-60 group-hover:opacity-100 transition-opacity">
              Tap Keepsake
            </span>
          </button>
        </div>

        {/* Groom Name: Abbas */}
        <div className="animate-blur-assemble-delay-2 w-full">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-ink-plum tracking-tight font-light select-none">
            Abbas
          </h1>
        </div>
      </div>

      {/* Date & City Subtitle */}
      <div className="animate-blur-assemble-delay-2 mt-6 flex flex-col items-center gap-0.5 text-center px-2">
        <p className="font-serif text-xl sm:text-2xl text-ink-plum font-normal tracking-wide">
          18 – 19 December 2026
        </p>
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.14em] uppercase text-terracotta-muted font-medium">
          10 – 11 Shehre Rajabul Asab 1448H
        </p>
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink-plum/60">
          Nagpur, Maharashtra
        </p>
      </div>

      {/* Gentle Scroll Prompt */}
      <div className="mt-7 sm:mt-9 flex flex-col items-center animate-soft-float">
        <button
          onClick={scrollToLineage}
          className="flex flex-col items-center gap-1 text-ink-plum/50 hover:text-ink-plum transition-colors p-2 cursor-pointer"
          aria-label="Scroll to wedding invitation details"
        >
          <span className="text-[9px] font-sans tracking-[0.2em] uppercase">The Celebrations</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
