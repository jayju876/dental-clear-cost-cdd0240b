import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { logActivity } from "@/lib/admin-utils";

export const Route = createFileRoute("/admin/settings")({ component: Settings });

const DEFAULT_KEYS = ["site_name", "site_description", "logo_url", "primary_color", "contact_email", "social_twitter", "social_facebook", "social_instagram", "google_analytics_id", "google_tag_manager_id", "robots_txt"] as const;

function Settings() {
  const qc = useQueryClient();
  const { hasRole } = useAuth();
  const canEdit = hasRole("super_admin");
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*");
      return data ?? [];
    },
  });

  useEffect(() => {
    const map: Record<string, string> = {};
    DEFAULT_KEYS.forEach((k) => { map[k] = ""; });
    rows?.forEach((r) => { map[r.key] = typeof r.value === "string" ? r.value : JSON.stringify(r.value); });
    setValues(map);
  }, [rows]);

  const save = async () => {
    setSaving(true);
    const upserts = Object.entries(values).map(([key, value]) => ({ key, value: value as never }));
    const { error } = await supabase.from("site_settings").upsert(upserts, { onConflict: "key" });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    await logActivity("updated", "site_settings");
    qc.invalidateQueries({ queryKey: ["site-settings"] });
    toast.success("Settings saved");
  };

  if (isLoading) return <div className="grid place-items-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-sm text-muted-foreground">Global site configuration</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Brand</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5"><Label>Site name</Label><Input disabled={!canEdit} value={values.site_name ?? ""} onChange={(e) => set("site_name", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Site description</Label><Textarea disabled={!canEdit} rows={2} value={values.site_description ?? ""} onChange={(e) => set("site_description", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Logo URL</Label><Input disabled={!canEdit} value={values.logo_url ?? ""} onChange={(e) => set("logo_url", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Primary brand color</Label><Input disabled={!canEdit} value={values.primary_color ?? ""} onChange={(e) => set("primary_color", e.target.value)} placeholder="#1E40AF" /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Contact &amp; Social</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5"><Label>Contact email</Label><Input disabled={!canEdit} type="email" value={values.contact_email ?? ""} onChange={(e) => set("contact_email", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Twitter / X</Label><Input disabled={!canEdit} value={values.social_twitter ?? ""} onChange={(e) => set("social_twitter", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Facebook</Label><Input disabled={!canEdit} value={values.social_facebook ?? ""} onChange={(e) => set("social_facebook", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Instagram</Label><Input disabled={!canEdit} value={values.social_instagram ?? ""} onChange={(e) => set("social_instagram", e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Analytics &amp; Robots</CardTitle>
            <CardDescription>Tracking and crawler controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5"><Label>Google Analytics ID</Label><Input disabled={!canEdit} value={values.google_analytics_id ?? ""} onChange={(e) => set("google_analytics_id", e.target.value)} placeholder="G-XXXXXXXXXX" /></div>
            <div className="space-y-1.5">
              <Label>Google Tag Manager ID</Label>
              <Input disabled={!canEdit} value={values.google_tag_manager_id ?? ""} onChange={(e) => set("google_tag_manager_id", e.target.value.trim())} placeholder="GTM-XXXXXXX" />
              <p className="text-xs text-muted-foreground">Paste your GTM container ID (format: GTM-XXXXXXX). The tag fires on every public page automatically.</p>
            </div>
            <div className="space-y-1.5"><Label>robots.txt</Label><Textarea disabled={!canEdit} rows={6} className="font-mono text-xs" value={values.robots_txt ?? ""} onChange={(e) => set("robots_txt", e.target.value)} placeholder="User-agent: *\nAllow: /" /></div>
          </CardContent>
        </Card>
      </div>

      {canEdit && (
        <div className="flex justify-end">
          <Button onClick={save} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}<Save className="mr-2 h-4 w-4" />Save all settings</Button>
        </div>
      )}
    </div>
  );
}
