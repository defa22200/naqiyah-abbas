import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/**
 * MinimalFloralBackground — Multiphase Atmospheric Canvas (MotionSites.ai Architecture)
 * Seamlessly cross-fades between high-resolution bespoke generated watercolor environments
 * representing the narrative phases: Dawn Rose, Sunlit Poolside Garden, and Royal Midnight Starlight.
 */
export default function MinimalFloralBackground({ lightStage = 'dawn' }) {
  const { scrollYProgress } = useScroll();

  // Gentle organic parallax translation
  const topGarlandY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bottomFloralY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  // Determine current active background image
  const getPhaseImage = () => {
    switch (lightStage) {
      case 'midday':
      case 'celebration':
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

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none transition-colors duration-1000"
    >
      {/* 1. Multiphase Atmospheric Wallpaper Crossfade */}
      <AnimatePresence mode="sync">
        <motion.div 
          key={getPhaseImage()}
          initial={{ opacity: 0 }}
          animate={{ opacity: isDarkPhase ? 0.95 : 0.85 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: bgScale }}
          className="absolute inset-0 bg-cover bg-center"
        >
          <img 
            src={getPhaseImage()} 
            alt="" 
            className={`w-full h-full object-cover object-center transition-all duration-1000 ${
              isDarkPhase ? 'brightness-105 contrast-105' : 'filter saturate-95 contrast-100'
            }`}
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Top Arching Floral Garland */}
      <motion.div 
        style={{ y: topGarlandY }}
        animate={{ 
          rotate: [-0.3, 0.3, -0.3],
          transition: { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }}
        className={`absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 w-full max-w-2xl sm:max-w-3xl pointer-events-none transition-opacity duration-1000 ${
          isDarkPhase ? 'opacity-35 mix-blend-screen' : 'opacity-85 mix-blend-multiply'
        }`}
      >
        <img 
          src="/images/floral_garland_trans.png" 
          alt="" 
          className="w-full h-auto object-contain mx-auto filter saturate-90 contrast-95"
          loading="eager"
        />
      </motion.div>

      {/* 3. Bottom Right Floral Corner Accent */}
      <motion.div 
        style={{ y: bottomFloralY }}
        animate={{ 
          rotate: [0.4, -0.4, 0.4],
          transition: { duration: 16, repeat: Infinity, ease: 'easeInOut' }
        }}
        className={`absolute -bottom-8 -right-8 sm:-bottom-10 sm:-right-10 w-64 sm:w-80 pointer-events-none transition-opacity duration-1000 ${
          isDarkPhase ? 'opacity-25 mix-blend-screen' : 'opacity-70 mix-blend-multiply'
        }`}
      >
        <img 
          src="/images/floral_corner_trans.png" 
          alt="" 
          className="w-full h-auto object-contain filter saturate-90 contrast-95"
          loading="lazy"
        />
      </motion.div>

      {/* 4. Bottom Left Floral Corner Accent (Mirrored) */}
      <motion.div 
        style={{ y: bottomFloralY }}
        animate={{ 
          rotate: [-0.4, 0.4, -0.4],
          transition: { duration: 17, repeat: Infinity, ease: 'easeInOut' }
        }}
        className={`absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 w-64 sm:w-80 -scale-x-100 pointer-events-none transition-opacity duration-1000 ${
          isDarkPhase ? 'opacity-25 mix-blend-screen' : 'opacity-60 mix-blend-multiply'
        }`}
      >
        <img 
          src="/images/floral_corner_trans.png" 
          alt="" 
          className="w-full h-auto object-contain filter saturate-85 contrast-95"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}
