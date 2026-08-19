import { useEffect, useRef } from "react";

class Drop {
  x: number;
  y: number;
  r: number;
  mass: number;
  vx: number;
  vy: number;
  isFalling: boolean;
  // Organic imperfection: each drop has a unique shape seed
  seed: number;
  highlightAngle: number;

  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.mass = r * r;
    this.vx = 0;
    this.vy = 0;
    this.isFalling = false;
    this.seed = Math.random();
    this.highlightAngle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25; // slight variation
  }

  merge(other: Drop) {
    const totalMass = this.mass + other.mass;
    this.vx = (this.vx * this.mass + other.vx * other.mass) / totalMass;
    this.vy = (this.vy * this.mass + other.vy * other.mass) / totalMass;
    const ratio = other.mass / totalMass;
    this.x += (other.x - this.x) * ratio;
    this.y += (other.y - this.y) * ratio;
    this.mass = totalMass;
    this.r = Math.sqrt(this.mass);
    this.isFalling = true;
  }
}

const MAX_DROPS = 400;

export function RainSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // DPR-aware sizing for sharp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    let drops: Drop[] = [];

    // Initial condensation — sparse, quiet, varied sizes
    const initialCount = Math.min(Math.floor((width * height) / 15000), 120);
    for (let i = 0; i < initialCount; i++) {
      const r = Math.random() < 0.1
        ? Math.random() * 3 + 2   // occasional medium
        : Math.random() * 1.5 + 0.5; // mostly tiny
      drops.push(new Drop(Math.random() * width, Math.random() * height, r));
    }

    let rafId = 0;

    const drawDrop = (d: Drop) => {
      if (d.r < 0.3) return; // skip invisible drops
      ctx.save();
      ctx.translate(d.x, d.y);

      // Elongate when falling
      const stretch = d.isFalling ? Math.min(1 + d.vy * 0.08, 1.4) : 1;
      ctx.scale(1, stretch);

      const r = d.r;

      // --- Shadow beneath the drop (contact shadow on glass) ---
      ctx.beginPath();
      ctx.arc(0, r * 0.15, r * 1.05, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fill();

      // --- Main body: dark center (refracted background), lighter rim ---
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      const bodyGrad = ctx.createRadialGradient(
        -r * 0.15, -r * 0.15, r * 0.1,
        0, 0, r
      );
      bodyGrad.addColorStop(0, "rgba(200, 210, 210, 0.08)"); // slight centre clarity
      bodyGrad.addColorStop(0.5, "rgba(10, 15, 15, 0.3)");   // dark refracted interior
      bodyGrad.addColorStop(0.85, "rgba(20, 30, 28, 0.5)");  // darker edge
      bodyGrad.addColorStop(1, "rgba(40, 55, 50, 0.7)");     // crisp rim
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // --- Top-left caustic highlight (the bright crescent) ---
      if (r > 1) {
        ctx.beginPath();
        const hlR = r * (0.25 + d.seed * 0.1); // variable highlight size
        ctx.arc(-r * 0.3, -r * 0.35, hlR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + d.seed * 0.3})`;
        ctx.fill();
      }

      // --- Bottom-right refracted light (subtle spectral) ---
      if (r > 1.5) {
        ctx.beginPath();
        ctx.arc(r * 0.2, r * 0.25, r * 0.35, 0, Math.PI * 2);
        // Use the seed to vary the spectral hue slightly
        const hue = 140 + d.seed * 40; // 140-180: sea green range
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.1)`;
        ctx.fill();
      }

      // --- Very thin rim highlight (surface tension edge) ---
      if (r > 2) {
        ctx.beginPath();
        ctx.arc(0, 0, r - 0.5, Math.PI * 1.1, Math.PI * 1.8);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Slowly add new condensation (not every frame — restrained)
      if (drops.length < MAX_DROPS && Math.random() < 0.15) {
        const r = Math.random() < 0.05
          ? Math.random() * 2.5 + 1.5  // rare medium
          : Math.random() * 1 + 0.4;   // mostly tiny
        drops.push(new Drop(Math.random() * width, Math.random() * height, r));
      }

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];

        if (d.isFalling) {
          d.vy += 0.15; // gentler gravity
          d.vx *= 0.98; // slight horizontal friction
          d.x += d.vx;
          d.y += d.vy;

          // Leave a tiny stationary trail drop occasionally
          if (Math.random() < 0.1 && drops.length < MAX_DROPS) {
            drops.push(new Drop(d.x + (Math.random() - 0.5) * 2, d.y - d.r * 1.5, Math.random() * 0.8 + 0.3));
          }

          // Check for merging (only nearby, limit checks for perf)
          const checkRange = Math.min(i, 20);
          for (let j = i - 1; j >= i - checkRange && j >= 0; j--) {
            const other = drops[j];
            const dx = d.x - other.x;
            const dy = d.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < d.r + other.r) {
              d.merge(other);
              drops.splice(j, 1);
              i--;
              break; // merge at most one per frame per drop
            }
          }
        } else {
          // Surface tension: heavy drops eventually fall
          if (d.mass > 20) {
            d.isFalling = true;
            d.vx = (Math.random() - 0.5) * 0.3; // tiny horizontal drift
          } else if (Math.random() < 0.00008) {
            d.isFalling = true;
          }
        }

        // Remove off-screen
        if (d.y > height + d.r * 2 || d.x < -20 || d.x > width + 20) {
          drops.splice(i, 1);
        } else {
          drawDrop(d);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5] pointer-events-none"
      style={{ opacity: 0.7, mixBlendMode: "screen" }}
    />
  );
}
