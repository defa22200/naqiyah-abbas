import React, { useEffect, useRef } from 'react';

/**
 * GoldBurstCanvas (PRD §5 Act 0 Step 2)
 * Particle physics burst for seal crack ceremony:
 * - 14 crimson wax shards with rotational momentum and gravity
 * - 24 sparkling gold foil flecks with air drag and shimmer fade
 */
export default function GoldBurstCanvas({ active = false, onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = (canvas.width = canvas.offsetWidth * dpr);
    const height = (canvas.height = canvas.offsetHeight * dpr);
    const cx = width / 2;
    const cy = height / 2;

    // Generate wax shards
    const waxShards = Array.from({ length: 14 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 5 + 3) * dpr;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5 * dpr,
        size: (Math.random() * 6 + 4) * dpr,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.25,
        alpha: 1,
        color: Math.random() > 0.3 ? '#85251B' : '#5C1610'
      };
    });

    // Generate gold dust
    const goldDust = Array.from({ length: 28 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 7 + 2) * dpr;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2 * dpr,
        radius: (Math.random() * 2.5 + 1) * dpr,
        alpha: 1,
        color: Math.random() > 0.5 ? '#DFC085' : '#C9A66B'
      };
    });

    let frame = 0;
    const maxFrames = 55;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Render wax shards
      waxShards.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.22 * dpr; // Gravity
        s.vx *= 0.98; // Air resistance
        s.rotation += s.vRot;
        s.alpha = Math.max(0, 1 - frame / maxFrames);

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.moveTo(-s.size, -s.size / 2);
        ctx.lineTo(s.size, -s.size / 3);
        ctx.lineTo(s.size / 2, s.size);
        ctx.lineTo(-s.size / 1.5, s.size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // Render gold dust
      goldDust.forEach((g) => {
        g.x += g.vx;
        g.y += g.vy;
        g.vy += 0.08 * dpr;
        g.vx *= 0.96;
        g.alpha = Math.max(0, 1 - frame / (maxFrames * 0.9));

        ctx.save();
        ctx.globalAlpha = g.alpha;
        ctx.fillStyle = g.color;
        ctx.shadowColor = '#DFC085';
        ctx.shadowBlur = 4 * dpr;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (frame < maxFrames) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        if (onComplete) onComplete();
      }
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-30"
    />
  );
}
