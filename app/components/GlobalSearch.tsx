"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ASSETS } from "../lib/assets";
import type { SearchResults } from "../lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function fetchSearch(q: string): Promise<SearchResults> {
  const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(q)}`, { cache: "no-store" });
  if (!res.ok) throw new Error("search failed");
  return res.json();
}

const EMPTY: SearchResults = { products: [], builds: [], offers: [], blogPosts: [], drops: [] };

function hasResults(r: SearchResults) {
  return r.products.length + r.builds.length + r.offers.length + r.blogPosts.length + r.drops.length > 0;
}

function formatPrice(n: number) {
  return `${n} DT`;
}

interface Props {
  placeholder: string;
  onNavigate?: () => void;
  inputClassName?: string;
}

export default function GlobalSearch({ placeholder, onNavigate, inputClassName }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>(EMPTY);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((q: string) => {
    if (q.trim().length < 2) { setResults(EMPTY); setOpen(false); return; }
    setLoading(true);
    updateDropdownStyle();
    fetchSearch(q)
      .then((data) => { setResults(data); setOpen(true); })
      .catch(() => setResults(EMPTY))
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(query), 300);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query, search]);

  function updateDropdownStyle() {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: "fixed",
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    });
  }

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    window.addEventListener("resize", updateDropdownStyle);
    window.addEventListener("scroll", updateDropdownStyle, true);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("resize", updateDropdownStyle);
      window.removeEventListener("scroll", updateDropdownStyle, true);
    };
  }, []);

  function navigate(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
    onNavigate?.();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  const showDropdown = open && query.trim().length >= 2;

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <img
          src={ASSETS.iconSearch}
          alt=""
          className="absolute left-5 top-1/2 -translate-y-1/2 size-5 z-10 pointer-events-none"
        />
        {loading && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 size-4 border-2 border-[#00f5ff]/40 border-t-[#00f5ff] rounded-full animate-spin z-10" />
        )}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { updateDropdownStyle(); if (query.trim().length >= 2 && hasResults(results)) setOpen(true); }}
          placeholder={placeholder}
          autoComplete="off"
          className={inputClassName ?? "w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-full pl-14 pr-6 py-3 text-sm text-[rgba(255,255,255,0.8)] placeholder:text-[rgba(255,255,255,0.5)] outline-none focus:border-[#00f5ff] transition-colors"}
        />
      </form>

      {showDropdown && (
        <div className="bg-[#111] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden max-h-[480px] overflow-y-auto" style={dropdownStyle}>
          {!hasResults(results) ? (
            <p className="text-[#555] text-sm px-5 py-4 text-center">No results for "{query}"</p>
          ) : (
            <div className="flex flex-col">
              {results.products.length > 0 && (
                <Section title="Products">
                  {results.products.map((p) => (
                    <ResultRow
                      key={p.id}
                      img={p.img}
                      title={p.name}
                      subtitle={p.brand}
                      meta={formatPrice(p.price)}
                      onClick={() => navigate(`/products/${p.categorySlug}/${p.slug}`)}
                    />
                  ))}
                  <button
                    onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
                    className="w-full text-left px-4 py-2.5 text-xs text-[#00f5ff] hover:bg-white/5 transition-colors"
                  >
                    View all results →
                  </button>
                </Section>
              )}

              {results.builds.length > 0 && (
                <Section title="Builds">
                  {results.builds.map((b) => (
                    <ResultRow
                      key={b.id}
                      img={b.img ?? undefined}
                      title={b.name}
                      subtitle={b.tagline ?? undefined}
                      meta={formatPrice(b.price)}
                      onClick={() => navigate(`/builds/${b.id}`)}
                    />
                  ))}
                </Section>
              )}

              {results.offers.length > 0 && (
                <Section title="Offers">
                  {results.offers.map((o) => (
                    <ResultRow
                      key={o.id}
                      img={o.img ?? undefined}
                      title={o.title}
                      meta={formatPrice(o.price)}
                      onClick={() => navigate(o.slug ? `/offers/${o.slug}` : `/offers`)}
                    />
                  ))}
                </Section>
              )}

              {results.blogPosts.length > 0 && (
                <Section title="Blog">
                  {results.blogPosts.map((b) => (
                    <ResultRow
                      key={b.slug}
                      img={b.img}
                      title={b.title}
                      subtitle={b.category}
                      onClick={() => navigate(`/blog/${b.slug}`)}
                    />
                  ))}
                </Section>
              )}

              {results.drops.length > 0 && (
                <Section title="Drops">
                  {results.drops.map((d) => (
                    <ResultRow
                      key={d.id}
                      img={d.img}
                      title={d.title}
                      subtitle={d.status === "live" ? "Live now" : d.status === "upcoming" ? "Coming soon" : "Sold out"}
                      onClick={() => navigate(`/drops`)}
                    />
                  ))}
                </Section>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-[#444]">{title}</p>
      {children}
    </div>
  );
}

function ResultRow({
  img,
  title,
  subtitle,
  meta,
  onClick,
}: {
  img?: string;
  title: string;
  subtitle?: string;
  meta?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.05] transition-colors text-left"
    >
      {img ? (
        <img src={img} alt="" className="size-9 rounded-lg object-cover shrink-0 bg-white/5" />
      ) : (
        <div className="size-9 rounded-lg bg-white/5 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{title}</p>
        {subtitle && <p className="text-[#666] text-xs truncate">{subtitle}</p>}
      </div>
      {meta && <span className="text-[#00f5ff] text-xs font-semibold shrink-0">{meta}</span>}
    </button>
  );
}
