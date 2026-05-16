import { ASSETS } from "../lib/assets";

const CATEGORIES = [
  { title: "Gaming PCs", desc: "Pre-built and custom systems", img: ASSETS.catGamingPCs },
  { title: "Components", desc: "GPUs, CPUs, RAM & more", img: ASSETS.catComponents },
  { title: "Components", desc: "GPUs, CPUs, RAM & more", img: ASSETS.catComponents },
  { title: "Peripherals", desc: "Keyboards, mice, headsets", img: ASSETS.catPeripherals },
];

export default function CategorySection() {
  return (
    <section className="px-24 flex flex-col gap-8">
      <h2 className="text-[36px] font-medium text-white tracking-[-0.36px] leading-10 text-center whitespace-nowrap">
        {"Explore Gaming PCs, Components & Peripherals"}
      </h2>
      <div className="flex gap-6 justify-center">
        {CATEGORIES.map(({ title, desc, img }, i) => (
          <a
            key={i}
            href="#"
            className="w-[261px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors"
          >
            <div className="w-full h-[259px] overflow-hidden">
              <img src={img} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <h3 className="text-white text-[32px] font-medium leading-[44.8px]">{title}</h3>
              <p className="text-[#a0a0a0] text-sm font-normal leading-5">{desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
