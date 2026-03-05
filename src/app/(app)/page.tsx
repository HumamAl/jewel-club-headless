"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Users,
  Sparkles,
  DollarSign,
  Activity,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Globe,
  Smartphone,
  Store,
} from "lucide-react";
import { APP_CONFIG } from "@/lib/config";
import {
  dashboardStats,
  rewardsActivity,
  channelEngagement,
  getMemberById,
  monthlyRevenue,
  tierDistribution,
} from "@/data/mock-data";
import { formatCurrency, formatNumber, formatCompactNumber } from "@/lib/formatters";
import { DemoBanner } from "@/components/layout/conversion-elements";
import { cn } from "@/lib/utils";

const RevenueChart = dynamic(
  () => import("@/components/dashboard/revenue-chart").then((m) => m.RevenueChart),
  { ssr: false, loading: () => <div className="h-[300px] animate-pulse bg-muted/20 rounded" /> }
);

const TierChart = dynamic(
  () => import("@/components/dashboard/tier-chart").then((m) => m.TierChart),
  { ssr: false, loading: () => <div className="h-[220px] animate-pulse bg-muted/20 rounded" /> }
);

// ── Stat card with animated counter feel ──────────────────────────────────
function StatCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}) {
  const isPositive = change >= 0;
  return (
    <div className="aesthetic-card" style={{ padding: "var(--card-padding)" }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-muted-foreground/50">{icon}</span>
      </div>
      <p className="text-2xl font-bold font-mono tabular-nums">{value}</p>
      <div className="flex items-center gap-1 mt-1">
        {isPositive ? (
          <TrendingUp className="w-3 h-3 text-[color:var(--success)]" />
        ) : (
          <TrendingDown className="w-3 h-3 text-destructive" />
        )}
        <span
          className={cn(
            "text-xs font-medium",
            isPositive ? "text-[color:var(--success)]" : "text-destructive"
          )}
        >
          {isPositive ? "+" : ""}
          {change}%
        </span>
        <span className="text-xs text-muted-foreground">vs last period</span>
      </div>
    </div>
  );
}

// ── Channel icons ──────────────────────────────────────────────────────────
const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  website: <Globe className="w-4 h-4" />,
  "mobile-app": <Smartphone className="w-4 h-4" />,
  kiosk: <Store className="w-4 h-4" />,
};

const CHANNEL_LABELS: Record<string, string> = {
  website: "Website",
  "mobile-app": "Mobile App",
  kiosk: "In-Store Kiosk",
};

// ─────────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  const stats = dashboardStats;
  const recentActivity = rewardsActivity.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* ── Header with time range filter ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {APP_CONFIG.appName} membership overview across all channels
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border/60 p-0.5">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "text-xs px-3 py-1 rounded-full transition-colors",
                timeRange === range
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range === "7d" ? "7 days" : range === "30d" ? "30 days" : "90 days"}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Total Members"
          value={formatNumber(stats.totalMembers)}
          change={stats.membersChange}
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          label="Monthly Revenue"
          value={formatCurrency(stats.monthlyRevenue)}
          change={stats.revenueChange}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <StatCard
          label="Avg Order Value"
          value={formatCurrency(stats.averageOrderValue)}
          change={stats.aovChange}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <StatCard
          label="Points Issued"
          value={formatCompactNumber(stats.pointsIssuedThisPeriod)}
          change={stats.pointsIssuedChange}
          icon={<Sparkles className="w-4 h-4" />}
        />
        <StatCard
          label="Engagement Rate"
          value={`${stats.engagementRate}%`}
          change={stats.engagementChange}
          icon={<Activity className="w-4 h-4" />}
        />
        <StatCard
          label="Active Collections"
          value={stats.activeCollections.toString()}
          change={stats.activeCollectionsChange}
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      {/* ── Revenue Chart ── */}
      <div className="aesthetic-card" style={{ padding: "var(--card-padding)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold">Revenue & New Members</p>
            <p className="text-xs text-muted-foreground mt-0.5">7-month trend across all channels</p>
          </div>
        </div>
        <RevenueChart data={monthlyRevenue} />
      </div>

      {/* ── Two-column: Tier Distribution + Channel Performance ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tier Distribution */}
        <div className="aesthetic-card" style={{ padding: "var(--card-padding)" }}>
          <div className="mb-4">
            <p className="text-sm font-semibold">Tier Distribution</p>
            <p className="text-xs text-muted-foreground mt-0.5">Members by membership tier</p>
          </div>
          <TierChart data={tierDistribution} />
        </div>

        {/* Channel Performance */}
        <div className="aesthetic-card" style={{ padding: "var(--card-padding)" }}>
          <div className="mb-4">
            <p className="text-sm font-semibold">Channel Performance</p>
            <p className="text-xs text-muted-foreground mt-0.5">Sessions, purchases & conversion by channel</p>
          </div>
          <div className="space-y-3">
            {channelEngagement.map((ch) => (
              <div
                key={ch.channel}
                className="flex items-center gap-3 p-3 rounded-lg border border-border/40 hover:border-border/70 transition-colors"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0">
                  {CHANNEL_ICONS[ch.channel]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{CHANNEL_LABELS[ch.channel]}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(ch.sessions)} sessions
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-mono font-semibold tabular-nums">
                    {ch.conversionRate}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(ch.purchases)} purchases
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Activity ── */}
      <div className="aesthetic-card" style={{ padding: "var(--card-padding)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold">Recent Rewards Activity</p>
            <p className="text-xs text-muted-foreground mt-0.5">Latest point movements across members</p>
          </div>
          <a
            href="/rewards"
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            View all <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <div className="space-y-2">
          {recentActivity.map((activity) => {
            const member = getMemberById(activity.memberId);
            const isEarned = activity.points > 0;
            return (
              <div
                key={activity.id}
                className="flex items-center justify-between gap-3 py-2 border-b border-border/30 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {member?.name ?? activity.memberId}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {activity.description}
                  </p>
                </div>
                <span
                  className={cn(
                    "font-mono text-sm font-semibold tabular-nums shrink-0",
                    isEarned ? "text-[color:var(--success)]" : "text-destructive"
                  )}
                >
                  {isEarned ? "+" : ""}
                  {formatNumber(activity.points)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Demo Banner ── */}
      <DemoBanner />
    </div>
  );
}
