"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../lib/api";
import { useWishlist } from "../../lib/wishlist-context";
import { useAuth } from "../../lib/auth-context";
import { useT } from "../../lib/language-context";
import { GRADIENT } from "../../lib/assets";
import type { Product } from "../../lib/types";
import WishlistButton from "../../components/WishlistButton";

function SharePanel({ userId, firstName }: { userId: string; firstName: string }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/wishlist/${userId}`
    : `/wishlist/${userId}`;

  const waUrl = `https://wa.me/?text=${encodeURIComponent(`${firstName}'s wishlist on Krypta: ${shareUrl}`)}`;

  function copyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 h-9 px-4 rounded-2xl border border-[rgba(255,255,255,0.15)] text-[#a0a0a0] text-sm hover:text-white hover:border-white/30 transition-colors"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        {t.account.share}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-20 w-[300px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.12)] rounded-2xl p-4 flex flex-col gap-3 shadow-2xl">
            <p className="text-white text-sm font-medium">{t.account.shareWishlist}</p>

            {/* Copy link */}
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-3 py-2 text-xs text-[#a0a0a0] outline-none truncate"
              />
              <button
                onClick={copyLink}
                className="h-9 px-3 rounded-xl text-xs font-medium shrink-0 transition-colors"
                style={copied ? { background: "rgba(0,245,255,0.15)", color: "#00f5ff", border: "1px solid rgba(0,245,255,0.3)" } : { background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {copied ? t.account.copied : t.account.copy}
              </button>
            </div>

            {/* WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 h-10 px-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.522 5.827L.057 23.882l6.268-1.444A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.668-.524-5.178-1.433l-.371-.22-3.724.858.881-3.613-.244-.391A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default function AccountWishlistPage() {
  const t = useT();
  const { user } = useAuth();
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
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-semibold">
          {t.account.wishlist} <span className="text-[#a0a0a0] text-base font-normal ml-1">({products.length})</span>
        </h2>
        {user && <SharePanel userId={user.id} firstName={user.firstName} />}
      </div>
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
                <span className="text-white font-bold">{product.price} DT</span>
                <Link
                  href={`/products/${product.categorySlug}/${product.slug}`}
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
