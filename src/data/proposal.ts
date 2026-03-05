// Proposal Builder output — jewel-club-headless
// All content is typed and separated from layout.
// Page assembly: src/app/(proposal)/proposal/page.tsx

export const proposalData = {
  hero: {
    name: "Humam",
    valueProp:
      "Full-stack developer who builds headless systems that actually unify channels — one CMS powering your website, iOS/Android app, and in-store kiosk with no duplication.",
    badge: "Built this demo for your project",
    stats: [
      { value: "24+", label: "projects shipped" },
      { value: "15+", label: "industries served" },
      { value: "< 48hr", label: "demo turnaround" },
    ],
  },

  portfolioProjects: [
    {
      id: "sienna-vendor",
      name: "Sienna Charles — Vendor Admin",
      description:
        "Luxury vendor management platform with map-based discovery, AI search, and booking management with spend analytics.",
      outcome:
        "Vendor discovery and booking platform with map view, category filters, and spend tracking per booking",
      tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
      url: "https://sienna-vendor-admin.vercel.app",
      relevance:
        "Same luxury vertical — admin panel managing catalog, bookings, and tier-based access, mirroring what the jewelry club CMS needs.",
    },
    {
      id: "ai-store-builder",
      name: "AI Store Builder",
      description:
        "AI-powered Shopify store page generator with wizard flow, brand inputs, and complete layout generation.",
      outcome:
        "Multi-step wizard UI that walks through brand inputs and generates a complete store page layout with AI-written copy",
      tech: ["Next.js", "TypeScript", "Tailwind", "AI pipeline"],
      url: null,
      relevance:
        "Headless e-commerce architecture — content modeled separately from the storefront, pushed to multiple surfaces via API.",
    },
    {
      id: "lynt-marketplace",
      name: "Lynt Marketplace",
      description:
        "Digital marketplace platform with vendor onboarding, listing management, and transaction tracking.",
      outcome:
        "Full marketplace architecture — vendor onboarding, listing management, and transaction tracking ready for production",
      tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
      url: "https://lynt-marketplace.vercel.app",
      relevance:
        "Multi-surface content architecture with separate admin and consumer-facing layers — directly applicable to the headless CMS structure.",
    },
  ],

  approach: [
    {
      step: "01",
      title: "Audit",
      description:
        "Review your existing WordPress setup, content types, and member data structure. Map what needs to flow to each channel — website, app, and kiosk each have different rendering needs and that has to be accounted for before a single line is written.",
      timeline: "Day 1–2",
    },
    {
      step: "02",
      title: "Architect",
      description:
        "Headless API design, content models, and channel delivery contracts — agreed before building. This is the document that prevents scope creep mid-project and tells every channel exactly what to expect from the CMS.",
      timeline: "Day 3–4",
    },
    {
      step: "03",
      title: "Build",
      description:
        "CMS admin dashboard, API endpoints, and channel integrations shipped incrementally. Working features from day five — not a big reveal at the end. You see real progress every few days and can redirect if priorities shift.",
      timeline: "Day 5–16",
    },
    {
      step: "04",
      title: "Deploy",
      description:
        "Production deployment, channel testing on all three surfaces — website, app, and kiosk — plus handoff documentation so your team can manage content without needing a developer for every update.",
      timeline: "Day 17–21",
    },
  ],

  skills: [
    {
      category: "Frontend",
      items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui"],
    },
    {
      category: "Headless CMS",
      items: [
        "WordPress REST API",
        "Headless Architecture",
        "API Design",
        "Content Modeling",
      ],
    },
    {
      category: "AI & Automation",
      items: ["Claude API", "Content Routing", "AI Classification"],
    },
  ],

  cta: {
    headline: "Let's build this properly.",
    body: "I've already built a working demo of your headless admin — the same CMS powering collections, members, and rewards across channels. The production version connects to real data and serves all three surfaces from one source of truth.",
    action: "Reply on Upwork to start",
    availability: "Currently available for new projects",
  },
} as const;
