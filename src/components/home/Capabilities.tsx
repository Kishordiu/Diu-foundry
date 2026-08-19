import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const capabilities = [
  {
    id: "ai",
    title: "AI / MACHINE INTELLIGENCE",
    subtitle: "Predictive & Generative Architecture",
    description: "We deploy custom machine learning models, autonomous agents, and predictive engines inside scalable architectures. This is not generic API wrapping—it is raw intelligence woven into the fabric of the product.",
    symbols: ["⌘", "∑", "∫", "λ", "Ω"],
    color: "rgba(0, 255, 128, 0.2)",
    stroke: "#00ff80",
    work: ["Sentrix", "AI Digital Twin"]
  },
  {
    id: "digital",
    title: "DIGITAL PRODUCTS",
    subtitle: "Web & Mobile Architectures",
    description: "High-performance applications built on modern frameworks. We treat front-end development as an exact science, balancing brutalist editorial aesthetics with cinematic motion and sub-second load times.",
    symbols: ["< />", "{ }", "[ ]", "///", "&&"],
    color: "rgba(75, 42, 143, 0.2)",
    stroke: "#d6b4ff",
    work: ["Innovation DNA", "Foundry Platform"]
  },
  {
    id: "iot",
    title: "IOT / EMBEDDED",
    subtitle: "Hardware & Sensor Networks",
    description: "Bridging the physical and digital. We engineer secure edge-computing devices, real-time sensor arrays, and low-latency microcontrollers that collect, process, and transmit critical environmental data.",
    symbols: ["⚡", "∿", "⎓", "⚙", "⎇"],
    color: "rgba(200, 69, 27, 0.2)",
    stroke: "#ff7a33",
    work: ["Zero Trust IoT", "LPG IoT Safety"]
  },
  {
    id: "experimental",
    title: "EXPERIMENTAL ENGINEERING",
    subtitle: "WebGL & Interactive Systems",
    description: "Pushing the boundaries of what a browser can do. We construct immersive 3D environments, custom fluid simulations, and spatial computing interfaces that turn software into a tactile experience.",
    symbols: ["×", "△", "○", "□", "✧"],
    color: "rgba(0, 255, 255, 0.2)",
    stroke: "#00ffff",
    work: ["BrailleVision", "OTEC System"]
  }
];

export function Capabilities() {
  const [activeId, setActiveId] = useState<string | null>(null);

  // When activeId is set, the main stage remains fixed but the selected capability expands.
  const activeCap = capabilities.find(c => c.id === activeId);

  return (
    <section className="relative min-h-screen py-40 bg-ink text-ivory overflow-hidden border-y border-ivory/5" id="capabilities">
      
      {/* Background responds to active capability */}
      <AnimatePresence>
        {activeCap && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, background: `radial-gradient(circle at center, ${activeCap.color} 0%, transparent 60%)` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none mix-blend-screen" 
          />
        )}
      </AnimatePresence>

      <div className="foundry-container relative z-10 w-full px-6">
        <div className="mb-20 flex justify-between items-end pb-8 border-b border-ivory/10">
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-ivory/40">
            [ EXPERIMENTAL DISCIPLINES ]
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-ivory uppercase tracking-tight">
            Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Menu of Capabilities */}
          <div className="flex flex-col gap-2">
            {capabilities.map((cap, i) => (
              <div 
                key={cap.id} 
                onClick={() => setActiveId(activeId === cap.id ? null : cap.id)}
                className="group relative cursor-pointer"
                data-cursor="explore"
              >
                <div className="absolute inset-y-0 left-0 w-[2px] bg-ivory/10 transition-colors duration-500 group-hover:bg-ivory/30" />
                {activeId === cap.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute inset-y-0 left-0 w-[2px]"
                    style={{ backgroundColor: cap.stroke }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <div className="pl-8 py-8 transition-colors duration-500">
                  <span className="font-mono text-[10px] text-ivory/30 block mb-2 tracking-[0.2em]">0{i + 1}</span>
                  <h3 className={`font-display text-3xl lg:text-4xl tracking-tight transition-colors duration-500 ${activeId === cap.id ? "text-ivory" : "text-ivory/40 group-hover:text-ivory/80"}`} style={{ textShadow: activeId === cap.id ? `0 0 20px ${cap.stroke}` : "none" }}>
                    {cap.title}
                  </h3>
                  <p className="font-sans text-[11px] text-ivory/40 uppercase tracking-[0.2em] mt-4">
                    {cap.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Expanded Content */}
          <div className="relative min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              {activeCap ? (
                <motion.div
                  key={activeCap.id}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="w-full relative"
                >
                  <div className="absolute -top-12 -left-12 opacity-10 pointer-events-none transition-colors duration-1000" style={{ color: activeCap.stroke }}>
                    <span className="font-mono text-[12rem] leading-none">{activeCap.symbols[0]}</span>
                  </div>

                  <div className="relative z-10 backdrop-blur-md bg-white/[0.03] border border-ivory/10 p-8 lg:p-12 shadow-2xl">
                    <p className="font-sans text-sm lg:text-base leading-relaxed text-ivory/80 mb-12">
                      {activeCap.description}
                    </p>

                    <div className="grid grid-cols-2 gap-8 border-t border-ivory/10 pt-8">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ivory/30 block mb-4">
                          Signatures
                        </span>
                        <div className="flex gap-4 font-mono text-sm transition-colors duration-500" style={{ color: activeCap.stroke }}>
                          {activeCap.symbols.map((sym, i) => (
                            <span key={i}>{sym}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ivory/30 block mb-4">
                          Related Work
                        </span>
                        <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ivory/60">
                          {activeCap.work.map((w, i) => (
                            <span key={i} className="hover:text-ivory transition-colors cursor-pointer">{w}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex items-center justify-center border border-dashed border-ivory/10"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/20">
                    Select a discipline to explore
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
