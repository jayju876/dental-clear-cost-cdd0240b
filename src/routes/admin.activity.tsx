import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "@/lib/admin-utils";

export const Route = createFileRoute("/admin/activity")({ component: ActivityLog });

function ActivityLog() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-activity"],
    queryFn: async () => {
      const { data } = await supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(200);
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
        <p className="text-sm text-muted-foreground">Last 200 editorial actions</p>
      </div>
      <Card>
        {isLoading ? <div className="p-8 text-center text-sm text-muted-foreground">Loading...</div> :
         data?.length === 0 ? <div className="p-8 text-center text-sm text-muted-foreground">No activity yet.</div> :
         <div className="divide-y divide-border">
           {data?.map((a) => (
             <div key={a.id} className="flex items-center justify-between gap-4 p-4 text-sm">
               <div>
                 <span className="font-medium capitalize">{a.action.replace("_", " ")}</span>{" "}
                 <span className="text-muted-foreground">{a.entity_type}</span>
                 {a.entity_id && <span className="ml-2 font-mono text-xs text-muted-foreground">{a.entity_id.slice(0, 8)}</span>}
               </div>
               <span className="text-xs text-muted-foreground">{formatDistanceToNow(a.created_at)}</span>
             </div>
           ))}
         </div>
        }
      </Card>
    </div>
  );
}
