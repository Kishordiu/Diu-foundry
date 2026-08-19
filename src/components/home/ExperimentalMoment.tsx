import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function ExperimentalMoment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-ivory text-ink overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />

      <div className="absolute top-12 left-12">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-ink/40">
          [ 05 ] The Foundry
        </span>
      </div>

      <motion.div
        style={{
          rotateX: useTransform(smoothY, [-1, 1], [15, -15]),
          rotateY: useTransform(smoothX, [-1, 1], [-15, 15]),
          z: 100,
        }}
        className="relative z-10 text-center"
      >
        <h2 className="font-display text-[12vw] leading-[0.8] tracking-tighter uppercase mb-8">
          <span className="block text-ink">We Build</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-deep via-forge to-crimson">
            The Flame
          </span>
        </h2>
      </motion.div>

      {/* Abstract background shapes */}
      <motion.div
        style={{
          x: useTransform(smoothX, [-1, 1], [-50, 50]),
          y: useTransform(smoothY, [-1, 1], [-50, 50]),
        }}
        className="absolute w-[40vw] h-[40vw] bg-gradient-to-br from-violet-deep/10 to-forge/10 rounded-full blur-3xl mix-blend-multiply"
      />
    </section>
  );
}
