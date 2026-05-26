"use client";

import { useState, useMemo } from "react";
import { GRADIENT } from "../lib/assets";

type SelectedProduct = { id: string; name: string; price: number; img: string; brand: string; slug: string; specs: string[] };
type FpsTier = "ultra" | "high" | "mid" | "budget";

// ── Config slots shown in the summary bar ─────────────────────────────────────
const PERF_SLOTS = [
  { key: "CPU",  label: "CPU" },
  { key: "GPU",  label: "GPU" },
  { key: "RAM",  label: "Ram" },
  { key: "SSD",  label: "Stockage" },
  { key: "PSU",  label: "Alimentation" },
  { key: "COOL", label: "Refroidissement" },
];

// ── App catalogue ─────────────────────────────────────────────────────────────
const GAMES = [
  { id: "valorant",  label: "Valorant" },
  { id: "cs2",       label: "CS2" },
  { id: "fortnite",  label: "Fortnite" },
  { id: "cyberpunk", label: "Cyberpunk 2077" },
  { id: "warzone",   label: "Warzone" },
  { id: "apex",      label: "Apex Legends" },
];

const SOFTWARE = [
  { id: "premiere",     label: "Adobe Premiere Pro" },
  { id: "davinci",      label: "DaVinci Resolve" },
  { id: "blender",      label: "Blender" },
  { id: "photoshop",    label: "Photoshop" },
  { id: "aftereffects", label: "After Effects" },
];

const ALL_APPS = [
  ...GAMES.map(g => ({ ...g, type: "Jeux" as const })),
  ...SOFTWARE.map(s => ({ ...s, type: "Logiciel" as const })),
];

