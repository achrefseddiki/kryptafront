"use client";

import { useState } from "react";
import type { Shop } from "../lib/types";
import ShopsMap from "./ShopsMap";

export default function LocationsClient({ shops }: { shops: Shop[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    shops.length > 0 ? shops[0].id : null
  );

  const activeShop = shops.find((s) => s.id === activeId) ?? null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Map */}
      <div className="flex-1 lg:min-h-[580px]">
        {activeShop ? (
          <ShopsMap shop={activeShop} />
        ) : (
          <div className="w-full h-full rounded-2xl bg-[#141414] border border-white/[0.07] flex items-center justify-center" style={{ minHeight: 400 }}>
            <p className="text-[#555] text-sm">No locations yet.</p>
          </div>
        )}
      </div>

      {/* Shop list */}
      <div className="lg:w-[340px] flex flex-col gap-3 overflow-y-auto lg:max-h-[580px] pr-1">
        {shops.length === 0 ? (
          <div className="bg-[#141414] border border-white/[0.07] rounded-2xl p-8 text-center">
            <p className="text-[#555] text-sm">No locations yet.</p>
          </div>
        ) : (
          shops.map((shop) => {
            const active = shop.id === activeId;
            return (
              <button
                key={shop.id}
                onClick={() => setActiveId(shop.id)}
                className={`text-left rounded-2xl border transition-all overflow-hidden ${
                  active
                    ? "border-[#00f5ff]/50 bg-[rgba(0,245,255,0.05)]"
                    : "border-white/[0.07] bg-[#141414] hover:border-white/[0.15]"
                }`}
              >
                {shop.img && (
                  <div className="w-full h-[140px] overflow-hidden">
                    <img
                      src={shop.img}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-white text-sm font-semibold leading-tight">{shop.name}</h3>
                    {active && (
                      <span className="shrink-0 text-[10px] font-bold text-[#00f5ff] border border-[#00f5ff]/40 px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs text-[#888]">
                    <span className="flex items-start gap-1.5">
                      <svg className="size-3.5 shrink-0 mt-0.5 text-[#555]" fill="none" viewBox="0 0 16 16">
                        <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 8 4a1.5 1.5 0 0 1 0 3.5z" fill="currentColor"/>
                      </svg>
                      {shop.address}
                    </span>
                    {shop.phone && (
                      <span className="flex items-center gap-1.5">
                        <svg className="size-3.5 shrink-0 text-[#555]" fill="none" viewBox="0 0 16 16">
                          <path d="M13.5 10.5l-2-2a1 1 0 0 0-1.4 0l-.8.8a6.5 6.5 0 0 1-3.1-3.1l.8-.8a1 1 0 0 0 0-1.4l-2-2A1 1 0 0 0 3.6 2L2.5 3.1C1.9 3.7 1.7 4.6 2 5.4a12.5 12.5 0 0 0 8.6 8.6c.8.3 1.7.1 2.3-.5l1.1-1.1a1 1 0 0 0-.5-1.9z" fill="currentColor"/>
                        </svg>
                        {shop.phone}
                      </span>
                    )}
                    {shop.hours && (
                      <span className="flex items-center gap-1.5">
                        <svg className="size-3.5 shrink-0 text-[#555]" fill="none" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M8 4.5V8l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        {shop.hours}
                      </span>
                    )}
                    {shop.email && (
                      <span className="flex items-center gap-1.5">
                        <svg className="size-3.5 shrink-0 text-[#555]" fill="none" viewBox="0 0 16 16">
                          <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M2 5l6 4.5L14 5" stroke="currentColor" strokeWidth="1.2"/>
                        </svg>
                        {shop.email}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
