import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { logActivity, slugify } from "@/lib/admin-utils";

export const Route = createFileRoute("/admin/authors")({ component: AuthorsList });

function AuthorsList() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: authors, isLoading } = useQuery({
    queryKey: ["admin-authors"],
    queryFn: async () => {
      const { data } = await supabase.from("cms_authors").select("*").order("name");
      return data ?? [];
    },
  });

  const create = async () => {
    const name = prompt("Author name");
    if (!name) return;
    const { data, error } = await supabase.from("cms_authors").insert({ name, slug: slugify(name), role: "Contributor" }).select("id").single();
    if (error) { toast.error(error.message); return; }
    await logActivity("created", "author", data.id);
    navigate({ to: "/admin/authors/$id", params: { id: data.id } });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this author? Posts will keep referencing the ID until reassigned.")) return;
    const { error } = await supabase.from("cms_authors").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    await logActivity("deleted", "author", id);
    qc.invalidateQueries({ queryKey: ["admin-authors"] });
    toast.success("Deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Authors</h1>
          <p className="text-sm text-muted-foreground">Medical reviewers, writers and contributors</p>
        </div>
        <Button onClick={create}><Plus className="mr-2 h-4 w-4" />New author</Button>
      </div>

      <Card>
        {isLoading ? <div className="p-8 text-center text-sm text-muted-foreground">Loading...</div> :
         authors?.length === 0 ? <div className="p-8 text-center text-sm text-muted-foreground">No authors yet.</div> :
         <div className="divide-y divide-border">
           {authors?.map((a) => (
             <div key={a.id} className="flex items-center gap-4 p-4 hover:bg-accent/40">
               <Link to="/admin/authors/$id" params={{ id: a.id }} className="flex flex-1 items-center gap-4 min-w-0">
                 {a.image_url ? <img src={a.image_url} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" /> : <div className="h-12 w-12 shrink-0 rounded-full bg-muted" />}
                 <div className="min-w-0">
                   <div className="font-medium">{a.name}</div>
                   <div className="truncate text-xs text-muted-foreground">{a.role} · /{a.slug}</div>
                 </div>
               </Link>
               <button onClick={() => del(a.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
             </div>
           ))}
         </div>
        }
      </Card>
    </div>
  );
}
