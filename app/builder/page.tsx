"use client";

import { useState, useCallback, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { useT } from "../lib/language-context";
import { useCart } from "../lib/cart-context";
import { api } from "../lib/api";
import type { Product } from "../lib/types";
import FPSModal from "./FPSModal";

const SLOTS = [
  { slot: "CPU",  label: "Processor",     category: "cpus" },
  { slot: "GPU",  label: "Graphics Card",  category: "gpus" },
  { slot: "MB",   label: "Motherboard",    category: "motherboards" },
  { slot: "RAM",  label: "Memory",         category: "ram" },
  { slot: "SSD",  label: "Storage",        category: "storage" },
  { slot: "PSU",  label: "Power Supply",   category: "power" },
  { slot: "CASE", label: "Case",           category: "cases" },
  { slot: "COOL", label: "CPU Cooler",     category: "cooling" },
];

type SelectedProduct = Pick<Product, "id" | "slug" | "name" | "brand" | "price" | "img" | "specs">;

type AiSuggestion = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  img: string;
  specs: string[];
  reason: string;
};

export default function BuilderPage() {
  const t = useT();
  const { addToCart } = useCart();
  const [selected, setSelected] = useState<Record<string, SelectedProduct>>({});
  const [budget, setBudget] = useState("");
  const [pickerSlot, setPickerSlot] = useState<{ slot: string; label: string; category: string } | null>(null);
  const [suggestions, setSuggestions] = useState<Record<string, AiSuggestion[]>>({});
  const [suggesting, setSuggesting] = useState<string | null>(null);
  const [showFPS, setShowFPS] = useState(false);
  const [cartFlash, setCartFlash] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);
  const [editingBuildId, setEditingBuildId] = useState<string | null>(null);

  // Load a saved build when navigating from /account/builds
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loadId = params.get("load");
    if (!loadId) return;
    try {
      const builds = JSON.parse(localStorage.getItem("krypta_saved_builds") ?? "[]");
      const build = builds.find((b: { id: string }) => b.id === loadId);
      if (build) {
        setSelected(build.components ?? {});
        setBudget(build.budget ?? "");
        setEditingBuildId(loadId);
      }
    } catch {}
  }, []);

  function handleAddBuildToCart() {
    Object.values(selected).forEach(p => {
      addToCart({ id: p.id, slug: p.slug, name: p.name, price: p.price, img: p.img });
    });
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 2000);
  }

  function handleSaveBuild() {
    const gpu = selected["GPU"];
    const cpu = selected["CPU"];
    const autoName = gpu
      ? gpu.name.split(" ").slice(0, 3).join(" ") + " Build"
      : cpu
      ? cpu.name.split(" ").slice(0, 3).join(" ") + " Build"
      : `Ma Config`;

    try {
      const existing: Array<{ id: string }> = JSON.parse(localStorage.getItem("krypta_saved_builds") ?? "[]");
      const build = {
        id: editingBuildId ?? `build_${Date.now()}`,
        name: editingBuildId
          ? (existing.find(b => b.id === editingBuildId) as { name?: string })?.name ?? autoName
          : autoName,
        components: selected,
        budget,
        total,
        savedAt: new Date().toISOString(),
      };
      const updated = editingBuildId
        ? existing.map(b => (b.id === editingBuildId ? build : b))
        : [build, ...existing];
      localStorage.setItem("krypta_saved_builds", JSON.stringify(updated));
      if (!editingBuildId) setEditingBuildId(build.id);
    } catch {}
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 2000);
  }

  const total = Object.values(selected).reduce((sum, p) => sum + p.price, 0);
  const budgetNum = budget ? parseFloat(budget) : undefined;

  const handleSelect = useCallback((slotKey: string, product: SelectedProduct) => {
    setSelected(prev => ({ ...prev, [slotKey]: product }));
    setSuggestions(prev => { const n = { ...prev }; delete n[slotKey]; return n; });
    setPickerSlot(null);
  }, []);

  const handleRemove = useCallback((slotKey: string) => {
    setSelected(prev => { const n = { ...prev }; delete n[slotKey]; return n; });
    setSuggestions(prev => { const n = { ...prev }; delete n[slotKey]; return n; });
  }, []);

  async function handleSuggest(slotDef: { slot: string; label: string }) {
    setSuggesting(slotDef.slot);
    setSuggestions(prev => { const n = { ...prev }; delete n[slotDef.slot]; return n; });
    try {
      const selectedComponents = Object.entries(selected).map(([slot, p]) => ({
        slot,
        label: SLOTS.find(s => s.slot === slot)?.label ?? slot,
        productId: p.id,
        productName: p.name,
        price: p.price,
        specs: p.specs,
      }));
      const result = await api.builder.suggest({
        selectedComponents,
        targetSlot: slotDef.slot,
        targetLabel: slotDef.label,
        budget: budgetNum,
      });
      setSuggestions(prev => ({ ...prev, [slotDef.slot]: result.suggestions }));
    } catch {
      setSuggestions(prev => ({ ...prev, [slotDef.slot]: [] }));
    } finally {
      setSuggesting(null);
    }
  }

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-6 lg:gap-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{t.builder.breadcrumb}</span>
        </nav>

        {/* Header + budget */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-2 lg:gap-3">
            <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-[-0.96px]">{t.builder.title}</h1>
            <p className="text-base lg:text-2xl font-normal text-[#a0a0a0]">{t.builder.subtitle}</p>
          </div>
          <div className="flex flex-col gap-1 shrink-0">
            <label className="text-[#a0a0a0] text-xs uppercase tracking-wider">Budget (DT) — optional</label>
            <input
              type="number"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              placeholder="e.g. 3000"
              className="w-full sm:w-[180px] bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-[#555] outline-none focus:border-[#00f5ff] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Slots */}
          <div className="flex-1 flex flex-col gap-3 lg:gap-4 w-full">
            {budgetNum != null && total > budgetNum ? (
              <div className="bg-red-900/30 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3">
                <span className="size-2.5 rounded-full bg-red-400 shrink-0" />
                <p className="text-red-400 text-sm font-medium">Over budget by {(total - budgetNum)} DT</p>
              </div>
            ) : (
              <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3">
                <span className="size-2.5 rounded-full bg-green-400 shrink-0" />
                <p className="text-green-400 text-sm font-medium">{t.builder.noIssues}</p>
              </div>
            )}

            {SLOTS.map((slotDef) => {
              const sel = selected[slotDef.slot];
              const slotSuggestions = suggestions[slotDef.slot];
              const isSuggesting = suggesting === slotDef.slot;

              return (
                <div key={slotDef.slot} className="flex flex-col gap-2">
                  {/* Slot row */}
                  <div
                    className={`bg-[#1a1a1a] border rounded-2xl p-4 lg:p-5 flex items-center justify-between gap-3 lg:gap-4 transition-colors ${
                      sel ? "border-[rgba(0,245,255,0.3)]" : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
                    }`}
                  >
                    <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                      {sel ? (
                        <img src={sel.img} alt={sel.name} className="size-10 lg:size-12 rounded-xl object-cover shrink-0" />
                      ) : (
                        <div
                          className="size-10 lg:size-12 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold"
                          style={{ background: "rgba(255,255,255,0.08)" }}
                        >
                          <span className="text-[#a0a0a0]">{slotDef.slot}</span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-[#a0a0a0] text-xs uppercase tracking-wider">{slotDef.label}</p>
                        {sel ? (
                          <p className="text-white text-sm lg:text-base font-medium mt-0.5 truncate">{sel.name}</p>
                        ) : (
                          <p className="text-[#555] text-sm mt-0.5">{t.builder.noComponent}</p>
                        )}
                        {sel && (
                          <p className="text-[#00f5ff] text-sm font-bold mt-0.5">{sel.price} DT</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {!sel && (
                        <button
                          onClick={() => handleSuggest(slotDef)}
                          disabled={isSuggesting}
                          className="h-9 px-3 rounded-xl text-xs font-medium border border-[rgba(1,245,255,0.4)] text-[#00f5ff] hover:bg-[#00f5ff]/10 transition-colors disabled:opacity-50 whitespace-nowrap hidden sm:flex items-center gap-1"
                        >
                          {isSuggesting ? (
                            <><span className="size-3 border border-[#00f5ff] border-t-transparent rounded-full animate-spin" /> Thinking…</>
                          ) : (
                            <>✦ AI Suggest</>
                          )}
                        </button>
                      )}
                      {sel && (
                        <button
                          onClick={() => handleRemove(slotDef.slot)}
                          className="text-[#a0a0a0] hover:text-red-400 transition-colors text-sm hidden sm:block"
                        >
                          {t.builder.remove}
                        </button>
                      )}
                      <button
                        onClick={() => setPickerSlot(slotDef)}
                        className={`h-9 lg:h-10 px-3 lg:px-5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                          sel
                            ? "border border-[#00f5ff] text-[#00f5ff] hover:bg-[#00f5ff]/10"
                            : "text-[#0a0a0a]"
                        }`}
                        style={!sel ? { background: GRADIENT } : {}}
                      >
                        {sel ? t.builder.change : t.builder.choose}
                      </button>
                    </div>
                  </div>

                  {/* AI suggestions panel */}
                  {isSuggesting && (
                    <div className="rounded-2xl border border-[rgba(1,245,255,0.15)] p-4 flex items-center gap-3" style={{ background: "linear-gradient(90deg,rgba(1,245,255,0.04),rgba(30,58,255,0.04))" }}>
                      <span className="size-4 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin shrink-0" />
                      <p className="text-[#a0a0a0] text-sm">Finding compatible components…</p>
                    </div>
                  )}

                  {!isSuggesting && slotSuggestions && slotSuggestions.length === 0 && (
                    <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-4">
                      <p className="text-[#555] text-sm">No compatible products found{budgetNum ? " within budget" : ""}.</p>
                    </div>
                  )}

                  {!isSuggesting && slotSuggestions && slotSuggestions.length > 0 && (
                    <div className="rounded-2xl border border-[rgba(1,245,255,0.2)] overflow-hidden" style={{ background: "linear-gradient(90deg,rgba(1,245,255,0.04),rgba(30,58,255,0.04))" }}>
                      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
                        <span className="text-[#00f5ff] text-xs font-semibold uppercase tracking-wider">✦ AI Suggestions for {slotDef.label}</span>
                        <button onClick={() => setSuggestions(prev => { const n = { ...prev }; delete n[slotDef.slot]; return n; })} className="text-[#555] hover:text-white text-lg leading-none">×</button>
                      </div>
                      <div className="flex flex-col divide-y divide-white/[0.06]">
                        {slotSuggestions.map((s) => (
                          <div key={s.productId} className="flex items-center gap-3 px-4 py-3">
                            <img src={s.img} alt={s.name} className="size-12 rounded-xl object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{s.name}</p>
                              <p className="text-[#a0a0a0] text-xs leading-5 mt-0.5">{s.reason}</p>
                            </div>
                            <div className="shrink-0 text-right">
                              <p className="text-white text-sm font-bold">{s.price} DT</p>
                              <button
                                onClick={() => handleSelect(slotDef.slot, { id: s.productId, slug: s.slug, name: s.name, brand: s.brand, price: s.price, img: s.img, specs: s.specs })}
                                className="mt-1 h-7 px-3 rounded-lg text-xs font-semibold text-[#0a0a0a]"
                                style={{ background: GRADIENT }}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Build summary */}
          <div className="w-full lg:w-[340px] lg:shrink-0 flex flex-col gap-4 lg:gap-6 lg:sticky lg:top-[220px]">
            <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 lg:p-6 flex flex-col gap-5 lg:gap-6">
              <h2 className="text-white text-xl font-medium">{t.builder.summary}</h2>

              {Object.keys(selected).length === 0 ? (
                <p className="text-[#555] text-sm">No components selected yet.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {SLOTS.filter(s => selected[s.slot]).map(({ slot, label }) => (
                    <div key={slot} className="flex justify-between text-sm gap-4">
                      <span className="text-[#a0a0a0] shrink-0">{label}</span>
                      <div className="text-right min-w-0">
                        <p className="text-white text-xs truncate max-w-[160px]">{selected[slot].name}</p>
                        <p className="text-[#00f5ff] text-xs font-bold">{selected[slot].price} DT</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-[rgba(255,255,255,0.08)] pt-4 flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[#a0a0a0] text-sm">{t.builder.estimatedTotal}</span>
                  <span className={`text-xl font-bold ${budgetNum && total > budgetNum ? "text-red-400" : "text-white"}`}>
                    {total} DT
                  </span>
                </div>
                {budgetNum != null && (
                  <div className="flex justify-between text-xs">
                    <span className="text-[#555]">Budget</span>
                    <span className="text-[#a0a0a0]">{budgetNum} DT</span>
                  </div>
                )}
                <p className="text-[#555] text-xs mt-1">
                  {SLOTS.filter(s => !selected[s.slot]).length} {t.builder.componentsNeeded}
                </p>
              </div>

              <button
                onClick={() => setShowFPS(true)}
                className="h-12 rounded-2xl border border-[rgba(1,245,255,0.5)] text-[#00f5ff] text-base font-medium hover:bg-[#00f5ff]/10 transition-colors flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                Récapitulatif FPS en jeu
              </button>
              <button
                onClick={handleAddBuildToCart}
                disabled={Object.keys(selected).length === 0}
                className="h-12 rounded-2xl text-[#0a0a0a] text-base font-medium disabled:opacity-40 transition-opacity"
                style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
              >
                {cartFlash ? "Ajouté au panier ✓" : t.builder.addBuildToCart}
              </button>
              <button
                onClick={handleSaveBuild}
                disabled={Object.keys(selected).length === 0}
                className="h-12 rounded-2xl border border-[#00f5ff] text-[#00f5ff] text-base font-medium hover:bg-[#00f5ff]/10 transition-colors disabled:opacity-40"
              >
                {saveFlash ? "Sauvegardé ✓" : t.builder.save}
              </button>
            </div>

            <div
              className="rounded-2xl p-5 border border-[rgba(1,245,255,0.2)] flex flex-col gap-3"
              style={{ background: "linear-gradient(90deg, rgba(1,245,255,0.08), rgba(30,58,255,0.08))" }}
            >
              <p className="text-white text-sm font-medium">{t.builder.needHelp}</p>
              <p className="text-[#a0a0a0] text-xs leading-5">{t.builder.expertHelp}</p>
              <a href="/support" className="text-[#00f5ff] text-sm font-medium hover:underline">
                {t.builder.talkToExpert}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Product picker modal */}
      {pickerSlot && (
        <ProductPicker
          slot={pickerSlot}
          onSelect={(product) => handleSelect(pickerSlot.slot, product)}
          onClose={() => setPickerSlot(null)}
        />
      )}

      {/* FPS summary modal */}
      {showFPS && (
        <FPSModal selected={selected} onClose={() => setShowFPS(false)} />
      )}
    </PageWrapper>
  );
}

function ProductPicker({ slot, onSelect, onClose }: {
  slot: { slot: string; label: string; category: string };
  onSelect: (p: SelectedProduct) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback((q: string) => {
    setLoading(true);
    api.products.search({ category: slot.category, search: q || undefined, limit: 30 })
      .then(r => setProducts(r.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [slot.category]);

  useState(() => { load(""); });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl w-full max-w-[600px] max-h-[80vh] flex flex-col">
        <div className="p-5 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between shrink-0">
          <h2 className="text-white font-semibold">Choose {slot.label}</h2>
          <button onClick={onClose} className="text-[#666] hover:text-white text-xl leading-none">×</button>
        </div>
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] shrink-0">
          <input
            type="search"
            placeholder={`Search ${slot.label.toLowerCase()}…`}
            value={search}
            onChange={e => { setSearch(e.target.value); load(e.target.value); }}
            className="w-full bg-white/[0.05] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-[#444] outline-none focus:border-[#00f5ff] transition-colors"
            autoFocus
          />
        </div>
        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="text-[#555] text-sm py-10 text-center">Loading…</div>
          ) : products.length === 0 ? (
            <div className="text-[#555] text-sm py-10 text-center">No products found.</div>
          ) : (
            <div className="flex flex-col divide-y divide-white/[0.04]">
              {products.map(p => (
                <button
                  key={p.id}
                  onClick={() => onSelect({ id: p.id, slug: p.slug, name: p.name, brand: p.brand, price: p.price, img: p.img, specs: p.specs })}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.04] transition-colors text-left w-full"
                >
                  <img src={p.img} alt={p.name} className="size-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{p.name}</p>
                    <p className="text-[#555] text-xs">{p.brand}</p>
                    {p.specs.slice(0, 2).length > 0 && (
                      <p className="text-[#444] text-xs mt-0.5 truncate">{p.specs.slice(0, 3).join(' · ')}</p>
                    )}
                  </div>
                  <span className="text-white font-bold text-sm shrink-0">{p.price} DT</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
