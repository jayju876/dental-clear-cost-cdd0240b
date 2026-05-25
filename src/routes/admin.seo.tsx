import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { logActivity } from "@/lib/admin-utils";

export const Route = createFileRoute("/admin/seo")({ component: PageSeo });

function PageSeo() {
  const qc = useQueryClient();
  const [selected, setSelected] = useState<string | null>(null);

  const { data: pages } = useQuery({
    queryKey: ["admin-page-seo"],
    queryFn: async () => {
      const { data } = await supabase.from("page_seo").select("*").order("path");
      return data ?? [];
    },
  });

  const current = pages?.find((p) => p.id === selected) ?? pages?.[0];

  const addPage = async () => {
    const path = prompt("New page path (e.g. /pricing)");
    if (!path) return;
    const { error } = await supabase.from("page_seo").insert({ path, page_title: path });
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["admin-page-seo"] });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this page SEO entry?")) return;
    await supabase.from("page_seo").delete().eq("id", id);
    setSelected(null);
    qc.invalidateQueries({ queryKey: ["admin-page-seo"] });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page SEO</h1>
          <p className="text-sm text-muted-foreground">Meta tags, Open Graph and schema for static pages</p>
        </div>
        <Button onClick={addPage}><Plus className="mr-2 h-4 w-4" />Add page</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <Card className="h-fit">
          <CardContent className="p-2">
            {pages?.map((p) => (
              <button key={p.id} onClick={() => setSelected(p.id)} className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium ${(current?.id === p.id) ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                {p.path}
              </button>
            ))}
          </CardContent>
        </Card>

        {current && <SeoForm key={current.id} entry={current} onDelete={() => del(current.id)} />}
      </div>
    </div>
  );
}

function SeoForm({ entry, onDelete }: { entry: { id: string; path: string; page_title: string | null; meta_title: string | null; meta_description: string | null; meta_keywords: string | null; canonical_url: string | null; og_title: string | null; og_description: string | null; og_image: string | null; robots: string | null }; onDelete: () => void }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({
    page_title: entry.page_title ?? "",
    meta_title: entry.meta_title ?? "", meta_description: entry.meta_description ?? "",
    meta_keywords: entry.meta_keywords ?? "", canonical_url: entry.canonical_url ?? "",
    og_title: entry.og_title ?? "", og_description: entry.og_description ?? "", og_image: entry.og_image ?? "",
    robots: entry.robots ?? "index,follow",
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("page_seo").update(form).eq("id", entry.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    await logActivity("updated", "page_seo", entry.id, { path: entry.path });
    qc.invalidateQueries({ queryKey: ["admin-page-seo"] });
    toast.success("Saved");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div><CardTitle>{entry.path}</CardTitle><CardDescription>SEO &amp; social metadata</CardDescription></div>
        <button onClick={onDelete} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5"><Label>Page title (H1)</Label><Input value={form.page_title} onChange={(e) => setForm({ ...form, page_title: e.target.value })} /></div>
        <div className="space-y-1.5"><Label>Meta title <span className="text-muted-foreground">({form.meta_title.length}/60)</span></Label><Input maxLength={70} value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} /></div>
        <div className="space-y-1.5"><Label>Meta description <span className="text-muted-foreground">({form.meta_description.length}/160)</span></Label><Textarea rows={2} maxLength={180} value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} /></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5"><Label>Keywords</Label><Input value={form.meta_keywords} onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Canonical URL</Label><Input value={form.canonical_url} onChange={(e) => setForm({ ...form, canonical_url: e.target.value })} /></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5"><Label>OG title</Label><Input value={form.og_title} onChange={(e) => setForm({ ...form, og_title: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>OG image</Label><Input value={form.og_image} onChange={(e) => setForm({ ...form, og_image: e.target.value })} /></div>
        </div>
        <div className="space-y-1.5"><Label>OG description</Label><Textarea rows={2} value={form.og_description} onChange={(e) => setForm({ ...form, og_description: e.target.value })} /></div>
        <div className="space-y-1.5"><Label>Robots</Label><Input value={form.robots} onChange={(e) => setForm({ ...form, robots: e.target.value })} /></div>
        <Button onClick={save} disabled={saving}><Save className="mr-2 h-4 w-4" />Save</Button>
      </CardContent>
    </Card>
  );
}
