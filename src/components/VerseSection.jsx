import React from 'react';

export default function VerseSection() {
  return (
    <section 
      id="verse" 
      className="py-24 sm:py-32 px-6 text-center max-w-2xl mx-auto relative rounded-3xl my-12 backdrop-blur-md bg-ink-plum/60 border border-gold-hairline/30 shadow-2xl"
      aria-label="Sacred Quranic Verse"
    >
      {/* Delicate Ambient Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-gold-hairline/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Decorative Star & Delicate Rule */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-hairline/70"></span>
        <span className="text-gold-bright text-sm animate-gentle-pulse">✦</span>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-hairline/70"></span>
      </div>

      {/* Arabic Quranic Verse (Surah Ar-Rum 30:21) */}
      <blockquote className="space-y-8">
        <div 
          dir="rtl" 
          lang="ar" 
          className="font-arabic text-2xl sm:text-4xl leading-[2.3] sm:leading-[2.5] tracking-wide text-gold-pale select-all px-2 text-shadow-sm"
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </div>

        {/* Translation in Expressive Serif */}
        <p className="font-serif italic text-lg sm:text-2xl text-ivory/95 leading-relaxed max-w-xl mx-auto tracking-wide">
          &ldquo;And among His signs is that He created for you spouses from among yourselves so that you may find tranquility in them; and He placed between you affection and mercy.&rdquo;
        </p>

        {/* Citation Tag */}
        <footer className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase text-gold-bright font-medium pt-2">
          Surah Ar-Rum 30:21
        </footer>
      </blockquote>

      {/* Finishing Ornament */}
      <div className="flex items-center justify-center mt-10">
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-hairline opacity-75">
          <circle cx="30" cy="6" r="2.5" fill="currentColor" />
          <line x1="0" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="0.8" />
          <line x1="38" y1="6" x2="60" y2="6" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>
    </section>
  );
}
