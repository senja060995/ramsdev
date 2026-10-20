import Words from "@/components/Words";
import BezierGridCanvas from "@/components/canvas/BezierGridCanvas";
import { container, SectionLabel } from "@/components/ui";
import type { Content } from "@/content";

export default function NextStep({ c }: { c: Content }) {
  const n = c.next;
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className={`${container} pt-24 sm:pt-32`}>
        <div className="max-w-4xl" data-reveal>
          <SectionLabel index="08">{n.label}</SectionLabel>
          <h2 data-words className="font-wide mt-8 text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
            <Words text={n.title} />
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted">{n.desc}</p>
        </div>
        <ul className="mt-10 flex flex-wrap gap-3" data-reveal style={{ ["--d" as string]: "150ms" }}>
          {n.points.map((p) => (
            <li key={p} className="label border border-line bg-bg/80 px-3 py-2 text-fg backdrop-blur">
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative mt-6 h-[clamp(300px,48vw,620px)] w-full">
        <BezierGridCanvas />
      </div>
    </section>
  );
}
