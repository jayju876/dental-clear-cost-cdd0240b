import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Award, BookOpen, Clock, Twitter, Linkedin, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/site/Section";
import { getAuthor, AUTHORS, type Author } from "@/lib/authors";
import { postsByAuthor, type BlogPost } from "@/lib/blog-posts";

export const Route = createFileRoute("/author/$slug")({
  loader: ({ params }) => {
    const author = getAuthor(params.slug);
    if (!author) throw notFound();
    return { author };
  },
  head: ({ params, loaderData }) => {
    const author = loaderData?.author;
    if (!author) return { meta: [{ title: "Author — ImplantCost" }] };
    return {
      meta: [
        { title: `${author.name} — ${author.role} | ImplantCost` },
        { name: "description", content: author.bio },
        { property: "og:title", content: `${author.name} — ${author.role}` },
        { property: "og:description", content: author.bio },
        { property: "og:type", content: "profile" },
      ],
      links: [{ rel: "canonical", href: `/author/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: author.name,
          jobTitle: author.role,
          description: author.longBio,
          knowsAbout: author.expertise,
          alumniOf: author.credentials,
          worksFor: { "@type": "Organization", name: "ImplantCost" },
        }),
      }],
    };
  },
  component: AuthorPage,
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Author not found</h1>
      <Button asChild className="mt-6"><Link to="/blog">Back to blog</Link></Button>
    </div>
  ),
});

function AuthorPage() {
  const { author } = Route.useLoaderData();
  const posts = postsByAuthor(author.slug);

  return (
    <div>
      <section className="bg-gradient-soft border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
          <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-3.5 w-3.5" /> All articles
          </Link>
          <FadeIn>
            <div className="mt-6 grid md:grid-cols-[auto_1fr] gap-8 items-center">
              <img
                src={author.image}
                alt={author.name}
                width={256}
                height={256}
                className="h-40 w-40 md:h-48 md:w-48 rounded-2xl object-cover border border-border shadow-elegant"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{author.role}</p>
                <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">{author.name}</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{author.longBio}</p>
                <div className="mt-5 flex items-center gap-3 text-muted-foreground">
                  {author.social.twitter && <a href={author.social.twitter} aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>}
                  {author.social.linkedin && <a href={author.social.linkedin} aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>}
                  {author.social.website && <a href={author.social.website} aria-label="Website" className="hover:text-foreground"><Link2 className="h-4 w-4" /></a>}
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="mt-10 grid grid-cols-3 gap-3 md:gap-4 max-w-2xl">
            {author.stats.map((s: Author["stats"][number]) => (
              <Card key={s.label} className="p-4 text-center border-border/70">
                <p className="text-2xl md:text-3xl font-bold tracking-tight">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16 max-w-5xl grid md:grid-cols-2 gap-8">
        <FadeIn>
          <h2 className="text-xl font-semibold inline-flex items-center gap-2"><Award className="h-5 w-5 text-secondary" /> Credentials</h2>
          <ul className="mt-4 space-y-2 text-sm text-foreground/90">
            {author.credentials.map((c: string) => (
              <li key={c} className="flex gap-2"><span className="text-secondary">•</span>{c}</li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="text-xl font-semibold inline-flex items-center gap-2"><BookOpen className="h-5 w-5 text-secondary" /> Areas of expertise</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {author.expertise.map((e: string) => (
              <Badge key={e} variant="secondary" className="bg-secondary/10 text-secondary border-0">{e}</Badge>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold">Published articles by {author.name}</h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-muted-foreground">No articles published yet.</p>
        ) : (
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((p) => (
              <Card key={p.slug} className="overflow-hidden h-full border-border/70 hover:shadow-elegant transition-shadow group">
                <div className="aspect-[16/9] bg-gradient-accent" />
                <div className="p-5">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">{p.tag}</Badge>
                  <h3 className="mt-2 text-base font-semibold leading-snug">{p.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readingTime}</span>
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="text-secondary font-semibold inline-flex items-center">Read <ArrowRight className="ml-0.5 h-3 w-3" /></Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <h2 className="text-xl font-semibold">Meet our editorial team</h2>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AUTHORS.filter((a) => a.slug !== author.slug).map((a) => (
              <Link key={a.slug} to="/author/$slug" params={{ slug: a.slug }} className="group">
                <Card className="p-4 border-border/70 hover:shadow-elegant transition-shadow flex items-center gap-3">
                  <img src={a.image} alt={a.name} width={64} height={64} loading="lazy" className="h-12 w-12 rounded-full object-cover border border-border" />
                  <div>
                    <p className="text-sm font-semibold leading-tight group-hover:text-secondary transition-colors">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.role}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
