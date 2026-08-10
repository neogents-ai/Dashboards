import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
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

export type BarberVariant = 'barber' | 'hairstylist';

const VARIANT_LABELS = {
  barber: {
    role: 'Barber',
    shopName: "King's Barbershop",
    signatureTab: 'Cut Library',
    signatureWidget: 'Cut Library Quick Recall',
    leadsBusinessDefault: 'Local Barber',
    leadsPlaceholder: 'e.g. Best fades, Barbershops',
    leadsQueryDefault: 'Best fades, Barbershops West LA',
    masterRole: 'Master Barber / Owner',
    seniorRole: 'Senior Barber',
    juniorRole: 'Barber',
    planName: 'Pro Barber Plan',
  },
  hairstylist: {
    role: 'Hairstylist',
    shopName: "Rose & Shears Salon",
    signatureTab: 'Style Library',
    signatureWidget: 'Style Library Quick Recall',
    leadsBusinessDefault: 'Local Hairstylist',
    leadsPlaceholder: 'e.g. Best balayage, Hair Salons',
    leadsQueryDefault: 'Best balayage, Hair Salons West LA',
    masterRole: 'Master Stylist / Owner',
    seniorRole: 'Senior Stylist',
    juniorRole: 'Hairstylist',
    planName: 'Pro Stylist Plan',
  },
} as const;

const VariantContext = createContext<typeof VARIANT_LABELS['barber']>(VARIANT_LABELS.barber);
const useVariantLabels = () => useContext(VariantContext);

export function DashboardBarber({ variant = 'barber' }: { variant?: BarberVariant } = {}) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const labels = VARIANT_LABELS[variant];
  return (
    <VariantContext.Provider value={labels}>
      <DashboardBarberInner variant={variant} labels={labels} activeNav={activeNav} setActiveNav={setActiveNav} />
    </VariantContext.Provider>
  );
}

