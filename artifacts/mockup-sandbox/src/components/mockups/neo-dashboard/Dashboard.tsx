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
  ChevronRight,
  Plus,
  MoreHorizontal,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Send,
  Mail,
  Smartphone,
  Check,
  Zap
} from 'lucide-react';

export function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <div className="neo-dashboard-container min-h-screen bg-[#09090b] text-white flex overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-[72px] lg:w-[240px] flex-shrink-0 border-r border-[#1f1f1f] bg-[#0d0d0d] flex flex-col justify-between transition-all duration-300 z-10">
        <div>
          <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-3 text-amber-500 font-bold text-xl tracking-tight">
              <Camera className="w-6 h-6" />
              <span className="hidden lg:block">NEO Gents</span>
            </div>
          </div>
          
          <nav className="p-3 space-y-1 mt-4">
            <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeNav === 'dashboard'} onClick={() => setActiveNav('dashboard')} />
            <NavItem icon={<Users />} label="Leads" active={activeNav === 'leads'} onClick={() => setActiveNav('leads')} />
            <NavItem icon={<Calendar />} label="Appointments" active={activeNav === 'appointments'} onClick={() => setActiveNav('appointments')} />
            <NavItem icon={<ImageIcon />} label="Content Studio" active={activeNav === 'content'} onClick={() => setActiveNav('content')} />
            <NavItem icon={<Star />} label="Reviews" active={activeNav === 'reviews'} onClick={() => setActiveNav('reviews')} />
            <NavItem icon={<TrendingUp />} label="Analytics" active={activeNav === 'analytics'} onClick={() => setActiveNav('analytics')} />
          </nav>
        </div>

        <div className="p-3 border-t border-[#1f1f1f] space-y-1">
          <NavItem icon={<Settings />} label="Settings" active={activeNav === 'settings'} onClick={() => setActiveNav('settings')} />
          <div className="mt-2 flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-semibold text-xs flex-shrink-0 text-black">
              DR
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-medium text-white truncate">David Roe</p>
              <p className="text-xs text-[#888] truncate">Lead Photographer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0a0a0c]">
        
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-6 lg:px-8 border-b border-[#1f1f1f] neo-glass-panel sticky top-0 z-20">
          <div className="flex items-center gap-4 text-sm font-medium text-[#888]">
            <span>Thursday, Oct 24</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
              <input 
                type="text" 
                placeholder="Search clients, shoots..." 
                className="bg-[#141414] border border-[#222] rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 w-64 transition-all"
              />
            </div>
            <button className="relative text-[#888] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-[#0a0a0c]"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-8 space-y-8">
          
          {/* Hero Summary */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-light text-white mb-2">
                Good morning, <span className="font-semibold text-amber-500">David</span>.
              </h1>
              <p className="text-[#888] text-sm">Here's what's happening in your studio today.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <QuickStat label="Today's Shoots" value="3" active />
              <QuickStat label="Pending Inquiries" value="7" />
              <QuickStat label="Unread Messages" value="12" alert />
              <QuickStat label="Pending Reviews" value="4" />
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KpiCard title="Monthly Revenue" value="$12,400" trend="+14%" />
            <KpiCard title="Bookings This Month" value="8" trend="+2" />
            <KpiCard title="Avg Review Score" value="4.9" icon={<Star className="w-4 h-4 text-amber-500 fill-amber-500" />} />
            <KpiCard title="Content Published" value="23" trend="On track" trendColor="text-blue-400" />
          </div>

          {/* Grid Layout for Widgets */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Column (Wider) */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Lead Pipeline */}
              <Widget title="Active Pipeline" action={<button className="text-xs font-medium text-amber-500 hover:text-amber-400">View All</button>}>
                <div className="flex overflow-x-auto pb-4 gap-4 -mx-2 px-2 snap-x">
                  <PipelineColumn title="New Inquiry" count={2}>
                    <LeadCard name="Eleanor & James" type="Wedding" value="$4,500" date="Oct 24" />
                    <LeadCard name="Marcus Co." type="Commercial" value="$1,200" date="Oct 23" />
                  </PipelineColumn>
                  <PipelineColumn title="Quoted" count={1}>
                    <LeadCard name="Sophia T." type="Senior Portraits" value="$650" date="Oct 20" />
                  </PipelineColumn>
                  <PipelineColumn title="Booked" count={2}>
                    <LeadCard name="The Miller Family" type="Family Session" value="$450" date="Nov 12" highlight />
                    <LeadCard name="Riverside Tech" type="Corporate Headshots" value="$2,800" date="Nov 15" />
                  </PipelineColumn>
                  <PipelineColumn title="Shot" count={1}>
                    <LeadCard name="Emma & Lucas" type="Wedding" value="$3,800" date="Oct 18" />
                  </PipelineColumn>
                </div>
              </Widget>

              {/* Bottom Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Today's Appointments */}
                <Widget title="Today's Shoots">
                  <div className="space-y-3">
                    <AppointmentCard 
                      time="09:00 AM" 
                      name="Sarah Jenkins" 
                      type="Newborn Session" 
                      location="Studio A" 
                      status="Completed" 
                    />
                    <AppointmentCard 
                      time="02:30 PM" 
                      name="Artisan Coffee" 
                      type="Commercial Brand Shoot" 
                      location="Downtown Roastery" 
                      status="Confirmed" 
                      active
                    />
                    <AppointmentCard 
                      time="05:45 PM" 
                      name="Jessica & Tom" 
                      type="Engagement Session" 
                      location="Botanical Gardens" 
                      status="Pending" 
                    />
                  </div>
                </Widget>

                {/* Content Studio Mini */}
                <Widget title="Content Studio">
                  <div className="space-y-4">
                    <ContentItem type="Instagram" title="Emma's Wedding Teaser" status="Published" time="2h ago" />
                    <ContentItem type="Email" title="Fall Mini Sessions Promo" status="Scheduled" time="Tomorrow, 9AM" />
                    <ContentItem type="SMS" title="Review Request: Miller Family" status="Draft" time="Pending" />
                    <button className="w-full py-2 mt-2 rounded-lg border border-dashed border-[#333] text-[#888] text-sm hover:border-amber-500/50 hover:text-amber-500 transition-colors flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" /> New Content
                    </button>
                  </div>
                </Widget>

              </div>
            </div>

            {/* Right Column (Narrower) */}
            <div className="space-y-6">
              
              {/* AI Action Center */}
              <div className="rounded-xl bg-gradient-to-b from-[#1a1408] to-[#111] border border-[#332200] overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.05)]">
                <div className="px-5 py-4 border-b border-[#332200] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h3 className="font-semibold text-white">AI Action Center</h3>
                </div>
                <div className="p-2 space-y-1">
                  <AIAction text="Draft follow-up for Sarah M. (no response 3 days)" />
                  <AIAction text="Request review from Jake T. (delivered yesterday)" />
                  <AIAction text="Generate IG caption from Emma's wedding gallery" />
                </div>
              </div>

              {/* Recent Conversations */}
              <Widget title="Recent Messages" action={<MessageSquare className="w-4 h-4 text-[#666]" />}>
                <div className="space-y-4">
                  <MessageItem 
                    name="Rachel Green" 
                    message="We loved the sneak peeks! When will the full gallery..." 
                    time="10m ago" 
                    unread 
                  />
                  <MessageItem 
                    name="Michael Chang" 
                    message="Can we reschedule to next weekend? Forecast says rain." 
                    time="1h ago" 
                    unread 
                  />
                  <MessageItem 
                    name="Amanda & Chris" 
                    message="Draft: Here is the final timeline for your big day..." 
                    time="Draft" 
                    isDraft 
                  />
                  <MessageItem 
                    name="Velocity Startup" 
                    message="Invoice paid. Thanks for the quick turnaround!" 
                    time="Yesterday" 
                  />
                </div>
              </Widget>
              
            </div>
            
          </div>
          
          <div className="h-8"></div> {/* Bottom padding */}
        </div>
      </main>
    </div>
  );
}

