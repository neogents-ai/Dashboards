"use client";

import React, { useState } from "react";
import {
  Scissors, Calendar, Users, DollarSign, MoreHorizontal,
  Clock, TrendingUp, Star, UserPlus, ChevronRight,
  Plus, Zap, Share2, Film, Mail, BarChart3,
  Edit2, MapPin, FileText, CheckCircle2, RefreshCw,
  Search, Smartphone, CreditCard, Settings, Camera,
  History, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LightDashboardShell, type TabDef } from "../shared/LightDashboardShell";
import { KpiTile } from "../shared/KpiTile";
import { CollapsibleCard } from "../shared/CollapsibleCard";
import "../shared/dashboard-light.css";
import "./barber-tokens.css";

/* ───────────────────────────────────────────────────────────
   DashboardBarber2 — Notion Calendar: warm amber + brown
   ─────────────────────────────────────────────────────────── */

export function DashboardBarber2() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const tabs: TabDef[] = [
    { id: "home", label: "Dashboard", icon: <Scissors className="w-5 h-5" /> },
    { id: "calendar", label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
    { id: "cuts", label: "Cut Library", icon: <Camera className="w-5 h-5" /> },
    { id: "leads", label: "Leads & CRM", icon: <Users className="w-5 h-5" /> },
    { id: "social", label: "Social", icon: <Share2 className="w-5 h-5" /> },
    { id: "staff", label: "Staff & Chairs", icon: <UserPlus className="w-5 h-5" /> },
    { id: "content", label: "Content", icon: <Film className="w-5 h-5" /> },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <LightDashboardShell
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      greeting="Good morning, Marcus"
      dateLabel="May 23, 2026"
      accentColor="#3B82F6"
      userName="Marcus Johnson"
      userInitials="MJ"
      businessName="The Fade Room"
      avatarGradient={["#3B82F6", "#60A5FA"]}
      verticalName="Barber / Stylist"
    >
      {activeTab === "home" && <HomeTab />}
      {activeTab === "calendar" && <ScheduleTab />}
      {activeTab === "cuts" && <CutLibraryTab />}
      {activeTab === "leads" && <LeadsTab />}
      {activeTab === "social" && <SocialTab />}
      {activeTab === "staff" && <StaffTab />}
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
        <KpiTile title="Chairs Today" value="9 / 12" icon={<Scissors className="w-5 h-5" />} />
        <KpiTile title="Walk-ins" value="3" subtitle="in queue" icon={<Users className="w-5 h-5" />} />
        <KpiTile title="Revenue Today" value="$860" trend="+8% vs yesterday" trendPositive icon={<DollarSign className="w-5 h-5" />} />
        <KpiTile title="Avg Ticket" value="$42" icon={<TrendingUp className="w-5 h-5" />} />
      </div>

      <div className="space-y-4">
        <CollapsibleCard title="Today's Queue" subtitle="9 chairs • 3 walk-ins" icon={<Clock className="w-5 h-5" />} defaultOpen storageKey="barber-home-today">
          <div className="space-y-3">
            <ChairRow time="9:00 AM" name="DeShawn Williams" service="Fade + Lineup" barber="Marcus" price="$45" status="in-progress" />
            <ChairRow time="9:30 AM" client="Walk-in" service="Bald Fade" barber="Andre" price="$35" status="upcoming" />
            <ChairRow time="10:00 AM" name="Jordan Smith" service="Caesar + Beard Trim" barber="Marcus" price="$55" status="upcoming" />
            <ChairRow time="10:30 AM" name="Kevin Park" service="Taper + Edge Up" barber="Darius" price="$40" status="upcoming" />
            <ChairRow time="11:00 AM" name="Tyler Brown" service="High Top Fade" barber="Andre" price="$50" status="upcoming" />
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Walk-in Queue" subtitle="3 waiting" icon={<UserPlus className="w-5 h-5" />} storageKey="barber-home-walkin">
          <div className="space-y-3">
            <WalkInCard name="Alex Turner" wait="~10 min" chair="Chair 2 (Andre)" number={1} />
            <WalkInCard name="Marcus Jr." wait="~25 min" chair="Chair 4 (Darius)" number={2} />
            <WalkInCard name="Bryan Lee" wait="~35 min" chair="Any available" number={3} />
            <button className="w-full border border-dashed border-white/50 hover:border-[var(--accent-rose-30)] hover:text-[var(--accent-rose-400)] text-[var(--dl-muted)] rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" /> Add Walk-in
            </button>
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Revenue This Week" subtitle="$3,840 — up 12%" icon={<BarChart3 className="w-5 h-5" />} storageKey="barber-home-revenue">
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-1.5 h-24">
              {[65, 80, 50, 95, 100, 85, 40].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `rgba(245,158,11,${0.2 + h / 200})` }} />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[var(--dl-muted)]">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Cuts / Day</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">32</p>
              </div>
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Rebook Rate</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">71%</p>
              </div>
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Avg Ticket</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">$42</p>
              </div>
            </div>
          </div>
        </CollapsibleCard>
      </div>
    </div>
  );
}

