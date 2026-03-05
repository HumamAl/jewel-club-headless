"use client";

import { useState, useMemo } from "react";
import { Sparkles, TrendingUp, Gift, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { rewardsActivity, members, getMemberById } from "@/data/mock-data";
import type { RewardActivityType } from "@/lib/types";
import { formatNumber, formatRelativeDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

// ── Activity type badge ───────────────────────────────────────────────────────
function ActivityBadge({ type }: { type: RewardActivityType }) {
  const config: Record<RewardActivityType, { label: string; className: string }> = {
    purchase:         { label: "Purchase",         className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0" },
    referral:         { label: "Referral",         className: "text-[color:var(--primary)] bg-[color:var(--primary)]/10 border-0" },
    anniversary:      { label: "Anniversary",      className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0" },
    "event-attendance": { label: "Event",          className: "text-foreground bg-border/40 border-0" },
    "tier-upgrade":   { label: "Tier Upgrade",     className: "text-[color:var(--primary)] bg-[color:var(--primary)]/15 border-0" },
    redemption:       { label: "Redemption",       className: "text-destructive bg-destructive/10 border-0" },
  };
  const c = config[type] ?? { label: type, className: "text-muted-foreground bg-muted border-0" };
  return (
    <Badge variant="outline" className={cn("text-xs font-medium rounded-full px-2 whitespace-nowrap", c.className)}>
      {c.label}
    </Badge>
  );
}

// ── Points cell — colour-coded ────────────────────────────────────────────────
function PointsCell({ points }: { points: number }) {
  const isEarned = points > 0;
  return (
    <span
      className={cn(
        "font-mono text-sm tabular-nums font-semibold",
        isEarned
          ? "text-[color:var(--success)]"
          : "text-destructive"
      )}
    >
      {isEarned ? "+" : ""}
      {formatNumber(points)}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const TYPE_OPTIONS: { value: RewardActivityType | "all"; label: string }[] = [
  { value: "all",             label: "All Activity" },
  { value: "purchase",        label: "Purchases" },
  { value: "referral",        label: "Referrals" },
  { value: "anniversary",     label: "Anniversaries" },
  { value: "event-attendance",label: "Event Attendance" },
  { value: "tier-upgrade",    label: "Tier Upgrades" },
  { value: "redemption",      label: "Redemptions" },
];

export default function RewardsPage() {
  const [typeFilter, setTypeFilter] = useState<RewardActivityType | "all">("all");

  const displayed = useMemo(() => {
    if (typeFilter === "all") return rewardsActivity;
    return rewardsActivity.filter((r) => r.type === typeFilter);
  }, [typeFilter]);

  // ── Summary stats (full dataset, not filtered) ────────────────────────────
  const stats = useMemo(() => {
    const earned = rewardsActivity.filter((r) => r.points > 0);
    const redeemed = rewardsActivity.filter((r) => r.points < 0);

    const totalIssued = earned.reduce((sum, r) => sum + r.points, 0);
    const totalRedeemed = Math.abs(redeemed.reduce((sum, r) => sum + r.points, 0));

    const avgPerMember = members.length > 0
      ? Math.round(members.reduce((sum, m) => sum + m.points, 0) / members.length)
      : 0;

    const topMember = members.reduce((best, m) => m.points > best.points ? m : best, members[0]);

    const thisMonthRedemptions = rewardsActivity.filter((r) => {
      if (r.points >= 0) return false;
      const d = new Date(r.createdAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    return { totalIssued, totalRedeemed, avgPerMember, topMember, thisMonthRedemptions };
  }, []);

  const statCards = [
    {
      label: "Total Points Issued",
      value: formatNumber(stats.totalIssued),
      sub: "All time",
      icon: <Sparkles className="w-4 h-4" />,
      colorClass: "text-[color:var(--primary)]",
    },
    {
      label: "Avg Points / Member",
      value: formatNumber(stats.avgPerMember),
      sub: "Current balance average",
      icon: <TrendingUp className="w-4 h-4" />,
      colorClass: "text-[color:var(--success)]",
    },
    {
      label: "Highest Balance",
      value: stats.topMember?.name ?? "—",
      sub: `${formatNumber(stats.topMember?.points ?? 0)} pts · ${stats.topMember?.tier ?? ""}`,
      icon: <Star className="w-4 h-4" />,
      colorClass: "text-[color:var(--warning)]",
    },
    {
      label: "Redemptions This Month",
      value: stats.thisMonthRedemptions.toString(),
      sub: `${formatNumber(stats.totalRedeemed)} pts redeemed total`,
      icon: <Gift className="w-4 h-4" />,
      colorClass: "text-destructive",
    },
  ];

  return (
    <div className="space-y-6" style={{ padding: "var(--content-padding)" }}>
      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rewards</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Jewel Points ledger — earned, redeemed, and issued across all members
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="aesthetic-card"
            style={{ padding: "var(--card-padding)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{card.label}</span>
              <span className={cn("opacity-70", card.colorClass)}>{card.icon}</span>
            </div>
            <p className={cn("text-xl font-bold font-mono truncate", card.colorClass)}>
              {card.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1 truncate">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Filter + count ── */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as RewardActivityType | "all")}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Activity" />
          </SelectTrigger>
          <SelectContent>
            {TYPE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {displayed.length} {displayed.length === 1 ? "activity" : "activities"}
        </span>
      </div>

      {/* ── Activity table ── */}
      <div className="aesthetic-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/60">
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Member
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Activity Type
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30 text-right">
                  Points
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Description
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">
                    No reward activities match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((activity) => {
                  const member = getMemberById(activity.memberId);
                  return (
                    <TableRow
                      key={activity.id}
                      className="hover:bg-[color:var(--surface-hover)] transition-colors border-b border-border/40"
                    >
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {member?.name ?? activity.memberId}
                          </span>
                          <span className="text-xs text-muted-foreground font-mono">
                            {activity.memberId}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <ActivityBadge type={activity.type} />
                      </TableCell>
                      <TableCell className="text-right">
                        <PointsCell points={activity.points} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs">
                        <span className="line-clamp-1">{activity.description}</span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatRelativeDate(activity.createdAt)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
