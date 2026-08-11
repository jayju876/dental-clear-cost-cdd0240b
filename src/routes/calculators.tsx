import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator as CalcIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn, PageShell } from "@/components/site/Section";
import { NAV_CALCULATORS } from "@/lib/site-pages";

export const Route = createFileRoute("/calculators")({
  head: () => ({
    meta: [
      { title: "Dental Implant Calculators — Loan, Ratio & Full-Arch Tools" },
      { name: "description", content: "All free dental implant calculators in one place: loan and EMI planning, implant ratio, All-on-4 costs, payment plans and more. Free, instant and no signup." },
      { property: "og:title", content: "Dental Implant Calculators" },
      { property: "og:description", content: "Loan, ratio, All-on-4 and financing calculators for dental implant treatment planning." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/calculators" }],
  }),
  component: CalculatorsPage,
});

function CalculatorsPage() {
  return (
    <PageShell
      eyebrow="Free calculator suite"
      title="Dental implant calculators"
      lead="Secondary tools that pair with the Dental Implant Cost Calculator — plan financing, implant count and full-arch treatment before your consultation."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {NAV_CALCULATORS.map((c, i) => (
          <FadeIn key={c.path} delay={i * 0.05}>
            <Card className="p-6 h-full border-border/70 card-lift hover:shadow-elegant">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <CalcIcon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-semibold">{c.name}</h2>
              {c.navDescription && (
                <p className="mt-2 text-sm text-muted-foreground">{c.navDescription}</p>
              )}
              <Link to={c.path} className="mt-4 inline-flex items-center text-sm font-semibold text-secondary">
                Open calculator <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Card>
          </FadeIn>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8">
        <h2 className="text-2xl font-bold">Need the main cost estimate first?</h2>
        <p className="mt-2 text-muted-foreground">
          Start with the Dental Implant Cost Calculator on the homepage, then use these tools to plan payments and implant count.
        </p>
        <Button asChild className="mt-5 bg-gradient-primary text-primary-foreground">
          <Link to="/" hash="calculator">Open the Dental Implant Cost Calculator</Link>
        </Button>
      </div>
    </PageShell>
  );
}
