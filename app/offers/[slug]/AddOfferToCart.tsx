"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../../lib/cart-context";
import { GRADIENT } from "../../lib/assets";
import type { Offer } from "../../lib/types";

interface Props {
  offer: Offer;
  disabled?: boolean;
}

export default function AddOfferToCart({ offer, disabled }: Props) {
  const { addToCart } = useCart();
  const router = useRouter();

  const cover = offer.img ?? offer.products[0]?.img ?? "";

  function handleAddToCart() {
    addToCart({
      id: offer.id,
      slug: offer.slug,
      name: offer.title,
      price: offer.price,
      img: cover,
    });
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/checkout");
  }

  if (disabled) {
    return (
      <div className="flex gap-3">
        <button
          disabled
          className="flex-1 h-12 rounded-2xl text-[#a0a0a0] bg-white/5 text-base font-medium cursor-not-allowed"
        >
          Offre expirée
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleAddToCart}
        className="flex-1 h-12 rounded-2xl border border-white/20 text-white text-base font-medium hover:bg-white/5 transition-colors"
      >
        Ajouter au panier
      </button>
      <button
        onClick={handleBuyNow}
        className="flex-1 h-12 rounded-2xl text-[#0a0a0a] text-base font-medium transition-opacity hover:opacity-90"
        style={{ background: GRADIENT, filter: "drop-shadow(0px 4px 6px rgba(1,245,255,0.2))" }}
      >
        Acheter maintenant
      </button>
    </div>
  );
}
