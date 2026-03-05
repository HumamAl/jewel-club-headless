// NO "use client" — pure JSX, no hooks

interface ExecutiveSummaryProps {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export function ExecutiveSummary({
  commonApproach,
  differentApproach,
  accentWord,
}: ExecutiveSummaryProps) {
  const renderDifferentApproach = () => {
    if (!accentWord) return <span>{differentApproach}</span>;
    const escaped = accentWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = differentApproach.split(new RegExp(`(${escaped})`, "i"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === accentWord.toLowerCase() ? (
            <span key={i} className="text-primary font-semibold">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg p-6 md:p-8"
      style={{
        // dark-premium: section-dark is oklch(0.06 0.02 75) — very deep gold-tinted near-black
        background: "var(--section-dark, oklch(0.06 0.02 75))",
        backgroundImage:
          "radial-gradient(ellipse at 25% 60%, oklch(0.75 0.15 75 / 0.06), transparent 65%)",
      }}
    >
      <p className="text-sm md:text-base leading-relaxed text-white/50">
        {commonApproach}
      </p>
      <hr className="my-4 border-white/10" />
      <p className="text-base md:text-lg leading-relaxed font-medium text-white/90">
        {renderDifferentApproach()}
      </p>
      <p className="text-xs text-white/40 mt-4">
        <a
          href="/"
          className="hover:text-white/65 transition-colors underline underline-offset-2"
          style={{ transitionDuration: "var(--dur-fast, 120ms)" }}
        >
          ← Back to the live demo
        </a>
      </p>
    </div>
  );
}
