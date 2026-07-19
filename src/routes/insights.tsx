import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Footer } from "@/components/foundry/sections/Footer";
import { Mark } from "@/components/foundry/Mark";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights \u2014 Engineering Blogs & Research from DIU Foundry" },
      {
        name: "description",
        content:
          "Engineering blogs, research papers, open-source releases, and architectural thoughts from the DIU Foundry floor. Covering AI, embedded systems, IoT, and modern software craft.",
      },
      {
        property: "og:title",
        content: "Insights \u2014 Engineering Blogs & Research from DIU Foundry",
      },
      {
        property: "og:description",
        content:
          "Engineering blogs, research papers, and architectural thoughts from the DIU Foundry floor.",
      },
      { property: "og:url", content: "https://diufoundry.com/insights" },
      {
        name: "twitter:title",
        content: "Insights \u2014 Engineering Blogs & Research from DIU Foundry",
      },
      {
        name: "twitter:description",
        content:
          "Engineering blogs, research papers, and architectural thoughts from the DIU Foundry floor.",
      },
    ],
  }),
  component: Insights,
});

const articles = [
  {
    slug: "autonomous-agents-edge",
    category: "Engineering",
    title: "Orchestrating autonomous agents in constrained edge environments",
    date: "October 12, 2025",
    readTime: "8 min read",
  },
  {
    slug: "latency-vs-accuracy-llm",
    category: "Research",
    title: "Latency vs. Accuracy: Optimizing local LLMs for surgical applications",
    date: "September 28, 2025",
    readTime: "12 min read",
  },
  {
    slug: "ignite-state-machine",
    category: "Open Source",
    title: "Introducing Ignite: Our lightweight state machine for React and IoT",
    date: "August 14, 2025",
    readTime: "5 min read",
  },
  {
    slug: "no-discovery-phase",
    category: "Philosophy",
    title: "Why we killed the discovery phase (and what we do instead)",
    date: "July 02, 2025",
    readTime: "6 min read",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://diufoundry.com/" },
    { "@type": "ListItem", position: 2, name: "Insights", item: "https://diufoundry.com/insights" },
  ],
};

const articleListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "DIU Foundry Insights",
  itemListElement: articles.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Article",
      headline: a.title,
      url: `https://diufoundry.com/insights/${a.slug}`,
      datePublished: a.date,
      author: { "@type": "Organization", name: "DIU Foundry" },
      publisher: {
        "@type": "Organization",
        name: "DIU Foundry",
        logo: { "@type": "ImageObject", url: "https://diufoundry.com/logo.png" },
      },
    },
  })),
};

function Insights() {
  return (
    <div className="min-h-screen bg-ivory text-ink pt-24 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleListSchema) }}
      />
      <main className="mx-auto max-w-[1500px] px-4 sm:px-6 py-8 sm:py-12 md:px-12">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-ink/50">
            <Mark className="h-5 w-5 sm:h-6 sm:w-6" stroke="gradient" />
            <span>Thoughts &amp; Code</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.02] tracking-tight md:text-8xl text-balance">
            <em className="italic text-violet-deep">Insights.</em>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-[15px] leading-relaxed text-ink/70 text-balance">
            Engineering blogs, research papers, open-source releases, and architectural thoughts
            from the foundry floor.
          </p>
        </div>

        <div className="mt-16 sm:mt-24 space-y-0 mb-24 sm:mb-32 border-t border-ink/10">
          {articles.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-12 border-b border-ink/10 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_-10px_rgba(75,42,143,0.1)] hover:-translate-y-1 hover:border-transparent"
            >
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.35em] text-violet-deep mb-3 sm:mb-4 transition-transform duration-300 group-hover:translate-x-1">
                  {article.category}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-ink max-w-3xl leading-snug text-balance transition-colors duration-300 group-hover:text-violet-deep">
                  {article.title}
                </h2>
              </div>
              <div className="mt-4 sm:mt-6 md:mt-0 flex items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ink/40">
                <span>{article.date}</span>
                <span
                  className="hidden md:inline h-1 w-1 rounded-full bg-ink/20"
                  aria-hidden="true"
                />
                <span>{article.readTime}</span>
                <span className="ml-2 sm:ml-4 rounded-full border border-ink/15 bg-ink/5 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-ink/40">
                  Coming Soon
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
