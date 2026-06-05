"use client";

import React, { useState } from "react";
import {
  Camera, Calendar, Users, DollarSign, MoreHorizontal,
  Clock, TrendingUp, Star, UserPlus, Briefcase,
  ChevronRight, Plus, Zap, Share2, Film,
  Eye, Download, Mail, BarChart3, Send,
  Edit2, MapPin, FileText, CheckCircle2,
  RefreshCw, Search, Image as ImageIcon, Smartphone,
  CreditCard, Sparkles, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LightDashboardShell, type TabDef } from "../shared/LightDashboardShell";
import { KpiTile } from "../shared/KpiTile";
import { CollapsibleCard } from "../shared/CollapsibleCard";
import "../shared/dashboard-light.css";
import "./photography-tokens.css";

/* ───────────────────────────────────────────────────────────
   DashboardPhotography — Raycast-inspired monochrome + amber
   ─────────────────────────────────────────────────────────── */

export function DashboardPhotography() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs: TabDef[] = [
    { id: "home", label: "Dashboard", icon: <Camera className="w-5 h-5" /> },
    { id: "calendar", label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
    { id: "gallery", label: "Gallery & AI", icon: <ImageIcon className="w-5 h-5" /> },
    { id: "leads", label: "Leads & CRM", icon: <Users className="w-5 h-5" /> },
    { id: "social", label: "Social", icon: <Share2 className="w-5 h-5" /> },
    { id: "model", label: "Model Dev", icon: <Film className="w-5 h-5" /> },
    { id: "content", label: "Content", icon: <Sparkles className="w-5 h-5" /> },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <LightDashboardShell
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      greeting="Good morning, Drake"
      dateLabel="May 23, 2026"
      accentColor="#f59e0b"
      userName="Drake Reynolds"
      userInitials="DR"
      businessName="Photography Studio"
      avatarGradient={["#f59e0b", "#fbbf24"]}
      quickStats={<>
        <StatPill label="3 Shoots Today" />
        <StatPill label="12 Galleries Pending" />
        <StatPill label="$8,400 MTD" />
      </>}
    >
      {activeTab === "home" && <HomeTab />}
      {activeTab === "calendar" && <BookingsTab />}
      {activeTab === "gallery" && <GalleryTab />}
      {activeTab === "leads" && <LeadsTab />}
      {activeTab === "social" && <SocialTab />}
      {activeTab === "model" && <ModelTab />}
      {activeTab === "content" && <ContentTab />}
      {activeTab === "reviews" && <ReviewsTab />}
      {activeTab === "settings" && <SettingsTab />}
    </LightDashboardShell>
  );
}

function StatPill({ label }: { label: string }) {
  return (
    <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-medium whitespace-nowrap">
      {label}
    </div>
  );
}

