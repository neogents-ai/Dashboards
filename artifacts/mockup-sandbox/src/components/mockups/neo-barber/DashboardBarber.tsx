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
  Scissors, User, History, Droplets, Info, DollarSign, Briefcase, Award
} from 'lucide-react';

export function DashboardBarber() {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return <DashboardTab />;
      case 'cut-library':
        return <CutLibraryTab />;
      case 'bookings':
        return <BookingsTab />;
      case 'leads':
        return <LeadsTab />;
      case 'social':
        return <SocialTab />;
      case 'staff':
        return <StaffTab />;
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
    <div className="neo-barber-dashboard-container min-h-[100dvh] bg-[#09090b] text-white flex overflow-hidden">
      
      {/* Left Sidebar */}
      <aside className="w-[72px] lg:w-[240px] flex-shrink-0 border-r border-[#1f1f1f] bg-[#0d0d0d] flex flex-col justify-between transition-all duration-300 z-10">
        <div>
          {/* Logo Area */}
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center font-bold text-lg text-black">
                MK
              </div>
              <div className="hidden lg:block">
                <h2 className="font-bold text-base leading-tight">Marcus King</h2>
                <p className="text-[#888] text-[10px] uppercase tracking-wider">King Cuts</p>
              </div>
            </div>
          </div>
          
          <nav className="p-3 space-y-1 mt-4">
            <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active={activeNav === 'dashboard'} onClick={() => setActiveNav('dashboard')} />
            <NavItem icon={<Scissors className="w-5 h-5" />} label="Cut Library" active={activeNav === 'cut-library'} onClick={() => setActiveNav('cut-library')} />
            <NavItem icon={<Calendar className="w-5 h-5" />} label="Bookings" active={activeNav === 'bookings'} onClick={() => setActiveNav('bookings')} />
            <NavItem icon={<Users className="w-5 h-5" />} label="Leads & CRM" active={activeNav === 'leads'} onClick={() => setActiveNav('leads')} />
            <NavItem icon={<Share2 className="w-5 h-5" />} label="Social Media" active={activeNav === 'social'} onClick={() => setActiveNav('social')} />
            <NavItem icon={<Briefcase className="w-5 h-5" />} label="Staff & Chairs" active={activeNav === 'staff'} onClick={() => setActiveNav('staff')} />
            <NavItem icon={<Film className="w-5 h-5" />} label="Content Studio" active={activeNav === 'content'} onClick={() => setActiveNav('content')} />
            <NavItem icon={<Star className="w-5 h-5" />} label="Reviews" active={activeNav === 'reviews'} onClick={() => setActiveNav('reviews')} />
          </nav>
        </div>

        <div className="p-3 border-t border-[#1f1f1f] space-y-1">
          <div className="flex items-center gap-2 px-2 py-2 mb-1">
            <img src="/__mockup/images/nori_nobg.png" alt="NORI" className="nori-animated object-contain flex-shrink-0" style={{ width: 36, height: 36 }} />
            <span className="hidden lg:block text-[10px] font-bold tracking-widest" style={{ color: '#00B359', fontFamily: 'monospace' }}>Powered by N.O.R.I.</span>
          </div>
          <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" active={activeNav === 'settings'} onClick={() => setActiveNav('settings')} />
          <div className="mt-2 flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer transition-colors">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center font-semibold text-xs flex-shrink-0 text-black">
                MK
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0d0d0d]"></span>
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Marcus King</p>
              <p className="text-xs text-blue-500 font-medium truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#09090b]">
        
        {/* Topbar */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 lg:px-8 border-b border-[#1f1f1f] z-20">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-white">Good morning, Marcus</h1>
            <p className="text-[#888] text-sm">May 3, 2026</p>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <QuickStatChip label="24 Chairs Today" />
            <QuickStatChip label="8 New Clients" />
            <QuickStatChip label="12 Walk-ins" alert />
            <QuickStatChip label="95% Capacity" />
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-[#888] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#09090b]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-xs font-bold text-black cursor-pointer">
              MK
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
          title="Monthly Revenue" 
          value="$8,200" 
          trend="+15% vs last month" 
          icon={<TrendingUp className="w-5 h-5 text-[#888]" />} 
          trendPositive 
        />
        <KpiCard 
          title="Chairs Booked Today" 
          value="24/30" 
          icon={<Briefcase className="w-5 h-5 text-[#888]" />} 
        />
        <KpiCard 
          title="New Clients" 
          value="8" 
          subtitle="this week"
          icon={<UserPlus className="w-5 h-5 text-[#888]" />} 
        />
        <KpiCard 
          title="Avg Review Score" 
          value="4.9★" 
          subtitle="(124 reviews)"
          icon={<Star className="w-5 h-5 text-[#888]" />} 
          valueColor="text-blue-500"
        />
      </div>

      {/* ROW 2: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 flex flex-col">
          <Widget title="Cut Library Quick Recall" icon={<Scissors className="w-4 h-4 text-blue-500" />}>
            <div className="flex flex-col h-full">
              <div className="space-y-3 mb-4">
                <p className="text-xs text-[#888] uppercase tracking-wider font-medium">Next Up: David Chen</p>
                <div className="bg-[#141414] border border-[#222] rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-white">Skin Fade Taper</span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">High Density</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#888]">
                    <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-blue-500" /> Guard #0.5 Side</div>
                    <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-blue-500" /> Scissors Top 2"</div>
                    <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-blue-500" /> Sharp Lineup</div>
                    <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-blue-500" /> Matte Clay Finish</div>
                  </div>
                </div>
              </div>
              <div className="mt-auto space-y-2">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2.5 rounded-lg text-sm transition-colors">
                  Open Client Profile
                </button>
                <button className="w-full bg-[#1a1a1a] hover:bg-[#222] text-white border border-[#333] font-medium py-2.5 rounded-lg text-sm transition-colors">
                  Log New Notes
                </button>
              </div>
            </div>
          </Widget>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <Widget title="Walk-in Queue" icon={<Clock className="w-4 h-4 text-[#888]" />}>
            <div className="flex flex-col h-full space-y-3">
              <QueueCard name="James Wilson" status="Next" wait="5m" chair="Chair 1 (Marcus)" avatarColor="bg-blue-500" initial="JW" />
              <QueueCard name="Sam Taylor" status="Waiting" wait="15m" chair="Chair 3 (Leon)" avatarColor="bg-slate-500" initial="ST" />
              <QueueCard name="Unassigned Walk-in" status="Waiting" wait="25m" chair="Unassigned" avatarColor="bg-[#222]" initial="?" />
              <button className="w-full mt-auto border border-dashed border-[#333] hover:border-blue-500/50 hover:text-blue-500 text-[#888] rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" /> Add Walk-in
              </button>
            </div>
          </Widget>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <Widget title="AI Performance Tips" icon={<Zap className="w-4 h-4 text-blue-500" />}>
            <div className="flex flex-col h-full space-y-2">
              <ActionCard color="blue" title="Upsell Suggestion" desc="Offer beard trim to James Wilson" action="See Details" />
              <ActionCard color="purple" title="Inventory Alert" desc="Pomade stock low (3 units left)" action="Reorder" />
              <ActionCard color="emerald" title="Review Prompt" desc="David Chen has 10 visits - ask for review" action="Send Text" />
              <ActionCard color="amber" title="Peak Hours Prep" desc="Busy window starting in 1 hour" action="View Schedule" />
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}

function CutLibraryTab() {
  const [search, setSearch] = useState('');
  
  const clients = [
    { id: 1, name: 'David Chen', lastVisit: '2 weeks ago', fade: 'Skin Fade', guards: '#0.5 - #2', notes: 'Cowlick at crown, keep top longer', initials: 'DC', color: 'bg-blue-500' },
    { id: 2, name: 'Michael Ross', lastVisit: '1 month ago', fade: 'Low Taper', guards: '#1 - #4', notes: 'Likes natural hairline', initials: 'MR', color: 'bg-purple-500' },
    { id: 3, name: 'Chris Evans', lastVisit: '3 days ago', fade: 'Burst Fade', guards: '#0 - #1.5', notes: 'Beard trim included', initials: 'CE', color: 'bg-emerald-500' },
    { id: 4, name: 'Jordan Smith', lastVisit: '3 weeks ago', fade: 'Mid Fade', guards: '#1 - #3', notes: 'Sensitive scalp, use cooling gel', initials: 'JS', color: 'bg-orange-500' },
  ];

  return (
    <div className="flex h-full bg-[#09090b]">
      {/* Left Panel - Client List */}
      <div className="w-[340px] border-r border-[#1f1f1f] bg-[#0a0a0c] flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-[#1f1f1f]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#666] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="w-full bg-[#141414] border border-[#222] rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {clients.map(client => (
            <div key={client.id} className="p-3 rounded-lg hover:bg-[#141414] cursor-pointer group transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${client.color} flex items-center justify-center font-bold text-xs`}>{client.initials}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{client.name}</h4>
                  <p className="text-[11px] text-[#666]">{client.fade} • {client.lastVisit}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#333] group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Panel - Profile Detail */}
      <div className="flex-1 overflow-y-auto p-8 max-w-5xl">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-blue-500 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-blue-500/10">DC</div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-white">David Chen</h2>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded uppercase tracking-wider border border-blue-500/20">VIP Member</span>
              </div>
              <p className="text-[#888] flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Los Angeles, CA • <Clock className="w-4 h-4 ml-2" /> Last cut: May 12, 2026
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-2.5 bg-[#141414] border border-[#222] text-[#888] hover:text-white rounded-lg transition-colors"><Edit2 className="w-5 h-5" /></button>
            <button className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-black font-bold rounded-lg transition-colors">Book Next</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Hair Profile Card */}
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg"><Info className="w-4 h-4 text-blue-500" /></div>
              <h3 className="font-bold text-white">Hair Profile</h3>
            </div>
            <div className="space-y-4">
              <ProfileItem label="Texture" value="Straight / Thick" />
              <ProfileItem label="Density" value="High" />
              <ProfileItem label="Growth Direction" value="Forward, Cowlick at Crown" />
              <ProfileItem label="Scalp Condition" value="Healthy / Normal" />
              <ProfileItem label="Usual Style" value="Modern Quiff" />
            </div>
          </div>

          {/* Fade History Card */}
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg"><History className="w-4 h-4 text-purple-500" /></div>
              <h3 className="font-bold text-white">The "Usual" Formula</h3>
            </div>
            <div className="space-y-4">
              <ProfileItem label="Sides" value="Skin Fade (#0.5 start)" />
              <ProfileItem label="Taper" value="High Taper" />
              <ProfileItem label="Top" value="2.5 inches, Point Cut" />
              <ProfileItem label="Line-up" value="Sharp / Razored" />
              <ProfileItem label="Product" value="Matte Clay (high hold)" />
            </div>
          </div>
        </div>

        {/* Notes & History */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" /> Professional Notes
            </h3>
            <button className="text-blue-500 text-sm font-medium hover:underline">+ Add Entry</button>
          </div>
          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-[#222]">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#141414]"></div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-bold text-white">May 12, 2026</p>
                <span className="text-[10px] text-[#555]">Leon (Barber)</span>
              </div>
              <p className="text-sm text-[#888] leading-relaxed">Requested a slightly higher taper this time. Responded well to the Sea Salt spray before blow drying. Advised on using a wide-tooth comb for more texture.</p>
            </div>
            <div className="relative pl-6 border-l-2 border-[#222]">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#333] border-4 border-[#141414]"></div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-bold text-white">April 15, 2026</p>
                <span className="text-[10px] text-[#555]">Marcus (Master)</span>
              </div>
              <p className="text-sm text-[#888] leading-relaxed">First visit. Transitioning from a longer style. Scalp was a bit dry, recommended the charcoal shampoo. Cut standard skin fade.</p>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-500" /> Reference Gallery
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="aspect-square bg-slate-800 rounded-xl border border-[#333] hover:border-blue-500 transition-colors cursor-pointer flex items-center justify-center"><ImageIcon className="w-8 h-8 text-[#444]" /></div>
            <div className="aspect-square bg-slate-800 rounded-xl border border-[#333] hover:border-blue-500 transition-colors cursor-pointer flex items-center justify-center"><ImageIcon className="w-8 h-8 text-[#444]" /></div>
            <div className="aspect-square bg-slate-800 rounded-xl border border-[#333] hover:border-blue-500 transition-colors cursor-pointer flex items-center justify-center"><ImageIcon className="w-8 h-8 text-[#444]" /></div>
            <div className="w-full aspect-square border-2 border-dashed border-[#333] rounded-xl flex flex-col items-center justify-center text-[#555] hover:border-blue-500/50 hover:text-blue-500 transition-colors cursor-pointer">
              <Plus className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Add Photo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-[#1f1f1f] pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-[#666]">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

function BookingsTab() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Bookings & Schedule</h2>
          <p className="text-[#888]">Manage chairs and walk-ins</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-[#141414] border border-[#222] rounded-lg text-sm">Week View</button>
          <button className="px-4 py-2 bg-blue-500 text-black font-bold rounded-lg text-sm">+ New Appointment</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-[#141414] border border-[#222] rounded-2xl p-6 min-h-[600px] flex items-center justify-center text-[#444]">
          <div className="text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Calendar Integration goes here</p>
          </div>
        </div>
        <div className="space-y-6">
          <Widget title="Walk-in Queue" icon={<Clock className="w-4 h-4" />}>
            <div className="space-y-4">
               <QueueCard name="James Wilson" status="Next" wait="5m" chair="Chair 1" avatarColor="bg-blue-500" initial="JW" />
               <QueueCard name="Sam Taylor" status="Waiting" wait="15m" chair="Chair 3" avatarColor="bg-slate-500" initial="ST" />
               <button className="w-full py-2 bg-[#1a1a1a] border border-[#333] text-white rounded-lg text-xs">+ Add to Queue</button>
            </div>
          </Widget>
          <Widget title="Staff on Duty" icon={<Users className="w-4 h-4" />}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-white font-medium">Marcus King</span>
                </div>
                <span className="text-[10px] text-[#555]">Chair 1</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-white font-medium">Leon Davis</span>
                </div>
                <span className="text-[10px] text-[#555]">Chair 3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#333]"></div>
                  <span className="text-sm text-[#666] font-medium">Sarah Miller</span>
                </div>
                <span className="text-[10px] text-[#555]">Away</span>
              </div>
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}

function LeadsTab() {
  const [scanState, setScanState] = useState<'idle' | 'running' | 'done'>('idle');
  const [logLines, setLogLines] = useState<{time: string, msg: string, color: string}[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [query, setQuery] = useState('Best fades, Barbershops West LA');
  const [location, setLocation] = useState('Los Angeles, CA');
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logLines]);

  const startScan = async () => {
    setScanState('running');
    setLogLines([]);
    setLeads([]);
    
    const startTime = new Date();
    const addLog = (msg: string, color: string = 'text-[#888]') => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      setLogLines(prev => [...prev, { time: timeStr, msg, color }]);
    };

    addLog('Initializing Firecrawl engine...', 'text-white');
    
    const logInterval = setInterval(() => {
      const phrases = [
        'Bypassing bot detection...',
        'Scanning local directories...',
        'Extracting business metadata...',
        'Analyzing review patterns...',
        'Validating contact information...',
        'Filtering low-intent results...',
        'Optimizing lead scores...'
      ];
      addLog(phrases[Math.floor(Math.random() * phrases.length)]);
    }, 1500);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: 'barber',
          query,
          location,
          limit: 10
        })
      });

      const data = await response.json();
      clearInterval(logInterval);

      if (data.success) {
        setLeads(data.leads);
        addLog(`Success: Scraped ${data.scraped} high-intent leads.`, 'text-emerald-500');
        addLog('Scan complete.', 'text-blue-500 font-bold');
      } else {
        addLog('Scan failed: ' + (data.error || 'Unknown error'), 'text-red-500');
      }
    } catch (err) {
      clearInterval(logInterval);
      addLog('Network error during scan.', 'text-red-500');
    } finally {
      setScanState('done');
    }
  };

  return (
    <div className="flex h-full bg-[#09090b]">
      {/* Left Sidebar for Scraper Config */}
      <div className="w-[340px] border-r border-[#1f1f1f] bg-[#0a0a0c] p-6 flex flex-col flex-shrink-0">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-500" /> Find Leads
        </h2>
        
        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-xs text-[#888] font-medium uppercase tracking-wider">Target Keywords</label>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Best fades, Barbershops"
              className="w-full bg-[#141414] border border-[#222] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#888] font-medium uppercase tracking-wider">Location</label>
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Los Angeles, CA"
              className="w-full bg-[#141414] border border-[#222] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#888] font-medium uppercase tracking-wider">Scan Sources</label>
            <div className="space-y-2">
              <SourceToggle label="Google Maps" active />
              <SourceToggle label="Yelp / Local Directories" active />
              <SourceToggle label="Instagram Geotags" />
              <SourceToggle label="Booksy / StyleSeat" active />
            </div>
          </div>

          <button 
            onClick={startScan}
            disabled={scanState === 'running'}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${scanState === 'running' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30' : 'bg-blue-500 text-black hover:bg-blue-600 shadow-lg shadow-blue-500/20'}`}
          >
            {scanState === 'running' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Crawling...</> : <><Zap className="w-4 h-4" /> Run Firecrawl Scan</>}
          </button>
        </div>
      </div>

      {/* Right Content - Results & Pipeline */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Scrape Log */}
        <div className="h-48 border-b border-[#1f1f1f] bg-[#070709] p-4 overflow-y-auto font-mono text-xs custom-scrollbar" ref={logRef}>
          <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-emerald-500 font-bold">FIRECRAWL v2.43 LIVE SESSION</span>
          </div>
          {logLines.map((line, i) => (
            <div key={i} className="mb-1">
              <span className="text-[#444] mr-2">[{line.time}]</span>
              <span className={line.color}>{line.msg}</span>
            </div>
          ))}
          {scanState === 'idle' && <p className="text-[#333]">$ ready for instructions...</p>}
        </div>

        {/* Results / Pipeline */}
        <div className="flex-1 overflow-x-auto p-6 bg-[#09090b] flex gap-6 custom-scrollbar">
           <PipelineCol title="New Leads" count={leads.length} color="border-blue-500">
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <LeadCard 
                    key={lead.id}
                    name={lead.name}
                    type={lead.business || 'Local Barber'}
                    price={`Score: ${lead.score}`}
                    time={lead.source}
                    initial={lead.name[0]}
                    color="bg-blue-500"
                    isHot={lead.score > 80}
                    email={lead.email}
                    phone={lead.phone}
                    website={lead.website}
                  />
                ))
              ) : (
                scanState === 'idle' && (
                  <>
                    <LeadCard name="Jason Bourne" type="Corporate Grooming" price="$85" time="Inquiry 2h ago" initial="J" color="bg-blue-500" />
                    <LeadCard name="Elite Law Firm" type="Group Booking" price="$450" time="Google Maps Lead" initial="E" color="bg-indigo-500" isHot />
                  </>
                )
              )}
           </PipelineCol>
           <PipelineCol title="Contacted" count={leads.length > 0 ? 0 : 4} color="border-purple-500">
              {leads.length === 0 && <LeadCard name="Tyler Durden" type="Weekly Maintenance" price="$65" time="Sent text 1d ago" initial="T" color="bg-purple-500" />}
           </PipelineCol>
           <PipelineCol title="Scheduled" count={leads.length > 0 ? 0 : 12} color="border-emerald-500" />
           <PipelineCol title="Completed" count={leads.length > 0 ? 0 : 84} color="border-[#222]" />
        </div>
      </div>
    </div>
  );
}

