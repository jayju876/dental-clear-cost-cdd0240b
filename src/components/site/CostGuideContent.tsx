import { FadeIn } from "@/components/site/Section";

const priceRows: [string, string][] = [
  ["Single-tooth implant", "$1,500 – $6,000"],
  ["Multiple dental implants", "$3,000 – $30,000+"],
  ["Implant-supported denture", "$3,500 – $30,000"],
  ["All-on-4 (per arch)", "$12,000 – $25,000"],
  ["All-on-6 (per arch)", "$15,000 – $28,000"],
  ["Full-mouth dental implants", "$25,000 – $90,000+"],
];

const compareRows: [string, string, string, string][] = [
  ["Individual implants", "Varies", "Scattered missing teeth", "$1,500–$6,000 per tooth"],
  ["All-on-4", "4", "Full arch restoration", "$12,000–$25,000 / arch"],
  ["All-on-6", "6", "Full arch restoration", "$15,000–$28,000 / arch"],
  ["Full mouth (both arches)", "Varies", "Complete restoration", "$25,000–$90,000+"],
];

const faqs: [string, string][] = [
  [
    "How much does a single dental implant cost?",
    "A single implant costs between $1,500 and $6,000. This depends on where you are, the materials, and if you need extra procedures.",
  ],
  [
    "Are dental implants cheaper in some states?",
    "Yes. Places with lower costs of living and dental practice overhead, like the Midwest and South, have cheaper implants. This is compared to coastal areas.",
  ],
  [
    "How accurate is a dental implant cost calculator?",
    "A good calculator gives a rough estimate. It can't consider your bone health, case complexity, or a dentist's prices. Use it to plan, not as a final cost.",
  ],
  [
    "Can I finance dental implants?",
    "Yes. Dental offices offer payment plans, and there are third-party financing options. Some patients pay over 12 to 60 months.",
  ],
];

