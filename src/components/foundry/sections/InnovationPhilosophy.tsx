import { motion } from "framer-motion";

/**
 * Chapter 05 — PHILOSOPHY
 *
 * Brand manifesto word-by-word reveal at extreme scale.
 * Each word appears from below on scroll.
 * Dark section, pure typography.
 * Core: "EVERY IDEA IS A SPARK. BUILD THE FLAME."
 */
const words = ["EVERY", "IDEA", "IS", "A", "SPARK."];
const subwords = ["BUILD", "THE", "FLAME."];

export function InnovationPhilosophy() {
  return (
    <section
      id="philosophy"
      className="relative bg-ink text-ivory overflow-hidden grain"
      style={{
        minHeight: "100svh",
        paddingTop: "clamp(6rem, 15vh, 14rem)",
        paddingBottom: "clamp(6rem, 15vh, 14rem)",
      }}
    >
      {/* Ambient violet glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(75,42,143,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="foundry-container relative z-10 flex flex-col items-center justify-center min-h-[80svh] text-center">
        {/* Chapter marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16 sm:mb-24"
        >
          <span className="h-px w-10 bg-ivory/12" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-ivory/25 font-sans">
            05 / Philosophy
          </span>
          <span className="h-px w-10 bg-ivory/12" />
        </motion.div>

        {/* Main word reveal — extreme scale */}
        <div aria-label="Every idea is a spark.">
          <div
            className="flex flex-wrap justify-center gap-x-[0.35em] gap-y-0 leading-none"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            {words.map((word, i) => (
              <span key={word} className="word-reveal-line">
                <motion.span
                  className="block font-display"
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.85,
                    ease: "easeOut",
                  }}
                  style={{
                    color: word === "SPARK." ? "#4b2a8f" : "#f5f3ef",
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Subline */}
          <div
            className="flex flex-wrap justify-center gap-x-[0.35em] gap-y-0 leading-none mt-2"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            {subwords.map((word, i) => (
              <span key={word} className="word-reveal-line">
                <motion.span
                  className="block font-display"
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: 0.5 + i * 0.1,
                    duration: 0.85,
                    ease: "easeOut",
                  }}
                  style={{ color: "rgba(245,243,239,0.2)" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        </div>

        {/* Sweep line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.4, ease: "easeOut" }}
          className="mt-16 sm:mt-24 h-px w-48 bg-ivory/15 origin-center"
        />

        {/* Process chain — minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-10 flex items-center gap-4 sm:gap-8"
        >
          {["Idea", "Prototype", "System", "Experience", "Impact"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 + i * 0.08, duration: 0.5 }}
              className="flex items-center gap-4 sm:gap-8 font-display text-sm sm:text-lg text-ivory/20"
            >
              {word}
              {i < 4 && (
                <span className="text-ivory/10 text-xs" aria-hidden="true">
                  →
                </span>
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* Manifesto attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-8 text-[9px] uppercase tracking-[0.45em] text-ivory/20 font-sans"
        >
          — The DIU Foundry
        </motion.p>
      </div>
    </section>
  );
}
