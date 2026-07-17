import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Mark } from "./Mark";
import { Menu, X } from "lucide-react";

import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", hash: "audiences", label: "Audiences" },
  { to: "/", hash: "foundry", label: "The Foundry" },
  { to: "/", hash: "engineering", label: "Engineering" },
  { to: "/works", hash: "", label: "Archive" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 transition-all duration-500 md:px-12 ${
          scrolled
            ? "bg-ivory/60 backdrop-blur-2xl saturate-150 border-b border-violet-deep/5 shadow-[0_4px_30px_-10px_rgba(20,19,26,0.05)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Link
          to="/"
          hash="top"
          className="flex items-center gap-2 sm:gap-3"
          aria-label="Home - DIU Foundry"
        >
          <Mark className="h-6 w-6 sm:h-8 sm:w-8" stroke="gradient" />
          <span className="font-display text-base sm:text-lg tracking-tight text-ink">
            DIU <span className="text-violet-deep">Foundry</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash || undefined}
              className="group relative text-[11px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-ink [&.active]:text-violet-deep"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-violet-deep transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav>
        <Link
          to="/"
          hash="connect"
          className="hidden rounded-full border border-violet-deep/10 bg-ivory/50 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-ink backdrop-blur-md transition-all duration-500 hover:border-violet-deep hover:bg-violet-deep hover:text-ivory md:inline-block shadow-[0_4px_14px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(75,42,143,0.15)] hover:scale-[1.02]"
          aria-label="Start Building"
        >
          Start Building
        </Link>
        <button
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep rounded-md p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6 text-ink" /> : <Menu className="h-6 w-6 text-ink" />}
        </button>
      </div>

      {/* Mobile overlay */}
      <motion.div
        initial={false}
        animate={{ clipPath: open ? "circle(150% at 90% 5%)" : "circle(0% at 90% 5%)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-40 bg-ivory/95 backdrop-blur-3xl md:hidden"
      >
        <div className="flex h-full flex-col justify-center px-6">
          {links.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, y: 30 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                delay: open ? 0.2 + i * 0.05 : 0,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                to={l.to}
                hash={l.hash || undefined}
                onClick={() => setOpen(false)}
                className="block border-b border-violet-deep/10 py-6 font-display text-4xl text-ink transition-colors hover:text-violet-deep [&.active]:text-violet-deep"
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              delay: open ? 0.2 + links.length * 0.05 : 0,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              to="/"
              hash="connect"
              onClick={() => setOpen(false)}
              className="mt-8 block rounded-full bg-ink px-6 py-4 text-center text-[11px] uppercase tracking-[0.2em] text-ivory transition-all hover:bg-violet-deep hover:scale-[1.02]"
              aria-label="Start Building"
            >
              Start Building
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}
