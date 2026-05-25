"use client";
import { useWishlist } from "../lib/wishlist-context";
import { useAuth } from "../lib/auth-context";
import { useRouter } from "next/navigation";

export default function WishlistButton({ productId, className = "" }: { productId: string; className?: string }) {
  const { isAuthenticated } = useAuth();
  const { isWishlisted, toggle } = useWishlist();
  const router = useRouter();
  const saved = isWishlisted(productId);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { router.push("/login"); return; }
    toggle(productId);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex items-center justify-center size-9 rounded-xl border transition-all ${
        saved
          ? "bg-[#00f5ff]/10 border-[#00f5ff]/40 text-[#00f5ff]"
          : "bg-black/40 border-white/10 text-[#a0a0a0] hover:border-white/30 hover:text-white"
      } ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}
