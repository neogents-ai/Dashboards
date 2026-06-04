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
import { GlassShell, type TabKey } from "../shared/GlassShell";
import { KpiTile } from "../shared/KpiTile";
import { CollapsibleCard } from "../shared/CollapsibleCard";
import "../shared/glass-tokens.css";
import "./creators-tokens.css";

/* ───────────────────────────────────────────────────────────
   DashboardCreators — Indigo / Lavender glassmind aesthetic
   ─────────────────────────────────────────────────────────── */

export function DashboardCreators() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  return (
    <GlassShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      greeting="Good morning, Kai"
      dateLabel="June 2, 2026"
      quickStats={<>
        <StatPill label="3 Videos Today" />
        <StatPill label="847K Subscribers" />
        <StatPill label="$12.4K/mo Revenue" />
      </>}
      className="creators-canvas"
    >
      {activeTab === "home" && <HomeTab />}
      {activeTab === "calendar" && <CalendarTab />}
      {activeTab === "clients" && <AudienceTab />}
      {activeTab === "money" && <MoneyTab />}
      {activeTab === "more" && <MoreTab />}
    </GlassShell>
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
        <KpiTile title="Subscribers" value="847K" trend="+12.3K this month" trendPositive icon={<Users className="w-5 h-5" />} />
        <KpiTile title="Monthly Views" value="4.2M" trend="+18% vs last month" trendPositive icon={<Eye className="w-5 h-5" />} />
        <KpiTile title="Engagement Rate" value="8.4%" subtitle="avg across platforms" icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Est. Revenue" value="$12.4K" trend="+$2.1K vs last month" trendPositive icon={<DollarSign className="w-5 h-5" />} />
      </div>

      <div className="space-y-4">
        <CollapsibleCard title="Content Pipeline" subtitle="5 ideas · 3 scripting · 2 editing · 1 scheduled" icon={<Film className="w-5 h-5" />} defaultOpen storageKey="creators-home-pipeline">
          <ContentPipeline />
        </CollapsibleCard>

        <CollapsibleCard title="Today's Analytics" subtitle="Real-time performance across platforms" icon={<BarChart3 className="w-5 h-5" />} storageKey="creators-home-analytics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <PlatformCard platform="YouTube" views="1.2M" subs="+3.4K" color="#FF0000" icon={<Youtube className="w-4 h-4" />} />
            <PlatformCard platform="TikTok" views="2.1M" subs="+8.7K" color="#00f2ea" icon={<Video className="w-4 h-4" />} />
            <PlatformCard platform="Instagram" views="890K" subs="+1.2K" color="#E4405F" icon={<Instagram className="w-4 h-4" />} />
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Weekly Performance" subtitle="Views by day — last 7 days" icon={<TrendingUp className="w-5 h-5" />} storageKey="creators-home-weekly">
          <WeeklyBarChart />
        </CollapsibleCard>

        <CollapsibleCard title="Brand Deal Pipeline" subtitle="4 active negotiations · $34K potential" icon={<DollarSign className="w-5 h-5" />} storageKey="creators-home-deals">
          <div className="space-y-3">
            <DealRow brand="NordLayer" type="Sponsored Video" value="$8,500" status="negotiating" />
            <DealRow brand="Squarespace" type="Integration" value="$12,000" status="signed" />
            <DealRow brand="Audible" type="Affiliate Push" value="$4,200" status="delivered" />
            <DealRow brand="Luminar Neo" type="Tutorial Series" value="$9,500" status="new" />
          </div>
        </CollapsibleCard>
      </div>
    </div>
  );
}

