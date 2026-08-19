'use client'
import AnalyticsTracker from '@/components/frontend/analytics-tracker'

import { useEffect } from 'react'

export type AnalyticsData = {
  ga4Id?: string | null
  gtmId?: string | null
  clarityId?: string | null
}

declare global {
  interface Window {
    dataLayer: unknown[]
    clarity?: (event: string, ...args: unknown[]) => void
  }
}

/**
 * Injects CMS-managed analytics scripts (GA4, GTM, Microsoft Clarity).
 * Rendered once on the client; values come from Site Settings → Analytics.
 */
export type CalData = {
  enabled?: boolean | null
  link?: string | null
  namespace?: string | null
}

/**
 * Injects CMS-managed scripts: analytics (GA4/GTM/Clarity) and the Cal.com
 * booking embed (enables data-cal-link triggers on consultation CTAs).
 */
export default function Integrations({
  analytics,
  cal,
}: {
  analytics?: AnalyticsData | null
  cal?: CalData | null
}) {
  useEffect(() => {
    const ids = analytics || {}

    // GA4
    if (ids.ga4Id) {
      const w = window as unknown as { dataLayer: unknown[] }
      w.dataLayer = w.dataLayer || []
      const gtag = (...args: unknown[]) => w.dataLayer.push(args)
      gtag('js', new Date())
      gtag('config', ids.ga4Id)

      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ids.ga4Id}`
      document.head.appendChild(s)
    }

    // GTM
    if (ids.gtmId) {
      const w = window as unknown as { dataLayer: unknown[] }
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.googletagmanager.com/gtm.js?id=${ids.gtmId}`
      document.head.appendChild(s)
    }

    // Microsoft Clarity
    if (ids.clarityId) {
      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.clarity.ms/tag/${ids.clarityId}`
      document.head.appendChild(s)

      const w = window as unknown as { clarity?: (...args: unknown[]) => void }
      w.clarity = w.clarity || function clarity(...args: unknown[]) {
        ;(w as unknown as { q: unknown[][] }).q =
          (w as unknown as { q: unknown[][] }).q || []
        ;(w as unknown as { q: unknown[][] }).q.push(args)
      }
    }

    // Cal.com booking embed — powers data-cal-link consultation CTAs
    if (cal?.enabled && cal.link && cal.namespace) {
      type CalApi = {
        (...args: unknown[]): void
        ns: Record<string, unknown>
        q: unknown[][]
        loaded?: boolean
        config: Record<string, unknown>
      }

      const ns = cal.namespace
      const embedUrl = 'https://app.cal.com/embed/embed.js'
      const win = window as unknown as Record<string, unknown>
      const existing = win.Cal as CalApi | undefined

      const calApi: CalApi = ((...args: unknown[]) => {
        const arr = Array.from(args)
        if (!calApi.loaded) {
          const script = document.createElement('script')
          script.src = embedUrl
          document.head.appendChild(script)
          calApi.loaded = true
        }
        if (arr[0] === 'init') {
          const api = (...a: unknown[]) => {
            ;(api as unknown as { q: unknown[][] }).q.push(a)
          }
          ;(api as unknown as { q: unknown[][] }).q = []
          if (typeof arr[1] === 'string') {
            calApi.ns[arr[1]] = calApi.ns[arr[1]] || api
            ;(calApi.ns[arr[1]] as unknown as { q: unknown[][] }).q.push(arr)
            calApi.q.push(['initNamespace', arr[1]])
          } else {
            calApi.q.push(arr)
          }
          return
        }
        calApi.q.push(arr)
      }) as CalApi

      calApi.ns = existing?.ns || {}
      calApi.q = existing?.q || []
      calApi.loaded = existing?.loaded
      calApi.config = existing?.config || {}

      win.Cal = calApi as unknown as (typeof win)['Cal']

      calApi('init', ns, { origin: 'https://app.cal.com' })
      calApi.config.forwardQueryParams = true
      ;(calApi.ns[ns] as unknown as { q: unknown[][] } | undefined)?.q?.push([
        'ui',
        { hideEventTypeDetails: false, layout: 'month_view' },
      ])
    }
  }, [analytics, cal])

  return <>{analytics?.ga4Id ? <AnalyticsTracker /> : null}</>
}