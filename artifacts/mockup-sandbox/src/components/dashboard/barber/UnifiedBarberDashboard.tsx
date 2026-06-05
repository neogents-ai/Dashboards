"use client";

import { useState } from "react";
import { Scissors, Sparkles } from "lucide-react";
import { DashboardBarber2 } from "./DashboardBarber2";
import { DashboardHairstylist } from "../hairstylist/DashboardHairstylist";

export function UnifiedBarberDashboard() {
  const [variant, setVariant] = useState<"barber" | "hairstylist">("barber");

  return (
    <div className="min-h-[100dvh] flex flex-col"
         style={{ background: "var(--dl-pearl-1, #f8fafc)" }}>
      {/* Splash toggle bar — blue → pink */}
      <div
        className="w-full px-4 py-3 flex items-center justify-center gap-3 sticky top-0 z-30"
        style={{
          background: "linear-gradient(180deg, rgba(248,250,252,0.95) 0%, rgba(248,250,252,0.85) 100%)",
          borderBottom: "1px solid rgba(11,16,32,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <button
          onClick={() => setVariant("barber")}
          className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${
            variant === "barber"
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
              : "bg-white/70 text-[#4a5274] hover:text-[#0b1020] hover:bg-white"
          }`}
        >
          <Scissors className="w-4 h-4" /> Barber
        </button>

        <div className="w-px h-6 bg-[#0b1020]/10" />

        <button
          onClick={() => setVariant("hairstylist")}
          className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${
            variant === "hairstylist"
              ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30 scale-105"
              : "bg-white/70 text-[#4a5274] hover:text-[#0b1020] hover:bg-white"
          }`}
        >
          <Sparkles className="w-4 h-4" /> Hairstylist
        </button>
      </div>

      <div className="flex-1">
        {variant === "barber" ? <DashboardBarber2 /> : <DashboardHairstylist />}
      </div>
    </div>
  );
}
