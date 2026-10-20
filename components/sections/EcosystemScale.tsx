import Words from "@/components/Words";
import { container, SectionLabel } from "@/components/ui";
import type { Content } from "@/content";

const RING_COLORS = ["#3FC8E8", "#E0489A", "#F2C94C"];

/** Lingkaran konsentris; jumlah cincin bertambah sesuai tingkat */
function TierIcon({ level }: { level: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 96 96" className="h-20 w-20 sm:h-24 sm:w-24">
      {[1, 2, 3].map((r) => (
        <circle
          key={r}
          cx="48"
          cy="48"
          r={r * 14 + 2}
          fill="none"
          stroke={r <= level ? RING_COLORS[r - 1] : "#1C2330"}
          strokeWidth={r <= level ? 1.5 : 1}
          strokeDasharray={r <= level ? undefined : "2 4"}
        />
      ))}
      <circle cx="48" cy="48" r="5" fill="#ECEFF4" />
    </svg>
  );
}

export default function EcosystemScale({ c }: { c: Content }) {
  const s = c.scale;
  return (
    <section className="border-t border-line">
      <div className={`${container} py-24 sm:py-32`}>
        <div className="grid gap-8 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-3">
            <SectionLabel index="01">{s.label}</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <h2 data-words className="font-wide text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
              <Words text={s.title} />
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted">{s.intro}</p>
          </div>
        </div>

        <ol className="mt-16 grid border-t border-line md:grid-cols-3">
          {s.tiers.map((tier, i) => (
            <li
              key={tier.level}
              data-reveal
              style={{ ["--d" as string]: `${i * 120}ms` }}
              className="relative flex flex-col gap-6 border-b border-line py-10 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
            >
              <div className="flex items-center justify-between">
                <TierIcon level={i + 1} />
                {i < s.tiers.length - 1 && (
                  <span aria-hidden="true" className="label hidden text-muted md:block">
                    →
                  </span>
                )}
              </div>
              <p className="label text-muted">{tier.level}</p>
              <h3 className="font-semiwide text-2xl font-semibold leading-tight sm:text-3xl">{tier.title}</h3>
              <p className="text-muted">{tier.desc}</p>
              <p className="label mt-auto self-start border border-line px-3 py-1.5 text-fg">{tier.tag}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
