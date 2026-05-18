import PageWrapper from "../../components/PageWrapper";
import { GRADIENT, ASSETS } from "../../lib/assets";
import { getLocale, getDict } from "../../lib/i18n";

const BUILDS = [
  {
    id: "krypta-titan",
    name: "KRYPTA Titan",
    tagline: "Uncompromising 4K performance",
    badge: "Best Seller",
    price: 4299,
    img: ASSETS.catGamingPCs,
    specs: [
      { label: "CPU", value: "Intel Core i9-14900K (24C/32T)" },
      { label: "GPU", value: "NVIDIA GeForce RTX 5090 32GB" },
      { label: "RAM", value: "64GB DDR5-6400 (2×32GB)" },
      { label: "Storage", value: "2TB Gen5 NVMe SSD" },
      { label: "Motherboard", value: "ASUS ROG Maximus Z790 APEX" },
      { label: "PSU", value: "1000W 80+ Platinum" },
      { label: "Cooling", value: "360mm AIO Liquid Cooler" },
      { label: "Case", value: "Lian Li O11 Dynamic EVO" },
    ],
    benchmarks: [
      { game: "Cyberpunk 2077 (4K Ultra RT)", fps: 165 },
      { game: "Call of Duty (4K Max)", fps: 290 },
      { game: "Microsoft Flight Sim (4K Ultra)", fps: 87 },
      { game: "Hogwarts Legacy (4K Ultra)", fps: 120 },
    ],
    features: [
      "Fully assembled & cable managed",
      "Windows 11 Pro pre-installed",
      "30-day return policy",
      "2-year parts & labor warranty",
      "Free delivery across Tunisia",
      "Expert Krypta Lab support",
    ],
  },
  {
    id: "krypta-stealth",
    name: "KRYPTA Stealth",
    tagline: "Mid-range king — maximum value",
    badge: "Best Value",
    price: 2149,
    img: ASSETS.catGamingPCs,
    specs: [
      { label: "CPU", value: "AMD Ryzen 9 7900X (12C/24T)" },
      { label: "GPU", value: "NVIDIA GeForce RTX 4080 Super 16GB" },
      { label: "RAM", value: "32GB DDR5-6000 (2×16GB)" },
      { label: "Storage", value: "1TB Gen4 NVMe SSD" },
      { label: "Motherboard", value: "MSI MEG X670E ACE" },
      { label: "PSU", value: "850W 80+ Gold" },
      { label: "Cooling", value: "240mm AIO Liquid Cooler" },
      { label: "Case", value: "Fractal Design Torrent" },
    ],
    benchmarks: [
      { game: "Cyberpunk 2077 (1440p Ultra RT)", fps: 112 },
      { game: "Call of Duty (1440p Max)", fps: 260 },
      { game: "Microsoft Flight Sim (1440p Ultra)", fps: 75 },
      { game: "Hogwarts Legacy (1440p Ultra)", fps: 95 },
    ],
    features: [
      "Fully assembled & cable managed",
      "Windows 11 Home pre-installed",
      "30-day return policy",
      "2-year parts & labor warranty",
      "Free delivery across Tunisia",
      "Expert Krypta Lab support",
    ],
  },
];

const RELATED_BUILDS = [
  { id: "krypta-stealth", name: "KRYPTA Stealth", price: 2149, badge: "Best Value", img: ASSETS.catGamingPCs },
  { id: "krypta-titan", name: "KRYPTA Titan", price: 4299, badge: "Best Seller", img: ASSETS.catGamingPCs },
];

const REVIEWS = [
  { author: "Yassine M.", rating: 5, date: "May 12, 2026", body: "Received it in perfect condition, fully built and ready to go. RTX 5090 is an absolute monster. Krypta's packaging and cable management are top notch." },
  { author: "Houssem B.", rating: 5, date: "May 1, 2026", body: "Best purchase I've ever made. Everything from ordering to delivery was smooth. The build quality is exceptional." },
  { author: "Rayen K.", rating: 4, date: "April 18, 2026", body: "Great system and fast delivery. Temps are fantastic with the AIO. Would love a KRYPTA-branded case option in the future." },
];

