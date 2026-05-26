"use client";

import { useRouter } from "next/navigation";
import { useCompare } from "../lib/compare-context";
import { GRADIENT } from "../lib/assets";

export default function CompareBar() {
  const { compareProducts, clear, toggle } = useCompare();
  const router = useRouter();
  const count = compareProducts.length;

  if (count === 0) return null;

  return (
    <>
      {/* Spacer so page content isn't hidden behind bar */}
      <div className="h-24" />

      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,10,0.97)] backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-24 h-20 flex items-center gap-4">

          {/* Product thumbnails */}
          <div className="flex items-center gap-3 flex-1 min-w-0 overflow-x-auto">
            {compareProducts.map(p => (
              <div key={p.id} className="relative flex items-center gap-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-2 py-1.5 shrink-0">
                <img src={p.img} alt={p.name} className="size-9 rounded-lg object-cover bg-[#111]" />
                <div className="max-w-[100px]">
                  <p className="text-white text-xs font-medium truncate leading-tight">{p.name}</p>
                  <p className="text-[#00f5ff] text-xs font-bold">{p.price.toLocaleString()} DT</p>
                </div>
                <button
                  onClick={() => toggle(p)}
                  className="text-[#666] hover:text-red-400 transition-colors text-base leading-none ml-1"
                  aria-label="Retirer"
                >
                  ×
                </button>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: Math.max(0, 2 - count) }).map((_, i) => (
              <div key={i} className="size-12 rounded-xl border border-dashed border-[rgba(255,255,255,0.1)] flex items-center justify-center shrink-0">
                <span className="text-[#444] text-lg">+</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={clear}
              className="text-[#666] text-sm hover:text-white transition-colors whitespace-nowrap"
            >
              Tout effacer
            </button>
            <button
              onClick={() => router.push("/compare")}
              disabled={count < 2}
              className="h-10 px-5 rounded-2xl text-sm font-medium text-[#0a0a0a] disabled:opacity-40 whitespace-nowrap transition-opacity"
              style={{ background: GRADIENT }}
            >
              Comparer ({count})
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
