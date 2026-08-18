import { AnimatedHeading } from '@/components/frontend/animated-heading'
import { cn } from '@/lib/utils'
import { FullWidthDivider } from '@/components/full-width-divider'
import { LazyImage } from '@/components/lazy-image'
import Link from 'next/link'

export type BlogGridItem = {
  title: string
  slug: string
  description: string
  author?: string | null
  date: string
  readTime: string
  image: string
}

/**
 * Full-width editorial blog grid (adapted from @efferd/blogs-3), fed by the
 * CMS articles list.
 */
export function BlogGrid({ blogs, title, description }: { blogs: BlogGridItem[]; title?: string; description?: string }) {
  return (
    <div className="mx-auto w-full max-w-7xl grow px-4 sm:px-6 lg:px-8">
      <div className="border-b border-border py-12 md:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Blog · Insights
        </p>
        <AnimatedHeading
          as="h1"
          className="mt-3 max-w-2xl text-balance font-medium text-3xl tracking-[-0.04em] md:text-5xl"
          text={title || 'Blog & Insights'}
        />
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          {description ||
            'Artikel, panduan, dan wawasan tentang teknologi, desain, dan strategi digital.'}
        </p>
      </div>
      <FullWidthDivider contained />
      <div className="z-10 grid gap-x-4 gap-y-8 p-4 md:grid-cols-2 lg:grid-cols-3 lg:p-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.title + blog.slug} {...blog} />
        ))}
      </div>
    </div>
  )
}

function BlogCard({
  title,
  slug,
  description,
  date,
  readTime,
  image,
  author,
  className,
}: React.ComponentProps<'a'> & BlogGridItem) {
  return (
    <Link
      href={slug ? `/blog/${slug}` : '#'}
      className={cn(
        'group flex flex-col gap-2 rounded-none p-3 hover:bg-muted/50 active:bg-muted',
        className
      )}
    >
      <LazyImage
        alt={title}
        className="transition-all duration-500 group-hover:scale-105"
        containerClassName="rounded-none shadow-md outline outline-offset-3 outline-border/50"
        fallback="/images/office.jpg"
        inView
        ratio={16 / 9}
        src={image}
      />
      <div className="space-y-2 px-2 pb-2">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground group-hover:text-foreground sm:text-xs">
          <p>by {author || 'Tim Captiveau'}</p>
          <div className="size-1 rounded-full bg-muted-foreground" />
          <p>{date}</p>
          <div className="size-1 rounded-full bg-muted-foreground" />
          <p>{readTime}</p>
        </div>
        <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
        <p className="line-clamp-3 text-sm text-muted-foreground group-active:text-foreground">
          {description}
        </p>
      </div>
    </Link>
  )
}