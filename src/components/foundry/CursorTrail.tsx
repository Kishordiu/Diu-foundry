import { useEffect, useRef } from "react";

// ─── Particle ─────────────────────────────────────────────────────────────────
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
    const angle = Math.random() * Math.PI * 2;
    const speed = isTouch ? Math.random() * 2.5 + 1.5 : Math.random() * 1.5 + 0.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    // Touch particles are slightly larger and live a bit shorter for a punchy trail
    this.maxLife = isTouch ? Math.random() * 18 + 16 : Math.random() * 30 + 30;
    this.life = this.maxLife;
    this.size = isTouch ? Math.random() * 4 + 2.5 : Math.random() * 2 + 1;
    // Violet / Lavender / Pearlescent hues
    const hues = [260, 270, 280, 290];
    const h = hues[Math.floor(Math.random() * hues.length)];
    const s = Math.floor(Math.random() * 30 + 70);
    const l = Math.floor(Math.random() * 30 + 60);
    this.color = `hsl(${h}, ${s}%, ${l}%)`;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.vx *= 0.93;
    this.vy *= 0.93;
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

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Use devicePixelRatio (capped at 2) for sharp rendering on HiDPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles: Particle[] = [];
    let animationFrameId: number | null = null;

    // Battery / performance budget:
    // On touch devices use a lower max particle count to preserve battery.
    // On high-end machines (many CPU cores) allow more.
    const cores = navigator.hardwareConcurrency ?? 4;
    const MAX_PARTICLES = isTouch ? (cores >= 6 ? 80 : 50) : 200;

    // Idle timer — stops the RAF loop when no events fire for 500ms
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const scheduleIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        // Let remaining particles finish, then stop
        if (particles.length === 0 && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }, 500);
    };

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", resize, { passive: true });
    resize();

    const addParticles = (x: number, y: number, amount: number) => {
      for (let i = 0; i < amount; i++) {
        if (particles.length >= MAX_PARTICLES) break;
        particles.push(new Particle(x, y, isTouch));
      }
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // ── Mouse trail (desktop) ───────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      addParticles(e.clientX, e.clientY, 2);
      scheduleIdle();
    };

    // ── Touch trail (mobile / tablet) ───────────────────────────────────────
    // We track whether the gesture is primarily vertical (scrolling) so we
    // don't fire particles during a scroll, only during swipes/taps.
    let touchStartX = 0;
    let touchStartY = 0;
    let isScrollGesture = false;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      isScrollGesture = false;
      // Burst on tap
      addParticles(touch.clientX, touch.clientY, isTouch ? 12 : 6);
      scheduleIdle();
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const dx = Math.abs(touch.clientX - touchStartX);
      const dy = Math.abs(touch.clientY - touchStartY);
      // After 10px of movement, classify the gesture
      if (dx + dy > 10 && !isScrollGesture) {
        isScrollGesture = dy > dx * 1.5;
      }
      // Skip particles during vertical scroll to avoid performance impact
      if (isScrollGesture) return;
      addParticles(touch.clientX, touch.clientY, isTouch ? 4 : 2);
      scheduleIdle();
    };

    if (isTouch) {
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
    } else {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      ctx.globalAlpha = 1;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        animationFrameId = null;
      }
    };

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90]"
      aria-hidden="true"
    />
  );
}