function SocialTab() {
  return (
    <div className="p-8 h-full flex items-center justify-center text-[#444]">
      <div className="text-center">
        <Share2 className="w-16 h-16 mx-auto mb-4 opacity-10" />
        <h2 className="text-xl font-bold text-white mb-2">Social Media Studio</h2>
        <p className="max-w-md">Connected to Instagram, TikTok, and YouTube. Generate cut reels and share portfolio highlights instantly.</p>
      </div>
    </div>
  );
}

function StaffTab() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-8">Staff & Chair Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StaffMember name="Marcus King" role="Master Barber / Owner" commission="100%" active chair="1" initials="MK" color="bg-blue-600" />
        <StaffMember name="Leon Davis" role="Senior Barber" commission="60/40" active chair="3" initials="LD" color="bg-emerald-600" />
        <StaffMember name="Sarah Miller" role="Barber" commission="50/50" chair="2" initials="SM" color="bg-slate-700" />
      </div>
    </div>
  );
}

function ContentTab() {
  return (
    <div className="p-8 h-full flex items-center justify-center text-[#444]">
      <div className="text-center">
        <Film className="w-16 h-16 mx-auto mb-4 opacity-10" />
        <h2 className="text-xl font-bold text-white mb-2">Content Studio</h2>
        <p>AI-powered cut reel generator and transformation templates.</p>
      </div>
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="p-8 h-full flex items-center justify-center text-[#444]">
      <div className="text-center">
        <Star className="w-16 h-16 mx-auto mb-4 opacity-10" />
        <h2 className="text-xl font-bold text-white mb-2">Reviews & Reputation</h2>
        <p>Syncing with Google, Yelp, and Booksy.</p>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="p-8 h-full flex items-center justify-center text-[#444]">
      <div className="text-center">
        <Settings className="w-16 h-16 mx-auto mb-4 opacity-10" />
        <h2 className="text-xl font-bold text-white mb-2">Settings</h2>
      </div>
    </div>
  );
}

