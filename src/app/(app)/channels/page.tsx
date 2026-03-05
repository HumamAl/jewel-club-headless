"use client";

import { useState, useMemo } from "react";
import { Globe, Smartphone, Store, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { channelContent, channelEngagement } from "@/data/mock-data";
import type { Channel, ContentStatus, ContentType } from "@/lib/types";
import { formatNumber, formatPercent, formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

// ── Status badge ─────────────────────────────────────────────────────────────
function ContentStatusBadge({ status }: { status: ContentStatus }) {
  const config: Record<ContentStatus, { label: string; className: string }> = {
    active:    { label: "Active",    className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0" },
    scheduled: { label: "Scheduled", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0" },
    expired:   { label: "Expired",   className: "text-destructive bg-destructive/10 border-0" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium rounded-full px-2 whitespace-nowrap", c.className)}>
      {c.label}
    </Badge>
  );
}

// ── Content type badge ────────────────────────────────────────────────────────
function ContentTypeBadge({ type }: { type: ContentType }) {
  const labels: Record<ContentType, string> = {
    "hero-banner":         "Hero Banner",
    "collection-feature":  "Collection Feature",
    "promotion":           "Promotion",
    "announcement":        "Announcement",
  };
  return (
    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded font-medium whitespace-nowrap">
      {labels[type]}
    </span>
  );
}

// ── Channel chip ──────────────────────────────────────────────────────────────
function ChannelChip({ channel }: { channel: Channel }) {
  const config: Record<Channel, { label: string; icon: React.ReactNode; className: string }> = {
    "website":    { label: "Website",    icon: <Globe className="w-3 h-3" />,       className: "text-[color:var(--chart-1)] bg-[color:var(--chart-1)]/10" },
    "mobile-app": { label: "Mobile App", icon: <Smartphone className="w-3 h-3" />,  className: "text-[color:var(--chart-2)] bg-[color:var(--chart-2)]/10" },
    "kiosk":      { label: "Kiosk",      icon: <Store className="w-3 h-3" />,       className: "text-[color:var(--chart-3)] bg-[color:var(--chart-3)]/10" },
  };
  const c = config[channel];
  return (
    <span className={cn("inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-medium", c.className)}>
      {c.icon}
      {c.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const CHANNEL_META: Record<Channel, { label: string; icon: React.ReactNode; description: string; accentClass: string }> = {
  "website": {
    label: "Website",
    icon: <Globe className="w-5 h-5" />,
    description: "jewel-club.com — primary commerce channel",
    accentClass: "text-[color:var(--chart-1)] bg-[color:var(--chart-1)]/10",
  },
  "mobile-app": {
    label: "Mobile App",
    icon: <Smartphone className="w-5 h-5" />,
    description: "iOS + Android — member-exclusive features",
    accentClass: "text-[color:var(--chart-2)] bg-[color:var(--chart-2)]/10",
  },
  "kiosk": {
    label: "In-Store Kiosk",
    icon: <Store className="w-5 h-5" />,
    description: "Boutique touch screens — highest conversion",
    accentClass: "text-[color:var(--chart-3)] bg-[color:var(--chart-3)]/10",
  },
};

export default function ChannelsPage() {
  const [channelFilter, setChannelFilter] = useState<Channel | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "all">("all");

  const displayed = useMemo(() => {
    return channelContent.filter((item) => {
      if (channelFilter !== "all" && item.channel !== channelFilter) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      return true;
    });
  }, [channelFilter, statusFilter]);

  // Content counts per channel
  const contentPerChannel = useMemo(() => {
    const counts: Record<string, number> = {};
    channelContent.forEach((item) => {
      if (item.status === "active") {
        counts[item.channel] = (counts[item.channel] ?? 0) + 1;
      }
    });
    return counts;
  }, []);

  const channels: Channel[] = ["website", "mobile-app", "kiosk"];

  return (
    <div className="space-y-6" style={{ padding: "var(--content-padding)" }}>
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Channels</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Website, mobile app, and in-store kiosk — content and engagement across all surfaces
          </p>
        </div>
        <Button size="sm" className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Publish Content
        </Button>
      </div>

      {/* ── Channel cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {channels.map((ch) => {
          const meta = CHANNEL_META[ch];
          const eng = channelEngagement.find((e) => e.channel === ch);
          const activeCount = contentPerChannel[ch] ?? 0;

          return (
            <div
              key={ch}
              className={cn(
                "aesthetic-card cursor-pointer transition-colors",
                channelFilter === ch && "border-primary/40"
              )}
              style={{ padding: "var(--card-padding)" }}
              onClick={() => setChannelFilter(channelFilter === ch ? "all" : ch)}
            >
              {/* Channel header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", meta.accentClass)}>
                  {meta.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold">{meta.label}</p>
                  <p className="text-xs text-muted-foreground">{meta.description}</p>
                </div>
              </div>

              {/* Engagement metrics */}
              {eng && (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Sessions</p>
                    <p className="text-sm font-mono font-semibold">{formatNumber(eng.sessions)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Purchases</p>
                    <p className="text-sm font-mono font-semibold">{formatNumber(eng.purchases)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Conv. Rate</p>
                    <p className="text-sm font-mono font-semibold">{formatPercent(eng.conversionRate)}</p>
                  </div>
                </div>
              )}

              {/* Active content count */}
              <div className="mt-3 pt-3 border-t border-border/40">
                <span className="text-xs text-muted-foreground">
                  {activeCount} active content {activeCount === 1 ? "item" : "items"}
                </span>
                {channelFilter === ch && (
                  <span className="ml-2 text-[10px] text-primary font-medium">Filtered ✓</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Content inventory filters ── */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={channelFilter} onValueChange={(v) => setChannelFilter(v as Channel | "all")}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Channels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="mobile-app">Mobile App</SelectItem>
            <SelectItem value="kiosk">Kiosk</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ContentStatus | "all")}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "content item" : "content items"}
        </span>
      </div>

      {/* ── Content table ── */}
      <div className="aesthetic-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/60">
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Title
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Channel
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Content Type
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Published
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Expires
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    No content items match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-[color:var(--surface-hover)] transition-colors border-b border-border/40"
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium max-w-xs truncate">{item.title}</span>
                        <span className="text-xs text-muted-foreground font-mono">{item.cmsEntryId}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ChannelChip channel={item.channel} />
                    </TableCell>
                    <TableCell>
                      <ContentTypeBadge type={item.contentType} />
                    </TableCell>
                    <TableCell>
                      <ContentStatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(item.publishedAt)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {item.expiresAt ? formatDate(item.expiresAt) : (
                        <span className="text-xs text-muted-foreground/60 italic">Evergreen</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
