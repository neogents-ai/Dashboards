import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  DollarSign, Users, Share2, QrCode, ArrowRight, CheckCircle2,
  Wallet, BarChart3, Mail, Smartphone, Gift, HelpCircle,
  ChevronDown, ChevronUp, Copy, Check, Sparkles, TrendingUp,
  HandCoins, Network, Megaphone, Briefcase
} from 'lucide-react';
import { useCountUp } from '../../../hooks/useCountUp';

/* ─── Commission Tiers ─── */
const COMMISSION_TIERS = [
  { tier: "Starter", price: 39, commission: 78, monthly: 7, desc: "$39/mo plan" },
  { tier: "Pro", price: 79, commission: 190, monthly: 16, desc: "$79/mo plan" },
  { tier: "Agency", price: 119, commission: 286, monthly: 24, desc: "$119/mo plan" },
  { tier: "Custom", price: 149, commission: 458, monthly: 38, desc: "$149/mo + $500 build" },
];

/* ─── Earnings Calculator ─── */
function EarningsCalculator() {
  const [referrals, setReferrals] = useState(2);
  const [tierIdx, setTierIdx] = useState(2); // default Agency
  const t = COMMISSION_TIERS[tierIdx];
  const perReferral = t.commission;
  const thisMonth = referrals * perReferral;
  const ifKeepPace = thisMonth * 12;

  return (
    <div className="rounded-2xl border border-white/80 bg-white/60 backdrop-blur-xl p-6 md:p-8 max-w-lg mx-auto shadow-lg">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">How Much Will You Make?</h3>
      <div className="mb-6">
        <label className="block text-sm text-slate-500 mb-2">How many businesses will you refer this month?</label>
        <input
          type="range"
          min={1}
          max={20}
          value={referrals}
          onChange={(e) => setReferrals(Number(e.target.value))}
          className="w-full accent-[#3b6bff]"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>1</span>
          <span className="text-slate-900 font-semibold">{referrals}</span>
          <span>20</span>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm text-slate-500 mb-2">Which plan do they sign up for?</label>
        <div className="grid grid-cols-2 gap-2">
          {COMMISSION_TIERS.map((tier, i) => (
            <button
              key={tier.tier}
              onClick={() => setTierIdx(i)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                tierIdx === i
                  ? "bg-[#3b6bff] text-white"
                  : "bg-white/80 border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tier.tier} — ${tier.commission}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-[#3b6bff]/10 border border-[#3b6bff]/20 p-5 text-center mb-4">
        <p className="text-xs text-[#3b6bff] uppercase tracking-wider mb-1">You get paid (one-time per referral)</p>
        <p className="text-3xl font-bold text-slate-900">${thisMonth.toLocaleString()}</p>
        <p className="text-xs text-slate-500 mt-1">{referrals} referral{referrals > 1 ? 's' : ''} × ${perReferral} each</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-white/80 border border-slate-200/60 p-4 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider">Per Referral</p>
          <p className="text-xl font-bold text-[#3b6bff]">${perReferral}</p>
        </div>
        <div className="rounded-xl bg-white/80 border border-slate-200/60 p-4 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider">If you keep this pace for a year</p>
          <p className="text-xl font-bold text-emerald-600">${ifKeepPace.toLocaleString()}</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 text-center mt-3">Paid within 30 days of each referral's first payment. No waiting a full year.</p>
    </div>
  );
}

/* ─── FAQ Accordion ─── */
const FAQS = [
  { q: "How much do I get paid?", a: "You get a one-time payment for each business you refer. The amount depends on the plan they choose: $78 for Starter, $190 for Pro, $286 for Agency, or $458 for Custom. You get paid within 30 days of their first payment — no waiting a full year." },
  { q: "When do I get paid?", a: "Commissions are paid out within 30 days of the referred client's first payment clearing. We pay via PayPal, bank transfer, or Venmo — your choice." },
  { q: "Do I need to know AI or tech?", a: "Not at all. You just need to know business owners who could use help with leads, bookings, or content. NEO Gents handles all the technical work." },
  { q: "How do I track my referrals?", a: "Every affiliate gets a personal dashboard with real-time stats: clicks, signups, conversions, and earnings. You'll know exactly what's working." },
  { q: "What if I don't have a big audience?", a: "Most of our top affiliates started with zero online following. They simply shared their QR code with local business owners, friends, and family. Word-of-mouth works." },
  { q: "Is there a cost to join?", a: "Zero. The affiliate program is completely free to join. No upfront costs, no hidden fees, no minimums." },
  { q: "How long is the referral tracked?", a: "We use a 60-day cookie. If someone clicks your link or scans your QR code and signs up within 60 days, you get the credit." },
  { q: "Can I refer businesses in any industry?", a: "Yes! NEO Gents serves photographers, aestheticians, barbers, chefs, realtors, and creators. Any creative professional or small business owner is a great fit." },
  { q: "What materials do I get?", a: "You'll receive a personalized QR code, printable one-pagers, email templates, social media posts, and a simple script for introducing NEO Gents." },
  { q: "How do I sign up?", a: "Fill out the form below with your name and email. We'll send your affiliate link and dashboard access within 24 hours." },
];

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      {FAQS.map((faq, i) => (
        <div key={i} className="rounded-xl border border-slate-200/60 bg-white/60 backdrop-blur-sm overflow-hidden shadow-sm">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/80 transition-colors"
          >
            <span className="text-sm font-medium text-slate-800">{faq.q}</span>
            {openIdx === i ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {openIdx === i && (
            <div className="px-4 pb-4 text-sm text-slate-500 leading-relaxed">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── QR Code Section ─── */
function QRSection() {
  const [copied, setCopied] = useState(false);
  const affiliateUrl = "https://neogents.tech/?ref=AFFILIATE";

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-white/80 bg-white/60 backdrop-blur-xl p-6 md:p-8 max-w-md mx-auto text-center shadow-lg">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b6bff]/10 text-[#3b6bff] text-xs font-medium mb-4 border border-[#3b6bff]/20">
        <QrCode className="w-3 h-3" /> Scan to Join
      </div>
      <div className="bg-white rounded-xl p-4 inline-block mb-4 shadow-sm border border-slate-100">
        <QRCodeSVG
          value={affiliateUrl}
          size={180}
          level="H"
          includeMargin={false}
          imageSettings={{
            src: "/favicon.svg",
            height: 30,
            width: 30,
            excavate: true,
          }}
        />
      </div>
      <p className="text-sm text-slate-500 mb-4">Scan this code to visit the affiliate signup page</p>
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied!" : "Copy Referral Link"}
      </button>
    </div>
  );
}

/* ─── Signup Form ─── */
function AffiliateSignup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', how: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/affiliates/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setReferralCode(data.affiliate.referralCode);
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const [linkCopied, setLinkCopied] = useState(false);

  if (submitted) {
    const shareUrl = referralCode
      ? `${window.location.origin}/api/affiliates/redirect/${referralCode}`
      : '';
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 backdrop-blur-xl p-8 max-w-md mx-auto text-center shadow-lg">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">You're In!</h3>
        <p className="text-slate-600 mb-4">Check your email in the next few minutes for your affiliate dashboard link and QR code.</p>
        {referralCode && (
          <>
            <div className="rounded-lg bg-white/80 border border-slate-200/60 p-3 mb-3">
              <p className="text-xs text-slate-400 mb-1">Your referral code</p>
              <p className="text-lg font-bold text-[#3b6bff]">{referralCode}</p>
            </div>
            {shareUrl && (
              <div className="rounded-lg bg-white/80 border border-slate-200/60 p-3 mb-4">
                <p className="text-xs text-slate-400 mb-1">Your shareable link</p>
                <p className="text-sm font-medium text-slate-700 break-all mb-2">{shareUrl}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#3b6bff] hover:bg-[#2a55d4] text-white text-xs font-medium transition-colors"
                >
                  {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {linkCopied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            )}
          </>
        )}
        <div className="text-sm text-slate-500">Welcome to the team 🎉</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/80 bg-white/60 backdrop-blur-xl p-6 md:p-8 max-w-md mx-auto space-y-4 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-900 text-center mb-2">Get Your Referral Link</h3>
      <p className="text-sm text-slate-500 text-center mb-4">Join free. Start earning today.</p>
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600 text-center">{error}</div>
      )}
      <input
        type="text"
        placeholder="Your full name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#3b6bff] text-sm shadow-sm"
      />
      <input
        type="email"
        placeholder="Email address"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#3b6bff] text-sm shadow-sm"
      />
      <input
        type="tel"
        placeholder="Phone number (optional)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#3b6bff] text-sm shadow-sm"
      />
      <select
        value={form.how}
        onChange={(e) => setForm({ ...form, how: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-[#3b6bff] text-sm shadow-sm"
      >
        <option value="">How do you plan to share?</option>
        <option value="friends">Friends & family</option>
        <option value="social">Social media</option>
        <option value="local">Local businesses</option>
        <option value="events">Events & networking</option>
        <option value="other">Other</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
      >
        {loading ? 'Submitting...' : 'Get My Link'} <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-xs text-slate-400 text-center">No spam. Unsubscribe anytime. We never sell your data.</p>
    </form>
  );
}

/* ─── Main Page ─── */
export function AffiliatePage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const affiliates = useCountUp(500, statsVisible, 1800);
  const paidOut = useCountUp(120000, statsVisible, 2200);
  const avgMonthly = useCountUp(800, statsVisible, 1200);

  return (
    <div className="min-h-screen text-slate-900 relative"
      style={{
        background: `
          radial-gradient(1200px 800px at 10% -10%, #e0e7ff 0%, transparent 60%),
          radial-gradient(1000px 700px at 100% 20%, #fce7f3 0%, transparent 60%),
          radial-gradient(900px 600px at 50% 110%, #fef3c7 0%, transparent 60%),
          #f8fafc
        `
      }}
    >
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#/" className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
            <Sparkles className="w-4 h-4 text-[#3b6bff]" /> NEO Gents
          </a>
          <a href="#/" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3b6bff]/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b6bff]/10 border border-[#3b6bff]/20 text-[#3b6bff] text-xs font-medium mb-6">
            <HandCoins className="w-3 h-3" /> Earn Up To $458 Per Referral
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900">
            Did You Just Get Laid Off?<br />
            <span className="text-[#3b6bff]">Can't Find a Job?</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-4 leading-relaxed">
            Or maybe you just don't want to work a traditional job anymore.
          </p>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            <strong className="text-slate-900">NEO Gents was created to serve the people Silicon Valley overlooks.</strong> We all know someone who could use new leads — a barber, a photographer, a realtor, a chef. Refer them to NEO Gents and get paid <strong className="text-slate-900">$78–$458</strong> for each one that signs up. Paid within 30 days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#signup"
              className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors inline-flex items-center gap-2 shadow-md"
            >
              Get Your Referral Link <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how"
              className="px-6 py-3 rounded-lg bg-white/80 border border-slate-200 hover:bg-white text-slate-700 font-medium text-sm transition-colors shadow-sm"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ── Earnings Calculator ── */}
      <section className="px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-slate-900">What's Your Earning Potential?</h2>
          <p className="text-slate-500 text-center mb-10 max-w-lg mx-auto">Slide to see how much you could earn based on the number of businesses you refer each month.</p>
          <EarningsCalculator />
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="px-4 py-16 md:py-20 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-slate-900">Who Becomes a NEO Gents Affiliate?</h2>
          <p className="text-slate-500 text-center mb-12 max-w-lg mx-auto">You don't need to be a tech expert. You just need to know people who run businesses.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Network, title: "The Networker", desc: "You know business owners — at the barbershop, the coffee shop, your church, your gym. You connect people naturally." },
              { icon: Megaphone, title: "The Creator", desc: "You have a following on Instagram, TikTok, or YouTube. Your audience trusts your recommendations." },
              { icon: Briefcase, title: "The Side Hustler", desc: "You want flexible income without a 9-to-5. Share your QR code when it works for you." },
            ].map((p, i) => (
              <div key={i} className="rounded-2xl border border-white/80 bg-white/60 backdrop-blur-sm p-6 hover:border-[#3b6bff]/30 transition-colors shadow-lg">
                <div className="w-10 h-10 rounded-lg bg-[#3b6bff]/10 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-[#3b6bff]" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="px-4 py-16 md:py-20 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-900">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", icon: CheckCircle2, title: "Sign Up Free", desc: "Fill out the form below. We'll send your unique referral link and personalized QR code within 24 hours." },
              { n: "02", icon: Share2, title: "Share Your Link", desc: "Text it, email it, post it, or print it. Your QR code works everywhere — even on flyers and business cards." },
              { n: "03", icon: DollarSign, title: "Get Paid", desc: "Earn $78–$458 per referral depending on the plan they choose. Money hits your account within 30 days of their first payment." },
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-14 h-14 rounded-full bg-[#3b6bff]/10 border border-[#3b6bff]/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-[#3b6bff]" />
                </div>
                <div className="text-xs font-bold text-[#3b6bff] mb-2">STEP {step.n}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="px-4 py-16 md:py-20 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-900">Everything You Get</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: QrCode, title: "Personal QR Code", desc: "Branded QR code that links to your unique referral URL. Print-ready." },
              { icon: BarChart3, title: "Affiliate Dashboard", desc: "Real-time tracking of clicks, signups, conversions, and earnings." },
              { icon: Mail, title: "Email Templates", desc: "Pre-written emails you can copy, paste, and send to potential referrals." },
              { icon: Smartphone, title: "Social Posts", desc: "Ready-to-share Instagram, TikTok, and LinkedIn post templates." },
              { icon: Gift, title: "Printable One-Pager", desc: "A beautiful PDF you can print and hand to business owners in person." },
              { icon: Wallet, title: "Monthly Payouts", desc: "Get paid via PayPal, bank transfer, or Venmo — your choice, every month." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-[#3b6bff]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-[#3b6bff]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section ref={statsRef} className="px-4 py-16 md:py-20 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">Real People. Real Earnings.</h2>
          <p className="text-slate-500 mb-12 max-w-lg mx-auto">Our founding affiliates have been earning for 4 months and counting.</p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="rounded-2xl border border-white/80 bg-white/60 p-6 shadow-lg backdrop-blur-sm">
              <p className="text-4xl md:text-5xl font-bold text-[#3b6bff]">2</p>
              <p className="text-sm text-slate-500 mt-2">Founding affiliates on Agency tier</p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/60 p-6 shadow-lg backdrop-blur-sm">
              <p className="text-4xl md:text-5xl font-bold text-emerald-600">$2,288</p>
              <p className="text-sm text-slate-500 mt-2">Paid out in commissions so far</p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/60 p-6 shadow-lg backdrop-blur-sm">
              <p className="text-4xl md:text-5xl font-bold text-slate-900">4 mo</p>
              <p className="text-sm text-slate-500 mt-2">Months of consistent payouts</p>
            </div>
          </div>
          <div className="rounded-2xl border border-[#3b6bff]/20 bg-[#3b6bff]/5 p-6 max-w-2xl mx-auto">
            <p className="text-sm text-slate-600 italic">
              "I referred my barber and my cousin who does wedding photography. Both signed up for Agency plans. I've made $572 each month for 4 months straight. That's $2,288 I didn't have before — just from people I already knew."
            </p>
            <p className="text-xs text-[#3b6bff] mt-3 font-medium">— Marcus J., Founding Affiliate · Atlanta</p>
          </div>
        </div>
      </section>

      {/* ── QR + Signup ── */}
      <section id="signup" className="px-4 py-16 md:py-20 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-slate-900">Ready to Start Earning?</h2>
          <p className="text-slate-500 text-center mb-12 max-w-lg mx-auto">Get your referral link and QR code in minutes. No cost. No commitment.</p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <QRSection />
            <AffiliateSignup />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-16 md:py-20 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-slate-900">Questions? Answered.</h2>
          <p className="text-slate-500 text-center mb-12">Everything you need to know before you start.</p>
          <FaqAccordion />
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="px-4 py-16 md:py-20 border-t border-slate-200/60">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            We All Know Someone Who <span className="text-[#3b6bff]">Could Use New Leads</span>
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            That barber who stays open late? The photographer at your cousin's wedding? The realtor who helped your friend buy their first home? <strong className="text-slate-900">They all need more clients.</strong> You can help them — and get paid for it.
          </p>
          <a
            href="#signup"
            className="px-8 py-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base transition-colors inline-flex items-center gap-2 shadow-md"
          >
            Get My Referral Link <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-xs text-slate-400 mt-4">Free to join. No hidden fees. Built for the people Silicon Valley forgot.</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200/60 px-4 py-8 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Sparkles className="w-4 h-4 text-[#3b6bff]" /> NEO Gents
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#/" className="hover:text-slate-600 transition-colors">Home</a>
            <a href="#/" className="hover:text-slate-600 transition-colors">Product</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
          </div>
          <p className="text-xs text-slate-400">© 2026 NEO Gents. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
