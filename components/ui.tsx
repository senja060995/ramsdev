import type { ReactNode } from "react";

export const container = "mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12";

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="label flex items-center gap-3 text-muted">
      <span className="text-fg">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-line" />
      <span>{children}</span>
    </p>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "label inline-flex h-11 items-center justify-center gap-2 px-5 transition-colors duration-300 whitespace-nowrap";
  const styles =
    variant === "primary"
      ? "bg-fg text-bg hover:bg-cyan"
      : "border border-fg/25 text-fg hover:border-fg hover:bg-fg/5";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

/** Garis tiga warna tinta CMY */
export function InkRule({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex gap-1.5 ${className}`}>
      <span className="h-[3px] w-6 bg-cyan" />
      <span className="h-[3px] w-6 bg-magenta" />
      <span className="h-[3px] w-6 bg-yellow" />
    </span>
  );
}
