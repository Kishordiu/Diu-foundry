import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import auroraImg from "@/assets/aurora.jpg";
import meridianImg from "@/assets/meridian.jpg";
import northwindImg from "@/assets/northwind.jpg";
import sentrixImg from "@/assets/sentrix.jpg";
import pcbImg from "@/assets/pcb.webp";

/**
 * Chapter 03 — BUILT (Project Showcase)
 *
 * Rebuilt with the CARD SWIPE SYSTEM.
 * Sticky container that steps through projects based on scroll position.
 * State-driven AnimatePresence gives spring-based, physical transitions
 * (current card scales down and rotates slightly, next card enters and expands).
 * Varies image transitions to avoid repetition.
 */
const projects = [
  {
    id: "meridian",
    num: "01",
    year: "2025",
    category: "AI / SOFTWARE",
    client: "Meridian Robotics",
    title: "A production line\nthat thinks.",
    desc: "Computer vision + embedded systems for autonomous quality inspection across three manufacturing plants.",
    tags: ["Computer Vision", "Embedded", "Cloud"],
    img: meridianImg,
    transitionStyle: "swipe",
  },
  {
    id: "aurora",
    num: "02",
    year: "2025",
    category: "HEALTHCARE AI",
    client: "Aurora Health",
    title: "An AI clinician\nin the theatre.",
    desc: "Real-time LLM agents providing surgical decision support with sub-second latency and HIPAA-grade security.",
    tags: ["LLM Agents", "Realtime", "Security"],
    img: auroraImg,
    transitionStyle: "scale",
  },
  {
    id: "northwind",
    num: "03",
    year: "2024",
    category: "IOT / EMBEDDED",
    client: "Northwind Grid",
    title: "The invisible nervous\nsystem of a city.",
    desc: "IoT sensor mesh across 12,000 endpoints feeding a unified analytics plane for urban infrastructure.",
    tags: ["IoT", "Infrastructure", "Analytics"],
    img: northwindImg || pcbImg,
    transitionStyle: "mask",
  },
  {
    id: "sentrix",
    num: "04",
    year: "2024",
    category: "CRIME INTEL",
    client: "Sentrix",
    title: "Forensic logic mapped\nat scale.",
    desc: "Data visualization interface resolving complex intelligence relationships and geographic topography.",
    tags: ["Data Viz", "Intelligence", "Mapping"],
    img: sentrixImg,
    transitionStyle: "crossfade",
  },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "20%" : "-20%",
      rotateZ: direction > 0 ? 4 : -4,
      scale: 0.9,
      opacity: 0,
      zIndex: 10,
    };
  },
  center: {
    x: 0,
    rotateZ: 0,
    scale: 1,
    opacity: 1,
    zIndex: 20,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 24,
      mass: 0.8,
    },
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? "20%" : "-20%",
      rotateZ: direction < 0 ? 4 : -4,
      scale: 0.95,
      opacity: 0,
      zIndex: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 28,
        mass: 0.8,
      },
    };
  },
};

