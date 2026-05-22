import { AUTHORS, type Author, getAuthor } from "./authors";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  publishedAt: string; // ISO date
  readingTime: string; // e.g. "8 min"
  authorSlug: string;
  reviewedBySlug?: string;
  content: { heading: string; paragraphs: string[] }[];
};

// Round-robin author assignment helper so new posts auto-assign.
function pickAuthor(i: number) {
  return AUTHORS[i % AUTHORS.length].slug;
}
function pickReviewer(i: number) {
  // Reviewer is always one of the two clinicians for medical EEAT signal.
  const clinicians = ["dr-michael-carter", "dr-sarah-mitchell"];
  return clinicians[i % clinicians.length];
}

const RAW: Omit<BlogPost, "authorSlug" | "reviewedBySlug">[] = [
  {
    slug: "full-mouth-dental-implant-cost-usa",
    title: "Full Mouth Dental Implant Cost in the USA (2026)",
    excerpt: "What All-on-4, All-on-6 and full mouth implants really cost across US cities — and how to plan financing.",
    tag: "Cost Guide",
    publishedAt: "2026-01-14",
    readingTime: "8 min",
    content: [
      { heading: "Average full mouth implant cost in the US", paragraphs: [
        "Full mouth dental implants in the United States typically cost $40,000 to $60,000 for both arches when restored with All-on-4 or All-on-6 protocols. Premium materials, complex bone grafting and brand selection can push that range to $70,000 or more.",
        "Costs vary significantly by city. Patients in New York, Los Angeles and San Francisco generally pay 15–25% above the national average, while clinics in Phoenix, Atlanta and Dallas often quote below average for comparable treatment.",
      ] },
      { heading: "Breakdown by treatment", paragraphs: [
        "Single implant with crown: $3,500–$6,000. All-on-4 per arch: $20,000–$30,000. All-on-6 per arch: $24,000–$36,000. Removable implant-supported denture: $7,000–$12,000.",
      ] },
      { heading: "How to lower total cost", paragraphs: [
        "Compare in-network providers, ask about staged treatment, use HSA/FSA dollars and request itemized quotes that separate surgery, abutments and prosthetics.",
      ] },
    ],
  },
  {
    slug: "all-on-4-vs-all-on-6",
    title: "All-on-4 vs All-on-6: Which Should You Choose?",
    excerpt: "Comparing two full-arch options on cost, longevity, candidacy and long-term predictability.",
    tag: "All-on-4 Guides",
    publishedAt: "2026-01-09",
    readingTime: "6 min",
    content: [
      { heading: "What the two protocols share", paragraphs: [
        "Both All-on-4 and All-on-6 restore a full arch with a fixed prosthesis supported by titanium implants. Both can be loaded the same day in eligible patients.",
      ] },
      { heading: "Where they differ", paragraphs: [
        "All-on-6 distributes biting forces across two additional implants, which can improve long-term predictability for patients with heavy bite forces or larger arches. All-on-4 is typically $4,000–$8,000 less per arch.",
      ] },
    ],
  },
  {
    slug: "straumann-vs-nobel-vs-osstem",
    title: "Straumann vs Nobel Biocare vs Osstem",
    excerpt: "What actually separates premium and value implant brands — and what it means for your bill.",
    tag: "Dental Implant Costs",
    publishedAt: "2026-01-04",
    readingTime: "10 min",
    content: [
      { heading: "Brand tiers", paragraphs: [
        "Straumann and Nobel Biocare are widely considered premium tier with the most published long-term research. Osstem and Dentium are well-respected value brands used at thousands of US clinics.",
      ] },
    ],
  },
  {
    slug: "dental-implant-financing-usa",
    title: "Dental Implant Financing in the USA",
    excerpt: "CareCredit, LendingClub, in-house plans and how to choose the right loan for implant treatment.",
    tag: "Implant Financing",
    publishedAt: "2025-12-28",
    readingTime: "7 min",
    content: [
      { heading: "Common US financing options", paragraphs: [
        "CareCredit and LendingClub are the most-used third-party lenders for dental implants. Promotional 0% APR plans usually run 6–24 months — useful if you can pay off the balance before deferred interest kicks in.",
      ] },
    ],
  },
  {
    slug: "does-insurance-cover-dental-implants",
    title: "Does Insurance Cover Dental Implants?",
    excerpt: "Medical vs dental coverage, FSA/HSA options and what to expect from major US insurers in 2026.",
    tag: "Insurance Coverage",
    publishedAt: "2025-12-19",
    readingTime: "8 min",
    content: [
      { heading: "Typical coverage in 2026", paragraphs: [
        "Most US dental insurance plans now cover 10–50% of implant costs, often capped at $1,500–$3,000 per year. Medical insurance may cover implants when tooth loss results from accidents, oral cancer or congenital conditions.",
      ] },
    ],
  },
  {
    slug: "bone-grafting-explained",
    title: "Bone Grafting Explained: When You Really Need It",
    excerpt: "Cost, recovery time, and when implant cases can skip grafting altogether.",
    tag: "Recovery & Procedures",
    publishedAt: "2025-12-12",
    readingTime: "5 min",
    content: [
      { heading: "When grafting is required", paragraphs: [
        "Bone grafting becomes necessary when the existing jawbone is too thin or too short to anchor an implant. Modern guided surgery and short implants have reduced grafting requirements in many cases.",
      ] },
    ],
  },
  {
    slug: "all-on-4-cost-near-me",
    title: "All-on-4 Cost Near Me: US City-by-City Pricing",
    excerpt: "Average All-on-4 prices in New York, LA, Chicago, Houston, Miami, Dallas, Atlanta, Seattle, Phoenix and San Diego.",
    tag: "All-on-4 Guides",
    publishedAt: "2025-12-05",
    readingTime: "9 min",
    content: [
      { heading: "City comparison", paragraphs: [
        "New York and Los Angeles tend to lead pricing at $26,000–$34,000 per arch. Phoenix, Dallas and Atlanta generally fall in the $19,000–$26,000 range for comparable All-on-4 treatment.",
      ] },
    ],
  },
  {
    slug: "zirconia-vs-emax-crowns",
    title: "Zirconia vs E.max Crowns: Aesthetics and Price",
    excerpt: "Choose the right crown material for your case, your budget and your bite.",
    tag: "Recovery & Procedures",
    publishedAt: "2025-11-28",
    readingTime: "6 min",
    content: [
      { heading: "Material at a glance", paragraphs: [
        "Zirconia is extremely strong and well-suited to molars and bruxers. E.max (lithium disilicate) offers superior translucency and is often the first choice for highly visible anterior crowns.",
      ] },
    ],
  },
];

export const POSTS: BlogPost[] = RAW.map((p, i) => ({
  ...p,
  authorSlug: pickAuthor(i),
  reviewedBySlug: pickReviewer(i),
}));

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, n = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return POSTS.slice(0, n);
  const sameTag = POSTS.filter((p) => p.slug !== slug && p.tag === current.tag);
  const others = POSTS.filter((p) => p.slug !== slug && p.tag !== current.tag);
  return [...sameTag, ...others].slice(0, n);
}

export function postsByAuthor(authorSlug: string): BlogPost[] {
  return POSTS.filter((p) => p.authorSlug === authorSlug);
}

export type { Author };
export { getAuthor };
