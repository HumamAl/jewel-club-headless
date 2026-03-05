# Domain Knowledge Brief — Jewelry Members Club / Headless CMS Commerce Platform

## Sub-Domain Classification

Independent or boutique jewelry brand (20–200 SKU active catalog) operating a paid or free members club with tiered benefits. The product is a headless content-and-commerce backend that serves three distinct frontends from one API layer: a public/member website (Next.js/Hydrogen), an iOS/Android app, and an in-store kiosk. The primary client operator is a content or marketing manager, not a developer. This is simultaneously a luxury retail product and a technical infrastructure project — the demo must speak fluently to both the jewelry merchant world and the headless CMS/composable commerce developer world.

---

## Job Analyst Vocabulary — Confirmed and Extended

The Job Analyst brief has not been received yet. This section is built from domain research and will be confirmed against their `clientVocabulary` section when available.

### Confirmed Primary Entity Names

These are the words that must appear in every UI label — sidebar nav, table headers, KPI card titles, status badges, search placeholders.

- Primary record type: **Piece** or **Style** (not "product" in editorial contexts; "piece" is how jewelry brands refer to individual designs in editorial and membership contexts)
- Collection grouping: **Collection** (not "category" or "catalog") — a named editorial grouping, e.g., "The Solstice Collection"
- Individual variant: **SKU** (internally) or **Variant** — a specific combination of metal type, stone, and size
- People roles: **Member** (not "customer" or "user"), **Curator** (internal content manager role), **Artisan** or **Designer** (product creator attribution)
- Secondary entities: **Drop** (a time-gated product release event), **Tier** (membership level), **Reward** (earned benefit), **Lookbook** (editorial image gallery tied to a collection), **Engraving** (personalization service), **Hallmark** (quality certification)

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Active Members | Members with a current active tier enrollment | Count |
| Member Retention Rate | % of members who renew after their first period | % |
| Tier Upgrade Rate | % of Silver members who advance to Gold/Diamond in a given period | % |
| AOV (Average Order Value) | Average revenue per completed transaction | $ |
| Member AOV | AOV segmented to members only (vs. non-member AOV) | $ |
| Repeat Purchase Rate | % of customers who place a 2nd+ order within 12 months | % |
| Early Access Conversion | % of members who purchase during exclusive early-access window | % |
| Drop Sell-Through Rate | % of a limited Drop's inventory sold within 48 hours of launch | % |
| Points Issued | Total loyalty points earned in a period | Count |
| Points Redeemed | Loyalty points redeemed as discount, showing active engagement | Count |
| CLV (Customer Lifetime Value) | Projected total revenue per member over their lifetime | $ |
| Channel Mix | % of revenue from web vs. app vs. in-store kiosk | % split |
| Content-to-Commerce Ratio | % of purchases originating from editorial content (Lookbooks, editorial pages) | % |
| Waitlist Conversion | % of waitlisted members who convert when notified of availability | % |
| Inventory Sell-Through | % of a collection sold through at full price | % |

### Status Label Vocabulary

Active states (pieces/products):
- "Available" — live and purchasable
- "Members Only" — restricted to tier-qualified members
- "Early Access" — within a time-gated member window before public launch
- "Pre-Order" — orderable before in-stock
- "Low Stock" — fewer than 5 units remaining (typically shown as "Only 3 left")
- "Made to Order" — no immediate stock; fulfillment on manufacturing cycle

Problem states:
- "Out of Stock" — inventory at zero
- "Waitlisted" — accepting waitlist registrations
- "Discontinued" — no longer produced

Member states:
- "Active" — valid membership
- "Pending" — enrollment payment processing
- "Lapsed" — past renewal date, grace period
- "Cancelled" — voluntarily cancelled
- "Complimentary" — gifted or earned membership

Drop/release states:
- "Upcoming" — scheduled, not yet live
- "Live" — currently open for purchase
- "Members Early Access" — access open to qualifying tier only
- "Sold Out" — drop inventory exhausted
- "Closed" — window expired

### Workflow and Action Vocabulary

Primary actions:
- "Publish" — make a piece or content type live across all channels via the API
- "Schedule Drop" — configure a timed release with tier-gated access windows
- "Enroll Member" — add a customer to a membership tier
- "Award Points" — manually credit loyalty points to a member's account
- "Waitlist" — add a member to the waitlist for a sold-out piece
- "Sync to Shopify" — push CMS content changes to the Shopify commerce layer

