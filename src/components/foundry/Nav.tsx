import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Mark } from "./Mark";
import { Menu, X } from "lucide-react";

import { Link } from "@tanstack/react-router";

const desktopLinks = [
  { to: "/", hash: "foundry", label: "The Foundry" },
  { to: "/", hash: "engineering", label: "Engineering" },
  { to: "/works", hash: "", label: "Archive" },
  { to: "/insights", hash: "", label: "Insights" },
  { to: "/forge", hash: "", label: "Forge" },
];

const mobileLinks = [
  { to: "/", hash: "top", label: "Home" },
  { to: "/", hash: "foundry", label: "The Foundry" },
  { to: "/", hash: "engineering", label: "Engineering" },
  { to: "/works", hash: "", label: "Works / Archive" },
  { to: "/forge", hash: "", label: "Forge / Intake" },
  { to: "/insights", hash: "", label: "Insights" },
  { to: "/", hash: "connect", label: "Connect" },
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
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "fixed", left: 0, right: 0, top: 0, zIndex: 50 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.5rem",
            transition: "all 0.5s",
            ...(scrolled || open
              ? {
                  backgroundColor: open ? "rgba(250,249,247,0.98)" : "rgba(250,249,247,0.75)",
                  backdropFilter: "blur(24px) saturate(150%)",
                  WebkitBackdropFilter: "blur(24px) saturate(150%)",
                  borderBottom: open ? "1px solid transparent" : "1px solid rgba(75,42,143,0.05)",
                  boxShadow: open ? "none" : "0 4px 30px -10px rgba(20,19,26,0.05)",
                }
              : {
                  backgroundColor: "transparent",
                  borderBottom: "1px solid transparent",
                }),
          }}
        >
          <Link
            to="/"
            hash="top"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
            aria-label="Home - DIU Foundry"
          >
            <Mark className="h-6 w-6 sm:h-8 sm:w-8" stroke="gradient" />
            <span
              style={{
                fontFamily: "var(--font-display, 'Playfair Display', Georgia, serif)",
                fontSize: "1.125rem",
                letterSpacing: "-0.02em",
                color: "#14131a",
              }}
            >
              DIU{" "}
              <span style={{ color: "#4b2a8f" }}>Foundry</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex">
            {desktopLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={l.hash || undefined}
                className="group relative text-[11px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-ink [&.active]:text-violet-deep"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-violet-deep transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full [&.active]:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/"
            hash="connect"
            className="hidden rounded-full border border-violet-deep/10 bg-ivory/50 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-ink backdrop-blur-md transition-all duration-500 hover:border-violet-deep hover:bg-violet-deep hover:text-ivory md:inline-block shadow-[0_4px_14px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(75,42,143,0.15)] hover:scale-[1.02]"
            aria-label="Start Building"
          >
            Start Building
          </Link>

          {/* Hamburger button — mobile only */}
          <button
            style={{
              position: "relative",
              zIndex: 60,
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "0.375rem",
            }}
            className="flex md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <X style={{ width: "1.5rem", height: "1.5rem", color: "#14131a" }} />
            ) : (
              <Menu style={{ width: "1.5rem", height: "1.5rem", color: "#14131a" }} />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay — JS-gated via {open &&}, so no Tailwind visibility class needed */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 45,
              backgroundColor: "var(--ivory)",
              pointerEvents: "auto",
              display: "flex",
              flexDirection: "column",
            }}
            aria-label="Mobile navigation menu"
          >
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "6rem 1.5rem 2.5rem", // 6rem top padding safely clears the 4.5rem header
                display: "flex",
                flexDirection: "column",
              }}
            >
              {mobileLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.1 + i * 0.04,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to={l.to}
                    hash={l.hash || undefined}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ink/5 py-4 font-display text-3xl text-ink transition-colors active:text-violet-deep"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.1 + mobileLinks.length * 0.04,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ paddingTop: "2rem", marginTop: "auto" }}
              >
                <Link
                  to="/forge"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-full bg-ink py-4 text-center text-[11px] uppercase tracking-[0.2em] text-ivory transition-colors active:bg-violet-deep"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  aria-label="Start Building"
                >
                  Start Building
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



