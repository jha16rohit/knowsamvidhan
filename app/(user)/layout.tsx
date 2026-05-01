"use client";

import Navbar from "@/components/Navbar";
import AIVideo from "@/components/AIVideo";
import { usePathname } from "next/navigation";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isChatPage = pathname.startsWith("/user_chat");

  return (
    <>
      <Navbar />
      {children}

      {/* ❌ Hide on chat page */}
      {!isChatPage && <AIVideo />}
    </>
  );
}