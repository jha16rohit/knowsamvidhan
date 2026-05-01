"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, use } from "react";
import { notFound } from "next/navigation";
import {
  Map, Banknote, ScrollText, Landmark, TreePine,
  Mountain, Scale, Languages, LandPlot, ShieldBan, Sprout, Building2,
  ArrowLeft, Bookmark, Share2, Tag, ChevronDown, ChevronUp,
} from "lucide-react";

const schedules = [
  {
    slug: "first-schedule",
    ordinal: "1st",
    ordinalNum: "FIRST SCHEDULE",
    title: "States and Union Territories",
    description: "Lists the States and Union Territories of the Indian Union and their territorial jurisdictions.",
    tags: ["States", "Union Territories", "Territory"],
    Icon: Map,
    tagDetails: [
      { tag: "States", detail: "India has 28 States, each with its own elected government. States have significant legislative powers under the Seventh Schedule and are represented in both Lok Sabha and Rajya Sabha. The First Schedule lists each state and its territorial extent as defined by Parliament." },
      { tag: "Union Territories", detail: "India has 8 Union Territories (UTs), administered directly by the Central Government through a Lieutenant Governor or Administrator. Some UTs like Delhi and Puducherry have their own legislatures. The First Schedule enumerates all UTs and their boundaries." },
      { tag: "Territory", detail: "The 'territory of India' under Article 1 includes: (a) territories of States, (b) Union Territories specified in the First Schedule, and (c) such other territories as may be acquired. Parliament can by law increase or diminish the area of any State or alter its boundaries." },
    ],
  },
  {
    slug: "second-schedule",
    ordinal: "2nd",
    ordinalNum: "SECOND SCHEDULE",
    title: "Salaries and Allowances",
    description: "Provisions for the salaries, allowances and emoluments of the President, Governors, Speakers, Judges and the CAG.",
    tags: ["President", "Governor", "Judges", "CAG"],
    Icon: Banknote,
    tagDetails: [
      { tag: "President", detail: "The President of India receives a salary, allowances, and privileges as specified in Part A of the Second Schedule. The President's emoluments are charged to the Consolidated Fund of India and cannot be varied to their disadvantage during their term of office." },
      { tag: "Governor", detail: "Part B of the Second Schedule deals with the Governor of each State. The Governor receives salary, allowances and privileges determined by Parliament. These are charged to the Consolidated Fund of the State and cannot be reduced during the Governor's tenure." },
      { tag: "Judges", detail: "Parts C and D cover salaries of Supreme Court and High Court Judges respectively. Judges' salaries and allowances are charged to the Consolidated Fund of India/State. After retirement, judges receive pensions as specified. Their salaries cannot be varied to their disadvantage after appointment." },
      { tag: "CAG", detail: "Part E of the Second Schedule deals with the Comptroller and Auditor-General of India (CAG). The CAG's salary, leave entitlements, pension, and other service conditions are specified here. Like Judges, CAG's salary is charged to Consolidated Fund of India." },
    ],
  },
  {
    slug: "third-schedule",
    ordinal: "3rd",
    ordinalNum: "THIRD SCHEDULE",
    title: "Forms of Oaths and Affirmations",
    description: "Standardised oaths for Ministers, Members of Parliament, Judges and the CAG.",
    tags: ["Oaths", "Constitutional Officers"],
    Icon: ScrollText,
    tagDetails: [
      { tag: "Oaths", detail: "The Third Schedule contains six types of oaths/affirmations: (I) for Union Ministers (Article 75), (II) for candidates for election to Parliament (Article 84), (III) for Members of Parliament (Article 99), (IV) for Judges of the Supreme Court (Article 124), (V) for the CAG (Article 148), and similar forms for State-level constitutional functionaries." },
      { tag: "Constitutional Officers", detail: "Constitutional officers — including the President, Vice-President, Governors, Ministers, MPs, MLAs, and Judges — must take the prescribed oath before assuming office. The oath binds them to uphold the Constitution, bear true faith and allegiance, and discharge their duties faithfully. Failure to take the oath properly can invalidate their assumption of office." },
    ],
  },
  {
    slug: "fourth-schedule",
    ordinal: "4th",
    ordinalNum: "FOURTH SCHEDULE",
    title: "Allocation of Rajya Sabha Seats",
    description: "Allocation of seats in the Council of States to each State and Union Territory.",
    tags: ["Rajya Sabha", "Federalism"],
    Icon: Landmark,
    tagDetails: [
      { tag: "Rajya Sabha", detail: "The Rajya Sabha (Council of States) is the upper house of Parliament with a maximum strength of 250 members — 238 elected from States/UTs and 12 nominated by the President. The Fourth Schedule allocates specific seats to each State and UT. Uttar Pradesh has the highest allocation (31 seats), while some UTs like Puducherry have 1 seat." },
      { tag: "Federalism", detail: "The Fourth Schedule reflects India's federal structure by giving each state a voice in the upper house proportional to its population. However, unlike the US Senate, states do not have equal representation. Members are elected by the elected members of the State Legislative Assemblies through proportional representation by means of a single transferable vote." },
    ],
  },
  {
    slug: "fifth-schedule",
    ordinal: "5th",
    ordinalNum: "FIFTH SCHEDULE",
    title: "Scheduled Areas and Tribes",
    description: "Provisions for administration and control of Scheduled Areas and Scheduled Tribes outside the North-East.",
    tags: ["Tribal Areas", "Administration"],
    Icon: TreePine,
    tagDetails: [
      { tag: "Tribal Areas", detail: "Scheduled Areas are tribal-majority regions in States outside the North-East, notified by the President under the Fifth Schedule. Currently, ten States have Scheduled Areas: Andhra Pradesh, Telangana, Chhattisgarh, Gujarat, Himachal Pradesh, Jharkhand, Madhya Pradesh, Maharashtra, Odisha, and Rajasthan. These areas enjoy special protection and governance." },
      { tag: "Administration", detail: "The Fifth Schedule establishes a Tribes Advisory Council in each State with Scheduled Areas, composed of at least 3/4 members who are ST representatives in the State Legislature. The Governor has special powers — including the power to direct that any law of Parliament or State Legislature shall not apply to a Scheduled Area or shall apply with modifications." },
    ],
  },
  {
    slug: "sixth-schedule",
    ordinal: "6th",
    ordinalNum: "SIXTH SCHEDULE",
    title: "Tribal Areas of the North-East",
    description: "Special provisions for administration of tribal areas in Assam, Meghalaya, Tripura and Mizoram via Autonomous District Councils.",
    tags: ["North-East", "Autonomy"],
    Icon: Mountain,
    tagDetails: [
      { tag: "North-East", detail: "The Sixth Schedule applies to tribal areas in four North-Eastern States: Assam, Meghalaya, Tripura, and Mizoram. These regions have distinct ethnic, cultural, and historical identities. Currently, there are 10 Autonomous District Councils under this Schedule, including Bodoland Territorial Council, Karbi Anglong, Khasi Hills, Jaintia Hills, Garo Hills, and Chakma District Council." },
      { tag: "Autonomy", detail: "Autonomous District Councils (ADCs) under the Sixth Schedule have wide legislative, executive, and judicial powers. They can make laws on land management, forest management (other than reserved forests), use of waterways, regulation of shifting cultivation, establishment of village/town administration, money-lending, and social customs. ADC laws require the Governor's assent." },
    ],
  },
  {
    slug: "seventh-schedule",
    ordinal: "7th",
    ordinalNum: "SEVENTH SCHEDULE",
    title: "Union, State and Concurrent Lists",
    description: "Distributes legislative powers between the Union and States across three lists of subjects.",
    tags: ["Federalism", "Lists", "Powers"],
    Icon: Scale,
    tagDetails: [
      { tag: "Federalism", detail: "The Seventh Schedule is the cornerstone of India's federal division of powers. It enumerates subjects under three lists. In case of conflict between Union and State laws, Union law prevails (Article 254). The residuary powers (subjects not in any list) vest with Parliament under Article 248, making India a quasi-federal state with a centralising bias." },
      { tag: "Lists", detail: "List I (Union List): 100 subjects on which only Parliament can legislate — e.g., defence, atomic energy, foreign affairs, railways, currency. List II (State List): 61 subjects on which only State Legislatures can legislate — e.g., public order, police, agriculture, local government. List III (Concurrent List): 52 subjects on which both Parliament and States can legislate — e.g., education, forests, marriage, labour, bankruptcy." },
      { tag: "Powers", detail: "Parliament can legislate on State List subjects under five circumstances: (1) when Rajya Sabha passes a resolution by 2/3 majority (Article 249), (2) during a National Emergency (Article 250), (3) when two or more States request Parliament to legislate (Article 252), (4) to implement international treaties (Article 253), and (5) when President's Rule is in force (Article 356)." },
    ],
  },
  {
    slug: "eighth-schedule",
    ordinal: "8th",
    ordinalNum: "EIGHTH SCHEDULE",
    title: "Recognised Languages",
    description: "Lists the 22 official languages recognised by the Constitution of India.",
    tags: ["Languages", "Culture"],
    Icon: Languages,
    tagDetails: [
      { tag: "Languages", detail: "The Eighth Schedule originally listed 14 languages. Today it has 22 languages: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, and Urdu. Inclusion confers official recognition and allows the language's literature to be evaluated by the Sahitya Akademi." },
      { tag: "Culture", detail: "The Eighth Schedule serves as a cultural recognition mechanism. Languages included are used in the Official Language Commission's assessment and are eligible for representation in the Kendriya Hindi Samiti. Members of Parliament may address either House in their mother tongue if it is in the Eighth Schedule. Many languages like Rajasthani, Tulu, Bhojpuri have been demanding inclusion." },
    ],
  },
  {
    slug: "ninth-schedule",
    ordinal: "9th",
    ordinalNum: "NINTH SCHEDULE",
    title: "Validation of Land Reform Laws",
    description: "Added by the 1st Amendment — laws placed here are protected from judicial review on fundamental rights grounds (subject to basic structure).",
    tags: ["Land Reform", "Judicial Review"],
    Icon: LandPlot,
    tagDetails: [
      { tag: "Land Reform", detail: "The Ninth Schedule was added by the First Constitutional Amendment (1951) to shield land reform legislation from judicial challenge under fundamental rights (especially the right to property). It originally contained 13 laws. Today, it contains 284 Acts — including land ceiling laws, zamindari abolition acts, and various socio-economic reform statutes from different States." },
      { tag: "Judicial Review", detail: "The Supreme Court in I.R. Coelho v. State of Tamil Nadu (2007) ruled that laws included after April 24, 1973 (date of Kesavananda Bharati judgment) CAN be challenged if they violate or abridge the basic structure of the Constitution. This limits Parliament's use of the Ninth Schedule as an immunity shield." },
    ],
  },
  {
    slug: "tenth-schedule",
    ordinal: "10th",
    ordinalNum: "TENTH SCHEDULE",
    title: "Anti-Defection Law",
    description: "Provisions for disqualification of legislators on grounds of defection from their political party.",
    tags: ["Anti-Defection", "Politics"],
    Icon: ShieldBan,
    tagDetails: [
      { tag: "Anti-Defection", detail: "Added by the 52nd Constitutional Amendment (1985), the Tenth Schedule disqualifies a member of Parliament or State Legislature if they: (a) voluntarily give up party membership, (b) vote or abstain contrary to the party whip, or (c) are an independent member who joins a party after election. A merger is exempt if at least 2/3 of the party's legislators support it." },
      { tag: "Politics", detail: "The Anti-Defection Law was enacted to curb the menace of 'Aaya Rams and Gaya Rams' — coined after Haryana MLA Gaya Lal who changed parties thrice in one day in 1967. The Supreme Court in Kihoto Hollohan v. Zachillhu (1993) upheld the Schedule but subjected the Speaker's decision to judicial review." },
    ],
  },
  {
    slug: "eleventh-schedule",
    ordinal: "11th",
    ordinalNum: "ELEVENTH SCHEDULE",
    title: "Powers of Panchayats",
    description: "29 subjects on which State Legislatures may devolve powers to Panchayats (added by 73rd Amendment).",
    tags: ["Panchayats", "Local Government"],
    Icon: Sprout,
    tagDetails: [
      { tag: "Panchayats", detail: "Added by the 73rd Constitutional Amendment Act (1992), the Eleventh Schedule lists 29 subjects for devolution to Panchayati Raj institutions. These include: agriculture, land improvement, minor irrigation, animal husbandry, fisheries, social forestry, minor forest produce, small-scale industries, rural housing, drinking water, roads, poverty alleviation, education, libraries, markets, health, family welfare, social welfare." },
      { tag: "Local Government", detail: "The 73rd Amendment inserted Part IX into the Constitution, mandating a three-tier Panchayati Raj system (village, intermediate, district level) in every State with a population over 20 lakh. It provides for reservation of seats for SCs, STs, and women (not less than 1/3); five-year term; State Finance Commission; State Election Commission; and Gram Sabha." },
    ],
  },
  {
    slug: "twelfth-schedule",
    ordinal: "12th",
    ordinalNum: "TWELFTH SCHEDULE",
    title: "Powers of Municipalities",
    description: "18 subjects on which Municipalities may exercise powers (added by 74th Amendment).",
    tags: ["Municipalities", "Urban Government"],
    Icon: Building2,
    tagDetails: [
      { tag: "Municipalities", detail: "Added by the 74th Constitutional Amendment Act (1992), the Twelfth Schedule lists 18 subjects that may be devolved to Urban Local Bodies (ULBs). These include: urban planning, regulation of land use, public health, solid waste management, fire services, urban forestry, slum improvement, urban poverty alleviation, provision of urban amenities, promotion of cultural and educational aspects, burial grounds, and vital statistics." },
      { tag: "Urban Government", detail: "The 74th Amendment inserted Part IX-A into the Constitution, recognising Municipalities as the third tier of government in urban areas. It mandates three types of urban bodies: Nagar Panchayat (transitional areas), Municipal Council (smaller urban areas), and Municipal Corporation (larger urban areas). Reservations for SCs, STs, and women (1/3) are required." },
    ],
  },
];

