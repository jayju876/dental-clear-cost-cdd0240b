import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/blog/edit/$slug")({
  beforeLoad: async ({ params }) => {
    const { data } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", params.slug)
      .maybeSingle();
    if (!data) throw redirect({ to: "/admin/posts" });
    throw redirect({ to: "/admin/posts/$id", params: { id: data.id } });
  },
  component: () => null,
});
