# CKEditor 5 Integration

CKEditor 5 is available at `/rich-text-editor`.

## Installation

The project uses the latest stable packages checked during integration:

```bash
pnpm install
pnpm dev
```

The package manifest contains:

```json
{
  "@ckeditor/ckeditor5-react": "11.2.0",
  "ckeditor5": "48.4.0"
}
```

The production command remains:

```bash
pnpm build
```

## Files

```text
src/
├── components/site/RichTextEditor.tsx
├── routes/rich-text-editor.tsx
└── styles.css
```

`RichTextEditor.tsx` is the reusable component. It accepts `initialValue`, `onChange`, `theme`, `placeholder`, and `disabled` props. The `onChange` callback receives the current editor content as HTML.

```tsx
<RichTextEditor
  initialValue="<p>Default content</p>"
  theme="light"
  onChange={(html) => setHtml(html)}
/>
```

The toolbar includes undo and redo, headings, bold, italic, underline, strikethrough, bulleted and numbered lists, block quotes, links, tables, image upload, code blocks, horizontal lines, and remove format.

Image upload is intentionally configured with a placeholder adapter. The toolbar is ready, but selecting an image displays an error until a backend upload endpoint is connected. Replace `PlaceholderUploadAdapter` with an adapter that uploads the file and resolves with `{ default: imageUrl }`.

The example route loads default HTML content, updates the generated HTML panel on every change, supports a light/dark toggle, includes a Save button that logs the HTML to the browser console, and includes a Copy HTML button.

## Verification

TypeScript verification and the Vite production build pass. The browser preview was tested at:

```text
http://localhost:4173/rich-text-editor
```

The editor toolbar, default content, HTML output, dark-mode toggle, and Save action were verified in the browser.
