import React, { useState, useEffect } from 'react';
import InvocationSection from './components/InvocationSection';
import HeroSection from './components/HeroSection';
import LineageSection from './components/LineageSection';
import EventsSection from './components/EventsSection';
import VenuesSection from './components/VenuesSection';
import VerseSection from './components/VerseSection';
import ClosingSection from './components/ClosingSection';
import HeaderNav from './components/HeaderNav';
import AudioPlayer from './components/AudioPlayer';
import EnvelopeCeremony from './components/EnvelopeCeremony';
import PhaseBackgroundEngine from './components/PhaseBackgroundEngine';
import FlowerRainfall from './components/FlowerRainfall';
import Spatial3DMotionCanvas from './components/Spatial3DMotionCanvas';
import KeepsakeModal from './components/KeepsakeModal';
import QrCodeModal from './components/QrCodeModal';
import { useScrollStage } from './hooks/useScrollStage';
import { initSmoothScroll, getLenis } from './lib/smoothScroll';

export default function App() {
  const { stage, activeSection } = useScrollStage();
  const [isCeremonyDone, setIsCeremonyDone] = useState(false);
  const [isKeepsakeOpen, setIsKeepsakeOpen] = useState(false);
  const [selectedQrEvent, setSelectedQrEvent] = useState(null);
  const [musicTrigger, setMusicTrigger] = useState(false);

  // Handle ceremony completion
  const handleCeremonyComplete = () => {
    setIsCeremonyDone(true);
    setMusicTrigger(true);
    initSmoothScroll();
  };

  // Lock/resume Lenis during modal popups
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (isKeepsakeOpen || selectedQrEvent) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isKeepsakeOpen, selectedQrEvent]);

  // Update browser chrome theme-color to match monotonic lighting stage (Light -> Dark -> Golden)
  useEffect(() => {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) return;
    if (!isCeremonyDone) {
      metaTheme.setAttribute('content', '#FAF4EA');
      return;
    }
    const colors = {
      dawn: '#FBF6EF',
      blush: '#FDF2F4',
      midday: '#F4F7F2',
      midnight: '#1B0B14',
      verse: '#FBF4E4',
      blessing: '#F7E9D0'
    };
    metaTheme.setAttribute('content', colors[stage] || '#FBF6EF');
  }, [stage, isCeremonyDone]);

  return (
    <div className="min-h-screen relative overflow-x-clip text-ink-deep selection:bg-rose-dust selection:text-ink-deep">
      
      {/* 1. Act 0: 3D Royal Wax Seal Envelope Ceremony (z-[60]) */}
      {!isCeremonyDone && (
        <EnvelopeCeremony onComplete={handleCeremonyComplete} />
      )}

      {/* 2. Seamless 6-Phase Multiphase Background Engine (z-[-30]) */}
      <PhaseBackgroundEngine stage={stage} />

      {/* 3. Tactile Handmade Paper & Jali Texture Overlays (z-[-15]) */}
      <div className="fixed inset-0 pointer-events-none paper-texture opacity-25 -z-15"></div>
      <div className="fixed inset-0 pointer-events-none jali-watermark opacity-15 -z-15"></div>

      {/* 4. Three.js Spatial 3D Rings & Parametric Spline Ribbon (z-0, lazy fade) */}
      <Spatial3DMotionCanvas stage={stage} isReady={isCeremonyDone} />

      {/* 5. Main Single-Page Scrollytelling Narrative (z-10) */}
      <main className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12">
        {/* 1. Opening Sacred Invocation (Bismillah & Dua Mubarak) */}
        <InvocationSection />

        {/* 2. Choreographed Hero Names & Tagline (tap monogram -> keepsake) */}
        <HeroSection onOpenKeepsake={() => setIsKeepsakeOpen(true)} />

        {/* 3. Host Announcement & Lineage */}
        <LineageSection />

        {/* 4. Event Cards (Nikah, Celebration of Love, Reception) */}
        <EventsSection 
          activeStage={stage}
          onOpenQr={(event) => setSelectedQrEvent(event)} 
        />

        {/* 5. Venues, Maps & Navigation Guide */}
        <VenuesSection />

        {/* 6. Sacred Quranic Verse (Surah Ar-Rum 30:21) */}
        <VerseSection />

        {/* 7. Compliments, Countdown Badge & Closing Blessing */}
        <ClosingSection />
      </main>

      {/* 6. Velocity-Reactive Petal Rainfall Effect (z-20) */}
      <FlowerRainfall stage={stage} />

      {/* 7. Persistent Floating Jump Dock Navigation (z-40) */}
      <HeaderNav activeSection={activeSection} />

      {/* 8. Luxury Sufiyana Oud Instrumental Music Player (z-50) */}
      <AudioPlayer autoPlayTrigger={musicTrigger} />

      {/* 9. Keepsake Save-The-Date Card Modal (z-50) */}
      <KeepsakeModal 
        isOpen={isKeepsakeOpen} 
        onClose={() => setIsKeepsakeOpen(false)} 
      />

      {/* 10. Venue QR Code Modal (z-50) */}
      <QrCodeModal 
        event={selectedQrEvent} 
        onClose={() => setSelectedQrEvent(null)} 
      />
    </div>
  );
}
