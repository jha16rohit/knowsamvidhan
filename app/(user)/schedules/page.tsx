// "use client";

// import FooterSection from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { useState } from "react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface Schedule {
//   ordinal: string;
//   ordinalNum: string;
//   label: string;
//   title: string;
//   description: string;
//   tags: string[];
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const schedules: Schedule[] = [
//   {
//     ordinal: "1st",
//     ordinalNum: "FIRST SCHEDULE",
//     label: "1st",
//     title: "States and Union Territories",
//     description: "Lists the States and Union Territories of the Indian Union and their territorial jurisdictions.",
//     tags: ["States", "Union Territories", "Territory"],
//   },
//   {
//     ordinal: "2nd",
//     ordinalNum: "SECOND SCHEDULE",
//     label: "2nd",
//     title: "Salaries and Allowances",
//     description: "Provisions for the salaries, allowances and emoluments of the President, Governors, Speakers, Judges and the CAG.",
//     tags: ["President", "Governor", "Judges", "CAG"],
//   },
//   {
//     ordinal: "3rd",
//     ordinalNum: "THIRD SCHEDULE",
//     label: "3rd",
//     title: "Forms of Oaths and Affirmations",
//     description: "Standardised oaths for Ministers, Members of Parliament, Judges and the CAG.",
//     tags: ["Oaths", "Constitutional Officers"],
//   },
//   {
//     ordinal: "4th",
//     ordinalNum: "FOURTH SCHEDULE",
//     label: "4th",
//     title: "Allocation of Rajya Sabha Seats",
//     description: "Allocation of seats in the Council of States to each State and Union Territory.",
//     tags: ["Rajya Sabha", "Federalism"],
//   },
//   {
//     ordinal: "5th",
//     ordinalNum: "FIFTH SCHEDULE",
//     label: "5th",
//     title: "Scheduled Areas and Tribes",
//     description: "Provisions for administration and control of Scheduled Areas and Scheduled Tribes outside the North-East.",
//     tags: ["Tribal Areas", "Administration"],
//   },
//   {
//     ordinal: "6th",
//     ordinalNum: "SIXTH SCHEDULE",
//     label: "6th",
//     title: "Tribal Areas of the North-East",
//     description: "Special provisions for administration of tribal areas in Assam, Meghalaya, Tripura and Mizoram via Autonomous District Councils.",
//     tags: ["North-East", "Autonomy"],
//   },
//   {
//     ordinal: "7th",
//     ordinalNum: "SEVENTH SCHEDULE",
//     label: "7th",
//     title: "Union, State and Concurrent Lists",
//     description: "Distributes legislative powers between the Union and States across three lists of subjects.",
//     tags: ["Federalism", "Lists", "Powers"],
//   },
//   {
//     ordinal: "8th",
//     ordinalNum: "EIGHTH SCHEDULE",
//     label: "8th",
//     title: "Recognised Languages",
//     description: "Lists the 22 official languages recognised by the Constitution of India.",
//     tags: ["Languages", "Culture"],
//   },
//   {
//     ordinal: "9th",
//     ordinalNum: "NINTH SCHEDULE",
//     label: "9th",
//     title: "Validation of Land Reform Laws",
//     description: "Added by the 1st Amendment — laws placed here are protected from judicial review on fundamental rights grounds (subject to basic structure).",
//     tags: ["Land Reform", "Judicial Review"],
//   },
//   {
//     ordinal: "10th",
//     ordinalNum: "TENTH SCHEDULE",
//     label: "10th",
//     title: "Anti-Defection Law",
//     description: "Provisions for disqualification of legislators on grounds of defection from their political party.",
//     tags: ["Anti-Defection", "Politics"],
//   },
//   {
//     ordinal: "11th",
//     ordinalNum: "ELEVENTH SCHEDULE",
//     label: "11th",
//     title: "Powers of Panchayats",
//     description: "29 subjects on which State Legislatures may devolve powers to Panchayats (added by 73rd Amendment).",
//     tags: ["Panchayats", "Local Government"],
//   },
//   {
//     ordinal: "12th",
//     ordinalNum: "TWELFTH SCHEDULE",
//     label: "12th",
//     title: "Powers of Municipalities",
//     description: "18 subjects on which Municipalities may exercise powers (added by 74th Amendment).",
//     tags: ["Municipalities", "Urban Government"],
//   },
// ];

// // ─── Schedule Card ────────────────────────────────────────────────────────────

// function ScheduleCard({ schedule }: { schedule: Schedule }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "#fff",
//         border: "1px solid #ede8df",
//         borderRadius: 16,
//         padding: "24px 22px",
//         cursor: "pointer",
//         transition: "all 0.2s ease",
//         boxShadow: hovered ? "0 8px 28px rgba(196,130,50,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
//         display: "flex",
//         flexDirection: "column" as const,
//         gap: 0,
//         position: "relative" as const,
//       }}
//     >
//       {/* Ordinal badge — top right */}
//       <div
//         style={{
//           position: "absolute" as const,
//           top: 18,
//           right: 18,
//           background: "#fdf3e3",
//           border: "1px solid #e8d4a0",
//           borderRadius: 20,
//           padding: "2px 10px",
//           fontSize: 11,
//           fontWeight: 700,
//           color: "#c48232",
//           fontFamily: "system-ui, sans-serif",
//         }}
//       >
//         {schedule.label}
//       </div>

//       {/* Icon */}
//       <div
//         style={{
//           width: 40,
//           height: 40,
//           borderRadius: 10,
//           background: "#e8f5f0",
//           border: "1px solid #b2ddd0",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: 18,
//           marginBottom: 18,
//         }}
//       >
//         📋
//       </div>

//       {/* Schedule label */}
//       <div style={{ fontSize: 10, fontWeight: 700, color: "#c48232", letterSpacing: 1.2, textTransform: "uppercase" as const, marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>
//         {schedule.ordinalNum}
//       </div>

//       {/* Title */}
//       <div style={{ fontWeight: 800, fontSize: 18, color: "#1a1208", fontFamily: "'Georgia', serif", lineHeight: 1.2, marginBottom: 10 }}>
//         {schedule.title}
//       </div>

//       {/* Description */}
//       <div style={{ fontSize: 13, color: "#7a6a50", lineHeight: 1.6, fontFamily: "system-ui, sans-serif", marginBottom: 16, flex: 1 }}>
//         {schedule.description}
//       </div>

//       {/* Tags */}
//       <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
//         {schedule.tags.map((tag) => (
//           <span
//             key={tag}
//             style={{
//               background: "#f5f3ef",
//               border: "1px solid #ede8df",
//               borderRadius: 6,
//               padding: "3px 10px",
//               fontSize: 11,
//               fontWeight: 500,
//               color: "#7a6a50",
//               fontFamily: "system-ui, sans-serif",
//             }}
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Main Page ─────────────────────────────────────────────────────────────────

// export default function SchedulesPage() {
//   return (
//     <>
//     <Navbar />
//     <div style={{ fontFamily: "system-ui, sans-serif", background: "#faf7f2", minHeight: "100vh", color: "#1a1208", paddingTop: 64 }}>

//       {/* ── Hero Header ── */}
//       <section style={{ background: "linear-gradient(135deg, #f5f3ef 60%, #ede8df 100%)", borderBottom: "1px solid #ede8df", padding: "52px 48px 48px" }}>
//         <div style={{ maxWidth: 900, margin: "0 auto" }}>
//           <div style={{ fontSize: 11, fontWeight: 700, color: "#c48232", letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 12 }}>Reference</div>
//           <h1 style={{ fontSize: 42, fontWeight: 800, color: "#1a1208", margin: "0 0 16px", lineHeight: 1.1, fontFamily: "'Georgia', serif" }}>
//             Schedules of the Constitution
//           </h1>
//           <p style={{ fontSize: 15, color: "#7a6a50", margin: 0, lineHeight: 1.65, maxWidth: 560 }}>
//             The Schedules contain detailed lists, forms and tables that supplement the Articles — from the names
//             of States to the languages of India and the anti-defection law.
//           </p>
//         </div>
//       </section>

//       {/* ── Schedules Grid ── */}
//       <main style={{ maxWidth: 900, margin: "0 auto", padding: "44px 24px 80px" }}>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
//           {schedules.map((s) => (
//             <ScheduleCard key={s.ordinal} schedule={s} />
//           ))}
//         </div>
//       </main>
//       <FooterSection />
//     </div>
//     </>
//   );
// }
"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TagDetail {
  tag: string;
  detail: string;
}

