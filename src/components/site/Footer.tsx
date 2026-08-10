import { Link } from "@tanstack/react-router";
import { Clock, Globe2, ShieldCheck, Stethoscope } from "lucide-react";


const legal = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/disclaimer", label: "Disclaimer" },
  { to: "/cookie-policy", label: "Cookie Policy" },
  { to: "/hipaa", label: "HIPAA Compliance" },
  { to: "/accessibility", label: "Accessibility" },
  { to: "/editorial-policy", label: "Editorial Policy" },
] as const;

const explore = [
  { to: "/", label: "Dental Implant Cost Calculator" },
  { to: "/breast-implant-cost-calculator", label: "Breast Implant Cost Calculator" },
  { to: "/loan", label: "Loan EMI Calculator" },
  { to: "/ratio", label: "Implant Ratio Calculator" },
  
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
  { to: "/sitemap", label: "Sitemap" },
] as const;

const socialLinks = [
  { icon: MediumIcon, href: "https://medium.com/@dentalimplantcalculators", label: "Medium" },
  { icon: SubstackIcon, href: "https://substack.com/@dentalimplantcalculators", label: "Substack" },
  { icon: BloggerIcon, href: "https://dentalimplantcalculators.blogspot.com/", label: "Blogger" },
] as const;

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2.846 6.36c.02-.2-.06-.4-.222-.52l-1.64-1.32v-.2h4.92l3.803 8.33 3.342-8.33h4.69v.2l-1.403 1.347c-.12.093-.187.24-.173.4v10.18c-.014.16.053.307.173.4l1.367 1.347v.2H13.15v-.2l1.407-1.367c.133-.133.133-.173.133-.4V7.52l-3.947 10.02h-.533L5.79 7.52v6.747c-.04.307.053.613.253.853l1.833 2.227v.2H2.18v-.2l1.833-2.227c.2-.24.293-.546.253-.853V6.36z" />
    </svg>
  );
}

function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.539 8.242H1.477V5.407H22.54v2.835zm0 3.112H1.477v2.835H22.54v-2.835zM1.477 14.19v7.201l10.48-5.128L22.539 21.39V14.19H1.477z" />
    </svg>
  );
}

function BloggerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.316 0h4.617c.443 0 .875.157 1.214.443l.007.006c.34.29.557.7.579 1.14l.005.162v14.99c0 .443-.157.875-.443 1.214l-.006.007a1.85 1.85 0 0 1-1.14.579l-.162.005H6.067a1.85 1.85 0 0 1-1.214-.443l-.007-.006a1.85 1.85 0 0 1-.579-1.14L4.263 16.9V7.852c0-.443.157-.875.443-1.214l.006-.007a1.85 1.85 0 0 1 1.14-.579l.162-.005h.7c.395 0 .757-.226.93-.58l.36-.752a1.85 1.85 0 0 1 1.67-1.075h2.642c.065 0 .13.003.194.01V1.75c0-.964.783-1.747 1.747-1.747h.01zm-1.692 6.316H8.526a1.013 1.013 0 0 0 0 2.026h3.098a1.013 1.013 0 0 0 0-2.026zm2.184 4.21H8.526a1.013 1.013 0 0 0 0 2.026h5.282a1.013 1.013 0 0 0 0-2.026z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-accent text-accent-foreground">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="text-base font-semibold">ImplantCost.</span>
          </div>
          <p className="text-sm text-primary-foreground/70 max-w-xs">
            Instant, transparent dental implant cost estimates across India, USA, UK, UAE and more.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {explore.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-primary-foreground transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {legal.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-primary-foreground transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Why ImplantCost</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2"><Globe2 className="h-4 w-4 mt-0.5" /><span>Pricing across 12+ countries, updated quarterly</span></li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5" /><span>Instant estimates — no sign-up required</span></li>
            <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 mt-0.5" /><span>Reviewed by licensed dental clinicians</span></li>
          </ul>
        </div>

      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 text-xs text-primary-foreground/60 flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} ImplantCost. All rights reserved.</p>
          <p>Estimates are for informational purposes only and do not constitute medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
