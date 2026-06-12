// Canonical list of indexable site pages — used by Pages SEO auto-sync
// and the internal link picker inside the blog editor.
export type SitePage = { path: string; name: string; group: "Core" | "Calculators" | "Content" | "Legal" };

export const SITE_PAGES: SitePage[] = [
  { path: "/", name: "Home", group: "Core" },
  { path: "/about", name: "About", group: "Core" },
  { path: "/contact", name: "Contact", group: "Core" },
  { path: "/faq", name: "FAQ", group: "Core" },
  { path: "/sitemap", name: "Sitemap", group: "Content" },

  { path: "/cost", name: "Dental Implant Cost", group: "Calculators" },
  { path: "/calculator", name: "Implant Cost Calculator", group: "Calculators" },
  { path: "/loan", name: "Dental Implant Loan", group: "Calculators" },
  { path: "/loan-calculator", name: "Loan Calculator", group: "Calculators" },
  { path: "/ratio", name: "Implant Ratio", group: "Calculators" },
  { path: "/ratio-calculator", name: "Ratio Calculator", group: "Calculators" },
  { path: "/all-on-4-calculator", name: "All-on-4 Calculator", group: "Calculators" },
  { path: "/breast-implant-cost-calculator", name: "Breast Implant Cost Calculator", group: "Calculators" },
  { path: "/implant-support-calculator", name: "Implant Support Calculator", group: "Calculators" },
  { path: "/dental-implant-finance-calculator", name: "Implant Finance Calculator", group: "Calculators" },
  { path: "/dental-implant-loan-calculator", name: "Implant Loan Calculator", group: "Calculators" },
  { path: "/dental-implant-payment-calculator", name: "Implant Payment Calculator", group: "Calculators" },
  { path: "/dental-implant-ratio-calculator", name: "Implant Ratio Calculator", group: "Calculators" },

  { path: "/privacy-policy", name: "Privacy Policy", group: "Legal" },
  { path: "/terms", name: "Terms", group: "Legal" },
  { path: "/disclaimer", name: "Disclaimer", group: "Legal" },
  { path: "/hipaa", name: "HIPAA Notice", group: "Legal" },
  { path: "/cookie-policy", name: "Cookie Policy", group: "Legal" },
  { path: "/accessibility", name: "Accessibility", group: "Legal" },
  { path: "/editorial-policy", name: "Editorial Policy", group: "Legal" },
];

export function scoreSeo(args: { title: string; description: string; keywords?: string; canonical?: string; ogImage?: string }) {
  let s = 0;
  const t = args.title?.trim() ?? "";
  const d = args.description?.trim() ?? "";
  if (t.length >= 30 && t.length <= 60) s += 25;
  else if (t.length > 0) s += 12;
  if (d.length >= 120 && d.length <= 160) s += 25;
  else if (d.length > 0) s += 12;
  if ((args.keywords ?? "").length > 0) s += 15;
  if ((args.canonical ?? "").length > 0) s += 15;
  if ((args.ogImage ?? "").length > 0) s += 20;
  return Math.min(100, s);
}
