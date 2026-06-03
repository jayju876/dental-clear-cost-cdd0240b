import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type PageSeoRow = {
  path: string;
  page_title: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_card: string | null;
  robots: string | null;
};

function upsertMeta(attr: "name" | "property", key: string, content: string | null | undefined) {
  if (typeof document === "undefined") return;
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!content) {
    // Only remove tags we previously injected to avoid wiping route-level defaults
    if (el?.dataset.cmsSeo === "true") el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.dataset.cmsSeo = "true";
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string | null | undefined) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    if (el?.dataset.cmsSeo === "true") el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    el.dataset.cmsSeo = "true";
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function DynamicPageSeo() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const { data } = useQuery({
    queryKey: ["page-seo", pathname],
    enabled: !pathname.startsWith("/admin"),
    staleTime: 60_000,
    queryFn: async (): Promise<PageSeoRow | null> => {
      const { data, error } = await supabase
        .from("page_seo")
        .select(
          "path,page_title,meta_title,meta_description,meta_keywords,canonical_url,og_title,og_description,og_image,twitter_card,robots",
        )
        .eq("path", pathname)
        .maybeSingle();
      if (error) return null;
      return (data as PageSeoRow) ?? null;
    },
  });

  useEffect(() => {
    if (!data) return;

    const title = data.meta_title || data.page_title;
    if (title) document.title = title;

    upsertMeta("name", "description", data.meta_description);
    upsertMeta("name", "keywords", data.meta_keywords);
    upsertMeta("name", "robots", data.robots);

    upsertMeta("property", "og:title", data.og_title || title);
    upsertMeta("property", "og:description", data.og_description || data.meta_description);
    upsertMeta("property", "og:image", data.og_image);
    upsertMeta("property", "og:url", data.canonical_url);

    upsertMeta("name", "twitter:card", data.twitter_card);
    upsertMeta("name", "twitter:title", data.og_title || title);
    upsertMeta("name", "twitter:description", data.og_description || data.meta_description);
    upsertMeta("name", "twitter:image", data.og_image);

    upsertCanonical(data.canonical_url);
  }, [data]);

  return null;
}
