"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Bell, Settings, Menu, X } from "lucide-react";
import "./dashboard-light.css";

export interface TabDef {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface LightDashboardShellProps {
  tabs: TabDef[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  greeting?: string;
  dateLabel?: string;
  quickStats?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  userName?: string;
  userInitials?: string;
  businessName?: string;
  avatarGradient?: [string, string];
}

export function LightDashboardShell({
  tabs,
  activeTab,
  onTabChange,
  greeting,
  dateLabel,
  quickStats,
  children,
  className,
  accentColor = "#3b6bff",
  userName = "User",
  userInitials = "U",
  businessName = "",
  avatarGradient = ["#3b6bff", "#6366f1"],
}: LightDashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div
      className={cn(
        "dashboard-light-canvas min-h-[100dvh] flex flex-col lg:flex-row overflow-hidden",
        className
      )}
    >
      {/* ─── Desktop Sidebar ─── */}
      <aside className="hidden lg:flex flex-col justify-between w-[72px] xl:w-[240px] flex-shrink-0 dashboard-light-sidebar z-20 transition-all duration-300">
        <div>
          {/* Logo / Avatar area */}
          <div className="h-20 flex items-center justify-center xl:justify-start xl:px-6 border-b border-[var(--dl-line)]">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                style={{
                  background: `linear-gradient(135deg, ${avatarGradient[0]}, ${avatarGradient[1]})`,
                }}
              >
                {userInitials}
              </div>
              <div className="hidden xl:block">
                <h2 className="font-bold text-base leading-tight text-[var(--dl-ink)]">{userName}</h2>
                {businessName && (
                  <p className="text-[var(--dl-muted)] text-[10px] uppercase tracking-wider">{businessName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="p-3 space-y-1 mt-4" role="tablist" aria-label="Main navigation">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2",
                    isActive
                      ? "dashboard-light-nav-item active"
                      : "dashboard-light-nav-item"
                  )}
                  style={
                    isActive
                      ? {
                          color: accentColor,
                          borderColor: accentColor + "30",
                          background: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)`,
                        }
                      : undefined
                  }
                >
                  <span style={isActive ? { color: accentColor } : undefined}>{tab.icon}</span>
                  <span className="hidden lg:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom of sidebar */}
        <div className="p-3 border-t border-[var(--dl-line)] space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[var(--dl-muted)] hover:text-[var(--dl-ink)] hover:bg-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dl-blue)]">
            <Settings className="w-5 h-5" />
            <span className="hidden xl:inline">Settings</span>
          </button>
          <div className="dashboard-light-nori mt-2">
            <img
              src="/__mockup/images/nori_nobg.png"
              alt="NORI"
              className="object-contain flex-shrink-0"
              style={{ width: 32, height: 32 }}
            />
            <span className="hidden xl:block dashboard-light-nori-text">Powered by N.O.R.I.</span>
          </div>
        </div>
      </aside>

      {/* ─── Mobile Sidebar Overlay ─── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] dashboard-light-sidebar flex flex-col">
            <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--dl-line)]">
              <span className="font-bold text-[var(--dl-ink)]">{userName}</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-white/40">
                <X className="w-5 h-5 text-[var(--dl-ink)]" />
              </button>
            </div>
            <nav className="p-3 space-y-1 flex-1 overflow-auto">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-white/60 text-[var(--dl-ink)]"
                        : "text-[var(--dl-muted)] hover:text-[var(--dl-ink)] hover:bg-white/40"
                    )}
                    style={isActive ? { color: accentColor } : undefined}
                  >
                    <span style={isActive ? { color: accentColor } : undefined}>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="p-3 border-t border-[var(--dl-line)]">
              <div className="dashboard-light-nori">
                <img src="/__mockup/images/nori_nobg.png" alt="NORI" className="object-contain flex-shrink-0" style={{ width: 28, height: 28 }} />
                <span className="dashboard-light-nori-text">Powered by N.O.R.I.</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ─── Main Content Area ─── */}
      <main className="flex-1 flex flex-col h-[100dvh] overflow-hidden">
        {/* Topbar */}
        <header className="h-16 lg:h-20 flex-shrink-0 flex items-center justify-between px-4 lg:px-8 dashboard-light-header z-10">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/40 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5 text-[var(--dl-ink)]" />
            </button>
            <div className="flex flex-col">
              {greeting && <h1 className="text-lg lg:text-xl font-semibold text-[var(--dl-ink)]">{greeting}</h1>}
              {dateLabel && <p className="text-[var(--dl-muted)] text-sm">{dateLabel}</p>}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {quickStats}
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-[var(--dl-muted)] hover:text-[var(--dl-ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dl-blue)] rounded-lg p-1">
              <Bell className="w-5 h-5" />
              <span
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                style={{ background: accentColor }}
              />
            </button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${avatarGradient[0]}, ${avatarGradient[1]})`,
              }}
            >
              {userInitials}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto dashboard-light-scroll p-4 lg:p-8">
          {children}
        </div>

        {/* ─── Mobile Bottom Tab Bar ─── */}
        <nav
          className="lg:hidden h-16 flex-shrink-0 dashboard-light-mobile-nav z-30 flex items-center justify-around px-2"
          role="tablist"
          aria-label="Main navigation"
        >
          {tabs.slice(0, 5).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-colors",
                  isActive ? "text-[var(--dl-ink)]" : "text-[var(--dl-muted)]"
                )}
                style={isActive ? { color: accentColor } : undefined}
              >
                <span style={isActive ? { color: accentColor } : undefined}>{tab.icon}</span>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </main>
    </div>
  );
}
