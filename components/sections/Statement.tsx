import Words from "@/components/Words";
import { container, SectionLabel } from "@/components/ui";
import type { Content } from "@/content";

export default function Statement({ c }: { c: Content }) {
  return (
    <section className="border-t border-line">
      <div className={`${container} grid gap-10 py-24 sm:py-36 lg:grid-cols-12`}>
        <div className="lg:col-span-3" data-reveal>
          <SectionLabel index="00">{c.statement.label}</SectionLabel>
        </div>
        <p
          data-reveal
          data-words
          className="font-semiwide text-[clamp(1.6rem,3.6vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.015em] lg:col-span-9"
        >
          <Words text={c.statement.text} />
        </p>
      </div>
    </section>
  );
}
