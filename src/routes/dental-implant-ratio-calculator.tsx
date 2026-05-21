import { createFileRoute } from "@tanstack/react-router";
import { RatioCalculator } from "@/components/site/RatioCalculator";

export const Route = createFileRoute("/dental-implant-ratio-calculator")({
  head: () => ({
    meta: [
      { title: "Dental Implant Ratio Calculator — Implants Per Missing Tooth" },
      { name: "description", content: "How many implants do you need? Our ratio calculator matches missing teeth, jaw type and bone condition to the right treatment — single, bridge, All-on-4/6/8 or mini." },
      { property: "og:title", content: "Dental Implant Ratio Calculator" },
      { property: "og:description", content: "Find the right implant-to-teeth ratio and recommended treatment for your case." },
    ],
    links: [{ rel: "canonical", href: "/dental-implant-ratio-calculator" }],
  }),
  component: () => <RatioCalculator title="Dental Implant Ratio Calculator" />,
});
