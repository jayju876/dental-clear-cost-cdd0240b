import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth, type AppRole } from "@/hooks/use-auth";
import { logActivity } from "@/lib/admin-utils";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/users")({ component: UsersAdmin });

const ROLES: AppRole[] = ["super_admin", "admin", "content_editor", "seo_manager"];

function UsersAdmin() {
  const qc = useQueryClient();
  const { hasRole } = useAuth();
  const isSuper = hasRole("super_admin");

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data: profiles } = await supabase.from("profiles").select("id,email,full_name,created_at").order("created_at", { ascending: false });
      const { data: roles } = await supabase.from("user_roles").select("user_id,role");
      const byUser = new Map<string, AppRole[]>();
      (roles ?? []).forEach((r) => {
        const arr = byUser.get(r.user_id) ?? [];
        arr.push(r.role as AppRole);
        byUser.set(r.user_id, arr);
      });
      return (profiles ?? []).map((p) => ({ ...p, roles: byUser.get(p.id) ?? [] }));
    },
  });

  const toggle = async (userId: string, role: AppRole, has: boolean) => {
    if (!isSuper) { toast.error("Only super admins can change roles"); return; }
    if (has) {
      await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role);
    } else {
      await supabase.from("user_roles").insert({ user_id: userId, role });
    }
    await logActivity(has ? "removed_role" : "granted_role", "user", userId, { role });
    qc.invalidateQueries({ queryKey: ["admin-users"] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users &amp; Roles</h1>
        <p className="text-sm text-muted-foreground">Anyone who signs up at /admin appears here. Assign roles to grant access.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="h-4 w-4" />Role permissions</CardTitle>
          <CardDescription>
            <strong>super_admin</strong>: full access, manages users. <strong>admin</strong>: manages all content. <strong>content_editor</strong>: creates/edits posts. <strong>seo_manager</strong>: edits SEO and post metadata.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        {isLoading ? <div className="p-8 text-center text-sm text-muted-foreground">Loading...</div> :
         <div className="divide-y divide-border">
           {rows?.map((r) => (
             <div key={r.id} className="flex flex-wrap items-center gap-3 p-4">
               <div className="min-w-[200px] flex-1">
                 <div className="font-medium">{r.full_name || r.email}</div>
                 <div className="text-xs text-muted-foreground">{r.email}</div>
               </div>
               <div className="flex flex-wrap gap-1.5">
                 {ROLES.map((role) => {
                   const has = r.roles.includes(role);
                   return (
                     <Button key={role} size="sm" variant={has ? "default" : "outline"} disabled={!isSuper} onClick={() => toggle(r.id, role, has)} className="text-xs">
                       {role.replace("_", " ")}
                     </Button>
                   );
                 })}
               </div>
             </div>
           ))}
         </div>
        }
      </Card>
    </div>
  );
}
