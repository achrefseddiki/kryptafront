"use client";

import { GRADIENT } from "../lib/assets";
import { useCart } from "../lib/cart-context";
import { useT } from "../lib/language-context";

interface Props {
  product: { id: string; slug: string; name: string; price: number; img: string };
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();
  const t = useT();

  return (
    <button
      onClick={e => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
      className="w-full h-[52px] rounded-2xl flex items-center justify-center text-[#0a0a0a] text-base font-medium"
      style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
    >
      {t.cart.addToCart}
    </button>
  );
}
