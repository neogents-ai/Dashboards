"use client";

import React, { useState } from "react";
import {
  Sparkles, Calendar, Users, DollarSign, MoreHorizontal,
  Clock, TrendingUp, Star, UserPlus, ChevronRight,
  Plus, Zap, Share2, Film, Mail, BarChart3,
  Edit2, MapPin, FileText, CheckCircle2, RefreshCw,
  Search, Smartphone, CreditCard, Settings, ShoppingBag,
  Activity, ClipboardList, Info, History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LightDashboardShell, type TabDef } from "../shared/LightDashboardShell";
import { KpiTile } from "../shared/KpiTile";
import { CollapsibleCard } from "../shared/CollapsibleCard";
import "../shared/dashboard-light.css";
import "./aesthetician-tokens.css";

/* ───────────────────────────────────────────────────────────
   DashboardAesthetician2 — Vision OS Materials: sage + cream
   ─────────────────────────────────────────────────────────── */

export function DashboardAesthetician2() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const tabs: TabDef[] = [
    { id: "home", label: "Dashboard", icon: <Sparkles className="w-5 h-5" /> },
    { id: "calendar", label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
    { id: "skin", label: "Skin Tracker", icon: <Activity className="w-5 h-5" /> },
    { id: "leads", label: "Leads & CRM", icon: <Users className="w-5 h-5" /> },
    { id: "social", label: "Social", icon: <Share2 className="w-5 h-5" /> },
    { id: "inventory", label: "Inventory", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "content", label: "Content", icon: <Film className="w-5 h-5" /> },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <LightDashboardShell
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      greeting="Good morning, Sofia"
      dateLabel="May 23, 2026"
      accentColor="#EC4899"
      userName="Sofia Chen"
      userInitials="SC"
      businessName="Glow Aesthetics"
      avatarGradient={["#EC4899", "#F472B6"]}
      verticalName="Aesthetician"
    >
      {activeTab === "home" && <HomeTab />}
      {activeTab === "calendar" && <BookingsTab />}
      {activeTab === "skin" && <SkinTrackerTab />}
      {activeTab === "leads" && <LeadsTab />}
      {activeTab === "social" && <SocialTab />}
      {activeTab === "inventory" && <InventoryTab />}
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
        <KpiTile title="Monthly Revenue" value="$9,200" trend="+15% vs last month" trendPositive icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Clients Today" value="6" icon={<Users className="w-5 h-5" />} />
        <KpiTile title="Avg Treatment Value" value="$285" icon={<DollarSign className="w-5 h-5" />} />
        <KpiTile title="Review Score" value="5.0★" subtitle="(67 reviews)" icon={<Star className="w-5 h-5" />} />
      </div>

      <div className="space-y-4">
        <CollapsibleCard title="Today's Schedule" subtitle="6 appointments • $1,710" icon={<Clock className="w-5 h-5" />} defaultOpen storageKey="aes-home-today">
          <div className="space-y-3">
            <ApptRow time="9:00 AM" client="Elena Gilbert" service="Hydrafacial + LED" duration="75 min" price="$320" status="in-progress" />
            <ApptRow time="10:30 AM" client="Priya Shah" service="Chemical Peel" duration="60 min" price="$280" status="upcoming" />
            <ApptRow time="12:00 PM" client="Morgan Lee" service="Microneedling" duration="90 min" price="$450" status="upcoming" />
            <ApptRow time="2:00 PM" client="Chloe Davis" service="Dermaplaning" duration="45 min" price="$185" status="upcoming" />
            <ApptRow time="3:30 PM" client="Isabella Park" service="Consultation" duration="30 min" price="$75" status="upcoming" />
            <ApptRow time="4:30 PM" client="Amara Jones" service="Oxygen Infusion" duration="60 min" price="$260" status="upcoming" />
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Follow-up Tasks" subtitle="3 due today" icon={<CheckCircle2 className="w-5 h-5" />} storageKey="aes-home-tasks">
          <div className="space-y-3">
            <TaskRow label="Check in with Elena — 48hr post-peel" due="Today" priority="high" />
            <TaskRow label="Restock Hyaluronic Acid serum" due="Today" priority="medium" />
            <TaskRow label="Update Morgan's skin protocol notes" due="Tomorrow" priority="low" />
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Upcoming This Week" subtitle="22 appointments" icon={<Calendar className="w-5 h-5" />} storageKey="aes-home-upcoming">
          <div className="space-y-3">
            {[
              { day: "Monday", count: "4 treatments", revenue: "$1,140" },
              { day: "Tuesday", count: "5 treatments", revenue: "$1,425" },
              { day: "Thursday", count: "5 treatments", revenue: "$1,350" },
              { day: "Friday", count: "4 treatments", revenue: "$1,060" },
            ].map((row) => (
              <div key={row.day} className="flex items-center justify-between p-3 rounded-xl bg-white/60">
                <div>
                  <p className="text-sm font-medium text-[var(--dl-ink)]">{row.day}</p>
                  <p className="text-xs text-[var(--dl-muted)]">{row.count}</p>
                </div>
                <span className="text-sm font-semibold text-[var(--accent-rose-400)]">{row.revenue}</span>
              </div>
            ))}
          </div>
        </CollapsibleCard>

        <CollapsibleCard title="Revenue This Week" subtitle="$6,900 — up 15%" icon={<BarChart3 className="w-5 h-5" />} storageKey="aes-home-revenue">
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-1.5 h-24">
              {[60, 80, 55, 95, 100, 70, 50].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `rgba(132,169,140,${0.2 + h / 200})` }} />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[var(--dl-muted)]">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Retention Rate</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">92%</p>
              </div>
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Avg Ticket</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">$285</p>
              </div>
            </div>
          </div>
        </CollapsibleCard>
      </div>
    </div>
  );
}

