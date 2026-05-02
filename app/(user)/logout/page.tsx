"use client";

import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    const logout = async () => {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      window.location.replace("/user_login");
    };

    logout();
  }, []);

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui, sans-serif",
        color: "#475569",
      }}
    >
      Signing you out...
    </main>
  );
}
