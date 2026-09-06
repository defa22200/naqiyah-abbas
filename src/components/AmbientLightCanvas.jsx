import React, { useEffect, useRef } from 'react';

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

    // Subtle, gentle floating golden dust motes
    const particleCount = window.innerWidth < 768 ? 18 : 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.2 - 0.08,
      alpha: Math.random() * 0.35 + 0.1,
      baseAlpha: Math.random() * 0.35 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const render = () => {
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

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-30 overflow-hidden">
      {/* 1. Dawn Ivory & Soft Blush */}
      <div 
        className="absolute inset-0 transition-opacity duration-1800 ease-out"
        style={{
          opacity: lightStage === 'dawn' ? 1 : 0,
          background: 'radial-gradient(circle at 50% 15%, #FFFDF9 0%, #FBF6EF 55%, #F5ECE0 100%)'
        }}
      />

      {/* 2. Nikah Twilight Dusk */}
      <div 
        className="absolute inset-0 transition-opacity duration-1800 ease-out"
        style={{
          opacity: lightStage === 'nikah' ? 1 : 0,
          background: 'radial-gradient(circle at 50% 35%, #FFF5F0 0%, #F8E7E0 50%, #ECD6CD 100%)'
        }}
      />

      {/* 3. Celebration of Love Midday Poolside */}
      <div 
        className="absolute inset-0 transition-opacity duration-1800 ease-out"
        style={{
          opacity: lightStage === 'midday' ? 1 : 0,
          background: 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F5F8F4 50%, #E5ECE8 100%)'
        }}
      />

      {/* 4. Reception Nightfall / Royal Ink-Plum */}
      <div 
        className="absolute inset-0 transition-opacity duration-1800 ease-out"
        style={{
          opacity: lightStage === 'reception' ? 1 : 0,
          background: 'radial-gradient(circle at 50% 30%, #3D2E37 0%, #2D2027 60%, #1F151B 100%)'
        }}
      />

      {/* 5. Sacred Verse / Quiet Stillness */}
      <div 
        className="absolute inset-0 transition-opacity duration-1800 ease-out"
        style={{
          opacity: lightStage === 'verse' ? 1 : 0,
          background: 'radial-gradient(circle at 50% 50%, #2E2228 0%, #21171C 70%, #150E12 100%)'
        }}
      />

      {/* Subtle Floating Dust Motes */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
    </div>
  );
}
