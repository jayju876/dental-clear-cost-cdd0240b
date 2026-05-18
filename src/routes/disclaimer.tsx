import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — ImplantCost" },
      { name: "description", content: "Important disclaimers about cost estimates and medical information on ImplantCost." },
      { property: "og:title", content: "Disclaimer — ImplantCost" },
      { property: "og:description", content: "Important disclaimers about cost and medical information." },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: () => (
    <LegalLayout eyebrow="Legal" title="Disclaimer" updated="May 1, 2026">
      <h2>Informational use only</h2>
      <p>All cost estimates and content on ImplantCost are for informational purposes only. They do not replace professional consultation, diagnosis or treatment by a licensed dental professional.</p>
      <h2>Estimate accuracy</h2>
      <p>Estimates are derived from aggregated 2026 pricing data from verified clinics and are typically within 10–15% of final clinic invoices. Individual case factors may cause variance.</p>
      <h2>No clinic endorsement</h2>
      <p>ImplantCost does not endorse or guarantee the services of any clinic, brand or financing partner. Always conduct your own due diligence.</p>
      <h2>External links</h2>
      <p>Links to third-party websites are provided for convenience. We are not responsible for the content or practices of external sites.</p>
    </LegalLayout>
  ),
});
