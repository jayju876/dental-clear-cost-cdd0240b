import { createFileRoute } from "@tanstack/react-router";
import { LoanCalculator } from "@/components/site/LoanCalculator";

export const Route = createFileRoute("/dental-implant-finance-calculator")({
  head: () => ({
    meta: [
      { title: "Dental Implant Finance Calculator — Plan Your Treatment Payments" },
      { name: "description", content: "Use our dental implant finance calculator to model monthly payments, interest and term length. Compare 12 to 84-month financing options instantly." },
      { property: "og:title", content: "Dental Implant Finance Calculator" },
      { property: "og:description", content: "Compare financing terms for your implant treatment — interest, EMI and total cost." },
    ],
    links: [{ rel: "canonical", href: "/dental-implant-finance-calculator" }],
  }),
  component: () => (
    <LoanCalculator
      title="Dental Implant Finance Calculator"
      lead="Model dental implant financing across 12–84 month terms and any interest rate."
    />
  ),
});