function ApptRow({ time, client, service, duration, price, status }: { time: string; client: string; service: string; duration: string; price: string; status: "in-progress" | "upcoming" | "done" }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/60 hover:bg-[#1e231e] transition-colors">
      <div className="w-16 text-xs font-medium text-[var(--dl-muted)]">{time}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--dl-ink)] truncate">{client}</span>
          {status === "in-progress" && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
        </div>
        <p className="text-xs text-[var(--dl-muted)] truncate">{service} • {duration}</p>
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

/* ═══ BOOKINGS TAB ═══ */
function BookingsTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Bookings</h2>
          <p className="text-[var(--dl-muted)]">Manage appointments and consultations</p>
        </div>
        <button className="px-4 py-2 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-[var(--accent-rose-600)] transition-colors">
          + New Appointment
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
              <Clock className="w-4 h-4 text-[var(--accent-rose-400)]" /> Next Client
            </h3>
            <div className="space-y-2">
              <p className="text-base font-bold text-[var(--dl-ink)]">Priya Shah</p>
              <p className="text-sm text-[var(--dl-muted)]">10:30 AM — Chemical Peel</p>
              <div className="mt-3 pt-3 border-t border-white/50">
                <p className="text-xs font-semibold text-[var(--dl-muted)] uppercase tracking-wider mb-2">Skin Protocol</p>
                <p className="text-xs text-[var(--dl-muted)]">Fitzpatrick III. Mild hyperpigmentation. On Tretinoin 0.025%. Last peel: 6 weeks ago. No adverse reactions on file.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/50 bg-white/40 p-5">
            <h3 className="text-sm font-semibold text-[var(--dl-ink)] mb-3 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-[var(--accent-rose-400)]" /> New Consults This Week
            </h3>
            <div className="space-y-3">
              {["Isabella Park — Fri 4:30 PM", "Marcus Green — Sat 11:00 AM"].map((name) => (
                <div key={name} className="text-sm text-[var(--dl-ink)]">{name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ SKIN TRACKER TAB ═══ */
function SkinTrackerTab() {
  const clients = [
    { id: 1, name: "Elena Gilbert", lastVisit: "Today", condition: "Dehydrated / Post-acne", fitzpatrick: "II", initials: "EG", avatarColor: "bg-[var(--accent-rose-500)]" },
    { id: 2, name: "Priya Shah", lastVisit: "3 weeks ago", condition: "Hyperpigmentation", fitzpatrick: "III", initials: "PS", avatarColor: "bg-amber-500" },
    { id: 3, name: "Morgan Lee", lastVisit: "2 weeks ago", condition: "Rosacea / Sensitive", fitzpatrick: "I", initials: "ML", avatarColor: "bg-blue-500" },
    { id: 4, name: "Chloe Davis", lastVisit: "1 month ago", condition: "Oily / Acne-prone", fitzpatrick: "IV", initials: "CD", avatarColor: "bg-purple-500" },
  ];

  return (
    <div className="flex h-full bg-[var(--canvas-base)]">
      {/* Client List */}
      <div className="w-[320px] border-r border-white/50 bg-white/40 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-white/50">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--dl-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input className="w-full bg-white/60 border border-white/50 rounded-lg py-2 pl-10 pr-4 text-sm text-[var(--dl-ink)] focus:outline-none focus:border-[var(--accent-rose-500)]" placeholder="Search clients..." />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {clients.map((c) => (
            <div key={c.id} className="p-3 rounded-lg hover:bg-white/60 cursor-pointer group transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-[var(--dl-ink)]", c.avatarColor)}>{c.initials}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-[var(--dl-ink)] truncate">{c.name}</h4>
                  <p className="text-[11px] text-[var(--dl-muted)]">{c.condition} • {c.lastVisit}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#333] group-hover:text-[var(--accent-rose-400)] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Detail */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[var(--accent-rose-600)] to-[var(--accent-rose-400)] flex items-center justify-center text-xl font-bold text-[var(--dl-ink)]">EG</div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Elena Gilbert</h2>
                <span className="px-2 py-0.5 bg-[var(--accent-rose-10)] text-[var(--accent-rose-400)] text-[10px] font-bold rounded uppercase tracking-wider border border-[var(--accent-rose-20)]">Active Client</span>
              </div>
              <p className="text-[var(--dl-muted)] flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" /> West Hollywood, CA • <Clock className="w-4 h-4 ml-1" /> Last visit: Today
              </p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-[var(--accent-rose-500)] hover:bg-[var(--accent-rose-600)] text-[var(--dl-ink)] font-bold rounded-lg transition-colors">
            Book Next
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/40 border border-white/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 bg-[var(--accent-rose-10)] rounded-lg"><Activity className="w-4 h-4 text-[var(--accent-rose-400)]" /></div>
              <h3 className="font-bold text-[var(--dl-ink)]">Skin Profile</h3>
            </div>
            <div className="space-y-3">
              {[
                ["Fitzpatrick Type", "II (Fair)"],
                ["Skin Type", "Combination / Dehydrated"],
                ["Primary Concern", "Post-acne marks"],
                ["Sensitivity", "Low"],
                ["Active Rx", "Tretinoin 0.025% (nightly)"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-white/50 pb-2 last:border-0">
                  <span className="text-xs text-[var(--dl-muted)]">{label}</span>
                  <span className="text-sm font-medium text-[var(--dl-ink)]">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/40 border border-white/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 bg-purple-500/10 rounded-lg"><ClipboardList className="w-4 h-4 text-purple-400" /></div>
              <h3 className="font-bold text-[var(--dl-ink)]">Current Protocol</h3>
            </div>
            <div className="space-y-3">
              {[
                ["Treatment", "Hydrafacial monthly"],
                ["Serum (AM)", "Vit C + Niacinamide"],
                ["Serum (PM)", "Hyaluronic Acid"],
                ["SPF", "50+ daily (non-negotiable)"],
                ["Next Goal", "Even skin tone by Q3"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-white/50 pb-2 last:border-0">
                  <span className="text-xs text-[var(--dl-muted)]">{label}</span>
                  <span className="text-sm font-medium text-[var(--dl-ink)]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/40 border border-white/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[var(--dl-ink)] flex items-center gap-2">
              <History className="w-5 h-5 text-[var(--accent-rose-400)]" /> Treatment Notes
            </h3>
            <button className="text-[var(--accent-rose-400)] text-sm font-medium hover:underline">+ Add Entry</button>
          </div>
          <div className="space-y-5">
            {[
              { date: "May 23, 2026", note: "Hydrafacial + LED therapy. Skin looked significantly less inflamed vs last visit. Increased suction on cheeks. Added oxygen boost step. Client reported 0 sensitivity. Advised to avoid exfoliation for 48hrs.", esthetician: "Sofia (Lead)" },
              { date: "April 25, 2026", note: "Gentle chemical peel (20% lactic). Good tolerance. Mild erythema resolved within 20min. Emphasized SPF compliance — client admitted skipping on weekends. Reviewed protocol.", esthetician: "Sofia (Lead)" },
            ].map((entry) => (
              <div key={entry.date} className="relative pl-6 border-l-2 border-white/50">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--accent-rose-500)] border-4 border-[var(--canvas-surface)]" />
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-bold text-[var(--dl-ink)]">{entry.date}</p>
                  <span className="text-[10px] text-[#555]">{entry.esthetician}</span>
                </div>
                <p className="text-sm text-[var(--dl-muted)] leading-relaxed">{entry.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ INVENTORY TAB ═══ */
function InventoryTab() {
  const items = [
    { name: "Hyaluronic Acid Serum", brand: "SkinCeuticals", qty: 3, reorder: 5, status: "low" },
    { name: "Vitamin C 15%", brand: "IS Clinical", qty: 8, reorder: 4, status: "ok" },
    { name: "Lactic Acid 20%", brand: "PCA Skin", qty: 2, reorder: 3, status: "low" },
    { name: "LED Mask Gel", brand: "Dermalux", qty: 12, reorder: 6, status: "ok" },
    { name: "Microneedling Cartridges", brand: "SkinPen", qty: 4, reorder: 10, status: "low" },
    { name: "SPF 50 Moisturizer", brand: "EltaMD", qty: 15, reorder: 8, status: "ok" },
  ];
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Product Inventory</h2>
          <p className="text-[var(--dl-muted)]">Track stock and reorder levels</p>
        </div>
        <button className="px-4 py-2 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-[var(--accent-rose-600)] transition-colors">
          + Add Product
        </button>
      </div>
      <div className="bg-white/40 border border-white/50 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-5 px-6 py-3 text-xs text-[var(--dl-muted)] uppercase tracking-wider border-b border-white/50">
          <span className="col-span-2">Product</span>
          <span>In Stock</span>
          <span>Reorder At</span>
          <span>Status</span>
        </div>
        {items.map((item) => (
          <div key={item.name} className="grid grid-cols-5 px-6 py-4 border-b border-white/50 last:border-0 hover:bg-white/60 transition-colors items-center">
            <div className="col-span-2">
              <p className="text-sm font-medium text-[var(--dl-ink)]">{item.name}</p>
              <p className="text-xs text-[var(--dl-muted)]">{item.brand}</p>
            </div>
            <span className="text-sm text-[var(--dl-ink)]">{item.qty} units</span>
            <span className="text-sm text-[var(--dl-muted)]">{item.reorder} units</span>
            <span className={cn("text-xs font-bold uppercase", item.status === "low" ? "text-red-400" : "text-emerald-400")}>{item.status === "low" ? "Reorder" : "OK"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ MORE TAB ═══ */
function MoreTab() {
  const items = [
    { icon: <Share2 className="w-5 h-5" />, label: "Social Media", desc: "Instagram, TikTok, Pinterest" },
    { icon: <Film className="w-5 h-5" />, label: "Content Studio", desc: "Before/after, treatment reels" },
    { icon: <Star className="w-5 h-5" />, label: "Reviews", desc: "Google, Yelp, Vagaro" },
    { icon: <Smartphone className="w-5 h-5" />, label: "SMS Reminders", desc: "Automated appointment texts" },
    { icon: <Mail className="w-5 h-5" />, label: "Email Campaigns", desc: "Seasonal promos & tips" },
    { icon: <ShoppingBag className="w-5 h-5" />, label: "Retail Products", desc: "Recommend & track sales" },
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
          <p className="text-[var(--dl-muted)]">Track and manage client leads</p>
        </div>
        <button className="px-4 py-2 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-[var(--accent-rose-600)] transition-colors">
          + Add Lead
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="New Leads" value="8" trend="+2 this week" trendPositive icon={<Users className="w-5 h-5" />} />
        <KpiTile title="Conversion Rate" value="72%" icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Avg Response" value="12 min" icon={<Clock className="w-5 h-5" />} />
        <KpiTile title="Booked" value="6 / 8" icon={<Calendar className="w-5 h-5" />} />
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
        <KpiTile title="Instagram" value="3.2K" subtitle="followers" icon={<Share2 className="w-5 h-5" />} />
        <KpiTile title="TikTok" value="1.5K" subtitle="followers" icon={<Film className="w-5 h-5" />} />
        <KpiTile title="Engagement" value="5.1%" trend="+0.8%" trendPositive icon={<TrendingUp className="w-5 h-5" />} />
        <KpiTile title="Posts This Week" value="4" icon={<Sparkles className="w-5 h-5" />} />
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
        <KpiTile title="Drafts" value="2" icon={<Film className="w-5 h-5" />} />
        <KpiTile title="Scheduled" value="3" icon={<Calendar className="w-5 h-5" />} />
        <KpiTile title="Published" value="28" icon={<Sparkles className="w-5 h-5" />} />
        <KpiTile title="Views" value="8.2K" trend="+12%" trendPositive icon={<TrendingUp className="w-5 h-5" />} />
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
        <KpiTile title="Google" value="4.9★" subtitle="86 reviews" icon={<Star className="w-5 h-5" />} />
        <KpiTile title="Yelp" value="4.8★" subtitle="42 reviews" icon={<Star className="w-5 h-5" />} />
        <KpiTile title="Vagaro" value="5.0★" subtitle="34 reviews" icon={<Star className="w-5 h-5" />} />
        <KpiTile title="Response Rate" value="96%" trend="+1%" trendPositive icon={<TrendingUp className="w-5 h-5" />} />
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
