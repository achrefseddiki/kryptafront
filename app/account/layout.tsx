"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import { useAuth } from "../lib/auth-context";
import { useT } from "../lib/language-context";
import { GRADIENT } from "../lib/assets";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, user } = useAuth();
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace("/login");
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { label: t.account.orders, href: "/account/orders" },
    { label: t.account.profile, href: "/account/profile" },
  ];

  return (
    <PageWrapper>
      <div className="px-24 pb-16 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold text-white tracking-tight">{t.account.title}</h1>
          <p className="text-[#a0a0a0] text-sm">{user!.firstName} {user!.lastName} · {user!.email}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-[rgba(255,255,255,0.08)] pb-0">
          {tabs.map(tab => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  active
                    ? "text-[#00f5ff] border-[#00f5ff]"
                    : "text-[#a0a0a0] border-transparent hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {children}
      </div>
    </PageWrapper>
  );
}
