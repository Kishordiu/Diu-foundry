import { motion } from "framer-motion";
import { Eyebrow } from "./TheFoundry";

export function Intelligence() {
  const items = [
    "Artificial Intelligence",
    "Machine Learning",
    "Large Language Models",
    "Autonomous Agents",
    "Process Automation",
    "Computer Vision",
    "Generative Systems",
  ];
  return (
    <section id="intelligence" className="relative overflow-hidden bg-lavender">
      <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-4 sm:gap-6 px-4 sm:px-6 py-20 lg:py-32 xl:py-48 md:px-12">
        <div className="col-span-12 md:col-span-5">
          <Eyebrow index="VI" title="Intelligence" />
          <h2 className="mt-8 sm:mt-10 font-display text-4xl sm:text-5xl leading-[1.02] tracking-tight md:text-6xl text-balance">
            Systems that <br className="hidden sm:block" />
            perceive, reason, <br className="hidden sm:block" />
            and <em className="italic text-violet-deep">act.</em>
          </h2>
          <p className="mt-6 sm:mt-8 max-w-md text-sm sm:text-[15px] leading-relaxed text-ink/70 text-balance">
            We compose custom models, agents and pipelines around your domain — not the other way
            around. Intelligence, in service of intent.
          </p>
        </div>

        <ul className="col-span-12 mt-12 md:mt-0 md:col-span-7">
          {items.map((it, i) => (
            <motion.li
              key={it}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-baseline border-b border-violet-deep/15 py-5 sm:py-6 md:py-8"
            >
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span className="font-display text-xs sm:text-sm italic text-violet-deep/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl sm:text-2xl tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 group-hover:text-violet-deep md:text-4xl">
                  {it}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
