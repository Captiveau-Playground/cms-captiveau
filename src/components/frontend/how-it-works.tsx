import { ArrowRight, Search, Palette, Code2, ShieldCheck, Rocket, ClipboardList } from 'lucide-react'
import { CtaButton } from '@/components/frontend/cta-button'

export type HowItWorksStep = {
  n: string
  icon: string
  title: string
  body: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'clipboard-list': ClipboardList,
  palette: Palette,
  code: Code2,
  shield: ShieldCheck,
  rocket: Rocket,
  search: Search,
}

/**
 * Three/five numbered steps (adapted from @blockus/how-it-works-01).
 */
export default function HowItWorks({
  steps,
  title = 'Cara kami bekerja',
  description = 'Metode terbukti dari puluhan proyek. Transparan di setiap tahap.',
}: {
  steps: HowItWorksStep[]
  title?: React.ReactNode
  description?: string
}) {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            How it works
          </span>
          <h2
            className="text-balance font-semibold tracking-tight"
            style={{
              fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
            }}
          >
            {title}
          </h2>
          <p className="max-w-md text-balance text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => {
            const Icon = iconMap[s.icon] || ClipboardList
            return (
              <li
                key={s.n}
                className="flex flex-col gap-3 rounded-none border border-border bg-card p-5 shadow-sm shadow-black/5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-none bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </li>
            )
          })}
        </ol>

        <div className="mt-10 flex justify-center">
          <CtaButton href="/contact" size="lg">
            Mulai Konsultasi
            <ArrowRight className="size-4" />
          </CtaButton>
        </div>
      </div>
    </section>
  )
}