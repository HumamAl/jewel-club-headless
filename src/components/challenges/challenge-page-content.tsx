"use client";

import type { ReactNode } from "react";
import type { Challenge } from "@/lib/types";
import { ChallengeList } from "./challenge-list";
import { ArchDiagram } from "./arch-diagram";
import { MemberFlowDiagram } from "./member-flow-diagram";
import { AiDecisionFlow } from "./ai-decision-flow";

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "challenge-1": <ArchDiagram />,
    "challenge-2": <MemberFlowDiagram />,
    "challenge-3": <AiDecisionFlow />,
  };

  return <ChallengeList challenges={challenges} visualizations={visualizations} />;
}
