import { type ReactNode } from "react";
import { PageShell } from "./Section";

export function LegalLayout({ eyebrow, title, updated, children }: { eyebrow: string; title: string; updated: string; children: ReactNode }) {
  return (
    <PageShell eyebrow={eyebrow} title={title}>
      <p className="text-xs text-muted-foreground -mt-6 mb-8">Last updated: {updated}</p>
      <article className="prose-custom max-w-3xl space-y-6 text-foreground/90 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-2 [&_h3]:font-semibold [&_h3]:mt-4 [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_ul]:space-y-1">
        {children}
      </article>
    </PageShell>
  );
}
