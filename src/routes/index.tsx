import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck, Globe2, Calculator as CalcIcon, Star, Award, Users, Activity,
  ArrowRight, CheckCircle2, Sparkles, TrendingDown, Wallet, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/site/Section";
import { CountUp } from "@/components/site/CountUp";
import { CalculatorPage } from "./calculator";

import heroImg from "@/assets/hero-clinic.jpg";
import smilingPatient from "@/assets/smiling-patient.jpg";
import allOn4 from "@/assets/all-on-4.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental Implant Cost Calculator (2026) – Estimate Your Implant Cost Instantly" },
      { name: "description", content: "Use our free dental implant cost calculator to estimate single tooth, All-on-4, and full mouth dental implant costs in the USA. Instant personalized estimates." },
      { property: "og:title", content: "Dental Implant Cost Calculator (2026) – Instant US Estimate" },
      { property: "og:description", content: "Free dental implant cost calculator for the USA — estimate single tooth implant cost, full mouth dental implant cost, and permanent implant cost with or without insurance." },
      { name: "keywords", content: "dental implant cost calculator, single tooth implant cost, cheapest tooth implant cost, full mouth dental implant cost calculator in USA, permanent dental implant cost calculator in USA, dental implant cost calculator in USA with insurance, dental procedures cost list, delta dental cost estimator with insurance, cost of dental procedures without insurance, dental cost with insurance, dental procedure cost estimator, dental implant cost with insurance in California, dental implant cost in USA with insurance" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Dental Implant Cost Calculator",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web",
          description: "Free dental implant cost calculator for the United States. Estimate single tooth, All-on-4 and full mouth implant costs instantly.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
  }),
  component: Home,
});

const stats = [
  { label: "Estimates generated", value: "240K+", icon: CalcIcon },
  { label: "US cities covered", value: "50+", icon: Globe2 },
  { label: "Verified clinics", value: "1,800+", icon: ShieldCheck },
  { label: "Avg. insurance savings", value: "30%", icon: TrendingDown },
];

const trustBadges = ["HIPAA Aligned", "Insurance Friendly", "Financing Available", "Medically Reviewed"];

const benefits = [
  { icon: CalcIcon, title: "Instant, itemized estimates", body: "See implant, abutment, crown, bone graft and sinus lift costs broken out — not one vague number." },
  { icon: Globe2, title: "Real 2026 US pricing", body: "Built on aggregated pricing from 1,800+ verified US clinics across 50+ cities." },
  { icon: ShieldCheck, title: "Insurance-aware", body: "Model PPO coverage of 10–50% and compare your cost with and without insurance." },
  { icon: Wallet, title: "Financing built in", body: "Turn any estimate into a monthly payment with the loan and finance calculators." },
  { icon: Layers, title: "Matched to your case", body: "Single tooth, bridge, All-on-4, All-on-6 or full mouth — the right treatment for your jaw." },
  { icon: TrendingDown, title: "Free and private", body: "No signup, no sales calls. Your answers stay on your device unless you ask us to help." },
];

const testimonials = [
  { name: "Mark D.", country: "Dallas, TX", quote: "Finally a calculator that breaks down crown material, brand and bone graft costs clearly for US pricing." },
  { name: "Sarah K.", country: "Miami, FL", quote: "The financing estimator helped me budget my All-on-4 treatment without surprises." },
  { name: "James R.", country: "Seattle, WA", quote: "Estimate was within $400 of my final invoice. Insurance estimator was a bonus." },
];


