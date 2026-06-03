import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/site/Section";
import { AUTHORS, getAuthor, postsByAuthor, formatDate } from "@/lib/authors";
import { InternalLinks } from "@/components/site/InternalLinks";
import { Linkedin, Twitter, Globe, GraduationCap, Stethoscope, BadgeCheck, FileText } from "lucide-react";

export const Route = createFileRoute("/author/$slug")({
  head: ({ params }) => {
    const author = getAuthor(params.slug);
    if (!author) return { meta: [{ title: "Author not found — ImplantCost" }] };
    return {
      meta: [
        { title: `${author.name} — ${author.role} | ImplantCost` },
        { name: "description", content: author.shortBio },
        { property: "og:title", content: `${author.name} — ${author.role}` },
        { property: "og:description", content: author.shortBio },
        { property: "og:image", content: author.image },
      ],
      links: [{ rel: "canonical", href: `/author/${author.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: author.name,
            jobTitle: author.role,
            description: author.longBio,
            image: author.image,
            url: `/author/${author.slug}`,
            knowsAbout: author.expertise,
          }),
        },
      ],
    };
  },
  loader: ({ params }) => {
    const author = getAuthor(params.slug);
    if (!author) throw notFound();
    return { author };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Author not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-secondary font-semibold">Back to blog</Link>
    </div>
  ),
  component: AuthorPage,
});

function AuthorPage() {
  const { author } = Route.useLoaderData() as { author: import("@/lib/authors").Author };
  const articles = postsByAuthor(author.slug);
  const others = AUTHORS.filter((a) => a.slug !== author.slug);


  return (
    <div className="container mx-auto px-4 pt-12 pb-20">
      <FadeIn>
        <Card className="p-6 md:p-10 border-border/70 shadow-elegant">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img src={author.image} alt={author.name} width={192} height={192} className="h-40 w-40 md:h-48 md:w-48 rounded-2xl object-cover ring-4 ring-secondary/20 shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Author Profile</p>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">{author.name}</h1>
              <p className="mt-1 text-base text-secondary font-semibold">{author.role}</p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">{author.longBio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {author.expertise.map((e) => (
                  <Badge key={e} variant="secondary" className="bg-secondary/10 text-secondary border-0">{e}</Badge>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 text-muted-foreground">
                {author.social.linkedin && <a href={author.social.linkedin} aria-label="LinkedIn" className="hover:text-secondary"><Linkedin className="h-5 w-5" /></a>}
                {author.social.twitter && <a href={author.social.twitter} aria-label="Twitter" className="hover:text-secondary"><Twitter className="h-5 w-5" /></a>}
                {author.social.website && <a href={author.social.website} aria-label="Website" className="hover:text-secondary"><Globe className="h-5 w-5" /></a>}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border/70 pt-6">
            <Stat icon={<FileText className="h-4 w-4" />} label="Articles" value={author.stats.articles} />
            <Stat icon={<Stethoscope className="h-4 w-4" />} label="Years Experience" value={author.stats.yearsExperience} />
            <Stat icon={<BadgeCheck className="h-4 w-4" />} label="Articles Reviewed" value={author.stats.reviewed} />
          </div>
        </Card>
      </FadeIn>

      <section className="mt-12 grid md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1 border-border/70">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary flex items-center gap-2">
            <GraduationCap className="h-4 w-4" /> Credentials
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {author.credentials.map((c) => (
              <li key={c} className="flex gap-2"><BadgeCheck className="h-4 w-4 text-secondary mt-0.5 shrink-0" /><span>{c}</span></li>
            ))}
          </ul>
        </Card>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold tracking-tight">Published articles</h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-5">
            {articles.map((p) => (
              <Card key={p.slug} className="p-5 border-border/70 hover:shadow-elegant transition-shadow">
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">{p.tag}</Badge>
                <h3 className="mt-3 text-base font-semibold leading-snug">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-secondary">{p.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">{formatDate(p.publishedAt)} · {p.read} read</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">More from our editorial team</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((a) => (
            <Link key={a.slug} to="/author/$slug" params={{ slug: a.slug }}>
              <Card className="p-5 border-border/70 hover:shadow-elegant hover:-translate-y-0.5 transition-all flex items-center gap-4">
                <img src={a.image} alt={a.name} width={64} height={64} loading="lazy" className="h-16 w-16 rounded-full object-cover ring-2 ring-border" />
                <div className="min-w-0">
                  <p className="font-semibold truncate">{a.name}</p>
                  <p className="text-xs text-secondary font-medium truncate">{a.role}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <InternalLinks heading="Explore more on ImplantCost" />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">{icon} {label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}+</p>
    </div>
  );
}
