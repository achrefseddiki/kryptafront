import PageWrapper from "../components/PageWrapper";
import { GRADIENT, ASSETS } from "../lib/assets";
import { getLocale, getDict } from "../lib/i18n";

export default async function LabPage() {
  const locale = await getLocale();
  const t = getDict(locale);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-12 lg:gap-16 pb-16">
        {/* Hero */}
        <div className="px-4 sm:px-8 lg:px-24 flex flex-col gap-4">
          <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
            <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
            <span className="text-white/20">/</span>
            <span className="text-white">{t.lab.breadcrumb}</span>
          </nav>

          <div className="flex items-center gap-3 mt-2">
            <div
              className="size-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: GRADIENT }}
            >
              <img src={ASSETS.iconRepair} alt="" className="size-6 invert" />
            </div>
            <span
              className="text-sm font-medium px-3 py-1 rounded-xl"
              style={{ background: "rgba(0,245,255,0.1)", color: "#00f5ff", border: "1px solid rgba(0,245,255,0.2)" }}
            >
              {t.lab.badge}
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-[-0.96px] max-w-[720px]">
            {t.lab.title}{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t.lab.titleHighlight}
            </span>
          </h1>
          <p className="text-base lg:text-2xl font-normal text-[#a0a0a0] max-w-[640px]">{t.lab.subtitle}</p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-2">
            <a
              href="/lab/repair"
              className="h-[52px] px-8 rounded-2xl flex items-center text-[#0a0a0a] text-base font-medium"
              style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
            >
              {t.lab.bookRepair}
            </a>
            <a
              href="/contact"
              className="h-[52px] px-8 rounded-2xl flex items-center border border-[#00f5ff] text-[#00f5ff] text-base font-medium hover:bg-[#00f5ff]/10 transition-colors"
            >
              {t.lab.talkToTech}
            </a>
          </div>

          {/* Stats row */}
          <div className="flex items-center flex-wrap gap-6 sm:gap-10 mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)]">
            {t.lab.stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-sm text-[#a0a0a0]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services grid */}
        <div className="px-4 sm:px-8 lg:px-24 flex flex-col gap-6 lg:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl lg:text-4xl font-bold text-white tracking-[-0.64px]">{t.lab.ourServices}</h2>
            <p className="text-[#a0a0a0] text-sm lg:text-lg">{t.lab.servicesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {t.lab.services.map(({ icon, title, desc, price, duration }) => (
              <div
                key={title}
                className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 lg:p-6 flex flex-col gap-4 hover:border-[rgba(255,255,255,0.2)] transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="size-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.15)" }}
                  >
                    {icon}
                  </div>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-lg"
                    style={{ background: "rgba(0,245,255,0.08)", color: "#00f5ff" }}
                  >
                    {duration}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-lg font-medium">{title}</h3>
                  <p className="text-[#a0a0a0] text-sm leading-6">{desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <span className="text-white font-bold">{price}</span>
                  <a href="/lab/repair" className="text-[#00f5ff] text-sm font-medium hover:underline">
                    {t.lab.book}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process steps */}
        <div
          className="px-4 sm:px-8 lg:px-24 py-10 lg:py-16 flex flex-col gap-8 lg:gap-10"
          style={{ background: "linear-gradient(180deg, rgba(0,245,255,0.04) 0%, transparent 100%)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl lg:text-4xl font-bold text-white tracking-[-0.64px]">{t.lab.howItWorks}</h2>
            <p className="text-[#a0a0a0] text-sm lg:text-lg">{t.lab.howItWorksSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-6">
            {t.lab.steps.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-4">
                <span
                  className="text-4xl font-bold"
                  style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {step}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-lg font-medium">{title}</h3>
                  <p className="text-[#a0a0a0] text-sm leading-6">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="px-4 sm:px-8 lg:px-24 flex flex-col gap-6 lg:gap-8">
          <h2 className="text-2xl lg:text-4xl font-bold text-white tracking-[-0.64px]">{t.lab.faqTitle}</h2>
          <div className="flex flex-col gap-4">
            {t.lab.faqs.map(({ q, a }) => (
              <div
                key={q}
                className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 lg:p-6 flex flex-col gap-3"
              >
                <h3 className="text-white text-base font-medium">{q}</h3>
                <p className="text-[#a0a0a0] text-sm leading-6">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="px-4 sm:px-8 lg:px-24">
          <div
            className="rounded-2xl p-6 lg:p-12 border border-[rgba(1,245,255,0.2)] flex flex-col items-center gap-5 lg:gap-6 text-center"
            style={{ background: "linear-gradient(90deg, rgba(1,245,255,0.08), rgba(30,58,255,0.08))" }}
          >
            <div
              className="size-16 rounded-2xl flex items-center justify-center"
              style={{ background: GRADIENT }}
            >
              <img src={ASSETS.iconRepair} alt="" className="size-8 invert" />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl lg:text-[32px] text-white font-bold">{t.lab.ctaTitle}</h2>
              <p className="text-[#a0a0a0] text-sm lg:text-base max-w-[500px]">{t.lab.ctaSubtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <a
                href="/lab/repair"
                className="h-[52px] px-8 rounded-2xl flex items-center text-[#0a0a0a] text-base font-medium"
                style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
              >
                {t.lab.bookOnline}
              </a>
              <a
                href="/contact"
                className="h-[52px] px-8 rounded-2xl flex items-center border border-[#00f5ff] text-[#00f5ff] text-base font-medium hover:bg-[#00f5ff]/10 transition-colors"
              >
                {t.lab.contactUs}
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
