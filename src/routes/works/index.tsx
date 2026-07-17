import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Footer } from "@/components/foundry/sections/Footer";
import { Mark } from "@/components/foundry/Mark";
import robotics from "@/assets/robotics.png";
import cloud from "@/assets/cloud.png";
import warroom from "@/assets/warroom.png";

export const Route = createFileRoute("/works/")({
  head: () => ({
    meta: [
      { title: "Forged Works — DIU Foundry Case Studies" },
      {
        name: "description",
        content:
          "A curated archive of intelligent systems, platforms, and digital experiences engineered by DIU Foundry — from robotics to AI healthcare.",
      },
      { property: "og:title", content: "Forged Works — DIU Foundry Case Studies" },
      {
        property: "og:description",
        content:
          "A curated archive of intelligent systems, platforms, and experiences engineered by DIU Foundry.",
      },
      { property: "og:url", content: "https://diufoundry.com/works" },
      { name: "twitter:title", content: "Forged Works — DIU Foundry Case Studies" },
      {
        name: "twitter:description",
        content:
          "A curated archive of intelligent systems, platforms, and experiences engineered by DIU Foundry.",
      },
    ],
  }),
  component: Works,
});

const works = [
  {
    id: "meridian",
    year: "2025",
    client: "Meridian Robotics",
    title: "A production line that thinks.",
    tags: ["Computer Vision", "Embedded", "Cloud"],
    img: robotics,
  },
  {
    id: "aurora",
    year: "2025",
    client: "Aurora Health",
    title: "An AI clinician in the operating theatre.",
    tags: ["LLM Agents", "Realtime", "Security"],
    img: warroom,
  },
  {
    id: "northwind",
    year: "2024",
    client: "Northwind Grid",
    title: "The invisible nervous system of a city.",
    tags: ["IoT", "Infrastructure", "Analytics"],
    img: cloud,
  },
];

function Works() {
  return (
    <div className="min-h-screen bg-ivory text-ink pt-24 sm:pt-32">
      <main className="mx-auto max-w-[1500px] px-4 sm:px-6 py-8 sm:py-12 md:px-12">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-ink/50">
            <Mark className="h-5 w-5 sm:h-6 sm:w-6" stroke="gradient" />
            <span>Archive</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.02] tracking-tight md:text-8xl text-balance">
            Forged <em className="italic text-violet-deep">Works.</em>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-[15px] leading-relaxed text-ink/70 text-balance">
            A selection of intelligent systems, platforms, and experiences we have engineered. Each
            project represents our commitment to precision, scale, and long-term stewardship.
          </p>
        </div>

        <div className="mt-16 sm:mt-24 space-y-20 sm:space-y-32 mb-24 sm:mb-32">
          {works.map((w, i) => (
            <Work key={w.id} work={w} index={i} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Work({ work, index }: { work: (typeof works)[number]; index: number }) {
  const reverse = index % 2 === 1;
  return (
    <article className="grid grid-cols-12 gap-6 sm:gap-8 items-center">
      <div className={`col-span-12 md:col-span-7 ${reverse ? "md:order-2 md:col-start-6" : ""}`}>
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(10px)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to={`/works/${work.id}`}
            className="block relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-[2rem] premium-shadow hover:premium-shadow-hover transition-shadow duration-500 group"
            aria-label={`View case study: ${work.title} — ${work.client}`}
          >
            <motion.img
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              src={work.img}
              alt={`${work.client} — ${work.title}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-105 group-hover:brightness-105"
            />
            {/* Subtle vignette that lifts on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700" />
          </Link>
        </motion.div>
      </div>
      <div
        className={`col-span-12 flex flex-col justify-center md:col-span-4 ${reverse ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}
      >
        <motion.div
          initial={{ opacity: 0, x: reverse ? -20 : 20, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-ink/50">
            {work.year} · {work.client}
          </div>
          <Link to={`/works/${work.id}`} className="group/title mt-3 sm:mt-4 inline-block">
            <h3 className="font-display text-3xl sm:text-4xl leading-tight md:text-5xl text-ink transition-colors duration-300 group-hover/title:text-violet-deep">
              {work.title}
            </h3>
            {/* Underline reveal */}
            <span
              className="block h-px w-0 bg-violet-deep mt-2 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/title:w-full"
              aria-hidden="true"
            />
          </Link>
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2">
            {work.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink/10 bg-white/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-deep/30 hover:text-violet-deep cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to={`/works/${work.id}`}
              className="group/link inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:text-violet-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep rounded"
            >
              View Case Study
              <span
                className="transition-transform duration-300 group-hover/link:translate-x-1.5"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
