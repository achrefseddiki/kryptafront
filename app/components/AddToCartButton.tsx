"use client";

import { useState } from "react";
import { GRADIENT } from "../lib/assets";
import { useCart } from "../lib/cart-context";
import { useT } from "../lib/language-context";

interface Props {
  product: { id: string; slug: string; name: string; price: number; img: string };
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();
  const t = useT();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart({ ...product, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      className="flex-1 h-[52px] rounded-2xl flex items-center justify-center text-[#0a0a0a] text-base font-medium"
      style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
    >
      {added ? t.cart.addedToCart : t.cart.addToCart}
    </button>
  );
}
