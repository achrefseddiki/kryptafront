import { ASSETS } from "../lib/assets";
import { getLocale, getDict } from "../lib/i18n";

const BUILDS = [
  { title: "KRYPTA RTX 5090 Build", price: "4 999 DT", img: ASSETS.productRtx5090 },
  { title: "Professional Gaming Mouse", price: "149 DT", img: ASSETS.productGamingMouse },
  { title: "Dual Monitor Setup Kit", price: "899 DT", img: ASSETS.productDualMonitor },
  { title: "KRYPTA RTX 5090 Build", price: "4 999 DT", img: ASSETS.productRtx5090 },
  { title: "Dual Monitor Setup Kit", price: "899 DT", img: ASSETS.productDualMonitor },
];

export default async function PCBuildsSection() {
  const locale = await getLocale();
  const t = getDict(locale);

  return (
    <section className="px-4 sm:px-8 lg:px-24 flex flex-col gap-5">
      {/* Heading row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
        <h2 className="text-2xl lg:text-[36px] font-medium text-white tracking-[-0.36px] leading-tight lg:leading-10">
          {t.home.builds.heading}
        </h2>
        <a href="/builds" className="flex items-center gap-1 text-[#00f5ff] text-sm sm:text-base font-normal self-start sm:self-auto">
          {t.home.builds.viewAll}
          <img src={ASSETS.iconArrowSmall} alt="" className="size-4" />
        </a>
      </div>

      {/* Horizontally scrollable cards */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
        {BUILDS.map(({ title, price, img }, i) => (
          <a
            key={i}
            href="#"
            className="flex-none w-[200px] sm:w-[261px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors"
          >
            <div className="w-full h-[180px] sm:h-[259px] overflow-hidden">
              <img src={img} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 sm:p-6 flex flex-col gap-1 sm:gap-2">
              <h3 className="text-white text-base sm:text-2xl font-medium leading-snug">{title}</h3>
              <p className="text-white text-xl sm:text-[32px] font-bold leading-tight sm:leading-[44.8px]">{price}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
