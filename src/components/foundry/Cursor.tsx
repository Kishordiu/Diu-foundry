import { useEffect, useRef } from "react";

class GlitchSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  char: string;

  constructor(x: number, y: number, vx: number, vy: number, isHoveringProject: boolean = false, isCTA: boolean = false) {
    this.x = x;
    this.vx = vx * 0.35 + (Math.random() - 0.5) * 1.5;
    this.vy = vy * 0.35 + (Math.random() - 0.5) * 1.5;
    
    // Fast cursor = longer life
    const speed = Math.sqrt(vx * vx + vy * vy);
    const lifeBonus = Math.min(speed * 1.5, 15);
    this.maxLife = Math.random() * (isHoveringProject ? 35 : 20) + 10 + lifeBonus;
    this.life = this.maxLife;
    
    this.size = Math.random() * 5 + 6; 

    // Multilingual & Mathematical Fragments
    const chars = [
      "1", "0", "x", "+", "-", "≈", "∑", "∆", "λ", "µ", "∫", "π",
      "அ", "ஆ", "இ", "க", "ந", "ம",
      "<", ">", "{", "}", "/", "A", "I"
    ];
    this.char = chars[Math.floor(Math.random() * chars.length)];

    if (isCTA) {
      // CTA Hover: Sea-green & Cyan
      const hues = [150, 160, 170, 180];
      this.color = `hsla(${hues[Math.floor(Math.random() * hues.length)]}, 80%, 70%, `;
    } else {
      // General movement: Refracted light colors
      const rand = Math.random();
      if (rand > 0.9) this.color = "rgba(255, 255, 255, "; // Steel white
      else if (rand > 0.75) this.color = "rgba(245, 243, 239, "; // Ivory
      else if (rand > 0.6) this.color = "rgba(0, 255, 180, "; // Sea green
      else if (rand > 0.45) this.color = "rgba(0, 200, 255, "; // Cyan
      else if (rand > 0.3) this.color = "rgba(75, 42, 143, "; // Violet
      else if (rand > 0.2) this.color = "rgba(200, 50, 150, "; // Subtle magenta
      else this.color = "rgba(120, 140, 150, "; // Muted steel
    }
  }

  update(slowDown: boolean) {
    this.x += this.vx;
    this.y += this.vy;
    
    if (slowDown) {
      this.vx *= 0.92;
      this.vy *= 0.92;
    } else {
      this.vx *= 0.98;
      this.vy *= 0.98;
    }
    
    // Sharp direction changes / glitches
    if (Math.random() > 0.97) {
      this.x += (Math.random() - 0.5) * 5;
      this.y += (Math.random() - 0.5) * 5;
    }
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const rawOpacity = Math.max(0, this.life / this.maxLife);
    const opacity = rawOpacity * rawOpacity; // Non-linear decay
    ctx.fillStyle = `${this.color}${opacity})`;
    ctx.font = `${this.size}px 'JetBrains Mono', monospace`;
    ctx.fillText(this.char, this.x, this.y);
  }
}

