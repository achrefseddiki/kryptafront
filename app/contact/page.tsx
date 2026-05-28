"use client";

import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { api } from "../lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await api.contact.submit({
        name: form.name,
        email: form.email,
        subject: form.subject || undefined,
        message: form.message,
      });
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setSending(false);
    }
  }

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 py-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-[#666] text-sm mb-10">
            Have a question or need help? Send us a message and we'll get back
            to you within 24 hours.
          </p>

          {sent ? (
            <div className="bg-[#141414] border border-[#00f5ff]/20 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[rgba(0,245,255,0.1)] flex items-center justify-center text-2xl">
                ✓
              </div>
              <h2 className="text-white font-semibold text-lg">
                Message sent!
              </h2>
              <p className="text-[#666] text-sm">
                Our team will reply to {form.email} shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#666]">Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    className="bg-[#141414] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00f5ff]/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#666]">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    className="bg-[#141414] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00f5ff]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#666]">Subject</label>
                <input
                  value={form.subject}
                  onChange={set("subject")}
                  placeholder="What is this about?"
                  className="bg-[#141414] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00f5ff]/50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#666]">Message *</label>
                <textarea
                  required
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us how we can help..."
                  rows={6}
                  className="bg-[#141414] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00f5ff]/50 transition-colors resize-none"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="self-start px-8 py-3 rounded-xl text-sm font-bold text-black disabled:opacity-50 transition-colors"
                style={{
                  background: "linear-gradient(135deg, #00f5ff, #0099cc)",
                }}
              >
                {sending ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
