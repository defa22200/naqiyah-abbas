import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

export default function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleSound = () => {
    const active = ambientAudio.toggle();
    setIsPlaying(active);
  };

  useEffect(() => {
    // Show polite tooltip briefly on first load
    const timer = setTimeout(() => setShowTooltip(true), 2500);
    const hideTimer = setTimeout(() => setShowTooltip(false), 7500);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3">
      {/* Gentle helper tooltip */}
      {showTooltip && !isPlaying && (
        <div 
          role="status"
          className="hidden sm:flex items-center gap-2 bg-ink-plum/90 text-ivory text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-gold-hairline/30 animate-fade-in transition-all"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-bright animate-ping"></span>
          <span>Tap for ambient soundscape</span>
        </div>
      )}

      <button
        onClick={toggleSound}
        className={`group relative flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 backdrop-blur-md shadow-md active:scale-95 ${
          isPlaying 
            ? 'bg-ink-plum text-gold-bright border-gold-hairline shadow-gold-hairline/20' 
            : 'bg-ivory/80 text-ink-plum border-gold-hairline/40 hover:border-gold-hairline hover:bg-ivory'
        }`}
        aria-label={isPlaying ? "Mute ambient audio" : "Play sacred ambient soundscape"}
        title={isPlaying ? "Mute ambient audio" : "Play sacred ambient soundscape"}
      >
        {isPlaying ? (
          <div className="flex items-center gap-1">
            <Volume2 className="w-4 h-4 text-gold-bright" />
            {/* Visualizer wave bars */}
            <div className="flex items-end gap-0.5 h-3 ml-0.5">
              <span className="w-0.5 bg-gold-bright rounded-full animate-[pulse_1s_ease-in-out_infinite] h-2"></span>
              <span className="w-0.5 bg-gold-bright rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-3"></span>
              <span className="w-0.5 bg-gold-bright rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-1.5"></span>
            </div>
          </div>
        ) : (
          <VolumeX className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
        )}

        {/* Halo glow when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-gold-hairline/60 animate-ping pointer-events-none opacity-40"></span>
        )}
      </button>
    </div>
  );
}
