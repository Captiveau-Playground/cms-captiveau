'use client'

import { cn } from '@/lib/utils'
import { resolveTech } from '@/lib/tech-icons'
import type { IntegrationName } from '@/components/frontend/integrations-showcase'

/**
 * Brand logo lookup — resolves both tech-stack names (Next.js, TypeScript…)
 * and integration keys (ga4, gsc, clarity…) to a brand mark.
 */
const integrationBrands: Partial<Record<IntegrationName, { label: string; path: string; hex: string }>> = {
  ga4: {
    label: 'Google Analytics 4',
    hex: '#E37400',
    path: 'M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z',
  },
  gsc: {
    label: 'Search Console',
    hex: '#458CF5',
    path: 'M8.548 1.156L6.832 2.872v1.682h1.716zm0 3.398v.035H6.832v-.035H3.386L0 7.844v3.577h2.826V8.94c0-.525.429-.954.954-.954h16.476c.525 0 .954.43.954.954v2.48h2.754V7.844l-3.386-3.29H17.3v.035h-1.717v-.035zm7.035 0H17.3V2.872l-1.717-1.716zM8.679 1.188V2.84h6.773V1.188zm11.471 7.07a.834.834 0 00-.132.01l-.543.002c-5.216.014-10.432-.008-15.648.01-.435-.063-.794.436-.716.883v2.264h17.812c-.016-.888.045-1.782-.034-2.666-.104-.342-.427-.502-.739-.502zm-15.422.634a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zm2.134 0a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zM.036 11.645v9.156c0 1.05.858 1.908 1.907 1.908h.883V11.645zm21.174 0v11.064h.882c1.05 0 1.908-.858 1.908-1.908v-9.156zM4.057 13.133v6.85h6.137v-6.85zm13.243.021v3.777l-1.708.977-1.708-.977v-3.758a4.006 4.006 0 000 7.23v2.441h3.457v-2.442a4.006 4.006 0 00-.041-7.248zm-13.243 8.26v1.43h7.925v-1.43z',
  },
  gtm: {
    label: 'Tag Manager',
    hex: '#246FDB',
    path: 'M12.003 0a3 3 0 0 0-2.121 5.121l6.865 6.865-4.446 4.541 1.745 1.836a3.432 3.432 0 0 1 .7.739l.012.011-.001.002a3.432 3.432 0 0 1 .609 1.953 3.432 3.432 0 0 1-.09.78l7.75-7.647c.031-.029.067-.05.098-.08.023-.023.038-.052.06-.076a2.994 2.994 0 0 0-.06-4.166l-9-9A2.99 2.99 0 0 0 12.003 0zM8.63 2.133L.88 9.809a2.998 2.998 0 0 0 0 4.238l7.7 7.75a3.432 3.432 0 0 1-.077-.729 3.432 3.432 0 0 1 3.431-3.431 3.432 3.432 0 0 1 .826.101l-5.523-5.81 4.371-4.373-2.08-2.08c-.903-.904-1.193-2.183-.898-3.342zm3.304 16.004a2.932 2.932 0 0 0-2.931 2.931A2.932 2.932 0 0 0 11.934 24a2.932 2.932 0 0 0 2.932-2.932 2.932 2.932 0 0 0-2.932-2.931z',
  },
  'meta-pixel': {
    label: 'Meta Pixel',
    hex: '#0467DF',
    path: 'M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z',
  },
  hotjar: {
    label: 'Hotjar',
    hex: '#FF3C00',
    path: 'M10.119 9.814C12.899 8.27 16.704 6.155 16.704 0h-4.609c0 3.444-1.676 4.375-4.214 5.786C5.1 7.33 1.295 9.444 1.295 15.6h4.61c0-3.444 1.676-4.376 4.214-5.786zM18.096 8.4c0 3.444-1.677 4.376-4.215 5.785-2.778 1.544-6.585 3.66-6.585 9.815h4.609c0-3.444 1.676-4.376 4.214-5.786 2.78-1.544 6.586-3.658 6.586-9.814h-4.609z',
  },
  performance: {
    label: 'Lighthouse',
    hex: '#F44B21',
    path: 'M12 0l5.5 3.5v5H20v3h-2.25l2 12.5H4.25l2-12.5H4v-3h2.5V3.53zm2.94 13.25l-6.22 2.26L8 20.04l7.5-2.75zM12 3.56L9.5 5.17V8.5h5V5.15Z',
  },
}

export function resolveBrand(name: string): { path: string; hex: string; label: string } | null {
  const key = name.toLowerCase()
  if (key in integrationBrands) {
    const b = integrationBrands[key as IntegrationName]!
    return { path: b.path, hex: b.hex, label: b.label }
  }
  const tech = resolveTech(name)
  if (tech) return { path: tech.path, hex: tech.hex, label: tech.name }
  return null
}

/** Scatter positions on a 5×5 grid (72px cells). */
const POSITIONS: [number, number][] = [
  [0, 1], [0, 3], [1, 0], [1, 2], [1, 4],
  [2, 1], [2, 3], [3, 0], [3, 2], [3, 4],
  [4, 1], [4, 3],
]

type IntegrationScatterProps = {
  title: string
  description?: string
  items: string[]
  size?: 'sm' | 'lg'
}

/**
 * Scattered brand-logo grid (adapted from @efferd/integrations-4) for tech
 * stacks and digital integrations.
 */
export default function IntegrationScatter({ title, description, items, size = 'lg' }: IntegrationScatterProps) {
  const tiles = items.slice(0, 12)

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:items-center">
      <div className="max-w-xl space-y-5">
        <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="text-lg leading-8 text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="place-items-end">
        <div className="mask-[radial-gradient(ellipse_at_center,black,black,transparent)] relative size-80 sm:size-90">
          {tiles.map((name, i) => {
            const brand = resolveBrand(name)
            const [row, col] = POSITIONS[i % POSITIONS.length]
            return (
              <div
                key={name + i}
                className={cn(
                  'absolute flex size-18 items-center justify-center rounded-md border',
                  brand ? 'bg-card shadow-xs dark:bg-card/60' : 'bg-secondary/30 dark:bg-background'
                )}
                style={{ left: col * 72, top: row * 72 }}
                title={brand?.label || name}
              >
                {brand ? (
                  <svg viewBox="0 0 24 24" fill={brand.hex} aria-hidden="true" className="size-8 select-none p-1">
                    <path d={brand.path} />
                  </svg>
                ) : (
                  <span className="px-1 text-center text-[10px] font-semibold text-muted-foreground">
                    {name}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}