Secondary actions:
- "Curate" — add a piece to an editorial collection or lookbook
- "Unpublish" — remove from live channels without deleting
- "Upgrade Tier" — advance a member to the next tier manually
- "Export" — extract member or orders data
- "Preview" — view how content will render on a specific channel (web/app/kiosk) before publishing

### Sidebar Navigation Candidates

(For the admin dashboard format — these are content management + commerce operations combined)

- **Collections** — browse and manage editorial collections and drops
- **Pieces** — product catalog with variant management
- **Members** — member directory, tiers, points, and benefits status
- **Drops** — scheduled releases with tier-access windows and countdowns
- **Lookbooks** — editorial image galleries with linked pieces
- **Orders** — purchase history with channel attribution (web/app/kiosk)
- **Channel Preview** — live preview of content as it renders on each frontend
- **Analytics** — member behavior, drop performance, channel mix

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

The headless CMS admin is a tool used by a non-developer content editor at a jewelry brand. They have likely seen Shopify Admin, Sanity Studio, or Contentful — and they have strong opinions about which feels "editorial" and which feels like a generic database editor. The aesthetic expectation is closer to a fashion editorial publication's backend than to a traditional ERP. Clean white space, gorgeous product photography thumbnails inline with content rows, and a restrained color palette that lets the jewelry photography dominate. The UI should feel like it belongs to the brand it serves.

Luxury jewelry brands have internalized a specific visual vocabulary: cream or off-white backgrounds (not pure white), deep charcoal or near-black typography instead of gray, gold or warm champagne accents rather than generic blue primary colors, and generous spacing that communicates that every piece deserves room to breathe. Dense data-grid aesthetics (think SAP, Jira) are categorically wrong for this client. The benchmark is Shopify Admin with elevated visual polish — slightly more refined, slightly more editorial, but equally functional.

The headless/developer aspect of the brief adds a second layer. The tech-side stakeholders (who evaluated CMS options and chose this setup) are familiar with Sanity Studio's clean, structured editorial UI and Contentful's document-model interface. They expect labeled content types, relationship fields that visualize linked entities, and a clearly structured document model visible in the sidebar. This is not a generic dashboard — it is a content operating system where the sidebar navigation mirrors the content schema directly.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Sanity Studio** — The industry benchmark for headless CMS admin interfaces. Clean two-panel layout: document tree on the left, form editor on the right. Supports inline image previews, structured portable text fields, and real-time collaborative editing. Its design is almost brutally minimal — light background, muted sidebar, content-forward. Jewelry clients who've evaluated headless CMS options will have seen Sanity demos. The demo that looks like a well-executed Sanity Studio customized for jewelry will register as "this developer knows this stack."

2. **Shopify Admin** — The baseline visual reference for e-commerce management. Familiar to virtually every jewelry merchant operating at this scale. Card-based layout, product images in table rows, status badges with color-coding, period selector on every analytics view. Shopify Admin's visual DNA has become the de-facto e-commerce admin standard. Any jewelry CMS that shares structural DNA with Shopify Admin feels immediately legible.

3. **Mejuri / Mejuri+ App** — The gold-standard brand reference for jewelry membership programs in the accessible-luxury tier. Mejuri+ (their membership program) has a clean app interface with member benefits displayed as visual cards, a product discovery feed, and persistent membership tier indicator. Their editorial aesthetic (cream backgrounds, high-contrast product photography, minimal typography) is the market leader look that this client is likely benchmarking against.

### Aesthetic Validation

- **Domain validation**: The intersection of headless CMS admin tool + luxury jewelry brand suggests a hybrid aesthetic. The admin side should lean toward the "Linear / Minimal" aesthetic (precise, information-clear, developer-respectable), but the color and surface choices should be warmer and more elevated than a typical B2B SaaS tool. Think: Shopify Admin's structure with a jewelry brand's color warmth. A champagne/gold primary over near-white surfaces, with clean tabular data — that's the sweet spot. "SaaS Modern" with a luxury editorial inflection.

- **One adjustment to color/density if needed**: The primary color should NOT be the typical SaaS blue. This domain calls for a warm champagne gold (oklch approximately 0.72 0.12 85–90 hue range) or a deep rose gold. Density should be standard — not compact like a logistics TMS, not spacious like a wellness app. The demo is an admin tool, not a consumer app, so data still needs to be scannable.

