"use client";

import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { useCart } from "../lib/cart-context";
import { useT } from "../lib/language-context";

export default function CartPage() {
  const { items, removeFromCart, updateQty, itemCount, total } = useCart();
  const t = useT();

  return (
    <PageWrapper>
      <div className="px-24 pb-16 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{t.cart.title}</span>
        </nav>

        <h1 className="text-5xl font-bold text-white tracking-[-0.96px]">{t.cart.title}</h1>

        <div className="flex gap-8 items-start">
          <div className="flex-1 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-16 flex flex-col items-center gap-6 text-center">
                <span className="text-6xl">🛒</span>
                <h2 className="text-white text-2xl font-medium">{t.cart.empty}</h2>
                <p className="text-[#a0a0a0] text-base">{t.cart.emptySub}</p>
                <a href="/products" className="h-12 px-8 rounded-2xl flex items-center text-[#0a0a0a] text-base font-medium" style={{ background: GRADIENT }}>
                  {t.cart.browse}
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
                    <p className="text-[#a0a0a0] text-sm mt-1">{t.cart.unitPrice}: {price.toLocaleString()} DT</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl">
                      <button onClick={() => updateQty(id, qty - 1)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#00f5ff] transition-colors">−</button>
                      <span className="text-white text-sm font-medium px-3">{qty}</span>
                      <button onClick={() => updateQty(id, qty + 1)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#00f5ff] transition-colors">+</button>
                    </div>
                    <span className="text-white text-lg font-bold w-[100px] text-right">{(price * qty).toLocaleString()} DT</span>
                    <button onClick={() => removeFromCart(id)} className="text-[#a0a0a0] hover:text-red-400 transition-colors text-xl ml-2">✕</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-[380px] shrink-0 bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-6 sticky top-[220px]">
            <h2 className="text-white text-xl font-medium">{t.cart.orderSummary}</h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">{t.cart.subtotal} ({itemCount} {t.cart.items})</span>
                <span className="text-white">{total.toLocaleString()} DT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">{t.cart.shipping}</span>
                <span className="text-green-400">{t.cart.free}</span>
              </div>
              <div className="border-t border-[rgba(255,255,255,0.08)] pt-3 flex justify-between">
                <span className="text-white font-medium">{t.cart.total}</span>
                <span className="text-white text-xl font-bold">{total.toLocaleString()} DT</span>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t.cart.promoCode}
                className="flex-1 bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#a0a0a0] outline-none focus:border-[#00f5ff] transition-colors"
              />
              <button className="px-4 rounded-xl border border-[#00f5ff] text-[#00f5ff] text-sm font-medium hover:bg-[#00f5ff]/10 transition-colors">
                {t.cart.apply}
              </button>
            </div>

            <a
              href="/checkout"
              className="h-14 rounded-2xl flex items-center justify-center text-[#0a0a0a] text-base font-medium"
              style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
            >
              {t.cart.checkout}
            </a>

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
