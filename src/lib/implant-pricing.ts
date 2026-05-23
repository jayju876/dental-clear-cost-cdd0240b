// Static pricing model for the calculator. Values are USD ranges per single implant
// covering implant + abutment + standard zirconia crown — clinic-only estimates.
export type CountryCode = "IN" | "US" | "UK" | "AE" | "TR" | "MX" | "TH" | "DE" | "AU" | "CA";

export const COUNTRIES: { code: CountryCode; name: string; currency: string; symbol: string; rate: number; cities: string[]; perImplantUSD: [number, number] }[] = [
  { code: "US", name: "United States", currency: "USD", symbol: "$", rate: 1, cities: ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "Dallas", "San Diego", "Atlanta", "Seattle", "Phoenix"], perImplantUSD: [3500, 6000] },
  { code: "IN", name: "India", currency: "INR", symbol: "₹", rate: 83, cities: ["Mumbai", "Bengaluru", "Delhi", "Chennai", "Hyderabad", "Pune"], perImplantUSD: [600, 1200] },
  
  { code: "UK", name: "United Kingdom", currency: "GBP", symbol: "£", rate: 0.79, cities: ["London", "Manchester", "Birmingham", "Edinburgh"], perImplantUSD: [2500, 4500] },
  { code: "AE", name: "United Arab Emirates", currency: "AED", symbol: "د.إ", rate: 3.67, cities: ["Dubai", "Abu Dhabi", "Sharjah"], perImplantUSD: [1800, 3500] },
  { code: "TR", name: "Turkey", currency: "USD", symbol: "$", rate: 1, cities: ["Istanbul", "Antalya", "Izmir"], perImplantUSD: [700, 1400] },
  { code: "MX", name: "Mexico", currency: "USD", symbol: "$", rate: 1, cities: ["Cancun", "Tijuana", "Mexico City"], perImplantUSD: [900, 1700] },
  { code: "TH", name: "Thailand", currency: "USD", symbol: "$", rate: 1, cities: ["Bangkok", "Phuket", "Chiang Mai"], perImplantUSD: [1200, 2200] },
  { code: "DE", name: "Germany", currency: "EUR", symbol: "€", rate: 0.92, cities: ["Berlin", "Munich", "Frankfurt"], perImplantUSD: [2200, 3800] },
  { code: "AU", name: "Australia", currency: "AUD", symbol: "A$", rate: 1.52, cities: ["Sydney", "Melbourne", "Brisbane"], perImplantUSD: [3000, 5500] },
  { code: "CA", name: "Canada", currency: "CAD", symbol: "C$", rate: 1.36, cities: ["Toronto", "Vancouver", "Montreal"], perImplantUSD: [2800, 4800] },
];

export const IMPLANT_TYPES = [
  { id: "single", label: "Single Tooth Implant", mult: 1.0 },
  { id: "multiple", label: "Multiple Implants", mult: 0.95 },
  { id: "all-on-4", label: "All-on-4 (Full Arch)", mult: 0.85 },
  { id: "all-on-6", label: "All-on-6 (Full Arch)", mult: 0.88 },
];

export const CROWN_MATERIALS = [
  { id: "pfm", label: "PFM (Porcelain-Fused-Metal)", mult: 0.85 },
  { id: "zirconia", label: "Zirconia", mult: 1.0 },
  { id: "emax", label: "E.max Lithium Disilicate", mult: 1.1 },
  { id: "full-ceramic", label: "Full Ceramic Premium", mult: 1.2 },
];

export const BRANDS = [
  { id: "osstem", label: "Osstem (Korea)", mult: 0.9 },
  { id: "dentium", label: "Dentium", mult: 0.95 },
  { id: "nobel", label: "Nobel Biocare", mult: 1.15 },
  { id: "straumann", label: "Straumann (Swiss)", mult: 1.25 },
  { id: "biohorizons", label: "BioHorizons", mult: 1.05 },
];

export const ADDONS = {
  boneGraftUSD: [300, 800] as [number, number],
  sinusLiftUSD: [800, 1800] as [number, number],
  extractionUSD: [100, 300] as [number, number],
};

export type CalcInput = {
  country: CountryCode;
  city: string;
  teeth: number;
  implantType: string;
  crown: string;
  brand: string;
  boneGraft: boolean;
  sinusLift: boolean;
  extraction: boolean;
};

export function estimate(input: CalcInput) {
  const country = COUNTRIES.find((c) => c.code === input.country)!;
  const type = IMPLANT_TYPES.find((t) => t.id === input.implantType)!;
  const crown = CROWN_MATERIALS.find((c) => c.id === input.crown)!;
  const brand = BRANDS.find((b) => b.id === input.brand)!;

  const teeth = Math.max(1, input.teeth);
  const [lo, hi] = country.perImplantUSD;
  const mult = type.mult * crown.mult * brand.mult;
  let low = lo * mult * teeth;
  let high = hi * mult * teeth;

  const addons: { label: string; range: [number, number] }[] = [];
  if (input.boneGraft) {
    low += ADDONS.boneGraftUSD[0] * teeth;
    high += ADDONS.boneGraftUSD[1] * teeth;
    addons.push({ label: "Bone graft", range: [ADDONS.boneGraftUSD[0] * teeth, ADDONS.boneGraftUSD[1] * teeth] });
  }
  if (input.sinusLift) {
    low += ADDONS.sinusLiftUSD[0];
    high += ADDONS.sinusLiftUSD[1];
    addons.push({ label: "Sinus lift", range: ADDONS.sinusLiftUSD });
  }
  if (input.extraction) {
    low += ADDONS.extractionUSD[0] * teeth;
    high += ADDONS.extractionUSD[1] * teeth;
    addons.push({ label: "Tooth extraction", range: [ADDONS.extractionUSD[0] * teeth, ADDONS.extractionUSD[1] * teeth] });
  }

  // India comparison for savings
  const india = COUNTRIES.find((c) => c.code === "IN")!;
  const indiaLow = india.perImplantUSD[0] * mult * teeth;
  const indiaHigh = india.perImplantUSD[1] * mult * teeth;

  return {
    country,
    type,
    crown,
    brand,
    teeth,
    addons,
    lowUSD: low,
    highUSD: high,
    midUSD: (low + high) / 2,
    indiaLowUSD: indiaLow,
    indiaHighUSD: indiaHigh,
    savingsUSD: Math.max(0, (low + high) / 2 - (indiaLow + indiaHigh) / 2),
  };
}

export function formatCurrency(usd: number, country: { rate: number; symbol: string; currency: string }) {
  const local = usd * country.rate;
  return `${country.symbol}${Math.round(local).toLocaleString()}`;
}

export function emi(usd: number, months = 24, apr = 0.12) {
  const r = apr / 12;
  const m = (usd * r) / (1 - Math.pow(1 + r, -months));
  return m;
}
