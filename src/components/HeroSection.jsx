import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

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
      className="pt-6 pb-12 flex flex-col items-center justify-center text-center px-2 relative select-none"
      aria-label="Couple Names and Wedding Title"
    >
      {/* Soft Ambient Radial Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] bg-rose-dust/25 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* 1. Client's Exact Bespoke Interlocking Monogram (3D Spatial Tilt & Glow, NO 2026) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotateX: 25 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ perspective: 1000 }}
        className="mb-4 sm:mb-6 relative flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.08, rotateY: 12, rotateX: -6 }}
        whileTap={{ scale: 0.96 }}
      >
        <div className="relative w-28 h-24 sm:w-36 sm:h-30 flex items-center justify-center transition-transform duration-500 [transform-style:preserve-3d]">
          {/* Subtle warm halo */}
          <div className="absolute inset-0 bg-gold-hairline/25 rounded-full blur-xl scale-75 animate-pulse"></div>
          <img 
            src="/images/na_monogram_luxury.png" 
            alt="Naqiyah & Abbas Monogram"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(201,166,107,0.35)] transition-transform duration-300"
          />
        </div>
      </motion.div>

      {/* 2. Primary Hero Names Beat in Sweeping Calligraphy Italic Script */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
        className="w-full max-w-lg mx-auto flex flex-col items-center justify-center"
      >
        {/* Bride Name: Naqiyah */}
        <h1 className="font-calligraphy not-italic text-6xl sm:text-8xl md:text-9xl tracking-normal text-warm-espresso font-normal select-none leading-[1.1] drop-shadow-sm">
          Naqiyah
        </h1>

        {/* Minimalist, exquisite calligraphic gold ampersand */}
        <div className="my-1 sm:my-2 flex items-center justify-center gap-3">
          <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold-hairline/60 to-gold-hairline"></span>
          <span className="font-calligraphy not-italic text-4xl sm:text-5xl text-gold-burnished font-normal px-2">
            &amp;
          </span>
          <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent via-gold-hairline/60 to-gold-hairline"></span>
        </div>

        {/* Groom Name: Abbas */}
        <h1 className="font-calligraphy not-italic text-6xl sm:text-8xl md:text-9xl tracking-normal text-warm-espresso font-normal select-none leading-[1.1] drop-shadow-sm">
          Abbas
        </h1>
      </motion.div>

      {/* 3. Verbatim Tagline & Dates from Card with Theme-Matched Color Palette */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.4, ease: 'easeOut' }}
        className="mt-6 sm:mt-7 flex flex-col items-center gap-1.5 text-center px-1 sm:px-4 max-w-lg mx-auto w-full"
      >
        <p className="text-[8.5px] min-[360px]:text-[9px] min-[390px]:text-[10px] sm:text-xs font-sans tracking-[0.08em] min-[360px]:tracking-[0.11em] sm:tracking-[0.2em] uppercase text-terracotta-dark font-medium whitespace-nowrap">
          Two families · Two hearts · One beautiful beginning
        </p>

        <div className="flex items-center justify-center gap-2 my-1">
          <span className="h-px w-8 bg-gold-hairline/50"></span>
          <span className="text-gold-hairline text-[9px]">✦</span>
          <span className="h-px w-8 bg-gold-hairline/50"></span>
        </div>

        <p className="text-[11px] sm:text-xs font-sans tracking-[0.25em] uppercase text-warm-espresso font-semibold">
          Wedding Celebrations
        </p>

        <p className="font-serif text-2xl sm:text-3xl text-warm-bronze font-normal tracking-wide">
          18 – 19 December 2026
        </p>

        <p className="font-sans text-[10px] sm:text-xs tracking-[0.16em] uppercase text-warm-umber font-medium">
          10 – 11 Shehre Rajabul Asab 1448 · Nagpur
        </p>
      </motion.div>

      {/* 4. Gentle Scroll Hint */}
      <div className="mt-8 sm:mt-11 flex flex-col items-center animate-soft-float">
        <button
          onClick={scrollToLineage}
          className="flex flex-col items-center gap-1 text-warm-bronze/60 hover:text-warm-espresso transition-colors p-2 cursor-pointer"
          aria-label="Scroll to wedding invitation details"
        >
          <span className="text-[9px] font-sans tracking-[0.2em] uppercase">The Celebrations</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
