import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Copy, Trash2, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { logActivity } from "@/lib/admin-utils";

export const Route = createFileRoute("/admin/media")({ component: MediaLibrary });

function MediaLibrary() {
  const qc = useQueryClient();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [q, setQ] = useState("");

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-media"],
    queryFn: async () => {
      const { data } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const onUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const { data: { user } } = await supabase.auth.getUser();
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("cms-media").upload(path, file, { contentType: file.type });
      if (upErr) { toast.error(upErr.message); continue; }
      const { data: { publicUrl } } = supabase.storage.from("cms-media").getPublicUrl(path);
      const { error: insErr } = await supabase.from("media_assets").insert({
        filename: file.name, storage_path: path, public_url: publicUrl,
        mime_type: file.type, size_bytes: file.size, uploaded_by: user?.id ?? null,
      });
      if (insErr) toast.error(insErr.message);
      else await logActivity("uploaded", "media", undefined, { filename: file.name });
    }
    setUploading(false);
    qc.invalidateQueries({ queryKey: ["admin-media"] });
    toast.success("Upload complete");
  };

  const del = async (id: string, path: string) => {
    if (!confirm("Delete this file?")) return;
    await supabase.storage.from("cms-media").remove([path]);
    await supabase.from("media_assets").delete().eq("id", id);
    await logActivity("deleted", "media", id);
    qc.invalidateQueries({ queryKey: ["admin-media"] });
  };

  const copy = (url: string) => { navigator.clipboard.writeText(url); toast.success("URL copied"); };

  const filtered = (items ?? []).filter((m) => !q || m.filename.toLowerCase().includes(q.toLowerCase()));

  return (
    <div
      className="space-y-6"
      onDragOver={(e) => { e.preventDefault(); }}
      onDrop={(e) => { e.preventDefault(); onUpload(e.dataTransfer.files); }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-sm text-muted-foreground">Drag &amp; drop images anywhere, or click upload. Click an image to copy its URL.</p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Search files..." value={q} onChange={(e) => setQ(e.target.value)} className="w-48" />
          <input ref={fileInput} type="file" multiple accept="image/*" className="hidden" onChange={(e) => onUpload(e.target.files)} />
          <Button onClick={() => fileInput.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}Upload
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">Loading...</Card>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center border-2 border-dashed"><Upload className="mx-auto h-10 w-10 text-muted-foreground" /><p className="mt-2 text-sm text-muted-foreground">Drop image files anywhere on this page to upload.</p></Card>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((m) => (
            <Card key={m.id} className="group relative overflow-hidden">
              <img src={m.public_url} alt={m.alt_text ?? ""} className="aspect-square w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                <span className="truncate text-xs text-white">{m.filename}</span>
                <div className="flex gap-1">
                  <button onClick={() => copy(m.public_url)} className="rounded bg-white/20 p-1 text-white hover:bg-white/30"><Copy className="h-3 w-3" /></button>
                  <button onClick={() => del(m.id, m.storage_path)} className="rounded bg-white/20 p-1 text-white hover:bg-red-500"><Trash2 className="h-3 w-3" /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

