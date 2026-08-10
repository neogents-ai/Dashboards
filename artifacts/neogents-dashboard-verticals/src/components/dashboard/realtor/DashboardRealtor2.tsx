"use client";

import React, { useState } from "react";
import {
  Building2, Calendar, Users, DollarSign, MoreHorizontal,
  Clock, TrendingUp, Star, UserPlus, ChevronRight,
  Plus, Zap, Share2, Film, Mail, BarChart3,
  MapPin, FileText, CheckCircle2, RefreshCw,
  Search, Smartphone, CreditCard, Settings,
  Home, Landmark, Target, ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LightDashboardShell, type TabDef } from "../shared/LightDashboardShell";
import { KpiTile } from "../shared/KpiTile";
import { CollapsibleCard } from "../shared/CollapsibleCard";
import "../shared/dashboard-light.css";
import "./realtor-tokens.css";

/* ───────────────────────────────────────────────────────────
   DashboardRealtor2 — Linear / Arc: indigo + deep blue
   ─────────────────────────────────────────────────────────── */

export function DashboardRealtor2() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const tabs: TabDef[] = [
    { id: "home", label: "Dashboard", icon: <Building2 className="w-5 h-5" /> },
    { id: "calendar", label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
    { id: "listings", label: "Listings", icon: <Home className="w-5 h-5" /> },
    { id: "leads", label: "Leads & CRM", icon: <Users className="w-5 h-5" /> },
    { id: "social", label: "Social", icon: <Share2 className="w-5 h-5" /> },
    { id: "pipeline", label: "Pipeline", icon: <Target className="w-5 h-5" /> },
    { id: "content", label: "Content", icon: <Film className="w-5 h-5" /> },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <LightDashboardShell
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      greeting="Good morning, Jordan"
      dateLabel="May 23, 2026"
      accentColor="#6366F1"
      userName="Jordan Williams"
      userInitials="JW"
      businessName="Premier Realty"
      avatarGradient={["#6366F1", "#818CF8"]}
      verticalName="Realtor"
    >
      {activeTab === "home" && <HomeTab />}
      {activeTab === "calendar" && <ListingsTab />}
      {activeTab === "listings" && <ListingsTab />}
      {activeTab === "leads" && <LeadsTab />}
      {activeTab === "social" && <SocialTab />}
      {activeTab === "pipeline" && <PipelineTab />}
      {activeTab === "content" && <ContentTab />}
      {activeTab === "reviews" && <ReviewsTab />}
      {activeTab === "settings" && <SettingsTab />}
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
        <KpiTile title="Active Listings" value="12" trend="+2 this month" trendPositive icon={<Building2 className="w-5 h-5" />} />
        <KpiTile title="Showings This Week" value="8" icon={<Calendar className="w-5 h-5" />} />
        <KpiTile title="Leads in Pipeline" value="34" icon={<Users className="w-5 h-5" />} />
        <KpiTile title="Avg Deal Value" value="$720K" icon={<DollarSign className="w-5 h-5" />} />
      </div>

      <div className="space-y-4">
        <CollapsibleCard title="Today's Showings" subtitle="3 properties • 6 clients" icon={<Home className="w-5 h-5" />} defaultOpen storageKey="realtor-home-today">
          <div className="space-y-3">
            <ShowingRow time="10:00 AM" address="2142 Laurel Canyon Blvd" price="$1.2M" clients="The Hendersons" status="in-progress" />
            <ShowingRow time="1:00 PM" address="5801 Sunset Strip #3B" price="$680K" clients="Marcus & Sofia" status="upcoming" />
            <ShowingRow time="4:30 PM" address="9220 Bel Air Estate Dr" price="$3.4M" clients="Priya Shah" status="upcoming" />
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Follow-ups Due Today" subtitle="5 contacts" icon={<CheckCircle2 className="w-5 h-5" />} storageKey="realtor-home-followup">
          <div className="space-y-3">
            <TaskRow label="Call Henderson family — post-showing feedback" due="Today" priority="high" />
            <TaskRow label="Send disclosure docs to Marcus & Sofia" due="Today" priority="high" />
            <TaskRow label="Follow up on Rodriguez offer status" due="Today" priority="medium" />
            <TaskRow label="Schedule second showing for Patel family" due="Tomorrow" priority="low" />
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Recent Activity" subtitle="Pipeline updates" icon={<BarChart3 className="w-5 h-5" />} storageKey="realtor-home-activity">
          <div className="space-y-3">
            {[
              { event: "Offer Accepted", detail: "4821 Mulholland Dr — $895,000", time: "2h ago", positive: true },
              { event: "New Lead", detail: "David Kim via Zillow — Budget $1.5M", time: "5h ago", positive: true },
              { event: "Price Reduction", detail: "7702 Hollywood Hills Rd — to $1.1M", time: "Yesterday", positive: false },
              { event: "Closing Confirmed", detail: "312 Ocean Front Walk — $2.1M", time: "Yesterday", positive: true },
            ].map((item) => (
              <div key={item.event + item.time} className="flex items-start gap-3 p-3 rounded-xl bg-white/60">
                <div className={cn("w-2 h-2 rounded-full flex-shrink-0 mt-1.5", item.positive ? "bg-emerald-400" : "bg-amber-400")} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--dl-ink)]">{item.event}</p>
                  <p className="text-xs text-[var(--dl-muted)] truncate">{item.detail}</p>
                </div>
                <span className="text-[10px] text-[#555] whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </CollapsibleCard>
      </div>
    </div>
  );
}

function ShowingRow({ time, address, price, clients, status }: { time: string; address: string; price: string; clients: string; status: "in-progress" | "upcoming" }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/60 hover:bg-[#131e35] transition-colors">
      <div className="w-16 text-xs font-medium text-[var(--dl-muted)]">{time}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--dl-ink)] truncate">{address}</span>
          {status === "in-progress" && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
        </div>
        <p className="text-xs text-[var(--dl-muted)] truncate">{clients}</p>
      </div>
      <span className="text-sm font-semibold text-[var(--accent-rose-400)]">{price}</span>
    </div>
  );
}

