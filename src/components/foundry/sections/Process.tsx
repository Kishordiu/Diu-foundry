import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eyebrow } from "./TheFoundry";
import { ArcDivider } from "../Mark";

const steps = [
  {
    n: "I",
    t: "Introduce the spark",
    c: "Tell us the shape of the idea — even if it's still just a shape. We listen, interrogate, and draft a manifesto.",
  },
  {
    n: "II",
    t: "Draft the foundry",
    c: "We propose a small, senior team, a rhythm, and a first month of work. No bloat, no theater.",
  },
  {
    n: "III",
    t: "Begin the forge",
    c: "We ship in weekly loops. You hold the flame; we tend it with you, engineering for permanence.",
  },
];

function StepCard({
  step,
  index,
  totalSteps,
}: {
  step: (typeof steps)[number];
  index: number;
  totalSteps: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="col-span-12 md:col-span-4 relative">
      {/* Connecting line — hidden on last item */}
      {index < totalSteps - 1 && (
        <div className="hidden md:block absolute top-12 left-full z-10 w-full h-px -translate-x-1/2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-deep/40 to-violet-deep/10"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            aria-hidden="true"
          />
        </div>
      )}

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32, scale: 0.97, filter: "blur(8px)" }}
        animate={
          inView
            ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, y: 32, scale: 0.97, filter: "blur(8px)" }
        }
        transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="group relative rounded-[2rem] border border-ink/8 bg-white p-8 sm:p-10 shadow-sm hover:premium-shadow transition-shadow duration-500 overflow-hidden cursor-default isolate"
      >
        {/* Subtle top accent on hover */}
        <motion.span
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-deep/60 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          whileHover={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
          aria-hidden="true"
        />

        {/* Step number background */}
        <div
          className="absolute -right-6 -bottom-10 font-display text-[10rem] md:text-[14rem] italic text-violet-deep/[0.02] blur-[2px] transition-all duration-500 group-hover:text-violet-deep/[0.05] group-hover:-rotate-3 select-none -z-10"
          aria-hidden="true"
        >
          {step.n}
        </div>

        <div className="relative z-10">
          {/* Step indicator dot */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-violet-deep/60 group-hover:bg-violet-deep transition-colors duration-300" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink/40">
              Step {index + 1}
            </span>
          </div>

          <h3 className="mt-4 font-display text-xl sm:text-2xl group-hover:text-violet-deep transition-colors duration-300">
            {step.t}
          </h3>
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink/65">{step.c}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="relative bg-ivory">
      <div className="text-lavender">
        <ArcDivider />
      </div>
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-20 lg:py-32 xl:py-48 md:px-12">
        <Eyebrow index="IX" title="Forge with us" />
        <div className="mt-8 sm:mt-12 grid grid-cols-12 gap-4 sm:gap-6">
          <h2 className="col-span-12 font-display text-4xl sm:text-5xl leading-[1.02] tracking-tight md:col-span-8 md:text-7xl text-balance">
            A small, considered <br className="hidden sm:block" />
            beginning.
          </h2>
          <p className="col-span-12 max-w-md text-sm sm:text-[15px] leading-relaxed text-ink/70 md:col-span-4 mt-6 md:mt-14 text-balance">
            No procurement theatre. No twelve-week discovery. Three quiet steps into the studio.
          </p>
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-12 gap-6 sm:gap-8">
          {steps.map((s, i) => (
            <StepCard key={s.n} step={s} index={i} totalSteps={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
