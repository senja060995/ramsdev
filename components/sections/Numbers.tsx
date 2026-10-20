import Words from "@/components/Words";
import { container, SectionLabel } from "@/components/ui";
import { STATS, type Content } from "@/content";

const BAR_COLORS = ["bg-cyan", "bg-magenta", "bg-yellow"];

export default function Numbers({ c }: { c: Content }) {
  const n = c.numbers;
  const fmt = new Intl.NumberFormat(c.locale === "id" ? "id-ID" : "en-US");
  const ph = STATS.isPlaceholder;
  const max = Math.max(...STATS.bars);
  // Skala logaritmik agar 1 vs 1.000 tetap terbaca
  const width = (v: number) => Math.max(3, ((Math.log10(v) + 0.25) / (Math.log10(max) + 0.25)) * 100);

  const Note = () => (
    <p className="label inline-flex items-center gap-2 border border-dashed border-yellow px-3 py-1.5 text-yellow">
      <span aria-hidden="true">▲</span>
      {n.placeholderNote}
    </p>
  );

  return (
    <section className="border-t border-line">
      <div className={`${container} py-24 sm:py-32`}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
          <div>
            <SectionLabel index="04">{n.label}</SectionLabel>
            <h2 data-words className="font-wide mt-8 text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
              <Words text={n.title} />
            </h2>
          </div>
          {ph && <Note />}
        </div>

        <dl className="mt-16 grid border-y border-line md:grid-cols-3">
          {STATS.items.map((s, i) => (
            <div
              key={i}
              data-reveal
              style={{ ["--d" as string]: `${i * 120}ms` }}
              className="border-b border-line py-10 last:border-b-0 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
            >
              <dt className="label text-muted">{n.stats[i]?.label}</dt>
              <dd
                className={`font-wide mt-4 text-[clamp(3.25rem,16vw,5rem)] md:text-[clamp(2.75rem,5.4vw,6rem)] font-extrabold leading-none tracking-[-0.03em] ${
                  ph ? "text-yellow" : "text-fg"
                }`}
              >
                <span className={ph ? "border-b-2 border-dashed border-yellow/70" : ""}>
                  {fmt.format(s.value)}
                  {s.suffix}
                </span>
              </dd>
              <dd className="mt-5 text-muted">{n.stats[i]?.sub}</dd>
            </div>
          ))}
        </dl>

        <div className={`mt-16 p-5 sm:p-8 ${ph ? "border border-dashed border-yellow/60" : "border border-line"}`} data-reveal>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="label text-fg">{n.barsTitle}</h3>
            <p className="label text-muted">log₁₀</p>
          </div>
          <ul className="mt-8 space-y-6">
            {STATS.bars.map((v, i) => (
              <li key={i}>
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-muted">{n.bars[i]?.label}</span>
                  <span className={`label shrink-0 ${ph ? "text-yellow" : "text-fg"}`}>
                    {fmt.format(v)} {n.bars[i]?.unit}
                  </span>
                </div>
                <div className="mt-3 h-3 w-full bg-line/60">
                  <div
                    className={`bar h-full origin-left ${BAR_COLORS[i % BAR_COLORS.length]}`}
                    style={{ width: `${width(v)}%`, ["--d" as string]: `${200 + i * 150}ms` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
