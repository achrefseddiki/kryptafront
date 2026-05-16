import PageWrapper from "../../../components/PageWrapper";
import { GRADIENT } from "../../../lib/assets";
import { GPU_PRODUCTS } from "../../../lib/data";

const REVIEWS = [
  { author: "Ahmed B.", rating: 5, date: "May 8, 2026", body: "Incredible card, runs everything at 4K ultra settings. Worth every dinar." },
  { author: "Sami K.", rating: 5, date: "April 30, 2026", body: "Fast delivery from Krypta, card was perfectly packaged. Performance is insane." },
  { author: "Rami L.", rating: 4, date: "April 22, 2026", body: "Excellent GPU, temps are great with proper airflow. Highly recommend." },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  const product = GPU_PRODUCTS.find((p) => p.id === id) ?? GPU_PRODUCTS[0];

  return (
    <PageWrapper>
      <div className="px-24 flex flex-col gap-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span className="text-white/20">/</span>
          <a href="/products" className="hover:text-white transition-colors">PC Components</a>
          <span className="text-white/20">/</span>
          <a href={`/products/${category}`} className="capitalize hover:text-white transition-colors">{category}</a>
          <span className="text-white/20">/</span>
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product layout */}
        <div className="flex gap-12">
          {/* Image gallery */}
          <div className="flex gap-4 shrink-0">
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="size-[72px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-xl overflow-hidden cursor-pointer hover:border-[#00f5ff]/50 transition-colors">
                  <img src={product.img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="w-[480px] h-[480px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Product info */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-[#a0a0a0] text-sm uppercase tracking-widest font-medium">{product.brand}</p>
              <h1 className="text-[32px] font-bold text-white leading-tight">{product.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className="text-[#00f5ff] text-lg">★</span>
                ))}
                <span className="text-[#a0a0a0] text-sm ml-1">({REVIEWS.length} reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[40px] font-bold text-white">${product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="text-[#a0a0a0] text-xl line-through">${product.oldPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Specs pills */}
            <div className="flex flex-wrap gap-2">
              {product.specs.map((s) => (
                <span key={s} className="border border-[rgba(255,255,255,0.15)] rounded-xl px-4 py-2 text-sm text-[#a0a0a0]">
                  {s}
                </span>
              ))}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-green-400" />
              <span className="text-green-400 text-sm font-medium">In Stock</span>
              <span className="text-[#a0a0a0] text-sm">— Ready to ship</span>
            </div>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-xl">
                <button className="w-11 h-11 flex items-center justify-center text-white text-xl hover:text-[#00f5ff] transition-colors">−</button>
                <span className="text-white text-base font-medium px-4">1</span>
                <button className="w-11 h-11 flex items-center justify-center text-white text-xl hover:text-[#00f5ff] transition-colors">+</button>
              </div>
              <a
                href="/cart"
                className="flex-1 h-[52px] rounded-2xl flex items-center justify-center text-[#0a0a0a] text-base font-medium"
                style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
              >
                Add to Cart
              </a>
              <a
                href="/builder"
                className="h-[52px] px-6 rounded-2xl flex items-center border-[1.6px] border-[#00f5ff] text-[#00f5ff] text-base font-medium hover:bg-[#00f5ff]/10 transition-colors"
              >
                Add to Build
              </a>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              {[
                { label: "2-Year Warranty", icon: "🛡️" },
                { label: "Free Delivery", icon: "🚚" },
                { label: "Expert Support", icon: "💬" },
              ].map(({ label, icon }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-[#a0a0a0] text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description | Reviews */}
        <div className="flex flex-col gap-8 pb-16">
          <div className="flex gap-8 border-b border-[rgba(255,255,255,0.08)]">
            {["Description", "Specifications", "Reviews"].map((tab, i) => (
              <button
                key={tab}
                className={`pb-4 text-base font-medium transition-colors relative ${
                  i === 0 ? "text-white" : "text-[#a0a0a0] hover:text-white"
                }`}
              >
                {tab}
                {i === 0 && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: GRADIENT }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Description content */}
          <div className="flex flex-col gap-4 max-w-[800px]">
            <p className="text-[#a0a0a0] text-base leading-[26px]">
              {`The ${product.name} represents the pinnacle of GPU engineering. Built on the latest architecture, it delivers unparalleled performance for 4K gaming, ray tracing, and AI-accelerated workloads. Whether you're a competitive gamer demanding the highest frame rates or a content creator needing GPU-accelerated rendering, this card handles every task with ease.`}
            </p>
            <p className="text-[#a0a0a0] text-base leading-[26px]">
              {`Compatible with the latest PCIe slots and featuring advanced thermal management, the ${product.name} maintains optimal temperatures even under sustained load. Its comprehensive driver support ensures compatibility with all major game titles and creative applications.`}
            </p>
          </div>

          {/* Reviews */}
          <div className="flex flex-col gap-6 mt-4">
            <h3 className="text-white text-2xl font-medium">Customer Reviews</h3>
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
      </div>
    </PageWrapper>
  );
}
