import React, { useState } from 'react';
import './_group.css';
import { 
  Camera, 
  Users, 
  Calendar, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Settings,
  LayoutDashboard,
  Bell,
  Search,
  Image as ImageIcon,
  Share2,
  GraduationCap,
  Film,
  Zap,
  Sparkles,
  MapPin,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

export function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activePreset, setActivePreset] = useState('Film Noir');

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
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto space-y-6">
            
            {/* ROW 1: KPI Strip (4 cols) */}
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

            {/* ROW 2: 3 Columns (4+4+4) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Col 1: AI Gallery Sorter */}
              <div className="lg:col-span-4 flex flex-col">
                <Widget 
                  title="AI Image Sort" 
                  icon={<Sparkles className="w-4 h-4 text-amber-500" />} 
                  badge="BETA"
                >
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {/* Simulated photos */}
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

              {/* Col 2: Today's Bookings */}
              <div className="lg:col-span-4 flex flex-col">
                <Widget 
                  title="Today's Schedule" 
                  icon={<Calendar className="w-4 h-4 text-[#888]" />}
                >
                  <div className="flex flex-col h-full space-y-3">
                    <BookingCard 
                      time="9:00 AM" 
                      name="Emma & Jake Wedding" 
                      location="Riverside Gardens" 
                      duration="6hr" 
                      price="$3,800" 
                      status="Confirmed" 
                      avatarColor="bg-purple-500" 
                      initials="EJ" 
                    />
                    <BookingCard 
                      time="2:00 PM" 
                      name="Asha Patel Brand Shoot" 
                      location="Studio B" 
                      duration="2hr" 
                      price="$1,200" 
                      status="Confirmed" 
                      avatarColor="bg-blue-500" 
                      initials="AP" 
                    />
                    <BookingCard 
                      time="6:30 PM" 
                      name="Marcus Lee Headshots" 
                      location="Downtown" 
                      duration="1hr" 
                      price="$450" 
                      status="Pending" 
                      avatarColor="bg-rose-500" 
                      initials="ML" 
                    />
                    
                    <button className="w-full mt-auto border border-dashed border-[#333] hover:border-amber-500/50 hover:text-amber-500 text-[#888] rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                      <Plus className="w-4 h-4" /> New Booking
                    </button>
                  </div>
                </Widget>
              </div>

              {/* Col 3: AI Action Center */}
              <div className="lg:col-span-4 flex flex-col">
                <Widget 
                  title="AI Suggestions" 
                  icon={<Zap className="w-4 h-4 text-amber-500" />}
                >
                  <div className="flex flex-col h-full space-y-2">
                    <ActionCard 
                      color="amber" 
                      title="Follow up with Sarah M." 
                      desc="No response in 3 days" 
                      action="Send Follow-up" 
                    />
                    <ActionCard 
                      color="blue" 
                      title="Request review from Jake T." 
                      desc="Delivered 2 days ago" 
                      action="Send Request" 
                    />
                    <ActionCard 
                      color="purple" 
                      title="Generate IG caption" 
                      desc="Emma's wedding gallery ready" 
                      action="Generate" 
                    />
                    <ActionCard 
                      color="green" 
                      title="Post to Instagram" 
                      desc="3 content items ready to schedule" 
                      action="Schedule" 
                    />
                    <ActionCard 
                      color="red" 
                      title="Unconfirmed: Marcus Lee" 
                      desc="Shoot in 4 hours" 
                      action="Confirm Now" 
                    />
                  </div>
                </Widget>
              </div>

            </div>

            {/* ROW 3: Two columns (7+5) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Lead Pipeline (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <Widget 
                  title="Lead Pipeline" 
                  icon={<Users className="w-4 h-4 text-[#888]" />}
                  badge="45 Total"
                  badgeColor="bg-[#222] text-[#888]"
                >
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

              {/* Right: Social Media Hub (5 cols) */}
              <div className="lg:col-span-5 flex flex-col">
                <Widget 
                  title="Social Media" 
                  icon={<Share2 className="w-4 h-4 text-[#888]" />}
                >
                  <div className="space-y-5">
                    {/* Platforms */}
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
                        <ScheduledPost 
                          time="Tonight 8PM" 
                          platform="Instagram" 
                          text="Emma & Jake's ceremony golden hour shots..." 
                          thumbColor="bg-amber-700/50" 
                        />
                        <ScheduledPost 
                          time="Tomorrow 10AM" 
                          platform="Facebook" 
                          text="Behind the scenes: NovaTech brand shoot" 
                          thumbColor="bg-blue-900/50" 
                        />
                        <ScheduledPost 
                          time="Thu 6PM" 
                          platform="TikTok" 
                          text="POV: shooting a wedding in 35mm film style" 
                          thumbColor="bg-stone-700/50" 
                        />
                      </div>
                    </div>
                  </div>
                </Widget>
              </div>

            </div>

            {/* ROW 4: Two columns (5+7) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Model Development Hub (5 cols) */}
              <div className="lg:col-span-5 flex flex-col">
                <Widget 
                  title="Model Development" 
                  icon={<GraduationCap className="w-4 h-4 text-[#888]" />}
                >
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

              {/* Right: Recent Conversations (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <Widget 
                  title="Messages" 
                  icon={<MessageSquare className="w-4 h-4 text-[#888]" />}
                  badge="12"
                  badgeColor="bg-amber-500 text-black"
                >
                  <div className="flex flex-col h-full">
                    <div className="space-y-1 flex-1">
                      <MessageRow 
                        name="Emma Rodriguez" 
                        text="Thank you so much!! The photos are..." 
                        time="2m ago" 
                        unread 
                        initial="E" 
                        color="bg-purple-500" 
                      />
                      <MessageRow 
                        name="NovaTech Corp" 
                        text="We'd love to move forward with the..." 
                        time="1h ago" 
                        unread 
                        initial="N" 
                        color="bg-blue-500" 
                      />
                      <MessageRow 
                        name="Marcus Lee" 
                        text="Can we reschedule to 7pm instead?" 
                        time="3h ago" 
                        unread 
                        initial="M" 
                        color="bg-rose-500" 
                      />
                      <MessageRow 
                        name="Priya Sharma" 
                        text="Hi! I found you on Instagram and I..." 
                        time="5h ago" 
                        initial="P" 
                        color="bg-emerald-500" 
                      />
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
        </div>
      </main>
    </div>
  );
}

// ---- Subcomponents ----

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
      <div className="px-5 py-4 border-b border-[#1f1f1f] flex items-center gap-2">
        {icon}
        <h3 className="font-semibold text-white text-sm">{title}</h3>
        {badge && (
          <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-sm ${badgeColor}`}>
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

function BookingCard({ time, name, location, duration, price, status, avatarColor, initials }: any) {
  const isConfirmed = status === 'Confirmed';
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-[#1f1f1f] bg-[#141414]">
      <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-0.5">
          <h5 className="font-medium text-sm text-white truncate">{name}</h5>
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${isConfirmed ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
            {status}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#666]">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {time}</span>
          <span className="flex items-center gap-1 truncate"><MapPin className="w-3 h-3" /> {location}</span>
          <span>{duration}</span>
          <span className="text-[#888] font-medium">{price}</span>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ color, title, desc, action }: { color: string, title: string, desc: string, action: string }) {
  const colorMap: any = {
    amber: 'border-l-amber-500 hover:bg-amber-500/5',
    blue: 'border-l-blue-500 hover:bg-blue-500/5',
    purple: 'border-l-purple-500 hover:bg-purple-500/5',
    green: 'border-l-green-500 hover:bg-green-500/5',
    red: 'border-l-red-500 hover:bg-red-500/5',
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#141414] border-y border-r border-[#1f1f1f] border-l-2 rounded-r-lg transition-colors ${colorMap[color]}`}>
      <div>
        <h5 className="text-sm font-medium text-white">{title}</h5>
        <p className="text-xs text-[#888] mt-0.5">{desc}</p>
      </div>
      <button className="text-xs font-semibold bg-[#222] hover:bg-[#333] text-white px-3 py-1.5 rounded transition-colors whitespace-nowrap">
        {action}
      </button>
    </div>
  );
}

function PipelineCol({ title, count, children }: { title: string, count: number, children?: React.ReactNode }) {
  return (
    <div className="w-[260px] flex-shrink-0 flex flex-col">
      <div className="flex items-center justify-between mb-3 px-1">
        <h4 className="text-sm font-medium text-[#888]">{title}</h4>
        <span className="text-xs font-semibold bg-[#222] text-[#aaa] px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="space-y-3 flex-1 bg-[#141414]/50 rounded-lg p-2 min-h-[100px]">
        {children}
      </div>
    </div>
  );
}

function LeadCard({ name, type, price, time, initial, color, isHot }: any) {
  return (
    <div className="p-3 bg-[#1c1c1e] border border-[#2a2a2c] rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-white text-[10px] font-bold`}>
            {initial}
          </div>
          <div>
            <h5 className="font-medium text-sm text-white line-clamp-1">{name}</h5>
            <p className="text-[10px] text-[#888]">{type}</p>
          </div>
        </div>
        {isHot && <span className="bg-red-500/20 text-red-500 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">HOT</span>}
      </div>
      <div className="flex items-center justify-between mt-3 text-xs">
        <span className="font-medium text-[#aaa] bg-[#222] px-1.5 py-0.5 rounded">{price}</span>
        <span className="text-[#666]">{time}</span>
      </div>
    </div>
  );
}

function SocialStatus({ platform, handle, stats }: { platform: string, handle: string, stats: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div>
        <div className="flex items-center gap-2">
          <h5 className="text-sm font-medium text-white">{platform}</h5>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
        </div>
        <p className="text-xs text-[#888]">{handle} · {stats}</p>
      </div>
      <span className="text-xs text-[#666]">Connected</span>
    </div>
  );
}

function ScheduledPost({ time, platform, text, thumbColor }: any) {
  return (
    <div className="flex gap-3 items-start p-2 rounded-lg hover:bg-[#141414] transition-colors group">
      <div className={`w-12 h-12 rounded bg-cover ${thumbColor} flex-shrink-0 border border-[#333]`}></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">{time}</span>
            <span className="text-[10px] text-[#888]">{platform}</span>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-[#666] hover:text-white p-1"><Edit2 className="w-3 h-3" /></button>
            <button className="text-[#666] hover:text-red-500 p-1"><Trash2 className="w-3 h-3" /></button>
          </div>
        </div>
        <p className="text-xs text-[#aaa] line-clamp-1">{text}</p>
      </div>
    </div>
  );
}

function ModelCard({ name, courses, progress }: { name: string, courses: number, progress: number }) {
  return (
    <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h5 className="text-sm font-medium text-white">{name}</h5>
          <p className="text-[10px] text-[#888]">{courses} courses enrolled</p>
        </div>
        <span className="text-xs font-medium text-amber-500">{progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

function CourseItem({ title, lessons, enrolled }: { title: string, lessons: number, enrolled: number }) {
  return (
    <div className="flex items-center justify-between p-2 rounded hover:bg-[#141414] transition-colors">
      <div>
        <h5 className="text-xs font-medium text-white">{title}</h5>
        <p className="text-[10px] text-[#666]">{lessons} lessons · {enrolled} enrolled</p>
      </div>
      <button className="text-[10px] font-semibold text-amber-500 hover:text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
        Assign
      </button>
    </div>
  );
}

function MessageRow({ name, text, time, unread, initial, color }: any) {
  return (
    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#141414] cursor-pointer group transition-colors">
      <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}>
        {initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h5 className={`text-sm truncate ${unread ? 'font-semibold text-white' : 'font-medium text-[#aaa]'}`}>
            {name}
          </h5>
          <div className="flex items-center gap-1.5">
            {unread && <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>}
            <span className={`text-[10px] ${unread ? 'text-amber-500' : 'text-[#666]'}`}>{time}</span>
          </div>
        </div>
        <p className={`text-xs truncate ${unread ? 'text-[#ccc]' : 'text-[#666]'}`}>
          {text}
        </p>
      </div>
    </div>
  );
}
