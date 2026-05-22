"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { GRADIENT } from "../lib/assets";

interface Props {
  priceRanges: string[];
  brands: string[];
  t: {
    priceRange: string;
    brand: string;
    applyFilters: string;
    clearFilters: string;
    filters: string;
  };
}

export default function ProductSidebar({ priceRanges, brands, t }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedRange, setSelectedRange] = useState(searchParams.get("priceRange") ?? "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    () => searchParams.get("brand")?.split(",").filter(Boolean) ?? []
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleBrand(b: string) {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  }

  function apply() {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedRange) params.set("priceRange", selectedRange);
    else params.delete("priceRange");
    if (selectedBrands.length > 0) params.set("brand", selectedBrands.join(","));
    else params.delete("brand");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    setMobileOpen(false);
  }

  function clear() {
    setSelectedRange("");
    setSelectedBrands([]);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceRange");
    params.delete("brand");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    setMobileOpen(false);
  }

  const hasFilters = selectedRange !== "" || selectedBrands.length > 0;

  const filterContent = (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-white text-sm font-medium uppercase tracking-wider">{t.priceRange}</h3>
        <div className="flex flex-col gap-2">
          {priceRanges.map((r, i) => {
            const val = String(i);
            const checked = selectedRange === val;
            return (
              <label
                key={r}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setSelectedRange(checked ? "" : val)}
              >
                <span
                  className={`size-4 border rounded flex items-center justify-center transition-colors shrink-0 ${
                    checked
                      ? "border-[#00f5ff] bg-[#00f5ff]/20"
                      : "border-[rgba(255,255,255,0.2)] group-hover:border-[#00f5ff]"
                  }`}
                >
                  {checked && <span className="size-2 rounded-sm bg-[#00f5ff]" />}
                </span>
                <span
                  className={`text-sm transition-colors ${
                    checked ? "text-white" : "text-[#a0a0a0] group-hover:text-white"
                  }`}
                >
                  {r}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-white text-sm font-medium uppercase tracking-wider">{t.brand}</h3>
        <div className="flex flex-col gap-2">
          {brands.map((b) => {
            const checked = selectedBrands.includes(b);
            return (
              <label
                key={b}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => toggleBrand(b)}
              >
                <span
                  className={`size-4 border rounded flex items-center justify-center transition-colors shrink-0 ${
                    checked
                      ? "border-[#00f5ff] bg-[#00f5ff]/20"
                      : "border-[rgba(255,255,255,0.2)] group-hover:border-[#00f5ff]"
                  }`}
                >
                  {checked && <span className="size-2 rounded-sm bg-[#00f5ff]" />}
                </span>
                <span
                  className={`text-sm transition-colors ${
                    checked ? "text-white" : "text-[#a0a0a0] group-hover:text-white"
                  }`}
                >
                  {b}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={apply}
          className="h-11 rounded-2xl text-[#0a0a0a] text-sm font-medium"
          style={{ background: GRADIENT }}
        >
          {t.applyFilters}
        </button>
        {hasFilters && (
          <button
            onClick={clear}
            className="h-11 rounded-2xl text-[#a0a0a0] text-sm font-medium border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:text-white transition-colors"
          >
            {t.clearFilters}
          </button>
        )}
      </div>
    </>
  );

  return (
    // lg:contents makes this wrapper transparent in desktop flex layout
    <div className="lg:contents">
      {/* Mobile filter toggle button */}
      <button
        className="lg:hidden w-full flex items-center justify-center gap-2 h-11 px-4 mb-4
          border border-[rgba(255,255,255,0.1)] rounded-xl text-[#a0a0a0] text-sm
          hover:border-[rgba(255,255,255,0.2)] hover:text-white transition-colors"
        onClick={() => setMobileOpen(true)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {t.filters}
        {hasFilters && (
          <span className="size-5 rounded-full bg-[#00f5ff] text-[#0a0a0a] text-[10px] font-bold flex items-center justify-center">
            {(selectedRange !== "" ? 1 : 0) + selectedBrands.length}
          </span>
        )}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar panel — fixed on mobile, static on desktop */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0f0f0f] p-6 flex flex-col gap-8 overflow-y-auto
          transition-transform duration-300
          lg:static lg:translate-x-0 lg:w-[240px] lg:bg-transparent lg:p-0 lg:overflow-visible lg:z-auto lg:flex
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex items-center justify-between -mb-2">
          <span className="text-white text-sm font-medium">{t.filters}</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="size-8 flex items-center justify-center text-[#a0a0a0] hover:text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {filterContent}
      </aside>
    </div>
  );
}
