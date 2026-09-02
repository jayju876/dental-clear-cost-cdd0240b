import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Award, CheckCircle2, Globe2, HeartHandshake, ShieldCheck, Star, Stethoscope } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn } from "@/components/site/Section";
import { CalculatorPage } from "./calculator";
import allOn4 from "@/assets/all-on-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental Implants Cost Calculator (2026) – Estimate Your Implant Cost Instantly" },
      { name: "description", content: "Use our free dental implant cost calculator to estimate single tooth, All-on-4, and full mouth dental implant costs in the USA. Instant personalized estimates." },
      { property: "og:title", content: "Dental Implants Cost Calculator (2026) – Instant US Estimate" },
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
          name: "Dental Implants Cost Calculator",
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
  { num: "01", title: "Pick your location", body: "Local US clinic pricing built in — calibrated to your city and state." },
  { num: "02", title: "Describe your case", body: "Teeth count, bone graft, sinus lift, materials and implant brand." },
  { num: "03", title: "Get a breakdown", body: "Range, monthly payment and insurance view — instantly." },
];

const faqItems = [
  { q: "How much does a single tooth implant cost in the USA?", a: "The single tooth implant cost in the USA is typically $3,500–$6,000, including the implant, abutment and crown. The cheapest tooth implant cost — around $1,500–$2,500 — is usually found at dental schools and community clinics." },
  { q: "How accurate is this dental implant cost calculator?", a: "Our dental implant cost calculator is within 10–15% of final clinic invoices based on data from 1,800+ verified US clinics, updated quarterly." },
  { q: "Does the calculator include insurance?", a: "Yes. The dental implant cost calculator in USA with insurance models common PPO coverage (10–50%) and shows both dental cost with insurance and cost of dental procedures without insurance side-by-side." },
  { q: "Can I finance my treatment?", a: "Yes — many US clinics offer 0% EMI for 6–12 months, and dental lenders extend 12–24 month plans. HSA/FSA funds can also apply." },
  { q: "Do you share my information with clinics?", a: "Only when you explicitly request to connect with a specific clinic. We never sell your data — see our Privacy Policy." },
];

const serif = { fontFamily: "'Playfair Display', serif" } as const;

function SectionHeading({ eyebrow, title, body, centered = false }: { eyebrow: string; title: string; body?: string; centered?: boolean }) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl" style={serif}>{title}</h2>
      {body && <p className="mt-4 leading-7 text-slate-400">{body}</p>}
    </div>
  );
}

