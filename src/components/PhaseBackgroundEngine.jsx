import React, { useEffect, useRef } from 'react';

/**
 * PhaseBackgroundEngine (PRD §6.3)
 * Absorbs AmbientLightCanvas & MinimalFloralBackground into a single, high-performance engine.
 * 
 * - All 6 wallpapers are permanently mounted to eliminate re-decode flicker (B5).
 * - Opacity transitions use valid duration-[1600ms] (B3).
 * - Monotonic stage progression: dawn -> blush -> midday -> midnight -> verse -> blessing.
 * - Floating golden dust motes canvas with devicePixelRatio clamping (DPR <= 2).
 */
const WALLPAPERS = [
  { stage: 'dawn', src: '/images/bg_phase_dawn.jpg', tint: 'from-amber-100/20 to-transparent' },
  { stage: 'blush', src: '/images/bg_phase_blush.jpg', tint: 'from-rose-200/25 via-transparent to-terracotta-soft/20' },
  { stage: 'midday', src: '/images/bg_phase_garden.jpg', tint: 'from-amber-200/20 via-transparent to-sage-light/25' },
  { stage: 'midnight', src: '/images/bg_phase_midnight.jpg', tint: 'from-[#1A1118]/60 via-transparent to-[#120B10]/80' },
  { stage: 'verse', src: '/images/bg_phase_verse.jpg', tint: 'from-[#140C12]/80 via-transparent to-[#0B0609]/95' },
  { stage: 'blessing', src: '/images/bg_phase_blessing.jpg', tint: 'from-amber-300/20 via-transparent to-amber-100/30' }
];

export default function PhaseBackgroundEngine({ stage = 'dawn' }) {
  const canvasRef = useRef(null);

  // Subtle floating golden dust motes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const handleResize = () => {
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const particleCount = window.innerWidth < 768 ? 16 : 26;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: (Math.random() * 1.5 + 0.6) * dpr,
      vx: (Math.random() - 0.5) * 0.15 * dpr,
      vy: (-Math.random() * 0.2 - 0.08) * dpr,
      alpha: Math.random() * 0.35 + 0.1,
      baseAlpha: Math.random() * 0.35 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    let isPaused = false;

    const handleVisibility = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isPaused) {
        t += 0.01;
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha = p.baseAlpha + Math.sin(t + p.phase) * 0.12;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 166, 107, ${Math.max(0, p.alpha)})`;
          ctx.fill();
        });
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const isDark = stage === 'midnight' || stage === 'verse';

  return (
    <aside 
      aria-hidden="true" 
      className="fixed inset-0 w-full h-[100dvh] pointer-events-none -z-30 overflow-hidden select-none"
    >
      {/* 1. Permanently Mounted Wallpapers Stack (Zero Re-decode Flicker) */}
      {WALLPAPERS.map((wp) => {
        const isActive = wp.stage === stage;
        return (
          <div
            key={wp.stage}
            className="absolute inset-0 w-full h-full transition-opacity duration-[1600ms] ease-in-out"
            style={{
              opacity: isActive ? 1 : 0,
              willChange: 'opacity'
            }}
          >
            <img
              src={wp.src}
              alt=""
              className="w-full h-full object-cover object-top sm:object-center"
              loading="eager"
            />
            {/* Per-stage subtle ambient tint overlay */}
            <div className={`absolute inset-0 bg-gradient-to-b ${wp.tint} pointer-events-none`} />
          </div>
        );
      })}

      {/* 2. Global Ambient Atmospheric Gradient (Smoothly shifts per stage) */}
      <div 
        className={`absolute inset-0 transition-colors duration-[1800ms] ease-out pointer-events-none ${
          isDark 
            ? 'bg-[#150D13]/40' 
            : 'bg-transparent'
        }`}
      />

      {/* 3. Subtle Floating Golden Stardust Motes */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-60 z-10" 
      />
    </aside>
  );
}
