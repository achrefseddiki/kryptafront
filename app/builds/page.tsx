import PageWrapper from "../components/PageWrapper";
import { GRADIENT, ASSETS } from "../lib/assets";
import { api } from "../lib/api";

export default async function BuildsPage() {
  const builds = await api.kryptaBuilds.list().catch(() => []);

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
          <a href="/" className="hover:text-white transition-colors">Accueil</a>
          <span className="text-white/20">/</span>
          <span className="text-white">Gaming Builds</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Gaming Builds By KRYPTA</h1>
          <p className="text-base lg:text-xl text-[#a0a0a0] max-w-[640px]">
            Configurations pre-assemblées et optimisées par nos experts
          </p>
        </div>

        {/* Build Your Custom PC promo card */}
        <div
          className="rounded-2xl p-6 lg:p-8 border border-[rgba(0,245,255,0.2)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.07) 0%, rgba(30,58,255,0.07) 100%)" }}
        >
          <div className="flex flex-col gap-4">
            <span
              className="self-start text-xs font-bold px-3 py-1 rounded-full text-[#0a0a0a]"
              style={{ background: GRADIENT }}
            >
              KryptaBar
            </span>
            <h2 className="text-white text-xl lg:text-2xl font-bold">Build Your Custom PC</h2>
            <p className="text-[#a0a0a0] text-sm max-w-[480px]">
              Find the perfect gaming PC for your needs. Real-time compatibility, score and performance analysis.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "AI-powered assistant",
                "Compatibility tools",
                "Real-time PC Viewer",
                "Chatbot IA",
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-[#a0a0a0] text-sm">
                  <span className="size-1.5 rounded-full bg-[#00f5ff] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <a
            href="/builder"
            className="h-12 px-8 rounded-2xl flex items-center text-[#0a0a0a] text-sm font-semibold shrink-0"
            style={{ background: GRADIENT }}
          >
            Start Building →
          </a>
        </div>

        {/* Builds grid */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-xl font-semibold">KRYPTA Builds</h2>
            <span className="text-[#555] text-sm">{builds.length} configuration{builds.length !== 1 ? "s" : ""}</span>
          </div>

          {builds.length === 0 ? (
            <div className="text-[#555] text-sm py-16 text-center">
              No builds available yet — check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {builds.map(build => {
                const topSpecs = build.specs.slice(0, 4);
                return (
                  <div
                    key={build.id}
                    className="bg-[#1a1a1a] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/20 transition-colors flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-[220px] lg:h-[260px] overflow-hidden bg-[#111]">
                      {build.img ? (
                        <img src={build.img} alt={build.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#333] text-sm">No image</div>
                      )}
                      {build.badge && (
                        <span
                          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-[#0a0a0a]"
                          style={{ background: GRADIENT }}
                        >
                          {build.badge}
                        </span>
                      )}
                      {!build.inStock && (
                        <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-black/60 text-[#888]">
                          Out of stock
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5 flex flex-col gap-4 flex-1">
                      <div>
                        <h3 className="text-white text-lg font-semibold">{build.name}</h3>
                        {build.tagline && <p className="text-[#a0a0a0] text-sm mt-1">{build.tagline}</p>}
                      </div>

                      {/* Spec chips */}
                      {topSpecs.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {topSpecs.map(s => (
                            <span
                              key={s.label}
                              className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[#a0a0a0]"
                            >
                              {s.value}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Price + actions */}
                      <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-white/[0.06]">
                        <span
                          className="text-2xl font-bold"
                          style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                        >
                          {build.price.toLocaleString()} TND
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`/builds/${build.id}`}
                            className="flex-1 h-9 rounded-xl text-[#0a0a0a] text-sm font-semibold flex items-center justify-center"
                            style={{ background: GRADIENT }}
                          >
                            Add
                          </a>
                          <a
                            href={`/builds/${build.id}`}
                            className="h-9 px-4 rounded-xl border border-white/[0.15] text-white text-sm hover:border-white/30 transition-colors flex items-center"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
