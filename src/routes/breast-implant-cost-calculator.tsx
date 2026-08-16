import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site/Section";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { InternalLinks } from "@/components/site/InternalLinks";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/breast-implant-cost-calculator")({
  head: () => ({
    meta: [
      { title: "Breast Implant Cost Calculator (2026) — Instant Surgery Estimate" },
      { name: "description", content: "Free breast implant cost calculator. Estimate breast augmentation surgery cost by implant type, profile, country and add-ons. Instant, no sign-up." },
      { property: "og:title", content: "Breast Implant Cost Calculator (2026)" },
      { property: "og:description", content: "Estimate breast augmentation cost by implant type, country and add-ons." },
    ],
    links: [{ rel: "canonical", href: "/breast-implant-cost-calculator" }],
  }),
  component: BreastImplantCalculatorPage,
});

type Country = { code: string; name: string; symbol: string; rate: number; baseUSD: [number, number] };

const COUNTRIES: Country[] = [
  { code: "US", name: "United States", symbol: "$", rate: 1, baseUSD: [6500, 12000] },
  { code: "UK", name: "United Kingdom", symbol: "£", rate: 0.79, baseUSD: [5500, 9500] },
  { code: "AU", name: "Australia", symbol: "A$", rate: 1.52, baseUSD: [7000, 12500] },
  { code: "CA", name: "Canada", symbol: "C$", rate: 1.36, baseUSD: [6000, 11000] },
  { code: "DE", name: "Germany", symbol: "€", rate: 0.92, baseUSD: [5000, 8500] },
  { code: "AE", name: "United Arab Emirates", symbol: "د.إ", rate: 3.67, baseUSD: [4500, 8000] },
  { code: "IN", name: "India", symbol: "₹", rate: 83, baseUSD: [2200, 4500] },
  { code: "TR", name: "Turkey", symbol: "$", rate: 1, baseUSD: [3500, 6000] },
  { code: "MX", name: "Mexico", symbol: "$", rate: 1, baseUSD: [4000, 6500] },
  { code: "TH", name: "Thailand", symbol: "$", rate: 1, baseUSD: [3800, 6500] },
];

const IMPLANT_TYPES = [
  { id: "saline", label: "Saline", mult: 0.85 },
  { id: "silicone", label: "Silicone Gel", mult: 1.0 },
  { id: "gummy", label: "Gummy Bear (Cohesive)", mult: 1.18 },
  { id: "structured", label: "Structured Saline", mult: 1.05 },
];

const PROFILES = [
  { id: "moderate", label: "Moderate Profile", mult: 1.0 },
  { id: "moderate-plus", label: "Moderate Plus", mult: 1.03 },
  { id: "high", label: "High Profile", mult: 1.06 },
  { id: "ultra-high", label: "Ultra High Profile", mult: 1.1 },
];

const PLACEMENT = [
  { id: "submuscular", label: "Submuscular (Under Muscle)", mult: 1.05 },
  { id: "subglandular", label: "Subglandular (Over Muscle)", mult: 1.0 },
  { id: "dual-plane", label: "Dual Plane", mult: 1.08 },
];

const estimateIncludes = [
  "The surgeon's fee",
  "The implants (silicone or saline)",
  "Operating room and hospital facility costs",
  "Anesthesia",
  "A pre-op consultation",
  "Standard follow-up appointments after surgery",
  "Basic surgical supplies",
];

const estimateMayExclude = [
  "Prescription medications",
  "Compression garments or post-surgery bras",
  "Lab work or imaging before the procedure",
  "Travel and accommodation if you're going abroad for surgery",
  "Any costs tied to managing complications",
  "Follow-up care beyond the basics",
];

function fmt(usd: number, c: Country) {
  return `${c.symbol}${Math.round(usd * c.rate).toLocaleString()}`;
}

