import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Globe, BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Author } from "@/lib/authors";

export function AuthorByline({ author, date, read, reviewer }: { author: Author; date: string; read: string; reviewer?: Author }) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-y border-border/70 py-4">
      <Link to="/author/$slug" params={{ slug: author.slug }} className="flex items-center gap-3 group">
        <img src={author.image} alt={author.name} width={48} height={48} loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-border" />
        <div className="leading-tight">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Written by</p>
          <p className="text-sm font-semibold group-hover:text-secondary transition-colors">{author.name}</p>
          <p className="text-xs text-muted-foreground">{author.role}</p>
        </div>
      </Link>
      {reviewer && (
        <Link to="/author/$slug" params={{ slug: reviewer.slug }} className="flex items-center gap-2 group pl-4 border-l border-border/70">
          <img src={reviewer.image} alt={reviewer.name} width={36} height={36} loading="lazy" className="h-9 w-9 rounded-full object-cover ring-2 ring-secondary/30" />
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-wider text-secondary inline-flex items-center gap-1 font-semibold">
              <BadgeCheck className="h-3 w-3" /> Medically Reviewed by
            </p>
            <p className="text-xs font-semibold group-hover:text-secondary transition-colors">{reviewer.name}</p>
          </div>
        </Link>
      )}
      <div className="ml-auto text-xs text-muted-foreground">
        <span>{date}</span> · <span>{read} read</span>
      </div>
    </div>
  );
}

export function AuthorBioCard({ author, label = "About the Author" }: { author: Author; label?: string }) {
  return (
    <Card className="p-6 border-border/70 shadow-elegant">
      <p className="text-xs uppercase tracking-wider text-secondary font-semibold mb-4">{label}</p>
      <div className="flex flex-col sm:flex-row gap-5">
        <img src={author.image} alt={author.name} width={112} height={112} loading="lazy" className="h-28 w-28 rounded-full object-cover ring-2 ring-border shrink-0" />
        <div className="flex-1">
          <Link to="/author/$slug" params={{ slug: author.slug }} className="text-lg font-semibold hover:text-secondary transition-colors">
            {author.name}
          </Link>
          <p className="text-sm text-secondary font-medium">{author.role}</p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{author.longBio}</p>
          <div className="mt-3 flex items-center gap-3 text-muted-foreground">
            {author.social.linkedin && <a href={author.social.linkedin} aria-label="LinkedIn" className="hover:text-secondary"><Linkedin className="h-4 w-4" /></a>}
            {author.social.twitter && <a href={author.social.twitter} aria-label="Twitter" className="hover:text-secondary"><Twitter className="h-4 w-4" /></a>}
            {author.social.website && <a href={author.social.website} aria-label="Website" className="hover:text-secondary"><Globe className="h-4 w-4" /></a>}
          </div>
        </div>
      </div>
    </Card>
  );
}
