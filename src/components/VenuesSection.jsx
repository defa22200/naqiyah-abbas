import React from 'react';
import VenueCard from './VenueCard';
import { Compass, ShieldCheck } from 'lucide-react';

export const VENUES_DATA = [
  {
    id: 'hakimi',
    name: 'Hakimi Masjid',
    address: 'Shanti Nagar, Nagpur, Maharashtra',
    eventLabel: 'Nikah Ceremony Venue',
    guidance: 'Welcoming guests after Maghrib prayers. Ample community parking accessible adjacent to the Masjid campus.',
    mapsUrl: 'https://maps.google.com/?q=Hakimi+Masjid,+Shanti+Nagar,+Nagpur',
    appleMapsUrl: 'https://maps.apple.com/?q=Hakimi+Masjid,+Shanti+Nagar,+Nagpur'
  },
  {
    id: 'dhawan',
    name: 'Dhawan Celebrations',
    address: 'Gorewada Ring Road, Nagpur, Maharashtra',
    eventLabel: 'Poolside Luncheon & Reception Venue',
    guidance: 'Poolside lawn for Saturday midday luncheon (12:00 PM) & illuminated grand banquet for the evening reception (8:00 PM). Valet parking on site.',
    mapsUrl: 'https://maps.google.com/?q=Dhawan+Celebrations,+Gorewada+Ring+Road,+Nagpur',
    appleMapsUrl: 'https://maps.apple.com/?q=Dhawan+Celebrations,+Gorewada+Ring+Road,+Nagpur'
  }
];

export default function VenuesSection({ onCopyToast }) {
  return (
    <section 
      id="venues" 
      className="py-16 px-4 sm:px-6 max-w-xl mx-auto space-y-12"
      aria-label="Venues and Directions"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-terracotta-muted font-medium">
          Navigation &amp; Logistics
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-ink-plum tracking-tight">
          Venue Locations
        </h2>
        <p className="font-sans text-xs sm:text-sm text-ink-plum/70 max-w-md mx-auto">
          Clear navigation, geocoded directions, and offline-safe addresses for both celebration destinations.
        </p>
      </div>

      {/* Venues Grid / Cards */}
      <div className="space-y-10">
        {VENUES_DATA.map((venue) => (
          <VenueCard 
            key={venue.id} 
            venue={venue} 
            onCopyToast={onCopyToast} 
          />
        ))}
      </div>

      {/* Offline Safety Assurance Note (§7 PRD) */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-ivory-soft/60 border border-gold-hairline/25 text-xs font-sans text-ink-plum/70">
        <ShieldCheck className="w-5 h-5 text-gold-hairline shrink-0" />
        <p>
          <strong>Offline Ready:</strong> All map links use direct deep-links that work even if cell reception fluctuates at the venue. Take a screenshot or scan the QR code to save offline.
        </p>
      </div>
    </section>
  );
}
