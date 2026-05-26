"use client";

import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { GRADIENT } from "../../lib/assets";
import { api } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";

const STEPS = [
  "Our team reviews your repair request within 24 hours.",
  "We diagnose the issue and send you a detailed report with pricing.",
  "Once approved, we repair and test your device thoroughly.",
  "Your system is returned fully fixed with warranty and support.",
];

const REPAIR_TYPES = [
  "Hardware Diagnostics",
  "PC Repair & Upgrade",
  "Data Recovery",
  "Cooling & Thermal",
  "Custom PC Assembly",
  "Peripheral Repair",
  "Other",
];

const EMPTY = {
  name: "",
  email: "",
  address: "",
  phone: "",
  type: "",
  details: "",
};

export default function RepairPage() {
  const { user } = useAuth();
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: f.name || `${user.firstName} ${user.lastName}`.trim(),
        email: f.email || user.email,
      }));
    }
  }, [user]);

  function set(key: keyof typeof EMPTY) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.repairRequests.create(form);
      setSuccess(true);
      setForm(EMPTY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#555] outline-none focus:border-[#00f5ff] transition-colors w-full";

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
          <a href="/" className="hover:text-white transition-colors">Accueil</a>
          <span className="text-white/20">/</span>
          <a href="/lab" className="hover:text-white transition-colors">KryptaLab</a>
          <span className="text-white/20">/</span>
          <span className="text-white">Repair Request</span>
        </nav>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Repair Request</h1>
          <p className="text-[#a0a0a0] text-base lg:text-lg">
            Tell us about your device and our experts will bring it back to life.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-white text-xs font-medium uppercase tracking-wider">Name</label>
              <input type="text" value={form.name} onChange={set("name")} placeholder="Your name" required className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white text-xs font-medium uppercase tracking-wider">Email</label>
              <input type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" required className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-white text-xs font-medium uppercase tracking-wider">Address</label>
              <input type="text" value={form.address} onChange={set("address")} placeholder="El Menzah, Tunis" required className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white text-xs font-medium uppercase tracking-wider">Phone Number</label>
              <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+216 XX XXX XXX" required className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white text-xs font-medium uppercase tracking-wider">Type of Repair</label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              required
              className="bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00f5ff] transition-colors appearance-none"
            >
              <option value="" disabled className="bg-[#1a1a1a] text-[#555]">Select a repair type…</option>
              {REPAIR_TYPES.map((t) => (
                <option key={t} value={t} className="bg-[#1a1a1a] text-white">{t}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white text-xs font-medium uppercase tracking-wider">Details</label>
            <textarea
              value={form.details}
              onChange={set("details")}
              placeholder="Describe the issue, symptoms, when it started, etc."
              required
              minLength={10}
              rows={5}
              className="bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#555] outline-none focus:border-[#00f5ff] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="h-12 rounded-xl text-[#0a0a0a] text-sm font-semibold disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
            style={{ background: GRADIENT }}
          >
            {submitting ? "Submitting…" : "Submit Request →"}
          </button>
        </form>

        {/* What Happens Next */}
        <div className="bg-[#141414] border border-white/[0.07] rounded-2xl p-6 lg:p-8 flex flex-col gap-5">
          <h2 className="text-white text-lg font-semibold">What Happens Next?</h2>
          <ol className="flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="size-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-[#0a0a0a] mt-0.5"
                  style={{ background: GRADIENT }}
                >
                  {i + 1}
                </span>
                <p className="text-[#a0a0a0] text-sm leading-6">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {success && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#1a1a1a] border border-green-500/30 rounded-2xl px-5 py-3.5 shadow-xl">
          <span className="size-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">✓</span>
          <p className="text-white text-sm font-medium">Request submitted successfully.</p>
          <button onClick={() => setSuccess(false)} className="text-[#666] hover:text-white ml-2 text-lg leading-none">×</button>
        </div>
      )}
    </PageWrapper>
  );
}
