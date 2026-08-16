import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";
import { Check, Copy, Moon, Save, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RichTextEditor } from "@/components/site/RichTextEditor";

export const Route = createFileRoute("/rich-text-editor")({
  head: () => ({
    meta: [
      { title: "Rich Text Editor Example — ImplantCost" },
      { name: "description", content: "CKEditor 5 rich text editor example with HTML output." },
    ],
    links: [{ rel: "canonical", href: "/rich-text-editor" }],
  }),
  component: RichTextEditorExample,
});

const DEFAULT_CONTENT = `<h2>Plan your treatment with clarity</h2><p>Use this editor to draft helpful content for patients. You can format text, add links, create tables, and structure a clear explanation before saving it as HTML.</p><blockquote><p>Estimates are for planning and should be reviewed with a licensed dental professional.</p></blockquote>`;

function RichTextEditorExample() {
  const [html, setHtml] = useState(DEFAULT_CONTENT);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleSave() {
    console.log("RichTextEditor HTML:", html);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Content workspace</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Rich Text Editor</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">Edit content with CKEditor 5 and inspect the generated HTML below the editor.</p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setTheme((value) => value === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
              {theme === "light" ? "Dark mode" : "Light mode"}
            </Button>
            <Button type="button" onClick={handleSave} className="bg-gradient-primary text-primary-foreground">
              {saved ? <Check className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>

        <Card className="mt-8 overflow-hidden border-border/70 p-0 shadow-elegant">
          <RichTextEditor initialValue={DEFAULT_CONTENT} theme={theme} onChange={setHtml} />
        </Card>

        <Card className="mt-8 border-border/70 p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Generated HTML</h2>
              <p className="mt-1 text-sm text-muted-foreground">This is the exact HTML returned by the editor’s `onChange` callback.</p>
            </div>
            <Button type="button" variant="outline" onClick={handleCopy}>
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "Copied" : "Copy HTML"}
            </Button>
          </div>
          <pre className="mt-5 max-h-80 overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100"><code>{html}</code></pre>
        </Card>
      </div>
    </div>
  );
}
