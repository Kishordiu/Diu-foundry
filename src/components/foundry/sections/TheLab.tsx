import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import lab from "@/assets/lab.webp";
import pcb from "@/assets/pcb.webp";
import server from "@/assets/server.webp";

/**
 * Chapter 04 — THE LAB
 *
 * Experimental environment. Floating image fragments at different depths.
 * Pulsing SVG technical diagram in the background.
 * Domain labels scattered asymmetrically.
 * Section feels like stepping into an active research environment.
 */
const domains = [
  { num: "01", title: "Artificial Intelligence", col: "left-[8%]", top: "top-[2%]" },
  { num: "02", title: "Computer Vision", col: "left-[45%]", top: "top-[18%]" },
  { num: "03", title: "Robotics & Automation", col: "left-[15%]", top: "top-[38%]" },
  { num: "04", title: "IoT Networks", col: "left-[55%]", top: "top-[52%]" },
  { num: "05", title: "Digital Twins", col: "left-[10%]", top: "top-[68%]" },
  { num: "06", title: "Generative Systems", col: "left-[42%]", top: "top-[82%]" },
];

export function TheLab() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const img1Y = useTransform(scrollYProgress, [0, 1], ["-8%", "18%"]);
  const img2Y = useTransform(scrollYProgress, [0, 1], ["8%", "-20%"]);
  const img3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [-8, 4]);

  // Pointer proximity for the grid
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const maskImage = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black, transparent 80%)`;

  return (
    <section
      id="lab"
      ref={ref}
      className="relative bg-ivory text-ink overflow-hidden"
      style={{
        minHeight: "200vh",
        paddingTop: "clamp(6rem, 14vh, 12rem)",
        paddingBottom: "clamp(8rem, 16vh, 16rem)",
      }}
    >
      {/* Base Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0b0a09 1px, transparent 1px), linear-gradient(to bottom, #0b0a09 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Interactive breathing grid lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #4b2a8f 1px, transparent 1px), linear-gradient(to bottom, #4b2a8f 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      />

      {/* Background SVG technical diagram */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden="true">
        <LabDiagram />
      </div>

      <div className="foundry-container relative z-10">
        {/* Chapter marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-ink/15" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-ink/35 font-sans">
            04 / The Lab
          </span>
        </motion.div>

        {/* Header */}
        <div className="mt-12 sm:mt-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-9">
            <h2
              className="font-display text-ink leading-[0.9] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              Where we{" "}
              <motion.em
                className="not-italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ color: "#4b2a8f" }}
              >
                experiment.
              </motion.em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 flex flex-col justify-end text-[9px] uppercase tracking-[0.25em] text-ink/30 font-sans md:text-right">
            <span>SYS_ENV: EXPERIMENTAL</span>
            <span>PROTOCOLS: OVERRIDDEN</span>
          </div>
        </div>

        {/* Floating images */}
        <div className="absolute top-[18%] right-0 w-full h-full pointer-events-none z-0">
          <motion.div
            style={{ y: img1Y, rotate: rotate1 }}
            className="absolute top-[8%] right-[8%] w-[28vw] max-w-[380px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={lab}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: "sepia(25%) contrast(1.1) brightness(0.9)" }}
              />
              <div className="absolute top-2 left-2 bg-ivory text-ink text-[8px] px-2 py-0.5 uppercase tracking-[0.2em] font-sans">
                Fig 4.0
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: img2Y, rotate: rotate2 }}
            className="absolute top-[42%] left-[4%] w-[22vw] max-w-[280px]"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={pcb}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(40%) contrast(1.2) brightness(0.85)" }}
              />
              <div className="absolute bottom-2 right-2 bg-ink text-ivory text-[8px] px-2 py-0.5 uppercase tracking-[0.2em] font-sans">
                PCB_X92
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: img3Y }}
            className="absolute top-[62%] right-[18%] w-[18vw] max-w-[220px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden opacity-70 mix-blend-multiply">
              <img
                src={server}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(50%)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Domain labels — asymmetric, different depths */}
        <div className="relative mt-32 sm:mt-48 z-20" style={{ minHeight: "80vh" }}>
          {domains.map((d, i) => (
            <motion.div
              key={d.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: "easeOut" }}
              className={`absolute ${d.col} ${d.top}`}
              style={{ transform: "translateX(-50%)" }}
            >
              <div className="group cursor-crosshair" data-cursor="explore">
                <div className="flex items-baseline gap-3 border-b border-ink/15 pb-2 w-max pr-10">
                  <span
                    className="text-[9px] uppercase tracking-[0.35em] font-sans"
                    style={{ color: "#4b2a8f" }}
                  >
                    {d.num}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-ink group-hover:text-violet-deep transition-colors duration-300">
                    {d.title}
                  </h3>
                </div>
                <div className="text-[8px] uppercase tracking-[0.3em] text-ink/25 font-sans mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Running simulation…
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Pulsing SVG technical diagram */
function LabDiagram() {
  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full h-full"
      style={{ position: "absolute", inset: 0 }}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Node connections */}
      <line
        x1="200"
        y1="150"
        x2="400"
        y2="300"
        stroke="#0b0a09"
        strokeWidth="1"
        strokeDasharray="6 3"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="9"
          to="0"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="400"
        y1="300"
        x2="600"
        y2="200"
        stroke="#0b0a09"
        strokeWidth="1"
        strokeDasharray="6 3"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="9"
          dur="4s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="400"
        y1="300"
        x2="500"
        y2="450"
        stroke="#0b0a09"
        strokeWidth="0.8"
        strokeDasharray="4 4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="8"
          to="0"
          dur="5s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="150"
        y1="420"
        x2="400"
        y2="300"
        stroke="#0b0a09"
        strokeWidth="0.8"
        strokeDasharray="4 4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="8"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="650"
        y1="400"
        x2="600"
        y2="200"
        stroke="#0b0a09"
        strokeWidth="0.8"
        strokeDasharray="4 4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="8"
          to="0"
          dur="6s"
          repeatCount="indefinite"
        />
      </line>

      {/* Nodes */}
      {[
        { cx: 200, cy: 150, r: 6, dur: "2s" },
        { cx: 400, cy: 300, r: 10, dur: "3s" },
        { cx: 600, cy: 200, r: 6, dur: "2.5s" },
        { cx: 500, cy: 450, r: 5, dur: "4s" },
        { cx: 150, cy: 420, r: 5, dur: "3.2s" },
        { cx: 650, cy: 400, r: 4, dur: "1.8s" },
      ].map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill="#0b0a09">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur={n.dur}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}
