"use client";

import { useRef } from "react";
import { INK, TAU, useCanvas, type DrawFn } from "./useCanvas";

const LAYERS = 5;
const ACCENTS = [INK.yellow, INK.magenta, INK.cyan, INK.magenta, INK.cyan];

const setup = (canvas: HTMLCanvasElement): DrawFn => {
  const mono = getComputedStyle(canvas).fontFamily || "monospace";

  return (ctx, w, h, t) => {
    const s = Math.min(w / 2.6, h / 2.4);
    const a = s * 0.95; // setengah lebar belah ketupat
    const b = a * 0.5; // setengah tinggi (isometrik 2:1)
    const depth = s * 0.07;
    const gap = s * 0.3;
    const cx = w / 2;
    const baseY = h / 2 + gap * 2 + b * 0.15;
    const active = Math.floor(t / 1.8) % LAYERS;
    const pulse = 0.5 + 0.5 * Math.sin((t % 1.8) / 1.8 * Math.PI);

    const ys: number[] = [];
    for (let i = 0; i < LAYERS; i++) {
      ys.push(baseY - i * gap - Math.sin(t * 0.9 + i * 0.7) * s * 0.025 - (i === active ? pulse * s * 0.04 : 0));
    }

    // Garis penghubung vertikal di sudut-sudut
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = INK.line;
    ctx.lineWidth = 1;
    for (const dx of [-a, a, 0]) {
      ctx.beginPath();
      ctx.moveTo(cx + dx, ys[0] + (dx === 0 ? b : 0));
      ctx.lineTo(cx + dx, ys[LAYERS - 1] + (dx === 0 ? b : 0));
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Partikel data mengalir naik
    for (let k = 0; k < 6; k++) {
      const p = (t * 0.25 + k / 6) % 1;
      const y = ys[0] - p * (ys[0] - ys[LAYERS - 1]);
      ctx.fillStyle = ACCENTS[k % 3];
      ctx.globalAlpha = Math.sin(p * Math.PI);
      ctx.beginPath();
      ctx.arc(cx + (k % 2 ? a : -a), y, 2, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    for (let i = 0; i < LAYERS; i++) {
      const y = ys[i];
      const isActive = i === active;
      const accent = ACCENTS[i];
      const top = [
        [cx, y - b],
        [cx + a, y],
        [cx, y + b],
        [cx - a, y],
      ];

      // Sisi tebal (kiri & kanan)
      ctx.fillStyle = "#070A10";
      ctx.beginPath();
      ctx.moveTo(cx - a, y);
      ctx.lineTo(cx, y + b);
      ctx.lineTo(cx + a, y);
      ctx.lineTo(cx + a, y + depth);
      ctx.lineTo(cx, y + b + depth);
      ctx.lineTo(cx - a, y + depth);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = isActive ? accent : INK.line;
      ctx.globalAlpha = isActive ? 0.6 : 1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Permukaan atas
      ctx.beginPath();
      ctx.moveTo(top[0][0], top[0][1]);
      for (let k = 1; k < 4; k++) ctx.lineTo(top[k][0], top[k][1]);
      ctx.closePath();
      ctx.fillStyle = INK.panel;
      ctx.fill();

      // Pola grid di permukaan
      ctx.save();
      ctx.clip();
      ctx.strokeStyle = isActive ? accent : "#151B26";
      ctx.globalAlpha = isActive ? 0.35 + pulse * 0.25 : 1;
      ctx.lineWidth = 1;
      const cells = 8;
      ctx.beginPath();
      for (let k = 1; k < cells; k++) {
        const f = k / cells;
        // garis sejajar sisi kiri-atas & kanan-atas
        ctx.moveTo(cx - a + a * f, y - b * f);
        ctx.lineTo(cx + a * f, y + b - b * f);
        ctx.moveTo(cx + a - a * f, y - b * f);
        ctx.lineTo(cx - a * f, y + b - b * f);
      }
      ctx.stroke();
      ctx.restore();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.moveTo(top[0][0], top[0][1]);
      for (let k = 1; k < 4; k++) ctx.lineTo(top[k][0], top[k][1]);
      ctx.closePath();
      ctx.strokeStyle = isActive ? accent : "#2A3342";
      ctx.lineWidth = isActive ? 1.5 : 1;
      ctx.stroke();

      // Nomor lapisan
      ctx.font = `500 ${Math.max(10, s * 0.06)}px ${mono}`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = isActive ? accent : INK.muted;
      ctx.fillText(`0${i + 1}`, cx + a + s * 0.06, y + depth / 2);
    }
  };
};

export default function LayerStackCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvas(ref, setup);
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full font-mono" />;
}
