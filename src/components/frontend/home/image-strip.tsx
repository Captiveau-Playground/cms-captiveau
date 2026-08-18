'use client'

import { InfiniteScrollingImages } from '@/components/sora-ui/effects/infinite-scrolling-images'
import { RevealHeading } from '../section'
import type { ServiceItem } from '@/lib/content'
import type { Project as ProjectItem } from '@/lib/content'

export default function ImageStrip({ projects, services }: { projects: ProjectItem[]; services: ServiceItem[] }) {
  const items = [
  ...projects.map((p) => ({ src: p.image, alt: p.title })),
  ...services.slice(0, 4).map((s) => ({ src: s.image, alt: s.title })),
  { src: '/images/office.jpg', alt: 'Ruang kerja Captiveau' },
  { src: '/images/design.jpg', alt: 'Proses desain produk digital' },
]

  return (
    <section className="relative bg-gray-50 py-14 sm:py-20">
      <div className="mx-auto mb-10 flex w-full max-w-7xl items-end justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
            Behind the Scenes
          </span>
          <RevealHeading blockColor="hsl(var(--secondary))" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            From idea to launch
          </RevealHeading>
        </div>
        <p className="hidden max-w-xs text-sm leading-relaxed text-muted-foreground sm:block">
          A glimpse into our projects and process — keep scrolling to
          watch them change.
        </p>
      </div>

      <div className="h-[52vh] min-h-[420px] w-full">
        <InfiniteScrollingImages
          items={items}
          autoplay
          autoplayIntervalSeconds={2.5}
          framesVisible={3}
        />
      </div>
    </section>
  )
}
