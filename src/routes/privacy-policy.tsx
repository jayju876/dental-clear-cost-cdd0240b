import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ImplantCost" },
      { name: "description", content: "How ImplantCost collects, uses and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — ImplantCost" },
      { property: "og:description", content: "Our commitment to protecting your personal data." },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: () => (
    <LegalLayout eyebrow="Legal" title="Privacy Policy" updated="May 1, 2026">
      <p>This Privacy Policy explains how ImplantCost ("we", "us") collects, uses, and protects your personal information when you use our website and cost calculator.</p>
      <h2>1. Information we collect</h2>
      <ul>
        <li>Contact details you provide (name, email, phone) to receive your personalized estimate.</li>
        <li>Calculator inputs (country, treatment preferences) — stored anonymously for analytics.</li>
        <li>Standard device and usage data (IP, browser type, page interactions).</li>
      </ul>
      <h2>2. How we use your information</h2>
      <ul>
        <li>To deliver your treatment cost estimate by email.</li>
        <li>To improve our pricing models and content based on aggregated usage.</li>
        <li>To respond to support requests and partnership inquiries.</li>
      </ul>
      <h2>3. What we never do</h2>
      <p>We never sell your personal data to third parties. We never share your information with clinics unless you explicitly request a connection.</p>
      <h2>4. Data security</h2>
      <p>Data is encrypted in transit (TLS 1.3) and at rest (AES-256). Our infrastructure is ISO 27001 audited.</p>
      <h2>5. Your rights</h2>
      <p>You may request access, correction or deletion of your data at any time by contacting <a className="text-secondary underline" href="mailto:privacy@implantcost.health">privacy@implantcost.health</a>. GDPR and CCPA rights are honored worldwide.</p>
      <h2>6. Contact</h2>
      <p>Questions? Reach our Data Protection Officer at privacy@implantcost.health.</p>
    </LegalLayout>
  ),
});
