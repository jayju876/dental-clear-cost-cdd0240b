import { Link } from "@tanstack/react-router";
import { KeyRound, ArrowRight, CheckCircle2, Calculator, TrendingDown, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/site/Section";

const TOC = [
  { id: "what-is", label: "What Is a Dental Implant Loan Calculator?" },
  { id: "cost", label: "How Much Do Dental Implants Cost in the US?" },
  { id: "how-to-use", label: "How to Use This Calculator" },
  { id: "understanding-results", label: "Understanding Your Results" },
  { id: "financing-options", label: "Dental Implant Financing Options" },
  { id: "loan-factors", label: "Factors That Affect Your Loan Rate" },
  { id: "compare-terms", label: "Compare Loan Terms Side by Side" },
  { id: "tips-patients", label: "Tips for Patients to Get the Best Rate" },
  { id: "for-clinics", label: "For Dental Clinics: Why Offer Financing?" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const COST_ROWS = [
  ["Single tooth implant", "$3,000 – $6,000"],
  ["Implant-supported bridge", "$5,000 – $15,000"],
  ["All-on-4 (per arch)", "$12,000 – $25,000"],
  ["Full mouth reconstruction", "$25,000 – $90,000"],
];

const TERM_ROWS = [
  ["12 months", "$1,149/mo", "$788", "$13,788"],
  ["24 months", "$606/mo", "$1,542", "$14,542"],
  ["36 months", "$426/mo", "$2,322", "$15,322"],
  ["48 months", "$336/mo", "$3,128", "$16,128"],
  ["60 months", "$283/mo", "$3,959", "$16,959"],
];

const TAKEAWAYS = [
  "A $13,000 dental implant loan at 11% APR for 36 months = $426/month and $2,322 total interest.",
  "Shorter loan terms (12–24 months) save thousands in interest; longer terms lower monthly payments.",
  "This free calculator lets patients and dental clinics compare real loan scenarios instantly.",
  "Always compare lenders — APR rates for dental financing typically range from 6.99% to 29.99% depending on credit score.",
];

const FAQS = [
  {
    q: "What is the average interest rate for a dental implant loan?",
    a: "The average APR for dental implant loans in the US ranges from 6.99% to 29.99%, depending on your credit score, lender, and loan term. Borrowers with excellent credit (720+) typically qualify for rates between 7–12%, while those with fair credit (580–660) may see rates of 18–25% or higher.",
  },
  {
    q: "Can I get a dental implant loan with bad credit?",
    a: "Yes, financing is available for borrowers with bad credit, but expect higher interest rates (often 20–30% APR). Options include CareCredit (which has a relatively low approval threshold), in-house clinic payment plans, secured loans using collateral, or applying with a co-signer to access better rates.",
  },
  {
    q: "How much should I put as a down payment for a dental implant loan?",
    a: "A larger down payment directly reduces your loan principal, lowering both your monthly EMI and total interest paid. If possible, aim for at least 10–20% of the total treatment cost as a down payment. For a $15,000 procedure, a $2,000–$3,000 down payment is a reasonable starting point.",
  },
  {
    q: "Is dental implant financing worth it?",
    a: "For most patients, yes — dental implants are a permanent solution that can last 20–30 years, compared to bridges or dentures that require replacement every 5–15 years. When viewed as a long-term investment, the interest cost of financing is often offset by the avoided cost of repeated replacements and the health benefits of preserving jawbone density.",
  },
  {
    q: "Does financing a dental implant affect my credit score?",
    a: "Yes, applying for a personal loan or healthcare credit card results in a hard credit inquiry, which can temporarily lower your score by 5–10 points. However, making on-time monthly payments over the life of the loan will positively impact your credit history over time.",
  },
  {
    q: "What is the minimum credit score to get approved for dental financing?",
    a: "Most mainstream lenders prefer a minimum credit score of 620–640 for dental loan approval. CareCredit reportedly approves applicants with scores as low as 600 in some cases. Below 580, in-house clinic plans or secured loans are typically the most accessible options.",
  },
  {
    q: "How does the dental implant loan calculator estimate payments?",
    a: "The calculator uses the standard amortization formula to calculate your monthly EMI based on your loan principal (treatment cost minus down payment), APR, and loan term in months. All estimates are illustrative — actual loan terms vary by lender and individual credit profile.",
  },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 mt-14 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-border/60">
              {row.map((cell, i) => (
                <td key={i} className={`px-4 py-3 ${i === 0 ? "font-medium" : ""}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LoanGuideContent() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Key takeaways */}
        <FadeIn>
          <Card className="p-6 md:p-8 border-border/70 bg-gradient-soft">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-secondary">
              <KeyRound className="h-4 w-4" /> Key Takeaways (TL;DR)
            </p>
            <ul className="mt-4 space-y-3">
              {TAKEAWAYS.map((t) => (
                <li key={t} className="flex gap-3 text-sm md:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>

        {/* TOC */}
        <FadeIn delay={0.05}>
          <Card className="mt-8 p-6 border-border/70">
            <p className="text-sm font-semibold uppercase tracking-wider text-secondary">Table of Contents</p>
            <nav className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {TOC.map((item, i) => (
                <a key={item.id} href={`#${item.id}`} className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  {i + 1}. {item.label}
                </a>
              ))}
            </nav>
          </Card>
        </FadeIn>

        {/* What is */}
        <H2 id="what-is">What Is a Dental Implant Loan Calculator?</H2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            A dental implant loan calculator is a free online tool that helps you estimate your monthly EMI (Equated Monthly Installment), total interest paid, and total repayment amount before you sign any loan agreement. Whether you're a patient planning your implant procedure or a dental clinic helping patients understand their payment options, this calculator gives you instant, transparent numbers.
          </p>
          <p>
            Dental implants are a long-term investment in your oral health — but they come with a significant upfront cost. This tool removes the guesswork by letting you input your treatment cost, down payment, interest rate (APR), and loan term to see a clear payment breakdown in seconds. Before financing, get an accurate treatment estimate with our <Link to="/" className="text-secondary font-medium hover:underline">Dental Implant Cost Calculator</Link>.
          </p>
        </div>
        <div className="mt-5 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Calculator, title: "Patients", text: "Researching dental implant financing in the US" },
            { icon: Building2, title: "Dental Clinics", text: "Helping patients choose manageable payment plans" },
            { icon: TrendingDown, title: "Smart Borrowers", text: "Comparing short-term vs. long-term loan options" },
          ].map((b) => (
            <Card key={b.title} className="p-5 border-border/70">
              <b.icon className="h-6 w-6 text-secondary" />
              <p className="mt-3 font-semibold">{b.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
            </Card>
          ))}
        </div>

        {/* Cost */}
        <H2 id="cost">How Much Do Dental Implants Cost in the US?</H2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            According to the American Academy of Implant Dentistry (AAID), dental implants in the United States typically cost between <strong className="text-foreground">$3,000 and $6,000 per tooth</strong> for a single implant, including the abutment and crown. Full-mouth implants or implant-supported dentures can range from <strong className="text-foreground">$25,000 to $90,000</strong> depending on the number of implants and the complexity of the procedure. See our breakdown of <Link to="/blog/$slug" params={{ slug: "full-set-dental-implants-cost" }} className="text-secondary font-medium hover:underline">full set dental implant costs</Link> for details.
          </p>
        </div>
        <DataTable head={["Procedure", "Average Cost (US)"]} rows={COST_ROWS} />
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Most dental insurance plans do not cover dental implants, classifying them as cosmetic procedures — which is why dental financing has become essential for millions of Americans. A 2023 survey by the American Dental Association (ADA) found that nearly <strong className="text-foreground">1 in 3 American adults</strong> delayed dental care due to cost concerns. Planning a full-arch restoration? Try our <Link to="/all-on-4-calculator" className="text-secondary font-medium hover:underline">All-on-4 Cost Calculator</Link> first.
        </p>

        {/* How to use */}
        <H2 id="how-to-use">How to Use This Calculator</H2>
        <div className="mt-5 space-y-4">
          {[
            { step: 1, title: "Enter Your Total Treatment Cost", text: "Input the full cost quoted by your dental clinic. If you have a treatment plan, use the total figure including any pre-treatment procedures (bone grafting, extractions, etc.)." },
            { step: 2, title: "Set Your Down Payment", text: "Enter how much you can pay upfront. A higher down payment reduces your loan amount, which lowers both your monthly payment and total interest." },
            { step: 3, title: "Input the Interest Rate (APR)", text: "Use the APR provided by your lender. If you haven't spoken to a lender yet, 11% APR is a reasonable starting estimate for average credit scores (660–720 range) on personal medical loans in the US." },
            { step: 4, title: "Choose Your Loan Term", text: "Select a repayment period between 12 and 60 months. Use the comparison table at the bottom of the results to instantly see how your monthly payment and total interest change across different terms." },
          ].map((s) => (
            <Card key={s.step} className="p-5 border-border/70 flex gap-4">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-bold text-sm">
                {s.step}
              </span>
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-secondary/30 bg-secondary/5 p-5 text-sm leading-relaxed">
          <strong>Pro Tip:</strong> Start by entering your desired monthly budget, then work backward to find the loan term that fits — this way you can determine if the treatment is affordable before approaching a lender.
        </div>

        {/* Understanding results */}
        <H2 id="understanding-results">Understanding Your Results</H2>
        <div className="mt-5 grid md:grid-cols-3 gap-4">
          <Card className="p-5 border-border/70">
            <p className="font-semibold text-secondary">Monthly EMI</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              The fixed amount you'll pay every month for the duration of your loan, including both principal repayment and interest, calculated with the standard EMI formula: EMI = [P × R × (1+R)^N] / [(1+R)^N – 1].
            </p>
          </Card>
          <Card className="p-5 border-border/70">
            <p className="font-semibold text-secondary">Total Payable Amount</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              The total you'll pay over the entire loan period — principal plus all interest. A $13,000 loan at 11% APR for 36 months results in a total payable amount of $15,322.
            </p>
          </Card>
          <Card className="p-5 border-border/70">
            <p className="font-semibold text-secondary">Total Interest Paid</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Exactly how much extra you pay for borrowing. In the example above, that's $2,322 — about 18% of the original loan amount. Choosing a shorter term significantly reduces this figure.
            </p>
          </Card>
        </div>

        {/* Financing options */}
        <H2 id="financing-options">Dental Implant Financing Options in the US</H2>
        <div className="mt-5 space-y-4">
          {[
            { title: "1. In-House Dental Payment Plans", text: "Many dental clinics offer 0% in-house financing for qualified patients, typically for 12–24 months. These plans are convenient but may require a credit check and are usually limited to existing patients." },
            { title: "2. Personal Medical Loans", text: "Banks, credit unions, and online lenders offer personal loans specifically for medical and dental expenses. APR rates typically range from 6.99% to 29.99% based on your credit score, debt-to-income ratio, and loan term. Lenders like LightStream, SoFi, and Upgrade specialize in medical loans." },
            { title: "3. Healthcare Credit Cards (CareCredit, Alphaeon)", text: "CareCredit is one of the most widely accepted healthcare credit cards in the US, offering deferred interest promotions (often 0% for 12–24 months if paid in full). However, if the balance isn't paid within the promotional period, high retroactive interest (usually 26.99% APR) applies to the full original amount." },
            { title: "4. Home Equity Loans / HELOCs", text: "Homeowners can borrow against their home equity at lower interest rates (typically 7–10% APR in the current rate environment). This option provides the lowest interest rate but puts your home at risk if you default." },
            { title: "5. Dental School Clinics", text: "Accredited dental schools across the US offer implant procedures at 40–60% reduced costs compared to private practices. Treatment is performed by supervised dental students under licensed professionals." },
          ].map((o) => (
            <Card key={o.title} className="p-5 border-border/70">
              <p className="font-semibold">{o.title}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{o.text}</p>
            </Card>
          ))}
        </div>

        {/* Loan factors */}
        <H2 id="loan-factors">Factors That Affect Your Dental Loan Rate</H2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Your monthly payment is only part of the equation. Here's what determines the interest rate you'll receive:
        </p>
        <ul className="mt-4 space-y-3">
          {[
            ["Credit Score", "Scores above 720 typically qualify for the best rates. Borrowers with scores below 620 may face APRs of 20–30% or higher."],
            ["Loan Term", "Longer terms generally come with higher rates since they represent greater risk for lenders."],
            ["Loan Amount", "Larger loan amounts (over $15,000) may receive slightly better rates from some lenders."],
            ["Debt-to-Income Ratio (DTI)", "Most lenders prefer a DTI below 40%. Higher ratios can result in higher rates or rejection."],
            ["Employment Status", "Full-time, salaried employment is viewed more favorably than self-employment by most medical lenders."],
            ["Lender Type", "Credit unions typically offer lower rates than banks or online lenders for qualified members."],
          ].map(([k, v]) => (
            <li key={k} className="flex gap-3 text-sm md:text-base">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <span className="text-muted-foreground"><strong className="text-foreground">{k}:</strong> {v}</span>
            </li>
          ))}
        </ul>

        {/* Compare terms */}
        <H2 id="compare-terms">Compare Loan Terms Side by Side</H2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          For a $15,000 dental implant treatment with a $2,000 down payment (loan amount: $13,000) at 11% APR, here's how different loan terms compare:
        </p>
        <DataTable head={["Loan Term", "Monthly Payment", "Total Interest", "Total Cost"]} rows={TERM_ROWS} />
        <div className="mt-5 rounded-xl border border-secondary/30 bg-secondary/5 p-5 text-sm leading-relaxed">
          <strong>Key insight:</strong> Stretching your loan from 12 to 60 months saves $866/month but costs $3,171 more in total interest. For most patients, the 24–36 month range offers the best balance of affordability and total cost.
        </div>

        {/* Tips */}
        <H2 id="tips-patients">Tips for Patients: Get the Best Dental Implant Financing Rate</H2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Getting a fair rate on your dental loan can save you hundreds — or thousands — of dollars. Here's how:
        </p>
        <ol className="mt-4 space-y-3">
          {[
            ["Check Your Credit Score First", "Use a free service like Credit Karma or Experian to know your score before applying. Scores above 700 unlock significantly better rates."],
            ["Get Pre-Qualified, Not Pre-Approved", "Pre-qualification uses a soft credit pull (no score impact). Compare 3–5 lenders before submitting a full application."],
            ["Negotiate with Your Dentist", "Some practices will reduce costs if you pay a portion upfront or commit to in-house financing. It never hurts to ask."],
            ["Consider a Co-Signer", "If your credit is weak, a co-signer with good credit can dramatically lower your interest rate."],
            ["Avoid 0% Deferred Interest Traps", "Read the fine print on promotional financing cards. If you can't pay the full balance before the promotional period ends, standard APR applies retroactively."],
            ["Use This Calculator to Compare Scenarios", "Before committing to any plan, run multiple scenarios here. Even a 2% APR difference can mean $500–$1,000 in savings over a 36-month term."],
          ].map(([k, v], i) => (
            <li key={k} className="flex gap-3 text-sm md:text-base">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xs font-bold">{i + 1}</span>
              <span className="text-muted-foreground"><strong className="text-foreground">{k}</strong> — {v}</span>
            </li>
          ))}
        </ol>

        {/* For clinics */}
        <H2 id="for-clinics">For Dental Clinics: Why Offering Patient Financing Matters</H2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            If you're a dental practice reading this page, patient financing tools like this calculator can directly impact your revenue and patient retention. A 2022 report from PatientFi found that practices offering flexible payment options saw an average <strong className="text-foreground">35% increase in case acceptance rates</strong> for elective procedures over $3,000. Dental implants — one of the highest-value procedures in a practice — are particularly sensitive to cost concerns.
          </p>
        </div>
        <ul className="mt-4 space-y-3">
          {[
            ["Reduce \"I need to think about it\" drop-off", "When patients can see exact monthly payments in real time, sticker shock decreases and decision-making accelerates."],
            ["Increase average case value", "Patients who understand financing are more likely to proceed with full treatment plans rather than partial solutions."],
            ["Build trust and transparency", "Providing clear financial tools positions your clinic as patient-first and transparent, which drives referrals and online reviews."],
            ["Pre-qualify patients before appointments", "Direct patients to this calculator before their consultation. They'll arrive informed, reducing time spent on financial conversations."],
          ].map(([k, v]) => (
            <li key={k} className="flex gap-3 text-sm md:text-base">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <span className="text-muted-foreground"><strong className="text-foreground">{k}</strong> — {v}</span>
            </li>
          ))}
        </ul>
        <Card className="mt-6 p-6 border-border/70 bg-gradient-soft">
          <p className="font-semibold">Embed financing clarity into your patient journey.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Give patients an instant payment estimate before they call your office, and pair it with our <Link to="/ratio-calculator" className="text-secondary font-medium hover:underline">Implant Ratio Calculator</Link> for treatment planning.
          </p>
          <Button asChild className="mt-4 bg-gradient-primary text-primary-foreground">
            <Link to="/contact">Contact us to learn more <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </Card>

        {/* FAQ */}
        <H2 id="faq">Frequently Asked Questions (FAQ)</H2>
        <div className="mt-5 space-y-3">
          {FAQS.map((f) => (
            <Card key={f.q} className="p-5 border-border/70">
              <p className="font-semibold">{f.q}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </Card>
          ))}
        </div>

        {/* Conclusion */}
        <Card className="mt-12 p-6 md:p-8 border-border/70 bg-gradient-primary text-primary-foreground">
          <h2 className="text-2xl font-bold tracking-tight">Ready to Plan Your Implant Financing?</h2>
          <p className="mt-3 text-primary-foreground/85 leading-relaxed">
            Understanding your dental implant financing options before you commit to a procedure is one of the smartest financial decisions you can make. Use the calculator above to compare loan terms, adjust your down payment, and find a monthly payment that works for your budget — then get your full treatment estimate with our <Link to="/" className="font-semibold underline underline-offset-2">Dental Implant Cost Calculator</Link>.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <a href="#top">Back to calculator</a>
            </Button>
            <Button asChild variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/calculators">Explore all calculators <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