function DashboardBarberInner({
  variant,
  labels,
  activeNav,
  setActiveNav,
}: {
  variant: BarberVariant;
  labels: typeof VARIANT_LABELS['barber'];
  activeNav: string;
  setActiveNav: (n: string) => void;
}) {

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
    <div className={`neo-barber-dashboard-container ${variant === 'hairstylist' ? 'theme-hairstylist' : ''} min-h-[100dvh] bg-[#09090b] text-white flex overflow-hidden`}>
      
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
            <NavItem icon={<Scissors className="w-5 h-5" />} label={labels.signatureTab} active={activeNav === 'cut-library'} onClick={() => setActiveNav('cut-library')} />
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
            <img src="/images/nori_nobg.png" alt="NORI" className="nori-animated object-contain flex-shrink-0" style={{ width: 36, height: 36 }} />
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
  const labels = useVariantLabels();
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
          <Widget title={labels.signatureWidget} icon={<Scissors className="w-4 h-4 text-blue-500" />}>
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
  const [caption, setCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram', 'TikTok']);

  const togglePlatform = (p: string) =>
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  return (
    <div className="flex flex-col h-full bg-[#09090b]">
      <div className="h-16 border-b border-[#1f1f1f] px-6 flex items-center justify-between flex-shrink-0">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Share2 className="w-5 h-5 text-blue-500" /> Social Media Studio
        </h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-black px-4 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left */}
        <div className="w-[300px] border-r border-[#1f1f1f] bg-[#0a0a0c] p-6 flex flex-col gap-6 flex-shrink-0 overflow-y-auto custom-scrollbar">
          <div>
            <h3 className="text-xs font-bold text-[#555] uppercase tracking-wider mb-4">Connected Platforms</h3>
            <div className="space-y-3">
              {[
                { name: 'Instagram', handle: '@marcus_cuts', followers: '24.1K', color: 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600' },
                { name: 'TikTok', handle: '@marcusking.barber', followers: '87.3K', color: 'bg-black border border-[#333]' },
                { name: 'YouTube', handle: 'Marcus King Cuts', followers: '11.8K', color: 'bg-red-600' },
              ].map(p => (
                <div key={p.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${p.color} flex items-center justify-center text-white text-xs font-bold`}>{p.name[0]}</div>
                    <div>
                      <p className="text-sm font-medium text-white">{p.name}</p>
                      <p className="text-[10px] text-[#555]">{p.handle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">{p.followers}</p>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-auto mt-1"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1f1f1f]">
            <h3 className="text-xs font-bold text-[#555] uppercase tracking-wider mb-3">This Week</h3>
            <div className="h-24 flex items-end justify-between gap-1.5">
              {[40, 65, 55, 90, 100, 72, 45].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `rgba(59,130,246,${0.2 + h / 200})` }}></div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[#555] mt-1">
              {['M','T','W','T','F','S','S'].map(d => <span key={d}>{d}</span>)}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1f1f1f]">
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> AI Content Idea</p>
              <p className="text-xs text-[#888] leading-relaxed">"Time-lapse a signature fade from start to finish. TikTok fades perform 3× better than static cuts."</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Scheduled Posts */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Scheduled & Drafts</h3>
            <div className="space-y-3">
              {[
                { time: 'Today 7PM', platform: 'TK', text: 'Before & after: the fade that went viral 🔥', status: 'Scheduled', thumb: 'bg-zinc-800' },
                { time: 'Tomorrow 9AM', platform: 'IG', text: 'Sunday cuts are the best cuts. DM to book ✂️', status: 'Scheduled', thumb: 'bg-slate-800' },
                { time: 'Thu 12PM', platform: 'YT', text: 'Full taper tutorial — mid skin fade breakdown', status: 'Draft', thumb: 'bg-stone-800' },
                { time: 'Sat 3PM', platform: 'IG', text: '5 reasons your fade always grows out crooked', status: 'Draft', thumb: 'bg-zinc-700' },
              ].map((post, i) => (
                <div key={i} className="bg-[#111] border border-[#222] rounded-xl p-3 flex gap-4 hover:border-[#444] transition-colors group">
                  <div className={`w-14 h-14 rounded-lg flex-shrink-0 ${post.thumb}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500 text-black">{post.platform}</span>
                        <span className="text-xs font-medium text-[#aaa]">{post.time}</span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[#666] hover:text-white"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="text-[#666] hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-sm text-white truncate">{post.text}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border mt-1.5 inline-block ${post.status === 'Scheduled' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-[#222] text-[#888] border-[#333]'}`}>{post.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Create */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <h3 className="text-sm font-medium text-white mb-4">Quick Create</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#888] mb-2 block">Platforms</label>
                <div className="flex gap-2">
                  {['Instagram', 'TikTok', 'YouTube'].map(p => (
                    <button key={p} onClick={() => togglePlatform(p)} className={`px-3 py-1.5 border rounded text-xs font-medium transition-colors ${selectedPlatforms.includes(p) ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' : 'bg-[#222] border-[#333] text-white hover:border-blue-500/30'}`}>{p}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-[#888] mb-2 block">Caption</label>
                <textarea value={caption} onChange={e => setCaption(e.target.value)} rows={4} className="w-full bg-[#0a0a0c] border border-[#222] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none" placeholder="Write your caption..."></textarea>
                <p className="text-[10px] text-[#555] mt-1 text-right">{caption.length} chars</p>
              </div>
              <div>
                <label className="text-xs text-[#888] mb-2 block">Media</label>
                <div className="w-full h-20 border-2 border-dashed border-[#333] hover:border-blue-500/50 rounded-lg flex flex-col items-center justify-center text-[#666] cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 mb-1" />
                  <span className="text-xs">Upload video or photo</span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="flex-1 border border-[#333] hover:bg-[#1a1a1a] text-white py-2.5 rounded-lg text-sm font-medium transition-colors">Save Draft</button>
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-black py-2.5 rounded-lg text-sm font-bold transition-colors">Schedule Post</button>
              </div>
            </div>
          </div>
        </div>
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
  const [activeType, setActiveType] = useState<'all' | 'reel' | 'caption' | 'email' | 'sms'>('all');
  const items = [
    { type: 'reel', title: 'Mid Skin Fade Tutorial', status: 'Draft', date: 'Today' },
    { type: 'caption', title: 'Summer booking push — DM to lock in', status: 'Scheduled', date: 'Jun 1' },
    { type: 'reel', title: 'Before & After: Taper Transformation', status: 'Published', date: 'May 28' },
    { type: 'email', title: 'Loyalty reward — free shape-up this month', status: 'Published', date: 'May 20' },
    { type: 'sms', title: 'Your appointment is tomorrow at 2PM', status: 'Scheduled', date: 'May 30' },
    { type: 'caption', title: 'TikTok: 3 fades you need to try in 2026', status: 'Draft', date: 'May 18' },
    { type: 'reel', title: 'Bald fade time-lapse — 60 sec reel', status: 'Draft', date: 'May 15' },
    { type: 'email', title: 'New chair — now taking bookings Mon & Fri', status: 'Draft', date: 'May 10' },
  ];
  const filtered = activeType === 'all' ? items : items.filter(i => i.type === activeType);
  const typeBadge: Record<string, string> = {
    reel: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    caption: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    email: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    sms: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  };
  const statusColor: Record<string, string> = {
    Draft: 'bg-[#222] text-[#888] border-[#333]',
    Scheduled: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Published: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  };

  return (
    <div className="flex flex-col h-full bg-[#09090b]">
      <div className="h-16 border-b border-[#1f1f1f] px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-blue-500" /> Content Studio
          </h2>
          <div className="flex gap-1 bg-[#141414] border border-[#222] rounded-lg p-1">
            {(['all', 'reel', 'caption', 'email', 'sms'] as const).map(t => (
              <button key={t} onClick={() => setActiveType(t)} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${activeType === t ? 'bg-blue-500 text-black' : 'text-[#888] hover:text-white'}`}>{t === 'all' ? 'All' : t === 'reel' ? 'Reels' : t === 'sms' ? 'SMS' : t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-black px-4 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Content
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* List */}
        <div className="w-[45%] border-r border-[#1f1f1f] bg-[#0a0a0c] overflow-y-auto custom-scrollbar">
          <div className="divide-y divide-[#1f1f1f]">
            {filtered.map((item, i) => (
              <div key={i} className={`p-4 cursor-pointer flex items-center gap-4 transition-colors group ${i === 0 ? 'bg-[#141414]' : 'hover:bg-[#111]'}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${typeBadge[item.type]}`}>{item.type}</span>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${statusColor[item.status]}`}>{item.status}</span>
                  </div>
                  <h4 className={`text-sm font-medium truncate ${i === 0 ? 'text-blue-400' : 'text-white'}`}>{item.title}</h4>
                  <p className="text-xs text-[#666] mt-1">{item.date}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-[#222] rounded text-[#888] hover:text-white"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 hover:bg-[#222] rounded text-[#888] hover:text-white"><Share2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col bg-[#09090b]">
          <div className="h-14 border-b border-[#1f1f1f] px-6 flex items-center justify-between bg-[#0a0a0c]">
            <div className="flex items-center gap-3">
              <span className="bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">Reel Script</span>
              <span className="text-[#888] text-xs">Autosaved</span>
            </div>
            <div className="flex items-center gap-3">
              <select className="bg-[#141414] border border-[#222] rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500">
                <option>AI Enhance...</option>
                <option>Make it shorter</option>
                <option>Add hashtags</option>
                <option>Convert to Caption</option>
                <option>Convert to Email</option>
              </select>
              <button className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Enhance
              </button>
            </div>
          </div>
          <div className="flex-1 p-6 flex flex-col">
            <input type="text" defaultValue="Mid Skin Fade Tutorial" className="text-2xl font-bold bg-transparent border-none text-white focus:outline-none mb-6 placeholder:text-[#444]" />
            <textarea className="flex-1 bg-transparent border-none text-[#ccc] focus:outline-none resize-none leading-relaxed text-[15px]" defaultValue={`Hook (0–3s): Close-up of a messy hairline. Text overlay: "This fade was ROUGH." 🔥\n\nBody (3–45s): Time-lapse the full mid skin fade. Pause on detail shots — temple line, skin blend, and neckline.\n\nOutro (45–60s): Final reveal, client turns and reacts. Text overlay: "Book your transformation — link in bio." ✂️\n\n#barbertok #fadetutorial #skinfade #marcusking #barberlife #cuts`}></textarea>
          </div>
          <div className="h-14 border-t border-[#1f1f1f] px-6 flex items-center justify-between bg-[#0a0a0c]">
            <span className="text-xs text-[#666]">Draft</span>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-[#141414] border border-[#222] hover:bg-[#1a1a1a] rounded text-sm text-white transition-colors flex items-center gap-2"><Eye className="w-4 h-4" /> Preview</button>
              <button className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-black rounded text-sm font-bold transition-colors">Publish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsTab() {
  const reviews = [
    { name: 'Darius Thompson', platform: 'Google', stars: 5, date: '2 days ago', text: 'Marcus is a legend with the clippers. My fade has never looked this clean. Already booked my next appointment before leaving the chair.' },
    { name: 'Kevin Okonkwo', platform: 'Yelp', stars: 5, date: '5 days ago', text: 'Best barbershop in the city, period. The vibe, the music, the cuts — everything is elite. Leon got me right too.' },
    { name: 'Jalen Brooks', platform: 'Booksy', stars: 5, date: '1 week ago', text: 'Came in for a shape-up, left looking like I was ready for a music video. No cap.' },
    { name: 'Andre Williams', platform: 'Google', stars: 4, date: '2 weeks ago', text: 'Always solid work. Had to wait an extra 20 mins past my appointment but Marcus delivered as usual.' },
    { name: 'Malik Reeves', platform: 'Google', stars: 5, date: '3 weeks ago', text: 'Drive 45 minutes just to get my cut here. Worth every mile.' },
  ];

  const platformBadge: Record<string, string> = {
    Google: 'bg-blue-500 text-white',
    Yelp: 'bg-red-600 text-white',
    Booksy: 'bg-purple-600 text-white',
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-blue-500 fill-blue-500" /> Reviews & Reputation
          </h2>
          <p className="text-sm text-[#888] mt-1">Google · Yelp · Booksy — all in one place</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
          <Send className="w-4 h-4" /> Request Reviews
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Average Rating', value: '4.9', icon: <Star className="w-6 h-6 text-blue-500 fill-blue-500" />, iconBg: 'bg-blue-500/10' },
          { label: 'Total Reviews', value: '127', icon: <MessageCircle className="w-6 h-6 text-purple-500" />, iconBg: 'bg-purple-500/10' },
          { label: 'Response Rate', value: '94%', icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />, iconBg: 'bg-emerald-500/10' },
        ].map(s => (
          <div key={s.label} className="bg-[#111] border border-[#1f1f1f] rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#888] font-medium uppercase tracking-wider mb-1">{s.label}</p>
              <span className="text-3xl font-bold text-white">{s.value}</span>
            </div>
            <div className={`w-12 h-12 rounded-full ${s.iconBg} flex items-center justify-center`}>{s.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-medium text-white">Recent Reviews</h3>
          {reviews.map((r, i) => (
            <div key={i} className="bg-[#111] border border-[#222] rounded-xl p-5 flex flex-col gap-3 group hover:border-[#444] transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center font-bold text-white text-sm">{r.name[0]}</div>
                  <div>
                    <h4 className="font-medium text-white text-sm">{r.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${platformBadge[r.platform]}`}>{r.platform}</span>
                      <span className="text-[10px] text-[#666]">{r.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex text-blue-500 text-sm">
                  {Array.from({ length: 5 }).map((_, j) => <span key={j}>{j < r.stars ? '★' : <span className="text-[#333]">★</span>}</span>)}
                </div>
              </div>
              <p className="text-sm text-[#aaa] leading-relaxed">"{r.text}"</p>
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-xs font-medium text-white hover:text-blue-500 transition-colors">Reply</button>
                <button className="text-xs font-medium text-[#888] hover:text-white transition-colors">Share</button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-medium text-white mb-4">Pending Requests</h3>
          <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
            {['Marcus L.', 'DeShawn P.', 'Brandon T.', 'Isaiah R.'].map((name, i) => (
              <div key={i} className="p-4 flex items-center justify-between border-b border-[#1f1f1f] last:border-0 hover:bg-[#141414] transition-colors">
                <div>
                  <h4 className="text-sm font-medium text-white">{name}</h4>
                  <p className="text-xs text-[#888] mt-0.5">Sent {i + 1}d ago</p>
                </div>
                <button className="px-3 py-1.5 bg-[#1a1a1a] border border-[#333] hover:border-blue-500 text-xs font-medium text-white rounded transition-colors">Resend</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  const [activeSection, setActiveSection] = useState<'profile' | 'nori' | 'billing' | 'notifications'>('profile');
  const [autoFollowUp, setAutoFollowUp] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [loyaltyTracking, setLoyaltyTracking] = useState(false);
  const [reviewRequests, setReviewRequests] = useState(true);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-6">Settings</h2>

      <div className="flex gap-6 border-b border-[#1f1f1f] mb-8">
        {([
          { key: 'profile', label: 'Profile' },
          { key: 'nori', label: 'NORI Engine' },
          { key: 'billing', label: 'Billing' },
          { key: 'notifications', label: 'Notifications' },
        ] as const).map(s => (
          <button key={s.key} onClick={() => setActiveSection(s.key)} className={`pb-3 border-b-2 text-sm font-medium transition-colors ${activeSection === s.key ? 'border-blue-500 text-blue-500' : 'border-transparent text-[#888] hover:text-white'}`}>{s.label}</button>
        ))}
      </div>

      {activeSection === 'profile' && (
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center font-bold text-3xl text-black">MK</div>
            <div>
              <div className="flex gap-3 mb-2">
                <button className="bg-[#1a1a1a] border border-[#333] hover:bg-[#222] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"><Upload className="w-4 h-4" /> Upload Photo</button>
                <button className="text-red-500 hover:text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Remove</button>
              </div>
              <p className="text-xs text-[#666]">Square JPG or PNG. Max 2MB.</p>
            </div>
          </div>

          <div className="h-px bg-[#1f1f1f]"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Display Name', value: 'Marcus King', type: 'text' },
              { label: 'Shop Name', value: "King's Barbershop", type: 'text' },
              { label: 'Email Address', value: 'marcus@kingscuts.com', type: 'email' },
              { label: 'Phone', value: '+1 (213) 555-0192', type: 'tel' },
            ].map(f => (
              <div key={f.label} className="space-y-2">
                <label className="text-xs text-[#888] font-medium">{f.label}</label>
                <input type={f.type} defaultValue={f.value} className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500" />
              </div>
            ))}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-xs text-[#888] font-medium">Bio</label>
              <textarea className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 min-h-[80px] resize-none" defaultValue="Master barber with 12 years of experience. Specializing in skin fades, tapers, and creative designs. Owner of King's Barbershop, Compton CA."></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-black px-6 py-2.5 rounded-lg text-sm font-bold transition-colors">Save Changes</button>
          </div>
        </div>
      )}

      {activeSection === 'nori' && (
        <div className="space-y-4 max-w-2xl">
          <p className="text-sm text-[#888] mb-6">NORI automates client outreach and business intelligence behind the scenes.</p>
          {[
            { key: 'autoFollowUp', label: 'Auto Follow-Up Messages', desc: 'Send a check-in text 48h after every appointment', value: autoFollowUp, set: setAutoFollowUp },
            { key: 'appointmentReminders', label: 'Appointment Reminders', desc: 'Auto-send SMS reminders 24h and 2h before cut', value: appointmentReminders, set: setAppointmentReminders },
            { key: 'loyaltyTracking', label: 'Loyalty Tracking', desc: 'Track client visits and trigger rewards at milestones', value: loyaltyTracking, set: setLoyaltyTracking },
            { key: 'reviewRequests', label: 'Auto Review Requests', desc: 'Text clients a Google/Booksy review link after each cut', value: reviewRequests, set: setReviewRequests },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-[#141414] border border-[#222] rounded-xl">
              <div>
                <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                <p className="text-xs text-[#555]">{item.desc}</p>
              </div>
              <button onClick={() => item.set(v => !v)} className={`w-10 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${item.value ? 'bg-blue-500' : 'bg-[#333]'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-all ${item.value ? 'ml-auto' : 'ml-0'}`}></div>
              </button>
            </div>
          ))}
          <div className="pt-4 flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-black px-6 py-2.5 rounded-lg text-sm font-bold transition-colors">Save NORI Settings</button>
          </div>
        </div>
      )}

      {activeSection === 'billing' && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Scissors className="w-6 h-6 text-blue-500" /></div>
                <div>
                  <p className="text-sm font-bold text-white">Pro Barber Plan</p>
                  <p className="text-xs text-[#555]">$49/month · Billed monthly · Next billing Jun 3</p>
                </div>
              </div>
              <button className="text-xs text-[#555] font-bold hover:text-white transition-colors">MANAGE</button>
            </div>
          </div>
          <div className="bg-[#111] border border-[#222] rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Payment Method</h3>
            <div className="flex items-center justify-between p-3 bg-[#141414] border border-[#222] rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#888]" />
                <span className="text-sm text-white">•••• •••• •••• 4242</span>
              </div>
              <button className="text-xs text-blue-500 hover:text-blue-400 font-bold transition-colors">Update</button>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'notifications' && (
        <div className="space-y-4 max-w-2xl">
          {[
            { label: 'New Booking Alerts', desc: 'Push notification when a client books online', on: true },
            { label: 'New Lead Alerts', desc: 'Notify me when a Firecrawl scan finds new leads', on: true },
            { label: 'Review Received', desc: 'Alert when a client leaves a Google or Yelp review', on: true },
            { label: 'Weekly Performance Report', desc: 'Email summary every Monday morning', on: false },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-[#141414] border border-[#222] rounded-xl">
              <div>
                <p className="text-sm font-bold text-white mb-1">{n.label}</p>
                <p className="text-xs text-[#555]">{n.desc}</p>
              </div>
              <div className={`w-10 h-6 rounded-full relative p-1 cursor-pointer ${n.on ? 'bg-blue-500' : 'bg-[#333]'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow ${n.on ? 'ml-auto' : 'ml-0'}`}></div>
              </div>
            </div>
          ))}
          <div className="pt-4 flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-black px-6 py-2.5 rounded-lg text-sm font-bold transition-colors">Save Preferences</button>
          </div>
        </div>
      )}
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
