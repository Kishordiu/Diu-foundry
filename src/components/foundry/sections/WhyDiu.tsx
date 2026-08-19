import { motion } from "framer-motion";
import { MagneticButton } from "@/components/foundry/MagneticButton";
import warroom from "@/assets/warroom.webp";

/**
 * Chapter 06 — THE FOUNDRY (Studio identity)
 *
 * Light ivory section — palette contrast shift.
 * Studio principles as editorial statements.
 * Full-width warroom editorial photo strip at the bottom.
 */
const principles = [
  {
    title: "Engineers, not managers.",
    desc: "Every project is handled by senior practitioners. The people you talk to are the people building your product.",
  },
  {
    title: "Precision in every layer.",
    desc: "We treat software as craft. Typography, motion, invisible details — obsessive attention at every level.",
  },
  {
    title: "Hardware meets software.",
    desc: "We build the cloud, the UI, and the embedded systems beneath them. Few studios can say that.",
  },
  {
    title: "Long-term stewardship.",
    desc: "Robust testing, scalable architectures, proactive security. We build systems meant to last.",
  },
];

export function WhyDiu() {
  return (
    <section id="foundry" className="relative bg-ivory text-ink overflow-hidden">
      <div
        style={{
          paddingTop: "clamp(6rem, 14vh, 12rem)",
          paddingBottom: "clamp(3rem, 6vh, 6rem)",
        }}
      >
        <div className="foundry-container">
          {/* Chapter marker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-16 sm:mb-20"
          >
            <span className="h-px w-8 bg-ink/15" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-ink/30 font-sans">
              06 / The Foundry
            </span>
          </motion.div>

          {/* Header */}
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7">
              <h2
                className="font-display text-ink leading-[0.92] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)" }}
              >
                We are a{" "}
                <span
                  className="font-display"
                  style={{
                    background: "linear-gradient(120deg, #4b2a8f 0%, #6b6fbf 60%, #b0223a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Technology Foundry.
                </span>
              </h2>
            </div>

            <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col justify-end gap-6">
              <p className="text-[14px] leading-[1.7] text-ink/45 font-sans">
                Not a traditional agency churning out templates. A boutique studio of experts who
                forge intelligent systems and premium digital experiences from the ground up.
              </p>
              <div>
                <MagneticButton to="/forge" cursorLabel="open">
                  Work with the Foundry
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Principles grid */}
          <div className="mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/8">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: "easeOut" }}
                className="bg-ivory p-8 sm:p-12 md:p-14 group hover:bg-pearl transition-colors duration-500"
              >
                <h3 className="font-display text-xl sm:text-2xl text-ink group-hover:text-violet-deep transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="mt-4 text-[13px] sm:text-[14px] leading-[1.7] text-ink/45 max-w-sm font-sans">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width editorial photo strip */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(240px, 40vh, 480px)" }}
      >
        <img
          src={warroom}
          alt="The Foundry at work"
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(30%) contrast(1.05) brightness(0.85)" }}
        />
        {/* Top gradient — blend with ivory above */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #f5f3ef 0%, transparent 20%, transparent 80%, #f5f3ef 100%)",
          }}
        />
        {/* Centered text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-ivory/60 font-sans block">
              Dominance · Intelligence · Unity
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
