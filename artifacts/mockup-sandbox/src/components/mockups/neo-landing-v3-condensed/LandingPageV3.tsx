import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Zap, Activity } from 'lucide-react';
import { DeepFieldGallery } from '../../shared/DeepFieldGallery';
import { useCountUp } from '../../../hooks/useCountUp';
import { FEATURES, INDUSTRIES, TESTIMONIALS, STATS, PRICING } from '../../../data/landing';
import './_styles.css';

function ActivityFeed() {
  const items = [
    { who: 'Marcus L.', what: 'booked $4,200 wedding', when: '12s ago' },
    { who: 'NORI', what: 'scraped 247 leads (Atlanta)', when: '1m ago' },
    { who: 'Zara M.', what: 'sent 14 follow-ups', when: '4m ago' },
    { who: 'René D.', what: 'sold out popup #41', when: '8m ago' },
    { who: 'NORI', what: 'drafted captions × 9', when: '12m ago' },
  ];
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className="cd-activity-row">
          <span className="cd-activity-dot" />
          <span className="cd-mono text-[11px] text-[var(--muted)] w-16 shrink-0">{it.when}</span>
          <span><strong>{it.who}</strong> <span className="text-[var(--muted)]">{it.what}</span></span>
        </div>
      ))}
    </div>
  );
}

