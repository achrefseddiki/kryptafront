import { ASSETS, GRADIENT } from "../lib/assets";
import { api } from "../lib/api";
import { getLocale, getDict } from "../lib/i18n";

function isActive(startDate: string | null, endDate: string | null) {
  const now = Date.now();
  const afterStart = !startDate || new Date(startDate).getTime() <= now;
  const beforeEnd = !endDate || new Date(endDate).getTime() >= now;
  return afterStart && beforeEnd;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export default async function BlogOffersSection() {
  const [offers, locale] = await Promise.all([
    api.offers.listActive().catch(() => []),
    getLocale(),
  ]);
  const t = getDict(locale);

  if (offers.length === 0) return null;

  return (
    <section
      className="flex gap-5 overflow-x-auto scrollbar-hide px-4 sm:px-8 lg:px-24 pb-2"
      style={{ backgroundImage: `url('${ASSETS.decorativeBanner}')`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {offers.map((offer) => {
        const cover = offer.img ?? offer.products[0]?.img ?? ASSETS.offer1;
        const active = isActive(offer.startDate, offer.endDate);

        return (
          <a
            key={offer.id}
            href={offer.slug ? `/offers/${offer.slug}` : "#"}
            className="flex-none relative w-[303px] h-[538px] rounded-[14px] overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img src={cover} alt={offer.title} className="w-full h-full object-cover" />

            {/* Badge */}
            <div className="absolute top-3 left-3 z-20 flex gap-2">
              {active ? (
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full text-[#0a0a0a]"
                  style={{ background: GRADIENT }}
                >
                  OFFRE
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/20 text-white">
                  EXPIRÉ
                </span>
              )}
            </div>

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 flex flex-col gap-2">
              <p className="text-white font-semibold text-base leading-tight line-clamp-2">{offer.title}</p>
              {offer.description && (
                <p className="text-white/70 text-xs leading-4 line-clamp-2">{offer.description}</p>
              )}
              <div className="flex items-center justify-between mt-1">
                <span className="text-white font-bold text-xl">{offer.price} DT</span>
                {offer.endDate && (
                  <span className="text-white/60 text-[10px]">Jusqu'au {formatDate(offer.endDate)}</span>
                )}
              </div>
              {offer.products.length > 0 && (
                <p className="text-white/50 text-[10px]">{offer.products.length} produit{offer.products.length > 1 ? "s" : ""} inclus</p>
              )}
              <button
                className="mt-1 h-9 rounded-xl text-[#0a0a0a] text-xs font-semibold"
                style={{ background: GRADIENT }}
              >
                {t.home.offers.viewOffer}
              </button>
            </div>
          </a>
        );
      })}
    </section>
  );
}
