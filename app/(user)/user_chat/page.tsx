"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Scale,
  BookOpen,
  RefreshCw,
  Landmark,
  Layers,
  FileText,
  Send,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Settings,
  Plus,
  Zap,
  Clock,
  Circle,
  Hash,
  AlignLeft,
  ArrowUpRight,
} from "lucide-react";

/* ── Types ──────────────────────────────────────────────────────────── */
type Role = "user" | "ai";
interface Message {
  id: string;
  role: Role;
  text: string;
  time: string;
}

/* ── Suggested prompts ──────────────────────────────────────────────── */
const suggestions = [
  {
    icon: Hash,
    label: "What is Article 21?",
    sub: "Right to life & liberty",
    color:
      "border-amber-800/40 bg-amber-950/5 text-amber-900 hover:border-amber-800/70 hover:bg-amber-950/10",
    iconColor: "text-amber-800",
  },
  {
    icon: Scale,
    label: "Explain Fundamental Rights",
    sub: "Part III of Constitution",
    color:
      "border-sky-800/40 bg-sky-950/5 text-sky-900 hover:border-sky-800/70 hover:bg-sky-950/10",
    iconColor: "text-sky-800",
  },
  {
    icon: AlignLeft,
    label: "What is the Preamble?",
    sub: "Soul of the Constitution",
    color:
      "border-emerald-800/40 bg-emerald-950/5 text-emerald-900 hover:border-emerald-800/70 hover:bg-emerald-950/10",
    iconColor: "text-emerald-800",
  },
  {
    icon: RefreshCw,
    label: "Latest Constitutional amendment?",
    sub: "Recent legal changes",
    color:
      "border-rose-800/40 bg-rose-950/5 text-rose-900 hover:border-rose-800/70 hover:bg-rose-950/10",
    iconColor: "text-rose-800",
  },
  {
    icon: Landmark,
    label: "What are Directive Principles?",
    sub: "Part IV — DPSP",
    color:
      "border-violet-800/40 bg-violet-950/5 text-violet-900 hover:border-violet-800/70 hover:bg-violet-950/10",
    iconColor: "text-violet-800",
  },
  {
    icon: Layers,
    label: "Federal vs Unitary?",
    sub: "Structure of governance",
    color:
      "border-orange-800/40 bg-orange-950/5 text-orange-900 hover:border-orange-800/70 hover:bg-orange-950/10",
    iconColor: "text-orange-800",
  },
];

/* ── Fake AI response generator ─────────────────────────────────────── */
const fakeResponses: Record<string, string> = {
  default:
    "That's a great question about the Constitution of India! The Constitution, adopted on 26 November 1949 and effective from 26 January 1950, is the supreme law of India. It lays down the framework for the country's political system, defines the powers and duties of the government, and guarantees fundamental rights to citizens. Feel free to ask me anything specific — articles, amendments, schedules, or concepts!",
  "article 21":
    "**Article 21** of the Indian Constitution guarantees the **Protection of Life and Personal Liberty**. It states: *'No person shall be deprived of his life or personal liberty except according to procedure established by law.'*\n\nOver time, the Supreme Court has expanded its scope through landmark judgments to include the right to livelihood, right to education, right to health, right to privacy (Puttaswamy case, 2017), and many more. It is considered the most expansive and dynamic article of our Constitution.",
  preamble:
    "The **Preamble** is the introductory statement of the Constitution of India. It reads:\n\n*'WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation…'*\n\nThe 42nd Amendment (1976) added the words **Socialist**, **Secular**, and **Integrity**.",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("article 21")) return fakeResponses["article 21"];
  if (lower.includes("preamble")) return fakeResponses["preamble"];
  return fakeResponses["default"];
}

function now() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ── Typing indicator ───────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-amber-700 animate-bounce"
          style={{ animationDelay: `${i * 0.18}s`, animationDuration: "0.75s" }}
        />
      ))}
    </div>
  );
}

