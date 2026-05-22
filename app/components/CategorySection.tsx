import { ASSETS } from "../lib/assets";
import { getLocale, getDict } from "../lib/i18n";

const CATEGORY_IMGS = [ASSETS.catGamingPCs, ASSETS.catComponents, ASSETS.catComponents, ASSETS.catPeripherals];
const CATEGORY_HREFS = ["#", "/products", "/products", "#"];

export default async function CategorySection() {
  const locale = await getLocale();
  const t = getDict(locale);

  return (
    <section className="px-4 sm:px-8 lg:px-24 flex flex-col gap-8">
      <h2 className="text-2xl lg:text-[36px] font-medium text-white tracking-[-0.36px] leading-tight lg:leading-10 text-center">
        {t.home.categories.heading}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {t.home.categories.items.map(({ title, desc }, i) => (
          <a
            key={i}
            href={CATEGORY_HREFS[i]}
            className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors"
          >
            <div className="w-full h-[160px] lg:h-[259px] overflow-hidden">
              <img src={CATEGORY_IMGS[i]} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 lg:p-6 flex flex-col gap-2">
              <h3 className="text-white text-xl lg:text-[32px] font-medium leading-tight lg:leading-[44.8px]">{title}</h3>
              <p className="text-[#a0a0a0] text-xs lg:text-sm font-normal leading-5">{desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
