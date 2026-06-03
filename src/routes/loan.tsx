import { createFileRoute } from "@tanstack/react-router";
import { LoanCalculator } from "@/components/site/LoanCalculator";
import { InternalLinks } from "@/components/site/InternalLinks";

export const Route = createFileRoute("/loan")({
  head: () => ({
    meta: [
      { title: "Dental Implant Loan Calculator – Monthly Payment & Financing Estimator" },
      { name: "description", content: "Free dental implant loan calculator. Estimate monthly EMI, interest and total payable amount for dental implant financing in the United States." },
      { property: "og:title", content: "Dental Implant Loan Calculator – US Financing" },
      { property: "og:description", content: "Plan your dental implant financing — monthly payment, interest and total cost in seconds." },
    ],
    links: [{ rel: "canonical", href: "/loan" }],
  }),
  component: () => (
    <>
      <LoanCalculator
        title="Dental Implant Loan Calculator"
        lead="Estimate monthly payments, interest and total payable amount for dental implant financing in the United States."
      />
      <div className="container mx-auto px-4 pb-16">
        <InternalLinks heading="More implant planning tools" />
      </div>
    </>
  ),
});
