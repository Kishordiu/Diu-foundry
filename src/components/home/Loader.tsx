import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mark } from "../foundry/Mark";

/**
 * Atmospheric rain-on-glass loader.
 * 
 * The loader IS the hero's surface — a thick frosted glass pane
 * sitting on top of the OpeningHero. Through the glass, the user
 * gradually discovers the hero typography.
 * 
 * Sequence:
 *   0.0s  — Dark glass. Quiet. Near-black.
 *   0.6s  — Rain is already accumulating behind this pane (via RainSystem in Hero).
 *   1.2s  — DIU Mark appears softly through the frost.
 *   2.0s  — Glass begins clearing. Steel typography becomes faintly visible.
 *   3.0s  — Glass fully clear. Loader fades out. Hero revealed.
 */
export function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"dark" | "forming" | "clearing" | "done">("dark");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("forming"), 600);
    const t2 = setTimeout(() => setPhase("clearing"), 1800);
    const t3 = setTimeout(() => setPhase("done"), 2800);
    const t4 = setTimeout(onComplete, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ pointerEvents: phase === "done" ? "none" : "auto" }}
    >
      {/* The frosted glass pane */}
      <motion.div
        initial={{ backdropFilter: "blur(60px) brightness(0.2)", WebkitBackdropFilter: "blur(60px) brightness(0.2)" }}
        animate={{
          backdropFilter:
            phase === "clearing" || phase === "done"
              ? "blur(0px) brightness(1)"
              : phase === "forming"
                ? "blur(24px) brightness(0.4)"
                : "blur(60px) brightness(0.2)",
          WebkitBackdropFilter:
            phase === "clearing" || phase === "done"
              ? "blur(0px) brightness(1)"
              : phase === "forming"
                ? "blur(24px) brightness(0.4)"
                : "blur(60px) brightness(0.2)",
          opacity: phase === "done" ? 0 : 1,
        }}
        transition={{ duration: phase === "clearing" ? 1.2 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-ink/80"
      />

      {/* Rain condensation texture hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase === "forming" ? 0.06 : phase === "clearing" ? 0.03 : 0,
        }}
        transition={{ duration: 1 }}
        className="absolute inset-0 grain-anim pointer-events-none"
      />

      {/* Subtle DIU Mark — appears during the forming phase, then fades as glass clears */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: phase === "forming" ? 0.5 : phase === "clearing" ? 0.2 : 0,
            scale: phase === "forming" ? 1 : phase === "clearing" ? 1.05 : 0.95,
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <Mark className="w-6 h-6" stroke="rgba(245, 243, 239, 0.4)" />
        </motion.div>
      </div>
    </motion.div>
  );
}
