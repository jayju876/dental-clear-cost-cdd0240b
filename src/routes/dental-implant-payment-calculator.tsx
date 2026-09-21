import { createFileRoute } from "@tanstack/react-router";
import { LoanCalculator } from "@/components/site/LoanCalculator";

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
    ],
    links: [{ rel: "canonical", href: "/dental-implant-payment-calculator" }],
  }),
  component: PaymentCalculatorPage,
});

function PaymentCalculatorPage() {
  return (
    <>
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
    </>
  );
}

function PaymentCalculatorContent() {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-3">
        <article>
          <h2 className="text-2xl font-bold tracking-tight">How Much Do Dental Implants Cost?</h2>
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
          <h2 className="text-2xl font-bold tracking-tight">
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
          <h2 className="text-2xl font-bold tracking-tight">
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
    </section>
  );
}
