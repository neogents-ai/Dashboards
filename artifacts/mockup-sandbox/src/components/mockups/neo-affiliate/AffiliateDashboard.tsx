import { useState, useEffect } from 'react';
import {
  DollarSign,
  Users,
  MousePointer,
  TrendingUp,
  Copy,
  Check,
  Wallet,
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  LogOut,
  Sparkles,
  Link2,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
} from 'lucide-react';
import { useCountUp } from '../../../hooks/useCountUp';

/* ─── Mock Data ─── */
const MOCK_CONVERSIONS = [
  { id: 1, date: '2026-06-05', customer: 'Sarah Jenkins Photography', plan: 'Pro', commission: 190, status: 'paid' as const },
  { id: 2, date: '2026-06-03', customer: 'Elite Barbershop', plan: 'Agency', commission: 286, status: 'pending' as const },
  { id: 3, date: '2026-05-28', customer: 'Glow Aesthetics', plan: 'Starter', commission: 78, status: 'paid' as const },
  { id: 4, date: '2026-05-22', customer: 'Chef Marco Catering', plan: 'Custom', commission: 458, status: 'paid' as const },
  { id: 5, date: '2026-05-18', customer: 'Metro Realty Group', plan: 'Pro', commission: 190, status: 'pending' as const },
  { id: 6, date: '2026-05-12', customer: 'Studio Noir', plan: 'Agency', commission: 286, status: 'paid' as const },
  { id: 7, date: '2026-05-08', customer: 'The Grooming Lounge', plan: 'Starter', commission: 78, status: 'paid' as const },
];

const MOCK_PAYOUTS = [
  { id: 1, date: '2026-06-01', amount: 1012, method: 'PayPal', status: 'completed' as const },
  { id: 2, date: '2026-05-01', amount: 842, method: 'Bank Transfer', status: 'completed' as const },
  { id: 3, date: '2026-04-01', amount: 624, method: 'PayPal', status: 'completed' as const },
  { id: 4, date: '2026-03-01', amount: 458, method: 'Venmo', status: 'completed' as const },
];

