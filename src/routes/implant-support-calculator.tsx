import { createFileRoute } from "@tanstack/react-router";
import { RatioCalculator } from "@/components/site/RatioCalculator";

export const Route = createFileRoute("/implant-support-calculator")({
  head: () => ({
    meta: [
      { title: "Implant Support Calculator — Stability & Treatment Match" },
      { name: "description", content: "Estimate the support ratio and long-term stability of your dental implant treatment plan based on missing teeth, jaw type and bone density." },
      { property: "og:title", content: "Implant Support Calculator" },
      { property: "og:description", content: "Stability score and support ratio for your implant treatment plan." },
    ],
    links: [{ rel: "canonical", href: "/implant-support-calculator" }],
  }),
  component: () => (
    <RatioCalculator
      title="Implant Support Calculator"
      lead="Calculate the support ratio and stability score for your dental implant treatment plan."
    />
  ),
});
