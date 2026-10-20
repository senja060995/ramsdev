import Words from "@/components/Words";
import VirtualOfficeCanvas from "@/components/canvas/VirtualOfficeCanvas";
import { container, SectionLabel } from "@/components/ui";
import type { Content } from "@/content";

const STEP_COLORS = ["text-yellow", "text-cyan", "text-magenta", "text-cyan"];

export default function VirtualOffice({ c }: { c: Content }) {
  const o = c.office;
  return (
    <section className="border-t border-line">
      <div className={`${container} py-24 sm:py-32`}>
        <div className="grid gap-8 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-3">
            <SectionLabel index="06">{o.label}</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <h2 data-words className="font-wide text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
              <Words text={o.title} />
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted">{o.desc}</p>
          </div>
        </div>

        <div
          className="relative mt-16 aspect-[4/5] w-full overflow-hidden border border-line bg-[radial-gradient(ellipse_at_center,#0B0F16_0%,#04060A_70%)] sm:aspect-[16/10] lg:aspect-[16/9]"
          data-reveal
        >
          <VirtualOfficeCanvas
            labels={{
              roles: o.roles,
              tasks: o.tasks,
              hub: o.hub,
              board: o.board,
              knowledge: o.knowledge,
              channels: o.channels,
            }}
          />
          <p className="label absolute left-4 right-4 top-4 flex w-fit max-w-[calc(100%-2rem)] items-center gap-2 border border-line bg-bg/80 px-3 py-2 text-[9px] text-fg backdrop-blur sm:left-6 sm:top-6 sm:text-[11px]">
            <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            {o.status}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 border-x border-b border-line bg-panel/40 px-6 py-4 font-mono text-[10px] tracking-wider text-muted">
          <span className="flex items-center gap-2"><span aria-hidden="true" className="h-px w-6 bg-cyan" />SiDra → SiHub / SiMar / SiJek</span>
          <span className="flex items-center gap-2"><span aria-hidden="true" className="h-px w-6 bg-magenta" />{c.locale === "id" ? "RESPONS → SiDra" : "RESPONSE → SiDra"}</span>
          <span className="flex items-center gap-2"><span aria-hidden="true" className="h-px w-6 bg-yellow" />LOAD BALANCER ⇄ 5 SERVER</span>
        </div>

        <ol className="mt-px grid gap-px border-x border-b border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {o.steps.map((s, i) => (
            <li key={s.title} className="bg-bg p-6">
              <div data-reveal style={{ ["--d" as string]: `${i * 100}ms` }}>
                <p className={`label ${STEP_COLORS[i % STEP_COLORS.length]}`}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-semiwide mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
