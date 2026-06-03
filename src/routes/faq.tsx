import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn, PageShell } from "@/components/site/Section";

const FAQS_DATA = [
  { q: "How much does a dental implant cost?", a: "Single tooth implants typically range from $600 in India to $6,000 in the United States. Factors include brand, crown material, bone graft and clinic location." },
  { q: "How accurate is the ImplantCost calculator?", a: "Our estimates are within 10–15% of final clinic invoices based on data from 1,800+ verified clinics across 32 countries, updated quarterly." },
  { q: "Are dental implants painful?", a: "Implant placement is performed under local anaesthesia. Most patients report mild discomfort for 2–3 days, well-managed with standard pain relief." },
  { q: "How long do dental implants last?", a: "With good oral hygiene and regular checkups, implants commonly last 20+ years; many last a lifetime." },
  { q: "What is All-on-4?", a: "All-on-4 is a full-arch restoration anchored on four strategically placed implants. It's used to restore an entire upper or lower jaw." },
  { q: "Is dental tourism to India safe?", a: "Yes — when you choose accredited clinics with internationally trained dentists. We only list clinics that meet our verification standards." },
  { q: "Does insurance cover implants?", a: "Coverage varies. Many dental plans partially cover the crown but not the implant fixture. HSA/FSA accounts in the US can typically be used." },
  { q: "How long is the treatment timeline?", a: "Traditional implants take 3–6 months including healing. Immediate-load implants and All-on-4 can sometimes be completed in days." },
  { q: "Can I finance my treatment?", a: "Yes — many clinics offer 0% EMI for 6–12 months. Dental-specific lenders extend up to 24-month plans." },
  { q: "Do you share my information with clinics?", a: "Only when you explicitly request to connect with a specific clinic. We never sell your data — see our Privacy Policy." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Dental Implant FAQ — Common Questions Answered" },
      { name: "description", content: "Answers to the most common dental implant questions: cost, procedure, recovery, financing and country comparisons." },
      { property: "og:title", content: "Dental Implant FAQ" },
      { property: "og:description", content: "Common dental implant questions answered by our medical team." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS_DATA.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQ,
});


function FAQ() {
  return (
    <PageShell eyebrow="FAQ" title="Dental implant questions, answered" lead="Reviewed by our clinical team. If your question isn't here, contact us.">
      <FadeIn>
        <Accordion type="single" collapsible className="w-full">
          {FAQS_DATA.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
      <InternalLinks heading="More implant resources" />
    </PageShell>
  );
}
