import React from 'react';

export default function LineageSection() {
  return (
    <section 
      id="lineage" 
      className="py-14 px-4 sm:px-6 max-w-xl mx-auto text-center"
      aria-label="Host and Family Lineage"
    >
      {/* Host Invitation Beat */}
      <div className="mb-12 relative p-6 sm:p-8 rounded-3xl bg-ivory-soft/80 border border-gold-hairline/35 shadow-soft-float">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-terracotta-dark font-semibold block mb-3">
          Cordial Invitation
        </span>
        
        <p className="font-serif text-lg sm:text-xl text-ink-plum/90 leading-relaxed max-w-md mx-auto">
          <strong className="font-semibold text-ink-plum text-2xl sm:text-3xl block mb-1">
            Mrs. Zainub
          </strong>
          <span className="text-xs sm:text-sm font-sans tracking-wide text-ink-plum/70 block mb-3">
            w/o Late Asgar Ali Shamim
          </span>
          requests the pleasure of your gracious presence at the wedding celebrations of her beloved granddaughter
        </p>
      </div>

      {/* Decorative filigree knot */}
      <div className="flex items-center justify-center gap-3 my-8">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-hairline/50"></span>
        <span className="text-gold-hairline text-sm">✦</span>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-hairline/50"></span>
      </div>

      {/* Couple Parentage / Lineage Cards with 'weds' in between */}
      <div className="flex flex-col items-center gap-4 text-center">
        
        {/* Bride Lineage */}
        <div className="w-full p-6 rounded-2xl bg-ivory-soft/75 border border-gold-hairline/30 shadow-soft-float">
          <h3 className="font-serif text-3xl sm:text-4xl text-ink-plum mb-1">
            Naqiyah
          </h3>
          <p className="font-serif italic text-sm sm:text-base text-ink-plum/80">
            (D/o Mrs. Ashrafunnisa &amp; Mr. Moiz Shamim)
          </p>
        </div>

        {/* The 'weds' ligature verbatim from card */}
        <div className="my-1 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gold-hairline/40"></span>
          <span className="font-serif italic text-2xl text-terracotta-dark font-normal px-2">
            weds
          </span>
          <span className="h-px w-12 bg-gold-hairline/40"></span>
        </div>

        {/* Groom Lineage */}
        <div className="w-full p-6 rounded-2xl bg-ivory-soft/75 border border-gold-hairline/30 shadow-soft-float">
          <h3 className="font-serif text-3xl sm:text-4xl text-ink-plum mb-1">
            Abbas
          </h3>
          <p className="font-serif italic text-sm sm:text-base text-ink-plum/80">
            (S/o Mrs. Tasneem &amp; Mr. Shabbar Mistry)
          </p>
        </div>

      </div>
    </section>
  );
}
