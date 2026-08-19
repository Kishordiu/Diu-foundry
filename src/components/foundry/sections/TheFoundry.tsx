import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import circuitImg from "@/assets/circuit.webp";
import cloudImg from "@/assets/cloud.webp";
import roboticsImg from "@/assets/robotics.webp";
import serverImg from "@/assets/server.webp";
import labImg from "@/assets/lab.webp";

/**
 * Chapter 02 — THE FORGE (Capabilities)
 *
 * Vertical active-state switcher. Left: numbered list.
 * Center: active capability at large editorial scale.
 * Right: associated image fragment.
 * Clicking/hovering a capability switches the composition.
 * Background ambient glow shifts per capability.
 */

const capabilities = [
  {
    id: "products",
    num: "01",
    title: "Digital Products",
    subtitle: "Web · Mobile · Platform",
    desc: "Web applications, mobile experiences, and platforms engineered for permanence — from first pixel to last deploy.",
    tags: ["React", "Next.js", "Flutter", "TypeScript"],
    img: cloudImg,
    glow: "#4b2a8f",
    icon: "product",
  },
  {
    id: "ai",
    num: "02",
    title: "AI Systems",
    subtitle: "Models · Agents · Pipelines",
    desc: "Custom models, autonomous agents, LLM pipelines, and intelligent automation composed around your domain.",
    tags: ["PyTorch", "LangChain", "OpenAI", "Computer Vision"],
    img: circuitImg,
    glow: "#6b6fbf",
    icon: "ai",
  },
  {
    id: "software",
    num: "03",
    title: "Software Engineering",
    subtitle: "APIs · Cloud · Infrastructure",
    desc: "APIs, cloud infrastructure, backend systems — architecture designed to scale invisibly behind the product.",
    tags: ["Node.js", "Python", "Rust", "AWS", "PostgreSQL"],
    img: serverImg,
    glow: "#4b2a8f",
    icon: "software",
  },
  {
    id: "iot",
    num: "04",
    title: "IoT & Embedded",
    subtitle: "Firmware · Sensors · Edge",
    desc: "Firmware, sensor networks, and edge devices trusted to run for years. Hardware meets software, precisely.",
    tags: ["C++", "ESP32", "FreeRTOS", "MQTT", "Digital Twins"],
    img: labImg,
    glow: "#c8451b",
    icon: "iot",
  },
  {
    id: "experimental",
    num: "05",
    title: "Experimental Technology",
    subtitle: "Robotics · Vision · Research",
    desc: "Generative systems, robotics, computer vision, and emerging technology — for teams building what doesn't exist yet.",
    tags: ["Robotics", "Generative AI", "CV", "Research"],
    img: roboticsImg,
    glow: "#b0223a",
    icon: "experimental",
  },
];

type Cap = (typeof capabilities)[number];

