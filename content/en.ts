// GANTI: email, WhatsApp, social links, photo, product logos and numbers
// live in content/shared.ts (shared by ID & EN).
// This file only holds the English copy.

import type { Content } from "./types";

const en: Content = {
  locale: "en",
  ogLocale: "en_US",
  meta: {
    title: "Rams Dev — Founder & Builder",
    description:
      "Rams Dev — founder and builder from Semarang, Indonesia. From ink on paper to platforms in the cloud: printing, in-house software, and SaaS for small businesses.",
  },
  a11y: {
    skip: "Skip to content",
    switchLang: "Switch language to Bahasa Indonesia",
    copied: "Copied to clipboard",
  },
  nav: { work: "View Work", contact: "Contact" },
  hero: {
    eyebrow: "Founder · Builder · Semarang",
    title: "RAMS DEV",
    tagline: "From ink on paper to platforms in the cloud",
    primaryCta: "View Work",
    secondaryCta: "Contact",
    meta: [
      "Sidomulyo Printing & Advertising",
      "Ragam Manfaat Sinergi (Ramasi)",
      "SiHub",
      "SiMar",
      "SiJek",
    ],
  },
  statement: {
    label: "Mission",
    text: "I build systems that close the gap between today’s manual businesses and tomorrow’s automated ones — starting on my own print shop floor, then opening it up to thousands of other small businesses.",
  },
  scale: {
    label: "Ecosystem Scale",
    title: "Three levels of business advancement",
    intro:
      "Inspired by the Kardashev Scale: progress is measured by how much work a system can control, not by the size of the office.",
    tiers: [
      {
        level: "Level I",
        title: "Master physical production",
        desc: "Printing and advertising: machines, ink, materials, and daily deadlines. The foundation that teaches what real operations mean.",
        tag: "Printing",
      },
      {
        level: "Level II",
        title: "Automate your own business",
        desc: "In-house software for production, finance, attendance, and customers. Every manual process becomes a recorded workflow.",
        tag: "In-house software",
      },
      {
        level: "Level III",
        title: "Serve other businesses through platforms",
        desc: "What is proven inside opens up as multi-tenant SaaS for small businesses, so they never have to build from scratch.",
        tag: "SaaS for SMEs",
      },
    ],
  },
  builder: {
    label: "Track Record",
    title: "I’m a builder. All of this was built from the inside.",
    entities: [
      {
        name: "Sidomulyo Printing & Advertising",
        sub: "Print shop · Semarang",
        items: [
          {
            title: "Daily production",
            desc: "Print and advertising orders run every day, from customer files to finished goods.",
          },
          {
            title: "RIP-ready print file workflow",
            desc: "A prepress standard that gets files onto the press without repeated revisions.",
          },
          {
            title: "Automated material recipes",
            desc: "Material and ink requirements are calculated automatically from each order’s spec.",
          },
          {
            title: "Market expansion to SPPG Central Java",
            desc: "Opening a new market for SPPG printing needs across Central Java.",
          },
        ],
      },
      {
        name: "In-house Developer Division",
        sub: "Internal software team",
        items: [
          {
            title: "SIDRA: ERP turned multi-tenant SaaS",
            desc: "The internal ERP evolved into SIDRA, a multi-tenant platform with automatic journals and per-tenant payment gateways.",
          },
          {
            title: "SiHub: omnichannel CRM + AI",
            desc: "Social channels and chats connected in one inbox, plus AI that creates and schedules posts automatically. Available on Android and iOS.",
          },
          {
            title: "SiHR: HR & attendance",
            desc: "Attendance and employee management from a phone, connected straight to the system.",
          },
          {
            title: "Self-managed production infrastructure",
            desc: "Servers, deployments, and monitoring run by our own team.",
          },
        ],
      },
      {
        name: "Ramasi",
        sub: "PT Ragam Manfaat Sinergi",
        items: [
          {
            title: "Umbrella for automated platforms",
            desc: "The legal and strategic home for every software product in the ecosystem.",
          },
          {
            title: "The “Si-” brand family",
            desc: "SIDRA, SiHub, SiHR, SiMar, SiJek, and SiWeb: one naming language, one ecosystem.",
          },
        ],
      },
    ],
  },
  feature: {
    label: "Architecture",
    title: "One ecosystem from printing press to cloud",
    desc: "Each layer stands on the one below it. Data from the production floor flows all the way up to the platforms other businesses use.",
    layers: [
      { name: "Printing Press", desc: "Physical production, the first data source" },
      { name: "SIDRA · SiHR", desc: "ERP, finance, attendance, and HR" },
      { name: "SiHub", desc: "Omnichannel CRM and AI content" },
      { name: "SiMar · SiJek · SiWeb", desc: "Platforms for small businesses" },
      { name: "Cloud", desc: "Self-managed infrastructure" },
    ],
  },
  numbers: {
    label: "Scale",
    title: "Production at platform scale",
    placeholderNote: "Sample numbers, replace with real data",
    stats: [
      { label: "Years of experience", sub: "Printing, advertising, and software" },
      { label: "Software products", sub: "Built and run in-house" },
      { label: "Target SME tenants", sub: "For the multi-tenant platform" },
    ],
    barsTitle: "Scale comparison",
    bars: [
      { label: "Today · in-house business", unit: "business" },
      { label: "Next stage · early tenants", unit: "tenants" },
      { label: "Target · SME tenants", unit: "tenants" },
    ],
  },
  products: {
    label: "Work",
    title: "Products in the ecosystem",
    intro:
      "Every product was born from a real need on the production floor, then developed so other businesses can use it.",
    items: [
      {
        id: "sidra",
        name: "SIDRA",
        kind: "Multi-tenant ERP",
        desc: "Automatic accounting journals, a payment gateway per tenant, and business operations in one system.",
        tags: ["ERP", "Multi-tenant", "Web"],
      },
      {
        id: "sihub",
        name: "SiHub",
        kind: "Omnichannel CRM + AI",
        desc: "Every social channel and chat in one inbox. AI creates the design and caption, then posts automatically based on the knowledge and schedule you set.",
        tags: ["Omnichannel", "AI", "Android", "iOS"],
      },
      {
        id: "sihr",
        name: "SiHR",
        kind: "HR & attendance",
        desc: "Employee attendance from a phone and HR management with automatic reports.",
        tags: ["HR", "Attendance", "Mobile"],
      },
      {
        id: "simar",
        name: "SiMar",
        kind: "Marketplace",
        desc: "A digital market for SME products and services, on the web and as Android and iOS apps.",
        tags: ["Web", "Android", "iOS"],
      },
      {
        id: "sijek",
        name: "SiJek",
        kind: "Delivery",
        desc: "Delivery for local orders, connected to stores on SiMar.",
        tags: ["Logistics", "Local"],
      },
      {
        id: "siweb",
        name: "SiWeb",
        kind: "Company websites",
        desc: "Company websites that are fast, clean, and easy to manage.",
        tags: ["Website", "Company profile"],
      },
      {
        id: "printing",
        name: "Sidomulyo Printing",
        kind: "Printing & advertising",
        desc: "The parent business where every system is tested first.",
        tags: ["Production", "CMYK"],
      },
      {
        id: "next",
        name: "…and What’s Next",
        kind: "In development",
        desc: "A C++ design engine, a self-service design platform, and a material recipe system.",
        tags: ["C++", "Self-service", "R&D"],
      },
    ],
  },
  office: {
    label: "AI Virtual Office",
    title: "A virtual office where AI does the work",
    desc: "SiPos sends data to SiDra, which distributes it to SiHub, SiMar, and SiJek. Results flow back to SiDra. This visualization shows continuous data streams, a load balancer, five servers, and SiHub connected to every omnichannel platform.",
    status: "Live · 5 apps · 5 servers · omnichannel",
    steps: [
      { title: "SiPos → SiDra", desc: "Data flows from SiPos into SiDra, the coordination center of the ecosystem." },
      { title: "App distribution", desc: "SiDra distributes data to SiHub, SiMar, and SiJek. Results flow back to SiDra." },
      { title: "Load balancer + 5 servers", desc: "A visualization of requests distributed across five servers, with continuous request and response streams." },
      { title: "SiHub omnichannel", desc: "SiHub stays connected to WhatsApp, Instagram, Facebook, Messenger, Threads, and Telegram." },
    ],
    roles: ["SiPos", "SiDra", "SiHub", "SiMar", "SiJek"],
    tasks: ["Sending transactions", "Syncing data", "Omnichannel delivery", "Processing data", "Sending response"],
    hub: "PUBLISH",
    board: "DATA TRAFFIC",
    knowledge: "ECOSYSTEM SYNC",
    // Channel logos copied from the CRMSM project (public/img) — matching the channels available in SiHub
    channels: [
      { name: "WhatsApp", icon: "/channels/whatsapp.webp", color: "#19b946" },
      { name: "Instagram", icon: "/channels/instagram.webp", color: "#e1306c" },
      { name: "Facebook", icon: "/channels/facebook.webp", color: "#3b5998" },
      { name: "Messenger", icon: "/channels/messenger.webp", color: "#1684ff" },
      { name: "Threads", icon: "/channels/threads.webp", color: "#ECEFF4" },
      { name: "Telegram", icon: "/channels/telegram.svg", color: "#2aabee" },
    ],
  },
  compare: {
    label: "Comparison",
    title: "The cost of manual work vs ecosystem work",
    manualTitle: "The manual way",
    manual: [
      "Orders written on paper and in personal chats",
      "Material needs estimated by feel",
      "Attendance in a logbook, tallied at month end",
      "Financial journals re-typed from receipts",
      "Every business buys and assembles its own software",
    ],
    ecoTitle: "The ecosystem way",
    eco: [
      "Orders land in a shared CRM, recorded and trackable",
      "Material recipes calculated automatically from specs",
      "Attendance from an app, reports ready instantly",
      "Journals created automatically from every transaction",
      "Small businesses simply subscribe to a proven platform",
    ],
  },
  next: {
    label: "What’s next",
    title: "A design engine of our own, written in C++",
    desc: "A design tool that understands print production from the start: material sizes, bleed, CMYK color, and material recipes, connected directly to a self-service platform.",
    points: [
      "Native vector and bezier curve rendering",
      "CMYK color separation preview",
      "RIP-ready export with no manual steps",
    ],
  },
  cta: {
    label: "Contact",
    title: "Build with Rams Dev.",
    desc: "Is your business still running on manual work? Let’s talk about the right system, from the production floor to the cloud.",
    emailLabel: "Email",
    waLabel: "WhatsApp",
    socialLabel: "Social",
    copy: "Copy",
    copied: "Copied",
  },
  footer: {
    copyright: "© 2026 Rams Dev · Semarang, Indonesia",
    backToTop: "Back to top",
  },
};

export default en;
