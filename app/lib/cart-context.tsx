"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  img: string;
  qty: number;
}

export interface CartPromo {
  code: string;
  discountPercent: number;
}

export interface CartToast {
  name: string;
  img: string;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  promo: CartPromo | null;
  setPromo: (promo: CartPromo | null) => void;
  toast: CartToast | null;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "krypta_cart";
const PROMO_KEY = "krypta_cart_promo";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [promo, setPromoState] = useState<CartPromo | null>(null);
  const [toast, setToast] = useState<CartToast | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      const rawPromo = sessionStorage.getItem(PROMO_KEY);
      if (rawPromo) setPromoState(JSON.parse(rawPromo));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function setPromo(p: CartPromo | null) {
    setPromoState(p);
    try {
      if (p) sessionStorage.setItem(PROMO_KEY, JSON.stringify(p));
      else sessionStorage.removeItem(PROMO_KEY);
    } catch {}
  }

  function addToCart(item: Omit<CartItem, "qty">) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    setToast({ name: item.name, img: item.img });
    setTimeout(() => setToast(null), 2800);
  }

  function removeFromCart(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQty(id: string, qty: number) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  }

  function clearCart() {
    setItems([]);
    setPromoState(null);
    try { sessionStorage.removeItem(PROMO_KEY); } catch {}
  }

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, itemCount, total, promo, setPromo, toast }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
