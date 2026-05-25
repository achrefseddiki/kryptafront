import { notFound } from "next/navigation";
import PageWrapper from "../../components/PageWrapper";
import { GRADIENT } from "../../lib/assets";
import { api } from "../../lib/api";
import ProductImageGallery from "../../components/ProductImageGallery";
import AddBuildToCart from "./AddBuildToCart";

const SPEC_ICONS: Record<string, React.ReactNode> = {
  case: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <g clipPath="url(#si-case-f)">
        <path d="M11.9173 6.5H1.08398" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.95273 2.76824L1.08398 6.50033V9.75033C1.08398 10.0376 1.19812 10.3132 1.40129 10.5164C1.60445 10.7195 1.88 10.8337 2.16732 10.8337H10.834C11.1213 10.8337 11.3969 10.7195 11.6 10.5164C11.8032 10.3132 11.9173 10.0376 11.9173 9.75033V6.50033L10.0486 2.76824C9.95888 2.58775 9.82062 2.43586 9.64933 2.32964C9.47805 2.22343 9.28053 2.1671 9.07898 2.16699H3.92232C3.72077 2.1671 3.52325 2.22343 3.35197 2.32964C3.18068 2.43586 3.04242 2.58775 2.95273 2.76824Z" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.25 8.66699H3.255" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.41797 8.66699H5.42297" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs><clipPath id="si-case-f"><rect width="13" height="13" fill="white"/></clipPath></defs>
    </svg>
  ),
  gpu: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <g clipPath="url(#si-gpu-f)">
        <path d="M3.24805 10.292V8.66699" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.41602 10.292V8.66699" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.58203 10.292V8.66699" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.74805 10.292V8.66699" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.33203 5.95833V4.875" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.66602 5.95833V4.875" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.49805 5.95833V4.875" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.08203 8.125H11.9154" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.08203 3.79232C1.08203 3.505 1.19617 3.22945 1.39933 3.02629C1.6025 2.82312 1.87805 2.70898 2.16536 2.70898H10.832C11.1193 2.70898 11.3949 2.82312 11.5981 3.02629C11.8012 3.22945 11.9154 3.505 11.9154 3.79232V4.38815C11.691 4.45424 11.494 4.59118 11.3539 4.77849C11.2138 4.96581 11.1381 5.19343 11.1381 5.42734C11.1381 5.66125 11.2138 5.88887 11.3539 6.07618C11.494 6.2635 11.691 6.40043 11.9154 6.46653V9.20898C11.9154 9.4963 11.8012 9.77185 11.5981 9.97502C11.3949 10.1782 11.1193 10.2923 10.832 10.2923H2.16536C1.87805 10.2923 1.6025 10.1782 1.39933 9.97502C1.19617 9.77185 1.08203 9.4963 1.08203 9.20898V6.44648C1.30641 6.38039 1.50336 6.24345 1.64346 6.05614C1.78355 5.86883 1.85926 5.6412 1.85926 5.4073C1.85926 5.17339 1.78355 4.94577 1.64346 4.75845C1.50336 4.57114 1.30641 4.4342 1.08203 4.36811V3.79232Z" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs><clipPath id="si-gpu-f"><rect width="13" height="13" fill="white"/></clipPath></defs>
    </svg>
  ),
  bolt: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <g clipPath="url(#si-bolt-f)">
        <path d="M2.16656 7.58442C2.06406 7.58477 1.96356 7.55603 1.87674 7.50153C1.78993 7.44704 1.72035 7.36903 1.67611 7.27657C1.63186 7.1841 1.61476 7.08099 1.62679 6.97919C1.63882 6.8774 1.67948 6.7811 1.74406 6.7015L7.10656 1.1765C7.14679 1.13007 7.2016 1.09869 7.26201 1.08752C7.32242 1.07635 7.38483 1.08605 7.439 1.11502C7.49317 1.144 7.53588 1.19053 7.56012 1.24698C7.58436 1.30342 7.58869 1.36644 7.57239 1.42567L6.53239 4.6865C6.50173 4.76858 6.49143 4.85687 6.50238 4.9438C6.51333 5.03073 6.54521 5.1137 6.59528 5.18561C6.64534 5.25751 6.7121 5.3162 6.78984 5.35663C6.86757 5.39706 6.95394 5.41804 7.04156 5.41775H10.8332C10.9357 5.4174 11.0362 5.44614 11.123 5.50064C11.2099 5.55513 11.2794 5.63314 11.3237 5.7256C11.3679 5.81807 11.385 5.92118 11.373 6.02298C11.361 6.12477 11.3203 6.22107 11.2557 6.30067L5.89323 11.8257C5.853 11.8721 5.79819 11.9035 5.73778 11.9146C5.67737 11.9258 5.61496 11.9161 5.56079 11.8871C5.50662 11.8582 5.46391 11.8116 5.43967 11.7552C5.41543 11.6987 5.4111 11.6357 5.42739 11.5765L6.46739 8.31567C6.49806 8.23359 6.50836 8.1453 6.49741 8.05837C6.48646 7.97144 6.45458 7.88847 6.40451 7.81656C6.35445 7.74466 6.28768 7.68597 6.20995 7.64554C6.13222 7.60511 6.04584 7.58413 5.95823 7.58442H2.16656Z" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs><clipPath id="si-bolt-f"><rect width="13" height="13" fill="white"/></clipPath></defs>
    </svg>
  ),
  cpu: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <g clipPath="url(#si-cpu-f)">
        <path d="M9.7513 2.16699H3.2513C2.65299 2.16699 2.16797 2.65202 2.16797 3.25033V9.75033C2.16797 10.3486 2.65299 10.8337 3.2513 10.8337H9.7513C10.3496 10.8337 10.8346 10.3486 10.8346 9.75033V3.25033C10.8346 2.65202 10.3496 2.16699 9.7513 2.16699Z" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.58333 4.875H5.41667C5.11751 4.875 4.875 5.11751 4.875 5.41667V7.58333C4.875 7.88249 5.11751 8.125 5.41667 8.125H7.58333C7.88249 8.125 8.125 7.88249 8.125 7.58333V5.41667C8.125 5.11751 7.88249 4.875 7.58333 4.875Z" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.125 1.08398V2.16732" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.125 10.834V11.9173" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.08398 8.125H2.16732" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.08398 4.875H2.16732" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.834 8.125H11.9173" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.834 4.875H11.9173" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.875 1.08398V2.16732" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.875 10.834V11.9173" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs><clipPath id="si-cpu-f"><rect width="13" height="13" fill="white"/></clipPath></defs>
    </svg>
  ),
  cooler: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <g clipPath="url(#si-cooler-f)">
        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.08333"/>
        <circle cx="6.5" cy="6.5" r="1.3" stroke="currentColor" strokeWidth="1.08333"/>
        <path d="M7.2 5.3 C7.8 4 9.1 4.3 9.2 5.5" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round"/>
        <path d="M7.7 7.2 C9 7.8 8.7 9.1 7.5 9.2" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round"/>
        <path d="M5.8 7.7 C5.2 9 3.9 8.7 3.8 7.5" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round"/>
        <path d="M5.3 5.8 C4 5.2 4.3 3.9 5.5 3.8" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round"/>
      </g>
      <defs><clipPath id="si-cooler-f"><rect width="13" height="13" fill="white"/></clipPath></defs>
    </svg>
  ),
  motherboard: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <g clipPath="url(#si-motherboard-f)">
        <rect x="1.5" y="2" width="10" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.08333"/>
        <line x1="3" y1="4.5" x2="9.5" y2="4.5" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round"/>
        <line x1="3" y1="6.5" x2="9.5" y2="6.5" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round"/>
        <line x1="3" y1="8.5" x2="9.5" y2="8.5" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round"/>
        <rect x="8.5" y="5.5" width="1.5" height="1.5" rx="0.3" stroke="currentColor" strokeWidth="1.08333"/>
      </g>
      <defs><clipPath id="si-motherboard-f"><rect width="13" height="13" fill="white"/></clipPath></defs>
    </svg>
  ),
  psu: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <g clipPath="url(#si-psu-f)">
        <rect x="1.5" y="3" width="10" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.08333"/>
        <circle cx="5" cy="6.5" r="1.8" stroke="currentColor" strokeWidth="1.08333"/>
        <line x1="8.5" y1="4.5" x2="10.5" y2="4.5" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round"/>
        <line x1="8.5" y1="5.8" x2="10.5" y2="5.8" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round"/>
        <line x1="8.5" y1="7.1" x2="10.5" y2="7.1" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round"/>
        <line x1="8.5" y1="8.4" x2="10.5" y2="8.4" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round"/>
      </g>
      <defs><clipPath id="si-psu-f"><rect width="13" height="13" fill="white"/></clipPath></defs>
    </svg>
  ),
};

