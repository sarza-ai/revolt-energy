import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/content";
import { blogListSchema } from "@/lib/schema";
import { PageNodule } from "@/components/nodule/InteractiveNodule";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Insights on decentralised BESS, Australia's NEM, and clean-energy infrastructure.",
};

export default function BlogPage() {
  return (
    <div className="relative overflow-hidden pt-24 pb-20">
      <PageNodule variant="blog" side="left" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListSchema()),
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-electric">
          Insights
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl glow-text">
          Ideas for the edge of the grid
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Blog-ready architecture, MDX or CMS can plug in later. Seed articles
          establish SEO structure and topical authority.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="glass charge-border rounded-2xl p-6 transition hover:shadow-[0_0_40px_rgba(0,245,212,0.1)]"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="rounded-full bg-electric/10 px-2 py-0.5 text-electric">
                  {post.category}
                </span>
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-ink">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-electric transition"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-sm font-medium text-electric"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