/* ═══ HOME TAB ═══ */
function HomeTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="Sessions This Month" value="24" trend="+4 vs last month" trendPositive icon={<Camera className="w-5 h-5" />} />
        <KpiTile title="Avg Booking Value" value="$1,250" icon={<DollarSign className="w-5 h-5" />} />
        <KpiTile title="Gallery Turnaround" value="3.2 days" subtitle="avg delivery" icon={<Clock className="w-5 h-5" />} />
        <KpiTile title="Review Score" value="4.9★" subtitle="(142 reviews)" icon={<Star className="w-5 h-5" />} />
      </div>

      <div className="space-y-4">
        <CollapsibleCard title="Today's Shoots" subtitle="3 sessions • $3,750" icon={<Camera className="w-5 h-5" />} defaultOpen storageKey="photo-home-today">
          <div className="space-y-3">
            <ShootRow time="9:00 AM" client="The Hendersons" type="Family Portrait" location="Griffith Park" price="$850" status="in-progress" />
            <ShootRow time="1:00 PM" client="Emma & Ryan" type="Engagement Session" location="Venice Beach" price="$1,200" status="upcoming" />
            <ShootRow time="5:30 PM" client="Aria Fashion" type="Brand Campaign" location="Studio" price="$1,700" status="upcoming" />
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Upcoming This Week" subtitle="8 sessions • $9,800" icon={<Calendar className="w-5 h-5" />} storageKey="photo-home-upcoming">
          <div className="space-y-3">
            {[
              { day: "Monday", count: "2 sessions", revenue: "$2,100" },
              { day: "Wednesday", count: "3 sessions", revenue: "$4,200" },
              { day: "Friday", count: "3 sessions", revenue: "$3,500" },
            ].map((row) => (
              <div key={row.day} className="flex items-center justify-between p-3 rounded-xl bg-white/60">
                <div>
                  <p className="text-sm font-medium text-[var(--dl-ink)]">{row.day}</p>
                  <p className="text-xs text-[var(--dl-muted)]">{row.count}</p>
                </div>
                <span className="text-sm font-semibold text-amber-500">{row.revenue}</span>
              </div>
            ))}
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Gallery Delivery Queue" subtitle="12 galleries in progress" icon={<ImageIcon className="w-5 h-5" />} storageKey="photo-home-gallery">
          <div className="space-y-3">
            <GalleryQueueRow client="Martinez Wedding" date="Shot May 18" status="culling" due="May 25" />
            <GalleryQueueRow client="Aria Fashion" date="Shot May 20" status="editing" due="May 24" />
            <GalleryQueueRow client="Thompson Family" date="Shot May 21" status="review" due="Today" urgent />
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Revenue This Week" subtitle="$6,400 — up 18%" icon={<BarChart3 className="w-5 h-5" />} storageKey="photo-home-revenue">
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-1.5 h-24">
              {[55, 70, 45, 90, 100, 60, 40].map((h, i) => (
                <div key={i} className="flex-1 rounded-t transition-all" style={{ height: `${h}%`, background: `rgba(245,158,11,${0.2 + h / 200})` }} />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[var(--dl-muted)]">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Rebook Rate</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">64%</p>
              </div>
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Avg Ticket</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">$1,250</p>
              </div>
            </div>
          </div>
        </CollapsibleCard>
      </div>
    </div>
  );
}

function ShootRow({ time, client, type, location, price, status }: { time: string; client: string; type: string; location: string; price: string; status: "in-progress" | "upcoming" | "done" }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-colors">
      <div className="w-16 text-xs font-medium text-[var(--dl-muted)]">{time}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--dl-ink)] truncate">{client}</span>
          {status === "in-progress" && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
        </div>
        <p className="text-xs text-[var(--dl-muted)] truncate">{type} • {location}</p>
      </div>
      <span className="text-sm font-semibold text-amber-500">{price}</span>
    </div>
  );
}

function GalleryQueueRow({ client, date, status, due, urgent }: { client: string; date: string; status: string; due: string; urgent?: boolean }) {
  const statusColor = status === "culling" ? "text-blue-400" : status === "editing" ? "text-amber-500" : "text-emerald-400";
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/60">
      <div>
        <p className="text-sm font-medium text-[var(--dl-ink)]">{client}</p>
        <p className="text-xs text-[var(--dl-muted)]">{date}</p>
      </div>
      <div className="text-right">
        <p className={cn("text-xs font-medium capitalize", statusColor)}>{status}</p>
        <p className={cn("text-[10px]", urgent ? "text-red-400 font-bold" : "text-[var(--dl-muted)]")}>Due {due}</p>
      </div>
    </div>
  );
}

