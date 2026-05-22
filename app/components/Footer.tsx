"use client";

import { ASSETS } from "../lib/assets";
import { useT } from "../lib/language-context";

const SOCIAL_ICONS = [
  ASSETS.iconSocial1,
  ASSETS.iconSocial2,
  ASSETS.iconSocial3,
  ASSETS.iconSocial4,
];

export default function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-black pt-5 pb-7 px-4 sm:px-8 lg:px-24 flex flex-col items-center gap-10">
      {/* Link columns + newsletter */}
      <div className="flex flex-wrap gap-8 lg:flex-nowrap lg:gap-10 w-full justify-between">
        {t.home.footer.links.map(({ heading, items }) => (
          <div key={heading} className="flex flex-col gap-4 min-w-[140px]">
            <p className="text-white text-sm font-medium leading-5">{heading}</p>
            <ul className="flex flex-col gap-3">
              {items.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-[#a0a0a0] text-sm font-normal leading-5 hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[362px]">
          <p className="text-white text-sm font-medium leading-5">{t.home.footer.stayUpToDate}</p>
          <p className="text-[#a0a0a0] text-sm font-normal leading-5 text-justify max-w-[306px]">
            {t.home.footer.newsletter}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mt-2 lg:mt-6">
            <input
              type="email"
              placeholder={t.home.footer.placeholder}
              className="bg-[rgba(255,255,255,0.15)] border border-[#ddd] rounded-[3px] h-10 px-3.5 text-sm text-[#777] placeholder:text-[#777] outline-none focus:border-[#00f5ff] transition-colors w-full sm:w-[242px]"
            />
            <button className="bg-white text-[#111] text-sm font-semibold h-10 px-5 rounded-[5px] hover:bg-gray-100 transition-colors whitespace-nowrap">
              {t.home.footer.subscribe}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.1)] w-full pt-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-0 justify-between">
        <a href="/" className="relative w-[177px] h-10 overflow-hidden">
          <img
            src={ASSETS.logo}
            alt="KRYPTA"
            className="absolute"
            style={{ height: "610%", width: "138%", left: "-19%", top: "-255%" }}
          />
        </a>
        <div className="flex items-center gap-4">
          {SOCIAL_ICONS.map((icon, i) => (
            <a key={i} href="#" className="size-10 border border-[rgba(218,222,228,0.5)] rounded-[8px] flex items-center justify-center hover:border-white/50 transition-colors">
              <img src={icon} alt="" className="size-5" />
            </a>
          ))}
        </div>
      </div>

      <p className="text-[#a0a0a0] text-sm font-normal text-center leading-5">
        {t.home.footer.copyright}
      </p>
    </footer>
  );
}
