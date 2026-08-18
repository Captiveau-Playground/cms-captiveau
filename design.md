# Captiveau Design System
Version: 3.0.0 — "Clean Studio"

Author: Captiveau
Status: Active
Last Updated: August 2026

---

## Introduction

Captiveau adalah software house Indonesia yang membangun digital product
end-to-end. Design system v3 ("Clean Studio") adalah visual world untuk situs
resmi yang menyelaraskan dengan **captiveau.id**: light, clean, profesional,
dengan biru sebagai primary dan oranye sebagai aksen.

Design language: **clean professional software-house** — white canvas, kartu
`rounded-xl` dengan border subtle, soft shadow saat hover, dan aksen motion
yang terkendali dari **Sora UI**. Tidak ada elemen dekoratif berlebihan.

---

## Design Principles

1. **Clean & professional** — white background, hierarchy tipografi yang jelas,
   spacing konsisten. Menghormati estetika bisnis-ke-bisnis.
2. **Blue = aksi, orange = aksen** — biru `#2563EB` untuk CTA & interaksi,
   oranye `#FF6600` untuk penanda kecil (badge, dot, highlight).
3. **Motion secukupnya** — animasi hanya pada momen yang berarti (reveal,
   hover, count-up). Bukan dekorasi di setiap elemen.
4. **Kartu ringan** — `rounded-xl border bg-card`, hover `shadow-lg` + border
   biru tipis. Tidak ada gradien gelap atau motif grid.
5. **Konten asli** — copy & struktur mengikuti captiveau.id.

---

## Color Tokens (Tailwind v4 CSS variables)

| Token | HSL | Hex (approx) |
|-------|-----|--------------|
| `--background` | `0 0% 100%` | white |
| `--foreground` | `222 47% 11%` | `#0f172a` |
| `--card` | `0 0% 100%` | white |
| `--primary` | `221 83% 53%` | `#2563EB` |
| `--primary-foreground` | `0 0% 100%` | white |
| `--secondary` | `24 100% 50%` | `#FF6600` |
| `--muted` | `210 40% 96%` | `#f1f5f9` |
| `--muted-foreground` | `215 16% 47%` | `#64748b` |
| `--border` | `214 32% 91%` | `#e2e8f0` |
| `--ring` | `221 83% 53%` | `#2563EB` |

---

## Typography

- **Sans:** Satoshi Variable (`/fonts/Satoshi-Variable.ttf`) — `--font-sans`.
- Heading: `font-bold tracking-tight`, H1 `text-4xl–6xl leading-[1.08]`.
- Body: `text-base–lg`, `text-muted-foreground`.
- Small uppercase labels: `text-xs font-semibold uppercase tracking-[0.12em]`
  berwarna `secondary` atau `primary`.

---

## Komponen

### Primitives Sora UI terpasang

`src/components/sora-ui/` — text-effect, text-scramble, number-flow,
border-trail, magnetic-cards, tilt-card, progressive-blur, rolling-text,
logo-carousel-swapper, inline-testimonials, draw-underline-link,
particle-hover-button, stagger-button, highlight, accordion, fog-text-reveal,
text-loop.

### Penggunaan Sora UI di situs

| Komponen | Dipakai di |
|----------|-----------|
| `TextEffect` (fade-in-blur, per-line) | Judul hero & PageHero |
| `NumberFlow` (via `CountUp`) | Statistik hero & portfolio |
| `TiltCard` (subtle, rotation 2–3°) | Kartu layanan, portfolio, artikel |
| `BorderTrail` | Hover accent pada kartu feature/trust |
| `ParticleHoverButton` | Partikel oranye pada tombol CTA |
| `Accordion` | FAQ (tab kategori + accordion) |
| `DrawUnderlineLink` | Navbar link |

### Komponen frontend

`src/components/frontend/` — `navbar` (light, backdrop-blur saat scroll, logo
asli), `footer` (dark navy + logo asli + aksen gradien), `cta-button`
(primary/accent/outline/white), `eyebrow` (label clean), `section`,
`page-hero` (gradien light), `reveal` (server-safe motion), `count-up`,
`social-icons`, `home/*` (hero, trust, advantages, services, blog,
testimonials, cta, faq, contact).

---

## Halaman

| Route | Isi (menyesuaikan captiveau.id) |
|-------|----------------------------------|
| `/` | Hero + stats + tech stack, 3 trust cards, Keunggulan, Layanan (4), Artikel, Testimoni (carousel), CTA, FAQ (tab), Kontak form |
| `/services` | Grid layanan + proses + CTA |
| `/services/[slug]` | Detail: benefits, proses, pricing 3 tier, stack, cross-sell |
| `/portfolio` | Grid portfolio (tilt) + statistik + CTA |
| `/portfolio/[slug]` | Studi kasus: cover, meta, hasil, CTA, project lain |
| `/blog-01` | Artikel: filter kategori, featured, grid |
| `/about` | Story + statistik, nilai C.L.E.A.R, tim |
| `/contact` | Channel kontak + form |
| `/faq` | Accordion lengkap |
| `/career` | Benefits, lowongan, CTA |

Data konten: `src/lib/content.ts` (statis, mencerminkan isi CMS Payload).

## Aset

- Logo asli: `public/logo.webp` & `public/logo.png` (dari captiveau.id).
