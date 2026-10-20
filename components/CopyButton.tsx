"use client";

import { useState } from "react";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Cadangan untuk browser lama / konteks non-HTTPS
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export default function CopyButton({
  value,
  label,
  copiedLabel,
  srLabel,
  srCopied,
}: {
  value: string;
  label: string;
  copiedLabel: string;
  srLabel: string;
  srCopied: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`${label}: ${srLabel}`}
        onClick={async () => {
          if (await copyText(value)) {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          }
        }}
        className={`label inline-flex h-10 min-w-24 shrink-0 items-center justify-center gap-2 border px-4 transition-colors ${
          copied ? "border-cyan text-cyan" : "border-fg/25 text-fg hover:border-fg"
        }`}
      >
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor">
          {copied ? (
            <path d="M2 6.5 4.8 9 10 3" strokeWidth="1.5" />
          ) : (
            <>
              <rect x="3.5" y="3.5" width="7" height="7" />
              <path d="M8.5 1.5h-7v7" />
            </>
          )}
        </svg>
        {copied ? copiedLabel : label}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? srCopied : ""}
      </span>
    </>
  );
}
