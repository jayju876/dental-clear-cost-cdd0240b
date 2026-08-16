import { createFileRoute } from '@tanstack/react-router'
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

function SectionHeading({ eyebrow, title, body, centered = false }: { eyebrow: string; title: string; body?: string; centered?: boolean }) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b5a8f]">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142338] md:text-3xl">{title}</h2>
      {body && <p className="mt-3 leading-7 text-slate-600">{body}</p>}
    </div>
  );
}

function Home() {
  return (
    <div className="bg-[#fbfcfd] text-[#142338]">
      <section className="border-b border-[#e6ebef] bg-gradient-to-b from-[#f5f8f8] via-[#fbfaf4] to-[#fffdf4]">
        <div className="container mx-auto px-4 pb-10 pt-12 text-center md:pb-14 md:pt-16">
          <span className="inline-flex rounded-full bg-[#dff5e8] px-3 py-1 text-xs font-semibold text-[#18734b]">Instant estimate · 100% free</span>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Dental Implant Cost Calculator</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">The free Dental Implant Cost Calculator estimates single tooth implant cost, full mouth dental implant cost and permanent implant pricing across the USA — with or without insurance — in under 60 seconds.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-[#0b5a8f] text-white shadow-sm hover:bg-[#084b78]"><a href="#calculator">Calculate My Cost <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
            <Button asChild size="lg" variant="outline" className="border-[#cbd7df] bg-white text-[#142338] hover:bg-[#f3f7fa]"><a href="#how-it-works">How It Works</a></Button>
          </div>
          <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-sm text-slate-500 sm:grid-cols-3">
            <span className="inline-flex items-center justify-center gap-2"><HeartHandshake className="h-4 w-4 text-[#198754]" /> Free and private</span>
            <span className="inline-flex items-center justify-center gap-2"><ShieldCheck className="h-4 w-4 text-[#198754]" /> Medically reviewed</span>
            <span className="inline-flex items-center justify-center gap-2"><Globe2 className="h-4 w-4 text-[#198754]" /> US pricing coverage</span>
          </div>
        </div>
      </section>

      <nav aria-label="Homepage sections" className="sticky top-0 z-20 border-b border-[#e6ebef] bg-white/95 backdrop-blur">
        <div className="container mx-auto flex gap-2 overflow-x-auto px-4 py-3 text-sm text-slate-600">
          {[["Calculator", "calculator"], ["About", "about-calculator"], ["How it works", "how-it-works"], ["Why use it", "why-use-it"], ["Trust", "trust"], ["FAQ", "faq"]].map(([label, id]) => <a key={id} className="whitespace-nowrap rounded-md border border-[#e1e8ed] bg-white px-3 py-1.5 transition-colors hover:border-[#91b9cf] hover:text-[#0b5a8f]" href={`#${id}`}>{label}</a>)}
        </div>
      </nav>

      <main>
        <section id="calculator" className="scroll-mt-16 border-b border-[#e6ebef] bg-white">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <SectionHeading centered eyebrow="Calculator" title="Start with a personalized estimate" body="Answer a few quick questions about your location, number of teeth, implant brand, crown material and any bone graft or sinus lift needs." />
            <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-xl border border-[#dfe7ec] bg-[#f8fafb] shadow-sm">
              <CalculatorPage embedded />
            </div>
          </div>
        </section>

        <section className="border-b border-[#e6ebef] bg-[#f8fafb]">
          <div className="container mx-auto px-4 py-10 md:py-12">
            <div className="grid gap-4 md:grid-cols-3">
              {howItWorks.map((step, i) => <FadeIn key={step.title} delay={i * 0.05}><Card className="h-full border-[#e1e8ed] bg-white p-5 shadow-sm"><div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#eaf3f8] text-[#0b5a8f]"><step.icon className="h-5 w-5" /></div><h3 className="mt-4 font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p></Card></FadeIn>)}
            </div>
          </div>
        </section>

        <section id="about-calculator" className="scroll-mt-16 border-b border-[#e6ebef] bg-white">
          <div className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[220px_1fr] md:py-14">
            <aside className="hidden lg:block">
              <div className="sticky top-20 rounded-lg border border-[#e1e8ed] bg-[#f8fafb] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0b5a8f]">On this page</p>
                <div className="mt-4 space-y-2 text-sm text-slate-600"><a className="block hover:text-[#0b5a8f]" href="#about-calculator">About the tool</a><a className="block hover:text-[#0b5a8f]" href="#why-use-it">Why use it</a><a className="block hover:text-[#0b5a8f]" href="#reviews">Patient stories</a><a className="block hover:text-[#0b5a8f]" href="#trust">How estimates are built</a><a className="block hover:text-[#0b5a8f]" href="#faq">FAQs</a></div>
              </div>
            </aside>
            <div className="space-y-8">
              <div className="rounded-xl border border-[#e1e8ed] bg-white p-6 shadow-sm md:p-8">
                <SectionHeading eyebrow="About the calculator" title="About the tool and your estimate" />
                <div className="mt-5 grid gap-6 leading-7 text-slate-600 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div className="space-y-4"><p>A <a className="font-semibold text-[#0b5a8f] hover:underline" href="/calculator">dental implant cost calculator</a> is a free, necessary tool that estimates the cost of what you will actually pay for implant treatment before you ever go to the dentist.</p><p>This tool gives you an estimated amount and an idea of the treatment’s cost. It gives you the full picture: enter your state, procedure type, crown material preference, and any add-on procedures you might need to get a realistic low-to-high price range based on 2026 US national pricing data.</p><p>You don’t need to sign up for any account or any sales call. Our tool is completely free, and you can use it anywhere.</p></div><img src={allOn4} alt="All-on-4 full-arch dental implant illustration" width={1400} height={1000} loading="lazy" className="aspect-[4/3] w-full rounded-lg border border-[#e1e8ed] object-cover" /></div>
              </div>

              <div id="how-it-works" className="scroll-mt-16 rounded-xl border border-[#e1e8ed] bg-white p-6 shadow-sm md:p-8"><SectionHeading eyebrow="How it works" title="Your estimate in three steps" /><div className="mt-6 grid gap-3 sm:grid-cols-3">{howItWorks.map((step) => <div key={step.title} className="rounded-lg border border-[#e6ebef] bg-[#fbfcfd] p-4"><h3 className="font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p></div>)}</div></div>

              <div id="why-use-it" className="scroll-mt-16 rounded-xl border border-[#e1e8ed] bg-white p-6 shadow-sm md:p-8"><SectionHeading eyebrow="Why use it" title="Why Trust This Calculator" /><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{benefits.map((benefit) => <div key={benefit.title} className="rounded-lg border border-[#e6ebef] bg-[#fbfcfd] p-4"><benefit.icon className="h-5 w-5 text-[#0b5a8f]" /><h3 className="mt-3 font-semibold">{benefit.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{benefit.body}</p></div>)}</div></div>
            </div>
          </div>
        </section>

        <section id="reviews" className="scroll-mt-16 border-b border-[#e6ebef] bg-[#f8fafb]">
          <div className="container mx-auto px-4 py-12 md:py-14"><div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-center"><img src={smilingPatient} alt="Smiling patient after dental implant treatment" width={1200} height={1400} loading="lazy" className="mx-auto aspect-[4/5] w-full max-w-[220px] rounded-xl border border-[#e1e8ed] object-cover shadow-sm" /><div><SectionHeading eyebrow="Reviews / testimonials" title="What patients say" body="Real stories from US patients who used ImplantCost to plan their treatment." /><div className="mt-6 grid gap-3 md:grid-cols-3">{testimonials.map((testimonial) => <Card key={testimonial.name} className="h-full border-[#e1e8ed] bg-white p-5 shadow-sm"><div className="flex gap-1 text-[#e0a900]" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</div><p className="mt-3 text-sm leading-6 text-slate-700">“{testimonial.quote}”</p><p className="mt-4 text-xs font-semibold">{testimonial.name}</p><p className="text-[11px] text-slate-500">{testimonial.country}</p></Card>)}</div></div></div></div>
        </section>

        <section id="trust" className="scroll-mt-16 border-b border-[#e6ebef] bg-white"><div className="container mx-auto px-4 py-12 md:py-14"><SectionHeading centered eyebrow="Why people trust us" title="How We Build Our Estimates" body="ImplantCost is an independent, medically reviewed platform that demystifies dental implant pricing for patients across the world." /><div className="mt-7 grid gap-4 md:grid-cols-3">{trustItems.map((item) => <Card key={item.title} className="border-[#e1e8ed] bg-white p-6 shadow-sm"><item.icon className="h-6 w-6 text-[#0b5a8f]" /><h3 className="mt-4 font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p></Card>)}</div></div></section>

        <section id="faq" className="scroll-mt-16 bg-[#f8fafb]"><div className="container mx-auto px-4 py-12 md:py-14"><SectionHeading centered eyebrow="FAQ" title="Frequently Asked Questions" body="Reviewed by our clinical team. If your question isn't here, contact us." /><Accordion type="single" collapsible className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-xl border border-[#e1e8ed] bg-white px-5">{faqItems.map((faq, i) => <AccordionItem key={faq.q} value={`faq-${i}`}><AccordionTrigger className="text-left">{faq.q}</AccordionTrigger><AccordionContent className="text-slate-600">{faq.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

        <section className="bg-[#0b5a8f] text-white"><div className="container mx-auto px-4 py-12 text-center md:py-14"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to estimate your treatment cost?</h2><p className="mx-auto mt-3 max-w-2xl text-white/80">Join 240,000+ US patients who used the Dental Implant Cost Calculator to plan their treatment with confidence.</p><Button asChild size="lg" className="mt-6 bg-white text-[#0b5a8f] hover:bg-[#f2f7fa]"><a href="#calculator">Calculate My Cost <ArrowRight className="ml-2 h-4 w-4" /></a></Button></div></section>
      </main>
    </div>
  );
}
