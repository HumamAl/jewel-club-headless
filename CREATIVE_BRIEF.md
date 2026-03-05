# Creative Brief — Jewel Club Headless CMS Admin

**Job:** A headless setup for a jewelry members club — one system powering website + iOS/Android app + in-store kiosk
**Budget:** $3,500 fixed-price
**Produced by:** Creative Director

---

## Creative Brief (JSON)

```json
{
  "aesthetic": "dark-premium",
  "demoFormat": "dashboard-app",
  "domain": "luxury retail / headless commerce / membership",
  "mood": "refined, authoritative, premium, understated",
  "colorDirection": "warm amber-gold on near-black — oklch(0.72 0.14 75) as primary accent on oklch(0.08 0.01 75) background. Inspired by Mejuri's warm gold jewelry aesthetic and the luxury retail convention that tools serving jewelry brands should feel like the jewelry itself: dark settings, warm metallic highlights. Every competing headless CMS admin tool (Sanity Studio, Directus, Strapi) uses cool tech palettes — purple, teal, blue. The jewelry admin panel that belongs to this brand uses warm gold instead.",
  "typography": "Geist Sans body — clean, modern, legible at admin-panel text densities. Geist Mono for API endpoint labels, content IDs, channel status codes, and SKUs. No display serif override: this is a management tool, not a jewelry brand website. The Sanity Studio reference uses IBM Plex Mono for technical data; we apply the same logic with Geist Mono. Heading tracking at -0.025em for a precise, premium feel.",
  "radiusProfile": "soft (0.75rem) — matching the dark-premium profile default. Directus uses rounded-xl on its dark UI. Sanity Studio uses moderately rounded cards. Sharp corners would feel too enterprise-cold for a jewelry brand's management tool; ultra-round would feel too consumer. 0.75rem is the dark-premium sweet spot — polished without being playful.",
  "densityProfile": "standard — Sanity Studio uses a spacious card-based editor layout with generous padding. Strapi admin uses a balanced density, not the extreme compression of a logistics dashboard. This tool manages collections, members, and channel publishing — tasks that need clarity and breathing room, not Bloomberg-level density. Page padding 1.5rem, card padding 1.5rem. Not as open as a wellness app, not as compressed as an ERP.",
  "motionCharacter": "smooth (180-220ms ease-in-out) — refined transitions that feel intentional, not rushed. Sanity Studio v3 uses smooth transition animations for panel changes. Dark premium aesthetic calls for controlled, deliberate motion. No theatrical effects — the admin tool should feel stable and precise, signaling that the system managing three channels simultaneously is reliable.",
  "formatRationale": "The job explicitly describes a backend admin system powering website + iOS/Android app + in-store kiosk. This is a management panel with navigation between distinct operational areas: Collections (content), Members (loyalty/tier management), Channels (per-channel publishing and preview), and Analytics. A sidebar-plus-dashboard layout is the universal pattern for multi-section admin tools — every reference platform (Sanity Studio, Strapi, Directus, Shopify admin) uses it. A landing page or phone mockup would misrepresent what is being built. Dashboard-app is the only honest format for a headless CMS admin.",
  "competitorReferences": [
    "Sanity Studio v3 — light-mode dominant admin UI with left sidebar navigation, structured content areas, IBM Plex Mono for technical data, spacious card-based editor layout. Supports dark mode via data-theme attribute. Neutral/minimal aesthetic that deliberately avoids brand color to remain flexible for any client brand.",
    "Strapi admin panel — dark mode available, clean modern SaaS aesthetic with sidebar navigation, organized panel-based content sections, standard density. Purple/teal accents in the default theme. Functional rather than decorative.",
    "Directus Studio — deep purple primary on dark backgrounds, full dark mode support, rounded-xl corners, gradient accents, sticky header with blur. Clean, modern, more visually polished than Sanity or Strapi. Uses purple hue family consistently.",
    "Mejuri M+ Membership — Mejuri's consumer-facing membership page uses black/white with warm gold and coral accents. Typography is clean geometric sans-serif. Spacious layout, lifestyle photography forward. 'Accessible luxury' brand signal: premium but not intimidating.",
    "Shopify Admin (Polaris design system) — light-mode B2B admin with neutral grays, organized data tables, sidebar navigation, compact density for merchant operations. The de-facto reference point for what an omnichannel commerce admin panel 'should' look like to a client who understands Shopify Plus."
  ],
  "brandSignals": "No client website discovered — the job post is anonymous. However, the domain (jewelry members club) provides strong brand signal by category association. Studied Mejuri.com directly: primary palette is black/white with warm gold (#b8922a range), coral, and burgundy accent notes. Typography is clean geometric sans-serif with bold heading treatments. Mood is 'accessible luxury' — premium positioning rendered approachable. This is the closest proxy brand to what this client likely aspires to. Color direction treats Mejuri's warm gold tones as the target brand family, not as a direct match.",
  "creativeRationale": "Studied Sanity Studio, Strapi, and Directus admin panels — all three use cool tech palettes (neutral gray, purple, or teal) and are deliberately brand-agnostic so they can serve any client. This is the right call for a generic CMS, but the wrong call for a jewelry members club admin tool that will be used daily by a luxury retail team. Mejuri's membership portal uses warm gold and black as its luxury signals — the same vocabulary jewelry consumers associate with premium products. The dark-premium aesthetic with warm amber-gold accents creates an admin panel that feels like it was designed for this brand specifically, not a generic SaaS tool with the logo swapped. Every competing headless admin uses cold tech colors; the warm gold differentiates immediately and tells the client 'this builder understood that you are a jewelry brand, not a logistics startup.'"
}
```

