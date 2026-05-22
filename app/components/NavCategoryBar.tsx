"use client";

import Link from "next/link";
import type { Category } from "../lib/types";

export default function NavCategoryBar({ categories }: { categories: Category[] }) {
  const roots = categories.filter(c => !c.parentSlug);
  const childrenOf = (slug: string) => categories.filter(c => c.parentSlug === slug);

  return (
    <div className="relative h-12 border-b border-[rgba(255,255,255,0.05)] px-24 flex items-center shrink-0">
      <nav className="flex items-center gap-8">
        {roots.map((root) => {
          const children = childrenOf(root.slug);
          const hasChildren = children.length > 0;

          return (
            <div key={root.slug} className="group h-12 flex items-center">
              <Link
                href={`/products/${root.slug}`}
                className="flex items-center gap-1 text-[#a0a0a0] text-sm hover:text-white transition-colors whitespace-nowrap"
              >
                {root.label}
                {hasChildren && (
                  <svg
                    className="size-3 shrink-0 transition-transform group-hover:rotate-180"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>

              {hasChildren && (
                <div className="absolute left-0 right-0 top-full hidden group-hover:block z-50">
                  <div className="bg-[#0f0f0f] border-x-0 border-b border-t-0 border-white/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.6)] px-24 py-4 flex flex-wrap gap-1">
                    {children.map((child) => (
                      <Link
                        key={child.slug}
                        href={`/products/${child.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#a0a0a0] text-sm hover:bg-white/[0.06] hover:text-white transition-colors whitespace-nowrap"
                      >
                        {child.img && (
                          <img src={child.img} alt="" className="size-4 object-contain opacity-60" />
                        )}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