function ContentPipeline() {
  const stages = [
    { title: "Ideas", count: 5, color: "border-[var(--accent-rose-500)]", items: [
      { name: "AI Avatar Deep Dive", detail: "Show the cloning process", ai: true },
      { name: "Day in the Life", detail: "Behind-the-scenes studio", ai: false },
    ]},
    { title: "Scripting", count: 3, color: "border-purple-500", items: [
      { name: "Multi-Platform Strategy", detail: "Repurposing masterclass", ai: true },
    ]},
    { title: "Editing", count: 2, color: "border-blue-500", items: [
      { name: "Q4 Revenue Breakdown", detail: "Transparent income report", ai: false },
    ]},
    { title: "Scheduled", count: 1, color: "border-amber-500", items: [
      { name: "Go Live Studio Tour", detail: "Premieres tomorrow 10AM", ai: true },
    ]},
    { title: "Published", count: 48, color: "border-emerald-500", items: [] },
  ];

  return (
    <div className="overflow-x-auto flex gap-4 pb-2">
      {stages.map((stage) => (
        <div key={stage.title} className="min-w-[240px] flex flex-col">
          <div className={cn("flex items-center justify-between p-3 rounded-t-xl border-t-2 bg-[var(--canvas-surface)]", stage.color)}>
            <span className="text-sm font-bold text-white">{stage.title}</span>
            <span className="text-xs bg-[var(--canvas-surface-raised)] text-white px-2 py-0.5 rounded-full">{stage.count}</span>
          </div>
          <div className="flex-1 bg-[var(--canvas-surface)] rounded-b-xl p-3 space-y-3 min-h-[180px]">
            {stage.items.map((item) => (
              <div key={item.name} className="bg-[var(--canvas-surface-raised)] border border-[var(--canvas-border)] rounded-xl p-3 hover:border-[var(--accent-rose-30)] transition-colors relative">
                {item.ai && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[var(--accent-rose-10)] border border-[var(--accent-rose-20)] text-[var(--accent-rose-400)] text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> AI Assist
                  </span>
                )}
                <p className="text-sm font-medium text-white">{item.name}</p>
                <p className="text-xs text-[#888]">{item.detail}</p>
              </div>
            ))}
            {stage.items.length === 0 && <div className="text-center text-[#444] text-xs py-6">{stage.count} published videos</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function PlatformCard({ platform, views, subs, color, icon }: { platform: string; views: string; subs: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-raised)] p-4">
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color }}>{icon}</span>
        <span className="text-sm font-semibold text-white">{platform}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-white">{views}</span>
        <span className="text-xs text-[#888]">views</span>
      </div>
      <p className="mt-1 text-xs text-emerald-400 font-medium">{subs} new subs</p>
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
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {d.val}0K
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-[#666]">
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
    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--canvas-surface-raised)] hover:bg-[#131e35] transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--accent-rose-10)] flex items-center justify-center text-[var(--accent-rose-400)] font-bold text-xs">
          {brand[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{brand}</p>
          <p className="text-xs text-[#888]">{type}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-white">{value}</span>
        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", c.bg, c.text)}>{c.label}</span>
      </div>
    </div>
  );
}

/* ═══ CALENDAR TAB ═══ */
function CalendarTab() {
  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const schedule = [
    { day: 0, slots: [{ time: "10:00", platform: "youtube", title: "Tech Review", type: "publish" }, { time: "15:00", platform: "tiktok", title: "Short Clip", type: "draft" }] },
    { day: 1, slots: [{ time: "09:00", platform: "instagram", title: "Reel Drop", type: "publish" }, { time: "19:00", platform: "twitch", title: "Live Q&A", type: "live" }] },
    { day: 2, slots: [{ time: "11:00", platform: "youtube", title: "Tutorial", type: "publish", best: true }] },
    { day: 3, slots: [{ time: "14:00", platform: "tiktok", title: "Trending Audio", type: "draft" }, { time: "20:00", platform: "x", title: "Space", type: "live" }] },
    { day: 4, slots: [{ time: "10:00", platform: "youtube", title: "Weekly Wrap", type: "publish", best: true }] },
    { day: 5, slots: [{ time: "12:00", platform: "instagram", title: "Story Series", type: "publish" }, { time: "18:00", platform: "twitch", title: "Gaming Stream", type: "live" }] },
    { day: 6, slots: [{ time: "11:00", platform: "youtube", title: "Behind Scenes", type: "draft" }] },
  ];

  const platformIcons: Record<string, React.ReactNode> = {
    youtube: <Youtube className="w-3.5 h-3.5" />,
    tiktok: <Video className="w-3.5 h-3.5" />,
    instagram: <Instagram className="w-3.5 h-3.5" />,
    twitch: <Twitch className="w-3.5 h-3.5" />,
    x: <Twitter className="w-3.5 h-3.5" />,
  };

  const platformColors: Record<string, string> = {
    youtube: "#FF0000",
    tiktok: "#00f2ea",
    instagram: "#E4405F",
    twitch: "#9146FF",
    x: "#1DA1F2",
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Publishing Schedule</h2>
          <p className="text-[#888]">Week of June 1 — June 7, 2026</p>
        </div>
        <div className="flex gap-2">
          <button className="dm-glass-strip px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--accent-rose-400)] border border-[var(--accent-rose-20)] bg-[var(--accent-rose-10)]">
            <Plus className="w-3 h-3" /> Add Slot
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {week.map((day, i) => {
          const daySchedule = schedule.find((s) => s.day === i);
          return (
            <div key={day} className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] overflow-hidden">
              <div className="p-3 border-b border-[var(--canvas-border)] text-center">
                <span className="text-xs font-bold text-white uppercase">{day}</span>
                <span className="block text-[10px] text-[#888]">Jun {i + 1}</span>
              </div>
              <div className="p-2 space-y-2 min-h-[200px]">
                {daySchedule?.slots.map((slot, idx) => (
                  <div key={idx} className={cn("rounded-xl p-2.5 text-xs relative", slot.type === "live" ? "bg-red-500/10 border border-red-500/20" : slot.type === "draft" ? "bg-[var(--canvas-surface-raised)] border border-dashed border-[var(--canvas-border)]" : "bg-[var(--accent-rose-10)] border border-[var(--accent-rose-20)]")}>
                    {slot.best && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" title="Best time to post" />}
                    <div className="flex items-center gap-1.5 mb-1">
                      <span style={{ color: platformColors[slot.platform] }}>{platformIcons[slot.platform]}</span>
                      <span className="text-[10px] text-[#888]">{slot.time}</span>
                    </div>
                    <p className="text-white font-medium truncate">{slot.title}</p>
                    {slot.type === "live" && (
                      <div className="flex items-center gap-1 mt-1">
                        <Radio className="w-2.5 h-2.5 text-red-400 animate-pulse" />
                        <span className="text-[9px] text-red-400 uppercase font-bold">Live</span>
                      </div>
                    )}
                  </div>
                ))}
                {!daySchedule?.slots.length && (
                  <div className="h-full flex items-center justify-center text-[#444] text-[10px]">No slots</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[var(--accent-rose-400)]" /> Upcoming Live Streams
        </h3>
        <div className="space-y-3">
          <StreamRow platform="twitch" title="Weekly Q&A — Ask Me Anything" time="Tue 7:00 PM" countdown="2h 14m" viewers="2.4K" />
          <StreamRow platform="youtube" title="Product Review Live — New Gear" time="Thu 2:00 PM" countdown="1d 4h" viewers="850" />
          <StreamRow platform="tiktok" title="Trending Audio Challenge Live" time="Sat 6:00 PM" countdown="2d 5h" viewers="1.2K" />
        </div>
      </div>
    </div>
  );
}

function StreamRow({ platform, title, time, countdown, viewers }: { platform: string; title: string; time: string; countdown: string; viewers: string }) {
  const icons: Record<string, React.ReactNode> = {
    twitch: <Twitch className="w-4 h-4" />,
    youtube: <Youtube className="w-4 h-4" />,
    tiktok: <Video className="w-4 h-4" />,
  };
  const colors: Record<string, string> = {
    twitch: "#9146FF",
    youtube: "#FF0000",
    tiktok: "#00f2ea",
  };
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-[var(--canvas-surface-raised)] hover:bg-[#131e35] transition-colors">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: colors[platform] + "20", color: colors[platform] }}>
        {icons[platform]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{title}</p>
        <p className="text-xs text-[#888]">{time}</p>
      </div>
      <div className="text-right">
        <p className="text-xs font-medium text-[var(--accent-rose-400)]">{countdown}</p>
        <p className="text-[10px] text-[#888]">{viewers} expected</p>
      </div>
      <button className="px-3 py-1.5 rounded-lg bg-[var(--accent-rose-10)] border border-[var(--accent-rose-20)] text-[var(--accent-rose-400)] text-xs font-medium hover:bg-[var(--accent-rose-20)] transition-colors">
        Remind
      </button>
    </div>
  );
}

/* ═══ AUDIENCE TAB ═══ */
function AudienceTab() {
  const segments = [
    { label: "New Followers", count: "12.4K", pct: "+24%", color: "bg-blue-500", width: "35%" },
    { label: "Active Engaged", count: "89.2K", pct: "+8%", color: "bg-[var(--accent-rose-500)]", width: "55%" },
    { label: "Dormant", count: "45.1K", pct: "-3%", color: "bg-amber-500", width: "25%" },
    { label: "VIP Supporters", count: "2.8K", pct: "+12%", color: "bg-emerald-500", width: "8%" },
  ];

  const topContent = [
    { title: "AI Avatar Tutorial", views: "2.1M", engagement: "12.4%", platform: "YouTube" },
    { title: "Day in the Life 2026", views: "1.8M", engagement: "9.2%", platform: "TikTok" },
    { title: "Revenue Breakdown Q1", views: "980K", engagement: "15.1%", platform: "YouTube" },
    { title: "Studio Tour", views: "760K", engagement: "7.8%", platform: "Instagram" },
  ];

  const fanQA = [
    { fan: "@creative_mind", question: "What camera do you use for your B-roll?", suggested: "Sony A7S III + 24-70mm GM — link in description!", likes: 234 },
    { fan: "@techie_sarah", question: "When is the next live stream?", suggested: "Tuesdays 7PM EST — set a reminder above!", likes: 189 },
    { fan: "@design_dave", question: "Can you review the new M4 MacBook?", suggested: "It's on the pipeline — expect it next week!", likes: 156 },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Audience Intelligence</h2>
          <p className="text-[#888]">Understand, segment, and grow your community</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Segments */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5">
            <h3 className="text-sm font-bold text-white mb-4">Follower Segments</h3>
            <div className="space-y-4">
              {segments.map((seg) => (
                <div key={seg.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white font-medium">{seg.label}</span>
                    <span className="text-xs text-[#888]">{seg.count} <span className={seg.pct.startsWith("+") ? "text-emerald-400" : "text-red-400"}>{seg.pct}</span></span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--canvas-surface-raised)] overflow-hidden">
                    <div className={cn("h-full rounded-full", seg.color)} style={{ width: seg.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5">
            <h3 className="text-sm font-bold text-white mb-3">Demographics</h3>
            <div className="space-y-3">
              <DemoBar label="18-24" pct={42} />
              <DemoBar label="25-34" pct={35} />
              <DemoBar label="35-44" pct={15} />
              <DemoBar label="45+" pct={8} />
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--canvas-border)] flex gap-4 text-center">
              <div className="flex-1">
                <p className="text-lg font-bold text-white">62%</p>
                <p className="text-[10px] text-[#888]">Male</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-white">36%</p>
                <p className="text-[10px] text-[#888]">Female</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-white">2%</p>
                <p className="text-[10px] text-[#888]">Other</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--accent-rose-400)]" /> Growth Trajectory
            </h3>
            <GrowthChart />
          </div>

          <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5">
            <h3 className="text-sm font-bold text-white mb-4">Top Performing Content</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topContent.map((content) => (
                <div key={content.title} className="rounded-xl bg-[var(--canvas-surface-raised)] border border-[var(--canvas-border)] p-4 hover:border-[var(--accent-rose-30)] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-[#888] uppercase tracking-wider">{content.platform}</span>
                    <Star className="w-3 h-3 text-amber-400" />
                  </div>
                  <p className="text-sm font-medium text-white mb-1">{content.title}</p>
                  <div className="flex items-center gap-3 text-xs text-[#888]">
                    <span>{content.views} views</span>
                    <span className="text-emerald-400">{content.engagement} engagement</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[var(--accent-rose-400)]" /> Fan Q&A Queue
            </h3>
            <div className="space-y-3">
              {fanQA.map((qa) => (
                <div key={qa.fan} className="rounded-xl bg-[var(--canvas-surface-raised)] border border-[var(--canvas-border)] p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent-rose-10)] flex items-center justify-center text-[var(--accent-rose-400)] text-xs font-bold flex-shrink-0">
                      {qa.fan[1].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#888] mb-0.5">{qa.fan}</p>
                      <p className="text-sm text-white mb-2">{qa.question}</p>
                      <div className="rounded-lg bg-[var(--canvas-surface)] border border-[var(--accent-rose-20)] p-3">
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
                        <button className="flex items-center gap-1 text-[10px] text-[#888] hover:text-white transition-colors">
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                        <span className="text-[10px] text-[#888] ml-auto flex items-center gap-1">
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
      <span className="text-xs text-[#888] w-12">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-[var(--canvas-surface-raised)] overflow-hidden">
        <div className="h-full rounded-full bg-[var(--accent-rose-500)]" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-white w-8 text-right">{pct}%</span>
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
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {v}K
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-[#666]">
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
        <h2 className="text-2xl font-bold text-white">Monetization & Deals</h2>
        <p className="text-[#888]">Revenue breakdown, brand deals, and deal pipeline</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="Monthly Revenue" value="$12.4K" trend="+$2.1K vs last month" trendPositive icon={<DollarSign className="w-5 h-5" />} />
        <KpiTile title="Active Sponsorships" value="4" subtitle="$34K potential" icon={<Star className="w-5 h-5" />} />
        <KpiTile title="Avg Deal Value" value="$7.9K" icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Conversion Rate" value="28%" trend="+4% vs last quarter" trendPositive icon={<CheckCircle2 className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-6">
          <h3 className="font-bold text-white mb-5 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-[var(--accent-rose-400)]" /> Revenue Breakdown
          </h3>
          <div className="space-y-4">
            {revenue.map((r) => (
              <div key={r.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white">{r.source}</span>
                  <span className="text-sm font-semibold text-white">{r.amount}</span>
                </div>
                <div className="h-3 rounded-full bg-[var(--canvas-surface-raised)] overflow-hidden">
                  <div className={cn("h-full rounded-full", r.color)} style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-[10px] text-[#888]">{r.pct}% of total</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Pipeline */}
        <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-6">
          <h3 className="font-bold text-white mb-5 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-[var(--accent-rose-400)]" /> Deal Value Pipeline
          </h3>
          <div className="space-y-3">
            {pipeline.map((p) => (
              <div key={p.stage} className="flex items-center justify-between p-3 rounded-xl bg-[var(--canvas-surface-raised)]">
                <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", p.count > 0 ? "bg-[var(--accent-rose-400)]" : "bg-[#333]")} />
                  <span className="text-sm text-white">{p.stage}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-white">{p.value}</span>
                  <span className="text-xs text-[#888] ml-2">{p.count} deals</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Deal Inbox */}
      <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-white flex items-center gap-2">
            <MailIcon className="w-5 h-5 text-[var(--accent-rose-400)]" /> Brand Deal Inbox
          </h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#888] hover:text-white transition-colors flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#888] hover:text-white transition-colors flex items-center gap-1">
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
    { icon: <Radio className="w-5 h-5" />, label: "Go Live Studio", desc: "Multi-platform streaming", featured: true, onClick: () => setShowGoLive(true) },
    { icon: <Wand2 className="w-5 h-5" />, label: "AI Avatar Cloning", desc: "Generate your digital twin", featured: true, onClick: () => setShowAvatar(true) },
    { icon: <Film className="w-5 h-5" />, label: "Content Studio", desc: "Edit, caption, and publish" },
    { icon: <DollarSign className="w-5 h-5" />, label: "Brand Deal Inbox", desc: "Manage sponsorships" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Fan Q&A Agent", desc: "Auto-reply to fans" },
    { icon: <Share2 className="w-5 h-5" />, label: "Repurpose Machine", desc: "One video → 12 formats" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics Deep Dive", desc: "Cross-platform insights" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", desc: "Account & preferences" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Creator Tools</h2>
        <p className="text-[#888]">Everything you need to create, stream, and scale</p>
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
                : "border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:bg-[var(--canvas-surface-raised)] hover:border-[var(--accent-rose-30)]"
            )}
          >
            <div className={cn("p-3 rounded-xl", item.featured ? "bg-[var(--accent-rose-20)] text-[var(--accent-rose-400)]" : "bg-[var(--accent-rose-10)] text-[var(--accent-rose-400)]")}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="text-xs text-[#888]">{item.desc}</p>
            </div>
            {item.featured && (
              <span className="mt-auto px-2 py-0.5 rounded-full bg-[var(--accent-rose-20)] border border-[var(--accent-rose-30)] text-[var(--accent-rose-400)] text-[9px] font-bold uppercase tracking-wider">
                Featured
              </span>
            )}
          </button>
        ))}
      </div>

      {showGoLive && <GoLiveStudio onClose={() => setShowGoLive(false)} />}
      {showAvatar && <AIAvatarCloning onClose={() => setShowAvatar(false)} />}
    </div>
  );
}

/* ─── Go Live Studio Modal ─── */
function GoLiveStudio({ onClose }: { onClose: () => void }) {
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
    { id: "youtube", name: "YouTube", icon: <Youtube className="w-5 h-5" />, color: "#FF0000" },
    { id: "tiktok", name: "TikTok", icon: <Video className="w-5 h-5" />, color: "#00f2ea" },
    { id: "instagram", name: "Instagram", icon: <Instagram className="w-5 h-5" />, color: "#E4405F" },
    { id: "twitch", name: "Twitch", icon: <Twitch className="w-5 h-5" />, color: "#9146FF" },
    { id: "x", name: "X / Twitter", icon: <Twitter className="w-5 h-5" />, color: "#1DA1F2" },
  ];

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const scheduledStreams = [
    { title: "Weekly Q&A", platform: "twitch", time: "Tue 7:00 PM", countdown: "2h 14m" },
    { title: "Product Review Live", platform: "youtube", time: "Thu 2:00 PM", countdown: "1d 4h" },
  ];

  const chatMessages = [
    { user: "@fan_one", msg: "Can't wait for this stream! 🔥", color: "#818CF8" },
    { user: "@creative_soul", msg: "First time catching you live!", color: "#A5B4FC" },
    { user: "@tech_guru", msg: "What mic are you using today?", color: "#C7D2FE" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-auto rounded-3xl border border-[var(--canvas-border)] bg-[var(--canvas-base)] shadow-2xl">
        <div className="p-6 border-b border-[var(--canvas-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Radio className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Go Live Studio</h3>
              <p className="text-xs text-[#888]">Multi-platform streaming control center</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--canvas-surface-raised)] transition-colors">
            <X className="w-5 h-5 text-[#888]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Platform Selector */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Select Platforms</h4>
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
                        ? "border-[var(--accent-rose-30)] bg-[var(--accent-rose-10)] text-white"
                        : "border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[#888] hover:text-white"
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
            {/* Stream Preview */}
            <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-[#0d1120] to-[#1a2040] flex items-center justify-center relative">
                {isLive ? (
                  <>
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                      <span className="text-xs font-bold text-red-400 uppercase">Live</span>
                    </div>
                    <div className="absolute top-3 right-3 text-xs text-[#888]">00:04:23</div>
                    <div className="text-center">
                      <Mic className="w-12 h-12 text-white/20 mx-auto mb-2" />
                      <p className="text-sm text-white/40">Stream preview active</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <Video className="w-12 h-12 text-white/20 mx-auto mb-2" />
                    <p className="text-sm text-white/40">Preview will appear here</p>
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
                      : "bg-[var(--accent-rose-500)] text-white hover:bg-[var(--accent-rose-600)] animate-pulse"
                  )}
                >
                  {isLive ? <><Pause className="w-4 h-4" /> End Stream</> : <><Play className="w-4 h-4" /> Start Stream</>}
                </button>
              </div>
            </div>

            {/* Stream Health + Chat */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Stream Health</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-[var(--canvas-surface-raised)] p-3 text-center">
                    <p className="text-[10px] text-[#888] uppercase">Bitrate</p>
                    <p className="text-lg font-bold text-white">{bitrate}</p>
                    <p className="text-[10px] text-emerald-400">kbps</p>
                  </div>
                  <div className="rounded-xl bg-[var(--canvas-surface-raised)] p-3 text-center">
                    <p className="text-[10px] text-[#888] uppercase">Resolution</p>
                    <p className="text-lg font-bold text-white">1080p</p>
                    <p className="text-[10px] text-emerald-400">HD</p>
                  </div>
                  <div className="rounded-xl bg-[var(--canvas-surface-raised)] p-3 text-center">
                    <p className="text-[10px] text-[#888] uppercase">Frame Rate</p>
                    <p className="text-lg font-bold text-white">{fps}</p>
                    <p className="text-[10px] text-emerald-400">fps</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Chat Preview</h4>
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
          <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-4">
            <h4 className="text-sm font-semibold text-white mb-3">Scheduled Streams</h4>
            <div className="space-y-2">
              {scheduledStreams.map((s) => (
                <div key={s.title} className="flex items-center justify-between p-3 rounded-xl bg-[var(--canvas-surface-raised)]">
                  <div className="flex items-center gap-3">
                    <span style={{ color: platforms.find((p) => p.id === s.platform)?.color }}>
                      {platforms.find((p) => p.id === s.platform)?.icon}
                    </span>
                    <div>
                      <p className="text-sm text-white">{s.title}</p>
                      <p className="text-xs text-[#888]">{s.time}</p>
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

/* ─── AI Avatar Cloning Modal ─── */
function AIAvatarCloning({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"upload" | "style" | "preview">("upload");
  const [selectedStyle, setSelectedStyle] = useState("professional");

  const styles = [
    { id: "professional", name: "Professional", desc: "Clean headshot, studio lighting", icon: <Monitor className="w-4 h-4" /> },
    { id: "casual", name: "Casual", desc: "Relaxed, authentic vibe", icon: <Smartphone className="w-4 h-4" /> },
    { id: "cinematic", name: "Cinematic", desc: "Dramatic lighting, film look", icon: <Film className="w-4 h-4" /> },
    { id: "animated", name: "Animated", desc: "Stylized 3D character", icon: <Palette className="w-4 h-4" /> },
    { id: "realistic", name: "Realistic", desc: "Photorealistic, indistinguishable", icon: <Camera className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-auto rounded-3xl border border-[var(--canvas-border)] bg-[var(--canvas-base)] shadow-2xl">
        <div className="p-6 border-b border-[var(--canvas-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-rose-10)] flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-[var(--accent-rose-400)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Avatar Cloning</h3>
              <p className="text-xs text-[#888]">Generate your digital twin for content at scale</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--canvas-surface-raised)] transition-colors">
            <X className="w-5 h-5 text-[#888]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Progress */}
          <div className="flex items-center gap-2">
            {["upload", "style", "preview"].map((s, i) => (
              <React.Fragment key={s}>
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold", step === s ? "bg-[var(--accent-rose-500)] text-white" : i < ["upload", "style", "preview"].indexOf(step) ? "bg-emerald-500/20 text-emerald-400" : "bg-[var(--canvas-surface-raised)] text-[#888]")}>
                  {i < ["upload", "style", "preview"].indexOf(step) ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                {i < 2 && <div className={cn("flex-1 h-0.5", i < ["upload", "style", "preview"].indexOf(step) ? "bg-emerald-500/30" : "bg-[var(--canvas-border)]")} />}
              </React.Fragment>
            ))}
          </div>

          {step === "upload" && (
            <div className="rounded-2xl border-2 border-dashed border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-10 text-center hover:border-[var(--accent-rose-30)] transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-[var(--accent-rose-400)] mx-auto mb-3" />
              <p className="text-sm font-medium text-white mb-1">Upload a photo or video</p>
              <p className="text-xs text-[#888]">PNG, JPG, or MP4 — min 512×512px</p>
              <button onClick={() => setStep("style")} className="mt-4 px-4 py-2 rounded-xl bg-[var(--accent-rose-10)] border border-[var(--accent-rose-20)] text-[var(--accent-rose-400)] text-xs font-medium hover:bg-[var(--accent-rose-20)] transition-colors">
                Use Sample Photo
              </button>
            </div>
          )}

          {step === "style" && (
            <div className="space-y-3">
              <p className="text-sm text-white font-medium">Choose your avatar style</p>
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
                    selectedStyle === s.id
                      ? "border-[var(--accent-rose-30)] bg-[var(--accent-rose-10)]"
                      : "border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-[var(--accent-rose-30)]"
                  )}
                >
                  <div className={cn("p-2.5 rounded-xl", selectedStyle === s.id ? "bg-[var(--accent-rose-20)] text-[var(--accent-rose-400)]" : "bg-[var(--canvas-surface-raised)] text-[#888]")}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{s.name}</p>
                    <p className="text-xs text-[#888]">{s.desc}</p>
                  </div>
                  {selectedStyle === s.id && <CheckCircle2 className="w-5 h-5 text-[var(--accent-rose-400)]" />}
                </button>
              ))}
              <button onClick={() => setStep("preview")} className="w-full py-3 rounded-xl bg-[var(--accent-rose-500)] text-white text-sm font-bold hover:bg-[var(--accent-rose-600)] transition-colors">
                Generate Preview
              </button>
            </div>
          )}

          {step === "preview" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-6 text-center">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[var(--accent-rose-500)] to-[var(--accent-rose-600)] mx-auto mb-4 flex items-center justify-center">
                  <Wand2 className="w-12 h-12 text-white/40" />
                </div>
                <p className="text-sm font-medium text-white mb-1">Your AI Avatar is Ready</p>
                <p className="text-xs text-[#888]">Professional style · 4K render · 0.8s generation</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button className="p-3 rounded-xl bg-[var(--canvas-surface)] border border-[var(--canvas-border)] hover:border-[var(--accent-rose-30)] transition-colors text-center">
                  <Film className="w-4 h-4 text-[var(--accent-rose-400)] mx-auto mb-1" />
                  <span className="text-[10px] text-white">Marketing Video</span>
                </button>
                <button className="p-3 rounded-xl bg-[var(--canvas-surface)] border border-[var(--canvas-border)] hover:border-[var(--accent-rose-30)] transition-colors text-center">
                  <Globe className="w-4 h-4 text-[var(--accent-rose-400)] mx-auto mb-1" />
                  <span className="text-[10px] text-white">Multi-Language</span>
                </button>
                <button className="p-3 rounded-xl bg-[var(--canvas-surface)] border border-[var(--canvas-border)] hover:border-[var(--accent-rose-30)] transition-colors text-center">
                  <Calendar className="w-4 h-4 text-[var(--accent-rose-400)] mx-auto mb-1" />
                  <span className="text-[10px] text-white">Schedule</span>
                </button>
              </div>

              {/* Upsell Banner */}
              <div className="rounded-xl bg-gradient-to-r from-[var(--accent-rose-10)] to-[var(--accent-rose-20)] border border-[var(--accent-rose-30)] p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Upgrade to Pro Clone</p>
                  <p className="text-xs text-[#888]">Unlimited generations · Voice cloning · 4K video</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[var(--accent-rose-500)] text-white text-xs font-bold hover:bg-[var(--accent-rose-600)] transition-colors">
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
