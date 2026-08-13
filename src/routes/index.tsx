import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, CheckCircle2, Globe2, HeartHandshake, ShieldCheck, Star, Stethoscope } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/site/Section";
import { CalculatorPage } from "./calculator";
import allOn4 from "@/assets/all-on-4.jpg";
import smilingPatient from "@/assets/smiling-patient.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental Implant Cost Calculator (2026) – Estimate Your Implant Cost Instantly" },
      { name: "description", content: "Use our free dental implant cost calculator to estimate single tooth, All-on-4, and full mouth dental implant costs in the USA. Instant personalized estimates." },
      { property: "og:title", content: "Dental Implant Cost Calculator (2026) – Instant US Estimate" },
      { property: "og:description", content: "Free dental implant cost calculator for the USA — estimate single tooth implant cost, full mouth dental implant cost, and permanent implant cost with or without insurance." },
      { name: "keywords", content: "dental implant cost calculator, single tooth implant cost, cheapest tooth implant cost, full mouth dental implant cost calculator in USA, permanent dental implant cost calculator in USA with insurance, dental procedure cost estimator" },
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

const benefits = [
  { icon: Stethoscope, title: "Instant, itemized estimates", body: "See implant, abutment, crown, bone graft and sinus lift costs broken out — not one vague number." },
  { icon: Globe2, title: "Real 2026 US pricing", body: "Built on aggregated pricing from 1,800+ verified US clinics across 50+ cities." },
  { icon: ShieldCheck, title: "Insurance-aware", body: "Model PPO coverage of 10–50% and compare your cost with and without insurance." },
  { icon: Award, title: "Financing built in", body: "Turn any estimate into a monthly payment with the loan and finance calculators." },
  { icon: CheckCircle2, title: "Matched to your case", body: "Single tooth, bridge, All-on-4, All-on-6 or full mouth — the right treatment for your jaw." },
  { icon: HeartHandshake, title: "Free and private", body: "No signup, no sales calls. Your answers stay on your device unless you ask us to help." },
];

const testimonials = [
  { name: "Mark D.", country: "Dallas, TX", quote: "Finally a calculator that breaks down crown material, brand and bone graft costs clearly for US pricing." },
  { name: "Sarah K.", country: "Miami, FL", quote: "The financing estimator helped me budget my All-on-4 treatment without surprises." },
  { name: "James R.", country: "Seattle, WA", quote: "Estimate was within $400 of my final invoice. Insurance estimator was a bonus." },
];

const trustItems = [
  { icon: ShieldCheck, title: "Medically reviewed", body: "Every cost model and educational article is reviewed by licensed dental professionals." },
  { icon: Globe2, title: "Globally calibrated", body: "Pricing data from 1,800+ verified clinics across 32 countries — updated quarterly." },
  { icon: HeartHandshake, title: "Patient-first", body: "We never sell your data. No paid placements distort our estimates or recommendations." },
];

const howItWorks = [
  { icon: Globe2, title: "Pick your location", body: "Local US clinic pricing built in." },
  { icon: CheckCircle2, title: "Describe your case", body: "Teeth count, bone graft, sinus lift, materials." },
  { icon: Award, title: "Get a breakdown", body: "Range, monthly payment and insurance view." },
];

const faqItems = [
  { q: "How much does a single tooth implant cost in the USA?", a: "The single tooth implant cost in the USA is typically $3,500–$6,000, including the implant, abutment and crown. The cheapest tooth implant cost — around $1,500–$2,500 — is usually found at dental schools and community clinics." },
  { q: "How accurate is this dental implant cost calculator?", a: "Our dental implant cost calculator is within 10–15% of final clinic invoices based on data from 1,800+ verified US clinics, updated quarterly." },
  { q: "Does the calculator include insurance?", a: "Yes. The dental implant cost calculator in USA with insurance models common PPO coverage (10–50%) and shows both dental cost with insurance and cost of dental procedures without insurance side-by-side." },
  { q: "Can I finance my treatment?", a: "Yes — many US clinics offer 0% EMI for 6–12 months, and dental lenders extend 12–24 month plans. HSA/FSA funds can also apply." },
  { q: "Do you share my information with clinics?", a: "Only when you explicitly request to connect with a specific clinic. We never sell your data — see our Privacy Policy." },
];

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {body && <p className="mt-3 text-muted-foreground">{body}</p>}
    </div>
  );
}

