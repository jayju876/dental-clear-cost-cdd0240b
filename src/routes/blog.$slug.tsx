import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/site/Section";
import { AuthorByline, AuthorCard, ShareIcons } from "@/components/site/AuthorByline";
import { getPost, relatedPosts } from "@/lib/blog-posts";
import { getAuthor } from "@/lib/authors";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Article — ImplantCost" }] };
    const author = getAuthor(post.authorSlug)!;
    const reviewer = post.reviewedBySlug ? getAuthor(post.reviewedBySlug) : undefined;
    return {
      meta: [
        { title: `${post.title} — ImplantCost` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "article:author", content: author.name },
        { property: "article:published_time", content: post.publishedAt },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            author: {
              "@type": "Person",
              name: author.name,
              jobTitle: author.role,
              description: author.bio,
            },
            ...(reviewer
              ? {
                  reviewedBy: {
                    "@type": "Person",
                    name: reviewer.name,
                    jobTitle: reviewer.role,
                  },
                }
              : {}),
            publisher: {
              "@type": "Organization",
              name: "ImplantCost",
            },
          }),
        },
      ],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Article not found</h1>
      <p className="mt-3 text-muted-foreground">The article you're looking for doesn't exist.</p>
      <Button asChild className="mt-6"><Link to="/blog">Back to blog</Link></Button>
    </div>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const author = getAuthor(post.authorSlug)!;
  const reviewer = post.reviewedBySlug ? getAuthor(post.reviewedBySlug) : undefined;
  const related = relatedPosts(post.slug, 3);

  return (
    <article className="container mx-auto px-4 py-10 md:py-14 max-w-3xl">
      <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-1 h-3.5 w-3.5" /> All articles
      </Link>

      <FadeIn>
        <Badge variant="secondary" className="mt-6 bg-secondary/10 text-secondary border-0">{post.tag}</Badge>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight leading-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
      </FadeIn>

      <div className="mt-6">
        <AuthorByline author={author} reviewedBy={reviewer} publishedAt={post.publishedAt} readingTime={post.readingTime} />
      </div>

      <div className="mt-8 aspect-[16/9] rounded-2xl bg-gradient-accent" />

      <div className="prose prose-slate dark:prose-invert max-w-none mt-10">
        {post.content.map((section) => (
          <section key={section.heading} className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-foreground/90 leading-relaxed">{p}</p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <ShareIcons url={`/blog/${post.slug}`} title={post.title} />
        <p className="text-xs text-muted-foreground">Last updated {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <div className="mt-10">
        <AuthorCard author={author} />
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">Related articles</h2>
        <div className="mt-5 grid sm:grid-cols-3 gap-5">
          {related.map((p) => (
            <Card key={p.slug} className="overflow-hidden h-full border-border/70 hover:shadow-elegant transition-shadow group">
              <div className="aspect-[16/9] bg-gradient-accent" />
              <div className="p-4">
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0 text-[10px]">{p.tag}</Badge>
                <h3 className="mt-2 text-sm font-semibold leading-snug">{p.title}</h3>
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readingTime}</span>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="text-secondary font-semibold inline-flex items-center">Read <ArrowRight className="ml-0.5 h-3 w-3" /></Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </article>
  );
}
