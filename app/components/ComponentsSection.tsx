import { ASSETS, GRADIENT } from "../lib/assets";
import { getLocale, getDict } from "../lib/i18n";

export default async function ComponentsSection() {
  const locale = await getLocale();
  const t = getDict(locale);

  return (
    <section className="px-24 flex flex-col gap-10">
      {/* Top: heading + description */}
      <div className="flex flex-col gap-5 max-w-[691px]">
        <h2
          className="text-[39px] font-bold leading-10 tracking-[-0.36px] bg-clip-text text-transparent"
          style={{ backgroundImage: GRADIENT }}
        >
          {t.home.components.heading}
        </h2>
        <p className="text-[#a0a0a0] text-base font-normal leading-6 text-justify">
          {t.home.components.subheading}
        </p>
      </div>

      {/* 2×2 grid of component details */}
      <div className="grid grid-cols-2 gap-x-14 gap-y-14">
        {t.home.components.items.map(({ title, body }) => (
          <div key={title} className="flex flex-col gap-3">
            <h3 className="text-white text-[32px] font-medium leading-[44.8px]">{title}</h3>
            <p className="text-[#a0a0a0] text-base font-normal leading-[26px] text-justify">
              {body.map(({ text, highlight }, i) =>
                highlight ? (
                  <span key={i} className="text-[#00f5ff]">{text}</span>
                ) : (
                  <span key={i}>{text}</span>
                )
              )}
            </p>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div className="flex justify-center">
        <a
          href="/components"
          className="h-14 px-10 rounded-2xl flex items-center gap-2 text-[#0a0a0a] text-base font-medium"
          style={{
            background: GRADIENT,
            filter: "drop-shadow(0px 10px 7.5px rgba(1,245,255,0.2)) drop-shadow(0px 4px 3px rgba(1,245,255,0.2))",
          }}
        >
          {t.home.components.browseAll}
          <img src={ASSETS.iconArrowRight} alt="" className="size-5" />
        </a>
      </div>
    </section>
  );
}
