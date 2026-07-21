# Captiveau Landing Page — Complete Project Documentation

> **Tujuan:** Dokumentasi menyeluruh struktur, design system, komponen, data flow, dan arsitektur website Captiveau sebagai acuan rewrite ke headless CMS.
>
> **Tech Stack Saat Ini:** Next.js 16 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion
> **Deployment:** Docker → GitHub Container Registry → VPS (via SSH action)
> **Domain:** https://captiveau.id

---

## 📁 1. Project Structure

```
landing-captiveau/
├── app/                          # Next.js App Router (pages & layouts)
│   ├── layout.tsx                # Root layout (header, footer, analytics, meta)
│   ├── page.tsx                  # Homepage (section stacking)
│   ├── globals.css               # Global styles, fonts, shadcn variables
│   ├── not-found.tsx             # 404 page
│   ├── robots.ts                 # Robots.txt metadata
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── layout.tsx                # Root layout (header, footer, analytics, meta)
│   │
│   ├── about-us/
│   │   ├── layout.tsx            # Metadata + JSON-LD (AboutPage)
│   │   └── page.tsx              # About Us page (client)
│   ├── articles/
│   │   ├── layout.tsx            # Metadata + JSON-LD (CollectionPage/Blog)
│   │   ├── page.tsx              # Articles listing page (server + client components)
│   │   ├── articles-client.tsx   # Client component for search/filter/pagination
│   │   └── [slug]/
│   │       └── page.tsx          # Article detail (MDX remote + TOC + related)
│   ├── career/
│   │   ├── layout.tsx            # Metadata + JSON-LD (JobPosting)
│   │   └── page.tsx              # Career listing page
│   ├── portfolios/
│   │   ├── layout.tsx            # Minimal wrapper
│   │   └── page.tsx              # Under construction page
│   ├── privacy-policy/
│   │   └── page.tsx              # Static privacy policy page
│   ├── services/
│   │   ├── layout.tsx            # Metadata + JSON-LD (CollectionPage)
│   │   ├── page.tsx              # Services listing
│   │   └── [slug]/
│   │       └── page.tsx          # Service detail page
│   └── api/
│       └── og/route.tsx          # Open Graph image generation (Edge/SSR)
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui primitives (50+ components)
│   ├── mvpblocks/                # Page section blocks (the "sections" library)
│   │   ├── header-2.tsx
│   │   ├── footer-4col.tsx
│   │   ├── app-hero.tsx
│   │   ├── feature-3.tsx
│   │   ├── services-preview.tsx
│   │   ├── articles-preview.tsx / articles-preview-client.tsx
│   │   ├── testimonials-marquee.tsx
│   │   ├── cta-2.tsx
│   │   ├── faq-2.tsx
│   │   ├── contact-us-1.tsx
│   │   ├── about-us.tsx
│   │   ├── team-2.tsx
│   │   ├── card-flip.tsx
│   │   ├── card-flip-example.tsx
│   │   ├── ellipsis-block.tsx
│   │   ├── meshy-cards.tsx
│   │   ├── pricing-4.tsx
│   │   ├── simple-pricing.tsx
│   │   └── waitlist.tsx          # 404 page
│   ├── sections/                 # Section components (legacy)
│   │   ├── HeroSection.tsx
│   │   └── WorkWithUsSection.tsx
│   ├── analytics/                # Analytics & tracking components
│   │   ├── analytics-provider.tsx
│   │   ├── google-analytics.tsx
│   │   ├── google-tag-manager.tsx
│   │   ├── google-tag-manager-next.tsx
│   │   ├── microsoft-clarity.tsx
│   │   └── page-tracking/
│   │       ├── home-page-tracking.tsx
│   │       ├── services-page-tracking.tsx
│   │       └── article-page-tracking.tsx
│   ├── search/                   # Article search components
│   │   ├── search-bar.tsx
│   │   ├── search-results.tsx
│   │   ├── sort-controls.tsx
│   │   ├── tag-filter.tsx
│   │   └── pagination.tsx
│   ├── article-card.tsx          # Article list card
│   ├── featured-article-card.tsx # Featured/hero article card
│   ├── article-card.tsx
│   ├── related-articles.tsx
│   ├── CareerCard.tsx            # Job listing card
│   ├── cal-embed.tsx             # Cal.com scheduling wrapper
│   ├── cookie-consent.tsx        # GDPR cookie consent banner
│   ├── global-share.tsx          # Floating share button
│   ├── share-article.tsx         # Article share component
│   ├── share-button.tsx
│   ├── scroll-to-top.tsx         # Floating back-to-top
│   ├── table-of-contents.tsx     # Article TOC
│   ├── conditional-table-of-contents.tsx
│   ├── syntax-highlighter.tsx    # Code syntax highlighting (highlight.js)
│   └── lenis.tsx                 # Smooth scroll (ReactLenis)
│
├── hooks/                        # Custom hooks
│   ├── use-debounce.ts
│   ├── use-search.ts             # Article search/filter/pagination logic
│   └── use-toast.ts
│
├── lib/                          # Utilities, data, configs
│   ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
│   ├── analytics-config.ts       # GA4, GTM, Clarity IDs
│   ├── gtm-events.ts             # GTM event helpers (pageview, click, scroll, etc.)
│   ├── services-data.ts          # ALL service data (content + pricing + process)
│   ├── faq-data.ts               # FAQ items + categories
│   ├── career-data.ts            # Job listing data
│   ├── mdx.ts                    # MDX file reading utilities
│   ├── rss-generator.ts          # RSS feed generation
│   └── seo/
│       └── schema-config.ts      # FAQPage, Organization, Website schemas
│
├── content/                      # MDX content files
│   └── articles/                 # 12 article .mdx files
│       ├── getting-started-with-nextjs.mdx
│       ├── react-hooks-guide.mdx
│       ├── typescript-for-javascript-developers.mdx
│       ├── modern-web-design-trends.mdx
│       ├── ... (11 more)
│
├── public/                       # Static assets
│   ├── fonts/
│   │   └── Satoshi-Variable.ttf / Satoshi-VariableItalic.ttf
│   ├── images/
│   │   └── placeholder-article.svg
│   ├── articles/                 # Article images (webp)
│   ├── services/                 # Service images (v1)
│   │   └── v2/                   # Service images (v2, updated)
│   ├── logo.png / logo.webp / logo.svg
│   └── rss/                      # Generated RSS feeds
│
├── mdx-components.tsx             # MDX custom component mapping
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── components.json                # shadcn/ui config
├── package.json
├── Dockerfile
├── docker-compose.yaml
├── docker-compose.production.yml
└── .github/workflows/deploy.yaml  # CI/CD pipeline
```