export function LandingPageV3Condensed() {
  const [industryIdx, setIndustryIdx] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const clients = useCountUp(STATS[0].val, statsVisible, 1800);
  const leads   = useCountUp(STATS[1].val, statsVisible, 2200);
  const rating  = useCountUp(STATS[2].val, statsVisible, 1200);
  const live    = useCountUp(247, true, 2400);

  useEffect(() => {
    const el = statsRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const ind = INDUSTRIES[industryIdx];

  return (
    <div className="cd-root w-full min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative w-full h-[95vh] overflow-hidden flex flex-col justify-end pb-12">
        <DeepFieldGallery bg="#0c0a1f" radius={16} cardW={180} cardH={240} />
        <div className="absolute inset-x-0 bottom-0 h-40 z-[5]" style={{ background: 'linear-gradient(to bottom, transparent, #f1f0ec)' }} />

        <nav className="absolute top-0 inset-x-0 px-6 md:px-10 py-5 flex justify-between items-center z-20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md grid place-items-center" style={{ background: '#b8ff3a' }}>
              <Zap className="w-4 h-4" style={{ color: '#0c0a1f' }} />
            </div>
            <span className="cd-display text-white text-lg">neo gents</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#features">Build</a><a href="#industries">Verticals</a><a href="#pricing">Pricing</a>
            <button className="cd-btn-neon">Get access</button>
          </div>
        </nav>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full">
          <span className="cd-pill cd-pill-live" style={{ background: '#ffffff14', color: '#ffffffe6', borderColor: '#ffffff24' }}>BETA · 247 LEADS / HR</span>
          <h1 className="cd-condense text-white mt-6 mb-6" style={{ fontSize: 'clamp(4rem, 11vw, 11rem)', lineHeight: '0.88' }}>
            STUDIO.<br />
            BRAND.<br />
            <span style={{ color: '#b8ff3a' }}>EMPIRE.</span>
          </h1>
          <p className="text-white/65 text-lg max-w-md mb-7">The operating system creative professionals actually want to open every morning.</p>
          <div className="flex gap-3 flex-wrap">
            <a href="#waitlist" className="cd-btn-neon">Get early access <ArrowRight className="w-4 h-4" /></a>
            <a href="#features" className="cd-btn" style={{ background: '#ffffff14', backdropFilter: 'blur(8px)' }}>See how it works</a>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-6 border-y" style={{ background: 'var(--indigo)', color: '#fff', borderColor: '#ffffff10' }}>
        <div className="cd-marquee">
          {['LEAD RADAR', '·', 'AGENTIC CRM', '·', 'CONTENT ENGINE', '·', 'SMART BOOKING', '·', 'VOICE INTEL', '·',
            'LEAD RADAR', '·', 'AGENTIC CRM', '·', 'CONTENT ENGINE', '·', 'SMART BOOKING', '·', 'VOICE INTEL', '·'
          ].map((t, i) => <span key={i} style={t === '·' ? { color: '#b8ff3a' } : {}}>{t}</span>)}
        </div>
      </div>

      {/* ── BENTO STATS ── */}
      <section ref={statsRef} className="py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="cd-bento col-span-12 md:col-span-7" style={{ background: 'var(--indigo)', color: '#fff', borderColor: 'transparent' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="cd-pill cd-pill-live" style={{ background: '#ffffff10', color: '#fff', borderColor: '#ffffff24' }}>LIVE / 1H</span>
              </div>
              <div className="cd-condense text-[7rem] leading-none" style={{ color: '#b8ff3a' }}>{live}</div>
              <div className="text-sm text-white/60 mt-2">Leads scraped in the last hour. Updated in real time.</div>
            </div>
            <div className="col-span-12 md:col-span-5 grid grid-cols-1 gap-4">
              {[
                { v: clients.toLocaleString() + '+', l: 'active creatives', c: 'var(--violet)' },
                { v: leads.toLocaleString()   + '+', l: 'leads scraped',    c: 'var(--ink)' },
                { v: rating + '%',                   l: 'satisfaction',     c: 'var(--violet)' },
              ].map((k, i) => (
                <div key={i} className="cd-card flex items-center justify-between">
                  <div>
                    <div className="cd-condense cd-num-target text-4xl" style={{ color: k.c }}>{k.v}</div>
                    <div className="cd-mono text-[10px] tracking-widest uppercase text-[var(--muted)]">{k.l}</div>
                  </div>
                  <Activity className="w-5 h-5 text-[var(--muted)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES — bento grid ── */}
      <section id="features" className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <h2 className="cd-condense text-5xl md:text-7xl leading-[0.9]">SEVEN<br />MODULES.<br />ONE OS.</h2>
            <p className="text-[var(--muted)] max-w-sm">Hover anything. Cards react. Numbers move. This is what your dashboard will feel like.</p>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {FEATURES.map(({ Icon, title, desc, wide }, i) => (
              <div key={i} className={`cd-card group ${wide ? 'col-span-12' : 'col-span-12 md:col-span-6 lg:col-span-4'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg grid place-items-center" style={{ background: 'var(--indigo)', color: '#b8ff3a' }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="cd-mono text-[10px] tracking-widest uppercase text-[var(--muted)]">{String(i + 1).padStart(2, '0')} / 07</span>
                </div>
                <h3 className="cd-display text-xl mb-2 cd-num-target">{title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{desc}</p>
                {wide && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="cd-pill">47 langs</span>
                    <span className="cd-pill" style={{ color: 'var(--violet)', borderColor: '#7c3aed40' }}>auto-detect</span>
                    <span className="cd-pill cd-mono">0.18s latency</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITY + INDUSTRIES SPLIT ── */}
      <section id="industries" className="py-24 px-6 md:px-10" style={{ background: 'var(--indigo)', color: '#fff' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-4 cd-bento" style={{ background: '#ffffff08', borderColor: '#ffffff14' }}>
            <p className="cd-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: '#b8ff3a' }}>// live activity</p>
            <div style={{ color: '#fff' }}>
              <ActivityFeed />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <h2 className="cd-condense text-5xl md:text-6xl mb-6">FIVE VERTICALS.<br /><span style={{ color: '#b8ff3a' }}>ONE PLATFORM.</span></h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {INDUSTRIES.map(({ label, Icon }, i) => (
                <button key={label} onClick={() => setIndustryIdx(i)}
                  className="flex items-center gap-2 px-4 py-2 text-sm transition-all"
                  style={industryIdx === i
                    ? { background: '#b8ff3a', color: '#0c0a1f', borderRadius: 8, fontWeight: 700 }
                    : { background: '#ffffff10', color: '#ffffffaa', border: '1px solid #ffffff20', borderRadius: 8 }}>
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>

            <div className="cd-bento" style={{ background: '#ffffff08', borderColor: '#ffffff14', color: '#fff' }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg grid place-items-center" style={{ background: ind.color + '30' }}>
                    <ind.Icon className="w-5 h-5" style={{ color: ind.color }} />
                  </div>
                  <h3 className="cd-display text-2xl">{ind.label}</h3>
                </div>
                <a href={ind.route} className="cd-mono text-xs flex items-center gap-1" style={{ color: '#b8ff3a' }}>Open demo →</a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ind.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-md" style={{ background: '#ffffff06' }}>
                    <Check className="w-3.5 h-3.5" style={{ color: '#b8ff3a' }} />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto cd-bento">
          <span className="cd-pill cd-mono mb-5">FIELD REPORT / 01</span>
          <blockquote className="cd-display text-3xl md:text-4xl leading-tight mb-6 mt-4">
            "{TESTIMONIALS[0].text}"
          </blockquote>
          <div className="flex items-center gap-3 cd-mono text-xs text-[var(--muted)]">
            <div className="w-8 h-8 rounded-full" style={{ background: 'var(--violet)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700 }}>{TESTIMONIALS[0].name[0]}</div>
            {TESTIMONIALS[0].name} · {TESTIMONIALS[0].role}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6 md:px-10" style={{ background: 'var(--ink)', color: '#fff' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="cd-condense text-5xl md:text-7xl mb-12">START FREE.<br /><span style={{ color: '#b8ff3a' }}>SCALE WHEN READY.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING.map((p, i) => (
              <div key={i} className="cd-bento flex flex-col" style={p.popular
                ? { background: '#b8ff3a', color: '#0c0a1f', borderColor: '#b8ff3a' }
                : { background: '#ffffff08', borderColor: '#ffffff14', color: '#fff' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="cd-mono text-[10px] tracking-widest uppercase">{p.tier}</span>
                  {p.popular && <span className="cd-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded" style={{ background: '#0c0a1f', color: '#b8ff3a' }}>★ MOST POPULAR</span>}
                </div>
                <div className="cd-condense text-6xl leading-none mb-1">${p.price}<span className="cd-mono text-sm ml-1">/mo</span></div>
                <p className="text-sm opacity-75 mb-5">{p.blurb}</p>
                <ul className="space-y-2 flex-1 mb-5 text-sm">
                  {p.feats.map(f => (
                    <li key={f} className="flex items-start gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5" /> <span>{f}</span></li>
                  ))}
                </ul>
                <button className={p.popular ? 'cd-btn w-full justify-center' : 'cd-btn-neon w-full justify-center'} style={p.popular ? {} : { background: '#b8ff3a' }}>{p.cta} <ArrowRight className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="py-28 px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="cd-pill cd-pill-live mb-4">LIMITED · COHORT 01</span>
          <h2 className="cd-condense text-5xl md:text-6xl mt-4 mb-4">BE FIRST.</h2>
          <p className="text-[var(--muted)] mb-7">Early adopters get 3 months free on any paid plan.</p>
          <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="you@studio.com" className="flex-1 px-4 py-3 bg-white text-sm" style={{ border: '1px solid var(--line-2)', borderRadius: 6 }} />
            <button className="cd-btn-neon">Join <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </section>

      <footer className="py-8 px-6 md:px-10 border-t" style={{ borderColor: 'var(--line-2)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className="cd-condense text-2xl">NEO GENTS</span>
          <span className="cd-mono text-xs text-[var(--muted)]">made with N.O.R.I. — © 2026</span>
        </div>
      </footer>
    </div>
  );
}