export function Built() {
  const containerRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = down/next, -1 = up/prev

  // Total scroll height: 100vh per project + 1 for buffer
  const scrollHeight = `${projects.length * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map [0, 1] to index range
    // Give a slight buffer at start/end so we don't prematurely switch
    const rawIndex = latest * projects.length;
    const clamped = Math.max(0, Math.min(projects.length - 1, Math.floor(rawIndex)));

    if (clamped !== index) {
      setDirection(clamped > index ? 1 : -1);
      setIndex(clamped);
    }
  });

  const active = projects[index];

  return (
    <section
      ref={containerRef}
      id="built"
      className="relative bg-ink text-ivory grain"
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">
        {/* Header */}
        <div className="absolute top-10 sm:top-16 left-0 w-full z-40 pointer-events-none">
          <div className="foundry-container flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-ivory/15" />
              <span className="text-[9px] uppercase tracking-[0.5em] text-ivory/30 font-sans">
                03 / Built
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/20 font-sans hidden md:block">
              Selected Ecosystem Work
            </span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-10 left-0 w-full z-40 pointer-events-none">
          <div className="foundry-container flex items-center gap-4">
            <div className="text-[9px] font-sans tracking-[0.2em] text-ivory/40 w-4">
              0{index + 1}
            </div>
            <div className="flex-1 h-px bg-ivory/10 overflow-hidden">
              <motion.div
                className="h-full bg-ivory/40"
                animate={{ scaleX: (index + 1) / projects.length }}
                style={{ originX: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <div className="text-[9px] font-sans tracking-[0.2em] text-ivory/20 w-4 text-right">
              0{projects.length}
            </div>
          </div>
        </div>

        {/* Main Swipe Container */}
        <div className="foundry-container relative w-full h-full flex flex-col justify-center pt-24 pb-20">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={active.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex-1 grid grid-cols-12 gap-6 lg:gap-10 items-center relative"
            >
              {/* Giant Watermark Number */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-ivory pointer-events-none z-0"
                style={{
                  fontSize: "clamp(12rem, 30vw, 24rem)",
                  opacity: 0.02,
                  lineHeight: 0.8,
                  letterSpacing: "-0.05em",
                }}
              >
                <NumberMorph num={active.num} />
              </div>

              {/* Main Image Viewport (Left) */}
              <div className="col-span-12 lg:col-span-8 relative z-10 w-full h-full min-h-[300px] flex items-center">
                <div
                  className="relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-[4px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                  data-cursor="view"
                >
                  <ProjectImage transitionStyle={active.transitionStyle} img={active.img} />

                  {/* Subtle glass annotation */}
                  <div className="absolute bottom-4 right-4 bg-ink/40 backdrop-blur-md border border-ivory/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] font-sans text-ivory/60 rounded-[2px]">
                    SYS_{active.num} ACTIVE
                  </div>
                </div>
              </div>

              {/* Metadata & Title (Right) */}
              <div className="col-span-12 lg:col-span-4 relative z-10 flex flex-col">
                <div className="flex items-center gap-4 mb-6 lg:mb-10">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-violet-deep font-sans">
                    {active.category}
                  </span>
                  <span className="flex-1 h-px bg-ivory/10" />
                  <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/25 font-sans">
                    {active.year}
                  </span>
                </div>

                <h3
                  className="font-display text-ivory leading-[1.05] tracking-[-0.025em] whitespace-pre-line mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)" }}
                >
                  {active.title}
                </h3>

                <div className="mb-4 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-ivory/30 font-sans">
                  <span className="h-px w-6 bg-ivory/15" />
                  {active.client}
                </div>

                <p className="text-[13px] sm:text-[14px] leading-[1.7] text-ivory/45 font-sans mb-8">
                  {active.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="font-sans text-[8px] uppercase tracking-[0.15em] text-ivory/40 border border-ivory/10 bg-ivory/5 px-2.5 py-1 rounded-[2px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/**
 * Handles different image transition styles based on the project data
 */
function ProjectImage({ transitionStyle, img }: { transitionStyle: string; img: string }) {
  if (transitionStyle === "swipe") {
    return (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "-50%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={img}
          alt=""
          className="w-full h-full object-cover grayscale-[20%] brightness-90"
        />
      </motion.div>
    );
  }

  if (transitionStyle === "scale") {
    return (
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={img}
          alt=""
          className="w-full h-full object-cover grayscale-[20%] brightness-90"
        />
      </motion.div>
    );
  }

  if (transitionStyle === "mask") {
    return (
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={img}
          alt=""
          className="w-full h-full object-cover grayscale-[20%] brightness-90"
        />
      </motion.div>
    );
  }

  // default / crossfade
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 w-full h-full"
    >
      <img src={img} alt="" className="w-full h-full object-cover grayscale-[20%] brightness-90" />
    </motion.div>
  );
}

/**
 * Animates numerical morphing (01 -> 02)
 */
function NumberMorph({ num }: { num: string }) {
  return (
    <div className="relative inline-block w-[1.2em] h-[1em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={num}
          initial={{ y: "100%", opacity: 0, rotateX: 90 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          exit={{ y: "-100%", opacity: 0, rotateX: -90 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="absolute inset-0 flex items-center justify-center origin-bottom"
        >
          {num}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
