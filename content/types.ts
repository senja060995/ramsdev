export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

export type ProductId =
  | "sidra"
  | "sihub"
  | "sihr"
  | "simar"
  | "sijek"
  | "siweb"
  | "printing"
  | "next";

export type Accent = "cyan" | "magenta" | "yellow";

export interface Content {
  locale: Locale;
  /** Kode Open Graph, mis. "id_ID" */
  ogLocale: string;
  meta: { title: string; description: string };
  a11y: { skip: string; switchLang: string; copied: string };
  nav: { work: string; contact: string };
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
    meta: string[];
  };
  statement: { label: string; text: string };
  scale: {
    label: string;
    title: string;
    intro: string;
    tiers: { level: string; title: string; desc: string; tag: string }[];
  };
  builder: {
    label: string;
    title: string;
    entities: { name: string; sub: string; items: { title: string; desc: string }[] }[];
  };
  feature: {
    label: string;
    title: string;
    desc: string;
    /** Urutan dari bawah (fondasi) ke atas */
    layers: { name: string; desc: string }[];
  };
  numbers: {
    label: string;
    title: string;
    placeholderNote: string;
    /** Label untuk STATS.items di shared.ts, urutan sama */
    stats: { label: string; sub: string }[];
    barsTitle: string;
    /** Label untuk STATS.bars di shared.ts, urutan sama */
    bars: { label: string; unit: string }[];
  };
  products: {
    label: string;
    title: string;
    intro: string;
    items: { id: ProductId; name: string; kind: string; desc: string; tags: string[] }[];
  };
  office: {
    label: string;
    title: string;
    desc: string;
    /** Teks di pojok animasi, mis. "Live · 5 aplikasi · 5 server" */
    status: string;
    steps: { title: string; desc: string }[];
    /** Label aplikasi tiap meja di animasi (5 meja) */
    roles: string[];
    /** Tugas yang muncul bergantian di balon kerja agen */
    tasks: string[];
    hub: string;
    board: string;
    knowledge: string;
    /** Kanal omnichannel tujuan kiriman di animasi. `icon` = file di public/, `color` = warna brand */
    channels: { name: string; icon: string; color: string }[];
  };
  compare: {
    label: string;
    title: string;
    manualTitle: string;
    manual: string[];
    ecoTitle: string;
    eco: string[];
  };
  next: { label: string; title: string; desc: string; points: string[] };
  cta: {
    label: string;
    title: string;
    desc: string;
    emailLabel: string;
    waLabel: string;
    socialLabel: string;
    copy: string;
    copied: string;
  };
  footer: { copyright: string; backToTop: string };
}