### Format Validation

- **Recommended demo format**: `dashboard-app` — this is an admin/management tool. The client needs to see a sidebar navigation with content types, a main content area with a table/list of records, and at minimum one content creation/editing interaction.
- **Format-specific design notes**: The sidebar navigation should mirror a real CMS content schema — Collections, Pieces, Members, Drops, Lookbooks. Each nav item should lead to a content list view. The main Dashboard should show a cross-channel summary (web traffic, app sessions, kiosk visits, total orders) with channel attribution. The critical demo interaction is: navigate to a Drop, see the access tier settings, see a countdown timer, and see which members have early access.

### Density and Layout Expectations

Standard density. Table rows with generous padding — these are editorial content records, not log entries. Each row in the Pieces table should show a thumbnail (25px–32px square) inline, because this is a visual product. Status badges are essential and should use warm/neutral color palette: not harsh red/green, but amber/sage/muted indigo. The sidebar is navigational, not utility — wider than a typical ops tool sidebar (17–18rem) because content type names in headless CMS tend to be longer ("Lookbooks" not "Logs", "Collections" not "Cat.").

---

## Entity Names (10+ realistic names)

### Jewelry Brand / Company Names
- Aurelie & Co.
- Meridian Atelier
- Lumière Collective
- Thornbury Fine Jewels
- Solstice Studio
- Ora Jewelry
- Harlow & Sage
- Celeste Fine
- Wren & Goldie
- The Gilded Standard
- Fable Fine Jewelry

### Member Names (role-appropriate — skewing female, cosmopolitan, accessible-luxury buyer demographic)
- Priya Mehta
- Sofia Reyes
- Amara Osei
- Charlotte Webb
- Nadia Kim
- Isabelle Fontaine
- Zara Patel
- Mia Chen
- Olivia Barrett
- Leila Hassan

### Piece / Style Names (how jewelry brands actually name products)
- Crescent Stud Earrings in 14K Rose Gold
- Cascadia Pavé Tennis Bracelet
- Solstice Solitaire Ring — 0.75ct Round Brilliant
- Halo Band in Recycled Sterling Silver
- Meridian Pendant — Champagne Diamond
- Orbit Huggie Hoops in Yellow Gold Vermeil
- Aurora Drop Earrings — Sapphire Cabochon
- Verdure Band — Emerald-Cut Tourmaline
- Calla Threader Earrings in 18K White Gold
- Nimbus Layering Necklace Set
- Equinox Signet Ring — Sterling, 14K, or 18K

### Collection Names
- The Solstice Collection
- Celestial Everyday
- The Heirloom Series
- Golden Hour Edit
- Members-Only: Studio Reserve
- Verdure — Spring 2025
- Archive Drop No. 9

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| AOV (e-commerce jewelry, accessible luxury) | $95 | $187 | $420 | Higher for member-only pieces; lower for everyday stackables |
| Member AOV premium over non-member | 12% | 28% | 45% | Members spend more per order on average |
| Repeat purchase rate (12-month) | 6% | 14% | 24% | Jewelry has the lowest repeat rate in retail; 14% is strong for accessible luxury |
| Member retention rate (annual renewal) | 58% | 71% | 84% | Paid memberships; free membership retention is higher at 80–90% |
| Drop sell-through within 48 hours | 22% | 61% | 94% | Dependent on tier access window length and inventory limits |
| Early access conversion rate | 8% | 19% | 34% | % of members who see drop preview and purchase during access window |
| Gross margin | 68% | 79% | 87% | Lower end for lab-grown/mass market; higher for hand-crafted fine jewelry |
| CLV (accessible luxury member) | $380 | $940 | $2,100 | Members with 2+ years history; non-members significantly lower |
| Points per $1 spent | 3 | 5 | 10 | Industry norm is 5 pts per $1 spent; redeemable at $10 per 100 pts |
| Inventory turnover (jewelry) | 1.1 | 1.8 | 3.2 | Fine jewelry lower; fashion jewelry higher |
| Collection count (active catalog) | 4 | 9 | 18 | Boutique brand; not including archive |
| Pieces per collection | 6 | 11 | 24 | Drops tend to be smaller (6–8 pieces); main collections larger |
| Active member count (boutique brand at this scale) | 800 | 3,400 | 12,000 | Boutique scale; not Pandora or Swarovski |
| App store ratings (jewelry brand app) | 3.8 | 4.4 | 4.9 | Benchmark: Mejuri app is 4.8 on App Store |

