"use client";

import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { CART_ITEMS } from "../lib/data";

export default function CartPage() {
  const [items, setItems] = useState(CART_ITEMS.map((i) => ({ ...i })));

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const updateQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <PageWrapper>
      <div className="px-24 pb-16 flex flex-col gap-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span className="text-white/20">/</span>
          <span className="text-white">Shopping Cart</span>
        </nav>

        <h1 className="text-5xl font-bold text-white tracking-[-0.96px]">Shopping Cart</h1>

        <div className="flex gap-8 items-start">
          {/* Cart items */}
          <div className="flex-1 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-16 flex flex-col items-center gap-6 text-center">
                <span className="text-6xl">🛒</span>
                <h2 className="text-white text-2xl font-medium">Your cart is empty</h2>
                <p className="text-[#a0a0a0] text-base">Start adding products to your cart.</p>
                <a href="/products" className="h-12 px-8 rounded-2xl flex items-center text-[#0a0a0a] text-base font-medium" style={{ background: GRADIENT }}>
                  Browse Products
                </a>
              </div>
            ) : (
              items.map(({ id, name, price, qty, img }) => (
                <div key={id} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex items-center gap-6">
                  <div className="size-[100px] rounded-xl overflow-hidden bg-[#111] shrink-0">
                    <img src={img} alt={name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-base font-medium">{name}</h3>
                    <p className="text-[#a0a0a0] text-sm mt-1">Unit price: ${price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl">
                      <button onClick={() => updateQty(id, -1)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#00f5ff] transition-colors">−</button>
                      <span className="text-white text-sm font-medium px-3">{qty}</span>
                      <button onClick={() => updateQty(id, 1)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#00f5ff] transition-colors">+</button>
                    </div>
                    <span className="text-white text-lg font-bold w-[100px] text-right">${(price * qty).toLocaleString()}</span>
                    <button onClick={() => remove(id)} className="text-[#a0a0a0] hover:text-red-400 transition-colors text-xl ml-2">✕</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order summary */}
          <div className="w-[380px] shrink-0 bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-6 sticky top-[220px]">
            <h2 className="text-white text-xl font-medium">Order Summary</h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span className="text-white">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="border-t border-[rgba(255,255,255,0.08)] pt-3 flex justify-between">
                <span className="text-white font-medium">Total</span>
                <span className="text-white text-xl font-bold">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Promo code */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#a0a0a0] outline-none focus:border-[#00f5ff] transition-colors"
              />
              <button className="px-4 rounded-xl border border-[#00f5ff] text-[#00f5ff] text-sm font-medium hover:bg-[#00f5ff]/10 transition-colors">
                Apply
              </button>
            </div>

            <a
              href="/checkout"
              className="h-14 rounded-2xl flex items-center justify-center text-[#0a0a0a] text-base font-medium"
              style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
            >
              Proceed to Checkout →
            </a>

            <div className="flex items-center justify-center gap-2 text-[#a0a0a0] text-xs">
              <span>🔒</span>
              <span>Secure checkout · Tunisia delivery</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
