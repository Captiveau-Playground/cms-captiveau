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

  const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
  return `${base}/next/preview?${encodedParams.toString()}`
}