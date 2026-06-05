"use client";

import React, { useState } from "react";
import {
  LayoutDashboard, Calendar, Users, DollarSign, MoreHorizontal,
  Clock, Scissors, TrendingUp, Star, UserPlus, Briefcase,
  ChevronRight, Check, Plus, Zap, MessageSquare, Image as ImageIcon,
  Share2, Film, Smartphone, Monitor, Eye, Download, Mail,
  BarChart3, Send, FileVideo, CreditCard, RefreshCw, Search,
  Edit2, MapPin, FileText, Info, History, Camera, CheckCircle2,
  Sparkles, AlertCircle, X, Heart, Palette
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LightDashboardShell, type TabDef } from "../shared/LightDashboardShell";
import { KpiTile } from "../shared/KpiTile";
import { CollapsibleCard } from "../shared/CollapsibleCard";
import { BottomSheet } from "../shared/BottomSheet";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

/* ───────────────────────────────────────────────────────────
   DashboardHairstylist — GlossGenius-inspired redesign
   Rose / warm pink theme, glass chrome + solid content cards
   ─────────────────────────────────────────────────────────── */

export function DashboardHairstylist() {
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <LightDashboardShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      greeting="Good morning, Lisa"
      dateLabel="May 23, 2026"
      quickStats={<>
        <QuickStat label="8 Chairs Today" />
        <QuickStat label="6 New Clients" />
        <QuickStat label="94% Capacity" />
      </>}
    >
      {activeTab === "home" && <HomeTab />}
      {activeTab === "calendar" && <CalendarTab />}
      {activeTab === "clients" && <ClientsTab />}
      {activeTab === "money" && <MoneyTab />}
      {activeTab === "more" && <MoreTab />}
    </LightDashboardShell>
  );
}

