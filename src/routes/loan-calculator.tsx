import { createFileRoute } from "@tanstack/react-router";
import { LoanCalculator } from "@/components/site/LoanCalculator";

export const Route = createFileRoute("/loan-calculator")({
  head: () => ({
    meta: [
      { title: "Dental Implant Loan Calculator — Monthly EMI & Interest" },
      { name: "description", content: "Free dental implant loan calculator. Estimate monthly EMI, total interest and payable amount for your implant treatment in seconds." },
      { property: "og:title", content: "Dental Implant Loan Calculator" },
      { property: "og:description", content: "Plan your implant payments — EMI, interest and total cost with one tool." },
    ],
    links: [{ rel: "canonical", href: "/loan-calculator" }],
  }),
  component: () => <LoanCalculator />,
});
