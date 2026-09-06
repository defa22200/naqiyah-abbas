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
      className="pt-6 pb-12 flex flex-col items-center justify-center text-center px-2 relative"
      aria-label="Couple Names and Wedding Title"
    >
      {/* Soft Ambient Radial Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] bg-rose-dust/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Primary Hero Names Beat */}
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center">
        
        {/* Bride Name: Naqiyah */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-ink-plum tracking-tight font-light select-none">
          Naqiyah
        </h1>

        {/* Minimalist, exquisite calligraphic gold ampersand */}
        <div className="my-1.5 sm:my-2.5 flex items-center justify-center gap-3">
          <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-gold-hairline/60"></span>
          <span className="font-serif italic text-2xl sm:text-3xl text-gold-hairline font-normal">
            &amp;
          </span>
          <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-gold-hairline/60"></span>
        </div>

        {/* Groom Name: Abbas */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-ink-plum tracking-tight font-light select-none">
          Abbas
        </h1>
      </div>

      {/* Verbatim Tagline & Dates from Card */}
      <div className="mt-7 flex flex-col items-center gap-1.5 text-center px-4 max-w-md mx-auto">
        <p className="text-[10px] sm:text-xs font-sans tracking-[0.22em] uppercase text-terracotta-dark font-medium leading-relaxed">
          Two families · Two hearts · One beautiful beginning
        </p>

        <div className="flex items-center justify-center gap-2 my-1">
          <span className="h-px w-8 bg-gold-hairline/40"></span>
          <span className="text-gold-hairline text-[9px]">✦</span>
          <span className="h-px w-8 bg-gold-hairline/40"></span>
        </div>

        <p className="text-[11px] sm:text-xs font-sans tracking-[0.25em] uppercase text-ink-plum font-semibold">
          Wedding Celebrations
        </p>

        <p className="font-serif text-2xl sm:text-3xl text-ink-plum font-normal tracking-wide">
          18 – 19 December 2026
        </p>

        <p className="font-sans text-[10px] sm:text-xs tracking-[0.16em] uppercase text-terracotta-muted font-medium">
          10 – 11 Shehre Rajabul Asab 1448 · Nagpur
        </p>
      </div>

      {/* Gentle Scroll Hint */}
      <div className="mt-8 sm:mt-11 flex flex-col items-center animate-soft-float">
        <button
          onClick={scrollToLineage}
          className="flex flex-col items-center gap-1 text-ink-plum/45 hover:text-ink-plum transition-colors p-2 cursor-pointer"
          aria-label="Scroll to wedding invitation details"
        >
          <span className="text-[9px] font-sans tracking-[0.2em] uppercase">The Celebrations</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
