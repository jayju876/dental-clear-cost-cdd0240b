import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { logActivity } from "@/lib/admin-utils";

export const Route = createFileRoute("/admin/blog/new")({
  beforeLoad: async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert({ title: "Untitled post", slug: `untitled-${Date.now()}`, status: "draft", content_md: "" })
      .select("id")
      .single();
    if (error || !data) throw redirect({ to: "/admin/posts" });
    await logActivity("created", "blog_post", data.id);
    throw redirect({ to: "/admin/posts/$id", params: { id: data.id } });
  },
  component: () => null,
});
