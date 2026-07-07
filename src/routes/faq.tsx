import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn, PageShell } from "@/components/site/Section";
import { InternalLinks } from "@/components/site/InternalLinks";

const FAQS_DATA = [
  { q: "How much does a single tooth implant cost in the USA?", a: "The single tooth implant cost in the USA is typically $3,500–$6,000, including the implant, abutment and crown. The cheapest tooth implant cost — around $1,500–$2,500 — is usually found at dental schools and community clinics." },
  { q: "How accurate is this dental implant cost calculator?", a: "Our dental implant cost calculator is within 10–15% of final clinic invoices based on data from 1,800+ verified US clinics, updated quarterly." },
  { q: "How much is a full mouth dental implant in the USA?", a: "Full mouth dental implants cost $40,000–$90,000 in the USA. Our full mouth dental implant cost calculator in USA breaks the price down by state, materials and clinic tier." },
  { q: "What is the permanent dental implant cost in the USA?", a: "Permanent dental implants — screw-retained zirconia bridges designed to last 20+ years — typically run $25,000–$60,000 per arch. Use our permanent dental implant cost calculator in USA for a personalized estimate." },
  { q: "Does the calculator include insurance?", a: "Yes. The dental implant cost calculator in USA with insurance models common PPO coverage (10–50%) and shows both dental cost with insurance and cost of dental procedures without insurance side-by-side." },
  { q: "How does this compare to the Delta Dental cost estimator with insurance?", a: "The Delta Dental cost estimator with insurance and its Delta Dental procedures cost list only cover Delta Dental subscribers. Our dental procedure cost estimator works across every US insurer, state and clinic type." },
  { q: "What's the dental implant cost with insurance in California?", a: "After typical PPO coverage, the dental implant cost with insurance in California ranges $2,500–$4,500 per tooth. Los Angeles, San Diego and San Francisco price higher than Sacramento or Fresno." },
  { q: "Are dental implants painful?", a: "Implant placement is performed under local anaesthesia. Most patients report mild discomfort for 2–3 days, well-managed with standard pain relief." },
  { q: "How long do dental implants last?", a: "With good oral hygiene and regular checkups, implants commonly last 20+ years; many last a lifetime." },
  { q: "Can I finance my treatment?", a: "Yes — many US clinics offer 0% EMI for 6–12 months, and dental lenders extend 12–24 month plans. HSA/FSA funds can also apply." },
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