---

## 🎨 2. Design System

### 2.1 Brand Identity

| Item | Value |
|------|-------|
| **Company** | Captiveau — Creative Tech Studio |
| **Tagline** | "Transform Your Ideas Into Digital Reality" |
| **Target** | Startup, Korporasi, UMKM (Indonesia) |
| **Est.** | 2025 (but timeline says 2020 in About page) |
| **Location** | Jl. Kuningan Barat No. 8, Jakarta Selatan 12710 |

### 2.2 Brand Colors

**Primary Palette (custom named colors in tailwind.config):**

```css
--primary: #ff6600            /* HSL: 24.6 95% 53.1% — Orange */
--yellow: #f9ae2b             /* Gold/Yellow accent */
--orange: #ff6600             /* Same as primary */
--blue: #2261fe               /* Accent blue (#2261fe) */
```

**shadcn/ui CSS Variables (HSL format):**

| Token | Light | Dark |
|-------|-------|------|
| `--background` | 0 0% 100% | 20 14.3% 4.1% |
| `--foreground` | 240 10% 3.9% | 0 0% 98% |
| `--primary` | 24.6 95% 53.1% | 20.5 90.2% 48.2% |
| `--primary-foreground` | 240 10% 3.9% | 0 0% 98% |
| `--secondary` | 60 4.8% 95.9% | 12 6.5% 15.1% |
| `--muted` | 0 0% 96% | 20 14.3% 15% |
| `--accent` | 60 4.8% 95.9% | 12 6.5% 15.1% |
| `--destructive` | 0 84.2% 60.2% | 0 84.2% 60.2% |
| `--border` | 24.6 14.3% 90% | 24.6 14.3% 15.9% |
| `--ring` | 24.6 95% 53.1% | 20.5 90.2% 48.2% |
| `--radius` | 0.5rem | 0.5rem |

