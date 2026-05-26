"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface CompareProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  oldPrice: number | null;
  img: string;
  badge: string | null;
  specs: string[];
  inStock: boolean;
  categorySlug: string;
}

const MAX = 4;

interface CompareContextValue {
  compareProducts: CompareProduct[];
  isInCompare: (id: string) => boolean;
  toggle: (product: CompareProduct) => void;
  clear: () => void;
  maxReached: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareProducts, setCompareProducts] = useState<CompareProduct[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("krypta_compare");
      if (saved) setCompareProducts(JSON.parse(saved));
    } catch {}
  }, []);

  function persist(next: CompareProduct[]) {
    setCompareProducts(next);
    try { localStorage.setItem("krypta_compare", JSON.stringify(next)); } catch {}
  }

  function toggle(product: CompareProduct) {
    setCompareProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      const next = exists
        ? prev.filter(p => p.id !== product.id)
        : prev.length < MAX ? [...prev, product] : prev;
      try { localStorage.setItem("krypta_compare", JSON.stringify(next)); } catch {}
      return next;
    });
  }

  return (
    <CompareContext.Provider value={{
      compareProducts,
      isInCompare: id => compareProducts.some(p => p.id === id),
      toggle,
      clear: () => persist([]),
      maxReached: compareProducts.length >= MAX,
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used inside CompareProvider");
  return ctx;
}
