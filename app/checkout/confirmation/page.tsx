"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageWrapper from "../../components/PageWrapper";
import { GRADIENT } from "../../lib/assets";
import { useT } from "../../lib/language-context";
import { api } from "../../lib/api";
import type { Order } from "../../lib/api";

function ConfirmationContent() {
  const t = useT();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);

  const orderId = searchParams.get("id");

  useEffect(() => {
    if (!orderId) return;
    api.orders.get(orderId).then(setOrder).catch(() => {});
  }, [orderId]);

  const shortId = orderId ? orderId.slice(0, 8).toUpperCase() : "—";

  return (
    <PageWrapper>
      <div className="px-24 pb-16 flex flex-col items-center gap-10 text-center">
        {/* Success icon */}
        <div
          className="size-24 rounded-full flex items-center justify-center text-4xl text-[#0a0a0a] font-bold mt-4"
          style={{ background: GRADIENT, filter: "drop-shadow(0px 8px 24px rgba(1,245,255,0.35))" }}
        >
          ✓
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-bold text-white tracking-[-0.96px]">{t.checkout.confirm.title}</h1>
          <p className="text-[#a0a0a0] text-xl">{t.checkout.confirm.subtitle}</p>
        </div>

        {/* Order number */}
        <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl px-10 py-6 flex flex-col gap-2">
          <p className="text-[#a0a0a0] text-sm uppercase tracking-wider">{t.checkout.confirm.orderNumber}</p>
          <p className="text-white text-3xl font-bold tracking-widest">#{shortId}</p>
        </div>

        {/* Delivery message */}
        <p className="text-[#a0a0a0] text-base max-w-[560px] leading-relaxed">
          {t.checkout.confirm.deliveryMsg}
        </p>

        {/* Order items */}
        {order && order.items.length > 0 && (
          <div className="w-full max-w-[600px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-4 text-left">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="size-14 rounded-xl overflow-hidden bg-[#111] shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-[#a0a0a0] text-xs mt-0.5">× {item.qty}</p>
                </div>
                <span className="text-white text-sm font-bold shrink-0">{(item.price * item.qty)} DT</span>
              </div>
            ))}
            <div className="border-t border-[rgba(255,255,255,0.08)] pt-4 flex justify-between">
              <span className="text-white font-medium">{t.checkout.total}</span>
              <span className="text-white text-xl font-bold">{order.total} DT</span>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {orderId && (
            <a
              href={`/orders/${orderId}/track`}
              className="h-12 px-8 rounded-2xl flex items-center text-[#0a0a0a] text-base font-medium"
              style={{ background: GRADIENT }}
            >
              {t.checkout.confirm.trackOrder}
            </a>
          )}
          <a
            href="/products"
            className="h-12 px-8 rounded-2xl flex items-center text-white text-base font-medium border border-[rgba(255,255,255,0.1)] hover:bg-white/5 transition-colors"
          >
            {t.checkout.confirm.continueShopping}
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
