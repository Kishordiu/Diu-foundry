import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Mark } from "./Mark";
import { lenisScrollTo } from "./SmoothScroll";
import auroraImg from "@/assets/aurora.jpg";
import meridianImg from "@/assets/meridian.jpg";
import pcbImg from "@/assets/pcb.webp";
import sparkImg from "@/assets/spark_v2.webp";
import labImg from "@/assets/lab.webp";
import warroomImg from "@/assets/warroom.webp";

const mainLinks = [
  { label: "SPARK", to: "/", hash: "hero" },
  { label: "WHY FOUNDRY", to: "/", hash: "philosophy" },
  { label: "CAPABILITIES", to: "/", hash: "capabilities" },
  { label: "WORK", to: "/", hash: "work" },
  { label: "PROCESS", to: "/", hash: "process" },
];

const chapterLinks = [
  { num: "01", label: "Spark", to: "/", hash: "hero", img: sparkImg },
  { num: "02", label: "Why Foundry", to: "/", hash: "philosophy", img: pcbImg },
  { num: "03", label: "Capabilities", to: "/", hash: "capabilities", img: meridianImg },
  { num: "04", label: "Work", to: "/", hash: "work", img: auroraImg },
  { num: "05", label: "Process", to: "/", hash: "process", img: labImg },
  { num: "06", label: "Forge", to: "/forge", hash: "", img: warroomImg },
];

