import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

// ── Above fold: loaded immediately for fast FCP + LCP ──────────────────────
import { Loader } from "@/components/foundry/Loader";
import { SmoothScroll } from "@/components/foundry/SmoothScroll";
import { Cursor } from "@/components/foundry/Cursor";
import { Hero } from "@/components/foundry/sections/Hero";
import { TheSpark } from "@/components/foundry/sections/TheSpark";
// Footer is statically imported by other routes (insights, works), so no benefit to lazy-loading it here
import { Footer } from "@/components/foundry/sections/Footer";

// ── Below fold: lazily loaded after the hero is painted ────────────────────
const Audiences = lazy(() =>
  import("@/components/foundry/sections/Audiences").then((m) => ({ default: m.Audiences }))
);
const TheFoundry = lazy(() =>
  import("@/components/foundry/sections/TheFoundry").then((m) => ({ default: m.TheFoundry }))
);
const WhyDiu = lazy(() =>
  import("@/components/foundry/sections/WhyDiu").then((m) => ({ default: m.WhyDiu }))
);
const InnovationPhilosophy = lazy(() =>
  import("@/components/foundry/sections/InnovationPhilosophy").then((m) => ({
    default: m.InnovationPhilosophy,
  }))
);
const Intelligence = lazy(() =>
  import("@/components/foundry/sections/Intelligence").then((m) => ({ default: m.Intelligence }))
);
const Engineering = lazy(() =>
  import("@/components/foundry/sections/Engineering").then((m) => ({ default: m.Engineering }))
);
const TechnologyWall = lazy(() =>
  import("@/components/foundry/sections/TechnologyWall").then((m) => ({
    default: m.TechnologyWall,
  }))
);
const Testimonials = lazy(() =>
  import("@/components/foundry/sections/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const Process = lazy(() =>
  import("@/components/foundry/sections/Process").then((m) => ({ default: m.Process }))
);
const Connect = lazy(() =>
  import("@/components/foundry/sections/Connect").then((m) => ({ default: m.Connect }))
);

export const Route = createFileRoute("/")({
  component: Foundry,
});

function Foundry() {
  return (
    <div id="top" className="relative overflow-x-hidden bg-ivory text-ink">
      <Loader />
      <SmoothScroll />
      <Cursor />
      {/* Above fold — painted immediately */}
      <Hero />
      <TheSpark />
      {/* Below fold — deferred until after hero paint */}
      <Suspense fallback={null}>
        <Audiences />
        <TheFoundry />
        <WhyDiu />
        <InnovationPhilosophy />
        <Intelligence />
        <Engineering />
        <TechnologyWall />
        <Testimonials />
        <Process />
        <Connect />
        <Footer />
      </Suspense>
    </div>
  );
}
