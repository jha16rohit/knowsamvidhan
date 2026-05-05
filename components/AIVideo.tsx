"use client";

import Link from "next/link";
import { useState } from "react";

export default function AIVideo() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/user_chat"
      aria-label="Chat with Samvi AI"
      className="no-underline"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="
          fixed bottom-5 right-5 z-50
          flex flex-col items-center gap-1.5
          cursor-pointer select-none
          group
        "
      >
        {/* Tooltip label — appears above on hover */}
        <div
          className={`
            flex items-center gap-1.5 whitespace-nowrap
            rounded-full border border-orange-500/25
            bg-white px-3 py-1.5
            text-[12px] font-semibold text-orange-600
            shadow-[0_4px_16px_rgba(249,115,22,0.2)]
            backdrop-blur-sm
            transition-all duration-300 ease-out
            ${hovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-95 pointer-events-none"}
          `}
        >
          {/* Pulsing dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>
          Chat with Samvi AI
        </div>

        {/* Avatar container */}
        <div className="relative">
          {/* Outer glow ring — pulses always */}
          <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping [animation-duration:2s]" />
          {/* Middle ring */}
          <div
            className={`
              absolute -inset-1 rounded-full border-2 border-orange-500/40
              transition-all duration-300
              ${hovered ? "scale-110 border-orange-500/70 shadow-[0_0_20px_rgba(249,115,22,0.5)]" : "scale-100"}
            `}
          />

          {/* Main circular container */}
          <div
            className={`
              relative
              w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
              rounded-full overflow-hidden
              border-2 border-white
              shadow-[0_8px_32px_rgba(249,115,22,0.35)]
              transition-all duration-300
              ${hovered ? "scale-110 shadow-[0_12px_40px_rgba(249,115,22,0.5)]" : "scale-100"}
            `}
          >
            {/* VIDEO */}
            <video
              src="/ai-avatar.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Overlay gradient on hover */}
            <div
              className={`
                absolute inset-0 bg-linear-to-t from-orange-600/30 to-transparent
                transition-opacity duration-300
                ${hovered ? "opacity-100" : "opacity-0"}
              `}
            />
          </div>

          {/* "AI" badge — top right corner */}
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-r from-amber-400 to-orange-600 text-[8px] font-black text-white shadow-[0_2px_8px_rgba(249,115,22,0.5)]">
            AI
          </div>

          {/* Online indicator — bottom right */}
          <div className="absolute bottom-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-sm">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-300" />
          </div>
        </div>

        {/* Label below */}
        <div
          className={`
            rounded-full bg-white/90 backdrop-blur-sm border border-gray-100
            px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[1px] text-gray-600
            shadow-sm
            transition-all duration-300
            ${hovered ? "text-orange-600 border-orange-500/25" : ""}
          `}
        >
          Samvi
        </div>
      </div>
    </Link>
  );
}