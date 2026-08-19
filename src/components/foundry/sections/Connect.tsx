import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { MagneticButton } from "@/components/foundry/MagneticButton";

/**
 * Chapter 07 — IGNITE (Final CTA)
 *
 * "GOT AN IDEA?" → "BRING IT TO THE FOUNDRY."
 * The payoff of the entire experience.
 * Whole composition responds to hover proximity.
 * Particle field intensifies. Typography expands.
 */
export function Connect() {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <section
      ref={containerRef}
      id="ignite"
      className="relative overflow-hidden bg-ink text-ivory grain"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: "clamp(4rem, 8vh, 8rem)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Reactive ambient glow — responds to hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.7 : 0.15,
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none rounded-full"
        style={{
          width: "90vw",
          height: "90vw",
          maxWidth: "900px",
          maxHeight: "900px",
          background: "radial-gradient(circle, rgba(75,42,143,0.5) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Secondary glow — crimson hint */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.4 : 0,
        }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute top-1/4 right-0 pointer-events-none rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          maxWidth: "400px",
          maxHeight: "400px",
          background: "radial-gradient(circle, rgba(176,34,58,0.3) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
      />

      <motion.div
        style={{ y, scale }}
        className="foundry-container relative z-10 w-full pt-28 sm:pt-32"
      >
        {/* Chapter marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16 sm:mb-20"
        >
          <span className="h-px w-8 bg-ivory/15" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-ivory/25 font-sans">
            07 / Ignite
          </span>
        </motion.div>

        {/* Main reactive typography */}
        <div className="grid grid-cols-12 gap-8 items-end w-full" data-cursor="enter">
          <div className="col-span-12 md:col-span-10 relative">
            <h2
              className="font-display leading-[0.85] tracking-[-0.03em]"
              style={{ fontSize: "clamp(3.5rem, 11vw, 10.5rem)" }}
            >
              {/* Line 1 */}
              <span className="word-reveal-line">
                <motion.span
                  initial={{ y: "110%", rotateZ: 1.5 }}
                  whileInView={{ y: 0, rotateZ: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="block origin-bottom-left"
                >
                  Got an idea?
                </motion.span>
              </span>

              {/* Line 2 */}
              <span className="word-reveal-line">
                <motion.span
                  initial={{ y: "110%", rotateZ: 1.5 }}
                  whileInView={{ y: 0, rotateZ: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 1.1, ease: "easeOut" }}
                  className="block origin-bottom-left"
                  style={{ color: "rgba(245,243,239,0.2)" }}
                >
                  Bring it to
                </motion.span>
              </span>

              {/* Line 3 — reactive */}
              <span className="word-reveal-line">
                <motion.span
                  initial={{ y: "110%", rotateZ: 1.5 }}
                  whileInView={{ y: 0, rotateZ: 0 }}
                  viewport={{ once: true }}
                  animate={{
                    color: isHovered ? "#f5f3ef" : "#4b2a8f",
                    letterSpacing: isHovered ? "-0.01em" : "-0.03em",
                  }}
                  transition={{ delay: 0.2, duration: 1.1, ease: "easeOut" }}
                  className="block origin-bottom-left"
                >
                  the Foundry.
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="col-span-12 md:col-span-2 pb-4 flex justify-start md:justify-end items-end"
          >
            <MagneticButton to="/forge" primary cursorLabel="enter" className="whitespace-nowrap">
              Enter the Forge
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom info grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-20 sm:mt-28 pt-6 border-t border-ivory/8 grid grid-cols-12 gap-8 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ivory/30 font-sans"
        >
          <div className="col-span-12 sm:col-span-4">
            <div className="mb-3 text-ivory/15">Studio</div>
            <div className="leading-relaxed space-y-1">
              <div>DIU Foundry</div>
              <div>Fully Remote</div>
              <div>Worldwide</div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-4">
            <div className="mb-3 text-ivory/15">Direct</div>
            <a href="mailto:diufoundry@gmail.com" className="hover:text-ivory transition-colors">
              diufoundry@gmail.com
            </a>
          </div>

          <div className="col-span-12 sm:col-span-4 flex flex-col items-start sm:items-end">
            <div className="mb-3 text-ivory/15">System Status</div>
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                style={{ animation: "glowPulse 2s ease-in-out infinite" }}
              />
              Online · Accepting Projects
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