/* ═══ BOOKINGS TAB ═══ */
function BookingsTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Shoot Calendar</h2>
          <p className="text-[var(--dl-muted)]">Manage sessions and client prep</p>
        </div>
        <button className="px-4 py-2 bg-amber-500 text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-amber-600 transition-colors">
          + New Booking
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/40 border border-white/50 rounded-2xl p-6 min-h-[500px] flex items-center justify-center text-[var(--dl-muted)]">
          <div className="text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-sm">Calendar Integration</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/50 bg-white/40 p-5">
            <h3 className="text-sm font-semibold text-[var(--dl-ink)] mb-4 flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-500" /> Next Session
            </h3>
            <div className="space-y-2">
              <p className="text-base font-bold text-[var(--dl-ink)]">Emma & Ryan — Engagement</p>
              <p className="text-sm text-[var(--dl-muted)]">Today at 1:00 PM</p>
              <p className="text-xs text-[var(--dl-muted)] flex items-center gap-1"><MapPin className="w-3 h-3" /> Venice Beach</p>
              <div className="mt-4 pt-4 border-t border-white/50 space-y-2">
                <p className="text-xs font-semibold text-[var(--dl-muted)] uppercase tracking-wider">Prep Notes</p>
                <p className="text-xs text-[var(--dl-muted)]">Golden hour shoot. Client requested soft warm tones. Bring reflector + ND filter. Emma prefers candid over posed.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/50 bg-white/40 p-5">
            <h3 className="text-sm font-semibold text-[var(--dl-ink)] mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" /> Contracts Pending
            </h3>
            <div className="space-y-3">
              {["Aria Fashion — Campaign", "Lopez Quinceañera", "Blue Sky Realty"].map((name) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--dl-ink)]">{name}</span>
                  <span className="text-xs text-amber-400 font-medium">Awaiting</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ GALLERY TAB (mapped to "clients" tab slot) ═══ */
