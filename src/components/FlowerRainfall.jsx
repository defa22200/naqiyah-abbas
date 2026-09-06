import React, { useEffect, useRef } from 'react';

/**
 * FlowerRainfall — Velocity-Reactive Sacred Petal Rainfall (PRD §6.5)
 * Upgrades:
 * - DPR clamped to <= 2 for Android/iOS battery & 60fps performance
 * - Scroll-velocity reactive: fall speed and sway amplify gracefully with scroll
 * - Density auto-gated to avoid obscuring text
 * - Dual rendering: Loads petal sprites (petal_01..04) with procedural fallback
 */
export default function FlowerRainfall({ stage = 'dawn' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    // Track scroll velocity
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity = Math.min(Math.abs(currentY - lastScrollY) * 0.05, 3.5);
      lastScrollY = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Load sprite textures
    const spriteUrls = [
      '/images/petal_01.png',
      '/images/petal_02.png',
      '/images/petal_03.png',
      '/images/petal_04.png'
    ];
    const sprites = spriteUrls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });

    const PETAL_COUNT = window.innerWidth < 640 ? 22 : 36;

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -40 * dpr;
        this.size = (Math.random() * 12 + 10) * dpr;
        this.baseSpeedY = (Math.random() * 0.8 + 0.6) * dpr;
        this.speedX = (Math.random() - 0.5) * 0.3 * dpr;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.02;
        this.tilt = Math.random() * Math.PI;
        this.tiltSpeed = Math.random() * 0.02 + 0.01;
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.swayAmplitude = (Math.random() * 1.6 + 0.8) * dpr;
        this.spriteIndex = Math.floor(Math.random() * sprites.length);
        this.opacity = Math.random() * 0.35 + 0.35;
      }

      update(velocityBoost) {
        this.swayAngle += this.swaySpeed;
        this.x += Math.sin(this.swayAngle) * this.swayAmplitude + this.speedX;
        this.y += this.baseSpeedY + velocityBoost * dpr;
        this.angle += this.angularSpeed * (1 + velocityBoost * 0.5);
        this.tilt += this.tiltSpeed;

        if (this.y > height + 40 * dpr || this.x < -40 * dpr || this.x > width + 40 * dpr) {
          this.reset(false);
        }
      }

      draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);

        const scaleX = Math.cos(this.tilt);
        context.scale(scaleX, 1);
        context.globalAlpha = this.opacity;

        const spr = sprites[this.spriteIndex];
        if (spr && spr.complete && spr.naturalWidth > 0) {
          context.drawImage(spr, -this.size / 2, -this.size / 2, this.size, this.size);
        } else {
          // Procedural curved petal fallback
          context.fillStyle = 'rgba(232, 196, 192, 0.7)';
          context.beginPath();
          context.moveTo(0, -this.size / 2);
          context.bezierCurveTo(this.size * 0.4, -this.size * 0.2, this.size * 0.4, this.size * 0.3, 0, this.size / 2);
          context.bezierCurveTo(-this.size * 0.4, this.size * 0.3, -this.size * 0.4, -this.size * 0.2, 0, -this.size / 2);
          context.fill();
        }

        context.restore();
      }
    }

    const petals = Array.from({ length: PETAL_COUNT }, () => new Petal());

    let isRunning = true;
    const handleVisibilityChange = () => {
      isRunning = !document.hidden;
      if (isRunning) render();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isRunning) return;

      // Decay velocity boost
      scrollVelocity *= 0.92;
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.update(scrollVelocity);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20 select-none"
    />
  );
}
