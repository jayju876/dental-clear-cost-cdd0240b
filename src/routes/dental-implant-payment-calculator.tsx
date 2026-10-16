import { createFileRoute } from "@tanstack/react-router";
import { LoanCalculator } from "@/components/site/LoanCalculator";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dental-implant-payment-calculator")({
  head: () => ({
    meta: [
      {
        title: "Dental Implant Cost Calculator — Find Affordable Payment Plans Near You",
      },
      {
        name: "description",
        content:
          "Calculate your dental implant cost instantly. Compare monthly EMI plans, find the cheapest tooth implant cost near you, and book your consultation today.",
      },
      {
        property: "og:title",
        content: "Dental Implant Cost Calculator — Find Affordable Payment Plans Near You",
      },
      {
        property: "og:description",
        content:
          "Calculate your dental implant cost instantly. Compare monthly EMI plans, find the cheapest tooth implant cost near you, and book your consultation today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/dental-implant-payment-calculator" }],
  }),
  component: PaymentCalculatorPage,
});

function PaymentCalculatorPage() {
  return (
    <div className="payment-reference bg-background text-foreground" id="payment-top">
      <LoanCalculator
        title={
          <>
            <strong>Dental Implant Cost Calculator</strong> — Find Affordable Payment Plans Near You
          </>
        }
        lead={
          <>
            Worried about <strong>dental implant cost</strong>? You&apos;re not alone. Millions of
            patients delay treatment simply because they don&apos;t know what they can afford —
            until now. Our Dental Implant Payment Calculator gives you real numbers in seconds.
            Enter your treatment cost, down payment, and loan term to instantly see your monthly
            EMI, total interest, and full payment breakdown. No guesswork. No surprise bills.
          </>
        }
      />
      <PaymentCalculatorContent />
    </div>
  );
}

function PaymentCalculatorContent() {
  return (
    <section className="payment-article px-5 py-10 md:py-14">
      <aside className="payment-takeaways">
        <p className="flex items-center gap-2 text-sm font-semibold text-secondary"><KeyRound className="h-4 w-4" /> KEY TAKEAWAYS</p>
        <ul className="mt-4 space-y-3">
          {[
            "Your monthly payment depends on treatment cost, down payment, APR, and repayment term.",
            "A larger down payment reduces the amount borrowed and the interest you pay.",
            "Shorter terms reduce total interest; longer terms spread out your monthly payments.",
            "Estimates are illustrative. Confirm pricing and financing terms with your clinic and lender.",
          ].map((text) => <li key={text} className="flex gap-3 text-sm leading-6"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-secondary" /><span>{text}</span></li>)}
        </ul>
      </aside>
      <nav aria-label="Table of contents" className="payment-contents mt-7">
        <p className="text-xs font-semibold uppercase text-secondary">Table of Contents</p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <a href="#payment-cost" className="text-muted-foreground hover:text-secondary">1. How much do dental implants cost?</a>
          <a href="#payment-quality" className="text-muted-foreground hover:text-secondary">2. Finding affordable, quality treatment</a>
          <a href="#payment-consultation" className="text-muted-foreground hover:text-secondary">3. Find dental implants near you</a>
          <a href="#payment-next" className="text-muted-foreground hover:text-secondary">4. Plan your next steps</a>
        </div>
      </nav>
      <div className="payment-sections">
        <article>
          <h2 id="payment-cost" className="text-2xl font-bold">How Much Do Dental Implants Cost?</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            The average <strong>dental implant cost</strong> in the U.S. ranges from $3,000 to
            $6,000 per tooth — but total treatment costs including crowns and bone grafts can reach
            $15,000 or more. That&apos;s exactly why flexible financing matters. With our
            calculator, a $15,000 treatment with a $2,000 down payment at 11% APR over 36 months
            works out to just $426/month — making even complex implant procedures manageable on any
            budget.
          </p>
        </article>

        <article>
          <h2 id="payment-quality" className="text-2xl font-bold">
            Finding the <strong>Cheapest Tooth Implant Cost</strong> That Doesn&apos;t Compromise
            Quality
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Searching for the <strong>cheapest tooth implant cost</strong> doesn&apos;t mean
            settling for less. It means finding a clinic that offers:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
            <li>Transparent pricing with no hidden fees</li>
            <li>Flexible EMI plans from 12 to 60 months</li>
            <li>Competitive APR rates based on your credit profile</li>
            <li>Experienced implantologists backed by patient reviews</li>
          </ul>
          <p className="mt-3 leading-7 text-muted-foreground">
            Our calculator compares loan terms side by side — so you can choose the plan that fits
            your life, not just your wallet.
          </p>
        </article>

        <article>
          <h2 id="payment-consultation" className="text-2xl font-bold">
            Find <strong>Dental Implants Near Me</strong> — Book a Free Consultation
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Ready to restore your smile? Finding trusted <strong>dental implants near me</strong>{" "}
            starts with understanding your budget. Use our calculator now, then contact our clinic
            to confirm your treatment plan, verify insurance coverage, and lock in your rate.
          </p>
          <p className="mt-3 font-medium">Our team offers:</p>
          <ul className="mt-2 space-y-2 leading-7 text-muted-foreground">
            <li>✓ Free initial consultations</li>
            <li>✓ Same-day implant assessments</li>
            <li>✓ Financing approved in minutes</li>
            <li>✓ Plans starting from $283/month</li>
          </ul>
        </article>
      </div>
      <div id="payment-next" className="payment-closing mt-12 rounded-lg bg-gradient-primary p-6 text-primary-foreground md:p-8">
        <h2 className="text-2xl font-bold">Ready to Plan Your Implant Payments?</h2>
        <p className="mt-3 text-sm leading-7 text-primary-foreground/85">Compare payment terms above, then confirm your treatment estimate and available financing with your clinic.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="secondary"><a href="#payment-top">Back to calculator</a></Button>
          <Button asChild variant="outline" className="bg-card text-card-foreground"><Link to="/contact">Contact us <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </div>
    </section>
  );
}
