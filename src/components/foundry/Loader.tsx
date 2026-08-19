import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cinematic Loader — Film Title Sequence
 *
 * Sequence:
 * 1. Black canvas + grain
 * 2. Three micro particles drift in from center
 * 3. "DIU" reveals top-to-bottom (overflow hidden + translateY)
 * 4. "FOUNDRY" appears below, wide tracked
 * 5. "EVERY IDEA IS A SPARK." fades in tiny
 * 6. Whole composition scales up and fades out
 * 7. Hero beneath is revealed
 *
 * Only shows on first visit per session.
 * Total: ~1.8s
 */
export function Loader() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("diu-loaded")) {
      setSkip(true);
      return;
    }

    const t1 = setTimeout(() => setPhase(1), 150); // particles appear
    const t2 = setTimeout(() => setPhase(2), 600); // DIU appears
    const t3 = setTimeout(() => setPhase(3), 950); // FOUNDRY + tagline appear
    const t4 = setTimeout(() => setPhase(4), 1400); // start exit
    const t5 = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("diu-loaded", "1");
    }, 1950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden grain-anim"
          style={{ backgroundColor: "#0b0a09" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: "easeIn" }}
        >
          {/* Ambient violet glow — subtle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 0.12 : 0 }}
            transition={{ duration: 1.2 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 60%, #4b2a8f 0%, transparent 70%)",
            }}
          />

          {/* Micro particles */}
          {phase >= 1 && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {[
                { top: "42%", left: "46%", delay: 0 },
                { top: "50%", left: "52%", delay: 0.1 },
                { top: "56%", left: "48%", delay: 0.2 },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0.5], scale: [0, 1, 0.6] }}
                  transition={{ duration: 0.5, delay: p.delay }}
                  className="absolute w-[3px] h-[3px] rounded-full bg-violet-deep"
                  style={{ top: p.top, left: p.left }}
                />
              ))}
            </div>
          )}

          {/* Main composition */}
          <div className="relative flex flex-col items-center select-none">
            {/* DIU */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: phase >= 2 ? 0 : "110%" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="font-display text-[clamp(3rem,10vw,6rem)] font-light tracking-[0.25em] text-ivory leading-none"
              >
                DIU
              </motion.div>
            </div>

            {/* FOUNDRY */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: phase >= 3 ? 0 : "110%" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="font-display text-[clamp(0.65rem,1.8vw,0.9rem)] font-normal tracking-[0.55em] uppercase text-ivory/50 mt-1"
              >
                FOUNDRY
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 3 ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-[9px] uppercase tracking-[0.5em] text-ivory/20"
            >
              Every Idea is a Spark.
            </motion.div>

            {/* Sweep line below */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: phase >= 3 ? 1 : 0,
                opacity: phase >= 3 ? 1 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="mt-6 h-px w-24 bg-ivory/15 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
