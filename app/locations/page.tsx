import PageWrapper from "../components/PageWrapper";
import { api } from "../lib/api";
import { getLocale, getDict } from "../lib/i18n";
import LocationsClient from "./LocationsClient";

export default async function LocationsPage() {
  const [shops, locale] = await Promise.all([
    api.shops.list().catch(() => []),
    getLocale(),
  ]);
  const t = getDict(locale);

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 flex flex-col gap-8 pb-16">
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
            <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
            <span className="text-white/20">/</span>
            <span className="text-white">{t.nav.location}</span>
          </nav>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mt-2">
            {locale === "fr" ? "Nos Boutiques" : "Our Stores"}
          </h1>
          <p className="text-base text-[#a0a0a0] mt-1">
            {locale === "fr"
              ? "Retrouvez nos boutiques sur la carte et venez découvrir notre sélection gaming."
              : "Find our stores on the map and come explore our gaming selection."}
          </p>
        </div>

        <LocationsClient shops={shops} />
      </div>
    </PageWrapper>
  );
}
