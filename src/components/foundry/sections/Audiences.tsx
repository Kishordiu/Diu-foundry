import { motion } from "framer-motion";
import { Mark, ArcDivider } from "../Mark";
import { Link } from "@tanstack/react-router";

const audiences = [
  {
    role: "Startup Founder",
    description:
      "Move from pre-seed concept to a scalable AI product. We build the architecture, interfaces, and intelligent backends to secure your next round.",
  },
  {
    role: "Enterprise & Business",
    description:
      "Automate legacy workflows and integrate custom LLM pipelines into your existing systems securely and efficiently.",
  },
  {
    role: "Researcher & University",
    description:
      "Translate complex academic research into deployable software, IoT prototypes, and interactive data visualizations.",
  },
  {
    role: "Individual Creator",
    description:
      "Bring ambitious digital experiences to life. Whether it's an art installation, a niche app, or an experimental agent.",
  },
];

export function Audiences() {
  return (
    <section id="audiences" className="relative bg-ink text-ivory">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-20 lg:py-32 xl:py-48 md:px-12">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-ivory/50">
              <Mark className="h-5 w-5 sm:h-6 sm:w-6" stroke="#fff" />
              <span>Chapter II</span>
              <span className="h-px w-8 sm:w-12 bg-ivory/20" />
              <span>Audiences</span>
            </div>
            <h2 className="mt-8 sm:mt-10 font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight md:text-6xl text-balance">
              Who we <br className="hidden sm:block" />
              <em className="italic text-[#e7d9ff]">build for.</em>
            </h2>
            <p className="mt-6 sm:mt-8 max-w-sm text-sm sm:text-[15px] leading-relaxed text-ivory/70 text-balance">
              We partner with visionaries across the spectrum—from individual researchers with a
              spark, to enterprises ready to ignite their operations.
            </p>
          </div>

          <div className="col-span-12 mt-12 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-6 md:col-span-6 md:col-start-7 md:mt-0 md:grid-cols-2">
            {audiences.map((audience, i) => (
              <motion.div
                key={audience.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="glass-panel-dark flex flex-col justify-between rounded-[2rem] p-6 sm:p-8 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(200,182,255,0.1)] border border-ivory/10 bg-ivory/[0.03]"
              >
                <div>
                  <div className="font-display text-xl sm:text-2xl mb-3 sm:mb-4">
                    {audience.role}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-ivory/60">
                    {audience.description}
                  </p>
                </div>
                <Link
                  to="/forge"
                  className="mt-6 sm:mt-8 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-ivory/40 flex items-center gap-2 hover:text-ivory/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep rounded"
                  aria-label={`Start a project as ${audience.role}`}
                >
                  Start a project <span aria-hidden="true">↗</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
