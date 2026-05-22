import { createFileRoute } from "@tanstack/react-router";
import { RatioCalculator } from "@/components/site/RatioCalculator";

export const Route = createFileRoute("/ratio")({
  head: () => ({
    meta: [
      { title: "Dental Implant Ratio Calculator — How Many Implants You Need" },
      { name: "description", content: "Find out how many dental implants you need. Get teeth-to-implant ratio, jaw stability score and a recommended treatment — All-on-4, All-on-6, bridge or single." },
      { property: "og:title", content: "Dental Implant Ratio Calculator" },
      { property: "og:description", content: "Match teeth, jaw and bone to the right implant treatment in seconds." },
    ],
    links: [{ rel: "canonical", href: "/ratio" }],
  }),
  component: () => <RatioCalculator />,
});
