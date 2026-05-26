"use client";

import { useCompare, type CompareProduct } from "../lib/compare-context";

export default function CompareButton({ product, className = "" }: { product: CompareProduct; className?: string }) {
  const { isInCompare, toggle, maxReached } = useCompare();
  const active = isInCompare(product.id);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={active ? "Retirer de la comparaison" : "Ajouter à la comparaison"}
      title={!active && maxReached ? "Maximum 4 produits" : undefined}
      disabled={!active && maxReached}
      className={`flex items-center justify-center size-9 rounded-xl border transition-all disabled:opacity-40 ${
        active
          ? "bg-[#00f5ff]/10 border-[#00f5ff]/40 text-[#00f5ff]"
          : "bg-black/40 border-white/10 text-[#a0a0a0] hover:border-white/30 hover:text-white"
      } ${className}`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5M3 12h4m10 0h4M12 3v4m0 10v4"/>
        <rect x="8" y="8" width="8" height="8" rx="1"/>
      </svg>
    </button>
  );
}
