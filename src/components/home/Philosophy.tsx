import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textLines = [
    "DIU Foundry is a creative technology studio",
    "where ambitious ideas become",
    "digital products, AI experiences,",
    "and precise IoT systems.",
  ];

  // The water/glass effect continues from the hero, but clears away as we scroll deeper
  const glassOpacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 0]);
  const glassBlur = useTransform(scrollYProgress, [0, 0.4], ["blur(12px)", "blur(0px)"]);
  const glassY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-40 min-h-screen flex items-center bg-ink text-ivory overflow-hidden"
      id="philosophy"
    >
      {/* Continuing the Hero Water Layer — physically fading as we move into the philosophy */}
      <motion.div 
        style={{ y: glassY, opacity: glassOpacity, filter: glassBlur }} 
        className="absolute inset-0 pointer-events-none mix-blend-screen z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink opacity-80" />
        <div className="absolute top-0 right-1/4 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(0,80,60,0.15)_0%,transparent_60%)] blur-3xl -translate-y-1/2" />
        {/* We use a slight noise overlay to represent the dissipating water surface */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="philosophy-dissipate" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <div className="absolute inset-0 bg-ink" style={{ filter: "url(#philosophy-dissipate) blur(4px)" }} />
      </motion.div>

      <div className="absolute inset-0 grain pointer-events-none z-10 mix-blend-overlay opacity-20" />

      <div className="foundry-container w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3 flex flex-col justify-between">
            <motion.span 
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]) }}
              className="font-mono text-[9px] tracking-[0.4em] uppercase text-ivory/30"
            >
              [ 01 ] Philosophy
            </motion.span>
          </div>

          <div className="lg:col-span-9">
            <div className="font-display text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight">
              {textLines.map((line, i) => {
                const start = 0.2 + i * 0.1;
                const end = start + 0.15;
                const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
                const y = useTransform(scrollYProgress, [start, end], [40, 0]);
                const filter = useTransform(scrollYProgress, [start, end], ["blur(12px)", "blur(0px)"]);
                const scale = useTransform(scrollYProgress, [start, end], [0.95, 1]);
                const rotateX = useTransform(scrollYProgress, [start, end], [20, 0]);

                return (
                  <motion.div key={i} className="overflow-hidden py-1 transform-gpu" style={{ perspective: "1000px" }}>
                    <motion.p 
                      style={{ opacity, y, filter, scale, rotateX }}
                      className="text-ivory/90"
                    >
                      {line}
                    </motion.p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              style={{ 
                opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
                y: useTransform(scrollYProgress, [0.6, 0.8], [20, 0]),
                filter: useTransform(scrollYProgress, [0.6, 0.8], ["blur(10px)", "blur(0px)"])
              }}
              className="mt-24 max-w-xl font-sans text-sm md:text-base leading-relaxed text-ivory/50"
            >
              We don't build typical websites or generic AI wrappers. We construct experimental
              digital architecture using Swiss editorial principles, brutalist typography, and
              cinematic motion.
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
