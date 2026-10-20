"use client";

import { useEffect, useState } from "react";
import type { Content, Locale } from "@/content";
import { container } from "./ui";

export default function Navbar({ c }: { c: Content }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const other: Locale = c.locale === "id" ? "en" : "id";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? "border-line bg-bg/70 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label={c.locale === "id" ? "Navigasi utama" : "Main navigation"} className={`${container} flex h-16 items-center justify-between gap-3`}>
        <a href={`/${c.locale}/`} className="font-wide text-[15px] font-extrabold tracking-[0.04em] sm:text-base">
          RAMS DEV
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="label flex h-9 items-center border border-line" role="group" aria-label="Language">
            {(["id", "en"] as const).map((l) => (
              <a
                key={l}
                href={`/${l}/`}
                hrefLang={l}
                lang={l}
                aria-current={l === c.locale ? "page" : undefined}
                className={`flex h-full items-center px-2.5 transition-colors ${
                  l === c.locale ? "bg-fg text-bg" : "text-muted hover:text-fg"
                }`}
              >
                {l.toUpperCase()}
                {l === other && <span className="sr-only"> — {c.a11y.switchLang}</span>}
              </a>
            ))}
          </div>
          <a
            href="#work"
            className="label hidden h-9 items-center border border-fg/25 px-4 transition-colors hover:border-fg sm:inline-flex"
          >
            {c.nav.work}
          </a>
          <a
            href="#contact"
            className="label inline-flex h-9 items-center bg-fg px-3 text-bg transition-colors hover:bg-cyan sm:px-4"
          >
            {c.nav.contact}
          </a>
        </div>
      </nav>
    </header>
  );
}