/* ─── Quick Stat Pill ─── */
function QuickStat({ label }: { label: string }) {
  return (
    <div className="px-3 py-1.5 rounded-full bg-[var(--accent-rose-10)] border border-[var(--accent-rose-20)] text-[var(--accent-rose-400)] text-xs font-medium whitespace-nowrap">
      {label}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOME TAB — Card Stack
   ═══════════════════════════════════════════════════════════ */
function HomeTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile
          title="Monthly Revenue"
          value="$12,400"
          trend="+22% vs last month"
          trendPositive
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KpiTile
          title="Chairs Booked Today"
          value="8/10"
          icon={<Briefcase className="w-5 h-5" />}
        />
        <KpiTile
          title="New Clients"
          value="6"
          subtitle="this week"
          icon={<UserPlus className="w-5 h-5" />}
        />
        <KpiTile
          title="Avg Review Score"
          value="4.9★"
          subtitle="(89 reviews)"
          icon={<Star className="w-5 h-5" />}
        />
      </div>

      {/* Card Stack */}
      <div className="space-y-4">
        <CollapsibleCard
          title="Today's Schedule"
          subtitle="5 appointments • $740"
          icon={<Clock className="w-5 h-5" />}
          defaultOpen
          storageKey="home-today"
        >
          <div className="space-y-3">
            <AppointmentRow
              time="9:00 AM"
              name="Sarah Chen"
              service="Balayage + Trim"
              duration="2.5 hrs"
              price="$280"
              status="in-progress"
            />
            <AppointmentRow
              time="11:30 AM"
              name="Maya Johnson"
              service="Root Touch-Up"
              duration="1.5 hrs"
              price="$145"
              status="upcoming"
            />
            <AppointmentRow
              time="1:00 PM"
              name="Emily Davis"
              service="Keratin Treatment"
              duration="3 hrs"
              price="$350"
              status="upcoming"
            />
            <AppointmentRow
              time="4:00 PM"
              name="Olivia Martinez"
              service="Blowout"
              duration="1 hr"
              price="$85"
              status="upcoming"
            />
            <AppointmentRow
              time="5:30 PM"
              name="Jessica Wong"
              service="Color Correction"
              duration="2 hrs"
              price="$220"
              status="upcoming"
            />
          </div>
        </CollapsibleCard>

        <CollapsibleCard
          title="Upcoming This Week"
          subtitle="18 appointments • $2,340"
          icon={<Calendar className="w-5 h-5" />}
          storageKey="home-upcoming"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/60">
              <div>
                <p className="text-sm font-medium text-[var(--dl-ink)]">Tuesday</p>
                <p className="text-xs text-[var(--dl-muted)]">4 appointments</p>
              </div>
              <span className="text-sm font-semibold text-[var(--accent-rose-400)]">$520</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/60">
              <div>
                <p className="text-sm font-medium text-[var(--dl-ink)]">Wednesday</p>
                <p className="text-xs text-[var(--dl-muted)]">5 appointments</p>
              </div>
              <span className="text-sm font-semibold text-[var(--accent-rose-400)]">$680</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/60">
              <div>
                <p className="text-sm font-medium text-[var(--dl-ink)]">Thursday</p>
                <p className="text-xs text-[var(--dl-muted)]">3 appointments</p>
              </div>
              <span className="text-sm font-semibold text-[var(--accent-rose-400)]">$410</span>
            </div>
          </div>
        </CollapsibleCard>

        <CollapsibleCard
          title="Tasks"
          subtitle="2 follow-ups due"
          icon={<CheckCircle2 className="w-5 h-5" />}
          storageKey="home-tasks"
        >
          <div className="space-y-3">
            <TaskRow
              label="Call Sarah about color results"
              due="Today"
              priority="high"
            />
            <TaskRow
              label="Reorder Olaplex treatment kit"
              due="Tomorrow"
              priority="medium"
            />
            <TaskRow
              label="Update Instagram portfolio"
              due="This week"
              priority="low"
            />
          </div>
        </CollapsibleCard>

        <CollapsibleCard
          title="This Week's Stats"
          subtitle="Revenue up 18%"
          icon={<BarChart3 className="w-5 h-5" />}
          storageKey="home-stats"
        >
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-1.5 h-24">
              {[40, 65, 55, 90, 100, 72, 45].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t transition-all"
                  style={{
                    height: `${h}%`,
                    background: `rgba(236,72,153,${0.2 + h / 200})`,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[var(--dl-muted)]">
              {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Rebook Rate</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">78%</p>
              </div>
              <div className="p-3 rounded-xl bg-white/60">
                <p className="text-xs text-[var(--dl-muted)]">Avg. Ticket</p>
                <p className="text-lg font-bold text-[var(--dl-ink)]">$148</p>
              </div>
            </div>
          </div>
        </CollapsibleCard>
      </div>
    </div>
  );
}

function AppointmentRow({
  time,
  name,
  service,
  duration,
  price,
  status,
}: {
  time: string;
  name: string;
  service: string;
  duration: string;
  price: string;
  status: "in-progress" | "upcoming" | "done";
}) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-colors">
      <div className="w-16 text-xs font-medium text-[var(--dl-muted)]">{time}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--dl-ink)] truncate">{name}</span>
          {status === "in-progress" && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </div>
        <p className="text-xs text-[var(--dl-muted)] truncate">{service} • {duration}</p>
      </div>
      <span className="text-sm font-semibold text-[var(--accent-rose-400)]">{price}</span>
    </div>
  );
}

function TaskRow({ label, due, priority }: { label: string; due: string; priority: "high" | "medium" | "low" }) {
  const color =
    priority === "high"
      ? "text-red-400"
      : priority === "medium"
      ? "text-amber-400"
      : "text-[var(--dl-muted)]";
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/60">
      <div className="flex items-center gap-3">
        <div className={cn("w-2 h-2 rounded-full", priority === "high" ? "bg-red-400" : priority === "medium" ? "bg-amber-400" : "bg-[#555]")} />
        <span className="text-sm text-[var(--dl-ink)]">{label}</span>
      </div>
      <span className={cn("text-xs font-medium", color)}>{due}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CALENDAR TAB
   ═══════════════════════════════════════════════════════════ */
function CalendarTab() {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Bookings & Schedule</h2>
          <p className="text-[var(--dl-muted)]">Manage chairs and appointments</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/60 border border-white/50 rounded-lg text-sm text-[var(--dl-ink)] hover:bg-white/80 transition-colors">
            Week View
          </button>
          <button
            onClick={() => setSheetOpen(true)}
            className="px-4 py-2 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-[var(--accent-rose-600)] transition-colors"
          >
            + New Appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white/40 border border-white/50 rounded-2xl p-6 min-h-[600px] flex items-center justify-center text-[var(--dl-muted)]">
          <div className="text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-sm">Calendar Integration goes here</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/50 bg-white/40 p-5">
            <h3 className="text-sm font-semibold text-[var(--dl-ink)] mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--accent-rose-400)]" /> Walk-in Queue
            </h3>
            <div className="space-y-3">
              <QueueCard name="Amanda Lee" status="Next" wait="5m" chair="Chair 1 (Lisa)" initial="AL" />
              <QueueCard name="Rachel Kim" status="Waiting" wait="15m" chair="Chair 3 (Mia)" initial="RK" />
              <button className="w-full border border-dashed border-white/50 hover:border-[var(--accent-rose-30)] hover:text-[var(--accent-rose-400)] text-[var(--dl-muted)] rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" /> Add Walk-in
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/50 bg-white/40 p-5">
            <h3 className="text-sm font-semibold text-[var(--dl-ink)] mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[var(--accent-rose-400)]" /> Staff on Duty
            </h3>
            <div className="space-y-3">
              <StaffRow name="Lisa Sterling" role="Master Stylist" status="available" />
              <StaffRow name="Mia Torres" role="Color Specialist" status="available" />
              <StaffRow name="James Park" role="Junior Stylist" status="break" />
            </div>
          </div>
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="bg-[var(--canvas-base)] border-l border-white/50 text-[var(--dl-ink)]">
          <SheetHeader>
            <SheetTitle className="text-[var(--dl-ink)]">New Appointment</SheetTitle>
            <SheetDescription className="text-[var(--dl-muted)]">Add a new booking to the schedule.</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-[var(--dl-muted)] uppercase tracking-wider">Client Name</label>
              <input className="w-full bg-white/60 border border-white/50 rounded-lg px-4 py-2 text-sm text-[var(--dl-ink)] focus:outline-none focus:border-[var(--accent-rose-500)]" placeholder="e.g. Sarah Chen" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[var(--dl-muted)] uppercase tracking-wider">Service</label>
              <input className="w-full bg-white/60 border border-white/50 rounded-lg px-4 py-2 text-sm text-[var(--dl-ink)] focus:outline-none focus:border-[var(--accent-rose-500)]" placeholder="e.g. Balayage" />
            </div>
            <button onClick={() => setSheetOpen(false)} className="w-full py-3 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-xl hover:bg-[var(--accent-rose-600)] transition-colors">
              Save Appointment
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function QueueCard({ name, status, wait, chair, initial }: { name: string; status: string; wait: string; chair: string; initial: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/60">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[var(--accent-rose-500)] flex items-center justify-center text-xs font-bold text-[var(--dl-ink)]">{initial}</div>
        <div>
          <p className="text-sm font-medium text-[var(--dl-ink)]">{name}</p>
          <p className="text-[10px] text-[var(--dl-muted)]">{chair}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs font-medium text-[var(--accent-rose-400)]">{status}</span>
        <p className="text-[10px] text-[var(--dl-muted)]">{wait}</p>
      </div>
    </div>
  );
}

function StaffRow({ name, role, status }: { name: string; role: string; status: "available" | "busy" | "break" }) {
  const dotColor = status === "available" ? "bg-emerald-500" : status === "busy" ? "bg-amber-500" : "bg-[#555]";
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={cn("w-2 h-2 rounded-full", dotColor)} />
        <span className="text-sm text-[var(--dl-ink)] font-medium">{name}</span>
      </div>
      <span className="text-[10px] text-[#555]">{role}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CLIENTS TAB — Style Library + Leads CRM
   ═══════════════════════════════════════════════════════════ */
function ClientsTab() {
  const [activeSub, setActiveSub] = useState<"library" | "leads">("library");
  return (
    <div className="flex flex-col h-full">
      {/* Sub-nav */}
      <div className="h-14 border-b border-white/50 px-6 flex items-center gap-6 flex-shrink-0">
        <button
          onClick={() => setActiveSub("library")}
          className={cn(
            "text-sm font-medium pb-4 border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-rose-500)] rounded-t",
            activeSub === "library"
              ? "border-[var(--accent-rose-500)] text-[var(--dl-ink)]"
              : "border-transparent text-[var(--dl-muted)] hover:text-[var(--dl-ink)]"
          )}
        >
          Style Library
        </button>
        <button
          onClick={() => setActiveSub("leads")}
          className={cn(
            "text-sm font-medium pb-4 border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-rose-500)] rounded-t",
            activeSub === "leads"
              ? "border-[var(--accent-rose-500)] text-[var(--dl-ink)]"
              : "border-transparent text-[var(--dl-muted)] hover:text-[var(--dl-ink)]"
          )}
        >
          Leads & CRM
        </button>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        {activeSub === "library" ? <StyleLibrary /> : <LeadsCRM />}
      </div>
    </div>
  );
}

function StyleLibrary() {
  const [search, setSearch] = useState("");
  const clients = [
    { id: 1, name: "Sarah Chen", lastVisit: "2 weeks ago", style: "Balayage", color: "Ash Blonde", notes: "Fine hair, avoid over-processing", initials: "SC", avatarColor: "bg-rose-400" },
    { id: 2, name: "Maya Johnson", lastVisit: "1 month ago", style: "Root Touch-Up", color: "Dark Brown", notes: "Sensitive scalp, use gentle developer", initials: "MJ", avatarColor: "bg-purple-400" },
    { id: 3, name: "Emily Davis", lastVisit: "3 days ago", style: "Keratin Treatment", color: "Natural", notes: "No sulfates post-treatment", initials: "ED", avatarColor: "bg-emerald-400" },
    { id: 4, name: "Olivia Martinez", lastVisit: "3 weeks ago", style: "Blowout", color: "Brunette", notes: "Likes volume at crown", initials: "OM", avatarColor: "bg-orange-400" },
  ];

  return (
    <div className="flex h-full bg-[var(--canvas-base)]">
      {/* Left Panel - Client List */}
      <div className="w-[340px] border-r border-white/50 bg-white/40 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-white/50">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--dl-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full bg-white/60 border border-white/50 rounded-lg py-2 pl-10 pr-4 text-sm text-[var(--dl-ink)] focus:outline-none focus:border-[var(--accent-rose-500)] transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {clients.map((client) => (
            <div key={client.id} className="p-3 rounded-lg hover:bg-white/60 cursor-pointer group transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-[var(--dl-ink)]", client.avatarColor)}>{client.initials}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-[var(--dl-ink)] truncate">{client.name}</h4>
                  <p className="text-[11px] text-[var(--dl-muted)]">{client.style} • {client.lastVisit}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#333] group-hover:text-[var(--accent-rose-400)] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Panel - Profile Detail */}
      <div className="flex-1 overflow-y-auto p-8 max-w-5xl">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[var(--accent-rose-600)] to-[var(--accent-rose-400)] flex items-center justify-center text-2xl font-bold text-[var(--dl-ink)] shadow-xl shadow-[var(--accent-rose-10)]">SC</div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Sarah Chen</h2>
                <span className="px-2 py-0.5 bg-[var(--accent-rose-10)] text-[var(--accent-rose-400)] text-[10px] font-bold rounded uppercase tracking-wider border border-[var(--accent-rose-20)]">VIP Member</span>
              </div>
              <p className="text-[var(--dl-muted)] flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Los Angeles, CA • <Clock className="w-4 h-4 ml-2" /> Last visit: May 9, 2026
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-2.5 bg-white/60 border border-white/50 text-[var(--dl-muted)] hover:text-[var(--dl-ink)] rounded-lg transition-colors">
              <Edit2 className="w-5 h-5" />
            </button>
            <button className="px-6 py-2.5 bg-[var(--accent-rose-500)] hover:bg-[var(--accent-rose-600)] text-[var(--dl-ink)] font-bold rounded-lg transition-colors">
              Book Next
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/40 border border-white/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-[var(--accent-rose-10)] rounded-lg"><Info className="w-4 h-4 text-[var(--accent-rose-400)]" /></div>
              <h3 className="font-bold text-[var(--dl-ink)]">Hair Profile</h3>
            </div>
            <div className="space-y-4">
              <ProfileItem label="Texture" value="Fine / Straight" />
              <ProfileItem label="Density" value="Medium" />
              <ProfileItem label="Porosity" value="High (color-treated)" />
              <ProfileItem label="Scalp Condition" value="Sensitive" />
              <ProfileItem label="Current Color" value="Ash Blonde Balayage" />
            </div>
          </div>
          <div className="bg-white/40 border border-white/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg"><History className="w-4 h-4 text-purple-400" /></div>
              <h3 className="font-bold text-[var(--dl-ink)]">The "Usual" Formula</h3>
            </div>
            <div className="space-y-4">
              <ProfileItem label="Base Color" value="Level 6 Dark Blonde" />
              <ProfileItem label="Lightener" value="Olaplex + 20vol" />
              <ProfileItem label="Toner" value="Wella T18 + T14 mix" />
              <ProfileItem label="Treatment" value="Bond Builder every visit" />
              <ProfileItem label="Product" value="Purple shampoo at home" />
            </div>
          </div>
        </div>

        <div className="bg-white/40 border border-white/50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[var(--dl-ink)] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[var(--accent-rose-400)]" /> Professional Notes
            </h3>
            <button className="text-[var(--accent-rose-400)] text-sm font-medium hover:underline">+ Add Entry</button>
          </div>
          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-white/50">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--accent-rose-500)] border-4 border-[var(--canvas-surface)]" />
              <div className="flex justify-between mb-1">
                <p className="text-sm font-bold text-[var(--dl-ink)]">May 9, 2026</p>
                <span className="text-[10px] text-[#555]">Lisa (Master Stylist)</span>
              </div>
              <p className="text-sm text-[var(--dl-muted)] leading-relaxed">Full balayage refresh. Added extra face-framing pieces per request. Used Olaplex No. 1 in lightener. Advised to wait 48hrs before washing.</p>
            </div>
            <div className="relative pl-6 border-l-2 border-white/50">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#333] border-4 border-[var(--canvas-surface)]" />
              <div className="flex justify-between mb-1">
                <p className="text-sm font-bold text-[var(--dl-ink)]">April 2, 2026</p>
                <span className="text-[10px] text-[#555]">Mia (Color Specialist)</span>
              </div>
              <p className="text-sm text-[var(--dl-muted)] leading-relaxed">Root touch-up only. Lifted 1 level with gentle 10vol. Applied T18 toner for 10 minutes. No sensitivity reported.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadsCRM() {
  const [scanState, setScanState] = useState<"idle" | "running" | "done">("idle");
  const [logLines, setLogLines] = useState<{ time: string; msg: string; color: string }[]>([]);
  const [query, setQuery] = useState("Best balayage, Hair Salons West LA");
  const [location, setLocation] = useState("Los Angeles, CA");

  const startScan = () => {
    setScanState("running");
    setLogLines([]);
    const phrases = [
      "Bypassing bot detection...",
      "Scanning local directories...",
      "Extracting business metadata...",
      "Analyzing review patterns...",
      "Validating contact information...",
    ];
    let i = 0;
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
      setLogLines((prev) => [...prev, { time: timeStr, msg: phrases[i % phrases.length], color: "text-[var(--dl-muted)]" }]);
      i++;
      if (i > 8) {
        clearInterval(interval);
        const now = new Date();
        const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
        setLogLines((prev) => [
          ...prev,
          { time: timeStr, msg: "Success: Scraped 12 high-intent leads.", color: "text-emerald-400" },
          { time: timeStr, msg: "Scan complete.", color: "text-[var(--accent-rose-400)] font-bold" },
        ]);
        setScanState("done");
      }
    }, 1200);
  };

  return (
    <div className="flex h-full bg-[var(--canvas-base)]">
      <div className="w-[340px] border-r border-white/50 bg-white/40 p-6 flex flex-col flex-shrink-0">
        <h2 className="text-lg font-bold text-[var(--dl-ink)] mb-6 flex items-center gap-2">
          <Search className="w-5 h-5 text-[var(--accent-rose-400)]" /> Find Leads
        </h2>
        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-xs text-[var(--dl-muted)] font-medium uppercase tracking-wider">Target Keywords</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Best balayage, Hair Salons"
              className="w-full bg-white/60 border border-white/50 rounded-lg px-4 py-2 text-sm text-[var(--dl-ink)] focus:outline-none focus:border-[var(--accent-rose-500)] transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-[var(--dl-muted)] font-medium uppercase tracking-wider">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Los Angeles, CA"
              className="w-full bg-white/60 border border-white/50 rounded-lg px-4 py-2 text-sm text-[var(--dl-ink)] focus:outline-none focus:border-[var(--accent-rose-500)] transition-colors"
            />
          </div>
          <button
            onClick={startScan}
            disabled={scanState === "running"}
            className={cn(
              "w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
              scanState === "running"
                ? "bg-[var(--accent-rose-20)] text-[var(--accent-rose-400)] border border-[var(--accent-rose-30)]"
                : "bg-[var(--accent-rose-500)] text-[var(--dl-ink)] hover:bg-[var(--accent-rose-600)] shadow-lg shadow-[var(--accent-rose-20)]"
            )}
          >
            {scanState === "running" ? <><RefreshCw className="w-4 h-4 animate-spin" /> Crawling...</> : <><Zap className="w-4 h-4" /> Run Lead Scan</>}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-48 border-b border-white/50 bg-[#070709] p-4 overflow-y-auto font-mono text-xs custom-scrollbar">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 font-bold">NORI LEAD ENGINE LIVE SESSION</span>
          </div>
          {logLines.map((line, i) => (
            <div key={i} className="mb-1">
              <span className="text-[var(--dl-muted)] mr-2">[{line.time}]</span>
              <span className={line.color}>{line.msg}</span>
            </div>
          ))}
          {scanState === "idle" && <p className="text-[#333]">$ ready for instructions...</p>}
        </div>
        <div className="flex-1 overflow-x-auto p-6 bg-[var(--canvas-base)] flex gap-6 custom-scrollbar">
          <PipelineCol title="New Leads" count={scanState === "done" ? 12 : 0} color="border-[var(--accent-rose-500)]">
            {scanState === "idle" && (
              <>
                <LeadCard name="Vanessa Liu" type="Bridal Package" price="Score: 92" time="Inquiry 2h ago" initial="V" color="bg-[var(--accent-rose-500)]" isHot />
                <LeadCard name="Bella Beauty Group" type="Corporate Event" price="Score: 88" time="Google Maps Lead" initial="B" color="bg-purple-500" />
              </>
            )}
            {scanState === "done" && (
              <>
                <LeadCard name="Vanessa Liu" type="Bridal Package" price="Score: 92" time="Inquiry 2h ago" initial="V" color="bg-[var(--accent-rose-500)]" isHot />
                <LeadCard name="Bella Beauty Group" type="Corporate Event" price="Score: 88" time="Google Maps Lead" initial="B" color="bg-purple-500" />
                <LeadCard name="Chloe Park" type="Color Correction" price="Score: 85" time="Yelp Lead" initial="C" color="bg-[var(--accent-rose-400)]" />
              </>
            )}
          </PipelineCol>
          <PipelineCol title="Contacted" count={4} color="border-purple-500">
            {scanState === "idle" && <LeadCard name="Sophie Turner" type="Weekly Blowout" price="Score: 76" time="Sent text 1d ago" initial="S" color="bg-purple-500" />}
          </PipelineCol>
          <PipelineCol title="Scheduled" count={8} color="border-emerald-500" />
          <PipelineCol title="Completed" count={64} color="border-white/50" />
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-white/50 pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-[var(--dl-muted)]">{label}</span>
      <span className="text-sm font-medium text-[var(--dl-ink)]">{value}</span>
    </div>
  );
}

function PipelineCol({ title, count, color, children }: { title: string; count: number; color: string; children?: React.ReactNode }) {
  return (
    <div className="min-w-[280px] flex flex-col">
      <div className={cn("flex items-center justify-between p-3 rounded-t-xl border-t-2 bg-white/40", color)}>
        <span className="text-sm font-bold text-[var(--dl-ink)]">{title}</span>
        <span className="text-xs bg-white/60 text-[var(--dl-ink)] px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="flex-1 bg-white/40 rounded-b-xl p-3 space-y-3 neo-kanban-col">
        {children}
      </div>
    </div>
  );
}

function LeadCard({ name, type, price, time, initial, color, isHot, email, phone, website }: { name: string; type: string; price: string; time: string; initial: string; color: string; isHot?: boolean; email?: string; phone?: string; website?: string }) {
  return (
    <div className="bg-white/60 border border-white/50 rounded-xl p-3 hover:border-[var(--accent-rose-30)] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[var(--dl-ink)]", color)}>{initial}</div>
          <div>
            <p className="text-sm font-medium text-[var(--dl-ink)]">{name}</p>
            <p className="text-[10px] text-[var(--dl-muted)]">{type}</p>
          </div>
        </div>
        {isHot && <span className="text-[10px] font-bold text-[var(--accent-rose-400)] uppercase tracking-wider">Hot</span>}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--dl-muted)]">{time}</span>
        <span className="text-xs font-medium text-[var(--dl-ink)]">{price}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MONEY TAB — Staff, Chairs, Revenue
   ═══════════════════════════════════════════════════════════ */
function MoneyTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dl-ink)]">Staff & Revenue</h2>
          <p className="text-[var(--dl-muted)]">Manage chairs and track performance</p>
        </div>
        <button className="px-4 py-2 bg-[var(--accent-rose-500)] text-[var(--dl-ink)] font-bold rounded-lg text-sm hover:bg-[var(--accent-rose-600)] transition-colors">
          + Add Staff Member
        </button>
      </div>

      {/* Revenue KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title="Today's Revenue" value="$740" trend="+12% vs yesterday" trendPositive icon={<DollarSign className="w-5 h-5" />} />
        <KpiTile title="Week Revenue" value="$4,120" icon={<BarChart3 className="w-5 h-5" />} />
        <KpiTile title="Commission Paid" value="$1,030" subtitle="this week" icon={<CreditCard className="w-5 h-5" />} />
        <KpiTile title="Avg per Chair" value="$92.50" icon={<Briefcase className="w-5 h-5" />} />
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StaffDetailCard
          name="Lisa Sterling"
          role="Master Stylist / Owner"
          chair="Chair 1"
          revenue="$2,850"
          clients="24"
          rating="4.9"
          status="available"
        />
        <StaffDetailCard
          name="Mia Torres"
          role="Color Specialist"
          chair="Chair 3"
          revenue="$1,920"
          clients="18"
          rating="4.8"
          status="available"
        />
        <StaffDetailCard
          name="James Park"
          role="Junior Stylist"
          chair="Chair 2"
          revenue="$890"
          clients="12"
          rating="4.7"
          status="break"
        />
      </div>
    </div>
  );
}

function StaffDetailCard({ name, role, chair, revenue, clients, rating, status }: { name: string; role: string; chair: string; revenue: string; clients: string; rating: string; status: "available" | "busy" | "break" }) {
  const dotColor = status === "available" ? "bg-emerald-500" : status === "busy" ? "bg-amber-500" : "bg-[#555]";
  return (
    <div className="rounded-2xl border border-white/50 bg-white/40 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--accent-rose-600)] to-[var(--accent-rose-400)] flex items-center justify-center text-sm font-bold text-[var(--dl-ink)]">
            {name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--dl-ink)]">{name}</h3>
            <p className="text-xs text-[var(--dl-muted)]">{role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", dotColor)} />
          <span className="text-xs text-[var(--dl-muted)] capitalize">{status}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 rounded-xl bg-white/60">
          <p className="text-xs text-[var(--dl-muted)]">Revenue</p>
          <p className="text-lg font-bold text-[var(--dl-ink)]">{revenue}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/60">
          <p className="text-xs text-[var(--dl-muted)]">Clients</p>
          <p className="text-lg font-bold text-[var(--dl-ink)]">{clients}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/60">
          <p className="text-xs text-[var(--dl-muted)]">Rating</p>
          <p className="text-lg font-bold text-[var(--dl-ink)]">{rating}★</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MORE TAB — Social, Content Studio, Reviews, Settings
   ═══════════════════════════════════════════════════════════ */
function MoreTab() {
  const items = [
    { icon: <Share2 className="w-5 h-5" />, label: "Social Media", desc: "Instagram, TikTok, YouTube" },
    { icon: <Film className="w-5 h-5" />, label: "Content Studio", desc: "Photos, videos, captions" },
    { icon: <Star className="w-5 h-5" />, label: "Reviews", desc: "Manage client feedback" },
    { icon: <Smartphone className="w-5 h-5" />, label: "SMS Marketing", desc: "Text campaigns & reminders" },
    { icon: <Mail className="w-5 h-5" />, label: "Email Campaigns", desc: "Newsletters & promotions" },
    { icon: <Palette className="w-5 h-5" />, label: "Branding", desc: "Logo, colors, booking page" },
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
          <button
            key={item.label}
            className="flex items-center gap-4 p-5 rounded-2xl border border-white/50 bg-white/40 hover:bg-white/60 hover:border-[var(--accent-rose-30)] transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-rose-500)]"
          >
            <div className="p-3 rounded-xl bg-[var(--accent-rose-10)] text-[var(--accent-rose-400)]">
              {item.icon}
            </div>
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
