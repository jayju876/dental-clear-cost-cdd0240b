import { createFileRoute } from "@tanstack/react-router";
import { LoanCalculator } from "@/components/site/LoanCalculator";

export const Route = createFileRoute("/dental-implant-loan-calculator")({
  head: () => ({
    meta: [
      { title: "Dental Implant Loan Calculator 2026 — Free EMI Estimator" },
      { name: "description", content: "Calculate your dental implant loan EMI, total interest and repayment schedule. Free, instant and accurate across treatment costs from $500 to $80,000." },
      { property: "og:title", content: "Dental Implant Loan Calculator 2026" },
      { property: "og:description", content: "Free EMI estimator for dental implant loans — monthly payment, interest, total payable." },
    ],
    links: [{ rel: "canonical", href: "/dental-implant-loan-calculator" }],
  }),
  component: () => (
    <LoanCalculator
      title="Dental Implant Loan Calculator"
      lead="Estimate your monthly EMI, total interest and payback amount for any dental implant treatment plan."
    />
  ),
});
