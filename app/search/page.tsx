import { Suspense } from "react";
import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { api } from "../lib/api";
import { getLocale, getDict } from "../lib/i18n";
import AddToCartButton from "../components/AddToCartButton";
import CompareButton from "../components/CompareButton";
import ProductPagination from "../components/ProductPagination";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const page = typeof sp.page === "string" ? Math.max(1, parseInt(sp.page, 10) || 1) : 1;
  const locale = await getLocale();
  const t = getDict(locale);

  const result = q
    ? await api.products.search({ search: q, page, limit: 12 }).catch(() => ({ data: [], total: 0, page: 1, limit: 12, totalPages: 0 }))
    : { data: [], total: 0, page: 1, limit: 12, totalPages: 0 };

  const { data: products, total, totalPages } = result;

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 flex flex-col gap-4">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <span className="text-white">
            {locale === "fr" ? `Résultats pour « ${q} »` : `Results for "${q}"`}
          </span>
        </nav>

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            {locale === "fr" ? `Résultats pour « ${q} »` : `Results for "${q}"`}
          </h1>
          <p className="text-base text-[#a0a0a0]">
            {total} {t.products.productsFound}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-24 pb-16 mt-6">
        {products.length === 0 ? (
          <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-16 text-center flex flex-col items-center gap-4">
            <p className="text-white text-xl font-semibold">
              {locale === "fr" ? "Aucun résultat" : "No results found"}
            </p>
            <p className="text-[#a0a0a0] text-base">
              {locale === "fr"
                ? `Aucun produit ne correspond à « ${q} ».`
                : `No products matched "${q}".`}
            </p>
            <a
              href="/products"
              className="mt-2 h-10 px-6 rounded-xl text-[#0a0a0a] text-sm font-semibold flex items-center"
              style={{ background: GRADIENT }}
            >
              {t.products.allProducts}
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {products.map(({ id, slug, name, brand, price, oldPrice, img, badge, specs, inStock, categorySlug }) => (
                <div
                  key={id}
                  className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors group flex flex-col"
                >
                  <a href={`/products/${encodeURIComponent(categorySlug)}/${encodeURIComponent(slug)}`} className="flex flex-col flex-1">
                    <div className="relative w-full h-[200px] overflow-hidden bg-[#111] shrink-0">
                      <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {badge && (
                        <span
                          className="absolute top-3 left-3 text-[10px] font-bold text-[#0a0a0a] px-2 py-0.5 rounded"
                          style={{ background: GRADIENT }}
                        >
                          {badge}
                        </span>
                      )}
                      <div className="absolute top-3 right-3">
                        <CompareButton product={{ id, slug, name, brand, price, oldPrice: oldPrice ?? null, img, badge: badge ?? null, specs, inStock: inStock ?? true, categorySlug }} />
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div>
                        <p className="text-[#a0a0a0] text-xs font-normal uppercase tracking-wider">{brand}</p>
                        <h3 className="text-white text-base font-medium leading-tight mt-1">{name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-1 flex-1 content-start">
                        {specs.map((s) => (
                          <span key={s} className="text-[10px] text-[#a0a0a0] border border-[rgba(255,255,255,0.1)] rounded px-1.5 py-0.5 h-fit">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-white text-xl font-bold">{price} DT</span>
                        {oldPrice && <span className="text-[#a0a0a0] text-sm line-through">{oldPrice} DT</span>}
                      </div>
                    </div>
                  </a>
                  <div className="px-5 pb-5">
                    <AddToCartButton product={{ id, slug, name, price, img }} />
                  </div>
                </div>
              ))}
            </div>

            <Suspense>
              <ProductPagination currentPage={page} totalPages={totalPages} />
            </Suspense>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
