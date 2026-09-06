import React, { useState, useEffect } from 'react';
import InvocationSection from './components/InvocationSection';
import HeroSection from './components/HeroSection';
import LineageSection from './components/LineageSection';
import EventsSection from './components/EventsSection';
import VenuesSection from './components/VenuesSection';
import InteractiveBlessings from './components/InteractiveBlessings';
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
  const [toastMessage, setToastMessage] = useState(null);
  const [musicTrigger, setMusicTrigger] = useState(false);

  // Show a non-intrusive toast alert
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleEnvelopeOpen = () => {
    setMusicTrigger(true);
    showToast('Welcome to the wedding celebrations of Naqiyah & Abbas ✦');
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
          } else if (id === 'blessings' || id === 'venues' || id === 'closing') {
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

      {/* 5. Luxury Real Acoustic Strings Music Player */}
      <AudioPlayer autoPlayTrigger={musicTrigger} />

      {/* 6. Persistent Floating Jump Dock Navigation */}
      <HeaderNav activeSection={activeSection} />

      {/* Main Single-Page Invitation Narrative */}
      <main className="relative z-10 max-w-xl mx-auto px-4 sm:px-6">
        {/* 1. Opening Sacred Invocation (Bismillah & Dua Mubarak) */}
        <InvocationSection />

        {/* 2. Choreographed Hero Names & Tagline */}
        <HeroSection onOpenKeepsake={() => setIsKeepsakeOpen(true)} />

        {/* 3. Host Announcement & Lineage (with 'weds' ligature) */}
        <LineageSection />

        {/* 4. Event Cards (Nikah, Celebration of Love, Reception with 3D Tilt) */}
        <EventsSection 
          activeStage={lightStage}
          onOpenQr={(event) => setSelectedQrEvent(event)} 
          onCopyToast={showToast} 
        />

        {/* 5. Venues, Maps & Navigation Guide */}
        <VenuesSection onCopyToast={showToast} />

        {/* 6. Interactive Guest Blessings & Duas Wall */}
        <InteractiveBlessings onToast={showToast} />

        {/* 7. Sacred Quranic Verse (Surah Ar-Rum 30:21) */}
        <VerseSection />

        {/* 8. Compliments & Closing Blessing */}
        <ClosingSection />
      </main>

      {/* Easter Egg Modal: Keepsake Save-The-Date Card */}
      <KeepsakeModal 
        isOpen={isKeepsakeOpen} 
        onClose={() => setIsKeepsakeOpen(false)} 
      />

      {/* Venue QR Code Modal */}
      <QrCodeModal 
        event={selectedQrEvent} 
        onClose={() => setSelectedQrEvent(null)} 
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div 
          role="alert"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-ink-plum/95 text-ivory text-xs font-medium shadow-2xl border border-gold-hairline/40 backdrop-blur-md animate-fade-in flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-gold-bright animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
