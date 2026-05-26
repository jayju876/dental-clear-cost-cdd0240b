import { useEffect, useMemo, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Youtube from "@tiptap/extension-youtube";
import { marked } from "marked";
import TurndownService from "turndown";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SITE_PAGES } from "@/lib/site-pages";
import { Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Link as LinkIcon, Image as ImgIcon, Code, Table as TableIcon, Youtube as YtIcon, HelpCircle, MousePointerClick, Link2 } from "lucide-react";

const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-" });
td.keep(["table", "thead", "tbody", "tr", "th", "td", "iframe", "div", "details", "summary"]);

export function MarkdownEditor({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [mode, setMode] = useState<"markdown" | "visual">("visual");
  const [md, setMd] = useState(value);
  const [linkOpen, setLinkOpen] = useState(false);

  useEffect(() => setMd(value), [value]);

  const initialHtml = useMemo(() => (mode === "visual" ? (marked.parse(md) as string) : ""), [mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
        Image,
        Placeholder.configure({ placeholder: placeholder ?? "Write your content..." }),
        Table.configure({ resizable: true, HTMLAttributes: { class: "border-collapse w-full my-4" } }),
        TableRow,
        TableHeader.configure({ HTMLAttributes: { class: "border border-border bg-muted px-3 py-2 text-left font-semibold" } }),
        TableCell.configure({ HTMLAttributes: { class: "border border-border px-3 py-2" } }),
        Youtube.configure({ width: 640, height: 360, HTMLAttributes: { class: "my-4 aspect-video w-full rounded-md" } }),
      ],
      content: initialHtml,
      immediatelyRender: false,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        const newMd = td.turndown(html);
        setMd(newMd);
        onChange(newMd);
      },
      editorProps: {
        attributes: { class: "prose prose-sm md:prose-base max-w-none min-h-[500px] focus:outline-none p-4" },
      },
    },
    [mode],
  );

  const switchTo = (next: "markdown" | "visual") => {
    if (next === mode) return;
    if (mode === "visual" && editor) {
      const html = editor.getHTML();
      const newMd = td.turndown(html);
      setMd(newMd);
      onChange(newMd);
    }
    setMode(next);
  };

  const insertYoutube = () => {
    if (!editor) return;
    const url = prompt("YouTube URL");
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  const insertFaq = () => {
    if (!editor) return;
    const q = prompt("FAQ question");
    if (!q) return;
    const a = prompt("FAQ answer") ?? "";
    editor.chain().focus().insertContent(`<details class="faq-block rounded-md border border-border p-3 my-2"><summary class="font-semibold cursor-pointer">${q}</summary><p>${a}</p></details>`).run();
  };

  const insertCta = () => {
    if (!editor) return;
    const text = prompt("Button text", "Calculate my cost") ?? "Calculate my cost";
    const href = prompt("Button link", "/calculator") ?? "#";
    editor.chain().focus().insertContent(`<p><a href="${href}" class="cta-button inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 font-medium no-underline">${text}</a></p>`).run();
  };

  const uploadImage = async (file: File) => {
    if (!editor) return;
    const path = `uploads/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("cms-media").upload(path, file, { contentType: file.type });
    if (error) return;
    const { data: { publicUrl } } = supabase.storage.from("cms-media").getPublicUrl(path);
    editor.chain().focus().setImage({ src: publicUrl, alt: file.name }).run();
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-2 border-b border-border p-2">
        <div className="flex gap-1">
          <Button type="button" size="sm" variant={mode === "visual" ? "default" : "ghost"} onClick={() => switchTo("visual")}>Visual</Button>
          <Button type="button" size="sm" variant={mode === "markdown" ? "default" : "ghost"} onClick={() => switchTo("markdown")}>Markdown</Button>
        </div>
        {mode === "visual" && editor && (
          <div className="flex flex-wrap gap-0.5">
            <ToolbarBtn title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic className="h-4 w-4" /></ToolbarBtn>
            <Divider />
            <ToolbarBtn title="H1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}><Heading1 className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn title="H2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn title="H3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}><Heading3 className="h-4 w-4" /></ToolbarBtn>
            <Divider />
            <ToolbarBtn title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn title="Quote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn title="Code" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}><Code className="h-4 w-4" /></ToolbarBtn>
            <Divider />
            <ToolbarBtn title="Insert table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><TableIcon className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn title="YouTube embed" onClick={insertYoutube}><YtIcon className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn title="FAQ block" onClick={insertFaq}><HelpCircle className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn title="CTA button" onClick={insertCta}><MousePointerClick className="h-4 w-4" /></ToolbarBtn>
            <Divider />
            <ToolbarBtn title="External link" onClick={() => { const url = prompt("URL"); if (url) editor.chain().focus().setLink({ href: url }).run(); }}><LinkIcon className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn title="Internal link" onClick={() => setLinkOpen(true)}><Link2 className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn title="Upload image" onClick={() => {
              const i = document.createElement("input"); i.type = "file"; i.accept = "image/*";
              i.onchange = (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) uploadImage(f); };
              i.click();
            }}><ImgIcon className="h-4 w-4" /></ToolbarBtn>
          </div>
        )}
      </div>
      {mode === "markdown" ? (
        <Textarea
          value={md}
          onChange={(e) => { setMd(e.target.value); onChange(e.target.value); }}
          placeholder={placeholder}
          className="min-h-[500px] border-0 font-mono text-sm focus-visible:ring-0"
        />
      ) : (
        <EditorContent editor={editor} />
      )}

      <InternalLinkDialog
        open={linkOpen}
        onClose={() => setLinkOpen(false)}
        onPick={(href, label) => {
          if (!editor) return;
          const { from, to } = editor.state.selection;
          if (from === to) editor.chain().focus().insertContent(`<a href="${href}">${label}</a>`).run();
          else editor.chain().focus().setLink({ href }).run();
          setLinkOpen(false);
        }}
      />
    </div>
  );
}

function ToolbarBtn({ children, onClick, active, title }: { children: React.ReactNode; onClick: () => void; active?: boolean; title?: string }) {
  return (
    <button type="button" title={title} onClick={onClick} className={`rounded p-2 hover:bg-accent ${active ? "bg-accent text-accent-foreground" : ""}`}>
      {children}
    </button>
  );
}

function Divider() { return <div className="mx-1 h-6 w-px bg-border" />; }

function InternalLinkDialog({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (href: string, label: string) => void }) {
  const [q, setQ] = useState("");
  const [posts, setPosts] = useState<{ slug: string; title: string }[]>([]);
  useEffect(() => {
    if (!open) return;
    supabase.from("blog_posts").select("slug,title").eq("status", "published").order("published_at", { ascending: false }).limit(200).then(({ data }) => setPosts(data ?? []));
  }, [open]);
  const lower = q.toLowerCase();
  const pages = SITE_PAGES.filter((p) => !q || p.name.toLowerCase().includes(lower) || p.path.includes(lower));
  const matches = posts.filter((p) => !q || p.title.toLowerCase().includes(lower) || p.slug.includes(lower));
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Insert internal link</DialogTitle><DialogDescription>Link to a site page or published blog post.</DialogDescription></DialogHeader>
        <Input placeholder="Search pages and posts..." value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
        <div className="max-h-80 space-y-1 overflow-y-auto">
          {pages.length > 0 && <div className="px-2 pt-2 text-xs font-semibold uppercase text-muted-foreground">Pages</div>}
          {pages.map((p) => (
            <button key={p.path} onClick={() => onPick(p.path, p.name)} className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-sm hover:bg-accent">
              <span>{p.name}</span><span className="text-xs text-muted-foreground">{p.path}</span>
            </button>
          ))}
          {matches.length > 0 && <div className="px-2 pt-2 text-xs font-semibold uppercase text-muted-foreground">Blog posts</div>}
          {matches.map((p) => (
            <button key={p.slug} onClick={() => onPick(`/blog/${p.slug}`, p.title)} className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-sm hover:bg-accent">
              <span className="truncate">{p.title}</span><span className="ml-2 shrink-0 text-xs text-muted-foreground">/blog/{p.slug}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
