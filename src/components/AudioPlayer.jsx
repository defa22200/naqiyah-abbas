import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Maximize, Minimize } from 'lucide-react';
import { toggleFullscreen, isFullscreenActive } from '../utils/fullscreen';

export default function AudioPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const audioRef = useRef(null);

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(isFullscreenActive());
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    document.addEventListener('mozfullscreenchange', handleFsChange);
    document.addEventListener('MSFullscreenChange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('mozfullscreenchange', handleFsChange);
      document.removeEventListener('MSFullscreenChange', handleFsChange);
    };
  }, []);

  // Attempt autoplay immediately, and fallback to first document interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const startAudioOnInteraction = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
      window.removeEventListener('click', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
    };

    // Try playing immediately on mount
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {});

    // First touch or click starts music (never forces fullscreen)
    window.addEventListener('click', startAudioOnInteraction, { once: true });
    window.addEventListener('touchstart', startAudioOnInteraction, { once: true });

    return () => {
      window.removeEventListener('click', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
    };
  }, []);

  // When external trigger (e.g. envelope opened) fires
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  }, [autoPlayTrigger]);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  return (
    <aside 
      aria-label="Audio and Fullscreen Controls"
      className="fixed top-4 right-3 sm:top-5 sm:right-4 z-50 select-none flex items-center gap-1.5 sm:gap-2"
    >
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/audio/sufi_oud_long.m4a" type="audio/mp4" />
        <source src="/audio/sufi_oud_long.mp3" type="audio/mpeg" />
      </audio>

      {/* Fullscreen Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFullscreen();
        }}
        className={`flex items-center gap-1.5 py-2 px-2.5 sm:px-3 rounded-full border transition-all duration-300 backdrop-blur-md shadow-md active:scale-95 cursor-pointer ${
          isFullscreen 
            ? 'bg-warm-espresso/95 text-gold-bright border-gold-hairline shadow-gold-hairline/20' 
            : 'bg-warm-cream/95 text-warm-espresso border-gold-hairline/50 hover:border-gold-hairline hover:bg-white'
        }`}
        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? (
          <Minimize className="w-3.5 h-3.5 text-gold-bright" />
        ) : (
          <Maximize className="w-3.5 h-3.5 text-gold-burnished" />
        )}
        <span className="hidden sm:inline text-[10px] font-sans tracking-wider uppercase font-medium">
          {isFullscreen ? 'Exit' : 'Full Screen'}
        </span>
      </button>

      {/* Luxury Music Control Button (Sufiyana Oud) */}
      <button
        onClick={toggleSound}
        className={`group relative flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-md active:scale-95 cursor-pointer ${
          isPlaying 
            ? 'bg-warm-espresso/95 text-gold-bright border-gold-hairline shadow-gold-hairline/20 ring-1 ring-gold-hairline/40' 
            : 'bg-warm-cream/95 text-warm-espresso border-gold-hairline/50 hover:border-gold-hairline hover:bg-white'
        }`}
        aria-label={isPlaying ? "Mute Sufiyana music" : "Play Sufiyana music"}
        title={isPlaying ? "Mute Sufiyana music" : "Play Sufiyana music"}
      >
        {isPlaying ? (
          <>
            <Music className="w-3.5 h-3.5 text-gold-bright" />
            {/* Live equalizer wave bars */}
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-gold-bright rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2"></span>
              <span className="w-0.5 bg-gold-bright rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3.5"></span>
              <span className="w-0.5 bg-gold-bright rounded-full animate-[pulse_1.1s_ease-in-out_infinite] h-1.5"></span>
              <span className="w-0.5 bg-gold-bright rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5"></span>
            </div>
            <span className="text-[10px] font-sans tracking-wider uppercase pl-0.5 text-gold-pale font-medium">
              Mute
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity text-terracotta" />
            <span className="text-[10px] font-sans tracking-wider uppercase font-medium">
              Music Off
            </span>
          </>
        )}
      </button>
    </aside>
  );
}
