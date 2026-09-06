import React from 'react';
import VenueCard from './VenueCard';

export const VENUES_DATA = [
  {
    id: 'hakimi',
    name: 'Hakimi Masjid',
    address: 'Shanti Nagar, Nagpur, Maharashtra',
    eventLabel: 'Nikah Ceremony Venue',
    mapsUrl: 'https://maps.google.com/?q=Hakimi+Masjid,+Shanti+Nagar,+Nagpur',
    appleMapsUrl: 'https://maps.apple.com/?q=Hakimi+Masjid,+Shanti+Nagar,+Nagpur'
  },
  {
    id: 'dhawan',
    name: 'Dhawan Celebrations',
    address: 'Gorewada Ring Road, Nagpur, Maharashtra',
    eventLabel: 'Poolside Luncheon & Reception Venue',
    mapsUrl: 'https://maps.google.com/?q=Dhawan+Celebrations,+Gorewada+Ring+Road,+Nagpur',
    appleMapsUrl: 'https://maps.apple.com/?q=Dhawan+Celebrations,+Gorewada+Ring+Road,+Nagpur'
  }
];

export default function VenuesSection() {
  return (
    <section 
      id="venues" 
      className="py-16 px-4 sm:px-6 max-w-xl mx-auto space-y-12"
      aria-label="Venues and Directions"
    >
      {/* Header (High-contrast for midnight stage) */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-gold-bright font-semibold">
          Navigation &amp; Directions
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-warm-cream tracking-tight font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          Venue Locations
        </h2>
        <p className="font-sans text-xs sm:text-sm text-gold-pale/90 max-w-md mx-auto">
          Geocoded directions and navigation guides for both celebration destinations.
        </p>
      </div>

      {/* Venues Cards */}
      <div className="space-y-10">
        {VENUES_DATA.map((venue) => (
          <VenueCard 
            key={venue.id} 
            venue={venue} 
          />
        ))}
      </div>
    </section>
  );
}
