import Words from "@/components/Words";
import { container, SectionLabel } from "@/components/ui";
import type { Content } from "@/content";

export default function Compare({ c }: { c: Content }) {
  const k = c.compare;
  return (
    <section className="border-t border-line">
      <div className={`${container} py-24 sm:py-32`}>
        <div data-reveal>
          <SectionLabel index="07">{k.label}</SectionLabel>
          <h2 data-words className="font-wide mt-8 max-w-4xl text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
            <Words text={k.title} />
          </h2>
        </div>

        <div className="mt-16 grid border border-line md:grid-cols-2">
          <div className="p-6 sm:p-10" data-reveal>
            <h3 className="label flex items-center gap-3 text-muted">
              <span aria-hidden="true" className="h-2 w-2 border border-muted" />
              {k.manualTitle}
            </h3>
            <ul className="mt-8 space-y-5">
              {k.manual.map((m) => (
                <li key={m} className="flex gap-4 text-lg text-muted">
                  <span aria-hidden="true" className="font-mono text-base leading-7 text-magenta">
                    ✕
                  </span>
                  <s className="decoration-magenta/80 decoration-[1.5px]">{m}</s>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="border-t border-line bg-panel p-6 sm:p-10 md:border-l md:border-t-0"
            data-reveal
            style={{ ["--d" as string]: "150ms" }}
          >
            <h3 className="label flex items-center gap-3 text-fg">
              <span aria-hidden="true" className="h-2 w-2 bg-cyan" />
              {k.ecoTitle}
            </h3>
            <ul className="mt-8 space-y-5">
              {k.eco.map((m) => (
                <li key={m} className="flex gap-4 text-lg text-fg">
                  <span aria-hidden="true" className="font-mono text-base leading-7 text-cyan">
                    ✓
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
