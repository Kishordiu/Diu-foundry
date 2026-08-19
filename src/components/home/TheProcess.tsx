import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function TheProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const steps = ["IDEA", "EXPERIMENT", "BUILD", "LAUNCH"];

  const xPosition = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-ink text-ivory overflow-hidden" id="process">
      <div className="sticky top-0 h-screen flex flex-col justify-center">
        <div className="foundry-container w-full absolute top-12 left-0 right-0">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/40">
            [ 04 ] The Process
          </span>
        </div>

        <motion.div style={{ x: xPosition }} className="flex whitespace-nowrap pl-[10vw]">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <h2
                className="font-display text-[15vw] leading-none tracking-tight uppercase text-ivory mix-blend-difference opacity-80 hover:opacity-100 transition-opacity duration-500"
                data-cursor="drag"
              >
                {step}
              </h2>
              {i < steps.length - 1 && (
                <div className="mx-[8vw] w-32 h-[1px] bg-ivory/30 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ivory/50" />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
