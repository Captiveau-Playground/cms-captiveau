/**
 * GA4 event helpers — push events to dataLayer in the gtag format, no-op on
 * the server. Values come from the CMS (Site Settings → Analytics → GA4 ID).
 */

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: name, ...(params || {}) })
}

export function getPath(path: string) {
  return path
}

/** Safe text extraction for event metadata. */
export function elementLabel(el: HTMLElement): string {
  const text = (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80)
  return text || el.getAttribute('aria-label') || el.getAttribute('name') || ''
}
