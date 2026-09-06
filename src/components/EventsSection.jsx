import React from 'react';
import EventCard from './EventCard';
import { EVENTS_DATA, downloadIcsFile } from '../utils/calendar';
import { Calendar, Sun, Moon, Sparkles } from 'lucide-react';

export default function EventsSection({ onOpenQr, onCopyToast }) {
  return (
    <section 
      id="events" 
      className="py-16 px-4 sm:px-6 max-w-xl mx-auto space-y-16"
      aria-label="Wedding Celebrations Schedule"
    >
      {/* Section Header */}
      <div className="text-center space-y-3">
        <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-terracotta-muted font-medium">
          The Wedding Itinerary
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-ink-plum tracking-tight">
          Celebration Timeline
        </h2>
        <p className="font-sans text-xs sm:text-sm text-ink-plum/70 max-w-sm mx-auto">
          Three celebrations of love and togetherness over two memorable days in Nagpur.
        </p>
      </div>

      {/* EVENT 1: NIKAH */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3 text-terracotta-dark text-xs font-sans font-medium">
          <Moon className="w-3.5 h-3.5" />
          <span>Twilight Gathering · Friday Evening</span>
        </div>
        <EventCard 
          event={EVENTS_DATA[0]} 
          theme="nikah" 
          onOpenQr={onOpenQr} 
          onCopyToast={onCopyToast} 
        />
      </div>

      {/* Transitional Light Beam: From Friday Night to Saturday Midday */}
      <div className="flex flex-col items-center justify-center py-2 text-gold-hairline/70 space-y-2">
        <span className="h-10 w-px bg-gradient-to-b from-rose-dust to-sage"></span>
        <span className="text-xs font-sans tracking-[0.2em] uppercase text-sage-deep/80 font-medium">
          Next Day
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-sage to-transparent"></span>
      </div>

      {/* EVENT 2: CELEBRATION OF LOVE */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3 text-sage-deep text-xs font-sans font-medium">
          <Sun className="w-3.5 h-3.5" />
          <span>Midday Sunlit Poolside · Saturday Afternoon</span>
        </div>
        <EventCard 
          event={EVENTS_DATA[1]} 
          theme="celebration" 
          onOpenQr={onOpenQr} 
          onCopyToast={onCopyToast} 
        />
      </div>

      {/* Transitional Light Beam: Midday into Grand Evening */}
      <div className="flex flex-col items-center justify-center py-2 text-gold-hairline/70 space-y-2">
        <span className="h-10 w-px bg-gradient-to-b from-sage to-gold-hairline"></span>
        <span className="text-xs font-sans tracking-[0.2em] uppercase text-gold-bright/80 font-medium">
          Nightfall
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-gold-hairline to-ink-plum"></span>
      </div>

      {/* EVENT 3: RECEPTION */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3 text-gold-bright text-xs font-sans font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Evening Grandeur · Saturday Night</span>
        </div>
        <EventCard 
          event={EVENTS_DATA[2]} 
          theme="reception" 
          onOpenQr={onOpenQr} 
          onCopyToast={onCopyToast} 
        />
      </div>

      {/* Complete Weekend Calendar Action */}
      <div className="p-6 rounded-2xl bg-ivory-soft/80 border border-gold-hairline/30 text-center shadow-soft-float">
        <p className="font-serif text-lg text-ink-plum mb-2">
          Keep the celebration in your calendar
        </p>
        <p className="font-sans text-xs text-ink-plum/65 mb-4 max-w-sm mx-auto">
          Add all three events (Nikah, Poolside Luncheon &amp; Reception) directly to your mobile calendar with exact timings and venue locations.
        </p>
        <button
          onClick={() => downloadIcsFile(EVENTS_DATA)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink-plum text-ivory text-xs sm:text-sm font-medium shadow-md hover:bg-ink-light active:scale-95 transition-all"
        >
          <Calendar className="w-4 h-4 text-gold-hairline" />
          <span>Add Complete Weekend Itinerary (.ics)</span>
        </button>
      </div>

    </section>
  );
}
