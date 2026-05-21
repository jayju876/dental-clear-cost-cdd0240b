import { createFileRoute } from "@tanstack/react-router";
import { LoanCalculator } from "@/components/site/LoanCalculator";

export const Route = createFileRoute("/dental-implant-payment-calculator")({
  head: () => ({
    meta: [
      { title: "Dental Implant Payment Calculator — Monthly Cost Estimator" },
      { name: "description", content: "Find out exactly what your dental implants will cost per month. Adjust down payment, APR and term length to fit your budget." },
      { property: "og:title", content: "Dental Implant Payment Calculator" },
      { property: "og:description", content: "What will my dental implants cost per month? Instant payment estimator." },
    ],
    links: [{ rel: "canonical", href: "/dental-implant-payment-calculator" }],
  }),
  component: () => (
    <LoanCalculator
      title="Dental Implant Payment Calculator"
      lead="See exactly what your dental implants will cost each month, based on your budget and credit profile."
    />
  ),
});
