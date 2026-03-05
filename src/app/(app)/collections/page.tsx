"use client";

import { useState, useMemo } from "react";
import { Search, Globe, Smartphone, Store, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { collections } from "@/data/mock-data";
import type { CollectionStatus, Channel, MembershipTier } from "@/lib/types";
import { cn } from "@/lib/utils";

// ── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: CollectionStatus }) {
  const config: Record<CollectionStatus, { label: string; className: string }> = {
    published:  { label: "Published",  className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0" },
    scheduled:  { label: "Scheduled",  className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0" },
    draft:      { label: "Draft",      className: "text-muted-foreground bg-muted border-0" },
    archived:   { label: "Archived",   className: "text-destructive bg-destructive/10 border-0" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium rounded-full px-2", c.className)}>
      {c.label}
    </Badge>
  );
}

// ── Channel icon chips ────────────────────────────────────────────────────────
function ChannelChips({ channels }: { channels: Channel[] }) {
  const channelConfig: Record<Channel, { label: string; icon: React.ReactNode }> = {
    "website":    { label: "Web",    icon: <Globe className="w-3 h-3" /> },
    "mobile-app": { label: "App",    icon: <Smartphone className="w-3 h-3" /> },
    "kiosk":      { label: "Kiosk",  icon: <Store className="w-3 h-3" /> },
  };

  if (channels.length === 0) {
    return <span className="text-xs text-muted-foreground italic">None</span>;
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {channels.map((ch) => {
        const cfg = channelConfig[ch];
        return (
          <span
            key={ch}
            className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-[color:var(--primary)]/10 text-[color:var(--primary)] font-medium"
          >
            {cfg.icon}
            {cfg.label}
          </span>
        );
      })}
    </div>
  );
}

// ── Exclusive tier pill ───────────────────────────────────────────────────────
function ExclusivePill({ tier }: { tier: MembershipTier | null }) {
  if (!tier) return null;
  const config: Record<MembershipTier, string> = {
    "Atelier":       "text-muted-foreground bg-muted",
    "Gold":          "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
    "Platinum":      "text-foreground bg-border/40",
    "Black Diamond": "text-[color:var(--primary)] bg-[color:var(--primary)]/10",
  };
  return (
    <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", config[tier])}>
      {tier} only
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const STATUS_TABS: { value: CollectionStatus | "all"; label: string }[] = [
  { value: "all",       label: "All" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "draft",     label: "Draft" },
  { value: "archived",  label: "Archived" },
];

export default function CollectionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CollectionStatus | "all">("all");

  const displayed = useMemo(() => {
    return collections.filter((col) => {
      if (statusFilter !== "all" && col.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !col.name.toLowerCase().includes(q) &&
          !col.description.toLowerCase().includes(q) &&
          !col.curator.toLowerCase().includes(q) &&
          !col.season.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [search, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: collections.length };
    collections.forEach((c) => {
      counts[c.status] = (counts[c.status] ?? 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6" style={{ padding: "var(--content-padding)" }}>
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Collections</h1>
            <span className="inline-flex items-center text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {collections.length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Jewelry collections, channel assignments, and tier exclusivity
          </p>
        </div>
        <Button size="sm" className="gap-2">
          <PlusCircle className="w-4 h-4" />
          New Collection
        </Button>
      </div>

      {/* ── Status tabs ── */}
      <div className="flex items-center gap-1 flex-wrap">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full border transition-colors",
              statusFilter === tab.value
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            {tab.label}
            <span className="ml-1.5 opacity-60">{statusCounts[tab.value] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* ── Search ── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, curator, or season…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[color:var(--card)]"
          />
        </div>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "collection" : "collections"}
        </span>
      </div>

      {/* ── Grid ── */}
      {displayed.length === 0 ? (
        <div className="aesthetic-card flex items-center justify-center text-sm text-muted-foreground" style={{ padding: "var(--card-padding)", minHeight: "10rem" }}>
          No collections match this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map((col, index) => (
            <div
              key={col.id}
              className="aesthetic-card cursor-pointer"
              style={{
                padding: "var(--card-padding)",
                animationDelay: `${index * 40}ms`,
              }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold truncate">{col.name}</h3>
                    <ExclusivePill tier={col.exclusiveTier} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">{col.id}</p>
                </div>
                <StatusBadge status={col.status} />
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                {col.description}
              </p>

              {/* Metadata row */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Pieces</span>
                  <span className="ml-2 font-mono font-medium">{col.pieceCount}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Season</span>
                  <span className="ml-2 font-medium">{col.season}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Curator</span>
                  <span className="ml-2 font-medium">{col.curator}</span>
                </div>
                {col.scheduledFor && (
                  <div>
                    <span className="text-muted-foreground">Drop</span>
                    <span className="ml-2 font-medium text-[color:var(--warning)]">
                      {new Date(col.scheduledFor).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Channels */}
              <div className="flex items-center justify-between">
                <ChannelChips channels={col.channels} />
                <span className="text-xs text-muted-foreground font-mono">
                  {new Date(col.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
