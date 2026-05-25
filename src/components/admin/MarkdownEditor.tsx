import { useEffect, useMemo, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { marked } from "marked";
import TurndownService from "turndown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Link as LinkIcon, Image as ImgIcon, Code } from "lucide-react";

const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-" });

export function MarkdownEditor({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [mode, setMode] = useState<"markdown" | "visual">("markdown");
  const [md, setMd] = useState(value);

  useEffect(() => setMd(value), [value]);

  const initialHtml = useMemo(() => (mode === "visual" ? (marked.parse(md) as string) : ""), [mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
        Image,
        Placeholder.configure({ placeholder: placeholder ?? "Write your content..." }),
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
        attributes: { class: "prose prose-sm md:prose-base max-w-none min-h-[400px] focus:outline-none p-4" },
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

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-2">
        <div className="flex gap-1">
          <Button type="button" size="sm" variant={mode === "markdown" ? "default" : "ghost"} onClick={() => switchTo("markdown")}>Markdown</Button>
          <Button type="button" size="sm" variant={mode === "visual" ? "default" : "ghost"} onClick={() => switchTo("visual")}>Visual</Button>
        </div>
        {mode === "visual" && editor && (
          <div className="flex flex-wrap gap-1">
            <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}><Heading3 className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}><Code className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn onClick={() => { const url = prompt("URL"); if (url) editor.chain().focus().setLink({ href: url }).run(); }}><LinkIcon className="h-4 w-4" /></ToolbarBtn>
            <ToolbarBtn onClick={() => { const url = prompt("Image URL"); if (url) editor.chain().focus().setImage({ src: url }).run(); }}><ImgIcon className="h-4 w-4" /></ToolbarBtn>
          </div>
        )}
      </div>
      {mode === "markdown" ? (
        <Textarea
          value={md}
          onChange={(e) => { setMd(e.target.value); onChange(e.target.value); }}
          placeholder={placeholder}
          className="min-h-[400px] border-0 font-mono text-sm focus-visible:ring-0"
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}

function ToolbarBtn({ children, onClick, active }: { children: React.ReactNode; onClick: () => void; active?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`rounded p-2 hover:bg-accent ${active ? "bg-accent text-accent-foreground" : ""}`}>
      {children}
    </button>
  );
}
