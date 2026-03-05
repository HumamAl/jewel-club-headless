"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import type { TierDistributionDataPoint } from "@/lib/types";

// Tier color mapping — from muted (entry) to vivid (top tier)
const TIER_COLORS = [
  "var(--muted-foreground)",  // Atelier — subdued
  "var(--chart-4)",           // Gold — warm green
  "var(--chart-2)",           // Platinum — yellow-green
  "var(--chart-1)",           // Black Diamond — primary gold
];

interface TooltipEntry {
  payload?: TierDistributionDataPoint;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as TierDistributionDataPoint;
  return (
    <div
      className="rounded-lg border text-xs shadow-lg"
      style={{
        background: "var(--card)",
        borderColor: "color-mix(in oklch, var(--primary), transparent 75%)",
        padding: "0.6rem 0.875rem",
        minWidth: "10rem",
      }}
    >
      <p
        className="font-semibold mb-1.5"
        style={{ color: "var(--foreground)" }}
      >
        {d.tier}
      </p>
      <p style={{ color: "var(--muted-foreground)" }}>
        Members:{" "}
        <span
          className="font-mono font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {d.memberCount}
        </span>{" "}
        <span style={{ opacity: 0.7 }}>({d.percentage}%)</span>
      </p>
      <p style={{ color: "var(--muted-foreground)" }}>
        Avg. spend:{" "}
        <span
          className="font-mono font-semibold"
          style={{ color: "var(--chart-1)" }}
        >
          ${d.avgSpend.toLocaleString()}
        </span>
      </p>
    </div>
  );
};

interface TierChartProps {
  data: TierDistributionDataPoint[];
}

export function TierChart({ data }: TierChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
        barCategoryGap="28%"
      >
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          dataKey="tier"
          type="category"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={92}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-hover)" }} />
        <Bar dataKey="memberCount" radius={[0, 4, 4, 0]} maxBarSize={22}>
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={TIER_COLORS[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
