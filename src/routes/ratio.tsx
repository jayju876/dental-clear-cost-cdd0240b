import { createFileRoute } from "@tanstack/react-router";
import { RatioCalculator } from "@/components/site/RatioCalculator";

export const Route = createFileRoute("/ratio")({
  head: () => ({
    meta: [
      { title: "Dental Implant Ratio Calculator – How Many Implants You Need" },
      { name: "description", content: "Find out how many dental implants you need based on missing teeth, jaw type and bone density. Get a recommended treatment and stability score instantly." },
      { property: "og:title", content: "Dental Implant Ratio Calculator" },
      { property: "og:description", content: "Match missing teeth to the right implant treatment — single, bridge, All-on-4/6/8 or mini." },
    ],
    links: [{ rel: "canonical", href: "/ratio" }],
  }),
  component: () => (
    <RatioCalculator
      title="Dental Implant Ratio Calculator"
      lead="Estimate how many implants you'll need and the right treatment match — based on missing teeth, jaw and bone condition."
    />
  ),
});
