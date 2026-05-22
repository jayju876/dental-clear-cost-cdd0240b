import michaelImg from "@/assets/author-michael-carter.jpg";
import sarahImg from "@/assets/author-sarah-mitchell.jpg";
import emilyImg from "@/assets/author-emily-roberts.jpg";
import jamesImg from "@/assets/author-james-walker.jpg";

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  longBio: string;
  image: string;
  credentials: string[];
  expertise: string[];
  stats: { label: string; value: string }[];
  social: { twitter?: string; linkedin?: string; website?: string };
};

export const AUTHORS: Author[] = [
  {
    slug: "dr-michael-carter",
    name: "Dr. Michael Carter",
    role: "Dental Implant Specialist",
    bio: "Dr. Michael Carter specializes in full mouth rehabilitation, All-on-4 dental implants, and advanced implant restorations with over 12 years of experience.",
    longBio:
      "Dr. Michael Carter, DDS, is a board-eligible implantologist focused on full mouth rehabilitation and All-on-4 treatment planning. Over 12 years of clinical practice across multiple US metro areas, he has placed and restored more than 4,800 implants and lectures regularly on guided surgery and immediate-load protocols.",
    image: michaelImg,
    credentials: ["DDS — University of Pennsylvania", "Fellow, International Congress of Oral Implantologists (ICOI)", "Member, American Academy of Implant Dentistry"],
    expertise: ["All-on-4 & All-on-6", "Full mouth rehabilitation", "Guided implant surgery", "Bone grafting"],
    stats: [
      { label: "Years in practice", value: "12+" },
      { label: "Implants placed", value: "4,800+" },
      { label: "Articles published", value: "38" },
    ],
    social: { linkedin: "#", twitter: "#" },
  },
  {
    slug: "dr-sarah-mitchell",
    name: "Dr. Sarah Mitchell",
    role: "Prosthodontist & Cosmetic Implant Expert",
    bio: "Dr. Sarah Mitchell focuses on cosmetic implant dentistry, zirconia restorations, and smile rehabilitation procedures.",
    longBio:
      "Dr. Sarah Mitchell, DMD, MS, is a board-certified prosthodontist specializing in aesthetic implant restorations. Her clinical work centers on monolithic zirconia crowns, digital smile design and complex anterior cases.",
    image: sarahImg,
    credentials: ["DMD — Harvard School of Dental Medicine", "MS in Prosthodontics — University of Washington", "Diplomate, American Board of Prosthodontics"],
    expertise: ["Cosmetic implant dentistry", "Zirconia restorations", "Digital smile design", "Anterior aesthetic cases"],
    stats: [
      { label: "Years in practice", value: "10+" },
      { label: "Smile makeovers", value: "1,200+" },
      { label: "Articles published", value: "26" },
    ],
    social: { linkedin: "#", twitter: "#" },
  },
  {
    slug: "emily-roberts",
    name: "Emily Roberts",
    role: "Dental Finance & Insurance Advisor",
    bio: "Emily Roberts writes about dental implant financing, insurance coverage, and affordable payment planning for patients in the USA.",
    longBio:
      "Emily Roberts is a healthcare finance advisor who has helped thousands of US patients navigate dental insurance, CareCredit, HSA/FSA accounts and in-house payment plans for major implant treatment.",
    image: emilyImg,
    credentials: ["BA in Economics — Cornell University", "Accredited Financial Counselor (AFC)", "Former senior advisor, healthcare lending"],
    expertise: ["Dental implant financing", "Insurance coverage analysis", "HSA / FSA planning", "Treatment cost negotiation"],
    stats: [
      { label: "Years advising", value: "9+" },
      { label: "Patients helped", value: "6,000+" },
      { label: "Articles published", value: "44" },
    ],
    social: { linkedin: "#", twitter: "#" },
  },
  {
    slug: "james-walker",
    name: "James Walker",
    role: "Healthcare Content Researcher",
    bio: "James Walker researches dental technologies, implant procedures, recovery timelines, and treatment comparisons.",
    longBio:
      "James Walker is a healthcare content researcher with a background in biomedical sciences. He synthesizes peer-reviewed dental literature into accessible patient guides covering implant procedures, recovery and emerging technologies.",
    image: jamesImg,
    credentials: ["MSc Biomedical Sciences — Johns Hopkins University", "AHCJ member (Association of Health Care Journalists)", "8+ years medical content research"],
    expertise: ["Procedure research", "Recovery timelines", "Implant technology comparisons", "Evidence synthesis"],
    stats: [
      { label: "Years researching", value: "8+" },
      { label: "Studies reviewed", value: "1,500+" },
      { label: "Articles published", value: "52" },
    ],
    social: { linkedin: "#", twitter: "#" },
  },
];

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

export function getAuthorByName(name: string): Author {
  return AUTHORS.find((a) => a.name === name) ?? AUTHORS[0];
}
