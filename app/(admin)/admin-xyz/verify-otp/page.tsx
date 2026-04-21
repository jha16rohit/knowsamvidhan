"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password reset successful ✅");

        // 👉 redirect to login
        router.push("/admin-xyz");
      } else {
        alert(data.error || "Invalid OTP");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px] text-center">

        <h1 className="text-2xl font-semibold mb-2">Verify OTP</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter OTP sent to your email
        </p>

        {/* OTP INPUT */}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-center tracking-widest"
        />

        {/* PASSWORD INPUT */}
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* BUTTON */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
        >
          {loading ? "Verifying..." : "Verify & Reset"}
        </button>

        <p className="text-xs text-gray-400 mt-4">
          OTP valid for 10 minutes
        </p>

      </div>
    </div>
  );
}