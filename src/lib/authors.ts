import michaelImg from "@/assets/author-michael-carter.jpg";
import sarahImg from "@/assets/author-sarah-mitchell.jpg";
import emilyImg from "@/assets/author-emily-roberts.jpg";
import jamesImg from "@/assets/author-james-walker.jpg";

export type Author = {
  slug: string;
  name: string;
  role: string;
  shortBio: string;
  longBio: string;
  image: string;
  credentials: string[];
  expertise: string[];
  stats: { articles: number; yearsExperience: number; reviewed: number };
  social: { twitter?: string; linkedin?: string; website?: string };
};

export const AUTHORS: Author[] = [
  {
    slug: "dr-michael-carter",
    name: "Dr. Michael Carter",
    role: "Dental Implant Specialist",
    shortBio:
      "Dr. Michael Carter specializes in full mouth rehabilitation, All-on-4 dental implants, and advanced implant restorations with over 12 years of experience.",
    longBio:
      "Dr. Michael Carter is a board-certified dental implant specialist with over 12 years of clinical experience in full mouth rehabilitation, All-on-4 and All-on-6 protocols, and complex implant restorations. He has placed more than 4,000 implants and lectures nationally on guided implant surgery and immediate-load techniques.",
    image: michaelImg,
    credentials: [
      "DDS, University of Michigan School of Dentistry",
      "Diplomate, American Board of Oral Implantology",
      "Fellow, International Congress of Oral Implantologists",
    ],
    expertise: ["All-on-4 & All-on-6", "Full Mouth Rehabilitation", "Guided Implant Surgery", "Bone Grafting"],
    stats: { articles: 28, yearsExperience: 12, reviewed: 64 },
    social: { linkedin: "#", twitter: "#" },
  },
  {
    slug: "dr-sarah-mitchell",
    name: "Dr. Sarah Mitchell",
    role: "Prosthodontist & Cosmetic Implant Expert",
    shortBio:
      "Dr. Sarah Mitchell focuses on cosmetic implant dentistry, zirconia restorations, and smile rehabilitation procedures.",
    longBio:
      "Dr. Sarah Mitchell is a prosthodontist specializing in cosmetic implant dentistry, zirconia restorations, and full smile rehabilitation. She combines digital smile design with evidence-based prosthodontic protocols to deliver natural-looking, long-lasting results.",
    image: sarahImg,
    credentials: [
      "DMD, Harvard School of Dental Medicine",
      "Certificate in Prosthodontics, UCLA",
      "Member, American College of Prosthodontists",
    ],
    expertise: ["Cosmetic Implants", "Zirconia Crowns", "Digital Smile Design", "Full Arch Restoration"],
    stats: { articles: 22, yearsExperience: 10, reviewed: 41 },
    social: { linkedin: "#", twitter: "#" },
  },
  {
    slug: "emily-roberts",
    name: "Emily Roberts",
    role: "Dental Finance & Insurance Advisor",
    shortBio:
      "Emily Roberts writes about dental implant financing, insurance coverage, and affordable payment planning for patients in the USA.",
    longBio:
      "Emily Roberts is a certified healthcare finance advisor focused on making advanced dental care accessible. She breaks down dental implant financing, HSA/FSA strategy, insurance coverage, and third-party lending so patients can make confident decisions about their treatment budget.",
    image: emilyImg,
    credentials: [
      "MBA, Finance — NYU Stern School of Business",
      "Certified Healthcare Financial Professional (CHFP)",
      "10+ years in patient financing advisory",
    ],
    expertise: ["Implant Financing", "Dental Insurance", "HSA/FSA Planning", "EMI & Payment Plans"],
    stats: { articles: 31, yearsExperience: 10, reviewed: 18 },
    social: { linkedin: "#", twitter: "#" },
  },
  {
    slug: "james-walker",
    name: "James Walker",
    role: "Healthcare Content Researcher",
    shortBio:
      "James Walker researches dental technologies, implant procedures, recovery timelines, and treatment comparisons.",
    longBio:
      "James Walker is a healthcare content researcher who translates clinical evidence into clear, patient-friendly guides. His work spans dental implant technology, procedural comparisons, recovery timelines, and emerging treatment options across the US market.",
    image: jamesImg,
    credentials: [
      "MSc, Health Communication — Johns Hopkins University",
      "8+ years researching evidence-based healthcare content",
      "Contributor to peer-reviewed dental publications",
    ],
    expertise: ["Implant Technology", "Procedure Research", "Recovery & Aftercare", "Treatment Comparisons"],
    stats: { articles: 44, yearsExperience: 8, reviewed: 12 },
    social: { linkedin: "#", twitter: "#" },
  },
];

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  read: string;
  publishedAt: string; // ISO
  authorSlug: string;
  reviewerSlug?: string;
};

