import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Activity, TrendingUp, Star } from 'lucide-react';
import { DeepFieldGallery } from '../../shared/DeepFieldGallery';
import { useCountUp } from '../../../hooks/useCountUp';
import { FEATURES, INDUSTRIES, TESTIMONIALS, STATS, PRICING } from '../../../data/landing';
import './_styles.css';

function MiniSpark({ seed = 1 }: { seed?: number }) {
  const pts = Array.from({ length: 18 }, (_, i) => {
    const y = 24 - Math.abs(Math.sin(i * 0.7 + seed) * 10 + Math.cos(i * 1.3 + seed * 2) * 6 + 4);
    return `${(i / 17) * 100},${y.toFixed(1)}`;
  }).join(' ');
  const id = `ed-grad-${seed}`;
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-full h-7">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff5b1f" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff5b1f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke="#ff5b1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,28 ${pts} 100,28`} fill={`url(#${id})`} />
    </svg>
  );
}

export function LandingPageV3Editorial() {
  const [industryIdx, setIndustryIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const clients = useCountUp(STATS[0].val, statsVisible, 1800);
  const leads   = useCountUp(STATS[1].val, statsVisible, 2200);
  const rating  = useCountUp(STATS[2].val, statsVisible, 1200);
  const liveLeads = useCountUp(247, true, 2400);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const ind = INDUSTRIES[industryIdx];
  const tickerItems = [
    'NORI scraped 247 new leads in the last hour',
    'Marcus L. just booked a $4,200 wedding',
    'Aesthetician dashboard live in 14 cities',
    '98% satisfaction across 2,400 creatives',
    'New: Korean & Yoruba voice support',
  ];

  return (
    <div className="ed-root w-full min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative w-full h-[92vh] overflow-hidden flex flex-col justify-end pb-12">
        <DeepFieldGallery bg="#0f0f10" radius={10} />

        {/* dark→bone gradient mask to soften transition */}
        <div className="absolute inset-x-0 bottom-0 h-40 z-[5] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #f6f5f1)' }} />

        {/* Nav */}
        <nav className="absolute top-0 inset-x-0 px-6 md:px-10 py-5 flex justify-between items-center z-20">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-white grid place-items-center"><div className="w-3 h-3 bg-[#0f0f10]" style={{ clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' }} /></div>
            <span className="text-white font-medium tracking-tight">NEO Gents</span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm text-white/70">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#industries" className="hover:text-white">Industries</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#waitlist" className="hover:text-white">Changelog</a>
            <button className="ed-btn" style={{ background: '#fff', color: '#0f0f10', borderColor: '#fff' }}>Get access <ArrowRight className="w-3.5 h-3.5" /></button>
          </div>
        </nav>

        {/* Hero content — left-aligned, editorial */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="ed-pill" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.16)', color: 'rgba(255,255,255,0.85)' }}>
              <span className="ed-pill-dot" /> v0.9 — Early access open
            </span>
          </div>
          <h1 className="ed-display text-white text-[3.5rem] md:text-[6.5rem] leading-[0.92] mb-6 max-w-4xl">
            Your studio.<br />
            Your brand.<br />
            <span style={{ color: '#ff5b1f' }}>Your empire.</span>
          </h1>
          <p className="text-white/65 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            The operating system creative professionals actually want to open every morning. Lead radar, agentic CRM, content engine — one app.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#waitlist" className="ed-btn" style={{ background: '#ff5b1f', borderColor: '#ff5b1f' }}>Join the waitlist <ArrowRight className="w-4 h-4" /></a>
            <a href="#features" className="ed-btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}>See the product</a>
          </div>
        </div>
      </section>

      {/* ── LIVE TICKER ── */}
      <div className="bg-[#0f0f10] py-3 overflow-hidden border-y border-white/5">
        <div className="ed-ticker">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              <Activity className="w-3 h-3" style={{ color: '#ff5b1f' }} /> {t} <span className="text-white/20">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS / DASHBOARD WIDGET STRIP ── */}
      <section ref={statsRef} className="py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="ed-mono text-xs tracking-widest uppercase text-[var(--muted)] mb-2">/ live</p>
              <h2 className="ed-display text-3xl md:text-4xl">What NORI is doing right now.</h2>
            </div>
            <a href="#features" className="text-sm flex items-center gap-1 hover:text-[var(--accent)]">View dashboard <ArrowUpRight className="w-3.5 h-3.5" /></a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Live counter card */}
            <div className="ed-card p-6 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="ed-pill-dot" />
                <span className="ed-mono text-[10px] tracking-widest uppercase text-[var(--muted)]">Live · 1h</span>
              </div>
              <div className="ed-kpi-num text-5xl mb-1">{liveLeads}</div>
              <div className="text-sm text-[var(--muted)]">Leads scraped right now</div>
              <div className="mt-4"><MiniSpark seed={3} /></div>
            </div>

            {[
              { v: clients.toLocaleString() + '+', l: 'Creative pros on NEO Gents', s: 7 },
              { v: leads.toLocaleString() + '+',   l: 'Total leads AI-scraped',     s: 11 },
              { v: rating + '%',                   l: 'Satisfaction across users',  s: 5 },
            ].map((k, i) => (
              <div key={i} className="ed-card p-6">
                <div className="ed-mono text-[10px] tracking-widest uppercase text-[var(--muted)] mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3" /> {['Active', 'Lifetime', 'Score'][i]}
                </div>
                <div className="ed-kpi-num text-5xl mb-1">{k.v}</div>
                <div className="text-sm text-[var(--muted)]">{k.l}</div>
                <div className="mt-4"><MiniSpark seed={k.s} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES — bento-ish editorial grid ── */}
      <section id="features" className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14 gap-8 flex-wrap">
            <div className="max-w-xl">
              <p className="ed-mono text-xs tracking-widest uppercase text-[var(--muted)] mb-3">/ 01 · platform</p>
              <h2 className="ed-display text-4xl md:text-5xl leading-[1]">Built for how you<br />actually work.</h2>
            </div>
            <p className="text-[var(--muted)] max-w-sm text-[15px] leading-relaxed">
              Seven modules. One opinionated workflow. Designed by operators, not by AI.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {FEATURES.map(({ Icon, title, desc, wide }, i) => (
              <div key={i} className={`ed-card p-7 ${wide ? 'col-span-12 md:col-span-12' : 'col-span-12 md:col-span-6 lg:col-span-4'}`}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 grid place-items-center bg-[var(--ink)] text-[#fff] rounded-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="ed-mono text-[10px] text-[var(--muted)]">0{i + 1}</span>
                </div>
                <h3 className="ed-display text-xl mb-2">{title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{desc}</p>
                {wide && (
                  <div className="mt-6 flex items-center gap-4 text-xs text-[var(--muted)]">
                    <span className="ed-pill"><span className="ed-pill-dot" /> 47 langs</span>
                    <span className="ed-pill" style={{ borderColor: '#ff5b1f40', color: '#ff5b1f' }}>Auto-detect</span>
                    <span className="ed-mono">→ 0.18s latency</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES — warm-charcoal section ── */}
      <section id="industries" className="py-24 px-6 md:px-10" style={{ background: 'var(--warm)', color: '#fff' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="ed-mono text-xs tracking-widest uppercase text-white/40 mb-3">/ 02 · verticals</p>
            <h2 className="ed-display text-4xl md:text-5xl">Five dashboards. One platform.</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {INDUSTRIES.map(({ label, Icon }, i) => (
              <button
                key={label}
                onClick={() => setIndustryIdx(i)}
                className="flex items-center gap-2 px-4 py-2 text-sm transition-all"
                style={industryIdx === i
                  ? { background: '#fff', color: '#0f0f10', borderRadius: 8 }
                  : { background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8 }}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 rounded-xl p-7 border border-white/10 bg-black/30">
              <div className="w-12 h-12 rounded-md grid place-items-center mb-5" style={{ background: ind.color + '22' }}>
                <ind.Icon className="w-6 h-6" style={{ color: ind.color }} />
              </div>
              <h3 className="ed-display text-2xl mb-2">{ind.label}</h3>
              <p className="text-white/55 text-sm mb-6">Industry-specific dashboard tuned to your exact workflow.</p>
              <a href={ind.route} className="text-sm flex items-center gap-1 hover:underline" style={{ color: ind.color }}>View demo <ArrowUpRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="lg:col-span-2 rounded-xl p-7 border border-white/10 bg-black/30">
              <div className="ed-mono text-[10px] tracking-widest uppercase text-white/40 mb-4">Included modules</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ind.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-md border border-white/8 bg-white/[0.02]">
                    <div className="w-4 h-4 rounded-[3px] grid place-items-center flex-shrink-0" style={{ background: ind.color + '30' }}>
                      <Check className="w-3 h-3" style={{ color: ind.color }} />
                    </div>
                    <span className="text-sm text-white/85">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <p className="ed-mono text-xs tracking-widest uppercase text-[var(--muted)] mb-6">/ 03 · proof</p>
          <blockquote className="ed-display text-3xl md:text-5xl leading-[1.05] mb-8">
            "{TESTIMONIALS[testimonialIdx].text}"
          </blockquote>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-base font-medium">{TESTIMONIALS[testimonialIdx].name}</div>
              <div className="text-sm text-[var(--muted)]">{TESTIMONIALS[testimonialIdx].role}</div>
            </div>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)}
                  style={{ width: testimonialIdx === i ? 28 : 8, height: 4, background: testimonialIdx === i ? 'var(--ink)' : 'var(--line-2)', borderRadius: 2, transition: 'all .3s' }} />
              ))}
            </div>
          </div>
          <div className="flex mt-3">
            {Array.from({ length: TESTIMONIALS[testimonialIdx].rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4" style={{ color: '#ff5b1f', fill: '#ff5b1f' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6 md:px-10" style={{ background: 'var(--paper)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="ed-mono text-xs tracking-widest uppercase text-[var(--muted)] mb-3">/ 04 · pricing</p>
            <h2 className="ed-display text-4xl md:text-5xl">Start free. Scale when you're ready.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING.map((p, i) => (
              <div key={i} className="ed-card p-7 flex flex-col" style={p.popular ? { borderColor: 'var(--ink)', borderWidth: 1.5 } : {}}>
                <div className="flex items-center justify-between mb-4">
                  <p className="ed-mono text-[10px] tracking-widest uppercase text-[var(--muted)]">{p.tier}</p>
                  {p.popular && <span className="ed-pill" style={{ background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' }}>Most popular</span>}
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="ed-display text-5xl">${p.price}</span>
                  <span className="text-[var(--muted)] text-sm mb-1.5">/mo</span>
                </div>
                <p className="text-sm text-[var(--muted)] mb-6">{p.blurb}</p>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {p.feats.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#ff5b1f' }} /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={p.popular ? 'ed-btn w-full justify-center' : 'ed-btn-ghost w-full justify-center'}>{p.cta} <ArrowRight className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="py-28 px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="ed-mono text-xs tracking-widest uppercase text-[var(--muted)] mb-3">/ 05 · access</p>
          <h2 className="ed-display text-4xl md:text-5xl mb-4">Be first when we launch.</h2>
          <p className="text-[var(--muted)] mb-8">Early adopters get 3 months free. No spam, ever.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="you@studio.com" className="flex-1 px-4 py-3 rounded-md border bg-white text-sm" style={{ borderColor: 'var(--line-2)' }} />
            <button className="ed-btn" style={{ background: '#ff5b1f', borderColor: '#ff5b1f' }} type="submit">Request invite <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 md:px-10 border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-5 h-5 rounded-sm bg-[var(--ink)]" />
            <span className="font-medium">NEO Gents</span>
            <span className="text-[var(--muted)] ml-3">© 2026</span>
          </div>
          <div className="ed-mono text-xs text-[var(--muted)]">Powered by N.O.R.I. · {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
}
