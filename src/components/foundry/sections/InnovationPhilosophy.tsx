import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import spark from "@/assets/spark_v2.png";

export function InnovationPhilosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink text-ivory">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <img
          src={spark}
          alt="A single spark igniting"
          loading="lazy"
          className="h-[120%] w-full object-cover opacity-80 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink opacity-90" />
      </motion.div>

      <div className="mx-auto grid min-h-[100svh] max-w-[1500px] grid-cols-12 items-center gap-4 sm:gap-6 px-4 sm:px-6 py-20 lg:py-32 xl:py-48 md:px-12">
        <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
          <p className="mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-ivory/60">
            <span className="h-px w-6 sm:w-8 bg-ivory/40" /> Chapter IV · Philosophy{" "}
            <span className="h-px w-6 sm:w-8 bg-ivory/40" />
          </p>
          <motion.h2
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)", y: 20 }}
            whileInView={{ opacity: 1, clipPath: "inset(-20% 0 -20% 0)", y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl leading-[1.1] tracking-tight md:text-6xl text-balance"
          >
            "Innovation is not the accumulation of features. It is the reduction of friction until
            only <em className="italic text-[#e7d9ff]">intent</em> remains."
          </motion.h2>
          <p className="mt-8 sm:mt-12 text-[10px] sm:text-sm uppercase tracking-[0.3em] text-ivory/50">
            — The DIU Foundry Manifesto
          </p>
        </div>
      </div>
    </section>
  );
}
