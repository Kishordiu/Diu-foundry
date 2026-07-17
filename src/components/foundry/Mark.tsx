import logoSrc from "@/assets/diu-logo.png";

// The official DIU Foundry brand mark.
// `tone="light"` renders the white artwork as-is (for dark backgrounds).
// `tone="dark"` inverts it to solid ink (for light backgrounds).
// `stroke` is accepted for backwards compatibility but no longer used.
export function Mark({
  className = "",
  tone,
  stroke,
}: {
  className?: string;
  tone?: "light" | "dark";
  stroke?: string;
}) {
  const resolvedTone: "light" | "dark" = tone ?? (stroke === "gradient" ? "dark" : "light");
  const filter = resolvedTone === "dark" ? "brightness(0) saturate(100%)" : "none";
  return (
    <img
      src={logoSrc}
      alt="DIU Foundry"
      className={`object-contain ${className}`}
      style={{ filter }}
      draggable={false}
    />
  );
}

// Sweeping arc used as section separator, echoing the mark's outer curve.
export function ArcDivider({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`h-16 w-full md:h-24 ${flip ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M0 100 C 360 20, 1080 20, 1440 100 L1440 120 L0 120 Z" fill="currentColor" />
    </svg>
  );
}
