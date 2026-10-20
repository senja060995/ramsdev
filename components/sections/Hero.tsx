import HalftoneCanvas from "@/components/canvas/HalftoneCanvas";
import HeroParallax from "@/components/HeroParallax";
import { ButtonLink, container } from "@/components/ui";
import { PHOTO, PHOTO_SIZE, type Content } from "@/content";

export default function Hero({ c }: { c: Content }) {
  const h = c.hero;
  const words = h.title.split(" ");

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Lapisan 1: raster halftone, bergerak paling lambat */}
        <div data-parallax="0.35" className="absolute inset-0 will-change-transform">
          <HalftoneCanvas />
        </div>

        {/* Lapisan 2: foto. Mobile: area atas, di atas judul. Desktop: kolom kanan, bebas dari teks */}
        {PHOTO && (
          <div
            data-parallax="0.18"
            data-pointer="10"
            className="absolute inset-x-0 bottom-[36%] top-16 will-change-transform sm:bottom-[30%] lg:inset-y-auto lg:bottom-0 lg:left-auto lg:right-0 lg:top-24 lg:w-[48%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO}
              alt="Rams Dev"
              width={PHOTO_SIZE.width}
              height={PHOTO_SIZE.height}
              fetchPriority="high"
              decoding="async"
              className="hero-photo absolute bottom-0 right-[-6%] h-full w-auto max-w-none sm:right-[4%] lg:right-[8%]"
            />
          </div>
        )}

        {/* Gradasi agar teks terbaca dan foto menyatu dengan latar */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-bg/0 lg:via-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-bg/30" />
      </div>

      <div data-parallax="-0.12" data-fade className={`${container} pb-10 pt-32 sm:pb-14`}>
        <p className="label hero-in text-muted" style={{ ["--d" as string]: "100ms" }}>
          {h.eyebrow}
        </p>
        <h1 className="font-wide mt-5 text-[clamp(3rem,13.5vw,14.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.02em] lg:text-[clamp(6rem,11vw,12.5rem)]">
          {words.map((w, i) => (
            <span key={i} className="lg:block">
              {w}
              {i < words.length - 1 && " "}
            </span>
          ))}
        </h1>
        <div className="mt-8 flex flex-col gap-8 lg:max-w-[52%]">
          <p
            className="hero-in max-w-xl text-xl leading-snug text-fg sm:text-2xl"
            style={{ ["--d" as string]: "250ms" }}
          >
            {h.tagline}
          </p>
          <div className="hero-in flex flex-wrap gap-3" style={{ ["--d" as string]: "400ms" }}>
            <ButtonLink href="#work">{h.primaryCta} →</ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              {h.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <ul
          className="label hero-in mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-muted"
          style={{ ["--d" as string]: "550ms" }}
        >
          {h.meta.map((m, i) => (
            <li key={m} className="flex items-center gap-6">
              {i > 0 && (
                <span aria-hidden="true" className="hidden text-muted/50 sm:inline">
                  ·
                </span>
              )}
              {m}
            </li>
          ))}
        </ul>
      </div>

      <HeroParallax targetId="top" />
    </section>
  );
}
