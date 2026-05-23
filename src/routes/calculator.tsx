import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Globe2, MapPin, Smile, Layers, Gem, Award,
  Stethoscope, CheckCircle2, Sparkles, TrendingDown, Wallet, Phone, CalendarCheck, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  COUNTRIES, IMPLANT_TYPES, CROWN_MATERIALS, BRANDS, estimate, formatCurrency, emi,
  type CalcInput, type CountryCode,
} from "@/lib/implant-pricing";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Dental Implant Cost Calculator — Free Instant Estimate" },
      { name: "description", content: "Calculate your dental implant cost in seconds. Country, brand, crown material, bone graft and EMI breakdown included." },
      { property: "og:title", content: "Dental Implant Cost Calculator" },
      { property: "og:description", content: "Free, instant dental implant cost estimates with treatment breakdown." },
    ],
    links: [{ rel: "canonical", href: "/calculator" }],
  }),
  component: CalculatorPage,
});

const STEPS = [
  { id: "country", label: "Location", icon: Globe2 },
  { id: "case", label: "Your case", icon: Smile },
  { id: "implant", label: "Implant", icon: Layers },
  { id: "crown", label: "Materials", icon: Gem },
  { id: "addons", label: "Add-ons", icon: Stethoscope },
  { id: "result", label: "Results", icon: Award },
] as const;

