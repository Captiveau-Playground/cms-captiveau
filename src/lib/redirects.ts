import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound, permanentRedirect, redirect } from 'next/navigation'

/**
 * Resolves a CMS-managed redirect for a URL path, or null when none matches.
 * Use inside catch-all/page routes before calling notFound().
 */
export async function resolveRedirect(from: string) {
  const payload = await getPayload({ config })
  const candidates = [from, from.replace(/\/$/, '')].filter(Boolean)
  if (!candidates.length) return null

  const { docs } = await payload.find({
    collection: 'redirects',
    where: { or: candidates.map((value) => ({ from: { equals: value } })) },
    limit: 1,
    depth: 0,
  })

  return docs[0] ?? null
}

/**
 * Redirects when a CMS redirect matches, otherwise renders the 404 page.
 */
export async function handleRedirectOrNotFound(from: string): Promise<never> {
  const match = await resolveRedirect(from)
  if (match?.to) {
    if (match.statusCode === '301') permanentRedirect(match.to)
    else redirect(match.to)
  }
  notFound()
}