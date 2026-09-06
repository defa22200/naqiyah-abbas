import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Share2, Check, Download, ExternalLink, QrCode } from 'lucide-react';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export default function EventCard({ event, theme, onOpenQr, onCopyToast }) {
  const [showHijri, setShowHijri] = useState(true);
  const [copied, setCopied] = useState(false);
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  const handleCopyAddress = (e) => {
    e.stopPropagation();
    const fullText = `${event.venueName}, ${event.venueAddress}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    if (onCopyToast) onCopyToast(`Address copied: ${event.venueName}`);
    setTimeout(() => setCopied(false), 2400);
  };

  // Smart Universal Link for Map Directions
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const mapDirectionsUrl = isIOS ? event.appleMapsUrl : event.mapsUrl;

  return (
    <article 
      id={event.id}
      className={`relative rounded-3xl p-7 sm:p-9 transition-all duration-700 backdrop-blur-sm border shadow-xl ${
        theme === 'reception'
          ? 'bg-ink-deep/95 text-ivory border-gold-hairline/40 shadow-reception-glow'
          : theme === 'celebration'
          ? 'bg-ivory-soft/85 text-ink-plum border-sage/40 shadow-soft-float hover:border-sage'
          : 'bg-ivory-soft/85 text-ink-plum border-rose-dust/50 shadow-soft-float hover:border-rose-dust'
      }`}
    >
      {/* Decorative Event Ordinal / Ribbon */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <span className={`text-[10px] sm:text-xs font-sans uppercase tracking-[0.25em] font-semibold px-3.5 py-1 rounded-full border ${
          theme === 'reception'
            ? 'border-gold-hairline/40 text-gold-bright bg-gold-hairline/10'
            : theme === 'celebration'
            ? 'border-sage text-sage-deep bg-sage-mist/50'
            : 'border-terracotta-muted text-terracotta-dark bg-rose-dust-light/60'
        }`}>
          {theme === 'nikah' && 'Event 01 · Nikah'}
          {theme === 'celebration' && 'Event 02 · Celebration of Love'}
          {theme === 'reception' && 'Event 03 · Reception'}
        </span>

        {/* Hijri / Gregorian Calendar Toggle Pill */}
        <button
          onClick={() => setShowHijri(!showHijri)}
          className={`text-[11px] font-sans px-2.5 py-1 rounded-full border transition-all active:scale-95 flex items-center gap-1 ${
            theme === 'reception'
              ? 'border-gold-hairline/30 text-gold-pale hover:bg-gold-hairline/10'
              : 'border-gold-hairline/40 text-ink-plum/70 hover:bg-gold-hairline/10 hover:text-ink-plum'
          }`}
          title="Toggle Hijri / Gregorian Calendar view"
        >
          <Calendar className="w-3 h-3 text-gold-hairline" />
          <span>{showHijri ? 'Hijri visible' : 'Show Hijri'}</span>
        </button>
      </div>

      {/* Event Title */}
      <h3 className={`font-serif text-3xl sm:text-4xl tracking-tight mb-4 ${
        theme === 'reception' ? 'text-ivory' : 'text-ink-plum'
      }`}>
        {event.id === 'nikah' && 'The Nikah Ceremony'}
        {event.id === 'celebration-of-love' && 'Celebration of Love'}
        {event.id === 'reception' && 'The Wedding Reception'}
      </h3>

      {/* Dates Block */}
      <div className="mb-6 space-y-1">
        <p className={`font-serif text-xl sm:text-2xl font-medium ${
          theme === 'reception' ? 'text-gold-pale' : 'text-terracotta-dark'
        }`}>
          {event.gregorian}
        </p>

        {showHijri && (
          <p className={`text-xs sm:text-sm font-sans tracking-wider ${
            theme === 'reception' ? 'text-ivory/70' : 'text-ink-plum/70'
          }`}>
            ✦ {event.hijri}
          </p>
        )}
      </div>

      {/* Time & Program */}
      <div className="flex items-start gap-3 mb-6">
        <Clock className={`w-5 h-5 shrink-0 mt-0.5 ${
          theme === 'reception' ? 'text-gold-bright' : 'text-terracotta'
        }`} />
        <div>
          <p className="font-serif text-lg font-medium">
            {event.timeLabel}
          </p>
          <p className={`text-xs font-sans mt-0.5 ${
            theme === 'reception' ? 'text-ivory/60' : 'text-ink-plum/60'
          }`}>
            {event.id === 'nikah' && 'Auspicious Nikah rituals followed by formal dinner'}
            {event.id === 'celebration-of-love' && 'An afternoon of joyous togetherness & luncheon'}
            {event.id === 'reception' && 'An evening of celebration, greetings & dinner'}
          </p>
        </div>
      </div>

      {/* Venue Information */}
      <div className="flex items-start gap-3 mb-8">
        <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${
          theme === 'reception' ? 'text-gold-bright' : 'text-terracotta'
        }`} />
        <div className="flex-1">
          <p className="font-serif text-lg font-medium leading-snug">
            {event.venueName}
          </p>
          <p className={`text-sm font-sans ${
            theme === 'reception' ? 'text-ivory/75' : 'text-ink-plum/75'
          }`}>
            {event.venueAddress}
          </p>

          {/* Inline Copy Button */}
          <button
            onClick={handleCopyAddress}
            className={`mt-2 text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer ${
              copied
                ? 'text-emerald-500 font-medium'
                : theme === 'reception'
                ? 'text-gold-bright/90 hover:text-gold-bright'
                : 'text-terracotta-dark hover:text-terracotta'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to clipboard</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy full address</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons: Get Directions + Add to Calendar + Show QR */}
      <div className="pt-4 border-t border-gold-hairline/20 flex flex-wrap gap-3 items-center">
        
        {/* Get Directions (Deep-link) */}
        <a
          href={mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm active:scale-95 ${
            theme === 'reception'
              ? 'bg-gold-hairline text-ink-deep hover:bg-gold-bright'
              : 'bg-ink-plum text-ivory hover:bg-ink-light'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>Get Directions</span>
        </a>

        {/* Add to Calendar Dropdown / Trigger */}
        <div className="relative">
          <button
            onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
            className={`py-3 px-3.5 rounded-xl border text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors active:scale-95 cursor-pointer ${
              theme === 'reception'
                ? 'border-gold-hairline/40 text-ivory hover:bg-white/10'
                : 'border-ink-plum/25 text-ink-plum hover:bg-ink-plum/5'
            }`}
            aria-label="Add to Calendar options"
          >
            <Calendar className="w-4 h-4 text-gold-hairline" />
            <span>Add to Calendar</span>
          </button>

          {/* Calendar popup options */}
          {calendarMenuOpen && (
            <div 
              className="absolute bottom-full mb-2 right-0 w-52 rounded-2xl bg-ivory text-ink-plum p-2 shadow-2xl border border-gold-hairline/40 z-30 animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 border-b border-gold-hairline/20 mb-1">
                <span className="text-[10px] font-sans uppercase tracking-widest text-ink-plum/60 font-semibold block">
                  Select Calendar
                </span>
              </div>
              
              <a
                href={getGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setCalendarMenuOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-gold-hairline/15 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-terracotta" />
                <span>Google Calendar</span>
              </a>

              <button
                onClick={() => {
                  downloadIcsFile(event);
                  setCalendarMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-gold-hairline/15 transition-colors text-left cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-gold-hairline" />
                <span>Apple / Outlook (.ics)</span>
              </button>
            </div>
          )}
        </div>

        {/* QR Code trigger */}
        <button
          onClick={() => onOpenQr(event)}
          className={`p-3 rounded-xl border transition-colors flex items-center justify-center active:scale-95 cursor-pointer ${
            theme === 'reception'
              ? 'border-gold-hairline/40 text-gold-pale hover:bg-white/10'
              : 'border-ink-plum/25 text-ink-plum hover:bg-ink-plum/5'
          }`}
          title="Show QR Code for Venue"
          aria-label="Show QR Code for Venue"
        >
          <QrCode className="w-4 h-4" />
        </button>

      </div>
    </article>
  );
}
