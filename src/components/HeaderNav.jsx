import React, { useState, useEffect } from 'react';
import { Compass, X, MapPin, Sparkles } from 'lucide-react';
import { scrollTo as lenisScrollTo } from '../lib/smoothScroll';

export default function HeaderNav({ activeSection }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after leaving the hero beat (~320px)
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleNavClick = (id) => {
    lenisScrollTo(`#${id}`, { offset: -30 });
  };

  const navItems = [
    { id: 'nikah', label: 'Nikah' },
    { id: 'celebration', label: 'Celebration' },
    { id: 'reception', label: 'Reception' },
    { id: 'venues', label: 'Venues', icon: MapPin },
  ];

  return (
    <nav 
      aria-label="Quick Navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out"
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-ink-plum/90 text-ivory text-xs font-medium border border-gold-hairline/50 shadow-xl backdrop-blur-md active:scale-95 transition-transform"
          aria-label="Expand Quick Navigation"
        >
          <Compass className="w-3.5 h-3.5 text-gold-bright animate-spin-slow" />
          <span>Quick Itinerary</span>
        </button>
      ) : (
        <div className="flex items-center gap-1.5 p-1.5 bg-ink-plum/90 text-ivory rounded-full shadow-2xl backdrop-blur-md border border-gold-hairline/40 max-w-[95vw]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 whitespace-nowrap flex items-center gap-1 ${
                  isActive
                    ? 'bg-gold-hairline text-ink-plum font-semibold shadow-sm'
                    : 'text-ivory/80 hover:text-ivory hover:bg-white/10'
                }`}
              >
                {item.icon && <item.icon className="w-3 h-3" />}
                {item.label}
              </button>
            );
          })}

          <div className="w-px h-4 bg-white/20 mx-0.5"></div>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-full text-ivory/60 hover:text-ivory hover:bg-white/10 transition-colors"
            aria-label="Minimize navigation"
            title="Minimize navigation"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </nav>
  );
}
