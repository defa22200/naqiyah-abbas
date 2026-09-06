import React from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import InteractiveTimeline from './InteractiveTimeline';
import { EVENTS_DATA, downloadCalendarEvent } from '../utils/calendar';
import { Calendar, Sun, Moon, Sparkles } from 'lucide-react';

export default function EventsSection({ activeStage, onOpenQr }) {
  const scrollToEvent = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0.45, y: 40, scale: 0.96, rotateX: 4 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section 
      id="events" 
      className="py-16 px-4 sm:px-6 max-w-xl mx-auto space-y-14"
      aria-label="Wedding Celebrations Schedule"
    >
      {/* Section Header with 3D Depth Shimmer */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-2.5"
      >
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-ink-deep font-bold">
          The Wedding Itinerary
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-ink-deep tracking-tight font-normal">
          Celebration Timeline
        </h2>
        <p className="font-sans text-xs sm:text-sm text-ink-deep/90 font-medium max-w-sm mx-auto">
          Three sacred celebrations of love and togetherness over two memorable days in Nagpur.
        </p>
      </motion.div>

      {/* Interactive Quick Time Scrubber */}
      <InteractiveTimeline 
        activeStage={activeStage} 
        onSelectEvent={scrollToEvent} 
      />

      {/* 3D PHASE 1: NIKAH */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        className="relative pt-2"
      >
        <div className="flex items-center justify-between mb-3 text-ink-deep text-xs font-sans font-bold px-1">
          <div className="flex items-center gap-2">
            <Moon className="w-3.5 h-3.5 text-ink-deep" />
            <span>Phase I · Twilight Gathering · Friday Evening</span>
          </div>
          <span className="text-xs font-serif italic text-ink-deep font-bold">18 Dec</span>
        </div>
        <EventCard 
          event={EVENTS_DATA[0]} 
          theme="nikah" 
          onOpenQr={onOpenQr} 
        />
      </motion.div>

      {/* Transitional Dynamic Light Beam 1 */}
      <div className="flex flex-col items-center justify-center py-4 text-gold-hairline/70 space-y-2">
        <span className="h-12 w-0.5 bg-gradient-to-b from-rose-dust via-gold-bright/60 to-sage animate-pulse"></span>
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-ink-deep font-bold">
          ✦ Daybreak ✦
        </span>
        <span className="h-12 w-0.5 bg-gradient-to-b from-sage via-gold-bright/60 to-transparent"></span>
      </div>

      {/* 3D PHASE 2: CELEBRATION OF LOVE */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        className="relative"
      >
        <div className="flex items-center justify-between mb-3 text-ink-deep text-xs font-sans font-bold px-1">
          <div className="flex items-center gap-2">
            <Sun className="w-3.5 h-3.5 text-ink-deep" />
            <span>Phase II · Sunlit Poolside · Saturday Afternoon</span>
          </div>
          <span className="text-xs font-serif italic text-ink-deep font-bold">19 Dec</span>
        </div>
        <EventCard 
          event={EVENTS_DATA[1]} 
          theme="celebration" 
          onOpenQr={onOpenQr} 
        />
      </motion.div>

      {/* Transitional Dynamic Light Beam 2 */}
      <div className="flex flex-col items-center justify-center py-4 text-gold-hairline/70 space-y-2">
        <span className="h-12 w-0.5 bg-gradient-to-b from-sage via-gold-bright/70 to-gold-hairline animate-pulse"></span>
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-gold-bright/90 font-semibold">
          ✦ Sunset to Starlight ✦
        </span>
        <span className="h-12 w-0.5 bg-gradient-to-b from-gold-hairline via-gold-bright/60 to-[#221A15]"></span>
      </div>

      {/* 3D PHASE 3: RECEPTION */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        className="relative"
      >
        <div className="flex items-center justify-between mb-3 text-gold-bright text-xs font-sans font-medium px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase III · Starlit Grandeur · Saturday Night</span>
          </div>
          <span className="text-[11px] font-serif italic text-gold-pale/80">19 Dec</span>
        </div>
        <EventCard 
          event={EVENTS_DATA[2]} 
          theme="reception" 
          onOpenQr={onOpenQr} 
        />
      </motion.div>

      {/* Complete Weekend Calendar Action (Dark luxury palette matching Reception) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="p-7 sm:p-8 rounded-3xl bg-[#140C12]/85 border border-[#CBB084]/50 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl space-y-3.5 text-warm-cream"
      >
        <p className="font-serif text-xl sm:text-2xl text-gold-bright font-normal drop-shadow-sm">
          Keep the celebrations in your calendar
        </p>
        <p className="font-sans text-xs sm:text-sm text-gold-pale/90 max-w-sm mx-auto">
          Add all three celebrations with alerts and navigation details directly to your phone.
        </p>
        <button
          onClick={() => downloadCalendarEvent(EVENTS_DATA)}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#2A1822] via-[#3B1F2F] to-[#2A1822] text-gold-bright text-xs sm:text-sm font-medium shadow-lg hover:from-[#351F2C] hover:to-[#462539] active:scale-95 transition-all cursor-pointer border border-[#CBB084]/60"
        >
          <Calendar className="w-4 h-4 text-gold-bright" />
          <span>Add All Celebrations to Calendar</span>
        </button>
      </motion.div>

    </section>
  );
}
