import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';

export default function InteractiveTimeline({ activeStage, onSelectEvent }) {
  const steps = [
    {
      id: 'nikah',
      label: 'Nikah',
      time: 'Fri · After Maghrib',
      venue: 'Hakimi Masjid',
      icon: Moon,
      color: 'text-terracotta-dark',
      bg: 'bg-rose-dust-light/80'
    },
    {
      id: 'celebration-of-love',
      label: 'Celebration of Love',
      time: 'Sat · 12:00 PM',
      venue: 'Dhawan Poolside',
      icon: Sun,
      color: 'text-sage-deep',
      bg: 'bg-sage-mist/80'
    },
    {
      id: 'reception',
      label: 'Reception',
      time: 'Sat · 8:00 PM',
      venue: 'Dhawan Celebrations',
      icon: Sparkles,
      color: 'text-gold-bright',
      bg: 'bg-ink-deep text-gold-bright'
    }
  ];

  return (
    <div className="my-8 px-2">
      <div className="text-center mb-4">
        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-terracotta-dark font-medium">
          ✦ Interactive Celebration Journey ✦
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {steps.map((s) => {
          const isActive = activeStage === s.id;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => onSelectEvent(s.id)}
              className={`p-3 rounded-2xl border text-center transition-all duration-300 active:scale-95 cursor-pointer flex flex-col items-center justify-between min-h-[95px] ${
                isActive
                  ? 'border-gold-hairline shadow-md scale-102 ' + s.bg
                  : 'bg-ivory-soft/70 border-gold-hairline/30 hover:border-gold-hairline/60 hover:bg-ivory'
              }`}
            >
              <Icon className={`w-4 h-4 mb-1 ${s.color}`} />
              <div>
                <p className="font-serif font-semibold text-xs sm:text-sm text-ink-plum leading-tight">
                  {s.label}
                </p>
                <p className="text-[9px] font-sans text-ink-plum/60 mt-0.5 whitespace-nowrap">
                  {s.time}
                </p>
              </div>
              <span className="text-[8px] font-sans text-terracotta-muted mt-1 uppercase tracking-wider">
                {s.venue}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
