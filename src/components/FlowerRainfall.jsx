import React, { useEffect, useRef } from 'react';

/**
 * FlowerRainfall — Soft, Dignified Floral Petal Rain Effect
 * Renders gentle falling ivory jasmine blossoms and subtle blush petals
 * with organic 3D tumbling physics, gentle sine-wave drift, and zero lag.
 */
export default function FlowerRainfall() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Petal types: Ivory Jasmine, Soft Blush Rose, Golden Dust Accent
    const PETAL_COLORS = [
      { fill: 'rgba(255, 252, 245, 0.72)', stroke: 'rgba(218, 192, 160, 0.35)', type: 'jasmine' },
      { fill: 'rgba(248, 230, 224, 0.68)', stroke: 'rgba(224, 178, 166, 0.30)', type: 'rose' },
      { fill: 'rgba(252, 246, 238, 0.75)', stroke: 'rgba(201, 166, 107, 0.40)', type: 'jasmine' },
      { fill: 'rgba(245, 218, 210, 0.60)', stroke: 'rgba(200, 150, 140, 0.25)', type: 'rose' },
      { fill: 'rgba(223, 192, 133, 0.45)', stroke: 'rgba(180, 140, 70, 0.25)', type: 'sparkle' },
    ];

    const PETAL_COUNT = width < 640 ? 28 : 42;

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -30;
        this.size = Math.random() * 8 + 7; // 7px to 15px
        this.speedY = Math.random() * 0.85 + 0.55; // Soft, sober descent
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.02;
        
        // 3D tumbling parameters
        this.tilt = Math.random() * Math.PI;
        this.tiltSpeed = Math.random() * 0.025 + 0.01;
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.012;
        this.swayAmplitude = Math.random() * 1.5 + 0.8;

        const colorIndex = Math.floor(Math.random() * PETAL_COLORS.length);
        this.color = PETAL_COLORS[colorIndex];
        this.opacity = Math.random() * 0.45 + 0.5;
      }

      update() {
        this.swayAngle += this.swaySpeed;
        this.x += Math.sin(this.swayAngle) * this.swayAmplitude + this.speedX;
        this.y += this.speedY;
        this.angle += this.angularSpeed;
        this.tilt += this.tiltSpeed;

        // Wrap or reset at bottom
        if (this.y > height + 40 || this.x < -40 || this.x > width + 40) {
          this.reset(false);
        }
      }

      draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);

        // 3D perspective foreshortening via cos(tilt)
        const scaleX = Math.cos(this.tilt);
        const scaleY = 1;
        context.scale(scaleX, scaleY);

        context.fillStyle = this.color.fill;
        context.strokeStyle = this.color.stroke;
        context.lineWidth = 0.5;
        context.globalAlpha = this.opacity;

        if (this.color.type === 'sparkle') {
          // Delicate golden petal speck
          context.beginPath();
          context.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
          context.fill();
        } else {
          // Curved organic petal shape with delicate central vein
          context.beginPath();
          context.moveTo(0, -this.size);
          context.bezierCurveTo(
            this.size * 0.8, -this.size * 0.4,
            this.size * 0.8, this.size * 0.6,
            0, this.size
          );
          context.bezierCurveTo(
            -this.size * 0.8, this.size * 0.6,
            -this.size * 0.8, -this.size * 0.4,
            0, -this.size
          );
          context.fill();
          context.stroke();

          // Soft central vein accent
          context.beginPath();
          context.moveTo(0, -this.size * 0.7);
          context.lineTo(0, this.size * 0.7);
          context.strokeStyle = 'rgba(210, 180, 140, 0.22)';
          context.lineWidth = 0.4;
          context.stroke();
        }

        context.restore();
      }
    }

    const petals = Array.from({ length: PETAL_COUNT }, () => new Petal());

    let isRunning = true;
    const handleVisibilityChange = () => {
      isRunning = !document.hidden;
      if (isRunning) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
    />
  );
}
