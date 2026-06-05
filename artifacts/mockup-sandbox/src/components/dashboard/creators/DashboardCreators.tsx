"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Clapperboard, Users, Eye, TrendingUp, DollarSign, MoreHorizontal,
  Calendar, Clock, Zap, Share2, Film, BarChart3, CheckCircle2,
  ChevronRight, Plus, Youtube, Instagram, Twitter, Twitch,
  Video, Mic, MessageSquare, Wand2, Settings, Sparkles,
  Upload, Play, Pause, Radio, Heart, MessageCircle, Send,
  Copy, Globe, Palette, Monitor, Smartphone, Camera,
  ArrowUpRight, Star, Hash, Bell, Search, Filter,
  ChevronDown, X, Lock, Unlock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LightDashboardShell, type TabDef } from "../shared/LightDashboardShell";
import { KpiTile } from "../shared/KpiTile";
import { CollapsibleCard } from "../shared/CollapsibleCard";
import "../shared/dashboard-light.css";
import "./creators-tokens.css";

/* ───────────────────────────────────────────────────────────
   DashboardCreators — Indigo / Lavender glassmind aesthetic
   ─────────────────────────────────────────────────────────── */

export function DashboardCreators() {
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <LightDashboardShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      greeting="Good morning, Kai"
      dateLabel="June 2, 2026"
      quickStats={<>
        <StatPill label="3 Campaigns Today" />
        <StatPill label="1.2K Leads" />
        <StatPill label="$12.4K/mo Revenue" />
      </>}
    >
      {activeTab === "home" && <HomeTab />}
      {activeTab === "calendar" && <CalendarTab />}
      {activeTab === "clients" && <AudienceTab />}
      {activeTab === "money" && <MoneyTab />}
      {activeTab === "more" && <MoreTab />}
    </LightDashboardShell>
  );
}

function StatPill({ label }: { label: string }) {
  return (
    <div className="px-3 py-1.5 rounded-full bg-[var(--accent-rose-10)] border border-[var(--accent-rose-20)] text-[var(--accent-rose-400)] text-xs font-medium whitespace-nowrap">
      {label}
    </div>
  );
}

/* ═══ HOME TAB ═══ */
function HomeTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="Active Accounts" value="847" trend="+12 this month" trendPositive icon={<Users className="w-5 h-5" />} />
        <KpiTile title="Website Traffic" value="4.2K" trend="+18% vs last month" trendPositive icon={<Eye className="w-5 h-5" />} />
        <KpiTile title="Conversion Rate" value="8.4%" subtitle="avg customer funnel" icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Est. Revenue" value="$12.4K" trend="+$2.1K vs last month" trendPositive icon={<DollarSign className="w-5 h-5" />} />
      </div>

      <div className="space-y-4">
        <CollapsibleCard title="Business Pipeline" subtitle="5 proposals · 3 drafts · 2 reviews · 1 launch" icon={<Film className="w-5 h-5" />} defaultOpen storageKey="business-home-pipeline">
          <ContentPipeline />
        </CollapsibleCard>

        <CollapsibleCard title="Current Performance" subtitle="Real-time business signals across channels" icon={<BarChart3 className="w-5 h-5" />} storageKey="business-home-analytics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <PlatformCard platform="Website" views="1.2K" subs="+3.4%" color="#3B82F6" icon={<Globe className="w-4 h-4" />} />
            <PlatformCard platform="Email" views="2.1K" subs="+8.7%" color="#0EA5E9" icon={<MessageSquare className="w-4 h-4" />} />
            <PlatformCard platform="Social" views="890" subs="+1.2%" color="#22C55E" icon={<Share2 className="w-4 h-4" />} />
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Weekly Performance" subtitle="Performance by day — last 7 days" icon={<TrendingUp className="w-5 h-5" />} storageKey="business-home-weekly">
          <WeeklyBarChart />
        </CollapsibleCard>

        <CollapsibleCard title="Partnership Pipeline" subtitle="4 active negotiations · $34K potential" icon={<DollarSign className="w-5 h-5" />} storageKey="business-home-deals">
          <div className="space-y-3">
            <DealRow brand="NordLayer" type="Channel Partnership" value="$8,500" status="negotiating" />
            <DealRow brand="Squarespace" type="Platform Integration" value="$12,000" status="signed" />
            <DealRow brand="Audible" type="Co-Marketing" value="$4,200" status="delivered" />
            <DealRow brand="Luminar Neo" type="Campaign Activation" value="$9,500" status="new" />
          </div>
        </CollapsibleCard>
      </div>
    </div>
  );
}

