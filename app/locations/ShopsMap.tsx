"use client";

import type { Shop } from "../lib/types";

interface Props {
  shop: Shop;
}

export default function ShopsMap({ shop }: Props) {
  const embedSrc = `https://maps.google.com/maps?q=${shop.lat},${shop.lng}&z=15&output=embed`;
  const mapsUrl = `https://www.google.com/maps?q=${shop.lat},${shop.lng}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-full rounded-2xl overflow-hidden relative group"
      style={{ minHeight: 400 }}
    >
      <iframe
        src={embedSrc}
        width="100%"
        height="100%"
        style={{ border: 0, display: "block", minHeight: 400 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={shop.name}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-4 pointer-events-none">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
          Open in Google Maps
        </span>
      </div>
    </a>
  );
}
