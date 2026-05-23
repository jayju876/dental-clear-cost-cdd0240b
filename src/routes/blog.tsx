import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FadeIn, PageShell } from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";

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

const POSTS = [
  { title: "India vs USA: Dental Implant Cost in 2026", excerpt: "A side-by-side breakdown of total treatment cost, travel expenses and quality of care.", tag: "Cost Guide", read: "8 min" },
  { title: "All-on-4 vs All-on-6: Which Should You Choose?", excerpt: "Comparing two full-arch options on cost, longevity and candidacy.", tag: "Education", read: "6 min" },
  { title: "Straumann vs Nobel Biocare vs Osstem", excerpt: "What actually separates premium and value implant brands.", tag: "Brands", read: "10 min" },
  { title: "Financing Your Implants Without Breaking the Bank", excerpt: "EMI, dental loans, HSA/FSA and insurance — realistic options in 2026.", tag: "Finance", read: "7 min" },
  { title: "Bone Grafting Explained: When You Really Need It", excerpt: "Cost, recovery time and when grafts can be avoided.", tag: "Education", read: "5 min" },
  { title: "From London to Mumbai: A Patient's Implant Journey", excerpt: "How Priya saved £6,400 on full-arch implants — and what she'd do differently.", tag: "Patient Stories", read: "9 min" },
  { title: "UK vs UAE: Where Does Your Money Go Further?", excerpt: "Total cost, clinic standards and travel weighed honestly.", tag: "Cost Guide", read: "8 min" },
  { title: "Zirconia vs E.max Crowns: Aesthetics and Price", excerpt: "Choose the right crown material for your case and budget.", tag: "Education", read: "6 min" },
];

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
        {filtered.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.04}>
            <Card className="overflow-hidden h-full border-border/70 hover:shadow-elegant transition-shadow group">
              <div className="aspect-[16/9] bg-gradient-accent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">{p.tag}</Badge>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.read}</span>
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <Link to="/blog" className="mt-4 inline-flex items-center text-sm font-semibold text-secondary">
                  Read article <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </PageShell>
  );
}
