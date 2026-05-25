"use client";
import { useState } from "react";
import { useCart } from "../lib/cart-context";
import { GRADIENT } from "../lib/assets";
import type { Drop } from "../lib/types";

export default function ClaimDropButton({ drop, label }: { drop: Drop; label: string }) {
  const { addToCart } = useCart();
  const [claimed, setClaimed] = useState(false);

  function handleClaim() {
    addToCart({
      id: drop.id,
      slug: drop.id,
      name: drop.title,
      price: drop.price,
      img: drop.img,
    });
    setClaimed(true);
    setTimeout(() => setClaimed(false), 2000);
  }

  return (
    <button
      onClick={handleClaim}
      className="w-full max-w-[320px] h-12 lg:h-14 rounded-2xl text-[#0a0a0a] text-base font-semibold mt-2 transition-opacity active:opacity-80"
      style={{ background: GRADIENT }}
    >
      {claimed ? "✓ Added to cart" : label}
    </button>
  );
}
