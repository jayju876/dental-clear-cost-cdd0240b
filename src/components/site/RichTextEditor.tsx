import { useEffect, useMemo, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  BlockQuote,
  Bold,
  ClassicEditor,
  CodeBlock,
  Essentials,
  Heading,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  List,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  Strikethrough,
  Table,
  TableToolbar,
  Underline,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { supabase } from "@/integrations/supabase/client";

type EditorTheme = "light" | "dark" | "system";

type UploadLoader = {
  file: Promise<File>;
};

type UploadAdapter = {
  upload: () => Promise<{ default: string }>;
  abort: () => void;
};

class SupabaseUploadAdapter implements UploadAdapter {
  private readonly loader: UploadLoader;

  constructor(loader: UploadLoader) {
    this.loader = loader;
  }

  async upload(): Promise<{ default: string }> {
    const file = await this.loader.file;
    if (!file.type.startsWith("image/")) throw new Error("Only image files can be uploaded.");
    if (file.size > 8 * 1024 * 1024) throw new Error("Images must be smaller than 8 MB.");
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `editor/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("cms-media").upload(path, file, { upsert: false, contentType: file.type });
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from("cms-media").getPublicUrl(path);
    const { data: userData } = await supabase.auth.getUser();
    await (supabase.from("media_assets").insert({ filename: file.name, storage_path: path, public_url: data.publicUrl, mime_type: file.type, size_bytes: file.size, uploaded_by: userData.user?.id ?? null }) as any);
    return { default: data.publicUrl };
  }

  abort() {
    // Supabase Storage uploads are not cancellable through this adapter yet.
  }
}

function addPlaceholderUploadAdapter(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: UploadLoader) => new SupabaseUploadAdapter(loader);
}

export type RichTextEditorProps = {
  initialValue?: string;
  onChange?: (html: string) => void;
  theme?: EditorTheme;
  placeholder?: string;
  disabled?: boolean;
};

const DEFAULT_VALUE = "<h2>Welcome to the editor</h2><p>Start writing here. Your content will be returned as HTML.</p>";

export function RichTextEditor({
  initialValue = DEFAULT_VALUE,
  onChange,
  theme = "light",
  placeholder = "Write something useful...",
  disabled = false,
}: RichTextEditorProps) {
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(theme === "dark" ? "dark" : "light");

  useEffect(() => {
    if (theme !== "system") {
      setResolvedTheme(theme);
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setResolvedTheme(media.matches ? "dark" : "light");
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [theme]);

  const config = useMemo(() => ({
    licenseKey: "GPL",
    plugins: [
      Essentials,
      PasteFromOffice,
      Undo,
      Paragraph,
      Heading,
      Bold,
      Italic,
      Underline,
      Strikethrough,
      List,
      BlockQuote,
      Link,
      Table,
      TableToolbar,
      Image,
      ImageCaption,
      ImageStyle,
      ImageToolbar,
      ImageResize,
      ImageUpload,
      CodeBlock,
      HorizontalLine,
      RemoveFormat,
    ],
    extraPlugins: [addPlaceholderUploadAdapter],
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "bulletedList",
        "numberedList",
        "blockQuote",
        "link",
        "insertTable",
        "uploadImage",
        "codeBlock",
        "horizontalLine",
        "removeFormat",
      ],
      shouldNotGroupWhenFull: false,
    },
    heading: {
      options: [
        { model: "paragraph" as const, title: "Paragraph", class: "ck-heading_paragraph" },
        { model: "heading1" as const, view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
        { model: "heading2" as const, view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
        { model: "heading3" as const, view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
      ],
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    image: {
      toolbar: ["imageTextAlternative", "toggleImageCaption", "imageStyle:inline", "imageStyle:block", "imageStyle:side"],
    },
    placeholder,
  }), [placeholder]);

  return (
    <div className={`rich-text-editor rich-text-editor--${resolvedTheme}`}>
      <CKEditor
        editor={ClassicEditor}
        config={config}
        data={initialValue}
        disabled={disabled}
        onChange={(_, editor) => onChange?.(editor.getData())}
      />
    </div>
  );
}
