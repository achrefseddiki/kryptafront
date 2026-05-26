"use client";

import { useCart } from "../lib/cart-context";

export default function CartToast() {
  const { toast } = useCart();

  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] transition-all duration-300 ${
        toast ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 bg-[#1a1a1a] border border-green-500/30 rounded-2xl px-4 py-3 shadow-2xl min-w-[260px] max-w-[340px]">
        {toast?.img && (
          <div className="size-12 rounded-xl overflow-hidden bg-[#111] shrink-0">
            <img src={toast.img} alt={toast.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{toast?.name}</p>
          <p className="text-green-400 text-xs flex items-center gap-1">
            <span className="size-4 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">✓</span>
            Added to cart
          </p>
        </div>
      </div>
    </div>
  );
}
