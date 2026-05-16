import PageWrapper from "../../components/PageWrapper";
import { GRADIENT } from "../../lib/assets";
import { GPU_PRODUCTS, PC_CATEGORIES } from "../../lib/data";

const CATEGORY_LABELS: Record<string, { title: string; desc: string }> = {
  gpus: { title: "Graphics Cards (GPUs)", desc: "Power your gaming visuals with the latest NVIDIA and AMD GPUs." },
  cpus: { title: "Processors (CPUs)", desc: "Intel and AMD processors for every build." },
  ram: { title: "Memory (RAM)", desc: "DDR5 and DDR4 memory kits from top brands." },
  storage: { title: "Storage (NVMe & SSD)", desc: "Gen4 and Gen5 NVMe drives for lightning-fast load times." },
  motherboards: { title: "Motherboards", desc: "Intel and AMD compatible boards for all form factors." },
  power: { title: "Power Supplies", desc: "80+ Gold and Platinum PSUs to power your build." },
  cooling: { title: "Cooling", desc: "Air coolers and AIO liquid cooling systems." },
  cases: { title: "Cases", desc: "ATX, mATX, and ITX cases in every style." },
};

const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Rated"];
const BRANDS = ["NVIDIA", "AMD", "Intel", "ASUS", "Gigabyte", "MSI", "Sapphire", "EVGA"];

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const meta = CATEGORY_LABELS[category] ?? { title: category.toUpperCase(), desc: "Browse our selection." };

  return (
    <PageWrapper>
      <div className="px-24 flex flex-col gap-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span className="text-white/20">/</span>
          <a href="/products" className="hover:text-white transition-colors">PC Components</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{meta.title}</span>
        </nav>

        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold text-white tracking-[-0.96px]">{meta.title}</h1>
          <p className="text-2xl font-normal text-[#a0a0a0]">{meta.desc}</p>
        </div>
      </div>

      <div className="px-24 pb-16">
        <div className="flex gap-8">
          {/* Filters sidebar */}
          <aside className="w-[240px] shrink-0 flex flex-col gap-8">
            {/* Price range */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-sm font-medium uppercase tracking-wider">Price Range</h3>
              <div className="flex flex-col gap-2">
                {["Under $300", "$300 – $600", "$600 – $1000", "$1000 – $2000", "Over $2000"].map((r) => (
                  <label key={r} className="flex items-center gap-3 cursor-pointer group">
                    <span className="size-4 border border-[rgba(255,255,255,0.2)] rounded flex items-center justify-center group-hover:border-[#00f5ff] transition-colors" />
                    <span className="text-[#a0a0a0] text-sm group-hover:text-white transition-colors">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-sm font-medium uppercase tracking-wider">Brand</h3>
              <div className="flex flex-col gap-2">
                {BRANDS.map((b) => (
                  <label key={b} className="flex items-center gap-3 cursor-pointer group">
                    <span className="size-4 border border-[rgba(255,255,255,0.2)] rounded flex items-center justify-center group-hover:border-[#00f5ff] transition-colors" />
                    <span className="text-[#a0a0a0] text-sm group-hover:text-white transition-colors">{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Apply button */}
            <button
              className="h-11 rounded-2xl text-[#0a0a0a] text-sm font-medium"
              style={{ background: GRADIENT }}
            >
              Apply Filters
            </button>
          </aside>

          {/* Product grid */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Sort bar */}
            <div className="flex items-center justify-between">
              <p className="text-[#a0a0a0] text-sm">{GPU_PRODUCTS.length} products found</p>
              <div className="flex items-center gap-3">
                <span className="text-[#a0a0a0] text-sm">Sort by:</span>
                <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-2 text-white text-sm">
                  Featured
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-6">
              {GPU_PRODUCTS.map(({ id, name, brand, price, oldPrice, img, badge, specs }) => (
                <a
                  key={id}
                  href={`/products/${category}/${id}`}
                  className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors group"
                >
                  <div className="relative w-full h-[200px] overflow-hidden bg-[#111]">
                    <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {badge && (
                      <span
                        className="absolute top-3 left-3 text-[10px] font-bold text-[#0a0a0a] px-2 py-0.5 rounded"
                        style={{ background: GRADIENT }}
                      >
                        {badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-3">
                    <div>
                      <p className="text-[#a0a0a0] text-xs font-normal uppercase tracking-wider">{brand}</p>
                      <h3 className="text-white text-base font-medium leading-tight mt-1">{name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {specs.map((s) => (
                        <span key={s} className="text-[10px] text-[#a0a0a0] border border-[rgba(255,255,255,0.1)] rounded px-1.5 py-0.5">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-white text-xl font-bold">${price.toLocaleString()}</span>
                      {oldPrice && <span className="text-[#a0a0a0] text-sm line-through">${oldPrice.toLocaleString()}</span>}
                    </div>
                    <button
                      className="w-full h-10 rounded-xl text-[#0a0a0a] text-sm font-medium"
                      style={{ background: GRADIENT }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
