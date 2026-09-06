import React, { useEffect, useRef } from 'react';

/**
 * AmbientLightCanvas:
 * 1. 5 layered full-screen GPU-composited gradients that crossfade with buttery smoothness
 * 2. An ultra-subtle HTML5 canvas rendering floating warm golden dust / light motes (25 particles, 60fps)
 */
export default function AmbientLightCanvas({ lightStage }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Subtle golden light particles
    const particleCount = window.innerWidth < 768 ? 20 : 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.1, // Drifting softly upward
      alpha: Math.random() * 0.4 + 0.1,
      baseAlpha: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = p.baseAlpha + Math.sin(t + p.phase) * 0.15;

        // Wrap around smoothly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft glowing gold mote
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 166, 107, ${Math.max(0, p.alpha)})`;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
      {/* Stage 1: Dawn / Warm Ivory & Rose Dust */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: lightStage === 'dawn' ? 1 : 0,
          background: 'radial-gradient(circle at 50% 15%, #FFFDF8 0%, #FBF6EF 55%, #F4EDE1 100%)'
        }}
      />

      {/* Stage 2: Nikah Twilight Dusk */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: lightStage === 'nikah' ? 1 : 0,
          background: 'radial-gradient(circle at 50% 35%, #FFF3EE 0%, #F7E4DE 45%, #EBD2CA 100%)'
        }}
      />

      {/* Stage 3: Celebration of Love Midday Poolside */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: lightStage === 'midday' ? 1 : 0,
          background: 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F3F8F2 50%, #E2EDE9 100%)'
        }}
      />

      {/* Stage 4: Reception Night / Royal Ink-Plum & Starlight */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: lightStage === 'reception' ? 1 : 0,
          background: 'radial-gradient(circle at 50% 30%, #46343E 0%, #34262E 55%, #241A20 100%)'
        }}
      />

      {/* Stage 5: Sacred Verse / Quiet Stillness */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: lightStage === 'verse' ? 1 : 0,
          background: 'radial-gradient(circle at 50% 50%, #3B2D35 0%, #2A1F25 70%, #1D1519 100%)'
        }}
      />

      {/* Subtle Floating Golden Dust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
    </div>
  );
}
