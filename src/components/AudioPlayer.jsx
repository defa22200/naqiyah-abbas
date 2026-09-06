import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

export default function AudioPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy prevented immediate playback until user interaction
      });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log('Playback error:', e);
      });
    }
  };

  return (
    <aside 
      aria-label="Wedding Music Player"
      className="fixed top-5 right-4 z-50 flex items-center gap-2 select-none"
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

      {/* Expanded Track Information Card */}
      {isExpanded && (
        <div 
          className="hidden sm:flex flex-col p-2.5 px-3 rounded-2xl bg-ink-plum/90 text-ivory border border-gold-hairline/40 shadow-xl backdrop-blur-md animate-fade-in text-left text-xs space-y-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-serif italic text-gold-bright text-sm leading-tight">
                Air on the G String
              </p>
              <p className="text-[10px] text-ivory/60 font-sans">
                Acoustic Strings Quartet
              </p>
            </div>
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-full bg-gold-hairline text-ink-deep hover:bg-gold-bright transition-colors"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-white/10">
            <Volume2 className="w-3 h-3 text-gold-hairline shrink-0" />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))} 
              className="w-20 h-1 accent-gold-hairline bg-white/20 rounded-lg cursor-pointer"
              aria-label="Volume slider"
            />
          </div>
        </div>
      )}

      {/* Floating Main Music Pill Button */}
      <button
        onClick={togglePlay}
        onMouseEnter={() => setIsExpanded(true)}
        className={`group relative flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-lg active:scale-95 cursor-pointer ${
          isPlaying 
            ? 'bg-ink-plum/95 text-gold-bright border-gold-hairline shadow-gold-hairline/25 ring-1 ring-gold-hairline/40' 
            : 'bg-ivory/90 text-ink-plum border-gold-hairline/40 hover:border-gold-hairline hover:bg-ivory'
        }`}
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        title={isPlaying ? "Pause wedding strings" : "Play wedding strings"}
      >
        {isPlaying ? (
          <>
            <Music className="w-3.5 h-3.5 text-gold-bright animate-bounce" />
            {/* Visualizer Wave Bars */}
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-gold-bright rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2"></span>
              <span className="w-0.5 bg-gold-bright rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3.5"></span>
              <span className="w-0.5 bg-gold-bright rounded-full animate-[pulse_1.1s_ease-in-out_infinite] h-1.5"></span>
              <span className="w-0.5 bg-gold-bright rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5"></span>
            </div>
            <span className="hidden sm:inline text-[11px] font-sans tracking-wide text-ivory/90 pl-0.5">
              Playing
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="text-[11px] font-sans tracking-wide opacity-80">
              Music
            </span>
          </>
        )}
      </button>
    </aside>
  );
}
