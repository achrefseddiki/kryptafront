'use client';
import { useState } from 'react';

interface Props {
  mainImg: string;
  images: string[];
  name: string;
}

export default function ProductImageGallery({ mainImg, images, name }: Props) {
  const all = [mainImg, ...images];
  const [selected, setSelected] = useState(mainImg);

  return (
    <div className="flex gap-4 shrink-0">
      {all.length > 1 && (
        <div className="flex flex-col gap-3">
          {all.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(img)}
              className={`size-[72px] bg-[#1a1a1a] border rounded-xl overflow-hidden transition-colors ${
                selected === img ? 'border-[#00f5ff]/70' : 'border-[rgba(255,255,255,0.1)] hover:border-[#00f5ff]/50'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="w-[480px] h-[480px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden">
        <img src={selected} alt={name} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
