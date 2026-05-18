import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial Policy — ImplantCost" },
      { name: "description", content: "How ImplantCost researches, writes, reviews and updates content." },
      { property: "og:title", content: "Editorial Policy — ImplantCost" },
      { property: "og:description", content: "Our editorial standards and medical review process." },
    ],
    links: [{ rel: "canonical", href: "/editorial-policy" }],
  }),
  component: () => (
    <LegalLayout eyebrow="Legal" title="Editorial Policy" updated="May 1, 2026">
      <p>Trustworthy information is the foundation of every confident treatment decision. Our editorial process is designed for accuracy, independence and clarity.</p>
      <h2>Research</h2>
      <p>Articles draw on peer-reviewed dental literature, ADA / FDI guidelines and proprietary pricing data from 1,800+ verified clinics.</p>
      <h2>Medical review</h2>
      <p>Every clinical article is reviewed by at least one licensed dental professional before publication and re-reviewed annually.</p>
      <h2>Independence</h2>
      <ul>
        <li>No paid placements in editorial content.</li>
        <li>Sponsored material is clearly labeled as advertising.</li>
        <li>Clinic listings are based on verification criteria, never paid promotion.</li>
      </ul>
      <h2>Corrections</h2>
      <p>Found a mistake? Email <a className="text-secondary underline" href="mailto:editorial@implantcost.health">editorial@implantcost.health</a>. Corrections are issued within 48 hours and noted at the end of the article.</p>
    </LegalLayout>
  ),
});
