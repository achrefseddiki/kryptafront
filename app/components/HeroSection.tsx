import { ASSETS, GRADIENT } from "../lib/assets";

export default function HeroSection() {
  return (
    <section className="px-24 flex flex-col gap-5">
      {/* Main hero banner */}
      <div
        className="w-full h-[498px] rounded-[14px] overflow-hidden relative flex items-center justify-center"
        style={{ background: "rgba(13,25,37,0.71)" }}
      >
        <div className="flex flex-col items-center gap-[42px] max-w-[731px] w-full px-4 relative z-10">
          {/* Heading */}
          <div className="flex flex-col gap-2.5 items-center text-center w-full">
            <h1 className="text-[58px] font-bold leading-[69px] tracking-[-1.44px]">
              <span className="text-white block">Best Gaming PCs</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: GRADIENT }}
              >
                {"& PC Components in Tunisia"}
              </span>
            </h1>
            <p className="text-[#a0a0a0] text-[26px] font-normal leading-[38.8px] max-w-[731px]">
              Build your ultimate gaming setup with high performance PCs, components, and gaming peripherals in Tunisia.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <a
              href="/builder"
              className="h-14 px-8 rounded-2xl flex items-center gap-2 text-[#0a0a0a] text-base font-medium whitespace-nowrap"
              style={{
                background: GRADIENT,
                filter: "drop-shadow(0px 10px 7.5px rgba(1,245,255,0.2)) drop-shadow(0px 4px 3px rgba(1,245,255,0.2))",
              }}
            >
              Build Your PC
              <img src={ASSETS.iconArrowRight} alt="" className="size-5" />
            </a>
            <a
              href="/products"
              className="h-[59px] px-8 rounded-2xl flex items-center border-[1.6px] border-[#00f5ff] text-[#00f5ff] text-base font-medium whitespace-nowrap hover:bg-[#00f5ff]/10 transition-colors"
            >
              Explore Products
            </a>
          </div>
        </div>
      </div>

      {/* Promo banners */}
      <div className="flex gap-5">
        {[1, 2].map((i) => (
          <div key={i} className="flex-1 h-[236px] rounded-[13px] overflow-hidden relative bg-[#625858]">
            <button className="absolute bottom-4 right-4 bg-[rgba(255,255,255,0.31)] border-2 border-white text-white text-sm font-semibold px-3 py-2.5 rounded-[6px] hover:bg-white/40 transition-colors">
              Je découvre !
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
