"use client";

import { useRef } from "react";
import { INK, TAU, useCanvas, type DrawFn } from "./useCanvas";

type Pt = [number, number];

const CURVES = [
  { color: INK.cyan, seed: 0 },
  { color: INK.magenta, seed: 2.2 },
  { color: INK.yellow, seed: 4.4 },
];

function handle(ctx: CanvasRenderingContext2D, from: Pt, to: Pt, color: string) {
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.5;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(from[0], from[1]);
  ctx.lineTo(to[0], to[1]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  ctx.fillStyle = INK.bg;
  ctx.beginPath();
  ctx.arc(to[0], to[1], 3.5, 0, TAU);
  ctx.fill();
  ctx.stroke();
}

function anchor(ctx: CanvasRenderingContext2D, p: Pt) {
  ctx.fillStyle = INK.bg;
  ctx.strokeStyle = INK.fg;
  ctx.lineWidth = 1;
  ctx.fillRect(p[0] - 4, p[1] - 4, 8, 8);
  ctx.strokeRect(p[0] - 4, p[1] - 4, 8, 8);
}

function curvePoints(idx: number, w: number, h: number, t: number, horizon: number): Pt[] {
  const s = CURVES[idx].seed;
  const amp = h * 0.22;
  return [
    [w * 0.08, horizon - h * 0.04 - idx * h * 0.05],
    [w * (0.3 + 0.06 * Math.sin(t * 0.5 + s)), horizon - amp * (1.2 + 0.5 * Math.sin(t * 0.7 + s))],
    [w * (0.68 + 0.06 * Math.cos(t * 0.45 + s)), horizon + amp * (0.2 + 0.45 * Math.cos(t * 0.6 + s)) - amp * 0.6],
    [w * 0.92, horizon - h * 0.1 + idx * h * 0.03],
  ];
}

const setup = (): DrawFn => (ctx, w, h, t) => {
  const horizon = h * 0.46;
  const vx = w / 2;

  // Lantai grid perspektif
  ctx.lineWidth = 1;
  const cols = 28;
  for (let i = -cols; i <= cols; i++) {
    const xb = vx + (i / cols) * w * 2.2;
    const g = ctx.createLinearGradient(0, horizon, 0, h);
    g.addColorStop(0, "rgba(28,35,48,0)");
    g.addColorStop(1, "rgba(44,54,72,0.9)");
    ctx.strokeStyle = g;
    ctx.beginPath();
    ctx.moveTo(vx + (i / cols) * w * 0.04, horizon);
    ctx.lineTo(xb, h);
    ctx.stroke();
  }
  const rows = 16;
  const scroll = (t * 0.12) % 1;
  for (let k = 0; k < rows; k++) {
    const z = (k + scroll) / rows;
    const y = horizon + (h - horizon) * z * z;
    ctx.strokeStyle = `rgba(44,54,72,${(z * 0.95).toFixed(3)})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Garis horizon
  const hg = ctx.createLinearGradient(0, 0, w, 0);
  hg.addColorStop(0, "rgba(63,200,232,0)");
  hg.addColorStop(0.5, "rgba(63,200,232,0.55)");
  hg.addColorStop(1, "rgba(63,200,232,0)");
  ctx.strokeStyle = hg;
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(w, horizon);
  ctx.stroke();

  // Kurva bezier beranimasi dengan handle ala editor vektor
  CURVES.forEach((c, idx) => {
    const [p0, c1, c2, p3] = curvePoints(idx, w, h, t, horizon);

    ctx.strokeStyle = c.color;
    ctx.lineWidth = 2;
    ctx.shadowColor = c.color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(p0[0], p0[1]);
    ctx.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], p3[0], p3[1]);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.lineWidth = 1;
    if (idx === 0) {
      handle(ctx, p0, c1, c.color);
      handle(ctx, p3, c2, c.color);
    }
    anchor(ctx, p0);
    anchor(ctx, p3);
  });

  // Titik penanda berjalan di kurva pertama (kursor render)
  const u = (t * 0.18) % 1;
  const P = curvePoints(0, w, h, t, horizon);
  const m = 1 - u;
  const x = m * m * m * P[0][0] + 3 * m * m * u * P[1][0] + 3 * m * u * u * P[2][0] + u * u * u * P[3][0];
  const y = m * m * m * P[0][1] + 3 * m * m * u * P[1][1] + 3 * m * u * u * P[2][1] + u * u * u * P[3][1];
  ctx.fillStyle = INK.fg;
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(236,239,244,0.25)";
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, TAU);
  ctx.stroke();
};

export default function BezierGridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvas(ref, setup);
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
