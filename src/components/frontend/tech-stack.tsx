'use client'

import { TechMark } from '@/lib/tech-icons'

/**
 * Tech stack chips with official brand logos. Unknown tech falls back to a
 * clean text chip.
 */
export default function TechStack({ stack }: { stack: string[] }) {
  if (!stack.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <span
          key={tech}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
        >
          <TechMark name={tech} className="size-3.5 shrink-0" />
          {tech}
        </span>
      ))}
    </div>
  )
}