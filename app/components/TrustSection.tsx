import { ASSETS } from "../lib/assets";
import { getLocale, getDict } from "../lib/i18n";

const TRUST_ICONS = [ASSETS.iconTrustedQuality, ASSETS.iconFastDelivery, ASSETS.iconExpertSupport];

export default async function TrustSection() {
  const locale = await getLocale();
  const t = getDict(locale);

  return (
    <section className="flex flex-col items-center gap-10 lg:gap-14 px-4 sm:px-8 lg:px-24 py-12 lg:py-20">
      {/* Section heading */}
      <div className="flex flex-col items-center gap-4 lg:gap-5 text-center max-w-[791px]">
        <h2 className="text-2xl lg:text-[38px] font-bold leading-normal tracking-[-0.3px] text-white max-w-[658px]">
          {t.home.trust.heading}
        </h2>
        <p className="text-[#a0a0a0] text-base lg:text-2xl font-normal leading-relaxed lg:leading-[39px]">
          {t.home.trust.subheading}
        </p>
      </div>

      {/* Trust badges */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-12 lg:gap-32 w-full max-w-[930px]">
        {t.home.trust.items.map(({ title, desc }, i) => (
          <div key={title} className="flex flex-col items-center gap-3 lg:gap-3.5 max-w-[260px]">
            <img src={TRUST_ICONS[i]} alt="" className="size-10 lg:size-[51px]" />
            <p className="text-xl lg:text-[30px] font-medium text-white text-center leading-tight lg:leading-[42px]">{title}</p>
            <p className="text-[#a0a0a0] text-sm lg:text-[18px] font-normal text-center leading-relaxed lg:leading-[25px]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
