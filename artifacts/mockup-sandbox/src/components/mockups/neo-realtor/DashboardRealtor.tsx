import React, { useState, useEffect, useRef } from 'react';
import './_group.css';
import { 
  Building2, Users, Calendar, MessageSquare, Star, TrendingUp, Settings,
  LayoutDashboard, Bell, Search, MapPin, Share2, GraduationCap,
  Film, Zap, Sparkles, CheckCircle2, Clock, MoreHorizontal,
  Plus, Edit2, Trash2, ChevronRight, ArrowUpRight, Check, Filter,
  Smartphone, Monitor, Eye, Download, Mail, MessageCircle, BarChart3,
  AlignLeft, PlaySquare, FileText, Send, UserPlus, FileVideo, Shield,
  CreditCard, Upload, Globe, Cpu, Wifi, ExternalLink, Target, Radio,
  RefreshCw, AlertCircle, Database, ListFilter, SlidersHorizontal, X,
  Home, Landmark, School, TrendingDown, Terminal
} from 'lucide-react';

export function DashboardRealtor() {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return <DashboardTab />;
      case 'intel':
        return <NeighborhoodIntelTab />;
      case 'listings':
        return <ListingsTab />;
      case 'leads':
        return <LeadsTab />;
      case 'social':
        return <SocialTab />;
      case 'transaction':
        return <TransactionTrackerTab />;
      case 'content':
        return <ContentStudioTab />;
      case 'reviews':
        return <ReviewsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="neo-realtor-dashboard-container min-h-[100dvh] bg-[#09090b] text-white flex overflow-hidden">
      
      {/* Left Sidebar */}
      <aside className="w-[72px] lg:w-[240px] flex-shrink-0 border-r border-[#1f1f1f] bg-[#0d0d0d] flex flex-col justify-between transition-all duration-300 z-10">
        <div>
          {/* Logo Area */}
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-bold text-lg text-black">
                JB
              </div>
              <div className="hidden lg:block">
                <h2 className="font-bold text-base leading-tight">Jordan Blake</h2>
                <p className="text-[#888] text-[10px] uppercase tracking-wider">Blake Realty Group</p>
              </div>
            </div>
          </div>
          
          <nav className="p-3 space-y-1 mt-4">
            <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeNav === 'dashboard'} onClick={() => setActiveNav('dashboard')} />
            <NavItem icon={<Globe />} label="Neighborhood Intel" active={activeNav === 'intel'} onClick={() => setActiveNav('intel')} />
            <NavItem icon={<Home />} label="Listings" active={activeNav === 'listings'} onClick={() => setActiveNav('listings')} />
            <NavItem icon={<Users />} label="Leads & CRM" active={activeNav === 'leads'} onClick={() => setActiveNav('leads')} />
            <NavItem icon={<Share2 />} label="Social Media" active={activeNav === 'social'} onClick={() => setActiveNav('social')} />
            <NavItem icon={<TrendingUp />} label="Transaction Tracker" active={activeNav === 'transaction'} onClick={() => setActiveNav('transaction')} />
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
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-semibold text-xs flex-shrink-0 text-black">
                JB
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0d0d0d]"></span>
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Jordan Blake</p>
              <p className="text-xs text-indigo-500 font-medium truncate">Broker Associate</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#09090b]">
        
        {/* Topbar */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 lg:px-8 border-b border-[#1f1f1f] z-20">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-white">Market's moving, Jordan</h1>
            <p className="text-[#888] text-sm">May 3, 2026</p>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <QuickStatChip label="2 Closings Today" />
            <QuickStatChip label="14 New Leads" />
            <QuickStatChip label="8 Open Houses" alert />
            <QuickStatChip label="$2.4M Pipeline" />
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-[#888] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-[#09090b]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-xs font-bold text-black cursor-pointer">
              JB
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

// ---- COMPONENTS ----

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
        active 
          ? 'bg-indigo-500/10 text-indigo-500' 
          : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'
      }`}
    >
      <span className={`flex-shrink-0 ${active ? 'text-indigo-500' : 'group-hover:text-white transition-colors'}`}>
        {icon}
      </span>
      <span className="hidden lg:block text-sm font-medium truncate">{label}</span>
    </button>
  );
}

function QuickStatChip({ label, alert }: { label: string, alert?: boolean }) {
  return (
    <div className={`px-3 py-1.5 rounded-full border text-[11px] font-semibold tracking-wide flex items-center gap-2 ${
      alert 
        ? 'bg-red-500/10 border-red-500/30 text-red-500' 
        : 'bg-[#141414] border-[#222] text-[#aaa]'
    }`}>
      {alert && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
      {label}
    </div>
  );
}

function KpiCard({ title, value, trend, icon, trendPositive, valueColor = "text-white", subtitle }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-5 hover:border-[#333] transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-[#141414] rounded-lg border border-[#222]">
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${trendPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-[#888] text-xs font-medium uppercase tracking-wider">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <h3 className={`text-2xl font-bold ${valueColor}`}>{value}</h3>
          {subtitle && <span className="text-[#555] text-xs">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}

function Widget({ title, icon, badge, badgeColor = "bg-indigo-500 text-black", children }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl flex flex-col h-full overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1f1f1f] flex items-center justify-between bg-[#0f0f0f]">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-bold text-white uppercase tracking-tight">{title}</h3>
        </div>
        {badge && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${badgeColor}`}>
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
      {/* ROW 1: KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Pipeline Value" 
          value="$2.4M" 
          trend="+8% vs last month" 
          icon={<TrendingUp className="w-5 h-5 text-[#888]" />} 
          trendPositive 
        />
        <KpiCard 
          title="Active Listings" 
          value="7" 
          icon={<Home className="w-5 h-5 text-[#888]" />} 
        />
        <KpiCard 
          title="Closings This Month" 
          value="2" 
          subtitle="this week"
          icon={<CheckCircle2 className="w-5 h-5 text-[#888]" />} 
        />
        <KpiCard 
          title="Avg Days on Market" 
          value="14" 
          subtitle="local avg: 21"
          icon={<Clock className="w-5 h-5 text-[#888]" />} 
          valueColor="text-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Widget title="Active Listing Performance" icon={<BarChart3 />}>
            <div className="space-y-4">
              <ListingPerformanceRow 
                address="1242 Oak Street" 
                views={1240} 
                leads={18} 
                status="Active" 
                days={4} 
              />
              <ListingPerformanceRow 
                address="888 Pine Avenue" 
                views={850} 
                leads={12} 
                status="Active" 
                days={12} 
              />
              <ListingPerformanceRow 
                address="52 Modern Way" 
                views={2100} 
                leads={45} 
                status="Under Contract" 
                days={2} 
              />
            </div>
          </Widget>
        </div>
        <div className="lg:col-span-4">
          <Widget title="Hot Leads" icon={<Zap className="text-indigo-500" />}>
            <div className="space-y-3">
              <LeadActionCard name="Sarah Miller" type="Buyer" budget="$1.2M" interest="Oak St" time="2h ago" />
              <LeadActionCard name="Tom Wilson" type="Seller" budget="$850k" interest="Free Appraisal" time="5h ago" />
              <LeadActionCard name="Lisa Chen" type="Investor" budget="$3.5M" interest="Multi-family" time="1d ago" />
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}

function ListingPerformanceRow({ address, views, leads, status, days }: any) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded bg-indigo-500/20 flex items-center justify-center">
          <Home className="text-indigo-500" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">{address}</h4>
          <p className="text-xs text-[#555]">{status} · {days} days on market</p>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="text-center">
          <p className="text-xs text-[#555] uppercase tracking-wider">Views</p>
          <p className="text-sm font-bold text-white">{views}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-[#555] uppercase tracking-wider">Leads</p>
          <p className="text-sm font-bold text-indigo-500">{leads}</p>
        </div>
      </div>
    </div>
  );
}

function LeadActionCard({ name, type, budget, interest, time }: any) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-lg p-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-bold text-white">{name}</span>
        <span className="text-[10px] text-indigo-500 font-bold uppercase">{type}</span>
      </div>
      <p className="text-[11px] text-[#888] mb-2">{interest} · {budget}</p>
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-[#555]">{time}</span>
        <button className="text-[10px] bg-indigo-500 text-black px-2 py-1 rounded font-bold">Contact</button>
      </div>
    </div>
  );
}

function NeighborhoodIntelTab() {
  const [activeNeighborhood, setActiveNeighborhood] = useState('Westside');

  return (
    <div className="flex h-full">
      {/* Neighborhood Selector */}
      <div className="w-[280px] border-r border-[#1f1f1f] bg-[#0a0a0c] p-5 overflow-y-auto flex flex-shrink-0 flex-col">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5 text-indigo-500" />
          <h2 className="font-semibold text-lg text-white">Neighborhood Intel</h2>
        </div>
        
        <div className="space-y-2">
          {['Westside', 'Downtown', 'Heights', 'Riverside', 'East End'].map(n => (
            <button
              key={n}
              onClick={() => setActiveNeighborhood(n)}
              className={`w-full p-3 rounded-lg border text-left flex justify-between items-center transition-all ${
                activeNeighborhood === n 
                  ? 'bg-indigo-500/10 border-indigo-500 text-indigo-500' 
                  : 'bg-[#141414] border-[#222] text-[#888] hover:border-[#444]'
              }`}
            >
              <span className="text-sm font-medium">{n}</span>
              {activeNeighborhood === n && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#1f1f1f]">
          <h3 className="text-xs font-bold text-[#555] uppercase tracking-widest mb-4">Hot Zone Alerts</h3>
          <div className="space-y-3">
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
              <p className="text-[10px] text-red-500 font-bold mb-1 uppercase">High Velocity</p>
              <p className="text-xs text-[#aaa]">Heights: 3 properties sold under 48h this week.</p>
            </div>
            <div className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
              <p className="text-[10px] text-indigo-500 font-bold mb-1 uppercase">Price Spike</p>
              <p className="text-xs text-[#aaa]">Westside: Inventory down 15%. Prices rising.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Intel Dashboard */}
      <div className="flex-1 overflow-y-auto bg-[#09090b] p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{activeNeighborhood} Market Pulse</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-[#141414] border border-[#222] rounded-lg text-xs text-white">Download Report</button>
            <button className="px-3 py-1.5 bg-indigo-500 text-black rounded-lg text-xs font-bold">Share with Lead</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#141414] border border-[#222] rounded-xl p-4">
            <p className="text-xs text-[#888] uppercase mb-1">Median Sale Price</p>
            <h3 className="text-xl font-bold text-white">$845,000</h3>
            <p className="text-[10px] text-emerald-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +4.2% YoY
            </p>
          </div>
          <div className="bg-[#141414] border border-[#222] rounded-xl p-4">
            <p className="text-xs text-[#888] uppercase mb-1">Inventory Level</p>
            <h3 className="text-xl font-bold text-white">12 Active</h3>
            <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> -18% vs Last Mo
            </p>
          </div>
          <div className="bg-[#141414] border border-[#222] rounded-xl p-4">
            <p className="text-xs text-[#888] uppercase mb-1">School Rating</p>
            <h3 className="text-xl font-bold text-white">9.4/10</h3>
            <p className="text-[10px] text-[#555] mt-1 italic">Top 5 in state</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Widget title="Recent Comparable Sales">
            <div className="space-y-3">
              <CompRow address="42 Hills Dr" price="$810k" date="2 days ago" diff="-1.5%" />
              <CompRow address="88 Sunset Blvd" price="$925k" date="1 week ago" diff="+5.2%" />
              <CompRow address="15 Pine St" price="$790k" date="2 weeks ago" diff="0.0%" />
            </div>
          </Widget>
          <Widget title="Active Permit Activity">
            <div className="space-y-3">
              <PermitRow type="New Construction" address="122 Oak" status="Approved" />
              <PermitRow type="Remodel" address="888 Pine" status="Pending" />
              <PermitRow type="Commercial" address="52 Main" status="In Review" />
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}

function CompRow({ address, price, date, diff }: any) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#1f1f1f] last:border-0">
      <div>
        <p className="text-sm font-medium text-white">{address}</p>
        <p className="text-[10px] text-[#555]">{date}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-white">{price}</p>
        <p className={`text-[10px] ${diff.startsWith('+') ? 'text-emerald-500' : diff.startsWith('-') ? 'text-red-500' : 'text-[#555]'}`}>{diff} vs list</p>
      </div>
    </div>
  );
}

function PermitRow({ type, address, status }: any) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-[#1f1f1f] last:border-0">
      <div className="w-8 h-8 rounded bg-indigo-500/10 flex items-center justify-center">
        <FileText className="w-4 h-4 text-indigo-500" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{type}</p>
        <p className="text-[10px] text-[#555]">{address}</p>
      </div>
      <span className="text-[10px] bg-[#222] text-[#888] px-2 py-0.5 rounded-full">{status}</span>
    </div>
  );
}

function ListingsTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Listings (7)</h2>
        <button className="bg-indigo-500 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Listing
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PropertyCard address="1242 Oak Street" price="$1,245,000" specs="4BD | 3BA | 2,400SF" status="Active" views="1.2k" />
        <PropertyCard address="888 Pine Avenue" price="$849,000" specs="3BD | 2BA | 1,800SF" status="Active" views="850" />
        <PropertyCard address="52 Modern Way" price="$2,100,000" specs="5BD | 4BA | 4,200SF" status="Under Contract" views="2.1k" />
        <PropertyCard address="15 Sunset Court" price="$650,000" specs="2BD | 2BA | 1,200SF" status="Sold" views="3.4k" />
      </div>
    </div>
  );
}

function PropertyCard({ address, price, specs, status, views }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden hover:border-indigo-500/50 transition-colors cursor-pointer group">
      <div className="h-48 bg-stone-800 relative">
        <div className="absolute top-4 left-4">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${
            status === 'Active' ? 'bg-emerald-500 text-black' : 
            status === 'Under Contract' ? 'bg-amber-500 text-black' : 'bg-[#333] text-white'
          }`}>
            {status}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] flex items-center gap-1">
          <Eye className="w-3 h-3" /> {views}
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{address}</h4>
        <p className="text-xl font-bold text-indigo-500 mb-2">{price}</p>
        <p className="text-xs text-[#888]">{specs}</p>
        <div className="mt-4 pt-4 border-t border-[#1f1f1f] flex justify-between">
          <button className="text-xs text-[#aaa] hover:text-white transition-colors">Edit Listing</button>
          <button className="text-xs text-indigo-500 font-bold">Marketing Hub</button>
        </div>
      </div>
    </div>
  );
}

function LeadsTab() {
  const [scanState, setScanState] = useState<'idle' | 'running' | 'done'>('idle');
  const [logLines, setLogLines] = useState<any[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const runScan = () => {
    setScanState('running');
    setLogLines([]);
    
    const lines = [
      { time: '10:00:01', msg: 'Initializing Firecrawl engine...', color: 'text-white' },
      { time: '10:00:02', msg: 'Targeting local real estate directories...', color: 'text-white' },
      { time: '10:00:04', msg: 'Crawling FSBO listings (Zillow, ForSaleByOwner.com)...', color: 'text-indigo-400' },
      { time: '10:00:06', msg: 'Analyzing recently expired listings in Heights...', color: 'text-indigo-400' },
      { time: '10:00:08', msg: 'Extracting contact signals from social feeds...', color: 'text-white' },
      { time: '10:00:10', msg: 'AI scoring potential seller intent...', color: 'text-purple-400' },
      { time: '10:00:12', msg: 'Scan complete. 14 high-intent leads found.', color: 'text-emerald-400' },
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLogLines(prev => [...prev, lines[i]]);
      i++;
      if (i >= lines.length) {
        clearInterval(interval);
        setScanState('done');
      }
    }, 1000);
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logLines]);

  return (
    <div className="flex h-full">
      {/* Search Sidebar */}
      <div className="w-[320px] border-r border-[#1f1f1f] bg-[#0a0a0c] p-6 flex flex-col flex-shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <Search className="w-5 h-5 text-indigo-500" />
          <h2 className="font-semibold text-lg text-white">Find Leads</h2>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <label className="text-xs text-[#888] uppercase tracking-wider mb-2 block font-bold">Target Zone</label>
            <input type="text" placeholder="Heights, Westside..." className="w-full bg-[#141414] border border-[#222] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-xs text-[#888] uppercase tracking-wider mb-2 block font-bold">Lead Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/50 rounded text-[10px] text-indigo-500 font-bold">FSBO Targets</button>
              <button className="px-3 py-1.5 bg-[#1a1a1a] border border-[#222] rounded text-[10px] text-[#888] font-bold">Expired Listings</button>
              <button className="px-3 py-1.5 bg-[#1a1a1a] border border-[#222] rounded text-[10px] text-[#888] font-bold">Probate Leads</button>
              <button className="px-3 py-1.5 bg-[#1a1a1a] border border-[#222] rounded text-[10px] text-[#888] font-bold">Divorce Leads</button>
            </div>
          </div>
          <div>
            <label className="text-xs text-[#888] uppercase tracking-wider mb-2 block font-bold">Min Estimated Value</label>
            <select className="w-full bg-[#141414] border border-[#222] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
              <option>$500k+</option>
              <option>$1M+</option>
              <option>$2M+</option>
            </select>
          </div>
          
          <button 
            onClick={runScan}
            disabled={scanState === 'running'}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-500/50 text-black font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
          >
            {scanState === 'running' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {scanState === 'running' ? 'Scanning Web...' : 'Run Firecrawl Scan'}
          </button>
        </div>
      </div>

      {/* Results & Log */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Scrape Log */}
        <div className="h-48 flex-shrink-0 border-b border-[#1f1f1f] bg-[#070709] font-mono overflow-y-auto p-4" ref={logRef}>
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs text-emerald-500 font-semibold uppercase">Scrape Log</span>
          </div>
          {logLines.length === 0 && <p className="text-xs text-[#333]">$ awaiting scan parameters...</p>}
          {logLines.map((line, i) => (
            <div key={i} className="flex gap-3 text-[10px] mb-1">
              <span className="text-[#444] w-14">[{line.time}]</span>
              <span className={line.color}>{line.msg}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {scanState === 'idle' && (
            <div className="h-full flex flex-col items-center justify-center text-[#444]">
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm">Configure search parameters and run scan</p>
            </div>
          )}
          
          {scanState === 'running' && (
            <div className="h-full flex flex-col items-center justify-center">
              <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
              <p className="text-sm text-[#888]">Extracting leads from web sources...</p>
            </div>
          )}

          {scanState === 'done' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white">14 Leads Found</h3>
                <button className="text-xs text-indigo-500 border border-indigo-500/30 px-3 py-1.5 rounded-lg hover:bg-indigo-500/10 transition-colors font-bold">Add All to Pipeline</button>
              </div>
              
              <ScrapedLeadCard name="Michael Chen" address="122 Oak Street" type="FSBO" value="$1.2M" confidence={94} />
              <ScrapedLeadCard name="Janet Doe" address="88 Sunset Blvd" type="Expired" value="$845k" confidence={88} />
              <ScrapedLeadCard name="The Smith Estate" address="15 Pine Court" type="Probate" value="$650k" confidence={82} />
              <ScrapedLeadCard name="Luxury Condo 4B" address="888 Main St" type="Off-Market" value="$3.5M" confidence={91} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScrapedLeadCard({ name, address, type, value, confidence }: any) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-xl p-4 flex items-center justify-between hover:border-[#333] transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold">
          {name[0]}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{name}</h4>
          <p className="text-xs text-[#888]">{address} · <span className="text-indigo-500">{type}</span></p>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <div className="text-right">
          <p className="text-xs text-[#555] uppercase font-bold">Est. Value</p>
          <p className="text-sm font-bold text-white">{value}</p>
        </div>
        <div className="text-center w-16">
          <p className="text-[10px] text-[#555] uppercase font-bold">Score</p>
          <p className="text-sm font-bold text-emerald-500">{confidence}%</p>
        </div>
        <button className="bg-[#222] hover:bg-indigo-500 hover:text-black p-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function SocialTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Social Media Hub</h2>
        <div className="flex gap-2">
          <button className="bg-[#141414] border border-[#222] text-white px-4 py-2 rounded-lg text-sm font-bold">Platform Settings</button>
          <button className="bg-indigo-500 text-black px-4 py-2 rounded-lg text-sm font-bold">Create Post</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <PlatformStatus platform="Instagram" handle="@jordan_realty" followers="12.4k" />
          <PlatformStatus platform="LinkedIn" handle="Jordan Blake" followers="3.2k" />
          <PlatformStatus platform="YouTube" handle="Jordan's Neighborhood Tours" followers="8.1k" />
        </div>
        <div className="lg:col-span-8">
          <Widget title="Scheduled Content">
            <div className="space-y-4">
              <ScheduledPostItem time="Today, 4:00 PM" platform="IG" type="Listing Reveal" title="122 Oak Street Cinematic Tour" />
              <ScheduledPostItem time="Tomorrow, 10:00 AM" platform="LI" type="Market Report" title="May Heights Market Analysis" />
              <ScheduledPostItem time="Friday, 6:00 PM" platform="YT" type="Tour" title="Hidden Gems of Westside" />
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}

function PlatformStatus({ platform, handle, followers }: any) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
          <Share2 className="w-4 h-4 text-indigo-500" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">{platform}</p>
          <p className="text-xs text-[#555]">{handle}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-white">{followers}</p>
        <p className="text-[10px] text-[#555]">Followers</p>
      </div>
    </div>
  );
}

function ScheduledPostItem({ time, platform, type, title }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded bg-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-indigo-500">
          {platform}
        </div>
        <div>
          <p className="text-xs text-indigo-500 font-bold uppercase">{type}</p>
          <p className="text-sm font-medium text-white">{title}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-[#888]">{time}</p>
      </div>
    </div>
  );
}

function TransactionTrackerTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Active Deals (4)</h2>
        <div className="bg-indigo-500/10 border border-indigo-500/30 px-4 py-2 rounded-lg">
          <span className="text-xs text-indigo-500 font-bold">Total Est. Commission: $62,400</span>
        </div>
      </div>

      <div className="space-y-4">
        <TransactionCard address="52 Modern Way" status="Under Contract" price="$2.1M" progress={85} task="Closing Docs" buyer="The Miller Family" />
        <TransactionCard address="122 Oak Street" status="Inspection Phase" price="$1.2M" progress={40} task="Review Repairs" buyer="Michael Chen" />
        <TransactionCard address="888 Pine Avenue" status="Listing Active" price="$849k" progress={15} task="Schedule Open House" buyer="N/A" />
      </div>
    </div>
  );
}

function TransactionCard({ address, status, price, progress, task, buyer }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded bg-indigo-500/10 flex items-center justify-center">
            <Building2 className="text-indigo-500" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">{address}</h4>
            <p className="text-xs text-[#888]">{price} · <span className="text-indigo-500 font-bold">{status}</span></p>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="text-center">
            <p className="text-[10px] text-[#555] uppercase font-bold">Client</p>
            <p className="text-sm font-bold text-white">{buyer}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[#555] uppercase font-bold">Next Action</p>
            <p className="text-sm font-bold text-indigo-500">{task}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-[#888]">Deal Progress</span>
          <span className="text-white">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function ContentStudioTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <h2 className="text-xl font-bold mb-6">Content Studio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141414] border border-[#222] rounded-xl p-6 hover:border-indigo-500 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
            <Sparkles className="text-indigo-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-500 transition-colors">AI Listing Generator</h3>
          <p className="text-sm text-[#888]">Generate professional property descriptions from photos or bullet points.</p>
        </div>
        <div className="bg-[#141414] border border-[#222] rounded-xl p-6 hover:border-indigo-500 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
            <Globe className="text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-500 transition-colors">Neighborhood Guides</h3>
          <p className="text-sm text-[#888]">Custom-branded PDF and digital guides using latest neighborhood data.</p>
        </div>
        <div className="bg-[#141414] border border-[#222] rounded-xl p-6 hover:border-indigo-500 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
            <Film className="text-amber-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">Video Template Hub</h3>
          <p className="text-sm text-[#888]">Reels and TikTok templates for open houses and market updates.</p>
        </div>
      </div>
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Client Reviews</h2>
        <div className="flex gap-2">
          <div className="bg-[#141414] border border-[#222] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 4.9 Avg
          </div>
          <button className="bg-indigo-500 text-black px-4 py-2 rounded-lg text-sm font-bold">Send Review Request</button>
        </div>
      </div>

      <div className="space-y-4">
        <ReviewItem name="Emma Rodriguez" platform="Zillow" stars={5} text="Jordan was incredible during our first home buying experience! Extremely knowledgeable about the Westside area." />
        <ReviewItem name="David Park" platform="Google" stars={5} text="Sold my house in 4 days above asking price. The marketing strategy was top notch." />
        <ReviewItem name="Sarah & Tom" platform="Realtor.com" stars={5} text="Smooth process from start to finish. Jordan's transaction tracker kept us in the loop daily." />
      </div>
    </div>
  );
}

function ReviewItem({ name, platform, stars, text }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-5">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">{name[0]}</div>
          <div>
            <h4 className="text-sm font-bold text-white">{name}</h4>
            <p className="text-[10px] text-[#555] uppercase font-bold">{platform}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: stars }).map((_, i) => (
            <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
          ))}
        </div>
      </div>
      <p className="text-sm text-[#888] italic">"{text}"</p>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
        <p className="text-[#888] text-sm">Manage your profile, platform connections, and billing.</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Profile</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-[#555] uppercase font-bold mb-1 block">Full Name</label>
                <input type="text" defaultValue="Jordan Blake" className="w-full bg-[#141414] border border-[#222] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="text-[10px] text-[#555] uppercase font-bold mb-1 block">Agency Name</label>
                <input type="text" defaultValue="Blake Realty Group" className="w-full bg-[#141414] border border-[#222] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Account Type</h3>
          <div className="flex items-center justify-between p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
            <div>
              <p className="text-sm font-bold text-white">Broker Pro Plan</p>
              <p className="text-xs text-indigo-500">$149/mo · Next billing Jun 3, 2026</p>
            </div>
            <button className="text-xs font-bold text-white bg-[#222] px-3 py-2 rounded-lg">Manage</button>
          </div>
        </div>
      </div>
    </div>
  );
}
