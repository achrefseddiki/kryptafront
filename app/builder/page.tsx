"use client";

import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { BUILDER_COMPONENTS } from "../lib/data";
import { useT } from "../lib/language-context";

const TOTAL_PRICE = 2148;

export default function BuilderPage() {
  const t = useT();
  const [components, setComponents] = useState(BUILDER_COMPONENTS);

  return (
    <PageWrapper>
      <div className="px-24 pb-16 flex flex-col gap-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">{t.products.home}</a>
          <span className="text-white/20">/</span>
          <span className="text-white">{t.builder.breadcrumb}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-bold text-white tracking-[-0.96px]">{t.builder.title}</h1>
          <p className="text-2xl font-normal text-[#a0a0a0]">{t.builder.subtitle}</p>
        </div>

        <div className="flex gap-8 items-start">
          {/* Component slots */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Compatibility status */}
            <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3">
              <span className="size-2.5 rounded-full bg-green-400 shrink-0" />
              <p className="text-green-400 text-sm font-medium">
                {t.builder.noIssues}
              </p>
            </div>

            {components.map(({ slot, label, selected }, idx) => (
              <div
                key={slot}
                className={`bg-[#1a1a1a] border rounded-2xl p-6 flex items-center justify-between gap-4 transition-colors ${
                  selected
                    ? "border-[rgba(0,245,255,0.3)]"
                    : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
                }`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className="size-12 rounded-xl flex items-center justify-center shrink-0 text-[#0a0a0a] text-xs font-bold"
                    style={{ background: selected ? GRADIENT : "rgba(255,255,255,0.1)" }}
                  >
                    <span className={selected ? "text-[#0a0a0a]" : "text-[#a0a0a0]"}>{slot}</span>
                  </div>
                  <div>
                    <p className="text-[#a0a0a0] text-xs uppercase tracking-wider">{label}</p>
                    {selected ? (
                      <p className="text-white text-base font-medium mt-0.5">{selected}</p>
                    ) : (
                      <p className="text-[#a0a0a0] text-sm mt-0.5">{t.builder.noComponent}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {selected && (
                    <button
                      onClick={() => setComponents((prev) => prev.map((c, i) => i === idx ? { ...c, selected: null } : c))}
                      className="text-[#a0a0a0] hover:text-red-400 transition-colors text-sm"
                    >
                      {t.builder.remove}
                    </button>
                  )}
                  <button
                    className={`h-10 px-5 rounded-xl text-sm font-medium transition-colors ${
                      selected
                        ? "border border-[#00f5ff] text-[#00f5ff] hover:bg-[#00f5ff]/10"
                        : "text-[#0a0a0a]"
                    }`}
                    style={!selected ? { background: GRADIENT } : {}}
                  >
                    {selected ? t.builder.change : t.builder.choose}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Build summary */}
          <div className="w-[340px] shrink-0 flex flex-col gap-6 sticky top-[220px]">
            <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 flex flex-col gap-6">
              <h2 className="text-white text-xl font-medium">{t.builder.summary}</h2>
              <div className="flex flex-col gap-3">
                {components.filter((c) => c.selected).map(({ slot, label, selected }) => (
                  <div key={slot} className="flex justify-between text-sm">
                    <span className="text-[#a0a0a0]">{label}</span>
                    <span className="text-white text-right max-w-[160px] text-xs">{selected}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[rgba(255,255,255,0.08)] pt-4 flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-[#a0a0a0] text-sm">{t.builder.estimatedTotal}</span>
                  <span className="text-white text-xl font-bold">${TOTAL_PRICE.toLocaleString()}</span>
                </div>
                <p className="text-[#a0a0a0] text-xs">
                  {components.filter((c) => !c.selected).length} {t.builder.componentsNeeded}
                </p>
              </div>

              <button
                className="h-12 rounded-2xl text-[#0a0a0a] text-base font-medium"
                style={{ background: GRADIENT, filter: "drop-shadow(0px 6px 6px rgba(1,245,255,0.2))" }}
              >
                {t.builder.addBuildToCart}
              </button>

              <button className="h-12 rounded-2xl border border-[#00f5ff] text-[#00f5ff] text-base font-medium hover:bg-[#00f5ff]/10 transition-colors">
                {t.builder.save}
              </button>
            </div>

            {/* Expert help */}
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
    </PageWrapper>
  );
}
