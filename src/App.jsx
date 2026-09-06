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
import RoyalEnvelopeIntro from './components/RoyalEnvelopeIntro';
import AmbientLightCanvas from './components/AmbientLightCanvas';
import KeepsakeModal from './components/KeepsakeModal';
import QrCodeModal from './components/QrCodeModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [lightStage, setLightStage] = useState('dawn'); // 'dawn' | 'nikah' | 'midday' | 'reception' | 'verse'
  const [isKeepsakeOpen, setIsKeepsakeOpen] = useState(false);
  const [selectedQrEvent, setSelectedQrEvent] = useState(null);
  const [musicTrigger, setMusicTrigger] = useState(false);

  const handleEnvelopeOpen = () => {
    setMusicTrigger(true);
  };

  // Section Observer for buttery smooth "A Day, in Light" and active navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -35% 0px',
      threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);

          // Map sections to the PRD "A Day, in Light" motif
          if (id === 'invocation' || id === 'hero' || id === 'lineage') {
            setLightStage('dawn');
          } else if (id === 'nikah') {
            setLightStage('nikah');
          } else if (id === 'celebration-of-love' || id === 'celebration') {
            setLightStage('midday');
          } else if (id === 'reception') {
            setLightStage('reception');
          } else if (id === 'verse') {
            setLightStage('verse');
          } else if (id === 'venues' || id === 'closing') {
            setLightStage('dawn');
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id], article[id]');
    sections.forEach((sec) => sectionObserver.observe(sec));

    return () => sectionObserver.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden text-ink-plum selection:bg-rose-dust selection:text-ink-deep">
      
      {/* 1. Ceremonial Royal Wax Seal Envelope Opener */}
      <RoyalEnvelopeIntro onOpen={handleEnvelopeOpen} />

      {/* 2. Buttery Smooth 5-Stage GPU Background & Ambient Golden Dust Motes */}
      <AmbientLightCanvas lightStage={lightStage} />

      {/* 3. Tactile Handmade Fine Paper Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none paper-texture opacity-35 -z-10"></div>

      {/* 4. Subtle Islamic Jali Watermark Pattern */}
      <div className="fixed inset-0 pointer-events-none jali-watermark opacity-25 -z-10"></div>

      {/* 5. Luxury Real Acoustic Strings Music Player (Sound ON by default, toggleable) */}
      <AudioPlayer autoPlayTrigger={musicTrigger} />

      {/* 6. Persistent Floating Jump Dock Navigation */}
      <HeaderNav activeSection={activeSection} />

      {/* Main Single-Page Invitation Narrative (Authentic Card Content) */}
      <main className="relative z-10 max-w-xl mx-auto px-4 sm:px-6">
        {/* 1. Opening Sacred Invocation (Bismillah & Dua Mubarak) */}
        <InvocationSection />

        {/* 2. Choreographed Hero Names & Tagline */}
        <HeroSection onOpenKeepsake={() => setIsKeepsakeOpen(true)} />

        {/* 3. Host Announcement & Lineage (with 'weds' ligature) */}
        <LineageSection />

        {/* 4. Event Cards (Nikah, Celebration of Love, Reception) */}
        <EventsSection 
          activeStage={lightStage}
          onOpenQr={(event) => setSelectedQrEvent(event)} 
        />

        {/* 5. Venues, Maps & Navigation Guide */}
        <VenuesSection />

        {/* 6. Sacred Quranic Verse (Surah Ar-Rum 30:21) */}
        <VerseSection />

        {/* 7. Compliments & Closing Blessing */}
        <ClosingSection />
      </main>

      {/* Keepsake Save-The-Date Card Modal */}
      <KeepsakeModal 
        isOpen={isKeepsakeOpen} 
        onClose={() => setIsKeepsakeOpen(false)} 
      />

      {/* Venue QR Code Modal */}
      <QrCodeModal 
        event={selectedQrEvent} 
        onClose={() => setSelectedQrEvent(null)} 
      />
    </div>
  );
}
