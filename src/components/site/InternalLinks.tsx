import { Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { AUTHORS, POSTS } from "@/lib/authors";

export type InternalLink = { to: string; params?: Record<string, string>; label: string; body?: string };

export type LinkGroup = { title: string; links: InternalLink[] };

const CALCULATORS: InternalLink[] = [
  { to: "/cost", label: "Dental Implant Cost Calculator", body: "Estimate single, multiple or full-arch implant cost." },
  { to: "/loan", label: "Implant Loan Calculator", body: "Plan monthly EMI, APR and total interest." },
  { to: "/ratio", label: "Implant Ratio Calculator", body: "How many implants you actually need." },
  { to: "/all-on-4-calculator", label: "All-on-4 Calculator", body: "Cost ranges for full-arch All-on-4 cases." },
  { to: "/implant-support-calculator", label: "Implant Support Calculator", body: "Support requirements for your case." },
  { to: "/dental-implant-finance-calculator", label: "Implant Finance Calculator", body: "Compare financing options side by side." },
];

const RESOURCES: InternalLink[] = [
  { to: "/blog", label: "Implant Cost Blog", body: "Cost guides, brand comparisons and patient stories." },
  { to: "/faq", label: "Implant FAQs", body: "Reviewed answers to common implant questions." },
  { to: "/about", label: "About ImplantCost", body: "Editorial team, methodology and review process." },
  { to: "/contact", label: "Contact us", body: "Ask a question or send press inquiries." },
  { to: "/sitemap", label: "Full sitemap", body: "Every public page on the site." },
];

export const RELATED_GROUPS: LinkGroup[] = [
  { title: "Calculators", links: CALCULATORS },
  { title: "Guides & resources", links: RESOURCES },
];

// Top blog posts to surface as featured contextual links across the site.
export const POPULAR_POSTS: InternalLink[] = POSTS.slice(0, 4).map((p) => ({
  to: "/blog/$slug",
  params: { slug: p.slug },
  label: p.title,
  body: p.excerpt,
}));

// Editorial team links — surfaced on author + blog pages for SEO E-E-A-T.
export const TEAM_LINKS: InternalLink[] = AUTHORS.map((a) => ({
  to: "/author/$slug",
  params: { slug: a.slug },
  label: a.name,
  body: a.role,
}));

export function InternalLinks({
  heading = "Continue exploring ImplantCost",
  groups = RELATED_GROUPS,
}: {
  heading?: string;
  groups?: LinkGroup[];
}) {
  return (
    <nav aria-label="Related pages" className="mt-16 border-t border-border pt-10">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{heading}</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{g.title}</p>
            <ul className="mt-4 space-y-3">
              {g.links.map((l) => (
                <li key={`${l.to}-${l.label}`}>
                  <Card className="p-4 border-border/70 hover:shadow-elegant transition-all hover:-translate-y-0.5">
                    <Link
                      to={l.to as any}
                      params={l.params as any}
                      className="group flex items-start justify-between gap-3"
                    >
                      <div>
                        <p className="font-semibold group-hover:text-secondary transition-colors">{l.label}</p>
                        {l.body && <p className="mt-1 text-sm text-muted-foreground">{l.body}</p>}
                      </div>
                      <ArrowRight className="h-4 w-4 text-secondary shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
