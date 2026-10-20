import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { getContent, isLocale, locales, SITE_URL } from "@/content";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#04060A",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const c = getContent(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: c.meta.title,
    description: c.meta.description,
    applicationName: "Rams Dev",
    authors: [{ name: "Rams Dev" }],
    alternates: {
      canonical: `/${c.locale}/`,
      languages: { id: "/id/", en: "/en/", "x-default": "/id/" },
    },
    openGraph: {
      type: "website",
      siteName: "Rams Dev",
      title: "Rams Dev",
      description: c.meta.description,
      url: `/${c.locale}/`,
      locale: c.ogLocale,
      alternateLocale: c.locale === "id" ? ["en_US"] : ["id_ID"],
      images: [{ url: `/${c.locale}/og.png`, width: 1200, height: 630, alt: "Rams Dev" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rams Dev",
      description: c.meta.description,
      images: [`/${c.locale}/og.png`],
    },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Tandai bahwa JS aktif agar animasi reveal hanya menyembunyikan elemen bila JS berjalan */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
