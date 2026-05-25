import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { slugify, readingTime, logActivity } from "@/lib/admin-utils";

export const Route = createFileRoute("/admin/posts/$id")({ component: PostEditor });

type PostForm = {
  title: string;
  slug: string;
  excerpt: string;
  content_md: string;
  featured_image: string;
  author_id: string | null;
  reviewer_id: string | null;
  status: "draft" | "published" | "scheduled";
  published_at: string | null;
  scheduled_for: string | null;
  categories: string[];
  tags: string[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  robots: string;
};

const empty: PostForm = {
  title: "", slug: "", excerpt: "", content_md: "", featured_image: "",
  author_id: null, reviewer_id: null, status: "draft",
  published_at: null, scheduled_for: null, categories: [], tags: [],
  meta_title: "", meta_description: "", meta_keywords: "", canonical_url: "",
  og_title: "", og_description: "", og_image: "", robots: "index,follow",
};

function PostEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<PostForm>(empty);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: authors } = useQuery({
    queryKey: ["admin-authors-min"],
    queryFn: async () => {
      const { data } = await supabase.from("cms_authors").select("id,name").order("name");
      return data ?? [];
    },
  });

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
      if (data) {
        setForm({
          title: data.title, slug: data.slug, excerpt: data.excerpt ?? "",
          content_md: data.content_md ?? "", featured_image: data.featured_image ?? "",
          author_id: data.author_id, reviewer_id: data.reviewer_id,
          status: data.status, published_at: data.published_at,
          scheduled_for: data.scheduled_for,
          categories: data.categories ?? [], tags: data.tags ?? [],
          meta_title: data.meta_title ?? "", meta_description: data.meta_description ?? "",
          meta_keywords: data.meta_keywords ?? "", canonical_url: data.canonical_url ?? "",
          og_title: data.og_title ?? "", og_description: data.og_description ?? "",
          og_image: data.og_image ?? "", robots: data.robots ?? "index,follow",
        });
      }
      setLoading(false);
    })();
  }, [id]);

  const update = (patch: Partial<PostForm>) => setForm((f) => ({ ...f, ...patch }));

  const save = async (publish?: boolean) => {
    setSaving(true);
    const status = publish ? "published" : form.status;
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      status,
      reading_time: readingTime(form.content_md),
      published_at: status === "published" && !form.published_at ? new Date().toISOString() : form.published_at,
    };
    const { error } = await supabase.from("blog_posts").update(payload).eq("id", id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    await logActivity(publish ? "published" : "updated", "blog_post", id);
    toast.success(publish ? "Post published" : "Saved");
    if (publish) update({ status: "published" });
  };

  if (loading) return <div className="grid place-items-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/admin/posts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />All posts</Link>
        <div className="flex gap-2">
          {form.status === "published" && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent"><Eye className="h-4 w-4" />View</a>
          )}
          <Button variant="outline" onClick={() => save(false)} disabled={saving}><Save className="mr-2 h-4 w-4" />Save draft</Button>
          <Button onClick={() => save(true)} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Publish</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="space-y-4 p-5">
              <Input className="border-0 px-0 text-2xl font-bold shadow-none focus-visible:ring-0" placeholder="Post title" value={form.title} onChange={(e) => update({ title: e.target.value, slug: form.slug || slugify(e.target.value) })} />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>/blog/</span>
                <Input className="h-7 max-w-xs" value={form.slug} onChange={(e) => update({ slug: slugify(e.target.value) })} />
              </div>
              <Textarea placeholder="Excerpt (1–2 sentences shown in listings and meta)" value={form.excerpt} onChange={(e) => update({ excerpt: e.target.value })} rows={2} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Content</CardTitle></CardHeader>
            <CardContent>
              <MarkdownEditor value={form.content_md} onChange={(v) => update({ content_md: v })} placeholder="Write your post in Markdown, or toggle Visual mode..." />
              <p className="mt-2 text-xs text-muted-foreground">{readingTime(form.content_md)} min read · {form.content_md.split(/\s+/).filter(Boolean).length} words</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">SEO &amp; Social</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Meta title <span className="text-muted-foreground">({form.meta_title.length}/60)</span></Label>
                <Input maxLength={70} value={form.meta_title} onChange={(e) => update({ meta_title: e.target.value })} placeholder={form.title} />
              </div>
              <div className="space-y-1.5">
                <Label>Meta description <span className="text-muted-foreground">({form.meta_description.length}/160)</span></Label>
                <Textarea maxLength={180} rows={2} value={form.meta_description} onChange={(e) => update({ meta_description: e.target.value })} placeholder={form.excerpt} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5"><Label>Keywords</Label><Input value={form.meta_keywords} onChange={(e) => update({ meta_keywords: e.target.value })} placeholder="dental implants, cost, ..." /></div>
                <div className="space-y-1.5"><Label>Canonical URL</Label><Input value={form.canonical_url} onChange={(e) => update({ canonical_url: e.target.value })} placeholder="https://..." /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5"><Label>OG Title</Label><Input value={form.og_title} onChange={(e) => update({ og_title: e.target.value })} placeholder={form.meta_title || form.title} /></div>
                <div className="space-y-1.5"><Label>OG Image URL</Label><Input value={form.og_image} onChange={(e) => update({ og_image: e.target.value })} placeholder={form.featured_image} /></div>
              </div>
              <div className="space-y-1.5"><Label>OG Description</Label><Textarea rows={2} value={form.og_description} onChange={(e) => update({ og_description: e.target.value })} placeholder={form.meta_description || form.excerpt} /></div>
              <div className="space-y-1.5"><Label>Robots</Label><Input value={form.robots} onChange={(e) => update({ robots: e.target.value })} /></div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Publish</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => update({ status: v as PostForm["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {form.status === "scheduled" && (
                <div className="space-y-1.5"><Label>Schedule for</Label><Input type="datetime-local" value={form.scheduled_for?.slice(0, 16) ?? ""} onChange={(e) => update({ scheduled_for: new Date(e.target.value).toISOString() })} /></div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Author</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Select value={form.author_id ?? "_none"} onValueChange={(v) => update({ author_id: v === "_none" ? null : v })}>
                <SelectTrigger><SelectValue placeholder="Choose author" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="_none">— None —</SelectItem>
                  {authors?.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Label className="text-xs">Medically reviewed by</Label>
              <Select value={form.reviewer_id ?? "_none"} onValueChange={(v) => update({ reviewer_id: v === "_none" ? null : v })}>
                <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="_none">— None —</SelectItem>
                  {authors?.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Featured image</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {form.featured_image && <img src={form.featured_image} alt="" className="w-full rounded-md object-cover" />}
              <Input placeholder="Paste image URL or upload in Media" value={form.featured_image} onChange={(e) => update({ featured_image: e.target.value })} />
              <Link to="/admin/media" className="text-xs text-primary hover:underline">Browse media library →</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Taxonomy</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5"><Label>Categories (comma separated)</Label><Input value={form.categories.join(", ")} onChange={(e) => update({ categories: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></div>
              <div className="space-y-1.5"><Label>Tags (comma separated)</Label><Input value={form.tags.join(", ")} onChange={(e) => update({ tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-2 pb-8">
        <Button variant="outline" onClick={() => navigate({ to: "/admin/posts" })}>Cancel</Button>
        <Button variant="outline" onClick={() => save(false)} disabled={saving}><Save className="mr-2 h-4 w-4" />Save</Button>
        <Button onClick={() => save(true)} disabled={saving}>Publish</Button>
      </div>
    </div>
  );
}
