import { useEffect, useRef } from "react";

// DIU brand palette — subtle shifting tones, pre-parsed for fast canvas ops
// Format: [r, g, b] so we can compose rgba() cheaply without string parsing
const PALETTE: [number, number, number][] = [
  [255, 255, 255], // pearl white
  [230, 220, 255], // lavender
  [180, 150, 240], // violet
  [140, 160, 255], // soft blue glint
  [255, 200, 230], // subtle pink glint
  [255, 248, 235], // faint warm star
];

// Object pool so we never allocate/GC during animation
interface Particle {
  x: number;
  y: number;
  size: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  life: number;
  maxLife: number;
  driftX: number;
  driftY: number;
  twinkleSpeed: number;
  active: boolean;
}

const POOL_SIZE = 150;
const pool: Particle[] = Array.from({ length: POOL_SIZE }, () => ({
  x: 0,
  y: 0,
  size: 1,
  r: 255,
  g: 255,
  b: 255,
  alpha: 0,
  life: 0,
  maxLife: 1,
  driftX: 0,
  driftY: 0,
  twinkleSpeed: 0.1,
  active: false,
}));

let poolHead = 0;

function acquireParticle(x: number, y: number, dx: number, dy: number): Particle | null {
  // Walk pool for a free slot (circular buffer)
  for (let tries = 0; tries < POOL_SIZE; tries++) {
    const p = pool[poolHead % POOL_SIZE];
    poolHead++;
    if (!p.active) {
      const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      p.x = x;
      p.y = y;
      p.r = r;
      p.g = g;
      p.b = b;
      p.size = 0.6 + Math.random() * 1.4;
      p.maxLife = 28 + Math.random() * 28;
      p.life = p.maxLife;
      p.alpha = 1;
      p.driftX = dx * -0.012 + (Math.random() - 0.5) * 0.4;
      p.driftY = dy * -0.012 + (Math.random() - 0.5) * 0.4;
      p.twinkleSpeed = 0.1 + Math.random() * 0.25;
      p.active = true;
      return p;
    }
  }
  return null; // pool exhausted — skip this particle
}

export function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Accessibility + mobile: disable entirely when not needed
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouch) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      // Hint to browser: we only read from this canvas in JS, never via getImageData
      desynchronized: true,
    });
    if (!ctx) return;

    // Use device pixel ratio capped at 2 — no benefit beyond 2 for this effect
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Track mouse state
    let lastX = -1;
    let lastY = -1;
    let isScrolling = false;
    let scrollTimer = 0;

    // Use a throttle ref to gate particle creation (not a React state — pure ref)
    let lastSpawnTime = 0;
    const SPAWN_INTERVAL_MS = 14; // ~71hz max spawn rate, well under 120fps

    const onMove = (e: MouseEvent) => {
      // While scroll jank guard is active, don't spawn
      if (isScrolling) return;

      const now = performance.now();
      if (now - lastSpawnTime < SPAWN_INTERVAL_MS) return;
      lastSpawnTime = now;

      const cx = e.clientX;
      const cy = e.clientY;

      if (lastX === -1) {
        lastX = cx;
        lastY = cy;
        return;
      }

      const dx = cx - lastX;
      const dy = cy - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only spawn if pointer has actually moved (avoids burst on first move)
      if (dist < 1.5) {
        lastX = cx;
        lastY = cy;
        return;
      }

      // Interpolate max 4 points per frame to keep particle density controlled
      const steps = Math.min(4, Math.max(1, Math.floor(dist / 4)));
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const jx = (Math.random() - 0.5) * 2;
        const jy = (Math.random() - 0.5) * 2;
        acquireParticle(lastX + dx * t + jx, lastY + dy * t + jy, dx, dy);
      }

      lastX = cx;
      lastY = cy;
    };

    // Detect scroll and briefly pause particle spawning to avoid jank during scroll
    const onScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    let rafId = 0;

    const render = () => {
      // Clear with a plain clearRect — no compositing needed here
      ctx.clearRect(0, 0, width, height);

      // Draw all active particles using source-over (default) with pre-composed rgba
      // NO shadowBlur — replaced with a simple radial gradient glow per particle
      // NO globalCompositeOperation changes inside the loop
      let hasActive = false;

      for (let i = 0; i < POOL_SIZE; i++) {
        const p = pool[i];
        if (!p.active) continue;

        // Update
        p.x += p.driftX;
        p.y += p.driftY;
        p.life--;

        if (p.life <= 0) {
          p.active = false;
          continue;
        }

        hasActive = true;

        const progress = p.life / p.maxLife;
        const eased = progress * progress; // quadratic ease-out (cheap)
        const twinkle = 0.85 + Math.sin(p.life * p.twinkleSpeed) * 0.15;
        p.alpha = eased * twinkle;

        if (p.alpha < 0.01) continue;

        // Draw: a simple filled circle with no shadow, no save/restore per particle
        // A subtle glow is approximated by drawing two concentric circles:
        // outer (large, very transparent) + inner (small, opaque)
        const r = p.size;
        const glowR = r * 2.8;
        const a = p.alpha;

        // Outer glow ring — single fillRect with low alpha for cheap bloom illusion
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${(a * 0.12).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Inner core — full alpha
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Suppress the warning about unused variable — hasActive used for future opt
      void hasActive;

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      // Reset all particles in pool on unmount
      for (let i = 0; i < POOL_SIZE; i++) pool[i].active = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[80]"
      aria-hidden="true"
    />
  );
}
