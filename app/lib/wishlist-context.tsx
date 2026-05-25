"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";
import { useAuth } from "./auth-context";

interface WishlistContextValue {
  wishlistIds: string[];
  isWishlisted: (productId: string) => boolean;
  toggle: (productId: string) => Promise<void>;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { setWishlistIds([]); return; }
    setLoading(true);
    api.wishlist.list()
      .then((products) => setWishlistIds(products.map((p) => p.id)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  async function toggle(productId: string) {
    if (wishlistIds.includes(productId)) {
      setWishlistIds((ids) => ids.filter((id) => id !== productId));
      await api.wishlist.remove(productId).catch(() => {
        setWishlistIds((ids) => [...ids, productId]);
      });
    } else {
      setWishlistIds((ids) => [...ids, productId]);
      await api.wishlist.add(productId).catch(() => {
        setWishlistIds((ids) => ids.filter((id) => id !== productId));
      });
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlistIds, isWishlisted: (id) => wishlistIds.includes(id), toggle, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
