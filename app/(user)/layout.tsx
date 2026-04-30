"use client";

import Navbar from "@/components/Navbar";
import AIVideo from "@/components/AIVideo";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      {/* Page Content */}
      {children}

      {/* 🔥 Floating AI Video (global on user side) */}
      <AIVideo />
    </>
  );
}