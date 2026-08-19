import { motion } from "framer-motion";
import { Mark } from "../Mark";

const principles = [
  {
    n: "01",
    title: "Senior-only execution",
    body: "Every line of code, model, and embedded system is shipped by senior practitioners — not junior teams managed from above.",
  },
  {
    n: "02",
    title: "Weekly shipping loops",
    body: "We work in tight, visible cycles. Every week you see real progress. No quarter-long black boxes.",
  },
  {
    n: "03",
    title: "No procurement theatre",
    body: "We skip the twelve-week discovery phases and slide decks. We listen, draft a brief, and start forging.",
  },
  {
    n: "04",
    title: "Engineering for permanence",
    body: "We don't ship prototypes and disappear. Every system is built to evolve — documented, observable, and maintainable.",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ivory" aria-labelledby="principles-heading">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-20 lg:py-32 xl:py-48 md:px-12 border-t border-ink/10">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-ink/50">
          <Mark className="h-5 w-5 sm:h-6 sm:w-6" stroke="gradient" />
          <span>Chapter VIII</span>
          <span className="h-px w-8 sm:w-12 bg-ink/20" />
          <span>What we stand for</span>
        </div>

        {/* Heading */}
        <motion.h2
          id="principles-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10 sm:mt-14 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] tracking-tight max-w-2xl text-balance"
        >
          How we work with <br className="hidden sm:block" />
          <span className="grad-text">every team we forge with.</span>
        </motion.h2>

        {/* Principles grid */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/8">
          {principles.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, filter: "blur(4px)", y: 16 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: "easeOut" }}
              className="group relative bg-ivory p-8 sm:p-10 md:p-14 hover:bg-white transition-colors duration-500 overflow-hidden isolate"
            >
              {/* Hover accent line */}
              <motion.span
                className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-deep/50 to-transparent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
                aria-hidden="true"
              />

              <div
                className="absolute -right-4 -bottom-8 font-display text-[10rem] md:text-[14rem] text-violet-deep/[0.02] blur-[2px] transition-colors duration-500 group-hover:text-violet-deep/[0.04] select-none leading-none -z-10"
                aria-hidden="true"
              >
                {p.n}
              </div>
              <div className="relative z-10">
                <h3 className="mt-4 font-display text-xl sm:text-2xl md:text-3xl group-hover:text-violet-deep transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-ink/65 max-w-sm">
                  {p.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