// ── FPS table: [1080p, 1440p, 4K] per tier ───────────────────────────────────
const FPS_TABLE: Record<string, Record<FpsTier, [number, number, number]>> = {
  valorant:     { ultra: [530, 280, 160], high: [320, 190, 100], mid: [200, 110, 55],  budget: [100, 55,  25] },
  cs2:          { ultra: [320, 240, 160], high: [210, 150, 90],  mid: [140, 95,  50],  budget: [80,  50,  25] },
  fortnite:     { ultra: [240, 180, 120], high: [160, 120, 75],  mid: [110, 80,  45],  budget: [60,  40,  20] },
  cyberpunk:    { ultra: [140, 95,  60],  high: [100, 70,  40],  mid: [65,  45,  25],  budget: [35,  22,  12] },
  warzone:      { ultra: [180, 130, 85],  high: [130, 95,  60],  mid: [90,  65,  38],  budget: [50,  35,  18] },
  apex:         { ultra: [200, 150, 100], high: [140, 110, 70],  mid: [100, 75,  45],  budget: [55,  38,  20] },
  premiere:     { ultra: [95,  80,  65],  high: [75,  60,  45],  mid: [50,  40,  28],  budget: [30,  20,  12] },
  davinci:      { ultra: [90,  75,  60],  high: [70,  55,  40],  mid: [45,  35,  22],  budget: [25,  18,  10] },
  blender:      { ultra: [85,  70,  55],  high: [60,  48,  35],  mid: [40,  30,  18],  budget: [20,  14,  8]  },
  photoshop:    { ultra: [120, 100, 80],  high: [100, 80,  60],  mid: [75,  60,  40],  budget: [50,  35,  20] },
  aftereffects: { ultra: [75,  60,  45],  high: [55,  42,  30],  mid: [35,  25,  15],  budget: [18,  12,  7]  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function getGpuTier(gpu: SelectedProduct | undefined): FpsTier {
  if (!gpu) return "budget";
  if (gpu.price >= 4000) return "ultra";
  if (gpu.price >= 1800) return "high";
  if (gpu.price >= 600)  return "mid";
  return "budget";
}

const SLOT_WEIGHTS: Record<string, number> = {
  GPU: 30, CPU: 25, RAM: 15, SSD: 10, MB: 8, PSU: 7, CASE: 3, COOL: 2,
};

function getCompatibilityScore(selected: Record<string, SelectedProduct>): number {
  return Object.keys(selected).reduce((s, k) => s + (SLOT_WEIGHTS[k] ?? 0), 0);
}

function fpsColor(fps: number) {
  if (fps >= 120) return { text: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.25)" };
  if (fps >= 60)  return { text: "#eab308", bg: "rgba(234,179,8,0.12)",  border: "rgba(234,179,8,0.25)"  };
  return             { text: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)"   };
}

function FpsCell({ fps }: { fps: number }) {
  const c = fpsColor(fps);
  return (
    <span
      className="inline-flex items-center justify-center min-w-[70px] px-2 py-1 rounded-lg text-sm font-bold"
      style={{ color: c.text, background: c.bg, border: `1px solid ${c.border}` }}
    >
      {fps} FPS
    </span>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────
interface FPSModalProps {
  selected: Record<string, SelectedProduct>;
  onClose: () => void;
}

export default function FPSModal({ selected, onClose }: FPSModalProps) {
  const DEFAULT_SELECTED = useMemo(
    () => new Set(["valorant", "cs2", "fortnite", "cyberpunk", "warzone"]),
    []
  );
  const [selectedApps, setSelectedApps] = useState<Set<string>>(DEFAULT_SELECTED);
  const [search, setSearch] = useState("");

  const tier = getGpuTier(selected["GPU"]);
  const score = getCompatibilityScore(selected);

  function toggleApp(id: string) {
    setSelectedApps(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  const filtered = ALL_APPS.filter(a =>
    a.label.toLowerCase().includes(search.toLowerCase())
  );

  const tableRows = ALL_APPS.filter(a => selectedApps.has(a.id));

  const scoreColor = score >= 80 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0e0e0e] border border-[rgba(255,255,255,0.1)] rounded-t-2xl sm:rounded-2xl w-full sm:max-w-[780px] max-h-[92vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[rgba(255,255,255,0.07)] shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-white text-xl font-bold">Récapitulatif FPS en jeu</h2>
              <p className="text-[#a0a0a0] text-sm mt-1">Performances estimées avec votre configuration actuelle</p>
            </div>
            <button onClick={onClose} className="text-[#666] hover:text-white text-2xl leading-none shrink-0 mt-0.5">×</button>
          </div>

          {/* Config summary */}
          <div className="mt-4 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-3 flex flex-wrap gap-x-6 gap-y-2 items-center justify-between">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {PERF_SLOTS.map(({ key, label }) => {
                const p = selected[key];
                return (
                  <div key={key} className="flex items-center gap-1.5">
                    <span
                      className="size-1.5 rounded-full shrink-0"
                      style={{ background: p ? "#22c55e" : "#555" }}
                    />
                    <span className="text-[#666] text-xs">{label}</span>
                    <span className="text-white text-xs font-medium max-w-[120px] truncate">
                      {p ? p.name.split(" ").slice(0, 3).join(" ") : "Non sélectionné"}
                    </span>
                  </div>
                );
              })}
            </div>
            <div
              className="shrink-0 px-3 py-1 rounded-lg text-sm font-bold"
              style={{ color: scoreColor, background: `${scoreColor}18`, border: `1px solid ${scoreColor}40` }}
            >
              Score {score}%
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Game / software selector */}
          <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.07)]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white text-sm font-medium">Sélectionnez les jeux/logiciels à afficher</p>
              <span className="text-[#a0a0a0] text-xs">{selectedApps.size} sélectionnés</span>
            </div>
            <input
              type="search"
              placeholder="Rechercher un jeu ou logiciel..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#444] outline-none focus:border-[#00f5ff] transition-colors mb-4"
            />
            <div className="grid grid-cols-2 gap-x-8 gap-y-0">
              <div>
                <p className="text-[#666] text-xs font-semibold uppercase tracking-wider mb-2">
                  Jeux ({GAMES.length})
                </p>
                {filtered.filter(a => a.type === "Jeux").map(app => (
                  <label key={app.id} className="flex items-center gap-3 py-2 cursor-pointer group">
                    <span
                      className={`size-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        selectedApps.has(app.id)
                          ? "border-[#00f5ff] bg-[#00f5ff]/20"
                          : "border-[rgba(255,255,255,0.2)] group-hover:border-white/40"
                      }`}
                      onClick={() => toggleApp(app.id)}
                    >
                      {selectedApps.has(app.id) && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5 4.5-5" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <span
                      className={`text-sm ${selectedApps.has(app.id) ? "text-white" : "text-[#a0a0a0]"}`}
                      onClick={() => toggleApp(app.id)}
                    >
                      {app.label}
                    </span>
                  </label>
                ))}
              </div>
              <div>
                <p className="text-[#666] text-xs font-semibold uppercase tracking-wider mb-2">
                  Logiciels ({SOFTWARE.length})
                </p>
                {filtered.filter(a => a.type === "Logiciel").map(app => (
                  <label key={app.id} className="flex items-center gap-3 py-2 cursor-pointer group">
                    <span
                      className={`size-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        selectedApps.has(app.id)
                          ? "border-[#00f5ff] bg-[#00f5ff]/20"
                          : "border-[rgba(255,255,255,0.2)] group-hover:border-white/40"
                      }`}
                      onClick={() => toggleApp(app.id)}
                    >
                      {selectedApps.has(app.id) && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5 4.5-5" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <span
                      className={`text-sm ${selectedApps.has(app.id) ? "text-white" : "text-[#a0a0a0]"}`}
                      onClick={() => toggleApp(app.id)}
                    >
                      {app.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Performance table */}
          <div className="px-6 py-5">
            <p className="text-white text-sm font-semibold mb-4">
              Performances <span className="text-[#a0a0a0] font-normal">(paramètres Ultra)</span>
            </p>

            {tableRows.length === 0 ? (
              <p className="text-[#555] text-sm py-4 text-center">Sélectionnez au moins un jeu ou logiciel.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-[rgba(255,255,255,0.07)]">
                      {["Nom", "Type", "1080p", "1440p", "4K"].map(h => (
                        <th key={h} className="pb-3 text-left text-xs font-semibold text-[#666] uppercase tracking-wider pr-4 last:pr-0">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
                    {tableRows.map(app => {
                      const fps = FPS_TABLE[app.id]?.[tier] ?? [0, 0, 0];
                      return (
                        <tr key={app.id}>
                          <td className="py-3 pr-4 text-white text-sm font-medium whitespace-nowrap">{app.label}</td>
                          <td className="py-3 pr-4">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                              app.type === "Jeux"
                                ? "bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20"
                                : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            }`}>
                              {app.type}
                            </span>
                          </td>
                          <td className="py-3 pr-4"><FpsCell fps={fps[0]} /></td>
                          <td className="py-3 pr-4"><FpsCell fps={fps[1]} /></td>
                          <td className="py-3"><FpsCell fps={fps[2]} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <p className="text-[#555] text-xs mt-4 leading-5">
              Note : Ces estimations sont basées sur les benchmarks moyens avec les paramètres graphiques en Ultra.
              Les performances réelles peuvent varier selon les configurations du jeu et les autres composants de votre système.
            </p>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.07)] shrink-0 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="h-11 px-6 rounded-2xl border border-[rgba(255,255,255,0.15)] text-white text-sm font-medium hover:border-white/30 transition-colors"
          >
            Fermer
          </button>
          <button
            onClick={onClose}
            className="h-11 px-6 rounded-2xl text-[#0a0a0a] text-sm font-medium"
            style={{ background: GRADIENT }}
          >
            Optimiser ma config
          </button>
        </div>
      </div>
    </div>
  );
}
