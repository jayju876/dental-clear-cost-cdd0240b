import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/site/Section";
import { CostGuideContent } from "@/components/site/CostGuideContent";
import { InternalLinks } from "@/components/site/InternalLinks";

export const Route = createFileRoute("/dental-implant-cost-guide")({
  head: () => ({
    meta: [
      { title: "Dental Implant Cost Guide (2026) — US Prices, Insurance & Ranges" },
      { name: "description", content: "Full 2026 US dental implant cost guide: average price ranges by treatment, what drives the cost, and what implants cost with and without insurance." },
      { property: "og:title", content: "Dental Implant Cost Guide (2026)" },
      { property: "og:description", content: "Average US implant cost ranges, cost factors and insurance breakdowns for 2026." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/dental-implant-cost-guide" }],
  }),
  component: CostGuide,
});

const costRanges = [
  { label: "Single Tooth Implant Cost", range: "$3,500 – $6,000", body: "Implant + abutment + crown per tooth. The cheapest tooth implant cost in the USA typically starts near $1,800 at dental schools and community clinics." },
  { label: "All-on-4 (Full Arch)", range: "$20,000 – $30,000", body: "Four implants supporting a full-arch prosthesis — a popular permanent dental implant option in the USA." },
  { label: "Full Mouth Dental Implants", range: "$40,000 – $90,000", body: "Both arches with premium materials. Use our full mouth dental implant cost calculator in USA for a personalized range." },
];

const educational = [
  { title: "Single Tooth Implant Cost", body: "One missing tooth replaced with a titanium post, abutment and crown — typically $3,500–$6,000 in the US, or as low as ~$1,800 at the cheapest tooth implant clinics." },
  { title: "Full Mouth & All-on-4", body: "Full-arch restoration on 4 or 6 implants. Our full mouth dental implant cost calculator in USA breaks the number down by state and clinic tier." },
  { title: "Permanent Implants in the USA", body: "Our permanent dental implant cost calculator in USA models zirconia bridges and screw-retained prosthetics designed to last 20+ years." },
  { title: "Cost With & Without Insurance", body: "Compare the cost of dental procedures without insurance to your dental cost with insurance — most PPO plans cover 10–50% of implant treatment." },
];

function CostGuide() {
  return (
    <>
      <section className="container mx-auto px-4 pt-12 pb-4">
        <FadeIn className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Average US implant costs · 2026</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">Dental Implant Cost Calculator ranges for the USA</h1>
          <p className="mt-4 text-lg text-muted-foreground">Aggregated from a verified dental procedures cost list covering New York, Los Angeles, Chicago, Houston, Miami, Dallas, San Diego, Atlanta, Seattle and Phoenix — useful as a dental procedure cost estimator before your consultation.</p>
          <Button asChild className="mt-6 bg-gradient-primary text-primary-foreground">
            <Link to="/" hash="calculator">Get your personalized estimate</Link>
          </Button>
        </FadeIn>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {costRanges.map((r, i) => (
            <FadeIn key={r.label} delay={i * 0.05}>
              <Card className="p-6 h-full border-border/70 card-lift hover:shadow-elegant">
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{r.label}</p>
                <p className="mt-3 text-3xl font-bold tracking-tight">{r.range}</p>
                <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl">What the Dental Implant Cost Calculator factors in</h2>
        </FadeIn>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {educational.map((e, i) => (
            <FadeIn key={e.title} delay={i * 0.05}>
              <div className="p-5 rounded-xl border border-border bg-card h-full card-lift hover:shadow-elegant">
                <h3 className="font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <FadeIn className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Insurance & transparency</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Dental Implant Cost Calculator: with insurance and without</h2>
          <p className="mt-3 text-muted-foreground">
            Use our dental implant cost calculator in USA with insurance to see your out-of-pocket after PPO benefits, then flip to the uninsured view to compare the cost of dental procedures without insurance. It works as a broader dental procedure cost estimator too — a plain-English alternative to the Delta Dental cost estimator with insurance and the Delta Dental procedures cost list — covering every US insurer, state and clinic tier, including the dental implant cost with insurance in California.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="font-semibold">Dental cost with insurance</h3>
              <p className="mt-2 text-sm text-muted-foreground">Most PPO plans cover 10–50% of implant treatment, capped by an annual maximum. Our estimator applies your coverage tier to a real US dental procedures cost list.</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="font-semibold">Dental cost without insurance</h3>
              <p className="mt-2 text-sm text-muted-foreground">For uninsured patients we surface the cheapest tooth implant cost tiers — dental schools, community clinics and in-house membership plans — alongside standard private pricing.</p>
            </div>
          </div>
        </FadeIn>
      </section>

      <CostGuideContent />

      <div className="container mx-auto px-4 pb-16">
        <InternalLinks heading="Plan your treatment next" />
      </div>
    </>
  );
}
