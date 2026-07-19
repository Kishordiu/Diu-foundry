import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import spark from "@/assets/spark.webp";

export function TheSpark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.6]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink text-ivory">
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0 -z-10">
        <img
          src={spark}
          alt="A single spark igniting"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      </motion.div>

      <div className="mx-auto grid min-h-[110vh] max-w-[1500px] grid-cols-12 items-center gap-6 px-6 py-40 md:px-12">
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <p className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-ivory/60">
            <span className="h-px w-8 bg-ivory/40" /> Chapter I
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.02] tracking-tight md:text-7xl text-balance">
            One thought. <br className="hidden sm:block" />
            <span className="italic text-[#e7d9ff]">One quiet ignition.</span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-ivory/70">
            Every great system began as a whisper — a filament of curiosity that refused to be
            extinguished. We honour that instant. Then we forge it.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-ivory/10 pt-6 text-[10px] uppercase tracking-[0.3em] text-ivory/50">
            <div>
              <div className="font-display text-3xl text-ivory">01</div>
              <div className="mt-2">Ignition</div>
            </div>
            <div>
              <div className="font-display text-3xl text-ivory">02</div>
              <div className="mt-2">Forge</div>
            </div>
            <div>
              <div className="font-display text-3xl text-ivory">03</div>
              <div className="mt-2">Release</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
