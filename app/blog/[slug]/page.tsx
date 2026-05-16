import { notFound } from "next/navigation";
import PageWrapper from "../../components/PageWrapper";
import { GRADIENT } from "../../lib/assets";
import { api } from "../../lib/api";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await api.blogPosts.get(slug);
  } catch {
    notFound();
  }

  const allPosts = await api.blogPosts.list().catch(() => []);
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <PageWrapper>
      <div className="px-24 pb-16 flex flex-col gap-10">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span className="text-white/20">/</span>
          <a href="/blog" className="hover:text-white transition-colors">Blog</a>
          <span className="text-white/20">/</span>
          <span className="text-white truncate max-w-[240px]">{post.title}</span>
        </nav>

        <div className="flex gap-12 items-start">
          <article className="flex-1 flex flex-col gap-8 min-w-0">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-lg text-[#0a0a0a]"
                  style={{ background: GRADIENT }}
                >
                  {post.category}
                </span>
                <span className="text-[#a0a0a0] text-sm">{formattedDate}</span>
                <span className="text-[#a0a0a0] text-sm">·</span>
                <span className="text-[#a0a0a0] text-sm">{post.readTime}</span>
              </div>
              <h1 className="text-[40px] font-bold text-white leading-tight tracking-[-0.64px]">{post.title}</h1>
              <p className="text-xl text-[#a0a0a0] leading-8">{post.excerpt}</p>
            </div>

            <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)]">
              <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col gap-6 text-[#a0a0a0] text-base leading-8">
              {post.content ? (
                <p>{post.content}</p>
              ) : (
                <>
                  <p>
                    {`When it comes to ${post.category.toLowerCase()} in the gaming space, there's always more to uncover than the spec sheet suggests. The ${post.title.split(":")[0]} is no exception — it represents a significant step forward in what gamers and PC enthusiasts can expect from modern hardware.`}
                  </p>

                  <h2 className="text-white text-2xl font-bold mt-2">Performance Overview</h2>
                  <p>
                    We ran an extensive battery of tests across a range of scenarios: synthetic benchmarks, real-world gaming at 1080p, 1440p, and 4K, and a selection of creative workloads. The results paint a clear picture of where this hardware excels and where it shows limitations.
                  </p>

                  <h2 className="text-white text-2xl font-bold mt-2">Thermals & Power</h2>
                  <p>
                    Thermal management is an area where this hardware impresses. Under sustained load, temperatures remained well within acceptable ranges. The thermal solution is well-engineered, striking a balance between cooling efficiency and noise output.
                  </p>

                  <h2 className="text-white text-2xl font-bold mt-2">Value for Tunisian Gamers</h2>
                  <p>
                    Pricing in Tunisia reflects import costs and availability. At Krypta, we work directly with distributors to ensure competitive pricing without compromising on authenticity or warranty coverage.
                  </p>

                  <h2 className="text-white text-2xl font-bold mt-2">Verdict</h2>
                  <p>
                    This is a product that delivers on its promises. Whether you're upgrading an aging build or building fresh, it earns a clear recommendation from the Krypta team.
                  </p>
                </>
              )}

              <div
                className="rounded-2xl p-6 border border-[rgba(1,245,255,0.2)] flex flex-col gap-3"
                style={{ background: "linear-gradient(90deg, rgba(1,245,255,0.06), rgba(30,58,255,0.06))" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold text-lg">Krypta Verdict</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className="text-[#00f5ff]">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-[#a0a0a0] text-sm leading-6">
                  A top-tier choice for serious gamers and builders in Tunisia. Exceptional performance, solid thermals, and available in-stock at Krypta with full warranty coverage.
                </p>
                <a
                  href="/products"
                  className="self-start h-10 px-5 rounded-xl flex items-center text-[#0a0a0a] text-sm font-medium mt-1"
                  style={{ background: GRADIENT }}
                >
                  Shop Now at Krypta →
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-[rgba(255,255,255,0.08)]">
              <div
                className="size-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{ background: GRADIENT }}
              >
                K
              </div>
              <div>
                <p className="text-white text-sm font-medium">Krypta Editorial Team</p>
                <p className="text-[#a0a0a0] text-xs mt-0.5">Hardware experts & gaming enthusiasts based in Tunisia</p>
              </div>
            </div>
          </article>

          <aside className="w-[300px] shrink-0 flex flex-col gap-6 sticky top-[220px]">
            <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 flex flex-col gap-4">
              <h3 className="text-white text-sm font-medium uppercase tracking-wider">In This Article</h3>
              <div className="flex flex-col gap-2">
                {["Performance Overview", "Thermals & Power", "Value for Tunisian Gamers", "Verdict"].map((section) => (
                  <span key={section} className="text-[#a0a0a0] text-sm hover:text-[#00f5ff] cursor-pointer transition-colors">
                    {section}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 flex flex-col gap-3">
              <h3 className="text-white text-sm font-medium uppercase tracking-wider">Share Article</h3>
              <div className="flex gap-2">
                {["Twitter / X", "Facebook", "Copy Link"].map((platform) => (
                  <button
                    key={platform}
                    className="flex-1 h-9 rounded-xl text-xs font-medium text-[#a0a0a0] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white transition-colors"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-5 border border-[rgba(1,245,255,0.2)] flex flex-col gap-3"
              style={{ background: "linear-gradient(90deg, rgba(1,245,255,0.08), rgba(30,58,255,0.08))" }}
            >
              <p className="text-white text-sm font-medium">Ready to build?</p>
              <p className="text-[#a0a0a0] text-xs leading-5">Use our KryptaBar tool to configure your perfect gaming PC.</p>
              <a href="/builder" className="text-[#00f5ff] text-sm font-medium hover:underline">
                Launch PC Builder →
              </a>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="flex flex-col gap-6 pt-8 border-t border-[rgba(255,255,255,0.08)]">
            <h2 className="text-2xl font-bold text-white">Related Articles</h2>
            <div className="grid grid-cols-3 gap-6">
              {related.map(({ slug: relSlug, title, category, readTime, img, createdAt }) => (
                <a
                  key={relSlug}
                  href={`/blog/${relSlug}`}
                  className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors group"
                >
                  <div className="relative h-[160px] overflow-hidden">
                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span
                      className="absolute top-3 left-3 text-[10px] font-bold text-[#0a0a0a] px-2 py-0.5 rounded"
                      style={{ background: GRADIENT }}
                    >
                      {category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-white text-sm font-medium leading-snug">{title}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#a0a0a0]">
                      <span>{new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <span>·</span>
                      <span>{readTime}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
