import { useMemo, useState, type FormEvent, type HTMLAttributes, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  MapPin,
  MessageSquare,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_AUDIT_ENDPOINT || "";

const audienceTypes = [
  "Local business owner",
  "Realtor / real estate team",
  "Parent-founder / professional household",
  "Interested in Nori / Soulfood Sushi",
];

const businessTypes = [
  "Real estate",
  "Beauty / barber / aesthetician",
  "Restaurant / popup / vendor",
  "Contractor / home service",
  "Fitness / coaching",
  "Professional service",
  "Other",
];

const biggestGaps = [
  "Missed leads",
  "Follow-up",
  "Booking / intake",
  "CRM/dashboard visibility",
  "Content system",
  "Custom dashboard",
];

const auditSteps = [
  {
    icon: MessageSquare,
    title: "Lead intake",
    text: "Calls, texts, DMs, forms, referrals, and walk-ins get mapped into one flow.",
  },
  {
    icon: CalendarCheck,
    title: "Follow-up gaps",
    text: "We find where prospects go cold, appointments slip, and quotes sit untouched.",
  },
  {
    icon: BarChart3,
    title: "Dashboard fit",
    text: "You leave with the first NoriBoards view your business actually needs.",
  },
];

const verticals = [
  "Realtors",
  "Barbers",
  "Stylists",
  "Aestheticians",
  "Popup vendors",
  "Chefs",
  "Photographers",
  "Coaches",
  "Home services",
  "Professional services",
];

type SubmitState = "idle" | "submitting" | "success" | "error";

export function AuditPage() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const endpointReady = FORMSPREE_ENDPOINT.startsWith("https://formspree.io/f/");

  const statusMessage = useMemo(() => {
    if (!endpointReady) {
      return "Form endpoint pending. Add VITE_FORMSPREE_AUDIT_ENDPOINT before the flyer goes live.";
    }
    if (submitState === "success") {
      return "Audit request received. We will review your intake and follow-up gaps next.";
    }
    if (submitState === "error") {
      return "Something blocked the form. Try again or send the same details directly.";
    }
    return "Takes about 90 seconds. No pitch deck. No tech homework.";
  }, [endpointReady, submitState]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!endpointReady) {
      event.preventDefault();
      setSubmitState("error");
      return;
    }

    event.preventDefault();
    setSubmitState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Formspree rejected the submission");
      }

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050705] text-[#f5f7ef]">
      <section className="relative isolate min-h-screen px-5 py-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(0,179,89,0.28),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(212,160,23,0.18),transparent_26%),linear-gradient(135deg,#050705_0%,#0b100c_48%,#030403_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#00b359] to-transparent opacity-70" />
        <div className="absolute left-0 top-24 -z-10 h-[540px] w-[540px] rounded-full bg-[#00b359]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 -z-10 h-[460px] w-[460px] rounded-full bg-[#d4a017]/10 blur-3xl" />

        <header className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 rotate-45 place-items-center border border-[#d4a017]/60 transition-colors group-hover:border-[#d4a017]">
              <span className="h-3 w-3 bg-[#d4a017]" />
            </span>
            <span className="text-xs font-black uppercase tracking-[0.26em] text-[#d4a017]">
              NEO GENTS
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d9decc]/60 md:flex">
            <a href="/#/realtor" className="transition-colors hover:text-[#f5f7ef]">
              Realtor
            </a>
            <a href="/#/barber" className="transition-colors hover:text-[#f5f7ef]">
              Service pros
            </a>
            <a href="/#/creators" className="transition-colors hover:text-[#f5f7ef]">
              Creators
            </a>
          </nav>
          <a
            href="#audit-form"
            className="inline-flex items-center gap-2 border border-[#00b359]/45 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#00e47a] transition hover:border-[#00e47a] hover:bg-[#00b359]/10"
          >
            Start audit <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 pb-20 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pt-24">
          <div>
            <div className="mb-8 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d9decc]/60">
              <span className="inline-flex items-center gap-2 border border-[#00b359]/30 bg-[#00b359]/10 px-3 py-1.5 text-[#8fffc0]">
                <Radar className="h-3.5 w-3.5" />
                NoriBoards
              </span>
              <span>Agentic CRM and custom dashboards</span>
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-[#f7f9f0] sm:text-6xl lg:text-7xl">
              Find where your business is leaking leads.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#d9decc]/72">
              The free Revenue Leak Audit maps your calls, DMs, quotes, bookings,
              follow-ups, and dashboard gaps so NoriBoards can show the first system
              worth building.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#audit-form"
                className="inline-flex items-center justify-center gap-2 bg-[#f4f0dd] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#071008] transition hover:bg-white"
              >
                Free Revenue Leak Audit <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center border border-[#d4a017]/35 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#d4a017] transition hover:border-[#d4a017] hover:bg-[#d4a017]/10"
              >
                View dashboards
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {auditSteps.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="border border-white/10 bg-white/[0.035] p-4 shadow-[0_0_45px_rgba(0,0,0,0.24)] backdrop-blur"
                >
                  <Icon className="mb-4 h-5 w-5 text-[#00e47a]" />
                  <h2 className="text-sm font-black uppercase tracking-[0.12em] text-[#f5f7ef]">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#d9decc]/62">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 border border-[#00b359]/15" />
            <div className="relative border border-[#00b359]/25 bg-[#08100a]/86 p-5 shadow-[0_0_80px_rgba(0,179,89,0.12)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00e47a]/70">
                    Live audit map
                  </p>
                  <h2 className="mt-1 text-xl font-black tracking-[-0.03em]">
                    What gets reviewed
                  </h2>
                </div>
                <Sparkles className="h-5 w-5 text-[#d4a017]" />
              </div>

              <div className="grid gap-3">
                {[
                  ["01", "Where leads arrive", "Phone, SMS, website, socials, referrals"],
                  ["02", "Where they stall", "No response, no next step, no owner"],
                  ["03", "What should be visible", "Pipeline, bookings, follow-ups, revenue"],
                  ["04", "What NoriBoards builds first", "A simple dashboard tied to real workflow"],
                ].map(([num, title, text]) => (
                  <div key={num} className="grid grid-cols-[48px_1fr] gap-4 border border-white/10 bg-black/22 p-4">
                    <div className="font-mono text-sm text-[#d4a017]">{num}</div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-[0.12em]">{title}</h3>
                      <p className="mt-1 text-sm text-[#d9decc]/58">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 border border-[#d4a017]/20 bg-[#d4a017]/8 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-[#d4a017]" />
                  <p className="text-sm leading-6 text-[#f4f0dd]/76">
                    This is not a generic CRM pitch. The audit chooses the first
                    practical dashboard based on the vertical, workflow, and revenue
                    leak you already have.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f3e8] px-5 py-16 text-[#10140f] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#007a43]">
              Built for small operators
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              If it depends on follow-up, it belongs on the board.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#384037]">
              NoriBoards serves the verticals where one missed lead, one stale
              quote, or one untracked client can quietly cost real money.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {verticals.map((vertical) => (
                <span
                  key={vertical}
                  className="border border-[#10140f]/10 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#2a3028]"
                >
                  {vertical}
                </span>
              ))}
            </div>
          </div>

          <form
            id="audit-form"
            onSubmit={handleSubmit}
            className="border border-[#10140f]/12 bg-white p-5 shadow-[0_28px_80px_rgba(16,20,15,0.12)] sm:p-7"
          >
            <input type="hidden" name="_subject" value="New NoriBoards Revenue Leak Audit" />
            <input type="hidden" name="source" value="flyer" />
            <input type="hidden" name="site" value="neogents.tech/audit" />

            <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#10140f]/10 pb-5">
              <div>
                <h2 className="text-2xl font-black tracking-[-0.03em]">Request your audit</h2>
                <p className="mt-2 text-sm leading-6 text-[#586056]">{statusMessage}</p>
              </div>
              <ClipboardList className="h-7 w-7 flex-none text-[#007a43]" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Business name" name="business_name" />
              <Field label="City" name="city" required icon={<MapPin className="h-4 w-4" />} />
              <Field label="ZIP code" name="zip" inputMode="numeric" required />
              <SelectField label="What best describes you?" name="audience_type" options={audienceTypes} required />
              <SelectField label="Business type" name="business_type" options={businessTypes} required />
              <SelectField label="Biggest gap" name="biggest_gap" options={biggestGaps} required className="sm:col-span-2" />
              <label className="sm:col-span-2">
                <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.13em] text-[#475046]">
                  What is happening now?
                </span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Example: Leads come from Instagram and phone calls, but follow-up lives in texts and a spreadsheet."
                  className="w-full resize-none border border-[#10140f]/12 bg-[#f8f7ef] px-4 py-3 text-sm text-[#10140f] outline-none transition placeholder:text-[#7c8378] focus:border-[#007a43]"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitState === "submitting" || !endpointReady}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#10140f] px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#007a43] disabled:cursor-not-allowed disabled:bg-[#8b9187]"
            >
              {submitState === "submitting" ? "Sending audit request" : "Send audit request"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#6d756a]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#007a43]" />
              Your ZIP and city tell us where the flyer worked. Your answers tell us
              which dashboard to scope first.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  icon?: ReactNode;
};

function Field({ label, name, type = "text", required, inputMode, icon }: FieldProps) {
  return (
    <label>
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.13em] text-[#475046]">
        {label}
      </span>
      <div className="relative">
        {icon ? <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#007a43]">{icon}</span> : null}
        <input
          name={name}
          type={type}
          required={required}
          inputMode={inputMode}
          className={`w-full border border-[#10140f]/12 bg-[#f8f7ef] px-4 py-3 text-sm text-[#10140f] outline-none transition placeholder:text-[#7c8378] focus:border-[#007a43] ${icon ? "pl-10" : ""}`}
        />
      </div>
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  className?: string;
};

function SelectField({ label, name, options, required, className = "" }: SelectFieldProps) {
  return (
    <label className={className}>
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.13em] text-[#475046]">
        {label}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full border border-[#10140f]/12 bg-[#f8f7ef] px-4 py-3 text-sm text-[#10140f] outline-none transition focus:border-[#007a43]"
      >
        <option value="" disabled>
          Select one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
