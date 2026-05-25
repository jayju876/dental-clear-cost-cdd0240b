import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { logActivity, slugify } from "@/lib/admin-utils";

export const Route = createFileRoute("/admin/authors/$id")({ component: AuthorEditor });

type Form = {
  name: string; slug: string; role: string; bio: string; long_bio: string;
  image_url: string; email: string; linkedin: string; twitter: string;
  years_experience: number | null; credentials: string[]; expertise: string[];
};

const empty: Form = { name: "", slug: "", role: "", bio: "", long_bio: "", image_url: "", email: "", linkedin: "", twitter: "", years_experience: null, credentials: [], expertise: [] };

function AuthorEditor() {
  const { id } = Route.useParams();
  const [form, setForm] = useState<Form>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("cms_authors").select("*").eq("id", id).maybeSingle();
      if (data) setForm({
        name: data.name, slug: data.slug, role: data.role, bio: data.bio ?? "",
        long_bio: data.long_bio ?? "", image_url: data.image_url ?? "",
        email: data.email ?? "", linkedin: data.linkedin ?? "", twitter: data.twitter ?? "",
        years_experience: data.years_experience, credentials: data.credentials ?? [], expertise: data.expertise ?? [],
      });
      setLoading(false);
    })();
  }, [id]);

  const upd = (p: Partial<Form>) => setForm((f) => ({ ...f, ...p }));

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("cms_authors").update({ ...form, slug: form.slug || slugify(form.name) }).eq("id", id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    await logActivity("updated", "author", id);
    toast.success("Saved");
  };

  if (loading) return <div className="grid place-items-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/admin/authors" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />All authors</Link>
        <Button onClick={save} disabled={saving}><Save className="mr-2 h-4 w-4" />Save</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5"><Label>Name</Label><Input value={form.name} onChange={(e) => upd({ name: e.target.value, slug: form.slug || slugify(e.target.value) })} /></div>
              <div className="space-y-1.5"><Label>Slug</Label><Input value={form.slug} onChange={(e) => upd({ slug: slugify(e.target.value) })} /></div>
            </div>
            <div className="space-y-1.5"><Label>Role / title</Label><Input value={form.role} onChange={(e) => upd({ role: e.target.value })} placeholder="e.g. Implant Specialist, DDS" /></div>
            <div className="space-y-1.5"><Label>Short bio</Label><Textarea rows={2} value={form.bio} onChange={(e) => upd({ bio: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Long bio</Label><Textarea rows={5} value={form.long_bio} onChange={(e) => upd({ long_bio: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Credentials (comma separated)</Label><Input value={form.credentials.join(", ")} onChange={(e) => upd({ credentials: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></div>
            <div className="space-y-1.5"><Label>Expertise (comma separated)</Label><Input value={form.expertise.join(", ")} onChange={(e) => upd({ expertise: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Photo</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {form.image_url && <img src={form.image_url} alt="" className="aspect-square w-full rounded-md object-cover" />}
              <Input placeholder="Image URL" value={form.image_url} onChange={(e) => upd({ image_url: e.target.value })} />
              <Link to="/admin/media" className="text-xs text-primary hover:underline">Browse media →</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Contact &amp; Social</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => upd({ email: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>LinkedIn</Label><Input value={form.linkedin} onChange={(e) => upd({ linkedin: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Twitter / X</Label><Input value={form.twitter} onChange={(e) => upd({ twitter: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Years experience</Label><Input type="number" value={form.years_experience ?? ""} onChange={(e) => upd({ years_experience: e.target.value ? parseInt(e.target.value) : null })} /></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
