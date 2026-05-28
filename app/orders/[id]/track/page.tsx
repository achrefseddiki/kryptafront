import Link from "next/link";
import { notFound } from "next/navigation";
import PageWrapper from "../../../components/PageWrapper";
import { api } from "../../../lib/api";
import { getLocale, getDict } from "../../../lib/i18n";
import { GRADIENT } from "../../../lib/assets";

const STATUS_STEPS = ["pending", "confirmed", "shipped", "delivered"] as const;

function StepIcon({ step, done, active }: { step: string; done: boolean; active: boolean }) {
  const color = done || active ? "#0a0a0a" : "#444";
  const icons: Record<string, React.ReactNode> = {
    pending: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    confirmed: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    ),
    shipped: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      </svg>
    ),
    delivered: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/>
      </svg>
    ),
  };
  return icons[step] ?? null;
}

export default async function OrderTrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [order, locale] = await Promise.all([
    api.orders.get(id).catch(() => null),
    getLocale(),
  ]);
  const t = getDict(locale);

  if (!order) {
    return (
      <PageWrapper>
        <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col items-center gap-6 py-24 text-center">
          <div className="size-20 rounded-2xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
            </svg>
          </div>
          <div>
            <p className="text-white text-xl font-semibold">{t.account.orderNotFound}</p>
            <p className="text-[#a0a0a0] text-sm mt-1">{t.account.orderNotFoundSub}</p>
          </div>
          <Link
            href="/account/orders"
            className="h-11 px-6 rounded-2xl flex items-center text-[#0a0a0a] text-sm font-medium"
            style={{ background: GRADIENT }}
          >
            {t.account.backToOrders}
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const isCancelled = order.status === "cancelled";
  const currentIdx = isCancelled ? -1 : STATUS_STEPS.indexOf(order.status as typeof STATUS_STEPS[number]);
  const shortId = order.id.slice(0, 8).toUpperCase();
  const date = new Date(order.createdAt).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  const stepLabels: Record<string, string> = {
    pending: t.account.statusPending,
    confirmed: t.account.statusConfirmed,
    shipped: t.account.statusShipped,
    delivered: t.account.statusDelivered,
  };

  const stepDescs: Record<string, string> = {
    pending: locale === "fr" ? "Nous avons bien reçu votre commande." : "We have received your order.",
    confirmed: locale === "fr" ? "Votre commande est en préparation." : "Your order is being prepared.",
    shipped: locale === "fr" ? "Votre colis est en chemin." : "Your package is on its way.",
    delivered: locale === "fr" ? "Votre commande a été livrée." : "Your order has been delivered.",
  };

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">{locale === "fr" ? "Accueil" : "Home"}</Link>
          <span className="text-white/20">/</span>
          <Link href="/account/orders" className="hover:text-white transition-colors">{t.account.orders}</Link>
          <span className="text-white/20">/</span>
          <span className="text-white">#{shortId}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{t.account.orderTracking}</h1>
            <p className="text-[#a0a0a0] text-sm mt-1">
              {t.account.order} <span className="text-white font-medium">#{shortId}</span>
              <span className="mx-2 text-white/20">·</span>
              {t.account.placedOn} {date}
            </p>
          </div>
          {isCancelled && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20">
              {t.account.statusCancelled}
            </span>
          )}
        </div>

        {/* Status timeline */}
        {isCancelled ? (
          <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 flex items-center gap-4">
            <div className="size-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold">{t.account.statusCancelled}</p>
              <p className="text-[#a0a0a0] text-sm mt-0.5">
                {locale === "fr" ? "Cette commande a été annulée." : "This order has been cancelled."}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0">
              {STATUS_STEPS.map((step, idx) => {
                const done = idx < currentIdx;
                const active = idx === currentIdx;
                const isLast = idx === STATUS_STEPS.length - 1;

                return (
                  <div key={step} className="flex sm:flex-col flex-1 items-start sm:items-center gap-0 w-full">
                    {/* Step + connector row */}
                    <div className="flex sm:flex-col items-center w-full sm:w-auto">
                      {/* Circle */}
                      <div
                        className="size-11 rounded-full flex items-center justify-center shrink-0 transition-all"
                        style={
                          done || active
                            ? { background: GRADIENT }
                            : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }
                        }
                      >
                        <StepIcon step={step} done={done} active={active} />
                      </div>

                      {/* Connector line (horizontal on sm+, vertical on mobile) */}
                      {!isLast && (
                        <div
                          className="flex-1 sm:hidden h-8 w-0.5 ml-5 sm:ml-0"
                          style={{ background: done ? "linear-gradient(180deg,#00f5ff,#0ea5e9)" : "rgba(255,255,255,0.08)" }}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <div className="pl-4 pb-6 sm:pb-0 sm:pl-0 sm:pt-3 sm:text-center flex-1 sm:flex-none">
                      <p className={`text-sm font-semibold ${active ? "text-[#00f5ff]" : done ? "text-white" : "text-[#555]"}`}>
                        {stepLabels[step]}
                      </p>
                      <p className="text-xs text-[#555] mt-0.5 max-w-[100px] mx-auto hidden sm:block">
                        {stepDescs[step]}
                      </p>
                    </div>

                    {/* Connector line (desktop between steps) */}
                    {!isLast && (
                      <div
                        className="hidden sm:block h-0.5 flex-1 mx-2 mt-[-20px]"
                        style={{ background: done ? "linear-gradient(90deg,#00f5ff,#0ea5e9)" : "rgba(255,255,255,0.08)" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active step description (mobile) */}
            <div className="sm:hidden mt-2 px-2">
              <p className="text-[#a0a0a0] text-sm">{stepDescs[order.status] ?? ""}</p>
            </div>
          </div>
        )}

        {/* Delivery info + items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Delivery info */}
          <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)]">
              <p className="text-white font-semibold text-sm">{t.account.deliveryInfo}</p>
            </div>
            <div className="p-5 flex flex-col gap-3">
              {[
                { label: locale === "fr" ? "Nom" : "Name", value: `${order.firstName} ${order.lastName}` },
                { label: locale === "fr" ? "Téléphone" : "Phone", value: order.phone },
                { label: locale === "fr" ? "Adresse" : "Address", value: order.address },
                { label: locale === "fr" ? "Ville" : "City", value: `${order.city}, ${order.governorate}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4 text-sm">
                  <span className="text-[#666]">{label}</span>
                  <span className="text-white text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order items */}
          <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)]">
              <p className="text-white font-semibold text-sm">{t.account.orderedItems}</p>
            </div>
            <div className="p-5 flex flex-col gap-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="size-11 rounded-xl overflow-hidden bg-[#111] shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.name}</p>
                    <p className="text-[#666] text-xs">× {item.qty}</p>
                  </div>
                  <span className="text-white text-sm font-bold shrink-0">{(item.price * item.qty)} DT</span>
                </div>
              ))}
              <div className="border-t border-[rgba(255,255,255,0.06)] pt-3 flex justify-between items-center">
                <span className="text-[#a0a0a0] text-sm">{locale === "fr" ? "Total" : "Total"}</span>
                <span className="text-white font-bold text-lg">{order.total} DT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div>
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-2xl border border-[rgba(255,255,255,0.1)] text-white text-sm hover:bg-white/5 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            {t.account.backToOrders}
          </Link>
        </div>

      </div>
    </PageWrapper>
  );
}
