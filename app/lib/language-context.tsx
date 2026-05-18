"use client";

import { createContext, useContext, useState } from "react";
import { dict, getDict, type Locale, type Dict } from "./i18n-dict";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "fr",
  setLocale: () => {},
  t: dict.fr,
});

export function LanguageProvider({
  initial,
  children,
}: {
  initial: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initial);

  function setLocale(l: Locale) {
    setLocaleState(l);
    document.cookie = `krypta_locale=${l};path=/;max-age=31536000;SameSite=Lax`;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: getDict(locale) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useT() {
  return useContext(LanguageContext).t;
}
