import { motion } from "framer-motion";
import { Mark } from "../Mark";
import circuit from "@/assets/circuit.webp";
import { Link } from "@tanstack/react-router";

export function Connect() {
  return (
    <section id="connect" className="relative overflow-hidden grad-violet-ink text-ivory">
      <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-12 sm:gap-6 px-4 sm:px-6 py-20 lg:py-32 xl:py-48 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 md:col-span-6 z-10"
        >
          <div className="flex items-center gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-ivory/50">
            <Mark className="h-5 w-5 sm:h-6 sm:w-6" stroke="#fff" />
            <span>Chapter X · Connect</span>
          </div>
          <h2 className="mt-8 sm:mt-10 font-display text-4xl sm:text-5xl leading-[1.02] tracking-tight md:text-7xl text-balance">
            Bring us <br className="hidden sm:block" />
            your spark.
          </h2>
          <p className="mt-6 sm:mt-8 max-w-md text-sm sm:text-base leading-relaxed text-ivory/70 text-balance">
            We reply to every message within one working day, from a person, not a queue.
          </p>

          <dl className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div>
              <dt className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-ivory/40">
                Studio
              </dt>
              <dd className="mt-2 leading-relaxed text-ivory/80">
                DIU Foundry
                <br />
                Fully Remote
                <br />
                Worldwide
              </dd>
            </div>
            <div>
              <dt className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-ivory/40">
                Direct
              </dt>
              <dd className="mt-2 text-ivory/80">
                <a
                  href="mailto:diufoundry@gmail.com"
                  className="hover:text-ivory transition-colors underline underline-offset-4 decoration-ivory/20 hover:decoration-ivory/60"
                >
                  diufoundry@gmail.com
                </a>
              </dd>
            </div>
          </dl>

          {/* Social links */}
          <div className="mt-8 sm:mt-10 flex items-center gap-4">
            <a
              href="https://github.com/Kishordiu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DIU Foundry on GitHub"
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-ivory/40 hover:text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep rounded"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <span className="h-3 w-px bg-ivory/20" aria-hidden="true" />
            <a
              href="https://instagram.com/diufoundry"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DIU Foundry on Instagram"
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-ivory/40 hover:text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep rounded"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 md:col-span-5 md:col-start-8 z-10"
        >
          <div className="rounded-[2rem] border border-ivory/15 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl md:p-10 flex flex-col items-center justify-center text-center">
            <h3 className="font-display text-2xl sm:text-3xl mb-3 sm:mb-4">Start your project</h3>
            <p className="text-ivory/70 mb-6 sm:mb-8 text-xs sm:text-sm text-balance">
              Use our premium project intake form to tell us about your idea, timeline, and goals.
            </p>
            <Link
              to="/forge"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-ivory px-6 py-4 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-[#e7d9ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep"
              aria-label="Open project intake form"
            >
              Open Intake Form
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Circuit macro art — decorative only */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] opacity-30 mix-blend-screen overflow-hidden"
        aria-hidden="true"
      >
        <img src={circuit} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
    </section>
  );
}
