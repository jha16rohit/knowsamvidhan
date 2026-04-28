"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Article {
  part: string;
  tag: string;
  number: string;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const allArticles: Article[] = [
  { part: "Part III", tag: "Fundamental Rights", number: "Article 14", title: "Equality before law", description: "The State shall not deny to any person equality before the law or the equal protection of the laws." },
  { part: "Part III", tag: "Fundamental Rights", number: "Article 15", title: "Prohibition of discrimination", description: "Prohibits discrimination on grounds of religion, race, caste, sex or place of birth." },
  { part: "Part III", tag: "Fundamental Rights", number: "Article 19", title: "Six freedoms", description: "Guarantees six fundamental freedoms including speech, assembly, and movement." },
  { part: "Part III", tag: "Fundamental Rights", number: "Article 21", title: "Right to life and personal liberty", description: "No person shall be deprived of life or personal liberty except according to procedure established by law." },
  { part: "Part III", tag: "Fundamental Rights", number: "Article 32", title: "Right to constitutional remedies", description: "The right to move the Supreme Court for enforcement of fundamental rights." },
  { part: "Part IV", tag: "Directive Principles of State Policy", number: "Article 44", title: "Uniform Civil Code", description: "The State shall endeavour to secure for citizens a uniform civil code throughout India." },
  { part: "Part I", tag: "The Union and its Territory", number: "Article 1", title: "Name and territory of the Union", description: "India, that is Bharat, shall be a Union of States." },
  { part: "Part II", tag: "Citizenship", number: "Article 5", title: "Citizenship at the commencement of the Constitution", description: "Defines who automatically became a citizen of India on 26 January 1950." },
  { part: "Part IV-A", tag: "Fundamental Duties", number: "Article 51A", title: "Fundamental Duties", description: "Eleven duties every citizen of India must observe." },
  { part: "Part III", tag: "Fundamental Rights", number: "Article 16", title: "Equality of opportunity in public employment", description: "Equal opportunity for all citizens in matters relating to employment under the State." },
  { part: "Part III", tag: "Fundamental Rights", number: "Article 17", title: "Abolition of Untouchability", description: "Untouchability is abolished and its practice in any form is forbidden." },
  { part: "Part III", tag: "Fundamental Rights", number: "Article 25", title: "Freedom of religion", description: "All persons are equally entitled to freedom of conscience and the right to profess, practise and propagate religion." },
  { part: "Part V", tag: "The Union", number: "Article 72", title: "Power of President to grant pardons", description: "The President shall have the power to grant pardons, reprieves, respites or remissions of punishment." },
  { part: "Part V", tag: "The Union", number: "Article 124", title: "Establishment of Supreme Court", description: "There shall be a Supreme Court of India constituted as provided in this article." },
  { part: "Part VI", tag: "The States", number: "Article 214", title: "High Courts for States", description: "There shall be a High Court for each State." },
];

const filterTabs = ["All", "Part I", "Part II", "Part III", "Part IV", "Part IV-A", "Part V", "Part VI"];

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({ article, onBookmark, bookmarked }: { article: Article; onBookmark: () => void; bookmarked: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid #ede8df",
        borderRadius: 16,
        padding: "22px 20px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 8px 28px rgba(196,130,50,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column" as const,
        gap: 6,
        position: "relative" as const,
      }}
    >
      {/* Top row: tag + bookmark */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ background: "#fdf3e3", border: "1px solid #e8d4a0", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600, color: "#c48232", fontFamily: "system-ui, sans-serif" }}>
          {article.tag}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onBookmark(); }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: bookmarked ? "#c48232" : "#c9b99a", padding: 0 }}
        >
          🔖
        </button>
      </div>

      <div style={{ fontWeight: 800, fontSize: 20, color: "#1a1208", fontFamily: "'Georgia', serif", lineHeight: 1.1 }}>{article.number}</div>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#4a3c28", fontFamily: "system-ui, sans-serif" }}>{article.title}</div>
      <div style={{ fontSize: 13, color: "#7a6a50", lineHeight: 1.6, fontFamily: "system-ui, sans-serif", flex: 1 }}>{article.description}</div>

      <div style={{ marginTop: 8, fontSize: 13, color: "#c48232", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, fontFamily: "system-ui, sans-serif" }}>
        Read article →
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ArticlesPage() {
  
  
  
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  const toggleBookmark = (num: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  };

  const filtered = allArticles.filter((a) => {
    const matchesPart = activeFilter === "All" || a.part === activeFilter;
    const q = search.toLowerCase();
    const matchesSearch = !q || a.number.toLowerCase().includes(q) || a.title.toLowerCase().includes(q) || a.tag.toLowerCase().includes(q);
    return matchesPart && matchesSearch;
  });

  return (
    <>
    <Navbar />
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#faf7f2", minHeight: "100vh", color: "#1a1208", paddingTop: 64 }}>

      {/* ── Hero Header ── */}
      <section style={{ background: "linear-gradient(135deg, #f5f3ef 60%, #ede8df 100%)", borderBottom: "1px solid #ede8df", padding: "52px 48px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#c48232", letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 12 }}>Library</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: "#1a1208", margin: "0 0 12px", lineHeight: 1.1, fontFamily: "'Georgia', serif" }}>
            Every Article. Clearly explained.
          </h1>
          <p style={{ fontSize: 15, color: "#7a6a50", margin: "0 0 28px", lineHeight: 1.6, maxWidth: 500 }}>
            Filter by part of the Constitution or search by Article number, name or topic.
          </p>

          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid #ede8df", borderRadius: 12, padding: "10px 16px", maxWidth: 480, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <span style={{ fontSize: 16, color: "#9e8c73" }}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Article 21, Right to Education..."
              style={{ flex: 1, border: "none", outline: "none", fontSize: 14, background: "transparent", color: "#1a1208", fontFamily: "system-ui, sans-serif" }}
            />
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" as const, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#9e8c73", marginRight: 4 }}>⚙</span>
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 20,
                  border: activeFilter === tab ? "1.5px solid #c48232" : "1px solid #ede8df",
                  background: activeFilter === tab ? "#fdf3e3" : "#fff",
                  color: activeFilter === tab ? "#c48232" : "#7a6a50",
                  fontSize: 13,
                  fontWeight: activeFilter === tab ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles Grid ── */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center" as const, padding: "60px 0", color: "#9e8c73", fontSize: 15 }}>
            No articles found. Try a different search or filter.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {filtered.map((article) => (
              <ArticleCard
                key={article.number}
                article={article}
                bookmarked={bookmarks.has(article.number)}
                onBookmark={() => toggleBookmark(article.number)}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div style={{ textAlign: "center" as const, marginTop: 52 }}>
          <button style={{ background: "transparent", border: "1px solid #ede8df", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 600, color: "#4a3c28", cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
            Test your knowledge in a quiz
          </button>
        </div>
      </main>
      <FooterSection />
    </div>
    </>
  );

}