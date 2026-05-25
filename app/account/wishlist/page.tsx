"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../lib/api";
import { useWishlist } from "../../lib/wishlist-context";
import { useT } from "../../lib/language-context";
import { GRADIENT } from "../../lib/assets";
import type { Product } from "../../lib/types";
import WishlistButton from "../../components/WishlistButton";

export default function AccountWishlistPage() {
  const t = useT();
  const { wishlistIds } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.wishlist.list()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  // Keep list in sync when items are removed via WishlistButton
  useEffect(() => {
    setProducts((prev) => prev.filter((p) => wishlistIds.includes(p.id)));
  }, [wishlistIds]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-16 flex flex-col items-center gap-5 text-center">
        <div className="size-16 rounded-2xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <div>
          <p className="text-white font-medium">{t.account.emptyWishlist}</p>
          <p className="text-[#a0a0a0] text-sm mt-1">{t.account.emptyWishlistSub}</p>
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
      <h2 className="text-white text-xl font-semibold">{t.account.wishlist} <span className="text-[#a0a0a0] text-base font-normal ml-1">({products.length})</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.15)] transition-colors group">
            <div className="relative h-[180px] overflow-hidden bg-[#111]">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-2 right-2">
                <WishlistButton productId={product.id} />
              </div>
              {product.badge && (
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-[#00f5ff] text-xs font-medium">{product.badge}</span>
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div>
                <p className="text-[#a0a0a0] text-xs">{product.brand}</p>
                <h3 className="text-white text-sm font-medium leading-snug mt-0.5 line-clamp-2">{product.name}</h3>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-white font-bold">{product.price.toLocaleString()} DT</span>
                <Link
                  href={`/products/${product.slug}`}
                  className="h-8 px-3 rounded-xl text-xs font-medium text-[#0a0a0a]"
                  style={{ background: GRADIENT }}
                >
                  {t.account.viewProduct}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