---

## Industry Terminology Glossary (15+ terms)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| The Four Cs | Cut, Color, Clarity, Carat — the universal grading framework for diamonds | Used in product descriptions, filter UIs, and PDPs |
| Carat (ct) | Unit of gemstone weight; 1 carat = 0.2 grams; subdivided into 100 "points" | Displayed as "0.75ct" not "0.75 carat" in product labels |
| Karat (K or kt) | Measure of gold purity; 24K = pure gold; 18K = 75% gold; 14K = 58.3% gold | SKU variant attribute; affects price tier significantly |
| Setting | The metalwork structure that holds a gemstone — prong, bezel, pavé, channel, flush | Variant attribute on ring/earring products |
| Pavé | (pah-VAY) Setting style where small stones are set very close together, covering the surface | Used in product names: "Pavé Band", "Pavé Tennis Bracelet" |
| Hallmark | Official certification stamp indicating metal purity — 925 (sterling silver), 750 (18K gold) | Appears in product specs; signals authenticity to experienced buyers |
| SKU | Stock Keeping Unit; the unique identifier for a specific variant (e.g., one ring in size 7, yellow gold) | Internal identifier; format: [STYLE]-[METAL]-[SIZE] e.g., "ORBIT-HUG-YG-6" |
| Style Number | The base product identifier shared across all variants of one design | Parent-level identifier above SKU; used in CMS product records |
| Drop | A time-limited product release, often exclusive to members for a window before public sale | Core mechanics of the members club model |
| Waitlist | A queue of members who want to be notified when a sold-out piece returns | UX pattern on both website and app; drives re-engagement email flows |
| Colorway | A specific metal/finish variation of a design (Yellow Gold, Rose Gold, White Gold, Sterling Silver) | Variant attribute; effectively the "color" of a jewelry product |
| Lookbook | An editorial image gallery featuring pieces styled on models, used for inspiration and collection storytelling | CMS content type; used in marketing and on-site editorial |
| GIA Certified | Certified by the Gemological Institute of America; the most recognized diamond grading report | Trust signal for fine jewelry; shown as a badge on high-value piece PDPs |
| Vermeil | (ver-MAY) Sterling silver base with a thick layer of gold (minimum 2.5 microns); more durable than gold plating | Metal type option; important to label correctly — buyers distinguish it from solid gold |
| Tarnish-Resistant | Finish treatment that delays oxidation — relevant for sterling silver and vermeil pieces | Product attribute; featured prominently in care instructions and filters |
| Engraving | Personalization service where text or symbols are stamped/laser-etched onto a piece | Upsell service; managed as a custom order attribute in the CMS |
| Members-Only | Access restriction on a piece or collection, viewable only when authenticated with qualifying tier | Status badge and visibility rule in the CMS publish workflow |
| Early Access Window | The time period (typically 24–72 hours) during which members can purchase a Drop before it opens to the public | Drop scheduling parameter; key membership benefit |
| Content Operating System | Sanity's 2025 terminology for a headless CMS that serves as the central content layer across all channels | Technical vocabulary; use in the headless architecture explanation |
| Composable Commerce | Architecture pattern where each function (CMS, commerce, search, loyalty) is a separate API-connected service | How to describe the overall technical approach to the client |

---

## Common Workflows

### Workflow 1: Publishing a New Drop (Members Early Access)

1. **Content Manager creates a new Drop record** in the CMS — adds title, editorial copy, countdown date/time, featured image, and linked Pieces.
2. **Assigns tier access rule** — sets which membership tier(s) get early access and how long the window lasts (e.g., "Gold and Diamond members: 48-hour early access").
3. **Links Pieces to Drop** — pulls from the Pieces catalog, sets drop-specific pricing or limits if applicable.
4. **Publishes to staging** — content is visible in Channel Preview tool but not live. Team reviews on website, app, and kiosk preview simultaneously.
5. **Schedules publish** — sets exact datetime for early-access window to open; CMS triggers API push to all channel frontends.
6. **Early access window opens** — qualifying members receive in-app push notification and email; website and app show the Drop with member-only badge; kiosk shows "Coming Soon" to non-members.
7. **Public window opens** — after the early access window expires, the Drop goes fully live with no access restriction.
8. **Drop closes** — if inventory is exhausted or the scheduled window ends; status changes to "Sold Out" or "Closed"; waitlist captures ongoing interest.

