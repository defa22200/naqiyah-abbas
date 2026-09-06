import React from 'react';

export default function InvocationSection() {
  return (
    <header 
      id="invocation" 
      className="pt-20 sm:pt-28 pb-4 px-3 text-center max-w-lg mx-auto transition-opacity duration-1000"
      aria-label="Opening Sacred Invocation"
    >
      {/* Delicate Architectural Mihrab / Arch Hairline Motif with Self-Drawing Stroke */}
      <div className="flex items-center justify-center mb-3">
        <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-hairline opacity-90">
          <path 
            d="M2 22C12 22 18 10 24 2C30 10 36 22 46 22" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            className="animate-pulse"
          />
          <circle cx="24" cy="11" r="1.8" fill="currentColor" />
        </svg>
      </div>

      {/* Bismillah in Sacred Calligraphy with Radial Glow */}
      <div className="relative my-2 flex justify-center items-center">
        <div className="absolute inset-0 bg-gold-hairline/20 blur-xl scale-75 pointer-events-none rounded-full" />
        <div 
          dir="rtl" 
          lang="ar" 
          className="font-arabic text-2xl sm:text-4xl text-warm-espresso tracking-wider leading-loose select-all relative z-10 drop-shadow-[0_1px_2px_rgba(201,166,107,0.3)]"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
      </div>

      {/* Fine Gold Divider */}
      <div className="flex items-center justify-center gap-2 my-2.5">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-hairline/60"></span>
        <span className="text-gold-hairline text-xs">✦</span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-hairline/60"></span>
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
