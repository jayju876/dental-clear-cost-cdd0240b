import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck, Globe2, Calculator as CalcIcon, Star, Award, Users, Activity,
  ArrowRight, CheckCircle2, Sparkles, TrendingDown, Wallet, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn } from "@/components/site/Section";
import heroImg from "@/assets/hero-clinic.jpg";
import implant3d from "@/assets/implant-3d.jpg";
import smilingPatient from "@/assets/smiling-patient.jpg";
import allOn4 from "@/assets/all-on-4.jpg";
import loanImg from "@/assets/loan-calc.jpg";
import jawImg from "@/assets/jaw-diagram.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental Implant Cost Calculator (2026) – Estimate Your Implant Cost Instantly" },
      { name: "description", content: "Use our free dental implant cost calculator to estimate single tooth, All-on-4, and full mouth dental implant costs in the USA. Instant personalized estimates." },
      { property: "og:title", content: "Dental Implant Cost Calculator (2026) – Free US Estimate" },
      { property: "og:description", content: "Estimate single tooth, All-on-4 and full mouth dental implant costs across the United States in seconds." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Dental Implant Cost Calculator",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        areaServed: "US",
        description: "Free dental implant cost calculator for single tooth, All-on-4 and full mouth implants in the United States.",
      }),
    }],
  }),
  component: Home,
});

const stats = [
  { label: "Estimates generated", value: "240K+", icon: CalcIcon },
  { label: "US metro areas", value: "50+", icon: Globe2 },
  { label: "Verified US clinics", value: "1,800+", icon: ShieldCheck },
  { label: "Avg. insurance savings", value: "35%", icon: TrendingDown },
];

const trustBadges = ["HIPAA Compliant", "ADA-Aligned Data", "Financing Friendly", "Medically Reviewed"];

const calculators = [
  {
    to: "/cost", icon: CalcIcon, img: implant3d,
    title: "Dental Implant Cost Calculator",
    body: "US pricing for single tooth, All-on-4 and full mouth implants. Includes brand, crown material and add-ons.",
  },
  {
    to: "/loan", icon: Wallet, img: loanImg,
    title: "Dental Implant Loan Calculator",
    body: "Plan monthly payments. Adjust treatment cost, down payment, APR and term to see your dental implant financing.",
  },
  {
    to: "/ratio", icon: Layers, img: jawImg,
    title: "Implant Ratio Calculator",
    body: "How many implants do you need? Match teeth, jaw and bone to the right treatment.",
  },
];

const testimonials = [
  { name: "Sarah J.", country: "New York, NY", quote: "The dental implant cost calculator nailed my All-on-4 estimate within $400 of what my clinic quoted." },
  { name: "Mark D.", country: "Dallas, TX", quote: "Finally a calculator that breaks down crown material, brand and bone graft costs clearly." },
  { name: "Linda P.", country: "Miami, FL", quote: "The financing estimator made my full-mouth implants actually feel affordable." },
];

const educational = [
  { title: "Single Tooth Implant", body: "Replacement of one missing tooth with a titanium post, abutment and crown. Typical US cost $3,500–$6,000." },
  { title: "All-on-4 Dental Implants", body: "Full-arch restoration anchored on 4 implants. Average US cost $20,000–$30,000 per arch." },
  { title: "Full Mouth Dental Implants", body: "Both arches restored with implants. Total US cost typically ranges $40,000–$60,000." },
  { title: "Bone Grafting & Sinus Lift", body: "Add-on procedures when jawbone is insufficient. Add $300–$3,000 to total cost." },
];

const blogTeasers = [
  { title: "Full Mouth Dental Implant Cost in the USA (2026)", excerpt: "What All-on-4, All-on-6 and full mouth implants really cost across US cities.", tag: "Cost Guide", img: smilingPatient },
  { title: "Does Insurance Cover Dental Implants?", excerpt: "Medical vs dental coverage, FSA/HSA options and what to expect in 2026.", tag: "Insurance", img: implant3d },
  { title: "Dental Implant Financing in the USA", excerpt: "CareCredit, Lending Club, in-house plans and how to choose the right loan.", tag: "Finance", img: loanImg },
];