function Home() {
  return (
    <div className="bg-background">
      <section id="calculator" className="scroll-mt-20">
        <CalculatorPage embedded />
      </section>

      <nav aria-label="Homepage sections" className="border-b border-border bg-card/90">
        <div className="container mx-auto flex gap-4 overflow-x-auto px-4 py-3 text-sm text-muted-foreground">
          {[
            ["About", "about-calculator"],
            ["How it works", "how-it-works"],
            ["Why use it", "why-use-it"],
            ["Reviews", "reviews"],
            ["Trust", "trust"],
            ["FAQ", "faq"],
          ].map(([label, id]) => <a key={id} className="whitespace-nowrap transition-colors hover:text-secondary" href={`#${id}`}>{label}</a>)}
        </div>
      </nav>

      <main>
        <section id="about-calculator" className="container mx-auto scroll-mt-20 px-4 py-12 md:py-14">
          <SectionHeading eyebrow="About the calculator" title="What Is a Dental Implant Cost Calculator and Why Do You Need One?" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div className="space-y-4 text-foreground/85 leading-7">
              <p>A <a className="font-semibold text-secondary hover:underline" href="/calculator">dental implant cost calculator</a> is a free, necessary tool that estimates the cost of what you will actually pay for implant treatment before you ever go to the dentist.</p>
              <p>This tool gives you an estimated amount and an idea of the treatment’s cost. It gives you the full picture: enter your state, procedure type, crown material preference, and any add-on procedures you might need to get a realistic low-to-high price range based on 2026 US national pricing data.</p>
              <p>You don’t need to sign up for any account or any sales call. Our tool is completely free, and you can use it anywhere.</p>
            </div>
            <Card className="overflow-hidden border-border/70 shadow-sm">
              <img src={allOn4} alt="All-on-4 full-arch dental implant illustration" width={1400} height={1000} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </Card>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 border-y border-border bg-card">
          <div className="container mx-auto px-4 py-12 md:py-14">
            <SectionHeading eyebrow="How it works" title="Your estimate in three steps" />
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {howItWorks.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.05}>
                  <Card className="h-full border-border/70 p-5 shadow-sm">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground"><step.icon className="h-5 w-5" /></div>
                    <h3 className="mt-4 font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="why-use-it" className="container mx-auto scroll-mt-20 px-4 py-12 md:py-14">
          <SectionHeading eyebrow="Why use it" title="Why patients trust this Dental Implant Cost Calculator" />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <FadeIn key={benefit.title} delay={i * 0.04}>
                <Card className="h-full border-border/70 p-5 shadow-sm transition-shadow hover:shadow-elegant">
                  <benefit.icon className="h-5 w-5 text-secondary" />
                  <h3 className="mt-3 font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.body}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="reviews" className="scroll-mt-20 border-y border-border bg-gradient-soft">
          <div className="container mx-auto px-4 py-12 md:py-14">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
              <img src={smilingPatient} alt="Smiling patient after dental implant treatment" width={1200} height={1400} loading="lazy" className="mx-auto aspect-[4/5] w-full max-w-xs rounded-2xl border border-border/60 object-cover shadow-sm" />
              <div>
                <SectionHeading eyebrow="Reviews / testimonials" title="Dental Implant Cost Calculator trusted across the United States" body="Real stories from US patients who used ImplantCost to plan their treatment." />
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.name} className="h-full border-border/70 p-5 shadow-sm">
                      <div className="flex gap-1 text-secondary" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</div>
                      <p className="mt-3 text-sm text-foreground/90">“{testimonial.quote}”</p>
                      <p className="mt-4 text-xs font-semibold">{testimonial.name}</p>
                      <p className="text-[11px] text-muted-foreground">{testimonial.country}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="trust" className="container mx-auto scroll-mt-20 px-4 py-12 md:py-14">
          <SectionHeading eyebrow="Why people trust us" title="Helping patients make confident implant decisions" body="ImplantCost is an independent, medically reviewed platform that demystifies dental implant pricing for patients across the world." />
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {trustItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.05}>
                <Card className="h-full border-border/70 p-5 shadow-sm">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground"><item.icon className="h-5 w-5" /></div>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 border-y border-border bg-card">
          <div className="container mx-auto px-4 py-12 md:py-14">
            <SectionHeading eyebrow="FAQ" title="Dental implant questions, answered" body="Reviewed by our clinical team. If your question isn't here, contact us." />
            <Accordion type="single" collapsible className="mt-6 max-w-4xl">
              {faqItems.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-14">
          <FadeIn>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-7 text-primary-foreground shadow-elegant md:p-10">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Plan with the Dental Implant Cost Calculator with confidence</h2>
                <p className="mt-3 text-primary-foreground/80">Join 240,000+ US patients who used the Dental Implant Cost Calculator to plan their treatment with confidence.</p>
                <Button asChild size="lg" className="mt-6 bg-background text-foreground hover:bg-background/90">
                  <Link to="#calculator">Calculate My Cost <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
