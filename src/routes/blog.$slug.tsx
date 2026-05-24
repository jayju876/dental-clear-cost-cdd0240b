import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/site/Section";
import { AuthorByline, AuthorBioCard } from "@/components/site/AuthorCard";
import { POSTS, getPost, getAuthor, formatDate } from "@/lib/authors";
import { ArrowRight, Clock, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) return { meta: [{ title: "Article not found — ImplantCost" }] };
    const author = getAuthor(post.authorSlug);
    return {
      meta: [
        { title: `${post.title} — ImplantCost` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.publishedAt },
        { property: "article:author", content: author?.name ?? "" },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
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
            author: author && {
              "@type": "Person",
              name: author.name,
              jobTitle: author.role,
              url: `/author/${author.slug}`,
            },
            reviewedBy: post.reviewerSlug && (() => {
              const r = getAuthor(post.reviewerSlug);
              return r && { "@type": "Person", name: r.name, jobTitle: r.role, url: `/author/${r.slug}` };
            })(),
            publisher: { "@type": "Organization", name: "ImplantCost" },
          }),
        },
      ],
    };
  },
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Article not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-secondary font-semibold">Back to blog</Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const author = getAuthor(post.authorSlug)!;
  const reviewer = post.reviewerSlug ? getAuthor(post.reviewerSlug) : undefined;
  const related = POSTS.filter((p) => p.slug !== post.slug && p.tag === post.tag).slice(0, 3);

  return (
    <article className="container mx-auto px-4 pt-12 pb-20 max-w-3xl">
      <FadeIn>
        <Link to="/blog" className="text-xs uppercase tracking-wider text-secondary font-semibold">← Blog</Link>
        <Badge variant="secondary" className="mt-4 bg-secondary/10 text-secondary border-0">{post.tag}</Badge>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
      </FadeIn>

      <div className="mt-8">
        <AuthorByline author={author} reviewer={reviewer} date={formatDate(post.publishedAt)} read={post.read} />
      </div>

      <div className="aspect-[16/9] mt-8 rounded-xl bg-gradient-accent" />

      <div className="prose prose-slate max-w-none mt-10 text-foreground/90 leading-relaxed space-y-5">
        <p>
          Planning dental implant treatment in the United States involves more than picking a clinic. The total cost depends on the implant brand, crown material, additional procedures, geographic location, and the experience of the surgical team.
        </p>
        <h2 className="text-2xl font-semibold mt-8">What this guide covers</h2>
        <p>
          This article breaks down the realistic price ranges, what affects them, financing options, and how to evaluate quotes from multiple providers. All cost ranges reflect 2026 US averages and have been reviewed by our clinical team.
        </p>
        <h2 className="text-2xl font-semibold mt-8">Key takeaways</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Single tooth implants typically range $3,000–$6,000 in the US.</li>
          <li>All-on-4 full arch ranges $20,000–$32,000 per arch.</li>
          <li>Insurance and HSA/FSA can offset 10–50% of the cost depending on plan.</li>
          <li>Always get itemized quotes from at least 2–3 providers.</li>
        </ul>
        <p>
          For a personalized estimate, try the <Link to="/cost" className="text-secondary font-semibold">cost calculator</Link> or model monthly payments with the <Link to="/loan" className="text-secondary font-semibold">loan calculator</Link>.
        </p>
      </div>

      <div className="mt-10 flex items-center gap-3 border-y border-border/70 py-4">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mr-2">Share</span>
        <a aria-label="Share on Twitter" href="#" className="rounded-full border border-border p-2 hover:bg-accent/10 transition-colors"><Twitter className="h-4 w-4" /></a>
        <a aria-label="Share on Facebook" href="#" className="rounded-full border border-border p-2 hover:bg-accent/10 transition-colors"><Facebook className="h-4 w-4" /></a>
        <a aria-label="Share on LinkedIn" href="#" className="rounded-full border border-border p-2 hover:bg-accent/10 transition-colors"><Linkedin className="h-4 w-4" /></a>
        <button aria-label="Copy link" className="rounded-full border border-border p-2 hover:bg-accent/10 transition-colors"><Link2 className="h-4 w-4" /></button>
        <div className="ml-auto inline-flex items-center text-xs text-muted-foreground gap-1"><Clock className="h-3 w-3" /> {post.read} read</div>
      </div>

      <div className="mt-10">
        <AuthorBioCard author={author} />
      </div>

      {reviewer && (
        <div className="mt-6">
          <AuthorBioCard author={reviewer} label="Medically Reviewed By" />
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">Related articles</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => {
              const a = getAuthor(r.authorSlug)!;
              return (
                <Card key={r.slug} className="p-5 border-border/70 hover:shadow-elegant transition-shadow">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">{r.tag}</Badge>
                  <h3 className="mt-3 text-base font-semibold leading-snug">
                    <Link to="/blog/$slug" params={{ slug: r.slug }} className="hover:text-secondary">{r.title}</Link>
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <img src={a.image} alt={a.name} width={24} height={24} loading="lazy" className="h-6 w-6 rounded-full object-cover" />
                    {a.name} · {formatDate(r.publishedAt)}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      <div className="mt-14 rounded-2xl bg-gradient-primary p-8 text-primary-foreground text-center">
        <h3 className="text-2xl font-bold">Estimate your implant cost in 60 seconds</h3>
        <p className="mt-2 text-primary-foreground/80">Free, instant, and personalized to your city and case.</p>
        <Button asChild size="lg" className="mt-5 bg-background text-foreground hover:bg-background/90">
          <Link to="/cost">Open the calculator <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </article>
  );
}
