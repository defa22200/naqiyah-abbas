import React, { useState, useEffect } from 'react';
import { Share2, Check, Sparkles } from 'lucide-react';

export default function ClosingSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2026-12-18T18:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, minutes });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Naqiyah & Abbas — Wedding Invitation',
        text: 'Two families · Two hearts · One beautiful beginning. Wedding Celebrations: 18–19 December 2026, Nagpur.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section 
      id="closing" 
      className="py-16 px-4 sm:px-6 max-w-xl mx-auto text-center space-y-12"
      aria-label="Family Compliments and Closing Blessing"
    >
      {/* 1. With Best Compliments From Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-gold-hairline/40 shadow-soft-float text-warm-espresso space-y-3 backdrop-blur-md">
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

      {/* 2. Verbatim Closing Blessing */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white/90 border border-gold-hairline/40 shadow-soft-float space-y-4 text-warm-espresso backdrop-blur-md">
        <p className="font-serif italic text-xl sm:text-2xl leading-relaxed text-warm-espresso">
          &ldquo;Your presence will make our celebration complete; your blessings will make our journey more beautiful.&rdquo;
        </p>
        <div className="flex items-center justify-center gap-2 pt-2 text-gold-hairline">
          <span className="text-xs">✦</span>
          <span className="font-calligraphy not-italic text-3xl text-gold-burnished px-1">Naqiyah &amp; Abbas</span>
          <span className="text-xs">✦</span>
        </div>
      </div>

      {/* 3. Compact Inline Countdown Badge & Share Trigger */}
      <div className="flex flex-col items-center justify-center gap-4 pt-2">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/80 border border-gold-hairline/40 shadow-sm backdrop-blur-sm text-warm-espresso">
          <span className="text-[10px] font-sans tracking-widest uppercase text-terracotta-dark font-semibold">Counting Down</span>
          <div className="flex items-center gap-2 font-serif text-sm font-medium text-gold-burnished">
            <span>{timeLeft.days}d</span>
            <span className="text-gold-hairline/40">·</span>
            <span>{timeLeft.hours}h</span>
            <span className="text-gold-hairline/40">·</span>
            <span>{timeLeft.minutes}m</span>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gold-hairline/15 hover:bg-gold-hairline/25 text-warm-espresso border border-gold-hairline/40 text-xs font-medium tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-gold-burnished" />}
          <span>{copied ? 'Link Copied' : 'Share Invitation'}</span>
        </button>
      </div>

      {/* 4. Footer / Logistics Touchpoint */}
      <footer className="pt-6 border-t border-gold-hairline/25 text-xs font-sans text-warm-bronze/80 space-y-2">
        <p className="font-medium">18 – 19 December 2026 · Nagpur, Maharashtra</p>
        <p className="text-[9.5px] min-[360px]:text-[11px] text-warm-bronze/60 whitespace-nowrap">
          Two families · Two hearts · One beautiful beginning
        </p>
      </footer>
    </section>
  );
}
