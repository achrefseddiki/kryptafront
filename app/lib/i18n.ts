import { cookies } from "next/headers";
export type { Locale, Dict } from "./i18n-dict";
export { dict, getDict } from "./i18n-dict";

export async function getLocale(): Promise<import("./i18n-dict").Locale> {
  const cookieStore = await cookies();
  const val = cookieStore.get("krypta_locale")?.value;
  return val === "en" ? "en" : "fr";
}
