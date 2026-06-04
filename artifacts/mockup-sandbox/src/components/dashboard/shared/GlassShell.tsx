"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  MoreHorizontal,
  Settings,
  Bell,
} from "lucide-react";
import "./glass-tokens.css";

export type TabKey = "home" | "calendar" | "clients" | "money" | "more";

const TAB_META: Record<TabKey, { label: string; icon: React.ReactNode }> = {
  home:    { label: "Home",     icon: <LayoutDashboard className="w-5 h-5" /> },
  calendar:{ label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
  clients: { label: "Clients",  icon: <Users className="w-5 h-5" /> },
  money:   { label: "Money",    icon: <DollarSign className="w-5 h-5" /> },
  more:    { label: "More",     icon: <MoreHorizontal className="w-5 h-5" /> },
};

interface GlassShellProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  greeting?: string;
  dateLabel?: string;
  quickStats?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function GlassShell({
  activeTab,
  onTabChange,
  greeting,
  dateLabel,
  quickStats,
  children,
  className,
}: GlassShellProps) {
  return (
    <div
      className={cn(
        "dashboard-canvas min-h-[100dvh] text-white flex flex-col lg:flex-row overflow-hidden",
        className
      )}
    >
      {/* ─── Desktop Left Rail ─── */}
      <aside
        className="hidden lg:flex flex-col justify-between w-[72px] xl:w-[240px] flex-shrink-0 border-r border-[var(--canvas-border)] glass-regular z-20 transition-all duration-300"
      >
        <div>
          {/* Logo / Avatar area */}
          <div className="h-20 flex items-center justify-center xl:justify-start xl:px-6 border-b border-[var(--canvas-border)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--accent-rose-600)] to-[var(--accent-rose-400)] flex items-center justify-center font-bold text-sm text-white">
                LS
              </div>
              <div className="hidden xl:block">
                <h2 className="font-bold text-base leading-tight">Lisa Sterling</h2>
                <p className="text-[#888] text-[10px] uppercase tracking-wider">Rose & Shears</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="p-3 space-y-1 mt-4" role="tablist" aria-label="Main navigation">
            {(Object.keys(TAB_META) as TabKey[]).map((key) => {
              const meta = TAB_META[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onTabChange(key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-rose-500)]",
                    isActive
                      ? "bg-[var(--accent-rose-10)] text-[var(--accent-rose-400)]"
                      : "text-[#888] hover:text-white hover:bg-[var(--canvas-surface-raised)]"
                  )}
                >
                  {meta.icon}
                  <span className="hidden xl:inline">{meta.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom of sidebar */}
        <div className="p-3 border-t border-[var(--canvas-border)] space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[#888] hover:text-white hover:bg-[var(--canvas-surface-raised)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-rose-500)]">
            <Settings className="w-5 h-5" />
            <span className="hidden xl:inline">Settings</span>
          </button>
          <div className="mt-2 flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--canvas-surface-raised)] cursor-pointer transition-colors">
            <img src="/images/nori_nobg.png" alt="NORI" className="object-contain flex-shrink-0" style={{ width: 32, height: 32 }} />
            <span className="hidden xl:block text-[10px] font-bold tracking-widest" style={{ color: '#00B359', fontFamily: 'monospace' }}>Powered by N.O.R.I.</span>
          </div>
        </div>
      </aside>

      {/* ─── Main Content Area ─── */}
      <main className="flex-1 flex flex-col h-[100dvh] overflow-hidden">
        {/* Topbar */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 lg:px-8 border-b border-[var(--canvas-border)] glass-thin z-10">
          <div className="flex flex-col">
            {greeting && <h1 className="text-xl font-semibold text-white">{greeting}</h1>}
            {dateLabel && <p className="text-[#888] text-sm">{dateLabel}</p>}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {quickStats}
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-[#888] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-rose-500)] rounded-lg p-1">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[var(--accent-rose-500)] rounded-full border-2 border-[var(--canvas-base)]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent-rose-600)] to-[var(--accent-rose-400)] flex items-center justify-center text-xs font-bold text-white cursor-pointer">
              LS
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          {children}
        </div>

        {/* ─── Mobile Bottom Tab Bar ─── */}
        <nav
          className="lg:hidden h-16 flex-shrink-0 border-t border-[var(--canvas-border)] glass-thick z-30 flex items-center justify-around px-2"
          role="tablist"
          aria-label="Main navigation"
        >
          {(Object.keys(TAB_META) as TabKey[]).map((key) => {
            const meta = TAB_META[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(key)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-rose-500)]",
                  isActive
                    ? "text-[var(--accent-rose-400)]"
                    : "text-[#666] hover:text-white"
                )}
              >
                {meta.icon}
                <span className="text-[10px] font-medium">{meta.label}</span>
              </button>
            );
          })}
        </nav>
      </main>
    </div>
  );
}
