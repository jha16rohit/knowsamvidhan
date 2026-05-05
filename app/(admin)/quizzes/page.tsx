"use client";

import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  GraduationCap, Plus, Pencil, Trash2, Eye, Copy, ChevronLeft, 
  ChevronRight, Search, Filter, Check, ClipboardList, BarChart2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuizListItem {
  id: string;
  title: string;
  level: "basic" | "intermediate" | "advanced";
  status: "draft" | "published";
  createdAt: string;
  questionCount: number;
}

interface QuestionForm {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string;
}

interface Stats {
  totalQuizzes: number;
  totalQuestions: number;
  publishedQuizzes: number;
}

interface Pagination {
  page: number;
  totalPages: number;
  total: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LEVELS = ["basic", "intermediate", "advanced"] as const;
type Level = (typeof LEVELS)[number];

const LEVEL_COLORS: Record<Level, string> = {
  basic:        "bg-green-50 text-green-700 border border-green-200",
  intermediate: "bg-orange-50 text-orange-600 border border-orange-200",
  advanced:     "bg-red-50 text-red-600 border border-red-200",
};

const LEVEL_REQUIRED: Record<Level, number> = {
  basic: 10,
  intermediate: 15,
  advanced: 30,
};

function makeQuestion(): QuestionForm {
  return {
    id: crypto.randomUUID(),
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    explanation: "",
  };
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-8 right-8 z-50 bg-white px-5 py-3.5 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
      <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0">
        <Check className="w-4 h-4 text-white" strokeWidth={3} />
      </div>
      <span className="text-sm font-semibold text-gray-900">{message}</span>
    </div>
  );
}

// ─── Root Page ────────────────────────────────────────────────────────────────

