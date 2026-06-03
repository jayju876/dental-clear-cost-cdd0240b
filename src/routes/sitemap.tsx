import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Section";
import { SITE_PAGES } from "@/lib/site-pages";
import { POSTS, AUTHORS, formatDate } from "@/lib/authors";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap — ImplantCost" },
      { name: "description", content: "Browse every page on ImplantCost — calculators, blog posts, author profiles and legal pages." },
      { property: "og:title", content: "Sitemap — ImplantCost" },
      { property: "og:description", content: "All pages on the ImplantCost website." },
    ],
    links: [{ rel: "canonical", href: "/sitemap" }],
  }),
  component: SitemapPage,
});

function SitemapPage() {
  const grouped = (group: (typeof SITE_PAGES)[number]["group"]) =>
    SITE_PAGES.filter((p) => p.group === group);

  return (
    <PageShell eyebrow="Sitemap" title="Everything on ImplantCost" lead="A complete index of pages, calculators, articles and authors.">
      <div className="grid md:grid-cols-2 gap-10">
        <Section title="Core pages" items={grouped("Core").map((p) => ({ to: p.path, label: p.name }))} />
        <Section title="Calculators" items={grouped("Calculators").map((p) => ({ to: p.path, label: p.name }))} />
        <Section title="Content" items={grouped("Content").map((p) => ({ to: p.path, label: p.name }))} />
        <Section title="Legal" items={grouped("Legal").map((p) => ({ to: p.path, label: p.name }))} />
      </div>

      <div className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">Blog articles</h2>
        <ul className="mt-4 grid sm:grid-cols-2 gap-y-2">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="text-base font-medium hover:text-secondary transition-colors">
                {p.title}
              </Link>
              <span className="text-xs text-muted-foreground ml-2">· {formatDate(p.publishedAt)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">Authors & reviewers</h2>
        <ul className="mt-4 grid sm:grid-cols-2 gap-y-2">
          {AUTHORS.map((a) => (
            <li key={a.slug}>
              <Link to="/author/$slug" params={{ slug: a.slug }} className="text-base font-medium hover:text-secondary transition-colors">
                {a.name}
              </Link>
              <span className="text-xs text-muted-foreground ml-2">· {a.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}

function Section({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-base font-medium hover:text-secondary transition-colors">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
