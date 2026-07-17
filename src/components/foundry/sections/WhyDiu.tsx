import { motion } from "framer-motion";
import { Mark } from "../Mark";
import { MagneticButton } from "./Hero";

export function WhyDiu() {
  const points = [
    {
      title: "Engineers, not managers.",
      desc: "Every project is handled by senior practitioners. No bloated hierarchies. The people you talk to are the people building your product.",
    },
    {
      title: "Precision in every pixel.",
      desc: "We treat software as craft. A premium digital experience requires an obsessive attention to typography, motion, and invisible details.",
    },
    {
      title: "Hardware meets Software.",
      desc: "We are unique in our ability to build not just the cloud infrastructure and the UI, but the embedded systems and IoT devices beneath them.",
    },
    {
      title: "Long-term stewardship.",
      desc: "We build systems meant to last. Robust testing, scalable architectures, and proactive security are not afterthoughts—they are the foundation.",
    },
  ];

  return (
    <section id="why-diu" className="relative bg-ivory">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-20 lg:py-32 xl:py-48 md:px-12">
        <div className="flex items-center gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-ink/50">
          <Mark className="h-5 w-5 sm:h-6 sm:w-6" stroke="gradient" />
          <span>Chapter III</span>
          <span className="h-px w-8 sm:w-12 bg-ink/20" />
          <span>Why DIU</span>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-12 gap-4 sm:gap-6">
          <div className="col-span-12 md:col-span-6">
            <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight md:text-7xl text-balance">
              We are a <br className="hidden sm:block" />
              <span className="grad-text">Technology Foundry.</span>
            </h2>
          </div>
          <div className="col-span-12 mt-4 sm:mt-0 md:col-span-5 md:col-start-8">
            <p className="max-w-lg text-sm sm:text-[15px] leading-relaxed text-ink/70 text-balance">
              We are not a traditional software agency churning out generic templates. We are a
              boutique studio of experts who forge intelligent systems and premium digital
              experiences from the ground up.
            </p>
            <div className="mt-8 sm:mt-10">
              <MagneticButton to="/" hash="forge">
                Work with the foundry
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-ivory p-8 sm:p-10 md:p-16 hover:bg-white transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(75,42,143,0.08)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-deep/0 via-violet-deep/5 to-violet-deep/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-deep/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-violet-deep/10 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl sm:text-3xl mb-4 sm:mb-6 relative z-10"
              >
                {p.title}
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-ink/65 leading-relaxed text-sm sm:text-[15px] relative z-10"
              >
                {p.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