/* ─── Types ─── */
type Conversion = typeof MOCK_CONVERSIONS[number];
type Payout = typeof MOCK_PAYOUTS[number];

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: 'paid' | 'pending' | 'completed' | 'failed' }) {
  const styles = {
    paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    failed: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  const labels = { paid: 'Paid', pending: 'Pending', completed: 'Completed', failed: 'Failed' };
  const icons = {
    paid: CheckCircle2,
    pending: Clock,
    completed: CheckCircle2,
    failed: XCircle,
  };
  const Icon = icons[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${styles[status]}`}>
      <Icon className="w-3 h-3" />
      {labels[status]}
    </span>
  );
}

/* ─── Stat Card ─── */
function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  delay = 0,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  accent: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${accent} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs text-white/40 font-medium">+12% this month</span>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-white/50">{label}</p>
    </div>
  );
}

/* ─── Login View ─── */
function LoginView({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(email.trim());
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#A78BFA]/10 via-transparent to-transparent" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-[#A78BFA] text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3" /> Affiliate Portal
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/50 text-sm">Enter your email to access your affiliate dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 space-y-4"
        >
          <div>
            <label className="block text-sm text-white/70 mb-2 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#A78BFA] text-sm transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#A78BFA] hover:bg-[#9061F9] disabled:opacity-50 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Clock className="w-4 h-4 animate-spin" /> Verifying...
              </>
            ) : (
              <>
                Access Dashboard <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-xs text-white/30 text-center">
            We'll send a magic link to your email for secure access.
          </p>
        </form>

        <div className="mt-6 text-center">
          <a href="#/affiliates" className="text-sm text-white/40 hover:text-white/70 transition-colors">
            ← Back to Affiliate Program
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Dashboard View ─── */
function DashboardView({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [copied, setCopied] = useState(false);
  const [referralLink] = useState('https://neogents.tech/?ref=AFF-7X9K2M');
  const [statsVisible, setStatsVisible] = useState(false);
  const [expandedPayout, setExpandedPayout] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setStatsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const totalEarnings = useCountUp(2936, statsVisible, 1500);
  const pendingPayout = useCountUp(476, statsVisible, 1200);
  const totalConversions = useCountUp(24, statsVisible, 1000);
  const totalClicks = useCountUp(1847, statsVisible, 1800);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalPaid = MOCK_PAYOUTS.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ── Top Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            <span className="font-semibold text-sm">NEO Gents</span>
            <span className="text-white/20 mx-2">|</span>
            <span className="text-xs text-white/50">Affiliate Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40 hidden sm:inline">{email}</span>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
            <p className="text-sm text-white/50">Track your referrals, earnings, and payouts in real time.</p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-[#A78BFA] text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Account Active
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Earnings"
            value={`$${totalEarnings.toLocaleString()}`}
            icon={DollarSign}
            accent="bg-emerald-500/20"
            delay={0}
          />
          <StatCard
            label="Pending Payout"
            value={`$${pendingPayout.toLocaleString()}`}
            icon={Wallet}
            accent="bg-amber-500/20"
            delay={100}
          />
          <StatCard
            label="Conversions"
            value={totalConversions.toString()}
            icon={Users}
            accent="bg-[#A78BFA]/20"
            delay={200}
          />
          <StatCard
            label="Total Clicks"
            value={totalClicks.toLocaleString()}
            icon={MousePointer}
            accent="bg-sky-500/20"
            delay={300}
          />
        </div>

        {/* ── Referral Link Generator ── */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#A78BFA]/20 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-[#A78BFA]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Your Referral Link</h2>
              <p className="text-sm text-white/50">Share this link to earn commissions on every signup.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="w-full px-4 py-3 pr-10 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none"
              />
              <Link2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            </div>
            <button
              onClick={copyLink}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#A78BFA] hover:bg-[#9061F9] text-white font-medium text-sm transition-colors min-w-[140px]"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-lg font-bold text-white">60 days</p>
              <p className="text-xs text-white/40">Cookie Duration</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">$78–$458</p>
              <p className="text-xs text-white/40">Per Referral</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">30 days</p>
              <p className="text-xs text-white/40">Payout Time</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Conversion Stats Table ── */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A78BFA]/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#A78BFA]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Conversion History</h2>
                  <p className="text-sm text-white/50">Recent referrals and commission status</p>
                </div>
              </div>
              <button className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider text-right">Commission</th>
                    <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_CONVERSIONS.map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-sm text-white/60 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-white/30" />
                          {c.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{c.customer}</td>
                      <td className="px-6 py-4 text-sm text-white/60">{c.plan}</td>
                      <td className="px-6 py-4 text-sm text-white font-semibold text-right">${c.commission}</td>
                      <td className="px-6 py-4 text-right">
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Payout History ── */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Payout History</h2>
                  <p className="text-sm text-white/50">Your past commission payments</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4 mb-6 text-center">
                <p className="text-xs text-emerald-400/70 uppercase tracking-wider mb-1">Lifetime Payouts</p>
                <p className="text-3xl font-bold text-white">${totalPaid.toLocaleString()}</p>
              </div>

              <div className="space-y-3">
                {MOCK_PAYOUTS.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedPayout(expandedPayout === p.id ? null : p.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-white/50" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">${p.amount.toLocaleString()}</p>
                          <p className="text-xs text-white/40">{p.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={p.status} />
                        {expandedPayout === p.id ? (
                          <ChevronUp className="w-4 h-4 text-white/30" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/30" />
                        )}
                      </div>
                    </button>
                    {expandedPayout === p.id && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="rounded-lg bg-white/5 border border-white/10 p-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/40">Method</span>
                            <span className="text-white">{p.method}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/40">Date</span>
                            <span className="text-white">{p.date}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/40">Reference</span>
                            <span className="text-white font-mono text-xs">PYT-{p.id}X9K2M</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <a
              href="#/affiliates"
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#A78BFA]/30 transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-[#A78BFA]" />
              <div>
                <p className="text-sm font-medium text-white">View Resources</p>
                <p className="text-xs text-white/40">Templates &amp; assets</p>
              </div>
            </a>
            <button className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#A78BFA]/30 transition-colors text-left">
              <Wallet className="w-5 h-5 text-[#A78BFA]" />
              <div>
                <p className="text-sm font-medium text-white">Request Payout</p>
                <p className="text-xs text-white/40">Minimum $100</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#A78BFA]/30 transition-colors text-left">
              <Users className="w-5 h-5 text-[#A78BFA]" />
              <div>
                <p className="text-sm font-medium text-white">Invite Team</p>
                <p className="text-xs text-white/40">Add sub-affiliates</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─── Main Export ─── */
export function AffiliateDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (userEmail: string) => {
    setEmail(userEmail);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return <DashboardView email={email} onLogout={handleLogout} />;
}
