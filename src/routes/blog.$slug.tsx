import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/site/Section";
import { AuthorBioCard } from "@/components/site/AuthorCard";
import {
  getPost,
  getAuthor,
  formatDate,
  POSTS,
  type BlogPost,
} from "@/lib/authors";
import sparkVsInvisalign from "@/content/blog/spark-vs-invisalign.md?raw";
import rootCanalTiming from "@/content/blog/how-long-does-a-root-canal-take.md?raw";
import implantVsBridge from "@/content/blog/dental-implant-vs-bridge-cost-lifespan-pain-2026.md?raw";
import fullSetCost from "@/content/blog/full-set-dental-implants-cost.md?raw";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  ChevronRight,
  Clock,
  Facebook,
  Link2,
  List,
  Linkedin,
  Twitter,
} from "lucide-react";

// Blog post body content keyed by slug.
const POST_MARKDOWN: Record<string, string> = {
  "spark-vs-invisalign-cost-comfort-treatment-time": sparkVsInvisalign,
  "how-long-does-a-root-canal-take-timing-by-tooth": rootCanalTiming,
  "dental-implant-vs-bridge-cost-lifespan-pain-2026": implantVsBridge,
  "typical-cost-full-set-dental-implants": fullSetCost,
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
    const cover = extractCover(POST_MARKDOWN[post.slug] ?? "");
    return {
      meta: [
        { title: `${post.title} | ImplantCost` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        ...(cover ? [{ property: "og:image", content: cover }] : []),
        { name: "twitter:card", content: "summary_large_image" },
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
                image: cover ? [cover] : undefined,
                author: {
                  "@type": "Person",
                  name: author.name,
                  url: `/author/${author.slug}`,
                },
                publisher: {
                  "@type": "Organization",
                  name: "ImplantCost",
                },
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
  errorComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Link to="/blog" className="mt-4 inline-block text-secondary font-semibold">
        Back to the blog
      </Link>
    </div>
  ),
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

/* ---------- utilities ---------- */

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function nodesToText(children: unknown): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number")
    return String(children);
  if (Array.isArray(children)) return children.map(nodesToText).join("");
  if (typeof children === "object" && children && "props" in (children as any)) {
    return nodesToText((children as any).props?.children);
  }
  return "";
}

function extractCover(md: string): string | undefined {
  const m = md.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return m?.[1];
}

function stripCover(md: string, cover?: string): string {
  if (!cover) return md;
  return md.replace(
    new RegExp(`!\\[[^\\]]*\\]\\(${cover.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\)\\n?`),
    "",
  );
}

function buildToc(md: string) {
  const items: { level: 2 | 3; text: string; id: string }[] = [];
  const lines = md.split("\n");
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    const h3 = line.match(/^###\s+(.+?)\s*$/);
    if (h2) items.push({ level: 2, text: h2[1], id: slugify(h2[1]) });
    else if (h3) items.push({ level: 3, text: h3[1], id: slugify(h3[1]) });
  }
  return items;
}

/* ---------- reading progress bar ---------- */

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? Math.min(100, (scrolled / height) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-secondary to-primary transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ---------- share buttons ---------- */

function ShareBar({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);
  const enc = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };
  const btn =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground hover:text-secondary hover:border-secondary transition-colors";
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">
        Share
      </span>
      <a
        className={btn}
        aria-label="Share on Twitter"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/intent/tweet?url=${enc}&text=${encTitle}`}
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        className={btn}
        aria-label="Share on Facebook"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`}
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        className={btn}
        aria-label="Share on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`}
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copy}
        className={btn}
        aria-label="Copy link"
      >
        <Link2 className="h-4 w-4" />
      </button>
      {copied && (
        <span className="text-xs text-secondary font-semibold">Copied!</span>
      )}
    </div>
  );
}

/* ---------- sticky TOC ---------- */

