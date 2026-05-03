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
  RefreshCw, AlertCircle, Database, ListFilter, SlidersHorizontal, X
} from 'lucide-react';

export function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activePreset, setActivePreset] = useState('Film Noir');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return <DashboardTab activePreset={activePreset} setActivePreset={setActivePreset} />;
      case 'gallery':
        return <GalleryTab activePreset={activePreset} setActivePreset={setActivePreset} />;
      case 'bookings':
        return <BookingsTab />;
      case 'leads':
        return <LeadsTab />;
      case 'social':
        return <SocialTab />;
      case 'model':
        return <ModelTab />;
      case 'content':
        return <ContentTab />;
      case 'reviews':
        return <ReviewsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab activePreset={activePreset} setActivePreset={setActivePreset} />;
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
              <div className="w-10 h-10 rounded bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-bold text-lg text-black">
                DR
              </div>
              <div className="hidden lg:block">
                <h2 className="font-bold text-base leading-tight">Drake Reynolds</h2>
                <p className="text-[#888] text-[10px] uppercase tracking-wider">Photography Studio</p>
              </div>
            </div>
          </div>
          
          <nav className="p-3 space-y-1 mt-4">
            <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeNav === 'dashboard'} onClick={() => setActiveNav('dashboard')} />
            <NavItem icon={<ImageIcon />} label="Gallery & AI Sort" active={activeNav === 'gallery'} onClick={() => setActiveNav('gallery')} />
            <NavItem icon={<Calendar />} label="Bookings" active={activeNav === 'bookings'} onClick={() => setActiveNav('bookings')} />
            <NavItem icon={<Users />} label="Leads & CRM" active={activeNav === 'leads'} onClick={() => setActiveNav('leads')} />
            <NavItem icon={<Share2 />} label="Social Media" active={activeNav === 'social'} onClick={() => setActiveNav('social')} />
            <NavItem icon={<GraduationCap />} label="Model Dev" active={activeNav === 'model'} onClick={() => setActiveNav('model')} />
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
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-semibold text-xs flex-shrink-0 text-black">
                DR
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0d0d0d]"></span>
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Drake Reynolds</p>
              <p className="text-xs text-amber-500 font-medium truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#09090b]">
        
        {/* Topbar */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 lg:px-8 border-b border-[#1f1f1f] z-20">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-white">Good morning, Drake</h1>
            <p className="text-[#888] text-sm">May 3, 2026</p>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <QuickStatChip label="3 Shoots Today" />
            <QuickStatChip label="7 New Inquiries" />
            <QuickStatChip label="12 Unread" alert />
            <QuickStatChip label="4 Reviews Pending" />
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-[#888] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-[#09090b]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-xs font-bold text-black cursor-pointer">
              DR
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

function DashboardTab({ activePreset, setActivePreset }: { activePreset: string, setActivePreset: (p: string) => void }) {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* ROW 1: KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Monthly Revenue" 
          value="$18,400" 
          trend="+12% vs last month" 
          icon={<TrendingUp className="w-5 h-5 text-[#888]" />} 
          trendPositive 
        />
        <KpiCard 
          title="Active Bookings" 
          value="11" 
          icon={<Calendar className="w-5 h-5 text-[#888]" />} 
        />
        <KpiCard 
          title="Gallery Deliveries" 
          value="6" 
          subtitle="this week"
          icon={<ImageIcon className="w-5 h-5 text-[#888]" />} 
        />
        <KpiCard 
          title="Avg Review Score" 
          value="4.9★" 
          subtitle="(38 reviews)"
          icon={<Star className="w-5 h-5 text-[#888]" />} 
          valueColor="text-amber-500"
        />
      </div>

      {/* ROW 2: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 flex flex-col">
          <Widget title="AI Image Sort" icon={<Sparkles className="w-4 h-4 text-amber-500" />} badge="BETA">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="aspect-square bg-amber-900/40 rounded border border-amber-800/30"></div>
                <div className="aspect-square bg-orange-900/40 rounded border border-orange-800/30"></div>
                <div className="aspect-square bg-blue-900/40 rounded border border-blue-800/30"></div>
                <div className="aspect-square bg-stone-800/40 rounded border border-stone-700/30"></div>
                <div className="aspect-square bg-rose-900/40 rounded border border-rose-800/30"></div>
                <div className="aspect-square bg-emerald-900/40 rounded border border-emerald-800/30"></div>
              </div>
              <div className="space-y-3 mb-4">
                <p className="text-xs text-[#888] uppercase tracking-wider font-medium">Style Preset</p>
                <div className="flex flex-wrap gap-2">
                  {['Film Noir', 'Golden Hour', 'Moody Editorial', 'Clean & Bright', 'High Fashion'].map(preset => (
                    <button
                      key={preset}
                      onClick={() => setActivePreset(preset)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        activePreset === preset 
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/50' 
                          : 'bg-[#141414] text-[#888] border border-[#222] hover:border-[#444] hover:text-white'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-auto space-y-2">
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2.5 rounded-lg text-sm transition-colors">
                  Sort by Aesthetic
                </button>
                <button className="w-full bg-[#1a1a1a] hover:bg-[#222] text-white border border-[#333] font-medium py-2.5 rounded-lg text-sm transition-colors">
                  Auto-Tag All
                </button>
                <p className="text-center text-xs text-[#666] pt-1">
                  47 untagged photos · AI analyzed 312 this week
                </p>
              </div>
            </div>
          </Widget>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <Widget title="Today's Schedule" icon={<Calendar className="w-4 h-4 text-[#888]" />}>
            <div className="flex flex-col h-full space-y-3">
              <BookingCard time="9:00 AM" name="Emma & Jake Wedding" location="Riverside Gardens" duration="6hr" price="$3,800" status="Confirmed" avatarColor="bg-purple-500" initials="EJ" />
              <BookingCard time="2:00 PM" name="Asha Patel Brand Shoot" location="Studio B" duration="2hr" price="$1,200" status="Confirmed" avatarColor="bg-blue-500" initials="AP" />
              <BookingCard time="6:30 PM" name="Marcus Lee Headshots" location="Downtown" duration="1hr" price="$450" status="Pending" avatarColor="bg-rose-500" initials="ML" />
              <button className="w-full mt-auto border border-dashed border-[#333] hover:border-amber-500/50 hover:text-amber-500 text-[#888] rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" /> New Booking
              </button>
            </div>
          </Widget>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <Widget title="AI Suggestions" icon={<Zap className="w-4 h-4 text-amber-500" />}>
            <div className="flex flex-col h-full space-y-2">
              <ActionCard color="amber" title="Follow up with Sarah M." desc="No response in 3 days" action="Send Follow-up" />
              <ActionCard color="blue" title="Request review from Jake T." desc="Delivered 2 days ago" action="Send Request" />
              <ActionCard color="purple" title="Generate IG caption" desc="Emma's wedding gallery ready" action="Generate" />
              <ActionCard color="green" title="Post to Instagram" desc="3 content items ready to schedule" action="Schedule" />
              <ActionCard color="red" title="Unconfirmed: Marcus Lee" desc="Shoot in 4 hours" action="Confirm Now" />
            </div>
          </Widget>
        </div>
      </div>

      {/* ROW 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 flex flex-col">
          <Widget title="Lead Pipeline" icon={<Users className="w-4 h-4 text-[#888]" />} badge="45 Total" badgeColor="bg-[#222] text-[#888]">
            <div className="flex overflow-x-auto pb-4 gap-4 snap-x custom-scrollbar">
              <PipelineCol title="New" count={7}>
                <LeadCard name="Priya Sharma" type="Wedding" price="$4,200" time="Inquiry 2h ago" initial="P" color="bg-emerald-500" />
                <LeadCard name="Tom & Lisa Chen" type="Family Portrait" price="$800" time="Inquiry 5h ago" initial="T" color="bg-orange-500" />
              </PipelineCol>
              <PipelineCol title="Quoted" count={4}>
                <LeadCard name="NovaTech Corp" type="Commercial" price="$6,500" time="Quote sent 1d ago" initial="N" color="bg-blue-500" isHot />
              </PipelineCol>
              <PipelineCol title="Booked" count={11} />
              <PipelineCol title="Shot" count={3} />
              <PipelineCol title="Delivered" count={2} />
              <PipelineCol title="Reviewed" count={18} />
            </div>
          </Widget>
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <Widget title="Social Media" icon={<Share2 className="w-4 h-4 text-[#888]" />}>
            <div className="space-y-5">
              <div className="space-y-2">
                <SocialStatus platform="Instagram" handle="@drakeRphoto" stats="12.4K followers" />
                <SocialStatus platform="Facebook" handle="Drake Reynolds Photography" stats="3.2K likes" />
                <SocialStatus platform="TikTok" handle="@drakevisuals" stats="8.1K followers" />
                <SocialStatus platform="LinkedIn" handle="Drake Reynolds" stats="892 connections" />
              </div>
              <div className="pt-4 border-t border-[#1f1f1f]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-[#aaa]">Scheduled Posts</h4>
                </div>
                <div className="space-y-3">
                  <ScheduledPost time="Tonight 8PM" platform="Instagram" text="Emma & Jake's ceremony golden hour shots..." thumbColor="bg-amber-700/50" />
                  <ScheduledPost time="Tomorrow 10AM" platform="Facebook" text="Behind the scenes: NovaTech brand shoot" thumbColor="bg-blue-900/50" />
                  <ScheduledPost time="Thu 6PM" platform="TikTok" text="POV: shooting a wedding in 35mm film style" thumbColor="bg-stone-700/50" />
                </div>
              </div>
            </div>
          </Widget>
        </div>
      </div>

      {/* ROW 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 flex flex-col">
          <Widget title="Model Development" icon={<GraduationCap className="w-4 h-4 text-[#888]" />}>
            <div className="space-y-5">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[#aaa]">Enrolled Models</h4>
                <ModelCard name="Aaliyah Brooks" courses={3} progress={68} />
                <ModelCard name="Kenji Matsuda" courses={2} progress={45} />
                <ModelCard name="Sofia Reyes" courses={1} progress={22} />
              </div>
              <div className="pt-4 border-t border-[#1f1f1f]">
                <h4 className="text-sm font-medium text-[#aaa] mb-3">Available Courses</h4>
                <div className="space-y-2">
                  <CourseItem title="Posing Fundamentals" lessons={8} enrolled={47} />
                  <CourseItem title="Working with Photographers" lessons={6} enrolled={31} />
                  <CourseItem title="Portfolio Building" lessons={5} enrolled={19} />
                </div>
              </div>
            </div>
          </Widget>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          <Widget title="Messages" icon={<MessageSquare className="w-4 h-4 text-[#888]" />} badge="12" badgeColor="bg-amber-500 text-black">
            <div className="flex flex-col h-full">
              <div className="space-y-1 flex-1">
                <MessageRow name="Emma Rodriguez" text="Thank you so much!! The photos are..." time="2m ago" unread initial="E" color="bg-purple-500" />
                <MessageRow name="NovaTech Corp" text="We'd love to move forward with the..." time="1h ago" unread initial="N" color="bg-blue-500" />
                <MessageRow name="Marcus Lee" text="Can we reschedule to 7pm instead?" time="3h ago" unread initial="M" color="bg-rose-500" />
                <MessageRow name="Priya Sharma" text="Hi! I found you on Instagram and I..." time="5h ago" initial="P" color="bg-emerald-500" />
              </div>
              <div className="pt-4 mt-2">
                <button className="text-amber-500 text-sm font-medium hover:text-amber-400 flex items-center gap-1">
                  View All Messages <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}

function GalleryTab({ activePreset, setActivePreset }: { activePreset: string, setActivePreset: (p: string) => void }) {
  const presets = [
    { name: 'Film Noir', desc: 'Dark, contrasty' },
    { name: 'Golden Hour', desc: 'Warm, glowy' },
    { name: 'Moody Editorial', desc: 'Desaturated, dramatic' },
    { name: 'Clean & Bright', desc: 'Airy, white' },
    { name: 'High Fashion', desc: 'Sharp, bold' },
    { name: 'Documentary', desc: 'Candid, real' },
  ];

  // Placeholder photos
  const photos = Array.from({ length: 24 }).map((_, i) => {
    const isUntagged = i === 3 || i === 7 || i === 12;
    const hasTag = i === 1 || i === 5 || i === 8 || i === 15 || i === 18 || i === 21;
    let tag = '';
    let tagColor = '';
    if (hasTag) {
      if (i % 3 === 0) { tag = 'Film Noir'; tagColor = 'text-amber-500 bg-amber-500/10 border-amber-500/20'; }
      else if (i % 2 === 0) { tag = 'Golden Hour'; tagColor = 'text-purple-500 bg-purple-500/10 border-purple-500/20'; }
      else { tag = 'Clean & Bright'; tagColor = 'text-blue-500 bg-blue-500/10 border-blue-500/20'; }
    }

    const colors = [
      'bg-orange-900/30', 'bg-slate-800/40', 'bg-amber-900/40', 
      'bg-neutral-800/50', 'bg-stone-800/40', 'bg-rose-900/20'
    ];

    return {
      id: i,
      color: colors[i % colors.length],
      isUntagged,
      tag,
      tagColor
    };
  });

  return (
    <div className="flex h-full">
      {/* Left Panel */}
      <div className="w-[280px] border-r border-[#1f1f1f] bg-[#0a0a0c] p-5 overflow-y-auto flex flex-col flex-shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="font-semibold text-lg text-white">AI Sort Engine</h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-500 text-black ml-auto">BETA</span>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="text-xs text-[#888] uppercase tracking-wider font-medium">Style Preset</h3>
          <div className="grid grid-cols-1 gap-2">
            {presets.map(p => (
              <button
                key={p.name}
                onClick={() => setActivePreset(p.name)}
                className={`p-3 rounded-lg border text-left flex flex-col transition-all ${
                  activePreset === p.name 
                    ? 'bg-amber-500/10 border-amber-500 relative' 
                    : 'bg-[#141414] border-[#222] hover:border-[#444]'
                }`}
              >
                <div className="flex justify-between w-full">
                  <span className={`font-medium text-sm ${activePreset === p.name ? 'text-amber-500' : 'text-white'}`}>{p.name}</span>
                  {activePreset === p.name && <Check className="w-4 h-4 text-amber-500" />}
                </div>
                <span className="text-xs text-[#666] mt-1">{p.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Auto-Sort Selection
          </button>
          <button className="w-full bg-transparent hover:bg-[#1a1a1a] text-white border border-[#333] font-medium py-2.5 rounded-lg text-sm transition-colors">
            Auto-Tag All Untagged
          </button>
        </div>

        <div className="text-xs text-[#666] mb-6">
          312 photos analyzed &middot; 47 untagged &middot; 6 shoots
        </div>

        <div className="h-px bg-[#1f1f1f] w-full mb-6"></div>

        <div className="space-y-4">
          <h3 className="text-xs text-[#888] uppercase tracking-wider font-medium">Filter By</h3>
          
          <div className="space-y-1.5">
            <label className="text-xs text-[#888]">Shoot</label>
            <select className="w-full bg-[#141414] border border-[#222] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500">
              <option>Emma & Jake Wedding</option>
              <option>NovaTech Brand Shoot</option>
              <option>Marcus Lee Headshots</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#888]">Date Range</label>
            <select className="w-full bg-[#141414] border border-[#222] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500">
              <option>All Time</option>
              <option>Past 7 Days</option>
              <option>Past 30 Days</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#888]">Status</label>
            <select className="w-full bg-[#141414] border border-[#222] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500">
              <option>All Photos</option>
              <option>Tagged</option>
              <option>Untagged</option>
            </select>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col bg-[#09090b] overflow-hidden">
        {/* Topbar */}
        <div className="h-16 border-b border-[#1f1f1f] px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium text-white">Emma & Jake Wedding &mdash; Jun 2026</h2>
            <span className="text-xs text-[#888] px-2 py-1 bg-[#141414] rounded-md border border-[#222]">128 photos</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-[#888] hover:text-white p-2 rounded-md hover:bg-[#141414] transition-colors"><Filter className="w-4 h-4" /></button>
            <button className="text-[#888] hover:text-white p-2 rounded-md hover:bg-[#141414] transition-colors"><LayoutDashboard className="w-4 h-4" /></button>
            <button className="text-[#888] hover:text-white p-2 rounded-md hover:bg-[#141414] transition-colors"><AlignLeft className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {photos.map(photo => (
              <div 
                key={photo.id} 
                className={`relative aspect-[3/2] rounded-lg border border-[#1f1f1f] group cursor-pointer transition-all hover:border-amber-500 overflow-hidden ${photo.color}`}
              >
                {/* Hover Checkmark */}
                <div className="absolute top-2 left-2 w-5 h-5 rounded-full border border-white/20 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Check className="w-3 h-3 text-white" />
                </div>

                {/* Tags */}
                {photo.isUntagged && (
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded text-[10px] font-medium bg-[#141414]/80 backdrop-blur-sm text-[#888] border border-[#222]">
                    Untagged
                  </div>
                )}
                {photo.tag && (
                  <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-[10px] font-medium backdrop-blur-sm border ${photo.tagColor}`}>
                    {photo.tag}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2 text-sm">
              <button className="px-3 py-1.5 rounded bg-[#141414] border border-[#222] text-[#888] hover:text-white hover:border-[#444]">&larr; Prev</button>
              <span className="text-[#888] px-4">Page 1 of 6</span>
              <button className="px-3 py-1.5 rounded bg-[#141414] border border-[#222] text-[#888] hover:text-white hover:border-[#444]">Next &rarr;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingsTab() {
  const [selectedClient, setSelectedClient] = useState(true);

  return (
    <div className="flex h-full flex-col">
      {/* Top Bar */}
      <div className="h-16 border-b border-[#1f1f1f] px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-amber-500" />
            Bookings
          </h2>
          <div className="h-6 w-px bg-[#1f1f1f]"></div>
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-[#141414] rounded text-[#888] hover:text-white">&larr;</button>
            <span className="font-medium text-sm">May 2026</span>
            <button className="p-1 hover:bg-[#141414] rounded text-[#888] hover:text-white">&rarr;</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-[#141414] p-1 rounded-lg border border-[#222]">
            <button className="px-3 py-1 text-xs font-medium text-[#888] hover:text-white rounded-md">Month</button>
            <button className="px-3 py-1 text-xs font-medium bg-[#2a2a2a] text-white rounded-md shadow-sm">Week</button>
            <button className="px-3 py-1 text-xs font-medium text-[#888] hover:text-white rounded-md">Day</button>
            <button className="px-3 py-1 text-xs font-medium text-[#888] hover:text-white rounded-md">List</button>
          </div>
          <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Booking
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Calendar Main */}
        <div className="flex-1 flex flex-col bg-[#09090b] overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-7 border-b border-[#1f1f1f] bg-[#0c0c0e]">
            {['Mon 3', 'Tue 4', 'Wed 5', 'Thu 6', 'Fri 7', 'Sat 8', 'Sun 9'].map((day, i) => (
              <div key={day} className={`p-3 text-center border-r border-[#1f1f1f] ${i === 1 ? 'bg-amber-500/5' : ''}`}>
                <div className="text-xs text-[#888] font-medium">{day.split(' ')[0]}</div>
                <div className={`text-sm font-semibold mt-1 ${i === 1 ? 'text-amber-500' : 'text-white'}`}>{day.split(' ')[1]}</div>
              </div>
            ))}
          </div>
          
          {/* Grid body */}
          <div className="flex-1 overflow-y-auto relative custom-scrollbar flex">
            {/* Time axis */}
            <div className="w-14 flex-shrink-0 border-r border-[#1f1f1f] bg-[#0c0c0e]">
              {[8,9,10,11,12,1,2,3,4,5,6,7,8].map((t, i) => (
                <div key={i} className="h-20 border-b border-[#1f1f1f] text-[10px] text-[#666] text-right pr-2 pt-2">
                  {t}{i < 4 ? 'AM' : 'PM'}
                </div>
              ))}
            </div>
            
            {/* Days columns */}
            <div className="flex-1 grid grid-cols-7 relative">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="border-r border-[#1f1f1f] relative">
                  {Array.from({ length: 13 }).map((_, j) => (
                    <div key={j} className="h-20 border-b border-[#1f1f1f]/50"></div>
                  ))}
                  
                  {/* Monday Booking */}
                  {i === 0 && (
                    <div className="absolute top-[80px] left-1 right-1 h-[480px] bg-amber-500/10 border border-amber-500/30 rounded-md p-2 flex flex-col cursor-pointer hover:bg-amber-500/20 transition-colors" onClick={() => setSelectedClient(true)}>
                      <div className="w-2 h-2 rounded-full bg-amber-500 mb-1"></div>
                      <span className="text-xs font-semibold text-amber-500">Emma & Jake Wedding</span>
                      <span className="text-[10px] text-amber-500/80">9:00 AM - 3:00 PM</span>
                      <span className="text-[10px] text-amber-500/80 truncate">Riverside Gardens</span>
                    </div>
                  )}

                  {/* Tuesday Booking */}
                  {i === 1 && (
                    <div className="absolute top-[480px] left-1 right-1 h-[160px] bg-blue-500/10 border border-blue-500/30 rounded-md p-2 flex flex-col cursor-pointer hover:bg-blue-500/20 transition-colors" onClick={() => setSelectedClient(false)}>
                      <div className="w-2 h-2 rounded-full bg-blue-500 mb-1"></div>
                      <span className="text-xs font-semibold text-blue-500">NovaTech Brand Shoot</span>
                      <span className="text-[10px] text-blue-500/80">2:00 PM - 4:00 PM</span>
                      <span className="text-[10px] text-blue-500/80 truncate">Studio B</span>
                    </div>
                  )}

                  {/* Wednesday Booking */}
                  {i === 2 && (
                    <div className="absolute top-[160px] left-1 right-1 h-[80px] bg-purple-500/10 border border-purple-500/30 rounded-md p-2 flex flex-col cursor-pointer hover:bg-purple-500/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mb-1"></div>
                      <span className="text-xs font-semibold text-purple-500 truncate">Asha Patel Portraits</span>
                      <span className="text-[10px] text-purple-500/80">10:00 AM - 11:00 AM</span>
                    </div>
                  )}

                  {/* Thursday Booking */}
                  {i === 3 && (
                    <div className="absolute top-[800px] left-1 right-1 h-[80px] bg-green-500/10 border border-green-500/30 rounded-md p-2 flex flex-col cursor-pointer hover:bg-green-500/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-green-500 mb-1"></div>
                      <span className="text-xs font-semibold text-green-500 truncate">Marcus Lee Headshots</span>
                      <span className="text-[10px] text-green-500/80">6:00 PM - 7:00 PM</span>
                    </div>
                  )}

                  {/* Friday Booking */}
                  {i === 4 && (
                    <div className="absolute top-[400px] left-1 right-1 h-[320px] bg-amber-500/10 border border-amber-500/30 rounded-md p-2 flex flex-col cursor-pointer hover:bg-amber-500/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mb-1"></div>
                      <span className="text-xs font-semibold text-amber-500 truncate">Priya Sharma Engagement</span>
                      <span className="text-[10px] text-amber-500/80">1:00 PM - 5:00 PM</span>
                      <span className="text-[10px] text-amber-500/80 truncate">Botanic Garden</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Client Detail */}
        {selectedClient && (
          <div className="w-[300px] border-l border-[#1f1f1f] bg-[#0a0a0c] flex flex-col flex-shrink-0 overflow-y-auto">
            <div className="p-5 border-b border-[#1f1f1f]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white text-lg">
                  ER
                </div>
                <div>
                  <h3 className="font-semibold text-white">Emma Rodriguez</h3>
                  <p className="text-xs text-[#888]">Wedding Photography</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#141414] hover:bg-[#222] border border-[#222] rounded-md py-1.5 text-xs font-medium text-white transition-colors">Message</button>
                <button className="flex-1 bg-[#141414] hover:bg-[#222] border border-[#222] rounded-md py-1.5 text-xs font-medium text-white transition-colors">Edit</button>
              </div>
            </div>
            
            <div className="p-5 space-y-5">
              <div>
                <h4 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2">Event Details</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Clock className="w-4 h-4 text-[#888] flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white">Mon May 4, 2026</p>
                      <p className="text-xs text-[#888]">9:00 AM – 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-[#888] flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white">Riverside Gardens</p>
                      <p className="text-xs text-[#888]">Los Angeles, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2">Booking Status</h4>
                <div className="bg-[#141414] rounded-lg border border-[#222] p-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#888]">Package</span>
                    <span className="font-medium text-white">Full Day ($3,800)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#888]">Status</span>
                    <span className="font-medium text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Confirmed</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#888]">Contract</span>
                    <span className="font-medium text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Signed</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#888]">Deposit</span>
                    <span className="font-medium text-white">Paid ($950)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#888]">Questionnaire</span>
                    <span className="font-medium text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Completed</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2">Notes</h4>
                <div className="bg-[#141414] rounded-lg border border-[#222] p-3">
                  <p className="text-xs text-[#aaa] leading-relaxed">
                    Ceremony at 11am, golden hour portraits at 5pm, venue map attached in emails. Family photos immediately after ceremony.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button className="w-full bg-[#1a1a1a] hover:bg-[#222] border border-[#333] text-white py-2 rounded-md text-sm font-medium transition-colors">View Contract</button>
                <button className="w-full bg-[#1a1a1a] hover:bg-[#222] border border-[#333] text-white py-2 rounded-md text-sm font-medium transition-colors">Send Reminder</button>
              </div>
            </div>
            
            <div className="mt-auto border-t border-[#1f1f1f] p-5">
              <h4 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-3">Upcoming (Next 5)</h4>
              <div className="space-y-3">
                {[
                  {d: "May 5", n: "NovaTech Brand", t: "Commercial"},
                  {d: "May 6", n: "Asha Patel", t: "Portraits"},
                  {d: "May 7", n: "Marcus Lee", t: "Headshots"},
                  {d: "May 8", n: "Priya Sharma", t: "Engagement"},
                  {d: "May 12", n: "Tom Chen", t: "Family"}
                ].map((u, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-medium text-white">{u.n}</p>
                      <p className="text-[10px] text-[#888]">{u.t}</p>
                    </div>
                    <span className="text-[10px] bg-[#141414] border border-[#222] px-1.5 py-0.5 rounded text-[#aaa]">{u.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LeadsTab() {
  const [leadsView, setLeadsView] = useState<'pipeline' | 'find'>('pipeline');
  return (
    <div className="flex flex-col h-full bg-[#09090b]">
      {/* Top bar */}
      <div className="h-16 border-b border-[#1f1f1f] px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            Leads & CRM
          </h2>
          <div className="flex bg-[#141414] border border-[#222] rounded-lg p-0.5">
            <button
              onClick={() => setLeadsView('pipeline')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${leadsView === 'pipeline' ? 'bg-amber-500 text-black' : 'text-[#888] hover:text-white'}`}
            >Pipeline</button>
            <button
              onClick={() => setLeadsView('find')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${leadsView === 'find' ? 'bg-amber-500 text-black' : 'text-[#888] hover:text-white'}`}
            ><Globe className="w-3.5 h-3.5" />Find Leads</button>
          </div>
        </div>
        {leadsView === 'pipeline' && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search leads..." className="bg-[#141414] border border-[#222] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-amber-500 w-64" />
            </div>
            <select className="bg-[#141414] border border-[#222] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-amber-500">
              <option>All Stages</option>
              <option>New Only</option>
              <option>High Value</option>
            </select>
            <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Lead
            </button>
          </div>
        )}
      </div>

      {leadsView === 'find' && <FindLeadsView />}

      {leadsView === 'pipeline' && (
      <>{/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 custom-scrollbar">
        <div className="flex gap-4 h-full min-w-max">
          
          <KanbanColumn title="New" count={7} color="border-emerald-500/50" headerBg="bg-emerald-500/10" textCol="text-emerald-500">
            <KanbanCard name="Priya Sharma" type="Wedding" price="$4,200" time="2h ago" initial="P" avatarColor="bg-emerald-500" />
            <KanbanCard name="Tom & Lisa Chen" type="Family" price="$800" time="5h ago" initial="T" avatarColor="bg-orange-500" />
            <KanbanCard name="Diana Mills" type="Newborn" price="$650" time="1d ago" initial="D" avatarColor="bg-purple-500" />
            <KanbanCard name="NovaTech Corp" type="Commercial" price="$6,500" time="1d ago" initial="N" avatarColor="bg-blue-500" isHot />
            <KanbanCard name="Zoe & Marcus" type="Engagement" price="$1,800" time="2d ago" initial="Z" avatarColor="bg-rose-500" />
          </KanbanColumn>

          <KanbanColumn title="Quoted" count={4} color="border-amber-500/50" headerBg="bg-amber-500/10" textCol="text-amber-500">
            <KanbanCard name="Sarah M." type="Wedding" price="$3,600" time="3d ago" initial="S" avatarColor="bg-indigo-500" warning />
            <KanbanCard name="Jackson Realty" type="Commercial" price="$4,400" time="1d ago" initial="J" avatarColor="bg-cyan-500" />
            <KanbanCard name="River Valley Farm" type="Event" price="$2,200" time="2d ago" initial="R" avatarColor="bg-lime-500" />
            <KanbanCard name="Aisha Brown" type="Maternity" price="$850" time="5h ago" initial="A" avatarColor="bg-pink-500" />
          </KanbanColumn>

          <KanbanColumn title="Booked" count={11} color="border-blue-500/50" headerBg="bg-blue-500/10" textCol="text-blue-500">
            <KanbanCard name="Emma Rodriguez" type="Wedding" price="$3,800" time="Confirmed" initial="E" avatarColor="bg-purple-500" />
            <KanbanCard name="Asha Patel" type="Brand" price="$1,200" time="Confirmed" initial="A" avatarColor="bg-blue-500" />
            <KanbanCard name="Marcus Lee" type="Headshots" price="$450" time="Confirmed" initial="M" avatarColor="bg-rose-500" />
            <KanbanCard name="Fernanda Cruz" type="Quinceañera" price="$2,800" time="Confirmed" initial="F" avatarColor="bg-fuchsia-500" />
            <KanbanCard name="James & Beth" type="Engagement" price="$1,600" time="Confirmed" initial="J" avatarColor="bg-teal-500" />
          </KanbanColumn>

          <KanbanColumn title="Shot" count={3} color="border-purple-500/50" headerBg="bg-purple-500/10" textCol="text-purple-500">
            <div className="bg-[#141414] border border-[#222] rounded-lg p-4 opacity-70">
              <p className="text-sm text-white font-medium">Gallery Processing</p>
              <p className="text-xs text-[#666] mt-1">3 active shoots in editing phase</p>
            </div>
          </KanbanColumn>

          <KanbanColumn title="Delivered" count={2} color="border-orange-500/50" headerBg="bg-orange-500/10" textCol="text-orange-500">
            <div className="bg-[#141414] border border-[#222] rounded-lg p-4 opacity-70">
              <p className="text-sm text-white font-medium">Awaiting Review</p>
              <p className="text-xs text-[#666] mt-1">2 galleries pending client feedback</p>
            </div>
          </KanbanColumn>

          <KanbanColumn title="Reviewed" count={18} color="border-stone-500/50" headerBg="bg-stone-500/10" textCol="text-stone-500">
            <KanbanCard name="Priya & Raj" type="Wedding" price="$4,500" time="5★ Google" initial="P" avatarColor="bg-emerald-500" hideActions />
            <KanbanCard name="Studio B" type="Commercial" price="$3,200" time="5★ Facebook" initial="S" avatarColor="bg-stone-500" hideActions />
            <KanbanCard name="Lena W." type="Maternity" price="$900" time="4.8★ Google" initial="L" avatarColor="bg-amber-500" hideActions />
          </KanbanColumn>

        </div>
      </div>

      {/* Bottom Bar - Stats */}
      <div className="h-16 border-t border-[#1f1f1f] px-6 flex items-center bg-[#0d0d0d] flex-shrink-0">
        <span className="text-sm text-[#888] font-medium mr-4">Lead Sources:</span>
        <div className="flex-1 flex h-2 rounded-full overflow-hidden">
          <div className="bg-pink-500 w-[42%]" title="Instagram 42%"></div>
          <div className="bg-blue-500 w-[31%]" title="Referral 31%"></div>
          <div className="bg-amber-500 w-[18%]" title="Google 18%"></div>
          <div className="bg-stone-500 w-[9%]" title="TikTok 9%"></div>
        </div>
        <div className="flex gap-4 ml-4 text-xs font-medium text-[#aaa]">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-500"></div> IG (42%)</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Ref (31%)</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Web (18%)</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-stone-500"></div> TT (9%)</span>
        </div>
      </div>
      </>)}
    </div>
  );
}

const SCRAPED_LEADS = [
  { id: 1, name: 'Ava & James Thompson', type: 'Wedding', source: 'theknot.com', url: 'theknot.com/wedding/ava-james', location: 'Los Angeles, CA', signal: 'Planning 2026 wedding · searching for photographer', email: 'ava.thompson@gmail.com', score: 94, status: 'new' },
  { id: 2, name: 'Solis Creative Agency', type: 'Commercial', source: 'linkedin.com', url: 'linkedin.com/company/solis-creative', location: 'West Hollywood, CA', signal: 'Posted "seeking photographer for product launch"', email: 'hire@soliscreative.co', score: 89, status: 'new' },
  { id: 3, name: 'Maya & Daniel Rodriguez', type: 'Engagement', source: 'instagram.com', url: 'instagram.com/p/C9xKpLd', location: 'Santa Monica, CA', signal: 'Just got engaged · tagged local venues', email: null, score: 81, status: 'new' },
  { id: 4, name: 'Luminary Skin Spa', type: 'Brand Shoot', source: 'yelp.com', url: 'yelp.com/biz/luminary-skin-spa', location: 'Beverly Hills, CA', signal: 'New business · no professional photos yet', email: 'hello@luminaryspa.com', score: 76, status: 'new' },
  { id: 5, name: 'Brett & Chloe Nakamura', type: 'Wedding', source: 'weddingwire.com', url: 'weddingwire.com/b/brett-chloe', location: 'Malibu, CA', signal: 'Venue booked · "still need photographer" comment', email: 'chloe.n@icloud.com', score: 91, status: 'new' },
  { id: 6, name: 'NXT Gen Apparel', type: 'Product Shoot', source: 'shopify.com', url: 'nxtgenapparel.com', location: 'Culver City, CA', signal: 'Shopify store launched · low-res product images', email: 'team@nxtgenapparel.com', score: 72, status: 'new' },
  { id: 7, name: 'Reeve & Partners Law', type: 'Headshots', source: 'google.com', url: 'maps.google.com/place/reeve-law', location: 'Downtown LA, CA', signal: 'New office listing · 8 attorneys · no headshots', email: 'admin@reevelaw.com', score: 68, status: 'new' },
];

const LOG_LINES = [
  { time: '0.2s', msg: 'Firecrawl initialized · endpoint: api.firecrawl.dev', color: 'text-emerald-400' },
  { time: '0.8s', msg: 'Playwright browser launched · headless: true', color: 'text-blue-400' },
  { time: '1.1s', msg: 'Crawling theknot.com — wedding listings Los Angeles 2026', color: 'text-[#aaa]' },
  { time: '2.4s', msg: '14 prospect profiles extracted · filtering by location', color: 'text-[#aaa]' },
  { time: '3.0s', msg: 'Crawling instagram.com/explore — #engaged #losangeles', color: 'text-[#aaa]' },
  { time: '4.3s', msg: '31 posts matched · running signal detection', color: 'text-[#aaa]' },
  { time: '5.1s', msg: 'Crawling linkedin.com — "hiring photographer" Los Angeles', color: 'text-[#aaa]' },
  { time: '6.7s', msg: 'Playwright: scrolling yelp.com/search?find_desc=photographer&find_loc=LA', color: 'text-[#aaa]' },
  { time: '7.2s', msg: 'New business signals detected · 6 unclaimed photos', color: 'text-amber-400' },
  { time: '8.0s', msg: 'Deduplication pass — removing 9 existing CRM contacts', color: 'text-[#aaa]' },
  { time: '8.5s', msg: 'AI scoring pass — ranking by lead quality + intent signals', color: 'text-purple-400' },
  { time: '9.1s', msg: '7 qualified leads ready · avg score 81/100', color: 'text-emerald-400' },
];

function FindLeadsView() {
  const [scanState, setScanState] = useState<'idle' | 'running' | 'done'>('idle');
  const [logLines, setLogLines] = useState<{ time: string, msg: string, color?: string }[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [industry, setIndustry] = useState('photography');
  const [location, setLocation] = useState('Los Angeles, CA');
  const [keywords, setKeywords] = useState('wedding, engagement, commercial, brand shoot');
  const [sources, setSources] = useState(['theknot.com', 'Instagram', 'LinkedIn', 'Yelp', 'Google Maps']);
  const [playwright, setPlaywright] = useState(true);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runScan = async () => {
    setScanState('running');
    setLogLines([]);
    setResults([]);
    setError(null);

    // Fake log line streaming
    const fakeLogs = [
      { msg: 'Firecrawl initialized · endpoint: api.firecrawl.dev', color: 'text-emerald-400' },
      { msg: 'Playwright browser launched · headless: true', color: 'text-blue-400' },
      { msg: `Crawling industry targets for ${industry} in ${location}...`, color: 'text-[#aaa]' },
      { msg: 'Extracting prospect profiles · filtering by intent signals', color: 'text-[#aaa]' },
      { msg: 'AI scoring pass — ranking by lead quality', color: 'text-purple-400' },
    ];

    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < fakeLogs.length) {
        setLogLines(prev => [...prev, { time: `${(logIdx * 1.2).toFixed(1)}s`, ...fakeLogs[logIdx] }]);
        logIdx++;
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
      } else {
        clearInterval(logInterval);
      }
    }, 800);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry,
          query: keywords,
          location,
          limit: 10
        })
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.leads);
        setLogLines(prev => [...prev, {
          time: `${(logIdx * 1.2 + 0.5).toFixed(1)}s`,
          msg: `Scan complete. ${data.leads.length} leads found.`,
          color: 'text-emerald-400'
        }]);
      } else {
        setError(data.error || 'Failed to fetch leads');
      }
    } catch (err) {
      setError('Connection error: Make sure the backend server is running on port 3001');
      console.error(err);
    } finally {
      clearInterval(logInterval);
      setScanState('done');
    }
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const toggleSource = (s: string) => setSources(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const addToPipeline = (id: string) => setAddedIds(prev => [...prev, id]);

  const allSources = ['theknot.com', 'Instagram', 'LinkedIn', 'Yelp', 'Google Maps', 'WeddingWire', 'Shopify'];

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* LEFT — Config Panel */}
      <div className="w-80 flex-shrink-0 border-r border-[#1f1f1f] flex flex-col bg-[#0d0d0d] overflow-y-auto custom-scrollbar">
        <div className="p-5 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-white">Search Parameters</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#666] mb-1 block">Industry</label>
                <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-[#141414] border border-[#222] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
                  <option value="photography">Photography</option>
                  <option value="aesthetician">Aesthetician</option>
                  <option value="barber">Barbershop</option>
                  <option value="realtor">Realtor</option>
                  <option value="chef">Popup Chef</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#666] mb-1 block">Location</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-[#555] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-[#141414] border border-[#222] rounded-lg pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#666] mb-1 block">Keywords / Services</label>
                <textarea value={keywords} onChange={e => setKeywords(e.target.value)} rows={2} className="w-full bg-[#141414] border border-[#222] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 resize-none" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-white">Sources to Crawl</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allSources.map(s => (
                <button key={s} onClick={() => toggleSource(s)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${sources.includes(s) ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' : 'bg-[#141414] border-[#222] text-[#666] hover:text-white'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-white">Engine Settings</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-[#141414] border border-[#222] rounded-lg px-3 py-2">
                <div>
                  <p className="text-xs font-medium text-white">Firecrawl API</p>
                  <p className="text-[10px] text-[#555]">Web crawling + extraction</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></div>
              </div>
              <div className="flex items-center justify-between bg-[#141414] border border-[#222] rounded-lg px-3 py-2">
                <div>
                  <p className="text-xs font-medium text-white">Playwright Browser</p>
                  <p className="text-[10px] text-[#555]">JS-rendered pages + scroll</p>
                </div>
                <button onClick={() => setPlaywright(p => !p)} className={`w-9 h-5 rounded-full transition-colors relative ${playwright ? 'bg-amber-500' : 'bg-[#333]'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${playwright ? 'left-4' : 'left-0.5'}`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between bg-[#141414] border border-[#222] rounded-lg px-3 py-2">
                <div>
                  <p className="text-xs font-medium text-white">AI Lead Scoring</p>
                  <p className="text-[10px] text-[#555]">Intent + fit scoring 0–100</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></div>
              </div>
              <div className="flex items-center justify-between bg-[#141414] border border-[#222] rounded-lg px-3 py-2">
                <div>
                  <p className="text-xs font-medium text-white">CRM Deduplication</p>
                  <p className="text-[10px] text-[#555]">Skip existing contacts</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></div>
              </div>
            </div>
          </div>

          <button
            onClick={runScan}
            disabled={scanState === 'running'}
            className={`w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${scanState === 'running' ? 'bg-amber-500/30 text-amber-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 text-black'}`}
          >
            {scanState === 'running' ? <><RefreshCw className="w-4 h-4 animate-spin" />Scanning...</> : <><Radio className="w-4 h-4" />Run Firecrawl Scan</>}
          </button>

          {/* Recent Scans */}
          <div>
            <p className="text-xs text-[#555] font-semibold uppercase tracking-wider mb-2">Recent Scans</p>
            <div className="space-y-2">
              {[
                { label: 'Wedding · Los Angeles', count: 11, date: '2h ago' },
                { label: 'Commercial · LA Area', count: 6, date: 'Yesterday' },
                { label: 'Portrait · West LA', count: 4, date: '3d ago' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 bg-[#141414] border border-[#222] rounded-lg">
                  <div>
                    <p className="text-xs text-white">{s.label}</p>
                    <p className="text-[10px] text-[#555]">{s.date}</p>
                  </div>
                  <span className="text-xs text-amber-400 font-medium">{s.count} leads</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Live Log + Results */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Live Scrape Log */}
        <div className="h-48 flex-shrink-0 border-b border-[#1f1f1f] bg-[#070709] font-mono overflow-y-auto p-4 custom-scrollbar" ref={logRef}>
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs text-emerald-500 font-semibold">SCRAPE LOG</span>
            {scanState === 'running' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1"></span>}
            {scanState === 'done' && <span className="text-xs text-[#555] ml-2">— scan complete</span>}
            {scanState === 'idle' && <span className="text-xs text-[#444] ml-2">— press Run to start</span>}
          </div>
          {logLines.length === 0 && scanState === 'idle' && (
            <p className="text-xs text-[#333]">$ awaiting scan parameters...</p>
          )}
          {logLines.map((line, i) => (
            <div key={i} className="flex gap-3 text-xs mb-1">
              <span className="text-[#444] flex-shrink-0 w-10">[{line.time}]</span>
              <span className={line.color}>{line.msg}</span>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {error && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Scan Failed</h3>
              <p className="text-[#888] max-w-md">{error}</p>
              <button onClick={runScan} className="mt-6 px-6 py-2 bg-[#1a1a1a] border border-[#333] text-white rounded-lg hover:bg-[#222] transition-colors">
                Try Again
              </button>
            </div>
          )}

          {!error && scanState === 'idle' && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Globe className="w-7 h-7 text-amber-500/60" />
              </div>
              <p className="text-white font-medium">No scan results yet</p>
              <p className="text-sm text-[#555]">Configure your search parameters and run a Firecrawl scan to discover new leads across the web.</p>
            </div>
          )}

          {!error && scanState === 'running' && results.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
              <p className="text-white font-medium">Scanning the web...</p>
              <p className="text-sm text-[#555]">Firecrawl + Playwright crawling {sources.length} sources</p>
            </div>
          )}

          {!error && (scanState === 'done' || results.length > 0) && (
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-white font-semibold">{results.length} leads discovered</p>
                    <p className="text-xs text-[#555]">Real-time results from Firecrawl scan</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-[#141414] border border-[#222] rounded-lg text-xs text-[#aaa] hover:text-white transition-colors flex items-center gap-1.5">
                    <Download className="w-3 h-3" />Export CSV
                  </button>
                  <button
                    onClick={() => results.forEach(l => addToPipeline(l.id))}
                    className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-400 hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3 h-3" />Add All to Pipeline
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {results.map(lead => {
                  const added = addedIds.includes(lead.id);
                  const scoreColor = lead.score >= 85 ? 'text-emerald-400' : lead.score >= 70 ? 'text-amber-400' : 'text-[#888]';
                  const scoreBg = lead.score >= 85 ? 'bg-emerald-500/10 border-emerald-500/20' : lead.score >= 70 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-[#141414] border-[#222]';
                  return (
                    <div key={lead.id} className={`border rounded-xl p-4 transition-colors ${added ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-[#222] bg-[#0f0f0f] hover:border-[#333]'}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="text-sm font-semibold text-white">{lead.name}</p>
                            <span className="text-[10px] bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] px-2 py-0.5 rounded-full">{lead.business || 'Individual'}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-[#555] mb-2 flex-wrap">
                            <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{lead.source}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{lead.address || 'Location N/A'}</span>
                            {lead.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>}
                            {lead.phone && <span className="flex items-center gap-1"><Smartphone className="w-3 h-3" />{lead.phone}</span>}
                          </div>
                          {lead.website && (
                            <a href={lead.website} target="_blank" rel="noreferrer" className="text-[10px] text-amber-500/80 hover:text-amber-500 flex items-center gap-1 transition-colors mt-1">
                              <ExternalLink className="w-3 h-3" /> {lead.website}
                            </a>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <div className={`text-center border rounded-lg px-3 py-1.5 ${scoreBg}`}>
                            <p className={`text-lg font-bold leading-none ${scoreColor}`}>{lead.score}</p>
                            <p className="text-[9px] text-[#555] mt-0.5">AI score</p>
                          </div>
                          <button
                            onClick={() => !added && addToPipeline(lead.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${added ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-amber-500 hover:bg-amber-600 text-black'}`}
                          >
                            {added ? <><CheckCircle2 className="w-3 h-3" />Added</> : <><Plus className="w-3 h-3" />Add to Pipeline</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Terminal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  );
}

function KanbanColumn({ title, count, children, color, headerBg, textCol }: { title: string, count: number, children: React.ReactNode, color: string, headerBg: string, textCol: string }) {
  return (
    <div className="w-[300px] flex-shrink-0 flex flex-col h-full">
      <div className={`px-3 py-2 rounded-t-lg border border-b-0 border-[#222] ${headerBg} flex items-center justify-between`}>
        <h3 className={`font-semibold text-sm ${textCol}`}>{title}</h3>
        <span className="bg-black/40 text-white text-xs px-2 py-0.5 rounded-full font-medium">{count}</span>
      </div>
      <div className={`flex-1 border border-[#222] bg-[#0c0c0e] rounded-b-lg p-3 space-y-3 overflow-y-auto custom-scrollbar border-t-2 ${color}`}>
        {children}
      </div>
    </div>
  );
}

function KanbanCard({ name, type, price, time, initial, avatarColor, isHot, warning, hideActions }: { name: string, type: string, price: string, time: string, initial: string, avatarColor: string, isHot?: boolean, warning?: boolean, hideActions?: boolean }) {
  return (
    <div className="bg-[#141414] border border-[#222] hover:border-[#444] rounded-lg p-3 cursor-pointer transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
            {initial}
          </div>
          <div>
            <h4 className="text-sm font-medium text-white leading-tight">{name}</h4>
            <span className="text-[10px] text-[#888] bg-[#1a1a1a] px-1.5 py-0.5 rounded mt-0.5 inline-block">{type}</span>
          </div>
        </div>
        {isHot && <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Hot</span>}
      </div>
      
      <div className="flex justify-between items-end mt-3">
        <div>
          <p className="text-xs font-semibold text-white">{price}</p>
          <p className={`text-[10px] ${warning ? 'text-red-400 font-medium' : 'text-[#666]'}`}>{time}</p>
        </div>
        {!hideActions && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1.5 bg-[#222] hover:bg-[#333] text-[#aaa] hover:text-white rounded"><MessageSquare className="w-3 h-3" /></button>
            <button className="p-1.5 bg-[#222] hover:bg-[#333] text-[#aaa] hover:text-white rounded"><Smartphone className="w-3 h-3" /></button>
            <button className="p-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 rounded"><ChevronRight className="w-3 h-3" /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function SocialTab() {
  return (
    <div className="flex flex-col h-full bg-[#09090b]">
      {/* Top bar */}
      <div className="h-16 border-b border-[#1f1f1f] px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-500" />
            Social Media Hub
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-transparent border border-[#333] hover:bg-[#1a1a1a] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
            Connect Platform
          </button>
          <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Edit2 className="w-4 h-4" /> Create Post
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-[320px] border-r border-[#1f1f1f] bg-[#0a0a0c] p-6 flex flex-col flex-shrink-0 overflow-y-auto">
          <h3 className="text-sm font-medium text-white mb-4">Connected Platforms</h3>
          
          <div className="space-y-4 mb-8">
            <PlatformRow name="Instagram" handle="@drakeRphoto" count="12,400 followers" color="bg-pink-600" />
            <PlatformRow name="Facebook" handle="Drake Reynolds Photography" count="3,200 likes" color="bg-blue-600" />
            <PlatformRow name="TikTok" handle="@drakevisuals" count="8,100 followers" color="bg-stone-800" />
            <PlatformRow name="LinkedIn" handle="Drake Reynolds" count="892 connections" color="bg-blue-700" />
            <PlatformRow name="Pinterest" handle="drakeRphoto" count="2,100 views/mo" color="bg-red-600" />
          </div>

          <div className="pt-6 border-t border-[#1f1f1f]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-white">This Week's Reach</h3>
              <BarChart3 className="w-4 h-4 text-[#888]" />
            </div>
            <div className="h-32 flex items-end justify-between gap-2">
              <div className="w-full bg-amber-500/20 rounded-t h-[30%] relative group"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-[#222] px-1 rounded hidden group-hover:block">1.2k</div></div>
              <div className="w-full bg-amber-500/40 rounded-t h-[45%] relative group"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-[#222] px-1 rounded hidden group-hover:block">2.4k</div></div>
              <div className="w-full bg-amber-500/60 rounded-t h-[80%] relative group"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-[#222] px-1 rounded hidden group-hover:block">4.8k</div></div>
              <div className="w-full bg-amber-500 rounded-t h-[100%] relative group"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-[#222] px-1 rounded hidden group-hover:block">6.2k</div></div>
              <div className="w-full bg-amber-500/50 rounded-t h-[60%] relative group"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-[#222] px-1 rounded hidden group-hover:block">3.5k</div></div>
              <div className="w-full bg-amber-500/30 rounded-t h-[40%] relative group"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-[#222] px-1 rounded hidden group-hover:block">2.1k</div></div>
              <div className="w-full bg-amber-500/20 rounded-t h-[25%] relative group"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-[#222] px-1 rounded hidden group-hover:block">900</div></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#666] mt-2">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          
          {/* Calendar Strip */}
          <div className="flex bg-[#141414] border border-[#222] rounded-xl p-2 mb-6">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className={`flex-1 text-center py-2 rounded-lg cursor-pointer ${i === 3 ? 'bg-[#222]' : 'hover:bg-[#1a1a1a]'}`}>
                <div className={`text-xs ${i === 3 ? 'text-white font-medium' : 'text-[#888]'}`}>{day}</div>
                <div className="mt-1.5 flex justify-center gap-1">
                  {(i === 0 || i === 1 || i === 3 || i === 4 || i === 5 || i === 6) && <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>}
                  {(i === 3 || i === 4) && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Scheduled Posts */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white mb-2">Scheduled & Drafts</h3>
              <div className="space-y-3">
                <PostCard time="Tonight 8PM" platform="IG" text="Emma & Jake — the moment they became forever 🤍 Full gallery dropping soon" status="Scheduled" color="bg-pink-600" thumb="bg-amber-800" />
                <PostCard time="Tomorrow 10AM" platform="FB" text="Behind the scenes at the NovaTech brand shoot" status="Scheduled" color="bg-blue-600" thumb="bg-blue-900" />
                <PostCard time="Thu 6PM" platform="TK" text="POV: filming a wedding in 35mm film style" status="Draft" color="bg-stone-800" thumb="bg-stone-700" />
                <PostCard time="Fri 12PM" platform="IG" text="5 things I wish I knew as a new wedding photographer" status="Draft" color="bg-pink-600" thumb="bg-rose-900" />
                <PostCard time="Sat 2PM" platform="IN" text="How I went from 0 to $180K/year as a photographer" status="Scheduled" color="bg-blue-700" thumb="bg-indigo-900" />
                <PostCard time="Sun 9AM" platform="PI" text="Golden hour wedding inspo — Riverside Gardens" status="Scheduled" color="bg-red-600" thumb="bg-orange-800" />
              </div>
            </div>

            {/* Create Post */}
            <div className="bg-[#141414] border border-[#222] rounded-xl p-5 h-max">
              <h3 className="text-sm font-medium text-white mb-4">Quick Create</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#888] mb-2 block">Platforms</label>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-[#222] border border-[#333] hover:border-amber-500 rounded text-xs text-white transition-colors">Instagram</button>
                    <button className="px-3 py-1.5 bg-[#222] border border-[#333] hover:border-amber-500 rounded text-xs text-white transition-colors">Facebook</button>
                    <button className="px-3 py-1.5 bg-[#222] border border-[#333] hover:border-amber-500 rounded text-xs text-white transition-colors">TikTok</button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#888] mb-2 block">Caption</label>
                  <textarea 
                    className="w-full bg-[#0a0a0c] border border-[#222] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 min-h-[120px] resize-none"
                    placeholder="Write your caption here..."
                  ></textarea>
                </div>

                <div>
                  <label className="text-xs text-[#888] mb-2 block">Media</label>
                  <div className="w-full h-24 border-2 border-dashed border-[#333] hover:border-amber-500/50 rounded-lg flex flex-col items-center justify-center text-[#666] cursor-pointer transition-colors bg-[#0a0a0c]">
                    <ImageIcon className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">Click to upload</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#888] mb-2 block">Date</label>
                    <input type="date" className="w-full bg-[#0a0a0c] border border-[#222] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 [color-scheme:dark]" />
                  </div>
                  <div>
                    <label className="text-xs text-[#888] mb-2 block">Time</label>
                    <input type="time" className="w-full bg-[#0a0a0c] border border-[#222] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 [color-scheme:dark]" />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button className="flex-1 bg-transparent border border-[#333] hover:bg-[#1a1a1a] text-white py-2.5 rounded-lg text-sm font-medium transition-colors">Save Draft</button>
                  <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-2.5 rounded-lg text-sm font-medium transition-colors">Schedule Post</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function PlatformRow({ name, handle, count, color }: { name: string, handle: string, count: string, color: string }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded ${color} flex items-center justify-center text-white font-bold text-xs`}>
          {name[0]}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-medium text-white leading-tight">{name}</h4>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          </div>
          <p className="text-xs text-[#888]">{handle}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-medium text-white">{count}</p>
        <a href="#" className="text-[10px] text-amber-500 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">View Analytics</a>
      </div>
    </div>
  );
}

function PostCard({ time, platform, text, status, color, thumb }: { time: string, platform: string, text: string, status: string, color: string, thumb: string }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-lg p-3 flex gap-4 hover:border-[#444] transition-colors group">
      <div className={`w-16 h-16 rounded flex-shrink-0 ${thumb}`}></div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded text-white ${color}`}>{platform}</span>
            <span className="text-xs text-[#aaa] font-medium">{time}</span>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-[#666] hover:text-white"><Edit2 className="w-3.5 h-3.5" /></button>
            <button className="text-[#666] hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        </div>
        <p className="text-sm text-white truncate max-w-[90%]">{text}</p>
        <div>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
            status === 'Scheduled' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-[#222] text-[#888] border-[#333]'
          }`}>{status}</span>
        </div>
      </div>
    </div>
  );
}

function ModelTab() {
  return (
    <div className="flex flex-col h-full bg-[#09090b]">
      {/* Top bar */}
      <div className="h-16 border-b border-[#1f1f1f] px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            Model Development
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-transparent border border-[#333] hover:bg-[#1a1a1a] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Course
          </button>
          <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Enroll Model
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Roster */}
        <div className="w-[340px] border-r border-[#1f1f1f] bg-[#0a0a0c] flex flex-col flex-shrink-0">
          <div className="p-5 border-b border-[#1f1f1f]">
            <div className="relative">
              <Search className="w-4 h-4 text-[#666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search models..." className="w-full bg-[#141414] border border-[#222] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <h3 className="text-xs font-bold text-[#666] uppercase tracking-wider mb-2">Enrolled Models</h3>
            
            <ModelCardFull name="Aaliyah Brooks" tag="Commercial" courses={3} progress={68} date="Active 2h ago" initial="AB" color="bg-emerald-600" />
            <ModelCardFull name="Kenji Matsuda" tag="Editorial" courses={2} progress={45} date="Active 1d ago" initial="KM" color="bg-blue-600" />
            <ModelCardFull name="Sofia Reyes" tag="Runway" courses={1} progress={22} date="Active 3d ago" initial="SR" color="bg-purple-600" />
            <ModelCardFull name="Dante Williams" tag="Commercial" courses={4} progress={100} date="Completed" initial="DW" color="bg-stone-600" completed />
            <ModelCardFull name="Imani Foster" tag="Beauty" courses={1} progress={15} date="Active 1w ago" initial="IF" color="bg-rose-600" />

            <div className="pt-6 mt-4 border-t border-[#1f1f1f]">
              <h3 className="text-xs font-bold text-[#666] uppercase tracking-wider mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="text-xs">
                  <span className="font-medium text-white">Aaliyah Brooks</span> <span className="text-[#888]">completed Posing Fundamentals Lesson 4</span>
                  <div className="text-[#666] mt-0.5">2h ago</div>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-white">Kenji Matsuda</span> <span className="text-[#888]">started Lighting Awareness</span>
                  <div className="text-[#666] mt-0.5">5h ago</div>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-white">Sofia Reyes</span> <span className="text-[#888]">submitted assignment for Portfolio Building</span>
                  <div className="text-[#666] mt-0.5">1d ago</div>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-white">Dante Williams</span> <span className="text-emerald-500 font-medium">graduated from all courses</span>
                  <div className="text-[#666] mt-0.5">2d ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Courses */}
        <div className="flex-1 p-8 overflow-y-auto bg-[#09090b]">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-6">Course Catalog</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <CourseCard title="Posing Fundamentals" lessons={8} enrolled={47} rating="4.9" desc="Master the core mechanics of body movement, angles, and facial expressions." thumb="bg-amber-900/30 border-amber-500/20 text-amber-500" />
              <CourseCard title="Working with Photographers" lessons={6} enrolled={31} rating="4.8" desc="Learn on-set etiquette, communication, and how to read lighting setups." thumb="bg-blue-900/30 border-blue-500/20 text-blue-500" />
              <CourseCard title="Portfolio Building" lessons={5} enrolled={19} rating="4.7" desc="Curate a versatile book that gets you booked across commercial and editorial." thumb="bg-purple-900/30 border-purple-500/20 text-purple-500" />
              <CourseCard title="Runway & Movement" lessons={7} enrolled={28} rating="4.9" desc="Fluidity, pacing, and confident walks for fashion shows and video campaigns." thumb="bg-rose-900/30 border-rose-500/20 text-rose-500" />
              <CourseCard title="Lighting Awareness" lessons={4} enrolled={22} rating="4.6" desc="Finding your light instinctively and understanding modifiers." thumb="bg-emerald-900/30 border-emerald-500/20 text-emerald-500" />
              <CourseCard title="Brand & Social Strategy" lessons={6} enrolled={15} rating="4.8" desc="Grow your digital footprint and negotiate brand deals." thumb="bg-stone-800/50 border-stone-500/20 text-stone-400" />
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Create New Course</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-[#888] mb-1.5 block">Course Title</label>
                  <input type="text" className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" placeholder="e.g. Advanced Editorial" />
                </div>
                <div>
                  <label className="text-xs text-[#888] mb-1.5 block">Number of Lessons</label>
                  <input type="number" className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" placeholder="0" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-[#888] mb-1.5 block">Description</label>
                  <textarea className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 min-h-[80px] resize-none" placeholder="Brief summary of what models will learn..."></textarea>
                </div>
              </div>
              <button className="bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                Create Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModelCardFull({ name, tag, courses, progress, date, initial, color, completed }: { name: string, tag: string, courses: number, progress: number, date: string, initial: string, color: string, completed?: boolean }) {
  return (
    <div className="bg-[#111] border border-[#222] p-4 rounded-xl flex flex-col gap-3 group hover:border-[#444] transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center font-bold text-white text-sm`}>
            {initial}
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm leading-tight">{name}</h4>
            <span className="text-[10px] text-[#888] bg-[#1a1a1a] px-1.5 py-0.5 rounded mt-1 inline-block">{tag}</span>
          </div>
        </div>
        {completed ? (
          <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[10px] font-bold">COMPLETED</span>
        ) : (
          <span className="text-xs font-medium text-[#aaa]">{courses} courses</span>
        )}
      </div>
      
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-[#888]">Progress</span>
          <span className="text-white font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-[#222] rounded-full h-1.5 overflow-hidden">
          <div className={`h-full rounded-full ${completed ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-[#666]">{date}</span>
        <button className="text-xs text-amber-500 font-medium hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">View Profile</button>
      </div>
    </div>
  );
}

function CourseCard({ title, lessons, enrolled, rating, desc, thumb }: { title: string, lessons: number, enrolled: number, rating: string, desc: string, thumb: string }) {
  return (
    <div className="bg-[#111] border border-[#222] p-5 rounded-xl hover:border-[#444] transition-colors flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-lg border flex items-center justify-center flex-shrink-0 ${thumb}`}>
          <PlaySquare className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-white mb-1">{title}</h4>
          <p className="text-xs text-[#888] line-clamp-2">{desc}</p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-[#1f1f1f] flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-[#aaa]">
          <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {lessons} lessons</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {enrolled}</span>
          <span className="flex items-center gap-1.5 text-amber-500"><Star className="w-3.5 h-3.5 fill-amber-500" /> {rating}</span>
        </div>
        <button className="text-xs font-medium bg-[#1a1a1a] hover:bg-[#222] border border-[#333] px-3 py-1.5 rounded text-white transition-colors">Assign</button>
      </div>
    </div>
  );
}

function ContentTab() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Captions' | 'Emails' | 'SMS' | 'Scripts' | 'Blog'>('All');
  const [activeIdx, setActiveIdx] = useState(0);

  const allItems = [
    { type: 'Caption', title: 'Wedding season booking push', status: 'Draft', date: 'Today' },
    { type: 'Email', title: 'Post-shoot gallery delivery template', status: 'Published', date: 'May 1' },
    { type: 'SMS', title: '24h shoot reminder', status: 'Scheduled', date: 'May 5' },
    { type: 'Blog', title: 'Why film photography is back', status: 'Draft', date: 'Apr 28' },
    { type: 'Script', title: 'Reel: What\'s in my camera bag', status: 'Draft', date: 'Apr 25' },
    { type: 'Caption', title: 'NovaTech commercial behind the scenes', status: 'Scheduled', date: 'May 6' },
    { type: 'Email', title: 'Spring mini-session announcement', status: 'Published', date: 'Mar 15' },
    { type: 'SMS', title: 'Gallery expiring warning', status: 'Published', date: 'Feb 10' },
  ];

  const typeMap: Record<string, string> = { Captions: 'Caption', Emails: 'Email', SMS: 'SMS', Scripts: 'Script', Blog: 'Blog' };
  const filtered = activeFilter === 'All' ? allItems : allItems.filter(i => i.type === typeMap[activeFilter]);

  return (
    <div className="flex flex-col h-full bg-[#09090b]">
      {/* Top bar */}
      <div className="h-16 border-b border-[#1f1f1f] px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-500" />
            Content Studio
          </h2>
          <div className="h-6 w-px bg-[#1f1f1f]"></div>
          <div className="flex gap-1 bg-[#141414] p-1 rounded-lg border border-[#222]">
            {(['All', 'Captions', 'Emails', 'SMS', 'Scripts', 'Blog'] as const).map((tab) => (
              <button key={tab} onClick={() => { setActiveFilter(tab); setActiveIdx(0); }} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeFilter === tab ? 'bg-[#2a2a2a] text-white shadow-sm' : 'text-[#888] hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Content
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left List */}
        <div className="w-[45%] border-r border-[#1f1f1f] bg-[#0a0a0c] flex flex-col flex-shrink-0">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="divide-y divide-[#1f1f1f]">
              {filtered.length === 0 && (
                <div className="p-8 text-center text-[#444] text-sm">No {activeFilter.toLowerCase()} yet</div>
              )}
              {filtered.map((item, i) => (
                <ContentRow key={i} type={item.type} title={item.title} status={item.status} date={item.date} active={i === activeIdx} onClick={() => setActiveIdx(i)} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Editor */}
        <div className="flex-1 flex flex-col bg-[#09090b] relative">
          <div className="h-14 border-b border-[#1f1f1f] px-6 flex items-center justify-between bg-[#0a0a0c]">
            <div className="flex items-center gap-3">
              <span className="bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-purple-500/20">Caption</span>
              <span className="text-[#888] text-xs">Saved 2 mins ago</span>
            </div>
            <div className="flex items-center gap-3">
              <select className="bg-[#141414] border border-[#222] rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-amber-500">
                <option>Repurpose...</option>
                <option>Convert to Email</option>
                <option>Convert to SMS</option>
                <option>Make it shorter</option>
                <option>Add hashtags</option>
              </select>
              <button className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Enhance
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 flex flex-col">
            <input 
              type="text" 
              defaultValue="Wedding season booking push" 
              className="text-2xl font-bold bg-transparent border-none text-white focus:outline-none mb-6 placeholder:text-[#444]" 
            />
            
            <textarea 
              className="flex-1 bg-transparent border-none text-[#ccc] focus:outline-none resize-none leading-relaxed text-[15px]"
              defaultValue="Your wedding day isn't just a timeline of events—it's a collection of feelings, glances, and quiet moments between the chaos. 🤍&#10;&#10;I'm officially opening my books for 2027 weddings. If you're looking for photography that feels less like a checklist and more like a documentary of your love, let's talk.&#10;&#10;Link in bio to view packages and secure your date. Dates are strictly limited to ensure I can give every couple my full creative energy. ✨&#10;&#10;#weddingphotographer #documentarywedding #2027bride #filmweddingphotography"
            />
          </div>

          <div className="h-14 border-t border-[#1f1f1f] px-6 flex items-center justify-between bg-[#0a0a0c]">
            <span className="text-xs text-[#666]">482 characters</span>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-[#141414] border border-[#222] hover:bg-[#1a1a1a] rounded text-sm text-white transition-colors flex items-center gap-2">
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-black rounded text-sm font-medium transition-colors">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentRow({ type, title, status, date, active, onClick }: { type: string, title: string, status: string, date: string, active?: boolean, onClick?: () => void }) {
  const getBadgeColor = (t: string) => {
    switch(t) {
      case 'Caption': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Email': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'SMS': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Blog': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Script': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusColor = (s: string) => {
    switch(s) {
      case 'Draft': return 'text-[#888] bg-[#222] border-[#333]';
      case 'Scheduled': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Published': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return '';
    }
  };

  return (
    <div onClick={onClick} className={`p-4 cursor-pointer flex items-center gap-4 transition-colors group ${active ? 'bg-[#141414]' : 'hover:bg-[#111]'}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getBadgeColor(type)}`}>{type}</span>
          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${getStatusColor(status)}`}>{status}</span>
        </div>
        <h4 className={`text-sm truncate font-medium ${active ? 'text-amber-500' : 'text-white'}`}>{title}</h4>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-[#666]">
          <span>{date}</span>
        </div>
      </div>
      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
        <button className="p-1.5 hover:bg-[#222] rounded text-[#888] hover:text-white"><Edit2 className="w-3.5 h-3.5" /></button>
        <button className="p-1.5 hover:bg-[#222] rounded text-[#888] hover:text-white"><Share2 className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            Client Reviews
          </h2>
          <p className="text-sm text-[#888] mt-1">Manage and respond to your client feedback</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Send className="w-4 h-4" /> Request Reviews
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111] border border-[#222] rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#888] font-medium uppercase tracking-wider mb-1">Average Rating</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">4.9</span>
              <span className="text-amber-500 text-lg">★</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
          </div>
        </div>
        <div className="bg-[#111] border border-[#222] rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#888] font-medium uppercase tracking-wider mb-1">Total Reviews</p>
            <span className="text-3xl font-bold text-white">38</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="bg-[#111] border border-[#222] rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#888] font-medium uppercase tracking-wider mb-1">Positive Sentiment</p>
            <span className="text-3xl font-bold text-white">97%</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-medium text-white mb-2">Recent Reviews</h3>
          
          <ReviewCard name="Emma Rodriguez" platform="Google" stars={5} date="2 days ago" text="Drake captured our wedding day more beautifully than we could have imagined. He made everyone feel so comfortable, and the final gallery looks like it belongs in a magazine." />
          <ReviewCard name="NovaTech Corp" platform="Facebook" stars={5} date="1 week ago" text="Professional, creative, and delivered on time. The new brand photos have completely elevated our website. Highly recommend for corporate work." />
          <ReviewCard name="Asha Patel" platform="Google" stars={5} date="2 weeks ago" text="Absolutely stunning brand photos! Drake understood exactly what vibe I was going for and nailed it." />
          <ReviewCard name="Marcus Lee" platform="Instagram" stars={4} date="3 weeks ago" text="Great session, very professional. Took a bit longer to get the edits back than expected, but the quality was superb." />
          <ReviewCard name="Priya & Raj" platform="Google" stars={5} date="1 month ago" text="Exceeded every expectation. We will cherish these photos forever." />
          <ReviewCard name="Fernanda Cruz" platform="Google" stars={5} date="1 month ago" text="Worth every penny. The lighting in the shots is just magical." />
        </div>

        {/* Pending Requests */}
        <div>
          <h3 className="text-sm font-medium text-white mb-4">Pending Requests</h3>
          <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
            <div className="divide-y divide-[#1f1f1f]">
              <PendingReviewRow name="Tom & Lisa Chen" date="Sent 3 days ago" />
              <PendingReviewRow name="Diana Mills" date="Sent 5 days ago" />
              <PendingReviewRow name="Zoe & Marcus" date="Sent 1 week ago" />
              <PendingReviewRow name="Alex Kim" date="Sent 2 weeks ago" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ name, platform, stars, date, text }: { name: string, platform: string, stars: number, date: string, text: string }) {
  const getPlatformBadge = () => {
    switch(platform) {
      case 'Google': return 'bg-blue-500 text-white';
      case 'Facebook': return 'bg-blue-600 text-white';
      case 'Instagram': return 'bg-pink-600 text-white';
      default: return 'bg-stone-500 text-white';
    }
  };

  return (
    <div className="bg-[#111] border border-[#222] rounded-xl p-5 flex flex-col gap-3 group hover:border-[#444] transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center font-bold text-white text-sm">
            {name[0]}
          </div>
          <div>
            <h4 className="font-medium text-white text-sm">{name}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${getPlatformBadge()}`}>{platform}</span>
              <span className="text-[10px] text-[#666]">{date}</span>
            </div>
          </div>
        </div>
        <div className="flex text-amber-500 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < stars ? '★' : <span className="text-[#333]">★</span>}</span>
          ))}
        </div>
      </div>
      <p className="text-sm text-[#aaa] leading-relaxed mt-1">"{text}"</p>
      <div className="flex gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-xs font-medium text-white hover:text-amber-500">Reply</button>
        <button className="text-xs font-medium text-[#888] hover:text-white">Share</button>
      </div>
    </div>
  );
}

function PendingReviewRow({ name, date }: { name: string, date: string }) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-[#141414] transition-colors">
      <div>
        <h4 className="text-sm font-medium text-white">{name}</h4>
        <p className="text-xs text-[#888] mt-0.5">{date}</p>
      </div>
      <button className="px-3 py-1.5 bg-[#1a1a1a] border border-[#333] hover:border-amber-500 text-xs font-medium text-white rounded transition-colors">
        Resend
      </button>
    </div>
  );
}

function SettingsTab() {
  const [activeSection, setActiveSection] = useState<'profile' | 'branding' | 'integrations' | 'billing' | 'notifications'>('profile');
  const [autoGallery, setAutoGallery] = useState(true);
  const [contractReminders, setContractReminders] = useState(true);
  const [reviewAuto, setReviewAuto] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-6">Settings</h2>

      <div className="flex gap-6 border-b border-[#1f1f1f] mb-8">
        {([
          { key: 'profile', label: 'Profile' },
          { key: 'branding', label: 'Branding' },
          { key: 'integrations', label: 'Integrations' },
          { key: 'billing', label: 'Billing' },
          { key: 'notifications', label: 'Notifications' },
        ] as const).map(s => (
          <button key={s.key} onClick={() => setActiveSection(s.key)} className={`pb-3 border-b-2 text-sm font-medium transition-colors ${activeSection === s.key ? 'border-amber-500 text-amber-500' : 'border-transparent text-[#888] hover:text-white'}`}>{s.label}</button>
        ))}
      </div>

      {activeSection === 'profile' && (
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-bold text-3xl text-black">DR</div>
            <div>
              <div className="flex gap-3 mb-2">
                <button className="bg-[#1a1a1a] border border-[#333] hover:bg-[#222] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"><Upload className="w-4 h-4" /> Upload Photo</button>
                <button className="text-red-500 hover:text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Remove</button>
              </div>
              <p className="text-xs text-[#666]">Recommended: Square JPG, PNG. Max 2MB.</p>
            </div>
          </div>
          <div className="h-px bg-[#1f1f1f]"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-xs text-[#888] font-medium">Display Name</label><input type="text" defaultValue="Drake Reynolds" className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500" /></div>
            <div className="space-y-2"><label className="text-xs text-[#888] font-medium">Studio Name</label><input type="text" defaultValue="Drake Reynolds Photography" className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500" /></div>
            <div className="space-y-2"><label className="text-xs text-[#888] font-medium">Email Address</label><input type="email" defaultValue="hello@drakereynolds.com" className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500" /></div>
            <div className="space-y-2"><label className="text-xs text-[#888] font-medium">Phone Number</label><input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500" /></div>
            <div className="col-span-1 md:col-span-2 space-y-2"><label className="text-xs text-[#888] font-medium">Website URL</label><input type="url" defaultValue="https://drakereynolds.com" className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500" /></div>
            <div className="col-span-1 md:col-span-2 space-y-2"><label className="text-xs text-[#888] font-medium">Bio</label><textarea className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 min-h-[100px] resize-none" defaultValue="Documentary-style wedding and commercial photographer based in Los Angeles. Specializing in film aesthetic and authentic moments."></textarea></div>
          </div>
          <div className="pt-2 flex justify-end"><button className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors">Save Changes</button></div>
        </div>
      )}

      {activeSection === 'branding' && (
        <div className="space-y-8 max-w-2xl">
          <div>
            <label className="text-xs text-[#888] font-medium block mb-3">Brand Color</label>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-amber-500 border-2 border-white/20 shadow-lg"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-[#aaa]">#f59e0b</span>
                <button className="text-xs text-[#888] hover:text-white underline transition-colors">Change</button>
              </div>
            </div>
          </div>
          <div className="h-px bg-[#1f1f1f]"></div>
          <div>
            <label className="text-xs text-[#888] font-medium block mb-3">Client Gallery Logo</label>
            <div className="w-full max-w-sm h-32 border-2 border-dashed border-[#333] bg-[#111] hover:border-amber-500/50 rounded-lg flex flex-col items-center justify-center text-[#666] cursor-pointer transition-colors">
              <Upload className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Drop logo here</span>
              <span className="text-xs mt-1">SVG or PNG (transparent bg)</span>
            </div>
          </div>
          <div>
            <label className="text-xs text-[#888] font-medium block mb-3">Gallery Watermark</label>
            <div className="flex items-center gap-3 p-4 bg-[#141414] border border-[#222] rounded-xl">
              <div className="flex-1">
                <p className="text-sm text-white font-medium">Auto-watermark delivered galleries</p>
                <p className="text-xs text-[#555] mt-0.5">Applies your logo to exported full-res images</p>
              </div>
              <div className="w-10 h-6 bg-amber-500 rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto shadow"></div>
              </div>
            </div>
          </div>
          <div className="pt-2 flex justify-end"><button className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors">Save Branding</button></div>
        </div>
      )}

      {activeSection === 'integrations' && (
        <div className="space-y-4 max-w-2xl">
          {[
            { name: 'HoneyBook', desc: 'Contracts, invoices, and client portal', connected: true },
            { name: 'Google Calendar', desc: 'Sync shoots and client meetings', connected: true },
            { name: 'Pixieset', desc: 'Gallery delivery and proofing', connected: false },
            { name: 'Stripe', desc: 'Online payments and invoicing', connected: true },
            { name: 'Zapier', desc: 'Connect with 3,000+ apps', connected: false },
          ].map(int => (
            <div key={int.name} className="flex items-center justify-between p-4 bg-[#141414] border border-[#222] rounded-xl">
              <div>
                <p className="text-sm font-bold text-white">{int.name}</p>
                <p className="text-xs text-[#555]">{int.desc}</p>
              </div>
              <button className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${int.connected ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' : 'bg-[#222] border border-[#333] text-[#888] hover:text-white hover:border-amber-500/30'}`}>
                {int.connected ? 'Connected' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'billing' && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Camera className="w-6 h-6 text-amber-500" /></div>
                <div>
                  <p className="text-sm font-bold text-white">Pro Plan</p>
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
              <button className="text-xs text-amber-500 hover:text-amber-400 font-bold transition-colors">Update</button>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'notifications' && (
        <div className="space-y-4 max-w-2xl">
          {[
            { label: 'New Inquiry Alert', desc: 'Notify me when a new lead contacts me', value: autoGallery, set: setAutoGallery },
            { label: 'Contract Reminders', desc: 'Reminder when unsigned contracts are overdue', value: contractReminders, set: setContractReminders },
            { label: 'Auto Review Requests', desc: 'Send Google review link after gallery delivery', value: reviewAuto, set: setReviewAuto },
            { label: 'Weekly Report', desc: 'Email summary of bookings and revenue every Monday', value: weeklyReport, set: setWeeklyReport },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-4 bg-[#141414] border border-[#222] rounded-xl">
              <div>
                <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                <p className="text-xs text-[#555]">{item.desc}</p>
              </div>
              <button onClick={() => item.set(v => !v)} className={`w-10 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${item.value ? 'bg-amber-500' : 'bg-[#333]'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-all ${item.value ? 'ml-auto' : 'ml-0'}`}></div>
              </button>
            </div>
          ))}
          <div className="pt-4 flex justify-end"><button className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors">Save Preferences</button></div>
        </div>
      )}
    </div>
  );
}


// ---- Shared Subcomponents from Original Tab ----

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${
        active 
          ? 'bg-amber-500/10 text-amber-500 relative' 
          : 'text-[#888] hover:text-white hover:bg-[#141414]'
      }`}
    >
      {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-500 rounded-r"></div>}
      <div className={`[&>svg]:w-5 [&>svg]:h-5 ${active ? '' : 'group-hover:text-white'}`}>
        {icon}
      </div>
      <span className="font-medium text-sm hidden lg:block">{label}</span>
    </div>
  );
}

function QuickStatChip({ label, alert }: { label: string, alert?: boolean }) {
  return (
    <div className={`px-3 py-1.5 rounded border text-xs flex items-center gap-2 ${
      alert ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-[#141414] border-[#222] text-[#aaa]'
    }`}>
      {alert && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-amber"></span>}
      <span className="font-medium">{label}</span>
    </div>
  );
}

function KpiCard({ title, value, subtitle, trend, trendPositive, icon, valueColor = "text-white" }: { title: string, value: string, subtitle?: string, trend?: string, trendPositive?: boolean, icon: React.ReactNode, valueColor?: string }) {
  return (
    <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-5 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-[#888] text-sm font-medium">{title}</h3>
        {icon}
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-bold ${valueColor}`}>{value}</span>
          {subtitle && <span className="text-[#666] text-xs pb-1">{subtitle}</span>}
        </div>
        {trend && (
          <div className={`text-xs mt-1 font-medium ${trendPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}

function Widget({ title, icon, badge, badgeColor = "bg-amber-500 text-black", children }: { title: string, icon?: React.ReactNode, badge?: string, badgeColor?: string, children: React.ReactNode }) {
  return (
    <div className="bg-[#111] border border-[#1f1f1f] rounded-xl flex flex-col h-full overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1f1f1f] flex items-center gap-2 flex-shrink-0">
        {icon}
        <h3 className="font-semibold text-white text-sm">{title}</h3>
        {badge && (
          <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-sm ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col min-h-[300px]">
        {children}
      </div>
    </div>
  );
}

function BookingCard({ time, name, location, duration, price, status, avatarColor, initials }: any) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-lg p-3 flex gap-3 hover:border-[#444] transition-colors cursor-pointer">
      <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center font-bold text-white text-xs flex-shrink-0`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-medium text-white text-sm truncate pr-2">{name}</h4>
          <span className="text-xs font-semibold text-white whitespace-nowrap">{time}</span>
        </div>
        <div className="flex items-center gap-2 text-[#888] text-xs mb-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#222]">
          <div className="flex gap-2">
            <span className="bg-[#222] px-1.5 py-0.5 rounded text-[10px] font-medium text-[#aaa]">{duration}</span>
            <span className="bg-[#222] px-1.5 py-0.5 rounded text-[10px] font-medium text-[#aaa]">{price}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'Confirmed' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <span className={`text-[10px] font-medium ${status === 'Confirmed' ? 'text-green-500' : 'text-amber-500'}`}>{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ color, title, desc, action }: { color: 'amber'|'blue'|'purple'|'green'|'red', title: string, desc: string, action: string }) {
  const colors = {
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-500', btn: 'bg-amber-500 hover:bg-amber-600 text-black' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-500', btn: 'bg-blue-500 hover:bg-blue-600 text-white' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-500', btn: 'bg-purple-500 hover:bg-purple-600 text-white' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-500', btn: 'bg-green-500 hover:bg-green-600 text-white' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-500', btn: 'bg-red-500 hover:bg-red-600 text-white' },
  };
  const c = colors[color];

  return (
    <div className={`border rounded-lg p-3 flex justify-between items-center gap-3 transition-colors ${c.bg} ${c.border} hover:border-opacity-50`}>
      <div className="min-w-0">
        <h4 className={`text-sm font-medium mb-0.5 truncate ${c.text}`}>{title}</h4>
        <p className="text-[11px] text-[#888] truncate">{desc}</p>
      </div>
      <button className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${c.btn}`}>
        {action}
      </button>
    </div>
  );
}

function PipelineCol({ title, count, children }: { title: string, count: number, children?: React.ReactNode }) {
  return (
    <div className="neo-kanban-col flex flex-col snap-start">
      <div className="flex items-center justify-between mb-3 px-1">
        <h4 className="text-sm font-medium text-[#aaa]">{title}</h4>
        <span className="bg-[#222] text-[#888] text-[10px] font-bold px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="space-y-2 flex-1">
        {children}
        {(!children || React.Children.count(children) === 0) && (
          <div className="border border-dashed border-[#222] rounded-lg h-24 flex items-center justify-center text-[#444] text-xs font-medium">
            Empty
          </div>
        )}
      </div>
    </div>
  );
}

function LeadCard({ name, type, price, time, initial, color, isHot }: any) {
  return (
    <div className="bg-[#141414] border border-[#222] hover:border-[#444] rounded-lg p-3 cursor-pointer transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-white text-[10px] font-bold`}>
            {initial}
          </div>
          <div>
            <h4 className="text-sm font-medium text-white leading-tight">{name}</h4>
            <span className="text-[10px] text-[#888]">{type}</span>
          </div>
        </div>
        {isHot && (
          <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-bold px-1 py-0.5 rounded">HOT</span>
        )}
      </div>
      <div className="flex justify-between items-end mt-3">
        <p className="text-xs font-semibold text-white">{price}</p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#666]">{time}</span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 hover:bg-[#222] rounded text-[#888] hover:text-white"><MessageSquare className="w-3 h-3" /></button>
            <button className="p-1 hover:bg-[#222] rounded text-[#888] hover:text-white"><MoreHorizontal className="w-3 h-3" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialStatus({ platform, handle, stats }: { platform: string, handle: string, stats: string }) {
  const getIcon = () => {
    switch(platform) {
      case 'Instagram': return <div className="w-8 h-8 rounded bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center"><Camera className="w-4 h-4 text-white" /></div>;
      case 'Facebook': return <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>;
      case 'TikTok': return <div className="w-8 h-8 rounded bg-black border border-[#333] flex items-center justify-center"><Film className="w-4 h-4 text-white" /></div>;
      case 'LinkedIn': return <div className="w-8 h-8 rounded bg-blue-700 flex items-center justify-center"><BriefcaseIcon className="w-4 h-4 text-white" /></div>;
      default: return <div className="w-8 h-8 rounded bg-stone-800 flex items-center justify-center"><Share2 className="w-4 h-4 text-white" /></div>;
    }
  };

  return (
    <div className="flex items-center justify-between p-2 hover:bg-[#141414] rounded-lg transition-colors cursor-pointer group">
      <div className="flex items-center gap-3">
        {getIcon()}
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-medium text-white">{platform}</h4>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          </div>
          <p className="text-[11px] text-[#888]">{handle}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-medium text-white">{stats}</p>
        <span className="text-[10px] text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">View Analytics</span>
      </div>
    </div>
  );
}

function ScheduledPost({ time, platform, text, thumbColor }: { time: string, platform: string, text: string, thumbColor: string }) {
  return (
    <div className="flex gap-3 p-2 hover:bg-[#141414] rounded-lg transition-colors cursor-pointer">
      <div className={`w-12 h-12 rounded ${thumbColor} flex-shrink-0 border border-white/5`}></div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#222] text-[#aaa]">{platform}</span>
            <span className="text-xs text-amber-500 font-medium">{time}</span>
          </div>
          <button className="text-[#666] hover:text-white"><MoreHorizontal className="w-3 h-3" /></button>
        </div>
        <p className="text-xs text-white truncate">{text}</p>
      </div>
    </div>
  );
}

function ModelCard({ name, courses, progress }: { name: string, courses: number, progress: number }) {
  return (
    <div className="bg-[#141414] border border-[#222] p-3 rounded-lg flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#333] flex items-center justify-center font-bold text-white text-[10px]">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <h4 className="font-medium text-white text-sm">{name}</h4>
        </div>
        <span className="text-[10px] text-[#888] bg-[#222] px-1.5 py-0.5 rounded">{courses} courses</span>
      </div>
      <div>
        <div className="flex justify-between text-[10px] mb-1">
          <span className="text-[#666]">Progress</span>
          <span className="text-amber-500 font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-[#222] rounded-full h-1">
          <div className="bg-amber-500 h-1 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function CourseItem({ title, lessons, enrolled }: { title: string, lessons: number, enrolled: number }) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-[#141414] rounded-lg transition-colors cursor-pointer group">
      <div>
        <h4 className="text-sm font-medium text-white mb-0.5">{title}</h4>
        <div className="flex gap-2 text-[10px] text-[#888]">
          <span>{lessons} lessons</span>
          <span>&bull;</span>
          <span>{enrolled} enrolled</span>
        </div>
      </div>
      <button className="text-[10px] font-medium bg-[#222] hover:bg-amber-500 hover:text-black text-white px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100">
        Assign
      </button>
    </div>
  );
}

function MessageRow({ name, text, time, unread, initial, color }: any) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-[#141414] rounded-lg transition-colors cursor-pointer group">
      <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center font-bold text-white text-xs flex-shrink-0 relative`}>
        {initial}
        {unread && <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-[#111]"></div>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <h4 className={`text-sm truncate pr-2 ${unread ? 'font-semibold text-white' : 'font-medium text-[#aaa]'}`}>{name}</h4>
          <span className={`text-[10px] whitespace-nowrap ${unread ? 'text-amber-500 font-medium' : 'text-[#666]'}`}>{time}</span>
        </div>
        <p className={`text-xs truncate ${unread ? 'text-[#ccc]' : 'text-[#666]'}`}>{text}</p>
      </div>
    </div>
  );
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
