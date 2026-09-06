import React, { useState, useRef } from 'react';
import { Calendar, Clock, MapPin, Navigation, Share2, Check, Download, ExternalLink, QrCode } from 'lucide-react';
import { getGoogleCalendarUrl, downloadCalendarEvent } from '../utils/calendar';

export default function EventCard({ event, theme, onOpenQr }) {
  const [copied, setCopied] = useState(false);
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSheenPos({ x, y });

    const tiltX = (y - 50) * -0.04;
    const tiltY = (x - 50) * 0.04;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setSheenPos({ x: 50, y: 50 });
    setTilt({ x: 0, y: 0 });
  };

  const handleCopyAddress = (e) => {
    e.stopPropagation();
    const venueFull = event.venueSub ? `${event.venueName} ${event.venueSub}` : event.venueName;
    const fullText = `${venueFull}, ${event.venueAddress}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const mapDirectionsUrl = isIOS ? event.appleMapsUrl : event.mapsUrl;

  return (
    <article 
      id={event.id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.3s ease-out, box-shadow 0.4s ease'
      }}
      className={`relative rounded-3xl p-7 sm:p-9 backdrop-blur-sm border shadow-xl overflow-hidden ${
        theme === 'reception'
          ? 'bg-[#221A15]/95 text-warm-cream border-gold-hairline/50 shadow-reception-glow'
          : theme === 'celebration'
          ? 'bg-white/95 text-ink-deep border-sage/60 shadow-soft-float hover:border-sage'
          : 'bg-white/95 text-ink-deep border-rose-dust/70 shadow-soft-float hover:border-rose-dust'
      }`}
    >
      {/* Specular Gold Foil Sheen Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-35 mix-blend-overlay transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(201,166,107,0.3) 0%, transparent 60%)`
        }}
      />

      {/* Ribbon Header */}
      <div className="flex items-center justify-between gap-4 mb-5 relative z-10">
        <span className={`text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full border ${
          theme === 'reception'
            ? 'border-gold-hairline/40 text-gold-bright bg-gold-hairline/10'
            : theme === 'celebration'
            ? 'border-emerald-800/40 text-ink-deep bg-emerald-50'
            : 'border-rose-900/30 text-ink-deep bg-rose-50'
        }`}>
          {theme === 'nikah' && 'Event 01 · Nikah'}
          {theme === 'celebration' && 'Event 02 · Celebration'}
          {theme === 'reception' && 'Event 03 · Reception'}
        </span>
      </div>

      {/* Event Title */}
      <h3 className={`font-serif text-3xl sm:text-4xl tracking-tight mb-3 relative z-10 font-normal ${
        theme === 'reception' ? 'text-warm-cream' : 'text-ink-deep'
      }`}>
        {event.id === 'nikah' && 'The Nikah Ceremony'}
        {event.id === 'celebration-of-love' && 'Celebration of Love'}
        {event.id === 'reception' && 'The Wedding Reception'}
      </h3>

      {/* Dates Block */}
      <div className="mb-6 space-y-1 relative z-10">
        <p className={`font-serif text-xl sm:text-2xl font-bold ${
          theme === 'reception' ? 'text-gold-pale' : 'text-ink-deep'
        }`}>
          {event.gregorian}
        </p>

        <p className={`text-xs sm:text-sm font-sans tracking-wider font-semibold ${
          theme === 'reception' ? 'text-warm-cream/70' : 'text-ink-deep/90'
        }`}>
          ✦ {event.hijri}
        </p>
      </div>

      {/* Time & Program */}
      <div className="flex items-start gap-3 mb-6 relative z-10">
        <Clock className={`w-5 h-5 shrink-0 mt-0.5 ${
          theme === 'reception' ? 'text-gold-bright' : 'text-ink-deep'
        }`} />
        <div>
          <p className={`font-serif text-lg sm:text-xl font-bold leading-snug ${
            theme === 'reception' ? 'text-warm-cream' : 'text-ink-deep'
          }`}>
            {event.timeLabel}
          </p>
          {event.program && (
            <p className={`font-serif italic text-sm sm:text-base mt-0.5 font-semibold ${
              theme === 'reception' ? 'text-gold-pale/90' : 'text-ink-deep'
            }`}>
              {event.program}
            </p>
          )}
        </div>
      </div>

      {/* Venue Information */}
      <div className="flex items-start gap-3 mb-8 relative z-10">
        <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${
          theme === 'reception' ? 'text-gold-bright' : 'text-ink-deep'
        }`} />
        <div className="flex-1">
          <p className={`font-serif text-lg sm:text-xl font-bold leading-snug ${
            theme === 'reception' ? 'text-warm-cream' : 'text-ink-deep'
          }`}>
            {event.venueName}
            {event.venueSub && (
              <span className={`block text-sm sm:text-base font-serif italic font-medium mt-0.5 ${
                theme === 'reception' ? 'text-gold-pale/85' : 'text-ink-deep/90'
              }`}>
                {event.venueSub}
              </span>
            )}
          </p>
          <p className={`text-sm font-sans font-medium mt-0.5 ${
            theme === 'reception' ? 'text-warm-cream/75' : 'text-ink-deep/90'
          }`}>
            {event.venueAddress}
          </p>

          {/* Copy Address */}
          <button
            onClick={handleCopyAddress}
            className={`mt-2 text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer font-bold ${
              copied
                ? theme === 'reception' ? 'text-gold-bright font-bold' : 'text-ink-deep font-bold'
                : theme === 'reception'
                ? 'text-gold-bright/80 hover:text-gold-bright'
                : 'text-ink-deep/80 hover:text-ink-deep'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-gold-hairline" />
                <span>Address copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy address</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Actions: Directions + Calendar + QR (Symmetrically Aligned) */}
      <div className="pt-4 border-t border-gold-hairline/20 flex flex-col sm:flex-row gap-2.5 relative z-10">
        <a
          href={mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`h-11 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer sm:flex-1 ${
            theme === 'reception'
              ? 'bg-gold-hairline text-ink-deep hover:bg-gold-bright'
              : 'bg-ink-deep text-warm-cream hover:bg-black'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>Get Directions</span>
        </a>

        <div className="flex gap-2 sm:flex-1">
          {/* Add to Calendar Menu */}
          <div className="relative flex-1">
            <button
              onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
              className={`w-full h-11 px-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors active:scale-95 cursor-pointer ${
                theme === 'reception'
                  ? 'border-gold-hairline/40 text-warm-cream hover:bg-white/10'
                  : 'border-ink-deep/30 text-ink-deep hover:bg-ink-deep/5'
              }`}
              aria-label="Add to Calendar options"
            >
              <Calendar className="w-4 h-4 text-gold-hairline" />
              <span>Add to Calendar</span>
            </button>

            {calendarMenuOpen && (
              <>
                {/* Backdrop to dismiss when clicking outside */}
                <div 
                  className="fixed inset-0 z-20 cursor-default" 
                  onClick={() => setCalendarMenuOpen(false)} 
                />
                <div 
                  className="absolute bottom-full mb-2 left-0 sm:left-auto sm:right-0 w-56 rounded-2xl bg-[#FCFAF7] text-ink-deep p-2 shadow-2xl border border-gold-hairline/40 z-30 animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-2 border-b border-gold-hairline/20 mb-1">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-ink-deep font-bold block">
                      Choose Calendar
                    </span>
                  </div>
                  
                  <a
                    href={getGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCalendarMenuOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-gold-hairline/15 transition-colors font-bold text-ink-deep"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#9A7228]" />
                    <span>Google Calendar</span>
                  </a>

                  <button
                    onClick={() => {
                      downloadCalendarEvent(event);
                      setCalendarMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-gold-hairline/15 transition-colors text-left font-bold text-ink-deep cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#9A7228]" />
                    <span>Apple Calendar / Outlook</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* QR Trigger */}
          <button
            onClick={() => onOpenQr(event)}
            className={`w-11 h-11 shrink-0 rounded-xl border transition-colors flex items-center justify-center active:scale-95 cursor-pointer ${
              theme === 'reception'
                ? 'border-gold-hairline/40 text-gold-pale hover:bg-white/10'
                : 'border-ink-deep/30 text-ink-deep font-semibold hover:bg-ink-deep/5'
            }`}
            title="Show QR Code for Venue"
            aria-label="Show QR Code for Venue"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
