import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/site/Section";
import { AuthorByline, AuthorBioCard } from "@/components/site/AuthorCard";
import { InternalLinks } from "@/components/site/InternalLinks";
import { POSTS, getPost, getAuthor, formatDate } from "@/lib/authors";
import { ArrowRight } from "lucide-react";

// Editorial body content keyed by post slug. Keeps post copy structured
// while metadata (author, tag, date) stays in src/lib/authors.ts.
const POST_BODY: Record<string, { intro: string; sections: { heading: string; body: string }[] }> = {
  "us-dental-implant-cost-2026": {
    intro:
      "Dental implant pricing in the United States varies more by state and clinic tier than by implant brand. This guide breaks down realistic 2026 ranges for single-tooth, All-on-4 and full-mouth cases, and what actually moves the number up or down.",
    sections: [
      { heading: "Single tooth implant cost", body: "Expect $3,500–$6,000 for a complete single tooth implant (implant + abutment + crown) at most US practices. Metro markets like New York, San Francisco and Los Angeles trend higher; the South and Midwest trend lower." },
      { heading: "All-on-4 per arch", body: "All-on-4 typically lands between $20,000 and $30,000 per arch with a fixed acrylic-titanium bridge. Zirconia bridges add $6,000–$12,000." },
      { heading: "Full mouth implants", body: "Full mouth dental implant treatment (both arches) usually costs $40,000–$90,000, depending on materials, sedation and whether extractions or grafting are needed." },
      { heading: "What changes your quote", body: "Bone grafting, sinus lifts, sedation, guided surgery and premium implant systems each add real cost. Ask for an itemized treatment plan before comparing clinics." },
    ],
  },
  "all-on-4-vs-all-on-6": {
    intro: "All-on-4 and All-on-6 are two variations of the same idea: a full arch of teeth supported by a small number of implants. The right choice depends on bone volume, bite forces and long-term maintenance.",
    sections: [
      { heading: "How they differ", body: "All-on-4 uses four implants (two straight, two angled). All-on-6 adds two more implants for extra support, usually in patients with adequate posterior bone." },
      { heading: "Cost difference", body: "All-on-6 typically runs $3,000–$8,000 more per arch than All-on-4 due to additional implants and lab work." },
      { heading: "Who is a candidate", body: "All-on-4 works well when posterior bone is limited. All-on-6 is preferred for heavier bite forces or when a zirconia prosthesis is planned." },
    ],
  },
  "straumann-vs-nobel-vs-osstem": {
    intro: "Straumann, Nobel Biocare and Osstem are three of the most widely placed implant systems worldwide. Here is what actually separates them for a US patient.",
    sections: [
      { heading: "Straumann", body: "Swiss premium system with strong long-term data and SLActive surface. Higher fixture cost, wide parts availability." },
      { heading: "Nobel Biocare", body: "Pioneer of modern implant dentistry. Excellent All-on-4 workflow and hardware ecosystem." },
      { heading: "Osstem", body: "Korean value-tier system with solid clinical performance. Popular for cost-sensitive full-arch cases." },
    ],
  },
  "financing-dental-implants": {
    intro: "Most patients pay for implants out of pocket, but there are practical ways to make treatment fit a monthly budget without overpaying in interest.",
    sections: [
      { heading: "In-house payment plans", body: "Many clinics split treatment into 3–12 interest-free installments tied to treatment stages." },
      { heading: "Third-party healthcare loans", body: "CareCredit, LendingClub and Proceed Finance offer 24–84 month terms. Watch for deferred interest promotions that can backfire." },
      { heading: "HSA & FSA", body: "Both accounts can be used for implants. FSA funds are use-it-or-lose-it; HSA funds roll over." },
      { heading: "Insurance", body: "Some plans now contribute $1,500–$3,000 toward implants under major services. Always request a pre-treatment estimate." },
    ],
  },
  "bone-grafting-explained": {
    intro: "Bone grafting sounds intimidating but is often a small step that makes implant placement predictable. Here is when you actually need it.",
    sections: [
      { heading: "When grafts are needed", body: "After extractions, after long-term tooth loss, or when the sinus floor is close to the upper molars." },
      { heading: "Types and cost", body: "Socket preservation grafts run $300–$800; sinus lifts $1,500–$3,000; block grafts $2,000–$4,000+." },
      { heading: "Recovery", body: "Most grafts heal in 3–6 months before implants can be placed. Guided regeneration can sometimes be done at the same visit as extraction." },
    ],
  },
  "patient-journey-full-arch": {
    intro: "Every full-arch case is different. This anonymized walk-through follows a US patient from consultation to final zirconia bridge.",
    sections: [
      { heading: "Consultation & planning", body: "CBCT scan, digital impressions and a treatment plan reviewed with the prosthodontist and surgeon." },
      { heading: "Surgery day", body: "Extractions, four implants per arch and a same-day provisional bridge. Sedation used for comfort." },
      { heading: "Healing & final teeth", body: "Four to six months of osseointegration, then the final zirconia bridge is delivered." },
    ],
  },
  "dental-insurance-coverage": {
    intro: "Dental insurance for implants has improved in 2026, but coverage still varies widely by carrier and plan tier.",
    sections: [
      { heading: "What plans usually cover", body: "Many PPO plans now cover 50% of the implant crown up to the annual maximum, typically $1,500–$3,000." },
      { heading: "What is often excluded", body: "The implant fixture itself and bone grafts are still excluded on many plans. Always check the exclusions section." },
      { heading: "Delta Dental & major carriers", body: "Delta Dental, Cigna, Aetna and MetLife each have implant riders. Ask for a written pre-treatment estimate." },
    ],
  },
  "zirconia-vs-emax-crowns": {
    intro: "Zirconia and E.max are two of the most popular crown materials for implant restorations. The right choice depends on aesthetics, bite forces and budget.",
    sections: [
      { heading: "Aesthetics", body: "E.max lithium disilicate has slightly better translucency for front teeth. Modern layered zirconia closes most of that gap." },
      { heading: "Strength", body: "Zirconia is stronger and preferred for molars and heavy grinders. E.max is ideal for single anterior crowns." },
      { heading: "Cost", body: "Both are typically $1,200–$2,500 per crown in the US. Zirconia trends slightly less at high-volume labs." },
    ],
  },
};

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) return { meta: [{ title: "Article not found — ImplantCost" }, { name: "robots", content: "noindex" }] };
    const author = getAuthor(post.authorSlug);
    return {
      meta: [
        { title: `${post.title} | ImplantCost` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        ...(author ? [{ property: "og:image", content: author.image }] : []),
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
      scripts: author
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.excerpt,
                datePublished: post.publishedAt,
                author: { "@type": "Person", name: author.name, url: `/author/${author.slug}` },
                publisher: { "@type": "Organization", name: "ImplantCost" },
              }),
            },
          ]
        : undefined,
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
      <Link to="/blog" className="mt-4 inline-block text-secondary font-semibold">Back to the blog</Link>
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: import("@/lib/authors").BlogPost };
  const author = getAuthor(post.authorSlug)!;
  const reviewer = post.reviewerSlug ? getAuthor(post.reviewerSlug) : undefined;
  const body = POST_BODY[post.slug] ?? { intro: post.excerpt, sections: [] };
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="container mx-auto px-4 pt-12 pb-20">
      <div className="max-w-3xl">
        <FadeIn>
          <Link to="/blog" className="text-sm font-semibold text-secondary">← All articles</Link>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">{post.tag}</Badge>
            <span className="text-xs text-muted-foreground">{post.read} read</span>
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6">
            <AuthorByline author={author} reviewer={reviewer} date={formatDate(post.publishedAt)} read={post.read} />
          </div>
        </FadeIn>

        <article className="prose prose-slate dark:prose-invert max-w-none mt-10">
          <p className="text-base leading-relaxed text-foreground/90">{body.intro}</p>
          {body.sections.map((s) => (
            <section key={s.heading} className="mt-8">
              <h2 className="text-2xl font-bold tracking-tight">{s.heading}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </article>

        <div className="mt-12">
          <AuthorBioCard author={author} />
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight">Keep reading</h2>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Card key={r.slug} className="p-5 border-border/70 hover:shadow-elegant hover:-translate-y-0.5 transition-all">
                  <Link to="/blog/$slug" params={{ slug: r.slug }} className="group block">
                    <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{r.tag}</p>
                    <p className="mt-2 font-semibold group-hover:text-secondary transition-colors">{r.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>

      <InternalLinks />
    </div>
  );
}
