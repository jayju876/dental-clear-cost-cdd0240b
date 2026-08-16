import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageShell, FadeIn } from "@/components/site/Section";
import { POSTS, getAuthor, formatDate } from "@/lib/authors";
import { InternalLinks } from "@/components/site/InternalLinks";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Dental Implant Blog — Guides, Costs & Insurance | ImplantCost" },
      {
        name: "description",
        content:
          "Expert-reviewed articles on dental implant costs, All-on-4, financing, insurance and recovery from the ImplantCost editorial team.",
      },
      { property: "og:title", content: "Dental Implant Blog — ImplantCost" },
      {
        property: "og:description",
        content:
          "Guides, cost breakdowns and patient stories reviewed by licensed dental clinicians.",
      },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data: cmsPosts = [] } = useQuery({
    queryKey: ["public-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug,title,excerpt,categories,tags,published_at,reading_time,featured_image")
        .eq("status", "published")
        .or("published_at.is.null,published_at.lte." + new Date().toISOString())
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
  const cmsAsPosts = cmsPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    tag: post.categories?.[0] ?? post.tags?.[0] ?? "Editorial",
    read: `${post.reading_time ?? 5} min`,
    publishedAt: post.published_at ?? new Date().toISOString(),
    authorSlug: "dr-michael-carter",
    reviewerSlug: "dr-michael-carter",
    featuredImage: post.featured_image ?? undefined,
  } as any));
  const posts = [...POSTS, ...cmsAsPosts]
    .filter((post, index, all) => all.findIndex((candidate) => candidate.slug === post.slug) === index)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  return (
    <PageShell
      eyebrow="Editorial"
      title="Dental Implant Blog"
      lead="Cost breakdowns, procedure guides, insurance explainers and patient stories — reviewed by our clinical team."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p, i) => {
          const author = getAuthor(p.authorSlug);
          return (
            <FadeIn key={p.slug} delay={i * 0.03}>
              <Card className="p-6 border-border/70 hover:shadow-elegant hover:-translate-y-0.5 transition-all h-full flex flex-col">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                    {p.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{p.read} read</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="hover:text-secondary transition-colors"
                  >
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{p.excerpt}</p>
                {author && (
                  <div className="mt-5 flex items-center gap-3 border-t border-border/70 pt-4">
                    <img
                      src={author.image}
                      alt={author.name}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/author/$slug"
                        params={{ slug: author.slug }}
                        className="text-sm font-semibold hover:text-secondary transition-colors"
                      >
                        {author.name}
                      </Link>
                      <p className="text-xs text-muted-foreground truncate">
                        {author.role} · {formatDate(p.publishedAt)}
                      </p>
                    </div>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      aria-label={`Read ${p.title}`}
                      className="text-secondary"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </Card>
            </FadeIn>
          );
        })}
      </div>
      <InternalLinks />
    </PageShell>
  );
}
