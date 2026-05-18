import { ASSETS, GRADIENT } from "../lib/assets";
import { getLocale, getDict } from "../lib/i18n";

const SERVICE_META = [
  { iconBg: "linear-gradient(90deg, #1e3aff 0%, #00f5ff 100%)", icon: ASSETS.iconDrops, href: "/drops" },
  { iconBg: "linear-gradient(90deg, #00f5ff 0%, #1e3aff 100%)", icon: ASSETS.iconRepair, href: "/lab" },
];

export default async function KryptaUniverseSection() {
  const locale = await getLocale();
  const t = getDict(locale);

  return (
    <section className="px-24 flex flex-col gap-7">
      {/* Heading */}
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="text-[38px] font-bold text-white tracking-[-0.3px] leading-normal">
          {t.home.universe.heading}
        </h2>
        <p className="text-[#a0a0a0] text-2xl font-normal leading-[39px] max-w-[821px]">
          {t.home.universe.subheading}
        </p>
      </div>

      {/* Service cards */}
      <div className="flex gap-6">
        {t.home.universe.services.map(({ title, desc }, i) => (
          <a
            key={title}
            href={SERVICE_META[i].href}
            className="flex-1 bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 h-[270px] relative hover:border-[rgba(255,255,255,0.2)] transition-colors"
          >
            <div className="size-12 rounded-2xl flex items-center justify-center" style={{ background: SERVICE_META[i].iconBg }}>
              <img src={SERVICE_META[i].icon} alt="" className="size-6" />
            </div>
            <h3 className="text-white text-5xl font-medium leading-[64px] mt-6">{title}</h3>
            <p className="text-[#a0a0a0] text-base font-normal leading-6 mt-4">{desc}</p>
            <div className="flex items-center gap-1 mt-4 absolute bottom-8 left-8">
              <span className="text-[#00f5ff] text-base font-normal leading-6">{t.home.universe.explore}</span>
              <img src={ASSETS.iconArrowSmall} alt="" className="size-4" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