function TableOfContents({
  items,
}: {
  items: { level: 2 | 3; text: string; id: string }[];
}) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    if (items.length === 0) return;
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => !!n);
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: [0, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);
  if (items.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className="text-sm">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
        <List className="h-3.5 w-3.5" />
        On this page
      </div>
      <ul className="mt-4 space-y-1 border-l border-border/70">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={[
                  "block -ml-px border-l-2 py-1.5 transition-colors",
                  it.level === 3 ? "pl-6 text-[13px]" : "pl-4",
                  isActive
                    ? "border-secondary text-secondary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ---------- related posts ---------- */

function RelatedPosts({ current }: { current: BlogPost }) {
  const related = POSTS.filter((p) => p.slug !== current.slug).slice(0, 3);
  if (related.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2
        id="related-heading"
        className="text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Continue reading
      </h2>
      <p className="mt-2 text-muted-foreground">
        More expert-reviewed guides on dental implant costs and treatment.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((p) => {
          const a = getAuthor(p.authorSlug);
          const cover = extractCover(POST_MARKDOWN[p.slug] ?? "");
          return (
            <Card
              key={p.slug}
              className="group overflow-hidden border-border/70 hover:shadow-elegant hover:-translate-y-0.5 transition-all flex flex-col"
            >
              {cover && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="block aspect-[16/9] overflow-hidden bg-muted"
                >
                  <img
                    src={cover}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              )}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-secondary/10 text-secondary border-0"
                  >
                    {p.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {p.read} read
                  </span>
                </div>
                <h3 className="mt-3 font-semibold leading-snug">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="hover:text-secondary transition-colors"
                  >
                    {p.title}
                  </Link>
                </h3>
                {a && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    {a.name} · {formatDate(p.publishedAt)}
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- inline CTA ---------- */

function InlineCta() {
  return (
    <Card className="my-10 overflow-hidden border-0 bg-gradient-to-br from-secondary/10 via-primary/5 to-background p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-secondary/15 text-secondary">
          <Calculator className="h-7 w-7" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-secondary font-semibold">
            Free tool
          </p>
          <h3 className="mt-1 text-lg font-bold sm:text-xl">
            Estimate your treatment in 60 seconds
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Compare single tooth, All-on-4 and full mouth costs — with or
            without insurance.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link to="/" hash="calculator">
            Open calculator <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

/* ---------- main page ---------- */

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const author = getAuthor(post.authorSlug)!;
  const reviewer = post.reviewerSlug ? getAuthor(post.reviewerSlug) : undefined;
  const rawMarkdown = POST_MARKDOWN[post.slug] ?? "";
  const cover = useMemo(() => extractCover(rawMarkdown), [rawMarkdown]);
  const markdown = useMemo(
    () => stripCover(rawMarkdown, cover).replace(/^#\s+.+\n+/, ""),
    [rawMarkdown, cover],
  );
  const toc = useMemo(() => buildToc(markdown), [markdown]);

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <header className="border-b border-border/60 bg-gradient-to-b from-secondary/5 via-background to-background">
        <div className="container mx-auto px-4 pt-8 pb-12 sm:pt-12">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs sm:text-sm text-muted-foreground"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li>
                <Link to="/blog" className="hover:text-secondary">
                  Blog
                </Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5" />
              <li className="truncate max-w-[60vw] text-foreground/80">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="mt-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-secondary text-secondary-foreground border-0">
                {post.tag}
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {post.read} read
              </span>
              <span className="text-xs text-muted-foreground">
                Updated {formatDate(post.publishedAt)}
              </span>
            </div>
            <FadeIn>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.1]">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed sm:text-xl">
                {post.excerpt}
              </p>
            </FadeIn>

            {/* Byline */}
            <div className="mt-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <Link
                  to="/author/$slug"
                  params={{ slug: author.slug }}
                  className="flex min-w-0 items-center gap-3 group"
                >
                  <img
                    src={author.image}
                    alt={author.name}
                    width={48}
                    height={48}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-border"
                  />
                  <div className="min-w-0 leading-tight">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Written by
                    </p>
                    <p className="truncate text-sm font-semibold group-hover:text-secondary transition-colors">
                      {author.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {author.role}
                    </p>
                  </div>
                </Link>
                {reviewer && (
                  <Link
                    to="/author/$slug"
                    params={{ slug: reviewer.slug }}
                    className="hidden sm:flex min-w-0 items-center gap-3 group border-l border-border/70 pl-4"
                  >
                    <img
                      src={reviewer.image}
                      alt={reviewer.name}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-secondary/30"
                    />
                    <div className="min-w-0 leading-tight">
                      <p className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-secondary font-semibold">
                        <BadgeCheck className="h-3 w-3" /> Medically reviewed
                      </p>
                      <p className="truncate text-sm font-semibold group-hover:text-secondary transition-colors">
                        {reviewer.name}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Featured image */}
          {cover && (
            <FadeIn delay={0.1}>
              <figure className="mt-10 overflow-hidden rounded-2xl border border-border/60 shadow-elegant">
                <img
                  src={cover}
                  alt={post.title}
                  className="aspect-[16/8] w-full object-cover"
                />
              </figure>
            </FadeIn>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <article className="prose prose-slate dark:prose-invert max-w-none prose-base sm:prose-lg break-words prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-headings:break-words prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-bold prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-3 prose-h3:mt-8 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:font-semibold prose-h4:text-lg prose-h4:font-semibold prose-p:leading-[1.8] prose-p:text-foreground/85 prose-p:break-words prose-a:text-secondary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:break-words prose-img:rounded-xl prose-img:border prose-img:border-border/60 prose-img:mx-auto prose-blockquote:border-l-secondary prose-blockquote:bg-secondary/5 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:font-medium prose-strong:text-foreground prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:break-words prose-pre:overflow-x-auto prose-li:my-1 prose-li:break-words prose-ul:pl-6 prose-ol:pl-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => {
                    const id = slugify(nodesToText(children));
                    return <h2 id={id}>{children}</h2>;
                  },
                  h3: ({ children }) => {
                    const id = slugify(nodesToText(children));
                    return <h3 id={id}>{children}</h3>;
                  },
                  table: ({ children }) => (
                    <div className="my-6 -mx-4 sm:mx-0 overflow-x-auto rounded-lg border border-border/60">
                      <table className="w-full text-sm">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="bg-muted/60 px-4 py-2 text-left font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border-t border-border/60 px-4 py-2 align-top">
                      {children}
                    </td>
                  ),
                  img: ({ src, alt }) => (
                    <figure className="my-8">
                      <img
                        src={src as string}
                        alt={alt ?? ""}
                        loading="lazy"
                        className="w-full h-auto rounded-xl border border-border/60"
                      />
                      {alt && (
                        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                          {alt}
                        </figcaption>
                      )}
                    </figure>
                  ),
                  a: ({ href, children, ...rest }) => {
                    if (href && href.startsWith("/")) {
                      return (
                        <Link
                          to={href as any}
                          className="text-secondary font-semibold underline decoration-secondary/30 underline-offset-4 hover:decoration-secondary break-words"
                        >
                          {children}
                        </Link>
                      );
                    }
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-words"
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


            <InlineCta />

            {/* Share + tags */}
            <div className="mt-10 flex flex-col gap-4 border-y border-border/70 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Filed under
                </span>
                <Badge
                  variant="secondary"
                  className="bg-secondary/10 text-secondary border-0"
                >
                  {post.tag}
                </Badge>
              </div>
              <ShareBar title={post.title} />
            </div>

            {/* Author bio */}
            <div className="mt-10">
              <AuthorBioCard author={author} />
            </div>

            <RelatedPosts current={post} />
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <TableOfContents items={toc} />
              <Card className="border-secondary/30 bg-gradient-to-br from-secondary/10 to-background p-5">
                <div className="flex items-center gap-2 text-secondary">
                  <Calculator className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Free tool
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-snug">
                  Dental Implant Cost Calculator
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Get an instant estimate for your treatment.
                </p>
                <Button asChild size="sm" className="mt-4 w-full">
                  <Link to="/" hash="calculator">
                    Try it now <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
