import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { api } from "../lib/api";
import type { Drop } from "../lib/types";

const STATUS_CONFIG = {
  live: { label: "Live Now", color: "text-green-400", dot: "bg-green-400" },
  sold_out: { label: "Sold Out", color: "text-red-400", dot: "bg-red-400" },
  upcoming: { label: "Coming Soon", color: "text-[#00f5ff]", dot: "bg-[#00f5ff]" },
};

function formatCountdown(endsAt: string): string {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return "Ended";
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${d}d ${h}h ${m}m`;
}

export default async function DropsPage() {
  const drops: Drop[] = await api.drops.list();

  return (
    <PageWrapper>
      <div className="px-24 pb-16 flex flex-col gap-10">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span className="text-white/20">/</span>
          <span className="text-white">Krypta Drops</span>
        </nav>

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold text-white tracking-[-0.96px]">Krypta Drops</h1>
          <p className="text-2xl font-normal text-[#a0a0a0] max-w-[700px]">
            Limited edition releases and exclusive collaborations. Once they&apos;re gone, they&apos;re gone.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {drops.map(({ id, title, description, price, available, total, img, status, endsAt }) => {
            const cfg = STATUS_CONFIG[status];
            const pct = status === "sold_out" ? 100 : Math.round(((total - available) / total) * 100);

            return (
              <div key={id} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-colors">
                <div className="relative h-[260px] overflow-hidden">
                  <img src={img} alt={title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-1.5">
                    <span className={`size-2 rounded-full ${cfg.dot} ${status === "live" ? "animate-pulse" : ""}`} />
                    <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  {endsAt && status === "live" && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-1.5">
                      <span className="text-white text-xs font-medium">⏱ {formatCountdown(endsAt)}</span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div>
                    <h3 className="text-white text-xl font-medium leading-tight">{title}</h3>
                    <p className="text-[#a0a0a0] text-sm mt-2 leading-5">{description}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs text-[#a0a0a0]">
                      <span>{total - available} / {total} claimed</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: GRADIENT }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white text-2xl font-bold">${price}</span>
                    <button
                      disabled={status !== "live"}
                      className={`h-11 px-6 rounded-2xl text-base font-medium transition-colors ${
                        status === "live"
                          ? "text-[#0a0a0a]"
                          : "text-[#a0a0a0] bg-[rgba(255,255,255,0.05)] cursor-not-allowed"
                      }`}
                      style={status === "live" ? { background: GRADIENT } : {}}
                    >
                      {status === "live" ? "Claim Now" : status === "sold_out" ? "Sold Out" : "Notify Me"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="rounded-2xl p-10 border border-[rgba(1,245,255,0.2)] flex flex-col items-center gap-6 text-center"
          style={{ background: "linear-gradient(90deg, rgba(1,245,255,0.08), rgba(30,58,255,0.08))" }}
        >
          <h2 className="text-white text-[32px] font-bold">Never Miss a Drop</h2>
          <p className="text-[#a0a0a0] text-base max-w-[500px]">
            Join the KRYPTA community and get notified first when new drops go live.
          </p>
          <div className="flex gap-3 w-full max-w-[480px]">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-3.5 text-white text-sm placeholder:text-[#a0a0a0] outline-none focus:border-[#00f5ff] transition-colors"
            />
            <button
              className="h-[52px] px-6 rounded-2xl text-[#0a0a0a] text-base font-medium whitespace-nowrap"
              style={{ background: GRADIENT }}
            >
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
