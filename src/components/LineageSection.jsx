import React from 'react';
import { motion } from 'framer-motion';

export default function LineageSection() {
  return (
    <section 
      id="lineage" 
      className="py-14 px-4 sm:px-6 max-w-xl mx-auto text-center"
      aria-label="Host and Family Lineage"
    >
      {/* Host Invitation Beat */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 relative p-6 sm:p-8 rounded-3xl bg-white/85 border border-gold-hairline/40 shadow-xl backdrop-blur-md"
      >
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-terracotta-dark font-semibold block mb-3">
          Cordial Invitation
        </span>
        
        <p className="font-serif text-lg sm:text-xl text-warm-bronze leading-relaxed max-w-md mx-auto">
          <strong className="font-normal text-warm-espresso text-2xl sm:text-3xl block mb-1">
            Mrs. Zainub
          </strong>
          <span className="text-xs sm:text-sm font-sans tracking-wide text-warm-bronze/80 block mb-3">
            w/o Late Asgar Ali Shamim
          </span>
          requests the pleasure of your gracious presence at the wedding celebrations of her beloved granddaughter
        </p>
      </motion.div>

      {/* Decorative filigree knot */}
      <div className="flex items-center justify-center gap-3 my-8">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-hairline/50"></span>
        <span className="text-gold-hairline text-sm">✦</span>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-hairline/50"></span>
      </div>

      {/* Couple Parentage / Lineage Cards with 'weds' in between */}
      <div className="flex flex-col items-center gap-4 text-center">
        
        {/* Bride Lineage */}
        <motion.div 
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full p-6 sm:p-7 rounded-2xl bg-white/90 border border-gold-hairline/40 shadow-lg backdrop-blur-md"
        >
          <h3 className="font-calligraphy not-italic text-5xl sm:text-6xl text-warm-espresso mb-1 font-normal">
            Naqiyah
          </h3>
          <p className="font-serif italic text-sm sm:text-base text-warm-bronze/90">
            (D/o Mrs. Ashrafunnisa &amp; Mr. Moiz Shamim)
          </p>
        </motion.div>

        {/* The 'weds' ligature verbatim from card */}
        <div className="my-1 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gold-hairline/40"></span>
          <span className="font-calligraphy not-italic text-4xl text-gold-burnished font-normal px-2">
            weds
          </span>
          <span className="h-px w-12 bg-gold-hairline/40"></span>
        </div>

        {/* Groom Lineage */}
        <motion.div 
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full p-6 sm:p-7 rounded-2xl bg-white/90 border border-gold-hairline/40 shadow-lg backdrop-blur-md"
        >
          <h3 className="font-calligraphy not-italic text-5xl sm:text-6xl text-warm-espresso mb-1 font-normal">
            Abbas
          </h3>
          <p className="font-serif italic text-sm sm:text-base text-warm-bronze/90">
            (S/o Mrs. Tasneem &amp; Mr. Shabbar Mistry)
          </p>
        </motion.div>

      </div>
    </section>
  );
}
