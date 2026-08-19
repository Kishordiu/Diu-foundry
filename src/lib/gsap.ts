/**
 * GSAP + ScrollTrigger — Lazy Initialization
 *
 * Registers plugins once. Import this module wherever GSAP is needed.
 * GSAP is already installed in the project but was previously unused.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins. Safe to call multiple times. */
export function initGSAP() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/** Re-export for convenience */
export { gsap, ScrollTrigger };
