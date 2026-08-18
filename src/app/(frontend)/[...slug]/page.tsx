import { notFound, permanentRedirect, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { resolveRedirect } from '@/lib/redirects'

export const dynamic = 'force-dynamic'

/**
 * Catch-all for unknown paths → managed 301/302 redirects from the CMS.
 * Known routes (/, /services/..., /portfolio/..., etc.) win over this route.
 */
export default async function RedirectCatchAll({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const from = slug.length ? `/${slug.join('/')}` : '/'

  // Trailing slash tolerance: "/foo" and "/foo/" both hit the same record
  const match = await resolveRedirect(from)

  if (match?.to) {
    if (match.statusCode === '301') permanentRedirect(match.to)
    else redirect(match.to)
  }

  notFound()
}