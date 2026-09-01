import { createFileRoute } from "@tanstack/react-router";
import { LoanCalculator } from "@/components/site/LoanCalculator";
import { LoanGuideContent } from "@/components/site/LoanGuideContent";
import { InternalLinks } from "@/components/site/InternalLinks";

export const Route = createFileRoute("/loan")({
  head: () => ({
    meta: [
      { title: "Dental Implant Loan Calculator — Estimate Your Monthly Payment" },
      { name: "description", content: "Estimate monthly payments, total interest, and repayment options for dental implant financing across the United States. Compare 12–60 month loan terms instantly." },
      { property: "og:title", content: "Dental Implant Loan Calculator — Estimate Your Monthly Payment" },
      { property: "og:description", content: "Plan your dental implant financing — monthly payment, interest and total cost in seconds." },
    ],
    links: [{ rel: "canonical", href: "/loan" }],
  }),
  component: () => (
    <>
      <LoanCalculator
        title="Dental Implant Loan Calculator — Estimate Your Monthly Payment"
        lead="Estimate monthly payments, total interest, and repayment options for dental implant financing across the United States. Adjust loan term, interest rate, and down payment to find the plan that fits your budget."
      />
      <LoanGuideContent />
      <div className="container mx-auto px-4 pb-16">
        <InternalLinks heading="More implant planning tools" />
      </div>
    </>
  ),
});
