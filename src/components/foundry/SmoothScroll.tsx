import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Module-level Lenis ref — allows Nav and any other component to call
 * lenisScrollTo() without prop-drilling or context overhead.
 *
 * Safe to import anywhere: it's null until SmoothScroll mounts.
 */
let _lenis: Lenis | null = null;
const _scrollListeners: Array<(y: number) => void> = [];

export function getLenis(): Lenis | null {
  return _lenis;
}

/**
 * Programmatically scroll to a CSS selector, element, or numeric offset.
 * Respects the sticky nav height automatically via the `offset` parameter.
 */
export function lenisScrollTo(
  target: string | HTMLElement | number,
  options: { offset?: number; duration?: number } = {}
) {
  if (!_lenis) {
    // Lenis not ready — fall back to native scroll
    if (typeof target === "string") {
      const el = document.querySelector(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + (options.offset ?? -80);
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
    return;
  }
  _lenis.scrollTo(target as any, {
    offset: options.offset ?? -80,
    duration: options.duration ?? 1.35,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
  });
}

/**
 * Subscribe to scroll position changes (y in pixels).
 * Returns an unsubscribe function.
 */
export function onLenisScroll(cb: (y: number) => void): () => void {
  _scrollListeners.push(cb);
  return () => {
    const idx = _scrollListeners.indexOf(cb);
    if (idx !== -1) _scrollListeners.splice(idx, 1);
  };
}

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    _lenis = lenis;

    // Broadcast scroll position to all listeners (used by Nav scroll spy)
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      for (const cb of _scrollListeners) cb(scroll);
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      _lenis = null;
    };
  }, []);

  return null;
}
