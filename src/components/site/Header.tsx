import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/cost", label: "Cost Calculator" },
  { to: "/loan", label: "Loan Calculator" },
  { to: "/ratio", label: "Ratio Calculator" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-elegant">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold tracking-tight">ImplantCost<span className="text-secondary">.</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "px-2.5 py-2 text-sm font-semibold text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            <Link to="/cost">Calculate My Cost</Link>
          </Button>
        </div>
        <button className="lg:hidden p-2" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto flex flex-col px-4 py-3 gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-2 py-2 text-sm font-medium">
                {n.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-gradient-primary text-primary-foreground">
              <Link to="/cost" onClick={() => setOpen(false)}>Calculate My Cost</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
