import { useEffect } from "react";

const GA4_ID = "G-KPN49FWN9S";

export function GoogleAnalytics() {
  useEffect(() => {
    if (document.getElementById("ga4-loader")) return;

    const loader = document.createElement("script");
    loader.id = "ga4-loader";
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(loader);

    const init = document.createElement("script");
    init.id = "ga4-init";
    init.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`;
    document.head.appendChild(init);
  }, []);

  return null;
}
