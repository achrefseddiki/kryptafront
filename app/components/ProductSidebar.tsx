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
  }

  function clear() {
    setSelectedRange("");
    setSelectedBrands([]);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceRange");
    params.delete("brand");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const hasFilters = selectedRange !== "" || selectedBrands.length > 0;

  return (
    <aside className="w-[240px] shrink-0 flex flex-col gap-8">
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
    </aside>
  );
}
