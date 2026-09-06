import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MinimalFloralBackground — Seamless Multiphase Atmospheric Canvas (MotionSites.ai Architecture)
 * Flawlessly cross-fades between high-resolution bespoke generated 9:16 watercolor environments
 * representing the narrative phases: Dawn Rose, Sunlit Poolside Garden, and Royal Midnight Starlight.
 * 
 * Specifically engineered for mobile viewports (100dvh) with zero clipping, zero white boxes,
 * and zero jagged cutoffs.
 */
export default function MinimalFloralBackground({ lightStage = 'dawn' }) {
  // Determine current active background image
  const getPhaseImage = () => {
    switch (lightStage) {
      case 'midday':
      case 'celebration':
      case 'celebration-of-love':
        return '/images/bg_phase_garden.jpg';
      case 'reception':
      case 'verse':
        return '/images/bg_phase_midnight.jpg';
      case 'dawn':
      case 'nikah':
      default:
        return '/images/bg_phase_dawn.jpg';
    }
  };

  const isDarkPhase = lightStage === 'reception' || lightStage === 'verse';
  const activeSrc = getPhaseImage();

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 w-full h-[100dvh] pointer-events-none -z-20 overflow-hidden select-none"
    >
      {/* 1. Multiphase Atmospheric Wallpaper Crossfade */}
      <AnimatePresence mode="popLayout">
        <motion.div 
          key={activeSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: isDarkPhase ? 0.96 : 0.88 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={activeSrc} 
            alt="" 
            className={`w-full h-full object-cover object-top sm:object-center transition-all duration-1000 ${
              isDarkPhase ? 'brightness-105 contrast-105' : 'filter saturate-100 contrast-100'
            }`}
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Delicate Luxury Ambient Vignette (ensures flawless card contrast on all mobile screens) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isDarkPhase 
            ? 'bg-gradient-to-b from-[#1E141C]/40 via-transparent to-[#160E15]/60' 
            : 'bg-gradient-to-b from-[#FAF6F0]/30 via-transparent to-[#F4EDE1]/40'
        }`}
      />

      {/* 3. Preload all phase wallpapers for instantaneous zero-latency transitions */}
      <div className="hidden" aria-hidden="true">
        <img src="/images/bg_phase_dawn.jpg" alt="" />
        <img src="/images/bg_phase_garden.jpg" alt="" />
        <img src="/images/bg_phase_midnight.jpg" alt="" />
      </div>
    </div>
  );
}