interface Schedule {
  ordinal: string;
  ordinalNum: string;
  label: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  tagDetails: TagDetail[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const schedules: Schedule[] = [
  {
    ordinal: "1st",
    ordinalNum: "FIRST SCHEDULE",
    label: "1st",
    title: "States and Union Territories",
    description: "Lists the States and Union Territories of the Indian Union and their territorial jurisdictions.",
    tags: ["States", "Union Territories", "Territory"],
    icon: "🗺️",
    tagDetails: [
      { tag: "States", detail: "India has 28 States, each with its own elected government. States have significant legislative powers under the Seventh Schedule and are represented in both Lok Sabha and Rajya Sabha. The First Schedule lists each state and its territorial extent as defined by Parliament." },
      { tag: "Union Territories", detail: "India has 8 Union Territories (UTs), administered directly by the Central Government through a Lieutenant Governor or Administrator. Some UTs like Delhi and Puducherry have their own legislatures. The First Schedule enumerates all UTs and their boundaries." },
      { tag: "Territory", detail: "The 'territory of India' under Article 1 includes: (a) territories of States, (b) Union Territories specified in the First Schedule, and (c) such other territories as may be acquired. Parliament can by law increase or diminish the area of any State or alter its boundaries." },
    ],
  },
  {
    ordinal: "2nd",
    ordinalNum: "SECOND SCHEDULE",
    label: "2nd",
    title: "Salaries and Allowances",
    description: "Provisions for the salaries, allowances and emoluments of the President, Governors, Speakers, Judges and the CAG.",
    tags: ["President", "Governor", "Judges", "CAG"],
    icon: "💰",
    tagDetails: [
      { tag: "President", detail: "The President of India receives a salary, allowances, and privileges as specified in Part A of the Second Schedule. The President's emoluments are charged to the Consolidated Fund of India and cannot be varied to their disadvantage during their term of office." },
      { tag: "Governor", detail: "Part B of the Second Schedule deals with the Governor of each State. The Governor receives salary, allowances and privileges determined by Parliament. These are charged to the Consolidated Fund of the State and cannot be reduced during the Governor's tenure." },
      { tag: "Judges", detail: "Parts C and D cover salaries of Supreme Court and High Court Judges respectively. Judges' salaries and allowances are charged to the Consolidated Fund of India/State. After retirement, judges receive pensions as specified. Their salaries cannot be varied to their disadvantage after appointment." },
      { tag: "CAG", detail: "Part E of the Second Schedule deals with the Comptroller and Auditor-General of India (CAG). The CAG's salary, leave entitlements, pension, and other service conditions are specified here. Like Judges, CAG's salary is charged to Consolidated Fund of India." },
    ],
  },
  {
    ordinal: "3rd",
    ordinalNum: "THIRD SCHEDULE",
    label: "3rd",
    title: "Forms of Oaths and Affirmations",
    description: "Standardised oaths for Ministers, Members of Parliament, Judges and the CAG.",
    tags: ["Oaths", "Constitutional Officers"],
    icon: "📜",
    tagDetails: [
      { tag: "Oaths", detail: "The Third Schedule contains six types of oaths/affirmations: (I) for Union Ministers (Article 75), (II) for candidates for election to Parliament (Article 84), (III) for Members of Parliament (Article 99), (IV) for Judges of the Supreme Court (Article 124), (V) for the CAG (Article 148), and similar forms for State-level constitutional functionaries." },
      { tag: "Constitutional Officers", detail: "Constitutional officers — including the President, Vice-President, Governors, Ministers, MPs, MLAs, and Judges — must take the prescribed oath before assuming office. The oath binds them to uphold the Constitution, bear true faith and allegiance, and discharge their duties faithfully. Failure to take the oath properly can invalidate their assumption of office." },
    ],
  },
  {
    ordinal: "4th",
    ordinalNum: "FOURTH SCHEDULE",
    label: "4th",
    title: "Allocation of Rajya Sabha Seats",
    description: "Allocation of seats in the Council of States to each State and Union Territory.",
    tags: ["Rajya Sabha", "Federalism"],
    icon: "🏛️",
    tagDetails: [
      { tag: "Rajya Sabha", detail: "The Rajya Sabha (Council of States) is the upper house of Parliament with a maximum strength of 250 members — 238 elected from States/UTs and 12 nominated by the President. The Fourth Schedule allocates specific seats to each State and UT. Uttar Pradesh has the highest allocation (31 seats), while some UTs like Puducherry have 1 seat." },
      { tag: "Federalism", detail: "The Fourth Schedule reflects India's federal structure by giving each state a voice in the upper house proportional to its population. However, unlike the US Senate, states do not have equal representation. Members are elected by the elected members of the State Legislative Assemblies through proportional representation by means of a single transferable vote." },
    ],
  },
  {
    ordinal: "5th",
    ordinalNum: "FIFTH SCHEDULE",
    label: "5th",
    title: "Scheduled Areas and Tribes",
    description: "Provisions for administration and control of Scheduled Areas and Scheduled Tribes outside the North-East.",
    tags: ["Tribal Areas", "Administration"],
    icon: "🌿",
    tagDetails: [
      { tag: "Tribal Areas", detail: "Scheduled Areas are tribal-majority regions in States outside the North-East, notified by the President under the Fifth Schedule. Currently, ten States have Scheduled Areas: Andhra Pradesh, Telangana, Chhattisgarh, Gujarat, Himachal Pradesh, Jharkhand, Madhya Pradesh, Maharashtra, Odisha, and Rajasthan. These areas enjoy special protection and governance." },
      { tag: "Administration", detail: "The Fifth Schedule establishes a Tribes Advisory Council in each State with Scheduled Areas, composed of at least 3/4 members who are ST representatives in the State Legislature. The Governor has special powers — including the power to direct that any law of Parliament or State Legislature shall not apply to a Scheduled Area or shall apply with modifications. The President can increase/decrease Scheduled Areas." },
    ],
  },
  {
    ordinal: "6th",
    ordinalNum: "SIXTH SCHEDULE",
    label: "6th",
    title: "Tribal Areas of the North-East",
    description: "Special provisions for administration of tribal areas in Assam, Meghalaya, Tripura and Mizoram via Autonomous District Councils.",
    tags: ["North-East", "Autonomy"],
    icon: "🏔️",
    tagDetails: [
      { tag: "North-East", detail: "The Sixth Schedule applies to tribal areas in four North-Eastern States: Assam, Meghalaya, Tripura, and Mizoram. These regions have distinct ethnic, cultural, and historical identities. Currently, there are 10 Autonomous District Councils under this Schedule, including Bodoland Territorial Council, Karbi Anglong, Khasi Hills, Jaintia Hills, Garo Hills, and Chakma District Council." },
      { tag: "Autonomy", detail: "Autonomous District Councils (ADCs) under the Sixth Schedule have wide legislative, executive, and judicial powers. They can make laws on land management, forest management (other than reserved forests), use of waterways, regulation of shifting cultivation, establishment of village/town administration, money-lending, and social customs. ADC laws require the Governor's assent." },
    ],
  },
  {
    ordinal: "7th",
    ordinalNum: "SEVENTH SCHEDULE",
    label: "7th",
    title: "Union, State and Concurrent Lists",
    description: "Distributes legislative powers between the Union and States across three lists of subjects.",
    tags: ["Federalism", "Lists", "Powers"],
    icon: "⚖️",
    tagDetails: [
      { tag: "Federalism", detail: "The Seventh Schedule is the cornerstone of India's federal division of powers. It enumerates subjects under three lists. In case of conflict between Union and State laws, Union law prevails (Article 254). The residuary powers (subjects not in any list) vest with Parliament under Article 248, making India a 'quasi-federal' state with a centralising bias." },
      { tag: "Lists", detail: "List I (Union List): 100 subjects on which only Parliament can legislate — e.g., defence, atomic energy, foreign affairs, railways, currency. List II (State List): 61 subjects on which only State Legislatures can legislate — e.g., public order, police, agriculture, local government. List III (Concurrent List): 52 subjects on which both Parliament and States can legislate — e.g., education, forests, marriage, labour, bankruptcy." },
      { tag: "Powers", detail: "Parliament can legislate on State List subjects under five circumstances: (1) when Rajya Sabha passes a resolution by 2/3 majority (Article 249), (2) during a National Emergency (Article 250), (3) when two or more States request Parliament to legislate (Article 252), (4) to implement international treaties (Article 253), and (5) when President's Rule is in force (Article 356)." },
    ],
  },
  {
    ordinal: "8th",
    ordinalNum: "EIGHTH SCHEDULE",
    label: "8th",
    title: "Recognised Languages",
    description: "Lists the 22 official languages recognised by the Constitution of India.",
    tags: ["Languages", "Culture"],
    icon: "🗣️",
    tagDetails: [
      { tag: "Languages", detail: "The Eighth Schedule originally listed 14 languages. Today it has 22 languages: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, and Urdu. Inclusion confers official recognition, promotes use in official work, and allows the language's literature to be evaluated by the Sahitya Akademi." },
      { tag: "Culture", detail: "The Eighth Schedule serves as a cultural recognition mechanism. Languages included are used in the Official Language Commission's assessment and are eligible for representation in the Kendriya Hindi Samiti. Members of Parliament may address either House in their mother tongue if it is in the Eighth Schedule. Many languages like Rajasthani, Tulu, Bhojpuri, and Bodo dialects have been demanding inclusion." },
    ],
  },
  {
    ordinal: "9th",
    ordinalNum: "NINTH SCHEDULE",
    label: "9th",
    title: "Validation of Land Reform Laws",
    description: "Added by the 1st Amendment — laws placed here are protected from judicial review on fundamental rights grounds (subject to basic structure).",
    tags: ["Land Reform", "Judicial Review"],
    icon: "🏞️",
    tagDetails: [
      { tag: "Land Reform", detail: "The Ninth Schedule was added by the First Constitutional Amendment (1951) to shield land reform legislation from judicial challenge under fundamental rights (especially the right to property). It originally contained 13 laws. Today, it contains 284 Acts — including land ceiling laws, zamindari abolition acts, and various socio-economic reform statutes from different States." },
      { tag: "Judicial Review", detail: "The Supreme Court in I.R. Coelho v. State of Tamil Nadu (2007) ruled that while laws in the Ninth Schedule cannot be challenged on grounds of violating Part III (Fundamental Rights) in general, laws included after April 24, 1973 (date of Kesavananda Bharati judgment) CAN be challenged if they violate or abridge the basic structure of the Constitution. This limits Parliament's use of the Ninth Schedule as an immunity shield." },
    ],
  },
  {
    ordinal: "10th",
    ordinalNum: "TENTH SCHEDULE",
    label: "10th",
    title: "Anti-Defection Law",
    description: "Provisions for disqualification of legislators on grounds of defection from their political party.",
    tags: ["Anti-Defection", "Politics"],
    icon: "🔒",
    tagDetails: [
      { tag: "Anti-Defection", detail: "Added by the 52nd Constitutional Amendment (1985), the Tenth Schedule disqualifies a member of Parliament or State Legislature if they: (a) voluntarily give up party membership, (b) vote or abstain contrary to the party whip, or (c) are an independent member who joins a party after election. A merger is exempt if at least 2/3 of the party's legislators support it. The Speaker/Chairman is the deciding authority." },
      { tag: "Politics", detail: "The Anti-Defection Law was enacted to curb the menace of 'Aaya Rams and Gaya Rams' — a phrase coined after Haryana MLA Gaya Lal who changed parties thrice in one day in 1967. The law aimed to bring political stability. However, it has been criticised for suppressing legislators' conscience votes and strengthening party leadership's stranglehold. The Supreme Court in Kihoto Hollohan v. Zachillhu (1993) upheld the Schedule but subjected the Speaker's decision to judicial review." },
    ],
  },
  {
    ordinal: "11th",
    ordinalNum: "ELEVENTH SCHEDULE",
    label: "11th",
    title: "Powers of Panchayats",
    description: "29 subjects on which State Legislatures may devolve powers to Panchayats (added by 73rd Amendment).",
    tags: ["Panchayats", "Local Government"],
    icon: "🌾",
    tagDetails: [
      { tag: "Panchayats", detail: "Added by the 73rd Constitutional Amendment Act (1992), the Eleventh Schedule lists 29 subjects for devolution to Panchayati Raj institutions. These include: agriculture, land improvement, minor irrigation, animal husbandry, fisheries, social forestry, minor forest produce, small-scale industries, rural housing, drinking water, roads, poverty alleviation, education, libraries, markets, health, family welfare, social welfare, and maintenance of community assets." },
      { tag: "Local Government", detail: "The 73rd Amendment inserted Part IX into the Constitution, mandating a three-tier Panchayati Raj system (village, intermediate, district level) in every State with a population over 20 lakh. It provides for: reservation of seats for SCs, STs, and women (not less than 1/3); five-year term; State Finance Commission; State Election Commission; and Gram Sabha. However, actual devolution of the 29 subjects remains discretionary for States." },
    ],
  },
  {
    ordinal: "12th",
    ordinalNum: "TWELFTH SCHEDULE",
    label: "12th",
    title: "Powers of Municipalities",
    description: "18 subjects on which Municipalities may exercise powers (added by 74th Amendment).",
    tags: ["Municipalities", "Urban Government"],
    icon: "🏙️",
    tagDetails: [
      { tag: "Municipalities", detail: "Added by the 74th Constitutional Amendment Act (1992), the Twelfth Schedule lists 18 subjects that may be devolved to Urban Local Bodies (ULBs). These include: urban planning, regulation of land use, public health, solid waste management, fire services, urban forestry, slum improvement, urban poverty alleviation, provision of urban amenities, promotion of cultural and educational aspects, burial grounds, and vital statistics including registration of births and deaths." },
      { tag: "Urban Government", detail: "The 74th Amendment inserted Part IX-A into the Constitution, recognising Municipalities as the third tier of government in urban areas. It mandates three types of urban bodies: Nagar Panchayat (transitional areas), Municipal Council (smaller urban areas), and Municipal Corporation (larger urban areas). Reservations for SCs, STs, and women (1/3) are required. However, as with Panchayats, actual devolution of the 18 subjects depends on State legislation." },
    ],
  },
];

// ─── Tag Detail Modal ─────────────────────────────────────────────────────────

function TagDetailModal({ tag, detail, onClose }: { tag: string; detail: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26,18,8,0.55)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "36px 32px",
          maxWidth: 520,
          width: "100%",
          boxShadow: "0 24px 80px rgba(26,18,8,0.22)",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "#f5f3ef",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            cursor: "pointer",
            fontSize: 18,
            color: "#7a6a50",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Tag badge */}
        <div
          style={{
            display: "inline-block",
            background: "#fdf3e3",
            border: "1px solid #e8d4a0",
            borderRadius: 20,
            padding: "4px 14px",
            fontSize: 12,
            fontWeight: 700,
            color: "#c48232",
            marginBottom: 16,
            letterSpacing: 0.5,
          }}
        >
          {tag}
        </div>

        <p
          style={{
            fontSize: 14,
            color: "#3d2e1a",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {detail}
        </p>
      </div>
    </div>
  );
}

// ─── Schedule Card ────────────────────────────────────────────────────────────

function ScheduleCard({ schedule }: { schedule: Schedule }) {
  const [hovered, setHovered] = useState(false);
  const [activeTag, setActiveTag] = useState<TagDetail | null>(null);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff",
          border: "1px solid #ede8df",
          borderRadius: 16,
          padding: "24px 22px",
          transition: "all 0.2s ease",
          boxShadow: hovered
            ? "0 8px 28px rgba(196,130,50,0.10)"
            : "0 1px 4px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column" as const,
          gap: 0,
          position: "relative" as const,
        }}
      >
        {/* Ordinal badge — top right */}
        <div
          style={{
            position: "absolute" as const,
            top: 18,
            right: 18,
            background: "#fdf3e3",
            border: "1px solid #e8d4a0",
            borderRadius: 20,
            padding: "2px 10px",
            fontSize: 11,
            fontWeight: 700,
            color: "#c48232",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {schedule.label}
        </div>

        {/* Icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "#e8f5f0",
            border: "1px solid #b2ddd0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            marginBottom: 18,
          }}
        >
          {schedule.icon}
        </div>

        {/* Schedule label */}
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#c48232",
            letterSpacing: 1.2,
            textTransform: "uppercase" as const,
            marginBottom: 6,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {schedule.ordinalNum}
        </div>

        {/* Title */}
        <div
          style={{
            fontWeight: 800,
            fontSize: 17,
            color: "#1a1208",
            fontFamily: "'Georgia', serif",
            lineHeight: 1.25,
            marginBottom: 10,
          }}
        >
          {schedule.title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 13,
            color: "#7a6a50",
            lineHeight: 1.65,
            fontFamily: "system-ui, sans-serif",
            marginBottom: 18,
            flex: 1,
          }}
        >
          {schedule.description}
        </div>

        {/* Clickable Tags */}
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
          {schedule.tags.map((tag) => {
            const tagDetail = schedule.tagDetails.find((td) => td.tag === tag);
            return (
              <button
                key={tag}
                onClick={() => tagDetail && setActiveTag(tagDetail)}
                title={tagDetail ? `Click to learn about ${tag}` : tag}
                style={{
                  background: tagDetail ? "#fdf3e3" : "#f5f3ef",
                  border: `1px solid ${tagDetail ? "#e8c87a" : "#ede8df"}`,
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: tagDetail ? "#b07020" : "#7a6a50",
                  fontFamily: "system-ui, sans-serif",
                  cursor: tagDetail ? "pointer" : "default",
                  transition: "all 0.15s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
                onMouseEnter={(e) => {
                  if (tagDetail) {
                    (e.currentTarget as HTMLButtonElement).style.background = "#f8e9c8";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#c48232";
                  }
                }}
                onMouseLeave={(e) => {
                  if (tagDetail) {
                    (e.currentTarget as HTMLButtonElement).style.background = "#fdf3e3";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8c87a";
                  }
                }}
              >
                {tagDetail && (
                  <span style={{ fontSize: 9, opacity: 0.7 }}>ℹ</span>
                )}
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {activeTag && (
        <TagDetailModal
          tag={activeTag.tag}
          detail={activeTag.detail}
          onClose={() => setActiveTag(null)}
        />
      )}
    </>
  );
}

// ─── Responsive styles injected via <style> ───────────────────────────────────

const responsiveCSS = `
  .schedules-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  /* Laptop / MacBook ≤ 1280px */
  @media (max-width: 1280px) {
    .schedules-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .hero-section {
      padding: 44px 32px 40px !important;
    }
    .hero-h1 {
      font-size: 36px !important;
    }
  }
  /* iPad / tablet ≤ 900px */
  @media (max-width: 900px) {
    .schedules-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .hero-section {
      padding: 36px 24px 32px !important;
    }
    .hero-h1 {
      font-size: 30px !important;
    }
    .main-wrapper {
      padding: 32px 16px 64px !important;
    }
  }
  /* iPad Mini ≤ 768px */
  @media (max-width: 768px) {
    .schedules-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }
    .hero-section {
      padding: 30px 20px 28px !important;
    }
    .hero-h1 {
      font-size: 26px !important;
    }
  }
  /* Mobile ≤ 540px */
  @media (max-width: 540px) {
    .schedules-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }
    .hero-section {
      padding: 28px 16px 24px !important;
    }
    .hero-h1 {
      font-size: 24px !important;
    }
    .hero-desc {
      font-size: 13px !important;
    }
    .main-wrapper {
      padding: 24px 12px 48px !important;
    }
  }
`;

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SchedulesPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: responsiveCSS }} />
      <Navbar />
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#faf7f2",
          minHeight: "100vh",
          color: "#1a1208",
          paddingTop: 64,
        }}
      >
        {/* ── Hero Header ── */}
        <section
          className="hero-section"
          style={{
            background: "linear-gradient(135deg, #f5f3ef 60%, #ede8df 100%)",
            borderBottom: "1px solid #ede8df",
            padding: "52px 48px 48px",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#c48232",
                letterSpacing: 1.5,
                textTransform: "uppercase" as const,
                marginBottom: 12,
              }}
            >
              Reference
            </div>
            <h1
              className="hero-h1"
              style={{
                fontSize: 42,
                fontWeight: 800,
                color: "#1a1208",
                margin: "0 0 16px",
                lineHeight: 1.1,
                fontFamily: "'Georgia', serif",
              }}
            >
              Schedules of the Constitution
            </h1>
            <p
              className="hero-desc"
              style={{
                fontSize: 15,
                color: "#7a6a50",
                margin: 0,
                lineHeight: 1.65,
                maxWidth: 560,
              }}
            >
              The Schedules contain detailed lists, forms and tables that supplement the Articles — from the names
              of States to the languages of India and the anti-defection law.{" "}
              <span style={{ color: "#c48232", fontWeight: 600 }}>Click any tag</span> on a card to learn more.
            </p>
          </div>
        </section>

        {/* ── Schedules Grid ── */}
        <main
          className="main-wrapper"
          style={{ maxWidth: 900, margin: "0 auto", padding: "44px 24px 80px" }}
        >
          <div className="schedules-grid">
            {schedules.map((s) => (
              <ScheduleCard key={s.ordinal} schedule={s} />
            ))}
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  );
}