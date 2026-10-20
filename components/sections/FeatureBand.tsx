import Words from "@/components/Words";
import LayerStackCanvas from "@/components/canvas/LayerStackCanvas";
import { container, SectionLabel } from "@/components/ui";
import type { Content } from "@/content";

export default function FeatureBand({ c }: { c: Content }) {
  const f = c.feature;
  // Ditampilkan dari atas (Cloud) ke bawah (Mesin Cetak), selaras dengan tumpukan visual
  const layers = f.layers.map((l, i) => ({ ...l, n: i + 1 })).reverse();

  return (
    <section className="relative overflow-hidden border-t border-line bg-panel">
      <div className={`${container} grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-2`}>
        <div data-reveal>
          <SectionLabel index="03">{f.label}</SectionLabel>
          <h2 data-words className="font-wide mt-8 text-[clamp(2rem,4.6vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
            <Words text={f.title} />
          </h2>
          <p className="mt-6 max-w-lg text-lg text-muted">{f.desc}</p>

          <ol className="mt-10 border-t border-line">
            {layers.map((l) => (
              <li key={l.name} className="flex items-baseline gap-5 border-b border-line py-4">
                <span className="label w-6 shrink-0 text-muted">0{l.n}</span>
                <span className="font-medium text-fg">{l.name}</span>
                <span className="ml-auto hidden text-right text-sm text-muted sm:block">{l.desc}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative aspect-square w-full" data-reveal>
          <LayerStackCanvas />
        </div>
      </div>
    </section>
  );
}
