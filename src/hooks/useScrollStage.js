import { useState, useEffect, useRef } from 'react';

/**
 * useScrollStage — Monotonic Stage Machine with Hysteresis (PRD §6.2)
 * Ordered stages: dawn -> blush -> midday -> midnight -> verse -> blessing
 * Eliminates whipsawing, image re-mounting, and intersection observer race conditions.
 */
export const STAGES = ['dawn', 'blush', 'midday', 'midnight', 'verse', 'blessing'];

export function useScrollStage() {
  const [currentStage, setCurrentStage] = useState('dawn');
  const [activeSection, setActiveSection] = useState('hero');
  const targetStageRef = useRef('dawn');
  const dwellTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const probeY = scrollY + viewportHeight * 0.45; // Optical center line

      // Find section anchors
      const invocation = document.getElementById('invocation');
      const hero = document.getElementById('hero');
      const lineage = document.getElementById('lineage');
      const nikah = document.getElementById('nikah');
      const celebration = document.getElementById('celebration');
      const reception = document.getElementById('reception');
      const venues = document.getElementById('venues');
      const verse = document.getElementById('verse');
      const closing = document.getElementById('closing');

      let calculatedStage = 'dawn';
      let calculatedSection = 'hero';

      if (closing && probeY >= closing.offsetTop - 120) {
        calculatedStage = 'blessing';
        calculatedSection = 'closing';
      } else if (verse && probeY >= verse.offsetTop - 120) {
        calculatedStage = 'verse';
        calculatedSection = 'verse';
      } else if (venues && probeY >= venues.offsetTop - 120) {
        calculatedStage = 'midnight';
        calculatedSection = 'venues';
      } else if (reception && probeY >= reception.offsetTop - 120) {
        calculatedStage = 'midnight';
        calculatedSection = 'reception';
      } else if (celebration && probeY >= celebration.offsetTop - 120) {
        calculatedStage = 'midday';
        calculatedSection = 'celebration';
      } else if (nikah && probeY >= nikah.offsetTop - 120) {
        calculatedStage = 'blush';
        calculatedSection = 'nikah';
      } else if (lineage && probeY >= lineage.offsetTop - 120) {
        calculatedStage = 'dawn';
        calculatedSection = 'lineage';
      } else if (hero && probeY >= hero.offsetTop - 120) {
        calculatedStage = 'dawn';
        calculatedSection = 'hero';
      } else if (invocation) {
        calculatedStage = 'dawn';
        calculatedSection = 'invocation';
      }

      setActiveSection(calculatedSection);

      // Hysteresis & Dwell debouncing
      if (calculatedStage !== targetStageRef.current) {
        targetStageRef.current = calculatedStage;
        if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
        dwellTimerRef.current = setTimeout(() => {
          setCurrentStage(calculatedStage);
        }, 120); // 120ms stable dwell
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
    };
  }, []);

  return { stage: currentStage, activeSection };
}
