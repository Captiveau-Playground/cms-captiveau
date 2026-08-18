import type { PayloadRequest } from 'payload'

const collectionPrefixMap: Record<string, string> = {
  services: '/services',
  articles: '/blog',
  projects: '/portfolio',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string | null | undefined
  req?: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (slug === undefined || slug === null || slug === '') {
    return null
  }

  const encodedSlug = encodeURIComponent(slug)

  const encodedParams = new URLSearchParams({
    path: `${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  // Relative URL — resolves against the admin origin (admin + frontend are
  // same-origin), so preview works on any environment without baking a
  // build-time host (which previously leaked localhost:4000 into production).
  return `/next/preview?${encodedParams.toString()}`
}