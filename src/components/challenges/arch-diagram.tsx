// NO "use client" — pure JSX, no hooks
// Architecture Diagram for Challenge 1: One System, Three Channels
// Shows WordPress headless CMS hub connecting to three channel frontends.

import { Database, Globe, Smartphone, Monitor, ArrowRight, Zap } from "lucide-react";

interface ChannelNode {
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const channels: ChannelNode[] = [
  { label: "Website", sublabel: "Next.js / Headless", icon: Globe },
  { label: "iOS & Android", sublabel: "React Native", icon: Smartphone },
  { label: "In-store Kiosk", sublabel: "Dedicated display", icon: Monitor },
];

export function ArchDiagram() {
  return (
    <div className="w-full space-y-3">
      {/* Label row */}
      <div className="flex items-center justify-between px-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Content Source
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Delivery Layer
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Channel Frontends
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* CMS Hub */}
        <div
          className="flex flex-col items-center gap-2 rounded-lg border px-4 py-3 shrink-0"
          style={{
            borderColor: "color-mix(in oklch, var(--primary) 40%, transparent)",
            backgroundColor: "color-mix(in oklch, var(--primary) 8%, transparent)",
          }}
        >
          <Database
            className="h-5 w-5 text-primary"
          />
          <div className="text-center">
            <p className="text-xs font-semibold">WordPress</p>
            <p className="font-mono text-[10px] text-muted-foreground">Headless CMS</p>
          </div>
        </div>

        {/* Arrow + API label */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-md"
            style={{
              backgroundColor: "color-mix(in oklch, var(--primary) 6%, transparent)",
              borderColor: "color-mix(in oklch, var(--primary) 15%, transparent)",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Zap className="h-3 w-3 text-primary" />
            <span className="font-mono text-[9px] font-medium text-primary">
              REST/GraphQL
            </span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Channel nodes */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {channels.map((channel) => (
            <div
              key={channel.label}
              className="flex items-center gap-2 rounded-md border border-border/60 bg-card px-3 py-2"
            >
              <channel.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">{channel.label}</p>
                <p className="font-mono text-[10px] text-muted-foreground truncate">
                  {channel.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sync note */}
      <div
        className="flex items-center gap-2 rounded-md px-3 py-2"
        style={{
          backgroundColor: "color-mix(in oklch, var(--primary) 4%, transparent)",
          borderColor: "color-mix(in oklch, var(--primary) 12%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <Zap className="h-3 w-3 shrink-0 text-primary" />
        <p className="text-xs text-muted-foreground">
          Publish once in WordPress → webhooks push to all three frontends within seconds
        </p>
      </div>
    </div>
  );
}
