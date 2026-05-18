import { ASSETS } from "../lib/assets";
import { getLocale, getDict } from "../lib/i18n";

const CATEGORY_IMGS = [ASSETS.catGamingPCs, ASSETS.catComponents, ASSETS.catComponents, ASSETS.catPeripherals];
const CATEGORY_HREFS = ["#", "/products", "/products", "#"];

export default async function CategorySection() {
  const locale = await getLocale();
  const t = getDict(locale);

  return (
    <section className="px-24 flex flex-col gap-8">
      <h2 className="text-[36px] font-medium text-white tracking-[-0.36px] leading-10 text-center whitespace-nowrap">
        {t.home.categories.heading}
      </h2>
      <div className="flex gap-6 justify-center">
        {t.home.categories.items.map(({ title, desc }, i) => (
          <a
            key={i}
            href={CATEGORY_HREFS[i]}
            className="w-[261px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors"
          >
            <div className="w-full h-[259px] overflow-hidden">
              <img src={CATEGORY_IMGS[i]} alt={title} className="w-full h-full object-cover" />
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
