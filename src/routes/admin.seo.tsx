import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Save, RefreshCw, Pencil, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { logActivity } from "@/lib/admin-utils";
import { SITE_PAGES, scoreSeo } from "@/lib/site-pages";
import { GooglePreview, SeoScore } from "@/components/admin/GooglePreview";

export const Route = createFileRoute("/admin/seo")({ component: PagesSeo });

type Row = {
  id: string; path: string; page_title: string | null;
  meta_title: string | null; meta_description: string | null; meta_keywords: string | null;
  canonical_url: string | null; og_title: string | null; og_description: string | null; og_image: string | null;
  robots: string | null; twitter_card: string | null;
};

function PagesSeo() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Row | null>(null);

  const { data: rows } = useQuery({
    queryKey: ["admin-page-seo"],
    queryFn: async () => {
      const { data } = await supabase.from("page_seo").select("*").order("path");
      return (data ?? []) as Row[];
    },
  });

  const byPath = useMemo(() => new Map((rows ?? []).map((r) => [r.path, r])), [rows]);

  const merged = useMemo(() => {
    const sitePaths = new Set(SITE_PAGES.map((p) => p.path));
    const out = SITE_PAGES.map((p) => ({ name: p.name, group: p.group, path: p.path, row: byPath.get(p.path) ?? null }));
    // Append DB-only entries (e.g. legacy)
    for (const r of rows ?? []) {
      if (!sitePaths.has(r.path)) out.push({ name: r.path, group: "Content" as const, path: r.path, row: r });
    }
    return out;
  }, [rows, byPath]);

  const filtered = merged.filter((m) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return m.name.toLowerCase().includes(s) || m.path.toLowerCase().includes(s) || (m.row?.meta_title ?? "").toLowerCase().includes(s);
  });

  const syncMissing = async () => {
    const missing = SITE_PAGES.filter((p) => !byPath.has(p.path));
    if (missing.length === 0) { toast.info("All pages already tracked"); return; }
    const { error } = await supabase.from("page_seo").insert(missing.map((p) => ({ path: p.path, page_title: p.name })));
    if (error) { toast.error(error.message); return; }
    toast.success(`Added ${missing.length} new pages`);
    qc.invalidateQueries({ queryKey: ["admin-page-seo"] });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pages SEO</h1>
          <p className="text-sm text-muted-foreground">Manage meta tags and structured data for every page on your site.</p>
        </div>
        <Button onClick={syncMissing} variant="outline"><RefreshCw className="mr-2 h-4 w-4" />Sync site pages</Button>
      </div>

      <Card className="p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search pages..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Page</th>
                <th className="px-4 py-3 font-medium">URL</th>
                <th className="px-4 py-3 font-medium">Meta title</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">SEO</th>
                <th className="px-4 py-3 font-medium text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((m) => {
                const r = m.row;
                const score = r ? scoreSeo({
                  title: r.meta_title ?? "",
                  description: r.meta_description ?? "",
                  keywords: r.meta_keywords ?? "",
                  canonical: r.canonical_url ?? "",
                  ogImage: r.og_image ?? "",
                }) : 0;
                return (
                  <tr key={m.path} className="hover:bg-accent/30">
                    <td className="px-4 py-3 font-medium">{m.name}<div className="text-xs font-normal text-muted-foreground">{m.group}</div></td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{m.path}</td>
                    <td className="max-w-[240px] truncate px-4 py-3">{r?.meta_title || <span className="text-muted-foreground">—</span>}</td>
                    <td className="max-w-[300px] truncate px-4 py-3 text-muted-foreground">{r?.meta_description || "—"}</td>
                    <td className="px-4 py-3">
                      {r ? (
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${score >= 80 ? "bg-emerald-100 text-emerald-700" : score >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{score}</span>
                      ) : <span className="text-xs text-muted-foreground">Not set</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {r ? (
                        <Button size="sm" variant="ghost" onClick={() => setEditing(r)}><Pencil className="h-3.5 w-3.5" /></Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={async () => {
                          const { data, error } = await supabase.from("page_seo").insert({ path: m.path, page_title: m.name }).select().single();
                          if (error) { toast.error(error.message); return; }
                          setEditing(data as Row);
                          qc.invalidateQueries({ queryKey: ["admin-page-seo"] });
                        }}>Setup</Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <SeoEditor entry={editing} onClose={() => setEditing(null)} onSaved={() => qc.invalidateQueries({ queryKey: ["admin-page-seo"] })} />
    </div>
  );
}

function SeoEditor({ entry, onClose, onSaved }: { entry: Row | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Row | null>(entry);
  const [saving, setSaving] = useState(false);

  // Sync form when entry changes
  useMemo(() => { setForm(entry); }, [entry]);
  if (!entry || !form) return null;

  const update = (patch: Partial<Row>) => setForm((f) => f ? { ...f, ...patch } : f);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("page_seo").update({
      page_title: form.page_title, meta_title: form.meta_title, meta_description: form.meta_description,
      meta_keywords: form.meta_keywords, canonical_url: form.canonical_url,
      og_title: form.og_title, og_description: form.og_description, og_image: form.og_image,
      robots: form.robots, twitter_card: form.twitter_card,
    }).eq("id", entry.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    await logActivity("updated", "page_seo", entry.id, { path: entry.path });
    toast.success("SEO saved");
    onSaved(); onClose();
  };

  const score = scoreSeo({
    title: form.meta_title ?? "",
    description: form.meta_description ?? "",
    keywords: form.meta_keywords ?? "",
    canonical: form.canonical_url ?? "",
    ogImage: form.og_image ?? "",
  });
  const warnings: string[] = [];
  if (!form.meta_title) warnings.push("Missing meta title");
  else if ((form.meta_title?.length ?? 0) > 60) warnings.push("Meta title over 60 chars");
  if (!form.meta_description) warnings.push("Missing meta description");
  else if ((form.meta_description?.length ?? 0) > 160) warnings.push("Meta description over 160 chars");
  if (!form.canonical_url) warnings.push("Missing canonical URL");
  if (!form.og_image) warnings.push("Missing Open Graph image");

  return (
    <Dialog open={!!entry} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>SEO · {entry.path}</DialogTitle>
          <DialogDescription>Edit metadata, preview Google snippet, and save instantly.</DialogDescription>
        </DialogHeader>

        <Card className="border-dashed"><CardContent className="space-y-3 p-4">
          <GooglePreview title={form.meta_title || entry.path} description={form.meta_description ?? ""} url={`dental-clear-cost.lovable.app${entry.path}`} />
          <SeoScore score={score} />
          {warnings.length > 0 && (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-800">
              <strong>Suggestions:</strong> {warnings.join(" · ")}
            </div>
          )}
        </CardContent></Card>

        <div className="space-y-4">
          <div className="space-y-1.5"><Label>Page title (H1)</Label><Input value={form.page_title ?? ""} onChange={(e) => update({ page_title: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Meta title <span className={`text-xs ${(form.meta_title?.length ?? 0) > 60 ? "text-red-600" : "text-muted-foreground"}`}>({(form.meta_title?.length ?? 0)}/60)</span></Label><Input maxLength={70} value={form.meta_title ?? ""} onChange={(e) => update({ meta_title: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Meta description <span className={`text-xs ${(form.meta_description?.length ?? 0) > 160 ? "text-red-600" : "text-muted-foreground"}`}>({(form.meta_description?.length ?? 0)}/160)</span></Label><Textarea rows={2} maxLength={180} value={form.meta_description ?? ""} onChange={(e) => update({ meta_description: e.target.value })} /></div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5"><Label>Meta keywords</Label><Input value={form.meta_keywords ?? ""} onChange={(e) => update({ meta_keywords: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Canonical URL</Label><Input value={form.canonical_url ?? ""} onChange={(e) => update({ canonical_url: e.target.value })} /></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5"><Label>Open Graph title</Label><Input value={form.og_title ?? ""} onChange={(e) => update({ og_title: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Open Graph image</Label><Input value={form.og_image ?? ""} onChange={(e) => update({ og_image: e.target.value })} /></div>
          </div>
          <div className="space-y-1.5"><Label>Open Graph / Twitter description</Label><Textarea rows={2} value={form.og_description ?? ""} onChange={(e) => update({ og_description: e.target.value })} /></div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5"><Label>Twitter card</Label><Input value={form.twitter_card ?? ""} onChange={(e) => update({ twitter_card: e.target.value })} placeholder="summary_large_image" /></div>
            <div className="space-y-1.5"><Label>Robots</Label><Input value={form.robots ?? ""} onChange={(e) => update({ robots: e.target.value })} placeholder="index,follow" /></div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving}><Save className="mr-2 h-4 w-4" />Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
