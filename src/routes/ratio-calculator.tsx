import { createFileRoute } from "@tanstack/react-router";
import { RatioCalculator } from "@/components/site/RatioCalculator";

export const Route = createFileRoute("/ratio-calculator")({
  head: () => ({
    meta: [
      { title: "Dental Implant Ratio Calculator — How Many Implants You Need" },
      { name: "description", content: "Estimate the right implant-to-teeth ratio. Get a recommended treatment, implant count and stability score based on your jaw and bone condition." },
      { property: "og:title", content: "Dental Implant Ratio Calculator" },
      { property: "og:description", content: "How many implants do you need? Single, bridge, All-on-4/6/8 or mini — find your match." },
    ],
    links: [{ rel: "canonical", href: "/ratio-calculator" }],
  }),
  component: () => <RatioCalculator />,
});
