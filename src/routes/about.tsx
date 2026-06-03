import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Award, HeartHandshake, Globe2, Users, Microscope } from "lucide-react";
import { Card } from "@/components/ui/card";
import { FadeIn, PageShell } from "@/components/site/Section";
import { InternalLinks } from "@/components/site/InternalLinks";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ImplantCost — Transparent Global Dental Pricing" },
      { name: "description", content: "ImplantCost helps patients worldwide make confident dental implant decisions with transparent, medically reviewed pricing data." },
      { property: "og:title", content: "About ImplantCost" },
      { property: "og:description", content: "Transparent dental implant pricing data across 32 countries." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { icon: ShieldCheck, title: "Medically reviewed", body: "Every cost model and educational article is reviewed by licensed dental professionals." },
  { icon: Globe2, title: "Globally calibrated", body: "Pricing data from 1,800+ verified clinics across 32 countries — updated quarterly." },
  { icon: HeartHandshake, title: "Patient-first", body: "We never sell your data. No paid placements distort our estimates or recommendations." },
];

const team = [
  { name: "Dr. Anita Rao, BDS MDS", role: "Clinical Lead · Prosthodontist", bio: "15+ years restorative dentistry, ex-faculty at Manipal College of Dental Sciences." },
  { name: "Dr. Marcus Hill, DDS", role: "International Medical Advisor", bio: "US-licensed implantologist consulting on cross-border treatment planning." },
  { name: "Lena Park", role: "Head of Research", bio: "Leads the global pricing dataset and quarterly clinic verification process." },
];

function About() {
  return (
    <PageShell
      eyebrow="About us"
      title="Helping patients make confident implant decisions"
      lead="ImplantCost is an independent, medically reviewed platform that demystifies dental implant pricing for patients across the world."
    >
      <div className="grid md:grid-cols-3 gap-5">
        {values.map((v, i) => (
          <FadeIn key={v.title} delay={i * 0.05}>
            <Card className="p-6 h-full border-border/70">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <v.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">{v.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </Card>
          </FadeIn>
        ))}
      </div>

      <section className="mt-16">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold">Our mission</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl">
            Dental implant treatment can vary by 5–10× in price across countries — and even between clinics in the same city.
            We exist to put real, comparable pricing data in patients' hands so they can plan with confidence, free from hidden fees and surprise invoices.
          </p>
        </FadeIn>

        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          <Stat icon={Users} value="240,000+" label="Patients helped" />
          <Stat icon={Microscope} value="1,800+" label="Verified clinics" />
          <Stat icon={Award} value="32" label="Countries covered" />
        </div>
      </section>

      <section className="mt-16">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold">Editorial team</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">Our medical board reviews every cost model and clinical article before publication.</p>
        </FadeIn>
        <div className="mt-8 grid sm:grid-cols-3 gap-5">
          {team.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.05}>
              <Card className="p-6 h-full border-border/70">
                <div className="h-12 w-12 rounded-full bg-gradient-accent inline-flex items-center justify-center text-accent-foreground font-semibold">{m.name[0]}</div>
                <p className="mt-4 font-semibold">{m.name}</p>
                <p className="text-xs text-secondary font-medium uppercase tracking-wider">{m.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>
      <InternalLinks heading="Explore ImplantCost" />
    </PageShell>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof ShieldCheck; value: string; label: string }) {
  return (
    <Card className="p-6 text-center border-border/70">
      <Icon className="mx-auto h-6 w-6 text-secondary" />
      <p className="mt-3 text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </Card>
  );
}
