"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { useCart } from "../lib/cart-context";
import { useT } from "../lib/language-context";
import { useAuth } from "../lib/auth-context";
import { api } from "../lib/api";

const GOVERNORATES = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan",
  "Bizerte", "Béja", "Jendouba", "Kef", "Siliana", "Sousse",
  "Monastir", "Mahdia", "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid",
  "Gabès", "Medenine", "Tataouine", "Gafsa", "Tozeur", "Kébili",
];

const EMPTY = {
  firstName: "", lastName: "", phone: "", address: "",
  city: "", governorate: "", notes: "", email: "",
};

export default function CheckoutPage() {
  const t = useT();
  const router = useRouter();
  const { items, total, itemCount, clearCart, promo: cartPromo, setPromo: setCartPromo } = useCart();
  const { user, loading, isAuthenticated } = useAuth();

  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [promoInput, setPromoInput] = useState(cartPromo?.code ?? "");
  const [promoState, setPromoState] = useState<{ code: string; discountPercent: number } | null>(cartPromo);
  const [promoError, setPromoError] = useState("");
  const [promoChecking, setPromoChecking] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login?redirect=/checkout");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        firstName: f.firstName || user.firstName,
        lastName: f.lastName || user.lastName,
        email: f.email || user.email,
      }));
    }
  }, [user]);

  const set = (k: keyof typeof EMPTY, v: string) => setForm(f => ({ ...f, [k]: v }));

  const discountAmount = promoState ? Math.round(total * promoState.discountPercent / 100 * 100) / 100 : 0;
  const finalTotal = Math.max(0, total - discountAmount);

  async function applyPromo(e?: React.SyntheticEvent) {
    e?.preventDefault();
    if (!promoInput.trim()) return;
    setPromoError(""); setPromoState(null); setCartPromo(null); setPromoChecking(true);
    try {
      const result = await api.promoCodes.validate(promoInput.trim(), user?.id);
      setPromoState(result);
      setCartPromo(result);
    } catch (err) {
      setPromoError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setPromoChecking(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) { setError(t.checkout.errorEmpty); return; }
    setError(""); setSubmitting(true);
    try {
      const order = await api.orders.create({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        address: form.address,
        city: form.city,
        governorate: form.governorate,
        notes: form.notes || undefined,
        items: items.map(i => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          qty: i.qty,
          img: i.img,
        })),
        userId: user?.id,
        email: form.email || undefined,
        promoCode: promoState?.code,
      });
      clearCart();
      router.push(`/checkout/confirmation?id=${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-6 lg:gap-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <a href="/cart" className="hover:text-white transition-colors">{t.cart.title}</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{t.checkout.title}</span>
        </nav>

        <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-[-0.96px]">{t.checkout.title}</h1>

        {items.length === 0 ? (
          <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-10 lg:p-16 flex flex-col items-center gap-6 text-center">
            <p className="text-[#a0a0a0] text-lg">{t.checkout.emptyCart}</p>
            <a href="/cart" className="h-12 px-8 rounded-2xl flex items-center text-[#0a0a0a] text-base font-medium" style={{ background: GRADIENT }}>
              {t.checkout.goToCart}
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
              {/* Left — delivery form + payment */}
              <div className="flex-1 flex flex-col gap-6 lg:gap-8 w-full">

                {/* Delivery section */}
                <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 sm:p-8 flex flex-col gap-5 lg:gap-6">
                  <h2 className="text-white text-xl font-medium">{t.checkout.delivery}</h2>

                  <Field label="Email (for order confirmation)" value={form.email} onChange={v => set("email", v)} type="email" fullWidth />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={t.checkout.firstName} value={form.firstName} onChange={v => set("firstName", v)} required />
                    <Field label={t.checkout.lastName} value={form.lastName} onChange={v => set("lastName", v)} required />
                    <Field label={t.checkout.phone} value={form.phone} onChange={v => set("phone", v)} type="tel" required />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#a0a0a0] text-xs uppercase tracking-wider">{t.checkout.governorate}</label>
                      <select
                        value={form.governorate}
                        onChange={e => set("governorate", e.target.value)}
                        required
                        className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00f5ff]/50 transition-colors"
                      >
                        <option value="">—</option>
                        {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>

                  <Field label={t.checkout.address} value={form.address} onChange={v => set("address", v)} required fullWidth />
                  <Field label={t.checkout.city} value={form.city} onChange={v => set("city", v)} required fullWidth />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#a0a0a0] text-xs uppercase tracking-wider">{t.checkout.notes}</label>
                    <textarea
                      value={form.notes}
                      onChange={e => set("notes", e.target.value)}
                      placeholder={t.checkout.notesPlaceholder}
                      rows={3}
                      className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#555] outline-none focus:border-[#00f5ff]/50 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Payment section */}
                <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 sm:p-8 flex flex-col gap-4">
                  <h2 className="text-white text-xl font-medium">{t.checkout.payment}</h2>

                  <div className="flex items-start gap-4 bg-[#00f5ff]/[0.05] border border-[#00f5ff]/20 rounded-xl p-4">
                    <span className="mt-0.5 size-5 rounded-full border-2 border-[#00f5ff] flex items-center justify-center shrink-0">
                      <span className="size-2.5 rounded-full bg-[#00f5ff]" />
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">{t.checkout.cod}</p>
                      <p className="text-[#a0a0a0] text-xs mt-1">{t.checkout.codDesc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-[#111] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 opacity-50 cursor-not-allowed select-none">
                    <span className="mt-0.5 size-5 rounded-full border-2 border-[rgba(255,255,255,0.2)] shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[#a0a0a0] text-sm font-medium">{t.checkout.online}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.08)] text-[#a0a0a0] uppercase tracking-wider">
                          {t.checkout.comingSoon}
                        </span>
                      </div>
                      <p className="text-[#555] text-xs mt-1">{t.checkout.onlineDesc}</p>
                    </div>
                  </div>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}
              </div>

              {/* Right — order summary */}
              <div className="w-full lg:w-[380px] lg:shrink-0 flex flex-col gap-4 lg:sticky lg:top-[220px]">
                <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 lg:p-6 flex flex-col gap-5">
                  <h2 className="text-white text-xl font-medium">
                    {t.checkout.summary} ({itemCount} {t.checkout.items})
                  </h2>

                  <div className="flex flex-col gap-4">
                    {items.map(({ id, name, price, qty, img }) => (
                      <div key={id} className="flex items-center gap-3">
                        <div className="size-14 rounded-xl overflow-hidden bg-[#111] shrink-0">
                          <img src={img} alt={name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{name}</p>
                          <p className="text-[#a0a0a0] text-xs mt-0.5">× {qty}</p>
                        </div>
                        <span className="text-white text-sm font-bold shrink-0">{(price * qty).toLocaleString()} DT</span>
                      </div>
                    ))}
                  </div>

                  {/* Promo code */}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={e => { setPromoInput(e.target.value.toUpperCase()); setPromoError(""); setPromoState(null); setCartPromo(null); }}
                        onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); applyPromo(e as never); } }}
                        placeholder="Promo code"
                        className="flex-1 bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-[#555] outline-none focus:border-[#00f5ff]/50 transition-colors uppercase"
                      />
                      <button
                        type="button"
                        onClick={e => applyPromo(e as never)}
                        disabled={promoChecking || !promoInput.trim()}
                        className="px-4 rounded-xl border border-[rgba(255,255,255,0.1)] text-white text-sm hover:bg-white/5 transition-colors disabled:opacity-40 whitespace-nowrap"
                      >
                        {promoChecking ? "…" : "Apply"}
                      </button>
                    </div>
                    {promoError && <p className="text-red-400 text-xs">{promoError}</p>}
                    {promoState && (
                      <p className="text-green-400 text-xs">
                        ✓ {promoState.code} — {promoState.discountPercent}% off applied
                      </p>
                    )}
                  </div>

                  <div className="border-t border-[rgba(255,255,255,0.08)] pt-4 flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#a0a0a0]">{t.checkout.subtotal}</span>
                      <span className="text-white">{total.toLocaleString()} DT</span>
                    </div>
                    {promoState && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">Discount ({promoState.discountPercent}%)</span>
                        <span className="text-green-400">−{discountAmount.toLocaleString()} DT</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#a0a0a0]">{t.checkout.shipping}</span>
                      <span className="text-green-400">{t.checkout.free}</span>
                    </div>
                    <div className="border-t border-[rgba(255,255,255,0.08)] pt-3 flex justify-between">
                      <span className="text-white font-medium">{t.checkout.total}</span>
                      <span className="text-white text-xl font-bold">{finalTotal.toLocaleString()} DT</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="h-14 rounded-2xl flex items-center justify-center text-[#0a0a0a] text-base font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
                  >
                    {submitting ? t.checkout.placing : t.checkout.place}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </PageWrapper>
  );
}

function Field({
  label, value, onChange, required, type = "text", fullWidth,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? "col-span-full" : ""}`}>
      <label className="text-[#a0a0a0] text-xs uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#555] outline-none focus:border-[#00f5ff]/50 transition-colors"
      />
    </div>
  );
}
