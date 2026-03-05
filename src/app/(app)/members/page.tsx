"use client";

import { useState, useMemo } from "react";
import { Search, Users, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { members } from "@/data/mock-data";
import type { Member, MembershipTier, MemberStatus } from "@/lib/types";
import { formatCurrency, formatNumber, formatRelativeDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

// ── Status badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: MemberStatus }) {
  const config: Record<MemberStatus, { label: string; className: string }> = {
    active:    { label: "Active",    className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0" },
    VIP:       { label: "VIP",       className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0" },
    suspended: { label: "Suspended", className: "text-destructive bg-destructive/10 border-0" },
  };
  const c = config[status] ?? { label: status, className: "text-muted-foreground bg-muted border-0" };
  return (
    <Badge variant="outline" className={cn("text-xs font-medium rounded-full px-2", c.className)}>
      {c.label}
    </Badge>
  );
}

// ── Tier badge ───────────────────────────────────────────────────────────────
function TierBadge({ tier }: { tier: MembershipTier }) {
  const config: Record<MembershipTier, { className: string }> = {
    "Atelier":       { className: "text-muted-foreground bg-muted border-0" },
    "Gold":          { className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0" },
    "Platinum":      { className: "text-foreground bg-border/40 border-0" },
    "Black Diamond": { className: "text-[color:var(--primary)] bg-[color:var(--primary)]/10 border-0" },
  };
  const c = config[tier] ?? { className: "text-muted-foreground bg-muted border-0" };
  return (
    <Badge variant="outline" className={cn("text-xs font-medium rounded-full px-2 whitespace-nowrap", c.className)}>
      {tier}
    </Badge>
  );
}

// ── Sort indicator ───────────────────────────────────────────────────────────
type SortKey = "name" | "tier" | "points" | "totalSpend" | "lastActivity";

function SortIndicator({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  if (!active) return <span className="opacity-30 ml-1">↕</span>;
  return <span className="ml-1 text-primary">{dir === "asc" ? "↑" : "↓"}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<"all" | MembershipTier>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | MemberStatus>("all");
  const [sortKey, setSortKey] = useState<SortKey>("points");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const displayed = useMemo<Member[]>(() => {
    return members
      .filter((m) => {
        if (tierFilter !== "all" && m.tier !== tierFilter) return false;
        if (statusFilter !== "all" && m.status !== statusFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          if (
            !m.name.toLowerCase().includes(q) &&
            !m.email.toLowerCase().includes(q) &&
            !m.id.toLowerCase().includes(q) &&
            !m.homeMarket.toLowerCase().includes(q)
          ) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        let av: string | number;
        let bv: string | number;
        if (sortKey === "name") { av = a.name; bv = b.name; }
        else if (sortKey === "tier") { av = a.tier; bv = b.tier; }
        else if (sortKey === "points") { av = a.points; bv = b.points; }
        else if (sortKey === "totalSpend") { av = a.totalSpend; bv = b.totalSpend; }
        else { av = a.lastActivity; bv = b.lastActivity; }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, tierFilter, statusFilter, sortKey, sortDir]);

  const tierCounts = useMemo(() => {
    const totals: Record<string, number> = { all: members.length };
    members.forEach((m) => {
      totals[m.tier] = (totals[m.tier] ?? 0) + 1;
    });
    return totals;
  }, []);

  const columns: { key: SortKey; label: string; sortable: boolean }[] = [
    { key: "name",         label: "Member",          sortable: true },
    { key: "tier",         label: "Tier",             sortable: true },
    { key: "points",       label: "Jewel Points",     sortable: true },
    { key: "totalSpend",   label: "Lifetime Spend",   sortable: true },
    { key: "lastActivity", label: "Last Activity",    sortable: true },
  ];

  return (
    <div className="space-y-6" style={{ padding: "var(--content-padding)" }}>
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Members</h1>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              <Users className="w-3 h-3" />
              {members.length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Club membership roster, tier standing, and Jewel Points balances
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export Roster
        </Button>
      </div>

      {/* ── Tier quick-filters ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "Black Diamond", "Platinum", "Gold", "Atelier"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTierFilter(t)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full border transition-colors",
              tierFilter === t
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            {t === "all" ? "All Tiers" : t}
            <span className="ml-1.5 opacity-60">{tierCounts[t] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* ── Filter bar ── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search members by name, ID, or market…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[color:var(--card)]"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as "all" | MemberStatus)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="VIP">VIP</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "member" : "members"}
        </span>
      </div>

      {/* ── Table ── */}
      <div className="aesthetic-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/60">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn(
                      "text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30",
                      col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors"
                    )}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    <span className="flex items-center gap-0.5">
                      {col.label}
                      {col.sortable && (
                        <SortIndicator active={sortKey === col.key} dir={sortDir} />
                      )}
                    </span>
                  </TableHead>
                ))}
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-[color:var(--muted)]/30">
                  Home Market
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
                    No members match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((member) => (
                  <>
                    <TableRow
                      key={member.id}
                      className="cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors border-b border-border/40"
                      onClick={() =>
                        setExpandedId(expandedId === member.id ? null : member.id)
                      }
                    >
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{member.name}</span>
                          <span className="text-xs text-muted-foreground font-mono">{member.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <TierBadge tier={member.tier} />
                      </TableCell>
                      <TableCell className="font-mono text-sm tabular-nums text-right">
                        {formatNumber(member.points)}
                      </TableCell>
                      <TableCell className="font-mono text-sm tabular-nums text-right">
                        {formatCurrency(member.totalSpend)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatRelativeDate(member.lastActivity)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={member.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {member.homeMarket}
                      </TableCell>
                    </TableRow>

                    {expandedId === member.id && (
                      <TableRow key={`${member.id}-expanded`} className="border-b border-border/40">
                        <TableCell colSpan={7} className="p-0">
                          <div
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 py-4"
                            style={{ background: "color-mix(in oklch, var(--primary), transparent 92%)" }}
                          >
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Email</p>
                              <p className="text-xs font-mono text-foreground break-all">{member.email}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                              <p className="text-xs font-medium">
                                {new Date(member.joinedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Referrals Made</p>
                              <p className="text-xs font-medium">{member.referralCount}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Privileges</p>
                              <div className="flex flex-wrap gap-1">
                                {member.earlyDropAccess && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                                    Early Drop Access
                                  </span>
                                )}
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                                  Anniversary {member.anniversaryDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Click any row to expand member details
      </p>
    </div>
  );
}
