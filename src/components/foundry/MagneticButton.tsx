import { useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Crystal Oval CTA System
 * Wide, soft, organic, deeply rounded transparent optical glass.
 */
export function MagneticButton({
  children,
  to,
  hash,
  href,
  primary = false,
  cursorLabel,
  onClick,
  className = "",
}: {
  children: ReactNode;
  to?: string;
  hash?: string;
  href?: string;
  primary?: boolean;
  cursorLabel?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setT({
      x: (e.clientX - (r.left + r.width / 2)) * 0.3,
      y: (e.clientY - (r.top + r.height / 2)) * 0.3,
    });
  };

  const handleMouseLeave = () => {
    setT({ x: 0, y: 0 });
    setIsHovered(false);
    setIsPressed(false);
  };
  const handleMouseEnter = () => setIsHovered(true);

  // Tiny liquid compression on press
  const scale = isPressed ? 0.94 : isHovered ? 1.05 : 1;
  const style = {
    transform: `translate(${t.x}px, ${t.y}px) scale(${scale})`,
    transition:
      t.x === 0 && t.y === 0
        ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
        : "transform 0.1s linear",
  };

  const cls = `group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full overflow-hidden transition-all duration-700 backdrop-blur-xl focus-visible:outline-none select-none ${
    primary
      ? "bg-white/[0.02] text-ivory hover:bg-white/[0.04]"
      : "bg-transparent text-ivory/70 hover:text-ivory hover:bg-white/[0.02]"
  } ${className}`;

  const inner = (
    <>
      <span className="relative z-10 font-mono text-[9px] uppercase tracking-[0.3em] font-medium">{children}</span>
      
      {/* Subtle sea-green light inside */}
      <div className={`absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,255,128,0.08)_0%,transparent_70%)] opacity-0 transition-opacity duration-700 ${isHovered ? "opacity-100" : ""}`} />
      
      {/* Restrained spectral edge refraction */}
      <div className={`absolute inset-0 z-0 rounded-full border transition-colors duration-700 ${
        primary 
          ? isHovered ? "border-white/20 shadow-[inset_0_1px_4px_rgba(0,255,128,0.2)]" : "border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
          : isHovered ? "border-white/10" : "border-white/5"
      }`} />
      
      {/* Reflection travels across the surface */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: "-150%", opacity: 0 }}
            animate={{ x: "150%", opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 z-10 w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent skew-x-[-20deg] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Chromatic Bloom on release */}
      <AnimatePresence>
        {!isPressed && isHovered && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{ scale: 1.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-0 rounded-full border border-[#00ff80]/30 pointer-events-none mix-blend-screen"
          />
        )}
      </AnimatePresence>
    </>
  );

  const sharedProps = {
    ref: ref as any,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onTouchStart: () => setIsPressed(true),
    onTouchEnd: () => setIsPressed(false),
    onClick,
    style,
    className: cls,
    "data-cursor": cursorLabel || "",
  };

  if (href) {
    return <a href={href} {...sharedProps}>{inner}</a>;
  }
  if (to) {
    return <Link to={to} hash={hash || undefined} {...sharedProps}>{inner}</Link>;
  }
  return <button type="button" {...sharedProps}>{inner}</button>;
}
