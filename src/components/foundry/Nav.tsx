import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Mark } from "./Mark";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { lenisScrollTo, onLenisScroll } from "./SmoothScroll";

// ─── Section IDs that live on the home page (/) ────────────────────────────
// Used both for desktop scroll links and for the scroll-spy active state.
const HOME_SECTIONS = [
  "top",
  "foundry",
  "audiences",
  "why-diu",
  "intelligence",
  "engineering",
  "arsenal",
  "process",
  "connect",
];

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

// ─── Smooth hash-scroll handler ─────────────────────────────────────────────
// Intercepts the browser's default hash navigation and replaces it with
// a Lenis-driven scroll so there is no race between Lenis and the browser.
function scrollToHash(hash: string) {
  if (!hash) return;
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  const el = document.getElementById(id);
  if (!el) return;
  lenisScrollTo(el, { offset: -80, duration: 1.2 });
}

// ─── Scroll-spy hook ─────────────────────────────────────────────────────────
function useActiveSection(enabled: boolean): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) return;

    const getActive = (scrollY: number): string => {
      // Walk sections in reverse — the last one above the midpoint wins.
      const OFFSET = 120; // px below nav where we consider a section "active"
      for (let i = HOME_SECTIONS.length - 1; i >= 0; i--) {
        const id = HOME_SECTIONS[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY + OFFSET >= top) return id;
      }
      return "";
    };

    // Initial paint
    setActive(getActive(window.scrollY));

    // Subscribe to Lenis scroll events
    const unsub = onLenisScroll((y) => {
      setActive(getActive(y));
    });

    // Also listen to native scroll (for pages without Lenis, e.g. forge)
    const onScroll = () => setActive(getActive(window.scrollY));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      unsub();
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  return active;
}

// ─── Nav link active-state helper ───────────────────────────────────────────
function isLinkActive(link: (typeof desktopLinks)[number], active: string, pathname: string) {
  if (link.to !== "/" && link.hash === "") {
    return pathname === link.to || pathname.startsWith(link.to + "/");
  }
  if (link.to === "/" && link.hash) {
    return active === link.hash;
  }
  return false;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Only run scroll-spy on the home page (sections only exist there)
  const activeSection = useActiveSection(isHome);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Set initial state without waiting for a scroll event
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleHashLink = useCallback(
    (e: React.MouseEvent, to: string, hash: string) => {
      if (to === "/" && hash && isHome) {
        // Already on home page — intercept and use Lenis
        e.preventDefault();
        setOpen(false);
        scrollToHash(hash);
        // Update URL hash without causing a page scroll
        window.history.pushState(null, "", hash ? `#${hash}` : "/");
      } else {
        setOpen(false);
      }
    },
    [isHome]
  );

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
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleHashLink(e, "/", "top")}
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
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {desktopLinks.map((l) => {
              const active = isLinkActive(l, activeSection, pathname);
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  hash={l.hash || undefined}
                  onClick={(e) => handleHashLink(e, l.to, l.hash)}
                  className="group relative text-[11px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep rounded"
                  aria-current={active ? "page" : undefined}
                  style={{ color: active ? "#4b2a8f" : undefined }}
                >
                  {l.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px bg-violet-deep transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: active ? "100%" : "0%" }}
                  />
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-violet-deep transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/"
            hash="connect"
            onClick={(e) => handleHashLink(e, "/", "connect")}
            className="hidden rounded-full border border-violet-deep/10 bg-ivory/50 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-ink backdrop-blur-md transition-all duration-500 hover:border-violet-deep hover:bg-violet-deep hover:text-ivory md:inline-block shadow-[0_4px_14px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(75,42,143,0.15)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep"
            aria-label="Start Building"
          >
            Start Building
          </Link>

          {/* Hamburger — mobile only */}
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
            className="flex md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? (
              <X style={{ width: "1.5rem", height: "1.5rem", color: "#14131a" }} />
            ) : (
              <Menu style={{ width: "1.5rem", height: "1.5rem", color: "#14131a" }} />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
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
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "6rem 1.5rem 2.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {mobileLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.04,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to={l.to}
                    hash={l.hash || undefined}
                    onClick={(e) => handleHashLink(e, l.to, l.hash)}
                    className="block border-b border-ink/5 py-4 font-display text-3xl text-ink transition-colors active:text-violet-deep hover:text-violet-deep focus-visible:outline-none focus-visible:text-violet-deep"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                    aria-current={
                      isLinkActive({ to: l.to, hash: l.hash, label: l.label }, activeSection, pathname)
                        ? "page"
                        : undefined
                    }
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
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
                  className="block w-full rounded-full bg-ink py-4 text-center text-[11px] uppercase tracking-[0.2em] text-ivory transition-colors active:bg-violet-deep hover:bg-violet-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  aria-label="Start Building — Go to project intake form"
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
