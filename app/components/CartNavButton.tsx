"use client";

import { ASSETS } from "../lib/assets";
import { useCart } from "../lib/cart-context";

export default function CartNavButton() {
  const { itemCount } = useCart();
  return (
    <a href="/cart" className="relative size-10 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-colors">
      <img src={ASSETS.iconCart} alt="Cart" className="size-5" />
      <span className="absolute top-1 right-0 bg-[#00f5ff] text-[#0a0a0a] text-[10px] font-medium size-4 rounded-full flex items-center justify-center leading-none">
        {itemCount > 99 ? "99+" : itemCount}
      </span>
    </a>
  );
}
