"use client";

import { useEffect } from "react";

/**
 * Parallax ringan untuk hero:
 * - [data-parallax="0.3"]: bergeser vertikal sebesar scrollY × nilai
 * - [data-pointer="12"]: ikut bergeser mengikuti kursor (maks. 12px), hanya di perangkat bermouse
 * - [data-fade]: memudar saat hero di-scroll keluar
 * Dimatikan bila prefers-reduced-motion aktif.
 */
export default function HeroParallax({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = [...root.querySelectorAll<HTMLElement>("[data-parallax]")].map((el) => ({
      el,
      speed: parseFloat(el.dataset.parallax || "0"),
      pointer: parseFloat(el.dataset.pointer || "0"),
    }));
    const fades = [...root.querySelectorAll<HTMLElement>("[data-fade]")];
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;

    const render = () => {
      raf = 0;
      // haluskan gerak kursor
      tx += (px - tx) * 0.08;
      ty += (py - ty) * 0.08;
      const y = window.scrollY;
      const h = root.offsetHeight || window.innerHeight;
      if (y > h * 1.2) return; // hero sudah jauh di atas, tidak perlu dihitung

      for (const l of layers) {
        const dx = tx * l.pointer;
        const dy = y * l.speed + ty * l.pointer;
        l.el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      }
      const o = Math.max(0, 1 - y / (h * 0.65));
      for (const el of fades) el.style.opacity = o.toFixed(3);

      if (Math.abs(px - tx) > 0.002 || Math.abs(py - ty) > 0.002) schedule();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onPointer = (e: PointerEvent) => {
      px = (e.clientX / window.innerWidth - 0.5) * 2;
      py = (e.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [targetId]);

  return null;
}
