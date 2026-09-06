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
      <div className="p-7 sm:p-9 rounded-3xl bg-ivory-soft/95 border border-gold-hairline/40 shadow-soft-float space-y-4 text-ink-plum">
        <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-terracotta-dark font-medium block">
          With Best Compliments From
        </span>
        
        <p className="font-serif text-lg sm:text-xl leading-relaxed max-w-lg mx-auto text-ink-plum">
          Mr. Aziz Shamim &amp; Mrs. Zainab Shamim <br className="hidden sm:inline" />
          <span className="text-gold-hairline mx-1">·</span> <br className="sm:hidden" />
          Dr. Farheen &amp; Dr. Shabbir Hassan <br className="hidden sm:inline" />
          <span className="text-gold-hairline mx-1">·</span> <br className="sm:hidden" />
          Sarrah
        </p>

        <p className="font-sans text-xs sm:text-sm tracking-wider text-ink-plum/70 uppercase">
          Together with all relatives &amp; friends
        </p>
      </div>

      {/* Verbatim Closing Blessing */}
      <div className="p-8 sm:p-10 rounded-3xl bg-ivory-soft/95 border border-gold-hairline/40 shadow-soft-float space-y-4 text-ink-plum">
        <p className="font-serif italic text-xl sm:text-2xl leading-relaxed text-ink-plum">
          &ldquo;Your presence will make our celebration complete; your blessings will make our journey more beautiful.&rdquo;
        </p>
        <div className="flex items-center justify-center gap-2 pt-2 text-gold-hairline">
          <span className="text-xs">✦</span>
          <span className="text-xs font-serif italic text-ink-plum/80">Naqiyah &amp; Abbas</span>
          <span className="text-xs">✦</span>
        </div>
      </div>

      {/* Footer / Logistics touchpoint */}
      <footer className="pt-6 border-t border-gold-hairline/25 text-xs font-sans text-ink-plum/70 space-y-2">
        <p className="font-medium">18 – 19 December 2026 · Nagpur, Maharashtra</p>
        <p className="text-[11px] text-ink-plum/50">
          Two families · Two hearts · One beautiful beginning
        </p>
      </footer>
    </section>
  );
}
