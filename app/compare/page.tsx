"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCompare, type CompareProduct } from "../lib/compare-context";
import { useCart } from "../lib/cart-context";
import { GRADIENT } from "../lib/assets";
import PageWrapper from "../components/PageWrapper";

function AddToCartBtn({ product }: { product: CompareProduct }) {
  const { addToCart } = useCart();
  const [flash, setFlash] = useState(false);
  function handle() {
    addToCart({ id: product.id, slug: product.slug, name: product.name, price: product.price, img: product.img });
    setFlash(true);
    setTimeout(() => setFlash(false), 1800);
  }
  return (
    <button
      onClick={handle}
      className="w-full h-9 rounded-xl text-xs font-semibold text-[#0a0a0a] transition-opacity"
      style={{ background: GRADIENT }}
    >
      {flash ? "Ajouté ✓" : "Ajouter au panier"}
    </button>
  );
}

const KEY_ROWS: { label: string; render: (p: CompareProduct) => React.ReactNode }[] = [
  { label: "Prix", render: p => <span className="text-white font-bold">{p.price} DT</span> },
  { label: "Ancien prix", render: p => p.oldPrice ? <span className="text-[#a0a0a0] line-through">{p.oldPrice} DT</span> : <span className="text-[#444]">—</span> },
  { label: "Marque", render: p => <span className="text-white">{p.brand}</span> },
  { label: "Catégorie", render: p => <Link href={`/products/${p.categorySlug}`} className="text-[#00f5ff] hover:underline capitalize">{p.categorySlug.replace(/-/g, " ")}</Link> },
  { label: "En stock", render: p => p.inStock
      ? <span className="flex items-center gap-1.5 text-green-400 text-sm font-medium"><span className="size-1.5 rounded-full bg-green-400" />Disponible</span>
      : <span className="flex items-center gap-1.5 text-red-400 text-sm font-medium"><span className="size-1.5 rounded-full bg-red-400" />Épuisé</span> },
  { label: "Badge", render: p => p.badge ? <span className="text-xs font-bold text-[#0a0a0a] px-2 py-0.5 rounded" style={{ background: GRADIENT }}>{p.badge}</span> : <span className="text-[#444]">—</span> },
];

export default function ComparePage() {
  const { compareProducts, toggle, clear } = useCompare();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { setHydrated(true); }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (compareProducts.length === 0) {
    return (
      <PageWrapper>
        <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col items-center gap-6 py-24">
          <div className="size-20 rounded-2xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5M3 12h4m10 0h4M12 3v4m0 10v4"/>
              <rect x="8" y="8" width="8" height="8" rx="1"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-white text-xl font-semibold">Aucun produit sélectionné</p>
            <p className="text-[#a0a0a0] text-sm mt-1">Ajoutez des produits à comparer depuis les fiches produits.</p>
          </div>
          <Link href="/products" className="h-11 px-6 rounded-2xl flex items-center text-[#0a0a0a] text-sm font-medium" style={{ background: GRADIENT }}>
            Explorer les produits
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const cols = compareProducts.length;
  const gridCols = cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-4";

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span className="text-white/20">/</span>
          <span className="text-white">Comparaison</span>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Comparaison de produits</h1>
            <p className="text-[#a0a0a0] text-sm mt-1">{cols} produit{cols > 1 ? "s" : ""} en comparaison</p>
          </div>
          <button onClick={clear} className="text-[#666] text-sm hover:text-red-400 transition-colors">
            Tout effacer
          </button>
        </div>

        {/* Product header cards */}
        <div className={`grid ${gridCols} gap-4`}>
          {compareProducts.map(p => (
            <div key={p.id} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden flex flex-col">
              <div className="relative h-[180px] bg-[#111]">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                {p.badge && (
                  <span className="absolute top-2 left-2 text-[10px] font-bold text-[#0a0a0a] px-2 py-0.5 rounded" style={{ background: GRADIENT }}>
                    {p.badge}
                  </span>
                )}
                <button
                  onClick={() => toggle(p)}
                  className="absolute top-2 right-2 size-7 rounded-lg bg-black/60 text-[#a0a0a0] hover:text-red-400 transition-colors flex items-center justify-center text-base leading-none"
                >
                  ×
                </button>
              </div>
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-[#a0a0a0] text-xs uppercase tracking-wider">{p.brand}</p>
                  <Link href={`/products/${p.categorySlug}/${p.slug}`} className="text-white text-sm font-semibold leading-snug hover:text-[#00f5ff] transition-colors line-clamp-2 mt-0.5 block">
                    {p.name}
                  </Link>
                </div>
                <div className="mt-auto">
                  <p className="text-white text-xl font-bold mb-2">{p.price} DT</p>
                  <AddToCartBtn product={p} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key info rows */}
        <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.07)]">
            <p className="text-white font-semibold text-sm">Informations clés</p>
          </div>
          {KEY_ROWS.map(({ label, render }) => (
            <div key={label} className={`grid gap-4 px-5 py-3.5 border-b border-[rgba(255,255,255,0.05)] last:border-0 items-center`}
              style={{ gridTemplateColumns: `160px repeat(${cols}, 1fr)` }}>
              <span className="text-[#666] text-sm">{label}</span>
              {compareProducts.map(p => (
                <div key={p.id} className="text-sm">{render(p)}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Specs per product */}
        <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.07)]">
            <p className="text-white font-semibold text-sm">Spécifications</p>
          </div>
          <div className={`grid gap-4 px-5 py-4`} style={{ gridTemplateColumns: `160px repeat(${cols}, 1fr)` }}>
            <span className="text-[#666] text-sm">Caractéristiques</span>
            {compareProducts.map(p => (
              <div key={p.id} className="flex flex-wrap gap-1.5">
                {p.specs.length > 0
                  ? p.specs.map(s => (
                    <span key={s} className="text-xs text-[#a0a0a0] border border-[rgba(255,255,255,0.1)] rounded px-2 py-0.5">{s}</span>
                  ))
                  : <span className="text-[#444] text-sm">—</span>
                }
              </div>
            ))}
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
