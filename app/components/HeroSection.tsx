import { ASSETS, GRADIENT } from "../lib/assets";
import { getLocale, getDict } from "../lib/i18n";
import { api } from "../lib/api";

export default async function HeroSection() {
  const [locale, hero] = await Promise.all([
    getLocale(),
    api.heroContent.get().catch(() => null),
  ]);
  const t = getDict(locale);

  const isEn = locale === "en";
  const title1 = (isEn ? hero?.title1En : hero?.title1Fr) || t.home.hero.title1;
  const title2 = (isEn ? hero?.title2En : hero?.title2Fr) || t.home.hero.title2;
  const subtitle = (isEn ? hero?.subtitleEn : hero?.subtitleFr) || t.home.hero.subtitle;
  const btn1Label = (isEn ? hero?.btn1LabelEn : hero?.btn1LabelFr) || t.home.hero.buildPC;
  const btn1Href = hero?.btn1Href || "/builder";
  const btn2Label = (isEn ? hero?.btn2LabelEn : hero?.btn2LabelFr) || t.home.hero.exploreProducts;
  const btn2Href = hero?.btn2Href || "/products";

  return (
    <section className="px-4 sm:px-8 lg:px-24 flex flex-col gap-5">
      {/* Main hero banner */}
      <div
        className="w-full h-auto py-12 sm:py-0 sm:h-[380px] lg:h-[498px] rounded-[14px] overflow-hidden relative flex items-center justify-center"
        style={{ background: "rgba(13,25,37,0.71)" }}
      >
        <div className="flex flex-col items-center gap-6 lg:gap-[42px] max-w-[731px] w-full px-6 relative z-10">
          {/* Heading */}
          <div className="flex flex-col gap-2.5 items-center text-center w-full">
            <h1 className="text-[36px] sm:text-[48px] lg:text-[58px] font-bold leading-tight lg:leading-[69px] tracking-[-1.44px]">
              <span className="text-white block">{title1}</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: GRADIENT }}
              >
                {title2}
              </span>
            </h1>
            <p className="text-[#a0a0a0] text-base sm:text-xl lg:text-[26px] font-normal leading-relaxed lg:leading-[38.8px] max-w-[731px]">
              {subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3 lg:gap-4">
            <a
              href={btn1Href}
              className="h-11 lg:h-14 px-5 lg:px-8 rounded-2xl flex items-center gap-2 text-[#0a0a0a] text-sm lg:text-base font-medium whitespace-nowrap"
              style={{
                background: GRADIENT,
                filter: "drop-shadow(0px 10px 7.5px rgba(1,245,255,0.2)) drop-shadow(0px 4px 3px rgba(1,245,255,0.2))",
              }}
            >
              {btn1Label}
              <img src={ASSETS.iconArrowRight} alt="" className="size-4 lg:size-5" />
            </a>
            <a
              href={btn2Href}
              className="h-11 lg:h-[59px] px-5 lg:px-8 rounded-2xl flex items-center border-[1.6px] border-[#00f5ff] text-[#00f5ff] text-sm lg:text-base font-medium whitespace-nowrap hover:bg-[#00f5ff]/10 transition-colors"
            >
              {btn2Label}
            </a>
          </div>
        </div>
      </div>

      {/* Promo banners */}
      <div className="flex flex-col sm:flex-row gap-5">
        {[1, 2].map((i) => (
          <div key={i} className="flex-1 h-[160px] sm:h-[200px] lg:h-[236px] rounded-[13px] overflow-hidden relative bg-[#625858]">
            <button className="absolute bottom-4 right-4 bg-[rgba(255,255,255,0.31)] border-2 border-white text-white text-sm font-semibold px-3 py-2.5 rounded-[6px] hover:bg-white/40 transition-colors">
              {t.home.hero.discover}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
