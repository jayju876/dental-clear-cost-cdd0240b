import { createFileRoute } from "@tanstack/react-router";
import { LoanCalculator } from "@/components/site/LoanCalculator";

export const Route = createFileRoute("/loan")({
  head: () => ({
    meta: [
      { title: "Dental Implant Loan Calculator — Monthly Payment & Financing Estimator" },
      { name: "description", content: "Estimate monthly payments for dental implant financing in the USA. Compare APR, terms and total interest with our free dental implant loan calculator." },
      { property: "og:title", content: "Dental Implant Loan Calculator — US Financing" },
      { property: "og:description", content: "Plan monthly payments, APR and total interest for dental implant treatment." },
    ],
    links: [{ rel: "canonical", href: "/loan" }],
  }),
  component: () => <LoanCalculator />,
});