function BreastImplantCalculatorPage() {
  const [countryCode, setCountryCode] = useState("US");
  const [implantType, setImplantType] = useState("silicone");
  const [profile, setProfile] = useState("moderate");
  const [placement, setPlacement] = useState("submuscular");
  const [lift, setLift] = useState(false);
  const [revision, setRevision] = useState(false);
  const [anesthesia, setAnesthesia] = useState(true);

  const result = useMemo(() => {
    const c = COUNTRIES.find((x) => x.code === countryCode)!;
    const t = IMPLANT_TYPES.find((x) => x.id === implantType)!;
    const p = PROFILES.find((x) => x.id === profile)!;
    const pl = PLACEMENT.find((x) => x.id === placement)!;
    const mult = t.mult * p.mult * pl.mult;
    let low = c.baseUSD[0] * mult;
    let high = c.baseUSD[1] * mult;
    if (lift) { low += 2500; high += 5000; }
    if (revision) { low += 3000; high += 6500; }
    if (anesthesia) { low += 800; high += 1500; }
    return { c, low, high, mid: (low + high) / 2 };
  }, [countryCode, implantType, profile, placement, lift, revision, anesthesia]);

  return (
    <PageShell
      eyebrow="Cosmetic Surgery Calculators"
      title="Breast Implant Cost Calculator"
      lead="Estimate breast augmentation surgery cost by implant type, profile, placement and country. Instant, free and private."
    >
      <div className="grid lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-3 p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label>Country</Label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Implant Type</Label>
              <Select value={implantType} onValueChange={setImplantType}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {IMPLANT_TYPES.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Implant Profile</Label>
              <Select value={profile} onValueChange={setProfile}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PROFILES.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Placement</Label>
              <Select value={placement} onValueChange={setPlacement}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PLACEMENT.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-border">
            <p className="text-sm font-semibold">Add-ons</p>
            <Toggle label="Combine with breast lift (mastopexy)" checked={lift} onChange={setLift} />
            <Toggle label="Revision / replacement surgery" checked={revision} onChange={setRevision} />
            <Toggle label="General anesthesia & facility fee" checked={anesthesia} onChange={setAnesthesia} />
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6 bg-gradient-primary text-primary-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">Estimated total</p>
          <p className="mt-2 text-3xl md:text-4xl font-bold">
            {fmt(result.low, result.c)} – {fmt(result.high, result.c)}
          </p>
          <p className="mt-1 text-sm opacity-80">Midpoint: {fmt(result.mid, result.c)}</p>
          <div className="mt-6 space-y-2 text-sm opacity-90">
            <p>Pricing reflects surgeon fee, implants, and standard pre/post-op care in {result.c.name}.</p>
            <p>Final quote depends on surgeon experience, hospital and your medical profile.</p>
          </div>
          <Button asChild variant="secondary" className="mt-6 w-full">
            <Link to="/loan">Estimate monthly EMI <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </Card>
      </div>

      <section className="mt-14 max-w-3xl space-y-5">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">About the Breast Implant Cost Calculator</h2>
        <p className="text-muted-foreground leading-7">A breast implant cost calculator is an online tool that gives you a rough idea of what breast augmentation surgery might cost based on the choices you're considering. Rather than calling clinic after clinic for quotes, you can select things like the type of implant, where it would be placed, and what country you're in — and get a ballpark figure on the spot. It won't replace a real conversation with a surgeon, but it's a practical way to start thinking about budgets and comparing your options before you book anything.</p>

        <h2 className="pt-5 text-2xl md:text-3xl font-bold tracking-tight">How Does It Work?</h2>
        <p className="text-muted-foreground leading-7">The calculator pulls together the main factors that affect pricing and updates its estimate each time you change a selection. That way, you can play around with different combinations — say, switching from silicone to saline, or comparing costs in different countries — and get a real sense of how each choice moves the needle on price.</p>
        <p className="text-muted-foreground">Here's what it typically weighs:</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <InfoCard title="Country" body="Where you have surgery makes a big difference. Surgeon fees, hospital overhead, and general healthcare costs vary widely from one country to the next." />
          <InfoCard title="Implant type" body="Silicone gel implants tend to cost more than saline ones, partly because of the materials involved and partly because of how they look and feel." />
          <InfoCard title="Implant profile" body="Whether you go with a low, moderate, or high profile can affect pricing depending on the brand and what the procedure involves." />
          <InfoCard title="Placement" body="Surgery under the muscle (submuscular) and above the muscle (subglandular) are two different techniques, and the surgical complexity of each can influence what you pay." />
          <InfoCard title="Add-on procedures" body="If you're also considering a breast lift, a revision, or replacing existing implants, those get factored in too." />
          <InfoCard title="Hospital and anesthesia fees" body="Operating room time, the anesthesiologist, and facility costs are included where the data allows for it." />
        </div>

        <h2 className="pt-5 text-2xl md:text-3xl font-bold tracking-tight">What's Usually Covered in the Estimate?</h2>
        <p className="text-muted-foreground leading-7">Most calculators try to give you a picture of the full cost, not just the sticker price of the implant itself. You can generally expect the estimate to account for:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
          {estimateIncludes.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <h2 className="pt-5 text-2xl md:text-3xl font-bold tracking-tight">What Might Not Be Included?</h2>
        <p className="text-muted-foreground leading-7">Some costs are harder to predict upfront and won't always show up in the estimate:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
          {estimateMayExclude.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <h2 className="pt-5 text-2xl md:text-3xl font-bold tracking-tight">Why Use One?</h2>
        <p className="text-muted-foreground leading-7">The main appeal is speed and clarity. Instead of spending time chasing quotes from multiple clinics, you can get a working figure in seconds and actually understand what's driving the cost. It makes it easier to compare options side by side — silicone versus saline, one country versus another — before you've committed to anything.</p>
        <p className="text-muted-foreground leading-7">It's also useful for budgeting. Whether you're planning to pay out of pocket or want to know if financing might make sense, having an estimate in hand gives you somewhere to start.</p>

        <h2 className="pt-5 text-2xl md:text-3xl font-bold tracking-tight">One Thing Worth Keeping in Mind</h2>
        <p className="text-muted-foreground leading-7">Whatever number the calculator gives you, treat it as a starting point rather than a final quote. Your actual cost will depend on things no calculator can know — your anatomy, your medical history, the specific surgeon you choose, which hospital or clinic you go to, and the exact implant brand used. A proper consultation with a plastic surgeon is the only way to get a number that's actually tailored to your situation.</p>
      </section>

      <section className="mt-14 grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Related calculators</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-secondary font-medium">Dental Implant Cost Calculator →</Link></li>
            <li><Link to="/loan" className="hover:text-secondary font-medium">Implant Loan / EMI Calculator →</Link></li>
            <li><Link to="/dental-implant-finance-calculator" className="hover:text-secondary font-medium">Implant Finance Calculator →</Link></li>
            <li><Link to="/all-on-4-calculator" className="hover:text-secondary font-medium">All-on-4 Calculator →</Link></li>
          </ul>
        </Card>
      </section>

      <InternalLinks heading="Explore more on ImplantCost" />
    </PageShell>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="border-border/70 p-4 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </Card>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}
