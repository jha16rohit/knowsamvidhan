"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  User, Bell, BookOpen, Eye, EyeOff, Check, Camera, ChevronRight,
} from "lucide-react";

// ─── Toast ────────────────────────────────────────────────
function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 right-8 z-50 bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0">
        <Check className="w-4 h-4 text-white" strokeWidth={3} />
      </div>
      <span className="text-sm font-bold text-gray-900">{message}</span>
    </div>
  );
}

// ─── Toggle Switch ────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-[#f59e0b]" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

// ─── Tab Button ───────────────────────────────────────────
function TabBtn({ active, icon: Icon, label, onClick }: { active: boolean; icon: React.ElementType; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all w-full text-left ${active ? "bg-[#0f172a] text-[#f59e0b]" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"}`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {label}
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}

const inp = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent text-sm text-gray-800 shadow-sm transition";

// ══════════════════════════════════════════════════════════
// TAB 1 — MY PROFILE
// ══════════════════════════════════════════════════════════
function ProfileTab({ showToast }: { showToast: (m: string) => void }) {
  const [profile, setProfile] = useState({ name: "Admin", email: "admin@knowsamvidhan.in", bio: "Managing KnowSamvidhan's content and users." });
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Info Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
        <h3 className="text-lg font-bold font-serif text-gray-900 mb-6">Profile info</h3>
        <div className="flex items-center gap-5 mb-7">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center text-2xl font-bold font-serif select-none">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <label className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#f59e0b] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ea580c] transition-colors shadow">
              <Camera className="w-3.5 h-3.5 text-gray-900" />
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{profile.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{profile.email}</p>
            <p className="text-[11px] text-[#f59e0b] font-semibold mt-1 uppercase tracking-wider">Administrator</p>
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); showToast("Profile updated ✓"); }} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full name</label>
              <input type="text" className={inp} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
              <input type="email" className={inp} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Short bio</label>
            <textarea rows={2} className={inp + " resize-none"} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">Save profile</button>
          </div>
        </form>
      </div>

      {/* Change Password Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
        <h3 className="text-lg font-bold font-serif text-gray-900 mb-6">Change password</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pw.next !== pw.confirm) { showToast("Passwords don't match ❌"); return; }
            if (pw.next.length < 8) { showToast("Min 8 characters ❌"); return; }
            showToast("Password changed ✓");
            setPw({ current: "", next: "", confirm: "" });
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Current password</label>
            <div className="relative">
              <input type={showCur ? "text" : "password"} required className={inp + " pr-11"} placeholder="Enter current password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
              <button type="button" onClick={() => setShowCur(!showCur)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                {showCur ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">New password</label>
              <div className="relative">
                <input type={showNew ? "text" : "password"} required className={inp + " pr-11"} placeholder="Min 8 characters" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Confirm new password</label>
              <input type="password" required className={inp} placeholder="Repeat new password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-[#0f172a] hover:bg-[#1e2638] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">Update password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB 2 — NOTIFICATIONS
// ══════════════════════════════════════════════════════════
type NotifKey = "newUser" | "userBlocked" | "quizAttempt" | "lowScore" | "feedbackReceived" | "articleCreated" | "amendmentAdded" | "adminLogin" | "failedLogin";

function NotificationsTab({ showToast }: { showToast: (m: string) => void }) {
  const [notifs, setNotifs] = useState<Record<NotifKey, boolean>>({
    newUser: true, userBlocked: true, quizAttempt: false, lowScore: true,
    feedbackReceived: true, articleCreated: false, amendmentAdded: true,
    adminLogin: true, failedLogin: true,
  });

  const groups: { label: string; items: { key: NotifKey; title: string; desc: string }[] }[] = [
    {
      label: "Users",
      items: [
        { key: "newUser", title: "New user registration", desc: "When a new user signs up on the platform" },
        { key: "userBlocked", title: "User blocked / suspended", desc: "When a user's status changes to Blocked or Suspended" },
      ],
    },
    {
      label: "Quizzes",
      items: [
        { key: "quizAttempt", title: "Quiz attempted", desc: "Every time any user completes a quiz" },
        { key: "lowScore", title: "Low score alert", desc: "When a user scores below 40% on any quiz" },
      ],
    },
    {
      label: "Content",
      items: [
        { key: "feedbackReceived", title: "New feedback submitted", desc: "When a user submits a rating or comment" },
        { key: "articleCreated", title: "Article created", desc: "When a new article is added to the database" },
        { key: "amendmentAdded", title: "Amendment added", desc: "When a new constitutional amendment is created" },
      ],
    },
    {
      label: "Security",
      items: [
        { key: "adminLogin", title: "Admin login", desc: "When an admin account logs in" },
        { key: "failedLogin", title: "Failed login attempts", desc: "When multiple failed login attempts are detected" },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
      <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">Notification preferences</h3>
      <p className="text-sm text-gray-400 mb-7">Choose which events trigger an alert in your admin panel.</p>
      <div className="flex flex-col gap-7">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">{group.label}</p>
            <div className="flex flex-col divide-y divide-gray-50 border border-gray-100 rounded-xl overflow-hidden">
              {group.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/60 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle checked={notifs[item.key]} onChange={(v) => setNotifs((prev) => ({ ...prev, [item.key]: v }))} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-7">
        <button onClick={() => showToast("Preferences saved ✓")} className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">
          Save preferences
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB 3 — QUIZ & CONTENT CONFIG
// ══════════════════════════════════════════════════════════
function ContentTab({ showToast }: { showToast: (m: string) => void }) {
  const [quiz, setQuiz] = useState({ defaultTime: 10, defaultLevel: "beginner", defaultStatus: "draft", allowRetake: true, showExplanation: true, randomiseQuestions: false });
  const [content, setContent] = useState({ featuredLimit: 6, autoPublish: false, requireSummary: true, requireExample: false });

  const selectStyle = { backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1em", appearance: "none" as const };

  return (
    <form onSubmit={(e) => { e.preventDefault(); showToast("Configuration saved ✓"); }} className="flex flex-col gap-6">

      {/* Quiz defaults */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
        <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">Quiz defaults</h3>
        <p className="text-sm text-gray-400 mb-6">Applied automatically when creating a new quiz.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Time (minutes)</label>
            <input type="number" min={1} max={120} className={inp} value={quiz.defaultTime} onChange={(e) => setQuiz({ ...quiz, defaultTime: +e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Level</label>
            <select className={inp} value={quiz.defaultLevel} onChange={(e) => setQuiz({ ...quiz, defaultLevel: e.target.value })} style={selectStyle}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
            <select className={inp} value={quiz.defaultStatus} onChange={(e) => setQuiz({ ...quiz, defaultStatus: e.target.value })} style={selectStyle}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-gray-50 border border-gray-100 rounded-xl overflow-hidden">
          {[
            { key: "allowRetake" as const, title: "Allow quiz retakes", desc: "Users can attempt the same quiz more than once" },
            { key: "showExplanation" as const, title: "Show answer explanation", desc: "Display explanation after each question is answered" },
            { key: "randomiseQuestions" as const, title: "Randomise question order", desc: "Shuffle questions every time the quiz is taken" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/60 transition-colors">
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <Toggle checked={quiz[item.key]} onChange={(v) => setQuiz({ ...quiz, [item.key]: v })} />
            </div>
          ))}
        </div>
      </div>

      {/* Article defaults */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
        <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">Article defaults</h3>
        <p className="text-sm text-gray-400 mb-6">Controls for article creation and homepage display.</p>
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Max featured articles on homepage</label>
          <div className="flex items-center gap-4">
            <input type="range" min={1} max={20} className="flex-1 accent-[#f59e0b]" value={content.featuredLimit} onChange={(e) => setContent({ ...content, featuredLimit: +e.target.value })} />
            <span className="w-10 text-center text-sm font-bold text-gray-800 bg-gray-100 rounded-lg py-1">{content.featuredLimit}</span>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-gray-50 border border-gray-100 rounded-xl overflow-hidden">
          {[
            { key: "autoPublish" as const, title: "Auto-publish new articles", desc: "Skip draft — articles go live immediately on save" },
            { key: "requireSummary" as const, title: "Require short summary", desc: "Block saving an article without a short summary" },
            { key: "requireExample" as const, title: "Require example field", desc: "Block saving an article without an example" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/60 transition-colors">
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <Toggle checked={content[item.key]} onChange={(v) => setContent({ ...content, [item.key]: v })} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">Save configuration</button>
      </div>
    </form>
  );
}

// ══════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════
type Tab = "profile" | "notifications" | "content";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
    { id: "profile", icon: User, label: "My profile" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "content", icon: BookOpen, label: "Quiz & content" },
  ];

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">
      {toast && <Toast message={toast} />}
      <AdminSidebar />

      <main className="pl-72 flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-8 lg:p-10">

          {/* Header */}
          <div className="mb-8">
            <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Admin</p>
            <h2 className="text-4xl font-serif text-gray-900 font-bold mb-2">Settings</h2>
            <p className="text-sm text-gray-500">Manage your profile, alerts and content configuration.</p>
          </div>

          <div className="flex gap-6 items-start">
            {/* Tab rail */}
            <div className="w-48 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-2 flex flex-col gap-1 sticky top-8">
              {tabs.map((t) => (
                <TabBtn key={t.id} active={activeTab === t.id} icon={t.icon} label={t.label} onClick={() => setActiveTab(t.id)} />
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {activeTab === "profile" && <ProfileTab showToast={showToast} />}
              {activeTab === "notifications" && <NotificationsTab showToast={showToast} />}
              {activeTab === "content" && <ContentTab showToast={showToast} />}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}