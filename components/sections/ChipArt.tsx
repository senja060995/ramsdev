import type { ReactNode } from "react";
import type { Accent, ProductId } from "@/content/types";

const HEX: Record<Accent, string> = { cyan: "#3FC8E8", magenta: "#E0489A", yellow: "#F2C94C" };

export const PRODUCT_ACCENT: Record<ProductId, Accent> = {
  sidra: "cyan",
  sihub: "magenta",
  sihr: "yellow",
  simar: "cyan",
  sijek: "magenta",
  siweb: "yellow",
  printing: "cyan",
  next: "yellow",
};

const CODES: Record<ProductId, string> = {
  sidra: "SD-01",
  sihub: "SH-02",
  sihr: "HR-03",
  simar: "SM-04",
  sijek: "SJ-05",
  siweb: "SW-06",
  printing: "SP-00",
  next: "NX-??",
};

/** Pola unik di dalam "die" chip, area 44..116 */
function Die({ id, c }: { id: ProductId; c: string }): ReactNode {
  switch (id) {
    case "sihub": {
      const nodes = Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        return [80 + Math.cos(a) * 24, 80 + Math.sin(a) * 24];
      });
      return (
        <g stroke={c} fill="none">
          <circle cx="80" cy="80" r="24" strokeOpacity=".25" strokeDasharray="2 3" />
          {nodes.map(([x, y], i) => (
            <g key={i}>
              <line x1="80" y1="80" x2={x} y2={y} strokeOpacity=".6" />
              <circle cx={x} cy={y} r="3.5" fill="#070A10" />
            </g>
          ))}
          <circle cx="80" cy="80" r="7" fill={c} />
          {/* kilau AI */}
          <path d="M104 50 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill={c} stroke="none" />
        </g>
      );
    }
    case "simar":
      return (
        <g>
          {Array.from({ length: 16 }, (_, k) => {
            const i = k % 4;
            const j = Math.floor(k / 4);
            const on = [1, 6, 9, 10, 15].includes(k);
            return (
              <rect
                key={k}
                x={54 + i * 14}
                y={54 + j * 14}
                width="10"
                height="10"
                fill={on ? c : "none"}
                stroke={c}
                strokeOpacity={on ? 1 : 0.35}
              />
            );
          })}
        </g>
      );
    case "sijek":
      return (
        <g fill="none" stroke={c}>
          <path d="M54 104 L54 84 L76 84 L76 62 L104 62 L104 54" strokeDasharray="3 3" strokeOpacity=".8" />
          <path d="M54 104 L80 104 L80 92 L104 92" strokeOpacity=".25" />
          <circle cx="54" cy="104" r="4" fill={c} />
          <path d="M104 46 a6 6 0 0 1 6 6 c0 5 -6 10 -6 10 s-6 -5 -6 -10 a6 6 0 0 1 6 -6z" fill="#070A10" />
          <circle cx="104" cy="52" r="2" fill={c} />
        </g>
      );
    case "sidra":
      return (
        <g>
          {[46, 30, 38, 22, 42, 34].map((wd, i) => (
            <g key={i}>
              <rect x="54" y={54 + i * 9} width={wd} height="4" fill={c} fillOpacity={i === 0 ? 1 : 0.45} />
              <rect x={54 + wd + 4} y={54 + i * 9} width="10" height="4" fill={c} fillOpacity=".15" />
            </g>
          ))}
          <line x1="54" y1="108" x2="106" y2="108" stroke={c} />
        </g>
      );
    case "siweb":
      return (
        <g fill="none" stroke={c}>
          <rect x="50" y="54" width="60" height="52" rx="3" fill="#070A10" />
          <line x1="50" y1="64" x2="110" y2="64" strokeOpacity=".6" />
          <circle cx="56" cy="59" r="1.5" fill={c} />
          <circle cx="61" cy="59" r="1.5" fill={c} fillOpacity=".6" />
          <circle cx="66" cy="59" r="1.5" fill={c} fillOpacity=".3" />
          <rect x="56" y="70" width="48" height="12" fill={c} fillOpacity=".25" stroke="none" />
          <rect x="56" y="86" width="22" height="14" strokeOpacity=".6" />
          <line x1="82" y1="88" x2="104" y2="88" strokeOpacity=".6" />
          <line x1="82" y1="93" x2="100" y2="93" strokeOpacity=".4" />
          <line x1="82" y1="98" x2="96" y2="98" strokeOpacity=".3" />
        </g>
      );
    case "sihr":
      return (
        <g fill="none" stroke={c} strokeLinecap="round">
          {[6, 12, 18, 24, 30].map((r, i) => (
            <path
              key={r}
              d={`M${80 - r} ${84} a${r} ${r} 0 0 1 ${r * 2} 0`}
              strokeOpacity={1 - i * 0.15}
              strokeDasharray={i % 2 ? "6 3" : undefined}
            />
          ))}
          <line x1="80" y1="84" x2="80" y2="104" />
          <circle cx="80" cy="84" r="2.5" fill={c} />
        </g>
      );
    case "printing":
      return (
        <g style={{ mixBlendMode: "screen" }}>
          <circle cx="72" cy="74" r="17" fill={HEX.cyan} fillOpacity=".85" />
          <circle cx="88" cy="74" r="17" fill={HEX.magenta} fillOpacity=".85" />
          <circle cx="80" cy="88" r="17" fill={HEX.yellow} fillOpacity=".85" />
        </g>
      );
    case "next":
      return (
        <g>
          <rect x="52" y="52" width="56" height="56" fill="none" stroke={c} strokeDasharray="3 4" strokeOpacity=".7" />
          <path d="M80 66 v28 M66 80 h28" stroke={c} strokeWidth="1.5" />
          <text x="80" y="118" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={c} letterSpacing="1">
            C++
          </text>
        </g>
      );
  }
}

export default function ChipArt({ id, logo }: { id: ProductId; logo?: string }) {
  const c = HEX[PRODUCT_ACCENT[id]];
  const pins = Array.from({ length: 9 }, (_, i) => 36 + i * 11);

  return (
    <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c} stopOpacity=".16" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="78" fill={`url(#glow-${id})`} />
      <g fill="#2A3342">
        {pins.map((p) => (
          <g key={p}>
            <rect x={p - 2} y="14" width="4" height="10" />
            <rect x={p - 2} y="136" width="4" height="10" />
            <rect x="14" y={p - 2} width="10" height="4" />
            <rect x="136" y={p - 2} width="10" height="4" />
          </g>
        ))}
      </g>
      <rect x="24" y="24" width="112" height="112" rx="6" fill="#0B0F16" stroke="#1C2330" />
      <rect x="40" y="40" width="80" height="80" rx="3" fill="#070A10" stroke={c} strokeOpacity=".55" />
      {logo ? (
        <image href={logo} x="48" y="48" width="64" height="64" preserveAspectRatio="xMidYMid meet" />
      ) : (
        <Die id={id} c={c} />
      )}
      <circle cx="32" cy="32" r="2" fill={c} />
      <text x="128" y="132" textAnchor="end" fontFamily="monospace" fontSize="6" fill="#8A93A3" letterSpacing="1">
        {CODES[id]}
      </text>
    </svg>
  );
}