/* ── Message bubble ─────────────────────────────────────────────────── */
function Bubble({ msg }: { msg: Message }) {
  const isAI = msg.role === "ai";
  return (
    <div
      className={`flex items-end gap-3 ${isAI ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      {isAI ? (
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-amber-800/50 bg-amber-950/8 shadow-sm">
          <Zap size={14} strokeWidth={2} className="text-amber-800" />
        </div>
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-slate-300 bg-slate-100 shadow-sm">
          <span className="text-[11px] font-bold text-slate-600 tracking-tight">
            U
          </span>
        </div>
      )}

      <div
        className={`flex max-w-[75%] sm:max-w-[68%] flex-col gap-1 ${isAI ? "items-start" : "items-end"}`}
      >
        <div
          className={`relative rounded-2xl px-4 py-3 text-[13.5px] leading-[1.8] ${
            isAI
              ? "rounded-bl-sm bg-white border-[1.5px] border-slate-200 text-slate-800 shadow-sm"
              : "rounded-br-sm bg-amber-900 text-amber-50 shadow-md"
          }`}
        >
          {msg.text.split("\n").map((line, i) => (
            <p key={i} className={line === "" ? "h-2" : ""}>
              {line
                .split(/(\*\*[^*]+\*\*)/g)
                .map((chunk, j) =>
                  chunk.startsWith("**") && chunk.endsWith("**") ? (
                    <strong
                      key={j}
                      className={
                        isAI ? "font-semibold text-slate-900" : "font-semibold"
                      }
                    >
                      {chunk.slice(2, -2)}
                    </strong>
                  ) : chunk.startsWith("*") && chunk.endsWith("*") ? (
                    <em key={j} className="italic opacity-80">
                      {chunk.slice(1, -1)}
                    </em>
                  ) : (
                    chunk
                  )
                )}
            </p>
          ))}
        </div>
        <span className="text-[10px] text-slate-400 px-1">{msg.time}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "ai",
      text: "Namaste! I'm **Samvi**, your AI guide to the Constitution of India.\n\nAsk me anything — articles, amendments, fundamental rights, schedules, or any constitutional concept. I'm here to make learning simple and insightful.",
      time: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      time: now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          text: getAIResponse(text),
          time: now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      },
      1400 + Math.random() * 800
    );
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "reset",
        role: "ai",
        text: "Chat cleared. Ready for your next constitutional question.",
        time: now(),
      },
    ]);
  };

  const history = [
    { label: "Article 21 — Right to Life", time: "Today", icon: Hash },
    { label: "Fundamental Rights overview", time: "Today", icon: Scale },
    { label: "42nd Amendment explained", time: "Yesterday", icon: RefreshCw },
    { label: "Directive Principles vs FR", time: "2 days ago", icon: Layers },
    { label: "Preamble deep dive", time: "3 days ago", icon: AlignLeft },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f7f5f2] font-[system-ui]">

      {/* ══ SIDEBAR ══════════════════════════════════════════════════ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/25 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-40 flex h-full w-[272px] flex-col
          bg-white
          border-r-[1.5px] border-slate-300
          shadow-[6px_0_32px_rgba(0,0,0,0.08)]
          transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
          lg:relative lg:translate-x-0 lg:shadow-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-800" />

        {/* Brand */}
        <div className="flex items-center justify-between border-b-[1.5px] border-slate-200 px-5 py-4">
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-amber-800/40 bg-amber-950/5 shadow-sm">
              <Image
                src="/image/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-[14px] font-black text-slate-900 tracking-tight">
                Know<span className="text-amber-800">Samvidhan</span>
              </div>
              <div className="text-[8.5px] tracking-[0.22em] text-slate-400 uppercase font-medium">
                AI Assistant
              </div>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border-[1.5px] border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-colors lg:hidden"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>

        {/* New chat */}
        <div className="px-4 py-4">
          <button
            onClick={clearChat}
            className="
              group flex w-full items-center justify-center gap-2
              rounded-xl border-[1.5px] border-amber-800/35
              bg-amber-950/5 py-2.5
              text-[12.5px] font-semibold text-amber-900
              transition-all duration-200
              hover:border-amber-800/60 hover:bg-amber-950/8
              active:scale-[0.98]
            "
          >
            <Plus size={14} strokeWidth={2.5} />
            New Conversation
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[2px] text-slate-400">
            Recent Chats
          </p>
          <div className="flex flex-col gap-0.5">
            {history.map((h, i) => {
              const Icon = h.icon;
              return (
                <button
                  key={i}
                  className={`
                    group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left
                    transition-all duration-150
                    ${
                      i === 0
                        ? "bg-amber-950/6 border-[1.5px] border-amber-800/25"
                        : "hover:bg-slate-50 border-[1.5px] border-transparent"
                    }
                  `}
                >
                  <Icon
                    size={13}
                    strokeWidth={2}
                    className={i === 0 ? "text-amber-800 shrink-0" : "text-slate-400 shrink-0 group-hover:text-slate-600"}
                  />
                  <div className="flex-1 min-w-0">
                    <span
                      className={`block text-[12px] font-medium leading-snug truncate ${
                        i === 0
                          ? "text-amber-900"
                          : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {h.label}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                      <Clock size={9} strokeWidth={2} />
                      {h.time}
                    </span>
                  </div>
                  <ChevronRight
                    size={12}
                    strokeWidth={2}
                    className="text-slate-300 group-hover:text-slate-500 shrink-0 transition-colors"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar footer */}
        <div className="border-t-[1.5px] border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2.5 rounded-xl border-[1.5px] border-transparent p-2 hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-900 border-[1.5px] border-amber-800 text-[11px] font-bold text-amber-100 shadow-sm shrink-0">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold text-slate-800 truncate">
                Guest User
              </p>
              <p className="text-[10px] text-slate-400">Free plan</p>
            </div>
            <Settings size={13} strokeWidth={2} className="text-slate-400 shrink-0" />
          </div>
        </div>
      </aside>

      {/* ══ MAIN CHAT AREA ═══════════════════════════════════════════ */}
      <div className="relative flex flex-1 flex-col overflow-hidden min-w-0">

        {/* Subtle dot grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, #92400e18 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── TOP HEADER ── */}
        <header className="relative z-10 flex items-center justify-between border-b-[1.5px] border-slate-200 bg-white/85 px-4 py-3 backdrop-blur-xl sm:px-6">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-800" />

          <div className="flex items-center gap-3">
            {/* Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border-[1.5px] border-slate-300 bg-white text-slate-500 transition-all duration-200 hover:border-amber-800/50 hover:text-amber-800 lg:hidden"
            >
              <Menu size={16} strokeWidth={2} />
            </button>

            {/* Samvi identity */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-amber-800/50 bg-amber-950/6 shadow-sm">
                  <Scale size={17} strokeWidth={1.8} className="text-amber-800" />
                </div>
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-emerald-600">
                  <span className="h-1 w-1 animate-ping rounded-full bg-emerald-400" />
                </span>
              </div>
              <div>
                <p className="text-[14px] font-black text-slate-900 tracking-tight leading-none">
                  Samvi <span className="text-amber-800">AI</span>
                </p>
                <p className="text-[10px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                  <Circle size={6} fill="currentColor" className="text-emerald-500" />
                  Online · Constitutional Expert
                </p>
              </div>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              title="Clear chat"
              className="flex h-8 w-8 items-center justify-center rounded-lg border-[1.5px] border-slate-200 bg-white text-slate-400 transition-all duration-150 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 size={13} strokeWidth={2} />
            </button>
            <Link
              href="/"
              className="flex h-8 items-center gap-1.5 rounded-lg border-[1.5px] border-slate-200 bg-white px-3 text-[12px] font-medium text-slate-600 no-underline transition-all duration-150 hover:border-amber-800/40 hover:text-amber-800"
            >
              <ChevronLeft size={13} strokeWidth={2.5} />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
        </header>

        {/* ── MESSAGES ── */}
        <div className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">

          {/* Empty state suggestions */}
          {messages.length === 1 && (
            <div className="mb-8">
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-[1.5px] border-amber-800/35 bg-white shadow-sm">
                  <BookOpen size={22} strokeWidth={1.6} className="text-amber-800" />
                </div>
                <h2 className="text-[20px] sm:text-[23px] font-black text-slate-900 tracking-tight leading-tight">
                  What shall we explore{" "}
                  <span className="text-amber-800">today?</span>
                </h2>
                <p className="mt-1.5 text-[13px] text-slate-500">
                  Ask Samvi anything about the Constitution of India
                </p>
              </div>

              {/* Suggestion grid */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {suggestions.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.label}
                      onClick={() => send(s.label)}
                      className={`
                        group flex items-center gap-3 rounded-xl border-[1.5px]
                        px-4 py-3.5 text-left
                        transition-all duration-200
                        hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]
                        ${s.color}
                      `}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-current/20 bg-white/60 shadow-sm">
                        <Icon size={15} strokeWidth={2} className={s.iconColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[12.5px] font-semibold leading-tight">
                          {s.label}
                        </span>
                        <span className="block text-[10.5px] opacity-60 mt-0.5">
                          {s.sub}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={13}
                        strokeWidth={2}
                        className="shrink-0 opacity-30 transition-all duration-200 group-hover:opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex flex-col gap-5">
            {messages.map((msg) => (
              <Bubble key={msg.id} msg={msg} />
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex items-end gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-amber-800/50 bg-amber-950/6">
                  <Zap size={14} strokeWidth={2} className="text-amber-800" />
                </div>
                <div className="rounded-2xl rounded-bl-sm border-[1.5px] border-slate-200 bg-white shadow-sm">
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* ── INPUT BAR ── */}
        <div className="relative border-t-[1.5px] border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-800/20 to-transparent" />

          <div className="mx-auto max-w-4xl">
            <div
              className="
                flex items-end gap-2.5 rounded-2xl
                border-[1.5px] border-slate-300
                bg-white p-2
                shadow-sm
                transition-all duration-200
                focus-within:border-amber-800/60
                focus-within:shadow-[0_0_0_3px_rgba(120,53,15,0.08)]
              "
            >
              {/* Doc icon */}
              <div className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-[1.5px] border-slate-200 bg-slate-50">
                <FileText size={14} strokeWidth={2} className="text-slate-500" />
              </div>

              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about any Article, Amendment, or constitutional concept…"
                rows={1}
                className="flex-1 resize-none bg-transparent py-1.5 text-[13.5px] text-slate-800 placeholder-slate-400 outline-none leading-relaxed"
                style={{ maxHeight: "120px" }}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = Math.min(el.scrollHeight, 120) + "px";
                }}
              />

              {/* Send button */}
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || typing}
                className="
                  group relative mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center
                  overflow-hidden rounded-xl
                  bg-amber-900
                  border-[1.5px] border-amber-800
                  transition-all duration-200
                  disabled:opacity-35
                  enabled:hover:-translate-y-0.5
                  enabled:hover:shadow-md
                  enabled:active:scale-95
                "
              >
                {/* Shimmer */}
                <span className="absolute inset-0 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[200%]" />
                <Send size={14} strokeWidth={2} className="relative text-amber-100 -translate-x-px" />
              </button>
            </div>

            {/* Hint row */}
            <div className="mt-2 flex items-center justify-between px-1">
              <span className="text-[10.5px] text-slate-400">
                <kbd className="rounded border-[1.5px] border-slate-200 bg-slate-50 px-1 py-0.5 font-mono text-[9px] text-slate-500">
                  Enter
                </kbd>{" "}
                to send ·{" "}
                <kbd className="rounded border-[1.5px] border-slate-200 bg-slate-50 px-1 py-0.5 font-mono text-[9px] text-slate-500">
                  Shift+Enter
                </kbd>{" "}
                for new line
              </span>
              <span className="text-[10.5px] text-slate-400">
                Powered by{" "}
                <span className="font-semibold text-amber-800">Samvi AI</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}