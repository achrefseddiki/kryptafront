"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ASSETS, GRADIENT } from "../lib/assets";
import { useAuth } from "../lib/auth-context";
import { useT } from "../lib/language-context";
import PageWrapper from "../components/PageWrapper";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function LoginContent() {
  const { login, loading: authLoading, isAuthenticated } = useAuth();
  const t = useT();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) router.replace(redirect);
  }, [authLoading, isAuthenticated, router, redirect]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.push(redirect);
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
            <a href="/" className="mb-2">
              <img src={ASSETS.logo} alt="KRYPTA" className="h-[34px] w-auto" />
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

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
              <span className="text-[#a0a0a0] text-xs">{t.auth_pages.orContinueWith}</span>
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`${API_URL}/auth/google`}
                className="flex items-center justify-center gap-3 h-11 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-white text-sm font-medium hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                  <path d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
                  <path d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
                  <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.309 0-9.618-3.317-11.286-7.934l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
                  <path d="M43.611 20.083H42V20H24v8h11.303a11.966 11.966 0 01-4.087 5.571l6.19 5.238C42.021 35.533 44 30.218 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
                </svg>
                {t.auth_pages.continueWithGoogle}
              </a>
              <a
                href={`${API_URL}/auth/facebook`}
                className="flex items-center justify-center gap-3 h-11 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-white text-sm font-medium hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971h-1.514c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
                {t.auth_pages.continueWithFacebook}
              </a>
            </div>

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

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
