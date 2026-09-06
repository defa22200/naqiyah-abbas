import React from 'react';
import { motion } from 'framer-motion';

export default function VerseSection() {
  return (
    <motion.section 
      id="verse" 
      initial={{ opacity: 0, scale: 0.96, y: 35 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 sm:py-28 px-6 text-center max-w-2xl mx-auto relative rounded-t-[60px] sm:rounded-t-[80px] rounded-b-3xl my-16 backdrop-blur-xl bg-[#120B10]/85 border-2 border-[#CBB084]/80 shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden text-warm-cream"
      aria-label="Sacred Quranic Verse"
    >
      {/* Delicate Golden Mihrab Arch Contour Overlay */}
      <div className="absolute inset-2.5 rounded-t-[50px] sm:rounded-t-[70px] rounded-b-2xl border border-dashed border-[#CBB084]/50 pointer-events-none"></div>

      {/* Ambient Celestial Golden Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-amber-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Decorative Star & Sacred Rule */}
      <div className="flex items-center justify-center gap-4 mb-7 relative z-10">
        <span className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent to-[#CBB084]/80"></span>
        <span className="text-gold-bright text-base animate-pulse">✦</span>
        <span className="h-px w-14 sm:w-20 bg-gradient-to-l from-transparent to-[#CBB084]/80"></span>
      </div>

      {/* Arabic Quranic Verse (Surah Ar-Rum 30:21) — Black & Gold */}
      <blockquote className="space-y-6 sm:space-y-7 relative z-10">
        <div 
          dir="rtl" 
          lang="ar" 
          className="font-arabic text-2xl sm:text-4xl leading-[2.3] sm:leading-[2.5] tracking-wide text-gold-bright font-bold select-all px-2 drop-shadow-[0_2px_8px_rgba(201,166,107,0.5)]"
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </div>

        {/* Translation in Expressive Serif */}
        <p className="font-serif italic text-base sm:text-xl text-warm-cream/95 leading-relaxed max-w-lg mx-auto tracking-wide">
          &ldquo;And among His signs is that He created for you spouses from among yourselves so that you may find tranquility in them; and He placed between you affection and mercy.&rdquo;
        </p>

        {/* Citation Tag */}
        <footer className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-gold-bright font-semibold pt-1">
          Surah Ar-Rum 30:21
        </footer>
      </blockquote>

      {/* Finishing Ornamental Accent */}
      <div className="flex items-center justify-center mt-8 relative z-10">
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-hairline opacity-80">
          <circle cx="30" cy="6" r="2.5" fill="currentColor" />
          <line x1="0" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="0.8" />
          <line x1="38" y1="6" x2="60" y2="6" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>
    </motion.section>
  );
}
