import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin/notifications")({ component: NotificationsAdmin });

type Notification = { id: string; type: string; title: string; body: string | null; read_at: string | null; created_at: string };

function NotificationsAdmin() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  async function load() { setLoading(true); const { data, error } = await supabase.from("notifications" as any).select("id,type,title,body,read_at,created_at").order("created_at", { ascending: false }).limit(50); if (error) toast.error(error.message); else setItems((data ?? []) as unknown as Notification[]); setLoading(false); }
  useEffect(() => { void load(); }, []);
  async function markRead(id: string) { const { error } = await (supabase.from("notifications" as any).update({ read_at: new Date().toISOString() }).eq("id", id) as any); if (error) toast.error(error.message); else setItems((current) => current.map((item) => item.id === id ? { ...item, read_at: new Date().toISOString() } : item)); }
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold tracking-tight">Notifications</h1><p className="text-sm text-muted-foreground">Review new leads, users, failed logins, and saved drafts.</p></div><Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><Bell className="h-4 w-4" />Recent notifications</CardTitle></CardHeader><CardContent className="divide-y divide-border p-0">{loading ? <p className="p-6 text-sm text-muted-foreground">Loading…</p> : items.length === 0 ? <p className="p-6 text-sm text-muted-foreground">No notifications yet.</p> : items.map((item) => <div key={item.id} className={`flex items-start gap-4 p-4 ${item.read_at ? "opacity-60" : "bg-muted/30"}`}><div className="mt-1 rounded-full bg-primary/10 p-2 text-primary"><Bell className="h-4 w-4" /></div><div className="min-w-0 flex-1"><div className="font-medium">{item.title}</div>{item.body && <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>}<div className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">{item.type.replaceAll("_", " ")} · {new Date(item.created_at).toLocaleString()}</div></div>{!item.read_at && <Button size="sm" variant="outline" onClick={() => markRead(item.id)}><Check className="mr-2 h-4 w-4" />Mark read</Button>}</div>)}</CardContent></Card></div>;
}
