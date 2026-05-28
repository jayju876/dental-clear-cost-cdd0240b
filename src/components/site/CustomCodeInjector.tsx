import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

function injectSnippet(html: string, target: HTMLElement, marker: string) {
  // Remove previous injection
  target.querySelectorAll(`[data-custom-snippet="${marker}"]`).forEach((n) => n.remove());
  if (!html.trim()) return;

  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  const nodes = Array.from(tpl.content.childNodes);

  nodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === "SCRIPT") {
      const src = node as HTMLScriptElement;
      const s = document.createElement("script");
      for (const attr of Array.from(src.attributes)) s.setAttribute(attr.name, attr.value);
      s.text = src.text;
      s.setAttribute("data-custom-snippet", marker);
      target.appendChild(s);
    } else {
      const clone = node.cloneNode(true);
      if (clone.nodeType === Node.ELEMENT_NODE) {
        (clone as Element).setAttribute("data-custom-snippet", marker);
      }
      target.appendChild(clone);
    }
  });
}

export function CustomCodeInjector() {
  const { data } = useQuery({
    queryKey: ["custom-code-snippets"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key,value")
        .in("key", ["custom_head_code", "custom_body_code"]);
      const map: Record<string, string> = {};
      (data ?? []).forEach((r) => {
        map[r.key] = typeof r.value === "string" ? r.value : "";
      });
      return map;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;
    injectSnippet(data.custom_head_code ?? "", document.head, "head");
    injectSnippet(data.custom_body_code ?? "", document.body, "body");
  }, [data]);

  return null;
}
