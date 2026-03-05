import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most multi-channel builds for retail clients end up as three separate systems — a WordPress site, a mobile app with its own CMS, and a kiosk running a bespoke CMS — held together by manual copy-paste and a shared spreadsheet for inventory.",
  differentApproach:
    "I'd build this as a true headless architecture: WordPress as the single content source, a REST/GraphQL delivery layer, and AI-powered routing to decide what content surfaces on which channel — so a new collection publishes once and reaches every touchpoint automatically.",
  accentWord: "headless architecture",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "One System, Three Channels",
    description:
      "Keeping product listings, member pricing tiers, and inventory counts perfectly in sync across your website, iOS/Android app, and in-store kiosk — from a single admin interface — is the core architectural challenge.",
    visualizationType: "architecture",
    outcome:
      "Could reduce a content publish from 3 separate admin updates to 1, cutting channel sync lag from 2–4 hours of manual work to under 30 seconds via API webhooks.",
  },
  {
    id: "challenge-2",
    title: "Member Data Across Touchpoints",
    description:
      "A member who browses the website, earns points at the in-store kiosk, and checks their reward tier on the app needs to see a single unified profile — not three different point balances.",
    visualizationType: "flow",
    outcome:
      "Designed to unify all member touchpoints so reward points, tier status, and purchase history stay consistent across website, app, and kiosk regardless of which channel the interaction happened on.",
  },
  {
    id: "challenge-3",
    title: "WordPress as Headless + AI Content Routing",
    description:
      "The job mentions both WordPress and AI Agent Development. The real opportunity is treating WordPress as a pure content repository and adding an AI routing layer that automatically decides what content surfaces on which channel — based on member segment and content type.",
    visualizationType: "decision-flow",
    outcome:
      "Could automate channel-specific content decisions, reducing manual weekly curation from 4+ hours down to under 30 minutes — the AI handles the routing logic, editors just publish.",
  },
];
