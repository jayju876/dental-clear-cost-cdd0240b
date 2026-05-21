import { createFileRoute } from "@tanstack/react-router";
import { RatioCalculator } from "@/components/site/RatioCalculator";

export const Route = createFileRoute("/all-on-4-calculator")({
  head: () => ({
    meta: [
      { title: "All-on-4 Calculator — Implant Count, Ratio & Stability" },
      { name: "description", content: "All-on-4 calculator: see if four implants per arch is the right fit for your jaw and bone, or whether All-on-6 or All-on-8 would be more stable." },
      { property: "og:title", content: "All-on-4 Calculator" },
      { property: "og:description", content: "All-on-4, All-on-6 or All-on-8? Match the right full-arch treatment to your case." },
    ],
    links: [{ rel: "canonical", href: "/all-on-4-calculator" }],
  }),
  component: () => (
    <RatioCalculator
      title="All-on-4 Implant Calculator"
      lead="Find out whether All-on-4, All-on-6 or All-on-8 is the right full-arch treatment for your jaw and bone profile."
    />
  ),
});
