import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — ImplantCost" },
      { name: "description", content: "Terms governing use of the ImplantCost website and cost calculator." },
      { property: "og:title", content: "Terms & Conditions — ImplantCost" },
      { property: "og:description", content: "Terms governing use of ImplantCost." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalLayout eyebrow="Legal" title="Terms & Conditions" updated="May 1, 2026">
      <p>By using ImplantCost you agree to these Terms. If you disagree, please do not use the site.</p>
      <h2>1. Use of the calculator</h2>
      <p>The cost calculator provides estimates only, derived from aggregated 2026 clinic pricing. Final cost is determined by your treating clinic after an in-person evaluation.</p>
      <h2>2. No medical advice</h2>
      <p>Content on ImplantCost is educational. It does not constitute medical advice, diagnosis or treatment. Always consult a licensed dental professional.</p>
      <h2>3. Intellectual property</h2>
      <p>All content, pricing models and articles are owned by ImplantCost or our licensors and protected by copyright. You may share links freely; do not republish without written permission.</p>
      <h2>4. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, ImplantCost is not liable for any indirect, incidental or consequential damages arising from your use of the site.</p>
      <h2>5. Governing law</h2>
      <p>These Terms are governed by the laws of India. Disputes will be resolved in Bengaluru courts.</p>
    </LegalLayout>
  ),
});