### Workflow 2: Member Enrollment and Tier Management

1. **Customer creates account** — either on website, app, or in-store on kiosk.
2. **Joins membership** — selects a tier (Silver free / Gold paid / Diamond paid) and completes enrollment.
3. **System issues tier badge** — CMS membership module assigns tier, sets renewal date, and issues welcome points.
4. **Member earns points** — every purchase generates points automatically via commerce platform webhook. Manual awards available for events, referrals, or birthday.
5. **Tier upgrade check** — at each purchase and on monthly cron, system checks if cumulative spend qualifies for tier upgrade; sends upgrade notification if threshold crossed.
6. **Member redeems rewards** — at checkout, member sees available points balance and can apply as discount; or accesses tier-exclusive benefits (free engraving, free shipping, birthday gift).
7. **Renewal** — 30 days before expiry, renewal reminder sent. Auto-renews if payment method on file. Lapsed members see degraded access (lose Members-Only piece visibility, lose early access).

### Workflow 3: Multichannel Content Sync (Headless Delivery)

1. **Content Manager edits a Collection record** in the CMS — updates editorial copy, adds or removes pieces, changes hero image.
2. **CMS validates schema** — checks that all required fields are populated (name, slug, hero image, at minimum one linked piece, SEO fields).
3. **Draft saved** — not yet live. Content editor can preview in Channel Preview pane showing website, app, and kiosk views simultaneously.
4. **Editor publishes** — triggers API content delivery. CDN cache is invalidated.
5. **Website frontend** receives updated content via GROQ/GraphQL query on next page load or via ISR revalidation.
6. **Mobile app** receives updated content via the same API on next app launch or background refresh cycle.
7. **In-store kiosk** receives updated content via the same API endpoint; kiosk runs in a simplified read-only mode (no cart, no account — browse and "send to phone" functionality only).
8. **Analytics event** fires — content publish event is logged with channel attribution for performance tracking.

---

## Common Edge Cases

1. **Lapsed member accessing Members-Only content** — a member who let their paid tier lapse still has an account; they can log in but should see degraded access. UI must show a "Renew to access" state, not a generic 403. This is the most common support ticket in jewelry membership programs.
2. **Drop that sells out before early access window closes** — status transitions from "Early Access" to "Sold Out" in real time. Waitlist capture must activate immediately without the page requiring a refresh. Members who were mid-checkout at sell-out need a graceful error.
3. **Piece with missing required CMS fields** — a Piece missing metal type or stone weight will fail schema validation. The CMS should surface this as a "Blocked" status with a specific field-level error, not a generic "cannot publish."
4. **Member in multiple channels simultaneously** — a member who was browsing on app while also browsing on website during an early-access window should see the same inventory in both, and a purchase in one channel should instantly reflect in the other. This is a known headless challenge — the demo should show "real-time" sync behavior.
5. **SKU with zero on-hand inventory but active waitlist** — piece should show "Waitlisted" not "Out of Stock" if active waitlist entries exist. These are different states with different UX: one is dead, the other is a live queue.
6. **Drop scheduled in a different timezone** — the CMS may be operated by a US team serving global members. The "Publish at 10am" instruction must clarify timezone. Real pain point: drops going live at unexpected times because timezone wasn't specified. The UI should always show UTC alongside local time on scheduled drops.
7. **Engraving order with no personalization text submitted** — custom orders where the buyer paid for engraving but left the field blank. These need a "Pending customer input" status before fulfillment can proceed.
8. **Kiosk mode for a piece that requires size selection** — a ring shown on the kiosk has a size variant. Kiosk is browse-only ("send to phone" or "scan to buy online") — the UI should never show a cart button on the kiosk for size-dependent pieces. It should show a QR code to complete on phone.

---

## What Would Impress a Domain Expert

1. **Tier names that use gemstone vocabulary** — the best jewelry loyalty programs name tiers after gemstones (Gemstone, Ruby, Sapphire, Diamond or Silver, Gold, Diamond). Using "Bronze/Silver/Gold" is generic retail. Using "Sterling / Gold Vermeil / 18K" or "Quartz / Pearl / Diamond" signals that the developer understood the brand's vocabulary. Even better: naming tiers after the brand's own collection names.

