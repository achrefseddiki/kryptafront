import PageWrapper from "../components/PageWrapper";
import { GRADIENT, ASSETS } from "../lib/assets";

const SERVICES = [
  {
    icon: "🔧",
    title: "Hardware Diagnostics",
    desc: "Full system scan to pinpoint any hardware issue — GPU, CPU, RAM, storage, or power supply.",
    price: "Free",
    duration: "Same day",
  },
  {
    icon: "🖥️",
    title: "PC Repair & Upgrade",
    desc: "Component replacement, thermal repasting, BIOS updates, and hardware upgrades handled by certified technicians.",
    price: "From 30 DT",
    duration: "1–3 days",
  },
  {
    icon: "💾",
    title: "Data Recovery",
    desc: "Recover lost data from failed drives, corrupted SSDs, or accidentally formatted storage devices.",
    price: "From 80 DT",
    duration: "2–5 days",
  },
  {
    icon: "🌡️",
    title: "Cooling & Thermal",
    desc: "Thermal paste replacement, fan cleaning, custom cooling loop installation, and airflow optimization.",
    price: "From 20 DT",
    duration: "Same day",
  },
  {
    icon: "⚡",
    title: "Custom PC Assembly",
    desc: "Full assembly of your custom parts list, cable management, OS installation, and driver setup.",
    price: "From 60 DT",
    duration: "1–2 days",
  },
  {
    icon: "🔌",
    title: "Peripheral Repair",
    desc: "Mice, keyboards, headsets, and monitors — we repair and refurbish all gaming peripherals.",
    price: "From 15 DT",
    duration: "Same day",
  },
];

const STEPS = [
  { step: "01", title: "Book Online or Walk In", desc: "Schedule your repair appointment online or simply walk into the Krypta Lab. No waiting in line." },
  { step: "02", title: "Free Diagnostics", desc: "Our certified technicians run a full hardware diagnostic on your system at no cost." },
  { step: "03", title: "Receive a Quote", desc: "We provide a transparent quote with no hidden fees before any work begins." },
  { step: "04", title: "Expert Repair", desc: "Certified technicians repair your system using quality parts and industry-standard practices." },
  { step: "05", title: "Quality Check", desc: "Every repaired system goes through a rigorous testing protocol before being returned." },
  { step: "06", title: "Pick Up & Go", desc: "Collect your system or get it delivered. We include a 30-day warranty on all repairs." },
];

const FAQS = [
  { q: "How long does a typical repair take?", a: "Most repairs are completed within 1–3 business days. Diagnostics are done same-day. Complex repairs or data recovery may take up to 5 days." },
  { q: "Do you offer a warranty on repairs?", a: "Yes, all repairs come with a 30-day warranty covering the parts replaced and the work performed by our technicians." },
  { q: "Can I bring in a PC I didn't buy from Krypta?", a: "Absolutely. Krypta Lab services all brands and custom builds, regardless of where you purchased them." },
  { q: "What if the repair isn't worth it?", a: "If diagnostics reveal that repair costs exceed the value of the system, we'll tell you upfront and help you plan an upgrade instead." },
];

