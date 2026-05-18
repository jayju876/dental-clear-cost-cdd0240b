import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck, Globe2, Calculator as CalcIcon, Star, Award, Users, Activity,
  ArrowRight, CheckCircle2, Sparkles, TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental Implant Cost Calculator — Worldwide Estimates" },
      { name: "description", content: "Get instant dental implant cost estimates worldwide. Compare prices across India, USA, UK, UAE and more." },
      { property: "og:title", content: "Dental Implant Cost Calculator — Worldwide Estimates" },
      { property: "og:description", content: "Compare dental implant prices worldwide with personalized estimates." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const stats = [
  { label: "Estimates generated", value: "240K+", icon: CalcIcon },
  { label: "Countries supported", value: "32", icon: Globe2 },
  { label: "Verified clinics", value: "1,800+", icon: ShieldCheck },
  { label: "Avg. savings (India)", value: "70%", icon: TrendingDown },
];

const trustBadges = [
  "ISO 27001 Data Security",
  "HIPAA Aligned",
  "GDPR Compliant",
  "Medically Reviewed",
];

const testimonials = [
  { name: "Priya S.", country: "UK → India", quote: "Saved over £6,400 on full-arch implants. The estimate was within 5% of my final invoice." },
  { name: "Mark D.", country: "USA", quote: "Finally a calculator that breaks down crown material, brand and bone graft costs clearly." },
  { name: "Ahmed R.", country: "UAE", quote: "Compared three countries in under a minute. The financing estimate sealed it for me." },
];

const educational = [
  { title: "Single Tooth Implant", body: "Replacement of one missing tooth with a titanium post, abutment and crown." },
  { title: "All-on-4 / All-on-6", body: "Full-arch restoration anchored on 4 or 6 implants — ideal for full-mouth rehabilitation." },
  { title: "Bone Grafting", body: "Augments insufficient jawbone to securely host an implant; cost varies by complexity." },
  { title: "Crown Materials", body: "Zirconia, PFM and E.max — each balances aesthetics, durability and price differently." },
];

const blogTeasers = [
  { title: "India vs USA: Dental Implant Cost in 2026", excerpt: "A side-by-side breakdown of total treatment cost, travel, and quality of care.", tag: "Cost Guide" },
  { title: "How to Choose an Implant Brand", excerpt: "Straumann, Nobel Biocare, Osstem and more — what actually matters.", tag: "Education" },
  { title: "Financing Your Implants", excerpt: "EMI, dental loans and insurance: the realistic options in 2026.", tag: "Finance" },
];

const faqs = [
  { q: "How accurate is the cost estimate?", a: "Our estimates are based on aggregated 2025-2026 clinic pricing across 32 countries and are typically within 10–15% of final invoices." },
  { q: "Is the calculator free to use?", a: "Yes. The full calculator, country comparison and breakdown are 100% free." },
  { q: "Do you share my information?", a: "Never sold. Your contact details are only used to send your detailed estimate. See our Privacy Policy." },
  { q: "Why is India so much cheaper?", a: "Lower clinic overhead, favourable exchange rates and a large pool of internationally-trained dentists." },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full bg-gradient-accent blur-3xl opacity-20" />
        </div>
        <div className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              Updated for 2026 pricing across 32 countries
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
              Get Instant Dental Implant <span className="text-gradient">Cost Estimates</span> Worldwide
            </h1>
            <p className="mt-5 text-lg md:text-xl text-muted-foreground">
              Compare dental implant prices across India, USA, UK, UAE, and more with personalized cost estimates.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-elegant">
                <Link to="/calculator">Start Calculator <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/calculator">Compare Costs</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {trustBadges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-secondary" /> {b}</span>
              ))}
            </div>
          </motion.div>

          {/* stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.05}>
                <Card className="p-5 text-center border-border/70">
                  <s.icon className="mx-auto h-6 w-6 text-secondary" />
                  <p className="mt-3 text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-20">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">How it works</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">A transparent, clinic-grade estimate in 60 seconds</h2>
          <p className="mt-4 text-muted-foreground">Answer a few questions about your case and location. We model 2026 pricing data from verified clinics to produce a realistic range — broken down by component.</p>
        </FadeIn>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: Globe2, title: "Pick your country", body: "We tailor pricing using local clinic data and currency." },
            { icon: Activity, title: "Describe your case", body: "Missing teeth, bone graft, sinus lift and material preferences." },
            { icon: Award, title: "Receive a breakdown", body: "Range, EMI, savings vs. home country and recommended treatment." },
          ].map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08}>
              <Card className="p-6 h-full border-border/70 hover:shadow-elegant transition-shadow">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-20">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold max-w-2xl">Understand what drives implant cost</h2>
          </FadeIn>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {educational.map((e, i) => (
              <FadeIn key={e.title} delay={i * 0.05}>
                <div className="p-5 rounded-xl border border-border bg-background h-full">
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Trusted by patients in 32 countries</h2>
          <p className="mt-4 text-muted-foreground">Real stories from people who used ImplantCost to plan their treatment.</p>
        </FadeIn>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.06}>
              <Card className="p-6 h-full border-border/70">
                <div className="flex gap-1 text-secondary">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm text-foreground/90">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-accent inline-flex items-center justify-center text-accent-foreground text-sm font-semibold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.country}</p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Blog preview */}
      <section className="bg-gradient-soft border-y border-border">
        <div className="container mx-auto px-4 py-20">
          <FadeIn className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">From the blog</h2>
              <p className="mt-3 text-muted-foreground max-w-xl">Cost guides, brand comparisons and patient stories — medically reviewed.</p>
            </div>
            <Button asChild variant="outline"><Link to="/blog">View all articles <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </FadeIn>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {blogTeasers.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.06}>
                <Card className="overflow-hidden h-full border-border/70 hover:shadow-elegant transition-shadow">
                  <div className="aspect-[16/9] bg-gradient-accent opacity-90" />
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{p.tag}</span>
                    <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                    <Link to="/blog" className="mt-4 inline-flex items-center text-sm font-semibold text-secondary">Read more <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          <FadeIn className="md:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">FAQ</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Common questions</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to know before getting your estimate.</p>
            <Button asChild className="mt-6 bg-gradient-primary text-primary-foreground"><Link to="/faq">All FAQs</Link></Button>
          </FadeIn>
          <div className="md:col-span-2">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="container mx-auto px-4 pb-20">
        <FadeIn>
          <div className="rounded-2xl bg-gradient-primary p-10 md:p-14 text-primary-foreground shadow-elegant relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <Users className="h-8 w-8 text-accent" />
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">Plan your implant treatment with confidence</h2>
              <p className="mt-3 text-primary-foreground/80">Join 240,000+ patients who used ImplantCost to compare prices and find the right treatment.</p>
              <Button asChild size="lg" className="mt-6 bg-background text-foreground hover:bg-background/90">
                <Link to="/calculator">Start free estimate <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
