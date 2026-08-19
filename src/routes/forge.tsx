import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mark } from "@/components/foundry/Mark";
import { RainSystem } from "@/components/home/RainSystem";

// ─── Web3Forms Configuration ─────────────────────────────────────────────────
// Web3Forms delivers submissions directly to diufoundry@gmail.com.
// The access key is read from VITE_WEB3FORMS_KEY environment variable.
// Create a .env.local file in the project root and add:
//   VITE_WEB3FORMS_KEY=your_key_here
// Get a free key at https://web3forms.com (250 submissions/month, no account needed).
const WEB3FORMS_KEY: string =
  import.meta.env.VITE_WEB3FORMS_KEY ?? "908b36ba-c4b8-4c28-a053-1333a4e659a0";

// ─── Common world currencies ────────────────────────────────────────────────
const CURRENCIES = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham" },
  { code: "BDT", symbol: "৳", label: "Bangladeshi Taka" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan" },
  { code: "CAD", symbol: "CA$", label: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar" },
  { code: "MYR", symbol: "RM", label: "Malaysian Ringgit" },
  { code: "SAR", symbol: "﷼", label: "Saudi Riyal" },
  { code: "PKR", symbol: "₨", label: "Pakistani Rupee" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real" },
  { code: "OTHER", symbol: "—", label: "Other / Undecided" },
];

export const Route = createFileRoute("/forge")({
  head: () => ({
    meta: [
      { title: "Start a Project — DIU Foundry" },
      {
        name: "description",
        content:
          "Tell us about your idea. Submit a project brief to DIU Foundry and we will respond within one working day.",
      },
      { property: "og:title", content: "Start a Project — DIU Foundry" },
      {
        property: "og:description",
        content:
          "Submit a project brief to DIU Foundry. Every idea is a spark — we help you build the flame.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Forge,
});

interface FormData {
  name: string;
  email: string;
  organization: string;
  country: string;
  visitorType: string;
  industry: string;
  projectCategory: string;
  timeline: string;
  budgetCurrency: string;
  budgetAmount: string;
  challenges: string;
  goals: string;
  notes: string;
  contactMethod: string;
}

const initialData: FormData = {
  name: "",
  email: "",
  organization: "",
  country: "",
  visitorType: "",
  industry: "",
  projectCategory: "",
  timeline: "",
  budgetCurrency: "USD",
  budgetAmount: "",
  challenges: "",
  goals: "",
  notes: "",
  contactMethod: "",
};

type Status = "idle" | "loading" | "success" | "error" | "not_configured";

function Forge() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState("");
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const totalSteps = 4;

  const update = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (currentStep === 1) {
      if (!data.name.trim()) newErrors.name = "Name is required";
      if (!data.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        newErrors.email = "Please enter a valid email";
      if (!data.country.trim()) newErrors.country = "Country is required";
      if (!data.visitorType.trim()) newErrors.visitorType = "Role is required";
    } else if (currentStep === 2) {
      if (!data.projectCategory.trim()) newErrors.projectCategory = "Project type is required";
      if (!data.timeline.trim()) newErrors.timeline = "Timeline is required";
      if (data.budgetCurrency !== "OTHER" && !data.budgetAmount.trim()) {
        newErrors.budgetAmount = "Budget amount is required";
      }
    } else if (currentStep === 3) {
      if (!data.challenges.trim()) newErrors.challenges = "Project description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      if (!validateStep(1)) setStep(1);
      else if (!validateStep(2)) setStep(2);
      else if (!validateStep(3)) setStep(3);
      return;
    }

    // Guard: if the key was never set, surface that clearly — never fake success
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === "PASTE_YOUR_KEY_HERE") {
      setStatus("not_configured");
      return;
    }

    setStatus("loading");

    const payload: Record<string, any> = {
      // Web3Forms required fields
      access_key: WEB3FORMS_KEY,
      subject: `New project inquiry from ${data.name.trim()} — DIU Foundry`,
      from_name: data.name.trim(),
      replyto: data.email.trim(),

      // Web3Forms options
      botcheck: false, // honeypot field — must be false

      // Required Submission content
      Name: data.name.trim(),
      Email: data.email.trim(),
      Country: data.country.trim(),
      Role: data.visitorType.trim(),
      "Project Title": data.projectCategory.trim(),
      "Project Description": data.challenges.trim(),
      Timeline: data.timeline.trim(),
    };

    if (data.organization.trim()) {
      payload.Organization = data.organization.trim();
    }

    if (data.budgetCurrency !== "OTHER" && data.budgetAmount.trim()) {
      payload.Budget = `${data.budgetCurrency} ${data.budgetAmount.trim()}`;
    }

    if (data.goals.trim()) {
      payload["Goals & Success"] = data.goals.trim();
    }

    if (data.notes.trim()) {
      payload["Additional Notes"] = data.notes.trim();
    }

    if (data.contactMethod.trim()) {
      payload["Preferred Contact"] = data.contactMethod.trim();
    }

    payload["Submission Time"] = new Date().toISOString();

    if (import.meta.env.DEV) {
      console.group("[DIU Forge] Submitting to Web3Forms");
      console.log("Endpoint:", "https://api.web3forms.com/submit");
      console.log("Payload:", payload);
      console.groupEnd();
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };

      if (import.meta.env.DEV) {
        console.group("[DIU Forge] Web3Forms response");
        console.log("Status:", res.status, res.statusText);
        console.log("Body:", json);
        console.groupEnd();
      }

      if (res.ok && json.success === true) {
        setStatus("success");
      } else {
        // Surface the actual error message from Web3Forms
        const msg = json.message || `HTTP ${res.status} ${res.statusText}`;
        if (import.meta.env.DEV) console.error("[DIU Forge] Submission failed:", msg);
        setErrorDetail(msg);
        setStatus("error");
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Network error — please check your connection.";
      if (import.meta.env.DEV) console.error("[DIU Forge] Fetch error:", msg);
      setErrorDetail(msg);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-ink text-ivory">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 md:px-12 backdrop-blur-xl border-b border-ivory/10">
        <Link to="/" className="flex items-center gap-2 sm:gap-3" aria-label="DIU Foundry — Home">
          <Mark className="h-6 w-6 sm:h-8 sm:w-8" stroke="#fff" />
          <span className="font-display text-base sm:text-lg tracking-tight">DIU Foundry</span>
        </Link>
        <Link
          to="/"
          className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ivory/50 hover:text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep rounded"
        >
          Cancel
        </Link>
      </header>

      <main
        className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-12 overflow-hidden z-0"
        aria-label="Project intake form"
      >
        {/* Crystal / Water Forge Environment */}
        <div className="absolute inset-0 pointer-events-none z-[-1]">
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="forge-crystal" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="3" result="noise" seed="4">
                  <animate attributeName="baseFrequency" values="0.015 0.02;0.02 0.015;0.015 0.02" dur="20s" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>
          
          <div className="absolute inset-0 mix-blend-screen opacity-50" style={{ filter: "url(#forge-crystal) blur(5px)" }}>
            <motion.div 
              animate={{ x: ["-5%", "5%", "-5%"], y: ["-5%", "5%", "-5%"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(0,255,128,0.15)_0%,transparent_60%)] blur-3xl"
            />
            <motion.div 
              animate={{ x: ["5%", "-5%", "5%"], y: ["5%", "-5%", "5%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(75,42,143,0.15)_0%,transparent_60%)] blur-[100px]"
            />
          </div>
          
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-40 mix-blend-overlay" />
          <RainSystem />
        </div>

        <div className="w-full max-w-2xl relative z-10">
          {status === "success" ? (
            <SuccessScreen />
          ) : status === "not_configured" ? (
            <NotConfiguredScreen />
          ) : (
            <>
              {/* Progress */}
              <div
                className="mb-8 sm:mb-12 flex items-center gap-4"
                role="progressbar"
                aria-valuenow={step}
                aria-valuemin={1}
                aria-valuemax={totalSteps}
                aria-label={`Step ${step} of ${totalSteps}`}
              >
                <div className="flex-1 h-px bg-ivory/10 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-violet-deep"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
                <span
                  className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ivory/40 whitespace-nowrap tabular-nums"
                  aria-live="polite"
                >
                  {step} / {totalSteps}
                </span>
              </div>

              {/* Error state */}
              <AnimatePresence>
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 rounded-xl border border-red-500/25 bg-red-500/[0.08] px-5 py-4 text-sm text-red-300/90"
                    role="alert"
                  >
                    <p className="font-medium mb-1">Submission failed.</p>
                    {errorDetail && (
                      <p className="text-red-400/70 text-xs font-mono mb-2">{errorDetail}</p>
                    )}
                    <p>
                      Please try again, or email us directly at{" "}
                      <a
                        href="mailto:diufoundry@gmail.com"
                        className="underline hover:text-red-100 transition-colors"
                      >
                        diufoundry@gmail.com
                      </a>
                      .
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wizard panel */}
              <div className="rounded-2xl sm:rounded-[2rem] border border-ivory/10 bg-white/[0.03] p-6 sm:p-8 md:p-12 backdrop-blur-xl min-h-[460px]">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <StepOne
                      key="1"
                      data={data}
                      errors={errors}
                      update={update}
                      onNext={nextStep}
                    />
                  )}
                  {step === 2 && (
                    <StepTwo
                      key="2"
                      data={data}
                      errors={errors}
                      update={update}
                      onNext={nextStep}
                      onPrev={prevStep}
                    />
                  )}
                  {step === 3 && (
                    <StepThree
                      key="3"
                      data={data}
                      errors={errors}
                      update={update}
                      onNext={nextStep}
                      onPrev={prevStep}
                    />
                  )}
                  {step === 4 && (
                    <StepFour
                      key="4"
                      data={data}
                      errors={errors}
                      update={update}
                      onPrev={prevStep}
                      onSubmit={handleSubmit}
                      isLoading={status === "loading"}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Trust line */}
              <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-ivory/25">
                Your submission is sent directly to diufoundry@gmail.com
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl sm:rounded-[2rem] border border-ivory/10 bg-white/[0.03] p-8 sm:p-12 backdrop-blur-xl text-center"
      role="status"
      aria-label="Form submitted successfully"
    >
      <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-violet-deep/30 bg-violet-deep/10">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            d="M5 13l4 4L19 7"
            stroke="#d6b4ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl mb-4 text-[#f2edff]">Brief Received.</h2>
      <p className="text-ivory/60 text-sm sm:text-[15px] max-w-sm mx-auto leading-relaxed mb-8">
        Thank you for reaching out to DIU Foundry. We've received your project brief successfully.
        Our team will review it carefully and contact you as soon as possible.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-3 bg-ivory px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-deep"
      >
        Return to the Foundry
      </Link>
    </motion.div>
  );
}

function NotConfiguredScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl sm:rounded-[2rem] border border-amber-500/25 bg-amber-500/[0.06] p-8 sm:p-12 backdrop-blur-xl"
      role="alert"
    >
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="font-display text-2xl sm:text-3xl mb-3 text-amber-200">
        Email delivery not configured.
      </h2>
      <p className="text-ivory/60 text-sm leading-relaxed mb-6">
        The form is working, but no email delivery service has been set up yet. Submissions are not
        reaching <strong className="text-ivory/80">diufoundry@gmail.com</strong>.
      </p>
      <div className="border border-ivory/10 rounded-xl p-5 bg-white/[0.03] text-sm text-ivory/70 space-y-2 mb-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/40 mb-3">
          Setup (60 seconds)
        </p>
        <p>
          1. Go to{" "}
          <a
            href="https://web3forms.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-300 underline hover:text-violet-100"
          >
            web3forms.com
          </a>
        </p>
        <p>
          2. Enter <span className="font-mono text-ivory/90">diufoundry@gmail.com</span> → click
          "Create Access Key"
        </p>
        <p>3. Check the Gmail inbox — copy the access key from the confirmation email</p>
        <p>
          4. Add the key to your environment variables as{" "}
          <span className="font-mono text-amber-200/80">VITE_WEB3FORMS_KEY</span>
        </p>
        <p className="text-xs text-ivory/30 pt-1">
          Web3Forms is free for up to 250 submissions/month. No account required.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-3 rounded-full border border-ivory/15 px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory/60 hover:text-ivory hover:border-ivory/30 transition-colors"
      >
        Return to the Foundry
      </Link>
    </motion.div>
  );
}

// ─── Step 1: About You ───────────────────────────────────────────────────────

function StepOne({
  data,
  errors,
  update,
  onNext,
}: {
  data: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  update: (f: keyof FormData, v: string) => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      className="flex flex-col h-full"
    >
      <h2 className="font-display text-3xl md:text-4xl mb-2">About you</h2>
      <p className="text-ivory/50 mb-8 text-sm" id="step1-desc">
        Tell us who you are and where you are working from.
      </p>

      <div className="space-y-6 flex-1" aria-describedby="step1-desc">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="name"
            label="Full Name"
            type="text"
            placeholder="Your name"
            value={data.name}
            error={errors.name}
            onChange={(v) => update("name", v)}
          />
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="you@company.com"
            autocomplete="email"
            value={data.email}
            error={errors.email}
            onChange={(v) => update("email", v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="organization"
            label="Organization"
            type="text"
            placeholder="Company or university (optional)"
            autocomplete="organization"
            value={data.organization}
            error={errors.organization}
            onChange={(v) => update("organization", v)}
          />
          <Input
            id="country"
            label="Country"
            type="text"
            placeholder="Your country"
            autocomplete="country-name"
            value={data.country}
            error={errors.country}
            onChange={(v) => update("country", v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            id="visitor-type"
            label="You are a"
            options={[
              "Startup Founder",
              "Enterprise",
              "Researcher / Academic",
              "Individual Creator",
              "Student",
              "Other",
            ]}
            value={data.visitorType}
            error={errors.visitorType}
            onChange={(v) => update("visitorType", v)}
          />
          <Input
            id="industry"
            label="Industry / Domain"
            type="text"
            placeholder="e.g. Healthcare, Finance (optional)"
            value={data.industry}
            error={errors.industry}
            onChange={(v) => update("industry", v)}
          />
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <Button onClick={onNext}>Continue</Button>
      </div>
    </motion.div>
  );
}

// ─── Step 2: The Project ─────────────────────────────────────────────────────

function StepTwo({
  data,
  errors,
  update,
  onNext,
  onPrev,
}: {
  data: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  update: (f: keyof FormData, v: string) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const currency = CURRENCIES.find((c) => c.code === data.budgetCurrency) ?? CURRENCIES[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      className="flex flex-col h-full"
    >
      <h2 className="font-display text-3xl md:text-4xl mb-2">The project</h2>
      <p className="text-ivory/50 mb-8 text-sm" id="step2-desc">
        Tell us what you are building and what scope looks like.
      </p>

      <div className="space-y-6 flex-1" aria-describedby="step2-desc">
        <Select
          id="project-category"
          label="Project type"
          options={[
            "AI & Machine Learning",
            "Web Application",
            "Mobile App",
            "Embedded / IoT",
            "Automation",
            "Cloud Infrastructure",
            "Research & Data",
            "Other",
          ]}
          value={data.projectCategory}
          error={errors.projectCategory}
          onChange={(v) => update("projectCategory", v)}
        />
        <Select
          id="timeline"
          label="Timeline"
          options={[
            "Under 1 month",
            "1–3 months",
            "3–6 months",
            "6–12 months",
            "12+ months",
            "Flexible / Undecided",
          ]}
          value={data.timeline}
          error={errors.timeline}
          onChange={(v) => update("timeline", v)}
        />

        {/* International budget field */}
        <div>
          <label
            className={`text-[10px] uppercase tracking-[0.2em] block mb-3 ${errors.budgetAmount ? "text-red-400" : "text-ivory/50"}`}
          >
            Estimated Budget
          </label>
          <div className="flex gap-3 items-end">
            <div className="w-40 flex-shrink-0">
              <select
                id="budget-currency"
                value={data.budgetCurrency}
                onChange={(e) => update("budgetCurrency", e.target.value)}
                className="w-full bg-transparent border-b border-ivory/20 py-3 outline-none focus:border-violet-deep transition-colors text-ivory appearance-none cursor-pointer text-sm"
                aria-label="Budget currency"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-ink text-ivory">
                    {c.code} — {c.label}
                  </option>
                ))}
              </select>
            </div>
            {data.budgetCurrency !== "OTHER" && (
              <div className="flex-1 flex items-end gap-2">
                <span className="text-ivory/40 pb-3 text-sm">{currency.symbol}</span>
                <input
                  id="budget-amount"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 15,000"
                  value={data.budgetAmount}
                  onChange={(e) => update("budgetAmount", e.target.value)}
                  className={`flex-1 bg-transparent border-b py-3 outline-none transition-colors text-ivory placeholder:text-ivory/20 text-sm ${errors.budgetAmount ? "border-red-500/50 focus:border-red-500" : "border-ivory/20 focus:border-violet-deep"}`}
                  aria-label="Budget amount"
                />
              </div>
            )}
          </div>
          {errors.budgetAmount ? (
            <p className="mt-2 text-[11px] text-red-400">{errors.budgetAmount}</p>
          ) : (
            <p className="mt-2 text-[10px] text-ivory/25">
              Enter any amount in your local currency. Exact figures are not required.
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <Button onClick={onPrev} secondary>
          Back
        </Button>
        <Button onClick={onNext}>Continue</Button>
      </div>
    </motion.div>
  );
}

// ─── Step 3: The Brief ───────────────────────────────────────────────────────

function StepThree({
  data,
  errors,
  update,
  onNext,
  onPrev,
}: {
  data: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  update: (f: keyof FormData, v: string) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      className="flex flex-col h-full"
    >
      <h2 className="font-display text-3xl md:text-4xl mb-2">The brief</h2>
      <p className="text-ivory/50 mb-8 text-sm" id="step3-desc">
        Describe the challenge and what a successful outcome looks like.
      </p>

      <div className="space-y-6 flex-1" aria-describedby="step3-desc">
        <Textarea
          id="challenges"
          label="What problem are you solving?"
          placeholder="Describe the core challenge or pain point driving this project."
          value={data.challenges}
          error={errors.challenges}
          onChange={(v) => update("challenges", v)}
        />
        <Textarea
          id="goals"
          label="What does success look like?"
          placeholder="Describe the intended outcome (optional)"
          value={data.goals}
          error={errors.goals}
          onChange={(v) => update("goals", v)}
        />
      </div>

      <div className="mt-10 flex justify-between">
        <Button onClick={onPrev} secondary>
          Back
        </Button>
        <Button onClick={onNext}>Continue</Button>
      </div>
    </motion.div>
  );
}

// ─── Step 4: Final Touches ───────────────────────────────────────────────────

function StepFour({
  data,
  errors,
  update,
  onPrev,
  onSubmit,
  isLoading,
}: {
  data: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  update: (f: keyof FormData, v: string) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      className="flex flex-col h-full"
    >
      <h2 className="font-display text-3xl md:text-4xl mb-2">Anything else?</h2>
      <p className="text-ivory/50 mb-8 text-sm" id="step4-desc">
        Optional notes and your preferred way to be reached.
      </p>

      <div className="space-y-6 flex-1" aria-describedby="step4-desc">
        <Textarea
          id="notes"
          label="Additional context (optional)"
          placeholder="References, links, constraints, or anything else that would help us."
          value={data.notes}
          error={errors.notes}
          onChange={(v) => update("notes", v)}
        />
        <Select
          id="contact-method"
          label="Preferred contact method (optional)"
          options={["Email", "Video Call", "Voice Call"]}
          value={data.contactMethod}
          error={errors.contactMethod}
          onChange={(v) => update("contactMethod", v)}
        />
      </div>

      <div className="mt-10 flex justify-between">
        <Button onClick={onPrev} secondary disabled={isLoading}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-3 w-3 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Sending
            </span>
          ) : (
            "Send Brief"
          )}
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Primitives ──────────────────────────────────────────────────────────────

function Input({
  id,
  label,
  type,
  placeholder,
  autocomplete,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  autocomplete?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={`text-[10px] uppercase tracking-[0.2em] block mb-1.5 transition-colors ${error ? "text-red-400" : "text-ivory/40 group-focus-within:text-[#00ff80]/80"}`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autocomplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white/[0.02] backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0px_rgba(255,255,255,0.05)] border-b px-4 py-4 outline-none transition-all duration-500 text-ivory text-sm placeholder:text-ivory/20 rounded-t-sm ${error ? "border-red-500/50 focus:bg-red-500/5" : "border-ivory/10 focus:bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,128,0.05),transparent_50%),rgba(255,255,255,0.02)] focus:border-[#00ff80]/50"}`}
      />
      {error && <p className="mt-1.5 text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

function Select({
  id,
  label,
  options,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={`text-[10px] uppercase tracking-[0.2em] block mb-1.5 transition-colors ${error ? "text-red-400" : "text-ivory/40 group-focus-within:text-[#00ff80]/80"}`}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white/[0.02] backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0px_rgba(255,255,255,0.05)] border-b px-4 py-4 outline-none transition-all duration-500 text-ivory text-sm appearance-none cursor-pointer rounded-t-sm ${error ? "border-red-500/50 focus:bg-red-500/5" : "border-ivory/10 focus:bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,128,0.05),transparent_50%),rgba(255,255,255,0.02)] focus:border-[#00ff80]/50"}`}
      >
        <option value="" disabled className="bg-ink text-ivory/40">
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink text-ivory">
            {o}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

function Textarea({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={`text-[10px] uppercase tracking-[0.2em] block mb-1.5 transition-colors ${error ? "text-red-400" : "text-ivory/40 group-focus-within:text-[#00ff80]/80"}`}
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white/[0.02] backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0px_rgba(255,255,255,0.05)] border-b px-4 py-4 outline-none transition-all duration-500 text-ivory text-sm placeholder:text-ivory/20 resize-none rounded-t-sm ${error ? "border-red-500/50 focus:bg-red-500/5" : "border-ivory/10 focus:bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,128,0.05),transparent_50%),rgba(255,255,255,0.02)] focus:border-[#00ff80]/50"}`}
      />
      {error && <p className="mt-1.5 text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

function Button({
  children,
  onClick,
  secondary = false,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  secondary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full overflow-hidden transition-all duration-500 backdrop-blur-md border shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff80]/50 disabled:opacity-30 disabled:cursor-not-allowed ${
        secondary
          ? "bg-transparent border-ivory/10 text-ivory/70 hover:text-ivory hover:border-[#00ff80]/30 hover:bg-white/[0.02]"
          : "bg-white/[0.03] border-white/20 text-ivory hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(0,255,128,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)] hover:border-[#00ff80]/40"
      }`}
    >
      <span className="relative z-10 font-mono text-[9px] uppercase tracking-[0.3em]">{children}</span>
      {!secondary && !disabled && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[rgba(0,255,128,0.15)] to-transparent skew-x-12 -translate-x-full group-hover:animate-[sweepLine_1.5s_linear_infinite]" />
      )}
    </button>
  );
}
