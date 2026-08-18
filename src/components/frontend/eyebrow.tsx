import { cn } from '@/lib/utils'

/**
 * Clean section label — small uppercase tag above headings.
 */
export function Eyebrow({
  label,
  className,
  withDot = true,
}: {
  label: string
  className?: string
  withDot?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary',
        className
      )}
    >
      {withDot && <span className="size-1.5 rounded-full bg-secondary" />}
      {label}
    </span>
  )
}
