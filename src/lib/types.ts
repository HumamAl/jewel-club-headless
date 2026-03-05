import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Sidebar navigation (template invariant — kept from base)
// ---------------------------------------------------------------------------
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ---------------------------------------------------------------------------
// Challenge visualization types (template invariant)
// ---------------------------------------------------------------------------
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// ---------------------------------------------------------------------------
// Proposal types (template invariant)
// ---------------------------------------------------------------------------
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// Screen definition for frame-based demo formats (template invariant)
export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

// Conversion element variant types (template invariant)
export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";

// ---------------------------------------------------------------------------
// Domain: Jewelry Members Club — Headless CMS Admin
// ---------------------------------------------------------------------------

// ------ Shared primitives ---------------------------------------------------

export type Channel = "website" | "mobile-app" | "kiosk";

export type MembershipTier = "Atelier" | "Gold" | "Platinum" | "Black Diamond";

export type PieceType =
  | "ring"
  | "necklace"
  | "bracelet"
  | "earring"
  | "watch"
  | "brooch";

export type Material =
  | "18K gold"
  | "platinum"
  | "sterling silver"
  | "rose gold"
  | "white gold";

export type Gemstone =
  | "diamond"
  | "sapphire"
  | "emerald"
  | "ruby"
  | "pearl"
  | "opal"
  | "none";

// ------ Members -------------------------------------------------------------

export type MemberStatus = "active" | "suspended" | "VIP";

/** Mirrors the membership tier used in rewards logic */
export type RewardsTier = "Atelier" | "Gold" | "Platinum" | "Black Diamond";

export interface Member {
  /** Format: MEM-XXXX */
  id: string;
  name: string;
  email: string;
  tier: MembershipTier;
  rewardsTier: RewardsTier;
  /** Accumulated points balance */
  points: number;
  /** Lifetime spend in USD */
  totalSpend: number;
  joinedAt: string;               // ISO date string
  lastActivity: string;           // ISO date string
  referralCount: number;
  status: MemberStatus;
  /** Calendar date of membership anniversary — used for anniversary reward trigger */
  anniversaryDate: string;        // "MM-DD" format
  /** True when member has opted into early-drop access */
  earlyDropAccess: boolean;
  /** City / market for kiosk personalization */
  homeMarket: string;
}

// ------ Collections ---------------------------------------------------------

export type CollectionStatus = "draft" | "published" | "scheduled" | "archived";

export interface Collection {
  /** Format: COL-XXXX */
  id: string;
  name: string;
  description: string;
  pieceCount: number;
  status: CollectionStatus;
  /** Channels this collection is currently published or targeted to */
  channels: Channel[];
  createdAt: string;
  /** ISO date string — only present when status === "scheduled" */
  scheduledFor: string | null;
  /** Staff member who curated this collection */
  curator: string;
  /** Season or theme tag (e.g., "Spring 2026", "Holiday", "Bridal") */
  season: string;
  /** Exclusive to a specific membership tier; null = all tiers */
  exclusiveTier: MembershipTier | null;
}

// ------ Pieces --------------------------------------------------------------

export type PieceStatus = "available" | "reserved" | "sold-out" | "coming-soon";

export interface Piece {
  /** Format: PCE-XXXX */
  id: string;
  name: string;
  collectionId: string;           // references Collection.id
  type: PieceType;
  material: Material;
  gemstone: Gemstone;
  /** Retail price in USD */
  price: number;
  /** Weight — carats for gemstone pieces, grams for metal-only */
  weight: number;
  /** Unit for weight field */
  weightUnit: "ct" | "g";
  status: PieceStatus;
  sku: string;                    // e.g., "JCH-RNG-0047"
  imageCount: number;
  channels: Channel[];
  featured: boolean;
  /** Only populated when status === "reserved" */
  reservedForTier?: MembershipTier;
}

// ------ Rewards Activity ----------------------------------------------------

export type RewardActivityType =
  | "purchase"
  | "referral"
  | "anniversary"
  | "event-attendance"
  | "tier-upgrade"
  | "redemption";

export interface RewardActivity {
  /** Format: RWD-XXXX */
  id: string;
  memberId: string;               // references Member.id
  type: RewardActivityType;
  /** Positive = earned, negative = redeemed */
  points: number;
  description: string;
  createdAt: string;
}

// ------ Channel Content -----------------------------------------------------

export type ContentType =
  | "hero-banner"
  | "collection-feature"
  | "promotion"
  | "announcement";

export type ContentStatus = "active" | "scheduled" | "expired";

export interface ChannelContent {
  /** Format: CNT-XXXX */
  id: string;
  channel: Channel;
  contentType: ContentType;
  title: string;
  status: ContentStatus;
  publishedAt: string;
  /** null = no expiry (evergreen) */
  expiresAt: string | null;
  /** Which membership tiers this content targets; empty = all tiers */
  targetTiers: MembershipTier[];
  /** CMS content entry reference ID */
  cmsEntryId: string;
}

// ------ Dashboard / KPI Stats -----------------------------------------------

export interface DashboardStats {
  /** Total active members across all tiers */
  totalMembers: number;
  membersChange: number;          // % vs prior period

  /** Points issued in current billing period */
  pointsIssuedThisPeriod: number;
  pointsIssuedChange: number;

  /** Average order value — luxury retail metric */
  averageOrderValue: number;
  aovChange: number;

  /** % of members who engaged (purchase/event/referral) in last 30 days */
  engagementRate: number;
  engagementChange: number;

  /** Monthly revenue across all channels */
  monthlyRevenue: number;
  revenueChange: number;

  /** Collections currently live across at least one channel */
  activeCollections: number;
  activeCollectionsChange: number;
}

// ------ Chart Data ----------------------------------------------------------

export interface MonthlyRevenueDataPoint {
  month: string;
  revenue: number;
  memberPurchases: number;
  newMembers: number;
  averageOrderValue: number;
}

export interface TierDistributionDataPoint {
  tier: MembershipTier;
  memberCount: number;
  percentage: number;
  /** Average lifetime spend for this tier */
  avgSpend: number;
}

export interface ChannelEngagementDataPoint {
  channel: Channel;
  sessions: number;
  purchases: number;
  conversionRate: number;
}