function CalculatorPage() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<CalcInput>({
    country: "US",
    city: "New York",
    teeth: 1,
    implantType: "single",
    crown: "zirconia",
    brand: "nobel",
    boneGraft: false,
    sinusLift: false,
    extraction: false,
  });

  const country = COUNTRIES.find((c) => c.code === input.country)!;
  const progress = ((step + 1) / STEPS.length) * 100;

  const result = useMemo(() => estimate(input), [input]);

  function next() { setStep((s) => Math.min(STEPS.length - 1, s + 1)); }
  function back() { setStep((s) => Math.max(0, s - 1)); }

  return (
    <div className="bg-gradient-soft border-b border-border min-h-[80vh]">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-secondary" /> Instant estimate · 100% free
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Dental Implant Cost Calculator</h1>
          <p className="mt-3 text-muted-foreground">Answer a few quick questions to receive a personalized treatment estimate.</p>
        </div>

        {/* Progress */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Step {step + 1} of {STEPS.length}</p>
            <p className="text-xs font-medium text-muted-foreground">{STEPS[step].label}</p>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="mt-6 hidden md:flex justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center gap-1 flex-1">
                <div className={`h-9 w-9 rounded-full inline-flex items-center justify-center border ${i <= step ? "bg-gradient-primary text-primary-foreground border-transparent" : "bg-card text-muted-foreground border-border"}`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <span className={`text-[11px] ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="mt-8 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="p-6 md:p-8 border-border/70 shadow-elegant">
                {step === 0 && <StepCountry input={input} setInput={setInput} />}
                {step === 1 && <StepCase input={input} setInput={setInput} />}
                {step === 2 && <StepImplant input={input} setInput={setInput} />}
                {step === 3 && <StepCrown input={input} setInput={setInput} />}
                {step === 4 && <StepAddons input={input} setInput={setInput} />}
                {step === 5 && <StepResult result={result} />}
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={back} disabled={step === 0}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={next} className="bg-gradient-primary text-primary-foreground">
                {step === STEPS.length - 2 ? "View my estimate" : "Continue"} <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => { setStep(0); }} variant="outline">
                Recalculate
              </Button>
            )}
          </div>
        </div>

        {/* Sticky preview */}
        {step > 0 && step < STEPS.length - 1 && (
          <div className="mt-10 max-w-3xl mx-auto text-center text-xs text-muted-foreground">
            Current selection: <span className="font-medium text-foreground">{country.name}</span> · {input.teeth} tooth/teeth · {IMPLANT_TYPES.find((t) => t.id === input.implantType)?.label}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Step components ---------- */

function StepCountry({ input, setInput }: { input: CalcInput; setInput: (v: CalcInput) => void }) {
  const country = COUNTRIES.find((c) => c.code === input.country)!;
  return (
    <div className="space-y-6">
      <Heading icon={Globe2} title="Where are you getting treatment?" sub="Pricing is calibrated to your local market." />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Country</Label>
          <Select value={input.country} onValueChange={(v) => setInput({ ...input, country: v as CountryCode, city: COUNTRIES.find((c) => c.code === v)!.cities[0] })}>
            <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>City</Label>
          <Select value={input.city} onValueChange={(v) => setInput({ ...input, city: v })}>
            <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
            <SelectContent>
              {country.cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground flex items-start gap-2">
        <MapPin className="h-4 w-4 text-secondary mt-0.5" />
        <span>We support 32 countries. Prices shown later will be converted to <strong className="text-foreground">{country.currency}</strong>.</span>
      </div>
    </div>
  );
}

function StepCase({ input, setInput }: { input: CalcInput; setInput: (v: CalcInput) => void }) {
  return (
    <div className="space-y-6">
      <Heading icon={Smile} title="How many teeth need replacing?" sub="This drives the number of implants and overall cost." />
      <div>
        <div className="flex items-baseline justify-between">
          <Label>Missing teeth</Label>
          <span className="text-2xl font-bold tracking-tight">{input.teeth}</span>
        </div>
        <Slider min={1} max={14} step={1} value={[input.teeth]} onValueChange={([v]) => setInput({ ...input, teeth: v })} className="mt-4" />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>1</span><span>14 (full arch)</span></div>
      </div>
    </div>
  );
}

function StepImplant({ input, setInput }: { input: CalcInput; setInput: (v: CalcInput) => void }) {
  return (
    <div className="space-y-6">
      <Heading icon={Layers} title="Implant type" sub="Single replacements differ in cost from full-arch restorations." />
      <div className="grid sm:grid-cols-2 gap-3">
        {IMPLANT_TYPES.map((t) => (
          <OptionCard key={t.id} active={input.implantType === t.id} title={t.label} onClick={() => setInput({ ...input, implantType: t.id })} />
        ))}
      </div>
      <div>
        <Label>Implant brand</Label>
        <Select value={input.brand} onValueChange={(v) => setInput({ ...input, brand: v })}>
          <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
          <SelectContent>
            {BRANDS.map((b) => <SelectItem key={b.id} value={b.id}>{b.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function StepCrown({ input, setInput }: { input: CalcInput; setInput: (v: CalcInput) => void }) {
  return (
    <div className="space-y-6">
      <Heading icon={Gem} title="Crown material" sub="Material impacts aesthetics, durability and price." />
      <div className="grid sm:grid-cols-2 gap-3">
        {CROWN_MATERIALS.map((c) => (
          <OptionCard key={c.id} active={input.crown === c.id} title={c.label} onClick={() => setInput({ ...input, crown: c.id })} />
        ))}
      </div>
    </div>
  );
}

function StepAddons({ input, setInput }: { input: CalcInput; setInput: (v: CalcInput) => void }) {
  return (
    <div className="space-y-6">
      <Heading icon={Stethoscope} title="Additional procedures" sub="Toggle anything your dentist recommended." />
      <ToggleRow label="Bone graft required" desc="Augments jawbone for secure implant placement." value={input.boneGraft} onChange={(v) => setInput({ ...input, boneGraft: v })} />
      <ToggleRow label="Sinus lift required" desc="Creates space for upper-jaw implants when sinus floor is low." value={input.sinusLift} onChange={(v) => setInput({ ...input, sinusLift: v })} />
      <ToggleRow label="Tooth extraction needed" desc="Removal of damaged teeth before implant placement." value={input.extraction} onChange={(v) => setInput({ ...input, extraction: v })} />
    </div>
  );
}

function StepResult({ result }: { result: ReturnType<typeof estimate> }) {
  const c = result.country;
  const india = COUNTRIES.find((x) => x.code === "IN")!;
  const months = 24;
  const monthlyMid = emi(result.midUSD, months);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Your personalized estimate</span>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold">Your treatment range</h2>
      </div>

      <div className="rounded-2xl bg-gradient-primary p-6 md:p-8 text-primary-foreground shadow-elegant">
        <p className="text-sm uppercase tracking-wider text-primary-foreground/70">Estimated total cost · {c.name}</p>
        <p className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
          {formatCurrency(result.lowUSD, c)} – {formatCurrency(result.highUSD, c)}
        </p>
        <p className="mt-2 text-primary-foreground/70 text-sm">For {result.teeth} tooth/teeth · {result.type.label} · {result.brand.label}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-5 border-border/70">
          <div className="flex items-center gap-2 text-secondary"><Wallet className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wider">EMI estimate</span></div>
          <p className="mt-3 text-2xl font-bold">{formatCurrency(monthlyMid, c)}<span className="text-sm text-muted-foreground font-normal"> / month</span></p>
          <p className="mt-1 text-xs text-muted-foreground">Based on {months}-month financing at ~12% APR (illustrative).</p>
        </Card>
        <Card className="p-5 border-border/70">
          <div className="flex items-center gap-2 text-secondary"><TrendingDown className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wider">India dental tourism</span></div>
          {c.code === "IN" ? (
            <p className="mt-3 text-sm text-muted-foreground">You're already getting India pricing — among the world's most affordable.</p>
          ) : (
            <>
              <p className="mt-3 text-2xl font-bold text-success">Save up to {formatCurrency(result.savingsUSD, c)}</p>
              <p className="mt-1 text-xs text-muted-foreground">Same case in India: {formatCurrency(result.indiaLowUSD, india)} – {formatCurrency(result.indiaHighUSD, india)}</p>
            </>
          )}
        </Card>
      </div>

      <Card className="p-5 border-border/70">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Treatment breakdown</p>
        <ul className="mt-3 space-y-2 text-sm">
          <BreakdownRow label={`${result.teeth}× ${result.type.label} (${result.brand.label})`} country={c} low={result.lowUSD - sum(result.addons, 0)} high={result.highUSD - sum(result.addons, 1)} />
          {result.addons.map((a) => (
            <BreakdownRow key={a.label} label={a.label} country={c} low={a.range[0]} high={a.range[1]} />
          ))}
          <li className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
            <span>Total range</span>
            <span>{formatCurrency(result.lowUSD, c)} – {formatCurrency(result.highUSD, c)}</span>
          </li>
        </ul>
      </Card>

      <Card className="p-5 border-border/70 bg-muted/30">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Recommended treatment</p>
        <h3 className="mt-2 text-lg font-semibold">{result.type.label} with {result.crown.label}</h3>
        <p className="mt-1 text-sm text-muted-foreground">A {result.brand.label} system offers a balance of reliability and value for your case profile. Final recommendation requires an in-person consultation and CBCT scan.</p>
      </Card>

      <Card className="p-5 border-border/70">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Financing options</p>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <li>• 0% interest EMI (select clinics, 6–12 months)</li>
          <li>• 12–24 month dental loans via partner lenders</li>
          <li>• HSA / FSA where applicable (US)</li>
          <li>• Insurance partial coverage (varies by plan)</li>
        </ul>
      </Card>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary text-center">Take the next step</p>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <Button asChild className="bg-gradient-primary text-primary-foreground">
            <a href="/contact"><Phone className="mr-2 h-4 w-4" /> Contact Clinic</a>
          </Button>
          <Button asChild variant="outline" className="border-secondary/40 hover:bg-secondary/5">
            <a href="/contact?intent=consultation"><CalendarCheck className="mr-2 h-4 w-4" /> Book Consultation</a>
          </Button>
          <Button asChild variant="outline" className="border-success/40 text-success hover:bg-success/5 hover:text-success">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Hi, I'd like a dental implant quote. Estimate: ${formatCurrency(result.lowUSD, c)}–${formatCurrency(result.highUSD, c)} in ${c.name} for ${result.teeth} tooth/teeth (${result.type.label}, ${result.brand.label}).`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Inquiry
            </a>
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Estimates are illustrative and based on aggregated 2026 clinic pricing. Actual costs vary by individual case and clinic.
      </p>
    </div>
  );
}

/* ---------- Small helpers ---------- */

function sum(arr: { range: [number, number] }[], i: 0 | 1) {
  return arr.reduce((acc, a) => acc + a.range[i], 0);
}

function BreakdownRow({ label, country, low, high }: { label: string; country: typeof COUNTRIES[number]; low: number; high: number }) {
  return (
    <li className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{formatCurrency(low, country)} – {formatCurrency(high, country)}</span>
    </li>
  );
}

function Heading({ icon: Icon, title, sub }: { icon: typeof Globe2; title: string; sub?: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
        {sub && <p className="text-sm text-muted-foreground mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function OptionCard({ active, title, onClick }: { active: boolean; title: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-4 rounded-xl border transition-all ${active ? "border-secondary bg-secondary/5 ring-2 ring-secondary/30" : "border-border bg-card hover:border-secondary/50"}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{title}</span>
        {active && <CheckCircle2 className="h-4 w-4 text-secondary" />}
      </div>
    </button>
  );
}

function ToggleRow({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border bg-card">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}
