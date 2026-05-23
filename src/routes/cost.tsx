import { createFileRoute } from "@tanstack/react-router";
import CalculatorRoute from "./calculator";

// SEO-friendly short URL alias for the cost calculator.
export const Route = createFileRoute("/cost")({
  head: () => ({
    meta: [
      { title: "Dental Implant Cost Calculator (2026) – Estimate Your Implant Cost Instantly" },
      { name: "description", content: "Use our free dental implant cost calculator to estimate single tooth, All-on-4, and full mouth dental implant costs in the USA. Instant personalized estimates." },
      { property: "og:title", content: "Dental Implant Cost Calculator (2026) – Instant US Estimate" },
      { property: "og:description", content: "Estimate single tooth, All-on-4 and full mouth dental implant costs across the United States. Free and instant." },
    ],
    links: [{ rel: "canonical", href: "/cost" }],
  }),
  component: CalculatorRoute.options.component!,
});
