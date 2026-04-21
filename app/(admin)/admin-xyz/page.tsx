"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, Mail, Lock, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      
      {/* ================= LEFT SIDE ================= */}
      <div className="w-full md:w-1/2 bg-[#0a0f18] text-white flex flex-col p-10 md:p-16 lg:p-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c19d60]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 border-2 border-[#c19d60] rounded-full flex items-center justify-center">
            <BookOpen className="text-[#c19d60] w-5 h-5" />
          </div>
          <div>
            <h1 className="font-semibold text-xl tracking-wide text-white">KnowSamvidhan</h1>
            <p className="text-[9px] tracking-[0.25em] text-gray-400 mt-0.5">CONSTITUTION · LEARN · MASTER</p>
          </div>
        </div>

        <div className="z-10 mt-16 md:mt-24 flex flex-col items-center text-center w-full">
          <p className="text-[#c19d60] text-sm font-semibold tracking-widest mb-4">
            SECURE GOVERNANCE PORTAL
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-6 text-gray-100">
            AUTHENTICATION FOR<br />SYSTEM STEWARDSHIP
          </h2>
        </div>        
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full md:w-1/2 bg-[#ffffff] flex flex-col items-center justify-center p-6 md:p-12 relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="bg-[#a4aec7] p-1.5 md:p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full max-w-md relative z-10">
          <div className="bg-[#f8f9fa] rounded-xl px-6 py-10 md:px-10 w-full text-center shadow-lg border border-white">
            
            <h3 className="text-3xl font-serif text-gray-900 mb-2">Admin Login</h3>
            <p className="text-sm text-gray-600 mb-8">Please enter your authorized credentials.</p>

            {/* Removed the onSubmit handler from the form */}
            <form className="text-left space-y-5">
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Administrator Email / ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    // Removed 'required'
                    placeholder="admin@domain.com"
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                  <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-700" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-800">
                    Password
                  </label>
                  <button type="button" className="text-xs font-medium text-gray-500 hover:text-gray-800">
                    Show
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    // Removed 'required'
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-sm text-[#d97706] hover:underline font-medium">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Changed type="submit" to type="button" and added the redirect onClick */}
              <button
                type="button"
                onClick={() => router.push('/ad-dashboard')}
                className="w-full mt-6 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-semibold py-3.5 rounded-lg flex justify-center items-center gap-2 transition-all shadow-md"
              >
                Secure Login <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <p className="absolute bottom-6 md:bottom-8 text-[10px] tracking-wider text-gray-400/60 uppercase">
          System Operated by KnowSamvidhan Governance Committee
        </p>
      </div>
    </div>
  );
}