---

## Downstream Builder Notes

### Layout Builder

**CSS Token Overrides (globals.css):**

```css
:root {
  --primary: oklch(0.72 0.14 75);       /* warm amber-gold */
  --primary-h: 75;
  --accent: oklch(0.88 0.08 75);        /* soft warm gold tint */
  --sidebar-primary: oklch(0.72 0.14 75);
  --ring: oklch(0.72 0.14 75);
  --section-dark: oklch(0.04 0.02 75);

  /* dark-premium surfaces */
  --background: oklch(0.08 0.01 75);
  --foreground: oklch(0.92 0 0);
  --card: oklch(0.12 0.01 75);
  --card-foreground: oklch(0.92 0 0);
  --muted: oklch(0.18 0.008 75);
  --muted-foreground: oklch(0.60 0 0);
  --border: oklch(1 0 0 / 0.1);
  --sidebar-bg: oklch(0.06 0.01 75);

  /* Chart colors harmonized to gold hue */
  --chart-1: oklch(0.72 0.14 75);      /* gold primary */
  --chart-2: oklch(0.65 0.10 55);      /* warm amber */
  --chart-3: oklch(0.60 0.08 95);      /* muted olive */
  --chart-4: oklch(0.78 0.08 75);      /* pale gold */
  --chart-5: oklch(0.50 0.06 75);      /* dark bronze */

  /* Status */
  --success: oklch(0.62 0.19 145);
  --warning: oklch(0.75 0.18 85);
}
```

**Radius:** `--radius: 0.75rem` (dark-premium soft profile)

**Density:** Standard — `--content-padding: 1.5rem`, `--card-padding: 1.5rem`, `--sidebar-width: 16rem`, `--header-height: 3.5rem`

**Motion:** `--dur-normal: 200ms`, `--ease-snappy: cubic-bezier(0.16, 1, 0.3, 1)`

**data-theme attribute:** `data-aesthetic="dark-premium"` on `<html>`

**Font:** Default Geist Sans + Geist Mono — no override required. Set `--heading-tracking: -0.025em`.

---

### Demo Screen Builder (Tab 1 Dashboard)

The main dashboard screen should feel like a **command center for the jewelry brand's omnichannel system**. Composition suggestion (domain-driven, not formula):

**Top stat row (4 KPI cards):**
- Active Members (count, trend)
- Collections Published (cross-channel status)
- Channel Sync Status (Website / iOS App / In-Store Kiosk — 3 indicators)
- This Month's New Members

**Primary visualization:** Member tier distribution chart (Gold, Silver, Bronze members — donut or bar chart using warm gold chart palette)

**Secondary table:** Recent content publishes — Collection name, published-to channels (badge per channel), publish time, author

**Working filter:** Channel selector (All / Website / iOS App / In-Store Kiosk) that re-renders content in the table

Sidebar nav items (domain vocabulary — not generic labels):
- Collections (the content hub)
- Members (loyalty/tier management)
- Channels (website + app + kiosk publishing)
- Media Library
- Analytics

---

### Feature Builder (Tab 1 Feature Pages)

One page per sidebar nav item. Priority pages:

1. **Collections** — content management table with collection tiles, channel publish status per collection, draft/published toggle
2. **Members** — member roster with tier badges (Gold / Silver / Bronze), join date, last purchase, reward points
3. **Channels** — three channel cards (Website, iOS App, In-Store Kiosk) each with live/draft indicator, last sync time, preview link
4. **Analytics** — member growth chart, top collections by channel, tier upgrade events

---

### Challenges Builder (Tab 2)

Challenge cards should address the actual complexity of the job:
1. Content model design for a headless system (how one schema powers three different UIs)
2. Channel-specific content variants (kiosk UI needs differ from mobile app)
3. Member tier sync (loyalty state must be consistent across website, app, and kiosk)
4. Real-time channel publishing (how content updates propagate without cache stale)

Card visual treatment: dark-premium style — `bg-white/5 border border-white/8` with amber-gold accent on challenge number.

---

### Proposal Builder (Tab 3)

Hero value prop: "One content model. Three channels. Zero sync headaches."

Relevant portfolio picks: headless/CMS projects, multi-channel builds, e-commerce or loyalty platform work.

"How I Work" steps should describe headless CMS project methodology specifically:
1. Schema design (model the content before writing code)
2. API layer (REST/GraphQL endpoints per channel)
3. Channel builds (website + app + kiosk frontends consuming the same API)
4. Member portal and loyalty logic
5. Admin panel polish and handoff

---

## Research Sources

- Sanity Studio: https://www.sanity.io/studio
- Strapi: https://strapi.io/features
- Directus: https://directus.io/
- Mejuri M+ Membership: https://mejuri.com/m-plus/membership
- Mejuri Homepage: https://mejuri.com/
- Saleor Commerce: https://saleor.io/
- Antavo Jewelry Loyalty Programs: https://antavo.com/blog/jewelry-loyalty-programs/
- Crystallize Headless Commerce: https://crystallize.com/
```
