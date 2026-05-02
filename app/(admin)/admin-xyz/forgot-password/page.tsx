"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/admin/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP sent to your email 📩");

        // 👉 go to OTP verify page
        router.push(`/admin-xyz/verify-otp?email=${email}`);
      } else {
        alert(data.error || "Something went wrong");
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
      <div className="p-8 bg-white shadow-lg rounded-xl `w-[350px]` text-center">
        
        <h1 className="text-2xl font-semibold mb-2">Forgot Password</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your admin email to receive OTP
        </p>

        <input
          type="email"
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Secure OTP valid for 10 minutes
        </p>

      </div>
    </div>
  );
}