2. **The hallmark-style CMS status badge** — experienced jewelry brand operators know the hallmark (the official quality stamp on the metal). A "Published" status badge that uses the shape of a hallmark assay mark (a shield or oval) is a micro-detail that will register immediately with anyone who has sold fine jewelry.

3. **Channel Preview pane showing web, app, and kiosk simultaneously** — the core value proposition of headless is "one source, every channel." A UI that visually shows the same content rendering across three different device frames side-by-side in a preview mode is the most direct demonstration of what the client is buying. This is not standard in generic CMS demos — but it is exactly what a headless CMS shopper is imagining when they post the job.

4. **SKU format that reflects real jewelry variant logic** — real jewelry SKUs encode metal type and size in the identifier. A format like `ORBIT-HUG-14KRG-6` (style code, metal abbreviation, size) reads as genuine to anyone who has worked in jewelry inventory. Generic "SKU-001" signals the developer has never touched a jewelry product catalog.

5. **Drop countdown with tier-specific access windows** — showing a countdown that displays different text depending on the viewer's tier ("Opens in 2h 14m for Gold Members | Opens in 26h 14m for everyone else") is a detail that shows the developer understood the actual business mechanics of how jewelry member clubs generate urgency and exclusivity. This is the core value prop of a jewelry membership, and most generic e-commerce demos never model it.

---

## Common Systems and Tools Used

| Tool | Category | Role in Stack |
|------|----------|---------------|
| Sanity | Headless CMS | Content authoring, structured document model, real-time editorial |
| Contentful | Headless CMS | Alternative to Sanity; more enterprise-oriented, field-type driven |
| Shopify Plus | Commerce | Order management, checkout, inventory, payment processing |
| Shopify Hydrogen | Frontend Framework | React-based framework for headless Shopify storefronts |
| Next.js | Frontend Framework | Alternative to Hydrogen; used with Sanity + Shopify Storefront API |
| Klaviyo | Email / SMS | Member lifecycle emails: drop announcements, tier upgrade, birthday, restock |
| LoyaltyLion / Smile.io | Loyalty Platform | Points engine, tier management; integrates with Shopify |
| Lightspeed Retail / Square for Retail | In-Store POS | Handles kiosk and in-store transaction processing |
| Algolia | Search | Faceted search across jewelry catalog (filter by metal, stone, price, collection) |
| Cloudinary | Digital Asset Management | Image delivery, optimization, and transformations for multi-channel product photography |
| Vercel | Hosting | Deploys Next.js or Hydrogen frontend; pairs with Sanity/Shopify |
| Shopify Oxygen | Hosting | Shopify-native hosting for Hydrogen storefronts |

---

## Geographic / Cultural Considerations

Accessible luxury jewelry brands in this space are predominantly US or UK-based but serve international members. Key considerations:

- **Currency**: USD primary, GBP secondary. AOV benchmarks in this brief are USD.
- **Ring sizing**: US numeric sizing (4–12) is different from UK alpha sizing (H–Z) and EU numeric. The kiosk and app in US-primary markets use US sizing, but the CMS product record should have a sizing_system field.
- **Gold purity conventions**: US uses "14K" and "18K"; UK/Europe uses "585" (58.5% = 14K) and "750" (75% = 18K). In the admin, use Karat notation; for international storefronts, display logic converts.
- **VAT vs. Sales Tax**: UK/EU prices include VAT; US prices show pre-tax. Multi-channel pricing in the CMS must support both models.
- **Valentine's Day / Mother's Day / Holiday Season**: Major jewelry demand spikes. Drop scheduling should accommodate US-centric gift-giving peaks: Feb 14, early May, Black Friday/Cyber Monday, and late December. These dates should appear as suggested scheduling hints in the Drop calendar.

---

## Data Architect Notes

