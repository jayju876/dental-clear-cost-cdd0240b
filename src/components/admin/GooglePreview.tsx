export function GooglePreview({ title, description, url }: { title: string; description: string; url: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="mb-1 text-xs text-muted-foreground">{url}</div>
      <div className="line-clamp-1 text-lg text-blue-700 hover:underline">{title || "Your title appears here"}</div>
      <div className="line-clamp-2 text-sm text-muted-foreground">{description || "Your meta description will appear here. Aim for 120–160 characters."}</div>
    </div>
  );
}

export function SeoScore({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-600" : score >= 50 ? "text-amber-600" : "text-red-600";
  const bg = score >= 80 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium text-muted-foreground">SEO score</span>
        <span className={`text-2xl font-bold ${color}`}>{score}</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${bg} transition-all`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
