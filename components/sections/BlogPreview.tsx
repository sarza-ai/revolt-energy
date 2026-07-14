"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";

export function BlogPreview() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Insights"
            title="Blog-ready intelligence"
            body="Infrastructure, technology and partner perspectives for Australia's decentralised energy transition."
          />
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-electric hover:gap-2 transition"
          >
            All articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {blogPosts.slice(0, 4).map((post, i) => (
            <GlowCard key={post.slug} delay={i * 0.06}>
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="rounded-full bg-electric/10 px-2 py-0.5 text-electric">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-3 block group">
                <h3 className="text-lg font-semibold text-ink transition group-hover:text-electric">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
              </Link>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