function TagAccordion({ index, tag, detail }: { index: number; tag: string; detail: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? "border-amber-300 shadow-sm shadow-amber-100" : "border-stone-200"}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${open ? "bg-amber-50" : "bg-white hover:bg-stone-50"}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-teal-600 font-bold text-sm tabular-nums w-6">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-stone-800 text-[15px]">{tag}</span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-3 bg-white border-t border-stone-100">
          <p className="text-[14px] text-stone-600 leading-relaxed">{detail}</p>
        </div>
      )}
    </div>
  );
}

export default function ScheduleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const schedule = schedules.find((s) => s.slug === slug);
  if (!schedule) notFound();

  const { Icon } = schedule;
const otherSchedules = schedules.filter((s) => s.slug !== slug).slice(0, 5);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 text-stone-900 pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/60 border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-14">
            <Link
              href="/user_schedules"
              className="inline-flex items-center gap-1.5 text-stone-500 text-sm hover:text-stone-800 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to schedules
            </Link>

            <p className="text-[11px] font-bold text-amber-600 tracking-[0.15em] uppercase mb-3">
              {schedule.ordinalNum} · {schedule.ordinal.toUpperCase()}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal-500 flex items-center justify-center shrink-0 shadow-md shadow-teal-200">
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
                {schedule.title}
              </h1>
            </div>

            <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
              {schedule.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {schedule.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 border border-amber-200 bg-amber-50 text-amber-700 text-[12px] font-medium rounded-full px-3 py-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="inline-flex items-center gap-1.5 border border-stone-200 bg-white text-stone-600 text-[13px] font-medium rounded-lg px-3.5 py-2 hover:bg-stone-50 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
                <button className="inline-flex items-center gap-1.5 border border-stone-200 bg-white text-stone-600 text-[13px] font-medium rounded-lg px-3.5 py-2 hover:bg-stone-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif mb-3">Overview</h2>
                <p className="text-stone-600 text-[15px] leading-relaxed">{schedule.description}</p>
              </div>

              <div className="border-t border-stone-100 mb-10" />

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif mb-1">Topics covered</h2>
                <p className="text-stone-400 text-sm mb-6">
                  {schedule.tagDetails.length} topic{schedule.tagDetails.length !== 1 ? "s" : ""} — click to expand
                </p>
                <div className="flex flex-col gap-3">
                  {schedule.tagDetails.map((td, i) => (
                    <TagAccordion key={td.tag} index={i} tag={td.tag} detail={td.detail} />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col gap-5">
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <p className="text-[10px] font-bold text-amber-600 tracking-widest uppercase mb-4">Schedule</p>
                <span className="text-4xl font-extrabold text-stone-900 font-serif leading-none">{schedule.ordinal}</span>
                <p className="text-stone-400 text-sm mt-1 mb-5">
                  {schedule.ordinalNum.charAt(0) + schedule.ordinalNum.slice(1).toLowerCase()}
                </p>
                <div className="border-t border-stone-100 pt-4 flex items-center justify-between text-sm">
                  <span className="text-stone-400">Topics</span>
                  <span className="font-bold text-stone-800">{schedule.tagDetails.length}</span>
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <p className="text-[10px] font-bold text-amber-600 tracking-widest uppercase mb-4">Other Schedules</p>
                <div className="flex flex-col divide-y divide-stone-100">
                  {otherSchedules.map((s) => (
                    <Link key={s.slug} href={`/user_schedules/${s.slug}`} className="py-3 group first:pt-0 last:pb-0">
                      <p className="text-[13px] font-semibold text-stone-800 group-hover:text-amber-700 transition-colors leading-snug">
                        {s.ordinalNum.charAt(0) + s.ordinalNum.slice(1).toLowerCase().replace("schedule", "Schedule")}
                      </p>
                      <p className="text-[12px] text-stone-400 mt-0.5 leading-snug">{s.title}</p>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/user_schedules"
                  className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-amber-600 text-[13px] font-semibold hover:text-amber-700 transition-colors border border-amber-200 rounded-lg py-2.5 hover:bg-amber-50"
                >
                  View all 12 schedules
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </aside>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  );
}