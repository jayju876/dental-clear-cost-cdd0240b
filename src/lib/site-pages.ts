// Canonical list of indexable site pages — used by Pages SEO auto-sync
// and the internal link picker inside the blog editor.
export type SitePage = {
  path: string;
  name: string;
  group: "Core" | "Calculators" | "Content" | "Legal";
  /** Shown in the header Calculators dropdown unless true (duplicate alias routes) */
  hiddenInNav?: boolean;
  /** Optional short description used in the mega-dropdown */
  navDescription?: string;
};

export const SITE_PAGES: SitePage[] = [
  { path: "/", name: "Home", group: "Core" },
  { path: "/about", name: "About", group: "Core" },
  { path: "/contact", name: "Contact", group: "Core" },
  { path: "/faq", name: "FAQ", group: "Core" },
  { path: "/blog", name: "Blog", group: "Content" },
  { path: "/sitemap", name: "Sitemap", group: "Content" },
  { path: "/calculators", name: "Calculators", group: "Core" },
  


  { path: "/calculator", name: "Implant Cost Calculator", group: "Calculators", hiddenInNav: true },
  { path: "/loan", name: "Dental Implant Loan Calculator", group: "Calculators", navDescription: "Monthly payments, interest and total cost of implant financing." },
  { path: "/loan-calculator", name: "Loan Calculator", group: "Calculators", hiddenInNav: true },
  { path: "/ratio", name: "Dental Implant Ratio Calculator", group: "Calculators", navDescription: "Crown-to-implant ratio guidance for treatment planning." },
  { path: "/ratio-calculator", name: "Ratio Calculator", group: "Calculators", hiddenInNav: true },
  { path: "/all-on-4-calculator", name: "All-on-4 Calculator", group: "Calculators", navDescription: "Full-arch All-on-4 cost estimates per arch." },
  { path: "/breast-implant-cost-calculator", name: "Breast Implant Cost Calculator", group: "Calculators", navDescription: "Surgeon, facility and implant cost estimates." },
  { path: "/implant-support-calculator", name: "Implant Support Calculator", group: "Calculators", navDescription: "How many implants your restoration needs." },
  { path: "/dental-implant-finance-calculator", name: "Implant Finance Calculator", group: "Calculators", navDescription: "Compare financing plans and APR scenarios." },
  { path: "/dental-implant-loan-calculator", name: "Implant Loan Calculator", group: "Calculators", hiddenInNav: true },
  { path: "/dental-implant-payment-calculator", name: "Implant Payment Calculator", group: "Calculators", navDescription: "Break treatment cost into monthly payments." },
  { path: "/dental-implant-ratio-calculator", name: "Implant Ratio Calculator", group: "Calculators", hiddenInNav: true },


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

/** Calculators shown in the header dropdown — future calculators added to
 *  SITE_PAGES with group "Calculators" appear here automatically. */
export const NAV_CALCULATORS = SITE_PAGES.filter(
  (p) => p.group === "Calculators" && !p.hiddenInNav,
);