function ContentPipeline() {
  const stages = [
    { title: "Prospects", count: 5, color: "border-[var(--accent-rose-500)]", items: [
      { name: "AI Brand Persona Brief", detail: "Outline customer-facing messaging", ai: true },
      { name: "Sales Opportunity Audit", detail: "Score the highest-value leads", ai: false },
    ]},
    { title: "Proposals", count: 3, color: "border-purple-500", items: [
      { name: "Multi-Channel Campaign", detail: "Repurposing plan for email + socials", ai: true },
    ]},
    { title: "Deliverables", count: 2, color: "border-blue-500", items: [
      { name: "Q4 Revenue Review", detail: "Internal report and client summary", ai: false },
    ]},
    { title: "Launches", count: 1, color: "border-amber-500", items: [
      { name: "Campaign Kickoff", detail: "Launches tomorrow 10AM", ai: true },
    ]},
    { title: "Completed", count: 48, color: "border-emerald-500", items: [] },
  ];

  return (
    <div className="overflow-x-auto flex gap-4 pb-2">
      {stages.map((stage) => (
        <div key={stage.title} className="min-w-[240px] flex flex-col">
          <div className={cn("flex items-center justify-between p-3 rounded-t-xl border-t-2 bg-white/40", stage.color)}>
            <span className="text-sm font-bold text-[var(--dl-ink)]">{stage.title}</span>
            <span className="text-xs bg-white/60 text-[var(--dl-ink)] px-2 py-0.5 rounded-full">{stage.count}</span>
          </div>
          <div className="flex-1 bg-white/40 rounded-b-xl p-3 space-y-3 min-h-[180px]">
            {stage.items.map((item) => (
              <div key={item.name} className="bg-white/60 border border-white/50 rounded-xl p-3 hover:border-[var(--accent-rose-30)] transition-colors relative">
                {item.ai && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[var(--accent-rose-10)] border border-[var(--accent-rose-20)] text-[var(--accent-rose-400)] text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> AI Assist
                  </span>
                )}
                <p className="text-sm font-medium text-[var(--dl-ink)]">{item.name}</p>
                <p className="text-xs text-[var(--dl-muted)]">{item.detail}</p>
              </div>
            ))}
            {stage.items.length === 0 && <div className="text-center text-[var(--dl-muted)] text-xs py-6">{stage.count} completed projects</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function PlatformCard({ platform, views, subs, color, icon }: { platform: string; views: string; subs: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/50 bg-white/60 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color }}>{icon}</span>
        <span className="text-sm font-semibold text-[var(--dl-ink)]">{platform}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-[var(--dl-ink)]">{views}</span>
        <span className="text-xs text-[var(--dl-muted)]">leads</span>
      </div>
      <p className="mt-1 text-xs text-emerald-400 font-medium">{subs} conversion</p>
    </div>
  );
}

function WeeklyBarChart() {
  const days = [
    { day: "Mon", val: 65 },
    { day: "Tue", val: 80 },
    { day: "Wed", val: 45 },
    { day: "Thu", val: 90 },
    { day: "Fri", val: 70 },
    { day: "Sat", val: 100 },
    { day: "Sun", val: 55 },
  ];
  return (
    <div>
      <div className="flex items-end justify-between gap-2 h-32 mb-3">
        {days.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full rounded-t-lg relative group" style={{ height: `${d.val}%`, background: `linear-gradient(to top, rgba(129,140,248,${0.3 + d.val / 300}), rgba(129,140,248,${0.1 + d.val / 500}))` }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[var(--dl-ink)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {d.val}0K
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-[var(--dl-muted)]">
        {days.map((d) => <span key={d.day}>{d.day}</span>)}
      </div>
    </div>
  );
}

function DealRow({ brand, type, value, status }: { brand: string; type: string; value: string; status: "new" | "negotiating" | "signed" | "delivered" }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    new: { bg: "bg-blue-500/10", text: "text-blue-400", label: "New" },
    negotiating: { bg: "bg-amber-500/10", text: "text-amber-400", label: "Negotiating" },
    signed: { bg: "bg-[var(--accent-rose-10)]", text: "text-[var(--accent-rose-400)]", label: "Signed" },
    delivered: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Delivered" },
  };
  const c = config[status];
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/60 hover:bg-[#131e35] transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--accent-rose-10)] flex items-center justify-center text-[var(--accent-rose-400)] font-bold text-xs">
          {brand[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--dl-ink)]">{brand}</p>
          <p className="text-xs text-[var(--dl-muted)]">{type}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-[var(--dl-ink)]">{value}</span>
        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", c.bg, c.text)}>{c.label}</span>
      </div>
    </div>
  );
}

/* ═══ CALENDAR TAB ═══ */
function CalendarTab() {
  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const schedule = [
    { day: 0, slots: [{ time: "10:00", platform: "website", title: "Client Kickoff", type: "publish" }, { time: "15:00", platform: "email", title: "Proposal Draft", type: "draft" }] },
    { day: 1, slots: [{ time: "09:00", platform: "crm", title: "Lead Follow-up", type: "publish" }, { time: "19:00", platform: "meeting", title: "Team Sync", type: "live" }] },
    { day: 2, slots: [{ time: "11:00", platform: "website", title: "Strategy Review", type: "publish", best: true }] },
    { day: 3, slots: [{ time: "14:00", platform: "sales", title: "Campaign Prep", type: "draft" }, { time: "20:00", platform: "meeting", title: "All-Hands", type: "live" }] },
    { day: 4, slots: [{ time: "10:00", platform: "website", title: "Weekly Report", type: "publish", best: true }] },
    { day: 5, slots: [{ time: "12:00", platform: "email", title: "Launch Announcement", type: "publish" }, { time: "18:00", platform: "sales", title: "Partner Check-In", type: "live" }] },
    { day: 6, slots: [{ time: "11:00", platform: "crm", title: "Weekly Planning", type: "draft" }] },
  ];

  const platformIcons: Record<string, React.ReactNode> = {
    website: <Globe className="w-3.5 h-3.5" />,
    email: <MessageSquare className="w-3.5 h-3.5" />,
    crm: <Users className="w-3.5 h-3.5" />,
    sales: <DollarSign className="w-3.5 h-3.5" />,
    meeting: <Calendar className="w-3.5 h-3.5" />,
  };

  const platformColors: Record<string, string> = {
    website: "#22C55E",
    email: "#0EA5E9",
    crm: "#818CF8",
    sales: "#FBBF24",
    meeting: "#8B5CF6",
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Operations Calendar</h2>
          <p className="text-[var(--dl-muted)]">Week of June 1 — June 7, 2026</p>
        </div>
        <div className="flex gap-2">
          <button className="dm-glass-strip px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--accent-rose-400)] border border-[var(--accent-rose-20)] bg-[var(--accent-rose-10)]">
            <Plus className="w-3 h-3" /> Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {week.map((day, i) => {
          const daySchedule = schedule.find((s) => s.day === i);
          return (
            <div key={day} className="rounded-2xl border border-white/50 bg-white/40 overflow-hidden">
              <div className="p-3 border-b border-white/50 text-center">
                <span className="text-xs font-bold text-[var(--dl-ink)] uppercase">{day}</span>
                <span className="block text-[10px] text-[var(--dl-muted)]">Jun {i + 1}</span>
              </div>
              <div className="p-2 space-y-2 min-h-[200px]">
                {daySchedule?.slots.map((slot, idx) => (
                  <div key={idx} className={cn("rounded-xl p-2.5 text-xs relative", slot.type === "live" ? "bg-red-500/10 border border-red-500/20" : slot.type === "draft" ? "bg-white/60 border border-dashed border-white/50" : "bg-[var(--accent-rose-10)] border border-[var(--accent-rose-20)]")}>
                    {slot.best && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" title="Best time to post" />}
                    <div className="flex items-center gap-1.5 mb-1">
                      <span style={{ color: platformColors[slot.platform] }}>{platformIcons[slot.platform]}</span>
                      <span className="text-[10px] text-[var(--dl-muted)]">{slot.time}</span>
                    </div>
                    <p className="text-[var(--dl-ink)] font-medium truncate">{slot.title}</p>
                    {slot.type === "live" && (
                      <div className="flex items-center gap-1 mt-1">
                        <Radio className="w-2.5 h-2.5 text-red-400 animate-pulse" />
                        <span className="text-[9px] text-red-400 uppercase font-bold">Live</span>
                      </div>
                    )}
                  </div>
                ))}
                {!daySchedule?.slots.length && (
                  <div className="h-full flex items-center justify-center text-[var(--dl-muted)] text-[10px]">No slots</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-white/50 bg-white/40 p-5">
        <h3 className="text-sm font-bold text-[var(--dl-ink)] mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[var(--accent-rose-400)]" /> Upcoming Events
        </h3>
        <div className="space-y-3">
          <StreamRow platform="meeting" title="Weekly Leadership Review" time="Tue 7:00 PM" countdown="2h 14m" viewers="24" />
          <StreamRow platform="website" title="Product Launch Prep" time="Thu 2:00 PM" countdown="1d 4h" viewers="18" />
          <StreamRow platform="email" title="Campaign Briefing" time="Sat 6:00 PM" countdown="2d 5h" viewers="34" />
        </div>
      </div>
    </div>
  );
}

function StreamRow({ platform, title, time, countdown, viewers }: { platform: string; title: string; time: string; countdown: string; viewers: string }) {
  const icons: Record<string, React.ReactNode> = {
    meeting: <Calendar className="w-4 h-4" />,
    website: <Globe className="w-4 h-4" />,
    email: <MessageSquare className="w-4 h-4" />,
  };
  const colors: Record<string, string> = {
    meeting: "#8B5CF6",
    website: "#22C55E",
    email: "#0EA5E9",
  };
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/60 hover:bg-[#131e35] transition-colors">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: colors[platform] + "20", color: colors[platform] }}>
        {icons[platform]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--dl-ink)] truncate">{title}</p>
        <p className="text-xs text-[var(--dl-muted)]">{time}</p>
      </div>
      <div className="text-right">
        <p className="text-xs font-medium text-[var(--accent-rose-400)]">{countdown}</p>
        <p className="text-[10px] text-[var(--dl-muted)]">{viewers} attendees</p>
      </div>
      <button className="px-3 py-1.5 rounded-lg bg-[var(--accent-rose-10)] border border-[var(--accent-rose-20)] text-[var(--accent-rose-400)] text-xs font-medium hover:bg-[var(--accent-rose-20)] transition-colors">
        Notify
      </button>
    </div>
  );
}

/* ═══ AUDIENCE TAB ═══ */
function AudienceTab() {
  const segments = [
    { label: "New Leads", count: "12.4K", pct: "+24%", color: "bg-blue-500", width: "35%" },
    { label: "Active Clients", count: "89.2K", pct: "+8%", color: "bg-[var(--accent-rose-500)]", width: "55%" },
    { label: "Dormant Accounts", count: "45.1K", pct: "-3%", color: "bg-amber-500", width: "25%" },
    { label: "VIP Customers", count: "2.8K", pct: "+12%", color: "bg-emerald-500", width: "8%" },
  ];

  const topContent = [
    { title: "Q2 Sales Campaign", views: "2.1K", engagement: "12.4%", platform: "Email" },
    { title: "Launch Landing Page", views: "1.8K", engagement: "9.2%", platform: "Website" },
    { title: "Revenue Review Q1", views: "980", engagement: "15.1%", platform: "CRM" },
    { title: "Client Onboarding", views: "760", engagement: "7.8%", platform: "Social" },
  ];

  const fanQA = [
    { fan: "@operations_lead", question: "Can we move the client call earlier?", suggested: "Shift to 2PM and notify stakeholders.", likes: 234 },
    { fan: "@marketing_head", question: "What’s the priority campaign this week?", suggested: "Focus on the launch email and partner push.", likes: 189 },
    { fan: "@sales_director", question: "Are there any high-value deals ready to close?", suggested: "Yes — 2 proposals are in final review.", likes: 156 },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Customer Intelligence</h2>
          <p className="text-[var(--dl-muted)]">Understand, segment, and grow your business relationships</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Segments */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-white/50 bg-white/40 p-5">
            <h3 className="text-sm font-bold text-[var(--dl-ink)] mb-4">Follower Segments</h3>
            <div className="space-y-4">
              {segments.map((seg) => (
                <div key={seg.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[var(--dl-ink)] font-medium">{seg.label}</span>
                    <span className="text-xs text-[var(--dl-muted)]">{seg.count} <span className={seg.pct.startsWith("+") ? "text-emerald-400" : "text-red-400"}>{seg.pct}</span></span>
                  </div>
                  <div className="h-2 rounded-full bg-white/60 overflow-hidden">
                    <div className={cn("h-full rounded-full", seg.color)} style={{ width: seg.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/50 bg-white/40 p-5">
            <h3 className="text-sm font-bold text-[var(--dl-ink)] mb-3">Demographics</h3>
            <div className="space-y-3">
              <DemoBar label="18-24" pct={42} />
              <DemoBar label="25-34" pct={35} />
              <DemoBar label="35-44" pct={15} />
              <DemoBar label="45+" pct={8} />
            </div>
            <div className="mt-4 pt-3 border-t border-white/50 flex gap-4 text-center">
              <div className="flex-1">
                <p className="text-lg font-bold text-[var(--dl-ink)]">62%</p>
                <p className="text-[10px] text-[var(--dl-muted)]">Male</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-[var(--dl-ink)]">36%</p>
                <p className="text-[10px] text-[var(--dl-muted)]">Female</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-[var(--dl-ink)]">2%</p>
                <p className="text-[10px] text-[var(--dl-muted)]">Other</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-white/50 bg-white/40 p-5">
            <h3 className="text-sm font-bold text-[var(--dl-ink)] mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--accent-rose-400)]" /> Growth Trajectory
            </h3>
            <GrowthChart />
          </div>

          <div className="rounded-2xl border border-white/50 bg-white/40 p-5">
            <h3 className="text-sm font-bold text-[var(--dl-ink)] mb-4">Top Campaigns</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topContent.map((content) => (
                <div key={content.title} className="rounded-xl bg-white/60 border border-white/50 p-4 hover:border-[var(--accent-rose-30)] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-[var(--dl-muted)] uppercase tracking-wider">{content.platform}</span>
                    <Star className="w-3 h-3 text-amber-400" />
                  </div>
                  <p className="text-sm font-medium text-[var(--dl-ink)] mb-1">{content.title}</p>
                  <div className="flex items-center gap-3 text-xs text-[var(--dl-muted)]">
                    <span>{content.views} actions</span>
                    <span className="text-emerald-400">{content.engagement} conversion</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/50 bg-white/40 p-5">
            <h3 className="text-sm font-bold text-[var(--dl-ink)] mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[var(--accent-rose-400)]" /> Customer Feedback Queue
            </h3>
            <div className="space-y-3">
              {fanQA.map((qa) => (
                <div key={qa.fan} className="rounded-xl bg-white/60 border border-white/50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent-rose-10)] flex items-center justify-center text-[var(--accent-rose-400)] text-xs font-bold flex-shrink-0">
                      {qa.fan[1].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--dl-muted)] mb-0.5">{qa.fan}</p>
                      <p className="text-sm text-[var(--dl-ink)] mb-2">{qa.question}</p>
                      <div className="rounded-lg bg-white/40 border border-[var(--accent-rose-20)] p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3 h-3 text-[var(--accent-rose-400)]" />
                          <span className="text-[10px] text-[var(--accent-rose-400)] uppercase font-bold">AI Suggested</span>
                        </div>
                        <p className="text-xs text-[#aaa]">{qa.suggested}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <button className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors">
                          <Send className="w-3 h-3" /> Reply
                        </button>
                        <button className="flex items-center gap-1 text-[10px] text-[var(--dl-muted)] hover:text-[var(--dl-ink)] transition-colors">
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                        <span className="text-[10px] text-[var(--dl-muted)] ml-auto flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {qa.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[var(--dl-muted)] w-12">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-white/60 overflow-hidden">
        <div className="h-full rounded-full bg-[var(--accent-rose-500)]" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-[var(--dl-ink)] w-8 text-right">{pct}%</span>
    </div>
  );
}

function GrowthChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const values = [420, 480, 560, 640, 750, 847];
  const max = Math.max(...values);
  return (
    <div>
      <div className="flex items-end justify-between gap-2 h-40 mb-3">
        {values.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full rounded-t-lg relative group" style={{ height: `${(v / max) * 100}%`, background: `linear-gradient(to top, rgba(129,140,248,${0.3 + v / 2000}), rgba(129,140,248,${0.1 + v / 4000}))` }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[var(--dl-ink)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {v}K
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-[var(--dl-muted)]">
        {months.map((m) => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}

/* ═══ MONEY TAB ═══ */
function MoneyTab() {
  const revenue = [
    { source: "AdSense & RPM", amount: "$4,200", pct: 34, color: "bg-blue-500" },
    { source: "Sponsorships", amount: "$5,800", pct: 47, color: "bg-[var(--accent-rose-500)]" },
    { source: "Affiliates", amount: "$1,400", pct: 11, color: "bg-amber-500" },
    { source: "Digital Products", amount: "$1,000", pct: 8, color: "bg-emerald-500" },
  ];

  const inbox = [
    { brand: "NordLayer", type: "Sponsored Video", value: "$8,500", status: "new", days: 1 },
    { brand: "Luminar Neo", type: "Tutorial Series", value: "$9,500", status: "negotiating", days: 3 },
    { brand: "B&H Photo", type: "Gear Review", value: "$3,200", status: "negotiating", days: 5 },
    { brand: "Squarespace", type: "Integration", value: "$12,000", status: "signed", days: 0 },
    { brand: "Audible", type: "Affiliate Push", value: "$4,200", status: "delivered", days: 0 },
  ];

  const pipeline = [
    { stage: "Prospecting", value: "$0", count: 0 },
    { stage: "Outreach", value: "$8,500", count: 1 },
    { stage: "Negotiation", value: "$12,700", count: 2 },
    { stage: "Signed", value: "$12,000", count: 1 },
    { stage: "Delivered", value: "$4,200", count: 1 },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Monetization & Deals</h2>
        <p className="text-[var(--dl-muted)]">Revenue breakdown, brand deals, and deal pipeline</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="Monthly Revenue" value="$12.4K" trend="+$2.1K vs last month" trendPositive icon={<DollarSign className="w-5 h-5" />} />
        <KpiTile title="Active Sponsorships" value="4" subtitle="$34K potential" icon={<Star className="w-5 h-5" />} />
        <KpiTile title="Avg Deal Value" value="$7.9K" icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Conversion Rate" value="28%" trend="+4% vs last quarter" trendPositive icon={<CheckCircle2 className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="rounded-2xl border border-white/50 bg-white/40 p-6">
          <h3 className="font-bold text-[var(--dl-ink)] mb-5 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-[var(--accent-rose-400)]" /> Revenue Breakdown
          </h3>
          <div className="space-y-4">
            {revenue.map((r) => (
              <div key={r.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[var(--dl-ink)]">{r.source}</span>
                  <span className="text-sm font-semibold text-[var(--dl-ink)]">{r.amount}</span>
                </div>
                <div className="h-3 rounded-full bg-white/60 overflow-hidden">
                  <div className={cn("h-full rounded-full", r.color)} style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-[10px] text-[var(--dl-muted)]">{r.pct}% of total</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Pipeline */}
        <div className="rounded-2xl border border-white/50 bg-white/40 p-6">
          <h3 className="font-bold text-[var(--dl-ink)] mb-5 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-[var(--accent-rose-400)]" /> Deal Value Pipeline
          </h3>
          <div className="space-y-3">
            {pipeline.map((p) => (
              <div key={p.stage} className="flex items-center justify-between p-3 rounded-xl bg-white/60">
                <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", p.count > 0 ? "bg-[var(--accent-rose-400)]" : "bg-[#333]")} />
                  <span className="text-sm text-[var(--dl-ink)]">{p.stage}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-[var(--dl-ink)]">{p.value}</span>
                  <span className="text-xs text-[var(--dl-muted)] ml-2">{p.count} deals</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Deal Inbox */}
      <div className="rounded-2xl border border-white/50 bg-white/40 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-[var(--dl-ink)] flex items-center gap-2">
            <MailIcon className="w-5 h-5 text-[var(--accent-rose-400)]" /> Brand Deal Inbox
          </h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--dl-muted)] hover:text-[var(--dl-ink)] transition-colors flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--dl-muted)] hover:text-[var(--dl-ink)] transition-colors flex items-center gap-1">
              <Search className="w-3 h-3" /> Search
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {inbox.map((deal) => (
            <DealRow key={deal.brand} brand={deal.brand} type={deal.type} value={deal.value} status={deal.status as any} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PieChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/* ═══ MORE TAB ═══ */
function MoreTab() {
  const [showGoLive, setShowGoLive] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  const items = [
    { icon: <Radio className="w-5 h-5" />, label: "Campaign Studio", desc: "Launch multi-channel activations", featured: true, onClick: () => setShowGoLive(true) },
    { icon: <Wand2 className="w-5 h-5" />, label: "AI Persona Builder", desc: "Generate business personas", featured: true, onClick: () => setShowAvatar(true) },
    { icon: <Film className="w-5 h-5" />, label: "Content Studio", desc: "Edit, caption, and publish" },
    { icon: <DollarSign className="w-5 h-5" />, label: "Partnership Inbox", desc: "Manage collaborations" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Customer Q&A Agent", desc: "Auto-reply to customers" },
    { icon: <Share2 className="w-5 h-5" />, label: "Repurpose Machine", desc: "One message → 12 formats" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics Deep Dive", desc: "Cross-channel insights" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", desc: "Account & preferences" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Business Tools</h2>
        <p className="text-[var(--dl-muted)]">Everything you need to run, launch, and scale your operation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={cn(
              "flex flex-col items-start gap-3 p-5 rounded-2xl border text-left transition-all hover:scale-[1.02]",
              item.featured
                ? "border-[var(--accent-rose-30)] bg-[var(--accent-rose-10)] hover:bg-[var(--accent-rose-20)]"
                : "border-white/50 bg-white/40 hover:bg-white/60 hover:border-[var(--accent-rose-30)]"
            )}
          >
            <div className={cn("p-3 rounded-xl", item.featured ? "bg-[var(--accent-rose-20)] text-[var(--accent-rose-400)]" : "bg-[var(--accent-rose-10)] text-[var(--accent-rose-400)]")}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--dl-ink)]">{item.label}</p>
              <p className="text-xs text-[var(--dl-muted)]">{item.desc}</p>
            </div>
            {item.featured && (
              <span className="mt-auto px-2 py-0.5 rounded-full bg-[var(--accent-rose-20)] border border-[var(--accent-rose-30)] text-[var(--accent-rose-400)] text-[9px] font-bold uppercase tracking-wider">
                Featured
              </span>
            )}
          </button>
        ))}
      </div>

      {showGoLive && <CampaignStudio onClose={() => setShowGoLive(false)} />}
      {showAvatar && <AIPersonaBuilder onClose={() => setShowAvatar(false)} />}
    </div>
  );
}

/* ─── Campaign Studio Modal ─── */
function CampaignStudio({ onClose }: { onClose: () => void }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["youtube"]);
  const [isLive, setIsLive] = useState(false);
  const [bitrate, setBitrate] = useState(4500);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setBitrate((b) => Math.max(3000, Math.min(6000, b + Math.floor(Math.random() * 400 - 200))));
      setFps((f) => Math.max(58, Math.min(62, f + Math.floor(Math.random() * 3 - 1))));
    }, 2000);
    return () => clearInterval(interval);
  }, [isLive]);

  const platforms = [
      { id: "website", name: "Website", icon: <Globe className="w-5 h-5" />, color: "#22C55E" },
      { id: "email", name: "Email", icon: <MessageSquare className="w-5 h-5" />, color: "#0EA5E9" },
      { id: "social", name: "Social", icon: <Share2 className="w-5 h-5" />, color: "#8B5CF6" },
      { id: "crm", name: "CRM", icon: <Users className="w-5 h-5" />, color: "#818CF8" },
      { id: "ads", name: "Ads", icon: <BarChart3 className="w-5 h-5" />, color: "#F59E0B" },
  ];

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const scheduledStreams = [
    { title: "Q2 Launch Review", platform: "website", time: "Tue 7:00 PM", countdown: "2h 14m" },
    { title: "Holiday Campaign Prep", platform: "email", time: "Thu 2:00 PM", countdown: "1d 4h" },
  ];

  const chatMessages = [
    { user: "@operations_lead", msg: "Launch readiness looks good. ✅", color: "#818CF8" },
    { user: "@marketing_head", msg: "Approval pending for the hero banner.", color: "#A5B4FC" },
    { user: "@sales_director", msg: "Customer segment list is finalized.", color: "#C7D2FE" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-auto rounded-3xl border border-white/50 bg-[var(--canvas-base)] shadow-2xl">
        <div className="p-6 border-b border-white/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-rose-10)] flex items-center justify-center">
              <Radio className="w-5 h-5 text-[var(--accent-rose-400)] animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--dl-ink)]">Campaign Studio</h3>
              <p className="text-xs text-[var(--dl-muted)]">Multi-channel launch and activation control center</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/60 transition-colors">
            <X className="w-5 h-5 text-[var(--dl-muted)]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Platform Selector */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--dl-ink)] mb-3">Select Platforms</h4>
            <div className="flex flex-wrap gap-3">
              {platforms.map((p) => {
                const isSelected = selectedPlatforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all",
                      isSelected
                        ? "border-[var(--accent-rose-30)] bg-[var(--accent-rose-10)] text-[var(--dl-ink)]"
                        : "border-white/50 bg-white/40 text-[var(--dl-muted)] hover:text-[var(--dl-ink)]"
                    )}
                  >
                    <span style={{ color: isSelected ? p.color : "#666" }}>{p.icon}</span>
                    {p.name}
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Preview */}
            <div className="rounded-2xl border border-white/50 bg-white/40 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-[#0d1120] to-[#1a2040] flex items-center justify-center relative">
                {isLive ? (
                  <>
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                      <span className="text-xs font-bold text-red-400 uppercase">Live</span>
                    </div>
                    <div className="absolute top-3 right-3 text-xs text-[var(--dl-muted)]">00:04:23</div>
                    <div className="text-center">
                      <Mic className="w-12 h-12 text-[var(--dl-ink)]/20 mx-auto mb-2" />
                      <p className="text-sm text-[var(--dl-ink)]/40">Campaign preview active</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <Video className="w-12 h-12 text-[var(--dl-ink)]/20 mx-auto mb-2" />
                    <p className="text-sm text-[var(--dl-ink)]/40">Launch preview will appear here</p>
                  </div>
                )}
              </div>
              <div className="p-4">
                <button
                  onClick={() => setIsLive(!isLive)}
                  className={cn(
                    "w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2",
                    isLive
                      ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                      : "bg-[var(--accent-rose-500)] text-[var(--dl-ink)] hover:bg-[var(--accent-rose-600)] animate-pulse"
                  )}
                >
                  {isLive ? <><Pause className="w-4 h-4" /> End Campaign</> : <><Play className="w-4 h-4" /> Start Campaign</>}
                </button>
              </div>
            </div>

            {/* Campaign Health + Activity */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/50 bg-white/40 p-4">
                <h4 className="text-sm font-semibold text-[var(--dl-ink)] mb-3">Campaign Health</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/60 p-3 text-center">
                    <p className="text-[10px] text-[var(--dl-muted)] uppercase">Bitrate</p>
                    <p className="text-lg font-bold text-[var(--dl-ink)]">{bitrate}</p>
                    <p className="text-[10px] text-emerald-400">kbps</p>
                  </div>
                  <div className="rounded-xl bg-white/60 p-3 text-center">
                    <p className="text-[10px] text-[var(--dl-muted)] uppercase">Resolution</p>
                    <p className="text-lg font-bold text-[var(--dl-ink)]">1080p</p>
                    <p className="text-[10px] text-emerald-400">HD</p>
                  </div>
                  <div className="rounded-xl bg-white/60 p-3 text-center">
                    <p className="text-[10px] text-[var(--dl-muted)] uppercase">Frame Rate</p>
                    <p className="text-lg font-bold text-[var(--dl-ink)]">{fps}</p>
                    <p className="text-[10px] text-emerald-400">fps</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/50 bg-white/40 p-4">
                <h4 className="text-sm font-semibold text-[var(--dl-ink)] mb-3">Activity Feed</h4>
                <div className="space-y-2 max-h-32 overflow-auto">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className="font-bold flex-shrink-0" style={{ color: msg.color }}>{msg.user}</span>
                      <span className="text-[#aaa]">{msg.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scheduled Streams */}
          <div className="rounded-2xl border border-white/50 bg-white/40 p-4">
            <h4 className="text-sm font-semibold text-[var(--dl-ink)] mb-3">Scheduled Launches</h4>
            <div className="space-y-2">
              {scheduledStreams.map((s) => (
                <div key={s.title} className="flex items-center justify-between p-3 rounded-xl bg-white/60">
                  <div className="flex items-center gap-3">
                    <span style={{ color: platforms.find((p) => p.id === s.platform)?.color }}>
                      {platforms.find((p) => p.id === s.platform)?.icon}
                    </span>
                    <div>
                      <p className="text-sm text-[var(--dl-ink)]">{s.title}</p>
                      <p className="text-xs text-[var(--dl-muted)]">{s.time}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[var(--accent-rose-400)]">{s.countdown}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AI Persona Builder Modal ─── */
function AIPersonaBuilder({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"upload" | "style" | "preview">("upload");
  const [selectedStyle, setSelectedStyle] = useState("professional");

  const styles = [
    { id: "professional", name: "Professional", desc: "Clean brand identity, polished tone", icon: <Monitor className="w-4 h-4" /> },
    { id: "casual", name: "Casual", desc: "Friendly, conversational voice", icon: <Smartphone className="w-4 h-4" /> },
    { id: "cinematic", name: "Cinematic", desc: "Bold, dramatic storytelling", icon: <Film className="w-4 h-4" /> },
    { id: "animated", name: "Animated", desc: "Stylized persona for campaigns", icon: <Palette className="w-4 h-4" /> },
    { id: "realistic", name: "Realistic", desc: "Human-like brand representation", icon: <Camera className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-auto rounded-3xl border border-white/50 bg-[var(--canvas-base)] shadow-2xl">
        <div className="p-6 border-b border-white/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-rose-10)] flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-[var(--accent-rose-400)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--dl-ink)]">AI Avatar Cloning</h3>
              <p className="text-xs text-[var(--dl-muted)]">Generate your digital twin for content at scale</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/60 transition-colors">
            <X className="w-5 h-5 text-[var(--dl-muted)]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Progress */}
          <div className="flex items-center gap-2">
            {["upload", "style", "preview"].map((s, i) => (
              <React.Fragment key={s}>
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold", step === s ? "bg-[var(--accent-rose-500)] text-[var(--dl-ink)]" : i < ["upload", "style", "preview"].indexOf(step) ? "bg-emerald-500/20 text-emerald-400" : "bg-white/60 text-[var(--dl-muted)]")}>
                  {i < ["upload", "style", "preview"].indexOf(step) ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                {i < 2 && <div className={cn("flex-1 h-0.5", i < ["upload", "style", "preview"].indexOf(step) ? "bg-emerald-500/30" : "bg-[var(--canvas-border)]")} />}
              </React.Fragment>
            ))}
          </div>

          {step === "upload" && (
            <div className="rounded-2xl border-2 border-dashed border-white/50 bg-white/40 p-10 text-center hover:border-[var(--accent-rose-30)] transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-[var(--accent-rose-400)] mx-auto mb-3" />
              <p className="text-sm font-medium text-[var(--dl-ink)] mb-1">Upload a business logo or brand mood asset</p>
              <p className="text-xs text-[var(--dl-muted)]">PNG, JPG — min 512×512px</p>
              <button onClick={() => setStep("style")} className="mt-4 px-4 py-2 rounded-xl bg-[var(--accent-rose-10)] border border-[var(--accent-rose-20)] text-[var(--accent-rose-400)] text-xs font-medium hover:bg-[var(--accent-rose-20)] transition-colors">
                Use Sample Brand
              </button>
            </div>
          )}

          {step === "style" && (
            <div className="space-y-3">
              <p className="text-sm text-[var(--dl-ink)] font-medium">Choose a persona style</p>
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
                    selectedStyle === s.id
                      ? "border-[var(--accent-rose-30)] bg-[var(--accent-rose-10)]"
                      : "border-white/50 bg-white/40 hover:border-[var(--accent-rose-30)]"
                  )}
                >
                  <div className={cn("p-2.5 rounded-xl", selectedStyle === s.id ? "bg-[var(--accent-rose-20)] text-[var(--accent-rose-400)]" : "bg-white/60 text-[var(--dl-muted)]")}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--dl-ink)]">{s.name}</p>
                    <p className="text-xs text-[var(--dl-muted)]">{s.desc}</p>
                  </div>
                  {selectedStyle === s.id && <CheckCircle2 className="w-5 h-5 text-[var(--accent-rose-400)]" />}
                </button>
              ))}
              <button onClick={() => setStep("preview")} className="w-full py-3 rounded-xl bg-[var(--accent-rose-500)] text-[var(--dl-ink)] text-sm font-bold hover:bg-[var(--accent-rose-600)] transition-colors">
                Generate Preview
              </button>
            </div>
          )}

          {step === "preview" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/50 bg-white/40 p-6 text-center">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[var(--accent-rose-500)] to-[var(--accent-rose-600)] mx-auto mb-4 flex items-center justify-center">
                  <Wand2 className="w-12 h-12 text-[var(--dl-ink)]/40" />
                </div>
                <p className="text-sm font-medium text-[var(--dl-ink)] mb-1">Your AI Persona is Ready</p>
                <p className="text-xs text-[var(--dl-muted)]">Professional style · brand-ready · 0.8s generation</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button className="p-3 rounded-xl bg-white/40 border border-white/50 hover:border-[var(--accent-rose-30)] transition-colors text-center">
                  <Film className="w-4 h-4 text-[var(--accent-rose-400)] mx-auto mb-1" />
                  <span className="text-[10px] text-[var(--dl-ink)]">Marketing Video</span>
                </button>
                <button className="p-3 rounded-xl bg-white/40 border border-white/50 hover:border-[var(--accent-rose-30)] transition-colors text-center">
                  <Globe className="w-4 h-4 text-[var(--accent-rose-400)] mx-auto mb-1" />
                  <span className="text-[10px] text-[var(--dl-ink)]">Multi-Language</span>
                </button>
                <button className="p-3 rounded-xl bg-white/40 border border-white/50 hover:border-[var(--accent-rose-30)] transition-colors text-center">
                  <Calendar className="w-4 h-4 text-[var(--accent-rose-400)] mx-auto mb-1" />
                  <span className="text-[10px] text-[var(--dl-ink)]">Schedule</span>
                </button>
              </div>

              {/* Upsell Banner */}
              <div className="rounded-xl bg-gradient-to-r from-[var(--accent-rose-10)] to-[var(--accent-rose-20)] border border-[var(--accent-rose-30)] p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--dl-ink)]">Upgrade to Pro Clone</p>
                  <p className="text-xs text-[var(--dl-muted)]">Unlimited generations · Voice cloning · 4K video</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[var(--accent-rose-500)] text-[var(--dl-ink)] text-xs font-bold hover:bg-[var(--accent-rose-600)] transition-colors">
                  $49/mo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
