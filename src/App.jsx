import React, { useState, useEffect } from 'react';
import InvocationSection from './components/InvocationSection';
import HeroSection from './components/HeroSection';
import LineageSection from './components/LineageSection';
import EventsSection from './components/EventsSection';
import VenuesSection from './components/VenuesSection';
import VerseSection from './components/VerseSection';
import ClosingSection from './components/ClosingSection';
import HeaderNav from './components/HeaderNav';
import AudioAmbience from './components/AudioAmbience';
import KeepsakeModal from './components/KeepsakeModal';
import QrCodeModal from './components/QrCodeModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [lightStage, setLightStage] = useState('dawn'); // 'dawn' | 'nikah' | 'midday' | 'reception' | 'verse'
  const [isKeepsakeOpen, setIsKeepsakeOpen] = useState(false);
  const [selectedQrEvent, setSelectedQrEvent] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Show a non-intrusive toast alert
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Section Observer for "A Day, in Light" and active navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.1
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
          } else if (id === 'verse' || id === 'closing' || id === 'venues') {
            setLightStage(id === 'verse' ? 'verse' : 'dawn');
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id], article[id]');
    sections.forEach((sec) => sectionObserver.observe(sec));

    return () => sectionObserver.disconnect();
  }, []);

  // Compute dynamic backdrop class
  const getBackdropClass = () => {
    switch (lightStage) {
      case 'nikah':
        return 'light-canvas-nikah';
      case 'midday':
        return 'light-canvas-midday';
      case 'reception':
        return 'light-canvas-reception';
      case 'verse':
        return 'light-canvas-verse';
      case 'dawn':
      default:
        return 'light-canvas-dawn';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-canvas ${getBackdropClass()}`}>
      {/* Tactile Fine Paper Texture */}
      <div className="fixed inset-0 pointer-events-none paper-texture opacity-40 z-0"></div>

      {/* Subtle Geometric Jali Watermark Pattern */}
      <div className="fixed inset-0 pointer-events-none jali-watermark opacity-25 z-0"></div>

      {/* Floating Sacred Audio Ambience Controller */}
      <AudioAmbience />

      {/* Persistent Jump Dock Navigation (Appears after hero) */}
      <HeaderNav activeSection={activeSection} />

      {/* Main Single-Page Invitation Experience */}
      <main className="relative z-10 max-w-xl mx-auto px-4 sm:px-6">
        {/* 1. Opening Invocation */}
        <InvocationSection />

        {/* 2. Choreographed Hero Names & Tagline */}
        <HeroSection onOpenKeepsake={() => setIsKeepsakeOpen(true)} />

        {/* 3. Host Announcement & Lineage */}
        <LineageSection />

        {/* 4. Event Cards (Nikah, Celebration of Love, Reception) */}
        <EventsSection 
          onOpenQr={(event) => setSelectedQrEvent(event)} 
          onCopyToast={showToast} 
        />

        {/* 5. Venues, Maps & Navigation Guide */}
        <VenuesSection onCopyToast={showToast} />

        {/* 6. Sacred Quranic Verse (Surah Ar-Rum 30:21) */}
        <VerseSection />

        {/* 7. Compliments, Closing Blessing & Itinerary Export */}
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
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
