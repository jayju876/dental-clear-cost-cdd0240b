import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Save, Search, Trash2, Copy, Eye, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { logActivity } from "@/lib/admin-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RichTextEditor } from "@/components/site/RichTextEditor";

export const Route = createFileRoute("/admin/pages")({ component: PagesAdmin });

type PageRecord = { id: string; slug: string; title: string; excerpt: string | null; content_html: string; status: string; meta_title: string | null; meta_description: string | null; canonical_url: string | null; scheduled_for: string | null; updated_at: string };
const emptyPage: Omit<PageRecord, "id" | "updated_at"> = { slug: "", title: "", excerpt: "", content_html: "<p>Start writing your page content here.</p>", status: "draft", meta_title: "", meta_description: "", canonical_url: "", scheduled_for: null };

function PagesAdmin() {
  const { user, hasAnyRole } = useAuth();
  const canEdit = hasAnyRole(["super_admin", "admin", "content_editor", "seo_manager"]);
  const canDelete = hasAnyRole(["super_admin", "admin"]);
  const [pages, setPages] = useState<PageRecord[]>([]);
  const [selected, setSelected] = useState<PageRecord | null>(null);
  const [form, setForm] = useState(emptyPage);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await (supabase.from("cms_pages" as any).select("*").order("updated_at", { ascending: false }) as any);
    if (error) toast.error(error.message); else setPages((data ?? []) as PageRecord[]);
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);
  const visible = useMemo(() => pages.filter((p) => `${p.title} ${p.slug} ${p.status}`.toLowerCase().includes(search.toLowerCase())), [pages, search]);
  const edit = (page: PageRecord) => { setSelected(page); setForm(page); };
  const newPage = () => { setSelected(null); setForm(emptyPage); };
  const set = (key: keyof typeof form, value: string | null) => setForm((current) => ({ ...current, [key]: value }));

  async function save() {
    if (!canEdit || !user || !form.title.trim() || !form.slug.trim()) { toast.error("Title and slug are required"); return; }
    setSaving(true);
    const payload = { ...form, slug: form.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, ""), created_by: selected?.id ? undefined : user.id, updated_by: user.id, published_at: form.status === "published" ? new Date().toISOString() : null };
    const query = selected ? (supabase.from("cms_pages" as any).update(payload).eq("id", selected.id) as any) : (supabase.from("cms_pages" as any).insert(payload) as any);
    const { data, error } = await query.select().single();
    if (error) toast.error(error.message); else { toast.success("Page saved"); await logActivity(selected ? "updated_page" : "created_page", "page", data.id, { status: form.status }); setSelected(data); setForm(data); await load(); }
    setSaving(false);
  }
  async function remove() { if (!selected || !canDelete || !confirm("Delete this page permanently?")) return; const { error } = await (supabase.from("cms_pages" as any).delete().eq("id", selected.id) as any); if (error) toast.error(error.message); else { toast.success("Page deleted"); await logActivity("deleted_page", "page", selected.id); newPage(); await load(); } }
  async function duplicate() { if (!selected || !user) return; const copy = { ...form, id: undefined, slug: `${form.slug}-copy`, title: `${form.title} copy`, status: "draft", created_by: user.id, updated_by: user.id }; const { error } = await (supabase.from("cms_pages" as any).insert(copy) as any); if (error) toast.error(error.message); else { toast.success("Draft duplicated"); await load(); } }

  return <div className="space-y-6">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-3xl font-bold tracking-tight">Website Pages</h1><p className="text-sm text-muted-foreground">Create, edit, preview, and publish page content without touching code.</p></div><Button onClick={newPage}><Plus className="mr-2 h-4 w-4" />New page</Button></div>
    <div className="grid min-w-0 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <Card><CardHeader><CardTitle className="text-base">Pages</CardTitle><div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input className="pl-8" placeholder="Search title or slug" value={search} onChange={(e) => setSearch(e.target.value)} /></div></CardHeader><CardContent className="space-y-2">{loading ? <p className="text-sm text-muted-foreground">Loading…</p> : visible.length === 0 ? <p className="text-sm text-muted-foreground">No pages yet.</p> : visible.map((page) => <button key={page.id} type="button" onClick={() => edit(page)} className={`w-full rounded-md border p-3 text-left transition hover:border-primary ${selected?.id === page.id ? "border-primary bg-muted" : "border-border"}`}><div className="font-medium">{page.title}</div><div className="mt-1 text-xs text-muted-foreground">/{page.slug} · {page.status}</div></button>)}</CardContent></Card>
      <Card className="min-w-0 overflow-hidden"><CardHeader className="flex-row items-center justify-between"><CardTitle className="text-base">{selected ? "Edit page" : "New page"}</CardTitle>{selected && <Button variant="ghost" size="icon" onClick={newPage}><X className="h-4 w-4" /></Button>}</CardHeader><CardContent className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2"><div className="space-y-1.5"><Label>Title</Label><Input value={form.title} disabled={!canEdit} onChange={(e) => set("title", e.target.value)} /></div><div className="space-y-1.5"><Label>Slug</Label><Input value={form.slug} disabled={!canEdit} onChange={(e) => set("slug", e.target.value)} placeholder="about-us" /></div></div>
        <div className="space-y-1.5"><Label>Excerpt</Label><Textarea rows={2} value={form.excerpt ?? ""} disabled={!canEdit} onChange={(e) => set("excerpt", e.target.value)} /></div>
        <div className="space-y-1.5"><Label>Content</Label><RichTextEditor initialValue={form.content_html} theme="system" disabled={!canEdit} onChange={(html) => set("content_html", html)} /></div>
        <div className="grid gap-4 md:grid-cols-3"><div className="space-y-1.5"><Label>Status</Label><Select disabled={!canEdit} value={form.status} onValueChange={(v) => set("status", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="scheduled">Scheduled</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="archived">Archived</SelectItem></SelectContent></Select></div><div className="space-y-1.5"><Label>Schedule time</Label><Input type="datetime-local" disabled={!canEdit} value={form.scheduled_for ? form.scheduled_for.slice(0, 16) : ""} onChange={(e) => set("scheduled_for", e.target.value ? new Date(e.target.value).toISOString() : null)} /></div><div className="space-y-1.5"><Label>Canonical URL</Label><Input disabled={!canEdit} value={form.canonical_url ?? ""} onChange={(e) => set("canonical_url", e.target.value)} /></div></div>
        <div className="grid gap-4 md:grid-cols-2"><div className="space-y-1.5"><Label>SEO title</Label><Input disabled={!canEdit} value={form.meta_title ?? ""} onChange={(e) => set("meta_title", e.target.value)} /></div><div className="space-y-1.5"><Label>Meta description</Label><Textarea rows={2} disabled={!canEdit} value={form.meta_description ?? ""} onChange={(e) => set("meta_description", e.target.value)} /></div></div>
        <div className="flex flex-wrap gap-2"><Button disabled={!canEdit || saving} onClick={save}><Save className="mr-2 h-4 w-4" />{saving ? "Saving…" : "Save page"}</Button>{selected && <><Button variant="outline" onClick={duplicate}><Copy className="mr-2 h-4 w-4" />Duplicate</Button><Button variant="outline" onClick={() => window.open(`/page/${selected.slug}`, "_blank")}><Eye className="mr-2 h-4 w-4" />Preview</Button>{canDelete && <Button variant="destructive" onClick={remove}><Trash2 className="mr-2 h-4 w-4" />Delete</Button>}</>}</div>
      </CardContent></Card>
    </div>
  </div>;
}
