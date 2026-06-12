import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { ArrowRight, Check, Home, Camera, Scissors, ChefHat, Compass, Settings2, Lock, Unlock, Play, Zap, Star } from 'lucide-react';
import { DeepFieldGallery } from '../../shared/DeepFieldGallery';
import { useCountUp } from '../../../hooks/useCountUp';
import { FEATURES, INDUSTRIES, TESTIMONIALS, STATS, PRICING } from '../../../data/landing';
import './_styles.css';

/** Glass panel that reflects cursor position */
function GlassPanel({ children, dark = false, className = '', style = {} }:
  { children: React.ReactNode; dark?: boolean; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={`${dark ? 'dm-glass dm-glass-dark' : 'dm-glass'} ${className}`} style={style}>
      {children}
    </div>
  );
}

/** Splash timer progress indicator */
function SplashProgress({ duration, active }: { duration: number; active: boolean }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!active) { setProgress(0); return; }
    setProgress(0);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [duration, active]);

  return (
    <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden mt-4">
      <div className="h-full bg-white/80 rounded-full transition-all duration-75 ease-linear" style={{ width: `${progress}%` }} />
    </div>
  );
}

export function LandingPageV3DeepMind() {
  const [industryIdx, setIndustryIdx] = useState(0);
  const [lockedVertical, setLockedVertical] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customForm, setCustomForm] = useState({ business: '', email: '', industry: '', features: '' });
  const [customSubmitted, setCustomSubmitted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clients = useCountUp(STATS[0].val, statsVisible, 1800);
  const leads   = useCountUp(STATS[1].val, statsVisible, 2200);
  const rating  = useCountUp(STATS[2].val, statsVisible, 1200);
  const live    = useCountUp(247, true, 2400);

  const activeIndex = lockedVertical !== null ? lockedVertical : industryIdx;
  const ind = INDUSTRIES[activeIndex];

  // Referral tracking — read ?ref= from URL, track click, set cookie
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (!refCode) return;

    // Set attribution cookie (60 days) — mirrors backend redirect behavior
    const maxAge = 60 * 24 * 60 * 60;
    document.cookie = `neo_gents_ref=${encodeURIComponent(refCode.toUpperCase())}; max-age=${maxAge}; path=/; SameSite=Lax`;

    // Fire-and-forget click tracking
    fetch('/api/affiliates/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referralCode: refCode }),
    }).catch((err) => {
      console.warn('[REFERRAL] Track ping failed:', err);
    });
  }, []);

  // Splash timer — cycle every 2.5s unless locked
  useEffect(() => {
    if (lockedVertical !== null) return;
    timerRef.current = setInterval(() => {
      setIndustryIdx((prev) => (prev + 1) % INDUSTRIES.length);
    }, 2500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [lockedVertical]);

  const lockVertical = (idx: number) => {
    setLockedVertical(idx);
    setIndustryIdx(idx);
  };

  const unlockVertical = () => {
    setLockedVertical(null);
  };

  useEffect(() => {
    const el = statsRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  // Dock items — all 6 verticals
  const dockItems = [
    { idx: 0, icon: <Camera className="w-4 h-4" />, label: "Photo" },
    { idx: 1, icon: <Star className="w-4 h-4" />, label: "Aesthetician" },
    { idx: 2, icon: <Scissors className="w-4 h-4" />, label: "Barber" },
    { idx: 3, icon: <ChefHat className="w-4 h-4" />, label: "Chef" },
    { idx: 4, icon: <Home className="w-4 h-4" />, label: "Realtor" },
    { idx: 5, icon: <Zap className="w-4 h-4" />, label: "Creators" },
  ];

  return (
    <div className="dm-root w-full overflow-x-hidden" style={{
      background: `
        radial-gradient(1200px 800px at 10% -10%, ${ind.color}15 0%, transparent 60%),
        radial-gradient(1000px 700px at 100% 20%, var(--pearl-3) 0%, transparent 60%),
        radial-gradient(900px 600px at 50% 110%, var(--pearl-4) 0%, transparent 60%),
        var(--pearl-1)
      `
    }}>

      {/* ── NAV (floating glass) ── */}
      <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4">
        <nav className="dm-glass-strip">
          <a href="#features" className="hidden md:inline hover:opacity-70">Platform</a>
          <a href="#industries" className="hidden md:inline hover:opacity-70">Industries</a>
          <a href="#pricing" className="hidden md:inline hover:opacity-70">Pricing</a>
          <a href="#waitlist" className="dm-btn ml-1" style={{ padding: '.4rem .9rem', fontSize: '.8rem' }}>Get access</a>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="relative w-full min-h-screen overflow-hidden flex items-center pt-28 pb-12 px-6 md:px-10">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* PAS Copy Framework */}
          <div className="text-center mb-10">
            <div className="dm-glass-strip mb-6 mx-auto">
              <span className="text-[var(--muted)]">Multilingual Intelligence · 47 Languages Supported</span>
            </div>
            <h1 className="dm-display-th text-[3rem] md:text-[5rem] leading-[1.05] mb-5 max-w-4xl mx-auto">
              <span>Your business runs on leads. </span>
              <span className="dm-display dm-grad-text">We find them at scale</span>
              <span>.</span>
            </h1>
            <p className="text-[var(--muted)] text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
              The intelligence layer for service professionals — Lead Radar, Agentic CRM, Content Engine, and AI Automation. Animated by NORI, the multilingual intelligence that opens with your morning coffee.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="#waitlist" className="dm-btn">Try the preview <ArrowRight className="w-4 h-4" /></a>
              <a href="#features" className="dm-btn-glass">Explore capabilities</a>
            </div>
            <div className="mt-3 text-center">
              <a href="#/affiliates" className="dm-btn-glass text-xs">Earn $400/referral → Become an Affiliate</a>
            </div>
          </div>

          {/* ── SPLASH TIMER: Industries ── */}
          <div id="industries" className="mb-8">
            <div className="text-center mb-4">
              <div className="dm-pill inline-flex mb-3"><Settings2 className="w-3 h-3" /> verticals</div>
              <h2 className="dm-display-th text-2xl md:text-3xl">Tuned for your craft.</h2>
            </div>

            {/* Splash Card */}
            <GlassPanel className="p-6 md:p-8 max-w-3xl mx-auto relative overflow-hidden">
              {/* Subtle accent bleed */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                background: `radial-gradient(ellipse at 50% 50%, ${ind.color} 0%, transparent 70%)`
              }} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl grid place-items-center flex-shrink-0" style={{ background: ind.color + '20', color: ind.color, boxShadow: `0 8px 28px -8px ${ind.color}60` }}>
                      <ind.Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="dm-display text-2xl md:text-3xl mb-1">{ind.label}</h3>
                      <p className="text-sm text-[var(--muted)]">Industry-specific intelligence tuned to your exact workflow</p>
                    </div>
                  </div>
                  {lockedVertical !== null && (
                    <button onClick={unlockVertical} className="p-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors" title="Unlock rotation">
                      <Unlock className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Key Stats — real industry data on lead value */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {([
                    /* Photography — Source: candidstudios.net, narrative.so, Salary.com */
                    [
                      { label: 'Avg Wedding', value: '$3,500' },
                      { label: 'Bookings/Year', value: '28' },
                      { label: 'Annual Income', value: '$63,774' },
                    ],
                    /* Aesthetician — Source: worldmetrics.org, workee.ai, Zenoti */
                    [
                      { label: 'Client LTV', value: '$2,800' },
                      { label: 'Rebooking Rate', value: '47%' },
                      { label: 'Spend/Visit', value: '$220' },
                    ],
                    /* Barber — Source: worldmetrics.org, haircutnow.com, BLS */
                    [
                      { label: 'Avg Service', value: '$40' },
                      { label: 'Clients/Week', value: '14' },
                      { label: 'Monthly Revenue', value: '$2,400' },
                    ],
                    /* Chef — Source: BLS, zipdo.co, chefry.io */
                    [
                      { label: 'Avg Event', value: '$3,200' },
                      { label: 'Events/Month', value: '4' },
                      { label: 'Per Guest', value: '$75' },
                    ],
                    /* Realtor — Source: NAR, agentsorted.com, worldmetrics.org */
                    [
                      { label: 'Avg Commission', value: '$18,000' },
                      { label: 'Transactions/Yr', value: '10' },
                      { label: 'Annual Income', value: '$58,100' },
                    ],
                    /* Creators — Source: influencermarketinghub.com */
                    [
                      { label: 'Avg Brand Deal', value: '$2,500' },
                      { label: 'Campaigns/Mo', value: '4' },
                      { label: 'Audience Growth', value: '+12%' },
                    ],
                  ][activeIndex]).map((stat, i) => (
                    <div key={i} className="dm-glass-strip flex-col py-3" style={{ borderRadius: 14, background: 'rgba(255,255,255,0.35)' }}>
                      <span className="dm-mono text-[10px] tracking-widest text-[var(--muted)]">{stat.label}</span>
                      <span className="font-semibold text-lg">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3 flex-wrap">
                  {lockedVertical !== null ? (
                    <a href={ind.route} className="dm-btn" style={{ background: `linear-gradient(180deg, ${ind.color} 0%, ${ind.color}cc 100%)`, borderColor: 'rgba(255,255,255,0.2)' }}>
                      Explore Dashboard <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <button onClick={() => lockVertical(activeIndex)} className="dm-btn" style={{ background: `linear-gradient(180deg, ${ind.color} 0%, ${ind.color}cc 100%)`, borderColor: 'rgba(255,255,255,0.2)' }}>
                      Select This Vertical <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  <span className="dm-pill" style={{ borderColor: ind.color + '40', color: ind.color }}>
                    {ind.features.length} features
                  </span>
                </div>

                {/* Progress bar */}
                {lockedVertical === null && <SplashProgress duration={2500} active={true} />}
                {lockedVertical !== null && (
                  <div className="flex items-center gap-2 mt-4">
                    <Lock className="w-3 h-3 text-[var(--muted)]" />
                    <span className="text-xs text-[var(--muted)]">Rotation paused — click unlock to resume</span>
                  </div>
                )}
              </div>
            </GlassPanel>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {INDUSTRIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => lockVertical(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: activeIndex === i ? 24 : 8,
                    height: 8,
                    background: activeIndex === i ? ind.color : 'rgba(11,16,32,0.2)',
                  }}
                  aria-label={`Select ${INDUSTRIES[i].label}`}
                />
              ))}
            </div>
          </div>

          {/* Feature Preview Card (when locked) */}
          {lockedVertical !== null && (
            <div className="max-w-3xl mx-auto mb-12 animate-fade-in">
              <GlassPanel className="p-6">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: ind.color }}>
                  <Play className="w-4 h-4" /> Feature Preview
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ind.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.7)' }}>
                      <div className="w-7 h-7 rounded-full grid place-items-center flex-shrink-0" style={{ background: ind.color + '20', color: ind.color }}>
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </div>
          )}
        </div>
      </section>

      {/* ── STATS — industry-specific lead impact ── */}
      <section ref={statsRef} className="relative py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="dm-pill inline-flex mb-3"><Zap className="w-3 h-3" /> impact</div>
            <h2 className="dm-display-th text-2xl md:text-3xl">How leads drive {ind.label.toLowerCase()} revenue.</h2>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <GlassPanel className="col-span-12 md:col-span-6 p-7" dark>
              <span className="dm-pill" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                LIVE · 1H
              </span>
              <div className="dm-display dm-num text-[6rem] leading-none mt-4" style={{ color: '#fff' }}>{live}</div>
              <div className="text-white/60">Leads scraped for {ind.label.toLowerCase()}s right now</div>
            </GlassPanel>
            {([
              [
                { v: '$4,200', l: 'Avg booking value', c: '#1e3a5f' },
                { v: '1 in 8', l: 'Lead → client rate', c: '#8a5cf6' },
                { v: '$12.6K', l: 'Monthly revenue', c: '#c89c3f' },
              ],
              [
                { v: '$1,200', l: 'Client LTV / year', c: '#1e3a5f' },
                { v: '73%', l: 'Rebooking rate', c: '#8a5cf6' },
                { v: '45+', l: 'Monthly appointments', c: '#c89c3f' },
              ],
              [
                { v: '$45', l: 'Avg service price', c: '#1e3a5f' },
                { v: '35', l: 'Clients per week', c: '#8a5cf6' },
                { v: '$6.3K', l: 'Monthly revenue', c: '#c89c3f' },
              ],
              [
                { v: '$3,200', l: 'Avg event revenue', c: '#1e3a5f' },
                { v: '4', l: 'Events per month', c: '#8a5cf6' },
                { v: '60', l: 'Guest capacity', c: '#c89c3f' },
              ],
              [
                { v: '$12.5K', l: 'Avg commission', c: '#1e3a5f' },
                { v: '1 in 25', l: 'Lead → closing', c: '#8a5cf6' },
                { v: '2', l: 'Monthly closings', c: '#c89c3f' },
              ],
              [
                { v: '$2,500', l: 'Avg brand deal', c: '#1e3a5f' },
                { v: '4', l: 'Campaigns per month', c: '#8a5cf6' },
                { v: '+12%', l: 'Audience growth', c: '#c89c3f' },
              ],
            ][activeIndex]).map((k, i) => (
              <GlassPanel key={i} className="col-span-12 md:col-span-2 p-6">
                <div className="dm-pill mb-3" style={{ borderColor: k.c + '40', color: k.c }}>{k.l}</div>
                <div className="dm-display dm-num text-4xl">{k.v}</div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES — glass bento ── */}
      <section id="features" className="relative py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="dm-pill inline-flex mb-5"><Compass className="w-3 h-3" /> capabilities</div>
            {/* AIDA: Attention → Interest → Desire → Action */}
            <h2 className="dm-display-th text-4xl md:text-6xl leading-[1] max-w-3xl mx-auto">
              Built like an <span className="dm-display dm-grad-text">intelligence</span>, not a dashboard.
            </h2>
            <p className="text-[var(--muted)] mt-4 max-w-xl mx-auto">
              Every feature is designed to remove friction and multiply your output — from lead discovery to content publishing to revenue tracking.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {FEATURES.map(({ Icon, title, desc, wide }, i) => (
              <GlassPanel key={i} className={`p-6 ${wide ? 'col-span-12' : 'col-span-12 md:col-span-6 lg:col-span-4'}`}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl grid place-items-center"
                       style={{ background: 'linear-gradient(135deg, #1e3a5f, #8a5cf6)', color: '#fff', boxShadow: '0 8px 22px -8px rgba(138,92,246,0.5)' }}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="dm-display text-xl mb-2">{title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{desc}</p>
                {wide && (
                  <div className="mt-5 flex items-center gap-3 flex-wrap">
                    <div className="dm-glass-strip"><span className="text-[var(--muted)]">Multilingual Support · 47 Languages</span></div>
                    <span className="dm-pill" style={{ borderColor: '#1e3a5f40', color: '#1e3a5f' }}>Auto-detect</span>
                    <span className="dm-mono text-xs text-[var(--muted)]">0.18s latency</span>
                  </div>
                )}
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="dm-pill inline-flex mb-4">how it works</div>
            <h2 className="dm-display-th text-3xl md:text-4xl">Three steps to intelligence.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', title: 'Connect Your Profiles', desc: 'Link your social media, booking platforms, and portfolio sites. We pull everything into one unified dashboard in seconds.' },
              { n: '02', title: 'AI Finds Your Leads', desc: 'N.O.R.I. Agent scrapes the web for warm, qualified leads in your area and industry. Wake up to a fresh pipeline every morning.' },
              { n: '03', title: 'Book, Create & Grow', desc: 'Manage bookings, publish content, and track your revenue — all from one beautiful, industry-tailored workspace.' },
            ].map((step, i) => (
              <GlassPanel key={i} className="p-6 text-center">
                <span className="dm-display-th text-5xl text-[var(--muted)] opacity-30">{step.n}</span>
                <h3 className="dm-display text-lg mt-3 mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{step.desc}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="relative py-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="dm-pill inline-flex mb-6">field report</div>
          <blockquote className="dm-display-th text-3xl md:text-5xl leading-[1.1] mb-8">
            "{TESTIMONIALS[0].text}"
          </blockquote>
          <div className="inline-flex items-center gap-3 dm-glass-strip">
            <div className="w-7 h-7 rounded-full grid place-items-center text-xs font-bold" style={{ background: 'linear-gradient(135deg, #1e3a5f, #8a5cf6)', color: '#fff' }}>{TESTIMONIALS[0].name[0]}</div>
            <span>{TESTIMONIALS[0].name}</span>
            <span className="text-[var(--muted)]">{TESTIMONIALS[0].role}</span>
          </div>
          {/* Trust signals */}
          <div className="flex justify-center gap-6 mt-8">
            {TESTIMONIALS.slice(1).map((t, i) => (
              <div key={i} className="text-center">
                <div className="w-8 h-8 rounded-full grid place-items-center text-xs font-bold mx-auto mb-1" style={{ background: 'linear-gradient(135deg, #8a5cf6, #ec4899)', color: '#fff' }}>{t.name[0]}</div>
                <p className="text-[10px] text-[var(--muted)]">{t.name}</p>
                <p className="text-[10px] text-[var(--muted)]">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="relative py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="dm-pill inline-flex mb-4">pricing</div>
            <h2 className="dm-display-th text-4xl md:text-5xl">Built for every stage. <span className="dm-display dm-grad-text">One mind.</span></h2>
            {/* Annual toggle */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className={`text-sm ${!annual ? 'font-semibold' : 'text-[var(--muted)]'}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className="relative w-12 h-6 rounded-full transition-colors"
                style={{ background: annual ? 'linear-gradient(90deg, #1e3a5f, #8a5cf6)' : 'rgba(11,16,32,0.15)' }}
              >
                <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform" style={{ transform: annual ? 'translateX(24px)' : 'translateX(0)' }} />
              </button>
              <span className={`text-sm ${annual ? 'font-semibold' : 'text-[var(--muted)]'}`}>Annual <span className="text-xs" style={{ color: '#1e3a5f' }}>(2 months free)</span></span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRICING.map((p, i) => {
              const annualPrice = annual ? Math.round(p.price * 10) : p.price;
              const period = annual ? '/yr' : '/mo';
              return (
                <GlassPanel key={i} dark={p.popular} className="p-7 flex flex-col"
                            style={p.popular ? { boxShadow: '0 30px 80px -20px rgba(59,107,255,0.55)' } : p.custom ? { border: '2px solid rgba(129,140,248,0.4)' } : {}}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="dm-pill" style={p.popular ? { background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' } : p.custom ? { background: 'rgba(129,140,248,0.15)', borderColor: 'rgba(129,140,248,0.4)', color: '#818CF8' } : {}}>{p.tier}</span>
                    {p.popular && <span className="dm-mono text-[10px] tracking-widest px-2 py-1 rounded-full" style={{ background: 'linear-gradient(90deg, #1e3a5f, #8a5cf6)', color: '#fff' }}>RECOMMENDED</span>}
                    {p.custom && <span className="dm-mono text-[10px] tracking-widest px-2 py-1 rounded-full" style={{ background: 'linear-gradient(90deg, #818CF8, #6366F1)', color: '#fff' }}>CUSTOM</span>}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="dm-display-th text-5xl">${annualPrice}</span>
                    <span className="opacity-60 mb-1.5">{period}</span>
                  </div>
                  {p.trial && <p className="text-xs mb-2" style={{ color: '#1e3a5f' }}>{p.trial}</p>}
                  {p.custom && <p className="text-xs mb-2" style={{ color: '#818CF8' }}>+$500 one-time build</p>}
                  <p className={`text-sm mb-5 ${p.popular ? 'text-white/70' : 'text-[var(--muted)]'}`}>{p.blurb}</p>
                  <ul className="space-y-2.5 flex-1 mb-6 text-sm">
                    {p.feats.map(f => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: p.popular ? '#b8d4ff' : p.custom ? '#818CF8' : '#1e3a5f' }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {p.custom ? (
                    <button onClick={() => setShowCustomModal(true)} className="dm-btn w-full justify-center" style={{ background: 'linear-gradient(180deg, #818CF8 0%, #6366F1cc 100%)', borderColor: 'rgba(255,255,255,0.2)' }}>
                      {p.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button className={p.popular ? 'dm-btn-glass w-full justify-center' : 'dm-btn w-full justify-center'}>{p.cta} <ArrowRight className="w-3.5 h-3.5" /></button>
                  )}
                </GlassPanel>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CUSTOM DASHBOARD MODAL ── */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(11,16,32,0.6)', backdropFilter: 'blur(8px)' }}>
          <GlassPanel className="p-8 max-w-md w-full relative">
            <button onClick={() => { setShowCustomModal(false); setCustomSubmitted(false); }} className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors">
              <span className="text-lg">×</span>
            </button>
            {!customSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-2xl grid place-items-center mx-auto mb-3" style={{ background: 'linear-gradient(135deg, #818CF8, #6366F1)', color: '#fff' }}>
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="dm-display text-xl">Custom Dashboard</h3>
                  <p className="text-sm text-[var(--muted)] mt-1">Tell us about your business and we'll design your perfect dashboard.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Business Name</label>
                    <input type="text" value={customForm.business} onChange={e => setCustomForm({...customForm, business: e.target.value})}
                           className="w-full px-3 py-2.5 text-sm bg-white/70 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.85)' }} placeholder="Your business name" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Email</label>
                    <input type="email" value={customForm.email} onChange={e => setCustomForm({...customForm, email: e.target.value})}
                           className="w-full px-3 py-2.5 text-sm bg-white/70 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.85)' }} placeholder="you@business.com" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">Industry / Vertical</label>
                    <select value={customForm.industry} onChange={e => setCustomForm({...customForm, industry: e.target.value})}
                            className="w-full px-3 py-2.5 text-sm bg-white/70 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.85)' }}>
                      <option value="">Select your industry...</option>
                      {['Photography', 'Aesthetician', 'Barber / Stylist', 'Popup Chef', 'Realtor', 'Creators / Influencers', 'Fitness / Trainer', 'Consultant / Coach', 'Marketing Agency', 'E-commerce', 'SaaS / Tech', 'Healthcare / Wellness', 'Legal / Professional Services', 'Restaurant / Hospitality', 'Construction / Trades', 'Other'].map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)] mb-1 block">What would your ideal dashboard do?</label>
                    <textarea value={customForm.features} onChange={e => setCustomForm({...customForm, features: e.target.value})}
                              className="w-full px-3 py-2.5 text-sm bg-white/70 rounded-xl border resize-none" style={{ borderColor: 'rgba(255,255,255,0.85)' }} rows={3}
                              placeholder="e.g., Track client appointments, automate follow-ups, manage my team schedule..." />
                  </div>
                  <button onClick={() => setCustomSubmitted(true)} className="dm-btn w-full justify-center" style={{ background: 'linear-gradient(180deg, #818CF8 0%, #6366F1cc 100%)' }}>
                    Request Custom Dashboard <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full grid place-items-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #818CF8, #6366F1)', color: '#fff' }}>
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="dm-display text-xl mb-2">Request Received!</h3>
                <p className="text-sm text-[var(--muted)]">We'll review your needs and reach out within 24 hours with a custom dashboard proposal.</p>
                <button onClick={() => { setShowCustomModal(false); setCustomSubmitted(false); }} className="dm-btn-glass mt-6">Close</button>
              </div>
            )}
          </GlassPanel>
        </div>
      )}

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="relative py-28 px-6 md:px-10">
        <div className="max-w-2xl mx-auto">
          <GlassPanel className="p-10 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-[90px] h-[90px] rounded-full bg-[#1e3a5f]/10 flex items-center justify-center"><Star className="w-8 h-8 text-[#1e3a5f]" /></div>
            </div>
            <h2 className="dm-display-th text-4xl md:text-5xl mb-3">Open the preview.</h2>
            <p className="text-[var(--muted)] mb-7">Early adopters get 3 months free. No spam, ever.</p>
            <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="you@studio.com"
                     className="flex-1 px-4 py-3 text-sm bg-white/70 rounded-full border"
                     style={{ borderColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }} />
              <button className="dm-btn" type="submit">Request invite <ArrowRight className="w-4 h-4" /></button>
            </form>
            {/* Trust signal */}
            <p className="text-[10px] text-[var(--muted)] mt-4">2,400+ creators joined. Unsubscribe anytime.</p>
          </GlassPanel>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4 text-xs text-[var(--muted)]">
          <div className="flex items-center gap-4">
            <a href="#/affiliates" className="hover:text-[var(--dl-ink)] transition-colors">Earn $400/referral → Become an Affiliate</a>
            <span className="flex items-center gap-2 text-[var(--muted)]">System Online</span>
          </div>
          <span>© 2026 · Built with intelligence</span>
        </div>
      </footer>

      {/* ── FLOATING GLASS DOCK ── */}
      <div className="dm-dock hidden md:flex">
        {dockItems.map((item) => {
          const isActive = activeIndex === item.idx;
          return (
            <button
              key={item.label}
              title={item.label}
              onClick={() => lockVertical(item.idx)}
              className="relative"
              style={isActive ? {
                boxShadow: `0 0 0 2px ${INDUSTRIES[item.idx].color}`,
                borderRadius: '50%',
              } : undefined}
            >
              <span style={{ color: isActive ? INDUSTRIES[item.idx].color : undefined }}>
                {item.icon}
              </span>
            </button>
          );
        })}
        <div style={{ width: 1, height: 22, background: 'rgba(11,16,32,0.12)' }} />
        <a href="#waitlist" className="dm-btn" style={{ padding: '.4rem 1rem', fontSize: '.78rem' }}>Join <ArrowRight className="w-3 h-3" /></a>
      </div>
    </div>
  );
}