- **Primary entity**: `Piece` (not "Product") — fields: `styleNumber`, `name`, `collection`, `metalTypes[]`, `primaryStone`, `caratWeight`, `setting`, `priceRange { low, high }`, `status`, `channelAvailability { web, app, kiosk }`, `memberTierRequired`, `images[]`
- **SKU format**: `[STYLE_CODE]-[METAL_ABBR]-[SIZE]` — e.g., `CRSC-STD-14KRG-7`, `ORBT-HUG-YGV-OS` (OS = one size). Metal abbreviations: `14KYG` (14K yellow gold), `14KRG` (14K rose gold), `18KWG` (18K white gold), `SS` (sterling silver), `YGV` (yellow gold vermeil)
- **Member entity**: fields: `memberId`, `name`, `email`, `tier` (Sterling/Gold/Diamond), `pointsBalance`, `tierSince`, `renewalDate`, `lifetimeSpend`, `preferredChannel`, `waitlistedPieces[]`
- **Tier thresholds** (annual spend to qualify): Sterling = free/any spend, Gold = $500+, Diamond = $1,500+
- **Drop entity**: fields: `dropId`, `title`, `status`, `earlyAccessTiers[]`, `earlyAccessOpenAt`, `publicOpenAt`, `closeAt`, `linkedPieces[]`, `totalInventory`, `soldCount`, `waitlistCount`
- **Revenue range for mock orders**: Sterling member AOV $95–$210, Gold member AOV $165–$380, Diamond member AOV $290–$750
- **Date patterns**: Drop early access windows should be 48 hours before public open. Member renewal dates spread across 12 months. Points balances: 0–3,400 for Sterling, 500–8,200 for Gold, 1,200–24,000 for Diamond.
- **Edge cases to include**: 2 lapsed members, 1 piece in "Blocked" status (missing stone field), 1 Drop in "Sold Out" with active waitlist of 47 members, 1 engraving order with "Pending Input" status, 1 SKU at 0 inventory with waitlist, 1 piece as "Members Only" visible only to Gold+

## Layout Builder Notes

- **Recommended density**: Standard. Product image thumbnails (28px) inline in table rows. More generous row padding than a pure ops dashboard — 14px top/bottom per row, not 8px.
- **Sidebar width**: 17–18rem. CMS navigation labels are longer than typical ops tool labels ("Lookbooks", "Collections", "Channel Preview", "Members").
- **Color nuance**: The primary color for this admin should be warm — a champagne gold or amber hue, NOT generic SaaS blue. Suggested primary: approximately `oklch(0.68 0.13 88)` (champagne/warm gold). Sidebar background should be near-white warm (`oklch(0.97 0.01 88)`) rather than pure white — gives it an editorial warmth. Status badges use muted, desaturated variants of success/warning/neutral — not harsh red/green.
- **Domain-specific visual pattern**: Jewelry CMS tools always show product photography as first-class UI elements. Table rows for Pieces should have a 28–32px image thumbnail as the first column. The "Drops" calendar/list view should have a visual countdown element. Members table should show tier badge as a colored pill using gemstone-appropriate colors (Sterling = silver/gray, Gold = warm gold, Diamond = cool blue-white).
- **Typography note**: Geist is appropriate for the admin/data areas. If the Creative Director wants to elevate the editorial sections (Lookbooks, Collection management), a serif or refined geometric sans (e.g., DM Serif Display for headings, Geist for body/data) would read as jewelry-brand premium without sacrificing legibility.

## Demo Screen Builder Notes

- **Hero metric (largest stat card)**: "Active Members" count with a trend arrow. This is what the client cares about most — the health of their club. Show it as the largest KPI card, top-left position.
- **Chart type for trend data**: Area chart for member growth over 12 months (time-series). A secondary bar chart showing Drop sell-through by collection is highly credible and domain-specific.
- **One domain-specific panel that would impress**: A "Live Drops" panel showing 2–3 active or upcoming Drops with status badges, countdown timers, access tier indicators, and a mini progress bar showing units sold vs. total inventory. This is the control room for the most important business mechanic and no generic e-commerce dashboard shows it.
- **Channel attribution row**: A small 3-column stat group showing "Web / App / Kiosk" order counts side by side. This directly demonstrates the headless multi-channel value to someone who posted a headless commerce job.
- **Dashboard composition**: KPI stat row (6 cards: Active Members, MRR from memberships, AOV, Drop Conversion, Points Redeemed, Inventory Sell-Through) → Live Drops panel → Area chart (member growth, 12 months) → Recent Orders table with channel column (Web/App/Kiosk tag) → Waitlist alerts widget (pieces with highest waitlist queue).
