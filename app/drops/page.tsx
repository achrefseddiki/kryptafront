import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { api } from "../lib/api";
import { getLocale, getDict } from "../lib/i18n";
import type { Drop } from "../lib/types";
import type { Locale } from "../lib/i18n-dict";
import DropCountdown from "./DropCountdown";
import ClaimDropButton from "./ClaimDropButton";

export default async function DropsPage() {
  const [drops, locale]: [Drop[], Locale] = await Promise.all([api.drops.list(), getLocale()]);
  const t = getDict(locale);

  const liveDrops = drops.filter((d) => d.status === "live");
  const upcomingDrops = drops.filter((d) => d.status === "upcoming");
  const soldOutDrops = drops.filter((d) => d.status === "sold_out");

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-10 lg:gap-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{t.drops.breadcrumb}</span>
        </nav>

        {/* Live Drops */}
        {liveDrops.length > 0 ? (
          <div className="flex flex-col gap-6">
            {liveDrops.map((liveDrop) => (
              <div key={liveDrop.id} className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#111] flex flex-col lg:flex-row min-h-[400px] lg:min-h-[460px]">
                {/* Left: Info */}
                <div className="flex-1 p-6 lg:p-10 flex flex-col gap-5 justify-center">
                  <div className="flex items-center gap-2 w-fit bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.3)] rounded-full px-3.5 py-1.5">
                    <span className="size-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-semibold uppercase tracking-widest">{t.drops.live}</span>
                  </div>

                  <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-tight tracking-[-0.5px]">
                    {liveDrop.title}
                  </h1>

                  <p className="text-[#a0a0a0] text-sm lg:text-base leading-6 max-w-[460px]">
                    {liveDrop.description}
                  </p>

                  <div className="text-3xl lg:text-4xl font-bold text-white">
                    {liveDrop.price.toLocaleString()} <span className="text-lg font-medium text-[#a0a0a0]">DT</span>
                  </div>

                  {liveDrop.endsAt && <DropCountdown endsAt={liveDrop.endsAt} />}

                  <div className="flex flex-col gap-2 max-w-[320px]">
                    <div className="flex justify-between text-xs text-[#a0a0a0]">
                      <span>{liveDrop.total - liveDrop.available} / {liveDrop.total} {t.drops.claimed}</span>
                      <span>{Math.round(((liveDrop.total - liveDrop.available) / liveDrop.total) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.round(((liveDrop.total - liveDrop.available) / liveDrop.total) * 100)}%`,
                          background: GRADIENT,
                        }}
                      />
                    </div>
                  </div>

                  <ClaimDropButton drop={liveDrop} label={t.drops.claimNow} />
                </div>

                {/* Right: Image */}
                <div className="lg:w-[45%] h-[260px] lg:h-auto relative flex-shrink-0">
                  <img src={liveDrop.img} alt={liveDrop.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-transparent to-transparent lg:block hidden" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-[-0.96px]">{t.drops.title}</h1>
            <p className="text-base lg:text-2xl font-normal text-[#a0a0a0] max-w-[700px]">{t.drops.subtitle}</p>
          </div>
        )}

        {/* Upcoming Drops */}
        {upcomingDrops.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">{t.drops.upcomingDrops}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {upcomingDrops.map(({ id, title, img }) => (
                <div key={id} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors">
                  <div className="relative h-[200px] lg:h-[240px] overflow-hidden">
                    <img src={img} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-1.5">
                      <span className="size-2 rounded-full bg-[#00f5ff]" />
                      <span className="text-[#00f5ff] text-xs font-medium">{t.drops.upcoming}</span>
                    </div>
                  </div>
                  <div className="p-4 lg:p-5">
                    <h3 className="text-white text-base font-medium">{title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sold Out Drops */}
        {soldOutDrops.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-[#a0a0a0]">{t.drops.soldOut}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {soldOutDrops.map(({ id, title, description, price, available, total, img }) => (
                <div key={id} className="bg-[#111] border border-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden opacity-60">
                  <div className="relative h-[180px] lg:h-[220px] overflow-hidden">
                    <img src={img} alt={title} className="w-full h-full object-cover grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-1.5">
                      <span className="size-2 rounded-full bg-red-400" />
                      <span className="text-red-400 text-xs font-medium">{t.drops.soldOut}</span>
                    </div>
                  </div>
                  <div className="p-4 lg:p-5 flex flex-col gap-3">
                    <h3 className="text-white text-base font-medium">{title}</h3>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs text-[#a0a0a0]">
                        <span>{total - available} / {total} {t.drops.claimed}</span>
                        <span>100%</span>
                      </div>
                      <div className="h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
                        <div className="h-full w-full rounded-full bg-red-400/50" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-lg font-bold">{price} DT</span>
                      <span className="text-[#a0a0a0] text-sm bg-[rgba(255,255,255,0.05)] px-3 py-1.5 rounded-xl">{t.drops.soldOut}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <div
          className="rounded-2xl p-6 lg:p-10 border border-[rgba(1,245,255,0.2)] flex flex-col items-center gap-5 lg:gap-6 text-center"
          style={{ background: "linear-gradient(90deg, rgba(1,245,255,0.08), rgba(30,58,255,0.08))" }}
        >
          <h2 className="text-2xl lg:text-[32px] text-white font-bold">{t.drops.newsletter.title}</h2>
          <p className="text-[#a0a0a0] text-sm lg:text-base max-w-[500px]">{t.drops.newsletter.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[480px]">
            <input
              type="email"
              placeholder={t.drops.newsletter.placeholder}
              className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-3.5 text-white text-sm placeholder:text-[#a0a0a0] outline-none focus:border-[#00f5ff] transition-colors"
            />
            <button
              className="h-[52px] px-6 rounded-2xl text-[#0a0a0a] text-base font-medium whitespace-nowrap"
              style={{ background: GRADIENT }}
            >
              {t.drops.newsletter.cta}
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
