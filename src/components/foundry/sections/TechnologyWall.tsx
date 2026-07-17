import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mark } from "../Mark";

const categories = [
  {
    name: "Artificial Intelligence",
    description: "Custom models, agents and pipelines engineered around your domain.",
    tools: ["OpenAI", "Anthropic", "TensorFlow", "PyTorch", "Hugging Face", "LangChain"],
  },
  {
    name: "Web & Mobile",
    description: "Interfaces engineered for permanence — from pixel to interaction.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Flutter"],
  },
  {
    name: "Backend & Cloud",
    description: "Scalable infrastructure designed to disappear behind the product.",
    tools: ["Node.js", "Python", "Rust", "Go", "AWS", "Supabase", "PostgreSQL"],
  },
  {
    name: "Embedded & IoT",
    description: "Firmware for devices trusted to run, reliably, for years.",
    tools: ["C++", "ESP32", "Arduino", "Raspberry Pi", "FreeRTOS", "MQTT"],
  },
  {
    name: "Infrastructure",
    description: "IaC, pipelines, and observability as quiet as a well-run kitchen.",
    tools: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Vercel", "Cloudflare"],
  },
];

function TiltCard({ cat, index }: { cat: (typeof categories)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 24, mass: 0.5 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800 }}
      className="col-span-12 sm:col-span-6 xl:col-span-4"
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full overflow-hidden rounded-[2rem] border border-ink/8 bg-white p-7 sm:p-8 shadow-sm transition-shadow duration-500 hover:premium-shadow isolate"
      >
        {/* Subtle radial sheen that follows cursor */}
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at calc(50% + ${rawX.get() * 400}px) calc(50% + ${rawY.get() * 400}px), rgba(75, 42, 143, 0.04), transparent 40%)`,
          }}
        />

        {/* Background Numeral */}
        <div
          className="absolute -right-2 -bottom-6 font-display text-[8rem] italic text-violet-deep/[0.02] blur-[1px] transition-all duration-500 group-hover:text-violet-deep/[0.04] group-hover:-rotate-3 select-none -z-10"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10">
          <div className="font-display text-[10px] uppercase tracking-[0.2em] text-violet-deep/60 mb-3 flex items-center gap-2">
            <span className="h-px w-4 bg-violet-deep/20" /> Arsenal Area
          </div>

          <h3 className="font-display text-xl sm:text-2xl text-ink mb-2 transition-colors group-hover:text-violet-deep">
            {cat.name}
          </h3>
          <p className="text-sm leading-relaxed text-ink/65 mb-6">{cat.description}</p>

          <div className="flex flex-wrap gap-2">
            {cat.tools.map((t) => (
              <motion.span
                key={t}
                initial={{ opacity: 0.8, y: 0 }}
                whileHover={{ opacity: 1, y: -2 }}
                transition={{ duration: 0.2 }}
                className="rounded-full border border-ink/10 bg-ivory/50 px-3 py-1.5 text-[10px] sm:text-xs tracking-wide text-ink/70"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TechnologyWall() {
  return (
    <section id="arsenal" className="relative overflow-hidden bg-ivory">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-20 lg:py-32 xl:py-48 md:px-12">
        <div className="flex items-center gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-ink/50">
          <Mark className="h-5 w-5 sm:h-6 sm:w-6" stroke="gradient" />
          <span>Chapter VIII</span>
          <span className="h-px w-8 sm:w-12 bg-ink/20" />
          <span>The Arsenal</span>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-12 gap-4 sm:gap-6">
          <div className="col-span-12 md:col-span-6">
            <h2 className="max-w-3xl font-display text-4xl sm:text-5xl leading-[1.02] tracking-tight md:text-6xl text-balance">
              An ecosystem of <br className="hidden sm:block" />
              <span className="italic text-violet-deep">precision tools.</span>
            </h2>
          </div>
          <div className="col-span-12 mt-4 sm:mt-0 md:col-span-5 md:col-start-8 flex items-end">
            <p className="text-sm sm:text-[15px] leading-relaxed text-ink/70 text-balance">
              We do not tie ourselves to a single framework. We orchestrate the optimal combination
              of modern software, AI models, and hardware for your specific challenge.
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-12 gap-6">
          {categories.map((cat, i) => (
            <TiltCard key={cat.name} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
