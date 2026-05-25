import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, UserCog, Image as ImageIcon, Activity, TrendingUp, Edit3 } from "lucide-react";
import { formatDistanceToNow } from "@/lib/admin-utils";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const [posts, authors, media, drafts] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("cms_authors").select("id", { count: "exact", head: true }),
        supabase.from("media_assets").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
      ]);
      return { posts: posts.count ?? 0, authors: authors.count ?? 0, media: media.count ?? 0, drafts: drafts.count ?? 0 };
    },
  });

  const { data: recent } = useQuery({
    queryKey: ["admin", "recent-posts"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("id,title,slug,status,updated_at").order("updated_at", { ascending: false }).limit(5);
      return data ?? [];
    },
  });

  const { data: activity } = useQuery({
    queryKey: ["admin", "recent-activity"],
    queryFn: async () => {
      const { data } = await supabase.from("activity_log").select("id,action,entity_type,entity_id,created_at").order("created_at", { ascending: false }).limit(8);
      return data ?? [];
    },
  });

  const cards = [
    { label: "Published Posts", value: stats?.posts ?? "—", icon: FileText, color: "text-blue-600" },
    { label: "Drafts", value: stats?.drafts ?? "—", icon: Edit3, color: "text-amber-600" },
    { label: "Authors", value: stats?.authors ?? "—", icon: UserCog, color: "text-emerald-600" },
    { label: "Media Files", value: stats?.media ?? "—", icon: ImageIcon, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your content and activity</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`rounded-lg bg-muted p-2 ${c.color}`}><c.icon className="h-5 w-5" /></div>
              <div>
                <div className="text-2xl font-bold">{c.value}</div>
                <div className="text-xs text-muted-foreground">{c.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4" />Recent Posts</CardTitle>
            <CardDescription>Latest content updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {recent?.length ? recent.map((p) => (
              <Link key={p.id} to="/admin/posts/$id" params={{ id: p.id }} className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-accent">
                <div className="min-w-0">
                  <div className="truncate font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground">/{p.slug}</div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${p.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{p.status}</span>
              </Link>
            )) : <p className="text-sm text-muted-foreground">No posts yet.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Activity className="h-4 w-4" />Recent Activity</CardTitle>
            <CardDescription>Editorial actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {activity?.length ? activity.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-md px-3 py-2 text-sm">
                <div><span className="font-medium">{a.action}</span> <span className="text-muted-foreground">{a.entity_type}</span></div>
                <span className="text-xs text-muted-foreground">{formatDistanceToNow(a.created_at)}</span>
              </div>
            )) : <p className="text-sm text-muted-foreground">No activity yet.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
