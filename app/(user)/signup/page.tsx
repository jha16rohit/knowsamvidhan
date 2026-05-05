"use client";

import { useState } from "react";
import { Lock, Mail, User, type LucideIcon } from "lucide-react";

interface InputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  type?: "text" | "password" | "email" | "number";
  icon?: LucideIcon;
  placeholder?: string;
}

function Input({
  label,
  value,
  setValue,
  type = "text",
  icon: Icon,
  placeholder = "",
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ flex: 1 }}>
      <label style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block", color: "#0f172a" }}>
        {label}
      </label>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 14px",
          borderRadius: 12,
          border: focused ? "1px solid #f97316" : "1px solid #e2e8f0",
          background: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
          transition: "border 0.2s ease",
        }}
      >
        {Icon && <Icon size={18} color="#94a3b8" />}
        <input
          type={type}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: 14,
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [otp, setOtp] = useState("");
  const [agree, setAgree] = useState(false);
  const [step, setStep] = useState<"details" | "otp">("details");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    if (!name || !email || !password || !confirm) {
      alert("All fields required");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    if (!agree) {
      alert("Accept terms first");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Registration failed");
        return;
      }

      setStep("otp");
      setMessage(
        data?.devOtp
          ? `OTP sent. Dev OTP: ${data.devOtp}`
          : "OTP sent to your email. Enter it below to finish creating your account."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    if (!otp.trim()) {
      alert("Enter the OTP sent to your email");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/register/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "OTP verification failed");
        return;
      }

      alert("Account verified. You can now log in.");
      window.location.href = "/user_login";
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <div
        style={{
          flex: 1,
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 40px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440 }}>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              marginBottom: 6,
              fontFamily: "'Georgia', serif",
              color: "#0f172a",
            }}
          >
            Create your account
          </h2>

          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28 }}>
            Already have one?{" "}
            <a href="/user_login" style={{ color: "#f97316", fontWeight: 600 }}>
              Log in
            </a>
          </p>

          <form onSubmit={step === "details" ? handleRegister : handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {message && (
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "#fff7ed",
                  color: "#9a3412",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {message}
              </div>
            )}

            {step === "details" ? (
              <>
                <Input label="Full name" icon={User} value={name} setValue={setName} placeholder="Aarav Sharma" />
                <Input label="Email" icon={Mail} value={email} setValue={setEmail} type="email" placeholder="aarav.sharma@example.com" />

                <div style={{ display: "flex", gap: 14 }}>
                  <Input label="Password" icon={Lock} value={password} setValue={setPassword} type="password" placeholder="********" />
                  <Input label="Confirm" icon={Lock} value={confirm} setValue={setConfirm} type="password" placeholder="********" />
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, color: "#475569" }}>
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree((current) => !current)}
                    style={{ width: 16, height: 16, accentColor: "#f97316", cursor: "pointer" }}
                  />
                  I agree to the <span style={{ color: "#f97316", fontWeight: 500 }}>Terms</span> and{" "}
                  <span style={{ color: "#f97316", fontWeight: 500 }}>Privacy Policy</span>
                </label>
              </>
            ) : (
              <Input label="Email OTP" icon={Mail} value={otp} setValue={setOtp} type="number" placeholder="123456" />
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: 8,
                padding: "16px",
                background: "linear-gradient(90deg, #f97316, #f59e0b)",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                fontSize: 16,
                fontWeight: 700,
                cursor: submitting ? "not-allowed" : "pointer",
                boxShadow: "0 10px 25px rgba(249,115,22,0.25)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(event) => (event.currentTarget.style.opacity = "0.92")}
              onMouseLeave={(event) => (event.currentTarget.style.opacity = "1")}
            >
              {submitting ? "Please wait..." : step === "details" ? "Send OTP" : "Verify and create account"}
            </button>
          </form>
        </div>
      </div>

      <div
        style={{
          flex: "0 0 52%",
          background: "linear-gradient(160deg, #0f1f3d 0%, #1a2e52 60%, #0f1f3d 100%)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 64px",
          overflow: "hidden",
          minHeight: "calc(100vh - 72px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-180px",
            top: "50%",
            transform: "translateY(-50%)",
            width: 520,
            height: 520,
            borderRadius: "50%",
            border: "2px solid rgba(196,130,50,0.25)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "50%",
            transform: "translateY(-50%)",
            width: 380,
            height: 380,
            borderRadius: "50%",
            border: "1px solid rgba(196,130,50,0.12)",
            pointerEvents: "none",
          }}
        />

        <div style={{ zIndex: 1, maxWidth: 460 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#f97316", textTransform: "uppercase", marginBottom: 18 }}>
            Join thousands learning the Constitution every day.
          </div>
          <h1
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.2,
              marginBottom: 22,
              fontFamily: "'Metamorphous', serif",
            }}
          >
            Continue your journey through the Constitution.
          </h1>
          <ul style={{ marginTop: 12, color: "#94a3b8", lineHeight: 1.9, fontSize: 15 }}>
            <li>Articles with simple explanations</li>
            <li>AI tutor for constitutional doubts</li>
            <li>Adaptive quizzes and progress tracking</li>
          </ul>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: 64, zIndex: 1 }}>
          <p style={{ fontSize: 13, color: "#64748b", fontStyle: "italic" }}>
            &quot;We the people of India...&quot; - Preamble of the Constitution
          </p>
        </div>
      </div>
    </div>
  );
}
