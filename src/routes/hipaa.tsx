import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/hipaa")({
  head: () => ({
    meta: [
      { title: "HIPAA Compliance — ImplantCost" },
      { name: "description", content: "How ImplantCost aligns with HIPAA standards for handling health information." },
      { property: "og:title", content: "HIPAA Compliance — ImplantCost" },
      { property: "og:description", content: "Our alignment with HIPAA standards." },
    ],
    links: [{ rel: "canonical", href: "/hipaa" }],
  }),
  component: () => (
    <LegalLayout eyebrow="Legal" title="HIPAA Compliance" updated="May 1, 2026">
      <p>While ImplantCost is not a covered entity under HIPAA, we voluntarily align our handling of any health-related information with HIPAA's Privacy and Security Rules.</p>
      <h2>Safeguards in place</h2>
      <ul>
        <li>End-to-end encryption for data in transit and at rest.</li>
        <li>Role-based access controls and audit logging for all personnel.</li>
        <li>Annual security training for all team members.</li>
        <li>Business Associate Agreements with any partner handling protected information.</li>
      </ul>
      <h2>Minimum necessary use</h2>
      <p>We collect only the information needed to deliver your cost estimate and respond to your queries.</p>
      <h2>Breach notification</h2>
      <p>In the unlikely event of a security incident affecting your data, you will be notified within 72 hours.</p>
    </LegalLayout>
  ),
});
