import { ASSETS } from "../lib/assets";

const BUILDS = [
  { title: "KRYPTA RTX 5090 Build", price: "$4,999", img: ASSETS.productRtx5090 },
  { title: "Professional Gaming Mouse", price: "$149", img: ASSETS.productGamingMouse },
  { title: "Dual Monitor Setup Kit", price: "$899", img: ASSETS.productDualMonitor },
  { title: "KRYPTA RTX 5090 Build", price: "$4,999", img: ASSETS.productRtx5090 },
  { title: "Dual Monitor Setup Kit", price: "$899", img: ASSETS.productDualMonitor },
];

export default function PCBuildsSection() {
  return (
    <section className="px-24 flex flex-col gap-5">
      {/* Heading row */}
      <div className="flex items-center justify-between">
        <h2 className="text-[36px] font-medium text-white tracking-[-0.36px] leading-10 whitespace-nowrap">
          Best Gaming PC Builds in Tunisia
        </h2>
        <a href="/builds" className="flex items-center gap-1 text-[#00f5ff] text-base font-normal">
          View All
          <img src={ASSETS.iconArrowSmall} alt="" className="size-4" />
        </a>
      </div>

      {/* Horizontally scrollable cards */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
        {BUILDS.map(({ title, price, img }, i) => (
          <a
            key={i}
            href="#"
            className="flex-none w-[261px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors"
          >
            <div className="w-full h-[259px] overflow-hidden">
              <img src={img} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <h3 className="text-white text-2xl font-medium leading-[33.6px] w-[212px]">{title}</h3>
              <p className="text-white text-[32px] font-bold leading-[44.8px]">{price}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
