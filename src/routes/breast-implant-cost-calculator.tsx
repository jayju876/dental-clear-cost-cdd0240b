import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { InternalLinks } from "@/components/site/InternalLinks";
import { ArrowRight, CheckCircle2, ShieldCheck, KeyRound, Calculator } from "lucide-react";

export const Route = createFileRoute("/breast-implant-cost-calculator")({
  head: () => ({
    meta: [
      { title: "Breast Implant Cost Calculator (2026) — Instant Surgery Estimate" },
      { name: "description", content: "Free breast implant cost calculator. Estimate breast augmentation surgery cost by implant type, profile, country and add-ons. Instant, no sign-up." },
      { property: "og:title", content: "Breast Implant Cost Calculator (2026)" },
      { property: "og:description", content: "Estimate breast augmentation cost by implant type, country and add-ons." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    const c = COUNTRIES.find((x) => x.code === countryCode) ?? COUNTRIES[0];
    const t = IMPLANT_TYPES.find((x) => x.id === implantType) ?? IMPLANT_TYPES[1];
    const p = PROFILES.find((x) => x.id === profile) ?? PROFILES[0];
    const pl = PLACEMENT.find((x) => x.id === placement) ?? PLACEMENT[0];
    const mult = t.mult * p.mult * pl.mult;
    let low = c.baseUSD[0] * mult;
    let high = c.baseUSD[1] * mult;
    if (lift) { low += 2500; high += 5000; }
    if (revision) { low += 3000; high += 6500; }
    if (anesthesia) { low += 800; high += 1500; }
    return { c, low, high, mid: (low + high) / 2 };
  }, [countryCode, implantType, profile, placement, lift, revision, anesthesia]);

  return (
    <div className="breast-reference bg-background text-foreground" id="breast-top">
      <section className="breast-calculator-band">
        <div className="breast-width">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-secondary">Home</Link><span aria-hidden="true">/</span><Link to="/calculators" className="hover:text-secondary">Calculators</Link><span aria-hidden="true">/</span><span>Breast implant cost</span>
          </nav>
          <header className="breast-header">
            <p className="mb-3 text-xs font-semibold uppercase text-secondary">Cosmetic surgery costs</p>
            <h1>Breast Implant Cost Calculator <span className="text-secondary">— Estimate Your Surgery Cost</span></h1>
            <p className="mt-4 max-w-3xl text-muted-foreground">Estimate breast augmentation surgery cost by implant type, profile, placement and country. Instant, free and private.</p>
          </header>
      <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-5">
        <Card className="breast-inputs lg:col-span-3 p-6 space-y-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold"><Calculator className="h-5 w-5 text-secondary" /> Your surgery details</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="breast-country">Country</Label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger id="breast-country" className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="breast-type">Implant Type</Label>
              <Select value={implantType} onValueChange={setImplantType}>
                <SelectTrigger id="breast-type" className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {IMPLANT_TYPES.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="breast-profile">Implant Profile</Label>
              <Select value={profile} onValueChange={setProfile}>
                <SelectTrigger id="breast-profile" className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PROFILES.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="breast-placement">Placement</Label>
              <Select value={placement} onValueChange={setPlacement}>
                <SelectTrigger id="breast-placement" className="mt-1.5"><SelectValue /></SelectTrigger>
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

        <Card className="breast-result lg:col-span-2 p-6 text-secondary-foreground" aria-live="polite" aria-atomic="true">
          <p className="text-xs font-semibold uppercase opacity-80">Estimated surgery cost</p>
          <p className="breast-range mt-3 font-bold">
            {fmt(result.low, result.c)} – {fmt(result.high, result.c)}
          </p>
          <div className="breast-midpoint mt-5 flex flex-wrap items-center justify-between gap-2 py-4 text-sm"><span className="opacity-80">Estimated midpoint</span><strong className="text-xl">{fmt(result.mid, result.c)}</strong></div>
          <div className="mt-6 space-y-2 text-sm opacity-90">
            <p>Pricing reflects surgeon fee, implants, and standard pre/post-op care in {result.c.name}.</p>
            <p>Final quote depends on surgeon experience, hospital and your medical profile.</p>
          </div>
          <Button asChild variant="outline" className="mt-6 w-full bg-card text-card-foreground">
            <Link to="/loan">Estimate monthly payments <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </Card>
      </div>
      <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> Educational estimate only. Confirm your procedure, risks and itemized quote with a qualified plastic surgeon.</p>
        </div>
      </section>

      <div className="breast-article px-5 py-12">
        <aside className="breast-callout">
          <p className="flex items-center gap-2 text-sm font-semibold text-secondary"><KeyRound className="h-4 w-4" /> KEY TAKEAWAYS</p>
          <ul className="mt-4 space-y-3">
            {[
              "Your estimate depends on country, implant type, profile, placement and optional procedures.",
              "A breast lift or revision can increase the overall cost of surgery.",
              "Check whether anesthesia, facility fees and follow-up care are included in your clinic’s quote.",
              "Calculator figures are a starting point, not a personalized surgical quote.",
            ].map((text) => <li key={text} className="flex gap-3 text-sm leading-6"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-secondary" /><span>{text}</span></li>)}
          </ul>
        </aside>
        <nav aria-label="Table of contents" className="breast-contents mt-7">
          <p className="text-xs font-semibold uppercase text-secondary">Table of contents</p>
          <ol className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {[
              ["breast-about", "About the calculator"], ["breast-how", "How does it work?"],
              ["breast-included", "What’s included?"], ["breast-excluded", "Additional expenses"],
              ["breast-benefits", "Why use a calculator?"], ["breast-consultation", "Before you book surgery"],
            ].map(([id, title], index) => <li key={id}><a href={`#${id}`} className="text-muted-foreground hover:text-secondary">{index + 1}. {title}</a></li>)}
          </ol>
        </nav>
      <section className="breast-guide mt-12 space-y-5">
        <h2 id="breast-about" className="text-2xl md:text-3xl font-bold">About the Breast Implant Cost Calculator</h2>
        <p className="text-muted-foreground leading-7">A breast implant cost calculator is an online tool that gives you a rough idea of what breast augmentation surgery might cost based on the choices you're considering. Rather than calling clinic after clinic for quotes, you can select things like the type of implant, where it would be placed, and what country you're in — and get a ballpark figure on the spot. It won't replace a real conversation with a surgeon, but it's a practical way to start thinking about budgets and comparing your options before you book anything.</p>

        <h2 id="breast-how" className="pt-5 text-2xl md:text-3xl font-bold">How Does It Work?</h2>
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

        <h2 id="breast-included" className="pt-5 text-2xl md:text-3xl font-bold">What's Usually Covered in the Estimate?</h2>
        <p className="text-muted-foreground leading-7">Most calculators try to give you a picture of the full cost, not just the sticker price of the implant itself. You can generally expect the estimate to account for:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
          {estimateIncludes.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <h2 id="breast-excluded" className="pt-5 text-2xl md:text-3xl font-bold">What Might Not Be Included?</h2>
        <p className="text-muted-foreground leading-7">Some costs are harder to predict upfront and won't always show up in the estimate:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
          {estimateMayExclude.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <h2 id="breast-benefits" className="pt-5 text-2xl md:text-3xl font-bold">Why Use One?</h2>
        <p className="text-muted-foreground leading-7">The main appeal is speed and clarity. Instead of spending time chasing quotes from multiple clinics, you can get a working figure in seconds and actually understand what's driving the cost. It makes it easier to compare options side by side — silicone versus saline, one country versus another — before you've committed to anything.</p>
        <p className="text-muted-foreground leading-7">It's also useful for budgeting. Whether you're planning to pay out of pocket or want to know if financing might make sense, having an estimate in hand gives you somewhere to start.</p>

        <h2 id="breast-consultation" className="pt-5 text-2xl md:text-3xl font-bold">One Thing Worth Keeping in Mind</h2>
        <p className="text-muted-foreground leading-7">Whatever number the calculator gives you, treat it as a starting point rather than a final quote. Your actual cost will depend on things no calculator can know — your anatomy, your medical history, the specific surgeon you choose, which hospital or clinic you go to, and the exact implant brand used. A proper consultation with a plastic surgeon is the only way to get a number that's actually tailored to your situation.</p>
      </section>

      <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-semibold">Related calculators</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-secondary font-medium">Dental Implant Cost Calculator →</Link></li>
            <li><Link to="/loan" className="hover:text-secondary font-medium">Implant Loan / EMI Calculator →</Link></li>
            <li><Link to="/dental-implant-finance-calculator" className="hover:text-secondary font-medium">Implant Finance Calculator →</Link></li>
            <li><Link to="/all-on-4-calculator" className="hover:text-secondary font-medium">All-on-4 Calculator →</Link></li>
          </ul>
      </section>

      <section className="breast-closing mt-12 p-6 text-secondary-foreground md:p-8">
        <h2 className="text-2xl font-bold">Ready to Plan Your Surgery Budget?</h2>
        <p className="mt-3 text-sm leading-7 opacity-90">Compare your options, explore monthly payments, and confirm a personalized estimate with your surgeon.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="outline" className="bg-card text-card-foreground"><a href="#breast-top">Back to calculator <ArrowRight className="h-4 w-4" /></a></Button>
          <Button asChild variant="outline" className="bg-card text-card-foreground"><Link to="/contact">Contact us</Link></Button>
        </div>
      </section>

      <InternalLinks heading="Explore more on ImplantCost" />
      </div>
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="breast-factor border-border/70 p-4 shadow-none">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </Card>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">
      <span className="text-sm">{label}</span>
      <Switch aria-label={label} checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-secondary" />
    </label>
  );
}
