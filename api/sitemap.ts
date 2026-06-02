// Vercel Serverless Function — dynamic sitemap.xml
// Pulls published blog posts and CMS authors from Supabase at request time so
// new content appears automatically without a redeploy.
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://dentalimplantcalculators.com";

// Static, indexable routes (admin and utility routes intentionally excluded)
const STATIC_PATHS: { path: string; priority: string; changefreq: string }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/calculator", priority: "0.9", changefreq: "weekly" },
  { path: "/cost", priority: "0.9", changefreq: "weekly" },
  { path: "/loan", priority: "0.8", changefreq: "weekly" },
  { path: "/ratio", priority: "0.8", changefreq: "weekly" },
  { path: "/loan-calculator", priority: "0.8", changefreq: "weekly" },
  { path: "/ratio-calculator", priority: "0.8", changefreq: "weekly" },
  { path: "/all-on-4-calculator", priority: "0.8", changefreq: "weekly" },
  { path: "/implant-support-calculator", priority: "0.8", changefreq: "weekly" },
  { path: "/dental-implant-loan-calculator", priority: "0.8", changefreq: "weekly" },
  { path: "/dental-implant-finance-calculator", priority: "0.8", changefreq: "weekly" },
  { path: "/dental-implant-payment-calculator", priority: "0.8", changefreq: "weekly" },
  { path: "/dental-implant-ratio-calculator", priority: "0.8", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "daily" },
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.5", changefreq: "monthly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/sitemap", priority: "0.3", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/disclaimer", priority: "0.3", changefreq: "yearly" },
  { path: "/cookie-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/hipaa", priority: "0.3", changefreq: "yearly" },
  { path: "/accessibility", priority: "0.3", changefreq: "yearly" },
  { path: "/editorial-policy", priority: "0.3", changefreq: "yearly" },
];

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

export default async function handler(req: Request): Promise<Response> {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

  const entries: UrlEntry[] = STATIC_PATHS.map((p) => ({
    loc: `${BASE_URL}${p.path}`,
    changefreq: p.changefreq,
    priority: p.priority,
  }));

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });

      const [postsRes, authorsRes] = await Promise.all([
        supabase
          .from("blog_posts")
          .select("slug, updated_at, published_at")
          .eq("status", "published")
          .lte("published_at", new Date().toISOString())
          .limit(5000),
        supabase
          .from("cms_authors")
          .select("slug, updated_at")
          .limit(1000),
      ]);

      (postsRes.data ?? []).forEach((p: { slug: string; updated_at?: string; published_at?: string }) => {
        entries.push({
          loc: `${BASE_URL}/blog/${p.slug}`,
          lastmod: (p.updated_at || p.published_at || "").slice(0, 10) || undefined,
          changefreq: "weekly",
          priority: "0.7",
        });
      });

      (authorsRes.data ?? []).forEach((a: { slug: string; updated_at?: string }) => {
        entries.push({
          loc: `${BASE_URL}/author/${a.slug}`,
          lastmod: (a.updated_at || "").slice(0, 10) || undefined,
          changefreq: "monthly",
          priority: "0.5",
        });
      });
    } catch (err) {
      console.error("[sitemap] Supabase fetch failed:", err);
    }
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map((e) => {
        const parts = [`    <loc>${escape(e.loc)}</loc>`];
        if (e.lastmod) parts.push(`    <lastmod>${e.lastmod}</lastmod>`);
        if (e.changefreq) parts.push(`    <changefreq>${e.changefreq}</changefreq>`);
        if (e.priority) parts.push(`    <priority>${e.priority}</priority>`);
        return `  <url>\n${parts.join("\n")}\n  </url>`;
      })
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=3600",
    },
  });
}

export const config = { runtime: "edge" };
