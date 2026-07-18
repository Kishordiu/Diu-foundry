import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;

  constructor(x: number, y: number, isTouch: boolean) {
    this.x = x;
    this.y = y;
    // Slight random velocity for a "shimmer" effect
    const angle = Math.random() * Math.PI * 2;
    const speed = isTouch ? Math.random() * 2 + 1 : Math.random() * 1.5 + 0.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    // Touch particles live slightly shorter but start bigger
    this.maxLife = isTouch ? Math.random() * 20 + 20 : Math.random() * 30 + 30;
    this.life = this.maxLife;
    this.size = isTouch ? Math.random() * 3 + 2 : Math.random() * 2 + 1;

    // Violet / Lavender / Pearlescent hues
    const hues = [260, 270, 280, 290];
    const h = hues[Math.floor(Math.random() * hues.length)];
    const s = Math.floor(Math.random() * 30 + 70); // 70-100%
    const l = Math.floor(Math.random() * 30 + 60); // 60-90%
    this.color = `hsl(${h}, ${s}%, ${l}%)`;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    // Slight drag
    this.vx *= 0.95;
    this.vy *= 0.95;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Accessibility + mobile: disable entirely on touch devices.
    // Matches the same guard in Cursor.tsx — touch screens have no mouse cursor.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouch) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const particles: Particle[] = [];
    let animationFrameId: number | null = null;
    let isTouchMode = false;
    // Touch scroll detection
    let touchStartX = 0;
    let touchStartY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const addParticles = (x: number, y: number, isTouch: boolean, amount: number = 2) => {
      for (let i = 0; i < amount; i++) {
        particles.push(new Particle(x, y, isTouch));
      }
      // Wake up the RAF loop if it's paused
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // --- Mouse Events ---
    const onMouseMove = (e: MouseEvent) => {
      if (isTouchMode) return;
      addParticles(e.clientX, e.clientY, false, 2);
    };

    // --- Touch Events ---
    const onTouchStart = (e: TouchEvent) => {
      isTouchMode = true;
      const touch = e.touches[0];
      if (!touch) return;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      // Burst on touch start
      addParticles(touch.clientX, touch.clientY, true, 10);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      // Only emit particles on horizontal/diagonal gestures, not vertical scroll
      const dx = Math.abs(touch.clientX - touchStartX);
      const dy = Math.abs(touch.clientY - touchStartY);
      if (dy > dx * 1.5) return; // vertical scroll — skip particles
      addParticles(touch.clientX, touch.clientY, true, 3);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      // Pause the loop when no particles remain — resumes on next input
      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        animationFrameId = null;
      }
    };

    // Don't start RAF until first input
    // animationFrameId starts as null intentionally

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
}