// ---- UI COMPONENTS ----

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
        active 
          ? 'bg-blue-500/10 text-blue-500 shadow-sm border border-blue-500/20' 
          : 'text-[#888] hover:bg-[#141414] hover:text-white'
      }`}
    >
      <div className={`flex-shrink-0 ${active ? 'text-blue-500' : 'group-hover:text-white'}`}>
        {icon}
      </div>
      <span className="text-sm font-medium hidden lg:block">{label}</span>
    </button>
  );
}

function KpiCard({ title, value, trend, subtitle, icon, trendPositive, valueColor }: { title: string, value: string, trend?: string, subtitle?: string, icon: React.ReactNode, trendPositive?: boolean, valueColor?: string }) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-5 hover:border-[#333] transition-colors">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-medium text-[#888] uppercase tracking-wider">{title}</p>
        <div className="p-2 bg-[#141414] rounded-lg">{icon}</div>
      </div>
      <div>
        <h3 className={`text-2xl font-bold ${valueColor || 'text-white'}`}>{value}</h3>
        <div className="flex items-center gap-1.5 mt-1">
          {trend && <span className={`text-[10px] font-semibold ${trendPositive ? 'text-emerald-500' : 'text-red-500'}`}>{trend}</span>}
          {subtitle && <span className="text-[10px] text-[#555] font-medium">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}

function Widget({ title, icon, badge, badgeColor, children }: { title: string, icon: React.ReactNode, badge?: string, badgeColor?: string, children: React.ReactNode }) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden flex flex-col h-full hover:border-[#333] transition-colors">
      <div className="px-5 py-4 border-b border-[#1f1f1f] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="text-sm font-semibold text-white uppercase tracking-tight">{title}</h4>
        </div>
        {badge && (
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${badgeColor || 'bg-blue-500 text-black'}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="p-5 flex-1">{children}</div>
    </div>
  );
}

function ActionCard({ color, title, desc, action }: { color: 'blue' | 'purple' | 'emerald' | 'amber' | 'red', title: string, desc: string, action: string }) {
  const colors = {
    blue: 'border-blue-500/20 bg-blue-500/5 text-blue-500 hover:bg-blue-500/10',
    purple: 'border-purple-500/20 bg-purple-500/5 text-purple-500 hover:bg-purple-500/10',
    emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500/10',
    amber: 'border-amber-500/20 bg-amber-500/5 text-amber-500 hover:bg-amber-500/10',
    red: 'border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10',
  };

  return (
    <div className={`p-3 rounded-lg border transition-all cursor-pointer group ${colors[color]}`}>
      <div className="flex justify-between items-start mb-1">
        <h5 className="text-xs font-bold text-white leading-tight">{title}</h5>
        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-[10px] text-[#888] mb-2">{desc}</p>
      <span className="text-[10px] font-bold uppercase tracking-widest">{action}</span>
    </div>
  );
}

function QueueCard({ name, status, wait, chair, avatarColor, initial }: { name: string, status: string, wait: string, chair: string, avatarColor: string, initial: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#141414] border border-[#222] rounded-lg">
      <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-white text-[10px] font-bold`}>{initial}</div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <p className="text-xs font-semibold text-white truncate">{name}</p>
          <span className="text-[9px] text-blue-500 font-bold uppercase">{status}</span>
        </div>
        <div className="flex justify-between mt-0.5">
          <p className="text-[10px] text-[#555]">{chair}</p>
          <p className="text-[10px] text-[#555]">{wait} wait</p>
        </div>
      </div>
    </div>
  );
}

