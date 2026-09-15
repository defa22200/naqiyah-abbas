import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Maximize, Minimize } from 'lucide-react';
import { enterFullscreen, toggleFullscreen, isFullscreenActive } from '../utils/fullscreen';

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

  // Helper function for silky volume fade-in (starts from current volume, no dip to zero)
  const fadeAudioIn = (audio, targetVol = 0.5, duration = 700) => {
    if (!audio) return;
    const steps = 20;
    const stepTime = duration / steps;
    const stepIncrement = Math.max(0, (targetVol - audio.volume) / steps);
    let currentVol = audio.volume;
    const timer = setInterval(() => {
      currentVol = Math.min(targetVol, currentVol + stepIncrement);
      audio.volume = currentVol;
      if (currentVol >= targetVol) clearInterval(timer);
    }, stepTime);
  };

  // Helper function for smooth volume fade-out
  const fadeAudioOut = (audio, onComplete, duration = 250) => {
    if (!audio) return;
    const startVol = audio.volume;
    const steps = 15;
    const stepTime = duration / steps;
    const stepDecrement = startVol / steps;
    let currentVol = startVol;
    const timer = setInterval(() => {
      currentVol = Math.max(0, currentVol - stepDecrement);
      audio.volume = currentVol;
      if (currentVol <= 0) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, stepTime);
  };

  // Kick off the audio fetch the moment the player mounts so the file is
  // buffered before the seal is ever tapped (avoids stall-then-late-start)
  useEffect(() => {
    try {
      audioRef.current?.load();
    } catch (err) {}
  }, []);

  // Bulletproof start: never throw on unloaded metadata, never lose the
  // tap-gesture unlock, retry once on the next tap if autoplay blocks us.
  // No fade — full volume from the first frame.
  const startMusicNow = () => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    audio.volume = 0.5;
    try {
      if (audio.readyState > 0) audio.currentTime = 0;
    } catch (err) {}
    const p = audio.play();
    if (p && p.then) {
      p.then(() => {
        setIsPlaying(true);
        try {
          if (audio.currentTime > 0.5) audio.currentTime = 0;
        } catch (err) {}
      }).catch(() => {
        const retry = () => {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
        };
        window.addEventListener('pointerdown', retry, { once: true });
      });
    }
  };

  // Start playback the instant the seal is broken (inside tap gesture)
  useEffect(() => {
    window.addEventListener('wedding:card-shown', startMusicNow);
    return () => {
      window.removeEventListener('wedding:card-shown', startMusicNow);
    };
  }, []);

  // External trigger fallback (e.g. from App props)
  useEffect(() => {
    if (autoPlayTrigger) startMusicNow();
  }, [autoPlayTrigger]);

  const toggleSound = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      fadeAudioOut(audio, () => {
        audio.pause();
        setIsPlaying(false);
      }, 200);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        fadeAudioIn(audio, 0.5, 1200);
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
        <source src="/audio/invitation_bgm.m4a" type="audio/mp4" />
        <source src="/audio/invitation_bgm.mp3" type="audio/mpeg" />
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

      {/* Luxury Music Control Button (Tere Bina Flute Instrumental) */}
      <button
        onClick={toggleSound}
        className={`group relative flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-md active:scale-95 cursor-pointer ${
          isPlaying 
            ? 'bg-warm-espresso/95 text-gold-bright border-gold-hairline shadow-gold-hairline/20 ring-1 ring-gold-hairline/40' 
            : 'bg-warm-cream/95 text-warm-espresso border-gold-hairline/50 hover:border-gold-hairline hover:bg-white'
        }`}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        title={isPlaying ? "Mute music" : "Play music"}
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
