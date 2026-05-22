"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const TOKEN_KEY = "krypta_token";
const USER_KEY = "krypta_user";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function CallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    localStorage.setItem(TOKEN_KEY, token);
    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((me) => {
        sessionStorage.setItem(USER_KEY, JSON.stringify(me));
        router.replace("/");
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        router.replace("/login");
      });
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#a0a0a0] text-sm">Signing you in…</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
}
