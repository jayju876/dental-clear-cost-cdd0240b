import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SITE_PAGES } from "@/lib/site-pages";

const SITE_URL = "https://dentalimplantcalculator.lovable.app";

function setJsonLd(id: string, data: object | null) {
  if (typeof document === "undefined") return;
  const existing = document.getElementById(id);
  if (!data) {
    existing?.remove();
    return;
  }
  const el = (existing as HTMLScriptElement) ?? document.createElement("script");
  el.id = id;
  el.type = "application/ld+json";
  el.text = JSON.stringify(data);
  if (!existing) document.head.appendChild(el);
}

function buildBreadcrumb(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
  ];
  let acc = "";
  parts.forEach((seg, i) => {
    acc += `/${seg}`;
    const page = SITE_PAGES.find((p) => p.path === acc);
    const name =
      page?.name ??
      decodeURIComponent(seg)
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name,
      item: `${SITE_URL}${acc}`,
    });
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

const HOWTO_BY_PATH: Record<string, { name: string; description: string; steps: { name: string; text: string }[] }> = {
  "/calculator": {
    name: "How to estimate your dental implant cost",
    description: "Use the ImplantCost calculator to get a personalized dental implant cost estimate in under a minute.",
    steps: [
      { name: "Choose your country and city", text: "Select where you plan to receive treatment so pricing is calibrated to your local market." },
      { name: "Enter how many teeth you need replaced", text: "Specify the number of missing teeth — from a single tooth up to a full arch." },
      { name: "Pick implant type and brand", text: "Choose between single, multiple, All-on-4 or full mouth, and select an implant brand such as Nobel Biocare or Straumann." },
      { name: "Select crown material", text: "Pick zirconia, porcelain-fused-to-metal or e.max based on aesthetics and durability." },
      { name: "Add any extra procedures", text: "Toggle bone graft, sinus lift or extraction if your dentist recommended them." },
      { name: "Review your personalized estimate", text: "See your total cost range, EMI estimate, treatment breakdown and potential savings." },
    ],
  },
  "/cost": {
    name: "How to estimate your dental implant cost",
    description: "Get an instant 2026 dental implant cost estimate tailored to your country, case and clinic preferences.",
    steps: [
      { name: "Select your country", text: "Choose where you'll receive treatment to localize pricing." },
      { name: "Describe your case", text: "Tell us how many teeth need replacement and which implant type fits." },
      { name: "Pick materials and brand", text: "Choose a crown material and implant brand." },
      { name: "Get your estimate", text: "View your personalized cost range with treatment breakdown." },
    ],
  },
  "/loan": {
    name: "How to calculate your dental implant loan",
    description: "Model dental implant financing across 12–84 month terms and any interest rate.",
    steps: [
      { name: "Enter your treatment amount", text: "Type the total dental implant cost you want to finance." },
      { name: "Choose a loan term", text: "Select a repayment period between 12 and 84 months." },
      { name: "Set an interest rate (APR)", text: "Enter the annual percentage rate offered by your lender." },
      { name: "Review monthly payment", text: "See your monthly EMI, total interest and full payment schedule." },
    ],
  },
  "/loan-calculator": {
    name: "How to calculate your dental implant loan",
    description: "Model dental implant financing across 12–84 month terms and any interest rate.",
    steps: [
      { name: "Enter your treatment amount", text: "Type the total dental implant cost you want to finance." },
      { name: "Choose a loan term", text: "Select a repayment period between 12 and 84 months." },
      { name: "Set an interest rate (APR)", text: "Enter the annual percentage rate offered by your lender." },
      { name: "Review monthly payment", text: "See your monthly EMI, total interest and full payment schedule." },
    ],
  },
  "/ratio": {
    name: "How to calculate the right implant-to-tooth ratio",
    description: "Find out whether All-on-4, All-on-6 or All-on-8 is the right full-arch implant treatment for your case.",
    steps: [
      { name: "Select the arch you're restoring", text: "Choose upper jaw, lower jaw or both." },
      { name: "Enter your bone density profile", text: "Pick the bone quality your dentist identified on the CBCT scan." },
      { name: "Choose preferred prosthesis type", text: "Fixed bridge, hybrid denture or removable overdenture." },
      { name: "Review the recommended ratio", text: "See whether 4, 6 or 8 implants per arch best fits your case." },
    ],
  },
  "/ratio-calculator": {
    name: "How to calculate the right implant-to-tooth ratio",
    description: "Match the right full-arch implant treatment — All-on-4, All-on-6 or All-on-8 — to your case.",
    steps: [
      { name: "Select the arch", text: "Choose upper jaw, lower jaw or both." },
      { name: "Enter your bone profile", text: "Select your bone density category." },
      { name: "Pick your prosthesis", text: "Fixed bridge, hybrid or removable." },
      { name: "View your recommendation", text: "Get the ideal implant count for your arch." },
    ],
  },
};

function buildHowTo(pathname: string) {
  const cfg = HOWTO_BY_PATH[pathname];
  if (!cfg) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: cfg.name,
    description: cfg.description,
    totalTime: "PT1M",
    step: cfg.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE_URL}${pathname}#step-${i + 1}`,
    })),
  };
}

export function SchemaInjector() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setJsonLd("ld-breadcrumb", null);
      setJsonLd("ld-howto", null);
      return;
    }
    setJsonLd("ld-breadcrumb", buildBreadcrumb(pathname));
    setJsonLd("ld-howto", buildHowTo(pathname));
  }, [pathname]);

  return null;
}
