// Shared sitemap builder. Any new entry in SITE_PAGES, POSTS, or AUTHORS
// flows into /sitemap.xml automatically — no manual edit required.
import { SITE_PAGES } from "./site-pages";
import { AUTHORS, POSTS } from "./authors";

export const SITEMAP_BASE_URL = "https://dentalimplantcalculators.com";

const PRIORITY_BY_GROUP = {
  Core: "0.8",
  Calculators: "0.9",
  Content: "0.7",
  Legal: "0.3",
} as const;

const CHANGEFREQ_BY_GROUP = {
  Core: "monthly",
  Calculators: "weekly",
  Content: "weekly",
  Legal: "yearly",
} as const;

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function buildSitemapEntries(baseUrl = SITEMAP_BASE_URL): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // Static/marketing routes — derived from the canonical SITE_PAGES list.
  for (const p of SITE_PAGES) {
    entries.push({
      loc: `${baseUrl}${p.path}`,
      changefreq: CHANGEFREQ_BY_GROUP[p.group],
      priority: p.path === "/" ? "1.0" : PRIORITY_BY_GROUP[p.group],
    });
  }

  // Blog posts — every post registered in src/lib/authors.ts.
  for (const post of POSTS) {
    entries.push({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.publishedAt?.slice(0, 10),
      changefreq: "weekly",
      priority: "0.7",
    });
  }

  // Author profile pages.
  for (const a of AUTHORS) {
    entries.push({
      loc: `${baseUrl}/author/${a.slug}`,
      changefreq: "monthly",
      priority: "0.5",
    });
  }

  // De-dupe by loc (keep first).
  const seen = new Set<string>();
  return entries.filter((e) => (seen.has(e.loc) ? false : (seen.add(e.loc), true)));
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
  const body = entries
    .map((e) => {
      const parts = [`    <loc>${esc(e.loc)}</loc>`];
      if (e.lastmod) parts.push(`    <lastmod>${e.lastmod}</lastmod>`);
      if (e.changefreq) parts.push(`    <changefreq>${e.changefreq}</changefreq>`);
      if (e.priority) parts.push(`    <priority>${e.priority}</priority>`);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}
