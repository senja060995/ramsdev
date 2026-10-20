"use client";

import { useRef } from "react";
import { INK, TAU, useCanvas, type DrawFn } from "./useCanvas";

// Sudut raster klasik percetakan untuk tiap separasi warna
const CHANNELS = [
  { color: INK.cyan, angle: 15, phase: 0 },
  { color: INK.magenta, angle: 75, phase: 2.1 },
  { color: INK.yellow, angle: 0, phase: 4.2 },
];

const setup = (): DrawFn => (ctx, w, h, t) => {
  const step = w < 640 ? 11 : 14;
  const maxR = step * 0.5;
  const cx = w / 2;
  const cy = h / 2;
  const n = Math.ceil(Math.hypot(w, h) / 2 / step) + 1;

  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.8;

  for (const ch of CHANNELS) {
    const a = (ch.angle * Math.PI) / 180;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    ctx.fillStyle = ch.color;
    ctx.beginPath();

    for (let i = -n; i <= n; i++) {
      for (let j = -n; j <= n; j++) {
        const u = i * step;
        const v = j * step;
        const x = cx + u * cos - v * sin;
        const y = cy + u * sin + v * cos;
        if (x < -step || x > w + step || y < -step || y > h + step) continue;

        // Medan gelombang: tiga sinus dengan fase berbeda per warna tinta
        const nx = x / w;
        const ny = y / h;
        let f =
          Math.sin(x * 0.0055 + t * 0.55 + ch.phase) +
          Math.sin(y * 0.0085 - t * 0.4 + ch.phase * 0.6) +
          Math.sin((x - y) * 0.0032 + t * 0.3 + ch.phase * 1.4);
        f = (f + 3) / 6; // 0..1
        f = f * f * f * 2.2;

        // Masker: lebih padat ke kanan-atas, menipis di area teks (kiri-bawah)
        const mask = Math.min(1, Math.max(0, 0.15 + nx * 1.05 - ny * 0.45 + 0.25));
        const r = Math.min(maxR, f * mask * maxR);
        if (r < 0.45) continue;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, TAU);
      }
    }
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
};

export default function HalftoneCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvas(ref, setup, { maxDpr: 1.5 });
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
