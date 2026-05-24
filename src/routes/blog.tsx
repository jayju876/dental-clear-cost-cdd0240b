import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FadeIn, PageShell } from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, BadgeCheck } from "lucide-react";
import { POSTS, getAuthor, formatDate } from "@/lib/authors";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Dental Implant Cost Guides & Patient Stories — ImplantCost Blog" },
      { name: "description", content: "Cost comparisons, brand guides, financing tips and patient stories on dental implants. Medically reviewed and updated for 2026." },
      { property: "og:title", content: "Dental Implant Blog — Guides & Stories" },
      { property: "og:description", content: "Cost comparisons, brand guides and patient stories on dental implants." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const CATEGORIES = ["All", "Cost Guide", "Education", "Finance", "Brands", "Patient Stories"] as const;

function Blog() {
  const [cat, setCat] = useState<string>("All");
  const filtered = cat === "All" ? POSTS : POSTS.filter((p) => p.tag === cat);

  return (
    <PageShell
      eyebrow="Blog"
      title="Cost guides, brand comparisons and patient stories"
      lead="Medically reviewed articles to help you plan your implant treatment with clarity."
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
          const reviewer = p.reviewerSlug ? getAuthor(p.reviewerSlug) : undefined;
          return (
            <FadeIn key={p.slug} delay={i * 0.04}>
              <Card className="overflow-hidden h-full border-border/70 hover:shadow-elegant hover:-translate-y-0.5 transition-all group flex flex-col">
                <div className="aspect-[16/9] bg-gradient-accent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">{p.tag}</Badge>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.read}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold leading-snug">
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-secondary transition-colors">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-border/60 flex items-center gap-3">
                    <img src={author.image} alt={author.name} width={36} height={36} loading="lazy" className="h-9 w-9 rounded-full object-cover ring-2 ring-border" />
                    <div className="leading-tight flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">{author.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{formatDate(p.publishedAt)}</p>
                    </div>
                    {reviewer && (
                      <span title={`Reviewed by ${reviewer.name}`} className="inline-flex items-center gap-1 text-[10px] text-secondary font-semibold">
                        <BadgeCheck className="h-3.5 w-3.5" /> Reviewed
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
    </PageShell>
  );
}
