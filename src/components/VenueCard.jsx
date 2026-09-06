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
    <div className="rounded-3xl bg-[#140C12]/85 border border-[#CBB084]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl text-warm-cream">
      {/* Minimal Architectural Map Canvas Preview */}
      <div className="relative h-44 sm:h-52 bg-[#1C121A] overflow-hidden border-b border-[#CBB084]/30 flex items-center justify-center">
        {/* Stylized Minimal Vector Road Pattern */}
        <svg viewBox="0 0 400 200" className="w-full h-full opacity-40 pointer-events-none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={`grid-${venue.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBB084" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${venue.id})`} />
          {/* Main Arterial Curves */}
          <path d="M-20 60 Q120 180 260 90 T420 140" fill="none" stroke="#CBB084" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
          <path d="M60 -20 Q160 110 320 220" fill="none" stroke="#A88246" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
          <path d="M220 0 L240 200" fill="none" stroke="#E2C792" strokeWidth="3" opacity="0.4" />
          
          <text x="50" y="160" fill="#CBB084" fontSize="10" fontFamily="sans-serif" letterSpacing="1" opacity="0.8">
            {venue.id === 'hakimi' ? 'SHANTI NAGAR ROAD' : 'GOREWADA RING ROAD'}
          </text>
        </svg>

        {/* Center Venue Pin Marker with Subtle Pulse */}
        <div className="absolute z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-12 h-12 rounded-full bg-amber-400/20 animate-ping"></span>
            <div className="relative z-10 p-3 rounded-full bg-[#2A1822] text-gold-bright shadow-lg border border-[#CBB084]">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <span className="mt-1 px-3 py-0.5 rounded-full bg-[#140C12]/95 text-gold-bright text-[10px] font-sans font-medium tracking-wide shadow-md border border-[#CBB084]/40">
            {venue.name}
          </span>
        </div>

        {/* Static Map Badge */}
        <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded bg-[#140C12]/90 text-[10px] font-sans text-gold-pale/80 border border-[#CBB084]/30 backdrop-blur-xs">
          Nagpur, Maharashtra
        </div>
      </div>

      {/* Details & Action Content */}
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-gold-bright font-semibold block mb-1">
              {venue.eventLabel}
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-gold-bright">
              {venue.name}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-warm-cream/80 mt-1 select-all">
              {venue.address}
            </p>
          </div>

          {/* Quick QR Thumbnail */}
          <div 
            className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 p-1.5 rounded-xl border border-[#CBB084]/50 bg-white/95 shadow-sm"
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
            className="h-11 flex items-center justify-center gap-2 px-3 rounded-xl bg-gradient-to-r from-[#2A1822] to-[#3B1F2F] text-gold-bright text-xs sm:text-sm font-medium tracking-wide shadow-md border border-[#CBB084]/60 hover:from-[#351F2C] hover:to-[#462539] active:scale-95 transition-all"
          >
            <Navigation className="w-4 h-4 text-gold-bright" />
            <span>Open in Maps</span>
          </a>

          <button
            onClick={handleCopy}
            className={`h-11 px-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors active:scale-95 cursor-pointer ${
              copied
                ? 'border-emerald-500/60 bg-emerald-900/30 text-emerald-300 font-semibold'
                : 'border-[#CBB084]/50 text-gold-bright hover:bg-[#2A1822]'
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
