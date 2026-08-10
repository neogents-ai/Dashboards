import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Copy,
  DollarSign,
  Eye,
  LogOut,
  MousePointer,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useCountUp } from "../../../hooks/useCountUp";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function api(path: string) {
  return `${API_BASE}/api${path}`;
}

function normalizeAffiliate(raw: Record<string, any>): Affiliate {
  const code = raw.referral_code || raw.referralCode || '';
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    phone: raw.phone || null,
    how: raw.how || '',
    referralCode: code,
    createdAt: raw.created_at || raw.createdAt,
    status: raw.status,
    referralUrl: `https://neogents.tech/?ref=${code}`,
  };
}

function normalizeConversion(raw: Record<string, any>): Conversion {
  return {
    id: raw.id,
    affiliateId: raw.affiliate_id || raw.affiliateId,
    referralCode: raw.referral_code || raw.referralCode,
    customerEmail: raw.customer_email || raw.customerEmail,
    customerName: raw.customer_name || raw.customerName || null,
    plan: raw.plan,
    commission: raw.commission,
    status: raw.status,
    createdAt: raw.created_at || raw.createdAt,
    paidAt: raw.paid_at || raw.paidAt || null,
  };
}

interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  how: string;
  referralCode: string;
  createdAt: string;
  status: "pending" | "active" | "inactive";
  referralUrl: string;
}

interface AdminStats {
  totalAffiliates: number;
  activeAffiliates: number;
  pendingAffiliates: number;
  totalClicks: number;
  totalConversions: number;
  totalPaid: number;
  pendingPayout: number;
}

interface Conversion {
  id: string;
  affiliateId: string;
  referralCode: string;
  customerEmail: string;
  customerName: string | null;
  plan: "Starter" | "Pro" | "Agency" | "Custom";
  commission: number;
  status: "pending" | "paid";
  createdAt: string;
  paidAt: string | null;
}

