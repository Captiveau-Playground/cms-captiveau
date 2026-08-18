"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { SectionShell, ContentRail } from "@/components/layout-contract";

export type BlogPost = {
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

/**
 * Latest blog posts (adapted from @nusaiba/blog-1) — fed by CMS articles.
 */
export function BlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <SectionShell spacingMode="section">
      <ContentRail maxWidth="max-w-7xl" className="space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-medium text-2xl tracking-tight md:text-4xl">
              Latest from the blog
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground text-sm md:text-base">
              Artikel, panduan, dan insights dari tim yang mengerjakan langsung.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-1.5 font-medium text-sm hover:underline"
            href="/blog"
          >
            View all posts
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <motion.article
              className="group"
              initial={{ opacity: 0, y: 20 }}
              key={post.title + post.slug}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-border bg-muted/40">
                  <Image
                    alt={post.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src={post.image}
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-muted-foreground text-xs">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="mt-2 font-medium text-base leading-snug md:text-lg">
                  <span className="hover:underline">{post.title}</span>
                </h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </ContentRail>
    </SectionShell>
  );
}