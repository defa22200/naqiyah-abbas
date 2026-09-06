import React from 'react';
import { X, Navigation, Share2, Download } from 'lucide-react';
import { generateStyledQrSvg } from '../utils/qrGenerator';

export default function QrCodeModal({ event, onClose }) {
  if (!event) return null;

  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const mapUrl = isIOS ? event.appleMapsUrl : event.mapsUrl;

  const qrSvg = generateStyledQrSvg(event.mapsUrl, {
    fgColor: '#3A2C33',
    goldColor: '#C9A66B',
    bgColor: '#FAF5EE'
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-plum/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm rounded-3xl bg-ivory text-ink-deep p-7 sm:p-8 shadow-2xl border border-gold-hairline/60 overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-ink-deep/70 hover:text-ink-deep hover:bg-gold-hairline/15 transition-colors"
          aria-label="Close QR modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-ink-deep font-bold block mb-2">
          Venue QR Navigation
        </span>
        <h3 className="font-serif text-2xl text-ink-deep font-bold mb-1">
          {event.venueName}
        </h3>
        <p className="font-sans text-xs text-ink-deep/90 font-medium mb-5">
          {event.venueAddress}
        </p>

        {/* Framed QR Code with Gold Hairline Border */}
        <div className="relative mx-auto w-56 h-56 p-3 rounded-2xl bg-white border-2 border-gold-hairline/50 shadow-md flex items-center justify-center mb-6">
          <div 
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
        </div>

        <p className="font-sans text-xs text-ink-deep/90 font-medium mb-5 leading-relaxed">
          Scan using any smartphone camera or QR reader to launch direct navigation on Google Maps or Apple Maps.
        </p>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-ink-plum text-ivory text-xs font-semibold tracking-wide shadow-md hover:bg-ink-light active:scale-95 transition-all"
        >
          <Navigation className="w-4 h-4 text-gold-hairline" />
          <span>Launch Directions Now</span>
        </a>
      </div>
    </div>
  );
}
