import en from "./en";
import id from "./id";
import { locales, type Content, type Locale } from "./types";

export { locales };
export type { Content, Locale };
export * from "./shared";

const dictionaries: Record<Locale, Content> = { id, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getContent(lang: string): Content {
  return dictionaries[isLocale(lang) ? lang : "id"];
}
