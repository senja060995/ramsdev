import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rams Dev — Founder & Builder",
  robots: { index: false, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta httpEquiv="refresh" content="0; url=/id/" />
        <link rel="canonical" href="/id/" />
        <script dangerouslySetInnerHTML={{ __html: "location.replace('/id/')" }} />
      </head>
      <body style={{ background: "#04060A", color: "#ECEFF4", fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
