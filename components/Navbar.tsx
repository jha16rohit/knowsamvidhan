"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/user_preamble", label: "Preamble" },
  { href: "/user_parts", label: "Parts" },
  { href: "/user_articles", label: "Articles" },
  { href: "/user_schedules", label: "Schedules" },
  { href: "/user_amendments", label: "Amendments" },
  { href: "/user_quiz", label: "Quiz" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-gray-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white">
            <Image
              src="/image/logo.png"
              alt="KnowSamvidhan Logo"
              width={40}
              height={40}
              priority
            />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight sm:text-xl">
              Know<span className="text-orange-500">Samvidhan</span>
            </h1>
            <p className="hidden text-[9px] tracking-[0.25em] text-gray-500 sm:block lg:text-[10px]">
              CONSTITUTION · LEARN · MASTER
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-4 text-sm font-medium text-gray-700 lg:flex xl:gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-black">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/user_login"
            className="whitespace-nowrap rounded-full border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="whitespace-nowrap rounded-full bg-orange-500 px-4 py-1.5 text-sm text-white hover:bg-orange-600"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="text-xl leading-none">{isOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              href="/user_login"
              className="rounded-full border border-gray-300 px-3 py-2 text-center text-sm hover:bg-gray-100"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-orange-500 px-3 py-2 text-center text-sm text-white hover:bg-orange-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}