export function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const emblem = emblemRef.current;
    if (!canvas || !emblem) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let p: GlitchSpark[] = [];
    let rafId = 0;
    
    let isHoveringProject = false;
    let isHoveringCTA = false;

    const spawnSparks = (x: number, y: number, count: number, spread: number, vx = 0, vy = 0) => {
      for (let i = 0; i < count; i++) {
        const pVx = vx + (Math.random() - 0.5) * spread;
        const pVy = vy + (Math.random() - 0.5) * spread;
        p.push(new GlitchSpark(x, y, pVx, pVy, isHoveringProject, isHoveringCTA));
      }
    };

    if (isTouch || prefersReduced) {
      if (!prefersReduced) {
        let lastTouch = { x: -1, y: -1, time: 0 };

        const onTouchStart = (e: TouchEvent) => {
          const t = e.touches[0];
          if (!t) return;
          lastTouch = { x: t.clientX, y: t.clientY, time: performance.now() };
          spawnSparks(t.clientX, t.clientY, 4, 2);
        };

        const onTouchMove = (e: TouchEvent) => {
          const t = e.touches[0];
          if (!t) return;
          const now = performance.now();
          const dt = Math.max(1, now - lastTouch.time);
          const vx = (t.clientX - lastTouch.x) / dt * 10;
          const vy = (t.clientY - lastTouch.y) / dt * 10;
          const vel = Math.sqrt(vx * vx + vy * vy);
          
          if (vel > 0.1) {
            spawnSparks(t.clientX, t.clientY, Math.max(1, Math.min(Math.floor(vel * 1.5), 5)), 2, -vx * 0.1, -vy * 0.1);
          }
          lastTouch = { x: t.clientX, y: t.clientY, time: now };
        };

        const onTouchEnd = () => {
          if (lastTouch.x !== -1) {
            spawnSparks(lastTouch.x, lastTouch.y, 8, 4);
          }
        };

        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });

        const renderTouch = () => {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          ctx.globalCompositeOperation = "screen";
          for (let i = p.length - 1; i >= 0; i--) {
            p[i].update(false);
            if (p[i].life <= 0) p.splice(i, 1);
            else p[i].draw(ctx);
          }
          rafId = requestAnimationFrame(renderTouch);
        };
        rafId = requestAnimationFrame(renderTouch);

        return () => {
          window.removeEventListener("touchstart", onTouchStart);
          window.removeEventListener("touchmove", onTouchMove);
          window.removeEventListener("touchend", onTouchEnd);
          cancelAnimationFrame(rafId);
          window.removeEventListener("resize", resize);
        };
      }
      return;
    }

    document.documentElement.style.cursor = "none";

    let mouseX = -100;
    let mouseY = -100;
    let lastX = -100;
    let lastY = -100;
    let emblemX = -100;
    let emblemY = -100;

    const SPRING = 0.25;

    const onMove = (e: MouseEvent) => {
      lastX = mouseX;
      lastY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const checkTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      isHoveringProject = cursorEl?.getAttribute("data-cursor") === "explore" || cursorEl?.getAttribute("data-cursor") === "view";
      const isButton = target.closest("button") || target.closest("a");
      isHoveringCTA = isButton !== null;

      emblem.classList.toggle("is-active", isHoveringProject || isHoveringCTA);
      if (isHoveringCTA) emblem.classList.add("is-cta");
      else emblem.classList.remove("is-cta");
    };

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      emblemX += (mouseX - emblemX) * SPRING;
      emblemY += (mouseY - emblemY) * SPRING;

      const vx = mouseX - lastX;
      const vy = mouseY - lastY;
      const vel = Math.sqrt(vx * vx + vy * vy);
      const isSlow = vel < 1.0;

      const angle = Math.atan2(vy, vx);
      const stretch = Math.min(1 + vel * 0.01, 1.5);
      const squeeze = Math.max(1 - vel * 0.005, 0.6);

      const size = (isHoveringProject || isHoveringCTA) ? 24 : 12;
      emblem.style.width = `${size}px`;
      emblem.style.height = `${size}px`;
      emblem.style.transform = `translate(${emblemX - size / 2}px, ${emblemY - size / 2}px) rotate(${angle}rad) scaleX(${stretch}) scaleY(${squeeze})`;

      if (lastX !== -100 && lastY !== -100) {
        if (vel > 0.1) {
          // Slow movement: spawn occasionally
          if (Math.random() < 0.3) {
            spawnSparks(mouseX, mouseY, 1, 1, 0, 0);
          }
        }
        if (vel > 1.5) {
          // Fast movement: dense trail
          const spawnCount = Math.min(Math.floor(vel / 6), isHoveringProject ? 6 : 4);
          for (let i = 0; i < Math.max(1, spawnCount); i++) {
            const lerp = Math.random();
            const px = lastX + vx * lerp;
            const py = lastY + vy * lerp;
            spawnSparks(px, py, 1, 3, -vx * 0.15, -vy * 0.15);
          }
        }
      }

      ctx.globalCompositeOperation = "screen";
      for (let i = p.length - 1; i >= 0; i--) {
        p[i].update(isSlow);
        if (p[i].life <= 0) p.splice(i, 1);
        else p[i].draw(ctx);
      }

      lastX += (mouseX - lastX) * 0.5;
      lastY += (mouseY - lastY) * 0.5;

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", checkTarget, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", checkTarget);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" aria-hidden="true" style={{ pointerEvents: 'none', zIndex: 9998 }} />
      <div ref={emblemRef} className="cursor-emblem transition-colors duration-300 pointer-events-none" aria-hidden="true" style={{ pointerEvents: 'none', zIndex: 9999 }}>
        <div className="w-full h-full rounded-full border border-ivory/30 shadow-[0_0_12px_rgba(255,255,255,0.1)] relative overflow-hidden flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
          <div className="w-1/2 h-1/2 rounded-full bg-ivory/50" />
        </div>
      </div>
    </>
  );
}
