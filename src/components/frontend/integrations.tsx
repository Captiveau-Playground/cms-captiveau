'use client'

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
export default function Integrations({ analytics }: { analytics?: AnalyticsData | null }) {
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
  }, [analytics])

  return null
}