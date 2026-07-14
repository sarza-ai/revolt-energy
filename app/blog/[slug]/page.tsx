import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, brand } from "@/lib/content";
import { PageNodule } from "@/components/nodule/InteractiveNodule";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    author: { "@type": "Organization", name: brand.legal },
    publisher: { "@type": "Organization", name: brand.legal },
  };

  return (
    <article className="relative overflow-hidden pt-24 pb-20">
      <PageNodule variant="blog" side="right" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="text-sm text-electric hover:underline"
        >
          ← All insights
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="rounded-full bg-electric/10 px-2 py-0.5 text-electric">
            {post.category}
          </span>
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.readTime}</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl glow-text">
          {post.title}
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed">{post.excerpt}</p>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-muted">
          <p>
            Australia&apos;s energy system is rebalancing toward assets that sit
            closer to load, storage that can firm renewables, participate in
            markets, and form a resilient mesh rather than a handful of
            centralised points of failure.
          </p>
          <p>
            {post.title} sits at the intersection of infrastructure reality and
            network design: modular BESS, commercial structures that monetise
            flexibility, and software that orchestrates a growing fleet.
          </p>
          <p>
            ReVolt&apos;s model, build, own and operate decentralised
            infrastructure with storage at the core, is built for that shift.
            Whether you host a node or fund the portfolio, the edge is where
            the next decade of grid value is created.
          </p>
          <p className="rounded-2xl border border-border bg-navy-900/50 p-5 text-sm">
            This seed article is ready for CMS or MDX expansion. Replace body
            copy with long-form content, diagrams and citations when your
            editorial pipeline is live.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/contact?path=partner"
            className="rounded-full bg-electric px-5 py-2.5 text-sm font-semibold text-navy-950"
          >
            Partner with ReVolt
          </Link>
          <Link
            href="/contact?path=investor"
            className="rounded-full border border-electric/40 px-5 py-2.5 text-sm font-semibold text-electric"
          >
            Investor inquiry
          </Link>
        </div>
      </div>
    </article>
  );
}