export default function QuizzesPage() {
  const [view, setView]               = useState<"manage" | "create">("manage");
  const [editingQuiz, setEditingQuiz] = useState<QuizListItem | null>(null);
  const [toast, setToast]             = useState<string | null>(null);

  const showToast  = (msg: string) => setToast(msg);
  const handleCreate = () => { setEditingQuiz(null); setView("create"); };
  const handleEdit   = (quiz: QuizListItem) => { setEditingQuiz(quiz); setView("create"); };
  const handleBack   = (msg?: string) => {
    setEditingQuiz(null);
    setView("manage");
    if (msg) showToast(msg);
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      <AdminSidebar />

      <main className="pl-72 flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {view === "manage" ? (
            <ManageView
              onCreateNew={handleCreate}
              onEdit={handleEdit}
              showToast={showToast}
            />
          ) : (
            <CreateView onBack={handleBack} editingQuiz={editingQuiz} />
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Manage View ──────────────────────────────────────────────────────────────

function ManageView({
  onCreateNew,
  onEdit,
  showToast,
}: {
  onCreateNew: () => void;
  onEdit: (quiz: QuizListItem) => void;
  showToast: (msg: string) => void;
}) {
  const [quizzes, setQuizzes]         = useState<QuizListItem[]>([]);
  const [stats, setStats]             = useState<Stats>({ totalQuizzes: 0, totalQuestions: 0, publishedQuizzes: 0 });
  const [pagination, setPagination]   = useState<Pagination>({ page: 1, totalPages: 1, total: 0 });
  const [levelFilter, setLevelFilter] = useState("all");
  const [search, setSearch]           = useState("");
  const [loading, setLoading]         = useState(true);
  const [deleteId, setDeleteId]       = useState<string | null>(null);
  const [deleting, setDeleting]       = useState(false);

  const fetchQuizzes = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (levelFilter !== "all") params.set("level", levelFilter);
      if (search) params.set("search", search);
      const res  = await fetch(`/api/admin/quizzes?${params}`);
      const data = await res.json();
      setQuizzes(data.quizzes || []);
      setStats(data.stats   || { totalQuizzes: 0, totalQuestions: 0, publishedQuizzes: 0 });
      setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 });
    } catch {
      console.error("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  }, [levelFilter, search]);

  useEffect(() => {
    const t = setTimeout(() => fetchQuizzes(1), 300);
    return () => clearTimeout(t);
  }, [fetchQuizzes]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/quizzes/${deleteId}`, { method: "DELETE" });
      showToast("Quiz deleted successfully");
      fetchQuizzes(pagination.page);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-8 lg:p-10">

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Content</p>
          <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Manage Quizzes</h2>
          <p className="text-sm text-gray-500">Create and manage quizzes for different difficulty levels.</p>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 rounded-lg text-sm font-semibold transition-colors shadow-sm self-start mt-2 md:mt-0"
        >
          <Plus className="w-4 h-4" />
          Create New Quiz
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            Icon: ClipboardList, bg: "bg-green-50",  color: "text-green-600",
            label: "Total Quizzes",     value: stats.totalQuizzes,     sub: "Across all levels",
          },
          {
            Icon: BarChart2,     bg: "bg-blue-50",   color: "text-blue-600",
            label: "Total Questions",   value: stats.totalQuestions,   sub: "Across all quizzes",
          },
          {
            Icon: GraduationCap, bg: "bg-purple-50", color: "text-purple-600",
            label: "Published Quizzes", value: stats.publishedQuizzes, sub: "Active and available",
          },
        ].map(({ Icon, bg, color, label, value, sub }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">{label}</p>
              <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">All Quizzes</h3>
          <div className="flex items-center gap-3">
            {/* Level filter */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="text-sm text-gray-700 bg-transparent focus:outline-none"
              >
                <option value="all">All Levels</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search quizzes..."
                className="text-sm text-gray-700 bg-transparent focus:outline-none w-40"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Quiz Title", "Level", "Questions", "Created At", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-14 text-gray-400 text-sm">
                    Loading...
                  </td>
                </tr>
              ) : quizzes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-14">
                    <div className="flex flex-col items-center gap-2">
                      <GraduationCap className="w-8 h-8 text-gray-300" />
                      <p className="text-gray-400 text-sm">No quizzes found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                quizzes.map((quiz) => (
                  <tr key={quiz.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-800">{quiz.title}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${LEVEL_COLORS[quiz.level]}`}>
                        {quiz.level}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{quiz.questionCount}</td>
                    <td className="px-5 py-3.5 text-gray-500">
                      {new Date(quiz.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "2-digit", year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                        quiz.status === "published"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}>
                        {quiz.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          title="View"
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Edit"
                          onClick={() => onEdit(quiz)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => setDeleteId(quiz.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-red-400 hover:border-red-300 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 text-sm text-gray-500 border-t border-gray-100">
          <span>
            Showing {quizzes.length > 0 ? (pagination.page - 1) * 6 + 1 : 0} to{" "}
            {Math.min(pagination.page * 6, pagination.total)} of {pagination.total} quizzes
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => fetchQuizzes(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => fetchQuizzes(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm transition-colors ${
                  p === pagination.page
                    ? "bg-[#f59e0b] text-white border-[#f59e0b]"
                    : "border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => fetchQuizzes(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Delete this Quiz?</h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              This will permanently remove the quiz and all its questions. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Create / Edit View ───────────────────────────────────────────────────────

function CreateView({
  onBack,
  editingQuiz,
}: {
  onBack: (msg?: string) => void;
  editingQuiz: QuizListItem | null;
}) {
  const isEdit = !!editingQuiz;

  const [title, setTitle]         = useState(editingQuiz?.title || "");
  const [level, setLevel]         = useState<Level | "">(editingQuiz?.level || "");
  const [questions, setQuestions] = useState<QuestionForm[]>([makeQuestion()]);
  const [saving, setSaving]       = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});

  // Load questions when editing
  useEffect(() => {
    if (!editingQuiz) return;
    fetch(`/api/admin/quizzes/${editingQuiz.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.quiz?.questions) {
          setQuestions(
            data.quiz.questions.map((q: {
              id: string; questionText: string;
              optionA: string; optionB: string; optionC: string; optionD: string;
              correctAnswer: string; explanation?: string;
            }) => ({
              id: q.id,
              questionText: q.questionText,
              optionA: q.optionA, optionB: q.optionB,
              optionC: q.optionC, optionD: q.optionD,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation || "",
            }))
          );
        }
      })
      .catch(console.error);
  }, [editingQuiz]);

  const addQuestion       = () => setQuestions((p) => [...p, makeQuestion()]);
  const removeQuestion    = (id: string) => {
    if (questions.length === 1) return;
    setQuestions((p) => p.filter((q) => q.id !== id));
  };
  const duplicateQuestion = (id: string) => {
    const src = questions.find((q) => q.id === id);
    if (!src) return;
    const copy = { ...src, id: crypto.randomUUID() };
    const idx  = questions.findIndex((q) => q.id === id);
    setQuestions((p) => [...p.slice(0, idx + 1), copy, ...p.slice(idx + 1)]);
  };
  const updateQuestion = (id: string, field: keyof QuestionForm, value: string) =>
    setQuestions((p) => p.map((q) => (q.id === id ? { ...q, [field]: value } : q)));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Quiz title is required";
    if (!level)        errs.level = "Please select a level";
    questions.forEach((q, i) => {
      if (!q.questionText.trim()) errs[`q_${i}_text`] = `Question ${i + 1}: text required`;
      if (!q.optionA.trim())      errs[`q_${i}_a`]    = `Question ${i + 1}: Option A required`;
      if (!q.optionB.trim())      errs[`q_${i}_b`]    = `Question ${i + 1}: Option B required`;
      if (!q.optionC.trim())      errs[`q_${i}_c`]    = `Question ${i + 1}: Option C required`;
      if (!q.optionD.trim())      errs[`q_${i}_d`]    = `Question ${i + 1}: Option D required`;
      if (!q.correctAnswer)       errs[`q_${i}_ans`]  = `Question ${i + 1}: correct answer required`;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const url    = isEdit ? `/api/admin/quizzes/${editingQuiz!.id}` : "/api/admin/quizzes";
      const method = isEdit ? "PUT" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, level, questions }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to save quiz");
        return;
      }
      onBack(isEdit ? "Quiz updated successfully" : "Quiz created successfully");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const requiredCount = level ? LEVEL_REQUIRED[level] : null;

  return (
    <div className="p-8 lg:p-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Content</p>
        <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">
          {isEdit ? "Edit Quiz" : "Create New Quiz"}
        </h2>
        <p className="text-sm text-gray-500">
          {isEdit
            ? "Update quiz details and questions."
            : "Add a new quiz and multiple questions for users to practice."}
        </p>
      </div>

      {/* Section 1 — Quiz Details */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs flex items-center justify-center font-bold">
            1
          </span>
          <h3 className="font-semibold text-gray-800">Quiz Details</h3>
        </div>

        <div className="flex gap-4 items-start">
          {/* Title */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Quiz Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quiz title (e.g., Basic Quiz 1)"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] transition-colors ${
                errors.title ? "border-red-300" : "border-gray-200"
              }`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Level */}
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] transition-colors ${
                errors.level ? "border-red-300" : "border-gray-200"
              }`}
            >
              <option value="">Select level</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
              ))}
            </select>
            {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level}</p>}
          </div>

          {/* Guidelines box */}
          <div className="w-52 bg-orange-50 border border-orange-200 rounded-xl p-3 self-start">
            <p className="text-orange-600 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5" />
              Question Guidelines
            </p>
            <ul className="text-xs text-gray-600 space-y-0.5">
              <li><span className="font-medium">Basic:</span> 10 questions</li>
              <li><span className="font-medium">Intermediate:</span> 15 questions</li>
              <li><span className="font-medium">Advanced:</span> 30 questions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 2 — Questions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs flex items-center justify-center font-bold">
              2
            </span>
            <h3 className="font-semibold text-gray-800">Questions</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={addQuestion}
              className="flex items-center gap-1.5 px-3 py-2 border border-[#f59e0b] text-[#f59e0b] rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Question
            </button>
            <span className="text-sm text-gray-500">
              Total Questions:{" "}
              <strong className={requiredCount && questions.length < requiredCount ? "text-red-500" : "text-gray-800"}>
                {questions.length}
              </strong>
              {requiredCount && (
                <span className="text-gray-400"> / {requiredCount} required</span>
              )}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={idx}
              errors={errors}
              onUpdate={updateQuestion}
              onRemove={removeQuestion}
              onDuplicate={duplicateQuestion}
              canRemove={questions.length > 1}
            />
          ))}
        </div>

        {/* Add another CTA */}
        <div className="mt-4 border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
          <button
            onClick={addQuestion}
            className="flex items-center gap-2 mx-auto text-sm text-gray-400 hover:text-[#f59e0b] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Another Question
          </button>
          <p className="text-xs text-gray-400 mt-1">Add as many questions as required for this quiz.</p>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => onBack()}
          className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            Total Questions:{" "}
            <strong className={requiredCount && questions.length < requiredCount ? "text-red-500" : "text-gray-800"}>
              {questions.length}
            </strong>
          </span>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 rounded-xl text-sm font-bold transition-colors shadow-sm disabled:opacity-60"
          >
            {saving ? "Saving..." : isEdit ? "Update Quiz" : "Save Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Question Card ────────────────────────────────────────────────────────────

function QuestionCard({
  question, index, errors, onUpdate, onRemove, onDuplicate, canRemove,
}: {
  question: QuestionForm;
  index: number;
  errors: Record<string, string>;
  onUpdate: (id: string, field: keyof QuestionForm, value: string) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  canRemove: boolean;
}) {
  const f =
    (field: keyof QuestionForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      onUpdate(question.id, field, e.target.value);

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-800">Question {index + 1}</h4>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onDuplicate(question.id)}
            title="Duplicate"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onRemove(question.id)}
            disabled={!canRemove}
            title="Delete"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-red-400 hover:border-red-300 hover:bg-red-50 transition-colors disabled:opacity-30"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Question text */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Question Text</label>
        <textarea
          value={question.questionText}
          onChange={f("questionText")}
          placeholder="Enter your question here..."
          rows={3}
          className={`w-full border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] transition-colors ${
            errors[`q_${index}_text`] ? "border-red-300" : "border-gray-200"
          }`}
        />
        {errors[`q_${index}_text`] && (
          <p className="text-red-500 text-xs mt-1">{errors[`q_${index}_text`]}</p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {(["A", "B", "C", "D"] as const).map((letter) => {
          const field  = `option${letter}` as keyof QuestionForm;
          const errKey = `q_${index}_${letter.toLowerCase()}`;
          return (
            <div key={letter}>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Option {letter}</label>
              <input
                value={question[field] as string}
                onChange={f(field)}
                placeholder={`Enter option ${letter}`}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] transition-colors ${
                  errors[errKey] ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors[errKey] && <p className="text-red-500 text-xs mt-1">{errors[errKey]}</p>}
            </div>
          );
        })}
      </div>

      {/* Correct answer + explanation */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Correct Answer</label>
          <select
            value={question.correctAnswer}
            onChange={f("correctAnswer")}
            className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] transition-colors ${
              errors[`q_${index}_ans`] ? "border-red-300" : "border-gray-200"
            }`}
          >
            <option value="">Select correct option</option>
            {["A", "B", "C", "D"].map((l) => (
              <option key={l} value={l}>Option {l}</option>
            ))}
          </select>
          {errors[`q_${index}_ans`] && (
            <p className="text-red-500 text-xs mt-1">{errors[`q_${index}_ans`]}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Explanation <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            value={question.explanation}
            onChange={f("explanation")}
            placeholder="Explain the correct answer..."
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}