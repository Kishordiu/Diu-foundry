import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

const socials = [
  {
    id: "github",
    label: "GitHub",
    dest: "github.com/Kishordiu",
    url: "https://github.com/Kishordiu",
    icon: <GithubIcon />,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    dest: "linkedin.com/company/diufoundary",
    url: "https://www.linkedin.com/company/diufoundary/",
    icon: <LinkedinIcon />,
  },
  {
    id: "instagram",
    label: "Instagram",
    dest: "instagram.com/diufoundry",
    url: "https://instagram.com/diufoundry",
    icon: <InstagramIcon />,
  },
  {
    id: "mail",
    label: "Gmail",
    dest: "diufoundry@gmail.com",
    url: "mailto:diufoundry@gmail.com",
    icon: <MailIcon />,
  },
];

export function ContactForge() {
  const [activeSocial, setActiveSocial] = useState<(typeof socials)[0] | null>(null);

  return (
    <section className="relative min-h-screen bg-ink text-ivory flex flex-col items-center justify-center pt-32 pb-10 overflow-hidden border-t border-ivory/5">
      <div className="absolute inset-0 grain pointer-events-none opacity-40" />

      <div className="foundry-container w-full text-center relative z-10 flex flex-col items-center flex-1 justify-center mt-10">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-12 block">
          [ 06 ] Contact
        </span>

        <h2 className="font-display text-4xl md:text-6xl lg:text-8xl uppercase tracking-tighter mb-16">
          Have An Idea <br />
          <span className="text-ivory/50 italic">Worth Building?</span>
        </h2>

        <Link
          to="/forge"
          onClick={() => window.scrollTo(0, 0)}
          className="group relative inline-flex items-center justify-center"
          data-cursor="open"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-deep to-forge rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-ink border border-ivory/20 px-12 py-6 rounded-full flex items-center gap-4 overflow-hidden">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] relative z-10 group-hover:text-ivory transition-colors">
              Enter The Forge
            </span>
            <div className="w-8 h-[1px] bg-ivory relative z-10 group-hover:translate-x-2 transition-transform" />

            {/* Hover effect background */}
            <div className="absolute inset-0 bg-ivory/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </div>
        </Link>
      </div>

      {/* Social / Contact Presence */}
      <div className="w-full max-w-4xl mx-auto px-6 mt-32 relative z-10 flex flex-col items-center">
        <div className="h-24 flex items-center justify-center w-full mb-4 relative">
          <AnimatePresence mode="wait">
            {activeSocial ? (
              <motion.div
                key={activeSocial.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50">
                  {activeSocial.label}
                </span>
                <span className="font-mono text-[11px] tracking-wide text-[#00ff80] text-glow-neon">
                  {activeSocial.dest}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/20"
              >
                Connect with the Foundry
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4 sm:gap-8 justify-center">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveSocial(social)}
              onMouseLeave={() => setActiveSocial(null)}
              className="p-4 rounded-full border border-ivory/10 hover:border-ivory/40 hover:bg-ivory/5 text-ivory/50 hover:text-ivory transition-all duration-300"
              aria-label={social.label}
              data-cursor="explore"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-20 w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-12 font-sans text-[10px] text-ivory/30 uppercase tracking-[0.2em] relative z-10 gap-4">
        <span>© 2026 DIU Foundry</span>
        <span className="hidden md:inline text-center">Creative Technology Studio</span>
      </div>
    </section>
  );
}

// Icons
function GithubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
