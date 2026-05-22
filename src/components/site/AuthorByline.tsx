import { Link } from "@tanstack/react-router";
import { Calendar, Clock, ShieldCheck, Twitter, Linkedin, Link2 } from "lucide-react";
import { type Author } from "@/lib/authors";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function AuthorByline({
  author,
  reviewedBy,
  publishedAt,
  readingTime,
}: {
  author: Author;
  reviewedBy?: Author;
  publishedAt: string;
  readingTime: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-y border-border py-4">
      <Link to="/author/$slug" params={{ slug: author.slug }} className="flex items-center gap-3 group">
        <img
          src={author.image}
          alt={author.name}
          width={64}
          height={64}
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover border border-border shadow-sm group-hover:shadow-elegant transition-shadow"
        />
        <div>
          <p className="text-sm font-semibold leading-tight">{author.name}</p>
          <p className="text-xs text-muted-foreground">{author.role}</p>
        </div>
      </Link>
      <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {fmtDate(publishedAt)}</span>
        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {readingTime} read</span>
        {reviewedBy && (
          <Link
            to="/author/$slug"
            params={{ slug: reviewedBy.slug }}
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 text-secondary px-2.5 py-1 font-semibold"
          >
            <ShieldCheck className="h-3.5 w-3.5" /> Reviewed by {reviewedBy.name}
          </Link>
        )}
      </div>
    </div>
  );
}

export function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-5">
        <img
          src={author.image}
          alt={author.name}
          width={128}
          height={128}
          loading="lazy"
          className="h-20 w-20 rounded-full object-cover border border-border shrink-0"
        />
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">About the author</p>
          <h3 className="mt-1 text-lg font-semibold">{author.name}</h3>
          <p className="text-sm text-muted-foreground">{author.role}</p>
          <p className="mt-3 text-sm text-foreground/90">{author.bio}</p>
          <div className="mt-4 flex items-center gap-3 text-muted-foreground">
            {author.social.twitter && <a href={author.social.twitter} aria-label={`${author.name} on Twitter`} className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>}
            {author.social.linkedin && <a href={author.social.linkedin} aria-label={`${author.name} on LinkedIn`} className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>}
            {author.social.website && <a href={author.social.website} aria-label={`${author.name} website`} className="hover:text-foreground"><Link2 className="h-4 w-4" /></a>}
            <Link
              to="/author/$slug"
              params={{ slug: author.slug }}
              className="ml-auto text-sm font-semibold text-secondary hover:underline"
            >
              View profile →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShareIcons({ url, title }: { url: string; title: string }) {
  const enc = encodeURIComponent(url);
  const encT = encodeURIComponent(title);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Share:</span>
      <a aria-label="Share on Twitter" href={`https://twitter.com/intent/tweet?url=${enc}&text=${encT}`} target="_blank" rel="noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted">
        <Twitter className="h-3.5 w-3.5" />
      </a>
      <a aria-label="Share on LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`} target="_blank" rel="noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted">
        <Linkedin className="h-3.5 w-3.5" />
      </a>
      <a aria-label="Copy link" href={url} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted">
        <Link2 className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
