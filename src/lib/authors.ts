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
    slug: "spark-vs-invisalign-cost-comfort-treatment-time",
    title: "Spark vs Invisalign: Cost, Comfort & Treatment Time",
    excerpt:
      "Compare Spark and Invisalign clear aligners on materials, comfort, treatment time and how to budget alongside a dental implant cost calculator.",
    tag: "Education",
    read: "6 min",
    publishedAt: "2026-05-10",
    authorSlug: "dr-sarah-mitchell",
    reviewerSlug: "dr-michael-carter",
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
