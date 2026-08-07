import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Stethoscope, ChevronDown, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_CALCULATORS } from "@/lib/site-pages";

const primaryNav = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [mobileCalcOpen, setMobileCalcOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calcOpen) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setCalcOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCalcOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [calcOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-elegant">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="truncate text-base font-semibold tracking-tight">
            ImplantCost<span className="text-secondary">.</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            className="px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "px-2.5 py-2 text-sm font-semibold text-foreground" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>

          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setCalcOpen(true)}
            onMouseLeave={() => setCalcOpen(false)}
          >
            <button
              type="button"
              aria-expanded={calcOpen}
              aria-haspopup="true"
              onClick={() => setCalcOpen((v) => !v)}
              className="flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Dental Implant Cost Calculator
              <ChevronDown className={`h-4 w-4 transition-transform ${calcOpen ? "rotate-180" : ""}`} />
            </button>

            {calcOpen && (
              <div className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-2">
                <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-popover p-2 shadow-elegant">
                  {NAV_CALCULATORS.map((c) => (
                    <Link
                      key={c.path}
                      to={c.path}
                      onClick={() => setCalcOpen(false)}
                      className="group flex min-w-0 gap-2 rounded-lg p-2.5 transition-colors hover:bg-muted"
                    >
                      <Calculator className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium leading-tight text-foreground">{c.name}</span>
                        {c.navDescription && (
                          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                            {c.navDescription}
                          </span>
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {primaryNav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "px-2.5 py-2 text-sm font-semibold text-foreground" }}
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
          <nav aria-label="Mobile" className="container mx-auto flex flex-col px-4 py-3 gap-1">
            <Link to="/" onClick={() => setOpen(false)} className="px-2 py-2 text-sm font-medium">
              Home
            </Link>

            <button
              type="button"
              aria-expanded={mobileCalcOpen}
              onClick={() => setMobileCalcOpen((v) => !v)}
              className="flex items-center justify-between px-2 py-2 text-left text-sm font-medium"
            >
              Dental Implant Cost Calculator
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileCalcOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileCalcOpen && (
              <div className="ml-2 flex flex-col gap-0.5 border-l border-border pl-3">
                {NAV_CALCULATORS.map((c) => (
                  <Link
                    key={c.path}
                    to={c.path}
                    onClick={() => setOpen(false)}
                    className="px-2 py-2 text-sm text-muted-foreground"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}

            {primaryNav.slice(1).map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-2 py-2 text-sm font-medium">
                {n.label}
              </Link>
            ))}

            <Button asChild className="mt-2 bg-gradient-primary text-primary-foreground">
              <Link to="/cost" onClick={() => setOpen(false)}>
                Calculate My Cost
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
