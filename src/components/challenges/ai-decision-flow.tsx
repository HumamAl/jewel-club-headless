"use client";

// Interactive Step-Through Decision Flow for Challenge 3:
// WordPress as Headless + AI Content Routing
// Editor publishes content → AI classifier decides which channel(s) to surface it on.

import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Globe,
  Smartphone,
  Monitor,
  Tag,
  Users,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface DecisionStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  decision?: {
    condition: string;
    yesLabel: string;
    noLabel: string;
  };
  outputs?: { label: string; channel: string; icon: React.ComponentType<{ className?: string }> }[];
}

const steps: DecisionStep[] = [
  {
    id: "publish",
    title: "Editor publishes in WordPress",
    description:
      'A content editor publishes a new collection — "Spring Sapphire Edit" — with photos, pricing, and member tier eligibility.',
    icon: Tag,
  },
  {
    id: "classify",
    title: "AI classifier reads the content",
    description:
      "The AI agent reads content type, attached product tags, member tier rules, and editorial category to build a routing profile.",
    icon: Sparkles,
    decision: {
      condition: "Is this a new collection launch?",
      yesLabel: "High-value push",
      noLabel: "Standard sync",
    },
  },
  {
    id: "segment",
    title: "Member segment matching",
    description:
      "The routing layer cross-references the content's tier eligibility against your member segments — Obsidian, Diamond, Gold — to decide who sees what.",
    icon: Users,
    decision: {
      condition: "Tier-restricted content?",
      yesLabel: "Personalised per tier",
      noLabel: "All members",
    },
  },
  {
    id: "route",
    title: "Automatic channel dispatch",
    description:
      "Routing decisions execute: website hero banner updated, app push notification queued for eligible members, kiosk display panel swapped.",
    icon: CheckCircle2,
    outputs: [
      { label: "Website hero", channel: "Updated", icon: Globe },
      { label: "App push", channel: "Queued for Obsidian & Diamond tiers", icon: Smartphone },
      { label: "Kiosk panel", channel: "Swapped to new collection", icon: Monitor },
    ],
  },
];

export function AiDecisionFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  return (
    <div className="w-full space-y-4">
      {/* Step progress dots */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(i)}
            className="flex items-center gap-1.5 focus:outline-none"
            aria-label={`Go to step ${i + 1}: ${s.title}`}
          >
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: i === currentStep ? "1.25rem" : "0.5rem",
                backgroundColor:
                  i <= currentStep
                    ? "var(--primary)"
                    : "color-mix(in oklch, var(--primary) 20%, transparent)",
                transitionDuration: "var(--dur-normal, 200ms)",
              }}
            />
          </button>
        ))}
        <span className="font-mono text-[10px] text-muted-foreground ml-1">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      {/* Step card */}
      <div
        className="rounded-lg border p-4 space-y-3 min-h-[9rem]"
        style={{
          borderColor: "color-mix(in oklch, var(--primary) 22%, transparent)",
          backgroundColor: "color-mix(in oklch, var(--primary) 5%, transparent)",
          transitionDuration: "var(--dur-normal, 200ms)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="rounded-md p-1.5 shrink-0 mt-0.5"
            style={{
              backgroundColor: "color-mix(in oklch, var(--primary) 12%, transparent)",
            }}
          >
            <step.icon className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">{step.title}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>

        {/* Decision branch display */}
        {step.decision && (
          <div className="flex items-center gap-3 pt-1 pl-[2.25rem]">
            <div
              className="rounded border px-2 py-1 text-[10px] font-medium"
              style={{
                borderColor: "color-mix(in oklch, var(--warning) 30%, transparent)",
                backgroundColor: "color-mix(in oklch, var(--warning) 8%, transparent)",
                color: "var(--warning)",
              }}
            >
              ? {step.decision.condition}
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-[10px] font-medium"
                style={{ color: "var(--success)" }}
              >
                Yes → {step.decision.yesLabel}
              </span>
              <span className="text-[10px] text-muted-foreground">
                No → {step.decision.noLabel}
              </span>
            </div>
          </div>
        )}

        {/* Output channels display */}
        {step.outputs && (
          <div className="flex flex-col sm:flex-row gap-2 pl-[2.25rem] pt-1">
            {step.outputs.map((output) => (
              <div
                key={output.label}
                className="flex items-center gap-1.5 rounded-md border border-border/50 bg-card px-2.5 py-1.5 flex-1"
              >
                <output.icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold truncate">{output.label}</p>
                  <p className="font-mono text-[9px] text-muted-foreground truncate">
                    {output.channel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-1.5 rounded-md border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground disabled:opacity-30 transition-colors"
          style={{ transitionDuration: "var(--dur-fast, 120ms)" }}
        >
          <ChevronLeft className="h-3 w-3" />
          Previous
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors"
            style={{
              backgroundColor: "color-mix(in oklch, var(--primary) 12%, transparent)",
              borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
              borderWidth: "1px",
              borderStyle: "solid",
              color: "var(--primary)",
              transitionDuration: "var(--dur-fast, 120ms)",
            }}
          >
            Next step
            <ChevronRight className="h-3 w-3" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(0)}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors"
            style={{
              backgroundColor: "color-mix(in oklch, var(--primary) 12%, transparent)",
              borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
              borderWidth: "1px",
              borderStyle: "solid",
              color: "var(--primary)",
              transitionDuration: "var(--dur-fast, 120ms)",
            }}
          >
            Start over
          </button>
        )}
      </div>
    </div>
  );
}