export default async function BuildDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const t = getDict(locale);
  const build = BUILDS.find((b) => b.id === id) ?? BUILDS[0];
  const maxFps = Math.max(...build.benchmarks.map((b) => b.fps));

  return (
    <PageWrapper>
      <div className="px-24 pb-16 flex flex-col gap-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <a href="/products" className="hover:text-white transition-colors">{t.builds_detail.gamingPCs}</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{build.name}</span>
        </nav>

        {/* Main layout */}
        <div className="flex gap-12">
          {/* Image */}
          <div className="flex gap-4 shrink-0">
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="size-[72px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-xl overflow-hidden cursor-pointer hover:border-[#00f5ff]/50 transition-colors">
                  <img src={build.img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="w-[480px] h-[480px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden">
              <img src={build.img} alt={build.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span
                className="self-start text-xs font-bold px-3 py-1 rounded-lg text-[#0a0a0a]"
                style={{ background: GRADIENT }}
              >
                {build.badge}
              </span>
              <h1 className="text-[40px] font-bold text-white leading-tight tracking-[-0.64px]">{build.name}</h1>
              <p className="text-[#a0a0a0] text-lg">{build.tagline}</p>
              <div className="flex items-center gap-2 mt-1">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className="text-[#00f5ff] text-lg">★</span>
                ))}
                <span className="text-[#a0a0a0] text-sm ml-1">({REVIEWS.length} {t.builds_detail.reviews})</span>
              </div>
            </div>

            <span className="text-[40px] font-bold text-white">{build.price.toLocaleString()} DT</span>

            {/* Key specs */}
            <div className="grid grid-cols-2 gap-3">
              {build.specs.slice(0, 4).map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 flex flex-col gap-1"
                >
                  <span className="text-[#a0a0a0] text-xs uppercase tracking-wider">{label}</span>
                  <span className="text-white text-sm font-medium leading-snug">{value}</span>
                </div>
              ))}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-green-400" />
              <span className="text-green-400 text-sm font-medium">{t.builds_detail.inStock}</span>
              <span className="text-[#a0a0a0] text-sm">— {t.builds_detail.shipsIn}</span>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <a
                href="/cart"
                className="flex-1 h-[52px] rounded-2xl flex items-center justify-center text-[#0a0a0a] text-base font-medium"
                style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
              >
                {t.builds_detail.buy}
              </a>
              <a
                href="/builder"
                className="h-[52px] px-6 rounded-2xl flex items-center border-[1.6px] border-[#00f5ff] text-[#00f5ff] text-base font-medium hover:bg-[#00f5ff]/10 transition-colors"
              >
                {t.builds_detail.customize}
              </a>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              {[
                { label: t.builds_detail.warranty, icon: "🛡️" },
                { label: t.builds_detail.freeDelivery, icon: "🚚" },
                { label: t.builds_detail.expertSupport, icon: "💬" },
              ].map(({ label, icon }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-[#a0a0a0] text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full specs + benchmarks + features */}
        <div className="grid grid-cols-3 gap-6">
          {/* Full specs */}
          <div className="col-span-1 bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-white text-xl font-medium">{t.builds_detail.fullSpecs}</h2>
            <div className="flex flex-col gap-3">
              {build.specs.map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm gap-4">
                  <span className="text-[#a0a0a0] shrink-0">{label}</span>
                  <span className="text-white text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmarks */}
          <div className="col-span-1 bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-white text-xl font-medium">{t.builds_detail.benchmarks}</h2>
            <div className="flex flex-col gap-5">
              {build.benchmarks.map(({ game, fps }) => (
                <div key={game} className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#a0a0a0] leading-snug">{game}</span>
                    <span className="text-white font-bold shrink-0 ml-2">{fps} FPS</span>
                  </div>
                  <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.round((fps / maxFps) * 100)}%`, background: GRADIENT }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What's included */}
          <div className="col-span-1 bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-white text-xl font-medium">{t.builds_detail.whatsIncluded}</h2>
            <div className="flex flex-col gap-3">
              {build.features.map((feat) => (
                <div key={feat} className="flex items-start gap-3">
                  <span
                    className="size-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[#0a0a0a] text-xs font-bold"
                    style={{ background: GRADIENT }}
                  >
                    ✓
                  </span>
                  <span className="text-[#a0a0a0] text-sm leading-6">{feat}</span>
                </div>
              ))}
            </div>
            <a
              href="/cart"
              className="mt-auto h-12 rounded-2xl flex items-center justify-center text-[#0a0a0a] text-base font-medium"
              style={{ background: GRADIENT }}
            >
              {t.builds_detail.buy}
            </a>
          </div>
        </div>

        {/* Reviews */}
        <div className="flex flex-col gap-6">
          <h2 className="text-white text-2xl font-medium">{t.builds_detail.customerReviews}</h2>
          <div className="flex flex-col gap-4">
            {REVIEWS.map(({ author, rating, date, body }) => (
              <div key={author} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-base font-medium">{author}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rating }).map((_, i) => (
                        <span key={i} className="text-[#00f5ff] text-sm">★</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[#a0a0a0] text-sm">{date}</span>
                </div>
                <p className="text-[#a0a0a0] text-sm leading-6">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related builds */}
        <div className="flex flex-col gap-6 pt-4 border-t border-[rgba(255,255,255,0.08)]">
          <h2 className="text-white text-2xl font-medium">{t.builds_detail.otherBuilds}</h2>
          <div className="flex gap-6">
            {RELATED_BUILDS.map(({ id: bid, name, price, badge, img }) => (
              <a
                key={bid}
                href={`/builds/${bid}`}
                className="flex-1 bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors group"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span
                    className="absolute top-3 left-3 text-[10px] font-bold text-[#0a0a0a] px-2 py-0.5 rounded"
                    style={{ background: GRADIENT }}
                  >
                    {badge}
                  </span>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-base font-medium">{name}</h3>
                    <span className="text-white text-xl font-bold">{price.toLocaleString()} DT</span>
                  </div>
                  <span className="text-[#00f5ff] text-sm font-medium">{t.builds_detail.view}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
