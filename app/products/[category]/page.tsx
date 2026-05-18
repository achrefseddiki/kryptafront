import PageWrapper from "../../components/PageWrapper";
import { GRADIENT } from "../../lib/assets";
import { api } from "../../lib/api";
import { getLocale, getDict } from "../../lib/i18n";
import AddToCartButton from "../../components/AddToCartButton";

const BRANDS = ["NVIDIA", "AMD", "Intel", "ASUS", "Gigabyte", "MSI", "Sapphire", "EVGA"];

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  const [cat, children, products, locale] = await Promise.all([
    api.categories.get(category).catch(() => null),
    api.categories.children(category),
    api.products.list(category),
    getLocale(),
  ]);
  const t = getDict(locale);

  const parentCat = cat?.parentSlug
    ? await api.categories.get(cat.parentSlug).catch(() => null)
    : null;

  const label = cat?.label ?? category.replace(/-/g, " ");

  // Root category with sub-categories → show subcategory grid
  if (children.length > 0) {
    return (
      <PageWrapper>
        <div className="px-24 flex flex-col gap-8">
          <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
            <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
            <span className="text-white/20">/</span>
            <a href="/products" className="hover:text-white transition-colors">{t.products.allProducts}</a>
            <span className="text-white/20">/</span>
            <span className="text-white">{label}</span>
          </nav>

          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-bold text-white tracking-[-0.96px]">{label}</h1>
            <p className="text-2xl font-normal text-[#a0a0a0]">{t.products.browseByCategory}</p>
          </div>
        </div>

        <div className="px-24 pb-16">
          <div className="grid grid-cols-4 gap-6">
            {children.map(({ slug, label: childLabel, img }) => (
              <a
                key={slug}
                href={`/products/${slug}`}
                className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl h-[162px] flex flex-col items-center justify-center gap-3 hover:border-[#00f5ff]/50 hover:bg-[#1a1a1a]/80 transition-colors text-center px-4"
              >
                {img && <img src={img} alt={childLabel} className="size-10 object-contain" />}
                <span className="text-base font-semibold text-white">{childLabel}</span>
              </a>
            ))}
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Leaf category → show products
  return (
    <PageWrapper>
      <div className="px-24 flex flex-col gap-6">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <a href="/products" className="hover:text-white transition-colors">{t.products.allProducts}</a>
          {parentCat && (
            <>
              <span className="text-white/20">/</span>
              <a href={`/products/${parentCat.slug}`} className="hover:text-white transition-colors">{parentCat.label}</a>
            </>
          )}
          <span className="text-white/20">/</span>
          <span className="text-white">{label}</span>
        </nav>

        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold text-white tracking-[-0.96px]">{label}</h1>
          <p className="text-2xl font-normal text-[#a0a0a0]">{products.length} {t.products.productsFound}</p>
        </div>
      </div>

      <div className="px-24 pb-16">
        <div className="flex gap-8">
          <aside className="w-[240px] shrink-0 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-sm font-medium uppercase tracking-wider">{t.products.priceRange}</h3>
              <div className="flex flex-col gap-2">
                {["Under $300", "$300 – $600", "$600 – $1000", "$1000 – $2000", "Over $2000"].map((r) => (
                  <label key={r} className="flex items-center gap-3 cursor-pointer group">
                    <span className="size-4 border border-[rgba(255,255,255,0.2)] rounded flex items-center justify-center group-hover:border-[#00f5ff] transition-colors" />
                    <span className="text-[#a0a0a0] text-sm group-hover:text-white transition-colors">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-white text-sm font-medium uppercase tracking-wider">{t.products.brand}</h3>
              <div className="flex flex-col gap-2">
                {BRANDS.map((b) => (
                  <label key={b} className="flex items-center gap-3 cursor-pointer group">
                    <span className="size-4 border border-[rgba(255,255,255,0.2)] rounded flex items-center justify-center group-hover:border-[#00f5ff] transition-colors" />
                    <span className="text-[#a0a0a0] text-sm group-hover:text-white transition-colors">{b}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              className="h-11 rounded-2xl text-[#0a0a0a] text-sm font-medium"
              style={{ background: GRADIENT }}
            >
              {t.products.applyFilters}
            </button>
          </aside>

          <div className="flex-1 flex flex-col gap-6">
            {products.length === 0 ? (
              <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-16 text-center">
                <p className="text-[#a0a0a0] text-lg">{t.products.noProducts}</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {products.map(({ id, slug, name, brand, price, oldPrice, img, badge, specs }) => (
                  <a
                    key={id}
                    href={`/products/${category}/${slug}`}
                    className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors group"
                  >
                    <div className="relative w-full h-[200px] overflow-hidden bg-[#111]">
                      <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {badge && (
                        <span
                          className="absolute top-3 left-3 text-[10px] font-bold text-[#0a0a0a] px-2 py-0.5 rounded"
                          style={{ background: GRADIENT }}
                        >
                          {badge}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col gap-3">
                      <div>
                        <p className="text-[#a0a0a0] text-xs font-normal uppercase tracking-wider">{brand}</p>
                        <h3 className="text-white text-base font-medium leading-tight mt-1">{name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {specs.map((s) => (
                          <span key={s} className="text-[10px] text-[#a0a0a0] border border-[rgba(255,255,255,0.1)] rounded px-1.5 py-0.5">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-white text-xl font-bold">${price.toLocaleString()}</span>
                        {oldPrice && <span className="text-[#a0a0a0] text-sm line-through">${oldPrice.toLocaleString()}</span>}
                      </div>
                      <AddToCartButton product={{ id, slug, name, price, img }} />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
