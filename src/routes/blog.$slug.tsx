import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/site/Section";
import { AuthorByline, AuthorBioCard } from "@/components/site/AuthorCard";
import { getPost, getAuthor, formatDate } from "@/lib/authors";
import sparkVsInvisalign from "@/content/blog/spark-vs-invisalign.md?raw";

// Blog post body content keyed by slug.
const POST_MARKDOWN: Record<string, string> = {
  "spark-vs-invisalign-cost-comfort-treatment-time": sparkVsInvisalign,
};

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    if (!post)
      return {
        meta: [
          { title: "Article not found — ImplantCost" },
          { name: "robots", content: "noindex" },
        ],
      };
    const author = getAuthor(post.authorSlug);
    return {
      meta: [
        { title: `${post.title} | ImplantCost` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        ...(author ? [{ property: "og:image", content: author.image }] : []),
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
      scripts: author
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.excerpt,
                datePublished: post.publishedAt,
                author: {
                  "@type": "Person",
                  name: author.name,
                  url: `/author/${author.slug}`,
                },
                publisher: { "@type": "Organization", name: "ImplantCost" },
              }),
            },
          ]
        : undefined,
    };
  },
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Article not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-secondary font-semibold">
        Back to the blog
      </Link>
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as {
    post: import("@/lib/authors").BlogPost;
  };
  const author = getAuthor(post.authorSlug)!;
  const reviewer = post.reviewerSlug ? getAuthor(post.reviewerSlug) : undefined;
  const markdown = POST_MARKDOWN[post.slug] ?? "";

  return (
    <div className="container mx-auto px-4 pt-12 pb-20">
      <div className="max-w-3xl">
        <FadeIn>
          <Link to="/blog" className="text-sm font-semibold text-secondary">
            ← All articles
          </Link>
          <div className="mt-4 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-secondary/10 text-secondary border-0"
            >
              {post.tag}
            </Badge>
            <span className="text-xs text-muted-foreground">{post.read} read</span>
          </div>
          <div className="mt-6">
            <AuthorByline
              author={author}
              reviewer={reviewer}
              date={formatDate(post.publishedAt)}
              read={post.read}
            />
          </div>
        </FadeIn>

        <article className="prose prose-slate dark:prose-invert max-w-none mt-10 prose-headings:tracking-tight prose-a:text-secondary prose-a:font-semibold prose-img:rounded-xl prose-table:text-sm">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children, ...rest }) => {
                if (href && href.startsWith("/")) {
                  return (
                    <Link to={href as any} className="text-secondary font-semibold">
                      {children}
                    </Link>
                  );
                }
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...rest}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </article>

        <div className="mt-12">
          <AuthorBioCard author={author} />
        </div>
      </div>
    </div>
  );
}
