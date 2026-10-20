import type { Content } from "@/content";
import { container, InkRule } from "./ui";

export default function Footer({ c }: { c: Content }) {
  return (
    <footer className="border-t border-line">
      <div className={`${container} flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between`}>
        <div className="space-y-4">
          <InkRule />
          <p className="font-wide text-2xl font-extrabold tracking-[0.04em]">RAMS DEV</p>
          <p className="text-sm text-muted">{c.footer.copyright}</p>
        </div>
        <div className="label flex flex-wrap items-center gap-6 text-muted">
          <a href="/id/" hrefLang="id" lang="id" className="hover:text-fg">
            Bahasa Indonesia
          </a>
          <a href="/en/" hrefLang="en" lang="en" className="hover:text-fg">
            English
          </a>
          <a href="#top" className="text-fg hover:text-cyan">
            {c.footer.backToTop} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
