"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface KeyArticle {
  num: string;
  title: string;
  text: string;
}

export interface Part {
  slug: string;
  number: string;
  romanNumeral: string;
  title: string;
  articles: string;
  articlesRange: string;
  description: string;
  articleCount: number;
  overview: string;
  keyArticles: KeyArticle[];
  insight: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

export const parts: Part[] = [
  {
    slug: "part-i",
    number: "PART I",
    romanNumeral: "I",
    title: "The Union and its Territory",
    articles: "Articles 1–4",
    articlesRange: "Articles 1 – 4",
    description:
      "Defines India as a Union of States and provides for admission, formation and alteration of States.",
    articleCount: 4,
    overview:
      "Part I lays the geographical and political foundation of the Indian Republic. It establishes the name 'India, that is Bharat' and declares it a Union of States — a deliberate choice to underscore the indestructible nature of the federation.",
    keyArticles: [
      {
        num: "Article 1",
        title: "Name and Territory of the Union",
        text: "Declares India as a Union of States and lists three categories of territory: states, Union territories, and territories acquired in future.",
      },
      {
        num: "Article 2",
        title: "Admission of New States",
        text: "Empowers Parliament to admit or establish new states on terms it thinks fit — used when Sikkim joined in 1975.",
      },
      {
        num: "Article 3",
        title: "Formation of New States",
        text: "Parliament may form new states by separating, uniting, or altering boundaries — exercised dozens of times, most recently for Telangana in 2014.",
      },
      {
        num: "Article 4",
        title: "Supplementary Provisions",
        text: "Laws under Articles 2 and 3 amend the First and Fourth Schedules but are not treated as constitutional amendments under Article 368.",
      },
    ],
    insight:
      "Unlike a federation, India is described as a 'Union' — meaning states cannot secede. The Constituent Assembly rejected the word 'federal' intentionally to keep the Union paramount.",
  },
  {
    slug: "part-ii",
    number: "PART II",
    romanNumeral: "II",
    title: "Citizenship",
    articles: "Articles 5–11",
    articlesRange: "Articles 5 – 11",
    description:
      "Lays down who is a citizen of India at commencement and Parliament's power to regulate citizenship.",
    articleCount: 7,
    overview:
      "Part II settled the complex question of citizenship at the Constitution's commencement in 1950, particularly for people who migrated between India and Pakistan during Partition. It grants Parliament plenary power to legislate on citizenship thereafter.",
    keyArticles: [
      {
        num: "Article 5",
        title: "Citizenship at Commencement",
        text: "A person domiciled in India who was born there, or whose parents were born there, or who had resided there for 5 years, became a citizen on 26 January 1950.",
      },
      {
        num: "Article 6",
        title: "Rights of Migrants from Pakistan",
        text: "Persons who migrated from Pakistan before 19 July 1948 became citizens; those who came later needed registration.",
      },
      {
        num: "Article 9",
        title: "No Dual Citizenship",
        text: "A person who voluntarily acquires citizenship of a foreign state ceases to be an Indian citizen.",
      },
      {
        num: "Article 11",
        title: "Parliament's Power",
        text: "Parliament can make any provision with respect to acquisition and termination of citizenship — the Citizenship Act, 1955 is enacted under this.",
      },
    ],
    insight:
      "India follows the principle of single citizenship. Unlike the US, there is no concept of 'state citizenship.' The Citizenship (Amendment) Act, 2019 became controversial as the first law to link religion to citizenship.",
  },
  {
    slug: "part-iii",
    number: "PART III",
    romanNumeral: "III",
    title: "Fundamental Rights",
    articles: "Articles 12–35",
    articlesRange: "Articles 12 – 35",
    description:
      "The cornerstone of individual liberty — equality, freedom, life, religion and constitutional remedies.",
    articleCount: 24,
    overview:
      "Often called the 'Magna Carta of India', Part III is the heart of the Constitution. It guarantees six categories of fundamental rights against state action, and makes them enforceable directly in the Supreme Court and High Courts.",
    keyArticles: [
      {
        num: "Article 14",
        title: "Right to Equality",
        text: "Guarantees equality before law and equal protection of laws — the twin pillars against arbitrary State action.",
      },
      {
        num: "Article 19",
        title: "Six Freedoms",
        text: "Guarantees speech, assembly, association, movement, residence, and profession — subject to reasonable restrictions by the State.",
      },
      {
        num: "Article 21",
        title: "Right to Life",
        text: "No person shall be deprived of life or personal liberty except by procedure established by law — the most expansive right, covering privacy, health, education, livelihood and more.",
      },
      {
        num: "Article 32",
        title: "Constitutional Remedies",
        text: "The 'heart and soul' of the Constitution (Dr. Ambedkar's words) — allows direct petition to the Supreme Court for enforcement of Fundamental Rights via writs.",
      },
    ],
    insight:
      "Article 21 has been the subject of over 1,000 Supreme Court judgments. The right to privacy (2017, Puttaswamy case) and the right to a dignified death (2018) were both read into it.",
  },
  {
    slug: "part-iv",
    number: "PART IV",
    romanNumeral: "IV",
    title: "Directive Principles of State Policy",
    articles: "Articles 36–51",
    articlesRange: "Articles 36 – 51",
    description:
      "Non-justiciable guidelines for the State to build a just social and economic order.",
    articleCount: 16,
    overview:
      "Inspired by the Irish Constitution, the Directive Principles are socio-economic goals the State must strive to achieve. While not enforceable in courts, they have been used to uphold laws that restrict Fundamental Rights.",
    keyArticles: [
      {
        num: "Article 39",
        title: "Certain Policy Principles",
        text: "Includes equal pay for equal work, prevention of concentration of wealth, and distribution of ownership — basis for land reform and nationalisation laws.",
      },
      {
        num: "Article 44",
        title: "Uniform Civil Code",
        text: "The State shall endeavour to secure a Uniform Civil Code for citizens — among the most debated and unimplemented directives.",
      },
      {
        num: "Article 45",
        title: "Early Childhood Care",
        text: "Originally about free and compulsory education; amended in 2002 to focus on children below 6 years, with education becoming a Fundamental Right under Article 21A.",
      },
      {
        num: "Article 48A",
        title: "Environment Protection",
        text: "Added by the 42nd Amendment, 1976 — State shall protect environment and safeguard forests and wildlife. Foundation of environmental law in India.",
      },
    ],
    insight:
      "The Supreme Court in Minerva Mills (1980) held that Fundamental Rights and DPSPs are complementary — neither can be sacrificed for the other. Laws made to implement DPSPs are shielded from certain Fundamental Rights challenges under Article 31C.",
  },
  {
    slug: "part-iv-a",
    number: "PART IV-A",
    romanNumeral: "IV-A",
    title: "Fundamental Duties",
    articles: "Article 51A",
    articlesRange: "Article 51A",
    description:
      "Eleven moral obligations of every Indian citizen, added by the 42nd Amendment.",
    articleCount: 1,
    overview:
      "Added by the 42nd Constitutional Amendment in 1976 on the recommendation of the Swaran Singh Committee, Part IV-A lists duties of citizens. The 86th Amendment in 2002 added an 11th duty — to provide opportunities for education to children aged 6–14.",
    keyArticles: [
      {
        num: "Article 51A(a)",
        title: "Abide by the Constitution",
        text: "Every citizen must abide by the Constitution and respect the national flag and national anthem.",
      },
      {
        num: "Article 51A(g)",
        title: "Protect the Environment",
        text: "To protect and improve the natural environment including forests, lakes, rivers and wildlife — cited in many PIL judgments.",
      },
      {
        num: "Article 51A(h)",
        title: "Scientific Temper",
        text: "To develop scientific temper, humanism and the spirit of inquiry and reform — a unique duty found in few constitutions globally.",
      },
      {
        num: "Article 51A(k)",
        title: "Education for Children",
        text: "Added in 2002 — every parent must provide educational opportunities to their child between 6 and 14 years of age.",
      },
    ],
    insight:
      "Fundamental Duties are not enforceable in courts, but courts have used them as interpretive tools. In Vishaka v. State of Rajasthan (1997), the Court referenced 51A to read gender equality obligations into the law.",
  },
  {
    slug: "part-v",
    number: "PART V",
    romanNumeral: "V",
    title: "The Union",
    articles: "Articles 52–151",
    articlesRange: "Articles 52 – 151",
    description:
      "Structure of the Union government — President, Parliament, Supreme Court and the CAG.",
    articleCount: 100,
    overview:
      "Part V is the most extensive part of the Constitution. It establishes the entire framework of the Union Government — the executive (President, Vice-President, Council of Ministers, Attorney General), the legislature (Rajya Sabha and Lok Sabha), and the judiciary (Supreme Court), along with the Comptroller and Auditor General.",
    keyArticles: [
      {
        num: "Article 53",
        title: "Executive Power of the Union",
        text: "Vested in the President, exercised either directly or through officers subordinate — in practice, always on the advice of the Council of Ministers.",
      },
      {
        num: "Article 74",
        title: "Council of Ministers",
        text: "There shall be a Council of Ministers headed by the Prime Minister to aid and advise the President, who shall act in accordance with such advice.",
      },
      {
        num: "Article 110",
        title: "Definition of Money Bills",
        text: "A bill that deals only with taxation, borrowing, appropriation of funds — can only be introduced in Lok Sabha; Rajya Sabha has limited powers over it.",
      },
      {
        num: "Article 124",
        title: "Establishment of Supreme Court",
        text: "Provides for the Supreme Court, Chief Justice of India, and the appointment and removal of judges — cornerstone of judicial independence.",
      },
    ],
    insight:
      "Article 74's 'shall act in accordance with such advice' was inserted by the 42nd Amendment (1976). The 44th Amendment (1978) added that the President may send the advice back for reconsideration once — but must accept it thereafter.",
  },
  {
    slug: "part-vi",
    number: "PART VI",
    romanNumeral: "VI",
    title: "The States",
    articles: "Articles 152–237",
    articlesRange: "Articles 152 – 237",
    description:
      "Governance of States — Governor, State Legislature and High Courts.",
    articleCount: 86,
    overview:
      "Part VI mirrors the Union structure at the state level. It establishes the office of the Governor, the State Council of Ministers led by the Chief Minister, the State Legislature (Vidhan Sabha and Vidhan Parishad where applicable), and the High Courts.",
    keyArticles: [
      {
        num: "Article 154",
        title: "Executive Power of the State",
        text: "Vested in the Governor, exercised either directly or through officers — parallel to Article 53 for the Union.",
      },
      {
        num: "Article 163",
        title: "Council of Ministers for States",
        text: "There shall be a Council of Ministers headed by the Chief Minister to aid the Governor — who must act on their advice except where the Constitution requires discretion.",
      },
      {
        num: "Article 200",
        title: "Assent to Bills",
        text: "The Governor may give assent, withhold assent, or reserve a bill for Presidential consideration — a frequent source of Centre-State tension.",
      },
      {
        num: "Article 226",
        title: "Writ Jurisdiction of High Courts",
        text: "High Courts can issue writs to enforce fundamental rights and for other purposes — broader jurisdiction than the Supreme Court under Article 32.",
      },
    ],
    insight:
      "The Governor's discretionary powers under Article 163 have been extensively litigated. The Supreme Court in Shamsher Singh (1974) held that the Governor must act on ministerial advice in virtually all matters, limiting gubernatorial discretion.",
  },
];

// ─── Part Card ─────────────────────────────────────────────────────────────────

interface PartCardProps {
  part: Part;
  onClick: () => void;
}

function PartCard({ part, onClick }: PartCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-[#c9b99a] rounded-2xl p-6 sm:p-7 cursor-pointer flex flex-col gap-0 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(196,130,50,0.18)] hover:border-[#c48232] shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
    >
      {/* Article count badge */}
      <span className="absolute top-5 right-5 bg-[#fdf3e3] border border-[#e0c99a] rounded-full px-3 py-1 text-[12px] font-semibold text-[#c48232]">
        {part.articleCount} articles
      </span>

      {/* Icon block — roman numeral */}
      <div className="w-12 h-12 rounded-[12px] bg-[#c48232] flex items-center justify-center mb-5 shrink-0">
        <span className="text-white font-extrabold text-base font-serif tracking-wide">
          {part.romanNumeral}
        </span>
      </div>

      {/* Part number */}
      <p className="text-[11px] font-bold text-[#c48232] tracking-widest uppercase mb-1.5">
        {part.number}
      </p>

      {/* Title */}
      <h2 className="font-extrabold text-xl text-[#1a1208] leading-tight mb-2 font-serif pr-20">
        {part.title}
      </h2>

      {/* Articles range */}
      <p className="text-sm text-[#9e8c73] font-medium mb-3">{part.articles}</p>

      {/* Description */}
      <p className="text-sm text-[#7a6a50] leading-relaxed flex-1 mb-6">
        {part.description}
      </p>

      {/* Explore link */}
      <div className="flex items-center gap-1 text-sm font-semibold text-[#c48232] mt-auto group-hover:gap-2 transition-all duration-200">
        Explore Part
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function PartsPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="font-sans bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">

        {/* ── Hero Header ── */}
        <section className="bg-gradient-to-br from-[#f5f3ef] via-[#f0ece4] to-[#ede8df] border-b border-[#d6c7a8] px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-16">
          <div className="max-w-[92rem] mx-auto">
            <p className="text-[11px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-3">
              Chapters
            </p>
            <h1 className="font-extrabold text-[#1a1208] font-serif leading-tight mb-4 text-3xl sm:text-4xl md:text-5xl">
              Browse the Constitution by Part
            </h1>
            <p className="text-sm sm:text-base text-[#7a6a50] leading-relaxed max-w-lg">
              The Constitution is organised into Parts. Each Part groups related Articles into a
              single chapter — click any card to explore its details.
            </p>
          </div>
        </section>

        {/* ── Parts Grid ── */}
        <main className="max-w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-12 md:py-14">
          <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {parts.map((part) => (
              <PartCard
                key={part.number}
                part={part}
                onClick={() => router.push(`/user_parts/${part.slug}`)}
              />
            ))}
          </div>
        </main>
      </div>

      <FooterSection />
    </>
  );
}