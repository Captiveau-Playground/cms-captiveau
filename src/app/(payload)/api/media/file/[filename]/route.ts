import { getCloudflareContext } from '@opennextjs/cloudflare'

/**
 * Public media file serving straight from R2.
 *
 * Payload's own `/api/media/file/:filename` endpoint runs the collection's
 * read access control through `checkFileAccess`, which throws for open reads
 * (`() => true`) on storage-backed upload collections and 404s every public
 * file. This more-specific route shadows Payload's catch-all
 * (`/api/[...slug]`) for media files and streams the object directly from the
 * R2 binding — so uploaded media (logos, images) is publicly servable.
 *
 * Key layout matches the r2Storage plugin defaults (flat filename at the
 * bucket root).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params

  // Path-traversal guard — only a plain filename may be served.
  if (!filename || filename.includes('/') || filename.includes('\\') || filename.includes('..')) {
    return new Response('Not Found', { status: 404 })
  }

  const { env } = await getCloudflareContext({ async: true })
  const obj = await env.R2.get(filename)
  if (!obj || obj.body === undefined) {
    return new Response('Not Found', { status: 404 })
  }

  const headers = new Headers()
  obj.writeHttpMetadata(headers)
  // Normalize SVG content-type (R2 may store it as application/xml).
  if (filename.toLowerCase().endsWith('.svg')) {
    headers.set('Content-Type', 'image/svg+xml')
    headers.set('Content-Security-Policy', "script-src 'none'")
  }
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')

  return new Response(obj.body, { headers })
}