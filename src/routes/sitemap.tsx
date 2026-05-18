import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Section";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap — ImplantCost" },
      { name: "description", content: "Browse every page on ImplantCost." },
      { property: "og:title", content: "Sitemap — ImplantCost" },
      { property: "og:description", content: "All pages on the ImplantCost website." },
    ],
    links: [{ rel: "canonical", href: "/sitemap" }],
  }),
  component: SitemapPage,
});

const groups = [
  {
    title: "Main",
    links: [
      { to: "/", label: "Home" },
      { to: "/calculator", label: "Cost Calculator" },
      { to: "/about", label: "About Us" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
      { to: "/disclaimer", label: "Disclaimer" },
      { to: "/cookie-policy", label: "Cookie Policy" },
      { to: "/hipaa", label: "HIPAA Compliance" },
      { to: "/accessibility", label: "Accessibility Statement" },
      { to: "/editorial-policy", label: "Editorial Policy" },
    ],
  },
] as const;

function SitemapPage() {
  return (
    <PageShell eyebrow="Sitemap" title="Everything on ImplantCost" lead="A complete index of pages on our site.">
      <div className="grid md:grid-cols-2 gap-10">
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">{g.title}</h2>
            <ul className="mt-4 space-y-2">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-base font-medium hover:text-secondary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
