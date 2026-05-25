import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, Trash2, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow, logActivity } from "@/lib/admin-utils";

export const Route = createFileRoute("/admin/posts")({ component: PostsList });

function PostsList() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft" | "scheduled">("all");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id,title,slug,status,updated_at,published_at,author_id,featured_image,categories")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = (posts ?? []).filter((p) => {
    if (filter !== "all" && p.status !== filter) return false;
    if (q && !p.title.toLowerCase().includes(q.toLowerCase()) && !p.slug.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const newPost = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert({ title: "Untitled post", slug: `untitled-${Date.now()}`, status: "draft", content_md: "" })
      .select("id")
      .single();
    if (error) { toast.error(error.message); return; }
    await logActivity("created", "blog_post", data.id);
    navigate({ to: "/admin/posts/$id", params: { id: data.id } });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    await logActivity("deleted", "blog_post", id);
    toast.success("Post deleted");
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">Manage all blog content</p>
        </div>
        <Button onClick={newPost}><Plus className="mr-2 h-4 w-4" />New post</Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search posts..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          {(["all", "published", "draft", "scheduled"] as const).map((f) => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="capitalize">{f}</Button>
          ))}
        </div>
      </Card>

      <Card>
        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No posts found.</div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-accent/40">
                <Link to="/admin/posts/$id" params={{ id: p.id }} className="flex flex-1 items-center gap-4 min-w-0">
                  {p.featured_image ? (
                    <img src={p.featured_image} alt="" className="h-12 w-16 shrink-0 rounded object-cover" />
                  ) : (
                    <div className="h-12 w-16 shrink-0 rounded bg-muted" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{p.title}</div>
                    <div className="truncate text-xs text-muted-foreground">/{p.slug} · updated {formatDistanceToNow(p.updated_at)}</div>
                  </div>
                </Link>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                  p.status === "published" ? "bg-emerald-100 text-emerald-700" :
                  p.status === "scheduled" ? "bg-blue-100 text-blue-700" :
                  p.status === "archived" ? "bg-gray-100 text-gray-700" :
                  "bg-amber-100 text-amber-700"
                }`}>{p.status}</span>
                {p.status === "published" && (
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground"><ExternalLink className="h-4 w-4" /></a>
                )}
                <button onClick={() => del(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
