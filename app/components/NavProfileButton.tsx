"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ASSETS, GRADIENT } from "../lib/assets";
import { useAuth } from "../lib/auth-context";
import { useT } from "../lib/language-context";

export default function NavProfileButton() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (loading) {
    return <div className="h-11 w-24 rounded-2xl bg-white/5 animate-pulse" />;
  }

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="h-11 px-5 rounded-2xl border border-[#00f5ff] text-[#00f5ff] text-sm font-medium flex items-center gap-2 hover:bg-[#00f5ff]/10 transition-colors whitespace-nowrap"
      >
        <img src={ASSETS.iconProfile} alt="" className="size-4 opacity-80" />
        {t.auth.signIn}
      </Link>
    );
  }

  const initials = `${user!.firstName[0]}${user!.lastName[0]}`.toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="size-10 rounded-2xl flex items-center justify-center text-[#0a0a0a] text-xs font-bold"
        style={{ background: GRADIENT }}
        title={`${user!.firstName} ${user!.lastName}`}
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-12 bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-2 min-w-[200px] z-50 shadow-xl">
          <div className="px-3 py-2.5 border-b border-[rgba(255,255,255,0.06)] mb-1">
            <p className="text-white text-sm font-medium">
              {user!.firstName} {user!.lastName}
            </p>
            <p className="text-[#a0a0a0] text-xs mt-0.5 truncate">
              {user!.email}
            </p>
            {user!.role === "admin" && (
              <span
                className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded text-[#0a0a0a]"
                style={{ background: GRADIENT }}
              >
                ADMIN
              </span>
            )}
          </div>
          <Link
            href="/account/orders"
            onClick={() => setOpen(false)}
            className="w-full px-3 py-2 text-left text-sm text-white hover:bg-white/5 rounded-xl transition-colors flex items-center gap-2"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            {t.account.orders}
          </Link>
          <Link
            href="/account/builds"
            onClick={() => setOpen(false)}
            className="w-full px-3 py-2 text-left text-sm text-white hover:bg-white/5 rounded-xl transition-colors flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
            {t.account.myBuilds}
          </Link>
          <Link
            href="/account/profile"
            onClick={() => setOpen(false)}
            className="w-full px-3 py-2 text-left text-sm text-white hover:bg-white/5 rounded-xl transition-colors flex items-center gap-2"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {t.account.profile}
          </Link>
          <div className="h-px bg-[rgba(255,255,255,0.06)] my-1" />
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
          >
            {t.auth.signOut}
          </button>
        </div>
      )}
    </div>
  );
}
