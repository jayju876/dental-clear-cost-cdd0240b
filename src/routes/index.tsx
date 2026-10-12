import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Globe2, HeartHandshake, Layers, LockKeyhole, ShieldCheck, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CalculatorPage } from './calculator';
import { AUTHORS } from '@/lib/authors';
import clinic from '@/assets/hero-clinic.jpg';
import allOn4 from '@/assets/all-on-4.jpg';
import patient from '@/assets/smiling-patient.jpg';

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental Implants Cost Calculator (2026) – Estimate Your Implant Cost Instantly" },
      { name: "description", content: "Use our free dental implant cost calculator to estimate single tooth, All-on-4, and full mouth dental implant costs in the USA. Instant personalized estimates." },
      { property: "og:title", content: "Dental Implants Cost Calculator (2026) – Instant US Estimate" },
      { property: "og:description", content: "Free dental implant cost calculator for the USA — estimate single tooth implant cost, full mouth dental implant cost, and permanent implant cost with or without insurance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "dental implants cost calculator, dental implant cost calculator, calculator implants, recovery time and cost estimates for dental implants, dental implant quotes, dental implant cost 2026, tooth transplant cost, dental titanium implants cost, how much should a dental implant cost, implant cost, average cost dental implant us 2026, average cost of dental implants 2026, average cost dental implants us 2026, abutment and crown cost, dental implant cost us average 2026, estimated dental costs for implants, estimated cost of a dental implant, titanium dental implant cost, dental implant cost guide, average cost dental implant united states 2026, value of dental implants, cost to replace tooth, cost of dental implants 2025, price of tooth replacement, dental implants cost guide, estimated cost for dental implants, dental abutment cost" },
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

const faqItems = [
  { q: "How much does a single tooth implant cost in the USA?", a: "The single tooth implant cost in the USA is typically $3,500–$6,000, including the implant, abutment and crown. The cheapest tooth implant cost — around $1,500–$2,500 — is usually found at dental schools and community clinics." },
  { q: "How accurate is this dental implant cost calculator?", a: "Our dental implant cost calculator is within 10–15% of final clinic invoices based on data from 1,800+ verified US clinics, updated quarterly." },
  { q: "Does the calculator include insurance?", a: "Yes. The dental implant cost calculator in USA with insurance models common PPO coverage (10–50%) and shows both dental cost with insurance and cost of dental procedures without insurance side-by-side." },
  { q: "Can I finance my treatment?", a: "Yes — many US clinics offer 0% EMI for 6–12 months, and dental lenders extend 12–24 month plans. HSA/FSA funds can also apply." },
  { q: "Do you share my information with clinics?", a: "Only when you explicitly request to connect with a specific clinic. We never sell your data — see our Privacy Policy." },
];

const benefits = [
  { icon: Layers, title: 'A clearer cost breakdown', body: 'Compare implant types, crown materials and additional procedures in one estimate.' },
  { icon: Globe2, title: 'Your location matters', body: 'Explore how your treatment budget changes with your country and city.' },
  { icon: Wallet, title: 'Plan beyond the price', body: 'Explore monthly payments with our dedicated financing and loan calculators.' },
  { icon: LockKeyhole, title: 'No signup. No pressure.', body: 'Use the calculator freely, without an account or a sales call.' },
];

function startEstimate() {
  document.getElementById('estimate-tool')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}

function Home() {
  return (
    <div className="editorial-home bg-background text-foreground">
      <section className="home-hero relative isolate overflow-hidden">
        <img src={clinic} alt="Dentist and patient discussing a dental implant in a clinic" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="home-hero-shade absolute inset-0" aria-hidden="true" />
        <div className="home-width relative z-10 py-16 md:py-20">
          <p className="home-eyebrow flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Clarity before your next appointment</p>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.12] md:text-6xl">Dental Implant<br />Cost Calculator<span className="home-serif mt-2 block text-secondary">A confident start.</span></h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">Understand your single tooth or full mouth implant costs. Get a personalized estimate, explore your options, and take your next step with confidence.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={startEstimate} className="home-pill h-12 bg-primary text-primary-foreground hover:bg-primary/90">Calculate my cost <ArrowUpRight /></Button>
            <Button asChild variant="outline" size="lg" className="home-pill h-12 border-border bg-background/60 hover:bg-muted"><Link to="/about">Meet ImplantCost <ArrowRight /></Link></Button>
          </div>
          <p className="mt-7 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-secondary" /> Free to use <span className="px-2">·</span> No account needed</p>
        </div>
        <Button variant="outline" size="icon" onClick={startEstimate} aria-label="Go to cost calculator" className="absolute bottom-7 right-7 z-10 h-11 w-11 rounded-full border-border bg-background/60"><ArrowDown /></Button>
      </section>

      <section className="home-facts border-y border-border bg-muted" aria-label="Calculator at a glance">
        <div className="home-width grid grid-cols-2 gap-y-7 py-8 md:grid-cols-4">
          {[
            ['100%', 'Free to use'], ['6 steps', 'A personalized estimate'], ['4 authors', 'Dental editorial perspectives'], ['2026', 'Treatment cost planning'],
          ].map(([value, label]) => <div key={label} className="home-fact px-5 text-center"><p className="text-2xl font-medium text-secondary md:text-3xl">{value}</p><p className="mt-2 text-xs text-muted-foreground">{label}</p></div>)}
        </div>
      </section>

      <section id="estimate-tool" className="home-section home-width scroll-mt-24">
        <div className="home-section-heading">
          <div><p className="home-eyebrow">Your treatment. Your budget.</p><h2 className="home-heading mt-3">Dental Implant<br className="hidden md:block" /> Cost Calculator</h2></div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">Start with your location, then choose your treatment and materials. See an estimated range before you commit.</p>
        </div>
        <div className="homepage-calculator mt-7"><CalculatorPage embedded /></div>
        <p className="mt-5 max-w-2xl text-xs leading-6 text-muted-foreground">Estimates are for budgeting, not a clinical quote. Your dentist will confirm suitability and final costs after an examination.</p>
      </section>

      <section className="home-section home-width border-t border-border">
        <div className="home-section-heading">
          <div><p className="home-eyebrow">A little knowledge. A better decision.</p><h2 className="home-heading mt-3">Make sense of<br />your smile investment.</h2></div>
          <div className="max-w-sm"><p className="text-sm leading-7 text-muted-foreground">From a single tooth to a full arch, explore the treatment choices and costs that matter to you.</p><Link to="/blog" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-secondary">Explore our articles <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Link to="/blog/$slug" params={{ slug: 'typical-cost-full-set-dental-implants' }} className="home-story group relative overflow-hidden rounded-lg">
            <img src={allOn4} alt="Full-arch dental implant restoration" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="home-story-shade absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6"><div><p className="text-xs text-primary-foreground/70">Full mouth restoration</p><h3 className="mt-2 max-w-xs text-xl font-medium text-primary-foreground">What does a full set of dental implants cost?</h3></div><span className="home-arrow"><ArrowUpRight className="h-5 w-5" /></span></div>
          </Link>
          <Link to="/blog/$slug" params={{ slug: 'dental-implant-vs-bridge-cost-lifespan-pain-2026' }} className="home-story group relative overflow-hidden rounded-lg">
            <img src={patient} alt="Smiling patient" className="h-full w-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="home-story-shade absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6"><div><p className="text-xs text-primary-foreground/70">Compare your options</p><h3 className="mt-2 max-w-xs text-xl font-medium text-primary-foreground">Dental implant or bridge: which is right for you?</h3></div><span className="home-arrow"><ArrowUpRight className="h-5 w-5" /></span></div>
          </Link>
        </div>
      </section>

      <section className="home-section home-width">
        <div className="home-section-heading"><h2 className="home-heading">Less uncertainty.<br />More clarity.</h2><Link to="/calculators" className="inline-flex items-center gap-2 text-sm text-secondary">Explore all calculators <ArrowUpRight className="h-4 w-4" /></Link></div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, index) => <article key={item.title} className="rounded-lg border border-border bg-card p-6"><div className="flex items-center justify-between text-secondary"><item.icon className="h-5 w-5" /><span className="text-xs text-muted-foreground">0{index + 1}</span></div><h3 className="mt-7 text-base font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p></article>)}
        </div>
      </section>

      <section className="home-section home-width border-t border-border">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <img src={clinic} alt="Dental care professional explaining an implant to a patient" className="aspect-[5/4] w-full rounded-lg object-cover" loading="lazy" />
          <div><p className="home-eyebrow">People behind the perspective</p><h2 className="home-heading mt-3">Better information.<br />Better conversations.</h2><p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Our dental and patient-finance authors help you understand treatment options, costs and the questions to bring to your dentist.</p>
            <div className="mt-6 flex items-center gap-4"><div className="flex -space-x-3">{AUTHORS.map(author => <Link key={author.slug} to="/author/$slug" params={{ slug: author.slug }} title={author.name}><img src={author.image} alt={author.name} className="h-10 w-10 rounded-full border-2 border-background object-cover" loading="lazy" /></Link>)}</div><span className="text-xs text-muted-foreground">Four editorial perspectives</span></div>
            <ul className="mt-6 space-y-3 text-sm">{['Treatment options explained clearly', 'Costs and financing in context', 'An estimate, not a substitute for care'].map(text => <li key={text} className="flex items-center gap-3"><Check className="h-4 w-4 text-secondary" />{text}</li>)}</ul>
            <Button asChild size="lg" className="home-pill mt-7"><Link to="/about">Meet our authors <ArrowUpRight /></Link></Button>
          </div>
        </div>
      </section>

      <section className="home-section home-width border-t border-border" aria-label="Dental implant cost guide">
        <div className="home-section-heading">
          <div><p className="home-eyebrow">Dental implant cost guide</p><h2 className="home-heading mt-3">Your dental implants<br />cost guide for 2026.</h2></div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">How much should a dental implant cost? Our dental implants cost calculator answers that with clear, personalized numbers.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base font-semibold">Average cost of dental implants 2026</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Wondering about the average cost dental implant US 2026 figures? The average cost dental implants US 2026 range depends on your city, materials and clinic. Our dental implant cost calculator turns the dental implant cost US average 2026 picture into a number that fits your case — including the average cost dental implant United States 2026 ranges and the broader cost of dental implants 2025 trends for comparison.</p>
          </article>
          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base font-semibold">Implant cost, abutment and crown cost</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Every estimate separates the implant cost from the abutment and crown cost, so you see the full dental abutment cost before you commit. We also break down titanium dental implant cost and dental titanium implants cost by material, so the value of dental implants is easy to judge.</p>
          </article>
          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base font-semibold">Estimated cost of a dental implant</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Get the estimated cost of a dental implant in minutes. This calculator implants tool produces estimated dental costs for implants and an estimated cost for dental implants across single tooth, bridge and full-arch treatments — your personal dental implant quotes, free and instant.</p>
          </article>
          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base font-semibold">Price of tooth replacement</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Compare the cost to replace tooth options side by side. The price of tooth replacement varies by treatment — an implant, a bridge or a denture — and our dental implant cost 2026 data helps you weigh each one.</p>
          </article>
          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base font-semibold">Recovery time and cost estimates for dental implants</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Plan with recovery time and cost estimates for dental implants in one place: typical healing timelines by procedure, plus the budget to match, so there are no surprises after your consultation.</p>
          </article>
          <article className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-base font-semibold">Tooth transplant cost vs implants</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Searching for tooth transplant cost? Tooth transplantation — moving one of your own teeth — is a different, rarer procedure than an implant. Our guide explains the difference and shows what an implant typically costs instead.</p>
          </article>
        </div>
      </section>

      <section className="home-section home-width border-t border-border">
        <div className="mx-auto max-w-2xl text-center"><p className="home-eyebrow">Before you begin</p><h2 className="home-heading mt-3">Frequently asked questions</h2><p className="mt-4 text-sm text-muted-foreground">A few answers to help you plan your next step.</p></div>
        <Accordion type="single" collapsible className="mx-auto mt-9 max-w-3xl">{faqItems.map((faq, i) => <AccordionItem key={faq.q} value={`faq-${i}`} className="border-border"><AccordionTrigger className="py-6 text-left text-base font-medium hover:text-secondary hover:no-underline">{faq.q}</AccordionTrigger><AccordionContent className="text-sm leading-7 text-muted-foreground">{faq.a}</AccordionContent></AccordionItem>)}</Accordion>
      </section>

      <section className="home-closing relative isolate overflow-hidden text-center">
        <img src={clinic} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" /><div className="home-closing-shade absolute inset-0" aria-hidden="true" />
        <div className="home-width relative z-10 py-20 md:py-24"><p className="home-eyebrow">Your next chapter starts with clarity</p><h2 className="mt-4 text-4xl font-medium md:text-5xl">Let’s plan your smile.</h2><p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground">Find your estimated dental implant cost and move forward with a clearer picture of your options.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Button onClick={startEstimate} size="lg" className="home-pill h-12">Get my estimate <ArrowUpRight /></Button><Button asChild variant="outline" size="lg" className="home-pill h-12 bg-background/60"><Link to="/contact">Get in touch <HeartHandshake /></Link></Button></div></div>
      </section>
    </div>
  );
}
