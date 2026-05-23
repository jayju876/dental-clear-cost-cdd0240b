import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Calendar, Percent, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import loanImg from "@/assets/loan-calc.jpg";

function fmt(n: number) {
  return `$${Math.round(n).toLocaleString()}`;
}

function calc(principal: number, apr: number, months: number) {
  const r = apr / 100 / 12;
  const m = r === 0 ? principal / months : (principal * r) / (1 - Math.pow(1 + r, -months));
  const total = m * months;
  return { monthly: m, total, interest: total - principal };
}

export function LoanCalculator({ title, lead }: { title?: string; lead?: string }) {
  const [cost, setCost] = useState(15000);
  const [down, setDown] = useState(2000);
  const [apr, setApr] = useState(11);
  const [months, setMonths] = useState(36);

  const principal = Math.max(0, cost - down);
  const result = useMemo(() => calc(principal, apr, months), [principal, apr, months]);
  const comparison = useMemo(
    () => [12, 24, 36, 48, 60].map((m) => ({ m, ...calc(principal, apr, m) })),
    [principal, apr],
  );

  const interestPct = result.total > 0 ? (result.interest / result.total) * 100 : 0;

  return (
    <div className="bg-gradient-soft border-b border-border">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start max-w-6xl mx-auto">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-secondary" /> Finance · EMI · Total interest
            </span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{title ?? "Dental Implant Loan Calculator"}</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              {lead ?? "Plan monthly payments for your implant treatment. Adjust cost, down payment, interest rate and term to see your EMI instantly."}
            </p>
          </div>
          <img
            src={loanImg}
            alt="Dental implant finance illustration"
            width={1400}
            height={1000}
            loading="lazy"
            className="hidden lg:block w-64 rounded-2xl shadow-elegant border border-border/60"
          />
        </div>

        <div className="mt-8 grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Inputs */}
          <Card className="p-6 lg:col-span-2 border-border/70 shadow-elegant space-y-6">
            <SliderField
              label="Total treatment cost" icon={Wallet} value={cost} min={500} max={80000} step={250}
              onChange={setCost} display={fmt(cost)}
            />
            <SliderField
              label="Down payment" icon={TrendingUp} value={down} min={0} max={cost} step={100}
              onChange={setDown} display={fmt(down)}
            />
            <SliderField
              label="Interest rate (APR)" icon={Percent} value={apr} min={0} max={30} step={0.25}
              onChange={setApr} display={`${apr.toFixed(2)}%`}
            />
            <SliderField
              label="Loan term" icon={Calendar} value={months} min={6} max={84} step={1}
              onChange={setMonths} display={`${months} months (${(months / 12).toFixed(1)} yrs)`}
            />
            <div className="rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
              Estimates are illustrative. Actual loan terms vary by lender and credit profile.
            </div>
          </Card>

          {/* Results */}
          <div className="lg:col-span-3 space-y-5">
            <motion.div
              key={`${principal}-${apr}-${months}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-gradient-primary p-6 md:p-8 text-primary-foreground shadow-elegant relative overflow-hidden"
            >
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/70">Monthly EMI</p>
                <p className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">{fmt(result.monthly)}<span className="text-base font-normal text-primary-foreground/70"> / mo</span></p>
                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-primary-foreground/60">Total payable</p>
                    <p className="text-xl font-semibold">{fmt(result.total)}</p>
                  </div>
                  <div>
                    <p className="text-primary-foreground/60">Total interest</p>
                    <p className="text-xl font-semibold">{fmt(result.interest)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <Card className="p-5 border-border/70">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Payment breakdown</p>
              <div className="mt-4 h-3 w-full rounded-full bg-muted overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - interestPct}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-secondary"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${interestPct}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-accent"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-xs">
                <Legend color="bg-secondary" label="Principal" value={fmt(principal)} pct={100 - interestPct} />
                <Legend color="bg-accent" label="Interest" value={fmt(result.interest)} pct={interestPct} />
              </div>
            </Card>

            <Card className="p-5 border-border/70">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Compare loan terms</p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="py-2">Term</th>
                      <th className="py-2">Monthly</th>
                      <th className="py-2">Interest</th>
                      <th className="py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((c) => (
                      <tr
                        key={c.m}
                        className={`border-t border-border/60 ${c.m === months ? "bg-secondary/5 font-semibold" : ""}`}
                      >
                        <td className="py-2.5">{c.m} mo</td>
                        <td className="py-2.5">{fmt(c.monthly)}</td>
                        <td className="py-2.5 text-muted-foreground">{fmt(c.interest)}</td>
                        <td className="py-2.5">{fmt(c.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid sm:grid-cols-3 gap-3">
              <Button asChild className="bg-gradient-primary text-primary-foreground">
                <a href="/contact">Contact Clinic <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline">
                <a href="/calculator">Estimate treatment cost</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/ratio-calculator">Implant ratio tool</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label, icon: Icon, value, min, max, step, onChange, display,
}: {
  label: string; icon: typeof Wallet; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; display: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-sm"><Icon className="h-4 w-4 text-secondary" /> {label}</Label>
        <Input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value) || 0)))}
          className="h-8 w-28 text-right font-semibold"
        />
      </div>
      <Slider min={min} max={max} step={step} value={[value]} onValueChange={([v]) => onChange(v)} className="mt-3" />
      <p className="mt-1 text-xs text-muted-foreground">{display}</p>
    </div>
  );
}

function Legend({ color, label, value, pct }: { color: string; label: string; value: string; pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
      <span className="text-muted-foreground">({pct.toFixed(0)}%)</span>
    </div>
  );
}
