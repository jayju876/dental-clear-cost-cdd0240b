import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — ImplantCost" },
      { name: "description", content: "How and why ImplantCost uses cookies and similar technologies." },
      { property: "og:title", content: "Cookie Policy — ImplantCost" },
      { property: "og:description", content: "How ImplantCost uses cookies." },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: () => (
    <LegalLayout eyebrow="Legal" title="Cookie Policy" updated="May 1, 2026">
      <p>We use cookies to deliver a fast, personalized experience and to understand how our calculator is used.</p>
      <h2>Categories of cookies</h2>
      <ul>
        <li><strong>Strictly necessary:</strong> Required for the site to function (session, security).</li>
        <li><strong>Analytics:</strong> Aggregated usage data via privacy-friendly analytics.</li>
        <li><strong>Preferences:</strong> Remember your selected country and currency.</li>
        <li><strong>Advertising:</strong> Where applicable, Google AdSense may serve ads contextually.</li>
      </ul>
      <h2>Managing cookies</h2>
      <p>You may disable cookies in your browser settings. Some features (saved preferences, calculator continuity) may stop working.</p>
    </LegalLayout>
  ),
});
