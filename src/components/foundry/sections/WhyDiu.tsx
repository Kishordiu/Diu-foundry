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
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-ivory p-8 sm:p-10 md:p-16 hover:bg-white transition-colors duration-500"
            >
              <div className="font-display text-2xl sm:text-3xl mb-4 sm:mb-6">{p.title}</div>
              <p className="text-ink/65 leading-relaxed text-sm sm:text-[15px]">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
