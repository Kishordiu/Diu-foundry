import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 20;
      const ny = (e.clientY / window.innerHeight - 0.5) * 20;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pt-32 pb-12 sm:pb-16 md:pb-24">
      {/* Atmospheric background */}
      <motion.div
        style={{ x: sx, y: sy }}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1.15, opacity: 0.7 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="pointer-events-none absolute -top-40 right-[-10%] h-[80vmin] w-[80vmin] rounded-full blur-3xl"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--color-lavender)_0%,var(--color-ivory)_60%)]" />
      </motion.div>
      <motion.div
        style={{ x: sy, y: sx }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
        className="pointer-events-none absolute -bottom-32 left-[-15%] h-[70vmin] w-[70vmin] rounded-full blur-3xl"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--color-violet-deep)_0%,transparent_70%)] opacity-20" />
      </motion.div>
      <BreathingGrain />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-12 gap-4 sm:gap-6 px-4 sm:px-6 md:px-12">
        <div className="col-span-12 flex items-center gap-3 md:col-span-5">
          <span className="h-px w-10 bg-ink/30" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-ink/60">
            Chapter I · The Spark
          </span>
        </div>

        <div className="col-span-12 mt-6 sm:mt-8">
          <h1 className="font-display text-[15vw] sm:text-[13vw] md:text-[8.4vw] xl:text-[120px] leading-[0.92] tracking-[-0.02em]">
            <RevealLine delay={1.8}>Every idea</RevealLine>
            <RevealLine delay={1.95}>
              is a <em className="italic text-violet-deep">spark.</em>
            </RevealLine>
            <RevealLine delay={2.1}>
              <span className="grad-text">Build the flame.</span>
            </RevealLine>
          </h1>
        </div>

        <div className="col-span-12 mt-10 sm:mt-14 grid grid-cols-12 gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 2.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 max-w-lg text-sm sm:text-[15px] leading-relaxed text-ink/70 md:col-span-5 md:col-start-1"
          >
            DIU Foundry engineers intelligent AI systems, premium software, IoT ecosystems, embedded
            technologies, automation platforms and modern digital experiences. We forge ideas into
            intelligent products.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 flex flex-wrap items-center gap-4 md:col-span-6 md:col-start-7 md:justify-end"
          >
            <MagneticButton to="/" hash="forge" primary>
              Start Your Project
            </MagneticButton>
            <MagneticButton to="/" hash="foundry">
              Explore the Foundry
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 mt-16 flex items-end justify-between border-t border-ink/10 pt-6 text-[10px] uppercase tracking-[0.25em] text-ink/50"
        >
          <span>Dominance · Intelligence · Unity</span>
          <span className="hidden md:inline">Est. Foundry — MMXXVI</span>
          <span aria-label="Scroll down">Scroll ↓</span>
        </motion.div>
      </div>
    </section>
  );
}

function BreathingGrain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
      }}
    />
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block relative">
      <motion.span
        initial={{ y: "100%", clipPath: "inset(0 0 100% 0)", filter: "blur(8px)" }}
        animate={{ y: 0, clipPath: "inset(-20% 0 -20% 0)", filter: "blur(0px)" }}
        transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function MagneticButton({
  children,
  to,
  hash,
  primary = false,
}: {
  children: React.ReactNode;
  to: string;
  hash?: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <Link
      ref={ref}
      to={to}
      hash={hash || undefined}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setT({
          x: (e.clientX - (r.left + r.width / 2)) * 0.25,
          y: (e.clientY - (r.top + r.height / 2)) * 0.25,
        });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ transform: `translate(${t.x}px, ${t.y}px)` }}
      className={`group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-[11px] uppercase tracking-[0.2em] transition-all duration-500 shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep focus-visible:ring-offset-2 overflow-hidden ${
        primary
          ? "bg-ink text-ivory hover:bg-violet-deep"
          : "border border-ink/15 text-ink hover:border-ink/30 glass-panel"
      }`}
    >
      {/* Subtle sweep highlight */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
      <span className="relative z-10">{children}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        className="relative z-10 transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      >
        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    </Link>
  );
}
