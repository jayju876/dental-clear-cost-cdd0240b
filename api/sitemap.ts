// Vercel Serverless Function — dynamic sitemap.xml.
// Auto-derives entries from SITE_PAGES, POSTS, and AUTHORS so adding a
// page/post/author anywhere in code instantly updates the sitemap.
// Also merges any published rows from the Supabase-backed CMS.
import { createClient } from "@supabase/supabase-js";
import { buildSitemapEntries, renderSitemapXml, SITEMAP_BASE_URL, type SitemapEntry } from "../src/lib/sitemap.js";

export default async function handler(_req: Request): Promise<Response> {
  const entries: SitemapEntry[] = buildSitemapEntries();
  const seen = new Set(entries.map((e) => e.loc));

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

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
        supabase.from("cms_authors").select("slug, updated_at").limit(1000),
      ]);

      for (const p of postsRes.data ?? []) {
        const loc = `${SITEMAP_BASE_URL}/blog/${p.slug}`;
        if (seen.has(loc)) continue;
        seen.add(loc);
        entries.push({
          loc,
          lastmod: (p.updated_at || p.published_at || "").slice(0, 10) || undefined,
          changefreq: "weekly",
          priority: "0.7",
        });
      }

      for (const a of authorsRes.data ?? []) {
        const loc = `${SITEMAP_BASE_URL}/author/${a.slug}`;
        if (seen.has(loc)) continue;
        seen.add(loc);
        entries.push({
          loc,
          lastmod: (a.updated_at || "").slice(0, 10) || undefined,
          changefreq: "monthly",
          priority: "0.5",
        });
      }
    } catch (err) {
      console.error("[sitemap] Supabase fetch failed:", err);
    }
  }

  return new Response(renderSitemapXml(entries), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=3600",
    },
  });
}

export const config = { runtime: "edge" };
