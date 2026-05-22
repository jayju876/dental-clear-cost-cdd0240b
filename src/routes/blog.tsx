import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FadeIn, PageShell } from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { POSTS } from "@/lib/blog-posts";
import { getAuthor, AUTHORS } from "@/lib/authors";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Dental Implant Cost Guides & Patient Stories — ImplantCost Blog" },
      { name: "description", content: "Cost comparisons, financing tips, insurance guides and patient stories on dental implants in the USA. Medically reviewed and updated for 2026." },
      { property: "og:title", content: "Dental Implant Blog — Guides & Stories" },
      { property: "og:description", content: "Cost comparisons, brand guides and patient stories on dental implants." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const CATEGORIES = ["All", "Cost Guide", "Dental Implant Costs", "Implant Financing", "Insurance Coverage", "All-on-4 Guides", "Recovery & Procedures"] as const;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function Blog() {
  const [cat, setCat] = useState<string>("All");
  const filtered = cat === "All" ? POSTS : POSTS.filter((p) => p.tag === cat);

  return (
    <PageShell
      eyebrow="Blog"
      title="Dental implant cost guides, financing tips and patient stories"
      lead="Medically reviewed articles to help US patients plan implant treatment with clarity."
    >
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors border ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, i) => {
          const author = getAuthor(p.authorSlug)!;
          const reviewer = p.reviewedBySlug ? getAuthor(p.reviewedBySlug) : undefined;
          return (
            <FadeIn key={p.slug} delay={i * 0.04}>
              <Card className="overflow-hidden h-full border-border/70 hover:shadow-elegant transition-shadow group flex flex-col">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="block aspect-[16/9] bg-gradient-accent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">{p.tag}</Badge>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readingTime}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold leading-snug">
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-secondary transition-colors">{p.title}</Link>
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>

                  <div className="mt-auto pt-4 flex items-center gap-3">
                    <Link to="/author/$slug" params={{ slug: author.slug }} className="flex items-center gap-2 group/author">
                      <img src={author.image} alt={author.name} width={48} height={48} loading="lazy" className="h-8 w-8 rounded-full object-cover border border-border" />
                      <div>
                        <p className="text-xs font-semibold leading-tight group-hover/author:text-secondary transition-colors">{author.name}</p>
                        <p className="text-[10px] text-muted-foreground">{fmtDate(p.publishedAt)}</p>
                      </div>
                    </Link>
                    {reviewer && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-secondary/10 text-secondary px-2 py-0.5 text-[10px] font-semibold">
                        <ShieldCheck className="h-3 w-3" /> Reviewed
                      </span>
                    )}
                  </div>

                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="mt-4 inline-flex items-center text-sm font-semibold text-secondary">
                    Read article <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            </FadeIn>
          );
        })}
      </div>

      {/* Editorial team */}
      <section className="mt-16 border-t border-border pt-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Meet our editorial team</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">Every article on ImplantCost is written or reviewed by a US-based dental professional or healthcare specialist.</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AUTHORS.map((a) => (
            <Link key={a.slug} to="/author/$slug" params={{ slug: a.slug }} className="group">
              <Card className="p-5 border-border/70 hover:shadow-elegant transition-shadow h-full">
                <img src={a.image} alt={a.name} width={96} height={96} loading="lazy" className="h-16 w-16 rounded-full object-cover border border-border" />
                <p className="mt-3 text-sm font-semibold group-hover:text-secondary transition-colors">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.role}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
