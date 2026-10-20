"use client";

import { useEffect, type RefObject } from "react";

export type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

/**
 * Loop Canvas 2D ringan:
 * - menyesuaikan devicePixelRatio (dibatasi agar hemat GPU)
 * - berhenti saat canvas di luar layar atau tab tersembunyi
 * - prefers-reduced-motion: hanya menggambar satu frame statis
 *
 * `setup` dipanggil sekali dan mengembalikan fungsi gambar per frame.
 */
export function useCanvas(
  ref: RefObject<HTMLCanvasElement | null>,
  setup: (canvas: HTMLCanvasElement) => DrawFn,
  { maxDpr = 1.75, staticTime = 2.4 }: { maxDpr?: number; staticTime?: number } = {},
) {
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const draw = setup(canvas);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    let t = staticTime;
    let last = 0;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, t);
    };

    const loop = (now: number) => {
      // waktu hanya maju saat animasi berjalan, sehingga tidak "melompat" setelah jeda
      if (last) t += Math.min((now - last) / 1000, 0.05);
      last = now;
      render();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };

    const sync = () => {
      const shouldRun = visible && !document.hidden && !motion.matches;
      if (shouldRun && !raf) raf = requestAnimationFrame(loop);
      else if (!shouldRun && raf) stop();
      if (!shouldRun && w) render();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };

    // Komponen bisa memicu canvas.dispatchEvent(new Event("redraw")) setelah aset dimuat
    const redraw = () => {
      if (!raf && w) render();
    };
    canvas.addEventListener("redraw", redraw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "100px" },
    );
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);

    return () => {
      stop();
      canvas.removeEventListener("redraw", redraw);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, [ref, setup, maxDpr, staticTime]);
}

export const INK = {
  cyan: "#3FC8E8",
  magenta: "#E0489A",
  yellow: "#F2C94C",
  fg: "#ECEFF4",
  muted: "#8A93A3",
  line: "#1C2330",
  panel: "#0B0F16",
  bg: "#04060A",
};

export const TAU = Math.PI * 2;
