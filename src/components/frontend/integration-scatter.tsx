'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { resolveTech } from '@/lib/tech-icons'

/**
 * Brand logo lookup — resolves both tech-stack names (Next.js, TypeScript…)
 * and integration keys (ga4, gsc, clarity…) to a brand mark.
 */
type IntegrationBrand = { label: string; desc?: string; path: string; hex: string }

const integrationBrands: Record<string, IntegrationBrand> = {
  ga4: {
    label: 'Google Analytics 4',
    desc: 'Konversi & engagement tracking',
    hex: '#E37400',
    path: 'M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z',
  },
  gsc: {
    label: 'Google Search Console',
    desc: 'Indeks pencarian & performa query',
    hex: '#458CF5',
    path: 'M8.548 1.156L6.832 2.872v1.682h1.716zm0 3.398v.035H6.832v-.035H3.386L0 7.844v3.577h2.826V8.94c0-.525.429-.954.954-.954h16.476c.525 0 .954.43.954.954v2.48h2.754V7.844l-3.386-3.29H17.3v.035h-1.717v-.035zm7.035 0H17.3V2.872l-1.717-1.716zM8.679 1.188V2.84h6.773V1.188zm11.471 7.07a.834.834 0 00-.132.01l-.543.002c-5.216.014-10.432-.008-15.648.01-.435-.063-.794.436-.716.883v2.264h17.812c-.016-.888.045-1.782-.034-2.666-.104-.342-.427-.502-.739-.502zm-15.422.634a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zm2.134 0a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zM.036 11.645v9.156c0 1.05.858 1.908 1.907 1.908h.883V11.645zm21.174 0v11.064h.882c1.05 0 1.908-.858 1.908-1.908v-9.156zM4.057 13.133v6.85h6.137v-6.85zm13.243.021v3.777l-1.708.977-1.708-.977v-3.758a4.006 4.006 0 000 7.23v2.441h3.457v-2.442a4.006 4.006 0 00-.041-7.248zm-13.243 8.26v1.43h7.925v-1.43z',
  },
  gtm: {
    label: 'Google Tag Manager',
    desc: 'Manajemen tag tanpa developer',
    hex: '#246FDB',
    path: 'M12.003 0a3 3 0 0 0-2.121 5.121l6.865 6.865-4.446 4.541 1.745 1.836a3.432 3.432 0 0 1 .7.739l.012.011-.001.002a3.432 3.432 0 0 1 .609 1.953 3.432 3.432 0 0 1-.09.78l7.75-7.647c.031-.029.067-.05.098-.08.023-.023.038-.052.06-.076a2.994 2.994 0 0 0-.06-4.166l-9-9A2.99 2.99 0 0 0 12.003 0zM8.63 2.133L.88 9.809a2.998 2.998 0 0 0 0 4.238l7.7 7.75a3.432 3.432 0 0 1-.077-.729 3.432 3.432 0 0 1 3.431-3.431 3.432 3.432 0 0 1 .826.101l-5.523-5.81 4.371-4.373-2.08-2.08c-.903-.904-1.193-2.183-.898-3.342zm3.304 16.004a2.932 2.932 0 0 0-2.931 2.931A2.932 2.932 0 0 0 11.934 24a2.932 2.932 0 0 0 2.932-2.932 2.932 2.932 0 0 0-2.932-2.931z',
  },
  'meta-pixel': {
    label: 'Meta Pixel',
    desc: 'Retargeting & konversi iklan',
    hex: '#0467DF',
    path: 'M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z',
  },
  hotjar: {
    label: 'Hotjar',
    desc: 'Heatmap & session recording',
    hex: '#FF3C00',
    path: 'M10.119 9.814C12.899 8.27 16.704 6.155 16.704 0h-4.609c0 3.444-1.676 4.375-4.214 5.786C5.1 7.33 1.295 9.444 1.295 15.6h4.61c0-3.444 1.676-4.376 4.214-5.786zM18.096 8.4c0 3.444-1.677 4.376-4.215 5.785-2.778 1.544-6.585 3.66-6.585 9.815h4.609c0-3.444 1.676-4.376 4.214-5.786 2.78-1.544 6.586-3.658 6.586-9.814h-4.609z',
  },
  performance: {
    label: 'Lighthouse / Performance',
    desc: 'Core Web Vitals & Lighthouse',
    hex: '#F44B21',
    path: 'M12 0l5.5 3.5v5H20v3h-2.25l2 12.5H4.25l2-12.5H4v-3h2.5V3.53zm2.94 13.25l-6.22 2.26L8 20.04l7.5-2.75zM12 3.56L9.5 5.17V8.5h5V5.15Z',
  },
  zapier: {
    label: 'Zapier',
    desc: 'Otomasi alur kerja',
    hex: '#FF4F00',
    path: 'M23.4 12.6c-.9.4-2.2.5-3.1.7-.2 1-.4 2.2-1.1 3.3.8.6 1.7 1.5 2.2 2.5.6 1.3-.3 2.3-1.4 2.9-1.1.6-2.5.5-3.5-.1-1.1-.7-2-1.7-2.7-2.8-.9.7-2 1.1-3.2 1.3-.2 1-.3 2.2-.9 3.3-.5.9-1.3 1.5-2.3 1.8-1 .3-2.1.1-3-.5-1.2-.8-1.6-2.3-1.1-3.6.5-1.3 1.6-2.3 2.7-3.1-.6-.8-.9-1.9-1.1-2.9-1-.1-2.1-.2-3.1-.7C.3 12.2 0 11 0 9.9c0-1.1.7-2.2 1.8-2.8 1.1-.6 2.4-.5 3.5.1.9.7 1.7 1.6 2.3 2.7.9-.7 2-1.1 3.2-1.3.2-1 .4-2.2 1-3.2.6-1.1 1.8-2 3-2.2 1.5-.2 3 .3 4 1.5.8.9.9 2.2.5 3.3-.5 1.2-1.4 2-2.5 2.8.6.9 1.5 1.7 2.7 2.3 1.2.6 2.3.6 3.4.2 1.4-.5 2.6-1.7 3.1-3.1.3-.9.3-1.9 0-2.8z',
  },
  semrush: {
    label: 'SEMrush',
    desc: 'SEO & riset kata kunci',
    hex: '#FF642D',
    path: 'M8.22 2.63a13.2 13.2 0 1 0 7.43.14l.42.05-4.16 4.13a5.88 5.88 0 1 1-3.72-.02l-4.13-4.12zm2.07 4.19 3.1 3.1-3.19 3.19a4.6 4.6 0 0 0-2.7.9l-1.8 1.8a6.8 6.8 0 0 1 4.6-9zm-1.94 1.94a4.65 4.65 0 0 1 2.56.64l1.82-1.82a6.8 6.8 0 0 0-4.7 4.16l1.74-1.74c.4-.18.81-.28 1.24-.31a2.5 2.5 0 1 1-2.66-.93z',
  },
  intercom: {
    label: 'Intercom',
    desc: 'Live chat & support',
    hex: '#6AFDEF',
    path: 'M21.75 2H2.25A2.25 2.25 0 0 0 0 4.25v15.5A2.25 2.25 0 0 0 2.25 22h19.5A2.25 2.25 0 0 0 24 19.75V4.25A2.25 2.25 0 0 0 21.75 2zm-6.7 4.1c0-.2.16-.35.35-.35h1.5c.2 0 .36.16.36.35v5.62a.36.36 0 0 1-.36.36h-1.5a.36.36 0 0 1-.36-.36zM9.5 4.9c0-.2.16-.36.36-.36h1.5c.2 0 .36.16.36.36v10.16c0 .2-.16.36-.36.36h-1.5a.36.36 0 0 1-.36-.36zM5.3 4.56c0-.2.16-.36.36-.36h1.5c.2 0 .36.16.36.36v9.13c0 .2-.16.35-.36.35H5.66a.36.36 0 0 1-.36-.35zM3 6.75c0-.2.16-.36.36-.36h1.5c.2 0 .36.16.36.36v7.17c0 .2-.16.35-.36.35H3.36a.36.36 0 0 1-.36-.35zM17.8 17.95c-2.14 1.14-5.22 1.55-7.55 1.55-1.5 0-3.4-.15-4.83-.56a.36.36 0 0 1-.24-.34c0-.2.16-.36.36-.36h.02c1.5.36 3.5.44 4.7.44 2.2 0 5.1-.4 7.2-1.4a.36.36 0 0 1 .35.65c-.01 0-.01.01-.01.02z',
  },
  mailchimp: {
    label: 'Mailchimp',
    desc: 'Email marketing',
    hex: '#FFE01B',
    path: 'M7.6 10.28c-.43 0-.43.65 0 .65.45 0 .45-.65 0-.65zm-3.6.4c-.37 0-.37.56 0 .56.4 0 .4-.56 0-.56zm4.8-1.1c-1.94 0-3.5 1.57-3.5 3.5 0 1.94 1.56 3.5 3.5 3.5s3.5-1.56 3.5-3.5c0-1.93-1.56-3.5-3.5-3.5zm2.63 4.05-1.42 2.5c-.12.23.15.4.33.23l2.05-2.4a3.4 3.4 0 0 1-.96-.33zm2.63-4.03c-.36-.2-.83-.13-1.1.16-.27-.3-.74-.36-1.1-.16a.83.83 0 0 0-.37.68c0 .2.06.4.2.55l.7 1.1-.9 1.38a.82.82 0 0 0 1.34.94l.78-.78.78.78a.82.82 0 0 0 1.34-.94l-.9-1.38.7-1.1a.83.83 0 0 0-.47-1.23zM12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm6.9 15.46c-1.9 1.93-3.86 2.4-6.9 2.4-3.04 0-5-.47-6.9-2.4-.94-.95-.86-2.15-.5-2.86.1-.2.34-.16.3.05-.2 1.2.3 2.2 1.2 2.7 1.3.7 2.6.3 3.1-1.2.2-.6.4-1.2.9-1.8.8-1.06 1.4-2.3 1.4-3.7 0-.8-.2-1.5-.6-2.2-.4-.65-.6-1.2-.6-1.85 0-.2.15-.36.35-.36.15 0 .3.1.35.25l.7 1.6c.3.7 1 .9 1.6.3.4-.4.4-.9.2-1.3-.6-1.1.6-1.9 1.6-1.2.8.55.9 1.3 1.6 1.3.5 0 1.2-.4 1.2-1.6 0-.2.17-.36.37-.36.2 0 .36.16.36.37 0 .3-.1.6-.2.9-.5 1.3.3 2.4 1.2 2.7 1.2.4 1.6 1.5.9 2.5-1.1 1.6-2 2-3 3-.9.9-2.7 1.9-2.7 3.8 0 .95.6 1.7 1.4 2.2-.5-.02-1-.2-1.4-.5-1.5-1.3-1.5-3-1.5-4.6 0-.4-.2-.8-.6-1-.4-.2-.9-.1-1.2.2-.4.3-.6.9-.6 1.4 0 1.9-.5 3.6-2.7 3.8-.2 0-.4-.1-.5-.2-.2-.2 0-.6.3-.5 1.5.2 2-1 2-2.4 0-1.5-1.1-2.9-2.7-3.1-1.8-.3-3.2 1.1-3.2 2.8 0 1.2.7 2.3 1.9 2.7-1.7-.7-2.5-2.3-2.5-4 .1-2.5 2.2-4.4 4.7-4.4 2.6 0 4.8 2.1 4.8 4.7 0 1.8-1 3.3-2.5 4.1-.3.2-.6 0-.5-.3.8-2.6-1.3-4.1-3.2-3.6-1.2.3-2 1.3-2 2.5 0 1 .6 1.9 1.6 2.2-1.1-.2-1.9-1.1-1.9-2.2 0-1.4 1.2-2.6 2.6-2.6 1.2 0 2.2.8 2.5 2 .2.8.9 1.4 1.8 1.4 1 0 1.7-.8 1.7-1.8 0-2-1.7-3.7-3.7-3.7-2 0-3.7 1.7-3.7 3.7 0 .3.04.6.1.9-1.3-.7-2.1-2-2.1-3.5 0-2.4 2-4.4 4.4-4.4 1.3 0 2.5.6 3.4 1.5.3.3.6.5.9.7.5-.5 1.3-.5 1.7 0 .2.2.3.5.3.8.5.3.9.8 1 1.4-.8-.3-1.6-.4-2.3-.3.4.4 1.1.5 1.7.4-.4.4-1 .5-1.5.4-.5-.1-1-.4-1.3-.9-.9-1.2-1.7-1.9-2.4-2.5-.3-.3-.5-.7-.5-1.2v-.2c.1-.7.7-1.1 1.4-1.1.6 0 1.2.4 1.4 1z',
  },
  n8n: {
    label: 'n8n',
    desc: 'Workflow automation',
    hex: '#EA4B71',
    path: 'M12 0a4.5 4.5 0 0 0-3.24 7.65L5.4 10.99a4.5 4.5 0 1 0 0 6.26l3.36 3.34a4.5 4.5 0 1 0 1.51-1.57l-3.36-3.34a4.5 4.5 0 0 0 0-3.13l3.36-3.35A4.5 4.5 0 0 0 12 9a4.5 4.5 0 0 0 0-9zm0 6.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  },
}

export function resolveBrand(name: string): IntegrationBrand | null {
  const key = name.toLowerCase()
  if (key in integrationBrands) return integrationBrands[key]
  const tech = resolveTech(name)
  if (tech) return { label: tech.name, path: tech.path, hex: tech.hex }
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
}

/**
 * Scattered brand-logo grid (adapted from @efferd/integrations-4) with
 * hover tooltips explaining each mark.
 */
export default function IntegrationScatter({ title, description, items }: IntegrationScatterProps) {
  const tiles = items.slice(0, 12)
  const [openTile, setOpenTile] = useState<number | null>(null)

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:items-center">
      <div className="max-w-xl space-y-5">
        <h2 className="text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="text-lg leading-8 text-muted-foreground">{description}</p>
        )}
        <p className="text-sm text-muted-foreground/70">
          Klik atau arahkan kursor ke logo untuk melihat nama & fungsinya.
        </p>
      </div>

      <div className="place-items-end">
        <div className="mask-[radial-gradient(ellipse_at_center,black,black,transparent)] relative size-72 max-w-full [--scatter-cell:56px] sm:size-90 sm:[--scatter-cell:72px]">
          {tiles.map((name, i) => {
            const brand = resolveBrand(name)
            const [row, col] = POSITIONS[i % POSITIONS.length]
            const isOpen = openTile === i
            return (
              <div
                key={name + i}
                className="group/tile absolute"
                style={{
                    left: `calc(var(--scatter-cell, 72px) * ${col})`,
                    top: `calc(var(--scatter-cell, 72px) * ${row})`,
                  }}
              >
                {/* Tooltip — click on any screen, hover on desktop.
                    Positioned safely so it never leaves the viewport. */}
                <div
                  className={cn(
                    'pointer-events-none absolute z-40 max-w-[min(16rem,calc(100vw-1.5rem))] whitespace-normal border border-border bg-background px-2.5 py-1.5 text-center opacity-0 shadow-lg transition-opacity duration-150',
                    'group-hover/tile:opacity-100 lg:group-hover/tile:opacity-100',
                    isOpen && 'opacity-100',
                    // vertical: below for top row, above otherwise
                    row === 0 ? 'top-full mt-2' : '-top-12',
                    // horizontal: never overflow the viewport
                    col === 0 ? 'left-0' : col >= 3 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                  )}
                >
                  <span className="block text-[11px] font-semibold text-foreground">
                    {brand?.label || name}
                  </span>
                  {brand?.desc && (
                    <span className="block text-[10px] text-muted-foreground">
                      {brand.desc}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  aria-label={brand?.label || name}
                  onClick={() => setOpenTile(isOpen ? null : i)}
                  className={cn(
                    'flex size-14 items-center justify-center border active:scale-[0.96] sm:size-18',
                    brand
                      ? 'bg-card shadow-xs dark:bg-card/60'
                      : 'bg-secondary/30 dark:bg-background',
                    isOpen && 'border-foreground/40'
                  )}
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
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}