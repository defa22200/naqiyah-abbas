import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';

export default function InteractiveTimeline({ activeStage, onSelectEvent }) {
  const steps = [
    {
      id: 'nikah',
      title: 'Nikah',
      time: 'Fri · After Maghrib',
      venue: 'Hakimi Masjid',
      icon: Moon,
      color: 'text-terracotta-dark',
      bg: 'bg-rose-dust-light/80'
    },
    {
      id: 'celebration-of-love',
      title: 'Celebration of Love',
      time: 'Sat · 12:00 PM',
      venue: 'Dhawan Celebrations',
      icon: Sun,
      color: 'text-sage-deep',
      bg: 'bg-sage-mist/80'
    },
    {
      id: 'reception',
      title: 'Reception',
      time: 'Sat · 8:00 PM',
      venue: 'Dhawan Celebrations',
      icon: Sparkles,
      color: 'text-gold-bright',
      bg: 'bg-[#221A15] text-gold-bright'
    }
  ];

  return (
    <div className="my-8 px-1 sm:px-2">
      <div className="text-center mb-4">
        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-terracotta-dark font-medium">
          ✦ Celebration Schedule ✦
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
        {steps.map((s) => {
          const isActive = activeStage === s.id;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => onSelectEvent(s.id)}
              className={`p-2 sm:p-3 rounded-2xl border text-center transition-all duration-300 active:scale-95 cursor-pointer flex flex-col items-center justify-between min-h-[106px] sm:min-h-[114px] overflow-hidden ${
                isActive
                  ? 'border-gold-hairline shadow-md scale-102 ' + s.bg
                  : 'bg-white/80 border-gold-hairline/35 hover:border-gold-hairline/60 hover:bg-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 shrink-0 ${s.color}`} />
              
              <div className="w-full flex-1 flex flex-col items-center justify-center my-0.5">
                <p className="font-serif font-medium text-xs sm:text-sm text-warm-espresso leading-tight text-center">
                  {s.title}
                </p>
                <p className="text-[8.5px] sm:text-[10px] font-sans text-warm-bronze/85 mt-1 leading-tight text-center">
                  {s.time}
                </p>
              </div>

              <span className="text-[7.5px] sm:text-[8.5px] font-sans text-terracotta-muted uppercase tracking-wide font-medium leading-tight text-center max-w-full px-0.5">
                {s.venue}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