function PipelineCol({ title, count, children, color }: { title: string, count: number, children?: React.ReactNode, color: string }) {
  return (
    <div className={`w-[300px] flex-shrink-0 border-t-2 ${color} bg-[#0d0d0d] rounded-lg flex flex-col h-full`}>
      <div className="p-3 border-b border-[#1f1f1f] flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <span className="text-[10px] bg-[#222] text-[#888] px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
        {children}
      </div>
    </div>
  );
}

function LeadCard({ name, type, price, time, initial, color, isHot, email, phone, website }: { name: string, type: string, price: string, time: string, initial: string, color: string, isHot?: boolean, email?: string | null, phone?: string | null, website?: string | null }) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-xl p-3 hover:border-[#444] transition-all cursor-pointer group">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white text-[10px] font-bold`}>{initial}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-white truncate">{name}</h4>
          <p className="text-[10px] text-[#666]">{type}</p>
        </div>
        {isHot && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>}
      </div>
      
      {(email || phone || website) && (
        <div className="flex flex-wrap gap-1 mb-3">
          {email && <div className="px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] text-blue-400 truncate max-w-full" title={email}>{email}</div>}
          {phone && <div className="px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] text-blue-400">{phone}</div>}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] text-blue-400 flex items-center gap-1 hover:bg-blue-500/20 transition-colors">
              <Globe className="w-2 h-2" /> Web
            </a>
          )}
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-bold text-white">{price}</p>
          <p className="text-[9px] text-[#444]">{time}</p>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-1 bg-[#222] rounded"><MessageCircle className="w-3 h-3 text-[#888]" /></div>
          <div className="p-1 bg-[#222] rounded"><ChevronRight className="w-3 h-3 text-[#888]" /></div>
        </div>
      </div>
    </div>
  );
}

