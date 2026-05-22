import Link from "next/link";
import { ASSETS, GRADIENT } from "../lib/assets";
import { api } from "../lib/api";
import { getLocale, getDict } from "../lib/i18n";
import CartNavButton from "./CartNavButton";
import NavProfileButton from "./NavProfileButton";
import NavCategoryBar from "./NavCategoryBar";
import NavLanguageSwitcher from "./NavLanguageSwitcher";
import MobileNavDrawer from "./MobileNavDrawer";

export default async function Navbar() {
  const [allCategories, locale] = await Promise.all([
    api.categories.list().catch(() => []),
    getLocale(),
  ]);
  const t = getDict(locale);

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col bg-[rgba(10,10,10,0.95)] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]">
      {/* Top info bar — desktop only */}
      <div className="hidden lg:flex h-10 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(26,26,26,0.5)] px-24 items-center justify-between shrink-0">
        <div className="flex items-center gap-4 text-[#a0a0a0] text-xs font-normal">
          <span>{t.nav.delivery}</span>
          <span className="text-[rgba(255,255,255,0.1)]">|</span>
          <span>{t.nav.support}</span>
        </div>
        <NavLanguageSwitcher />
      </div>

      {/* Main bar */}
      <div className="h-14 lg:h-20 border-b border-[rgba(255,255,255,0.05)] px-4 lg:px-24 flex items-center justify-between gap-4 lg:gap-8 shrink-0">
        <Link href="/" className="relative w-[120px] lg:w-[177px] h-8 lg:h-10 overflow-hidden shrink-0">
          <img
            src={ASSETS.logo}
            alt="KRYPTA"
            className="absolute"
            style={{ height: "610%", width: "138%", left: "-19%", top: "-255%" }}
          />
        </Link>

        {/* Search — desktop only */}
        <div className="hidden lg:flex relative flex-1 max-w-[590px]">
          <img
            src={ASSETS.iconSearch}
            alt=""
            className="absolute left-5 top-1/2 -translate-y-1/2 size-5 z-10 pointer-events-none"
          />
          <input
            type="search"
            placeholder={t.nav.search}
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-full pl-14 pr-6 py-3 text-sm text-[rgba(255,255,255,0.5)] placeholder:text-[rgba(255,255,255,0.5)] outline-none focus:border-[#00f5ff] transition-colors"
          />
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-0.5 shrink-0">
          <Link
            href="/builder"
            className="h-11 px-6 rounded-2xl text-[#0a0a0a] text-base font-medium flex items-center"
            style={{
              background: GRADIENT,
              filter: "drop-shadow(0px 4px 3px rgba(1,245,255,0.2)) drop-shadow(0px 2px 2px rgba(1,245,255,0.2))",
            }}
          >
            {t.nav.build}
          </Link>
          <button className="size-10 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-colors">
            <img src={ASSETS.iconWishlist} alt="Wishlist" className="size-5" />
          </button>
          <NavProfileButton />
          <CartNavButton />
        </div>

        {/* Mobile actions: profile + cart + hamburger */}
        <div className="flex lg:hidden items-center gap-0.5 shrink-0">
          <NavProfileButton />
          <CartNavButton />
          <MobileNavDrawer
            categories={allCategories}
            t={{
              search: t.nav.search,
              build: t.nav.build,
              ourProducts: t.nav.ourProducts,
              location: t.nav.location,
            }}
          />
        </div>
      </div>

      {/* Primary nav — desktop only */}
      <div className="hidden lg:flex h-12 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(26,26,26,0.3)] px-24 items-center justify-between shrink-0">
        <nav className="flex items-center gap-8">
          <Link
            href="/products"
            className="flex items-center gap-1 text-black text-sm font-medium px-3 py-1.5 rounded-[5px] shrink-0"
            style={{ background: GRADIENT }}
          >
            {t.nav.ourProducts}
            <img src={ASSETS.iconNavChevron} alt="" className="w-2 h-1" />
          </Link>
          {[
            { label: "KryptaBar", href: "/builder" },
            { label: "KryptaDrop", href: "/drops" },
            { label: "KryptaLab", href: "/lab" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-white text-sm font-medium hover:text-[#00f5ff] transition-colors whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </nav>
        <a href="#" className="flex items-center gap-0.5 text-white text-sm font-medium shrink-0">
          <img src={ASSETS.iconLocation} alt="" className="size-5" />
          <span>{t.nav.location}</span>
        </a>
      </div>

      {/* Category bar — desktop only */}
      <div className="hidden lg:block">
        <NavCategoryBar categories={allCategories} />
      </div>
    </header>
  );
}