function GalleryTab() {
  const [filter, setFilter] = useState<"all" | "culling" | "editing" | "delivered">("all");
  const galleries = [
    { id: 1, client: "Martinez Wedding", date: "May 18", photos: 847, status: "culling", cover: "bg-rose-900" },
    { id: 2, client: "Aria Fashion Shoot", date: "May 20", photos: 312, status: "editing", cover: "bg-amber-900" },
    { id: 3, client: "Thompson Family", date: "May 21", photos: 203, status: "review", cover: "bg-stone-700" },
    { id: 4, client: "Tech Corp Headshots", date: "May 15", photos: 156, status: "delivered", cover: "bg-slate-700" },
    { id: 5, client: "Emma & Ryan Engagement", date: "May 10", photos: 421, status: "delivered", cover: "bg-orange-900" },
    { id: 6, client: "Sunset Brand Session", date: "May 8", photos: 289, status: "delivered", cover: "bg-zinc-700" },
  ];
  const filtered = filter === "all" ? galleries : galleries.filter((g) => g.status === filter || (filter === "editing" && g.status === "review"));

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">AI Gallery Studio</h2>
          <p className="text-[var(--dl-muted)]">Sort, cull, and deliver with NORI</p>
        </div>
        <div className="flex gap-2">
          {(["all", "culling", "editing", "delivered"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors",
                filter === f ? "bg-[var(--accent-rose-10)] text-amber-500 border border-[var(--accent-rose-20)]" : "text-[var(--dl-muted)] hover:text-[var(--dl-ink)]"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((g) => (
          <div key={g.id} className="rounded-2xl border border-white/50 bg-white/40 overflow-hidden hover:border-[var(--accent-rose-30)] transition-colors cursor-pointer group">
            <div className={cn("h-40 flex items-center justify-center", g.cover)}>
              <Camera className="w-10 h-10 text-[var(--dl-ink)]/20 group-hover:text-[var(--dl-ink)]/40 transition-colors" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-[var(--dl-ink)]">{g.client}</p>
                  <p className="text-xs text-[var(--dl-muted)]">{g.date} • {g.photos} photos</p>
                </div>
                <StatusChip status={g.status} />
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 bg-white/60 hover:bg-[#252525] rounded-lg text-xs text-[var(--dl-ink)] transition-colors flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3" /> View
                </button>
                {g.status !== "delivered" && (
                  <button className="flex-1 py-1.5 bg-[var(--accent-rose-10)] hover:bg-[var(--accent-rose-20)] rounded-lg text-xs text-amber-500 transition-colors flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Sort
                  </button>
                )}
                {g.status === "delivered" && (
                  <button className="flex-1 py-1.5 bg-white/60 rounded-lg text-xs text-[var(--dl-muted)] transition-colors flex items-center justify-center gap-1">
                    <Download className="w-3 h-3" /> Link
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const config: Record<string, { label: string; cls: string }> = {
    culling: { label: "Culling", cls: "bg-blue-500/10 text-blue-400" },
    editing: { label: "Editing", cls: "bg-[var(--accent-rose-10)] text-amber-500" },
    review: { label: "Review", cls: "bg-purple-500/10 text-purple-400" },
    delivered: { label: "Delivered", cls: "bg-emerald-500/10 text-emerald-400" },
  };
  const { label, cls } = config[status] ?? { label: status, cls: "text-[var(--dl-muted)]" };
  return <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", cls)}>{label}</span>;
}

/* ═══ LEADS TAB (mapped to "money" tab slot) ═══ */
function LeadsTab() {
  const [scanState, setScanState] = useState<"idle" | "running" | "done">("idle");
  const [logLines, setLogLines] = useState<{ time: string; msg: string; color: string }[]>([]);

  const startScan = () => {
    setScanState("running");
    setLogLines([]);
    const phrases = ["Bypassing bot detection...", "Scanning local directories...", "Extracting business metadata...", "Analyzing competitor pricing...", "Validating contact data..."];
    let i = 0;
    const interval = setInterval(() => {
      const now = new Date();
      const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
      setLogLines((prev) => [...prev, { time: t, msg: phrases[i % phrases.length], color: "text-[var(--dl-muted)]" }]);
      i++;
      if (i > 7) {
        clearInterval(interval);
        const t2 = `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, "0")}`;
        setLogLines((prev) => [...prev, { time: t2, msg: "Success: Scraped 9 high-intent leads.", color: "text-emerald-400" }, { time: t2, msg: "Scan complete.", color: "text-amber-500 font-bold" }]);
        setScanState("done");
      }
    }, 1200);
  };

  return (
    <div className="flex h-full bg-[var(--canvas-base)]">
      <div className="w-[320px] border-r border-white/50 bg-white/40 p-6 flex flex-col flex-shrink-0 space-y-6">
        <h2 className="text-lg font-bold text-[var(--dl-ink)] flex items-center gap-2">
          <Search className="w-5 h-5 text-amber-500" /> Lead Scanner
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-[var(--dl-muted)] font-medium uppercase tracking-wider">Target Keywords</label>
            <input className="w-full bg-white/60 border border-white/50 rounded-lg px-4 py-2 text-sm text-[var(--dl-ink)] focus:outline-none focus:border-[var(--accent-rose-500)]" defaultValue="Wedding photographer, Event photography LA" />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-[var(--dl-muted)] font-medium uppercase tracking-wider">Location</label>
            <input className="w-full bg-white/60 border border-white/50 rounded-lg px-4 py-2 text-sm text-[var(--dl-ink)] focus:outline-none focus:border-[var(--accent-rose-500)]" defaultValue="Los Angeles, CA" />
          </div>
          <button
            onClick={startScan}
            disabled={scanState === "running"}
            className={cn("w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
              scanState === "running" ? "bg-[var(--accent-rose-20)] text-amber-500 border border-[var(--accent-rose-30)]" : "bg-amber-500 text-[var(--dl-ink)] hover:bg-amber-600"
            )}
          >
            {scanState === "running" ? <><RefreshCw className="w-4 h-4 animate-spin" /> Crawling...</> : <><Zap className="w-4 h-4" /> Run Scan</>}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-44 border-b border-white/50 bg-[#070709] p-4 overflow-y-auto font-mono text-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 font-bold">NORI LEAD ENGINE LIVE SESSION</span>
          </div>
          {logLines.map((line, i) => (
            <div key={i} className="mb-1"><span className="text-[var(--dl-muted)] mr-2">[{line.time}]</span><span className={line.color}>{line.msg}</span></div>
          ))}
          {scanState === "idle" && <p className="text-[#333]">$ ready for instructions...</p>}
        </div>
        <div className="flex-1 overflow-x-auto p-6 bg-[var(--canvas-base)] flex gap-6">
          {[
            { title: "New Leads", count: scanState === "done" ? 9 : 0, color: "border-[var(--accent-rose-500)]", children: scanState !== "idle" && [{ name: "Vanessa & Chris", type: "Wedding Package", score: "94", time: "Inquiry 1h ago", hot: true }, { name: "Luxe Events Co.", type: "Corporate Events", score: "87", time: "Google Lead" }] },
            { title: "Contacted", count: 3, color: "border-purple-500", children: [{ name: "Sophie Nguyen", type: "Maternity Shoot", score: "78", time: "DM'd yesterday" }] },
            { title: "Booked", count: 7, color: "border-emerald-500", children: [] },
            { title: "Completed", count: 48, color: "border-white/50", children: [] },
          ].map((col) => (
            <div key={col.title} className="min-w-[260px] flex flex-col">
              <div className={cn("flex items-center justify-between p-3 rounded-t-xl border-t-2 bg-white/40", col.color)}>
                <span className="text-sm font-bold text-[var(--dl-ink)]">{col.title}</span>
                <span className="text-xs bg-white/60 text-[var(--dl-ink)] px-2 py-0.5 rounded-full">{col.count}</span>
              </div>
              <div className="flex-1 bg-white/40 rounded-b-xl p-3 space-y-3">
                {Array.isArray(col.children) && col.children.map((lead: any) => (
                  <div key={lead.name} className="bg-white/60 border border-white/50 rounded-xl p-3 hover:border-[var(--accent-rose-30)] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-[var(--dl-ink)]">{lead.name}</p>
                      {lead.hot && <span className="text-[10px] font-bold text-amber-500 uppercase">Hot</span>}
                    </div>
                    <p className="text-xs text-[var(--dl-muted)]">{lead.type}</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] text-[var(--dl-muted)]">{lead.time}</span>
                      <span className="text-xs font-medium text-[var(--dl-ink)]">Score: {lead.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══ MORE TAB ═══ */
function MoreTab() {
  const items = [
    { icon: <Share2 className="w-5 h-5" />, label: "Social Media", desc: "Instagram, Pinterest, Behance" },
    { icon: <Film className="w-5 h-5" />, label: "Content Studio", desc: "BTS reels, portfolio updates" },
    { icon: <Star className="w-5 h-5" />, label: "Reviews", desc: "Google, Yelp, The Knot" },
    { icon: <Smartphone className="w-5 h-5" />, label: "Client Portal", desc: "Gallery delivery & proofing" },
    { icon: <Mail className="w-5 h-5" />, label: "Email Campaigns", desc: "Seasonal promos & referrals" },
    { icon: <FileText className="w-5 h-5" />, label: "Contracts & Invoices", desc: "Templates & e-sign" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Billing & Plans", desc: "Subscription & payments" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", desc: "Account & preferences" },
  ];
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--dl-ink)]">More</h2>
        <p className="text-[var(--dl-muted)]">Everything else you need</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <button key={item.label} className="flex items-center gap-4 p-5 rounded-2xl border border-white/50 bg-white/40 hover:bg-white/60 hover:border-[var(--accent-rose-30)] transition-colors text-left">
            <div className="p-3 rounded-xl bg-[var(--accent-rose-10)] text-amber-500">{item.icon}</div>
            <div>
              <p className="text-sm font-semibold text-[var(--dl-ink)]">{item.label}</p>
              <p className="text-xs text-[var(--dl-muted)]">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#333] ml-auto" />
          </button>
        ))}
      </div>
    </div>
  );
}
