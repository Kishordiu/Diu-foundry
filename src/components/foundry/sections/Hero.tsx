import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "@/components/foundry/MagneticButton";
import sparkImg from "@/assets/spark_v2.webp";

/**
 * Chapter 00 — SPARK (Hero)
 *
 * Dark cinematic canvas. The film has just started.
 * Giant typography assembles from below at three different parallax speeds.
 * A tall editorial image fragment floats on the right.
 * Micro-information populates top corners.
 * Scroll hint at the bottom guides down.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax layers — all values strictly [0, 1]
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const textY1 = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY3 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const hintsOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink grain"
      style={{ color: "#f5f3ef" }}
    >
      {/* Ambient violet glow — very subtle */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #4b2a8f 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "glowPulse 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[15%] right-[15%] w-[30vw] h-[30vw] max-w-[400px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #c8451b 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </motion.div>

      {/* Traveling Spark */}
      <motion.div
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 3.5, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
        className="absolute left-[8%] w-1 h-[20vh] z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #4b2a8f, #f5f3ef, transparent)",
          filter: "blur(2px)",
        }}
      />

      {/* Floating editorial image — tall portrait, right side */}
      <motion.div
        style={{ y: imgY, scale: imgScale, opacity: imgOpacity }}
        className="absolute top-0 right-0 h-full w-[38vw] max-w-[520px] pointer-events-none z-0 hidden lg:block overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ delay: 1.6, duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
          className="w-full h-full"
        >
          <img
            src={sparkImg}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(80%) contrast(1.15) brightness(0.7)" }}
          />
          {/* Gradient fade from left edge */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #0b0a09 0%, transparent 35%, transparent 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, #0b0a09 0%, transparent 30%)",
            }}
          />
        </motion.div>

        {/* Figure label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute top-8 left-8 text-[9px] uppercase tracking-[0.4em] text-ivory/25 font-sans"
        >
          Fig 0.0 — Spark
        </motion.div>
      </motion.div>

      {/* Top micro-info bar */}
      <div className="foundry-container relative z-10 pt-28 sm:pt-32 flex items-start justify-between w-full">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-ivory/20" />
          <span className="text-[9px] uppercase tracking-[0.45em] text-ivory/30 font-sans">
            00 / Spark
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="hidden md:flex flex-col items-end gap-[3px] text-[9px] uppercase tracking-[0.2em] text-ivory/20 font-sans"
          aria-hidden="true"
        >
          <span>SYS_INIT: {new Date().getFullYear()}</span>
          <span>LAT: 23.77 · LON: 90.39</span>
          <span>STATUS: ACTIVE</span>
        </motion.div>
      </div>

      {/* Main typography composition */}
      <div className="foundry-container relative z-10 flex-1 flex flex-col justify-center pb-20 sm:pb-32 w-full pt-8">
        <h1
          className="font-display text-ivory leading-none tracking-[-0.04em]"
          style={{ fontSize: "clamp(3.8rem, 13vw, 11rem)" }}
        >
          {/* Line 1 */}
          <motion.div style={{ y: textY1, opacity: textOpacity }}>
            <RevealLine delay={1.4}>Every idea</RevealLine>
          </motion.div>

          {/* Line 2 */}
          <motion.div style={{ y: textY2, opacity: textOpacity }}>
            <RevealLine delay={1.55}>
              is a{" "}
              <em className="not-italic" style={{ color: "#4b2a8f" }}>
                spark.
              </em>
            </RevealLine>
          </motion.div>

          {/* Line 3 */}
          <motion.div style={{ y: textY3, opacity: textOpacity }} className="text-ivory/25">
            <RevealLine delay={1.72}>Build the flame.</RevealLine>
          </motion.div>
        </h1>

        {/* Supporting line + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 1, ease: "easeOut" }}
          className="mt-14 sm:mt-20 grid grid-cols-12 gap-6 items-end"
        >
          <div className="col-span-12 md:col-span-5">
            <div className="text-[9px] uppercase tracking-[0.4em] text-ivory/25 mb-3 font-sans">
              Core Directive
            </div>
            <p className="text-[14px] sm:text-[15px] leading-[1.65] text-ivory/45 max-w-sm font-sans">
              DIU Foundry transforms ambitious ideas into digital products, AI systems, IoT
              experiences, and experimental technology.
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-wrap items-end gap-4 justify-start md:justify-end mt-6 md:mt-0">
            {/* The user requested to remove the duplicate CTA "Ignite the Forge" from Hero.
                We only keep a subtle magnetic button to scroll down or view work. */}
            <MagneticButton to="/works" cursorLabel="explore">
              Explore Projects
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        style={{ opacity: hintsOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-10"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-ivory/20 font-sans">
          Scroll
        </span>
        <div
          className="w-px h-10 bg-gradient-to-b from-ivory/30 to-transparent"
          style={{ animation: "scrollHint 2s ease-in-out infinite" }}
        />
      </motion.div>

      {/* Bottom edge line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.5, duration: 1.8, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-full h-px bg-ivory/8 origin-left"
      />
    </section>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="word-reveal-line">
      <motion.span
        initial={{ y: "108%", rotate: 1.5 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ delay, duration: 1.1, ease: "easeOut" }}
        className="block origin-bottom-left"
      >
        {children}
      </motion.span>
    </span>
  );
}
