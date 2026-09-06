import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Attempt autoplay immediately, and fallback to first document interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const startAudio = () => {
      audio.play().then(() => {
        setIsPlaying(true);
        // Remove listener once played
        window.removeEventListener('click', startAudio);
        window.removeEventListener('touchstart', startAudio);
      }).catch(() => {
        // Will wait for next user touch/click
      });
    };

    // Try playing immediately
    startAudio();

    // Fallback: unlock on first touch or click
    window.addEventListener('click', startAudio, { once: true });
    window.addEventListener('touchstart', startAudio, { once: true });

    return () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
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
      aria-label="Wedding Music Player"
      className="fixed top-5 right-4 z-50 select-none"
    >
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/audio/wedding_strings.m4a" type="audio/mp4" />
        <source src="/audio/wedding_strings.mp3" type="audio/mpeg" />
      </audio>

      {/* Luxury Music Control Button */}
      <button
        onClick={toggleSound}
        className={`group relative flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-md active:scale-95 cursor-pointer ${
          isPlaying 
            ? 'bg-ink-plum/95 text-gold-bright border-gold-hairline shadow-gold-hairline/20 ring-1 ring-gold-hairline/40' 
            : 'bg-ivory/90 text-ink-plum border-gold-hairline/50 hover:border-gold-hairline hover:bg-ivory'
        }`}
        aria-label={isPlaying ? "Mute wedding music" : "Play wedding music"}
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