export function ForgeCapabilities() {
  const [active, setActive] = useState<Cap>(capabilities[0]);

  return (
    <section
      id="forge-section"
      className="relative bg-ink text-ivory overflow-hidden"
      style={{
        minHeight: "100svh",
        paddingTop: "clamp(6rem, 14vh, 12rem)",
        paddingBottom: "clamp(6rem, 14vh, 12rem)",
      }}
    >
      {/* Ambient glow per capability */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 50% 40% at 70% 50%, ${active.glow}22 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <div className="foundry-container relative z-10">
        {/* Chapter marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16 sm:mb-20"
        >
          <span className="h-px w-8 bg-ivory/20" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-ivory/30 font-sans">
            02 / The Forge
          </span>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: capability list */}
          <nav className="col-span-12 lg:col-span-3 flex flex-col gap-0" aria-label="Capabilities">
            {capabilities.map((cap, i) => {
              const isActive = active.id === cap.id;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActive(cap)}
                  onMouseEnter={() => setActive(cap)}
                  className="group relative text-left py-5 border-b border-ivory/8 last:border-0 transition-all duration-300"
                  style={{ outline: "none" }}
                  aria-current={isActive ? "true" : undefined}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-sans text-[9px] tracking-[0.35em] transition-colors duration-300"
                      style={{ color: isActive ? "#4b2a8f" : "rgba(245,243,239,0.25)" }}
                    >
                      {cap.num}
                    </span>
                    <span
                      className="font-display text-sm sm:text-base tracking-tight transition-colors duration-300"
                      style={{ color: isActive ? "#f5f3ef" : "rgba(245,243,239,0.4)" }}
                    >
                      {cap.title}
                    </span>
                  </div>
                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="forge-indicator"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-violet-deep"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Center: active content */}
          <div className="col-span-12 lg:col-span-5 relative min-h-[320px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Icon */}
                <CapabilityIcon type={active.icon} />

                {/* Title */}
                <h2
                  className="font-display text-ivory leading-[0.9] tracking-[-0.03em] mt-6"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
                >
                  {active.title}
                </h2>

                <p className="text-[9px] uppercase tracking-[0.4em] text-ivory/30 font-sans mt-3">
                  {active.subtitle}
                </p>

                <p className="text-[14px] sm:text-[15px] leading-[1.7] text-ivory/45 font-sans mt-6 max-w-md">
                  {active.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-[9px] uppercase tracking-[0.2em] text-ivory/40 border border-ivory/10 px-3 py-1.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: image fragment */}
          <div className="col-span-12 lg:col-span-4 relative">
            <div className="relative aspect-[3/4] overflow-hidden" data-cursor="explore">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={active.img}
                    alt={active.title}
                    className="w-full h-full object-cover"
                    style={{
                      filter: "grayscale(40%) contrast(1.1) brightness(0.7)",
                    }}
                  />
                  {/* Bottom fade to section bg */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, transparent 40%, #0b0a09 100%)",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Coordinate overlay */}
              <div className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.3em] text-ivory/25 font-sans z-10">
                CAP_{active.num}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mt-20 h-px bg-ivory/10 origin-left"
        />
      </div>
    </section>
  );
}

/** Animated SVG icons per capability type */
function CapabilityIcon({ type }: { type: string }) {
  const size = 36;

  if (type === "product") {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect
          x="4"
          y="6"
          width="28"
          height="18"
          rx="1"
          stroke="rgba(245,243,239,0.3)"
          strokeWidth="1"
        />
        <line x1="4" y1="11" x2="32" y2="11" stroke="rgba(245,243,239,0.15)" strokeWidth="1" />
        <line x1="12" y1="6" x2="12" y2="11" stroke="rgba(245,243,239,0.15)" strokeWidth="1" />
        <rect x="14" y="24" width="8" height="4" fill="rgba(245,243,239,0.1)" />
        <line x1="9" y1="28" x2="27" y2="28" stroke="rgba(245,243,239,0.2)" strokeWidth="1" />
        <line
          x1="14"
          y1="14"
          x2="26"
          y2="14"
          stroke="rgba(75,42,143,0.8)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          strokeDashoffset="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="6"
            to="0"
            dur="2s"
            repeatCount="indefinite"
          />
        </line>
      </svg>
    );
  }

  if (type === "ai") {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="3" fill="rgba(75,42,143,0.6)" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 18 + 9 * Math.cos(rad);
          const y = 18 + 9 * Math.sin(rad);
          return (
            <g key={i}>
              <line
                x1="18"
                y1="18"
                x2={x}
                y2={y}
                stroke="rgba(107,111,191,0.4)"
                strokeWidth="0.8"
                strokeDasharray="3 1"
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.4;0.9;0.4"
                  dur={`${1.5 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </line>
              <circle cx={x} cy={y} r="1.8" fill="rgba(107,111,191,0.5)">
                <animate
                  attributeName="r"
                  values="1.8;2.5;1.8"
                  dur={`${2 + i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>
    );
  }

  if (type === "software") {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <text x="4" y="16" fontFamily="monospace" fontSize="8" fill="rgba(245,243,239,0.35)">
          &lt;/&gt;
        </text>
        <line x1="4" y1="22" x2="18" y2="22" stroke="rgba(75,42,143,0.6)" strokeWidth="1.2">
          <animate attributeName="x2" values="4;20;4" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="4" y1="26" x2="14" y2="26" stroke="rgba(245,243,239,0.2)" strokeWidth="1" />
        <line x1="4" y1="30" x2="22" y2="30" stroke="rgba(245,243,239,0.12)" strokeWidth="1" />
      </svg>
    );
  }

  if (type === "iot") {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect
          x="13"
          y="13"
          width="10"
          height="10"
          rx="1"
          stroke="rgba(245,243,239,0.4)"
          strokeWidth="1"
        />
        {[
          { x: 18, y: 6 },
          { x: 30, y: 18 },
          { x: 18, y: 30 },
          { x: 6, y: 18 },
        ].map((pt, i) => (
          <g key={i}>
            <line
              x1="18"
              y1="18"
              x2={pt.x}
              y2={pt.y}
              stroke="rgba(200,69,27,0.4)"
              strokeWidth="0.8"
            />
            <circle cx={pt.x} cy={pt.y} r="2.5" fill="rgba(200,69,27,0.5)">
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur={`${1.8 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    );
  }

  // experimental
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="12" stroke="rgba(245,243,239,0.15)" strokeWidth="1" />
      <circle
        cx="18"
        cy="18"
        r="7"
        stroke="rgba(75,42,143,0.4)"
        strokeWidth="0.8"
        strokeDasharray="3 2"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 18 18"
          to="360 18 18"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="25" cy="18" r="2" fill="rgba(176,34,58,0.7)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 18 18"
          to="360 18 18"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="18" cy="18" r="2" fill="rgba(245,243,239,0.3)" />
    </svg>
  );
}
