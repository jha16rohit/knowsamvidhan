// "use client";

// import FooterSection from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { useState } from "react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface QuizLevel {
//   tag: string;
//   tagColor: string;
//   tagBg: string;
//   title: string;
//   description: string;
//   questions: number;
//   minutes: string;
// }

// interface Feature {
//   icon: string;
//   title: string;
//   description: string;
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const quizLevels: QuizLevel[] = [
//   {
//     tag: "Basic",
//     tagColor: "#166534",
//     tagBg: "#dcfce7",
//     title: "Basic level",
//     description: "Foundations: Preamble, structure and key articles every citizen should know.",
//     questions: 10,
//     minutes: "~8 min",
//   },
//   {
//     tag: "Moderate",
//     tagColor: "#92400e",
//     tagBg: "#fef3c7",
//     title: "Moderate level",
//     description: "Fundamental Rights, Directive Principles and core amendments in depth.",
//     questions: 15,
//     minutes: "~15 min",
//   },
//   {
//     tag: "Advanced",
//     tagColor: "#1e3a5f",
//     tagBg: "#dbeafe",
//     title: "Advanced level",
//     description: "Landmark cases, constitutional interpretation and complex inter-article links.",
//     questions: 20,
//     minutes: "~25 min",
//   },
// ];

// const features: Feature[] = [
//   {
//     icon: "🔄",
//     title: "Adaptive",
//     description: "Questions adjust to your weak topics.",
//   },
//   {
//     icon: "⏱",
//     title: "Timed practice",
//     description: "Mock real exam pacing if you wish.",
//   },
//   {
//     icon: "📄",
//     title: "Explained answers",
//     description: "Every answer cites the article.",
//   },
// ];

// // ─── Quiz Card ────────────────────────────────────────────────────────────────

// function QuizCard({ level, index }: { level: QuizLevel; index: number }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "#fff",
//         border: hovered ? "1.5px solid #c48232" : "1px solid #ede8df",
//         borderRadius: 16,
//         padding: "28px 24px",
//         transition: "all 0.2s ease",
//         boxShadow: hovered ? "0 8px 28px rgba(196,130,50,0.12)" : "0 1px 4px rgba(0,0,0,0.05)",
//         display: "flex",
//         flexDirection: "column" as const,
//         gap: 12,
//       }}
//     >
//       {/* Tag */}
//       <span
//         style={{
//           display: "inline-block",
//           alignSelf: "flex-start",
//           background: level.tagBg,
//           color: level.tagColor,
//           borderRadius: 20,
//           padding: "3px 12px",
//           fontSize: 12,
//           fontWeight: 700,
//           fontFamily: "system-ui, sans-serif",
//           border: `1px solid ${level.tagColor}22`,
//         }}
//       >
//         {level.tag}
//       </span>

//       {/* Title */}
//       <div style={{ fontWeight: 800, fontSize: 22, color: "#1a1208", fontFamily: "'Georgia', serif", lineHeight: 1.1 }}>
//         {level.title}
//       </div>

//       {/* Description */}
//       <div style={{ fontSize: 13, color: "#7a6a50", lineHeight: 1.6, fontFamily: "system-ui, sans-serif", flex: 1 }}>
//         {level.description}
//       </div>

//       {/* Meta: questions + time */}
//       <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#9e8c73", fontFamily: "system-ui, sans-serif" }}>
//           <span>📋</span>
//           <span>{level.questions} questions</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#9e8c73", fontFamily: "system-ui, sans-serif" }}>
//           <span>⏱</span>
//           <span>{level.minutes}</span>
//         </div>
//       </div>

//       {/* CTA */}
//       <button
//         style={{
//           background: "#c48232",
//           color: "#fff",
//           border: "none",
//           borderRadius: 10,
//           padding: "12px 20px",
//           fontSize: 14,
//           fontWeight: 700,
//           cursor: "pointer",
//           fontFamily: "system-ui, sans-serif",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 6,
//           transition: "background 0.15s",
//           marginTop: 4,
//         }}
//         onMouseEnter={(e) => (e.currentTarget.style.background = "#a86a28")}
//         onMouseLeave={(e) => (e.currentTarget.style.background = "#c48232")}
//       >
//         Start quiz →
//       </button>
//     </div>
//   );
// }

// // ─── Main Page ─────────────────────────────────────────────────────────────────

// export default function QuizPage() {
//   return (
//     <>
//     < Navbar />
//     <div style={{ fontFamily: "system-ui, sans-serif", background: "#faf7f2", minHeight: "100vh", color: "#1a1208", paddingTop: 64 }}>

//       {/* ── Hero Header ── */}
//       <section style={{ background: "linear-gradient(135deg, #f5f3ef 60%, #ede8df 100%)", borderBottom: "1px solid #ede8df", padding: "52px 48px 48px" }}>
//         <div style={{ maxWidth: 860, margin: "0 auto" }}>
//           <div style={{ fontSize: 11, fontWeight: 700, color: "#c48232", letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 12 }}>Practice</div>
//           <h1 style={{ fontSize: 38, fontWeight: 800, color: "#1a1208", margin: "0 0 12px", lineHeight: 1.15, fontFamily: "'Georgia', serif" }}>
//             Quiz yourself. Master the Constitution.
//           </h1>
//           <p style={{ fontSize: 15, color: "#7a6a50", margin: 0, lineHeight: 1.6 }}>
//             Three levels with instant feedback, explanations and progress tracking.
//           </p>
//         </div>
//       </section>

//       {/* ── Quiz Cards ── */}
//       <main style={{ maxWidth: 860, margin: "0 auto", padding: "44px 24px 80px" }}>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
//           {quizLevels.map((level, i) => (
//             <QuizCard key={level.tag} level={level} index={i} />
//           ))}
//         </div>

//         {/* Features strip */}
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #ede8df",
//             borderRadius: 16,
//             padding: "24px 32px",
//             display: "grid",
//             gridTemplateColumns: "repeat(3, 1fr)",
//             gap: 24,
//             boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
//           }}
//         >
//           {features.map((f) => (
//             <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
//               <div
//                 style={{
//                   width: 36,
//                   height: 36,
//                   borderRadius: 10,
//                   background: "#fdf3e3",
//                   border: "1px solid #e8d4a0",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: 18,
//                   flexShrink: 0,
//                 }}
//               >
//                 {f.icon}
//               </div>
//               <div>
//                 <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1208", marginBottom: 3 }}>{f.title}</div>
//                 <div style={{ fontSize: 12, color: "#7a6a50", lineHeight: 1.5 }}>{f.description}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//       < FooterSection/>
//     </div>
//     </>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/Footer";
// ── Types ──────────────────────────────────────────────────────────────────────

interface Question {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  time: number;
  questions_data: Question[];
}

interface Level {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
  twColor: string;
  twBg: string;
  twBorder: string;
  twText: string;
  twHoverBg: string;
  icon: string;
  quizzes: Quiz[];
}

interface QuizResult {
  correct: number;
  incorrect: number;
  unanswered: number;
  answers: Record<number, number>;
  date: Date;
}

type Screen = "list" | "quiz" | "results";

// ── Data ───────────────────────────────────────────────────────────────────────

const quizData: { levels: Level[] } = {
  levels: [
    {
      id: "basic",
      name: "Basic Level",
      subtitle: "Strengthen your foundation with essential topics.",
      color: "#16a34a",
      bgColor: "#f0fdf4",
      borderColor: "#bbf7d0",
      twColor: "text-green-600",
      twBg: "bg-green-50",
      twBorder: "border-green-200",
      twText: "text-green-700",
      twHoverBg: "hover:bg-green-50",
      icon: "📗",
      quizzes: [
        {
          id: "fundamental-rights",
          title: "Fundamental Rights Quiz",
          description: "Test your knowledge of Fundamental Rights and their importance.",
          questions: 10,
          time: 8,
          questions_data: [
            { q: "Which Article guarantees the Right to Equality before the law?", options: ["Article 14", "Article 19", "Article 21", "Article 32"], correct: 0, explanation: "Article 14 of the Constitution guarantees equality before law and equal protection of laws to all persons within the territory of India." },
            { q: "Which of the following is a Fundamental Right?", options: ["Right to Property", "Right to Education", "Right to Work", "Right to Vote"], correct: 1, explanation: "Right to Education (Article 21A) is a Fundamental Right. Right to Property was removed as a Fundamental Right in 1978." },
            { q: "The Right to Freedom includes the right to practice:", options: ["Any profession", "Religion only", "Six freedoms under Article 19", "Vote in elections"], correct: 2, explanation: "Article 19 guarantees six freedoms including speech, assembly, movement, residence, profession, and forming associations." },
            { q: "Which Article protects citizens from being detained without any reason?", options: ["Article 19", "Article 20", "Article 21", "Article 22"], correct: 3, explanation: "Article 22 provides protection against arrest and detention in certain cases." },
            { q: "Which Right protects citizens from exploitation?", options: ["Right to Equality", "Right against Exploitation", "Right to Freedom", "Right to Education"], correct: 1, explanation: "Articles 23 and 24 form the Right against Exploitation, prohibiting human trafficking, forced labor, and child labor." },
            { q: "The Right to Freedom of Religion is guaranteed under:", options: ["Article 25-28", "Article 19-22", "Article 14-18", "Article 29-30"], correct: 0, explanation: "Articles 25 to 28 guarantee freedom of conscience and free profession, practice and propagation of religion." },
            { q: "Which Article gives the Right to Constitutional Remedies?", options: ["Article 19", "Article 21", "Article 32", "Article 44"], correct: 2, explanation: "Article 32 gives citizens the right to move the Supreme Court for enforcement of Fundamental Rights." },
            { q: "Which of the following is NOT a Fundamental Right?", options: ["Right to Equality", "Right to Property", "Right to Freedom", "Right against Exploitation"], correct: 1, explanation: "Right to Property was removed by the 44th Amendment Act in 1978 and is now a legal right under Article 300A." },
            { q: "Which Article provides the Right to Education?", options: ["Article 19", "Article 21A", "Article 23", "Article 29"], correct: 1, explanation: "Article 21A, inserted by the 86th Constitutional Amendment in 2002, provides free and compulsory education to children aged 6-14 years." },
            { q: "The Right to Property is a Fundamental Right.", options: ["True", "False", "Partially True", "Context Dependent"], correct: 1, explanation: "False. Right to Property was removed as a Fundamental Right by the 44th Amendment (1978) and is now a constitutional right under Article 300A." }
          ]
        },
        {
          id: "preamble",
          title: "Preamble & Key Features Quiz",
          description: "Explore the Preamble and key features of the Constitution.",
          questions: 10,
          time: 8,
          questions_data: [
            { q: "The Preamble of the Indian Constitution begins with:", options: ["We the Citizens", "We the People", "We the Sovereign", "We the Nation"], correct: 1, explanation: "The Preamble begins with 'We, the People of India', emphasizing that the Constitution derives its authority from the people." },
            { q: "Which word was added to the Preamble by the 42nd Amendment?", options: ["Sovereign", "Socialist", "Democratic", "Republic"], correct: 1, explanation: "The 42nd Constitutional Amendment (1976) added 'Socialist' and 'Secular' to the Preamble." },
            { q: "India is described as a 'Republic' meaning:", options: ["No elections needed", "Elected head of state", "Monarchy with limits", "Military rule"], correct: 1, explanation: "A Republic means the head of state is elected and not hereditary. The President of India is elected for a fixed term." },
            { q: "The concept of 'Fraternity' in the Preamble means:", options: ["Economic equality", "Brotherhood among citizens", "Freedom of speech", "Right to vote"], correct: 1, explanation: "Fraternity means a sense of brotherhood and national unity." },
            { q: "How many Schedules does the Indian Constitution have?", options: ["8", "10", "12", "15"], correct: 2, explanation: "The Indian Constitution originally had 8 Schedules, but now has 12 Schedules after various amendments." },
            { q: "The Indian Constitution was adopted on:", options: ["15 August 1947", "26 January 1950", "26 November 1949", "2 October 1950"], correct: 2, explanation: "The Constitution was adopted by the Constituent Assembly on 26 November 1949. It came into force on 26 January 1950." },
            { q: "Who is called the 'Father of the Indian Constitution'?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "B.R. Ambedkar", "Sardar Patel"], correct: 2, explanation: "Dr. B.R. Ambedkar is called the 'Father of the Indian Constitution'. He was the Chairman of the Drafting Committee." },
            { q: "India follows a federal system with:", options: ["Strong states", "Strong centre", "Equal division", "No centre"], correct: 1, explanation: "India follows a federal system with a strong centre." },
            { q: "The term 'Secular' in the Preamble means:", options: ["State has its own religion", "No religion for state", "Hindu majority rule", "Minority rights only"], correct: 1, explanation: "Secular means the state has no official religion. All religions are treated equally." },
            { q: "Universal Adult Franchise means:", options: ["Only educated can vote", "All adults can vote", "Only taxpayers vote", "Only property owners"], correct: 1, explanation: "Universal Adult Franchise means every citizen above 18 years has the right to vote regardless of caste, religion, gender, or economic status." }
          ]
        }
      ]
    },
    {
      id: "intermediate",
      name: "Intermediate Level",
      subtitle: "Deepen your understanding with core concepts.",
      color: "#d97706",
      bgColor: "#fffbeb",
      borderColor: "#fde68a",
      twColor: "text-amber-600",
      twBg: "bg-amber-50",
      twBorder: "border-amber-200",
      twText: "text-amber-700",
      twHoverBg: "hover:bg-amber-50",
      icon: "⚖️",
      quizzes: [
        {
          id: "directive-principles",
          title: "Directive Principles Quiz",
          description: "Test your understanding of Directive Principles of State Policy.",
          questions: 15,
          time: 15,
          questions_data: [
            { q: "Directive Principles are contained in which Part of the Constitution?", options: ["Part III", "Part IV", "Part V", "Part VI"], correct: 1, explanation: "Directive Principles of State Policy are contained in Part IV (Articles 36-51) of the Indian Constitution." },
            { q: "Directive Principles are:", options: ["Justiciable", "Non-justiciable", "Partially enforceable", "Criminal law"], correct: 1, explanation: "DPSPs are non-justiciable, meaning they cannot be enforced through courts." },
            { q: "Which Article directs the state to secure equal pay for equal work?", options: ["Article 39", "Article 41", "Article 43", "Article 45"], correct: 0, explanation: "Article 39(d) directs the state to ensure equal pay for equal work for both men and women." },
            { q: "Right to work is mentioned under:", options: ["Article 38", "Article 41", "Article 43", "Article 46"], correct: 1, explanation: "Article 41 directs the state to make effective provision for securing the right to work, education, and public assistance." },
            { q: "The concept of Uniform Civil Code is mentioned in:", options: ["Article 40", "Article 44", "Article 48", "Article 51"], correct: 1, explanation: "Article 44 directs the state to endeavour to secure a Uniform Civil Code for all citizens." },
            { q: "Which Article directs prohibition of slaughter of cows?", options: ["Article 46", "Article 47", "Article 48", "Article 49"], correct: 2, explanation: "Article 48 directs the state to organize agriculture and prohibit slaughter of cows, calves and milch cattle." },
            { q: "DPSPs were borrowed from which Constitution?", options: ["USA", "UK", "Ireland", "Australia"], correct: 2, explanation: "The concept of Directive Principles was borrowed from the Irish Constitution of 1937." },
            { q: "Which Article promotes cottage industries?", options: ["Article 40", "Article 43", "Article 45", "Article 47"], correct: 1, explanation: "Article 43 directs the state to endeavour to secure a living wage and conditions promoting cottage industries." },
            { q: "Panchayati Raj is mentioned under:", options: ["Article 38", "Article 40", "Article 42", "Article 46"], correct: 1, explanation: "Article 40 directs the state to organize village panchayats and endow them with necessary powers." },
            { q: "Article 45 originally directed free education up to age:", options: ["10", "12", "14", "16"], correct: 2, explanation: "Article 45 originally directed free and compulsory education for children up to 14 years of age." },
            { q: "DPSPs aim to establish:", options: ["Welfare state", "Police state", "Military state", "Corporate state"], correct: 0, explanation: "DPSPs aim to establish a welfare state by providing social and economic justice to all citizens." },
            { q: "Which Article directs promotion of educational interests of weaker sections?", options: ["Article 44", "Article 45", "Article 46", "Article 47"], correct: 2, explanation: "Article 46 directs the state to promote educational and economic interests of SCs, STs and other weaker sections." },
            { q: "International peace is promoted under:", options: ["Article 48A", "Article 50", "Article 51", "Article 36"], correct: 2, explanation: "Article 51 directs the state to promote international peace and security." },
            { q: "Which Article separates judiciary from executive?", options: ["Article 48", "Article 49", "Article 50", "Article 51"], correct: 2, explanation: "Article 50 directs the state to separate the judiciary from the executive in public services." },
            { q: "DPSPs are meant to guide:", options: ["Citizens", "Judiciary", "Legislature and Executive", "Military"], correct: 2, explanation: "DPSPs are guidelines for the legislature and executive in policy making." }
          ]
        },
        {
          id: "fundamental-duties",
          title: "Fundamental Duties Quiz",
          description: "Learn and test the Fundamental Duties of citizens.",
          questions: 15,
          time: 15,
          questions_data: [
            { q: "Fundamental Duties are in which Part of the Constitution?", options: ["Part III", "Part IV", "Part IVA", "Part V"], correct: 2, explanation: "Fundamental Duties were added by the 42nd Amendment (1976) in Part IVA under Article 51A." },
            { q: "Originally, how many Fundamental Duties were there?", options: ["8", "10", "11", "12"], correct: 1, explanation: "Originally 10 Fundamental Duties were added by the 42nd Amendment. An 11th was added by the 86th Amendment in 2002." },
            { q: "Fundamental Duties were recommended by:", options: ["Balwantrai Mehta Committee", "Swaran Singh Committee", "Ashok Mehta Committee", "Narasimha Rao Committee"], correct: 1, explanation: "The Swaran Singh Committee recommended the inclusion of Fundamental Duties in 1976." },
            { q: "Which Fundamental Duty requires protecting the environment?", options: ["Clause (a)", "Clause (g)", "Clause (i)", "Clause (j)"], correct: 1, explanation: "Article 51A(g) requires citizens to protect and improve the natural environment including forests, lakes, rivers, and wildlife." },
            { q: "Fundamental Duties are inspired by which Constitution?", options: ["USA", "UK", "USSR", "France"], correct: 2, explanation: "Fundamental Duties in the Indian Constitution were inspired by the Constitution of erstwhile USSR." },
            { q: "Which duty requires upholding national sovereignty?", options: ["51A(a)", "51A(b)", "51A(c)", "51A(d)"], correct: 0, explanation: "Article 51A(a) requires every citizen to abide by the Constitution and respect its ideals, institutions, national flag and anthem." },
            { q: "The 11th Fundamental Duty relates to:", options: ["Environmental protection", "Scientific temper", "Education of children", "Defending country"], correct: 2, explanation: "The 11th Fundamental Duty under 51A(k) requires parents to provide education opportunities to children aged 6-14." },
            { q: "Fundamental Duties are:", options: ["Justiciable rights", "Non-justiciable", "Constitutional rights", "Criminal obligations"], correct: 1, explanation: "Fundamental Duties are non-justiciable, meaning their violation cannot be directly punished by courts." },
            { q: "Which Article contains all Fundamental Duties?", options: ["Article 49", "Article 50", "Article 51", "Article 51A"], correct: 3, explanation: "All Fundamental Duties are contained in Article 51A of the Indian Constitution." },
            { q: "Duty to develop scientific temper is under:", options: ["51A(e)", "51A(f)", "51A(h)", "51A(i)"], correct: 2, explanation: "Article 51A(h) requires citizens to develop scientific temper, humanism and the spirit of inquiry and reform." },
            { q: "Protecting public property is a duty under:", options: ["51A(f)", "51A(i)", "51A(j)", "51A(k)"], correct: 1, explanation: "Article 51A(i) requires every citizen to safeguard public property and to abjure violence." },
            { q: "Striving towards excellence is under:", options: ["51A(h)", "51A(i)", "51A(j)", "51A(k)"], correct: 2, explanation: "Article 51A(j) requires citizens to strive towards excellence in all spheres of individual and collective activity." },
            { q: "Duties apply to:", options: ["Only adults", "Only voters", "All citizens", "Only government employees"], correct: 2, explanation: "Fundamental Duties apply to all citizens of India regardless of age, gender, religion, or occupation." },
            { q: "Which duty promotes harmony among all sections?", options: ["51A(d)", "51A(e)", "51A(f)", "51A(g)"], correct: 1, explanation: "Article 51A(e) promotes harmony and the spirit of common brotherhood among all the people of India." },
            { q: "Fundamental Duties have legal sanction through:", options: ["Directly enforced", "Parliament legislation", "Presidential orders", "Supreme Court rulings"], correct: 1, explanation: "Parliament can pass legislation to give legal sanction to Fundamental Duties and prescribe penalties for violation." }
          ]
        }
      ]
    },
    {
      id: "advanced",
      name: "Advanced Level",
      subtitle: "Challenge yourself with complex and analytical topics.",
      color: "#dc2626",
      bgColor: "#fef2f2",
      borderColor: "#fecaca",
      twColor: "text-red-600",
      twBg: "bg-red-50",
      twBorder: "border-red-200",
      twText: "text-red-700",
      twHoverBg: "hover:bg-red-50",
      icon: "🏛️",
      quizzes: [
        {
          id: "constitutional-amendments",
          title: "Constitutional Amendments Quiz",
          description: "Test your knowledge of constitutional amendments.",
          questions: 20,
          time: 20,
          questions_data: [
            { q: "Which Amendment added Fundamental Duties to the Constitution?", options: ["40th Amendment", "42nd Amendment", "44th Amendment", "52nd Amendment"], correct: 1, explanation: "The 42nd Constitutional Amendment Act of 1976 added Fundamental Duties (Article 51A) to the Constitution during the Emergency period." },
            { q: "The 44th Amendment (1978) restored which right?", options: ["Right to Property removed", "Right to vote restored", "Right to equality", "Right to speech"], correct: 0, explanation: "The 44th Amendment (1978) removed the Right to Property from Fundamental Rights." },
            { q: "Which Amendment lowered voting age from 21 to 18?", options: ["52nd", "61st", "73rd", "86th"], correct: 1, explanation: "The 61st Constitutional Amendment (1988) lowered the voting age from 21 years to 18 years." },
            { q: "The 73rd Amendment established:", options: ["Rajya Sabha", "Panchayati Raj", "High Courts", "State PSCs"], correct: 1, explanation: "The 73rd Constitutional Amendment (1992) gave constitutional status to Panchayati Raj institutions." },
            { q: "Anti-defection law was added by which Amendment?", options: ["42nd", "44th", "52nd", "61st"], correct: 2, explanation: "The 52nd Constitutional Amendment (1985) added the Tenth Schedule providing for disqualification on ground of defection." },
            { q: "Which Amendment introduced Goods and Services Tax?", options: ["99th", "100th", "101st", "102nd"], correct: 2, explanation: "The 101st Constitutional Amendment Act (2016) introduced the Goods and Services Tax (GST) regime in India." },
            { q: "The 86th Amendment (2002) made education compulsory for age:", options: ["0-6 years", "6-14 years", "6-18 years", "14-18 years"], correct: 1, explanation: "The 86th Amendment inserted Article 21A making free and compulsory education a fundamental right for children aged 6-14." },
            { q: "Which Amendment added 'Socialist' and 'Secular' to Preamble?", options: ["40th", "42nd", "44th", "46th"], correct: 1, explanation: "The 42nd Amendment (1976) inserted 'Socialist', 'Secular' and 'Integrity' into the Preamble." },
            { q: "The 74th Amendment pertained to:", options: ["Panchayati Raj", "Urban Local Bodies", "Cooperative Societies", "Tribunals"], correct: 1, explanation: "The 74th Constitutional Amendment (1992) provided constitutional status to Municipalities (Urban Local Bodies)." },
            { q: "Which Amendment gave Sikkim full statehood?", options: ["32nd", "35th", "36th", "37th"], correct: 2, explanation: "The 36th Constitutional Amendment (1975) made Sikkim the 22nd state of India." },
            { q: "The Supreme Court can be approached to amend the Constitution under:", options: ["Article 356", "Article 368", "Article 370", "Article 352"], correct: 1, explanation: "Article 368 empowers Parliament to amend the Constitution." },
            { q: "OBC reservations were constitutionally provided by:", options: ["76th Amendment", "77th Amendment", "127th Amendment", "No Amendment"], correct: 2, explanation: "The 127th Constitutional Amendment (2021) restored the power of states to identify Other Backward Classes." },
            { q: "National Judicial Appointments Commission was created by:", options: ["98th Amendment", "99th Amendment", "100th Amendment", "101st Amendment"], correct: 1, explanation: "The 99th Constitutional Amendment (2014) established the National Judicial Appointments Commission." },
            { q: "Which Amendment created the National Capital Territory of Delhi?", options: ["67th", "69th", "71st", "73rd"], correct: 1, explanation: "The 69th Constitutional Amendment (1991) gave special status to Delhi as the National Capital Territory." },
            { q: "The 7th Amendment reorganized states on the basis of:", options: ["Population", "Language", "Religion", "Geography"], correct: 1, explanation: "The 7th Constitutional Amendment (1956) reorganized states on linguistic basis." },
            { q: "Cooperative Societies were added to Fundamental Rights by:", options: ["97th Amendment", "99th Amendment", "100th Amendment", "101st Amendment"], correct: 0, explanation: "The 97th Constitutional Amendment (2011) gave constitutional status to cooperative societies." },
            { q: "Which Amendment is called the 'Mini Constitution'?", options: ["7th Amendment", "24th Amendment", "42nd Amendment", "44th Amendment"], correct: 2, explanation: "The 42nd Constitutional Amendment (1976) is called the 'Mini Constitution' as it made comprehensive changes." },
            { q: "The Constitution (104th Amendment) extended reservations for SC/ST till:", options: ["2020", "2030", "2040", "Indefinitely"], correct: 1, explanation: "The 104th Constitutional Amendment (2020) extended reservations for SCs and STs for 10 more years till 2030." },
            { q: "Emergency provisions were amended by which Amendment to prevent misuse?", options: ["38th", "42nd", "44th", "52nd"], correct: 2, explanation: "The 44th Amendment (1978) amended emergency provisions to prevent misuse." },
            { q: "First Amendment to the Constitution was passed in:", options: ["1950", "1951", "1952", "1953"], correct: 1, explanation: "The First Constitutional Amendment (1951) added the Ninth Schedule to protect land reform laws from judicial review." }
          ]
        },
        {
          id: "landmark-cases",
          title: "Landmark Cases Quiz",
          description: "Explore important landmark cases and their impact.",
          questions: 20,
          time: 20,
          questions_data: [
            { q: "Kesavananda Bharati case established the doctrine of:", options: ["Judicial review", "Basic structure", "Implied powers", "Federal supremacy"], correct: 1, explanation: "Kesavananda Bharati v. State of Kerala (1973) established the 'Basic Structure' doctrine." },
            { q: "Which case established that Right to Life includes Right to Livelihood?", options: ["Maneka Gandhi case", "Olga Tellis case", "Vishaka case", "MC Mehta case"], correct: 1, explanation: "Olga Tellis v. Bombay Municipal Corporation (1985) held that the right to livelihood is part of the right to life under Article 21." },
            { q: "Vishaka Guidelines relate to:", options: ["Environmental protection", "Sexual harassment at workplace", "Child labor", "Right to education"], correct: 1, explanation: "Vishaka v. State of Rajasthan (1997) laid down guidelines to prevent sexual harassment of women at the workplace." },
            { q: "The Golaknath case held that Parliament:", options: ["Can amend all rights", "Cannot amend Fundamental Rights", "Has unlimited power", "Must consult states"], correct: 1, explanation: "Golaknath v. State of Punjab (1967) held that Parliament cannot abridge or take away Fundamental Rights." },
            { q: "Maneka Gandhi case expanded Article 21 to include:", options: ["Property rights", "Procedural due process", "Right to vote", "Right to assembly"], correct: 1, explanation: "Maneka Gandhi v. Union of India (1978) held that the procedure for depriving a person of life and liberty must be fair, just, and reasonable." },
            { q: "SR Bommai case dealt with:", options: ["Freedom of press", "President's Rule in States", "Electoral reforms", "Minority rights"], correct: 1, explanation: "SR Bommai v. Union of India (1994) held that floor test must be conducted before imposing President's Rule." },
            { q: "Navtej Singh Johar case (2018) decriminalized:", options: ["Drug use", "Section 377 - same sex relations", "Sedition", "Blasphemy"], correct: 1, explanation: "Navtej Singh Johar v. Union of India (2018) decriminalized consensual same-sex relationships between adults." },
            { q: "Right to Privacy was declared Fundamental Right in:", options: ["KS Puttaswamy case 2017", "Maneka Gandhi case 1978", "NALSA case 2014", "Shreya Singhal 2015"], correct: 0, explanation: "Justice K.S. Puttaswamy v. Union of India (2017) declared Right to Privacy as a fundamental right under Article 21." },
            { q: "NALSA case (2014) recognized rights of:", options: ["Minorities", "Transgender persons", "Disabled people", "Migrant workers"], correct: 1, explanation: "National Legal Services Authority v. Union of India (2014) recognized transgender persons as the 'third gender'." },
            { q: "Triple Talaq was declared unconstitutional in:", options: ["Shayara Bano case", "Shah Bano case", "Mary Roy case", "Sarla Mudgal case"], correct: 0, explanation: "Shayara Bano v. Union of India (2017) declared the practice of Triple Talaq as unconstitutional and void." },
            { q: "MC Mehta cases primarily deal with:", options: ["Labor rights", "Environmental protection", "Criminal procedure", "Property rights"], correct: 1, explanation: "MC Mehta v. Union of India covers multiple cases primarily dealing with environmental protection." },
            { q: "Shreya Singhal case struck down which Section of IT Act?", options: ["Section 66A", "Section 67", "Section 69", "Section 72"], correct: 0, explanation: "Shreya Singhal v. Union of India (2015) struck down Section 66A of the IT Act as unconstitutional." },
            { q: "Indra Sawhney case (1992) upheld OBC reservations and capped total at:", options: ["40%", "49.5%", "50%", "60%"], correct: 1, explanation: "Indra Sawhney v. Union of India (1992) upheld 27% OBC reservations but held total reservations should not ordinarily exceed 50%." },
            { q: "ADM Jabalpur case (1976) controversially held during Emergency that:", options: ["Rights expanded", "Habeas Corpus suspended", "President has no power", "Courts have jurisdiction"], correct: 1, explanation: "ADM Jabalpur v. Shivkant Shukla (1976) held that during Emergency, the right to move courts for Habeas Corpus is suspended." },
            { q: "Lily Thomas case (2013) disqualified convicted MPs and MLAs under:", options: ["Article 19", "Article 102/191", "Section 8 RPA", "Article 326"], correct: 2, explanation: "Lily Thomas v. Union of India (2013) held that lawmakers convicted and sentenced to 2+ years are immediately disqualified." },
            { q: "Common Cause case (2018) recognized:", options: ["Privacy as right", "Right to die with dignity", "LGBTQ+ rights", "Environmental rights"], correct: 1, explanation: "Common Cause v. Union of India (2018) recognized the right to die with dignity as part of Article 21." },
            { q: "Aruna Shanbaug case dealt with:", options: ["Euthanasia", "Death penalty", "Divorce rights", "Custody"], correct: 0, explanation: "Aruna Ramchandra Shanbaug v. Union of India (2011) allowed passive euthanasia in extraordinary circumstances." },
            { q: "Sterlite case primarily involved:", options: ["Land acquisition", "Industrial pollution", "Water rights", "Forest rights"], correct: 1, explanation: "The Sterlite copper plant case involved industrial pollution and public health concerns in Thoothukudi." },
            { q: "Suresh Kumar Koushal case (2013) had reversed which judgment?", options: ["Naz Foundation case on Section 377", "Privacy judgment", "Triple Talaq case", "Vishaka case"], correct: 0, explanation: "Suresh Kumar Koushal v. Naz Foundation (2013) reversed the Delhi High Court's Naz Foundation judgment." },
            { q: "Which case established guidelines for death penalty sentencing?", options: ["Bachan Singh case", "Machhi Singh case", "Shatrughan case", "Jagmohan case"], correct: 0, explanation: "Bachan Singh v. State of Punjab (1980) established the 'rarest of rare' doctrine for imposing the death penalty." }
          ]
        }
      ]
    }
  ]
};

// ── Helpers ────────────────────────────────────────────────────────────────────


// ── CircleProgress ─────────────────────────────────────────────────────────────


// ── QuizListScreen ─────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function CircleProgress({
  score,
  total,
  color,
}: {
  score: number;
  total: number;
  color: string;
}) {
  const pct = Math.round((score / total) * 100);
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="relative shrink-0" style={{ width: 72, height: 72 }}>
      <svg width="72" height="72" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="36" cy="36" r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold leading-none text-gray-800">
          {score}/{total}
        </span>
        <span className="text-xs text-gray-500">{pct}%</span>
      </div>
    </div>
  );
}