function Home() {
  return (
    <div className="bg-slate-950 text-slate-200" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-20 pb-14 md:pt-28 md:pb-20">
        <div className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_70%)]" aria-hidden />
        <div className="container relative z-10 mx-auto grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-blue-300">Instant estimate · 100% free</span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl" style={serif}>
              Dental Implants <br className="hidden md:block" />
              <span className="italic text-blue-400">Cost Calculator</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-400 md:text-lg lg:mx-0">
              The free Dental Implant Cost Calculator estimates single tooth implant cost, full mouth dental implant cost and permanent implant pricing across the USA — with or without insurance — in under 60 seconds.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#calculator" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-900/30 transition-all hover:bg-blue-500">
                Calculate My Cost <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#how-it-works" className="inline-flex items-center rounded-full border border-slate-700 px-8 py-4 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-900">
                How It Works
              </a>
            </div>
            <div className="mt-8 grid max-w-lg gap-3 text-sm text-slate-500 sm:grid-cols-3 lg:mx-0 mx-auto">
              <span className="inline-flex items-center justify-center gap-2 lg:justify-start"><HeartHandshake className="h-4 w-4 text-blue-400" /> Free and private</span>
              <span className="inline-flex items-center justify-center gap-2 lg:justify-start"><ShieldCheck className="h-4 w-4 text-blue-400" /> Medically reviewed</span>
              <span className="inline-flex items-center justify-center gap-2 lg:justify-start"><Globe2 className="h-4 w-4 text-blue-400" /> US pricing coverage</span>
            </div>
          </div>
          {/* Calculator preview card */}
          <FadeIn delay={0.15} className="relative hidden lg:block">
            <div className="absolute -inset-4 rounded-[2rem] bg-blue-600/15 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
              <div className="absolute top-0 left-0 h-1 w-full bg-slate-800"><div className="h-full w-1/6 bg-blue-500" /></div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Step 1 of 6</span>
                <span className="text-xs text-slate-500">Personalized estimate</span>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-white" style={serif}>How many teeth need replacement?</h2>
              <div className="mt-6 space-y-3">
                {[["Single Tooth", "One individual implant", true], ["Multiple Teeth", "Bridge or partial restoration", false], ["Full Arch", "All-on-4 or total replacement", false]].map(([t, s, active]) => (
                  <div key={t as string} className={`rounded-2xl border p-4 ${active ? "border-blue-600/50 bg-blue-600/10" : "border-slate-800 bg-slate-800/40"}`}>
                    <p className="font-semibold text-white">{t as string}</p>
                    <p className="text-sm text-slate-400">{s as string}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <a href="#calculator" className="rounded-xl bg-slate-100 px-8 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-white">Start now</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Subnav */}
      <nav aria-label="Homepage sections" className="sticky top-0 z-20 border-y border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="container mx-auto flex gap-2 overflow-x-auto px-4 py-3 text-sm text-slate-400">
          {[["Calculator", "calculator"], ["About", "about-calculator"], ["How it works", "how-it-works"], ["Why use it", "why-use-it"], ["Trust", "trust"], ["FAQ", "faq"]].map(([label, id]) => (
            <a key={id} className="whitespace-nowrap rounded-full border border-slate-800 px-4 py-1.5 transition-colors hover:border-blue-500/50 hover:text-blue-300" href={`#${id}`}>{label}</a>
          ))}
        </div>
      </nav>

      <main>
        {/* Calculator */}
        <section id="calculator" className="scroll-mt-16 px-4 py-14 md:py-20">
          <div className="container mx-auto">
            <SectionHeading centered eyebrow="Calculator" title="Dental Implants Cost Calculator: Start with a personalized estimate" body="Answer a few quick questions about your location, number of teeth, implant brand, crown material and any bone graft or sinus lift needs." />
            <FadeIn className="mx-auto mt-10 max-w-5xl">
              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-white shadow-2xl shadow-blue-950/40">
                <CalculatorPage embedded />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-16 border-y border-slate-900 bg-slate-900/30 px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl" style={serif}>Three Steps to Clarity</h2>
              <p className="mt-3 text-slate-400">Transparent pricing in under a minute.</p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
              {howItWorks.map((step, i) => (
                <FadeIn key={step.num} delay={i * 0.08}>
                  <div className="group h-full rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-colors hover:border-blue-900">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-xl font-bold text-blue-400 transition-transform group-hover:scale-110">{step.num}</div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{step.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* About + Why trust */}
        <section id="about-calculator" className="scroll-mt-16 px-4 py-16 md:py-24">
          <div className="container mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
            <FadeIn className="relative">
              <div className="absolute -inset-4 rounded-full bg-blue-600/15 blur-3xl" aria-hidden />
              <div className="relative overflow-hidden rounded-3xl border border-slate-800">
                <img src={allOn4} alt="All-on-4 full-arch dental implant illustration" width={1400} height={1000} loading="lazy" className="aspect-square w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 to-transparent" aria-hidden />
                <div className="absolute bottom-6 left-6 border-l-2 border-blue-500 pl-4">
                  <p className="text-xl text-white md:text-2xl" style={serif}>“Empowering patients with transparent data.”</p>
                </div>
              </div>
            </FadeIn>
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl" style={serif}>Understand your implant cost estimate</h2>
              <div className="mt-6 space-y-4 leading-7 text-slate-400">
                <p>A <a className="font-semibold text-blue-400 hover:underline" href="/">dental implant cost calculator</a> is a free, necessary tool that estimates the cost of what you will actually pay for implant treatment before you ever go to the dentist.</p>
                <p>This tool gives you the full picture: enter your state, procedure type, crown material preference, and any add-on procedures you might need to get a realistic low-to-high price range based on 2026 US national pricing data.</p>
                <p>No account, no sales call. Our tool is completely free, and you can use it anywhere.</p>
              </div>
              <div className="mt-8 space-y-5">
                {[["Independent data", "We aren't owned by dental clinics. Our estimates are unbiased and patient-focused."], ["Hyper-local precision", "Costs vary by state — we calibrate to your local market rates."], ["Comprehensive breakdown", "Know the difference between abutment, crown, and imaging costs."]].map(([t, b]) => (
                  <div key={t} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20"><div className="h-2 w-2 rounded-full bg-blue-400" /></div>
                    <div>
                      <h3 className="font-bold text-white">{t}</h3>
                      <p className="text-sm text-slate-400">{b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="why-use-it" className="scroll-mt-16 border-y border-slate-900 bg-slate-900/30 px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <SectionHeading centered eyebrow="Why use it" title="Why use this implant cost calculator" body="Built for patients who want real numbers before they sit in the chair." />
            <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, i) => (
                <FadeIn key={b.title} delay={i * 0.05}>
                  <div className="group h-full rounded-3xl border border-slate-800 bg-slate-900 p-7 transition-all hover:-translate-y-1 hover:border-blue-900">
                    <b.icon className="h-6 w-6 text-blue-400" />
                    <h3 className="mt-4 font-bold text-white">{b.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{b.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" className="scroll-mt-16 px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl">
            <SectionHeading centered eyebrow="Reviews" title="What patients say about their estimates" body="Real stories from US patients who used ImplantCost to plan their treatment." />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <FadeIn key={t.name} delay={i * 0.06}>
                  <figure className="h-full rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
                    <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4 fill-current" />)}</div>
                    <blockquote className="mt-4 text-sm italic leading-6 text-slate-300">“{t.quote}”</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-sm font-bold text-blue-400">{t.name[0]}</div>
                      <div>
                        <p className="text-sm font-bold text-white">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.country}</p>
                      </div>
                    </figcaption>
                  </figure>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section id="trust" className="scroll-mt-16 border-y border-slate-900 bg-slate-900/30 px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <SectionHeading centered eyebrow="Why people trust us" title="How we build reliable cost estimates" body="ImplantCost is an independent, medically reviewed platform that demystifies dental implant pricing for patients across the world." />
            <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
              {trustItems.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.06}>
                  <div className="h-full rounded-3xl border border-slate-800 bg-slate-900 p-8">
                    <item.icon className="h-7 w-7 text-blue-400" />
                    <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-16 px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-3xl">
            <SectionHeading centered eyebrow="FAQ" title="Questions about implant cost estimates" body="Reviewed by our clinical team. If your question isn't here, contact us." />
            <Accordion type="single" collapsible className="mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 px-6">
              {faqItems.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`} className="border-slate-800">
                  <AccordionTrigger className="text-left text-white hover:text-blue-300">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-slate-400">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-blue-600 px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl" style={serif}>Ready to find your price?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">Join 240,000+ US patients who used the Dental Implant Cost Calculator to plan their treatment with confidence.</p>
            <a href="#calculator" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-12 py-5 text-lg font-bold text-blue-600 shadow-2xl transition-colors hover:bg-slate-100">
              Start Free Calculation <ArrowRight className="h-5 w-5" />
            </a>
            <p className="mt-5 text-sm text-blue-100">No signup required. Instant results.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
