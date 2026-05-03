import React, { useState, useEffect, useRef } from 'react';
import './_group.css';
import { 
  Camera, Users, Calendar, MessageSquare, Star, TrendingUp, Settings,
  LayoutDashboard, Bell, Search, Image as ImageIcon, Share2, GraduationCap,
  Film, Zap, Sparkles, MapPin, CheckCircle2, Clock, MoreHorizontal,
  Plus, Edit2, Trash2, ChevronRight, ArrowUpRight, Check, Filter, CalendarDays,
  Smartphone, Monitor, Eye, Download, Mail, MessageCircle, BarChart3,
  AlignLeft, PlaySquare, FileText, Send, UserPlus, FileVideo, Shield,
  CreditCard, Upload, Globe, Cpu, Wifi, ExternalLink, Target, Radio,
  RefreshCw, AlertCircle, Database, ListFilter, SlidersHorizontal, X,
  ShoppingBag, ClipboardList, Activity, Scissors
} from 'lucide-react';

export function DashboardAesthetician() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activeClient, setActiveClient] = useState('Elena Gilbert');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return <DashboardTab />;
      case 'skin-tracker':
        return <SkinTrackerTab activeClient={activeClient} setActiveClient={setActiveClient} />;
      case 'bookings':
        return <BookingsTab />;
      case 'leads':
        return <LeadsTab />;
      case 'social':
        return <SocialTab />;
      case 'inventory':
        return <InventoryTab />;
      case 'content':
        return <ContentTab />;
      case 'reviews':
        return <ReviewsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="neo-dashboard-container min-h-[100dvh] bg-[#09090b] text-white flex overflow-hidden">
      
      {/* Left Sidebar */}
      <aside className="w-[72px] lg:w-[240px] flex-shrink-0 border-r border-[#1f1f1f] bg-[#0d0d0d] flex flex-col justify-between transition-all duration-300 z-10">
        <div>
          {/* Logo Area */}
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gradient-to-tr from-pink-600 to-pink-400 flex items-center justify-center font-bold text-lg text-white">
                ZM
              </div>
              <div className="hidden lg:block">
                <h2 className="font-bold text-base leading-tight text-white">Zara Mitchell</h2>
                <p className="text-[#888] text-[10px] uppercase tracking-wider">Skin Atelier</p>
              </div>
            </div>
          </div>
          
          <nav className="p-3 space-y-1 mt-4">
            <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeNav === 'dashboard'} onClick={() => setActiveNav('dashboard')} />
            <NavItem icon={<Activity />} label="Skin Tracker" active={activeNav === 'skin-tracker'} onClick={() => setActiveNav('skin-tracker')} />
            <NavItem icon={<Calendar />} label="Bookings" active={activeNav === 'bookings'} onClick={() => setActiveNav('bookings')} />
            <NavItem icon={<Users />} label="Leads & CRM" active={activeNav === 'leads'} onClick={() => setActiveNav('leads')} />
            <NavItem icon={<Share2 />} label="Social Media" active={activeNav === 'social'} onClick={() => setActiveNav('social')} />
            <NavItem icon={<ShoppingBag />} label="Product Inventory" active={activeNav === 'inventory'} onClick={() => setActiveNav('inventory')} />
            <NavItem icon={<Film />} label="Content Studio" active={activeNav === 'content'} onClick={() => setActiveNav('content')} />
            <NavItem icon={<Star />} label="Reviews" active={activeNav === 'reviews'} onClick={() => setActiveNav('reviews')} />
          </nav>
        </div>

        <div className="p-3 border-t border-[#1f1f1f] space-y-1">
          <div className="flex items-center gap-2 px-2 py-2 mb-1">
            <img src="/__mockup/images/nori_nobg.png" alt="NORI" className="nori-animated object-contain flex-shrink-0" style={{ width: 36, height: 36 }} />
            <span className="hidden lg:block text-[10px] font-bold tracking-widest" style={{ color: '#00B359', fontFamily: 'monospace' }}>Powered by N.O.R.I.</span>
          </div>
          <NavItem icon={<Settings />} label="Settings" active={activeNav === 'settings'} onClick={() => setActiveNav('settings')} />
          <div className="mt-2 flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer transition-colors">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-600 to-pink-400 flex items-center justify-center font-semibold text-xs flex-shrink-0 text-white">
                ZM
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0d0d0d]"></span>
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Zara Mitchell</p>
              <p className="text-xs text-pink-500 font-medium truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#09090b]">
        
        {/* Topbar */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 lg:px-8 border-b border-[#1f1f1f] z-20">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-white">Good morning, Zara</h1>
            <p className="text-[#888] text-sm">May 3, 2026</p>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <QuickStatChip label="18 Treatments This Week" />
            <QuickStatChip label="5 New Inquiries" />
            <QuickStatChip label="8 Unread" alert />
            <QuickStatChip label="Product Reorder Due" alert />
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-[#888] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-[#09090b]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-600 to-pink-400 flex items-center justify-center text-xs font-bold text-white cursor-pointer">
              ZM
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// ---- SHARED COMPONENTS ----

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
        active 
          ? 'bg-pink-500/10 text-pink-500' 
          : 'text-[#888] hover:bg-[#1a1a1a] hover:text-white'
      }`}
    >
      <span className={`${active ? 'text-pink-500' : 'text-[#888] group-hover:text-white'}`}>
        {icon}
      </span>
      <span className="hidden lg:block text-sm font-medium truncate">{label}</span>
    </button>
  );
}

function QuickStatChip({ label, alert }: { label: string, alert?: boolean }) {
  return (
    <div className={`px-3 py-1.5 rounded-full text-[11px] font-medium border flex items-center gap-2 ${
      alert 
        ? 'bg-pink-500/10 border-pink-500/30 text-pink-500' 
        : 'bg-[#141414] border-[#222] text-[#aaa]'
    }`}>
      {alert && <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>}
      {label}
    </div>
  );
}

function KpiCard({ title, value, trend, icon, trendPositive, subtitle, valueColor = "text-white" }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] p-5 rounded-xl">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-[#141414] rounded-lg">
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trendPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-[#888] text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className={`text-2xl font-bold ${valueColor}`}>{value}</h3>
          {subtitle && <span className="text-[#555] text-xs">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}

function Widget({ title, icon, badge, badgeColor = "bg-pink-500 text-white", children }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl flex flex-col h-full overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1f1f1f] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{title}</h3>
        </div>
        {badge && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="p-5 flex-1">
        {children}
      </div>
    </div>
  );
}

// ---- TAB COMPONENTS ----

function DashboardTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Monthly Revenue" 
          value="$12,800" 
          trend="+15% vs last month" 
          icon={<TrendingUp className="w-5 h-5 text-[#888]" />} 
          trendPositive 
        />
        <KpiCard 
          title="Active Clients" 
          value="34" 
          icon={<Users className="w-5 h-5 text-[#888]" />} 
        />
        <KpiCard 
          title="Treatments" 
          value="18" 
          subtitle="this week"
          icon={<ClipboardList className="w-5 h-5 text-[#888]" />} 
        />
        <KpiCard 
          title="Avg Review" 
          value="4.8★" 
          subtitle="(52 reviews)"
          icon={<Star className="w-5 h-5 text-[#888]" />} 
          valueColor="text-pink-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Appointments */}
        <div className="lg:col-span-5 flex flex-col">
          <Widget title="Today's Appointments" icon={<Calendar className="w-4 h-4 text-[#888]" />}>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-[#141414] border border-[#222] rounded-lg">
                <div className="text-center min-w-[50px]">
                  <p className="text-xs font-bold text-pink-500">9:30</p>
                  <p className="text-[10px] text-[#555]">AM</p>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">Elena Gilbert</h4>
                  <p className="text-xs text-[#888]">HydraFacial + LED Therapy</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white">$250</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-[#141414] border border-[#222] rounded-lg">
                <div className="text-center min-w-[50px]">
                  <p className="text-xs font-bold text-pink-500">11:00</p>
                  <p className="text-[10px] text-[#555]">AM</p>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">Sarah Jenkins</h4>
                  <p className="text-xs text-[#888]">Microneedling session 3/6</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white">$450</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-[#141414] border border-[#222] rounded-lg">
                <div className="text-center min-w-[50px]">
                  <p className="text-xs font-bold text-pink-500">1:30</p>
                  <p className="text-[10px] text-[#555]">PM</p>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">Maya Rossi</h4>
                  <p className="text-xs text-[#888]">Chemical Peel - Grade 2</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white">$180</span>
                </div>
              </div>
              <button className="w-full mt-2 border border-dashed border-[#333] hover:border-pink-500/50 hover:text-pink-500 text-[#888] rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" /> New Booking
              </button>
            </div>
          </Widget>
        </div>

        {/* AI Skin Insights */}
        <div className="lg:col-span-7 flex flex-col">
          <Widget title="N.O.R.I. Skin Analysis" icon={<Zap className="w-4 h-4 text-pink-500" />} badge="AI INSIGHTS">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-pink-500/5 border border-pink-500/20 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-pink-500" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Trend Alert</h4>
                </div>
                <p className="text-xs text-[#aaa] leading-relaxed mb-4">
                  Clients in the "West LA" area are showing a 40% increase in hyperpigmentation concerns this month. Consider promoting your Brightening Peel package.
                </p>
                <button className="text-xs font-bold text-pink-500 flex items-center gap-1 hover:gap-2 transition-all">
                  Launch Campaign <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-blue-500" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Inventory Reorder</h4>
                </div>
                <p className="text-xs text-[#aaa] leading-relaxed mb-4">
                  Hyaluronic Acid Serum (Retail) is at 15% stock. AI predicts a sell-out in 4 days based on current treatment volume.
                </p>
                <button className="text-xs font-bold text-blue-500 flex items-center gap-1 hover:gap-2 transition-all">
                  Auto-Reorder Now <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="text-[10px] text-[#555] uppercase font-bold tracking-[0.2em]">Next Steps</h4>
              <div className="flex items-center justify-between p-3 bg-[#141414] border border-[#222] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                  <p className="text-xs text-white">Follow up with Elena G. on post-treatment peeling</p>
                </div>
                <button className="text-[10px] bg-pink-500 text-white px-3 py-1 rounded">Text</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#141414] border border-[#222] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#333]"></div>
                  <p className="text-xs text-white">Send Microneedling prep guide to Sarah J.</p>
                </div>
                <button className="text-[10px] bg-[#222] text-[#888] px-3 py-1 rounded">Email</button>
              </div>
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}

function SkinTrackerTab({ activeClient, setActiveClient }: any) {
  return (
    <div className="h-full flex flex-col">
      <div className="h-16 border-b border-[#1f1f1f] px-6 flex items-center justify-between flex-shrink-0 bg-[#0d0d0d]">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-pink-500" />
          <h2 className="text-lg font-semibold text-white">Client Skin Journey</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#555] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="bg-[#141414] border border-[#222] rounded-full py-1.5 pl-9 pr-4 text-xs text-white w-64 focus:outline-none focus:border-pink-500"
            />
          </div>
          <button className="bg-pink-500 text-white px-4 py-1.5 rounded-full text-xs font-bold">Add Photo</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Client List */}
        <div className="w-80 border-r border-[#1f1f1f] bg-[#0a0a0c] overflow-y-auto">
          {['Elena Gilbert', 'Sarah Jenkins', 'Maya Rossi', 'Julianna Pierce', 'Amara Vance'].map((client, i) => (
            <div 
              key={client}
              onClick={() => setActiveClient(client)}
              className={`p-4 border-b border-[#1f1f1f] cursor-pointer transition-colors ${activeClient === client ? 'bg-pink-500/10' : 'hover:bg-[#141414]'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#222] border border-[#333] flex items-center justify-center text-xs font-bold text-white">
                  {client.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{client}</h4>
                  <p className="text-[10px] text-[#555]">Last visit: 12 days ago</p>
                </div>
                {i === 0 && <span className="w-2 h-2 rounded-full bg-pink-500"></span>}
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[9px] bg-[#141414] border border-[#222] text-[#888] px-2 py-0.5 rounded-full whitespace-nowrap">Acne-Prone</span>
                <span className="text-[9px] bg-[#141414] border border-[#222] text-[#888] px-2 py-0.5 rounded-full whitespace-nowrap">Oily</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Tracker Panel */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#09090b]">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{activeClient}</h3>
              <p className="text-sm text-[#888]">Member since Jan 2025 &bull; 14 Treatments</p>
            </div>
            <div className="flex gap-3">
              <div className="text-center p-3 bg-[#141414] border border-[#222] rounded-xl min-w-[100px]">
                <p className="text-[10px] text-[#555] uppercase font-bold mb-1">Skin Health</p>
                <p className="text-xl font-bold text-emerald-500">84/100</p>
              </div>
              <div className="text-center p-3 bg-[#141414] border border-[#222] rounded-xl min-w-[100px]">
                <p className="text-[10px] text-[#555] uppercase font-bold mb-1">Sensitivity</p>
                <p className="text-xl font-bold text-amber-500">Medium</p>
              </div>
            </div>
          </div>

          {/* Comparison Slider Mock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Before & After Progress</h4>
                <div className="flex gap-2">
                  <span className="text-[10px] text-pink-500 font-bold">Session 1 vs Session 12</span>
                </div>
              </div>
              <div className="aspect-[4/3] bg-[#141414] border border-[#222] rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-50 grayscale"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center clip-path-[inset(0_0_0_50%)]"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] z-10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-pink-500 border-4 border-[#09090b] flex items-center justify-center">
                    <SlidersHorizontal className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] text-white">JAN 15, 2026</div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] text-white">MAY 01, 2026</div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Active Protocol</h4>
              <div className="space-y-3">
                <div className="p-4 bg-[#141414] border border-[#222] rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#888]">Next Step</p>
                    <p className="text-sm font-bold text-white">Advanced Retinol Infusion</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#555]">May 15</p>
                  </div>
                </div>

                <div className="p-4 bg-[#141414] border border-[#222] rounded-xl">
                  <p className="text-[10px] text-[#555] uppercase font-bold mb-3">Recommended Home Care</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#ccc]">Zinc Oxide Mineral Sunscreen</span>
                      <span className="text-pink-500 font-bold">$65</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#ccc]">Niacinamide + B5 Recovery</span>
                      <span className="text-pink-500 font-bold">$82</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <p className="text-xs font-bold text-emerald-500 uppercase">AI Analysis</p>
                  </div>
                  <p className="text-xs text-[#888] leading-relaxed">
                    Texture has improved by 22% since the last peel. Pores on the t-zone area are 15% more refined. Recommendation: Continue with current routine but increase HA concentration by 10%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Treatment Timeline */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Treatment History</h4>
            <div className="border border-[#1f1f1f] rounded-2xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#141414] text-[#555] font-bold text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Treatment</th>
                    <th className="px-6 py-3">Notes</th>
                    <th className="px-6 py-3">Result</th>
                    <th className="px-6 py-3">Photos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]">
                  <tr className="bg-[#0d0d0d] hover:bg-[#141414] transition-colors">
                    <td className="px-6 py-4 text-white">May 01</td>
                    <td className="px-6 py-4">HydraFacial Deluxe</td>
                    <td className="px-6 py-4 text-[#888]">Deep cleanse, blue light...</td>
                    <td className="px-6 py-4"><span className="text-emerald-500 font-medium">Optimal</span></td>
                    <td className="px-6 py-4"><div className="w-8 h-8 rounded bg-[#222]"></div></td>
                  </tr>
                  <tr className="bg-[#0d0d0d] hover:bg-[#141414] transition-colors">
                    <td className="px-6 py-4 text-white">Apr 12</td>
                    <td className="px-6 py-4">Dermaplaning</td>
                    <td className="px-6 py-4 text-[#888]">Full face, focused on...</td>
                    <td className="px-6 py-4"><span className="text-emerald-500 font-medium">Optimal</span></td>
                    <td className="px-6 py-4"><div className="w-8 h-8 rounded bg-[#222]"></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingsTab() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Calendar</h2>
          <p className="text-[#888] text-sm">Manage your treatment schedule and staff availability</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#141414] border border-[#222] text-[#888] px-4 py-2 rounded-lg text-sm font-medium hover:text-white transition-colors">Week View</button>
          <button className="bg-pink-500 text-white px-6 py-2 rounded-lg text-sm font-bold">New Appointment</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-[#1f1f1f] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-2xl">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
          <div key={day} className="bg-[#0d0d0d] min-h-[120px] p-4 group cursor-pointer hover:bg-[#111] transition-colors">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#555] font-bold text-[10px] uppercase tracking-wider">{day}</span>
              <span className={`text-sm font-bold ${i === 2 ? 'text-pink-500' : 'text-[#888]'}`}>{i + 1}</span>
            </div>
            {i === 2 && (
              <div className="space-y-1">
                <div className="p-1.5 bg-pink-500/10 border-l-2 border-pink-500 rounded text-[10px] text-pink-500 font-bold truncate">9:30 AM Elena G.</div>
                <div className="p-1.5 bg-blue-500/10 border-l-2 border-blue-500 rounded text-[10px] text-blue-500 font-bold truncate">11:00 AM Sarah J.</div>
              </div>
            )}
            {i === 3 && (
              <div className="p-1.5 bg-pink-500/10 border-l-2 border-pink-500 rounded text-[10px] text-pink-500 font-bold truncate">1:30 PM Maya R.</div>
            )}
            <div className="mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-full py-1 text-[10px] font-bold text-[#555] hover:text-white border border-dashed border-[#222] rounded flex items-center justify-center gap-1">
                <Plus size={10} /> Add
              </button>
            </div>
          </div>
        ))}
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="bg-[#0d0d0d] min-h-[120px] p-4 group cursor-pointer hover:bg-[#111] transition-colors">
             <div className="flex justify-between items-center mb-4">
              <span className="text-[#333] font-bold text-[10px] uppercase tracking-wider"></span>
              <span className="text-sm font-bold text-[#333]">{i + 8}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadsTab() {
  const [scanState, setScanState] = useState<'idle' | 'running' | 'done'>('idle');
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logLines, setLogLines] = useState<{ time: string, msg: string, color?: string }[]>([]);
  const [query, setQuery] = useState('esthetician, skin care clinic, facial treatment');
  const [location, setLocation] = useState('Los Angeles, CA');
  const logRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScan = async () => {
    setIsLoading(true);
    setScanState('running');
    setError(null);
    setLeads([]);
    setLogLines([]);

    const LOG_TEMPLATES = [
      { msg: 'Initializing Firecrawl v4.2.0...', color: 'text-pink-500' },
      { msg: `Target: ${location}`, color: 'text-white' },
      { msg: 'Crawling Yelp "Skincare & Aesthetician" category...', color: 'text-[#aaa]' },
      { msg: 'Accessing StyleSeat public listings...', color: 'text-[#aaa]' },
      { msg: 'Filtering for solo practitioners and boutique clinics...', color: 'text-[#aaa]' },
      { msg: 'Signal detected: Local social mentions for "facialist recommendations"', color: 'text-emerald-500' },
      { msg: 'Analyzing sentiment and lead quality...', color: 'text-[#aaa]' },
      { msg: 'AI Scoring leads based on digital footprint...', color: 'text-pink-400' },
      { msg: 'Finalizing lead extraction...', color: 'text-emerald-500' },
    ];

    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < LOG_TEMPLATES.length) {
        setLogLines(prev => [...prev, { time: `${(i * 0.8).toFixed(1)}s`, ...LOG_TEMPLATES[i] }]);
        i++;
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
      }
    }, 800);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: 'aesthetician',
          query,
          location,
          limit: 10
        })
      });

      const data = await response.json();
      if (data.success) {
        setLeads(data.leads);
        setScanState('done');
      } else {
        setError(data.error || 'Failed to fetch leads');
        setScanState('idle');
      }
    } catch (err) {
      setError('Connection to scraping server failed');
      setScanState('idle');
    } finally {
      setIsLoading(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <div className="flex h-full">
      <div className="w-[400px] border-r border-[#1f1f1f] bg-[#0d0d0d] p-8 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Find Leads</h2>
          <p className="text-[#888] text-xs leading-relaxed">Target local spa directories, Google Maps results, and social signals to find your next VIP clients.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#555] uppercase tracking-widest">Location</label>
            <input 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Beverly Hills, CA"
              className="w-full bg-[#141414] border border-[#222] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-pink-500" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#555] uppercase tracking-widest">Keywords</label>
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              className="w-full bg-[#141414] border border-[#222] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-pink-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#555] uppercase tracking-widest">Lead Source</label>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-lg text-[10px] font-bold text-pink-500 flex items-center gap-2">
                <Globe size={14} /> Yelp Spas
              </button>
              <button className="p-3 bg-[#141414] border border-[#222] rounded-lg text-[10px] font-bold text-[#888] flex items-center gap-2">
                <MapPin size={14} /> Google Maps
              </button>
              <button className="p-3 bg-[#141414] border border-[#222] rounded-lg text-[10px] font-bold text-[#888] flex items-center gap-2">
                <Search size={14} /> StyleSeat
              </button>
              <button className="p-3 bg-[#141414] border border-[#222] rounded-lg text-[10px] font-bold text-[#888] flex items-center gap-2">
                <Activity size={14} /> Local Reels
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={startScan}
              disabled={isLoading}
              className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap size={16} />} 
              {isLoading ? 'Scanning...' : 'Run Firecrawl Scan'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#09090b] overflow-y-auto p-8">
        {scanState === 'idle' ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#141414] border border-[#222] flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-[#333]" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">No active scan</h3>
            <p className="text-[#555] text-sm">Configure your parameters and start the Firecrawl AI engine to discover qualified leads in your area.</p>
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs flex items-center gap-2">
                <AlertCircle size={14} /> {error}
              </div>
            )}
          </div>
        ) : scanState === 'running' ? (
          <div className="space-y-4">
            <div 
              ref={logRef}
              className="h-80 bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-6 font-mono text-xs overflow-y-auto custom-scrollbar"
            >
              {logLines.map((line, idx) => (
                <p key={idx} className={`mb-1.5 ${line.color || 'text-[#888]'}`}>
                  <span className="text-[#444] mr-3">[{line.time}]</span>
                  {line.msg}
                </p>
              ))}
              <p className="animate-pulse text-pink-500 mt-2">_</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Scanned Results <span className="text-[#555] font-normal text-sm">({leads.length} qualified)</span></h3>
              <div className="flex gap-3">
                <button className="text-xs font-bold text-pink-500">Export as CSV</button>
                <button 
                  onClick={() => setScanState('idle')}
                  className="text-xs font-bold text-[#555] hover:text-white transition-colors"
                >New Scan</button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {leads.map((lead, idx) => (
                <div key={lead.id || idx} className="p-5 bg-[#141414] border border-[#222] rounded-2xl flex items-center justify-between hover:border-pink-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-600 to-pink-400 flex items-center justify-center font-bold text-white shadow-lg shadow-pink-500/10">
                      {(lead.name || lead.business || 'L')[0]}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{lead.name || lead.business}</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {lead.source && (
                          <span className="text-[10px] bg-[#1a1a1a] border border-[#333] text-[#888] px-2 py-0.5 rounded-full uppercase tracking-tighter">
                            {lead.source}
                          </span>
                        )}
                        {lead.email && (
                          <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Mail size={10} /> Email
                          </span>
                        )}
                        {lead.phone && (
                          <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Smartphone size={10} /> Phone
                          </span>
                        )}
                        {lead.website && (
                          <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Globe size={10} /> Web
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#555] mt-2 italic line-clamp-1">{lead.notes || `Found via ${lead.source} scan in ${location}`}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[10px] text-[#555] font-bold uppercase tracking-wider mb-1">AI Score</p>
                      <p className="text-xl font-bold text-pink-500">{lead.score || 85}</p>
                    </div>
                    <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-pink-500/20">Add to CRM</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SocialTab() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Social Studio</h2>
          <p className="text-[#888] text-sm">Schedule your before/after transformations</p>
        </div>
        <button className="bg-pink-500 text-white px-6 py-2 rounded-lg text-sm font-bold">New Post</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square bg-[#141414] border border-[#222] rounded-xl overflow-hidden group relative cursor-pointer">
              <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/20 transition-all"></div>
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-[9px] text-white">Scheduled</div>
            </div>
            <div className="aspect-square bg-[#141414] border border-[#222] rounded-xl overflow-hidden group relative cursor-pointer">
              <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/20 transition-all"></div>
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-[9px] text-white">Draft</div>
            </div>
            <div className="aspect-square bg-[#141414] border border-[#222] rounded-xl flex items-center justify-center text-[#333] hover:text-pink-500 hover:border-pink-500/50 transition-all cursor-pointer">
              <Plus size={32} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-6">
            <h4 className="text-white font-bold text-sm mb-4">Channel Performance</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center">
                    <Camera size={14} className="text-white" />
                  </div>
                  <span className="text-xs text-white">Instagram</span>
                </div>
                <span className="text-xs font-bold text-emerald-500">+12.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-black border border-[#222] flex items-center justify-center text-white">
                    <Film size={14} />
                  </div>
                  <span className="text-xs text-white">TikTok</span>
                </div>
                <span className="text-xs font-bold text-emerald-500">+48.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryTab() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Inventory</h2>
          <p className="text-[#888] text-sm">Retail products and treatment supplies</p>
        </div>
        <button className="bg-pink-500 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <Download size={16} /> Order Supplies
        </button>
      </div>

      <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#141414] text-[#555] font-bold text-[10px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f1f1f]">
            {[
              { name: 'Hyaluronic Acid Serum', cat: 'Retail', stock: 14, status: 'In Stock', price: '$82' },
              { name: 'Retinol Complex 0.5%', cat: 'Retail', stock: 3, status: 'Low Stock', price: '$110' },
              { name: 'Pro-Peel Grade 2', cat: 'Professional', stock: 22, status: 'In Stock', price: '—' },
              { name: 'LED Wand Covers', cat: 'Supply', stock: 120, status: 'In Stock', price: '—' }
            ].map(item => (
              <tr key={item.name} className="hover:bg-[#111] transition-colors">
                <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                <td className="px-6 py-4 text-[#888]">{item.cat}</td>
                <td className="px-6 py-4 text-[#888]">{item.stock}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === 'Low Stock' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-white">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ContentTab() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Studio</h2>
          <p className="text-[#888] text-sm">AI-powered before/after generator & reel templates</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#141414] border border-[#222] text-[#888] px-4 py-2 rounded-lg text-sm font-medium hover:text-white transition-colors">Drafts</button>
          <button className="bg-pink-500 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <Sparkles size={16} /> Generate Reel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'The Glow Up', type: 'Before/After Reel', duration: '15s', icon: <Zap /> },
          { title: 'ASMR Treatment', type: 'Product Showcase', duration: '30s', icon: <Activity /> },
          { title: 'Client Testimonial', type: 'Interview Style', duration: '45s', icon: <MessageSquare /> }
        ].map(template => (
          <div key={template.title} className="bg-[#0d0d0d] border border-[#1f1f1f] p-6 rounded-2xl hover:border-pink-500/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform">
              {template.icon}
            </div>
            <h4 className="text-white font-bold mb-1">{template.title}</h4>
            <p className="text-xs text-[#555] mb-4">{template.type} &bull; {template.duration}</p>
            <button className="text-[10px] font-bold text-pink-500 uppercase tracking-widest hover:gap-2 flex items-center gap-1 transition-all">Use Template <ArrowUpRight size={12} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Reviews</h2>
          <p className="text-[#888] text-sm">Managing your online reputation across all platforms</p>
        </div>
        <div className="flex gap-4 p-4 bg-[#141414] border border-[#222] rounded-2xl">
          <div className="text-center">
            <p className="text-xs text-[#555] font-bold uppercase mb-1">Total Score</p>
            <p className="text-xl font-bold text-white">4.8</p>
          </div>
          <div className="w-px bg-[#222]"></div>
          <div className="text-center">
            <p className="text-xs text-[#555] font-bold uppercase mb-1">Total Reviews</p>
            <p className="text-xl font-bold text-white">52</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { name: 'Jessica Alba', platform: 'Google', date: '2d ago', text: 'Zara is the best! My skin has never looked better. The treatment plan she made for me actually works.', rating: 5 },
          { name: 'Mark Ronson', platform: 'Yelp', date: '1w ago', text: 'Professional, clean studio and very knowledgeable. The microneedling was practically painless.', rating: 5 },
          { name: 'Sarah S.', platform: 'RealSelf', date: '2w ago', text: 'Great results, but the studio was a bit hard to find at first.', rating: 4 }
        ].map(review => (
          <div key={review.name} className="p-6 bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center font-bold text-white">{review.name[0]}</div>
                <div>
                  <h4 className="text-white font-bold">{review.name}</h4>
                  <p className="text-[10px] text-[#555] font-bold uppercase tracking-widest">{review.platform} &bull; {review.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < review.rating ? 'text-pink-500 fill-pink-500' : 'text-[#333]'} />
                ))}
              </div>
            </div>
            <p className="text-sm text-[#888] leading-relaxed mb-6">"{review.text}"</p>
            <div className="flex gap-3">
              <button className="text-[10px] font-bold text-white px-4 py-2 bg-[#141414] border border-[#222] rounded-lg">Reply</button>
              <button className="text-[10px] font-bold text-pink-500 px-4 py-2">Share to Social</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [activeSection, setActiveSection] = useState<'profile' | 'nori' | 'billing' | 'notifications'>('profile');
  const [autoFollowUp, setAutoFollowUp] = useState(true);
  const [predictiveOrdering, setPredictiveOrdering] = useState(false);
  const [rebookReminders, setRebookReminders] = useState(true);
  const [reviewRequests, setReviewRequests] = useState(false);

  return (
    <div className="p-8 max-w-3xl">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>

      <div className="flex gap-6 border-b border-[#1f1f1f] mb-8">
        {([
          { key: 'profile', label: 'Profile' },
          { key: 'nori', label: 'NORI Engine' },
          { key: 'billing', label: 'Billing' },
          { key: 'notifications', label: 'Notifications' },
        ] as const).map(s => (
          <button key={s.key} onClick={() => setActiveSection(s.key)} className={`pb-3 border-b-2 text-sm font-medium transition-colors ${activeSection === s.key ? 'border-pink-500 text-pink-500' : 'border-transparent text-[#888] hover:text-white'}`}>{s.label}</button>
        ))}
      </div>

      {activeSection === 'profile' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-[#555]">Studio Name</label>
              <input type="text" defaultValue="Skin Atelier by Zara" className="w-full bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-pink-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-[#555]">Email Address</label>
              <input type="email" defaultValue="zara@skinatelier.com" className="w-full bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-pink-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-[#555]">Phone</label>
              <input type="tel" defaultValue="+1 (310) 555-0174" className="w-full bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-pink-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-[#555]">Bio</label>
              <textarea rows={3} defaultValue="Licensed aesthetician with 8 years of experience. Specializing in HydraFacial, chemical peels, and customized treatment plans for all skin types." className="w-full bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-pink-500 resize-none"></textarea>
            </div>
          </div>
          <div className="pt-4">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-xl transition-colors">Save Changes</button>
          </div>
        </div>
      )}

      {activeSection === 'nori' && (
        <div className="space-y-4">
          <p className="text-sm text-[#888] mb-6">NORI handles the follow-up and automation so you can focus on treatments.</p>
          {[
            { label: 'Auto-Suggest Client Follow-ups', desc: 'NORI will analyze treatment types and suggest post-care reach out', value: autoFollowUp, set: setAutoFollowUp },
            { label: 'AI Inventory Predictive Ordering', desc: 'Automatically build supply carts based on upcoming bookings', value: predictiveOrdering, set: setPredictiveOrdering },
            { label: 'Rebook Reminders', desc: 'Nudge clients when they\'re due for their next appointment', value: rebookReminders, set: setRebookReminders },
            { label: 'Auto Review Requests', desc: 'Send a review link 24h after each completed appointment', value: reviewRequests, set: setReviewRequests },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-4 bg-[#141414] border border-[#222] rounded-xl">
              <div>
                <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                <p className="text-xs text-[#555]">{item.desc}</p>
              </div>
              <button onClick={() => item.set(v => !v)} className={`w-10 h-6 rounded-full relative p-1 cursor-pointer transition-colors flex-shrink-0 ${item.value ? 'bg-pink-500' : 'bg-[#333]'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-all ${item.value ? 'ml-auto' : 'ml-0'}`}></div>
              </button>
            </div>
          ))}
          <div className="pt-4">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-xl transition-colors">Save NORI Settings</button>
          </div>
        </div>
      )}

      {activeSection === 'billing' && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-pink-500/5 border border-pink-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Pro Aesthetician Plan</p>
                <p className="text-xs text-[#555]">$49/month · Next billing Jun 3, 2026</p>
              </div>
              <button className="text-xs text-[#555] font-bold hover:text-white transition-colors">MANAGE</button>
            </div>
          </div>
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Payment Method</h3>
            <div className="flex items-center justify-between p-3 bg-[#141414] border border-[#222] rounded-lg">
              <span className="text-sm text-white">•••• •••• •••• 4242</span>
              <button className="text-xs text-pink-500 hover:text-pink-400 font-bold transition-colors">Update</button>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'notifications' && (
        <div className="space-y-4 max-w-2xl">
          {[
            { label: 'New Booking Alerts', desc: 'Notify me when a client books online', on: true },
            { label: 'New Lead Alerts', desc: 'Alert when Firecrawl scan finds new prospects', on: true },
            { label: 'Low Inventory Warning', desc: 'Notify when a product stock drops below threshold', on: true },
            { label: 'Weekly Revenue Report', desc: 'Email summary every Monday', on: false },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-[#141414] border border-[#222] rounded-xl">
              <div>
                <p className="text-sm font-bold text-white mb-1">{n.label}</p>
                <p className="text-xs text-[#555]">{n.desc}</p>
              </div>
              <div className={`w-10 h-6 rounded-full relative p-1 cursor-pointer ${n.on ? 'bg-pink-500' : 'bg-[#333]'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow ${n.on ? 'ml-auto' : 'ml-0'}`}></div>
              </div>
            </div>
          ))}
          <div className="pt-4">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-xl transition-colors">Save Preferences</button>
          </div>
        </div>
      )}
    </div>
  );
}
