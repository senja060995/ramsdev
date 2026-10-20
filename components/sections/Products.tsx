import Words from "@/components/Words";
import { container, SectionLabel } from "@/components/ui";
import { PRODUCT_LOGOS, type Content } from "@/content";
import ChipArt, { PRODUCT_ACCENT } from "./ChipArt";

const HOVER: Record<string, string> = {
  cyan: "group-hover:text-cyan",
  magenta: "group-hover:text-magenta",
  yellow: "group-hover:text-yellow",
};

export default function Products({ c }: { c: Content }) {
  const p = c.products;
  return (
    <section id="work" className="border-t border-line">
      <div className={`${container} py-24 sm:py-32`}>
        <div className="grid gap-8 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-3">
            <SectionLabel index="05">{p.label}</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <h2 data-words className="font-wide text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
              <Words text={p.title} />
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted">{p.intro}</p>
          </div>
        </div>

        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {p.items.map((item, i) => (
            <li key={item.id} className="group bg-bg transition-colors duration-500 hover:bg-panel">
              <div data-reveal style={{ ["--d" as string]: `${(i % 4) * 90}ms` }} className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="label text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="label text-muted">{item.kind}</span>
              </div>
              <div className="mx-auto my-6 aspect-square w-full max-w-[220px] transition-transform duration-700 group-hover:scale-[1.04]">
                <ChipArt id={item.id} logo={PRODUCT_LOGOS[item.id]} />
              </div>
              <h3
                className={`font-semiwide text-xl font-semibold transition-colors ${HOVER[PRODUCT_ACCENT[item.id]]}`}
              >
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {item.tags.map((t) => (
                  <li key={t} className="label border border-line px-2 py-1 text-[10px] text-muted">
                    {t}
                  </li>
                ))}
              </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
