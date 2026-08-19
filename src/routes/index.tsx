import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/home/Loader";
import { OpeningHero } from "@/components/home/OpeningHero";
import { Philosophy } from "@/components/home/Philosophy";
import { Capabilities } from "@/components/home/Capabilities";
import { SelectedWork } from "@/components/home/SelectedWork";
import { TheProcess } from "@/components/home/TheProcess";
import { ExperimentalMoment } from "@/components/home/ExperimentalMoment";
import { ContactForge } from "@/components/home/ContactForge";
import { TechStream } from "@/components/home/TechStream";
import { AllianceMoment } from "@/components/home/AllianceMoment";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DIU Foundry — Every Idea is a Spark. Build the Flame." },
      {
        name: "description",
        content:
          "DIU Foundry is a technology foundry that transforms ambitious ideas into digital products, AI systems, IoT experiences, and experimental technology.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Once loading is complete, we allow scrolling.
  // Lenis handles the smooth scroll. We just need to hide overflow-y while loading.
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className="bg-ink text-ivory selection:bg-violet-deep selection:text-ivory">
        <OpeningHero />
        <Philosophy />
        <Capabilities />
        <TechStream />
        <SelectedWork />
        <TheProcess />
        <AllianceMoment />
        <ExperimentalMoment />
        <ContactForge />
      </main>
    </>
  );
}
