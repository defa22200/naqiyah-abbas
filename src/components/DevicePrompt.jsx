import React, { useState, useEffect } from 'react';
import { Smartphone, X } from 'lucide-react';

/**
 * DevicePrompt — Displays an elegant luxury banner on tablets, laptops, and desktops
 * recommending the phone for the best physical touch & motion experience.
 */
export default function DevicePrompt() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('wedding:device-prompt-dismissed') === 'true') {
        return;
      }
    } catch (e) {}

    const checkDevice = () => {
      // Screens >= 768px (tablets, iPads, laptops, desktops)
      const isTabletOrLaptop = window.innerWidth >= 768;
      setIsVisible(isTabletOrLaptop);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem('wedding:device-prompt-dismissed', 'true');
    } catch (e) {}
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Device experience recommendation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none max-w-[92vw] sm:max-w-md animate-fade-in"
    >
      <div className="flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/95 text-ink-deep shadow-[0_12px_36px_rgba(30,15,20,0.25)] border border-[#CBB084]/80 backdrop-blur-md">
        <div className="w-8 h-8 rounded-full bg-[#CBB084]/20 flex items-center justify-center shrink-0 text-[#9A7228]">
          <Smartphone className="w-4 h-4" />
        </div>
        <div className="text-left pr-1">
          <p className="font-serif text-xs sm:text-sm font-semibold text-ink-deep leading-snug tracking-wide">
            Designed For Mobile Experience
          </p>
          <p className="font-sans text-[10px] sm:text-[11px] text-ink-deep/75 leading-tight">
            For the best interactive animations, music &amp; full immersion, view on a phone.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1.5 rounded-full text-ink-deep/60 hover:text-ink-deep hover:bg-[#CBB084]/20 transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss recommendation"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
