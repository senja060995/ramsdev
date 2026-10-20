"use client";

import { useMemo, useRef } from "react";
import { INK, TAU, useCanvas, type DrawFn } from "./useCanvas";

export type OfficeLabels = {
  roles: string[];
  tasks: string[];
  hub: string;
  board: string;
  knowledge: string;
  channels: { name: string; icon: string; color: string }[];
};

type P = [number, number];

const N = 10; // ukuran lantai (petak)
const ACC = [INK.yellow, INK.magenta, INK.cyan, INK.yellow, INK.cyan];
// Lima aplikasi bekerja di meja masing-masing; SiDra menjadi pusat sirkulasi.
const DESKS: P[] = [[1.2, 2], [4, 4.1], [4.7, 0.7], [1.2, 6], [5.2, 6.5]];
const APP_NAMES = ["SiPos", "SiDra", "SiHub", "SiMar", "SiJek"];
const HUB = { x: 8.1, y: 3.4, dx: 1.15, dy: 0.9, dz: 0.85 };
const SERVERS = Array.from({ length: 5 }, (_, i) => ({ x: 8.7, y: 5.1 + i * 0.88 }));
const CYCLE = 3.6;
const TYPE_END = 0.86;

const fract = (v: number) => v - Math.floor(v);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (v: number) => {
  const u = clamp01(v);
  return u * u * (3 - 2 * u);
};
const hash = (n: number) => fract(Math.sin(n * 127.1) * 43758.5453);

function bez(a: P, c: P, b: P, u: number): P {
  const m = 1 - u;
  return [m * m * a[0] + 2 * m * u * c[0] + u * u * b[0], m * m * a[1] + 2 * m * u * c[1] + u * u * b[1]];
}

