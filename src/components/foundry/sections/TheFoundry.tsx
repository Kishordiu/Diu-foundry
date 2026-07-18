import { motion } from "framer-motion";
import { Mark, ArcDivider } from "../Mark";
import robotics from "@/assets/robotics.webp";
import cloud from "@/assets/cloud.webp";
import warroom from "@/assets/warroom.webp";

export function TheFoundry() {
  return (
    <section id="foundry" className="relative bg-ivory text-ink">
      <div className="text-ink">
        <ArcDivider flip />
      </div>
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-20 lg:py-32 xl:py-48 md:px-12">
        <Eyebrow index="V" title="The Foundry" />
        <div className="mt-8 sm:mt-12 grid grid-cols-12 gap-4 sm:gap-6">
          <h2 className="col-span-12 font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight md:col-span-8 md:text-7xl text-balance">
            Ideas enter. <br className="hidden sm:block" />
            Innovation is forged. <br className="hidden sm:block" />
            <span className="grad-text">Technology leaves.</span>
          </h2>
          <p className="col-span-12 mt-4 sm:mt-6 max-w-md text-sm sm:text-[15px] leading-relaxed text-ink/70 md:col-span-4 md:mt-16 text-balance">
            We are a small studio of engineers, researchers, and designers who treat every product
            as an act of craft. We don't just build software—we engineer intelligent ecosystems.
          </p>
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-12 gap-6">
          <FoundryCard
            step="i"
            title="Ignite"
            copy="We interrogate the spark. Interviews, first principles, a written manifesto for the work."
            img={warroom}
          />
          <FoundryCard
            step="ii"
            title="Forge"
            copy="Architecture, models, hardware, interfaces — assembled in tight loops with the people who will use them."
            img={robotics}
            className="md:mt-16"
          />
          <FoundryCard
            step="iii"
            title="Release"
            copy="We ship, instrument, and steward the system as it meets the world. The flame keeps burning."
            img={cloud}
          />
        </div>
      </div>
    </section>
  );
}

function FoundryCard({
  step,
  title,
  copy,
  img,
  className = "",
}: {
  step: string;
  title: string;
  copy: string;
  img: string;
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group col-span-12 md:col-span-4 ${className}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] premium-shadow">
        <motion.img
          src={img}
          alt=""
          loading="lazy"
          decoding="async"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute left-6 top-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-ivory">
          <span className="font-display text-2xl italic">{step}</span>
          <span className="h-px w-8 bg-ivory/60" />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className="mt-6 font-display text-3xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">{copy}</p>
      </motion.div>
    </motion.article>
  );
}

export function Eyebrow({
  index,
  title,
  light = false,
}: {
  index: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] ${light ? "text-ivory/50" : "text-ink/50"}`}
    >
      <Mark className="h-6 w-6" stroke={light ? "#fff" : "gradient"} />
      <span>Chapter {index}</span>
      <span className={`h-px w-12 ${light ? "bg-ivory/20" : "bg-ink/20"}`} />
      <span>{title}</span>
    </div>
  );
}