export default function LabPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-16 pb-16">
        {/* Hero */}
        <div className="px-24 flex flex-col gap-4">
          <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="text-white/20">/</span>
            <span className="text-white">Krypta Lab</span>
          </nav>

          <div className="flex items-center gap-3 mt-2">
            <div
              className="size-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: GRADIENT }}
            >
              <img src={ASSETS.iconRepair} alt="" className="size-6 invert" />
            </div>
            <span
              className="text-sm font-medium px-3 py-1 rounded-xl"
              style={{ background: "rgba(0,245,255,0.1)", color: "#00f5ff", border: "1px solid rgba(0,245,255,0.2)" }}
            >
              PC Repair & Services
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white tracking-[-0.96px] max-w-[720px]">
            Expert PC Repair &{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Technical Services
            </span>
          </h1>
          <p className="text-2xl font-normal text-[#a0a0a0] max-w-[640px]">
            Certified technicians, transparent pricing, same-day diagnostics — the Krypta Lab is Tunisia&apos;s go-to gaming repair center.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <a
              href="/support"
              className="h-[52px] px-8 rounded-2xl flex items-center text-[#0a0a0a] text-base font-medium"
              style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
            >
              Book a Repair
            </a>
            <a
              href="/support"
              className="h-[52px] px-8 rounded-2xl flex items-center border border-[#00f5ff] text-[#00f5ff] text-base font-medium hover:bg-[#00f5ff]/10 transition-colors"
            >
              Talk to a Technician
            </a>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-10 mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)]">
            {[
              { value: "2,400+", label: "Repairs Completed" },
              { value: "98%", label: "Customer Satisfaction" },
              { value: "Same Day", label: "Diagnostics" },
              { value: "30 Days", label: "Repair Warranty" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-sm text-[#a0a0a0]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services grid */}
        <div className="px-24 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-bold text-white tracking-[-0.64px]">Our Services</h2>
            <p className="text-[#a0a0a0] text-lg">Everything your gaming PC might need, under one roof.</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {SERVICES.map(({ icon, title, desc, price, duration }) => (
              <div
                key={title}
                className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-4 hover:border-[rgba(255,255,255,0.2)] transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="size-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.15)" }}
                  >
                    {icon}
                  </div>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-lg"
                    style={{ background: "rgba(0,245,255,0.08)", color: "#00f5ff" }}
                  >
                    {duration}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-lg font-medium">{title}</h3>
                  <p className="text-[#a0a0a0] text-sm leading-6">{desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <span className="text-white font-bold">{price}</span>
                  <a href="/support" className="text-[#00f5ff] text-sm font-medium hover:underline">
                    Book →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process steps */}
        <div
          className="px-24 py-16 flex flex-col gap-10"
          style={{ background: "linear-gradient(180deg, rgba(0,245,255,0.04) 0%, transparent 100%)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-bold text-white tracking-[-0.64px]">How It Works</h2>
            <p className="text-[#a0a0a0] text-lg">Simple, transparent, and stress-free from start to finish.</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-4">
                <span
                  className="text-4xl font-bold"
                  style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {step}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-lg font-medium">{title}</h3>
                  <p className="text-[#a0a0a0] text-sm leading-6">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="px-24 flex flex-col gap-8">
          <h2 className="text-4xl font-bold text-white tracking-[-0.64px]">Common Questions</h2>
          <div className="flex flex-col gap-4">
            {FAQS.map(({ q, a }) => (
              <div
                key={q}
                className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-3"
              >
                <h3 className="text-white text-base font-medium">{q}</h3>
                <p className="text-[#a0a0a0] text-sm leading-6">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="px-24">
          <div
            className="rounded-2xl p-12 border border-[rgba(1,245,255,0.2)] flex flex-col items-center gap-6 text-center"
            style={{ background: "linear-gradient(90deg, rgba(1,245,255,0.08), rgba(30,58,255,0.08))" }}
          >
            <div
              className="size-16 rounded-2xl flex items-center justify-center"
              style={{ background: GRADIENT }}
            >
              <img src={ASSETS.iconRepair} alt="" className="size-8 invert" />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-[32px] font-bold">Ready to Fix Your PC?</h2>
              <p className="text-[#a0a0a0] text-base max-w-[500px]">
                Walk in, book online, or call us. Free diagnostics — no obligation.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/support"
                className="h-[52px] px-8 rounded-2xl flex items-center text-[#0a0a0a] text-base font-medium"
                style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
              >
                Book a Repair Online
              </a>
              <a
                href="/support"
                className="h-[52px] px-8 rounded-2xl flex items-center border border-[#00f5ff] text-[#00f5ff] text-base font-medium hover:bg-[#00f5ff]/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
