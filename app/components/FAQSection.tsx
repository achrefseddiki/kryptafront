"use client";

import { useState } from "react";
import { ASSETS } from "../lib/assets";
import { useT } from "../lib/language-context";

export default function FAQSection() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState(3);

  return (
    <section className="bg-[rgba(26,26,26,0.3)] py-20 px-8">
      <div className="max-w-[1156px] mx-auto flex flex-col items-center gap-10">
        {/* Heading + accordion */}
        <div className="flex flex-col gap-8 w-full">
          <h2 className="text-[36px] font-medium text-white tracking-[-0.36px] leading-10 text-center">
            {t.home.faq.heading}
          </h2>

          <div className="flex flex-col gap-2 w-full">
            {t.home.faq.items.map(({ q, a }, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <span className="text-white text-base font-medium leading-6">{q}</span>
                    <img
                      src={isOpen ? ASSETS.iconFaqMinus : ASSETS.iconFaqPlus}
                      alt=""
                      className="size-5 shrink-0"
                    />
                  </button>
                  {isOpen && a && (
                    <p className="px-6 pb-6 text-[#a0a0a0] text-base font-normal leading-[26px]">
                      {a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact support */}
        <a
          href="/support"
          className="h-[51px] px-8 rounded-2xl flex items-center gap-2 border-[1.6px] border-[#00f5ff] text-[#00f5ff] text-base font-medium hover:bg-[#00f5ff]/10 transition-colors"
        >
          {t.home.faq.contactSupport}
          <img src={ASSETS.iconArrowSmall} alt="" className="size-4" />
        </a>
      </div>
    </section>
  );
}