function ChairRow({ time, name, client, service, barber, price, status }: { time: string; name?: string; client?: string; service: string; barber: string; price: string; status: "in-progress" | "upcoming" }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/60 hover:bg-[#231a09] transition-colors">
      <div className="w-16 text-xs font-medium text-[var(--dl-muted)]">{time}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--dl-ink)] truncate">{name ?? <span className="italic text-[var(--dl-muted)]">{client}</span>}</span>
          {status === "in-progress" && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
        </div>
        <p className="text-xs text-[var(--dl-muted)] truncate">{service} • {barber}</p>
      </div>
      <span className="text-sm font-semibold text-[var(--accent-rose-400)]">{price}</span>
    </div>
  );
}

function WalkInCard({ name, wait, chair, number }: { name: string; wait: string; chair: string; number: number }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/60">
      <div className="w-8 h-8 rounded-full bg-[var(--accent-rose-500)] flex items-center justify-center text-xs font-bold text-[var(--dl-ink)] flex-shrink-0">{number}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[var(--dl-ink)]">{name}</p>
        <p className="text-xs text-[var(--dl-muted)]">{chair}</p>
      </div>
      <span className="text-xs text-[var(--accent-rose-400)] font-medium">{wait}</span>
    </div>
  );
}

/* ═══ SCHEDULE TAB ═══ */
function ScheduleTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Chair Schedule</h2>
          <p className="text-[var(--dl-muted)]">Manage all 4 chairs and barbers</p>
        </div>
        <button className="px-4 py-2 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-[var(--accent-rose-600)] transition-colors">
          + New Appointment
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {["Marcus (Chair 1)", "Andre (Chair 2)", "Darius (Chair 3)", "Vacant (Chair 4)"].map((barber, i) => (
          <div key={barber} className="bg-white/40 border border-white/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-rose-500)] flex items-center justify-center text-xs font-bold text-[var(--dl-ink)]">{barber.slice(0, 2)}</div>
              <p className="text-sm font-semibold text-[var(--dl-ink)]">{barber}</p>
            </div>
            <div className="space-y-2 text-[var(--dl-muted)] text-xs">
              {i === 3 ? <p className="italic text-[#555]">Chair available</p> : <p>{3 + i} appointments today</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white/40 border border-white/50 rounded-2xl p-6 min-h-[400px] flex items-center justify-center text-[var(--dl-muted)]">
        <div className="text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="text-sm">Calendar Integration</p>
        </div>
      </div>
    </div>
  );
}

/* ═══ CUT LIBRARY TAB ═══ */
function CutLibraryTab() {
  const [search, setSearch] = useState("");
  const clients = [
    { id: 1, name: "DeShawn Williams", lastCut: "2 weeks ago", style: "High Fade", taper: "#1.5 sides", notes: "Sensitive around ears", initials: "DW", avatarColor: "bg-amber-600" },
    { id: 2, name: "Jordan Smith", lastCut: "3 weeks ago", style: "Caesar Cut", taper: "#2 fade", notes: "Keep length on top", initials: "JS", avatarColor: "bg-orange-700" },
    { id: 3, name: "Kevin Park", lastCut: "1 month ago", style: "Taper Fade", taper: "#1 skin fade", notes: "Sharp lineup every time", initials: "KP", avatarColor: "bg-amber-800" },
    { id: 4, name: "Tyler Brown", lastCut: "10 days ago", style: "High Top Fade", taper: "#0 base", notes: "Maintain shape on crown", initials: "TB", avatarColor: "bg-yellow-700" },
  ];

  return (
    <div className="flex h-full bg-[var(--canvas-base)]">
      <div className="w-[300px] border-r border-white/50 bg-white/40 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-white/50">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--dl-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input className="w-full bg-white/60 border border-white/50 rounded-lg py-2 pl-10 pr-4 text-sm text-[var(--dl-ink)] focus:outline-none focus:border-[var(--accent-rose-500)]" placeholder="Search clients..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {clients.map((c) => (
            <div key={c.id} className="p-3 rounded-lg hover:bg-white/60 cursor-pointer group transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-[var(--dl-ink)]", c.avatarColor)}>{c.initials}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-[var(--dl-ink)] truncate">{c.name}</h4>
                  <p className="text-[11px] text-[var(--dl-muted)]">{c.style} • {c.lastCut}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#333] group-hover:text-[var(--accent-rose-400)] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[var(--accent-rose-600)] to-[var(--accent-rose-400)] flex items-center justify-center text-xl font-bold text-[var(--dl-ink)]">DW</div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--dl-ink)] mb-1">DeShawn Williams</h2>
              <p className="text-[var(--dl-muted)] text-sm flex items-center gap-2"><Clock className="w-4 h-4" /> Last cut: 2 weeks ago</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-[var(--accent-rose-500)] hover:bg-[var(--accent-rose-600)] text-[var(--dl-ink)] font-bold rounded-lg transition-colors">Book</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/40 border border-white/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 bg-[var(--accent-rose-10)] rounded-lg"><Scissors className="w-4 h-4 text-[var(--accent-rose-400)]" /></div>
              <h3 className="font-bold text-[var(--dl-ink)]">The Usual</h3>
            </div>
            <div className="space-y-3">
              {[["Style", "High Fade"], ["Guard", "#1.5 on sides"], ["Top Length", "2.5\" on top"], ["Lineup", "Sharp, straight across"], ["Beard", "Light trim only"]].map(([l, v]) => (
                <div key={l} className="flex justify-between border-b border-white/50 pb-2 last:border-0">
                  <span className="text-xs text-[var(--dl-muted)]">{l}</span>
                  <span className="text-sm font-medium text-[var(--dl-ink)]">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/40 border border-white/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 bg-purple-500/10 rounded-lg"><Info className="w-4 h-4 text-purple-400" /></div>
              <h3 className="font-bold text-[var(--dl-ink)]">Barber Notes</h3>
            </div>
            <div className="space-y-3">
              {[["Scalp", "Sensitive near right ear"], ["Texture", "Coarse / Dense"], ["Growth Pattern", "Slight cowlick at crown"], ["Preference", "Always wants edged up"], ["Product", "Likes light matte paste"]].map(([l, v]) => (
                <div key={l} className="flex justify-between border-b border-white/50 pb-2 last:border-0">
                  <span className="text-xs text-[var(--dl-muted)]">{l}</span>
                  <span className="text-sm font-medium text-[var(--dl-ink)]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/40 border border-white/50 rounded-2xl p-6">
          <h3 className="font-bold text-[var(--dl-ink)] flex items-center gap-2 mb-5">
            <History className="w-5 h-5 text-[var(--accent-rose-400)]" /> Cut History
          </h3>
          <div className="space-y-4">
            {[
              { date: "May 9, 2026", barber: "Marcus", service: "High Fade + Lineup", price: "$45" },
              { date: "April 25, 2026", barber: "Marcus", service: "High Fade", price: "$40" },
              { date: "April 11, 2026", barber: "Darius", service: "High Fade + Edge Up", price: "$50" },
            ].map((entry) => (
              <div key={entry.date} className="flex items-center justify-between p-3 rounded-xl bg-white/60">
                <div>
                  <p className="text-sm font-medium text-[var(--dl-ink)]">{entry.service}</p>
                  <p className="text-xs text-[var(--dl-muted)]">{entry.date} • {entry.barber}</p>
                </div>
                <span className="text-sm font-semibold text-[var(--accent-rose-400)]">{entry.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ MONEY TAB ═══ */
function MoneyTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Barber Revenue</h2>
          <p className="text-[var(--dl-muted)]">Track chairs, commissions, and performance</p>
        </div>
        <button className="px-4 py-2 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-[var(--accent-rose-600)] transition-colors">
          + Add Barber
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="Today's Revenue" value="$860" trend="+8% vs yesterday" trendPositive icon={<DollarSign className="w-5 h-5" />} />
        <KpiTile title="Week Revenue" value="$3,840" icon={<BarChart3 className="w-5 h-5" />} />
        <KpiTile title="Commission Paid" value="$960" subtitle="this week" icon={<CreditCard className="w-5 h-5" />} />
        <KpiTile title="Avg per Chair" value="$48" icon={<Scissors className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { name: "Marcus Webb", role: "Owner / Master Barber", chair: "Chair 1", revenue: "$1,820", cuts: "43", rating: "5.0" },
          { name: "Andre Johnson", role: "Senior Barber", chair: "Chair 2", revenue: "$1,240", cuts: "31", rating: "4.9" },
          { name: "Darius King", role: "Barber", chair: "Chair 3", revenue: "$780", cuts: "21", rating: "4.8" },
        ].map((barber) => (
          <div key={barber.name} className="rounded-2xl border border-white/50 bg-white/40 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--accent-rose-600)] to-[var(--accent-rose-400)] flex items-center justify-center text-sm font-bold text-[var(--dl-ink)]">
                  {barber.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--dl-ink)]">{barber.name}</h3>
                  <p className="text-xs text-[var(--dl-muted)]">{barber.role} • {barber.chair}</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Revenue</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">{barber.revenue}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Cuts</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">{barber.cuts}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Rating</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">{barber.rating}★</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ MORE TAB ═══ */
function MoreTab() {
  const items = [
    { icon: <Share2 className="w-5 h-5" />, label: "Social Media", desc: "Instagram, TikTok, YouTube" },
    { icon: <Film className="w-5 h-5" />, label: "Content Studio", desc: "Cut videos, before/after" },
    { icon: <Star className="w-5 h-5" />, label: "Reviews", desc: "Google, Yelp, Booksy" },
    { icon: <Smartphone className="w-5 h-5" />, label: "SMS Marketing", desc: "Appointment reminders" },
    { icon: <Mail className="w-5 h-5" />, label: "Email Campaigns", desc: "Loyalty & promotions" },
    { icon: <Camera className="w-5 h-5" />, label: "Portfolio", desc: "Cut gallery & lookbook" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Billing & Plans", desc: "Subscription & payments" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", desc: "Account & preferences" },
  ];
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div>
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
          <p className="text-[var(--dl-muted)]">Track and manage client leads</p>
        </div>
        <button className="px-4 py-2 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-[var(--accent-rose-600)] transition-colors">
          + Add Lead
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="New Leads" value="12" trend="+3 this week" trendPositive icon={<Users className="w-5 h-5" />} />
        <KpiTile title="Conversion Rate" value="68%" icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Avg Response" value="8 min" icon={<Clock className="w-5 h-5" />} />
        <KpiTile title="Booked" value="8 / 12" icon={<Calendar className="w-5 h-5" />} />
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
        <KpiTile title="Instagram" value="2.4K" subtitle="followers" icon={<Share2 className="w-5 h-5" />} />
        <KpiTile title="TikTok" value="1.8K" subtitle="followers" icon={<Film className="w-5 h-5" />} />
        <KpiTile title="Engagement" value="4.2%" trend="+0.5%" trendPositive icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Posts This Week" value="5" icon={<Camera className="w-5 h-5" />} />
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

/* ═══ STAFF TAB ═══ */
function StaffTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Staff & Chairs</h2>
          <p className="text-[var(--dl-muted)]">Manage barbers and chair assignments</p>
        </div>
        <button className="px-4 py-2 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-[var(--accent-rose-600)] transition-colors">
          + Add Staff
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { name: "Marcus Webb", role: "Owner / Master Barber", chair: "Chair 1", revenue: "$1,820", cuts: "43", rating: "5.0" },
          { name: "Andre Johnson", role: "Senior Barber", chair: "Chair 2", revenue: "$1,240", cuts: "31", rating: "4.9" },
          { name: "Darius King", role: "Barber", chair: "Chair 3", revenue: "$780", cuts: "21", rating: "4.8" },
        ].map((barber) => (
          <div key={barber.name} className="rounded-2xl border border-white/50 bg-white/40 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--accent-rose-600)] to-[var(--accent-rose-400)] flex items-center justify-center text-sm font-bold text-[var(--dl-ink)]">
                  {barber.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--dl-ink)]">{barber.name}</h3>
                  <p className="text-xs text-[var(--dl-muted)]">{barber.role} • {barber.chair}</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Revenue</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">{barber.revenue}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Cuts</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">{barber.cuts}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Rating</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">{barber.rating}★</p>
              </div>
            </div>
          </div>
        ))}
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
        <KpiTile title="Drafts" value="3" icon={<Film className="w-5 h-5" />} />
        <KpiTile title="Scheduled" value="5" icon={<Calendar className="w-5 h-5" />} />
        <KpiTile title="Published" value="42" icon={<Camera className="w-5 h-5" />} />
        <KpiTile title="Views" value="12.5K" trend="+8%" trendPositive icon={<TrendingUp className="w-5 h-5" />} />
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
        <KpiTile title="Google" value="4.9★" subtitle="127 reviews" icon={<Star className="w-5 h-5" />} />
        <KpiTile title="Yelp" value="4.7★" subtitle="84 reviews" icon={<Star className="w-5 h-5" />} />
        <KpiTile title="Booksy" value="5.0★" subtitle="56 reviews" icon={<Star className="w-5 h-5" />} />
        <KpiTile title="Response Rate" value="94%" trend="+2%" trendPositive icon={<TrendingUp className="w-5 h-5" />} />
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
