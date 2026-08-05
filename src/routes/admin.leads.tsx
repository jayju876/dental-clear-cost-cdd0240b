import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Search, Trash2, Download, Eye, Inbox } from "lucide-react";
import { toast } from "sonner";
import { logActivity } from "@/lib/admin-utils";

export const Route = createFileRoute("/admin/leads")({ component: LeadsPage });

type LeadStatus = "new" | "contacted" | "closed";
type Lead = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: LeadStatus;
  source: string | null;
  created_at: string;
};

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-primary/10 text-primary border-primary/20",
  contacted: "bg-secondary/15 text-secondary border-secondary/25",
  closed: "bg-muted text-muted-foreground border-border",
};

function fmt(dt: string) {
  return new Date(dt).toLocaleString(undefined, {
    year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit",
  });
}

function LeadsPage() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | LeadStatus>("all");
  const [active, setActive] = useState<Lead | null>(null);

  const { data: leads, isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Lead[];
    },
  });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (leads ?? []).filter((l) => {
      if (status !== "all" && l.status !== status) return false;
      if (!term) return true;
      return [l.full_name, l.email, l.phone, l.subject, l.message]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term));
    });
  }, [leads, q, status]);

  const counts = useMemo(() => {
    const all = leads ?? [];
    return {
      total: all.length,
      new: all.filter((l) => l.status === "new").length,
      contacted: all.filter((l) => l.status === "contacted").length,
      closed: all.filter((l) => l.status === "closed").length,
    };
  }, [leads]);

  const updateStatus = async (id: string, next: LeadStatus) => {
    const { error } = await supabase.from("leads").update({ status: next }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    await logActivity("updated", "lead", id, { status: next });
    qc.invalidateQueries({ queryKey: ["admin-leads"] });
    setActive((cur) => (cur && cur.id === id ? { ...cur, status: next } : cur));
    toast.success(`Marked as ${next}`);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    await logActivity("deleted", "lead", id);
    qc.invalidateQueries({ queryKey: ["admin-leads"] });
    setActive(null);
    toast.success("Lead deleted");
  };

  const exportCsv = () => {
    const rows = filtered;
    if (rows.length === 0) { toast.error("No leads to export"); return; }
    const headers = ["Full Name", "Email", "Phone", "Subject", "Message", "Status", "Submitted"];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      headers.map(esc).join(","),
      ...rows.map((l) => [l.full_name, l.email, l.phone, l.subject, l.message, l.status, fmt(l.created_at)].map(esc).join(",")),
    ].join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${rows.length} leads`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="text-sm text-muted-foreground">Contact form submissions, stored securely in your database.</p>
        </div>
        <Button variant="outline" onClick={exportCsv}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: "Total", value: counts.total },
          { label: "New", value: counts.new },
          { label: "Contacted", value: counts.contacted },
          { label: "Closed", value: counts.closed },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-2xl font-semibold">{s.value}</div>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search name, email, phone, subject, message…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <SelectTrigger className="w-[170px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="grid place-items-center py-16"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : filtered.length === 0 ? (
          <div className="grid place-items-center gap-2 py-16 text-center text-muted-foreground">
            <Inbox className="h-8 w-8" />
            <p className="text-sm">No leads found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{l.full_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.phone || "—"}</td>
                    <td className="max-w-[220px] truncate px-4 py-3 text-muted-foreground">{l.subject || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{fmt(l.created_at)}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={STATUS_STYLES[l.status]}>{l.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Select value={l.status} onValueChange={(v) => updateStatus(l.id, v as LeadStatus)}>
                          <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="icon" variant="ghost" onClick={() => setActive(l)} aria-label="View lead"><Eye className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => remove(l.id)} aria-label="Delete lead"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle>{active.full_name}</DialogTitle>
                <DialogDescription>{fmt(active.created_at)} · {active.source || "contact_form"}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <Field label="Email" value={active.email} />
                <Field label="Phone" value={active.phone || "—"} />
                <Field label="Subject" value={active.subject || "—"} />
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Message</div>
                  <p className="mt-1 whitespace-pre-wrap rounded-md bg-muted/50 p-3">{active.message}</p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Status</span>
                  <Select value={active.status} onValueChange={(v) => updateStatus(active.id, v as LeadStatus)}>
                    <SelectTrigger className="h-8 w-[140px] text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline" className="ml-auto" onClick={() => remove(active.id)}>
                    <Trash2 className="mr-2 h-3.5 w-3.5" />Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-0.5 break-all font-medium">{value}</div>
    </div>
  );
}
