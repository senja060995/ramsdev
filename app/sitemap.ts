import type { MetadataRoute } from "next";
import { locales, SITE_URL } from "@/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${SITE_URL}/${lang}/`,
    changeFrequency: "monthly",
    priority: lang === "id" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/`])),
    },
  }));
}
