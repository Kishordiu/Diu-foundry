import { motion } from "framer-motion";
import { useState } from "react";

const nodes = [
  { text: "Sentrix", x: 20, y: 30, type: "project" },
  { text: "Zero Trust IoT", x: 70, y: 20, type: "project" },
  { text: "OTEC System", x: 40, y: 60, type: "project" },
  { text: "AI Digital Twin", x: 80, y: 70, type: "project" },
  { text: "BrailleVision", x: 15, y: 80, type: "project" },
  { text: "Innovation DNA", x: 60, y: 45, type: "project" },
  { text: "LPG IoT", x: 30, y: 15, type: "project" },
  { text: "Foundry Platform", x: 50, y: 85, type: "project" },
];

export function AllianceMoment() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Clamp helper for desktop bounds
  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

  return (
    <section
      className="relative w-full min-h-screen bg-ink overflow-hidden border-t border-ivory/5 py-32 flex flex-col"
      id="alliance"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(0,255,128,0.03)_0%,transparent_100%)] pointer-events-none" />

      <div className="foundry-container relative z-20">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#00ff80] block mb-4">
          [ Network ]
        </span>
        <h2 className="font-display text-4xl lg:text-6xl tracking-tight uppercase text-ivory/80">
          Alliance <br /> Architecture
        </h2>
      </div>

      {/* Desktop Layout (Absolute Positioning) */}
      <div className="absolute inset-0 z-10 hidden md:block">
        {nodes.map((node, i) => {
          const isHovered = hoveredNode === i;
          const isFaded = hoveredNode !== null && !isHovered;

          // Clamped base positions
          const baseX = clamp(node.x, 5, 85);
          const baseY = clamp(node.y, 10, 85);

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredNode(i)}
              onMouseLeave={() => setHoveredNode(null)}
              initial={{ x: `${baseX}%`, y: `${baseY}%` }}
              animate={{
                x: [`${baseX}%`, `${baseX + (Math.random() * 4 - 2)}%`, `${baseX}%`],
                y: [`${baseY}%`, `${baseY + (Math.random() * 4 - 2)}%`, `${baseY}%`],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute cursor-pointer py-4 px-3"
              style={{
                left: 0,
                top: 0,
                transform: "translate(-50%, -50%)",
              }}
              data-cursor="view"
            >
              <motion.div
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  opacity: isFaded ? 0.2 : 0.8,
                }}
                className={`font-mono uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-500 ${
                  isHovered ? "text-[#00ff80] glow-neon z-50" : "text-ivory/50"
                }`}
                style={{
                  fontSize:
                    node.type === "partner"
                      ? "clamp(1rem, 2vw, 1.5rem)"
                      : "clamp(0.7rem, 2.5vw, 0.9rem)",
                }}
              >
                {node.type === "tech" && <span className="mr-2 opacity-50">⟨/⟩</span>}
                {node.text}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Connections (Svg) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden md:block">
          {nodes.map((n1, i) =>
            nodes.map((n2, j) => {
              if (i >= j) return null; // Avoid duplicate lines
              // Only connect close nodes or specific logic
              if ((i + j) % 3 !== 0) return null;

              const baseX1 = clamp(n1.x, 5, 85);
              const baseY1 = clamp(n1.y, 10, 85);
              const baseX2 = clamp(n2.x, 5, 85);
              const baseY2 = clamp(n2.y, 10, 85);

              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${baseX1}%`}
                  y1={`${baseY1}%`}
                  x2={`${baseX2}%`}
                  y2={`${baseY2}%`}
                  stroke={hoveredNode === i || hoveredNode === j ? "#00ff80" : "#f5f3ef"}
                  strokeWidth="0.5"
                  initial={{ opacity: 0.2 }}
                  animate={{
                    opacity: hoveredNode === i || hoveredNode === j ? 0.8 : 0.2,
                  }}
                  transition={{ duration: 0.5 }}
                />
              );
            }),
          )}
        </svg>
      </div>

      {/* Mobile Layout (2-Column Grid) */}
      <div className="relative z-10 md:hidden grid grid-cols-2 gap-x-2 gap-y-12 mt-16 px-4 justify-items-center items-center flex-grow">
        {nodes.map((node, i) => {
          const isHovered = hoveredNode === i;
          const isFaded = hoveredNode !== null && !isHovered;

          // Asymmetry transform offsets for mobile layout
          const offsetX = i % 2 === 0 ? -12 : 12;
          const offsetY = i % 3 === 0 ? 15 : -8;

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredNode(i)}
              onMouseLeave={() => setHoveredNode(null)}
              initial={{ x: offsetX, y: offsetY }}
              animate={{
                x: [offsetX, offsetX + (Math.random() * 4 - 2), offsetX],
                y: [offsetY, offsetY + (Math.random() * 4 - 2), offsetY],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="cursor-pointer py-4 px-3 w-full flex justify-center text-center"
              data-cursor="view"
            >
              <motion.div
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  opacity: isFaded ? 0.2 : 0.8,
                }}
                className={`font-mono uppercase tracking-[0.2em] transition-colors duration-500 ${
                  isHovered ? "text-[#00ff80] glow-neon z-50" : "text-ivory/50"
                }`}
                style={{
                  fontSize:
                    node.type === "partner"
                      ? "clamp(1rem, 2vw, 1.5rem)"
                      : "clamp(0.7rem, 2.5vw, 0.9rem)",
                }}
              >
                {node.type === "tech" && <span className="mr-2 opacity-50">⟨/⟩</span>}
                {node.text}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