export default async function BuildDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const build = await api.kryptaBuilds.get(id).catch(() => null);
  if (!build) notFound();

  const mainImg = build.img ?? "";
  const hasPerformance = build.fps1080 || build.fps1440 || build.fps4k;
  const maxFps = Math.max(build.fps1080 ?? 0, build.fps1440 ?? 0, build.fps4k ?? 0);

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
          <a href="/" className="hover:text-white transition-colors">Accueil</a>
          <span className="text-white/20">/</span>
          <a href="/builds" className="hover:text-white transition-colors">Gaming Builds</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{build.name}</span>
        </nav>

        {/* Hero title */}
        <div className="flex flex-col gap-2">
          {build.badge && (
            <span
              className="self-start text-xs font-bold px-3 py-1 rounded-full text-[#0a0a0a]"
              style={{ background: GRADIENT }}
            >
              {build.badge}
            </span>
          )}
          <h1 className="text-2xl lg:text-4xl font-bold text-white">{build.name}</h1>
          {build.tagline && <p className="text-[#a0a0a0] text-base lg:text-lg">{build.tagline}</p>}
        </div>

        {/* Gallery */}
        {mainImg ? (
          <ProductImageGallery mainImg={mainImg} images={build.images} name={build.name} />
        ) : (
          <div className="w-full h-[320px] lg:h-[480px] bg-[#1a1a1a] border border-white/10 rounded-2xl flex items-center justify-center text-[#333] text-sm">
            No image
          </div>
        )}

        {/* Performance Metrics */}
        {hasPerformance && (
          <div className="bg-[#141414] border border-white/[0.07] rounded-2xl p-6 lg:p-8 flex flex-col gap-5">
            <h2 className="text-white text-xl font-bold">Performance Metrics</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "1080p Average", fps: build.fps1080, color: "text-green-400" },
                { label: "1440p Average", fps: build.fps1440, color: "text-[#00f5ff]" },
                { label: "4K Average",    fps: build.fps4k,   color: "text-orange-400" },
              ].map(({ label, fps, color }) => fps != null && (
                <div key={label} className="flex flex-col gap-1">
                  <span className={`text-3xl lg:text-5xl font-bold ${color}`}>{fps} FPS</span>
                  <span className="text-[#a0a0a0] text-xs lg:text-sm">{label}</span>
                  <div className="h-1 bg-white/[0.06] rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.round((fps / maxFps) * 100)}%`, background: GRADIENT }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complete Specifications */}
        {build.specs.length > 0 && (
          <div className="bg-[#141414] border border-white/[0.07] rounded-2xl p-6 lg:p-8 flex flex-col gap-5">
            <h2 className="text-white text-xl font-bold">Complete Specifications</h2>
            <div className="flex flex-col divide-y divide-white/[0.05]">
              {build.specs.map(({ label, value, icon }) => (
                <div key={label} className="flex items-center justify-between py-3 gap-4">
                  <div className="flex items-center gap-2.5 shrink-0 w-[160px]">
                    {icon && SPEC_ICONS[icon] ? (
                      <span className="text-[#00f5ff] shrink-0">{SPEC_ICONS[icon]}</span>
                    ) : null}
                    <span className="text-[#a0a0a0] text-sm">{label}</span>
                  </div>
                  <span className="text-white text-sm text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price + CTA */}
        <div className="bg-[#141414] border border-white/[0.07] rounded-2xl p-6 lg:p-8 flex flex-col gap-5">
          <div className="flex items-end gap-3">
            <span className="text-white text-3xl lg:text-4xl font-bold">{build.price.toLocaleString()}</span>
            <span className="text-[#a0a0a0] text-base mb-1">TND</span>
          </div>

          {/* Features */}
          {build.features.length > 0 && (
            <ul className="flex flex-col gap-2">
              {build.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-[#a0a0a0] text-sm">
                  <span
                    className="size-4 rounded-full flex items-center justify-center shrink-0 text-[#0a0a0a] text-[10px] font-bold"
                    style={{ background: GRADIENT }}
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          <p className="text-[#555] text-xs">Payment Options: Financing and installment options available</p>

          <AddBuildToCart build={build} />

          <a href="/support" className="text-[#00f5ff] text-sm hover:underline self-start">
            Need expert advice? Contact us →
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