export const POSTS: BlogPost[] = [
  {
    slug: "us-dental-implant-cost-2026",
    title: "Dental Implant Cost in the US: Full 2026 Breakdown",
    excerpt: "A state-by-state look at single tooth, All-on-4, and full mouth implant costs across the United States.",
    tag: "Cost Guide", read: "8 min", publishedAt: "2026-04-12",
    authorSlug: "dr-michael-carter", reviewerSlug: "dr-sarah-mitchell",
  },
  {
    slug: "all-on-4-vs-all-on-6",
    title: "All-on-4 vs All-on-6: Which Should You Choose?",
    excerpt: "Comparing two full-arch options on cost, longevity, and candidacy.",
    tag: "Education", read: "6 min", publishedAt: "2026-03-28",
    authorSlug: "dr-sarah-mitchell", reviewerSlug: "dr-michael-carter",
  },
  {
    slug: "straumann-vs-nobel-vs-osstem",
    title: "Straumann vs Nobel Biocare vs Osstem",
    excerpt: "What actually separates premium and value implant brands.",
    tag: "Brands", read: "10 min", publishedAt: "2026-03-15",
    authorSlug: "james-walker", reviewerSlug: "dr-michael-carter",
  },
  {
    slug: "financing-dental-implants",
    title: "Financing Your Implants Without Breaking the Bank",
    excerpt: "Dental loans, HSA/FSA, in-house payment plans, and insurance — realistic options in 2026.",
    tag: "Finance", read: "7 min", publishedAt: "2026-03-02",
    authorSlug: "emily-roberts", reviewerSlug: "dr-michael-carter",
  },
  {
    slug: "bone-grafting-explained",
    title: "Bone Grafting Explained: When You Really Need It",
    excerpt: "Cost, recovery time, and when grafts can be avoided.",
    tag: "Education", read: "5 min", publishedAt: "2026-02-20",
    authorSlug: "dr-michael-carter", reviewerSlug: "dr-sarah-mitchell",
  },
  {
    slug: "patient-journey-full-arch",
    title: "A Patient's Full-Arch Implant Journey",
    excerpt: "How one US patient navigated treatment planning, financing, and recovery for full-arch implants.",
    tag: "Patient Stories", read: "9 min", publishedAt: "2026-02-08",
    authorSlug: "james-walker", reviewerSlug: "dr-sarah-mitchell",
  },
  {
    slug: "dental-insurance-coverage",
    title: "Does Insurance Cover Dental Implants in 2026?",
    excerpt: "What major US dental insurance plans actually pay toward implant treatment.",
    tag: "Finance", read: "8 min", publishedAt: "2026-01-26",
    authorSlug: "emily-roberts", reviewerSlug: "dr-michael-carter",
  },
  {
    slug: "zirconia-vs-emax-crowns",
    title: "Zirconia vs E.max Crowns: Aesthetics and Price",
    excerpt: "Choose the right crown material for your case and budget.",
    tag: "Education", read: "6 min", publishedAt: "2026-01-14",
    authorSlug: "dr-sarah-mitchell", reviewerSlug: "dr-michael-carter",
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function postsByAuthor(authorSlug: string) {
  return POSTS.filter((p) => p.authorSlug === authorSlug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