export function CostGuideContent() {
  return (
    <section className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-14 md:py-20">
        <FadeIn className="mx-auto max-w-3xl">
          <article className="prose prose-slate dark:prose-invert max-w-none prose-base sm:prose-lg break-words prose-headings:tracking-tight prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-bold prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-3 prose-h3:mt-10 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:font-semibold prose-p:leading-[1.8] prose-p:text-foreground/85 prose-a:text-secondary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:my-1 prose-ul:pl-6 prose-ol:pl-6">
            <h2 className="!mt-0">Dental Implant Cost Calculator: How Much Do Dental Implants Cost in 2026?</h2>
            <p>
              If you're missing teeth, dental implants are a great option. They look and feel natural. But, you might
              wonder, <strong>how much will it cost?</strong>
            </p>
            <p>
              Our dental implant cost calculator can give you an estimate. It considers your location, how many teeth you
              need, the type of implant, and more. You don't need to sign up or feel pressured. We just want to help you
              plan.
            </p>

            <h3>How Much Do Dental Implants Cost in 2026?</h3>
            <p>
              Dental implant prices in 2026 will vary. It depends on the treatment, materials, where you live, and if you
              need extra steps like bone grafting.
            </p>
            <p>Here's what you might expect to pay:</p>
            <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold">Treatment</th>
                    <th className="px-4 py-3 font-semibold">Estimated Cost Range</th>
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map(([t, c]) => (
                    <tr key={t} className="border-t border-border/60">
                      <td className="px-4 py-3">{t}</td>
                      <td className="px-4 py-3 font-medium">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              These prices are just estimates. Your actual cost will depend on several factors. A dentist or oral surgeon
              will give you a final quote after checking your case.
            </p>

            <h3>What Is a Dental Implant and What Does the Cost Include?</h3>
            <p>A dental implant system has three main parts. Each part affects the total cost.</p>
            <p>
              <strong>The implant post</strong> is a titanium screw put in your jawbone. It acts like a tooth root.
              Titanium is used because it blends with bone.
            </p>
            <p>
              <strong>The abutment</strong> is the piece on top of the implant post after it heals. It connects the post
              to the crown. It must fit perfectly for stability.
            </p>
            <p>
              <strong>The dental crown</strong> is the tooth-shaped cap on the abutment. This is what you see and use for
              chewing. Crowns can be made of acrylic, porcelain, or zirconia, each with different prices and looks.
            </p>
            <p>
              But there's more to a complete implant treatment. It often includes consultation fees, X-rays, tooth
              extraction, bone grafting, sinus lifts, and sedation. These extra costs are often not included in the
              prices you see online. That's why our calculator asks about them.
            </p>

            <h3>What Factors Affect Dental Implant Cost?</h3>
            <p>
              Location plays a big role in dental costs. Prices can differ a lot by region and even city. Cities like New
              York City, San Francisco, or Chicago usually cost more than smaller towns or suburbs. Our calculator takes
              this into account.
            </p>
            <p>
              The number of teeth you need to replace also affects the cost. Replacing one tooth is cheaper than
              replacing many. But, getting multiple implants can be more cost-effective for certain treatments like{" "}
              <a href="/all-on-4-calculator">All-on-4 or All-on-6</a>.
            </p>
            <p>
              The material of your crown also matters. Acrylic is the cheapest but not the most durable. Porcelain looks
              more natural and is moderately priced. Zirconia is the most durable but also the most expensive.
            </p>
            <p>
              The brand of the implant system can also impact the cost. Brands like Straumann, Nobel Biocare, and Zimmer
              Biomet offer high-quality implants. They may cost more but often come with longer warranties and more
              research backing them.
            </p>
            <p>
              Bone grafting and sinus lifts are extra steps that may be needed. Bone grafting is common for jawbone loss.
              Sinus lifts are needed for upper-jaw implants when the sinus is too close. Both add to the cost and
              treatment time.
            </p>

            <h3>All-on-4 vs. All-on-6 vs. Individual Implants</h3>
            <p>For patients replacing all their teeth, there are three main choices:</p>
            <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold">Treatment</th>
                    <th className="px-4 py-3 font-semibold">Implants Per Arch</th>
                    <th className="px-4 py-3 font-semibold">Typical Use</th>
                    <th className="px-4 py-3 font-semibold">Estimated Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((r) => (
                    <tr key={r[0]} className="border-t border-border/60">
                      <td className="px-4 py-3">{r[0]}</td>
                      <td className="px-4 py-3">{r[1]}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r[2]}</td>
                      <td className="px-4 py-3 font-medium">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              <strong>All-on-4</strong> uses four implants for a full arch. It's chosen for needing fewer implants and
              sometimes avoiding bone grafting. <strong>All-on-6</strong> adds two more implants for better stability and
              load distribution, good for those with strong bites or more bone loss.
            </p>
            <p>
              No option is always best. What's right for you depends on your bone, gums, bite, and budget. Always talk to
              a qualified dentist or prosthodontist to find the best choice for you.
            </p>

            <h3>Does Dental Insurance Cover Dental Implants?</h3>
            <p>
              Most dental insurance plans don't cover implants because they see them as cosmetic. But, some plans,
              especially those from employers or extra dental policies, might cover part of the cost. This could be the
              crown or the tooth extraction before the implant.
            </p>
            <p>
              Even if insurance covers implants, limits like annual max benefits and waiting periods can reduce what you
              get. Check your plan and talk to your insurer before starting treatment.
            </p>
            <p>
              If insurance doesn't help, there are other ways to pay. Dental offices offer payment plans, and you can
              also use third-party financing or personal loans — estimate them with our{" "}
              <a href="/loan">dental implant loan calculator</a>.
            </p>

            <h3>How to Use the Dental Implant Cost Calculator</h3>
            <p>Our six-step calculator helps estimate costs before your first visit.</p>
            <ol>
              <li>
                <strong>Select your location</strong> — Country and city, for local prices
              </li>
              <li>
                <strong>Select your treatment type</strong> — Single tooth, multiple teeth, full arch, or full mouth
              </li>
              <li>
                <strong>Choose your implant details</strong> — Implant type and brand tier
              </li>
              <li>
                <strong>Select crown and abutment materials</strong> — Acrylic, porcelain, or zirconia
              </li>
              <li>
                <strong>Add any additional procedures</strong> — Extraction, bone graft, sinus lift, sedation
              </li>
              <li>
                <strong>Review your estimate</strong> — See a cost range, component breakdown, and optional financing
                projection
              </li>
            </ol>
            <p>
              The calculator gives a structured estimate based on your choices and location. But, actual costs can vary
              based on your case, the dentist you choose, and any extra procedures.
            </p>

            <h3>Frequently Asked Questions</h3>
            {faqs.map(([q, a]) => (
              <p key={q}>
                <strong>{q}</strong> {a}
              </p>
            ))}

            <h3>Important Disclaimer</h3>
            <p>
              The costs mentioned here and in our calculator are just estimates. Real costs can change based on your
              case, location, dentist, and insurance. This content is not medical advice or a treatment suggestion. Talk
              to a licensed dentist or oral surgeon for a real quote and advice.
            </p>
          </article>
        </FadeIn>
      </div>
    </section>
  );
}