function QuizListScreen({
  results,
  onStart,
  onPreview,
}: {
  results: Record<string, QuizResult>;
  onStart: (quiz: Quiz, level: Level) => void;
  onPreview: (quiz: Quiz, level: Level, res: QuizResult) => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredLevels = quizData.levels
    .filter((level) => filter === "all" || level.id === filter)
    .map((level) => ({
      ...level,
      quizzes: level.quizzes.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(search.toLowerCase()) ||
          quiz.description.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((level) => level.quizzes.length > 0);

  return (
    <div className="min-h-screen bg-white px-4 pt-24 pb-10 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="m-0 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Quizzes
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Practice and test your knowledge of the Constitution with our curated quizzes.
            </p>
          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png"
            alt=""
            className="hidden w-16 opacity-85 sm:block lg:w-20"
          />
        </div>

        <div className="mb-9 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search quizzes by title or topic..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-gray-300"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2">
            <span className="shrink-0 text-xs text-gray-500">⚙️ Filter</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full cursor-pointer border-none bg-transparent text-sm font-semibold text-gray-700 outline-none md:w-auto"
            >
              <option value="all">All Levels</option>
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {filteredLevels.map((level) => (
          <div key={level.id} className="mb-10">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${level.twBg} ${level.twBorder} text-lg`}
                >
                  {level.icon}
                </div>
                <div>
                  <h2 className="m-0 text-lg font-bold text-gray-900">{level.name}</h2>
                  <p className="m-0 text-xs text-gray-500">{level.subtitle}</p>
                </div>
              </div>

              <span
                className={`rounded-full border px-3.5 py-1 text-xs font-semibold ${level.twBg} ${level.twColor} ${level.twBorder}`}
              >
                {level.quizzes.length} Quizzes
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {level.quizzes.map((quiz) => {
                const res = results[quiz.id];

                return (
                  <div
                    key={quiz.id}
                    className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg"
                  >
                    <div className="flex gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${level.twBg} ${level.twBorder} text-2xl`}
                      >
                        {level.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 text-sm font-bold text-gray-900">{quiz.title}</h3>
                        <p className="mb-2.5 text-xs leading-snug text-gray-500">
                          {quiz.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                          <span>📋 {quiz.questions} Questions</span>
                          <span>⏱ ~{quiz.time} min</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      {res ? (
                        <>
                          <CircleProgress score={res.correct} total={quiz.questions} color={level.color} />
                          <button
                            onClick={() => onPreview(quiz, level, res)}
                            className={`rounded-lg border px-3.5 py-2 text-xs font-semibold ${level.twBorder} ${level.twBg} ${level.twColor}`}
                          >
                            See Preview
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => onStart(quiz, level)}
                          className="w-full rounded-xl px-4 py-2.5 text-sm font-bold text-white"
                          style={{ backgroundColor: level.color }}
                        >
                          Start Quiz →
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── QuizScreen ─────────────────────────────────────────────────────────────────

function QuizScreen({
  quiz,
  level,
  onFinish,
  onLeave,
}: {
  quiz: Quiz;
  level: Level;
  onFinish: (result: QuizResult) => void;
  onLeave: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.time * 60);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  const q = quiz.questions_data[current];
  const answered = Object.keys(answers).length;

  function handleSubmit() {
    let correct = 0;
    let incorrect = 0;
    quiz.questions_data.forEach((q, i) => {
      if (answers[i] === undefined) return;
      if (answers[i] === q.correct) correct++;
      else incorrect++;
    });
    onFinish({
      correct,
      incorrect,
      unanswered: quiz.questions - correct - incorrect,
      answers,
      date: new Date(),
    });
  }

  const isLowTime = timeLeft < 60;

  return (
    <div className="font-sans max-w-5xl mx-auto px-4 bg-slate-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200 mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl ${level.twBg} border ${level.twBorder} flex items-center justify-center text-xl`}
          >
            {level.icon}
          </div>
          <div>
            <div className="font-bold text-base text-gray-900">{quiz.title}</div>
            <div className="text-xs text-gray-500">{quiz.questions} Questions</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`rounded-xl px-4 py-2.5 text-center border ${
              isLowTime ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
            }`}
          >
            <div
              className={`font-extrabold text-xl font-mono ${
                isLowTime ? "text-red-600" : "text-green-600"
              }`}
            >
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs text-gray-500">Time Left</div>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-red-200 rounded-xl bg-white text-red-600 font-semibold text-sm cursor-pointer"
          >
            ↩ Leave Quiz
          </button>
        </div>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 280px", alignItems: "start" }}>
        {/* Question Area */}
        <div className="bg-white border border-gray-200 rounded-2xl p-7">
          <div className="font-bold text-xs mb-2" style={{ color: level.color }}>
            Question {current + 1} of {quiz.questions}
          </div>
          <div className="bg-gray-200 rounded-full h-1.5 mb-6">
            <div
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ backgroundColor: level.color, width: `${((current + 1) / quiz.questions) * 100}%` }}
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 leading-snug">{q.q}</h2>

          <div className="flex flex-col gap-3">
            {q.options.map((opt, i) => {
              const sel = answers[current] === i;
              return (
                <div
                  key={i}
                  onClick={() => setAnswers((a) => ({ ...a, [current]: i }))}
                  className="px-4 py-3.5 rounded-xl cursor-pointer flex items-center gap-3 transition-all duration-150"
                  style={{
                    border: `2px solid ${sel ? level.color : "#e5e7eb"}`,
                    backgroundColor: sel ? level.bgColor : "#fff",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                    style={{
                      border: `2px solid ${sel ? level.color : "#d1d5db"}`,
                      backgroundColor: sel ? level.color : "#fff",
                    }}
                  >
                    {sel && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className={`text-sm text-gray-700 ${sel ? "font-semibold" : "font-normal"}`}>
                    {String.fromCharCode(65 + i)}. {opt}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-7">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className={`px-5 py-2.5 border border-gray-200 rounded-xl bg-white font-semibold text-sm ${
                current === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 cursor-pointer"
              }`}
            >
              ← Previous
            </button>
            {current < quiz.questions - 1 ? (
              <button
                onClick={() => setCurrent((c) => c + 1)}
                className="px-6 py-2.5 border-none rounded-xl text-white font-bold text-sm cursor-pointer"
                style={{ backgroundColor: level.color }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 border-none rounded-xl bg-green-600 text-white font-bold text-sm cursor-pointer"
              >
                Submit Quiz ✓
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Progress */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="font-bold text-sm text-gray-900 mb-3.5 flex items-center gap-1.5">
              📊 Quiz Progress
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>{answered} of {quiz.questions} answered</span>
              <span>{Math.round((answered / quiz.questions) * 100)}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-1.5 mb-4">
              <div
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ backgroundColor: level.color, width: `${(answered / quiz.questions) * 100}%` }}
              />
            </div>
            <div className="flex gap-3">
              {[
                {
                  label: "Correct",
                  val: Object.entries(answers).filter(([i, a]) => quiz.questions_data[Number(i)].correct === a).length,
                  color: "text-green-600",
                },
                {
                  label: "Incorrect",
                  val: Object.entries(answers).filter(([i, a]) => quiz.questions_data[Number(i)].correct !== a).length,
                  color: "text-red-600",
                },
                { label: "Skipped", val: quiz.questions - answered, color: "text-gray-400" },
              ].map((s) => (
                <div key={s.label} className="flex-1 text-center">
                  <div className={`text-xl font-extrabold ${s.color}`}>{s.val}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigator */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="font-bold text-sm text-gray-900 mb-3.5">Question Navigator</div>
            <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
              {quiz.questions_data.map((_, i) => {
                const isCurrent = i === current;
                const isAnswered = answers[i] !== undefined;
                let bg = "#f3f4f6",
                  color = "#6b7280",
                  border = "#e5e7eb";
                if (isCurrent) {
                  bg = level.color;
                  color = "#fff";
                  border = level.color;
                } else if (isAnswered) {
                  bg = "#dcfce7";
                  color = "#16a34a";
                  border = "#bbf7d0";
                }
                return (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="py-2 rounded-lg font-semibold text-xs cursor-pointer border"
                    style={{ backgroundColor: bg, color, borderColor: border }}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2 mt-3.5 text-xs text-gray-500">
              {[
                ["#dcfce7", "#16a34a", "Answered"],
                ["#f3f4f6", "#9ca3af", "Not Answered"],
              ].map(([bg, c, lbl]) => (
                <div key={lbl} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm border" style={{ backgroundColor: bg, borderColor: c }} />
                  <span>{lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="font-bold text-xs text-amber-600 mb-1">💡 Tip</div>
            <p className="m-0 text-xs text-amber-800 leading-relaxed">
              You can review your answers before submitting the quiz.
            </p>
          </div>
        </div>
      </div>

      {/* Leave Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-11/12 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="m-0 mb-3 text-lg font-bold">Leave Quiz?</h3>
            <p className="text-gray-500 text-sm mb-6">Your progress will be lost if you leave now.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl bg-white font-semibold cursor-pointer"
              >
                Stay
              </button>
              <button
                onClick={onLeave}
                className="flex-1 py-3 border-none rounded-xl bg-red-600 text-white font-bold cursor-pointer"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ResultsScreen ──────────────────────────────────────────────────────────────

function ResultsScreen({
  quiz,
  level,
  result,
  onBack,
  onRetake,
}: {
  quiz: Quiz;
  level: Level;
  result: QuizResult;
  onBack: () => void;
  onRetake: () => void;
}) {
  const [selected, setSelected] = useState(0);
  const q = quiz.questions_data[selected];
  const userAns = result.answers[selected];
  const isCorrect = userAns === q.correct;
  const isUnanswered = userAns === undefined;

  const statusColor = isUnanswered ? "#6b7280" : isCorrect ? "#16a34a" : "#dc2626";
  const statusLabel = isUnanswered ? "Unanswered" : isCorrect ? "Correct" : "Incorrect";
  const statusBg = isUnanswered ? "bg-gray-100 text-gray-500" : isCorrect ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600";

  return (
    <div className="font-sans max-w-6xl mx-auto px-4 py-6 bg-slate-50 min-h-screen">
      {/* Header Summary */}
      <div className="bg-white border border-gray-200 rounded-2xl px-7 py-5 mb-5 flex items-center gap-6 flex-wrap">
        <div
          className={`w-14 h-14 rounded-xl ${level.twBg} border ${level.twBorder} flex items-center justify-center text-3xl`}
        >
          {level.icon}
        </div>
        <div className="flex-1">
          <h1 className="m-0 mb-1 text-2xl font-extrabold text-gray-900">{quiz.title}</h1>
          <div className="flex gap-3 flex-wrap">
            <span className={`${level.twBg} ${level.twColor} px-2.5 py-1 rounded-full text-xs font-semibold`}>
              {level.name}
            </span>
            <span className="text-gray-500 text-xs">• {quiz.questions} Questions • ~{quiz.time} min</span>
          </div>
        </div>
        <div className="flex items-center gap-8 flex-wrap">
          <CircleProgress score={result.correct} total={quiz.questions} color={level.color} />
          {[
            ["Correct", result.correct, "text-green-600"],
            ["Incorrect", result.incorrect, "text-red-600"],
            ["Unanswered", result.unanswered, "text-gray-500"],
          ].map(([l, v, c]) => (
            <div key={l as string} className="text-center">
              <div className={`text-3xl font-extrabold ${c}`}>{v}</div>
              <div className="text-xs text-gray-500">{l}</div>
            </div>
          ))}
          <div className="text-right text-xs text-gray-400">
            <div>Attempted on</div>
            <div className="font-semibold text-gray-600">
              {result.date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            </div>
            <div>{result.date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: "300px 1fr", alignItems: "start" }}>
        {/* Question List */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="font-bold text-sm mb-3.5 text-gray-900">Questions Overview</div>
          <div className="flex gap-3 mb-4 text-xs">
            {[
              ["✓", "text-green-600", "bg-green-50", "Correct"],
              ["✗", "text-red-600", "bg-red-50", "Incorrect"],
              ["○", "text-gray-400", "bg-gray-100", "Unanswered"],
            ].map(([ic, c, bg, lbl]) => (
              <div key={lbl} className={`flex items-center gap-1 ${c}`}>
                <span className={`${bg} rounded-full w-4 h-4 inline-flex items-center justify-center text-xs font-bold`}>
                  {ic}
                </span>
                <span className="text-gray-700">{lbl}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
            {quiz.questions_data.map((q, i) => {
              const ans = result.answers[i];
              const correct = ans === q.correct;
              const unanswered = ans === undefined;
              const isSel = selected === i;
              const ringColor = unanswered ? "#9ca3af" : correct ? "#16a34a" : "#dc2626";
              const ringBg = unanswered ? "#f3f4f6" : correct ? "#f0fdf4" : "#fef2f2";
              const selBg = unanswered ? "#f3f4f6" : correct ? "#dcfce7" : "#fee2e2";
              return (
                <div
                  key={i}
                  onClick={() => setSelected(i)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer border"
                  style={{
                    backgroundColor: isSel ? selBg : "#fff",
                    borderColor: isSel ? ringColor : "#e5e7eb",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border"
                    style={{ backgroundColor: ringBg, borderColor: ringColor, color: ringColor }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs text-gray-700 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {q.q.slice(0, 45)}...
                  </span>
                  <span className="text-xs font-bold" style={{ color: ringColor }}>
                    {unanswered ? "" : correct ? "+1" : "0"}
                  </span>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-4 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-700 font-semibold text-xs cursor-pointer">
            ⬇ Download Report
          </button>
        </div>

        {/* Question Detail */}
        <div className="bg-white border border-gray-200 rounded-2xl p-7">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-gray-500">
              Question {selected + 1} of {quiz.questions}
            </span>
            <span className={`${statusBg} px-3 py-1 rounded-full text-xs font-bold`}>{statusLabel}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-5">{q.q}</h2>

          <div className="flex flex-col gap-2.5 mb-6">
            {q.options.map((opt, i) => {
              const isCorrectOpt = i === q.correct;
              const isUserOpt = i === userAns;
              let borderColor = "#e5e7eb",
                bgColor = "#fff",
                txtColor = "#374151";
              if (isCorrectOpt) {
                borderColor = "#16a34a";
                bgColor = "#f0fdf4";
                txtColor = "#166534";
              }
              if (isUserOpt && !isCorrectOpt) {
                borderColor = "#dc2626";
                bgColor = "#fef2f2";
                txtColor = "#991b1b";
              }
              return (
                <div
                  key={i}
                  className="px-4 py-3.5 rounded-xl flex items-center justify-between border-2"
                  style={{ borderColor, backgroundColor: bgColor }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center border-2"
                      style={{
                        borderColor,
                        backgroundColor: isCorrectOpt || isUserOpt ? borderColor : "#fff",
                      }}
                    >
                      {(isCorrectOpt || isUserOpt) && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: txtColor, fontWeight: isCorrectOpt || isUserOpt ? 600 : 400 }}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </span>
                  </div>
                  {isCorrectOpt && <span className="text-green-600 text-lg">✓</span>}
                  {isUserOpt && !isCorrectOpt && <span className="text-red-600 text-lg">✗</span>}
                </div>
              );
            })}
          </div>

          {!isUnanswered && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="flex gap-4 mb-3 flex-wrap">
                <div>
                  <span className="text-xs text-gray-500">Your Answer: </span>
                  <span className={`font-bold text-sm ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                    {String.fromCharCode(65 + userAns)}. {q.options[userAns]}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Correct Answer: </span>
                  <span className="font-bold text-sm text-green-600">
                    {String.fromCharCode(65 + q.correct)}. {q.options[q.correct]}
                  </span>
                </div>
              </div>
              <div className="text-xs font-bold text-amber-800 mb-1.5">Explanation:</div>
              <p className="m-0 text-xs text-amber-900 leading-relaxed">{q.explanation}</p>
            </div>
          )}

          <div className="flex gap-3 justify-between items-center flex-wrap">
            <button
              onClick={() => setSelected((s) => Math.max(0, s - 1))}
              disabled={selected === 0}
              className={`px-4 py-2.5 border border-gray-200 rounded-xl bg-white font-semibold text-sm ${
                selected === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 cursor-pointer"
              }`}
            >
              ← Previous Question
            </button>
            <div className="flex gap-2.5">
              <button
                onClick={onRetake}
                className={`px-4 py-2.5 border ${level.twBorder} rounded-xl ${level.twBg} ${level.twColor} font-semibold text-sm cursor-pointer`}
              >
                Retake Quiz
              </button>
              {selected < quiz.questions - 1 ? (
                <button
                  onClick={() => setSelected((s) => s + 1)}
                  className="px-5 py-2.5 border-none rounded-xl text-white font-bold text-sm cursor-pointer"
                  style={{ backgroundColor: level.color }}
                >
                  Next Question →
                </button>
              ) : (
                <button
                  onClick={onBack}
                  className="px-5 py-2.5 border-none rounded-xl bg-gray-700 text-white font-bold text-sm cursor-pointer"
                >
                  Back to Quizzes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-5 text-xs text-gray-400">
        💡 Keep practicing and improve your knowledge every day!
        <button
          onClick={onBack}
          className="ml-4 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 font-semibold text-xs cursor-pointer"
        >
          Back to All Quizzes
        </button>
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("list");
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [results, setResults] = useState<Record<string, QuizResult>>({});

  function handleStart(quiz: Quiz, level: Level) {
    setActiveQuiz(quiz);
    setActiveLevel(level);
    setScreen("quiz");
  }

  function handleFinish(result: QuizResult) {
    if (!activeQuiz) return;

    setResults((previousResults) => ({
      ...previousResults,
      [activeQuiz.id]: result,
    }));

    setScreen("results");
  }

  function handlePreview(quiz: Quiz, level: Level) {
    setActiveQuiz(quiz);
    setActiveLevel(level);
    setScreen("results");
  }

  function handleBackToList() {
    setScreen("list");
  }

  function handleRetake() {
    if (!activeQuiz) return;

    setResults((previousResults) => {
      const nextResults = { ...previousResults };
      delete nextResults[activeQuiz.id];
      return nextResults;
    });

    setScreen("quiz");
  }

  let content: React.ReactNode;

  if (screen === "quiz" && activeQuiz && activeLevel) {
    content = (
      <QuizScreen
        quiz={activeQuiz}
        level={activeLevel}
        onFinish={handleFinish}
        onLeave={handleBackToList}
      />
    );
  } else if (
    screen === "results" &&
    activeQuiz &&
    activeLevel &&
    results[activeQuiz.id]
  ) {
    content = (
      <ResultsScreen
        quiz={activeQuiz}
        level={activeLevel}
        result={results[activeQuiz.id]}
        onBack={handleBackToList}
        onRetake={handleRetake}
      />
    );
  } else {
    content = (
      <QuizListScreen
        results={results}
        onStart={handleStart}
        onPreview={handlePreview}
      />
    );
  }

  return (
    <>
      <Navbar />
      {content}
      <FooterSection />
    </>
  );
}
