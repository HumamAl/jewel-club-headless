"use client";

import Link from "next/link";

export function CtaCloser() {
  return (
    <section
      className="rounded-lg border p-6"
      style={{
        borderColor: "color-mix(in oklch, var(--primary) 22%, transparent)",
        background:
          "linear-gradient(135deg, color-mix(in oklch, var(--primary) 6%, transparent), color-mix(in oklch, var(--primary) 2%, transparent))",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold mb-1">
            Want to walk through the architecture?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            I&apos;ve thought through the headless layer, the member data model, and the AI routing
            logic. Happy to go deeper on any part.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/proposal"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            style={{ transitionDuration: "var(--dur-fast, 120ms)" }}
          >
            See the proposal →
          </Link>
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border"
            style={{
              backgroundColor: "color-mix(in oklch, var(--primary) 10%, transparent)",
              borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
              color: "var(--primary)",
            }}
          >
            Reply on Upwork to start
          </span>
        </div>
      </div>
    </section>
  );
}