// Subcomponents

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${
        active 
          ? 'bg-[#1a1a1a] text-amber-500' 
          : 'text-[#888] hover:text-white hover:bg-[#141414]'
      }`}
    >
      <div className={`[&>svg]:w-5 [&>svg]:h-5 ${active ? '' : 'group-hover:text-white'}`}>
        {icon}
      </div>
      <span className="font-medium text-sm hidden lg:block">{label}</span>
    </div>
  );
}

function QuickStat({ label, value, active, alert }: { label: string, value: string, active?: boolean, alert?: boolean }) {
  return (
    <div className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 ${
      active ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
      alert ? 'bg-red-500/10 border-red-500/20 text-red-400' :
      'bg-[#141414] border-[#222] text-[#aaa]'
    }`}>
      {alert && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
      <span className="font-semibold">{value}</span>
      <span>{label}</span>
    </div>
  );
}

function KpiCard({ title, value, trend, trendColor = 'text-green-400', icon }: { title: string, value: string, trend?: string, trendColor?: string, icon?: React.ReactNode }) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-xl p-5">
      <div className="text-[#888] text-xs font-medium uppercase tracking-wider mb-2 flex items-center justify-between">
        {title}
      </div>
      <div className="flex items-end gap-3">
        <div className="text-2xl font-semibold text-white flex items-center gap-1">
          {value}
          {icon && <span className="ml-1">{icon}</span>}
        </div>
        {trend && (
          <div className={`text-xs font-medium mb-1 ${trendColor}`}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}

function Widget({ title, children, action }: { title: string, children: React.ReactNode, action?: React.ReactNode }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-xl flex flex-col h-full overflow-hidden">
      <div className="px-5 py-4 border-b border-[#222] flex items-center justify-between">
        <h3 className="font-semibold text-white">{title}</h3>
        {action}
      </div>
      <div className="p-5 flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function PipelineColumn({ title, count, children }: { title: string, count: number, children: React.ReactNode }) {
  return (
    <div className="neo-kanban-col flex-shrink-0 snap-start">
      <div className="flex items-center justify-between mb-3 px-1">
        <h4 className="text-sm font-medium text-[#aaa]">{title}</h4>
        <span className="text-xs font-semibold bg-[#222] text-[#888] px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function LeadCard({ name, type, value, date, highlight }: { name: string, type: string, value: string, date: string, highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-lg border flex flex-col gap-3 cursor-pointer transition-all hover:-translate-y-0.5 ${
      highlight ? 'bg-[#1a150c] border-amber-500/30' : 'bg-[#171717] border-[#2a2a2a] hover:border-[#444]'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h5 className="font-medium text-white text-sm">{name}</h5>
          <p className="text-xs text-[#888] mt-0.5">{type}</p>
        </div>
        <button className="text-[#666] hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center justify-between mt-1 pt-3 border-t border-[#2a2a2a]">
        <div className="text-xs font-medium text-white bg-[#222] px-2 py-1 rounded">{value}</div>
        <div className="text-xs text-[#666]">{date}</div>
      </div>
    </div>
  );
}

function AppointmentCard({ time, name, type, location, status, active }: { time: string, name: string, type: string, location: string, status: string, active?: boolean }) {
  
  const statusColors = {
    'Confirmed': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    'Pending': 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    'Completed': 'text-green-400 bg-green-400/10 border-green-400/20',
  };
  
  const colorClass = statusColors[status as keyof typeof statusColors] || 'text-gray-400 bg-gray-400/10 border-gray-400/20';

  return (
    <div className={`flex items-start gap-4 p-3 rounded-lg border transition-all ${
      active ? 'bg-[#171717] border-amber-500/30 shadow-[inset_2px_0_0_#f59e0b]' : 'bg-[#141414] border-[#222]'
    }`}>
      <div className="w-16 flex-shrink-0 text-center pt-1">
        <div className="text-sm font-semibold text-white">{time.split(' ')[0]}</div>
        <div className="text-[10px] text-[#666] font-medium">{time.split(' ')[1]}</div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h5 className="font-medium text-white text-sm truncate">{name}</h5>
        <div className="text-xs text-[#888] mt-0.5 truncate">{type}</div>
        <div className="flex items-center gap-1 mt-2 text-[#666] text-xs">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{location}</span>
        </div>
      </div>
      
      <div className={`text-[10px] px-2 py-1 rounded-md border font-medium ${colorClass}`}>
        {status}
      </div>
    </div>
  );
}

function AIAction({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors group cursor-pointer">
      <div className="text-sm text-[#ccc] pr-4 line-clamp-1">{text}</div>
      <button className="flex-shrink-0 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-black border border-amber-500/20 px-3 py-1.5 rounded text-xs font-semibold transition-all opacity-80 group-hover:opacity-100 flex items-center gap-1">
        <Zap className="w-3 h-3" />
        Execute
      </button>
    </div>
  );
}

function ContentItem({ type, title, status, time }: { type: 'Instagram' | 'Email' | 'SMS', title: string, status: string, time: string }) {
  const Icon = type === 'Instagram' ? Camera : type === 'Email' ? Mail : Smartphone;
  
  const statusColors = {
    'Published': 'text-green-400',
    'Scheduled': 'text-blue-400',
    'Draft': 'text-[#888]',
  };
  const colorClass = statusColors[status as keyof typeof statusColors];

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 text-[#888]">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-medium text-white truncate">{title}</h5>
        <div className="flex items-center gap-2 mt-0.5 text-xs">
          <span className={`font-medium ${colorClass}`}>{status}</span>
          <span className="text-[#444]">•</span>
          <span className="text-[#666]">{time}</span>
        </div>
      </div>
    </div>
  );
}

function MessageItem({ name, message, time, unread, isDraft }: { name: string, message: string, time: string, unread?: boolean, isDraft?: boolean }) {
  return (
    <div className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#1a1a1a] transition-colors cursor-pointer group">
      <div className="relative mt-1">
        <div className="w-8 h-8 rounded-full bg-[#222] border border-[#333] flex items-center justify-center text-xs font-semibold text-[#888]">
          {name.charAt(0)}
        </div>
        {unread && <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-[#111]"></div>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h5 className={`text-sm truncate ${unread ? 'font-semibold text-white' : 'font-medium text-[#ccc]'}`}>{name}</h5>
          <span className={`text-[10px] ${isDraft ? 'text-amber-500' : 'text-[#666]'}`}>{time}</span>
        </div>
        <p className={`text-xs mt-0.5 line-clamp-1 ${isDraft ? 'text-amber-500/70' : unread ? 'text-[#aaa]' : 'text-[#666]'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}
