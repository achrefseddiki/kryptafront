import { notFound } from "next/navigation";
import PageWrapper from "../../components/PageWrapper";
import { GRADIENT } from "../../lib/assets";
import { api } from "../../lib/api";
import AddOfferToCart from "./AddOfferToCart";
import OfferReviews from "./OfferReviews";
import ProductImageGallery from "../../components/ProductImageGallery";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
}

function timeLeft(endDate: string): string {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (d > 0) return `${d}j ${h}h restants`;
  if (h > 0) return `${h}h ${m}m restants`;
  return `${m}m restants`;
}

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = await api.offers.getBySlug(slug).catch(() => null);
  if (!offer) notFound();

  const reviews = await api.offers.reviews(offer.id).catch(() => []);

  const now = Date.now();
  const isActive =
    (!offer.startDate || new Date(offer.startDate).getTime() <= now) &&
    (!offer.endDate || new Date(offer.endDate).getTime() >= now);

  // Build gallery: offer's own images first, fall back to first product image
  const mainImg = offer.img ?? offer.products[0]?.img ?? "";
  const extraImages = offer.images ?? [];

  const avgRating = reviews.length
    ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
    : 0;

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
          <a href="/" className="hover:text-white transition-colors">Accueil</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{offer.title}</span>
        </nav>

        {/* Hero: gallery + info */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Gallery */}
          {mainImg ? (
            <ProductImageGallery mainImg={mainImg} images={extraImages} name={offer.title} />
          ) : (
            <div className="w-full lg:w-[480px] h-[360px] lg:h-[480px] bg-[#1a1a1a] border border-white/10 rounded-2xl flex items-center justify-center text-[#333] text-sm shrink-0">
              No image
            </div>
          )}

          {/* Info */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {isActive ? (
                <span
                  className="self-start text-xs font-bold px-3 py-1 rounded-full text-[#0a0a0a]"
                  style={{ background: GRADIENT }}
                >
                  OFFRE SPÉCIALE
                </span>
              ) : (
                <span className="self-start text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-[#a0a0a0]">
                  OFFRE EXPIRÉE
                </span>
              )}
              <h1 className="text-2xl lg:text-[32px] font-bold text-white leading-tight">{offer.title}</h1>

              {/* Star rating summary */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={`text-lg ${s <= avgRating ? "text-[#00f5ff]" : "text-white/20"}`}>★</span>
                  ))}
                  <span className="text-[#a0a0a0] text-sm">({reviews.length} avis)</span>
                </div>
              )}

              {offer.description && (
                <p className="text-[#a0a0a0] text-base leading-relaxed">{offer.description}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-3xl lg:text-[40px] font-bold text-white">{offer.price} DT</span>
              {offer.products.length > 0 && (
                <span className="text-[#a0a0a0] text-sm mb-1.5">
                  · {offer.products.length} produit{offer.products.length > 1 ? "s" : ""} inclus
                </span>
              )}
            </div>

            {/* Dates */}
            {(offer.startDate || offer.endDate) && (
              <div className="flex flex-col gap-1.5 text-sm text-[#a0a0a0]">
                {offer.startDate && (
                  <span>Du <span className="text-white">{formatDate(offer.startDate)}</span></span>
                )}
                {offer.endDate && (
                  <span>
                    Jusqu'au <span className="text-white">{formatDate(offer.endDate)}</span>
                    {isActive && (
                      <span
                        className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full text-[#0a0a0a]"
                        style={{ background: GRADIENT }}
                      >
                        {timeLeft(offer.endDate)}
                      </span>
                    )}
                  </span>
                )}
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
              {[
                { icon: "🛡️", label: "Garantie incluse" },
                { icon: "🚚", label: "Livraison gratuite" },
                { icon: "💬", label: "Support expert" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-[#a0a0a0] text-xs">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <AddOfferToCart offer={offer} disabled={!isActive} />
          </div>
        </div>

        {/* Included products */}
        {offer.products.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-white text-xl font-bold">
              Produits inclus <span className="text-[#a0a0a0] font-normal text-base">({offer.products.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {offer.products.map((product) => (
                <a
                  key={product.id}
                  href={`/products/${product.categorySlug}/${product.slug}`}
                  className="bg-[#1a1a1a] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/20 transition-colors group"
                >
                  <div className="aspect-square bg-[#111] overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-1">
                    <p className="text-[#a0a0a0] text-xs">{product.brand}</p>
                    <p className="text-white text-sm font-medium leading-snug line-clamp-2">{product.name}</p>
                    <p className="text-[#a0a0a0] text-sm mt-1">{product.price} DT</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <OfferReviews offerId={offer.id} initialReviews={reviews} />
      </div>
    </PageWrapper>
  );
}