export function Nav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();

  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState("");
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (isHome) {
      for (let i = chapterLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapterLinks[i].hash);
        if (!el) continue;
        if (latest + window.innerHeight / 2 >= el.getBoundingClientRect().top + latest) {
          setActiveChapter(chapterLinks[i].hash);
          break;
        }
      }
    }

    if (latest <= 50) {
      setCompact(false);
      return;
    }
    if (latest > previous && latest > 150) setCompact(true);
    else setCompact(false);
  });

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = "";
      }, 100);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleHashClick = (hash: string) => {
    setMenuOpen(false);
    if (isHome && hash) {
      const el = document.getElementById(hash);
      if (el) lenisScrollTo(el, { offset: -80, duration: 1.5 });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-[60] pt-4 px-4 sm:pt-6 sm:px-6 flex justify-center pointer-events-none"
      >
        {/* Desktop Nav Bar */}
        <motion.div
          animate={{
            width: "100%",
            maxWidth: compact ? "1100px" : "1300px",
            y: compact ? -10 : 0,
            opacity: 1,
            backgroundColor: compact ? "rgba(11, 10, 9, 0.65)" : "rgba(11, 10, 9, 0.4)",
            backdropFilter: compact ? "blur(16px)" : "blur(12px)",
            paddingTop: compact ? "12px" : "18px",
            paddingBottom: compact ? "12px" : "18px",
            paddingLeft: compact ? "24px" : "32px",
            paddingRight: compact ? "24px" : "32px",
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto items-center justify-between border border-ivory/10 shadow-[0_4px_32px_rgba(0,0,0,0.15)] rounded-full hidden md:flex"
        >
          <Link
            to="/"
            onClick={() => { if (isHome) handleHashClick("hero"); }}
            className="flex items-center gap-3 focus-visible:outline-none"
            aria-label="DIU Foundry"
          >
            <Mark className="h-4 w-4" stroke="#f5f3ef" />
            <span className="font-display text-[10px] uppercase tracking-[0.25em] text-ivory">DIU Foundry</span>
          </Link>

          <nav className="flex items-center gap-8" aria-label="Main Navigation">
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash || undefined}
                onClick={link.hash ? () => handleHashClick(link.hash) : undefined}
                className="relative group text-[10px] uppercase tracking-[0.2em] text-ivory/60 hover:text-ivory transition-colors duration-300 focus-visible:outline-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              to="/forge"
              className="text-[10px] uppercase tracking-[0.2em] text-[#00ff80] font-semibold hover:text-ivory transition-colors duration-300 focus-visible:outline-none flex items-center gap-2"
            >
              FORGE
            </Link>
          </div>
        </motion.div>

        {/* Mobile Nav Bar */}
        <motion.div
          animate={{
            backgroundColor: compact ? "rgba(11, 10, 9, 0.75)" : "rgba(11, 10, 9, 0.4)",
            backdropFilter: "blur(12px)",
          }}
          className="pointer-events-auto flex md:hidden w-full items-center justify-between border border-ivory/10 shadow-[0_4px_32px_rgba(0,0,0,0.15)] rounded-full px-5 py-3.5"
        >
          <Link
            to="/"
            onClick={() => { if (isHome) handleHashClick("hero"); }}
            className="flex items-center gap-2.5 focus-visible:outline-none"
          >
            <Mark className="h-4 w-4" stroke="#f5f3ef" />
            <span className="font-display text-[9px] uppercase tracking-[0.2em] text-ivory">DIU Foundry</span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group relative w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center focus-visible:outline-none"
            aria-label="Toggle Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ivory/80 group-hover:text-violet-deep transition-colors duration-500">
              <motion.line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1" initial={{ translateY: 0, rotate: 0 }} animate={{ translateY: menuOpen ? 4 : 0, rotate: menuOpen ? 45 : 0, transformOrigin: "center" }} />
              <motion.line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1" initial={{ translateY: 0, rotate: 0 }} animate={{ translateY: menuOpen ? -4 : 0, rotate: menuOpen ? -45 : 0, transformOrigin: "center" }} />
              <motion.circle cx="12" cy="12" r="1.5" fill="currentColor" initial={{ opacity: 1 }} animate={{ opacity: menuOpen ? 0 : 1 }} />
            </svg>
          </button>
        </motion.div>
      </motion.header>

      {/* Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%", filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: "20%", filter: "blur(20px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9997] bg-ink/70 backdrop-blur-2xl border-b border-white/5 shadow-[inset_0_1px_10px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)] text-ivory overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 z-0 hidden lg:block opacity-20 transition-opacity duration-500 mix-blend-screen">
              <AnimatePresence mode="wait">
                {hoveredChapter && (
                  <motion.img
                    key={hoveredChapter}
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    src={chapterLinks.find((c) => c.hash === hoveredChapter)?.img}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="relative z-10 px-6 sm:px-12 pt-6 sm:pt-8 flex justify-between items-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ivory/50">Laboratory Index</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="group relative w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center focus-visible:outline-none"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-ivory hover:text-violet-deep transition-colors duration-500">
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1" />
                  <line x1="6" y1="18" x2="18" y2="6" stroke="currentColor" strokeWidth="1" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </button>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 max-w-7xl mx-auto w-full">
              <nav aria-label="Index Menu" className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-4">
                <div className="col-span-1 flex flex-col justify-center">
                  {chapterLinks.slice(0, 4).map((ch, i) => (
                    <MenuLink
                      key={ch.hash || ch.to}
                      ch={ch}
                      index={i}
                      onClick={() => ch.hash ? handleHashClick(ch.hash) : setMenuOpen(false)}
                      onHover={setHoveredChapter}
                    />
                  ))}
                </div>
                <div className="col-span-1 flex flex-col justify-center">
                  {chapterLinks.slice(4).map((ch, i) => (
                    <MenuLink
                      key={ch.hash || ch.to}
                      ch={ch}
                      index={i + 4}
                      onClick={() => ch.hash ? handleHashClick(ch.hash) : setMenuOpen(false)}
                      onHover={setHoveredChapter}
                    />
                  ))}
                </div>
              </nav>
            </div>

            <div className="relative z-10 px-6 sm:px-12 pb-6 sm:pb-8 flex justify-between items-end border-t border-ivory/10 pt-6 mt-auto">
              <div className="text-[9px] uppercase tracking-[0.3em] text-ivory/30">
                LAT: 23.77 · LON: 90.39 <br />
                DIU FOUNDRY
              </div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-ivory/30 text-right">
                Every idea is a spark.<br />Build the flame.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuLink({
  ch,
  index,
  onClick,
  onHover,
}: {
  ch: (typeof chapterLinks)[0];
  index: number;
  onClick: () => void;
  onHover: (hash: string | null) => void;
}) {
  const handleClick = () => {
    onClick();
    if (!ch.hash) {
      window.location.href = ch.to;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-3 sm:py-4 border-b border-ivory/5 last:border-0 block"
    >
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => onHover(ch.hash)}
        onMouseLeave={() => onHover(null)}
        className="group w-full flex items-baseline justify-between text-left focus-visible:outline-none"
        data-cursor="view"
      >
        <span className="font-display text-[clamp(1.5rem,4vw,3.5rem)] leading-none text-ivory/40 group-hover:text-ivory transition-colors duration-500 tracking-[-0.02em]">
          {ch.label}
        </span>
        <motion.span
          className="font-sans text-[10px] sm:text-[12px] text-ivory/30 tracking-[0.2em] group-hover:text-violet-deep transition-colors duration-500"
          initial={{ x: 0 }}
          whileHover={{ x: -10 }}
        >
          {ch.num}
        </motion.span>
      </button>
    </motion.div>
  );
}
