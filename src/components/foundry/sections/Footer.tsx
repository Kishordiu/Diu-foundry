import { Link } from "@tanstack/react-router";
import { Mark } from "../Mark";

/**
 * Footer — ultra-minimal.
 * Three lines + nav links. Dark background continues from Ignite.
 */
export function Footer() {
  return (
    <footer className="relative bg-ink text-ivory border-t border-ivory/6">
      <div className="foundry-container py-12 sm:py-16">
        {/* Top row: brand + nav */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 focus-visible:outline-none"
              aria-label="DIU Foundry — Home"
            >
              <Mark className="h-5 w-5" stroke="#f5f3ef" />
              <span className="font-display text-sm tracking-[0.1em] uppercase text-ivory">
                DIU Foundry
              </span>
            </Link>
            <p className="mt-3 text-[11px] leading-relaxed text-ivory/25 font-sans max-w-[220px]">
              Every Idea is a Spark. <br />
              Build the Flame.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex gap-12 sm:gap-16">
            <nav aria-label="Studio">
              <div className="text-[8px] uppercase tracking-[0.4em] text-ivory/20 font-sans mb-4">
                Studio
              </div>
              <ul className="space-y-3">
                {[
                  { label: "Work", to: "/works" },
                  { label: "Lab", to: "/", hash: "lab" },
                  { label: "Forge", to: "/forge" },
                  { label: "Insights", to: "/insights" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      hash={l.hash}
                      className="text-[11px] text-ivory/35 hover:text-ivory transition-colors duration-300 font-sans uppercase tracking-[0.1em]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Elsewhere">
              <div className="text-[8px] uppercase tracking-[0.4em] text-ivory/20 font-sans mb-4">
                Elsewhere
              </div>
              <ul className="space-y-3">
                {[
                  { label: "GitHub", href: "https://github.com/Kishordiu" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/company/diufoundary/" },
                  { label: "Instagram", href: "https://instagram.com/diufoundry" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-ivory/35 hover:text-ivory transition-colors duration-300 font-sans uppercase tracking-[0.1em]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-ivory/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[9px] uppercase tracking-[0.3em] text-ivory/20 font-sans">
          <span>© {new Date().getFullYear()} DIU Foundry</span>
          <span>Dominance · Intelligence · Unity</span>
        </div>
      </div>
    </footer>
  );
}
