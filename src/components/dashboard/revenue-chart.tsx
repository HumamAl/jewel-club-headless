"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { MonthlyRevenueDataPoint } from "@/lib/types";

function formatRevenue(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

interface TooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border text-sm shadow-lg"
      style={{
        background: "var(--card)",
        borderColor: "color-mix(in oklch, var(--primary), transparent 75%)",
        padding: "0.75rem 1rem",
        minWidth: "12rem",
      }}
    >
      <p
        className="font-semibold mb-2 text-xs tracking-widest uppercase"
        style={{ color: "var(--primary)", letterSpacing: "0.08em" }}
      >
        {label}
      </p>
      {payload.map((entry, i) => (
        <p
          key={i}
          className="flex items-center justify-between gap-4 text-xs mt-1"
          style={{ color: "var(--muted-foreground)" }}
        >
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: entry.color as string }}
            />
            {entry.name}
          </span>
          <span
            className="font-mono font-semibold tabular-nums"
            style={{ color: "var(--foreground)" }}
          >
            {entry.name === "Revenue"
              ? `$${Number(entry.value).toLocaleString()}`
              : Number(entry.value).toLocaleString()}
          </span>
        </p>
      ))}
    </div>
  );
};

interface RevenueChartProps {
  data: MonthlyRevenueDataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.28} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillNewMembers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.22} />
            <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          strokeOpacity={0.5}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          dy={6}
        />
        <YAxis
          yAxisId="revenue"
          orientation="left"
          tickFormatter={formatRevenue}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={52}
        />
        <YAxis
          yAxisId="members"
          orientation="right"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={28}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            fontSize: 11,
            paddingTop: "0.75rem",
            color: "var(--muted-foreground)",
          }}
          iconType="circle"
          iconSize={7}
        />
        <Area
          yAxisId="revenue"
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#fillRevenue)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0, fill: "var(--chart-1)" }}
        />
        <Area
          yAxisId="members"
          type="monotone"
          dataKey="newMembers"
          name="New Members"
          stroke="var(--chart-2)"
          strokeWidth={2}
          fill="url(#fillNewMembers)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0, fill: "var(--chart-2)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
