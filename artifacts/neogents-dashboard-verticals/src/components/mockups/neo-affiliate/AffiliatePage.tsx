import { useState, useRef, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  DollarSign, Users, Share2, QrCode, ArrowRight, CheckCircle2,
  Wallet, BarChart3, Mail, Smartphone, Gift, HelpCircle,
  ChevronDown, ChevronUp, Copy, Check, Star, TrendingUp,
  HandCoins, Network, Megaphone, Briefcase, Eye, UserPlus
} from 'lucide-react';
import { useCountUp } from '../../../hooks/useCountUp';
import '../neo-landing-v3-deepmind-glass/_styles.css';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ScrollButton({
  id,
  className,
  children,
}: {
  id: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => scrollToId(id)}
      className={className}
    >
      {children}
    </button>
  );
}

/* Founder personal code — change here to swap the code you hand out. */
const FOUNDER_REF_CODE = 'BERRY20';
const STORAGE_KEY = 'berry20_click_log_v1';

type ClickLogEntry = { to: string; ts: number; ua: string; ref: string; landing: string };
type ClickLog = Record<string, ClickLogEntry[]>;

function loadClickLog(): ClickLog {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ClickLog) : {};
  } catch { return {}; }
}
function saveClickLog(log: ClickLog): void {
  if (typeof window === 'undefined') return;
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(log)); } catch {}
}
function summarizeUa(ua: string): string {
  if (!ua) return 'Unknown device';
  if (/iPhone/.test(ua)) return 'iPhone';
  if (/iPad/.test(ua)) return 'iPad';
  if (/Android/.test(ua)) return /Mobile/.test(ua) ? 'Android phone' : 'Android tablet';
  if (/Mac OS X/.test(ua)) return 'Mac';
  if (/Windows/.test(ua)) return 'Windows';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Unknown device';
}
function useRefCodeTracking(): { totalOpens: number; perRecipient: Array<{ to: string; count: number; last: number }> } {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const ref = (params.get('ref') || '').toUpperCase();
    if (ref !== FOUNDER_REF_CODE) { setTick((t) => t + 1); return; }
    const to = (params.get('to') || '').trim().toLowerCase() || '_anon';
    const log = loadClickLog();
    log[to] = log[to] || [];
    log[to].push({
      to, ts: Date.now(),
      ua: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      ref, landing: window.location.hash || '#/affiliates',
    });
    saveClickLog(log);
    setTick((t) => t + 1);
  }, []);
  return useMemo(() => {
    const log = loadClickLog();
    const totalOpens = Object.values(log).reduce((s, l) => s + l.length, 0);
    const perRecipient = Object.entries(log)
      .map(([to, list]) => ({ to, count: list.length, last: list[list.length - 1]?.ts || 0 }))
      .sort((a, b) => b.last - a.last);
    return { totalOpens, perRecipient };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);
}

