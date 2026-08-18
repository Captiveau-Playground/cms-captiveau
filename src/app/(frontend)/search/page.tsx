import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionShell, ContentRail } from '@/components/layout-contract'
import { getCmsServices, getCmsProjects, getCmsArticles } from '@/lib/cms-data'
import { AnimatedHeading } from '@/components/frontend/animated-heading'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Cari di Captiveau',
    description:
      'Cari layanan, portofolio, dan artikel di Captiveau — software house Indonesia.',
    path: '/search',
    noindex: true,
  })
}

type Result = { title: string; href: string; category: string; snippet: string }

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams
  const query = q.trim().toLowerCase()

  let results: Result[] = []
  if (query) {
    const [services, projects, articles] = await Promise.all([
      getCmsServices().catch(() => []),
      getCmsProjects().catch(() => []),
      getCmsArticles().catch(() => []),
    ])

    const match = (text: string) => text.toLowerCase().includes(query)

    results = [
      ...services
        .filter((s) => match(s.title) || match(s.description))
        .map((s) => ({ title: s.title, href: `/services/${s.slug}`, category: 'Layanan', snippet: s.description })),
      ...projects
        .filter((p) => match(p.title) || match(p.description) || match(p.category))
        .map((p) => ({ title: p.title, href: `/portfolio/${p.slug}`, category: 'Portofolio', snippet: p.description })),
      ...(articles as any[])
        .filter((a) => match(a.title) || match(a.excerpt || ''))
        .map((a) => ({ title: a.title, href: `/blog/${a.slug}`, category: 'Blog', snippet: a.excerpt })),
    ].slice(0, 20)
  }

  return (
    <SectionShell spacingMode="section">
      <ContentRail maxWidth="max-w-7xl" className="space-y-10">
        <div className="border-b border-border pb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Cari · Captiveau
          </p>
          <AnimatedHeading
            as="h1"
            className="mt-3 text-balance font-medium text-3xl tracking-[-0.04em] md:text-4xl"
            text={query ? `Hasil untuk “${q.trim()}”` : 'Cari di Captiveau'}
          />
        </div>

        <form action="/search" className="flex max-w-2xl gap-2">
          <input
            name="q"
            defaultValue={q.trim()}
            placeholder="Cari layanan, proyek, artikel…"
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
          />
          <button
            type="submit"
            className="shrink-0 border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted/40 active:scale-[0.98]"
          >
            Cari
          </button>
        </form>

        {query && (
          <div className="flex flex-col divide-y divide-border border border-border bg-background">
            {results.length === 0 && (
              <p className="px-6 py-10 text-center text-sm text-muted-foreground">
                Tidak ada hasil untuk “{q.trim()}”.
              </p>
            )}
            {results.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group flex items-start justify-between gap-4 px-6 py-5 transition-colors hover:bg-muted/40"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {r.category}
                  </p>
                  <h2 className="mt-1 text-lg font-medium tracking-[-0.02em] text-foreground group-hover:text-primary">
                    {r.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {r.snippet}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        )}
      </ContentRail>
    </SectionShell>
  )
}