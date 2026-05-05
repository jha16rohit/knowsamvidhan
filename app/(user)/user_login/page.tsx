"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data?.error || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "ADMIN") {
        window.location.replace("/ad-dashboard");
      } else {
        window.location.replace("/");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        style={{
          flex: "0 0 52%",
          background: "linear-gradient(160deg, #0f1f3d 0%, #1a2e52 60%, #0f1f3d 100%)",
          position: "relative" as const,
          display: "flex",
          flexDirection: "column" as const,
          justifyContent: "space-between",
          padding: "36px 52px 36px",
          overflow: "hidden",
        }}
      >
        {/* Decorative circle — bottom left */}
        <div
          style={{
            position: "absolute" as const,
            bottom: -120,
            left: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            border: "2px solid rgba(196,130,50,0.25)",
            pointerEvents: "none" as const,
          }}
        />
        <div
          style={{
            position: "absolute" as const,
            bottom: -60,
            left: -40,
            width: 340,
            height: 340,
            borderRadius: "50%",
            border: "1px solid rgba(196,130,50,0.12)",
            pointerEvents: "none" as const,
          }}
        />
        {/* Soft glow blob */}
        <div
          style={{
            position: "absolute" as const,
            bottom: 80,
            left: 80,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,130,50,0.15) 0%, transparent 70%)",
            pointerEvents: "none" as const,
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, zIndex: 1 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#1e3a5f",
              border: "2px solid rgba(196,130,50,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            🏛️
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#f1f5f9", letterSpacing: -0.3 }}>
              Know<span style={{ color: "#f97316" }}>Samvidhan</span>
            </div>
            <div style={{ fontSize: 9, letterSpacing: 2.5, color: "#64748b", textTransform: "uppercase" as const }}>
              Constitution · Learn · Master
            </div>
          </div>
        </div>

        {/* Hero text */}
        <div style={{ zIndex: 1, maxWidth: 420 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
              color: "#f97316",
              textTransform: "uppercase" as const,
              marginBottom: 20,
            }}
          >
            Welcome Back
          </div>
          <h1
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.15,
              margin: "0 0 20px",
              fontFamily: "'Georgia', serif",
            }}
          >
            Continue your journey through the Constitution.
          </h1>
          <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>
            Pick up where you left off — your bookmarks, quiz streaks and progress are waiting.
          </p>
        </div>

        {/* Bottom quote */}
        <div style={{ zIndex: 1 }}>
          <p style={{ fontSize: 13, color: "#475569", margin: 0, fontStyle: "italic" }}>
          &quot;We the people of India...&quot; — Preamble of the Constitution
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        style={{
          flex: 1,
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 40px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>
          {/* Heading */}
          <h2
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 8px",
              fontFamily: "'Georgia', serif",
            }}
          >
            Log in
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 32px" }}>
            New here?{" "}
            <a href="/signup" style={{ color: "#f97316", fontWeight: 600, textDecoration: "none" }}>
              Create an account
            </a>
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>
                Email
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 10,
                  padding: "12px 14px",
                  background: "#fff",
                  transition: "border-color 0.15s",
                }}
              >
                <span style={{ fontSize: 16, color: "#94a3b8" }}>✉</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: 14,
                    color: "#0f172a",
                    background: "transparent",
                    fontFamily: "system-ui, sans-serif",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  style={{ background: "none", border: "none", fontSize: 13, color: "#64748b", cursor: "pointer", fontFamily: "system-ui, sans-serif" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 10,
                  padding: "12px 14px",
                  background: "#fff",
                }}
              >
                <span style={{ fontSize: 16, color: "#94a3b8" }}>🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: 14,
                    color: "#0f172a",
                    background: "transparent",
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: showPassword ? "normal" : "0.15em",
                  }}
                />
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label
                style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#475569" }}
              >
                <div
                  onClick={() => setRememberMe((r) => !r)}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: rememberMe ? "2px solid #f97316" : "2px solid #cbd5e1",
                    background: rememberMe ? "#fff7ed" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "all 0.15s",
                  }}
                >
                  {rememberMe && (
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316" }} />
                  )}
                </div>
                Remember me
              </label>
              <a href="/forgot-password" style={{ fontSize: 13, color: "#f97316", fontWeight: 600, textDecoration: "none" }}>
                Forgot password?
              </a>
            </div>

            {/* Login button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                background: "linear-gradient(90deg, #f97316, #f59e0b)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "opacity 0.15s",
                letterSpacing: 0.2,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.92")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Log in →
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 1.5, textTransform: "uppercase" as const }}>
                or continue with
              </span>
              <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            </div>

            {/* Google button */}
            <button
              type="button"
              style={{
                width: "100%",
                padding: "13px",
                background: "#fff",
                border: "1.5px solid #e2e8f0",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                color: "#0f172a",
                cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
              {/* Google G logo */}
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
