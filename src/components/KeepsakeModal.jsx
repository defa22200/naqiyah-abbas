import React, { useState, useEffect, useRef } from 'react';
import { X, Share2, Check } from 'lucide-react';

export default function KeepsakeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const tiltX = (y - 50) * -0.15;
    const tiltY = (x - 50) * 0.15;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-dark/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="relative w-full max-w-sm rounded-3xl bg-white text-ink-deep p-7 sm:p-8 shadow-2xl border-2 border-gold-hairline/60 overflow-hidden text-center [transform-style:preserve-3d]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fine gold corner filigree accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold-hairline/70 pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold-hairline/70 pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold-hairline/70 pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold-hairline/70 pointer-events-none"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-ink-deep/70 hover:text-ink-deep hover:bg-gold-hairline/15 transition-colors cursor-pointer"
          aria-label="Close keepsake card"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Card Header Tag */}
        <div className="mb-2">
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-ink-deep font-bold">
            ✦ Save The Date · Keepsake ✦
          </span>
        </div>

        {/* Monogram */}
        <div className="my-2 flex justify-center">
          <img 
            src="/images/na_monogram_luxury.png" 
            alt="Naqiyah & Abbas Monogram" 
            className="w-16 h-14 object-contain filter drop-shadow-sm"
          />
        </div>

        {/* Couple Names in Calligraphy Italic Script */}
        <div className="space-y-0.5 my-2">
          <h2 className="font-calligraphy not-italic text-5xl sm:text-6xl text-ink-deep font-normal leading-tight">
            Naqiyah &amp; Abbas
          </h2>
          <p className="text-[10px] sm:text-xs font-sans tracking-widest uppercase text-ink-deep/90 font-semibold">
            Two families · Two hearts · One beautiful beginning
          </p>
        </div>

        {/* Gold Hairline Divider */}
        <div className="flex items-center justify-center gap-3 my-4">
          <span className="h-px w-10 bg-[#CBB084]/60"></span>
          <span className="text-[#9A7228] text-xs">✦</span>
          <span className="h-px w-10 bg-[#CBB084]/60"></span>
        </div>

        {/* Date & Location Highlight */}
        <div className="py-1 space-y-1">
          <p className="font-serif text-xl text-ink-deep font-bold">
            18 &amp; 19 December 2026
          </p>
          <p className="font-sans text-[10px] sm:text-xs tracking-widest text-ink-deep/90 uppercase font-semibold">
            10 &amp; 11 Shehre Rajabul Asab 1448H
          </p>
          <p className="font-sans text-xs font-bold text-ink-deep">
            Nagpur, Maharashtra
          </p>
        </div>

        {/* Live Countdown */}
        <div className="mt-4 mb-5 p-3 rounded-2xl bg-[#FDFBF7] border border-gold-hairline/30">
          <p className="text-[9px] font-sans uppercase tracking-widest text-ink-deep mb-2 font-bold">
            Counting Down with Joy
          </p>
          <div className="grid grid-cols-4 gap-1 text-center">
            <div className="p-1.5 rounded-lg bg-white shadow-xs">
              <span className="font-serif text-base sm:text-lg font-bold text-ink-deep block">
                {timeLeft.days}
              </span>
              <span className="text-[8px] font-sans text-ink-deep font-semibold uppercase">Days</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white shadow-xs">
              <span className="font-serif text-base sm:text-lg font-bold text-ink-deep block">
                {timeLeft.hours}
              </span>
              <span className="text-[8px] font-sans text-ink-deep font-semibold uppercase">Hours</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white shadow-xs">
              <span className="font-serif text-base sm:text-lg font-bold text-ink-deep block">
                {timeLeft.minutes}
              </span>
              <span className="text-[8px] font-sans text-ink-deep font-semibold uppercase">Mins</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white shadow-xs">
              <span className="font-serif text-base sm:text-lg font-bold text-ink-deep block">
                {timeLeft.seconds}
              </span>
              <span className="text-[8px] font-sans text-ink-deep font-semibold uppercase">Secs</span>
            </div>
          </div>
        </div>

        {/* Screenshot / Share Action */}
        <div className="space-y-2">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-ink-deep text-gold-bright text-xs font-medium tracking-wide shadow-md hover:bg-black active:scale-95 transition-all cursor-pointer border border-gold-hairline/30"
          >
            {copied ? <Check className="w-4 h-4 text-gold-bright" /> : <Share2 className="w-4 h-4 text-gold-hairline" />}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Share Invitation Link'}</span>
          </button>
          
          <p className="text-[9px] font-sans text-ink-deep/75 font-medium">
            Tip: Screenshot this digital card to keep in your photos.
          </p>
        </div>

      </div>
    </div>
  );
}
