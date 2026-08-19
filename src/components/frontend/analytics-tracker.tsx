'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent, elementLabel } from '@/lib/analytics'

/**
 * Fires rich GA4 events that gtag config alone won't capture: SPA page views,
 * link/button clicks, outbound links, form submits and scroll depth.
 * Rendered once, only when a GA4 ID is configured in the CMS.
 */
export default function AnalyticsTracker() {
  const pathname = usePathname()

  // SPA route change → page_view
  useEffect(() => {
    const search = window.location.search || ''
    const url = `${pathname}${search}`
    trackEvent('page_view', {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname])

  // Global click delegation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.('a, button, [data-cal-link]') as
        | HTMLElement
        | null
      if (!target) return

      const text = elementLabel(target)

      // Cal.com booking trigger
      if (target.hasAttribute('data-cal-link')) {
        trackEvent('cal_booking_start', { link: target.getAttribute('data-cal-link'), label: text })
        return
      }

      if (target.tagName === 'A') {
        const anchor = target as HTMLAnchorElement
        const href = anchor.getAttribute('href') || ''
        const isExternal = href.startsWith('http') && !href.startsWith(window.location.origin)
        const isMail = href.startsWith('mailto:')
        const isTel = href.startsWith('tel:')
        const isWa = href.startsWith('https://wa.me')

        if (isExternal) trackEvent('outbound_click', { url: href, link_text: text })
        else if (isMail) trackEvent('email_click', { to: href, link_text: text })
        else if (isTel) trackEvent('tel_click', { url: href, link_text: text })
        else if (isWa) trackEvent('whatsapp_click', { url: href, link_text: text })
        else {
          trackEvent('link_click', { link_url: href, link_text: text, page_path: window.location.pathname })
        }
        return
      }

      if (target.tagName === 'BUTTON' || target.tagName === 'INPUT') {
        const type = target.getAttribute('type') || 'button'
        trackEvent('button_click', { button_text: text, button_type: type, page_path: window.location.pathname })
      }
    }

    const onSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement
      const action = form.getAttribute('action') || ''
      const id = form.id || form.getAttribute('data-form-id') || ''
      trackEvent('form_submit', {
        form_id: id,
        form_action: action,
        page_path: window.location.pathname,
      })
    }

    document.addEventListener('click', onClick)
    document.addEventListener('submit', onSubmit)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('submit', onSubmit)
    }
  }, [])

  // Scroll depth
  useEffect(() => {
    const marks = [25, 50, 75, 100]
    const fired = new Set<number>()

    const onScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      if (scrollable <= 0) return
      const percent = Math.round((window.scrollY / scrollable) * 100)
      for (const m of marks) {
        if (percent >= m && !fired.has(m)) {
          fired.add(m)
          trackEvent('scroll_depth', { percent: m, page_path: window.location.pathname })
        }
      }
    }

    // section view (when 60% of a section enters viewport)
    let observer: IntersectionObserver | null = null
    const onReady = () => {
      const sections = document.querySelectorAll('main > section, main > article, main > div')
      if (sections.length && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                const el = entry.target as HTMLElement
                const label =
                  el.getAttribute('id') ||
                  el.getAttribute('aria-label') ||
                  el.querySelector('h1, h2, h3')?.textContent?.trim().slice(0, 60) ||
                  ''
                if (label) {
                  trackEvent('section_view', { section: label, page_path: window.location.pathname })
                }
              }
            }
          },
          { threshold: 0.4 }
        )
        sections.forEach((s) => observer!.observe(s))
      }
    }

    // wait a tick for dynamic sections to mount
    const t = setTimeout(onReady, 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
      observer?.disconnect()
    }
  }, [pathname])

  return null
}