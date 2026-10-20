import { ImageResponse } from "next/og";
import { getContent, locales } from "@/content";

// Menghasilkan /id/og.png dan /en/og.png saat build (Open Graph per bahasa)
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const INKS = ["#3FC8E8", "#E0489A", "#F2C94C"];

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const c = getContent(lang);

  // Pola titik halftone sederhana di sisi kanan
  const dots: { x: number; y: number; r: number; c: string }[] = [];
  for (let i = 0; i < 18; i++) {
    for (let j = 0; j < 16; j++) {
      const v = (Math.sin(i * 0.5) + Math.cos(j * 0.45 + i * 0.2) + 2) / 4;
      const r = Math.max(0, v * v * 13 * (i / 18));
      if (r > 1) dots.push({ x: 620 + i * 32, y: 40 + j * 36, r, c: INKS[(i + j) % 3] });
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#04060A",
          color: "#ECEFF4",
        }}
      >
        {dots.map((d, k) => (
          <div
            key={k}
            style={{
              position: "absolute",
              left: d.x - d.r,
              top: d.y - d.r,
              width: d.r * 2,
              height: d.r * 2,
              borderRadius: 999,
              background: d.c,
              opacity: 0.85,
            }}
          />
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 72,
            width: "100%",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#8A93A3", display: "flex" }}>
            FOUNDER · BUILDER · SEMARANG
          </div>
          <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: -4, lineHeight: 1, marginTop: 16 }}>
            RAMS DEV
          </div>
          <div style={{ fontSize: 34, color: "#ECEFF4", marginTop: 24, maxWidth: 820 }}>
            {c.hero.tagline}
          </div>
          <div style={{ display: "flex", marginTop: 40, gap: 12 }}>
            {INKS.map((color) => (
              <div key={color} style={{ width: 64, height: 6, background: color }} />
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
