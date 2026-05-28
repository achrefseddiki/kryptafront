"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ASSETS, GRADIENT } from "../lib/assets";
import type { Category } from "../lib/types";
import NavLanguageSwitcher from "./NavLanguageSwitcher";
import GlobalSearch from "./GlobalSearch";

interface Props {
  categories: Category[];
  t: {
    search: string;
    build: string;
    ourProducts: string;
    location: string;
  };
}

export default function MobileNavDrawer({ categories, t }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const router = useRouter();

  const roots = categories.filter((c) => !c.parentSlug);
  const childrenOf = (slug: string) => categories.filter((c) => c.parentSlug === slug);

  function close() {
    setIsOpen(false);
    setExpanded(null);
  }

  return (
    <>
      {/* Hamburger trigger — mobile only */}
      <button
        className="lg:hidden size-10 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-colors"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={close}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[300px] bg-[#0f0f0f] flex flex-col overflow-y-auto transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <Link href="/" onClick={close}>
            <img src={ASSETS.logo} alt="KRYPTA" className="h-7 w-auto" />
          </Link>
          <button
            onClick={close}
            className="size-8 flex items-center justify-center text-[#a0a0a0] hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pt-5 pb-3">
          <GlobalSearch
            placeholder={t.search}
            onNavigate={close}
            inputClassName="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white/70 placeholder:text-white/40 outline-none focus:border-[#00f5ff] transition-colors"
          />
        </div>

        {/* Primary links */}
        <nav className="px-5 py-3 flex flex-col gap-1 border-b border-white/[0.06]">
          <Link
            href="/products"
            onClick={close}
            className="flex items-center gap-3 h-11 px-3 rounded-xl text-sm font-medium text-[#0a0a0a]"
            style={{ background: GRADIENT }}
          >
            {t.ourProducts}
          </Link>
          {[
            { label: "KryptaBar", href: "/builds" },
            { label: "KryptaDrop", href: "/drops" },
            { label: "KryptaLab", href: "/lab" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={close}
              className="flex items-center h-11 px-3 rounded-xl text-sm font-medium text-[#a0a0a0] hover:text-white hover:bg-white/5 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Categories accordion */}
        <div className="px-5 py-4 flex flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 px-3 mb-2">
            Catégories
          </p>
          {roots.map((root) => {
            const children = childrenOf(root.slug);
            const isExpanded = expanded === root.slug;

            return (
              <div key={root.slug}>
                <button
                  className="w-full flex items-center justify-between h-11 px-3 rounded-xl text-sm text-[#a0a0a0] hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => {
                    if (children.length === 0) {
                      router.push(`/products/${root.slug}`);
                      close();
                    } else {
                      setExpanded(isExpanded ? null : root.slug);
                    }
                  }}
                >
                  <span className="flex items-center gap-3">
                    {root.img && (
                      <img src={root.img} alt="" className="size-4 object-contain opacity-60" />
                    )}
                    {root.label}
                  </span>
                  {children.length > 0 && (
                    <svg
                      className={`size-4 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                {isExpanded && children.length > 0 && (
                  <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-white/[0.06] pl-4">
                    {children.map((child) => (
                      <Link
                        key={child.slug}
                        href={`/products/${child.slug}`}
                        onClick={close}
                        className="flex items-center gap-2 h-10 px-3 rounded-xl text-sm text-[#a0a0a0] hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {child.img && (
                          <img src={child.img} alt="" className="size-3.5 object-contain opacity-60" />
                        )}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Build PC CTA + Language switcher */}
        <div className="mt-auto px-5 py-5 border-t border-white/[0.06] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[#a0a0a0] text-xs uppercase tracking-widest">Language</span>
            <NavLanguageSwitcher />
          </div>
          <Link
            href="/builder"
            onClick={close}
            className="flex items-center justify-center h-12 rounded-2xl text-[#0a0a0a] text-sm font-medium"
            style={{ background: GRADIENT }}
          >
            {t.build}
          </Link>
        </div>
      </div>
    </>
  );
}
