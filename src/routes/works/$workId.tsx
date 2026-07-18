import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/foundry/sections/Footer";
import { Mark } from "@/components/foundry/Mark";
import lab from "@/assets/lab.webp";
import server from "@/assets/server.webp";
import studio from "@/assets/studio.webp";

export const Route = createFileRoute("/works/$workId")({
  head: ({ params }) => {
    const w = worksData[params.workId];
    if (!w) return {};
    return {
      meta: [
        { title: `${w.client} — ${w.title.replace(/\.$/, "")} · DIU Foundry` },
        { name: "description", content: `${w.challenge} Engineered by DIU Foundry.` },
        { property: "og:title", content: `${w.client} — DIU Foundry Case Study` },
        { property: "og:description", content: w.challenge },
        { property: "og:url", content: `https://diufoundry.com/works/${params.workId}` },
        { name: "twitter:title", content: `${w.client} — DIU Foundry Case Study` },
        { name: "twitter:description", content: w.challenge },
      ],
    };
  },
  component: WorkDetail,
});

const worksData: Record<string, { year: string; client: string; title: string; tags: string[]; img: string; challenge: string; solution: string; tech: string; results: string; }> = {
  meridian: {
    year: "2025",
    client: "Meridian Robotics",
    title: "A production line that thinks.",
    tags: ["Computer Vision", "Embedded", "Cloud"],
    img: lab,
    challenge:
      "Meridian needed a way to automate quality control on their high-speed manufacturing lines without slowing down production. Existing systems were too rigid and required constant recalibration.",
    solution:
      "We built an edge-deployed computer vision pipeline that uses custom models to identify microscopic defects in real-time. The system learns continuously from the line, adapting to new product variants automatically.",
    tech: "PyTorch, TensorRT, C++, FastAPI, AWS IoT Greengrass",
    results:
      "99.8% accuracy, 400ms inference time, and a 30% increase in overall production throughput.",
  },
  aurora: {
    year: "2025",
    client: "Aurora Health",
    title: "An AI clinician in the operating theatre.",
    tags: ["LLM Agents", "Realtime", "Security"],
    img: studio,
    challenge:
      "Surgeons needed real-time access to patient history, contraindications, and procedural guidelines hands-free during complex operations.",
    solution:
      "We developed a secure, voice-activated AI assistant fine-tuned on medical literature and securely connected to Aurora's patient records. It uses local LLM execution to ensure zero latency and absolute data privacy.",
    tech: "Llama 3, Whisper, Rust, Local Kubernetes, WebRTC",
    results:
      "Deployed in 14 operating theaters, saving an average of 12 minutes per procedure and drastically reducing cognitive load.",
  },
  northwind: {
    year: "2024",
    client: "Northwind Grid",
    title: "The invisible nervous system of a city.",
    tags: ["IoT", "Infrastructure", "Analytics"],
    img: server,
    challenge:
      "Northwind's power grid was suffering from localized failures due to unpredictable weather patterns and aging infrastructure lacking modern sensors.",
    solution:
      "We engineered a massive IoT mesh network of custom ESP32 sensors that report voltage, temperature, and vibration telemetry to a central predictive analytics cloud platform.",
    tech: "ESP32, FreeRTOS, MQTT, Go, TimescaleDB, Grafana",
    results:
      "Detected 47 potential failures before they occurred in the first quarter, saving millions in repair costs and downtime.",
  },
};

function WorkDetail() {
  const { workId } = Route.useParams();
  const work = worksData[workId];

  if (!work) {
    return (
      <div className="min-h-screen bg-ivory text-ink flex flex-col items-center justify-center gap-6 text-center px-6">
        <h1 className="font-display text-4xl">Case study not found.</h1>
        <Link
          to="/works"
          className="text-[11px] uppercase tracking-[0.2em] text-ink/60 hover:text-violet-deep transition-colors"
        >
          ← Back to works
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-ink pt-32">

      {/* Hero */}
      <header className="mx-auto max-w-[1500px] px-6 py-12 md:px-12 md:py-24">
        <div className="text-[10px] uppercase tracking-[0.35em] text-ink/50 mb-6 flex items-center gap-4">
          <Link to="/works" className="hover:text-violet-deep transition-colors">
            Archive
          </Link>
          <span className="h-px w-8 bg-ink/20" />
          <span>{work.client}</span>
        </div>
        <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-8xl max-w-5xl">
          {work.title}
        </h1>
        <div className="mt-12 flex flex-wrap gap-12 border-t border-ink/10 pt-8">
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-ink/40 mb-2">Client</div>
            <div className="text-lg">{work.client}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-ink/40 mb-2">Year</div>
            <div className="text-lg">{work.year}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-ink/40 mb-2">
              Disciplines
            </div>
            <div className="flex gap-2">
              {work.tags.map((t: string) => (
                <span key={t} className="text-sm border-r border-ink/20 pr-2 last:border-0">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="w-full h-[60vh] md:h-[80vh] rounded-[2rem] overflow-hidden premium-shadow">
          <img
            src={work.img}
            className="w-full h-full object-cover"
            alt={`${work.client} — ${work.title.replace(/\.$/, "")}`}
            loading="eager"
          />
        </div>
      </div>

      {/* Editorial Content */}
      <article className="mx-auto max-w-4xl px-6 py-32 md:py-48 text-lg md:text-xl leading-relaxed text-ink/80 space-y-24">
        <section>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-ink/40 mb-8">
            <Mark className="h-4 w-4" stroke="gradient" />
            <span>The Challenge</span>
          </div>
          <p className="font-display text-3xl leading-snug md:text-4xl text-ink">
            {work.challenge}
          </p>
        </section>

        <section>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-ink/40 mb-8">
            <Mark className="h-4 w-4" stroke="gradient" />
            <span>The Solution</span>
          </div>
          <p>{work.solution}</p>
        </section>

        <section className="bg-lavender/50 -mx-6 md:-mx-12 px-6 md:px-12 py-16 rounded-[2rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="text-[10px] uppercase tracking-[0.5em] text-ink/40 mb-4">
                Technology Stack
              </div>
              <p className="text-base text-ink">{work.tech}</p>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.5em] text-ink/40 mb-4">Results</div>
              <p className="text-base font-display text-2xl text-ink">{work.results}</p>
            </div>
          </div>
        </section>
      </article>

      {/* Next Project */}
      <div className="border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-[1500px] px-6 py-32 md:px-12 text-center flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-[0.35em] text-ink/40 mb-6">
            Continue Exploring
          </div>
          <h2 className="font-display text-4xl md:text-6xl mb-12">
            Ready to forge your own spark?
          </h2>
          <Link
            to="/forge"
            className="rounded-full bg-ink text-ivory px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-violet-deep transition-colors shadow-lg hover:-translate-y-1 transform duration-300"
          >
            Start Building
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
