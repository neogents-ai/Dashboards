import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { ArrowRight, Check, Sparkles, Home, Camera, Scissors, ChefHat, Compass, Settings2 } from 'lucide-react';
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

export function LandingPageV3DeepMind() {
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
    <div className="dm-root w-full overflow-x-hidden">

      {/* aurora background blobs */}
      <div className="dm-aurora" />

      {/* ── NAV (floating glass) ── */}
      <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4">
        <nav className="dm-glass-strip">
          <Sparkles className="w-4 h-4" style={{ color: '#8a5cf6' }} />
          <span className="font-semibold">NEO Gents</span>
          <span className="text-[var(--muted)] hidden md:inline">·</span>
          <a href="#features" className="hidden md:inline hover:opacity-70">Platform</a>
          <a href="#industries" className="hidden md:inline hover:opacity-70">Industries</a>
          <a href="#pricing" className="hidden md:inline hover:opacity-70">Pricing</a>
          <a href="#waitlist" className="dm-btn ml-1" style={{ padding: '.4rem .9rem', fontSize: '.8rem' }}>Get access</a>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="relative w-full min-h-screen overflow-hidden flex items-center pt-28 pb-20 px-6 md:px-10">
        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-7">
            <div className="dm-glass-strip mb-6">
              <span className="dm-thinking-dot" /><span className="dm-thinking-dot" /><span className="dm-thinking-dot" />
              <span className="text-[var(--muted)]">N.O.R.I. is thinking — 47 languages online</span>
            </div>
            <h1 className="dm-display-th text-[3.25rem] md:text-[5.5rem] leading-[1] mb-6">
              <span>The intelligence layer for </span>
              <span className="dm-grad-text dm-display">creative professionals</span>
              <span>.</span>
            </h1>
            <p className="text-[var(--muted)] text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
              A unified operating system — Lead Radar, Agentic CRM, Content Engine — animated by NORI, the multilingual intelligence that opens with your morning coffee.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="#waitlist" className="dm-btn">Try the preview <ArrowRight className="w-4 h-4" /></a>
              <a href="#features" className="dm-btn-glass">Explore capabilities</a>
            </div>
          </div>

          {/* Glass hero panel with gallery + orb */}
          <div className="col-span-12 md:col-span-5">
            <GlassPanel className="p-6">
              <div className="relative h-[360px] rounded-2xl overflow-hidden mb-4" style={{ background: '#0b1020' }}>
                <DeepFieldGallery bg="#0b1020" radius={14} cardW={130} cardH={170} />
                {/* The orb */}
                <div className="absolute inset-0 z-[6] grid place-items-center pointer-events-none">
                  <div className="dm-orb" style={{ width: 180, height: 180 }} />
                </div>
                <div className="absolute bottom-3 left-3 z-[7] dm-glass-strip" style={{ background: 'rgba(255,255,255,0.85)' }}>
                  <span className="dm-thinking-dot" /><span className="dm-thinking-dot" /><span className="dm-thinking-dot" />
                  <span className="font-medium">Analyzing 10,247 leads</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[{ k: 'EN', n: '24.1k' }, { k: 'YO', n: '892' }, { k: 'KO', n: '1.4k' }].map((c, i) => (
                  <div key={i} className="dm-glass-strip flex-col py-2" style={{ borderRadius: 14 }}>
                    <span className="dm-mono text-[10px] tracking-widest">{c.k}</span>
                    <span className="font-semibold">{c.n}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* ── STATS — glass tiles ── */}
      <section ref={statsRef} className="relative py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">
          <GlassPanel className="col-span-12 md:col-span-6 p-7" dark>
            <span className="dm-pill" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
              <span className="dm-thinking-dot" /> LIVE · 1H
            </span>
            <div className="dm-display dm-num text-[6rem] leading-none mt-4" style={{ color: '#fff' }}>{live}</div>
            <div className="text-white/60">Leads scraped right now across 14 cities</div>
          </GlassPanel>
          {[
            { v: clients.toLocaleString() + '+', l: 'Creative professionals', c: '#3b6bff' },
            { v: leads.toLocaleString() + '+',   l: 'Lifetime leads',         c: '#8a5cf6' },
            { v: rating + '%',                   l: 'Satisfaction',           c: '#c89c3f' },
          ].map((k, i) => (
            <GlassPanel key={i} className="col-span-12 md:col-span-2 p-6">
              <div className="dm-pill mb-3" style={{ borderColor: k.c + '40', color: k.c }}>Metric</div>
              <div className="dm-display dm-num text-4xl">{k.v}</div>
              <div className="text-xs text-[var(--muted)] mt-2">{k.l}</div>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* ── FEATURES — glass bento ── */}
      <section id="features" className="relative py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="dm-pill inline-flex mb-5"><Compass className="w-3 h-3" /> capabilities</div>
            <h2 className="dm-display-th text-4xl md:text-6xl leading-[1] max-w-3xl mx-auto">
              Built like an <span className="dm-grad-text dm-display">intelligence</span>, not a dashboard.
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {FEATURES.map(({ Icon, title, desc, wide }, i) => (
              <GlassPanel key={i} className={`p-6 ${wide ? 'col-span-12' : 'col-span-12 md:col-span-6 lg:col-span-4'}`}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl grid place-items-center"
                       style={{ background: 'linear-gradient(135deg, #3b6bff, #8a5cf6)', color: '#fff', boxShadow: '0 8px 22px -8px rgba(138,92,246,0.5)' }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="dm-mono text-[10px] tracking-widest text-[var(--muted)]">M0{i + 1}</span>
                </div>
                <h3 className="dm-display text-xl mb-2">{title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{desc}</p>
                {wide && (
                  <div className="mt-5 flex items-center gap-3 flex-wrap">
                    <div className="dm-glass-strip"><span className="dm-thinking-dot" /><span className="dm-thinking-dot" /><span className="dm-thinking-dot" /><span className="text-[var(--muted)]">Listening · 47 langs</span></div>
                    <span className="dm-pill" style={{ borderColor: '#3b6bff40', color: '#3b6bff' }}>Auto-detect</span>
                    <span className="dm-mono text-xs text-[var(--muted)]">0.18s latency</span>
                  </div>
                )}
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="relative py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="dm-pill inline-flex mb-4"><Settings2 className="w-3 h-3" /> verticals</div>
            <h2 className="dm-display-th text-4xl md:text-5xl">Tuned for your craft.</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {INDUSTRIES.map(({ label, Icon, color }, i) => (
              <button key={label} onClick={() => setIndustryIdx(i)}
                className="dm-glass-strip transition-all"
                style={industryIdx === i
                  ? { background: 'rgba(11,16,32,0.92)', color: '#fff', borderColor: color, boxShadow: `0 8px 28px -8px ${color}80` }
                  : {}}>
                <Icon className="w-3.5 h-3.5" style={industryIdx === i ? { color } : {}} /> {label}
              </button>
            ))}
          </div>

          <GlassPanel className="p-8">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-4">
                <div className="w-14 h-14 rounded-2xl grid place-items-center mb-4" style={{ background: ind.color + '20', color: ind.color }}>
                  <ind.Icon className="w-7 h-7" />
                </div>
                <h3 className="dm-display text-3xl mb-2">{ind.label}</h3>
                <p className="text-sm text-[var(--muted)] mb-5">Industry-specific intelligence tuned to your exact workflow — pre-trained on the patterns of top performers.</p>
                <a href={ind.route} className="dm-btn" style={{ background: `linear-gradient(180deg, ${ind.color} 0%, ${ind.color}cc 100%)`, borderColor: 'rgba(255,255,255,0.2)' }}>Open dashboard <ArrowRight className="w-4 h-4" /></a>
              </div>
              <div className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ind.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.7)' }}>
                    <div className="w-7 h-7 rounded-full grid place-items-center flex-shrink-0" style={{ background: ind.color + '20', color: ind.color }}>
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
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
            <div className="w-7 h-7 rounded-full grid place-items-center text-xs font-bold" style={{ background: 'linear-gradient(135deg, #3b6bff, #8a5cf6)', color: '#fff' }}>{TESTIMONIALS[0].name[0]}</div>
            <span>{TESTIMONIALS[0].name}</span>
            <span className="text-[var(--muted)]">{TESTIMONIALS[0].role}</span>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="relative py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="dm-pill inline-flex mb-4">pricing</div>
            <h2 className="dm-display-th text-4xl md:text-5xl">Three tiers. <span className="dm-grad-text dm-display">One mind.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING.map((p, i) => (
              <GlassPanel key={i} dark={p.popular} className="p-7 flex flex-col"
                          style={p.popular ? { boxShadow: '0 30px 80px -20px rgba(59,107,255,0.55)' } : {}}>
                <div className="flex items-center justify-between mb-4">
                  <span className="dm-pill" style={p.popular ? { background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' } : {}}>{p.tier}</span>
                  {p.popular && <span className="dm-mono text-[10px] tracking-widest px-2 py-1 rounded-full" style={{ background: 'linear-gradient(90deg, #3b6bff, #8a5cf6)', color: '#fff' }}>RECOMMENDED</span>}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="dm-display-th text-6xl">${p.price}</span>
                  <span className="opacity-60 mb-1.5">/mo</span>
                </div>
                <p className={`text-sm mb-5 ${p.popular ? 'text-white/70' : 'text-[var(--muted)]'}`}>{p.blurb}</p>
                <ul className="space-y-2.5 flex-1 mb-6 text-sm">
                  {p.feats.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: p.popular ? '#b8d4ff' : '#3b6bff' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={p.popular ? 'dm-btn-glass w-full justify-center' : 'dm-btn w-full justify-center'}>{p.cta} <ArrowRight className="w-3.5 h-3.5" /></button>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="relative py-28 px-6 md:px-10">
        <div className="max-w-2xl mx-auto">
          <GlassPanel className="p-10 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="dm-orb" style={{ width: 90, height: 90 }} />
            </div>
            <h2 className="dm-display-th text-4xl md:text-5xl mb-3">Open the preview.</h2>
            <p className="text-[var(--muted)] mb-7">Early adopters get 3 months free. No spam, ever.</p>
            <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="you@studio.com"
                     className="flex-1 px-4 py-3 text-sm bg-white/70 rounded-full border"
                     style={{ borderColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }} />
              <button className="dm-btn" type="submit">Request invite <ArrowRight className="w-4 h-4" /></button>
            </form>
          </GlassPanel>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4 text-xs text-[var(--muted)]">
          <span>NEO Gents · © 2026 · Built with intelligence</span>
          <span className="flex items-center gap-2"><span className="dm-thinking-dot" /><span className="dm-thinking-dot" /><span className="dm-thinking-dot" /> NORI online</span>
        </div>
      </footer>

      {/* ── FLOATING GLASS DOCK ── */}
      <div className="dm-dock hidden md:flex">
        <button title="Home"><Sparkles className="w-4 h-4" /></button>
        <button title="Photo"><Camera className="w-4 h-4" /></button>
        <button title="Realtor"><Home className="w-4 h-4" /></button>
        <button title="Barber"><Scissors className="w-4 h-4" /></button>
        <button title="Chef"><ChefHat className="w-4 h-4" /></button>
        <div style={{ width: 1, height: 22, background: 'rgba(11,16,32,0.12)' }} />
        <a href="#waitlist" className="dm-btn" style={{ padding: '.4rem 1rem', fontSize: '.78rem' }}>Join <ArrowRight className="w-3 h-3" /></a>
      </div>
    </div>
  );
}
