"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ASSETS, GRADIENT } from "../lib/assets";
import { useAuth } from "../lib/auth-context";
import { useT } from "../lib/language-context";
import PageWrapper from "../components/PageWrapper";

export default function LoginPage() {
  const { login, loading: authLoading, isAuthenticated } = useAuth();
  const t = useT();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) router.replace("/");
  }, [authLoading, isAuthenticated, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageWrapper>
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[480px] flex flex-col gap-8">
          <div className="flex flex-col items-center gap-1">
            <a href="/" className="relative w-[150px] h-[34px] overflow-hidden mb-2">
              <img
                src={ASSETS.logo}
                alt="KRYPTA"
                className="absolute"
                style={{ height: "610%", width: "138%", left: "-19%", top: "-255%" }}
              />
            </a>
            <h1 className="text-white text-2xl font-bold">{t.auth_pages.welcomeBack}</h1>
            <p className="text-[#a0a0a0] text-sm">{t.auth_pages.signInSub}</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium">{t.auth_pages.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#a0a0a0] outline-none focus:border-[#00f5ff] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium">{t.auth_pages.password}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#a0a0a0] outline-none focus:border-[#00f5ff] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="h-12 rounded-2xl text-[#0a0a0a] text-base font-medium disabled:opacity-60 transition-opacity mt-1"
                style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.15))" }}
              >
                {submitting ? t.auth_pages.signingIn : t.auth_pages.signIn}
              </button>
            </form>

            <p className="text-center text-sm text-[#a0a0a0]">
              {t.auth_pages.noAccount}{" "}
              <a href="/register" className="text-[#00f5ff] hover:underline font-medium">
                {t.auth_pages.createOne}
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
