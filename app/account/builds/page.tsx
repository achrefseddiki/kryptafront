"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "../../lib/language-context";
import { GRADIENT } from "../../lib/assets";

interface SavedBuild {
  id: string;
  name: string;
  components: Record<string, { name: string; brand: string; price: number; img: string }>;
  budget: string;
  total: number;
  savedAt: string;
}

const SLOT_ORDER = ["CPU", "GPU", "RAM", "SSD", "MB", "PSU", "COOL", "CASE"];
const SLOT_LABELS: Record<string, string> = {
  CPU: "CPU", GPU: "GPU", RAM: "RAM", SSD: "Stockage",
  MB: "Carte mère", PSU: "Alimentation", COOL: "Refroidissement", CASE: "Boîtier",
};

export default function AccountBuildsPage() {
  const t = useT();
  const [builds, setBuilds] = useState<SavedBuild[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("krypta_saved_builds");
      setBuilds(raw ? JSON.parse(raw) : []);
    } catch {
      setBuilds([]);
    }
    setLoaded(true);
  }, []);

  function deleteBuild(id: string) {
    const updated = builds.filter(b => b.id !== id);
    setBuilds(updated);
    try { localStorage.setItem("krypta_saved_builds", JSON.stringify(updated)); } catch {}
    setConfirmDelete(null);
  }

  if (!loaded) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (builds.length === 0) {
    return (
      <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-16 flex flex-col items-center gap-5 text-center">
        <div className="size-16 rounded-2xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
        </div>
        <div>
          <p className="text-white font-medium">{t.account.noBuilds}</p>
          <p className="text-[#a0a0a0] text-sm mt-1">{t.account.noBuildsSub}</p>
        </div>
        <Link
          href="/builder"
          className="h-11 px-6 rounded-2xl flex items-center text-[#0a0a0a] text-sm font-medium"
          style={{ background: GRADIENT }}
        >
          {t.account.goToBuilder}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-semibold">
          {t.account.myBuilds}
          <span className="text-[#a0a0a0] text-base font-normal ml-2">({builds.length})</span>
        </h2>
        <Link
          href="/builder"
          className="h-9 px-4 rounded-2xl flex items-center gap-2 text-[#0a0a0a] text-sm font-medium"
          style={{ background: GRADIENT }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nouvelle config
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {builds.map(build => {
          const componentCount = Object.keys(build.components).length;
          const presentSlots = SLOT_ORDER.filter(s => build.components[s]);

          return (
            <div
              key={build.id}
              className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 hover:border-[rgba(255,255,255,0.15)] transition-colors"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-white font-semibold">{build.name}</h3>
                  <p className="text-[#666] text-xs mt-0.5">
                    {t.account.savedOn} {new Date(build.savedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                    {" · "}{componentCount} {t.account.components}
                  </p>
                </div>
                <span className="text-white font-bold text-lg shrink-0">
                  {build.total.toLocaleString()} DT
                </span>
              </div>

              {/* Component chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {presentSlots.map(slot => {
                  const c = build.components[slot];
                  return (
                    <div key={slot} className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-xl px-3 py-1.5">
                      <span className="text-[#666] text-xs">{SLOT_LABELS[slot]}</span>
                      <span className="text-white text-xs font-medium max-w-[120px] truncate">
                        {c.name.split(" ").slice(0, 3).join(" ")}
                      </span>
                    </div>
                  );
                })}
                {SLOT_ORDER.filter(s => !build.components[s]).map(slot => (
                  <div key={slot} className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl px-3 py-1.5 opacity-40">
                    <span className="text-[#555] text-xs">{SLOT_LABELS[slot]}</span>
                    <span className="text-[#444] text-xs">—</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                <Link
                  href={`/builder?load=${build.id}`}
                  className="h-9 px-4 rounded-xl text-sm font-medium text-[#0a0a0a] flex items-center gap-1.5"
                  style={{ background: GRADIENT }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  {t.account.editBuild}
                </Link>

                {confirmDelete === build.id ? (
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-[#a0a0a0] text-xs">Supprimer définitivement ?</span>
                    <button
                      onClick={() => deleteBuild(build.id)}
                      className="h-9 px-3 rounded-xl text-xs font-medium bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      Confirmer
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="h-9 px-3 rounded-xl text-xs font-medium border border-[rgba(255,255,255,0.1)] text-[#a0a0a0] hover:text-white transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(build.id)}
                    className="ml-auto h-9 px-3 rounded-xl text-xs font-medium border border-[rgba(255,255,255,0.1)] text-[#a0a0a0] hover:text-red-400 hover:border-red-500/30 transition-colors flex items-center gap-1.5"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                    {t.account.deleteBuild}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
