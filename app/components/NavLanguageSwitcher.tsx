"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../lib/language-context";
import type { Locale } from "../lib/i18n-dict";

const UkFlag = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 60 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>

    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>

    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath="url(#t)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const FranceFlag = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 3 2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="1" height="2" fill="#0055A4" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#EF4135" />
  </svg>
);

const OPTIONS: { locale: Locale; label: string; Flag: () => React.JSX.Element }[] = [
  { locale: "fr", label: "Français", Flag: FranceFlag },
  { locale: "en", label: "English",  Flag: UkFlag },
];

export default function NavLanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function select(l: Locale) {
    setLocale(l);
    setOpen(false);
    router.refresh();
  }

  const current = OPTIONS.find((o) => o.locale === locale)!;
  const CurrentFlag = current.Flag;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-[#a0a0a0] hover:text-white text-sm font-medium transition-colors"
      >
        <CurrentFlag />
        <span>{current.label}</span>
        <svg
          className={`size-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-[#111] border border-white/[0.08] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden min-w-[140px] z-50">
          {OPTIONS.map(({ locale: l, label, Flag }) => (
            <button
              key={l}
              onClick={() => select(l)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left
                ${
                  locale === l
                    ? "text-white bg-white/[0.06]"
                    : "text-[#a0a0a0] hover:text-white hover:bg-white/[0.04]"
                }`}
            >
              <Flag />
              {label}
              {locale === l && (
                <svg
                  className="ml-auto size-3.5 text-[#00f5ff]"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2 7L5.5 10.5L12 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
