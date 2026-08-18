import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'

/**
 * Renders Payload lexical rich text with site typography.
 * Server-only component.
 */
export default function RichText({
  data,
  className,
}: {
  data: unknown
  className?: string
}) {
  if (!data) return null

  return (
    <div className={cn('cv-prose', className)}>
      <LexicalRichText data={data as Parameters<typeof LexicalRichText>[0]['data']} />
    </div>
  )
}