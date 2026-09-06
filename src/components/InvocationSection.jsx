import React from 'react';

export default function InvocationSection() {
  return (
    <header 
      id="invocation" 
      className="pt-6 sm:pt-10 pb-3 px-3 text-center max-w-lg mx-auto transition-opacity duration-1000"
      aria-label="Opening Sacred Invocation"
    >
      {/* Delicate Architectural Mihrab / Arch Hairline Motif */}
      <div className="flex items-center justify-center mb-2.5">
        <svg width="36" height="18" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-hairline opacity-80">
          <path d="M2 22C12 22 18 10 24 2C30 10 36 22 46 22" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="24" cy="11" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Bismillah in Calligraphic Arabic */}
      <div 
        dir="rtl" 
        lang="ar" 
        className="font-arabic text-xl sm:text-3xl text-warm-espresso tracking-wide mb-2.5 leading-loose select-all"
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      {/* Fine Gold Divider */}
      <div className="flex items-center justify-center gap-2 my-2">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-hairline/60"></span>
        <span className="text-gold-hairline text-[10px]">✦</span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-hairline/60"></span>
      </div>

      {/* Verbatim Invocation Text */}
      <p className="font-serif italic text-xs sm:text-sm text-warm-bronze/90 leading-relaxed px-2 tracking-wide">
        By the Grace of Allah and Vasila-e-Panjatan-e-paak <span className="text-[10px] font-sans not-italic text-gold-burnished font-medium">(A.S.)</span> and dua mubarak of <br />
        <span className="font-medium text-warm-espresso">Dr. Syedna Mohammed Burhanuddin <span className="text-[9px] font-sans not-italic text-gold-burnished">(R.A.)</span></span> &amp; <br />
        <span className="font-medium text-warm-espresso">Dr. Syedna Aali Qadr Mufaddal Saifuddin <span className="text-[9px] font-sans not-italic text-gold-burnished">(T.U.S.)</span></span>
      </p>
    </header>
  );
}
