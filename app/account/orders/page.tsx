"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "../../lib/language-context";
import { api, type Order } from "../../lib/api";
import { GRADIENT } from "../../lib/assets";

const STATUS_STYLE: Record<string, string> = {
  pending:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped:   "bg-[#00f5ff]/10 text-[#00f5ff] border-[#00f5ff]/20",
  delivered: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AccountOrdersPage() {
  const t = useT();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.orders.myOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-16 flex flex-col items-center gap-5 text-center">
        <div className="size-16 rounded-2xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
        </div>
        <div>
          <p className="text-white font-medium">{t.account.noOrders}</p>
          <p className="text-[#a0a0a0] text-sm mt-1">{t.account.noOrdersSub}</p>
        </div>
        <Link
          href="/products"
          className="h-11 px-6 rounded-2xl flex items-center text-[#0a0a0a] text-sm font-medium"
          style={{ background: GRADIENT }}
        >
          {t.account.shopNow}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map(order => {
        const shortId = order.id.slice(0, 8).toUpperCase();
        const date = new Date(order.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
        const statusStyle = STATUS_STYLE[order.status] ?? "bg-white/5 text-white border-white/10";
        const firstItem = order.items[0];

        return (
          <div key={order.id} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 flex items-center gap-6">
            {/* Item preview */}
            {firstItem && (
              <div className="size-16 rounded-xl overflow-hidden bg-[#111] shrink-0">
                <img src={firstItem.img} alt={firstItem.name} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-white font-medium">#{shortId}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${statusStyle}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-[#a0a0a0] text-sm mt-1">
                {date} · {order.items.length} {t.account.items}
                {order.items.length > 1 && (
                  <span className="text-[#555]"> ({order.items.slice(0, 2).map(i => i.name).join(", ")}{order.items.length > 2 ? "…" : ""})</span>
                )}
              </p>
            </div>

            {/* Total + action */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-end gap-1">
                <span className="text-white font-bold text-lg">{order.total.toLocaleString()} DT</span>
                {order.promoCode && order.discountAmount > 0 && (
                  <span className="text-xs text-[#00f5ff] flex items-center gap-1">
                    <span className="font-mono font-bold">{order.promoCode}</span>
                    <span className="text-[#666]">−{order.discountAmount.toLocaleString()} DT</span>
                  </span>
                )}
              </div>
              <Link
                href={`/orders/${order.id}/track`}
                className="h-9 px-4 rounded-xl text-[#0a0a0a] text-sm font-medium flex items-center whitespace-nowrap"
                style={{ background: GRADIENT }}
              >
                {t.account.trackOrder}
              </Link>
              <Link
                href={`/checkout/confirmation?id=${order.id}`}
                className="h-9 px-4 rounded-xl border border-[rgba(255,255,255,0.1)] text-white text-sm hover:bg-white/5 transition-colors flex items-center"
              >
                {t.account.viewOrder}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
