import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import pcbImg from "@/assets/pcb.webp";

/**
 * Chapter 01 — WHY WE EXIST
 *
 * Dark canvas continues from Hero.
 * Left: Giant statement typography revealed word-by-word on scroll.
 * Right: Tall portrait PCB image fragment — architectural, cropped, no rounding.
 * Below: Two supporting paragraphs.
 */
export function WhyWeExist() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      id="why"
      className="relative bg-ink text-ivory overflow-hidden"
      style={{ paddingTop: "clamp(6rem, 14vh, 12rem)", paddingBottom: "clamp(6rem, 14vh, 12rem)" }}
    >
      {/* Subtle separator from hero */}
      <div className="absolute top-0 left-0 w-full h-px bg-ivory/6" />

      <div className="foundry-container">
        {/* Chapter marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16 sm:mb-24"
        >
          <span className="h-px w-8 bg-ivory/20" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-ivory/30 font-sans">
            01 / Why We Exist
          </span>
        </motion.div>

        {/* Main layout: full-width statement + right image */}
        <div className="relative grid grid-cols-12 gap-6 items-start">
          {/* Statement typography */}
          <div className="col-span-12 lg:col-span-8 relative z-10">
            <h2
              className="font-display text-ivory leading-[0.9] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}
            >
              <WordReveal delay={0.05}>Ideas are cheap.</WordReveal>
              <WordReveal delay={0.15}>
                <span className="text-ivory/30">Building them</span>
              </WordReveal>
              <WordReveal delay={0.25}>isn't.</WordReveal>
            </h2>
          </div>

          {/* Right image fragment — tall, edge-breaking */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ y: imgY }}
              className="relative w-full aspect-[3/4] lg:aspect-[2/3] overflow-hidden lg:-mt-16 lg:-mr-16"
            >
              <img
                src={pcbImg}
                alt=""
                className="w-full h-full object-cover"
                style={{
                  filter: "grayscale(60%) contrast(1.1) brightness(0.65)",
                }}
              />
              {/* Top-left label */}
              <div className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.35em] text-ivory/30 font-sans bg-ink/40 px-2 py-1">
                PCB_X92
              </div>
              {/* Bottom gradient fade */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 50%, #0b0a09 100%)",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Supporting copy — two columns */}
        <div className="mt-20 sm:mt-28 grid grid-cols-12 gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-12 md:col-span-5 text-[14px] sm:text-[15px] leading-[1.7] text-ivory/40 font-sans"
          >
            Everyone has ideas. Very few have the discipline, the engineering depth, and the
            patience to build them into systems that work, scale, and endure.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.12, duration: 0.8, ease: "easeOut" }}
            className="col-span-12 md:col-span-5 md:col-start-8 text-[14px] sm:text-[15px] leading-[1.7] text-ivory/40 font-sans"
          >
            That is what the Foundry does. We don't consult. We don't advise. We take your idea and
            forge it — engineer it into something real, intelligent, and built to last.
          </motion.p>
        </div>

        {/* Expanding divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.4, ease: "easeOut" }}
          className="mt-20 sm:mt-32 h-px bg-ivory/10 origin-left"
        />
      </div>
    </section>
  );
}

function WordReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="word-reveal-line">
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay, duration: 0.9, ease: "easeOut" }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
