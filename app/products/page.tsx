import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { api } from "../lib/api";
import { getLocale, getDict } from "../lib/i18n";

export default async function PcComponentsPage() {
  const [categories, locale] = await Promise.all([api.categories.roots(), getLocale()]);
  const t = getDict(locale);

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{t.products.allProducts}</span>
        </nav>

        <div className="flex flex-col gap-4 max-w-[896px]">
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-[-0.96px] leading-tight lg:leading-[48px]">{t.products_page.title}</h1>
          <p className="text-xl lg:text-[32px] font-normal text-[#a0a0a0] leading-relaxed lg:leading-[44.8px]">{t.products_page.subtitle}</p>
          <p className="text-base font-normal text-[#a0a0a0] leading-[26px] text-justify">{t.products_page.description}</p>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map(({ slug, label, img }) => (
            <a
              key={slug}
              href={`/products/${encodeURIComponent(slug)}`}
              className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl h-[162px] flex flex-col items-center justify-center gap-3 hover:border-[#00f5ff]/50 hover:bg-[#1a1a1a]/80 transition-colors text-center px-4"
            >
              {img && <img src={img} alt={label} className="size-10 object-contain" />}
              <span className="text-base font-semibold text-white">{label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-24 flex flex-col gap-12 pb-10">
        <h2
          className="text-2xl lg:text-[36px] font-bold tracking-[-0.36px] bg-clip-text text-transparent"
          style={{ backgroundImage: GRADIENT }}
        >
          {t.products_page.guideTitle}
        </h2>

        <div className="flex flex-col gap-10">
          {t.products_page.guide.map(({ title, body }) => (
            <div key={title} className="flex flex-col gap-4">
              <h3 className="text-2xl lg:text-5xl font-medium text-white leading-tight lg:leading-[64px]">{title}</h3>
              <p className="text-base font-normal text-[#a0a0a0] leading-[26px] text-justify">{body}</p>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-8 border border-[rgba(1,245,255,0.2)] flex flex-col gap-12"
          style={{ background: "linear-gradient(90deg, rgba(1,245,255,0.1) 0%, rgba(30,58,255,0.1) 100%)" }}
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl lg:text-5xl font-bold text-white leading-tight lg:leading-[64px]">
              {t.products_page.compatibilityTitle}
            </h3>
            <p className="text-base font-normal text-[#a0a0a0] leading-6 text-justify max-w-[1079px]">
              {t.products_page.compatibilityBody}
            </p>
          </div>
          <a
            href="/builder"
            className="self-start h-[51px] px-6 rounded-2xl flex items-center gap-3 text-[#0a0a0a] text-base font-medium"
            style={{ background: GRADIENT }}
          >
            {t.products_page.getExpertHelp}
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
