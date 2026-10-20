import Words from "@/components/Words";
import { container, SectionLabel } from "@/components/ui";
import type { Content } from "@/content";

const DOTS = ["bg-yellow", "bg-magenta", "bg-cyan"];

export default function Builder({ c }: { c: Content }) {
  const b = c.builder;
  return (
    <section className="border-t border-line">
      <div className={`${container} py-24 sm:py-32`}>
        <div data-reveal>
          <SectionLabel index="02">{b.label}</SectionLabel>
          <h2 data-words className="font-wide mt-8 max-w-5xl text-[clamp(2rem,5.4vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
            <Words text={b.title} />
          </h2>
        </div>

        <div className="mt-16 border-t border-line">
          {b.entities.map((e, i) => (
            <article key={e.name} className="grid gap-8 border-b border-line py-12 lg:grid-cols-12" data-reveal>
              <header className="lg:col-span-4">
                <span aria-hidden="true" className={`mb-5 block h-2 w-2 ${DOTS[i % DOTS.length]}`} />
                <h3 className="font-semiwide text-2xl font-semibold leading-tight sm:text-3xl">{e.name}</h3>
                <p className="label mt-3 text-muted">{e.sub}</p>
              </header>
              <ul className="grid gap-px bg-line sm:grid-cols-2 lg:col-span-8">
                {e.items.map((item, k) => (
                  <li key={item.title} className="bg-bg py-6 sm:p-6 sm:odd:pl-0">
                    <p className="label text-muted">{String(k + 1).padStart(2, "0")}</p>
                    <p className="mt-3 text-lg font-medium text-fg">{item.title}</p>
                    <p className="mt-2 text-muted">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
