const HTML_TAG_RE = /<([a-z][\s\S]*?)>/i;
const TABLE_SEPARATOR_RE = /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
}

function splitTableRow(line: string) {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function legacyTextToHtml(value: string) {
  const lines = value.replace(/\r\n?/g, "\n").split("\n");
  const output: string[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    if (line.includes("|") && index + 1 < lines.length && TABLE_SEPARATOR_RE.test(lines[index + 1])) {
      const header = splitTableRow(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      output.push(`<figure class="table"><table><thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${header.map((_, cellIndex) => `<td>${inlineMarkdown(row[cellIndex] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table></figure>`);
      continue;
    }

    const unordered = line.match(/^[-*•]\s+(.+)$/);
    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      const tag = ordered ? "ol" : "ul";
      const items: string[] = [];
      while (index < lines.length) {
        const current = lines[index].trim();
        const match = tag === "ul" ? current.match(/^[-*•]\s+(.+)$/) : current.match(/^\d+[.)]\s+(.+)$/);
        if (!match) break;
        items.push(`<li>${inlineMarkdown(match[1])}</li>`);
        index += 1;
      }
      output.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = Math.min(3, heading[1].length);
      output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (index < lines.length && lines[index].trim()) {
      const next = lines[index].trim();
      if (/^[-*•]\s+/.test(next) || /^\d+[.)]\s+/.test(next) || /^#{1,3}\s+/.test(next)) break;
      if (next.includes("|") && index + 1 < lines.length && TABLE_SEPARATOR_RE.test(lines[index + 1])) break;
      paragraph.push(next);
      index += 1;
    }
    output.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
  }
  return output.join("");
}

/** Preserve CKEditor HTML; upgrade legacy plain/Markdown-like content for lists and tables. */
export function normalizeRichTextHtml(value: string | null | undefined) {
  const content = (value ?? "").trim();
  if (!content) return "";
  if (HTML_TAG_RE.test(content)) return content.replace(/\r\n?/g, "\n");
  return legacyTextToHtml(content);
}

export function normalizeBlogContent(value: string | null | undefined) {
  return normalizeRichTextHtml(value);
}
