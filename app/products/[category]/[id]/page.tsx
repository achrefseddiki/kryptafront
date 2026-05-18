import { notFound } from "next/navigation";
import PageWrapper from "../../../components/PageWrapper";
import { GRADIENT } from "../../../lib/assets";
import { api } from "../../../lib/api";
import { getLocale, getDict } from "../../../lib/i18n";
import AddToCartButton from "../../../components/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;

  const [locale, product] = await Promise.all([
    getLocale(),
    api.products.getBySlug(id).catch(() => null),
  ]);
  if (!product) notFound();
  const t = getDict(locale);

  const reviews = await api.products.reviews(product.id).catch(() => []);

  return (
    <PageWrapper>
      <div className="px-24 flex flex-col gap-10">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <a href="/products" className="hover:text-white transition-colors">{t.product_detail.pcComponents}</a>
          <span className="text-white/20">/</span>
          <a href={`/products/${category}`} className="capitalize hover:text-white transition-colors">{category}</a>
          <span className="text-white/20">/</span>
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="flex gap-12">
          <div className="flex gap-4 shrink-0">
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="size-[72px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-xl overflow-hidden cursor-pointer hover:border-[#00f5ff]/50 transition-colors">
                  <img src={product.img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="w-[480px] h-[480px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-[#a0a0a0] text-sm uppercase tracking-widest font-medium">{product.brand}</p>
              <h1 className="text-[32px] font-bold text-white leading-tight">{product.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className="text-[#00f5ff] text-lg">★</span>
                ))}
                <span className="text-[#a0a0a0] text-sm ml-1">({reviews.length} {t.product_detail.reviews})</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[40px] font-bold text-white">{product.price.toLocaleString()} DT</span>
              {product.oldPrice && (
                <span className="text-[#a0a0a0] text-xl line-through">{product.oldPrice.toLocaleString()} DT</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {product.specs.map((s) => (
                <span key={s} className="border border-[rgba(255,255,255,0.15)] rounded-xl px-4 py-2 text-sm text-[#a0a0a0]">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className={`text-sm font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                {product.inStock ? t.product_detail.inStock : t.product_detail.outOfStock}
              </span>
              {product.inStock && <span className="text-[#a0a0a0] text-sm">— {t.product_detail.readyToShip}</span>}
            </div>

            <div className="flex items-center gap-4">
              <AddToCartButton product={{ id: product.id, slug: id, name: product.name, price: product.price, img: product.img }} />
              <a
                href="/builder"
                className="h-[52px] px-6 rounded-2xl flex items-center border-[1.6px] border-[#00f5ff] text-[#00f5ff] text-base font-medium hover:bg-[#00f5ff]/10 transition-colors"
              >
                {t.product_detail.addToBuild}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              {[
                { label: t.product_detail.warranty, icon: "🛡️" },
                { label: t.product_detail.freeDelivery, icon: "🚚" },
                { label: t.product_detail.expertSupport, icon: "💬" },
              ].map(({ label, icon }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-[#a0a0a0] text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 pb-16">
          <div className="flex gap-8 border-b border-[rgba(255,255,255,0.08)]">
            {[t.product_detail.description, t.product_detail.specifications, t.product_detail.reviewsTab].map((tab, i) => (
              <button
                key={tab}
                className={`pb-4 text-base font-medium transition-colors relative ${
                  i === 0 ? "text-white" : "text-[#a0a0a0] hover:text-white"
                }`}
              >
                {tab}
                {i === 0 && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: GRADIENT }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 max-w-[800px]">
            <p className="text-[#a0a0a0] text-base leading-[26px]">
              {`The ${product.name} represents the pinnacle of GPU engineering. Built on the latest architecture, it delivers unparalleled performance for 4K gaming, ray tracing, and AI-accelerated workloads.`}
            </p>
            <p className="text-[#a0a0a0] text-base leading-[26px]">
              {`Compatible with the latest PCIe slots and featuring advanced thermal management, the ${product.name} maintains optimal temperatures even under sustained load.`}
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <h3 className="text-white text-2xl font-medium">{t.product_detail.customerReviews}</h3>
            {reviews.length === 0 ? (
              <p className="text-[#a0a0a0]">{t.product_detail.noReviews}</p>
            ) : (
              reviews.map(({ id: rid, author, rating, body, createdAt }) => (
                <div key={rid} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-white text-base font-medium">{author}</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rating }).map((_, i) => (
                          <span key={i} className="text-[#00f5ff] text-sm">★</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[#a0a0a0] text-sm">
                      {new Date(createdAt).toLocaleDateString(t.dateLocale, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-[#a0a0a0] text-sm leading-6">{body}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
