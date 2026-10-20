import Words from "@/components/Words";
import CopyButton from "@/components/CopyButton";
import { container, InkRule, SectionLabel } from "@/components/ui";
import { CONTACT, SOCIALS, type Content } from "@/content";

export default function Cta({ c }: { c: Content }) {
  const k = c.cta;
  const rows = [
    { label: k.emailLabel, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: k.waLabel, value: CONTACT.whatsapp, href: CONTACT.whatsappLink },
  ];

  return (
    <section id="contact" className="border-t border-line">
      <div className={`${container} py-24 sm:py-36`}>
        <div data-reveal>
          <SectionLabel index="09">{k.label}</SectionLabel>
        </div>
        <h2
          data-reveal
          data-words
          className="font-wide mt-10 text-[clamp(2.6rem,9vw,9.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em]"
        >
          <Words text={k.title} />
        </h2>
        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-reveal>
          <p className="max-w-xl text-lg text-muted">{k.desc}</p>
          <InkRule />
        </div>

        <dl className="mt-16 border-t border-line">
          {rows.map((r) => (
            <div
              key={r.label}
              data-reveal
              className="grid gap-4 border-b border-line py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-center"
            >
              <dt className="label text-muted">{r.label}</dt>
              <dd className="min-w-0">
                <a
                  href={r.href}
                  className="font-semiwide block break-all text-2xl font-medium transition-colors hover:text-cyan sm:text-3xl"
                >
                  {r.value}
                </a>
              </dd>
              <dd>
                <CopyButton
                  value={r.value}
                  label={k.copy}
                  copiedLabel={k.copied}
                  srLabel={`${r.label} ${r.value}`}
                  srCopied={c.a11y.copied}
                />
              </dd>
            </div>
          ))}
          {SOCIALS.length > 0 && (
            <div data-reveal className="grid gap-4 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:items-center">
              <dt className="label text-muted">{k.socialLabel}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-8 gap-y-3">
                  {SOCIALS.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg underline decoration-line underline-offset-8 transition-colors hover:text-cyan hover:decoration-cyan"
                      >
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
