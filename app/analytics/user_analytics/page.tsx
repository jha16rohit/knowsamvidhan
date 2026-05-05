"use client";

import { useCallback } from "react";
import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {Users, UserPlus,Search,Pencil,Trash2,Ban,ShieldCheck,X,Check} from "lucide-react";

export default function UsersPage() {
  // ================= TYPES =================
  type UIUser = {
    uid: string;
    initials: string;
    name: string;
    email: string;
    role: "User" | "Admin";
    status: "Active" | "Blocked" | "Suspended";
    joined: string;
  };

  type ApiUser = {
    id: string;
    name: string | null;
    email: string;
    role: "USER" | "ADMIN";
    status: "ACTIVE" | "BLOCKED" | "SUSPENDED";
    createdAt: string;
  };

  type UserPayload = {
    id?: string; 
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    password?: string;
  };

  // ================= STATE =================
  const [usersList, setUsersList] = useState<UIUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [openUser, setOpenUser] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    password: "",
  });

  // ================= HELPERS =================
  const mapUser = useCallback((api: ApiUser): UIUser => {
    return {
      uid: api.id,
      initials: api.name
        ? api.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "NA",
      name: api.name ?? "Unknown",
      email: api.email,
      role: api.role === "ADMIN" ? "Admin" : "User",
      status:
        api.status === "ACTIVE"
          ? "Active"
          : api.status === "BLOCKED"
          ? "Blocked"
          : "Suspended",
      joined: new Date(api.createdAt).toLocaleDateString(),
    };
  }, []);

  // ================= FETCH =================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data: ApiUser[] = await res.json();
        setUsersList(data.map(mapUser));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [mapUser]);

  // ================= SEARCH =================
  const filteredUsers = usersList.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // ================= MODAL =================
  const handleOpenModal = (uid: string | null = null) => {
    if (uid !== null) {
      const userToEdit = usersList.find((u) => u.uid === uid);
      if (userToEdit) {
        setFormData({
          name: userToEdit.name,
          email: userToEdit.email,
          role: userToEdit.role,
          password: "", 
        });
        setEditingId(uid);
      }
    } else {
      setFormData({
        name: "",
        email: "",
        role: "Admin",
        password: "",
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // ================= SAVE =================
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const method = editingId ? "PUT" : "POST";
  
      const payload: UserPayload = {
        id: editingId ?? undefined,
        name: formData.name,
        email: formData.email,
        role: formData.role === "Admin" ? "ADMIN" : "USER",
      };
  
      if (!editingId && !formData.password) {
        showToast("Password required ❌");
        return;
      }
  
      if (formData.password?.trim()) {
        payload.password = formData.password;
      }
  
      const res = await fetch("/api/admin/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) throw new Error("Failed to save user");
  
      showToast(
        editingId
          ? `Updated user ${formData.name}`
          : `Invited ${formData.name}`
      );
  
      const updated = await fetch("/api/admin/users");
      const data: ApiUser[] = await updated.json();
      setUsersList(data.map(mapUser));
  
      handleCloseModal();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

 
  // ================= DELETE =================
  const handleDeleteClick = (uid: string) => {
    setDeleteId(uid);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
  
    const userToDelete = usersList.find((u) => u.uid === deleteId);
  
    const res = await fetch(`/api/admin/users?id=${deleteId}`, {
      method: "DELETE",
      credentials: "include",
    });
  
    if (!res.ok) {
      showToast("Delete failed ❌");
      return;
    }
  
    if (userToDelete) showToast(`Deleted ${userToDelete.name}`);
  
    const updated = await fetch("/api/admin/users");
    const data: ApiUser[] = await updated.json();
    setUsersList(data.map(mapUser));
  
    setDeleteId(null);
  };

  // ================= TOAST =================
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (uid: string, status: "Active" | "Blocked" | "Suspended") => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: uid,
          status: status.toUpperCase(), // UI → DB enum
        }),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        showToast(result.error || "Status update failed ❌");
        return;
      }
  
      showToast(`Status updated to ${status}`);
  
      // refresh list
      const updated = await fetch("/api/admin/users");
      const data: ApiUser[] = await updated.json();
      setUsersList(data.map(mapUser));
  
    } catch (err) {
      console.error(err);
      showToast("Something went wrong ❌");
    }
  };

  // ================= TOGGLE STATUS =================
  const toggleStatus = async (uid: string) => {
    const user = usersList.find((u) => u.uid === uid);
    if (!user) return;
  
    const newStatus =
      user.status === "Active" ? "BLOCKED" : "ACTIVE";
  
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: uid,
          status: newStatus,
        }),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        showToast(result.error || "Status update failed ❌");
        return;
      }
  
      showToast(`User ${newStatus.toLowerCase()}`);
  
      // refresh users
      const updated = await fetch("/api/admin/users");
      const data: ApiUser[] = await updated.json();
      setUsersList(data.map(mapUser));
    } catch (err) {
      console.error(err);
      showToast("Something went wrong ❌");
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">
      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-60 bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-900">
            {toastMessage}
          </span>
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      <AdminSidebar />

      {/* ================= MAIN CONTENT ================= */}
      <main className="pl-72 flex-1 flex flex-col min-w-0 overflow-visible">
        <div className="flex-1 overflow-y-auto overflow-x-visible p-8 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">
                People
              </p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">
                Manage users
              </h2>
              <p className="text-sm text-gray-500">
                Invite teammates, manage roles and moderate accounts.
              </p>
            </div>

            <button
              onClick={() => handleOpenModal(null)}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-2 md:mt-0"
            >
              <UserPlus className="w-5 h-5" />
              Create Admin
            </button>
          </div>

          {/* Search Bar - Controlled by State */}
          <div className="mb-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
            />
          </div>

          {/* Conditional Rendering: Empty State vs Table */}
          {filteredUsers.length === 0 ? (
            <div className="w-full bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-24 shadow-sm">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-gray-500" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">
                No users found
              </h3>
              <p className="text-sm text-gray-500">
                Try a different search term.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-visible">
              <div className="overflow-x-auto  overflow-y-visible">
                <table className="w-full text-left border-collapse min-w-225">
                  <thead>
                    <tr className="border-b border-gray-200 bg-white">
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                        User
                      </th>
                      <th className="pl-10 pr-4 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                        Role
                      </th>
                      <th className="pl-17 pr-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                        Joined
                      </th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.uid}
                        className="hover:bg-gray-50/50 transition-colors relative z-0"
                      >
                        {/* USER */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-sm font-bold shrink-0">
                              {user.initials}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* ROLE */}
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              user.role === "Admin"
                                ? "bg-[#0f172a] text-white border-[#0f172a]"
                                : "bg-white text-gray-600 border-gray-200"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-4 relative">
                          <div className="relative inline-block">
                            {/* ACTIVE STATUS BUTTON */}
                            <button
                              onClick={() =>
                                setOpenUser((prev) => (prev === user.uid ? null : user.uid))
                              }
                              className={`
                                px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider
                                border-2 flex items-center gap-2
                                ${
                                  user.status === "Active"
                                    ? "bg-green-50 text-emerald-600 border-emerald-200"
                                    : user.status === "Blocked"
                                    ? "bg-red-50 text-rose-600 border-rose-200"
                                    : "bg-amber-50 text-amber-600 border-amber-200"
                                }
                              `}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  user.status === "Active"
                                    ? "bg-emerald-500"
                                    : user.status === "Blocked"
                                    ? "bg-rose-500"
                                    : "bg-amber-500"
                                }`}
                              />
                              {user.status}
                            </button>

                            {/* INLINE FLOAT OPTIONS */}
                            {openUser === user.uid && (
                              <div
                                className="
                                  absolute
                                  left-1/2 -translate-x-1/2
                                  -top-10
                                  flex items-center gap-2
                                  bg-white border border-gray-200 shadow-lg rounded-full px-2 py-1 z-50

                                  animate-popIn
                                "
                              >
                                {(["Active", "Blocked", "Suspended"] as const).map((status) => {
                                  const isActive = user.status === status;

                                  return (
                                    <button
                                      key={status}
                                      onClick={() => {
                                        updateStatus(user.uid, status);
                                        setOpenUser(null);
                                      }}
                                      className={`
                                        px-3 py-1 rounded-full text-[10px] font-semibold uppercase
                                        border transition-all
                                        ${
                                          status === "Active"
                                            ? isActive
                                              ? "bg-emerald-100 text-emerald-700 border-emerald-400"
                                              : "bg-white text-emerald-500 border-emerald-200 hover:bg-emerald-50"
                                            : status === "Blocked"
                                            ? isActive
                                              ? "bg-rose-100 text-rose-700 border-rose-400"
                                              : "bg-white text-rose-500 border-rose-200 hover:bg-rose-50"
                                            : isActive
                                            ? "bg-amber-100 text-amber-700 border-amber-400"
                                            : "bg-white text-amber-500 border-amber-200 hover:bg-amber-50"
                                        }
                                      `}
                                    >
                                      {status}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* JOINED */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {user.joined}
                        </td>

                        {/* ACTIONS */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-4">
                            <button
                              onClick={() => handleOpenModal(user.uid)}
                              className="text-gray-400 hover:text-gray-900 transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>

                            {user.status === "Active" ? (
                              <button
                                onClick={() => toggleStatus(user.uid)}
                                className="text-red-400 hover:text-red-600 transition-colors"
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => toggleStatus(user.uid)}
                                className="text-[#10b981] hover:text-green-600 transition-colors"
                              >
                                <ShieldCheck className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteClick(user.uid)}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ================= CREATE / EDIT USER MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 md:px-8 md:pt-8 md:pb-4 border-b border-gray-100 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {editingId !== null ? "Edit user" : "Invite user"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {editingId !== null
                    ? "Update teammate details and permissions."
                    : "Send an invite to a new teammate."}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-800 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <form id="user-form" onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Mehta"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rohan@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder={
                      editingId !== null
                        ? "Leave blank to keep current password"
                        : "Enter a secure password"
                    }
                    value={formData.password || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    {editingId !== null
                      ? "Only fill this if you want to update the password."
                      : "Minimum 8 characters recommended."}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Role
                  </label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1em",
                    }}
                  >
                    <option>User</option>
                    <option>Admin</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="p-6 md:px-8 md:py-5 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-gray-50 rounded-b-2xl">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="user-form"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-[#f59e0b] hover:bg-[#ea580c] transition-colors shadow-sm"
              >
                {editingId !== null ? "Save changes" : "Create Admin"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Delete this User?
            </h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              This will permanently delete the user&apos;s account and remove
              their access to the platform. This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#e11d48] hover:bg-[#be123c] transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
