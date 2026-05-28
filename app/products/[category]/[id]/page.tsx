import { notFound } from "next/navigation";
import PageWrapper from "../../../components/PageWrapper";
import { api } from "../../../lib/api";
import { getLocale, getDict } from "../../../lib/i18n";
import AddToCartButton from "../../../components/AddToCartButton";
import ProductImageGallery from "../../../components/ProductImageGallery";
import WishlistButton from "../../../components/WishlistButton";
import ProductTabs from "../../../components/ProductTabs";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category: rawCategory, id } = await params;
  const category = decodeURIComponent(rawCategory);

  const [locale, product] = await Promise.all([
    getLocale(),
    api.products.getBySlug(id).catch(() => null),
  ]);
  if (!product) notFound();
  const t = getDict(locale);

  const reviews = await api.products.reviews(product.id).catch(() => []);

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 flex flex-col gap-8 lg:gap-10">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
          <a href="/" className="hover:text-white transition-colors">
            {t.products.home}
          </a>
          <span className="text-white/20">/</span>
          <a href="/products" className="hover:text-white transition-colors">
            {t.product_detail.pcComponents}
          </a>
          <span className="text-white/20">/</span>
          <a
            href={`/products/${category}`}
            className="capitalize hover:text-white transition-colors"
          >
            {category}
          </a>
          <span className="text-white/20">/</span>
          <span className="text-white truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <ProductImageGallery
            mainImg={product.img}
            images={product.images ?? []}
            name={product.name}
          />

          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-[#a0a0a0] text-sm uppercase tracking-widest font-medium">
                {product.brand}
              </p>
              <h1 className="text-2xl lg:text-[32px] font-bold text-white leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-[#00f5ff] text-lg">
                    ★
                  </span>
                ))}
                <span className="text-[#a0a0a0] text-sm ml-1">
                  ({reviews.length} {t.product_detail.reviews})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl lg:text-[40px] font-bold text-white">
                {product.price} DT
              </span>
              {product.oldPrice && (
                <span className="text-[#a0a0a0] text-xl line-through">
                  {product.oldPrice} DT
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {product.specs.map((s) => (
                <span
                  key={s}
                  className="border border-[rgba(255,255,255,0.15)] rounded-xl px-4 py-2 text-sm text-[#a0a0a0]"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`size-2 rounded-full ${product.inStock ? "bg-green-400" : "bg-red-400"}`}
              />
              <span
                className={`text-sm font-medium ${product.inStock ? "text-green-400" : "text-red-400"}`}
              >
                {product.inStock
                  ? t.product_detail.inStock
                  : t.product_detail.outOfStock}
              </span>
              {product.inStock && (
                <span className="text-[#a0a0a0] text-sm">
                  — {t.product_detail.readyToShip}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <AddToCartButton
                product={{
                  id: product.id,
                  slug: id,
                  name: product.name,
                  price: product.price,
                  img: product.img,
                }}
              />
              <WishlistButton productId={product.id} showLabel className="h-[52px] px-6 text-base font-medium" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              {[
                { label: t.product_detail.warranty, icon: "🛡️" },
                { label: t.product_detail.freeDelivery, icon: "🚚" },
                { label: t.product_detail.expertSupport, icon: "💬" },
              ].map(({ label, icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-[#a0a0a0] text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ProductTabs
          product={product}
          initialReviews={reviews}
          t={{
            description: t.product_detail.description,
            specifications: t.product_detail.specifications,
            reviewsTab: t.product_detail.reviewsTab,
            customerReviews: t.product_detail.customerReviews,
            noReviews: t.product_detail.noReviews,
            dateLocale: t.dateLocale,
          }}
        />
      </div>
    </PageWrapper>
  );
}
