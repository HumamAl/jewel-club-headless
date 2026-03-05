// NO "use client" — pure JSX, no hooks
// Flow Diagram for Challenge 2: Member Data Across Touchpoints
// Shows: Kiosk check-in → API → Member Profile → Points Engine → All Channels

import { Monitor, ArrowRight, Server, User, Star, Globe, Smartphone } from "lucide-react";

interface FlowNode {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

const flowNodes: FlowNode[] = [
  {
    id: "kiosk",
    label: "Kiosk Check-in",
    sublabel: "Member scans card",
    icon: Monitor,
    highlight: false,
  },
  {
    id: "api",
    label: "Unified API",
    sublabel: "Single event bus",
    icon: Server,
    highlight: true,
  },
  {
    id: "profile",
    label: "Member Profile",
    sublabel: "One source of truth",
    icon: User,
    highlight: true,
  },
  {
    id: "points",
    label: "Points Engine",
    sublabel: "Real-time balance",
    icon: Star,
    highlight: false,
  },
];

const outputChannels = [
  { label: "Website", icon: Globe },
  { label: "Mobile App", icon: Smartphone },
  { label: "Kiosk", icon: Monitor },
];

export function MemberFlowDiagram() {
  return (
    <div className="w-full space-y-4">
      {/* Main flow — horizontal on md+, vertical on mobile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-wrap">
        {flowNodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 rounded-lg border px-3 py-2"
              style={
                node.highlight
                  ? {
                      borderColor: "color-mix(in oklch, var(--primary) 40%, transparent)",
                      backgroundColor: "color-mix(in oklch, var(--primary) 8%, transparent)",
                    }
                  : {
                      borderColor: "var(--border)",
                      backgroundColor: "var(--card)",
                    }
              }
            >
              <node.icon
                className={`h-4 w-4 shrink-0 ${node.highlight ? "text-primary" : "text-muted-foreground"}`}
              />
              <div>
                <p className="text-xs font-medium">{node.label}</p>
                <p className="font-mono text-[10px] text-muted-foreground">{node.sublabel}</p>
              </div>
            </div>
            {i < flowNodes.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
            )}
          </div>
        ))}

        {/* Spread-to-channels arrow */}
        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />

        {/* Output channels stacked */}
        <div className="flex flex-col gap-1.5">
          {outputChannels.map((ch) => (
            <div
              key={ch.label}
              className="flex items-center gap-1.5 rounded-md border border-border/50 bg-card px-2 py-1"
            >
              <ch.icon className="h-3 w-3 text-muted-foreground shrink-0" />
              <span className="text-[10px] font-medium">{ch.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Consistency callout */}
      <div
        className="flex items-start gap-2 rounded-md px-3 py-2"
        style={{
          backgroundColor: "color-mix(in oklch, var(--primary) 5%, transparent)",
          borderColor: "color-mix(in oklch, var(--primary) 14%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <Star className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
        <p className="text-xs text-muted-foreground">
          Every channel reads the same member record — a point earned in-store appears on the app
          within the same API response cycle.
        </p>
      </div>
    </div>
  );
}
