import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function ClosingSection() {
  return (
    <section 
      id="closing" 
      className="py-16 px-4 sm:px-6 max-w-xl mx-auto text-center space-y-12"
      aria-label="Family Compliments and Closing Blessing"
    >
      {/* With Best Compliments From Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-gold-hairline/40 shadow-soft-float text-warm-espresso space-y-3 backdrop-blur-sm">
        <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-terracotta-dark font-semibold block mb-2">
          With Best Compliments From
        </span>
        
        <div className="space-y-1.5 font-serif text-[14px] sm:text-base md:text-lg text-warm-espresso leading-snug">
          <p>Mr. Aziz Shamim &amp; Mrs. Zainab Shamim</p>
          <p>Dr. Farheen &amp; Dr. Shabbir Hassan</p>
          <p>Sarrah</p>
        </div>

        <div className="pt-3 mt-3 border-t border-gold-hairline/25">
          <p className="font-sans text-[11px] sm:text-xs tracking-widest text-warm-bronze uppercase font-medium">
            Together with all relatives &amp; friends
          </p>
        </div>
      </div>

      {/* Verbatim Closing Blessing */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white/90 border border-gold-hairline/40 shadow-soft-float space-y-4 text-warm-espresso backdrop-blur-sm">
        <p className="font-serif italic text-xl sm:text-2xl leading-relaxed text-warm-espresso">
          &ldquo;Your presence will make our celebration complete; your blessings will make our journey more beautiful.&rdquo;
        </p>
        <div className="flex items-center justify-center gap-2 pt-2 text-gold-hairline">
          <span className="text-xs">✦</span>
          <span className="font-calligraphy italic text-2xl text-gold-burnished px-1">Naqiyah &amp; Abbas</span>
          <span className="text-xs">✦</span>
        </div>
      </div>

      {/* Footer / Logistics touchpoint */}
      <footer className="pt-6 border-t border-gold-hairline/25 text-xs font-sans text-warm-bronze/80 space-y-2">
        <p className="font-medium">18 – 19 December 2026 · Nagpur, Maharashtra</p>
        <p className="text-[9.5px] min-[360px]:text-[11px] text-warm-bronze/60 whitespace-nowrap">
          Two families · Two hearts · One beautiful beginning
        </p>
      </footer>
    </section>
  );
}
