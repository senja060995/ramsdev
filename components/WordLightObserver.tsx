"use client";

import { useEffect } from "react";

/**
 * Efek "word-light": kata-kata di dalam [data-words] menyala satu per satu
 * mengikuti posisi scroll, dan meredup lagi saat di-scroll balik.
 * Bila prefers-reduced-motion aktif, semua kata langsung menyala.
 */
export default function WordLightObserver() {
  useEffect(() => {
    const blocks = [...document.querySelectorAll<HTMLElement>("[data-words]")].map((el) => ({
      el,
      words: [...el.querySelectorAll<HTMLElement>(".w")],
      lit: -1,
    }));
    if (!blocks.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      blocks.forEach((b) => b.words.forEach((w) => w.classList.add("is-lit")));
      return;
    }

    let raf = 0;
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      for (const b of blocks) {
        const rect = b.el.getBoundingClientRect();
        // progres 0 → 1 saat blok bergerak dari 72% tinggi layar ke atas
        const t = Math.max(0, Math.min(1, (vh * 0.72 - rect.top) / (rect.height + vh * 0.16)));
        const lit = Math.ceil(t * b.words.length);
        if (lit === b.lit) continue;
        b.lit = lit;
        b.words.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    apply();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
