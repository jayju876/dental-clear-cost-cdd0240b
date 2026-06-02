import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function GoogleAnalytics() {
  const { data: gaId } = useQuery({
    queryKey: ["ga4-id"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "google_analytics_id")
        .maybeSingle();
      const raw = data?.value;
      const id = typeof raw === "string" ? raw : "";
      return id.trim();
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!gaId || !/^(G-[A-Z0-9]+|UA-\d+-\d+|AW-\d+)$/i.test(gaId)) return;
    if (document.getElementById("ga4-loader")) return;

    const loader = document.createElement("script");
    loader.id = "ga4-loader";
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(loader);

    const init = document.createElement("script");
    init.id = "ga4-init";
    init.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`;
    document.head.appendChild(init);
  }, [gaId]);

  return null;
}
