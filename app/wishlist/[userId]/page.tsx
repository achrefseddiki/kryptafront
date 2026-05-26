import Link from "next/link";
import { notFound } from "next/navigation";
import PageWrapper from "../../components/PageWrapper";
import { GRADIENT } from "../../lib/assets";
import { api } from "../../lib/api";
import { getLocale, getDict } from "../../lib/i18n";

export default async function PublicWishlistPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const [locale, data] = await Promise.all([
    getLocale(),
    api.wishlist.getPublic(userId).catch(() => null),
  ]);
  if (data === null) notFound();
  const t = getDict(locale);
  const { firstName, products } = data;

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <Link href="/" className="hover:text-white transition-colors">{t.products.home}</Link>
          <span className="text-white/20">/</span>
          <span className="text-white">{firstName}'s Wishlist</span>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {firstName}<span className="text-[#a0a0a0] font-normal">'s Wishlist</span>
            </h1>
            <p className="text-[#a0a0a0] text-sm mt-1">{products.length} {t.account.items}</p>
          </div>
          <Link
            href="/products"
            className="h-11 px-6 rounded-2xl flex items-center text-[#0a0a0a] text-sm font-medium"
            style={{ background: GRADIENT }}
          >
            {t.account.shopNow}
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-16 flex flex-col items-center gap-4 text-center">
            <div className="size-16 rounded-2xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <p className="text-white font-medium">{t.account.emptyWishlist}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.categorySlug}/${product.slug}`}
                className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.15)] transition-colors group"
              >
                <div className="relative h-[180px] overflow-hidden bg-[#111]">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-[#00f5ff] text-xs font-medium">{product.badge}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <p className="text-[#a0a0a0] text-xs">{product.brand}</p>
                  <h3 className="text-white text-sm font-medium leading-snug line-clamp-2">{product.name}</h3>
                  <p className="text-white font-bold mt-1">{product.price.toLocaleString()} DT</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
