import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Statement — ImplantCost" },
      { name: "description", content: "Our commitment to building an accessible, inclusive dental cost platform." },
      { property: "og:title", content: "Accessibility Statement — ImplantCost" },
      { property: "og:description", content: "Our commitment to WCAG 2.1 AA accessibility." },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: () => (
    <LegalLayout eyebrow="Legal" title="Accessibility Statement" updated="May 1, 2026">
      <p>ImplantCost is committed to ensuring digital accessibility for people of all abilities. We aim to conform with WCAG 2.1 Level AA.</p>
      <h2>Measures we take</h2>
      <ul>
        <li>Semantic HTML and clear heading hierarchy across every page.</li>
        <li>Sufficient color contrast and scalable typography.</li>
        <li>Full keyboard navigation across the calculator and forms.</li>
        <li>ARIA labels on interactive controls.</li>
        <li>Tested with screen readers (NVDA, VoiceOver) on every release.</li>
      </ul>
      <h2>Feedback</h2>
      <p>If you encounter an accessibility barrier, email <a className="text-secondary underline" href="mailto:accessibility@implantcost.health">accessibility@implantcost.health</a>. We respond within 3 business days.</p>
    </LegalLayout>
  ),
});