function TaskRow({ label, due, priority }: { label: string; due: string; priority: "high" | "medium" | "low" }) {
  const color = priority === "high" ? "text-red-400" : priority === "medium" ? "text-amber-400" : "text-[var(--dl-muted)]";
  const dot = priority === "high" ? "bg-red-400" : priority === "medium" ? "bg-amber-400" : "bg-[#555]";
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/60">
      <div className="flex items-center gap-3">
        <div className={cn("w-2 h-2 rounded-full flex-shrink-0", dot)} />
        <span className="text-sm text-[var(--dl-ink)]">{label}</span>
      </div>
      <span className={cn("text-xs font-medium flex-shrink-0", color)}>{due}</span>
    </div>
  );
}

/* ═══ LISTINGS TAB ═══ */
function ListingsTab() {
  const [filter, setFilter] = useState<"all" | "active" | "contract" | "sold">("all");
  const listings = [
    { id: 1, address: "2142 Laurel Canyon Blvd", area: "Hollywood Hills", price: "$1,200,000", beds: 4, baths: 3, sqft: "2,850", status: "active", days: 12 },
    { id: 2, address: "5801 Sunset Strip #3B", area: "West Hollywood", price: "$680,000", beds: 2, baths: 2, sqft: "1,240", status: "active", days: 5 },
    { id: 3, address: "9220 Bel Air Estate Dr", area: "Bel Air", price: "$3,400,000", beds: 6, baths: 5, sqft: "6,200", status: "active", days: 21 },
    { id: 4, address: "4821 Mulholland Dr", area: "Mulholland", price: "$895,000", beds: 3, baths: 2, sqft: "2,100", status: "contract", days: 34 },
    { id: 5, address: "312 Ocean Front Walk", area: "Venice Beach", price: "$2,100,000", beds: 4, baths: 3, sqft: "3,400", status: "sold", days: 60 },
    { id: 6, address: "7702 Hollywood Hills Rd", area: "Hollywood Hills", price: "$1,100,000", beds: 3, baths: 3, sqft: "2,400", status: "active", days: 28 },
  ];
  const filtered = filter === "all" ? listings : listings.filter((l) => l.status === filter);

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Active Listings</h2>
          <p className="text-[var(--dl-muted)]">Track and manage all properties</p>
        </div>
        <div className="flex gap-2">
          {(["all", "active", "contract", "sold"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors", filter === f ? "bg-[var(--accent-rose-10)] text-[var(--accent-rose-400)] border border-[var(--accent-rose-20)]" : "text-[var(--dl-muted)] hover:text-[var(--dl-ink)]")}>
              {f === "contract" ? "Under Contract" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((l) => (
          <div key={l.id} className="rounded-2xl border border-white/50 bg-white/40 overflow-hidden hover:border-[var(--accent-rose-30)] transition-colors">
            <div className="h-36 bg-gradient-to-br from-[#0d1120] to-[#1a2040] flex items-center justify-center">
              <Building2 className="w-10 h-10 text-[var(--dl-ink)]/10" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-[var(--dl-ink)]">{l.address}</p>
                  <p className="text-xs text-[var(--dl-muted)] flex items-center gap-1"><MapPin className="w-3 h-3" /> {l.area}</p>
                </div>
                <ListingStatusChip status={l.status} />
              </div>
              <p className="text-xl font-bold text-[var(--accent-rose-400)] mt-2">{l.price}</p>
              <div className="flex gap-4 mt-2 text-xs text-[var(--dl-muted)]">
                <span>{l.beds} bd</span>
                <span>{l.baths} ba</span>
                <span>{l.sqft} sqft</span>
                <span className="ml-auto">{l.days}d on market</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListingStatusChip({ status }: { status: string }) {
  const config: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-400",
    contract: "bg-[var(--accent-rose-10)] text-[var(--accent-rose-400)]",
    sold: "bg-[#333] text-[var(--dl-muted)]",
  };
  return <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", config[status] ?? "")}>{status === "contract" ? "Under Contract" : status}</span>;
}

/* ═══ PIPELINE TAB ═══ */
function PipelineTab() {
  const stages = [
    {
      title: "New Lead", count: 14, color: "border-[var(--accent-rose-500)]",
      leads: [
        { name: "David Kim", detail: "Budget $1.5M — Zillow", score: 91, hot: true },
        { name: "Amanda Torres", detail: "Referral — $800K range", score: 84 },
      ]
    },
    {
      title: "Qualified", count: 8, color: "border-purple-500",
      leads: [
        { name: "The Henderson Family", detail: "Pre-approved $1.3M", score: 88 },
      ]
    },
    {
      title: "Showing", count: 6, color: "border-blue-500",
      leads: [{ name: "Marcus & Sofia Reyes", detail: "2nd showing scheduled", score: 79 }]
    },
    {
      title: "Under Contract", count: 4, color: "border-amber-500",
      leads: [{ name: "Patel Family", detail: "4821 Mulholland — closing Jun 1", score: 95 }]
    },
    {
      title: "Closed", count: 48, color: "border-emerald-500",
      leads: []
    },
  ];

  return (
    <div className="h-full overflow-x-auto p-6 bg-[var(--canvas-base)] flex gap-5">
      {stages.map((stage) => (
        <div key={stage.title} className="min-w-[270px] flex flex-col">
          <div className={cn("flex items-center justify-between p-3 rounded-t-xl border-t-2 bg-white/40", stage.color)}>
            <span className="text-sm font-bold text-[var(--dl-ink)]">{stage.title}</span>
            <span className="text-xs bg-white/60 text-[var(--dl-ink)] px-2 py-0.5 rounded-full">{stage.count}</span>
          </div>
          <div className="flex-1 bg-white/40 rounded-b-xl p-3 space-y-3 min-h-[300px]">
            {stage.leads.map((lead) => (
              <div key={lead.name} className="bg-white/60 border border-white/50 rounded-xl p-3 hover:border-[var(--accent-rose-30)] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-[var(--dl-ink)]">{lead.name}</p>
                  {lead.hot && <span className="text-[10px] font-bold text-[var(--accent-rose-400)] uppercase">Hot</span>}
                </div>
                <p className="text-xs text-[var(--dl-muted)]">{lead.detail}</p>
                <div className="flex justify-end mt-2">
                  <span className="text-xs font-medium text-[var(--dl-ink)]">Score: {lead.score}</span>
                </div>
              </div>
            ))}
            {stage.leads.length === 0 && <div className="text-center text-[var(--dl-muted)] text-xs py-6">{stage.count} closed deals</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══ MONEY TAB ═══ */
function MoneyTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Commission & Revenue</h2>
        <p className="text-[var(--dl-muted)]">Track deals, GCI, and pipeline value</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="YTD GCI" value="$186,400" trend="+32% vs last year" trendPositive icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Pipeline Value" value="$2.4M" icon={<Target className="w-5 h-5" />} />
        <KpiTile title="Avg Commission" value="$23,050" subtitle="per closed deal" icon={<DollarSign className="w-5 h-5" />} />
        <KpiTile title="Deals Closed YTD" value="8" icon={<CheckCircle2 className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/40 border border-white/50 rounded-2xl p-6">
          <h3 className="font-bold text-[var(--dl-ink)] mb-5 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[var(--accent-rose-400)]" /> Monthly GCI
          </h3>
          <div className="flex items-end justify-between gap-1.5 h-24 mb-3">
            {[40, 65, 55, 80, 100, 70, 0].map((h, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${h || 5}%`, background: i === 6 ? "rgba(99,102,241,0.1)" : `rgba(99,102,241,${0.2 + h / 200})` }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-[var(--dl-muted)]">
            {["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"].map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>

        <div className="bg-white/40 border border-white/50 rounded-2xl p-6">
          <h3 className="font-bold text-[var(--dl-ink)] mb-5 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-[var(--accent-rose-400)]" /> Recent Closings
          </h3>
          <div className="space-y-3">
            {[
              { address: "312 Ocean Front Walk", price: "$2.1M", commission: "$52,500", date: "May 20" },
              { address: "4821 Mulholland Dr", price: "$895K", commission: "$22,375", date: "May 8" },
              { address: "1840 Doheny Dr", price: "$1.4M", commission: "$35,000", date: "Apr 22" },
            ].map((deal) => (
              <div key={deal.address} className="flex items-center justify-between p-3 rounded-xl bg-white/60">
                <div>
                  <p className="text-sm font-medium text-[var(--dl-ink)]">{deal.address}</p>
                  <p className="text-xs text-[var(--dl-muted)]">{deal.price} • {deal.date}</p>
                </div>
                <span className="text-sm font-semibold text-emerald-400">{deal.commission}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ MORE TAB ═══ */
function MoreTab() {
  const items = [
    { icon: <Share2 className="w-5 h-5" />, label: "Social Media", desc: "Instagram, LinkedIn, YouTube" },
    { icon: <Film className="w-5 h-5" />, label: "Content Studio", desc: "Listing videos, neighborhood reels" },
    { icon: <Star className="w-5 h-5" />, label: "Reviews", desc: "Google, Zillow, Realtor.com" },
    { icon: <Landmark className="w-5 h-5" />, label: "Neighborhood Intel", desc: "Market trends & comps" },
    { icon: <Mail className="w-5 h-5" />, label: "Email Campaigns", desc: "Market updates & nurture" },
    { icon: <FileText className="w-5 h-5" />, label: "Contracts & Docs", desc: "Templates & e-sign" },
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
            <div className="p-3 rounded-xl bg-[var(--accent-rose-10)] text-[var(--accent-rose-400)]">{item.icon}</div>
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

/* ═══ LEADS TAB ═══ */
function LeadsTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Leads & CRM</h2>
          <p className="text-[var(--dl-muted)]">Track and manage buyer/seller leads</p>
        </div>
        <button className="px-4 py-2 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-[var(--accent-rose-600)] transition-colors">
          + Add Lead
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="New Leads" value="15" trend="+4 this week" trendPositive icon={<Users className="w-5 h-5" />} />
        <KpiTile title="Conversion Rate" value="58%" icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Avg Response" value="22 min" icon={<Clock className="w-5 h-5" />} />
        <KpiTile title="Under Contract" value="3" icon={<FileText className="w-5 h-5" />} />
      </div>
      <div className="bg-white/40 border border-white/50 rounded-2xl p-6 min-h-[300px] flex items-center justify-center text-[var(--dl-muted)]">
        <div className="text-center">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="text-sm">Lead pipeline integration coming soon</p>
        </div>
      </div>
    </div>
  );
}

/* ═══ SOCIAL TAB ═══ */
function SocialTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Social Media</h2>
        <p className="text-[var(--dl-muted)]">Manage your social presence</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="Instagram" value="4.1K" subtitle="followers" icon={<Share2 className="w-5 h-5" />} />
        <KpiTile title="LinkedIn" value="2.8K" subtitle="connections" icon={<Share2 className="w-5 h-5" />} />
        <KpiTile title="Engagement" value="3.6%" trend="+0.4%" trendPositive icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Posts This Week" value="6" icon={<Camera className="w-5 h-5" />} />
      </div>
      <div className="bg-white/40 border border-white/50 rounded-2xl p-6 min-h-[300px] flex items-center justify-center text-[var(--dl-muted)]">
        <div className="text-center">
          <Share2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="text-sm">Social media scheduler coming soon</p>
        </div>
      </div>
    </div>
  );
}

/* ═══ CONTENT TAB ═══ */
function ContentTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Content Studio</h2>
          <p className="text-[var(--dl-muted)]">Create and manage content</p>
        </div>
        <button className="px-4 py-2 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-[var(--accent-rose-600)] transition-colors">
          + New Post
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="Drafts" value="4" icon={<Film className="w-5 h-5" />} />
        <KpiTile title="Scheduled" value="6" icon={<Calendar className="w-5 h-5" />} />
        <KpiTile title="Published" value="38" icon={<Camera className="w-5 h-5" />} />
        <KpiTile title="Views" value="18.2K" trend="+15%" trendPositive icon={<TrendingUp className="w-5 h-5" />} />
      </div>
      <div className="bg-white/40 border border-white/50 rounded-2xl p-6 min-h-[300px] flex items-center justify-center text-[var(--dl-muted)]">
        <div className="text-center">
          <Film className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="text-sm">Content studio coming soon</p>
        </div>
      </div>
    </div>
  );
}

/* ═══ REVIEWS TAB ═══ */
function ReviewsTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Reviews</h2>
        <p className="text-[var(--dl-muted)]">Manage customer feedback</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="Google" value="4.8★" subtitle="156 reviews" icon={<Star className="w-5 h-5" />} />
        <KpiTile title="Zillow" value="4.9★" subtitle="92 reviews" icon={<Star className="w-5 h-5" />} />
        <KpiTile title="Realtor.com" value="5.0★" subtitle="47 reviews" icon={<Star className="w-5 h-5" />} />
        <KpiTile title="Response Rate" value="91%" trend="+3%" trendPositive icon={<TrendingUp className="w-5 h-5" />} />
      </div>
      <div className="bg-white/40 border border-white/50 rounded-2xl p-6 min-h-[300px] flex items-center justify-center text-[var(--dl-muted)]">
        <div className="text-center">
          <Star className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="text-sm">Review aggregator coming soon</p>
        </div>
      </div>
    </div>
  );
}

/* ═══ SETTINGS TAB ═══ */
function SettingsTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Settings</h2>
        <p className="text-[var(--dl-muted)]">Account and business preferences</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: <UserPlus className="w-5 h-5" />, label: "Profile", desc: "Business info and branding" },
          { icon: <CreditCard className="w-5 h-5" />, label: "Billing", desc: "Subscription and payments" },
          { icon: <Users className="w-5 h-5" />, label: "Team", desc: "Staff permissions" },
          { icon: <Bell className="w-5 h-5" />, label: "Notifications", desc: "Alerts and reminders" },
          { icon: <Smartphone className="w-5 h-5" />, label: "Integrations", desc: "Calendar and social sync" },
          { icon: <Settings className="w-5 h-5" />, label: "Advanced", desc: "API and webhooks" },
        ].map((item) => (
          <button key={item.label} className="flex items-center gap-4 p-5 rounded-2xl border border-white/50 bg-white/40 hover:bg-white/60 hover:border-[var(--accent-rose-30)] transition-colors text-left">
            <div className="p-3 rounded-xl bg-[var(--accent-rose-10)] text-[var(--accent-rose-400)]">{item.icon}</div>
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
