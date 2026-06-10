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

      <section className="mt-14 grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">What's included in the estimate</h2>
          <ul className="mt-3 text-sm text-muted-foreground list-disc pl-5 space-y-1.5">
            <li>Board-certified plastic surgeon fee</li>
            <li>FDA-cleared implants (saline, silicone or cohesive gel)</li>
            <li>Operating room and standard facility fees</li>
            <li>Pre-op consultation and post-op follow-ups</li>
            <li>Optional: lift, revision, anesthesia upgrades</li>
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Related calculators</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/cost" className="hover:text-secondary font-medium">Dental Implant Cost Calculator →</Link></li>
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

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}
