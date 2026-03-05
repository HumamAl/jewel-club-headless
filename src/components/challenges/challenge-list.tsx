"use client";

import type { ReactNode } from "react";
import { ChallengeCard } from "./challenge-card";
import { OutcomeStatement } from "./outcome-statement";
import type { Challenge } from "@/lib/types";

interface ChallengeListProps {
  challenges: Challenge[];
  visualizations?: Record<string, ReactNode>;
}

export function ChallengeList({ challenges, visualizations = {} }: ChallengeListProps) {
  return (
    <div className="flex flex-col gap-4">
      {challenges.map((challenge, index) => (
        <div
          key={challenge.id}
          className="bg-card border border-border/60 rounded-lg p-6 space-y-4 hover:border-primary/25 transition-colors"
          style={{
            // dark-premium card shadow from globals.css
            boxShadow: "var(--card-shadow, none)",
            transitionDuration: "var(--dur-fast, 120ms)",
          }}
        >
          {/* Card header with step number + title */}
          <div className="flex items-baseline gap-3">
            <span
              className="font-mono text-sm font-medium shrink-0 tabular-nums w-6"
              style={{ color: "color-mix(in oklch, var(--primary) 70%, transparent)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold">{challenge.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                {challenge.description}
              </p>
            </div>
          </div>

          {/* Visualization slot */}
          {visualizations[challenge.id] && (
            <div>{visualizations[challenge.id]}</div>
          )}

          {/* Outcome badge */}
          {challenge.outcome && (
            <OutcomeStatement outcome={challenge.outcome} index={index} />
          )}
        </div>
      ))}
    </div>
  );
}
