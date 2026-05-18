import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { api } from "../lib/api";
import { getLocale, getDict } from "../lib/i18n";

export default async function BlogPage() {
  const [posts, locale] = await Promise.all([api.blogPosts.list(), getLocale()]);
  const t = getDict(locale);
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <PageWrapper>
      <div className="px-24 pb-16 flex flex-col gap-10">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{t.blog.breadcrumb}</span>
        </nav>

        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold text-white tracking-[-0.96px]">{t.blog.title}</h1>
            <p className="text-2xl font-normal text-[#a0a0a0] max-w-[600px]">{t.blog.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {t.blog.categories.map((cat, i) => (
            <button
              key={cat}
              className={`h-9 px-4 rounded-xl text-sm font-medium transition-colors ${
                i === 0
                  ? "text-[#0a0a0a]"
                  : "text-[#a0a0a0] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
              }`}
              style={i === 0 ? { background: GRADIENT } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {featured && (
          <a
            href={`/blog/${featured.slug}`}
            className="relative rounded-2xl overflow-hidden h-[400px] flex items-end group border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] transition-colors"
          >
            <img
              src={featured.img}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative p-8 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-lg text-[#0a0a0a]"
                  style={{ background: GRADIENT }}
                >
                  {t.blog.featured}
                </span>
                <span className="text-xs font-medium text-[#a0a0a0] bg-black/40 px-3 py-1 rounded-lg">
                  {featured.category}
                </span>
              </div>
              <h2 className="text-white text-3xl font-bold leading-tight max-w-[700px]">{featured.title}</h2>
              <p className="text-[#a0a0a0] text-base max-w-[600px] leading-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-[#a0a0a0] mt-1">
                <span>{new Date(featured.createdAt).toLocaleDateString(t.dateLocale, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </a>
        )}

        <div className="grid grid-cols-3 gap-6">
          {rest.map(({ slug, title, excerpt, category, readTime, img, createdAt }) => (
            <a
              key={slug}
              href={`/blog/${slug}`}
              className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors group flex flex-col"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className="absolute top-3 left-3 text-[10px] font-bold text-[#0a0a0a] px-2 py-0.5 rounded"
                  style={{ background: GRADIENT }}
                >
                  {category}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="text-white text-base font-medium leading-snug">{title}</h3>
                <p className="text-[#a0a0a0] text-sm leading-5 flex-1">{excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-[#a0a0a0] pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <span>{new Date(createdAt).toLocaleDateString(t.dateLocale, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{readTime}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div
          className="rounded-2xl p-10 border border-[rgba(1,245,255,0.2)] flex flex-col items-center gap-6 text-center"
          style={{ background: "linear-gradient(90deg, rgba(1,245,255,0.08), rgba(30,58,255,0.08))" }}
        >
          <h2 className="text-white text-[32px] font-bold">{t.blog.newsletter.title}</h2>
          <p className="text-[#a0a0a0] text-base max-w-[500px]">{t.blog.newsletter.subtitle}</p>
          <div className="flex gap-3 w-full max-w-[480px]">
            <input
              type="email"
              placeholder={t.blog.newsletter.placeholder}
              className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-3.5 text-white text-sm placeholder:text-[#a0a0a0] outline-none focus:border-[#00f5ff] transition-colors"
            />
            <button
              className="h-[52px] px-6 rounded-2xl text-[#0a0a0a] text-base font-medium whitespace-nowrap"
              style={{ background: GRADIENT }}
            >
              {t.blog.newsletter.cta}
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
