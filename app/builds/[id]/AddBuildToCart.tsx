"use client";

import { useCart } from "../../lib/cart-context";
import { GRADIENT } from "../../lib/assets";
import type { KryptaBuild } from "../../lib/types";

export default function AddBuildToCart({ build }: { build: KryptaBuild }) {
  const { addToCart } = useCart();

  function handleAdd() {
    addToCart({
      id: build.id,
      slug: build.id,
      name: build.name,
      price: build.price,
      img: build.img ?? "",
      qty: 1,
    });
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleAdd}
        disabled={!build.inStock}
        className="flex-1 h-12 rounded-2xl text-[#0a0a0a] text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        style={{ background: GRADIENT }}
      >
        {build.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
      {build.inStock && (
        <a
          href="/checkout"
          onClick={handleAdd}
          className="h-12 px-6 rounded-2xl border border-white/[0.15] text-white text-sm font-medium hover:border-white/30 transition-colors flex items-center"
        >
          Buy Now
        </a>
      )}
    </div>
  );
}
