import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function GoogleTagManager() {
  const { data: gtmId } = useQuery({
    queryKey: ["gtm-id"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "google_tag_manager_id")
        .maybeSingle();
      const raw = data?.value;
      const id = typeof raw === "string" ? raw : "";
      return id.trim();
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!gtmId || !/^GTM-[A-Z0-9]+$/i.test(gtmId)) return;
    if (document.getElementById("gtm-script")) return;
    const s = document.createElement("script");
    s.id = "gtm-script";
    s.async = true;
    s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;
    document.head.appendChild(s);

    const noscript = document.createElement("noscript");
    noscript.id = "gtm-noscript";
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(noscript, document.body.firstChild);
  }, [gtmId]);

  return null;
}
