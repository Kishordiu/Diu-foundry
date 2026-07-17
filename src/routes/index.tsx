import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/foundry/Loader";
import { SmoothScroll } from "@/components/foundry/SmoothScroll";
import { Cursor } from "@/components/foundry/Cursor";
import { Hero } from "@/components/foundry/sections/Hero";
import { TheSpark } from "@/components/foundry/sections/TheSpark";
import { Audiences } from "@/components/foundry/sections/Audiences";
import { TheFoundry } from "@/components/foundry/sections/TheFoundry";
import { WhyDiu } from "@/components/foundry/sections/WhyDiu";
import { InnovationPhilosophy } from "@/components/foundry/sections/InnovationPhilosophy";
import { Intelligence } from "@/components/foundry/sections/Intelligence";
import { Engineering } from "@/components/foundry/sections/Engineering";
import { TechnologyWall } from "@/components/foundry/sections/TechnologyWall";
import { Testimonials } from "@/components/foundry/sections/Testimonials";
import { Process } from "@/components/foundry/sections/Process";
import { Connect } from "@/components/foundry/sections/Connect";
import { Footer } from "@/components/foundry/sections/Footer";

export const Route = createFileRoute("/")({
  component: Foundry,
});

function Foundry() {
  return (
    <div id="top" className="relative overflow-x-hidden bg-ivory text-ink">
      <Loader />
      <SmoothScroll />
      <Cursor />
      <Hero />
      <TheSpark />
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
    </div>
  );
}