function SourceToggle({ label, active }: { label: string, active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#141414] border border-[#222] rounded-lg">
      <span className={`text-xs ${active ? 'text-white font-medium' : 'text-[#555]'}`}>{label}</span>
      <div className={`w-8 h-4 rounded-full relative transition-colors ${active ? 'bg-blue-500' : 'bg-[#222]'}`}>
        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${active ? 'right-1' : 'left-1'}`}></div>
      </div>
    </div>
  );
}

function StaffMember({ name, role, commission, active, chair, initials, color }: { name: string, role: string, commission: string, active?: boolean, chair: string, initials: string, color: string }) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-6 hover:border-[#333] transition-colors relative overflow-hidden group">
      {active && <div className="absolute top-0 right-0 p-2 bg-emerald-500 text-black text-[9px] font-bold uppercase tracking-wider rounded-bl-lg">Active Now</div>}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-lg font-bold text-white shadow-lg`}>{initials}</div>
        <div>
          <h3 className="font-bold text-white">{name}</h3>
          <p className="text-xs text-[#666]">{role}</p>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-xs">
          <span className="text-[#555]">Chair Assigned</span>
          <span className="text-white font-medium">Chair {chair}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[#555]">Commission Split</span>
          <span className="text-white font-medium">{commission}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[#555]">Today's Bookings</span>
          <span className="text-white font-medium">12 cuts</span>
        </div>
      </div>
      <button className="w-full py-2 bg-[#141414] border border-[#222] text-[#888] hover:text-white rounded-lg text-xs font-bold transition-colors">Manage Staff</button>
    </div>
  );
}

function QuickStatChip({ label, alert }: { label: string, alert?: boolean }) {
  return (
    <div className={`px-3 py-1.5 rounded-full border text-[11px] font-bold flex items-center gap-2 ${
      alert 
        ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse-red' 
        : 'bg-[#141414] border-[#222] text-[#888]'
    }`}>
      {alert && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
      {label}
    </div>
  );
}
