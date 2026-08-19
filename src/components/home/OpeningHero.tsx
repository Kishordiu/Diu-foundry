import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { RainSystem } from "./RainSystem";

export function OpeningHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-reactive transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(12px)"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const textZ = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textRotateX = useTransform(scrollYProgress, [0, 0.8], [0, 12]);

  const fragmentOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 0.6]);
  const fragmentY = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Cursor-reactive reflection (fluid / environment distortion)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const reflectionX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const reflectionY = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  
  // A subtle material shift for the steel
  const steelGradientAngle = useTransform(smoothX, [0, 1], [160, 200]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX.set(e.touches[0].clientX / window.innerWidth);
        mouseY.set(e.touches[0].clientY / window.innerHeight);
      }
    };

    // Initialize with center
    mouseX.set(0.5);
    mouseY.set(0.5);
    
    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative h-[140vh] w-full bg-ink overflow-hidden"
      id="hero"
      style={{ perspective: "1200px" }}
    >
      {/* ── LAYER 1: Fluid / Atmospheric Environment ── */}
      <motion.div
        style={{ y: bgY, filter: bgBlur }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 bg-ink" />

        {/* Cursor-reactive fluid background highlight */}
        <motion.div
          style={{
            background: `radial-gradient(circle 50vw at ${reflectionX} ${reflectionY}, rgba(15, 30, 25, 0.4) 0%, transparent 80%)`,
          } as any}
          className="absolute inset-0 z-0 opacity-80 mix-blend-screen"
        />

        {/* Ambient atmospheric motion */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
          <motion.div
            animate={{ x: ["-2%", "2%", "-2%"], y: ["-1%", "1%", "-1%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/3 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(0,40,30,0.3)_0%,transparent_70%)] blur-[100px]"
          />
        </div>

        {/* Rain drops */}
        <RainSystem />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink z-10" />
      </motion.div>

      {/* ── LAYER 2: Grain ── */}
      <div className="absolute inset-0 grain pointer-events-none z-[6] mix-blend-overlay opacity-35" />

      {/* ── LAYER 3: Fragments ── */}
      <motion.div
        style={{ opacity: fragmentOpacity, y: fragmentY }}
        className="absolute inset-0 z-[7] pointer-events-none select-none"
      >
        <div className="absolute top-[28%] left-[8%] font-mono text-[10px] tracking-[0.3em] text-ivory/15">
          SYS.INIT //
        </div>
        <div className="absolute top-[55%] right-[12%] font-mono text-[9px] text-ivory/10">
          0x00F8.REV
        </div>
        <div className="absolute top-[38%] left-[75%] font-mono text-sm text-ivory/8">λ</div>
      </motion.div>

      {/* ── LAYER 4: Hero Typography (Precision Machined Steel) ── */}
      <motion.div
        style={{
          y: textY,
          opacity: heroOpacity,
          scale: heroScale,
          z: textZ,
          rotateX: textRotateX,
        }}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 transform-gpu"
      >
        <div className="text-center foundry-container px-5 sm:px-8 w-full max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            <h1 className="font-display text-[13vw] sm:text-[12vw] lg:text-[10.5vw] leading-[0.85] tracking-[-0.03em] uppercase select-none w-full text-center relative">
              
              {/* The underlying brushed steel text */}
              <motion.span
                className="block relative overflow-hidden"
                style={{
                  color: "transparent",
                  backgroundImage: useTransform(
                    steelGradientAngle,
                    (angle) => `linear-gradient(${angle}deg, rgba(255,255,255,0.95) 0%, rgba(120,120,120,0.8) 35%, rgba(40,40,40,0.85) 50%, rgba(160,160,160,0.9) 65%, rgba(220,220,220,0.95) 100%)`
                  ),
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  textShadow: "0px 4px 24px rgba(0,0,0,0.6)",
                }}
              >
                Every Idea
              </motion.span>
              
              <motion.span
                className="block mt-1 sm:mt-0 relative"
                style={{
                  color: "transparent",
                  backgroundImage: useTransform(
                    steelGradientAngle,
                    (angle) => `linear-gradient(${angle + 10}deg, rgba(200,200,200,0.8) 0%, rgba(255,255,255,0.9) 30%, rgba(80,80,80,0.75) 55%, rgba(180,180,180,0.85) 100%)`
                  ),
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Is A Spark
              </motion.span>
              
              {/* Specular Glint that follows cursor across the steel surface */}
              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  background: `radial-gradient(circle 25vw at ${reflectionX} ${reflectionY}, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                } as any}
              />
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 3.0 }}
            className="mt-10 sm:mt-20 flex items-center justify-center gap-4 sm:gap-10 w-full"
          >
            <div className="h-[1px] w-8 sm:w-24 bg-gradient-to-r from-transparent to-ivory/25" />
            <p className="font-mono text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-ivory/40 whitespace-nowrap">
              Build The Flame
            </p>
            <div className="h-[1px] w-8 sm:w-24 bg-gradient-to-l from-transparent to-ivory/25" />
          </motion.div>
        </div>
      </motion.div>

      {/* ── LAYER 5: Scroll Hint ── */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-ivory/30 to-transparent" />
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-ivory/25">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