const faqs = [
  { q: "How accurate is the cost estimate?", a: "Our estimates are based on aggregated 2025-2026 clinic pricing across 32 countries and are typically within 10–15% of final invoices." },
  { q: "Is the calculator free to use?", a: "Yes. All three calculators — cost, loan and ratio — are 100% free, with no signup required." },
  { q: "Do you share my information?", a: "We don't collect personal details unless you choose to contact a clinic. See our Privacy Policy." },
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
        <div className="container mx-auto px-4 pt-12 pb-14 md:pt-20 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                Updated for 2026 pricing across 32 countries
              </span>
              <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight">
                Get Instant Dental Implant <span className="text-gradient">Cost Estimates</span> Worldwide
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Compare implant prices across India, USA, UK, UAE and more. Plan EMI payments and discover how many implants your case actually needs.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-elegant">
                  <Link to="/calculator">Start Cost Calculator <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/loan-calculator">EMI Calculator</Link>
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
              <div className="absolute -inset-6 bg-gradient-accent/20 blur-3xl rounded-full -z-10" />
              <img
                src={heroImg}
                alt="Dentist showing a dental implant model to a smiling patient"
                width={1600}
                height={1100}
                className="w-full rounded-2xl shadow-elegant border border-border/60 object-cover aspect-[4/3]"
              />
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
                <Card className="p-4 md:p-5 text-center border-border/70">
                  <s.icon className="mx-auto h-6 w-6 text-secondary" />
                  <p className="mt-2 text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator suite */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Free calculator suite</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Three premium tools, zero signup</h2>
          <p className="mt-3 text-muted-foreground">From estimating treatment cost to planning EMI and matching the right implant count — everything you need before your consultation.</p>
        </FadeIn>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {calculators.map((c, i) => (
            <FadeIn key={c.to} delay={i * 0.06}>
              <Card className="overflow-hidden h-full border-border/70 hover:shadow-elegant transition-all group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={c.img} alt={c.title} width={1400} height={1000} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-background/95 text-secondary shadow-md">
                    <c.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                  <Link to={c.to} className="mt-3 inline-flex items-center text-sm font-semibold text-secondary">
                    Open calculator <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* How it works + image */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">How it works</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">A clinic-grade estimate in 60 seconds</h2>
              <p className="mt-3 text-muted-foreground">Answer a few questions about your case and location. We model 2026 pricing data from verified clinics to produce a realistic range — broken down by component.</p>
              <div className="mt-6 space-y-3">
                {[
                  { icon: Globe2, title: "Pick your country", body: "Local clinic data and currency built in." },
                  { icon: Activity, title: "Describe your case", body: "Teeth count, bone graft, sinus lift, material preferences." },
                  { icon: Award, title: "Receive a breakdown", body: "Range, EMI, savings vs. home country and recommended treatment." },
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
              <div className="relative">
                <img src={allOn4} alt="All-on-4 full-arch dental implant illustration" width={1400} height={1000} loading="lazy" className="w-full rounded-2xl shadow-elegant border border-border/60 object-cover aspect-[4/3]" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl">Understand what drives implant cost</h2>
        </FadeIn>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {educational.map((e, i) => (
            <FadeIn key={e.title} delay={i * 0.05}>
              <div className="p-5 rounded-xl border border-border bg-card h-full hover:shadow-elegant transition-shadow">
                <h3 className="font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
              </div>
            </FadeIn>
          ))}
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
                <h2 className="text-3xl md:text-4xl font-bold">Trusted by patients in 32 countries</h2>
                <p className="mt-3 text-muted-foreground max-w-xl">Real stories from people who used ImplantCost to plan their treatment.</p>
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

      {/* Blog */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <FadeIn className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">From the blog</h2>
            <p className="mt-2 text-muted-foreground max-w-xl">Cost guides, brand comparisons and patient stories — medically reviewed.</p>
          </div>
          <Button asChild variant="outline"><Link to="/blog">View all articles <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </FadeIn>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {blogTeasers.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.06}>
              <Card className="overflow-hidden h-full border-border/70 hover:shadow-elegant transition-shadow group">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={p.img} alt={p.title} width={1400} height={1000} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{p.tag}</span>
                  <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <Link to="/blog" className="mt-3 inline-flex items-center text-sm font-semibold text-secondary">Read more <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid md:grid-cols-3 gap-10">
            <FadeIn className="md:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">FAQ</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">Common questions</h2>
              <p className="mt-3 text-muted-foreground">Everything you need to know before getting your estimate.</p>
              <Button asChild className="mt-5 bg-gradient-primary text-primary-foreground"><Link to="/faq">All FAQs</Link></Button>
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
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <FadeIn>
          <div className="rounded-2xl bg-gradient-primary p-8 md:p-12 text-primary-foreground shadow-elegant relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <Users className="h-8 w-8 text-accent" />
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">Plan your implant treatment with confidence</h2>
              <p className="mt-3 text-primary-foreground/80">Join 240,000+ patients who used ImplantCost to compare prices, plan EMI and find the right treatment.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                  <Link to="/calculator">Start free estimate <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link to="/ratio-calculator">How many implants?</Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
