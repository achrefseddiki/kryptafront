"use client";

import { useState } from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { useCart } from "../lib/cart-context";
import { useT } from "../lib/language-context";
import { api } from "../lib/api";

export default function CartPage() {
  const { items, removeFromCart, updateQty, itemCount, total, promo, setPromo } = useCart();
  const t = useT();
  const [promoInput, setPromoInput] = useState(promo?.code ?? "");
  const [promoError, setPromoError] = useState("");
  const [promoChecking, setPromoChecking] = useState(false);

  const discountAmount = promo ? Math.round(total * promo.discountPercent / 100 * 100) / 100 : 0;
  const finalTotal = Math.max(0, total - discountAmount);

  async function applyPromo() {
    if (!promoInput.trim()) return;
    setPromoError(""); setPromo(null); setPromoChecking(true);
    try {
      const result = await api.promoCodes.validate(promoInput.trim());
      setPromo(result);
    } catch (err) {
      setPromoError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setPromoChecking(false);
    }
  }

  function removePromo() {
    setPromo(null);
    setPromoInput("");
    setPromoError("");
  }

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-6 lg:gap-8">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{t.cart.title}</span>
        </nav>

        <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-[-0.96px]">{t.cart.title}</h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Items list */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            {items.length === 0 ? (
              <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-10 lg:p-16 flex flex-col items-center gap-6 text-center">
                <span className="text-6xl">🛒</span>
                <h2 className="text-white text-2xl font-medium">{t.cart.empty}</h2>
                <p className="text-[#a0a0a0] text-base">{t.cart.emptySub}</p>
                <a href="/products" className="h-12 px-8 rounded-2xl flex items-center text-[#0a0a0a] text-base font-medium" style={{ background: GRADIENT }}>
                  {t.cart.browse}
                </a>
              </div>
            ) : (
              items.map(({ id, name, price, qty, img }) => (
                <div key={id} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <div className="size-[80px] sm:size-[100px] rounded-xl overflow-hidden bg-[#111] shrink-0">
                    <img src={img} alt={name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-base font-medium">{name}</h3>
                    <p className="text-[#a0a0a0] text-sm mt-1">{t.cart.unitPrice}: {price} DT</p>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="flex items-center bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl">
                      <button onClick={() => updateQty(id, qty - 1)} className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-white hover:text-[#00f5ff] transition-colors">−</button>
                      <span className="text-white text-sm font-medium px-2 sm:px-3">{qty}</span>
                      <button onClick={() => updateQty(id, qty + 1)} className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-white hover:text-[#00f5ff] transition-colors">+</button>
                    </div>
                    <span className="text-white text-base sm:text-lg font-bold min-w-[80px] text-right">{(price * qty)} DT</span>
                    <button onClick={() => removeFromCart(id)} className="text-[#a0a0a0] hover:text-red-400 transition-colors text-xl ml-1">✕</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order summary */}
          <div className="w-full lg:w-[380px] lg:shrink-0 bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-6 lg:sticky lg:top-[220px]">
            <h2 className="text-white text-xl font-medium">{t.cart.orderSummary}</h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">{t.cart.subtotal} ({itemCount} {t.cart.items})</span>
                <span className="text-white">{total} DT</span>
              </div>
              {promo && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Discount ({promo.discountPercent}%)</span>
                  <span className="text-green-400">−{discountAmount} DT</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">{t.cart.shipping}</span>
                <span className="text-green-400">{t.cart.free}</span>
              </div>
              <div className="border-t border-[rgba(255,255,255,0.08)] pt-3 flex justify-between">
                <span className="text-white font-medium">{t.cart.total}</span>
                <span className="text-white text-xl font-bold">{finalTotal} DT</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {promo ? (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5">
                  <span className="text-green-400 text-sm font-medium">✓ {promo.code} — {promo.discountPercent}% off</span>
                  <button onClick={removePromo} className="text-[#666] hover:text-white text-lg leading-none ml-2">×</button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={e => { setPromoInput(e.target.value.toUpperCase()); setPromoError(""); }}
                      onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); applyPromo(); } }}
                      placeholder={t.cart.promoCode}
                      className="flex-1 bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#a0a0a0] outline-none focus:border-[#00f5ff] transition-colors uppercase"
                    />
                    <button
                      onClick={applyPromo}
                      disabled={promoChecking || !promoInput.trim()}
                      className="px-4 rounded-xl border border-[#00f5ff] text-[#00f5ff] text-sm font-medium hover:bg-[#00f5ff]/10 transition-colors disabled:opacity-40"
                    >
                      {promoChecking ? "…" : t.cart.apply}
                    </button>
                  </div>
                  {promoError && <p className="text-red-400 text-xs">{promoError}</p>}
                </>
              )}
            </div>

            {items.length === 0 ? (
              <button
                disabled
                className="h-14 rounded-2xl flex items-center justify-center text-[#0a0a0a] text-base font-medium opacity-40 cursor-not-allowed"
                style={{ background: GRADIENT }}
              >
                {t.cart.checkout}
              </button>
            ) : (
              <Link
                href="/checkout"
                className="h-14 rounded-2xl flex items-center justify-center text-[#0a0a0a] text-base font-medium"
                style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
              >
                {t.cart.checkout}
              </Link>
            )}

            <div className="flex items-center justify-center gap-2 text-[#a0a0a0] text-xs">
              <span>🔒</span>
              <span>{t.cart.secure}</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
