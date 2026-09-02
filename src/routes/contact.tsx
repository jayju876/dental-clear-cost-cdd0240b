import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Clock, Send, MessageCircle, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FadeIn, PageShell } from "@/components/site/Section";
import { InternalLinks } from "@/components/site/InternalLinks";
import { submitContactForm } from "@/lib/contact.functions";
import { toast } from "sonner";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ImplantCost — Talk to Our Team" },
      { name: "description", content: "Get in touch with the ImplantCost team. We respond within one business day to cost questions, clinic suggestions and feedback." },
      { property: "og:title", content: "Contact ImplantCost" },
      { property: "og:description", content: "We respond within one business day to all queries." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitFn = useServerFn(submitContactForm);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await submitFn({ data: form });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      await navigate({ to: "/thank-you" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Contact us"
      title="We're here to help you plan with confidence"
      lead="Questions about your estimate, clinic recommendations, or partnerships — drop us a line."
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FadeIn>
            <Card className="p-6 md:p-8 border-border/70">
              <form onSubmit={submit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" className="mt-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="mt-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone number <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input id="phone" type="tel" className="mt-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={40} />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" className="mt-2" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={150} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" className="mt-2 min-h-[140px]" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} />
                </div>
                <Button type="submit" disabled={loading} className="bg-gradient-primary text-primary-foreground">
                  <Send className="mr-2 h-4 w-4" /> {loading ? "Sending..." : "Send message"}
                </Button>
              </form>
            </Card>
          </FadeIn>
        </div>

        <div className="space-y-4">
          <Card className="p-5 border-border/70">
            <Info icon={Clock} title="Response time" value="Within 1 business day" />
            <Info icon={MessageCircle} title="Support channel" value="Use the form — we reply in-thread" />
            <Info icon={Globe2} title="Coverage" value="India · USA · UK · UAE · Global" />
            <Info icon={ShieldCheck} title="Privacy" value="Your details are never shared with clinics" />
          </Card>
          <Card className="overflow-hidden border-border/70">
            <div className="aspect-[4/3] bg-gradient-soft relative">
              <div className="absolute inset-0 grid place-items-center text-muted-foreground text-sm">
                <div className="text-center px-6">
                  <Sparkles className="h-8 w-8 mx-auto text-secondary" />
                  <p className="mt-2 font-medium text-foreground">Free personalized estimate</p>
                  <p className="text-xs mt-1">Share your treatment goals — get a transparent cost breakdown tailored to your country.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <InternalLinks heading="Helpful next steps" />
    </PageShell>
  );
}

function Info({ icon: Icon, title, value }: { icon: typeof Clock; title: string; value: string }) {

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary"><Icon className="h-4 w-4" /></div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="text-sm font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
}
