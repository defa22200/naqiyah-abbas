import React from 'react';

export default function LineageSection() {
  return (
    <section 
      id="lineage" 
      className="py-16 px-6 max-w-xl mx-auto text-center"
      aria-label="Host and Family Lineage"
    >
      {/* Host Invitation Beat */}
      <div className="mb-14 relative">
        <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-terracotta-muted block mb-4">
          Cordial Invitation
        </span>
        
        <p className="font-serif text-lg sm:text-xl text-ink-plum/90 leading-relaxed max-w-md mx-auto">
          <strong className="font-semibold text-ink-plum text-xl sm:text-2xl block mb-2">Mrs. Zainub</strong>
          <span className="text-sm font-sans tracking-wide text-ink-plum/70 block mb-3">w/o Late Asgar Ali Shamim</span>
          requests the pleasure of your gracious presence at the wedding celebrations of her beloved granddaughter
        </p>
      </div>

      {/* Decorative filigree knot */}
      <div className="flex items-center justify-center gap-3 my-10">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-hairline/40"></span>
        <span className="text-gold-hairline text-sm">✦</span>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-hairline/40"></span>
      </div>

      {/* Couple Parentage / Lineage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center pt-2">
        
        {/* Bride Lineage */}
        <div className="p-6 rounded-2xl bg-ivory-soft/60 border border-gold-hairline/25 shadow-soft-float transition-all hover:border-gold-hairline/50">
          <h3 className="font-serif text-2xl sm:text-3xl text-ink-plum mb-2">
            Naqiyah
          </h3>
          <p className="text-xs font-sans uppercase tracking-widest text-terracotta-muted mb-2 font-medium">
            Daughter of
          </p>
          <p className="font-serif text-base sm:text-lg text-ink-plum/85">
            Mrs. Ashrafunnisa <br />
            &amp; Mr. Moiz Shamim
          </p>
        </div>

        {/* Groom Lineage */}
        <div className="p-6 rounded-2xl bg-ivory-soft/60 border border-gold-hairline/25 shadow-soft-float transition-all hover:border-gold-hairline/50">
          <h3 className="font-serif text-2xl sm:text-3xl text-ink-plum mb-2">
            Abbas
          </h3>
          <p className="text-xs font-sans uppercase tracking-widest text-terracotta-muted mb-2 font-medium">
            Son of
          </p>
          <p className="font-serif text-base sm:text-lg text-ink-plum/85">
            Mrs. Tasneem <br />
            &amp; Mr. Shabbar Mistry
          </p>
        </div>

      </div>
    </section>
  );
}