function LoginView({ onLogin }: { onLogin: (token: string) => void }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    setLoading(true);
    setError("");
    // The token itself is validated by the backend on every request.
    // We just store it locally and let the first fetch prove it.
    setTimeout(() => {
      setLoading(false);
      onLogin(token.trim());
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#A78BFA]/10 via-transparent to-transparent" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-[#A78BFA] text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3" /> Affiliate Admin
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Affiliate Ops</h1>
          <p className="text-white/50 text-sm">Enter your admin token to manage affiliates and payouts.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 space-y-4"
        >
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <div>
            <label className="block text-sm text-white/70 mb-2 font-medium">Admin Token</label>
            <input
              type="password"
              placeholder="••••••••••••"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#A78BFA] text-sm transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#A78BFA] hover:bg-[#9061F9] disabled:opacity-50 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Clock className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
            {loading ? "Checking..." : "Open Dashboard"}
          </button>
          <p className="text-xs text-white/30 text-center">
            Token is set in your deployment environment as <code className="text-white/50">AFFILIATE_ADMIN_TOKEN</code>.
          </p>
        </form>

        <div className="mt-6 text-center">
          <a href="#/" className="text-sm text-white/40 hover:text-white/70 transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

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
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className={`w-10 h-10 rounded-xl ${accent} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-white/50">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    inactive: "bg-red-500/10 text-red-400 border-red-500/20",
    paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
  const icons: Record<string, React.ElementType> = {
    pending: Clock,
    active: CheckCircle2,
    inactive: XCircle,
    paid: CheckCircle2,
  };
  const Icon = icons[status] || Clock;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${styles[status]}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function AffiliateAdmin() {
  const [token, setToken] = useState<string | null>(() => {
    return typeof window !== "undefined" ? localStorage.getItem("neogents_admin_token") : null;
  });
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStatsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [affRes, statsRes] = await Promise.all([
        fetch(api("/affiliates"), { headers }),
        fetch(api("/affiliates/stats/admin"), { headers }),
      ]);

      if (affRes.status === 401 || statsRes.status === 401) {
        localStorage.removeItem("neogents_admin_token");
        setToken(null);
        setError("Invalid admin token. Please log in again.");
        setLoading(false);
        return;
      }

      const affData = await affRes.json();
      const statsData = await statsRes.json();

      if (affData.success) setAffiliates((affData.affiliates || []).map(normalizeAffiliate));
      if (statsData.success) {
        setStats(statsData.stats);
        setConversions((statsData.conversions || []).map(normalizeConversion));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleLogin = (newToken: string) => {
    localStorage.setItem("neogents_admin_token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("neogents_admin_token");
    setToken(null);
  };

  const updateStatus = async (id: string, status: Affiliate["status"]) => {
    if (!token) return;
    try {
      const res = await fetch(api(`/affiliates/${id}/status`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      setAffiliates((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  const markPaid = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(api(`/affiliates/conversion/${id}/paid`), {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Mark paid failed");
      setConversions((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "paid" as const, paidAt: new Date().toISOString() } : c))
      );
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mark paid failed");
    }
  };

  const copy = (text: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredAffiliates = useMemo(() => {
    const q = search.toLowerCase();
    return affiliates.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.referralCode.toLowerCase().includes(q)
    );
  }, [affiliates, search]);

  if (!token) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            <span className="font-semibold text-sm">NEO Gents</span>
            <span className="text-white/20 mx-2">|</span>
            <span className="text-xs text-white/50">Affiliate Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        {stats ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Affiliates"
              value={useCountUp(stats.totalAffiliates, statsVisible, 1000).toLocaleString()}
              icon={Users}
              accent="bg-[#A78BFA]/20"
              delay={0}
            />
            <StatCard
              label="Active Affiliates"
              value={useCountUp(stats.activeAffiliates, statsVisible, 1000).toLocaleString()}
              icon={CheckCircle2}
              accent="bg-emerald-500/20"
              delay={100}
            />
            <StatCard
              label="Total Clicks"
              value={useCountUp(stats.totalClicks, statsVisible, 1500).toLocaleString()}
              icon={MousePointer}
              accent="bg-sky-500/20"
              delay={200}
            />
            <StatCard
              label="Total Conversions"
              value={useCountUp(stats.totalConversions, statsVisible, 1500).toLocaleString()}
              icon={TrendingUp}
              accent="bg-amber-500/20"
              delay={300}
            />
          </div>
        ) : null}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A78BFA]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#A78BFA]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Affiliates</h2>
                  <p className="text-sm text-white/50">Manage signups, codes, and status</p>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search affiliates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#A78BFA]"
                />
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-white/40 text-sm">Loading affiliates...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Code</th>
                      <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredAffiliates.map((a) => (
                      <tr key={a.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm text-white font-medium">{a.name}</p>
                          <p className="text-xs text-white/40">{a.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <code className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">{a.referralCode}</code>
                            <button
                              onClick={() => copy(a.referralUrl, a.id)}
                              className="text-white/30 hover:text-white/70"
                            >
                              {copied === a.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={a.status}
                            onChange={(e) => updateStatus(a.id, e.target.value as Affiliate["status"])}
                            className="bg-white/5 border border-white/10 rounded-lg text-xs text-white px-2 py-1 focus:outline-none focus:border-[#A78BFA]"
                          >
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/60 whitespace-nowrap">
                          {new Date(a.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Payouts</h2>
                  <p className="text-sm text-white/50">Pending vs. paid commissions</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {stats ? (
                <>
                  <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4 text-center">
                    <p className="text-xs text-emerald-400/70 uppercase tracking-wider mb-1">Total Paid</p>
                    <p className="text-3xl font-bold text-white">${stats.totalPaid.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-4 text-center">
                    <p className="text-xs text-amber-400/70 uppercase tracking-wider mb-1">Pending Payout</p>
                    <p className="text-2xl font-bold text-white">${stats.pendingPayout.toLocaleString()}</p>
                  </div>
                </>
              ) : null}

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Recent Conversions</h3>
                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                  {conversions.slice(0, 20).map((c) => (
                    <div key={c.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{c.customerName || c.customerEmail}</span>
                        <StatusBadge status={c.status} />
                      </div>
                      <p className="text-xs text-white/40 mb-2">
                        {c.plan} · ${c.commission} · {c.referralCode}
                      </p>
                      {c.status === "pending" ? (
                        <button
                          onClick={() => markPaid(c.id)}
                          className="w-full py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                        >
                          Mark Paid
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
