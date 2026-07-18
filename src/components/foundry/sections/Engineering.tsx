import { motion } from "framer-motion";
import { Eyebrow } from "./TheFoundry";

export function Engineering() {
  const disciplines = [
    {
      n: "01",
      t: "Modern Web",
      d: "React, Next, TanStack, WebGL — interfaces engineered for permanence.",
    },
    {
      n: "02",
      t: "Mobile",
      d: "Native and cross-platform apps with the feel of a tuned instrument.",
    },
    {
      n: "03",
      t: "Embedded Systems",
      d: "Firmware for devices that must be trusted to run for years.",
    },
    {
      n: "04",
      t: "IoT",
      d: "Networks of small intelligences reporting to a single, calm control plane.",
    },
    {
      n: "05",
      t: "Cloud",
      d: "AWS and edge infrastructure designed to disappear behind the product.",
    },
    {
      n: "06",
      t: "Cybersecurity",
      d: "Threat modelling, hardening, and audits built into the loop, not appended.",
    },
    { n: "07", t: "APIs", d: "Contracts that outlive teams — versioned, documented, tested." },
    {
      n: "08",
      t: "Infrastructure",
      d: "IaC, observability and delivery pipelines as quiet as a well-run kitchen.",
    },
  ];
  return (
    <section id="engineering" className="relative bg-ivory">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-20 lg:py-32 xl:py-48 md:px-12">
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          <div className="col-span-12 md:col-span-6">
            <Eyebrow index="VII" title="Engineering" />
            <h2 className="mt-8 sm:mt-10 font-display text-4xl sm:text-5xl leading-[1.02] tracking-tight md:text-6xl text-balance">
              Craft, in <br className="hidden sm:block" /> every layer.
            </h2>
          </div>
          <p className="col-span-12 max-w-md text-sm sm:text-[15px] leading-relaxed text-ink/70 md:col-span-5 md:col-start-8 mt-6 md:mt-16 text-balance">
            Eight disciplines, one editorial standard. Each service is delivered by senior
            practitioners who ship the code themselves.
          </p>
        </div>

        <div className="mt-16 sm:mt-20 grid grid-cols-12 gap-x-6 gap-y-4 sm:gap-y-6 lg:gap-y-0">
          {disciplines.map((d, i) => (
            <motion.div
              key={d.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative col-span-12 p-6 sm:p-8 md:col-span-6 lg:col-span-3 transition-all duration-700 hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(75,42,143,0.08)] rounded-[2rem] border border-transparent hover:border-ink/5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-deep/0 via-violet-deep/5 to-violet-deep/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
              
              <div className="relative z-10">
                <div className="font-display text-xs italic text-violet-deep/70">{d.n}</div>
                <h3 className="mt-4 font-display text-xl sm:text-2xl group-hover:text-violet-deep transition-colors">
                  {d.t}
                </h3>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-ink/65">{d.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
