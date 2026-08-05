// Image-free data used by edge functions (sitemap). Keep in sync with authors.ts.
export type BlogPostMeta = {
  slug: string;
  publishedAt: string;
  authorSlug: string;
};

export const POSTS_INDEX: BlogPostMeta[] = [
  {
    slug: "spark-vs-invisalign-cost-comfort-treatment-time",
    publishedAt: "2026-05-10",
    authorSlug: "dr-sarah-mitchell",
  },
  {
    slug: "how-long-does-a-root-canal-take-timing-by-tooth",
    publishedAt: "2026-07-01",
    authorSlug: "james-walker",
  },
  {
    slug: "dental-implant-vs-bridge-cost-lifespan-pain-2026",
    publishedAt: "2026-07-15",
    authorSlug: "dr-michael-carter",
  },
  {
    slug: "typical-cost-full-set-dental-implants",
    publishedAt: "2026-08-05",
    authorSlug: "emily-roberts",
  },
];

export const AUTHOR_SLUGS: string[] = [
  "dr-michael-carter",
  "dr-sarah-mitchell",
  "emily-roberts",
  "james-walker",
];