**Usage Pattern:**
- Primary (#ff6600) used for CTAs, highlights, badges, icons
- Blue (#2261fe) used for testimonials, links, secondary accents
- Gold (#f9ae2b) used for decorative elements, stats
- Backgrounds often use gradient pairs: `from-slate-50 via-white to-blue-50`

### 2.3 Typography

| Property | Value |
|----------|-------|
| **Primary Font** | Satoshi (Variable) |
| **Fallback** | system-ui, sans-serif |
| **Weights** | 100–900 (variable) |
| **File** | `/fonts/Satoshi-Variable.ttf` |
| **CSS Class** | `font-satoshi` |
| **CDN** | Google Fonts as fallback (`Satoshi:wght@300;400;500;700`) |

**MDX/Article Typography:**
- `.prose` class for article body styling
- Headings: `font-weight: 600`, spaced at 2rem top margin
- Links: blue-600, underlined
- Code: inline (`bg-gray-100`, `text-orange-600`) or block with highlight.js
- Blockquotes: blue-600 left border, light bg
- Syntax highlighting: GitHub Dark theme (imported CSS)

### 2.4 Spacing & Layout

- **Max width:** `max-w-7xl` (80rem / 1280px)
- **Container padding:** `px-4 sm:px-6 lg:px-8`
- **Section padding:** `py-16 md:py-24` or `py-24`
- **Border radius:** `--radius: 0.5rem` (8px), with many custom `rounded-2xl` (16px) and `rounded-[28px]` / `rounded-[40px]`
- **Grid system:** Tailwind grid (mostly `grid-cols-1 md:grid-cols-2 lg:grid-cols-3/4`)

### 2.5 Animations & Motion

**Framer Motion — Primary animation library:**
- Page sections animate in on scroll (`whileInView`, `viewport: { once: true }`)
- Stagger children with `containerVariants` / `itemVariants` pattern
- Spring physics for bouncy interactions
- Hover effects: scale, translate, opacity transitions (300-500ms)
- `AnimatePresence` for mobile menu and FAQ accordion

**Key custom animations (Tailwind):**
- `accordion-down/up` — 0.2s ease-out
- `marquee` / `marquee-vertical` — linear infinite (for testimonials)
- `slideIn` — used in card-flip (inline @keyframes)

**Smooth Scrolling:** lenis (via `@studio-freight/react-lenis`) — commented out in layout but available

---

## 🧱 3. Component Architecture

### 3.1 Layout Components (Persistent)

| Component | Description |
|-----------|-------------|
| `Header2` | Fixed navbar, scroll-aware background change, mobile slide-in menu, Cal.com CTA |
| `Footer4Col` | 3-column footer (brand+social, services, links, contact), data-driven |
| `ScrollToTop` | Floating button after 300px scroll |
| `GlobalShare` | Floating share button (bottom-right), Twitter/LinkedIn/Facebook/WhatsApp |
| `CookieConsent` | GDPR cookie banner (3 variants: default/small/mini) |
| `CalEmbed` | Wrapper that adds Cal.com booking attributes to children |
| `AnalyticsProvider` | Orchestrates GA4, GTM, Clarity injection |

### 3.2 Page Section Blocks (mvpblocks/)

These are the building blocks that compose every page. Each is a self-contained section.

| Block | Used On | Key Features |
|-------|---------|-------------|
| `app-hero` | Home | Animated counters, gradient bg, CTA buttons, tech stack grid |
| `feature-3` | Home | 3-column feature cards (left/center/right layout) |
| `services-preview` | Home | Grid of 4 CardFlip service cards |
| `articles-preview` | Home | Server component → client wrapper, 3 latest articles |
| `testimonials-marquee` | Home | Vertical marquee columns, star ratings, randomuser faces |
| `cta-2` | Home, Articles | Full-width primary CTA with concentric circle decoration |
| `faq-2` | Home | Category tabs, accordion FAQ, animated |
| `contact-us-1` | Home, About | Contact form → WhatsApp redirect, globe particle bg |
| `about-us` | About | Stats, mission/vision, company timeline |
| `team-2` | About | Team member grid (4 members), hover social links |
| `ellipsis-block` | Service detail | Code-snippet styled display (VS Code-like) |
| `meshy-cards` | Service detail | 4-card benefit grid with primary bg |
| `card-flip` | Services | 3D flip card (front: icon+title, back: features+CTA) |
| `pricing-4` | - | Enterprise pricing (available but not in use) |
| `simple-pricing` | - | Pricing with tabs (project basis / retainer) |
| `waitlist` | 404 | Particle background 404 page |

### 3.3 UI Primitives (shadcn/ui) — 50+ components

Located in `components/ui/`. Key ones used extensively:

| Component | Usage |
|-----------|-------|
| `button` | CTAs throughout |
| `card` | Team, pricing, stats |
| `badge` | Tags, section labels, indicators |
| `input`, `textarea`, `label` | Contact form |
| `accordion` | FAQ (custom implementation) |
| `tabs` | Pricing toggle |
| `dropdown-menu` | Share buttons |
| `marquee` | Testimonials |
| `particles`, `sparkles`, `spotlight` | Decorative effects |
| `timeline` | Service process |
| `globe` | Contact section earth graphic |
| `navigation-menu` | Available but header uses custom |
| `dialog`, `sheet`, `drawer` | Modal components available |

### 3.4 Data Layer Components

| Component | Description |
|-----------|-------------|
| `article-card` | Article card with image, tags, date, reading time, author |
| `featured-article-card` | Larger hero-style article card (2-column layout) |
| `related-articles` | 3 related articles by tag scoring |
| `CareerCard` | Job listing card with status (urgent/closed), apply button |
| `table-of-contents` | Auto-generated TOC from article heading structure |
| `syntax-highlighter` | Code block highlighting via highlight.js |

### 3.5 Search & Filter System (Articles)

Complete client-side search implementation:

- **Hook:** `useSearch()` — URL-synced filters, pagination, sorting
- **Search fields:** query (debounced), tags, sortBy (date/title/relevance), sortOrder, page
- **Components:** SearchBar, TagFilter, SortControls, SearchResults, Pagination
- **Relevance scoring:** title=10pts, description=5pts, tags=3pts
- **URL sync:** Filters read from/written to URL search params

---

## 📄 4. Pages & Routes

### 4.1 Route Map

| Route | File | Type | Content Source |
|-------|------|------|---------------|
| `/` | `app/page.tsx` | Server component → sections | Static blocks |
| `/services` | `app/services/page.tsx` | Client component | `lib/services-data.ts` |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | Server component | `lib/services-data.ts` |
| `/articles` | `app/articles/page.tsx` | Server + Client | MDX files in `content/articles/` |
| `/articles/[slug]` | `app/articles/[slug]/page.tsx` | Server component | MDX files |
| `/about-us` | `app/about-us/page.tsx` | Client component | Static blocks |
| `/career` | `app/career/page.tsx` | Client component | `lib/career-data.ts` |
| `/portfolios` | `app/portfolios/page.tsx` | Client component | Static (under construction) |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | Server component | Static JSX |
| `/api/og` | `app/api/og/route.tsx` | Edge function | Dynamic OG images |
| 404 | `app/not-found.tsx` | Client component | Waitlist page |

### 4.2 Homepage Section Order

```
1. AppHero          — Hero dengan stats counter + tech stack
2. Feature3         — "Mengapa Pilih Captiveau?" 3-column feature cards
3. ServicesPreview  — 4 service cards (CardFlip)
4. ArticlesPreview  — 3 latest articles
5. Testimonials     — Marquee testimonial cards
6. CTA2             — "Mari Mulai Kolaborasi"
7. Faq2             — FAQ accordion with categories
8. ContactUs1       — Contact form → WhatsApp
```

### 4.3 Common Page Pattern

Each page follows this pattern:
1. Layout file (`layout.tsx`) — sets metadata + JSON-LD schema
2. Page file (`page.tsx`) — hero section + content sections
3. Sections composed from `mvpblocks/`

### 4.4 Service Pages (4 main services)

| Service | Slug | Pricing Range |
|---------|------|--------------|
| Landing Page | `landing-page` | Rp 3,499,000 – 7,499,000 |
| E-Commerce | `e-commerce` | Rp 26,999,000 – 49,999,000 |
| UI/UX Design | `uiux-design` | Rp 1,999,000 – 7,499,000 |
| Company Profile | `company-profile` | Rp 3,499,000 – 9,999,000 |

Each service detail page includes: Hero → Introduction → Key Benefits (MeshyCards) → Process (Timeline) → USP → Pricing (3 tiers) → CTA

---

## 💾 5. Data Layer (Content Sources)

Currently, **all content is hardcoded** in TypeScript files or MDX. This is what needs to move to headless CMS.

### 5.1 Current Content Sources

| Content | File | Format | Size |
|---------|------|--------|------|
| Services | `lib/services-data.ts` | TypeScript objects (ComprehensiveServiceData) | 4 services, ~800 lines |
| FAQs | `lib/faq-data.ts` | TypeScript array (FaqItem) | 8 items, 5 categories |
| Careers | `lib/career-data.ts` | TypeScript array (JobData) | 2 jobs |
| Articles | `content/articles/*.mdx` | MDX files with frontmatter | 12 articles |
| Company info | `lib/career-data.ts` + layouts | Mixed | Founders, contacts, etc. |
| Team members | `components/mvpblocks/team-2.tsx` | Hardcoded array | 4 members |
| Testimonials | `components/mvpblocks/testimonials-marquee.tsx` | Hardcoded array | 10 testimonials |
| Footer data | `components/mvpblocks/footer-4col.tsx` | Hardcoded object | Social links, services, contact |
| Navigation | `components/mvpblocks/header-2.tsx` | Hardcoded array | 5 nav items |
| Metadata/SEO | `app/**/layout.tsx` + `app/**/page.tsx` | Hardcoded | Per-page |

### 5.2 Data Flow Diagram

```
                    ┌─────────────────────┐
                    │   Next.js App (SSR)  │
                    │   + ISR / Static     │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼─────────────────┐
              │                │                  │
              ▼                ▼                  ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │ MDX Articles  │  │  TS Data     │  │  Static JSX  │
    │ (content/)    │  │  (lib/*.ts)  │  │  (pages)     │
    └──────────────┘  └──────────────┘  └──────────────┘
```

### 5.3 Content Types to Model in CMS

```
1. SiteSettings      — Company info, logo, social links, contacts
2. Navigation        — Menu items (label, href, order)
3. Pages
   ├── HomePage      — Sections order, hero content, stats
   ├── ServicesPage  — Title, description, CTA
   ├── AboutPage     — Stats, mission/vision, timeline, team
   ├── CareerPage    — Hero, company values
   └── PrivacyPage   — Policy content
4. Services          — All 4 services with full data
   ├── Landing Page
   ├── E-Commerce
   ├── UI/UX Design
   └── Company Profile
5. Articles/Blog     — MDX → CMS (rich text, cover image, meta)
6. Testimonials      — Name, role, avatar, text, rating
7. Team Members      — Name, role, image, social links
8. Job Listings      — Title, dept, location, type, salary, desc
9. FAQs              — Question, answer, category
10. Site Metadata    — Global SEO, OG images, schema.org
11. Analytics Config — GA4, GTM, Clarity IDs
```

---

## 🔍 6. SEO & Structured Data

### 6.1 JSON-LD Schemas (per page)

| Page | Schema Type | Defined In |
|------|------------|------------|
| All pages | Organization + WebSite | `app/layout.tsx` |
| Home | FAQPage (adds FAQ schema) | `app/page.tsx` |
| Services | CollectionPage + ItemList | `app/services/layout.tsx` |
| Service Detail | Service + OfferCatalog | `app/services/[slug]/page.tsx` |
| Articles | CollectionPage + Blog | `app/articles/layout.tsx` |
| Article Detail | Article + BreadcrumbList | `app/articles/[slug]/page.tsx` |
| About | AboutPage | `app/about-us/layout.tsx` |
| Career | JobPosting | `app/career/layout.tsx` |

### 6.2 Metadata Pattern

Every layout uses `generateMetadata` or static `Metadata` export with:
- `title` (template pattern: `%s | Captiveau - Software House Indonesia`)
- `description` (100-160 chars, Indonesian)
- `keywords` (15-25 primary + secondary + long-tail)
- `openGraph` (title, description, images → /api/og)
- `twitter` (summary_large_image)
- `robots` (index, follow)
- `alternates` (canonical + RSS)
- `verification` (Google, Yandex)

### 6.3 OG Image Generation

- **Route:** `/api/og?type={page_type}&title={...}&subtitle={...}`
- **Runtime:** Edge (Vercel Edge / Cloudflare Workers)
- **Library:** Satori (HTML → PNG)
- **Types:** home, career, services, about, article
- **Design:** Centered layout with brand logo (SVG), title, subtitle, gradient line

### 6.4 RSS Feeds

Generated during build (`npm run generate-rss`):
- `/rss.xml` (RSS 2.0)
- `/rss/atom.xml` (Atom 1.0)
- `/rss/feed.json` (JSON Feed)

---

## 📊 7. Analytics & Tracking

### 7.1 Providers

| Provider | ID | Component |
|----------|-----|-----------|
| GA4 | `G-3GP16JG3ED` | `google-analytics.tsx` |
| GTM | `GTM-NBX8VZ3C` | `google-tag-manager.tsx` + `google-tag-manager-next.tsx` |
| Clarity | `tdbejr36nn` | `microsoft-clarity.tsx` |

### 7.2 Event Tracking

**Custom GTM events** (`lib/gtm-events.ts`):
- `pageview` — page path + title
- `click` — category, action, label, value
- `scroll` — scroll depth percentage
- `form_submission` — form name, success status
- `video` — play/pause/complete
- `download` — file name/type
- `outbound_link` — URL + text
- `social_share` — platform, URL, title

**Page-specific Tracking Components:**
- `home-page-tracking.tsx` — scroll depth (25/50/75/100%), CTA clicks, service/article card clicks, form submit
- `services-page-tracking.tsx` — page view, service card clicks, hero button clicks, CTA clicks
- `article-page-tracking.tsx` — scroll depth, article read complete, related article clicks, tag clicks, share clicks, TOC clicks, link clicks

### 7.3 Cookie Consent

- Component: `CookieConsent` (default/small/mini variants)
- On accept: sets cookie `cookieConsent=true`, stores in localStorage, dispatches custom event
- On decline: stores in localStorage, blocks Clarity
- Clarity honors consent via `Clarity.consent()`

---

## 🚀 8. Deployment Architecture

### 8.1 CI/CD Pipeline (GitHub Actions)

```yaml
.github/workflows/deploy.yaml
├── on: push to main
├── Job: tag
│   └── mathieudutour/github-tag-action → bump version (v*)
├── Job: build-app (needs: tag)
│   └── Docker build → push to ghcr.io/captiveau/app
│       Tags: production, v*, sha
└── Job: deploy (needs: build-app)
    └── SSH to VPS → docker compose pull + up -d
```

### 8.2 Docker

- **Base:** `node:20-alpine`
- **Package manager:** pnpm 9.15.9
- **Build:** `pnpm run build` (generates RSS first)
- **Output:** `output: "standalone"` (Next.js standalone mode)
- **Port:** 3003
- **User:** nextjs (non-root, UID 1001)
- **Stage 1:** deps (pnpm install), **Stage 2:** builder (build), **Stage 3:** runner (production)

### 8.3 Environment Variables

| Variable | Value | Used In |
|----------|-------|---------|
| `NEXT_PUBLIC_GA4_ID` | G-3GP16JG3ED | GA4 component |
| `NEXT_PUBLIC_GTM_ID` | GTM-NBX8VZ3C | GTM component |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | tdbejr36nn | Clarity component |
| `NODE_ENV` | production | Runtime mode |

---

## 🛠 9. Key Technical Decisions

### 9.1 Why This Architecture Matters for CMS Migration

1. **mvpblocks pattern** — Each section is an independent component. This maps naturally to CMS "sections" or "blocks" that can be reordered.

2. **Data files in `lib/`** — All content is centralized in TypeScript data files. These are the primary targets for CMS API replacement.

3. **shadcn/ui** — Consistent design primitives. CMS-generated content can reuse these.

4. **MDX articles** — Currently file-based. CMS needs rich text / blocks support.

5. **App Router** — Server Components allow fetching from CMS API directly without client-side waterfalls.

6. **Tailwind CSS** — Design tokens are in `tailwind.config.ts`. CMS should output Tailwind class names.

### 9.2 Current Limitations (to fix in rewrite)

- **All content is hardcoded** — No CMS for non-technical editors
- **`lib/services-data.ts` is massive** (~800 lines) — Hard to maintain
- **Pricing is static** — No way to A/B test or update without deployment
- **Team testimonials are hardcoded** — Can't add/edit without code change
- **Analytics IDs in code** — Should be env vars (partially done)
- **Sitemap has hardcoded URLs** — Should be dynamic from CMS
- **No i18n framework** — Using manual `locale: id_ID` in metadata
- **No preview mode** — Can't preview CMS content before publish

---

## 📝 10. Recommended CMS Content Model

### 10.1 Models & Fields

**1. SiteSettings**
```
- companyName: string
- tagline: string
- description: text
- logo: media
- favicon: media
- socialLinks: group[] { platform, url }
- contacts: group[] { type, value }
- foundingDate: date
- founders: group[] { name, title }
- address: group { street, city, region, postalCode, country }
- analytics: group { ga4Id, gtmId, clarityId }
```

**2. NavigationMenu**
```
- items: repeatable[] { label, href, order, children? }
```

**3. Page** (for all static pages)
```
- slug: string (unique)
- title: string
- description: text
- sections: blocks[] (dynamic zone)
  - hero, features, services, articles, testimonials, cta, faq, contact...
```

**4. Service**
```
- slug: string
- title, subtitle, description: string
- icon: string (lucide icon name)
- image: media
- introduction: rich text
- keyBenefits: repeatable[] { icon, title, description }
- process: repeatable[] { step, title, description, icon }
- usp: repeatable[] { title, description, icon }
- pricingPlans: group { basic, bestDeal, enterprise }
- technologies: string[]
```

**5. Article**
```
- slug: string
- title, description: string
- content: rich text (MDX or blocks)
- author: relation
- tags: taxonomy
- image: media
- published: boolean
- date: datetime
```

**6. Testimonial**
```
- name, role: string
- avatar: media
- text: rich text
- rating: number (1-5)
- order: number
```

**7. TeamMember**
```
- name, role: string
- image: media
- socialLinks: group[] { platform, url }
- order: number
```

**8. JobListing**
```
- title, department: string
- location, type: string
- salary: string
- description: rich text
- responsibilities: rich text
- requirements: repeatable[] { text }
- benefits: repeatable[] { text }
- postedDate, deadline: date
- isActive: boolean
```

**9. FAQ**
```
- question: string
- answer: rich text
- category: taxonomy
- order: number
```

**10. Redirect**
```
- from: string
- to: string
- statusCode: 301 | 302
```

---

## ⚡ 11. CMS Rewrite Strategy

### Phase 1: Data Extraction (Sekarang)
- ✅ Dokumentasi ini selesai
- ✅ Mapping semua content ke model CMS

### Phase 2: CMS Setup (Pilih salah satu)
| CMS | Pro | Kontra |
|-----|-----|--------|
| **Payload CMS** | TypeScript-native, self-hostable, rich text blocks | Butuh server |
| **Strapi** | Mature, plugin ecosystem, RBAC | Berat, butuh maintenance |
| **Hygraph** | GraphQL, generous free tier | Cloud-only |
| **Sanity** | Real-time collaboration, GROQ queries | Learning curve |
| **Contentful** | Enterprise-grade, CDN | Mahal untuk multi-user |
| **WordPress + WPGraphQL** | Populer, banyak plugin | Legacy tech |

### Phase 3: Migration Steps
```
1. Setup CMS with models above
2. Create API layer (lib/cms.ts) — fetch by slug, type
3. Replace lib/*.ts imports with CMS queries
4. Add ISR revalidation (on-demand revalidation)
5. Migrate MDX articles to CMS rich text
6. Add preview mode
7. Remove hardcoded data files
8. Add webhook handlers for content updates
```

---

## 🔧 12. Utility Reference

### 12.1 Tailwind CSS Config Summary

```js
// Custom in tailwind.config.ts
theme.extend = {
  fontFamily: { satoshi: ['Satoshi', 'var(--font-satoshi)', 'system-ui', 'sans-serif'] },
  backgroundImage: { 'gradient-radial', 'gradient-conic' },
  borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
  colors: { white, yellow, orange, blue, + shadcn variables },
  keyframes: { 'accordion-down', 'accordion-up', 'marquee', 'marquee-vertical' },
  animation: { accordion-down, accordion-up, marquee, marquee-vertical }
}
plugins: [tailwindcss-animate]
```

### 12.2 Key shadcn/ui Components Status

Installed via `components.json`: All 50+ default shadcn components are installed. Most commonly used: Button, Card, Badge, Input, Textarea, Label, DropdownMenu, Tabs, Accordion, Avatar, Separator, Dialog, Sheet.

### 12.3 Third-Party Dependencies

| Package | Purpose |
|---------|---------|
| `framer-motion` / `motion` | Animations |
| `@tsparticles/react` + `@tsparticles/slim` | Particle effects (contact, 404) |
| `cobe` | 3D globe (contact section) |
| `lucide-react` | Icons |
| `@calcom/embed-react` | Cal.com scheduling |
| `@studio-freight/react-lenis` / `lenis` | Smooth scrolling |
| `next-mdx-remote` | MDX rendering |
| `gray-matter` | MDX frontmatter parsing |
| `highlight.js` | Code syntax highlighting |
| `recharts` + `@number-flow/react` | Charts & number animation |
| `date-fns` | Date formatting |
| `@microsoft/clarity` | Microsoft Clarity analytics |
| `@next/third-parties` | GTM integration |
| `sonner` | Toast notifications |
| `vaul` | Drawer component |
| `cmdk` | Command menu |
| `clsx` + `tailwind-merge` | Class merging (cn helper) |
| `class-variance-authority` | Component variants |
| `react-hook-form` + `zod` + `@hookform/resolvers` | Form handling |
| `embla-carousel-react` | Carousel |
| `react-resizable-panels` | Resizable panels |
| `feed` | RSS generation |
| `satori` | OG image generation |
| `schema-dts` | TypeScript types for schema.org |

---

*Document generated: 2026-07-21*
*Project: Captiveau Landing Page → Headless CMS Migration*