function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full bg-gradient-accent blur-3xl animate-pulse-soft" />
        </div>
        <div className="container mx-auto px-4 pt-12 pb-14 md:pt-20 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                America's dental implant cost estimation platform · 2026
              </span>
              <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight">
                Dental Implant <span className="text-gradient">Cost Calculator</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                The free Dental Implant Cost Calculator estimates single tooth implant cost, full mouth dental implant cost and permanent implant pricing across the USA — with or without insurance — in under 60 seconds.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="shimmer-btn bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-elegant">
                  <Link to="/">Calculate My Cost <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/calculators">See all calculators</Link>
                </Button>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                {trustBadges.map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-secondary" /> {b}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-accent/20 blur-3xl rounded-full -z-10 animate-pulse-soft" />
              <div className="animate-float">
                <img
                  src={heroImg}
                  alt="Dentist showing a dental implant model to a smiling patient"
                  width={1600}
                  height={1100}
                  className="w-full rounded-2xl shadow-elegant border border-border/60 object-cover aspect-[4/3]"
                />
              </div>
              <Card className="absolute -bottom-5 -left-5 hidden md:flex p-3 items-center gap-3 shadow-elegant border-border/70 bg-background/95 backdrop-blur">
                <div className="h-10 w-10 rounded-lg bg-gradient-primary inline-flex items-center justify-center text-primary-foreground"><ShieldCheck className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">Trusted by</p>
                  <p className="text-sm font-bold">240,000+ patients</p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.05}>
                <Card className="card-lift p-4 md:p-5 text-center border-border/70 hover:shadow-elegant">
                  <s.icon className="mx-auto h-6 w-6 text-secondary transition-transform duration-300 group-hover:scale-110" />
                  <p className="mt-2 text-2xl font-bold tracking-tight"><CountUp value={s.value} /></p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive calculator */}
      <section>
        <div className="container mx-auto px-4 pt-12 md:pt-14 text-center max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Free tool</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Dental Implant Cost Calculator</h2>
          <p className="mt-3 text-muted-foreground">
            Answer a few quick questions about your location, number of teeth, implant brand, crown material and any bone graft or sinus lift needs. The Dental Implant Cost Calculator instantly returns an itemized 2026 US price range, your estimated cost with insurance, and an optional monthly payment — free, private and with no signup.
          </p>
        </div>
        <CalculatorPage embedded />
      </section>


      {/* Key benefits */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Why use it</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Why patients trust this Dental Implant Cost Calculator</h2>
        </FadeIn>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.05}>
              <div className="p-5 rounded-xl border border-border bg-card h-full card-lift hover:shadow-elegant">
                <b.icon className="h-5 w-5 text-secondary" />
                <h3 className="mt-3 font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to="/calculators">Explore all calculators</Link>
          </Button>
        </div>
      </section>

      {/* Average US implant costs */}
      <section className="bg-gradient-soft border-y border-border">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <FadeIn className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Average US implant costs · 2026</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Dental Implant Cost Calculator ranges for the USA</h2>
            <p className="mt-3 text-muted-foreground">
              Aggregated from a verified dental procedures cost list covering New York, Los Angeles, Chicago, Houston, Miami, Dallas, San Diego, Atlanta, Seattle and Phoenix.
            </p>
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

          <FadeIn className="mt-12 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold">What the Dental Implant Cost Calculator factors in</h2>
          </FadeIn>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {educational.map((e, i) => (
              <FadeIn key={e.title} delay={i * 0.05}>
                <div className="p-5 rounded-xl border border-border bg-card h-full card-lift hover:shadow-elegant">
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance & transparency */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <FadeIn className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Insurance & transparency</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Dental Implant Cost Calculator: with insurance and without</h2>
          <p className="mt-3 text-muted-foreground">
            See your out-of-pocket after PPO benefits, then flip to the uninsured view to compare the cost of dental procedures without insurance — covering every US insurer, state and clinic tier, including the dental implant cost with insurance in California.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-border bg-card card-lift hover:shadow-elegant">
              <h3 className="font-semibold">Dental cost with insurance</h3>
              <p className="mt-2 text-sm text-muted-foreground">Most PPO plans cover 10–50% of implant treatment, capped by an annual maximum. Our estimator applies your coverage tier to a real US dental procedures cost list.</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card card-lift hover:shadow-elegant">
              <h3 className="font-semibold">Dental cost without insurance</h3>
              <p className="mt-2 text-sm text-muted-foreground">For uninsured patients we surface the cheapest tooth implant cost tiers — dental schools, community clinics and in-house membership plans — alongside standard private pricing.</p>
            </div>
          </div>
        </FadeIn>
      </section>

      <CostGuideContent />


      {/* Short how it works */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">How it works</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">Your estimate in three steps</h2>
              <div className="mt-6 space-y-3">
                {[
                  { icon: Globe2, title: "Pick your location", body: "Local US clinic pricing built in." },
                  { icon: Activity, title: "Describe your case", body: "Teeth count, bone graft, sinus lift, materials." },
                  { icon: Award, title: "Get a breakdown", body: "Range, monthly payment and insurance view." },
                ].map((step) => (
                  <div key={step.title} className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shrink-0">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <img src={allOn4} alt="All-on-4 full-arch dental implant illustration" width={1400} height={1000} loading="lazy" className="w-full rounded-2xl shadow-elegant border border-border/60 object-cover aspect-[4/3]" />
            </FadeIn>
          </div>
        </div>
      </section>




      {/* Testimonials with patient image */}
      <section className="bg-gradient-soft border-y border-border">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-center">
            <FadeIn>
              <img src={smilingPatient} alt="Smiling patient after dental implant treatment" width={1200} height={1400} loading="lazy" className="w-full max-w-sm mx-auto rounded-2xl shadow-elegant border border-border/60 object-cover aspect-[4/5]" />
            </FadeIn>
            <div>
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold">Dental Implant Cost Calculator trusted across the United States</h2>
                <p className="mt-3 text-muted-foreground max-w-xl">Real stories from US patients who used ImplantCost to plan their treatment.</p>
              </FadeIn>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {testimonials.map((t, i) => (
                  <FadeIn key={t.name} delay={i * 0.06}>
                    <Card className="p-5 h-full border-border/70">
                      <div className="flex gap-1 text-secondary">
                        {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-current" />)}
                      </div>
                      <p className="mt-3 text-sm text-foreground/90">"{t.quote}"</p>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-accent inline-flex items-center justify-center text-accent-foreground text-xs font-semibold">
                          {t.name[0]}
                        </div>
                        <div>
                          <p className="text-xs font-semibold">{t.name}</p>
                          <p className="text-[11px] text-muted-foreground">{t.country}</p>
                        </div>
                      </div>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <FadeIn>
          <div className="rounded-2xl bg-gradient-primary p-8 md:p-12 text-primary-foreground shadow-elegant relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <Users className="h-8 w-8 text-accent" />
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">Plan with the Dental Implant Cost Calculator with confidence</h2>
              <p className="mt-3 text-primary-foreground/80">Join 240,000+ US patients who used the Dental Implant Cost Calculator to plan their treatment with confidence.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="shimmer-btn bg-background text-foreground hover:bg-background/90">
                  <Link to="/">Calculate My Cost <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link to="/calculators">Explore all calculators</Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
