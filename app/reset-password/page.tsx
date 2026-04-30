"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const token = useSearchParams().get("token");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword: password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Password updated");
      router.push("/admin-xyz");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white shadow rounded `w-[350px]`">
        <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

        <input
          type="password"
          placeholder="New password"
          className="w-full border p-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}