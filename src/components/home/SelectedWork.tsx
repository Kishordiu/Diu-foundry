import { useRef } from "react";
import { useScroll, motion, useTransform, useVelocity, useSpring } from "framer-motion";
import { ProjectItem } from "./ProjectItem";

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocitySkew = useTransform(smoothVelocity, [-1000, 0, 1000], [2, 0, -2]);

  const projects = [
    {
      title: "Sentrix",
      year: "2024",
      domain: "Intelligence Platform",
      role: "Architecture / AI",
      statement: "Crime Intelligence platform translating chaotic data into actionable insights.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      choreography: "float" as const,
    },
    {
      title: "Zero Trust IoT",
      year: "2023",
      domain: "Hardware Security",
      role: "Embedded / Cryptography",
      statement: "A hardware-level secure architecture for municipal sensor networks.",
      image:
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1200",
      choreography: "sink" as const,
    },
    {
      title: "AI Digital Twin",
      year: "2024",
      domain: "Wearable Tech",
      role: "Firmware / ML",
      statement:
        "Predictive biometric modeling living inside a lightweight smartwatch architecture.",
      image:
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1200",
      choreography: "spin" as const,
    },
    {
      title: "BrailleVision",
      year: "2022",
      domain: "Assistive Tech",
      role: "Computer Vision / Tactile",
      statement: "Real-time visual translation matrix for the visually impaired.",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b14d246c7?auto=format&fit=crop&q=80&w=1200",
      choreography: "drift" as const,
    },
    {
      title: "LPG IoT Safety",
      year: "2023",
      domain: "Industrial Safety",
      role: "Sensor Fusion / Cloud",
      statement: "Predictive thermal and atmospheric monitoring for volatile environments.",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1200",
      choreography: "pop" as const,
    },
    {
      title: "OTEC System",
      year: "2025",
      domain: "Renewable Energy",
      role: "Systems Engineering",
      statement: "Ocean Thermal Energy Conversion prototype monitoring interface.",
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
      choreography: "glitch" as const,
    },
  ];

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-ink text-ivory py-32 lg:py-64 overflow-hidden"
      id="work"
    >
      {/* Background depth layer */}

      <div className="foundry-container relative z-10 mb-40">
        <div className="overflow-hidden mb-6">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            className="font-mono text-[10px] tracking-[0.4em] uppercase text-ivory/50 block"
          >
            [ 03 ] Selected Work
          </motion.span>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            style={{ skewY: velocitySkew }}
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.87, 0, 0.13, 1], delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-8xl tracking-tight uppercase origin-left transform-gpu"
          >
            Experimental <br />
            <span className="text-ivory/50 italic">Exhibition</span>
          </motion.h2>
        </div>
      </div>

      <div className="relative w-full">
        {projects.map((proj, i) => (
          <ProjectItem key={i} index={i + 1} {...proj} />
        ))}
      </div>
    </section>
  );
}