function makeSetup(labels: OfficeLabels) {
  return (canvas: HTMLCanvasElement): DrawFn => {
    const mono = getComputedStyle(canvas).fontFamily || "monospace";
    // logo kanal omnichannel
    const icons = labels.channels.map((c) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => canvas.dispatchEvent(new Event("redraw"));
      img.src = c.icon;
      return img;
    });

    return (ctx, w, h, t) => {
      const wide = w / h > 1.15;
      const wallH = 3; // tinggi dinding (satuan z; 1 = tw/2 px)
      // Layar sempit: adegan diperbesar, sisi dinding sedikit terpotong, kanal di baris bawah
      const tw = wide ? Math.min(w / 13.5, h / 7.7) : Math.min(w / 10.8, h / 11.8);
      const cx = wide ? w * 0.42 : w / 2;
      const sceneH = (N / 2 + wallH / 2) * tw;
      const top = wide ? (h - sceneH) / 2 + (wallH / 2) * tw + tw * 0.1 : (wallH / 2) * tw + tw * 1.2;
      const fs = Math.max(8, Math.min(13, tw * 0.13));

      const iso = (x: number, y: number, z = 0): P => [
        cx + ((x - y) * tw) / 2,
        top + ((x + y) * tw) / 4 - (z * tw) / 2,
      ];
      const poly = (pts: P[], fill?: string, stroke?: string, lw = 1) => {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        if (fill) {
          ctx.fillStyle = fill;
          ctx.fill();
        }
        if (stroke) {
          ctx.strokeStyle = stroke;
          ctx.lineWidth = lw;
          ctx.stroke();
        }
      };
      const box = (
        x: number,
        y: number,
        z: number,
        dx: number,
        dy: number,
        dz: number,
        topC: string,
        leftC: string,
        rightC: string,
        stroke = "#2A3342",
      ) => {
        poly([iso(x, y + dy, z), iso(x + dx, y + dy, z), iso(x + dx, y + dy, z + dz), iso(x, y + dy, z + dz)], leftC, stroke);
        poly([iso(x + dx, y, z), iso(x + dx, y + dy, z), iso(x + dx, y + dy, z + dz), iso(x + dx, y, z + dz)], rightC, stroke);
        poly([iso(x, y, z + dz), iso(x + dx, y, z + dz), iso(x + dx, y + dy, z + dz), iso(x, y + dy, z + dz)], topC, stroke);
      };
      const line = (a: P, b: P, color: string, lw = 1) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
      };
      const text = (s: string, x: number, y: number, color: string, align: CanvasTextAlign = "center", size = fs) => {
        ctx.font = `500 ${size}px ${mono}`;
        ctx.textAlign = align;
        ctx.textBaseline = "middle";
        ctx.fillStyle = color;
        ctx.fillText(s, x, y);
      };

      // ---------- Lantai ----------
      poly([iso(0, 0), iso(N, 0), iso(N, N), iso(0, N)], INK.panel, INK.line);
      ctx.strokeStyle = "#141A25";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 1; i < N; i++) {
        let a = iso(i, 0);
        let b = iso(i, N);
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        a = iso(0, i);
        b = iso(N, i);
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
      }
      ctx.stroke();

      // ---------- Dinding belakang ----------
      poly([iso(0, 0), iso(N, 0), iso(N, 0, wallH), iso(0, 0, wallH)], "#080B11", INK.line);
      poly([iso(0, 0), iso(0, N), iso(0, N, wallH), iso(0, 0, wallH)], "#06080D", INK.line);

      // Papan jadwal konten (dinding kanan-belakang)
      const cols = 7;
      const rows = 3;
      const bx0 = 1;
      const bx1 = 6.4;
      const bz0 = 0.9;
      const bz1 = 2.4;
      const boardTime = t * 0.65;
      const cur = Math.floor(boardTime) % (cols * rows);
      const boardFade = smooth(fract(boardTime) / 0.45);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const x0 = bx0 + (i * (bx1 - bx0)) / cols + 0.06;
          const x1 = bx0 + ((i + 1) * (bx1 - bx0)) / cols - 0.06;
          const z1 = bz1 - (j * (bz1 - bz0)) / rows - 0.06;
          const z0 = bz1 - ((j + 1) * (bz1 - bz0)) / rows + 0.06;
          const scheduled = (i * 3 + j * 5) % 4 === 0;
          const fill = scheduled ? "rgba(63,200,232,0.22)" : "#0E131C";
          const cell = [iso(x0, 0, z0), iso(x1, 0, z0), iso(x1, 0, z1), iso(x0, 0, z1)];
          poly(cell, fill, "#1C2330");
          const previous = (cur + cols * rows - 1) % (cols * rows);
          if (k === cur || k === previous) {
            ctx.globalAlpha = (k === cur ? boardFade : 1 - boardFade) * 0.8;
            poly(cell, ACC[k % 3]);
            ctx.globalAlpha = 1;
          }
        }
      }
      const bl = iso(bx0, 0, bz1 + 0.35);
      text(labels.board, bl[0], bl[1], INK.muted, "left");

      // Layar knowledge base (dinding kiri-belakang)
      const ky0 = 1.2;
      const ky1 = 5.6;
      poly([iso(0, ky0, 0.8), iso(0, ky1, 0.8), iso(0, ky1, 2.5), iso(0, ky0, 2.5)], "#0A0E15", "#1C2330");
      for (let l = 0; l < 6; l++) {
        const z = 2.25 - l * 0.26;
        const len = 0.35 + 0.3 * (1 + Math.sin(hash(l + 1) * TAU + t * (0.5 + l * 0.09)));
        line(
          iso(0, ky0 + 0.3, z),
          iso(0, ky0 + 0.3 + len * (ky1 - ky0 - 0.6), z),
          l === 0 ? INK.yellow : "rgba(138,147,163,0.55)",
          Math.max(1.5, tw * 0.035),
        );
      }
      const kl = iso(0, ky1, 2.85);
      text(labels.knowledge, kl[0], kl[1], INK.muted, "left");

      // ---------- Objek bertumpuk (diurutkan berdasarkan kedalaman) ----------
      type Item = { depth: number; draw: () => void };
      const items: Item[] = [];
      const bubbles: { x: number; y: number; s: string; c: string; a: number }[] = [];
      const tags: { x: number; y: number; s: string; c: string }[] = [];
      

      DESKS.forEach(([x, y], k) => {
        const color = ACC[k];
        const cyc = fract(t / CYCLE + k * 0.27);
        const typing = cyc < TYPE_END;
        const prog = clamp01(cyc / TYPE_END) * 4; // 4 baris teks per siklus
        const Y = y + 0.18; // bidang layar monitor
        const deskDepth = x + 1.6 + y + 0.9;

        items.push({
          depth: deskDepth,
          draw: () => {
            // meja
            box(x, y, 0, 1.6, 0.9, 0.9, "#141A25", "#0C1018", "#0A0D14");
            // monitor + kaki
            box(x + 0.72, y + 0.2, 0.9, 0.16, 0.1, 0.15, "#1C2330", "#0B0F16", "#0B0F16");
            box(x + 0.25, y + 0.1, 1.05, 1.1, 0.08, 1.0, "#1C2330", "#0B0F16", "#0B0F16");
            // layar menyala
            const flash = !typing ? Math.sin(((cyc - TYPE_END) / (1 - TYPE_END)) * Math.PI) * 0.65 : 0;
            ctx.shadowColor = color;
            ctx.shadowBlur = 12 + flash * 18;
            poly(
              [iso(x + 0.32, Y, 1.13), iso(x + 1.28, Y, 1.13), iso(x + 1.28, Y, 1.97), iso(x + 0.32, Y, 1.97)],
              flash > 0 ? `rgba(63,200,232,${(0.08 + flash * 0.2).toFixed(3)})` : "#0B0F16",
              color,
            );
            ctx.shadowBlur = 0;
            // teks yang sedang diketik, baris per baris
            for (let l = 0; l < 4; l++) {
              const f = typing ? clamp01(prog - l) : 1;
              if (f <= 0) continue;
              const z = 1.82 - l * 0.19;
              const maxLen = 0.45 + 0.4 * hash(l + k * 7 + Math.floor(t / CYCLE + k * 0.27) * 13);
              const end = x + 0.42 + f * maxLen * 0.8;
              line(iso(x + 0.42, Y, z), iso(end, Y, z), color, Math.max(1, tw * 0.028));
              // kursor berkedip di ujung baris aktif
              if (typing && f < 1 && fract(t * 3) < 0.6) {
                line(iso(end + 0.05, Y, z - 0.07), iso(end + 0.05, Y, z + 0.07), INK.fg, Math.max(1.5, tw * 0.03));
              }
            }
            // keyboard di atas meja
            const kx0 = x + 0.4;
            const kx1 = x + 1.2;
            const ky0b = y + 0.48;
            const ky1b = y + 0.74;
            poly([iso(kx0, ky0b, 0.9), iso(kx1, ky0b, 0.9), iso(kx1, ky1b, 0.9), iso(kx0, ky1b, 0.9)], "#1C2330", "#2E3849");
            const lit = Math.floor(hash(Math.floor(t * 16) + k * 31) * 14);
            for (let r = 0; r < 2; r++) {
              for (let q = 0; q < 7; q++) {
                const kp = iso(kx0 + 0.07 + q * 0.11, ky0b + 0.08 + r * 0.11, 0.9);
                const on = typing && r * 7 + q === lit;
                ctx.fillStyle = on ? color : "#3A4558";
                ctx.fillRect(kp[0] - 1.5, kp[1] - 1, 3, 2);
              }
            }
          },
        });

        // agen duduk di kursi, menghadap komputer (punggung ke arah penonton)
        const ax = x + 0.8;
        const ay = y + 1.32;
        items.push({
          depth: deskDepth + 0.01,
          draw: () => {
            const s = tw * 1.15;
            const [fx, fy] = iso(ax, ay);
            // kursi
            box(ax - 0.22, ay - 0.15, 0, 0.44, 0.38, 0.5, "#1A2130", "#121722", "#0F141D");
            const by = fy - s * 0.2 + Math.sin(t * 2 + k) * s * 0.008;
            // badan
            ctx.fillStyle = "#1E2636";
            ctx.strokeStyle = "#323D50";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(fx - s * 0.13, by - s * 0.3, s * 0.26, s * 0.3, s * 0.08);
            ctx.fill();
            ctx.stroke();
            // panel punggung (agen terlihat dari belakang, menghadap layar)
            ctx.strokeStyle = color;
            ctx.globalAlpha = 0.7;
            ctx.lineWidth = Math.max(1, s * 0.02);
            ctx.beginPath();
            ctx.moveTo(fx, by - s * 0.27);
            ctx.lineTo(fx, by - s * 0.05);
            ctx.stroke();
            ctx.globalAlpha = 1;
            // lengan ke keyboard, tangan bergantian mengetik
            const shoulderY = by - s * 0.25;
            for (const side of [-1, 1]) {
              const kp = iso(x + 0.8 + side * 0.18, y + 0.66, 0.9);
              const tap = typing ? Math.abs(Math.sin(t * 22 + (side > 0 ? Math.PI / 2 : 0) + k)) * s * 0.035 : 0;
              const hand: P = [kp[0], kp[1] - tap];
              line([fx + side * s * 0.11, shoulderY], hand, "#323D50", Math.max(2, s * 0.05));
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(hand[0], hand[1], Math.max(1.8, s * 0.03), 0, TAU);
              ctx.fill();
            }
            // kepala dengan cincin cahaya
            const hy = by - s * 0.42;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = "#121722";
            ctx.strokeStyle = "#323D50";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(fx, hy, s * 0.12, 0, TAU);
            ctx.fill();
            ctx.stroke();
            // pantulan cahaya layar di sisi kanan-atas kepala
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(fx, hy, s * 0.12, -Math.PI * 0.75, Math.PI * 0.1);
            ctx.stroke();
            ctx.shadowBlur = 0;
            // headset
            ctx.strokeStyle = "#3A4558";
            ctx.lineWidth = Math.max(1.5, s * 0.025);
            ctx.beginPath();
            ctx.arc(fx, hy, s * 0.15, Math.PI * 1.1, Math.PI * 1.9);
            ctx.stroke();

            tags.push({ x: fx, y: fy + tw * 0.32, s: APP_NAMES[k], c: color });
            if (typing && cyc > 0.04 && cyc < TYPE_END - 0.04) {
              const a = smooth(Math.min(1, (cyc - 0.04) / 0.06, (TYPE_END - 0.04 - cyc) / 0.06));
              const task = labels.tasks[k % labels.tasks.length] ?? "";
              bubbles.push({ x: fx - tw * 0.45, y: hy - s * 0.2, s: task, c: color, a });
            }
          },
        });


      });

      // Load balancer membagi lalu lintas ke lima server.
      const hubTop = iso(HUB.x + HUB.dx / 2, HUB.y + HUB.dy / 2, HUB.dz);
      items.push({
        depth: HUB.x + HUB.dx + HUB.y + HUB.dy,
        draw: () => {
          box(HUB.x, HUB.y, 0, HUB.dx, HUB.dy, HUB.dz, "#141A25", "#0C1018", "#0A0D14");
          const pulse = 0.5 + 0.5 * Math.sin(t * 2);
          ctx.strokeStyle = INK.cyan;
          ctx.shadowColor = INK.cyan;
          ctx.shadowBlur = 16;
          ctx.globalAlpha = 0.5 + pulse * 0.5;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(hubTop[0], hubTop[1], tw * 0.32, tw * 0.16, 0, 0, TAU);
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
          const lp = iso(HUB.x + HUB.dx + 0.15, HUB.y + HUB.dy + 0.45);
          text("LOAD BALANCER", lp[0], lp[1], INK.cyan, "center", fs * 0.85);
        },
      });

      // ---------- Kanal omnichannel ----------
      const chs = labels.channels;
      const nodes: P[] = chs.map((_, i) =>
        wide
          ? [w - Math.max(64, w * 0.07), h * 0.17 + (i * h * 0.66) / Math.max(1, chs.length - 1)]
          : [(w * (i + 0.5)) / chs.length, h - Math.max(34, h * 0.085)],
      );
      const r = wide ? Math.max(15, Math.min(22, tw * 0.17)) : Math.max(11, Math.min(15, w / chs.length / 4));
      // Rack server fisik dengan tiga unit, ventilasi, dan LED aktivitas.
      SERVERS.forEach(({ x, y }, i) => {
        items.push({ depth: x + y + 1.3, draw: () => {
          box(x, y, 0, 0.7, 0.62, 1.45, "#202B3C", "#0C131E", "#111D2A");
          for (let slot = 0; slot < 3; slot++) {
            const z = 0.3 + slot * 0.4;
            line(iso(x + 0.72, y + 0.07, z), iso(x + 0.72, y + 0.55, z), "#33485A", 2);
            const led = iso(x + 0.73, y + 0.14, z + 0.13);
            ctx.globalAlpha = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 8 - i * 1.2 + slot));
            ctx.fillStyle = INK.cyan;
            ctx.fillRect(led[0] - 1, led[1] - 1, 2.5, 2.5);
            ctx.globalAlpha = 1;
          }
          const tag = iso(x + 0.4, y + 0.3, 1.75);
          text(`SRV 0${i + 1}`, tag[0], tag[1], INK.cyan, "center", fs * 0.8);
        } });
      });

      items.sort((a, b) => a.depth - b.depth);
      for (const it of items) it.draw();

      // Paket terus mengalir, dengan kecepatan seragam di sepanjang kurva.
      // Setiap rute memakai tabel panjang agar kurva pendek/panjang sama mulusnya.
      const appPorts = DESKS.map(([x, y]) => iso(x + 0.8, y + 0.18, 2));
      const glow = new Array<number>(chs.length).fill(0);
      const burst = new Array<number>(chs.length).fill(-1);
      const flow = (a: P, b: P, color: string, bend: number, seed: number, speed = 370, spacing = 75) => {
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const length = Math.max(1, Math.hypot(dx, dy));
        const ctrl: P = [(a[0] + b[0]) / 2 - dy / length * bend, (a[1] + b[1]) / 2 + dx / length * bend];
        ctx.save();
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(...a);
        ctx.quadraticCurveTo(...ctrl, ...b);
        ctx.stroke();
        const points = [a];
        const lengths = [0];
        for (let i = 1; i <= 24; i++) {
          const p = bez(a, ctrl, b, i / 24);
          lengths.push(lengths[i - 1] + Math.hypot(p[0] - points[i - 1][0], p[1] - points[i - 1][1]));
          points.push(p);
        }
        const total = lengths[24];
        const at = (distance: number): P => {
          const d = Math.max(0, Math.min(total, distance));
          let i = 1;
          while (i < 24 && lengths[i] < d) i++;
          const f = (d - lengths[i - 1]) / Math.max(0.001, lengths[i] - lengths[i - 1]);
          return [points[i - 1][0] + (points[i][0] - points[i - 1][0]) * f,
            points[i - 1][1] + (points[i][1] - points[i - 1][1]) * f];
        };
        const count = Math.max(2, Math.min(7, Math.ceil(total / (spacing * tw / 80))));
        const gap = total / count;
        const phase = (t * speed * tw / 80 + seed * gap) % gap;
        ctx.lineCap = "round";
        for (let i = 0; i < count; i++) {
          const d = phase + i * gap;
          const alpha = smooth(d / (tw * 0.14)) * smooth((total - d) / (tw * 0.14));
          for (let tail = 7; tail > 0; tail--) {
            ctx.globalAlpha = alpha * (1 - tail / 8) * 0.8;
            line(at(d - tail * tw * 0.038), at(d - (tail - 1) * tw * 0.038), color, Math.max(1, tw * 0.025));
          }
          const p = at(d);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = INK.fg;
          ctx.beginPath();
          ctx.arc(p[0], p[1], Math.max(1.2, tw * 0.025), 0, TAU);
          ctx.fill();
        }
        ctx.restore();
      };

      // SiPos → SiDra → SiHub, SiMar, SiJek; semua hasil kembali ke SiDra.
      flow(appPorts[0], appPorts[1], INK.yellow, -tw * 0.4, 0, 480, 48);
      for (const k of [2, 3, 4]) {
        flow(appPorts[1], appPorts[k], INK.cyan, -tw * 0.42, k, 520, 48);
        flow(appPorts[k], appPorts[1], INK.magenta, -tw * 0.42, k + 0.4, 480, 58);
      }
      // SiHub meneruskan data ke aplikasi operasional dan kanal sosial yang sama.
      for (const k of [3, 4]) flow(appPorts[2], appPorts[k], INK.cyan, tw * 0.65, k, 420, 90);
      nodes.forEach((n, i) => {
        flow(appPorts[2], n, chs[i].color, -tw * 0.25, i * 0.37, 440, 100);
        glow[i] = 0.45 + 0.35 * (0.5 + 0.5 * Math.sin(t * 4 - i));
      });
      // Jalur request dan response terpisah: pusat → LB → 5 server → LB → pusat.
      flow(appPorts[1], hubTop, INK.yellow, -tw * 0.2, 0, 560, 42);
      flow(hubTop, appPorts[1], INK.magenta, -tw * 0.2, 0.5, 540, 52);
      SERVERS.forEach(({ x, y }, i) => {
        const port = iso(x + 0.35, y + 0.3, 1.45);
        flow(hubTop, port, INK.cyan, -tw * 0.17, i / 5, 510, 60);
        flow(port, hubTop, INK.yellow, -tw * 0.17, i / 5 + 0.5, 490, 70);
      });

      // titik kanal: logo redup, menyala dengan warna brand saat paket mendarat
      nodes.forEach((n, ci) => {
        const brand = chs[ci].color;
        const g = glow[ci];
        if (burst[ci] >= 0) {
          const q = burst[ci];
          ctx.strokeStyle = brand;
          ctx.globalAlpha = smooth(q / 0.12) * (1 - smooth(q)) * 0.65;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(n[0], n[1], r + 3 + q * r * 1.3, 0, TAU);
          ctx.stroke();
        }
        // lencana logo
        ctx.globalAlpha = 0.45 + g * 0.55;
        ctx.shadowColor = brand;
        ctx.shadowBlur = g * 22;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(n[0], n[1], r, 0, TAU);
        ctx.fill();
        ctx.shadowBlur = 0;
        const img = icons[ci];
        if (img?.complete && img.naturalWidth) {
          const s = r * 1.72;
          const ar = img.naturalWidth / img.naturalHeight;
          const iw = ar >= 1 ? s : s * ar;
          const ih = ar >= 1 ? s / ar : s;
          ctx.save();
          ctx.beginPath();
          ctx.arc(n[0], n[1], r - 1, 0, TAU);
          ctx.clip();
          ctx.drawImage(img, n[0] - iw / 2, n[1] - ih / 2, iw, ih);
          ctx.restore();
        }
        ctx.globalAlpha = 1;
        ctx.strokeStyle = g > 0.02 ? brand : "#2A3342";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(n[0], n[1], r + 1, 0, TAU);
        ctx.stroke();
        text(chs[ci].name.toUpperCase(), n[0], n[1] + r + fs * 1.2, INK.muted, "center", wide ? fs : fs * 0.72);
      });

      // label peran tiap meja
      ctx.font = `500 ${fs}px ${mono}`;
      for (const g of tags) {
        const gw = ctx.measureText(g.s).width + fs;
        ctx.fillStyle = "rgba(4,6,10,0.85)";
        ctx.fillRect(g.x - gw / 2, g.y - fs * 0.75, gw, fs * 1.5);
        text(g.s, g.x, g.y, g.c);
      }

      // balon tugas
      ctx.font = `500 ${fs}px ${mono}`;
      for (const b of bubbles) {
        const bw = ctx.measureText(b.s).width + fs * 1.4;
        const bh = fs * 2;
        const bx = Math.max(4, Math.min(w - bw - 4, b.x - bw / 2));
        ctx.globalAlpha = b.a;
        ctx.fillStyle = "rgba(4,6,10,0.92)";
        ctx.strokeStyle = b.c;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(bx, b.y - bh, bw, bh, 3);
        ctx.fill();
        ctx.stroke();
        text(b.s, bx + bw / 2, b.y - bh / 2, INK.fg);
      }
      ctx.globalAlpha = 1;
      ctx.textAlign = "start";
    };
  };
}

export default function VirtualOfficeCanvas({ labels }: { labels: OfficeLabels }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const setup = useMemo(() => makeSetup(labels), [labels]);
  useCanvas(ref, setup);
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full font-mono" />;
}
