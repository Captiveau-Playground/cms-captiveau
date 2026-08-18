'use client'

import {
  BarChart3,
  Search,
  Eye,
  Braces,
  Target,
  MousePointerClick,
  FileSearch,
  Gauge,
  Code2,
} from 'lucide-react'
import { Reveal } from './reveal'

export type IntegrationName =
  | 'ga4'
  | 'gsc'
  | 'clarity'
  | 'gtm'
  | 'meta-pixel'
  | 'hotjar'
  | 'seo'
  | 'schema'
  | 'performance'

const meta: Record<
  IntegrationName,
  { label: string; description: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }
> = {
  ga4: { label: 'GA4', description: 'Google Analytics 4 — konversi & engagement', icon: BarChart3 },
  gsc: { label: 'Search Console', description: 'Google Search Console — indeks & query', icon: Search },
  clarity: { label: 'Microsoft Clarity', description: 'Heatmap & session recording', icon: Eye },
  gtm: { label: 'Tag Manager', description: 'Google Tag Manager — manajemen tag', icon: Braces },
  'meta-pixel': { label: 'Meta Pixel', description: 'Retargeting & konversi iklan', icon: Target },
  hotjar: { label: 'Hotjar', description: 'Behavioral insight & feedback', icon: MousePointerClick },
  seo: { label: 'SEO & Open Graph', description: 'Meta, OG, & sosial sharing', icon: FileSearch },
  schema: { label: 'Schema.org', description: 'Structured data untuk SERP', icon: Code2 },
  performance: { label: 'Performance', description: 'Core Web Vitals & Lighthouse', icon: Gauge },
}

/**
 * "Digital integrations included" — the analytics/verification stack we ship
 * with each client project (GA4, GSC, Clarity, and more), managed per-project
 * in the CMS.
 */
export default function IntegrationsShowcase({
  integrations,
}: {
  integrations: IntegrationName[]
}) {
  if (!integrations.length) return null

  const items = integrations
    .map((name) => meta[name])
    .filter(Boolean)

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, i) => (
        <Reveal key={item.label} delay={i * 0.04}>
          <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-black/5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <item.icon className="size-4.5 text-primary" strokeWidth={1.7} />
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-foreground">{item.label}</span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}