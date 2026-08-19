import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { onLenisScroll, lenisScrollTo } from "./SmoothScroll";

const chapters = [
  { id: "hero", num: "00", label: "SPARK" },
  { id: "why", num: "01", label: "WHY" },
  { id: "forge-section", num: "02", label: "FORGE" },
  { id: "built", num: "03", label: "BUILT" },
  { id: "lab", num: "04", label: "LAB" },
  { id: "philosophy", num: "05", label: "PHILOSOPHY" },
  { id: "foundry", num: "06", label: "FOUNDRY" },
  { id: "ignite", num: "07", label: "IGNITE" },
];

/**
 * Vertical chapter rail indicator (desktop only).
 * Shows current chapter, clickable to navigate.
 */
export function ChapterIndicator() {
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getActive = (scrollY: number): string => {
      const OFFSET = 200;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY + OFFSET >= top) return chapters[i].id;
      }
      return "";
    };

    // Show indicator after scrolling past the hero
    const checkVisibility = (y: number) => {
      setVisible(y > window.innerHeight * 0.5);
      setActive(getActive(y));
    };

    checkVisibility(window.scrollY);
    const unsub = onLenisScroll(checkVisibility);

    const onScroll = () => checkVisibility(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      unsub();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) lenisScrollTo(el, { offset: -80, duration: 1.5 });
  };

  return (
    <motion.nav
      className="fixed right-6 top-1/2 z-40 -translate-y-1/2 hidden lg:flex flex-col gap-3 mix-blend-difference"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-label="Chapter navigation"
    >
      {chapters.map((ch) => {
        const isActive = active === ch.id;
        return (
          <button
            key={ch.id}
            onClick={() => handleClick(ch.id)}
            className="group flex items-center gap-2 text-right transition-all duration-300"
            aria-label={`Chapter ${ch.num} — ${ch.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Label — visible on hover or active */}
            <span
              className={`text-[9px] uppercase tracking-[0.25em] transition-all duration-300 ${
                isActive
                  ? "opacity-80 text-white translate-x-0"
                  : "opacity-0 text-white/40 translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
              }`}
            >
              {ch.num}
            </span>

            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "w-6 h-[2px] bg-white"
                  : "w-3 h-[1px] bg-white/40 group-hover:bg-white/60 group-hover:w-4"
              }`}
            />
          </button>
        );
      })}
    </motion.nav>
  );
}
