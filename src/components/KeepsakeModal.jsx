import React, { useState, useEffect } from 'react';
import { X, Calendar, Share2, Check, Sparkles, Heart } from 'lucide-react';

export default function KeepsakeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-12-18T18:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Naqiyah & Abbas — Wedding Invitation',
        text: 'Two families. Two hearts. One beautiful beginning. Wedding celebrations on 18–19 December 2026 in Nagpur.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-plum/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm rounded-3xl bg-ivory text-ink-plum p-7 sm:p-8 shadow-2xl border-2 border-gold-hairline/60 overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fine gold corner filigree accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold-hairline/70"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold-hairline/70"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold-hairline/70"></div>
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold-hairline/70"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-ink-plum/60 hover:text-ink-plum hover:bg-gold-hairline/15 transition-colors"
          aria-label="Close keepsake card"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Card Header Tag */}
        <div className="mb-4">
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-terracotta-dark font-semibold">
            ✦ Save The Date · Keepsake ✦
          </span>
        </div>

        {/* Couple Names */}
        <div className="space-y-1 my-3">
          <h2 className="font-serif text-3xl sm:text-4xl text-ink-plum tracking-tight">
            Naqiyah &amp; Abbas
          </h2>
          <p className="font-serif italic text-sm text-terracotta">
            Two families · Two hearts · One beautiful beginning
          </p>
        </div>

        {/* Gold Hairline Divider */}
        <div className="flex items-center justify-center gap-3 my-5">
          <span className="h-px w-10 bg-gold-hairline/50"></span>
          <span className="text-gold-hairline text-xs">❦</span>
          <span className="h-px w-10 bg-gold-hairline/50"></span>
        </div>

        {/* Date & Location Highlight */}
        <div className="py-2 space-y-1">
          <p className="font-serif text-xl text-ink-plum font-semibold">
            18 &amp; 19 December 2026
          </p>
          <p className="font-sans text-xs tracking-widest text-ink-plum/70 uppercase">
            10 &amp; 11 Shehre Rajabul Asab 1448H
          </p>
          <p className="font-sans text-xs font-medium text-terracotta-dark">
            Nagpur, Maharashtra
          </p>
        </div>

        {/* Live Countdown */}
        <div className="mt-5 mb-6 p-3 rounded-2xl bg-ivory-soft/80 border border-gold-hairline/30">
          <p className="text-[10px] font-sans uppercase tracking-widest text-ink-plum/60 mb-2 font-medium">
            Counting Down with Joy
          </p>
          <div className="grid grid-cols-4 gap-1 text-center">
            <div className="p-1.5 rounded-lg bg-white/60">
              <span className="font-serif text-lg sm:text-xl font-bold text-ink-plum block">
                {timeLeft.days}
              </span>
              <span className="text-[9px] font-sans text-ink-plum/60 uppercase">Days</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white/60">
              <span className="font-serif text-lg sm:text-xl font-bold text-ink-plum block">
                {timeLeft.hours}
              </span>
              <span className="text-[9px] font-sans text-ink-plum/60 uppercase">Hours</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white/60">
              <span className="font-serif text-lg sm:text-xl font-bold text-ink-plum block">
                {timeLeft.minutes}
              </span>
              <span className="text-[9px] font-sans text-ink-plum/60 uppercase">Mins</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white/60">
              <span className="font-serif text-lg sm:text-xl font-bold text-ink-plum block">
                {timeLeft.seconds}
              </span>
              <span className="text-[9px] font-sans text-ink-plum/60 uppercase">Secs</span>
            </div>
          </div>
        </div>

        {/* Screenshot / Share Action */}
        <div className="space-y-2">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-ink-plum text-ivory text-xs font-medium tracking-wide shadow hover:bg-ink-light active:scale-95 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-gold-bright" /> : <Share2 className="w-4 h-4 text-gold-hairline" />}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Share or Save Link'}</span>
          </button>
          
          <p className="text-[10px] font-sans text-ink-plum/50">
            Tip: Screenshot this digital card to keep in your photos.
          </p>
        </div>

      </div>
    </div>
  );
}
