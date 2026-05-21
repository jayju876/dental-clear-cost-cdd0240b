import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import jawImg from "@/assets/jaw-diagram.jpg";

type Jaw = "upper" | "lower" | "full";
type Bone = "excellent" | "good" | "moderate" | "low";
type Pref = "fixed" | "removable" | "mini" | "any";

const TREATMENTS = [
  { id: "single", label: "Single Implant", min: 1, max: 1, ratio: "1 : 1", stability: 95, blurb: "One implant replaces one tooth — ideal for an isolated gap." },
  { id: "bridge", label: "Implant-Supported Bridge", min: 2, max: 4, ratio: "2 implants : 3–4 teeth", stability: 92, blurb: "Two implants anchor a multi-tooth bridge across a span." },
  { id: "all4", label: "All-on-4", min: 4, max: 4, ratio: "4 implants : full arch", stability: 88, blurb: "Four strategically tilted implants support a full-arch prosthesis." },
  { id: "all6", label: "All-on-6", min: 6, max: 6, ratio: "6 implants : full arch", stability: 94, blurb: "Six implants distribute load — better for low bone density." },
  { id: "all8", label: "All-on-8", min: 8, max: 8, ratio: "8 implants : full arch", stability: 97, blurb: "Maximum stability for heavy bite force or compromised bone." },
  { id: "mini", label: "Mini Implants", min: 4, max: 6, ratio: "4–6 minis : arch", stability: 75, blurb: "Less invasive, narrower implants — typically stabilize dentures." },
];

function recommend(teeth: number, jaw: Jaw, bone: Bone, pref: Pref) {
  const arches = jaw === "full" ? 2 : 1;
  const isArch = teeth >= 10;
  let recId: string;
  if (pref === "mini") recId = "mini";
  else if (pref === "removable" && isArch) recId = bone === "low" ? "all6" : "all4";
  else if (teeth === 1) recId = "single";
  else if (teeth <= 4) recId = "bridge";
  else if (isArch) recId = bone === "low" ? (pref === "fixed" ? "all8" : "all6") : "all4";
  else recId = "bridge";

  const rec = TREATMENTS.find((t) => t.id === recId)!;
  const implantCount = rec.id === "single" ? teeth : rec.id === "bridge" ? Math.min(4, Math.ceil(teeth / 2) + 1) : rec.min * arches;
  let stability = rec.stability;
  if (bone === "excellent") stability = Math.min(99, stability + 3);
  if (bone === "moderate") stability -= 4;
  if (bone === "low") stability -= 10;

  const ratio = teeth > 0 ? `${implantCount} implants : ${teeth} teeth` : "—";
  return { rec, implantCount, stability: Math.max(40, stability), ratio };
}

export function RatioCalculator({ title, lead }: { title?: string; lead?: string }) {
  const [teeth, setTeeth] = useState(3);
  const [jaw, setJaw] = useState<Jaw>("lower");
  const [bone, setBone] = useState<Bone>("good");
  const [pref, setPref] = useState<Pref>("any");

  const out = useMemo(() => recommend(teeth, jaw, bone, pref), [teeth, jaw, bone, pref]);

  return (
    <div className="bg-gradient-soft border-b border-border">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-secondary" /> Implant ratio · Treatment match · Stability score
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{title ?? "Dental Implant Ratio Calculator"}</h1>
          <p className="mt-3 text-muted-foreground">
            {lead ?? "Estimate how many implants you'll need and which treatment best fits your case — based on missing teeth, jaw and bone condition."}
          </p>
        </div>

        <div className="mt-8 grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 lg:col-span-2 border-border/70 shadow-elegant space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Missing teeth</Label>
                <span className="text-2xl font-bold">{teeth}</span>
              </div>
              <Slider min={1} max={28} step={1} value={[teeth]} onValueChange={([v]) => setTeeth(v)} className="mt-3" />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground"><span>1</span><span>28 (full mouth)</span></div>
            </div>
            <div>
              <Label className="text-sm">Jaw type</Label>
              <Select value={jaw} onValueChange={(v) => setJaw(v as Jaw)}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="upper">Upper jaw (maxilla)</SelectItem>
                  <SelectItem value="lower">Lower jaw (mandible)</SelectItem>
                  <SelectItem value="full">Full mouth (both)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Bone condition</Label>
              <Select value={bone} onValueChange={(v) => setBone(v as Bone)}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent — dense, healthy</SelectItem>
                  <SelectItem value="good">Good — typical density</SelectItem>
                  <SelectItem value="moderate">Moderate — some loss</SelectItem>
                  <SelectItem value="low">Low — graft likely needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Preferred treatment</Label>
              <Select value={pref} onValueChange={(v) => setPref(v as Pref)}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">No preference</SelectItem>
                  <SelectItem value="fixed">Fixed prosthesis</SelectItem>
                  <SelectItem value="removable">Removable / overdenture</SelectItem>
                  <SelectItem value="mini">Mini implants</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <div className="lg:col-span-3 space-y-5">
            <motion.div
              key={`${teeth}-${jaw}-${bone}-${pref}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-gradient-primary p-6 md:p-8 text-primary-foreground shadow-elegant relative overflow-hidden"
            >
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
              <div className="relative grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/70">Recommended treatment</p>
                  <h2 className="mt-2 text-3xl font-bold">{out.rec.label}</h2>
                  <p className="mt-2 text-sm text-primary-foreground/80">{out.rec.blurb}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Stat label="Implants needed" value={String(out.implantCount)} />
                  <Stat label="Support ratio" value={out.ratio} small />
                  <Stat label="Stability" value={`${out.stability}%`} />
                  <Stat label="Jaw" value={jaw === "full" ? "Full mouth" : jaw === "upper" ? "Upper" : "Lower"} small />
                </div>
              </div>
            </motion.div>

            <Card className="p-5 border-border/70">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Stability indicator</p>
                <span className="text-xs text-muted-foreground">Higher = more secure long-term</span>
              </div>
              <div className="mt-3 h-3 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${out.stability}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-accent"
                />
              </div>
            </Card>

            <Card className="overflow-hidden border-border/70">
              <img src={jawImg} alt="Jaw diagram showing implant placement" width={1400} height={1000} loading="lazy" className="w-full h-48 object-cover" />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary">All treatment options</p>
                <div className="mt-3 grid sm:grid-cols-2 gap-3">
                  {TREATMENTS.map((t) => {
                    const active = t.id === out.rec.id;
                    return (
                      <div
                        key={t.id}
                        className={`p-3 rounded-lg border transition-colors ${active ? "border-secondary bg-secondary/5" : "border-border bg-background"}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-sm flex items-center gap-1.5">
                            <Activity className="h-3.5 w-3.5 text-secondary" /> {t.label}
                          </p>
                          {active && <CheckCircle2 className="h-4 w-4 text-secondary" />}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{t.ratio} · Stability {t.stability}%</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            <div className="grid sm:grid-cols-3 gap-3">
              <Button asChild className="bg-gradient-primary text-primary-foreground">
                <a href="/calculator">Estimate cost <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline"><a href="/loan-calculator">Loan EMI calculator</a></Button>
              <Button asChild variant="outline"><a href="/contact">Talk to a clinic</a></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-lg bg-primary-foreground/10 p-3">
      <p className="text-[10px] uppercase tracking-wider text-primary-foreground/60">{label}</p>
      <p className={`mt-0.5 font-bold ${small ? "text-sm" : "text-xl"}`}>{value}</p>
    </div>
  );
}
