import React, { useState } from 'react';
import { MapPin, Navigation, Share2, Check, QrCode } from 'lucide-react';
import { generateStyledQrSvg } from '../utils/qrGenerator';

export default function VenueCard({ venue }) {
  const [copied, setCopied] = useState(false);
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const mapUrl = isIOS ? venue.appleMapsUrl : venue.mapsUrl;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${venue.name}, ${venue.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const qrSvg = generateStyledQrSvg(venue.mapsUrl, {
    fgColor: '#433226',
    goldColor: '#C9A66B',
    bgColor: '#FAF5EE'
  });

  return (
    <div className="rounded-3xl bg-white/85 border border-gold-hairline/35 shadow-soft-float overflow-hidden backdrop-blur-sm">
      {/* Minimal Architectural Map Canvas Preview */}
      <div className="relative h-44 sm:h-52 bg-[#F2EDE4] overflow-hidden border-b border-gold-hairline/25 flex items-center justify-center">
        {/* Stylized Minimal Vector Road Pattern */}
        <svg viewBox="0 0 400 200" className="w-full h-full opacity-60 pointer-events-none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={`grid-${venue.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5DAC9" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${venue.id})`} />
          {/* Main Arterial Curves */}
          <path d="M-20 60 Q120 180 260 90 T420 140" fill="none" stroke="#D7C5B0" strokeWidth="12" strokeLinecap="round" />
          <path d="M60 -20 Q160 110 320 220" fill="none" stroke="#DFCFBC" strokeWidth="8" strokeLinecap="round" />
          <path d="M220 0 L240 200" fill="none" stroke="#EFE5D5" strokeWidth="5" />
          
          <text x="50" y="160" fill="#998375" fontSize="10" fontFamily="sans-serif" letterSpacing="1">
            {venue.id === 'hakimi' ? 'SHANTI NAGAR ROAD' : 'GOREWADA RING ROAD'}
          </text>
        </svg>

        {/* Center Venue Pin Marker with Subtle Pulse */}
        <div className="absolute z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-12 h-12 rounded-full bg-gold-hairline/20 animate-ping"></span>
            <div className="relative z-10 p-3 rounded-full bg-warm-espresso text-gold-bright shadow-lg border border-gold-hairline">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <span className="mt-1 px-3 py-0.5 rounded-full bg-warm-espresso/90 text-warm-cream text-[10px] font-sans font-medium tracking-wide shadow-md backdrop-blur-xs">
            {venue.name}
          </span>
        </div>

        {/* Static Map Badge */}
        <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded bg-ivory/80 text-[10px] font-sans text-warm-bronze/70 border border-gold-hairline/20 backdrop-blur-xs">
          Nagpur, Maharashtra
        </div>
      </div>

      {/* Details & Action Content */}
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-terracotta-muted font-semibold block mb-1">
              {venue.eventLabel}
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-warm-espresso">
              {venue.name}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-warm-bronze/80 mt-1 select-all">
              {venue.address}
            </p>
          </div>

          {/* Quick QR Thumbnail */}
          <div 
            className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 p-1.5 rounded-xl border border-gold-hairline/40 bg-white/70 shadow-sm"
            title="Scan for Navigation"
          >
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          </div>
        </div>

        {/* Action Buttons - Symmetrically Aligned */}
        <div className="grid grid-cols-2 gap-2.5 mt-6">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 flex items-center justify-center gap-2 px-3 rounded-xl bg-warm-espresso text-warm-cream text-xs sm:text-sm font-medium tracking-wide shadow-md hover:bg-warm-dark active:scale-95 transition-all"
          >
            <Navigation className="w-4 h-4 text-gold-hairline" />
            <span>Open in Maps</span>
          </a>

          <button
            onClick={handleCopy}
            className={`h-11 px-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors active:scale-95 cursor-pointer ${
              copied
                ? 'border-gold-hairline/60 bg-gold-hairline/15 text-warm-espresso font-semibold'
                : 'border-gold-hairline/40 text-warm-espresso hover:bg-gold-hairline/10'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-gold-hairline" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-warm-bronze" />
                <span>Copy Address</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
