import { ASSETS, GRADIENT } from "../lib/assets";

const NAV_CATEGORIES = [
  { label: "Gaming PCs", icon: ASSETS.iconCatDown, active: false },
  { label: "PC Components", icon: ASSETS.iconCatActive, active: true },
  { label: "Gaming Peripherals", icon: ASSETS.iconCatOther, active: false },
  { label: "Accessories", icon: ASSETS.iconCatOther, active: false },
  { label: "Streaming Gear", icon: ASSETS.iconCatOther, active: false },
  { label: "Krypta Merch", icon: ASSETS.iconCatOther, active: false },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full flex flex-col bg-[rgba(10,10,10,0.95)] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]">
      {/* Top bar */}
      <div className="h-10 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(26,26,26,0.5)] px-24 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 text-[#a0a0a0] text-xs font-normal">
          <span>Livraison sur toute la Tunisie</span>
          <span className="text-[rgba(255,255,255,0.1)]">|</span>
          <span>Support 24/7</span>
        </div>
        <button className="flex items-center gap-1 text-[#a0a0a0] text-base font-medium">
          <img src={ASSETS.iconGlobe} alt="" className="size-3.5" />
          <span>English</span>
          <img src={ASSETS.iconChevronDown} alt="" className="size-3" />
        </button>
      </div>

      {/* Main bar: logo + search + actions */}
      <div className="h-20 border-b border-[rgba(255,255,255,0.05)] px-24 flex items-center justify-between gap-8 shrink-0">
        <a href="/" className="relative w-[177px] h-10 overflow-hidden shrink-0">
          <img
            src={ASSETS.logo}
            alt="KRYPTA"
            className="absolute"
            style={{ height: "610%", width: "138%", left: "-19%", top: "-255%" }}
          />
        </a>

        <div className="relative flex-1 max-w-[590px]">
          <img
            src={ASSETS.iconSearch}
            alt=""
            className="absolute left-5 top-1/2 -translate-y-1/2 size-5 z-10 pointer-events-none"
          />
          <input
            type="search"
            placeholder="Rechercher des PC gaming, composants, périphériques..."
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-full pl-14 pr-6 py-3 text-sm text-[rgba(255,255,255,0.5)] placeholder:text-[rgba(255,255,255,0.5)] outline-none focus:border-[#00f5ff] transition-colors"
          />
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <a
            href="/builder"
            className="h-11 px-6 rounded-2xl text-[#0a0a0a] text-base font-medium flex items-center"
            style={{ background: GRADIENT, filter: "drop-shadow(0px 4px 3px rgba(1,245,255,0.2)) drop-shadow(0px 2px 2px rgba(1,245,255,0.2))" }}
          >
            Build
          </a>
          <button className="size-10 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-colors">
            <img src={ASSETS.iconWishlist} alt="Wishlist" className="size-5" />
          </button>
          <button className="size-10 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-colors">
            <img src={ASSETS.iconProfile} alt="Profile" className="size-5" />
          </button>
          <button className="relative size-10 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-colors">
            <img src={ASSETS.iconCart} alt="Cart" className="size-5" />
            <span className="absolute top-1 right-0 bg-[#00f5ff] text-[#0a0a0a] text-[10px] font-medium size-4 rounded-full flex items-center justify-center leading-none">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Primary nav */}
      <div className="h-12 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(26,26,26,0.3)] px-24 flex items-center justify-between shrink-0">
        <nav className="flex items-center gap-8">
          <button
            className="flex items-center gap-1 text-black text-sm font-medium px-3 py-1.5 rounded-[5px] shrink-0"
            style={{ background: GRADIENT }}
          >
            Nos Produits
            <img src={ASSETS.iconNavChevron} alt="" className="w-2 h-1" />
          </button>
          {["KryptaBar", "KryptaDrop", "KryptaLab"].map((item) => (
            <a key={item} href="#" className="text-white text-sm font-medium hover:text-[#00f5ff] transition-colors whitespace-nowrap">
              {item}
            </a>
          ))}
        </nav>
        <a href="#" className="flex items-center gap-0.5 text-white text-sm font-medium shrink-0">
          <img src={ASSETS.iconLocation} alt="" className="size-5" />
          <span>Location</span>
        </a>
      </div>

      {/* Category nav */}
      <div className="h-12 border-b border-[rgba(255,255,255,0.05)] px-24 flex items-center shrink-0">
        <nav className="flex items-center gap-8">
          {NAV_CATEGORIES.map(({ label, icon, active }) =>
            active ? (
              <div key={label} className="flex flex-col h-12 justify-center relative">
                <a href="#" className="flex items-center gap-1 text-white text-sm whitespace-nowrap">
                  {label}
                  <img src={icon} alt="" className="size-3.5" />
                </a>
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: GRADIENT }}
                />
              </div>
            ) : (
              <a key={label} href="#" className="flex items-center gap-1 text-[#a0a0a0] text-sm hover:text-white transition-colors whitespace-nowrap">
                {label}
                <img src={icon} alt="" className="size-3.5" />
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
