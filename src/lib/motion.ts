/**
 * DIU Foundry — Motion Design System
 *
 * Central source of truth for all animation parameters.
 * Import these tokens instead of using ad-hoc values.
 */

// ── Easing Curves ────────────────────────────────────────────────────────────
// Cubic-bezier values for CSS transitions and Framer Motion

/** Editorial entrance — smooth deceleration with slight overshoot feel */
export const easeEditorial = [0.16, 1, 0.3, 1] as const;

/** Standard entrance — classic ease-out */
export const easeEntrance = [0.25, 0.46, 0.45, 0.94] as const;

/** Cinematic — slow start, slow end */
export const easeCinematic = [0.65, 0, 0.35, 1] as const;

/** Sharp — snappy micro-interactions */
export const easeSharp = [0.4, 0, 0.2, 1] as const;

/** CSS string versions */
export const easeEditorialCSS = "cubic-bezier(0.16, 1, 0.3, 1)";
export const easeEntranceCSS = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
export const easeCinematicCSS = "cubic-bezier(0.65, 0, 0.35, 1)";

// ── Duration Tokens ──────────────────────────────────────────────────────────
// Seconds

/** Micro: cursor response, hover states — 0.15–0.3s */
export const durationMicro = 0.15;
export const durationFast = 0.25;

/** UI: buttons, navigation, state changes — 0.3–0.5s */
export const durationUI = 0.35;
export const durationMedium = 0.5;

/** Content: section entrances, reveals — 0.6–1.0s */
export const durationContent = 0.7;
export const durationSlow = 1.0;

/** Cinematic: chapter transitions, large-scale motion — 0.8–1.5s */
export const durationCinematic = 1.2;

// ── Spring Configurations (Framer Motion) ────────────────────────────────────

/** Soft spring for content entrance */
export const springSoft = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

/** Magnetic spring for button/cursor interactions */
export const springMagnetic = {
  type: "spring" as const,
  stiffness: 180,
  damping: 22,
  mass: 0.5,
};

/** Snappy spring for UI elements */
export const springSnappy = {
  type: "spring" as const,
  stiffness: 260,
  damping: 25,
  mass: 0.4,
};

/** Gentle spring for parallax and slow settling */
export const springGentle = {
  type: "spring" as const,
  stiffness: 60,
  damping: 20,
  mass: 1,
};

// ── Framer Motion Transition Presets ─────────────────────────────────────────

/** Default content reveal transition */
export const revealTransition = {
  duration: durationContent,
  ease: "easeOut",
};

/** Fast UI transition */
export const uiTransition = {
  duration: durationUI,
  ease: "easeOut",
};

/** Cinematic transition for major reveals */
export const cinematicTransition = {
  duration: durationCinematic,
  ease: "easeOut",
};

// ── Stagger Utilities ────────────────────────────────────────────────────────

/** Default stagger delay between child elements */
export const staggerChildren = 0.08;

/** Slow stagger for editorial reveals */
export const staggerEditorial = 0.12;

// ── Viewport Margins ────────────────────────────────────────────────────────

/** Default inView margin for scroll-triggered animations */
export const viewportMargin = "-100px";

/** Earlier trigger for above-fold content */
export const viewportMarginEarly = "-50px";

// ── Scroll-linked Ranges ────────────────────────────────────────────────────

/** Standard parallax range */
export const parallaxRange = {
  offset: ["start end", "end start"] as const,
  yRange: ["0%", "-15%"] as const,
  scaleRange: [1, 1.08] as const,
};

/** Deep parallax for hero/cinematic sections */
export const parallaxDeep = {
  offset: ["start end", "end start"] as const,
  yRange: ["0%", "-25%"] as const,
  scaleRange: [1.05, 1.2] as const,
};
