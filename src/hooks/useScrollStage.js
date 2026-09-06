import { useState, useEffect, useRef } from 'react';

/**
 * useScrollStage — Stage Machine with Accurate Viewport Probing
 * Ordered stages: dawn -> blush -> midday -> midnight -> verse -> blessing
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
      const probeY = scrollY + viewportHeight * 0.45;

      // Top of page is ALWAYS dawn (Fixes Screenshot 3: "Why Dark?")
      if (scrollY < 250) {
        if (targetStageRef.current !== 'dawn') {
          targetStageRef.current = 'dawn';
          if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
          setCurrentStage('dawn');
        }
        setActiveSection('hero');
        return;
      }

      // Helper for true document coordinates (immune to relative offsetParent)
      const getDocTop = (id) => {
        const el = document.getElementById(id);
        if (!el) return Infinity;
        return el.getBoundingClientRect().top + scrollY;
      };

      const closingTop = getDocTop('closing');
      const verseTop = getDocTop('verse');
      const venuesTop = getDocTop('venues');
      const receptionTop = getDocTop('reception');
      const celebrationTop = getDocTop('celebration');
      const nikahTop = getDocTop('nikah');
      const lineageTop = getDocTop('lineage');
      const heroTop = getDocTop('hero');

      let calculatedStage = 'dawn';
      let calculatedSection = 'hero';

      if (probeY >= closingTop - 120) {
        calculatedStage = 'blessing';
        calculatedSection = 'closing';
      } else if (probeY >= verseTop - 120) {
        calculatedStage = 'verse';
        calculatedSection = 'verse';
      } else if (probeY >= venuesTop - 120) {
        calculatedStage = 'midnight';
        calculatedSection = 'venues';
      } else if (probeY >= receptionTop - 120) {
        calculatedStage = 'midnight';
        calculatedSection = 'reception';
      } else if (probeY >= celebrationTop - 120) {
        calculatedStage = 'midday';
        calculatedSection = 'celebration';
      } else if (probeY >= nikahTop - 120) {
        calculatedStage = 'blush';
        calculatedSection = 'nikah';
      } else if (probeY >= lineageTop - 120) {
        calculatedStage = 'dawn';
        calculatedSection = 'lineage';
      } else if (probeY >= heroTop - 120) {
        calculatedStage = 'dawn';
        calculatedSection = 'hero';
      } else {
        calculatedStage = 'dawn';
        calculatedSection = 'invocation';
      }

      setActiveSection(calculatedSection);

      // Stable debouncing
      if (calculatedStage !== targetStageRef.current) {
        targetStageRef.current = calculatedStage;
        if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
        dwellTimerRef.current = setTimeout(() => {
          setCurrentStage(calculatedStage);
        }, 120);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
    };
  }, []);

  return { stage: currentStage, activeSection };
}
