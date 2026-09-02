import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn, PageShell } from "@/components/site/Section";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — ImplantCost" },
      {
        name: "description",
        content: "Thank you for contacting ImplantCost. We have received your message and will be in touch soon.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/thank-you" }],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <PageShell
      eyebrow="Message received"
      title="Thank you for reaching out"
      lead="Your message has been submitted successfully. Our team will review it and get back to you within one business day."
    >
      <FadeIn className="max-w-2xl">
        <Card className="border-secondary/25 bg-gradient-soft p-7 shadow-sm md:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/12 text-secondary">
            <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
            We&apos;ve received your message.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Thank you for getting in touch with ImplantCost. If you included an email address, we&apos;ll use it to reply to your enquiry.
          </p>

          <div className="mt-7 flex flex-col gap-3 border-t border-border/70 pt-6 sm:flex-row">
            <Button asChild className="bg-gradient-primary text-primary-foreground">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to homepage
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/calculator">
                Use the calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-secondary" aria-hidden="true" />
            We typically respond within one business day.
          </p>
        </Card>
      </FadeIn>
    </PageShell>
  );
}