function FounderLinkPanel({ totalOpens }: { totalOpens: number }) {
  const [toValue, setToValue] = useState('');
  const [copiedKind, setCopiedKind] = useState<string | null>(null);
  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?ref=${FOUNDER_REF_CODE}`
    : `https://neogents.tech/?ref=${FOUNDER_REF_CODE}`;
  const taggedUrl = toValue.trim()
    ? `${baseUrl}&to=${encodeURIComponent(toValue.trim().toLowerCase().replace(/\s+/g, '-'))}`
    : baseUrl;
  const copy = (text: string, kind: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKind(kind);
    setTimeout(() => setCopiedKind(null), 2000);
  };
  return (
    <div className="rounded-2xl border-2 border-[#3b6bff]/30 bg-white/80 backdrop-blur-xl p-6 md:p-7 max-w-2xl mx-auto text-left shadow-xl ring-1 ring-[#3b6bff]/10">
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b6bff]/10 text-[#3b6bff] text-xs font-medium border border-[#3b6bff]/20">
          <Star className="w-3 h-3" /> Your Personal Link · Code: <strong className="ml-1">{FOUNDER_REF_CODE}</strong>
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs text-slate-500">
          <Eye className="w-3.5 h-3.5" /> <span data-testid="berry-total-opens">{totalOpens}</span> opens tracked on this device
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
        Hand out the link below. To know <strong>who</strong> you sent it to, add a <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs">?to=&lt;name&gt;</code> tag to the URL before you send it. The person who opens it will land on this page, and you'll see their tag on the <a href="?ref=BERRY20&owner=1#/affiliates" className="text-[#3b6bff] underline">click log</a>.
      </p>
      <div className="grid sm:grid-cols-[1fr_auto] gap-2 mb-3">
        <div className="rounded-lg bg-white border border-slate-200 p-3 font-mono text-sm text-slate-800 break-all leading-snug">
          {taggedUrl}
        </div>
        <button
          onClick={() => copy(taggedUrl, 'tagged')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
        >
          {copiedKind === 'tagged' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedKind === 'tagged' ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={toValue}
          onChange={(e) => setToValue(e.target.value)}
          placeholder="Tag the next link with a name (e.g. john-doe)"
          className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#3b6bff]"
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-2">
        <button
          onClick={() => copy(`${baseUrl}&to=sms`, 'sms')}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {copiedKind === 'sms' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedKind === 'sms' ? 'Copied' : 'Copy "to=sms"'}
        </button>
        <button
          onClick={() => copy(`${baseUrl}&to=email`, 'email')}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {copiedKind === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedKind === 'email' ? 'Copied' : 'Copy "to=email"'}
        </button>
        <button
          onClick={() => copy(`${baseUrl}&to=dm`, 'dm')}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {copiedKind === 'dm' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedKind === 'dm' ? 'Copied' : 'Copy "to=dm"'}
        </button>
      </div>
      <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
        Tip: change <code className="px-1 py-0.5 rounded bg-slate-100">to</code> to a unique value per recipient (e.g. <code className="px-1 py-0.5 rounded bg-slate-100">to=john-barber</code>) — the tag is what tells them apart on your click log.
      </p>
    </div>
  );
}

function OwnerClickLog({ perRecipient, totalOpens }: { perRecipient: Array<{ to: string; count: number; last: number }>; totalOpens: number }) {
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);
  useEffect(() => {
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) refresh(); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const log = loadClickLog();
  const flat: ClickLogEntry[] = [];
  Object.values(log).forEach((list) => list.forEach((e) => flat.push(e)));
  flat.sort((a, b) => b.ts - a.ts);
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-5 md:p-6 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900">Founder-only click log · {FOUNDER_REF_CODE}</h3>
        <button onClick={refresh} className="text-xs text-[#3b6bff] hover:underline">Refresh</button>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Local to this device. Use as a sanity check that each tagged link reached the recipient. Total opens on this device: <strong>{totalOpens}</strong>.
      </p>
      {perRecipient.length === 0 ? (
        <div className="rounded-lg bg-slate-50 border border-slate-200/60 p-4 text-xs text-slate-500 text-center">
          No opens yet. Send a link with <code className="px-1 py-0.5 rounded bg-white border border-slate-200">{'{BASE}&to=NAME'}</code> and open it in any browser to see it appear here.
        </div>
      ) : (
        <div className="space-y-2 mb-4">
          {perRecipient.map((p) => (
            <div key={p.to} className="flex items-center justify-between rounded-lg bg-white border border-slate-200/60 px-3 py-2 text-sm">
              <span className="font-mono text-slate-800">{p.to}</span>
              <span className="text-xs text-slate-500">
                {p.count} open{p.count > 1 ? 's' : ''} · last {new Date(p.last).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
      {flat.length > 0 && (
        <details className="text-xs text-slate-600">
          <summary className="cursor-pointer text-slate-500 hover:text-slate-700">View raw log ({flat.length} entries)</summary>
          <ul className="mt-2 space-y-1 font-mono">
            {flat.slice(0, 50).map((e, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span className="truncate">{e.to}</span>
                <span className="text-slate-400 shrink-0">{summarizeUa(e.ua)} · {new Date(e.ts).toLocaleTimeString()}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

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
    <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 max-w-lg mx-auto shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">How Much Will You Make?</h3>
      <div className="mb-6">
        <label className="block text-sm text-slate-500 mb-2">How many businesses will you refer this month?</label>
        <input
          type="range"
          min={1}
          max={20}
          value={referrals}
          onChange={(e) => setReferrals(Number(e.target.value))}
          className="w-full accent-[#1e3a5f]"
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
                  ? "bg-[#1e3a5f] text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tier.tier} — ${tier.commission}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-[#1e3a5f]/10 border border-[#1e3a5f]/20 p-5 text-center mb-4">
        <p className="text-xs text-[#1e3a5f] uppercase tracking-wider mb-1">You get paid (one-time per referral)</p>
        <p className="text-3xl font-bold text-slate-900">${thisMonth.toLocaleString()}</p>
        <p className="text-xs text-slate-500 mt-1">{referrals} referral{referrals > 1 ? 's' : ''} × ${perReferral} each</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-white border border-slate-200 p-4 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider">Per Referral</p>
          <p className="text-xl font-bold text-[#1e3a5f]">${perReferral}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4 text-center">
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
        <div key={i} className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
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
  // Public visitor QR — points to the affiliate signup page itself.
  // The founder's personal link (with ?ref=CODE and ?to=) lives in FounderLinkPanel,
  // which is only visible with ?owner=1.
  const affiliateUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#/affiliates`
    : `https://neogents.tech/#/affiliates`;

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 max-w-md mx-auto text-center shadow-sm">
      <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-medium mb-4 border border-[#1e3a5f]/20 mx-auto w-fit">
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
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied!" : "Copy Referral Link"}
      </button>
    </div>
  );
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_AFFILIATE_ENDPOINT || '';

function api(path: string) {
  return `${API_BASE}/api${path}`;
}

function generateReferralCode(name: string): string {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${clean}${random}`;
}

/* ─── Signup Form ─── */
function AffiliateSignup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', how: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const formspreeReady = FORMSPREE_ENDPOINT.startsWith('https://formspree.io/f/');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formEl = e.currentTarget as HTMLFormElement;

    try {
      // 1. Register in the backend (Cloudflare D1 or Express). This is the source of truth.
      const apiRes = await fetch(api('/affiliates/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          how: form.how,
        }),
      });

      const apiData = await apiRes.json().catch(() => ({}));
      if (!apiRes.ok) {
        throw new Error(apiData.error || apiData.message || 'Backend signup failed');
      }

      const code = apiData.affiliate?.referralCode || generateReferralCode(form.name);
      setReferralCode(code);
      setShareUrl(`${window.location.origin}/?ref=${code}`);

      // 2. Optionally forward to Formspree as a notification layer.
      if (formspreeReady) {
        const formData = new FormData(formEl);
        formData.append('referral_code', code);
        formData.append('source', 'affiliate-page');
        formData.append('signup_time', new Date().toISOString());
        try {
          await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
          });
        } catch (fsErr) {
          // Formspree is non-blocking; log silently.
          console.warn('Formspree forward failed:', fsErr);
        }
      }

      formEl.reset();
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const [linkCopied, setLinkCopied] = useState(false);

  if (submitted) {
    return (
      <div className="dm-glass p-8 max-w-md mx-auto text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[var(--ink)] mb-2">You're In!</h3>
        <p className="text-[var(--muted)] mb-4">Check your email in the next few minutes for your affiliate dashboard link and QR code.</p>
        {referralCode && (
          <>
            <div className="rounded-lg bg-white/60 border border-white/40 p-3 mb-3">
              <p className="text-xs text-[var(--muted)] mb-1">Your referral code</p>
              <p className="text-lg font-bold text-[var(--blue)]">{referralCode}</p>
            </div>
            {shareUrl && (
              <div className="rounded-lg bg-white/60 border border-white/40 p-3 mb-4">
                <p className="text-xs text-[var(--muted)] mb-1">Your shareable link</p>
                <p className="text-sm font-medium text-[var(--ink)] break-all mb-2">{shareUrl}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--blue)] hover:bg-[var(--violet)] text-white text-xs font-medium transition-colors"
                >
                  {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {linkCopied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            )}
          </>
        )}
        <div className="text-sm text-[var(--muted)]">Welcome to the team </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="dm-glass p-6 md:p-8 max-w-md mx-auto space-y-4">
      <h3 className="text-lg font-semibold text-[var(--ink)] text-center mb-2">Get Your Referral Link</h3>
      <p className="text-sm text-[var(--muted)] text-center mb-4">Join free. Start earning today.</p>
      {error && (
        <div className="rounded-lg bg-red-50/80 border border-red-200 p-3 text-sm text-red-600 text-center">{error}</div>
      )}
      <input
        type="text"
        placeholder="Your full name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white/60 border border-white/60 text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--blue)] text-sm"
      />
      <input
        type="email"
        placeholder="Email address"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white/60 border border-white/60 text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--blue)] text-sm"
      />
      <input
        type="tel"
        placeholder="Phone number (optional)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white/60 border border-white/60 text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--blue)] text-sm"
      />
      <select
        value={form.how}
        onChange={(e) => setForm({ ...form, how: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white/60 border border-white/60 text-[var(--ink)] focus:outline-none focus:border-[var(--blue)] text-sm"
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
        className="w-full py-3 rounded-lg dm-grad-btn disabled:opacity-50 font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
      >
        {loading ? 'Submitting...' : 'Get My Link'} <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-xs text-[var(--muted)] text-center">No spam. Unsubscribe anytime. We never sell your data.</p>
    </form>
  );
}

/* ─── Main Page ─── */
export function AffiliatePage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const { totalOpens, perRecipient } = useRefCodeTracking();
  const isOwnerView = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('owner') === '1';
  }, []);

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
    <div className="dm-root min-h-screen">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#/" className="flex items-center gap-2 text-[var(--ink)] font-semibold text-sm">
            <Star className="w-4 h-4 text-[var(--blue)]" /> NEO Gents
          </a>
          <a href="#/" className="text-xs text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="dm-aurora" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--blue)]/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="dm-glass-strip mb-6">
            <HandCoins className="w-3.5 h-3.5 text-[var(--blue)]" />
            <span className="text-[var(--muted)]">Affiliate Program · Powered by NORI Intelligence</span>
          </div>
          <div className="dm-orb mx-auto mb-6" />
          <h1 className="dm-display-th text-[3rem] md:text-[5rem] leading-[1.05] mb-5 max-w-4xl mx-auto">
            Did You Just Get Laid Off?<br />
            <span className="dm-shimmer">Turn Your Network into Income</span>
          </h1>
          <p className="text-[var(--muted)] text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            You know business owners — at the barbershop, the coffee shop, your church, your gym. Refer them to NEO Gents and get paid every time they sign up.
          </p>
          <p className="text-[var(--muted)] text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            <strong className="text-[var(--ink)]">NEO Gents finds, books, and nurtures leads on autopilot</strong> for barbers, photographers, realtors, chefs, and creators. You share the link. We handle the rest. Earn <strong className="text-[var(--ink)]">$78–$458</strong> per referral, paid within 30 days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ScrollButton
              id="signup"
              className="px-6 py-3 rounded-lg dm-grad-btn font-semibold text-sm inline-flex items-center gap-2 shadow-md"
            >
              Get Your Referral Link <ArrowRight className="w-4 h-4" />
            </ScrollButton>
            <ScrollButton
              id="how"
              className="dm-btn-glass px-6 py-3 text-sm font-medium inline-flex items-center gap-2"
            >
              See How It Works
            </ScrollButton>
          </div>
        </div>
      </section>

      {/* ── Founder Personal Link (visible only with ?owner=1) ── */}
      {isOwnerView && (
        <section className="px-4 pb-4 md:pb-6">
          <FounderLinkPanel totalOpens={totalOpens} />
        </section>
      )}

      {/* ── Earnings Calculator ── */}
      <section className="px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[var(--ink)]">What's Your Earning Potential?</h2>
          <p className="text-[var(--muted)] text-center mb-10 max-w-lg mx-auto">Slide to see how much you could earn based on the number of businesses you refer each month.</p>
          <EarningsCalculator />
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="px-4 py-16 md:py-20 border-t border-white/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[var(--ink)]">Who Becomes a NEO Gents Affiliate?</h2>
          <p className="text-[var(--muted)] text-center mb-12 max-w-lg mx-auto">You don't need to be a tech expert. You just need to know people who run businesses.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Network, title: "The Networker", desc: "You know business owners — at the barbershop, the coffee shop, your church, your gym. You connect people naturally." },
              { icon: Megaphone, title: "The Creator", desc: "You have a following on Instagram, TikTok, or YouTube. Your audience trusts your recommendations." },
              { icon: Briefcase, title: "The Side Hustler", desc: "You want flexible income without a 9-to-5. Share your QR code when it works for you." },
            ].map((p, i) => (
              <div key={i} className="dm-glass p-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--blue)]/10 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-[var(--blue)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">{p.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="px-4 py-16 md:py-20 border-t border-white/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[var(--ink)]">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", icon: CheckCircle2, title: "Sign Up Free", desc: "Fill out the form below. We'll send your unique referral link and personalized QR code within 24 hours." },
              { n: "02", icon: Share2, title: "Share Your Link", desc: "Text it, email it, post it, or print it. Your QR code works everywhere — even on flyers and business cards." },
              { n: "03", icon: DollarSign, title: "Get Paid", desc: "Earn $78–$458 per referral depending on the plan they choose. Money hits your account within 30 days of their first payment." },
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-14 h-14 rounded-full dm-glass flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-[var(--blue)]" />
                </div>
                <div className="text-xs font-bold text-[var(--blue)] mb-2">STEP {step.n}</div>
                <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="px-4 py-16 md:py-20 border-t border-white/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[var(--ink)]">Everything You Get</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: QrCode, title: "Personal QR Code", desc: "Branded QR code that links to your unique referral URL. Print-ready." },
              { icon: BarChart3, title: "Affiliate Dashboard", desc: "Real-time tracking of clicks, signups, conversions, and earnings." },
              { icon: Mail, title: "Email Templates", desc: "Pre-written emails you can copy, paste, and send to potential referrals." },
              { icon: Smartphone, title: "Social Posts", desc: "Ready-to-share Instagram, TikTok, and LinkedIn post templates." },
              { icon: Gift, title: "Printable One-Pager", desc: "A beautiful PDF you can print and hand to business owners in person." },
              { icon: Wallet, title: "Monthly Payouts", desc: "Get paid via PayPal, bank transfer, or Venmo — your choice, every month." },
            ].map((item, i) => (
              <div key={i} className="dm-glass p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--blue)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-[var(--blue)]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--ink)] mb-1">{item.title}</h4>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section ref={statsRef} className="px-4 py-16 md:py-20 border-t border-white/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--ink)]">Real People. Real Earnings.</h2>
          <p className="text-[var(--muted)] mb-12 max-w-lg mx-auto">Our affiliates start earning from month one.</p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="dm-glass p-6">
              <p className="text-4xl md:text-5xl font-bold text-[var(--blue)]">2</p>
              <p className="text-sm text-[var(--muted)] mt-2">Agency referrals this month</p>
            </div>
            <div className="dm-glass p-6">
              <p className="text-4xl md:text-5xl font-bold text-emerald-500">$572</p>
              <p className="text-sm text-[var(--muted)] mt-2">Paid out in commissions so far</p>
            </div>
            <div className="dm-glass p-6">
              <p className="text-4xl md:text-5xl font-bold text-[var(--ink)]">1 mo</p>
              <p className="text-sm text-[var(--muted)] mt-2">Months as an affiliate</p>
            </div>
          </div>
          <div className="dm-glass p-6 max-w-2xl mx-auto">
            <p className="text-sm text-[var(--muted)] italic">
              "I referred two of my real estate clients who needed better lead generation. Both signed up for Agency plans. I made $286 on each referral — $572 in my first month as an affiliate. That covered my CRM subscription and then some."
            </p>
            <p className="text-xs text-[var(--blue)] mt-3 font-medium">— Shelina B., Real Estate Agent · Oakland, CA</p>
          </div>
        </div>
      </section>

      {/* ── QR + Signup ── */}
      <section id="signup" className="px-4 py-16 md:py-20 border-t border-white/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[var(--ink)]">Ready to Start Earning?</h2>
          <p className="text-[var(--muted)] text-center mb-12 max-w-lg mx-auto">Get your referral link in minutes. No cost. No commitment.</p>
          <div className="max-w-xl mx-auto">
            <AffiliateSignup />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="px-4 py-16 md:py-20 border-t border-white/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[var(--ink)]">Questions? Answered.</h2>
          <p className="text-[var(--muted)] text-center mb-12">Everything you need to know before you start.</p>
          <FaqAccordion />
        </div>
      </section>

      {/* ── Owner-only click log (visible only with ?owner=1) ── */}
      {isOwnerView && (
        <section className="px-4 py-12 border-t border-white/20">
          <div className="max-w-3xl mx-auto">
            <OwnerClickLog perRecipient={perRecipient} totalOpens={totalOpens} />
          </div>
        </section>
      )}

      {/* ── Footer CTA ── */}
      <section className="px-4 py-16 md:py-20 border-t border-white/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--ink)]">
            We All Know Someone Who <span className="dm-shimmer">Could Use New Leads</span>
          </h2>
          <p className="text-[var(--muted)] mb-8 leading-relaxed">
            That barber who stays open late? The photographer at your cousin's wedding? The realtor who helped your friend buy their first home? <strong className="text-[var(--ink)]">They all need more clients.</strong> You can help them — and get paid for it.
          </p>
          <ScrollButton
            id="signup"
            className="px-8 py-4 rounded-lg dm-grad-btn font-semibold text-base inline-flex items-center gap-2 shadow-md"
          >
            Get My Referral Link <ArrowRight className="w-5 h-5" />
          </ScrollButton>
          <p className="text-xs text-[var(--muted)] mt-4">Free to join. No hidden fees. Built for the people Silicon Valley forgot.</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/20 px-4 py-8 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Star className="w-4 h-4 text-[var(--blue)]" /> NEO Gents
          </div>
          <div className="flex items-center gap-6 text-xs text-[var(--muted)]">
            <a href="#/" className="hover:text-[var(--ink)] transition-colors">Home</a>
            <a href="#/" className="hover:text-[var(--ink)] transition-colors">Product</a>
            <a href="#/terms" className="hover:text-[var(--ink)] transition-colors">Terms</a>
            <a href="#/privacy" className="hover:text-[var(--ink)] transition-colors">Privacy</a>
          </div>
          <p className="text-xs text-[var(--muted)]">© 2026 NEO Gents. All rights reserved.</p>
        </div>
      </footer>

      {/* ── FLOATING GLASS DOCK ── */}
      <div className="dm-dock hidden md:flex">
        <ScrollButton id="how" className="dm-btn-glass text-xs px-3 py-1.5">How It Works</ScrollButton>
        <ScrollButton id="signup" className="dm-btn-glass text-xs px-3 py-1.5">Sign Up</ScrollButton>
        <ScrollButton id="faq" className="dm-btn-glass text-xs px-3 py-1.5">FAQ</ScrollButton>
        <div style={{ width: 1, height: 22, background: 'rgba(11,16,32,0.12)' }} />
        <a href="#/" className="dm-btn" style={{ padding: '.4rem 1rem', fontSize: '.78rem' }}>Home <ArrowRight className="w-3 h-3" /></a>
      </div>
    </div>
  );
}
