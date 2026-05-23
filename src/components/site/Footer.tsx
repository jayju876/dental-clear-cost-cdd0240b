import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Stethoscope } from "lucide-react";

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
  { to: "/calculator", label: "Implant Cost Calculator" },
  { to: "/loan-calculator", label: "Loan EMI Calculator" },
  { to: "/ratio-calculator", label: "Implant Ratio Calculator" },
  { to: "/all-on-4-calculator", label: "All-on-4 Calculator" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
] as const;

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
          <div className="flex gap-3 pt-2">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="rounded-md p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
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
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5" /><span>hello@implantcost.health</span></li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5" /><span>+91 80 4000 4000</span></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" /><span>Bengaluru, India · Global</span></li>
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
