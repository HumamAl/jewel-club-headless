import Link from "next/link";
import { ExternalLink, TrendingUp } from "lucide-react";
import { proposalData } from "@/data/proposal";

export default function ProposalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

      {/* ─────────────────────────────────────────────────────────────
          Section 1: Hero — Dark Panel
          Dark panel hero with gold accent. The pulsing "Built this
          demo for your project" badge is mandatory per spec.
      ───────────────────────────────────────────────────────────── */}
      <section
        className="relative rounded-2xl overflow-hidden"
        style={{ background: "oklch(0.10 0.02 var(--primary-h, 75))" }}
      >
        {/* Radial gold highlight from top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 0%, oklch(0.75 0.15 75 / 0.12), transparent 70%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12 space-y-5">
          {/* Effort badge — mandatory, pulsing dot */}
          <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/10 border border-white/10 text-white/70 px-3 py-1 rounded-full">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            {proposalData.hero.badge}
          </span>

          {/* Muted role label */}
          <p className="font-mono text-xs tracking-widest uppercase text-white/40">
            Full-Stack Developer · Headless CMS
          </p>

          {/* Name headline — weight contrast */}
          <h1 className="text-4xl md:text-5xl tracking-tight leading-none">
            <span className="font-light text-white/70">Hi, I&apos;m</span>{" "}
            <span className="font-bold text-white">{proposalData.hero.name}</span>
          </h1>

          {/* Tailored value prop */}
          <p className="text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">
            {proposalData.hero.valueProp}
          </p>
        </div>

        {/* Stats shelf */}
        <div
          className="relative z-10 border-t px-8 md:px-12 py-4"
          style={{
            borderColor: "oklch(1 0 0 / 0.08)",
            background: "oklch(1 0 0 / 0.04)",
          }}
        >
          <div className="grid grid-cols-3 gap-4 max-w-sm">
            {proposalData.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-xl md:text-2xl font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.85 0.13 75), oklch(0.70 0.10 55))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          Section 2: Proof of Work
          3 portfolio projects — domain match + feature overlap.
          Outcomes are exact text from developer-profile.md.
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Proof of Work
          </p>
          <h2
            className="text-2xl font-semibold tracking-tight"
            style={{ letterSpacing: "var(--heading-tracking, -0.02em)" }}
          >
            Relevant Projects
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {proposalData.portfolioProjects.map((project) => (
            <div
              key={project.id}
              className="aesthetic-card p-5 space-y-3"
            >
              {/* Title + external link */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold leading-snug">
                  {project.name}
                </h3>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary shrink-0 aesthetic-transition"
                    aria-label={`View ${project.name}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Outcome badge */}
              <div className="flex items-start gap-1.5 text-sm text-[color:var(--success)]">
                <TrendingUp className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span className="leading-snug">{project.outcome}</span>
              </div>

              {/* Relevance note */}
              {project.relevance && (
                <p className="text-xs text-primary/70 italic leading-relaxed">
                  {project.relevance}
                </p>
              )}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-xs font-mono text-muted-foreground"
                    style={{
                      background: "oklch(1 0 0 / 0.06)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          Section 3: How I Work
          4 steps tailored to a headless CMS project: Audit →
          Architect → Build → Deploy. Each step addresses client risk.
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Process
          </p>
          <h2
            className="text-2xl font-semibold tracking-tight"
            style={{ letterSpacing: "var(--heading-tracking, -0.02em)" }}
          >
            How I Work
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {proposalData.approach.map((step) => (
            <div key={step.step} className="aesthetic-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  Step {step.step}
                </span>
                <span className="font-mono text-xs text-muted-foreground/60">
                  {step.timeline}
                </span>
              </div>
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          Section 4: Skills Grid
          Filtered to what matters for this job — headless CMS, API
          design, and relevant AI tooling.
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Tech Stack
          </p>
          <h2
            className="text-2xl font-semibold tracking-tight"
            style={{ letterSpacing: "var(--heading-tracking, -0.02em)" }}
          >
            What I Build With
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proposalData.skills.map((category) => (
            <div key={category.category} className="aesthetic-card p-4 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest font-mono">
                {category.category}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-sm font-mono text-foreground/80"
                    style={{
                      background: "oklch(1 0 0 / 0.05)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          Section 5: CTA — Dark Panel
          Mirrors the hero panel. Pulsing availability indicator,
          "Reply on Upwork to start" as text, back-link to demo,
          signed by Humam.
      ───────────────────────────────────────────────────────────── */}
      <section
        className="relative rounded-2xl overflow-hidden text-center"
        style={{ background: "oklch(0.10 0.02 var(--primary-h, 75))" }}
      >
        {/* Radial gold highlight from bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.75 0.15 75 / 0.10), transparent 70%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12 space-y-4">
          {/* Pulsing availability indicator */}
          <div className="flex items-center justify-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                style={{ background: "var(--success)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--success)" }}
              />
            </span>
            <span
              className="text-sm"
              style={{ color: "color-mix(in oklch, var(--success) 80%, white)" }}
            >
              {proposalData.cta.availability}
            </span>
          </div>

          {/* Tailored CTA headline */}
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {proposalData.cta.headline}
          </h2>

          {/* Project-specific body copy */}
          <p className="text-white/65 max-w-lg mx-auto leading-relaxed text-base">
            {proposalData.cta.body}
          </p>

          {/* Primary action — text, never a dead button */}
          <p className="text-lg font-semibold text-primary pt-2">
            {proposalData.cta.action}
          </p>

          {/* Back-link to the demo */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/60 aesthetic-transition"
            >
              Back to the demo
            </Link>
          </div>

          {/* Signature */}
          <p
            className="text-sm text-white/30 border-t pt-5 mt-2"
            style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
          >
            -- Humam
          </p>
        </div>
      </section>

    </div>
  );
}
