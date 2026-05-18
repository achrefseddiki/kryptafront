"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function ProductPagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 px-4 rounded-xl text-sm font-medium border border-[rgba(255,255,255,0.1)] text-[#a0a0a0] hover:text-white hover:border-[rgba(255,255,255,0.2)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ←
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="text-[#a0a0a0] px-1 text-sm select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goTo(p as number)}
            className={`size-9 rounded-xl text-sm font-medium transition-colors ${
              p === currentPage
                ? "text-[#0a0a0a] font-bold"
                : "border border-[rgba(255,255,255,0.1)] text-[#a0a0a0] hover:text-white hover:border-[rgba(255,255,255,0.2)]"
            }`}
            style={
              p === currentPage
                ? { background: "linear-gradient(90deg, #00f5ff 0%, #a855f7 100%)" }
                : undefined
            }
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 px-4 rounded-xl text-sm font-medium border border-[rgba(255,255,255,0.1)] text-[#a0a0a0] hover:text-white hover:border-[rgba(255,255,255,0.2)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        →
      </button>
    </div>
  );
}
