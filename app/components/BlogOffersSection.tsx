import { ASSETS } from "../lib/assets";

const OFFERS = [
  ASSETS.offer1,
  ASSETS.offer2,
  ASSETS.offer3,
  ASSETS.offer4,
  ASSETS.offer5,
  ASSETS.offer6,
  ASSETS.offer7,
  ASSETS.offer8,
];

export default function BlogOffersSection() {
  return (
    <section className="flex gap-5 overflow-x-auto scrollbar-hide px-24 pb-2">
      {OFFERS.map((src, i) => (
        <a
          key={i}
          href="#"
          className="flex-none relative w-[303px] h-[538px] rounded-[14px] overflow-hidden group"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent z-10" />
          <img src={src} alt="" className="w-full h-full object-contain" />
          <button className="absolute bottom-3 right-3 z-20 bg-[rgba(255,255,255,0.31)] border-2 border-white text-white text-xs font-semibold px-3 py-2 rounded-[6px] hover:bg-white/40 transition-colors">
            Voir l&apos;offre
          </button>
        </a>
      ))}
    </section>
  );
}
