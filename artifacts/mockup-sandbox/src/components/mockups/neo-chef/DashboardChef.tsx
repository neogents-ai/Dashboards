import React, { useState, useEffect, useRef } from 'react';
import './_group.css';
import { 
  Utensils, Users, Calendar, MessageSquare, Star, TrendingUp, Settings,
  LayoutDashboard, Bell, Search, Image as ImageIcon, Share2, GraduationCap,
  Zap, Sparkles, MapPin, CheckCircle2, Clock, MoreHorizontal,
  Plus, Edit2, Trash2, ChevronRight, ArrowUpRight, Check, Filter,
  Smartphone, Monitor, Eye, Download, Mail, MessageCircle, BarChart3,
  AlignLeft, PlaySquare, FileText, Send, UserPlus, FileVideo, Shield,
  CreditCard, Upload, Globe, Cpu, Wifi, ExternalLink, Target, Radio,
  RefreshCw, AlertCircle, Database, ListFilter, SlidersHorizontal, X,
  Timer, Menu, ShoppingCart, List, DollarSign, ChefHat, Truck, Info,
  BookOpen, Heart, Coffee, Wine, Award, History, ArrowRight, MousePointer2
} from 'lucide-react';

export function DashboardChef() {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return <DashboardTab />;
      case 'menu':
        return <MenuDropTab />;
      case 'events':
        return <EventsTab />;
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
    <div className="neo-chef-dashboard min-h-[100dvh] bg-[#09090b] text-white flex overflow-hidden">
      
      {/* Left Sidebar */}
      <aside className="w-[72px] lg:w-[240px] flex-shrink-0 border-r border-[#1f1f1f] bg-[#0d0d0d] flex flex-col justify-between transition-all duration-300 z-10">
        <div>
          {/* Logo Area */}
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gradient-to-tr from-orange-600 to-orange-400 flex items-center justify-center font-bold text-lg text-black">
                RD
              </div>
              <div className="hidden lg:block">
                <h2 className="font-bold text-base leading-tight">René Dubois</h2>
                <p className="text-[#888] text-[10px] uppercase tracking-wider font-medium">Nomad Kitchen</p>
              </div>
            </div>
          </div>
          
          <nav className="p-3 space-y-1 mt-4">
            <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeNav === 'dashboard'} onClick={() => setActiveNav('dashboard')} />
            <NavItem icon={<Utensils />} label="Menu Drop Engine" active={activeNav === 'menu'} onClick={() => setActiveNav('menu')} />
            <NavItem icon={<Calendar />} label="Event Calendar" active={activeNav === 'events'} onClick={() => setActiveNav('events')} />
            <NavItem icon={<Users />} label="Leads & Partners" active={activeNav === 'leads'} onClick={() => setActiveNav('leads')} />
            <NavItem icon={<Share2 />} label="Social Media" active={activeNav === 'social'} onClick={() => setActiveNav('social')} />
            <NavItem icon={<ShoppingCart />} label="Inventory & Costs" active={activeNav === 'inventory'} onClick={() => setActiveNav('inventory')} />
            <NavItem icon={<PlaySquare />} label="Content Studio" active={activeNav === 'content'} onClick={() => setActiveNav('content')} />
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
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-600 to-orange-400 flex items-center justify-center font-semibold text-xs flex-shrink-0 text-black">
                RD
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0d0d0d]"></span>
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Chef René Dubois</p>
              <p className="text-xs text-orange-500 font-medium truncate">Executive Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#09090b]">
        
        {/* Topbar */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 lg:px-8 border-b border-[#1f1f1f] z-20">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-white">Bonjour, René</h1>
            <p className="text-[#888] text-sm">May 3, 2026</p>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <QuickStatChip label="Next Drop: 4d 12h" />
            <QuickStatChip label="47 Pre-orders" />
            <QuickStatChip label="2 Venue Inquiries" alert />
            <QuickStatChip label="$6,400 Projected" />
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-[#888] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-[#09090b]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-orange-400 flex items-center justify-center text-xs font-bold text-black cursor-pointer">
              RD
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

// ---- TAB COMPONENTS ----

function DashboardTab() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* ROW 1: KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Next Event Revenue" 
          value="$6,400" 
          trend="Projected from 47 orders" 
          icon={<DollarSign className="w-5 h-5 text-[#888]" />} 
          trendPositive 
        />
        <KpiCard 
          title="Pre-orders" 
          value="47 / 60" 
          subtitle="78% capacity"
          icon={<ShoppingCart className="w-5 h-5 text-[#888]" />} 
        />
        <KpiCard 
          title="Avg Order Value" 
          value="$134" 
          subtitle="per guest"
          icon={<TrendingUp className="w-5 h-5 text-[#888]" />} 
        />
        <KpiCard 
          title="Events This Month" 
          value="3" 
          subtitle="1 sold out"
          icon={<Calendar className="w-5 h-5 text-[#888]" />} 
          valueColor="text-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 flex flex-col">
          <Widget title="Active Menu Drop" icon={<Utensils className="w-4 h-4 text-orange-500" />} badge="LIVE">
            <div className="flex flex-col h-full">
              <div className="bg-[#141414] border border-[#222] rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white">Midnight In Tokyo</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500 text-black">MAY 7</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  {[
                    { label: 'Days', val: '04' },
                    { label: 'Hrs', val: '12' },
                    { label: 'Min', val: '31' },
                    { label: 'Sec', val: '45' }
                  ].map((t, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-white tabular-nums leading-none">{t.val}</div>
                      <div className="text-[9px] text-[#555] uppercase mt-1 tracking-wider">{t.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#888]">Omasake Course (40/40)</span>
                    <span className="text-emerald-500 font-medium">SOLD OUT</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#888]">Ramen Add-on (7/20)</span>
                    <span className="text-orange-500 font-medium">13 LEFT</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto space-y-2">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2.5 rounded-lg text-sm transition-colors">
                  Push Drop Update
                </button>
                <button className="w-full bg-[#1a1a1a] hover:bg-[#222] text-white border border-[#333] font-medium py-2.5 rounded-lg text-sm transition-colors">
                  Manage Guest List
                </button>
              </div>
            </div>
          </Widget>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <Widget title="Upcoming Events" icon={<Calendar className="w-4 h-4 text-[#888]" />}>
            <div className="flex flex-col h-full space-y-3">
              <EventMiniCard date="May 7" name="Midnight In Tokyo" venue="The Industrial" guests="47/60" status="Selling" />
              <EventMiniCard date="May 21" name="French Riviera Nights" venue="Sunset Loft" guests="0/50" status="Draft" />
              <EventMiniCard date="Jun 04" name="Seoul Street Kitchen" venue="Warehouse 4" guests="0/80" status="Planned" />
              <button className="w-full mt-auto border border-dashed border-[#333] hover:border-orange-500/50 hover:text-orange-500 text-[#888] rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" /> Create New Event
              </button>
            </div>
          </Widget>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <Widget title="Chef's Tasks" icon={<Zap className="w-4 h-4 text-orange-500" />}>
            <div className="flex flex-col h-full space-y-2">
              <ActionCard color="orange" title="Confirm Warehouse 4" desc="Venue contract needs signature" action="Sign Now" />
              <ActionCard color="blue" title="Order Wagyu A5" desc="Cutoff is in 6 hours" action="Place Order" />
              <ActionCard color="purple" title="Gen IG Story" desc="Menu tease: Duck Confit Bao" action="Generate" />
              <ActionCard color="emerald" title="Update Waitlist" desc="4 new people joined Tokyo drop" action="View" />
              <ActionCard color="rose" title="Prep List: May 7" desc="32 items pending" action="Open Prep" />
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}

function MenuDropTab() {
  return (
    <div className="flex h-full">
      {/* Left Panel - Menu Builder */}
      <div className="w-[380px] border-r border-[#1f1f1f] bg-[#0a0a0c] p-6 overflow-y-auto flex flex-col flex-shrink-0">
        <div className="flex items-center gap-3 mb-6">
          <Utensils className="w-5 h-5 text-orange-500" />
          <h2 className="font-semibold text-lg text-white">Menu Drop Engine</h2>
        </div>

        <div className="space-y-6">
          <section>
            <label className="text-xs text-[#555] uppercase tracking-wider font-bold mb-3 block">Event Details</label>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#888]">Drop Name</label>
                <input type="text" defaultValue="Midnight In Tokyo" className="w-full bg-[#141414] border border-[#222] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#888]">Event Date</label>
                  <input type="date" defaultValue="2026-05-07" className="w-full bg-[#141414] border border-[#222] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-orange-500 [color-scheme:dark]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#888]">Capacity</label>
                  <input type="number" defaultValue="60" className="w-full bg-[#141414] border border-[#222] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-orange-500" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs text-[#555] uppercase tracking-wider font-bold block">Menu Items</label>
              <button className="text-orange-500 text-[10px] font-bold hover:underline">+ ADD DISH</button>
            </div>
            <div className="space-y-2">
              <MenuBuilderItem title="Omasake Course" price="$120" cost="$42.50" margin="65%" />
              <MenuBuilderItem title="Truffle Ramen" price="$25" cost="$6.80" margin="72.8%" />
              <MenuBuilderItem title="Sake Pairing" price="$45" cost="$15.00" margin="66.7%" />
            </div>
          </section>

          <section className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-orange-500 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Margin Optimizer
            </h4>
            <p className="text-xs text-[#888] mb-3">Ingredient prices for <span className="text-white">Wagyu A5</span> have risen 12%. Suggested price: <span className="text-white">$135</span> (+15).</p>
            <button className="w-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border border-orange-500/30 py-2 rounded-lg text-xs font-bold transition-all">
              Apply Optimized Pricing
            </button>
          </section>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 mt-4">
            <Timer className="w-4 h-4" /> START DROP COUNTDOWN
          </button>
        </div>
      </div>

      {/* Right Panel - Guest List & Intake Form Builder */}
      <div className="flex-1 flex flex-col bg-[#09090b] overflow-hidden">
        <div className="h-16 border-b border-[#1f1f1f] px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex gap-6">
            <button className="text-sm font-semibold text-white border-b-2 border-orange-500 pb-5">Guest List (47)</button>
            <button className="text-sm font-medium text-[#555] hover:text-[#888] transition-colors pb-5">Intake Form Builder</button>
            <button className="text-sm font-medium text-[#555] hover:text-[#888] transition-colors pb-5">Waitlist (18)</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#555] hover:text-white transition-colors"><Download className="w-4 h-4" /></button>
            <button className="p-2 text-[#555] hover:text-white transition-colors"><Search className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {[
              { name: 'Marcus Chen', guests: 4, item: 'Omasake + Sake', paid: true, allergy: 'None', time: '8:00 PM' },
              { name: 'Sarah Williams', guests: 2, item: 'Omasake x2', paid: true, allergy: 'Shellfish', time: '8:30 PM' },
              { name: 'David Miller', guests: 2, item: 'Omasake x2', paid: false, allergy: 'None', time: '7:45 PM' },
              { name: 'Elena Rossi', guests: 5, item: 'Omasake + Ramen', paid: true, allergy: 'Nut Allergy', time: '8:00 PM' },
              { name: 'James Wilson', guests: 2, item: 'Omasake x2', paid: true, allergy: 'None', time: '9:00 PM' },
              { name: 'Lila Thorne', guests: 3, item: 'Omasake + Sake', paid: true, allergy: 'Dairy Free', time: '8:15 PM' },
              { name: 'Robert Vance', guests: 2, item: 'Omasake x2', paid: true, allergy: 'None', time: '7:30 PM' },
              { name: 'Sophia Kim', guests: 4, item: 'Omasake x4', paid: false, allergy: 'Gluten Free', time: '8:45 PM' },
            ].map((g, i) => (
              <div key={i} className="bg-[#111] border border-[#222] rounded-xl p-4 flex justify-between items-center group hover:border-[#333] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold">
                    {g.name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{g.name}</h4>
                    <p className="text-[11px] text-[#666]">{g.guests} guests · {g.item}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1 justify-end">
                    {g.allergy !== 'None' && <span className="bg-rose-500/10 text-rose-500 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border border-rose-500/20">{g.allergy}</span>}
                    {g.paid ? <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border border-emerald-500/20">Paid</span> : <span className="bg-orange-500/10 text-orange-500 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border border-orange-500/20">Pending</span>}
                  </div>
                  <p className="text-xs text-white font-medium">{g.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EventsTab() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Event Calendar</h2>
          <p className="text-[#888] text-sm">Planning and venue management</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#141414] border border-[#222] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a1a1a] transition-colors">Calendar View</button>
          <button className="bg-orange-500 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EventLargeCard 
          title="Midnight In Tokyo" 
          venue="The Industrial" 
          date="May 7, 2026" 
          time="7:00 PM - 11:00 PM" 
          progress={78} 
          image="bg-zinc-800"
          status="Active"
        />
        <EventLargeCard 
          title="French Riviera Nights" 
          venue="Sunset Loft" 
          date="May 21, 2026" 
          time="6:00 PM - 10:00 PM" 
          progress={0} 
          image="bg-orange-900/20"
          status="Draft"
        />
        <EventLargeCard 
          title="Seoul Street Kitchen" 
          venue="Warehouse 4" 
          date="Jun 04, 2026" 
          time="12:00 PM - 6:00 PM" 
          progress={0} 
          image="bg-emerald-900/20"
          status="Planned"
        />
      </div>
    </div>
  );
}

function LeadsTab() {
  const [scanState, setScanState] = useState('idle');
  const [logLines, setLogLines] = useState<{time: string, msg: string, color: string}[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const startScan = () => {
    setScanState('running');
    setLogLines([]);
    
    const logs = [
      { time: '14:02:01', msg: 'Initializing Firecrawl browser instance...', color: 'text-white' },
      { time: '14:02:03', msg: 'Targeting: Corporate Catering & Venue Partners', color: 'text-orange-400' },
      { time: '14:02:05', msg: 'Crawling local event spaces (32 sources)...', color: 'text-[#888]' },
      { time: '14:02:08', msg: 'Found: 14 potential venues in Brooklyn Area', color: 'text-emerald-400' },
      { time: '14:02:11', msg: 'Analyzing capacity & permit status...', color: 'text-[#888]' },
      { time: '14:02:14', msg: 'Scraping decision maker contact info...', color: 'text-[#888]' },
      { time: '14:02:17', msg: 'Filtering by "Open Kitchen" amenities...', color: 'text-orange-400' },
      { time: '14:02:20', msg: 'Scan complete. 6 high-quality leads found.', color: 'text-emerald-400' },
    ];

    logs.forEach((log, i) => {
      setTimeout(() => {
        setLogLines(prev => [...prev, log]);
        if (i === logs.length - 1) setScanState('done');
      }, i * 1000);
    });
  };

  return (
    <div className="flex h-full bg-[#09090b]">
      {/* LEFT — Scraper Controls */}
      <div className="w-[360px] border-r border-[#1f1f1f] flex flex-col bg-[#0d0d0d]">
        <div className="p-6 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h2 className="font-bold text-white">Find Venue Leads</h2>
              <p className="text-xs text-[#555]">Powered by Firecrawl & Playwright</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] text-[#555] uppercase tracking-widest font-bold">Target Industry</label>
              <select className="w-full bg-[#141414] border border-[#222] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-orange-500">
                <option>Event Spaces & Venues</option>
                <option>Corporate Offices (Catering)</option>
                <option>Luxury Apartment Complexes</option>
                <option>Local Wineries & Bars</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-[#555] uppercase tracking-widest font-bold">Location Radius</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#444] absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Brooklyn, NY (10 miles)" className="w-full bg-[#141414] border border-[#222] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-orange-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-[#555] uppercase tracking-widest font-bold">Search Keywords</label>
              <input type="text" placeholder="rooftop, industrial, kitchen, popup" className="w-full bg-[#141414] border border-[#222] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-orange-500" />
            </div>

            <button 
              onClick={startScan}
              disabled={scanState === 'running'}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                scanState === 'running' 
                ? 'bg-[#1a1a1a] text-[#444] cursor-not-allowed' 
                : 'bg-orange-500 hover:bg-orange-600 text-black shadow-lg shadow-orange-500/10'
              }`}
            >
              {scanState === 'running' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              {scanState === 'running' ? 'SCANNING...' : 'RUN FIRECRAWL SCAN'}
            </button>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <h3 className="text-xs font-bold text-[#555] uppercase tracking-widest mb-4">Saved Lead Lists</h3>
          <div className="space-y-2">
            {[
              { label: 'Rooftops · Manhattan', count: 12, date: '2d ago' },
              { label: 'Art Galleries · BK', count: 8, date: '1w ago' },
              { label: 'Tech Offices · SOMA', count: 24, date: '3d ago' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 bg-[#141414] border border-[#222] rounded-lg cursor-pointer hover:border-[#333]">
                <div>
                  <p className="text-xs text-white">{s.label}</p>
                  <p className="text-[10px] text-[#555]">{s.date}</p>
                </div>
                <span className="text-xs text-orange-400 font-medium">{s.count} leads</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — Results Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Terminal Log */}
        <div className="h-48 flex-shrink-0 border-b border-[#1f1f1f] bg-[#070709] font-mono overflow-y-auto p-4" ref={logRef}>
          <div className="flex items-center gap-2 mb-3">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs text-emerald-500 font-bold uppercase tracking-widest">FIRECRAWL_SYSTEM_LOG</span>
          </div>
          {logLines.length === 0 && scanState === 'idle' && (
            <p className="text-xs text-[#333]">$ awaiting scan parameters...</p>
          )}
          {logLines.map((line, i) => (
            <div key={i} className="flex gap-3 text-xs mb-1">
              <span className="text-[#333] flex-shrink-0">[{line.time}]</span>
              <span className={line.color}>{line.msg}</span>
            </div>
          ))}
        </div>

        {/* Results Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {scanState === 'idle' && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-full bg-orange-500/5 border border-orange-500/10 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-[#222]" />
              </div>
              <h3 className="text-white font-semibold mb-2">No results yet</h3>
              <p className="text-sm text-[#555]">Start a Firecrawl scan to find new venues and catering opportunities automatically.</p>
            </div>
          )}

          {scanState === 'running' && (
            <div className="h-full flex flex-col items-center justify-center">
              <RefreshCw className="w-10 h-10 text-orange-500 animate-spin mb-4" />
              <p className="text-white font-medium">Scouring the web for venues...</p>
            </div>
          )}

          {scanState === 'done' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <LeadCard name="The Glass House" type="Event Space" source="Google Maps" location="Chelsea, NY" rating={4.9} signal="Recently hosted a food popup series." />
              <LeadCard name="Foundry Works" type="Industrial Venue" source="Yelp" location="Long Island City" rating={4.7} signal="Mentioned 'open to catering partners' on site." />
              <LeadCard name="Skylark Offices" type="Corporate" source="LinkedIn" location="Financial District" rating={4.8} signal="New office opening event planned for June." />
              <LeadCard name="Aloft Rooftop" type="Hotel/Bar" source="Instagram" location="Brooklyn" rating={4.6} signal="Tagged in 12 popup chef stories last month." />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SocialTab() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Social Hub</h2>
        <button className="bg-orange-500 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <Share2 className="w-4 h-4" /> Schedule Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-[#1f1f1f] flex items-center justify-between">
              <span className="text-xs font-bold text-[#555] uppercase tracking-widest">Feed Preview</span>
              <div className="flex gap-2">
                <button className="p-1 text-white bg-[#222] rounded"><LayoutDashboard className="w-3.5 h-3.5" /></button>
                <button className="p-1 text-[#555] hover:text-white transition-colors"><List className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-0.5 bg-[#1f1f1f]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-900 flex items-center justify-center group relative cursor-pointer">
                  <Utensils className="w-6 h-6 text-[#1a1a1a]" />
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/20 transition-all"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Channel Performance</h3>
            <div className="space-y-4">
              <SocialStatRow icon="Instagram" followers="14.2K" reach="+12%" />
              <SocialStatRow icon="TikTok" followers="42.8K" reach="+24%" />
              <SocialStatRow icon="Substack" followers="2.1K" reach="+5%" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-purple-500/10 border border-orange-500/20 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-orange-500 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Content Idea
            </h3>
            <p className="text-xs text-[#888] leading-relaxed">"Show the making of your signature Duck Bao. People love the steam shots!"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryTab() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Inventory & Costs</h2>
          <p className="text-[#888] text-sm">Real-time ingredient tracking</p>
        </div>
        <button className="bg-orange-500 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#1f1f1f] bg-[#09090b]">
              <th className="px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-widest">Ingredient</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-widest">Stock</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-widest">Unit Cost</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f1f1f]">
            <InventoryRow name="Wagyu A5 Striploin" stock="12.5 kg" cost="$85.00/kg" status="Low Stock" statusCol="text-orange-500" />
            <InventoryRow name="Black Winter Truffles" stock="250g" cost="$2.40/g" status="Good" statusCol="text-emerald-500" />
            <InventoryRow name="Specialist Flour Type 00" stock="45 kg" cost="$1.20/kg" status="Good" statusCol="text-emerald-500" />
            <InventoryRow name="Miso Paste (Red)" stock="2 kg" cost="$12.00/kg" status="Critcal" statusCol="text-rose-500" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ContentTab() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Content Studio</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#141414] border border-[#222] text-white rounded-lg text-sm font-medium">Templates</button>
          <button className="px-4 py-2 bg-orange-500 text-black rounded-lg text-sm font-bold">New Project</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContentTemplateCard icon={<ImageIcon />} title="Menu Card Designer" desc="Elegant layouts for event prints" />
        <ContentTemplateCard icon={<PlaySquare />} title="Cooking Reels" desc="Speed-up & plating templates" />
        <ContentTemplateCard icon={<Mail />} title="Substack Weekly" desc="Newsletter header & body presets" />
        <ContentTemplateCard icon={<Zap />} title="Drop Teaser" desc="Countdown animations for IG" />
      </div>
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Feedback & Reviews</h2>
        <div className="flex items-center gap-2 bg-[#141414] border border-[#222] p-1 rounded-lg">
          <button className="px-3 py-1 bg-[#222] text-white rounded text-xs font-medium">All</button>
          <button className="px-3 py-1 text-[#555] hover:text-white rounded text-xs font-medium transition-colors">Google</button>
          <button className="px-3 py-1 text-[#555] hover:text-white rounded text-xs font-medium transition-colors">Yelp</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-6 text-center">
            <h3 className="text-[10px] font-bold text-[#555] uppercase tracking-widest mb-2">Overall Score</h3>
            <div className="text-5xl font-bold text-white mb-2">4.9</div>
            <div className="flex justify-center gap-1 mb-4 text-orange-500">
              <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-xs text-[#555]">Based on 312 attendee reviews</p>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-4">
          <ReviewRow name="Jason L." rating={5} text="The Tokyo drop was insane. Best ramen I've had outside of Kyoto." date="2 days ago" />
          <ReviewRow name="Michelle W." rating={5} text="Incredible experience. The French Riviera menu was like a mini-vacation." date="1 week ago" />
          <ReviewRow name="Kevin T." rating={4} text="Food was 10/10. Venue was a bit cold but the plating made up for it." date="2 weeks ago" />
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="p-8 max-w-[800px]">
      <h2 className="text-2xl font-bold text-white mb-8">Settings</h2>
      <div className="space-y-6">
        <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-6">Profile Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#555] uppercase font-bold tracking-widest">Chef Name</label>
              <input type="text" defaultValue="René Dubois" className="w-full bg-[#141414] border border-[#222] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-orange-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#555] uppercase font-bold tracking-widest">Kitchen/Brand</label>
              <input type="text" defaultValue="Nomad Kitchen" className="w-full bg-[#141414] border border-[#222] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-orange-500" />
            </div>
          </div>
        </div>
        <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-6">Subscription</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Executive Plan</p>
                <p className="text-xs text-[#555]">$49/month · Billed monthly</p>
              </div>
            </div>
            <button className="text-xs text-[#555] font-bold hover:text-white transition-colors">MANAGE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- UI COMPONENTS ----

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
        active 
          ? 'bg-orange-500/10 text-orange-500 font-semibold' 
          : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'
      }`}
    >
      <span className={active ? 'text-orange-500' : 'text-[#888]'}>{icon}</span>
      <span className="hidden lg:block text-sm truncate">{label}</span>
    </button>
  );
}

function KpiCard({ title, value, trend, icon, subtitle, trendPositive, valueColor = 'text-white' }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-bold text-[#555] uppercase tracking-widest">{title}</p>
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className={`text-2xl font-bold tabular-nums ${valueColor}`}>{value}</h3>
        {subtitle && <p className="text-xs text-[#555]">{subtitle}</p>}
        {trend && (
          <p className={`text-[10px] font-bold ${trendPositive ? 'text-emerald-500' : 'text-orange-500'}`}>
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}

function Widget({ title, icon, children, badge, badgeColor = 'bg-orange-500 text-black' }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl flex flex-col h-full overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1f1f1f] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-bold text-white">{title}</h3>
        </div>
        {badge && (
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

function ActionCard({ color, title, desc, action }: any) {
  const colors: any = {
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-500',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-500',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-500'
  };
  
  return (
    <div className={`p-3 rounded-xl border ${colors[color]} flex items-center justify-between gap-4 group cursor-pointer hover:bg-opacity-20 transition-all`}>
      <div className="min-w-0">
        <h4 className="text-xs font-bold truncate mb-0.5">{title}</h4>
        <p className="text-[10px] opacity-70 truncate">{desc}</p>
      </div>
      <button className="flex-shrink-0 text-[10px] font-bold uppercase tracking-widest bg-black/20 px-2 py-1 rounded group-hover:bg-black/40 transition-colors">
        {action}
      </button>
    </div>
  );
}

function EventMiniCard({ date, name, venue, guests, status }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#141414] border border-[#222] rounded-xl hover:border-[#333] transition-colors group cursor-pointer">
      <div className="w-12 h-12 rounded-lg bg-[#09090b] flex flex-col items-center justify-center flex-shrink-0 border border-[#1f1f1f]">
        <span className="text-[9px] font-bold text-orange-500 uppercase">{date.split(' ')[0]}</span>
        <span className="text-sm font-bold text-white">{date.split(' ')[1]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-white truncate">{name}</h4>
        <p className="text-[10px] text-[#555] truncate">{venue} · {guests} guests</p>
      </div>
      <div className="text-right">
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
          status === 'Selling' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'text-[#444] border border-[#222]'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function MenuBuilderItem({ title, price, cost, margin }: any) {
  return (
    <div className="p-3 bg-[#141414] border border-[#222] rounded-xl hover:border-orange-500/30 transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xs font-bold text-white">{title}</h4>
        <span className="text-xs font-bold text-orange-500">{price}</span>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex gap-3">
          <div>
            <p className="text-[9px] text-[#555] uppercase font-bold tracking-widest">Cost</p>
            <p className="text-[10px] text-white font-medium">{cost}</p>
          </div>
          <div>
            <p className="text-[9px] text-[#555] uppercase font-bold tracking-widest">Margin</p>
            <p className="text-[10px] text-emerald-500 font-bold">{margin}</p>
          </div>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#555] hover:text-white">
          <Edit2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function EventLargeCard({ title, venue, date, time, progress, image, status }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl overflow-hidden group hover:border-[#333] transition-all">
      <div className={`h-32 ${image} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
            status === 'Active' ? 'bg-orange-500 text-black border-orange-600' : 'bg-black/50 text-white border-white/10'
          }`}>
            {status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-[#888] mb-4">{venue}</p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-[#555]">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#555]">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#555] mb-2">
              <span>Booking Progress</span>
              <span className="text-orange-500">{progress}%</span>
            </div>
            <div className="h-1 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
              <div className="h-full bg-orange-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-6 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#222] text-white text-xs font-bold rounded-lg transition-colors">
          MANAGE EVENT
        </button>
      </div>
    </div>
  );
}

function LeadCard({ name, type, source, location, rating, signal }: any) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl p-5 hover:border-[#333] transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-bold text-white">{name}</h4>
            <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20">{rating} ★</span>
          </div>
          <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">{type}</p>
        </div>
        <button className="p-2 bg-[#1a1a1a] text-[#555] hover:text-white rounded-xl transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-[10px] text-[#555]">
          <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {source}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {location}</span>
        </div>
        <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <Sparkles className="w-3 h-3 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#888] leading-relaxed"><span className="text-orange-500/80 font-bold">AI Signal:</span> {signal}</p>
          </div>
        </div>
      </div>
      
      <button className="w-full mt-4 py-2 bg-orange-500 text-black text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
        ADD TO PIPELINE
      </button>
    </div>
  );
}

function QuickStatChip({ label, alert }: { label: string, alert?: boolean }) {
  return (
    <div className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors ${
      alert 
        ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
        : 'bg-[#141414] border-[#222] text-[#888]'
    }`}>
      {label}
    </div>
  );
}

function SocialStatRow({ icon, followers, reach }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#1f1f1f] flex items-center justify-center text-[10px] font-bold">
          {icon[0]}
        </div>
        <span className="text-xs font-medium text-[#888]">{icon}</span>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-white">{followers}</p>
        <p className="text-[9px] text-emerald-500 font-bold">{reach}</p>
      </div>
    </div>
  );
}

function InventoryRow({ name, stock, cost, status, statusCol }: any) {
  return (
    <tr className="hover:bg-[#141414] transition-colors group">
      <td className="px-6 py-4">
        <p className="text-sm font-bold text-white">{name}</p>
      </td>
      <td className="px-6 py-4 text-sm text-[#888]">{stock}</td>
      <td className="px-6 py-4 text-sm text-[#888]">{cost}</td>
      <td className="px-6 py-4">
        <span className={`text-[10px] font-bold uppercase tracking-widest ${statusCol}`}>{status}</span>
      </td>
      <td className="px-6 py-4">
        <button className="text-[#333] hover:text-white transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
      </td>
    </tr>
  );
}

function ContentTemplateCard({ icon, title, desc }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-6 hover:border-orange-500/30 transition-all cursor-pointer group">
      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
      <p className="text-xs text-[#555] leading-relaxed">{desc}</p>
    </div>
  );
}

function ReviewRow({ name, rating, text, date }: any) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-white">
            {name[0]}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{name}</h4>
            <div className="flex gap-0.5 text-orange-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-current' : 'text-[#222]'}`} />
              ))}
            </div>
          </div>
        </div>
        <span className="text-[10px] text-[#555] font-bold uppercase tracking-widest">{date}</span>
      </div>
      <p className="text-xs text-[#888] leading-relaxed">{text}</p>
    </div>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  );
}
