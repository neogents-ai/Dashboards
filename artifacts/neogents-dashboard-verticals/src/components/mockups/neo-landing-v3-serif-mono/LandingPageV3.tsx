import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { DeepFieldGallery } from '../../shared/DeepFieldGallery';
import { useCountUp } from '../../../hooks/useCountUp';
import { FEATURES, INDUSTRIES, TESTIMONIALS, STATS, PRICING } from '../../../data/landing';
import './_styles.css';

export function LandingPageV3SerifMono() {
  const [industryIdx, setIndustryIdx] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const clients = useCountUp(STATS[0].val, statsVisible, 1800);
  const leads   = useCountUp(STATS[1].val, statsVisible, 2200);
  const rating  = useCountUp(STATS[2].val, statsVisible, 1200);

  useEffect(() => {
    const el = statsRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const ind = INDUSTRIES[industryIdx];

  return (
    <div className="sm-root w-full min-h-screen overflow-x-hidden">

      {/* ── MASTHEAD ── */}
      <header className="border-b" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="sm-serif text-2xl font-semibold">NEO Gents</h1>
            <span className="sm-mono text-[10px] text-[var(--muted)]">— OS for creatives · est. 2026</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 sm-eyebrow">
            <a href="#features" className="sm-link">Platform</a>
            <a href="#industries" className="sm-link">Industries</a>
            <a href="#pricing" className="sm-link">Pricing</a>
            <a href="#waitlist" className="sm-link">Waitlist</a>
          </nav>
          <div className="flex items-center gap-3">
            <span className="sm-mono text-[10px] text-[var(--muted)] hidden md:flex items-center gap-1.5">
              <span className="sm-status-dot" /> ALL SYSTEMS OPERATIONAL
            </span>
            <a href="#waitlist" className="sm-btn">Get access</a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '88vh' }}>
        <DeepFieldGallery bg="#15161a" radius={4} />

        {/* paper fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 z-[5]" style={{ background: 'linear-gradient(to bottom, transparent, #f5f1ea)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-32 pb-20 md:pb-32 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <p className="sm-mono text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: '#fff', opacity: 0.7 }}>Vol. I · No. 01 — The Creative OS</p>
            <h1 className="sm-serif text-white text-5xl md:text-7xl leading-[1] font-medium mb-6">
              The operating system <em className="font-normal" style={{ color: '#e8d4b8' }}>creative professionals</em> actually want to open every morning.
            </h1>
            <div className="flex gap-3 flex-wrap">
              <a href="#waitlist" className="sm-btn" style={{ background: '#f5f1ea', color: '#15161a' }}>Request access <ArrowRight className="w-3.5 h-3.5" /></a>
              <a href="#features" className="sm-btn-ghost" style={{ borderColor: '#f5f1ea99', color: '#f5f1ea' }}>Read the brief</a>
            </div>
          </div>
          <aside className="col-span-12 md:col-span-4 md:col-start-9 mt-8 md:mt-0">
            <div className="border-t border-b py-4" style={{ borderColor: '#ffffff26' }}>
              <p className="sm-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: '#ffffff60' }}>In this issue</p>
              <ul className="space-y-2.5 sm-mono text-xs" style={{ color: '#ffffffa0' }}>
                <li className="flex justify-between"><span>01 · Lead Radar</span><span style={{ color: '#fff' }}>p. 04</span></li>
                <li className="flex justify-between"><span>02 · Agentic CRM</span><span style={{ color: '#fff' }}>p. 09</span></li>
                <li className="flex justify-between"><span>03 · Voice Intel</span><span style={{ color: '#fff' }}>p. 14</span></li>
                <li className="flex justify-between"><span>04 · Five Verticals</span><span style={{ color: '#fff' }}>p. 21</span></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section ref={statsRef} className="border-y" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-3 divide-x" style={{ borderColor: 'var(--rule)' }}>
          {[
            { v: clients.toLocaleString(), suf: '+', l: 'Creative professionals', src: '1' },
            { v: leads.toLocaleString(),   suf: '+', l: 'Leads scraped by NORI',  src: '2' },
            { v: rating.toString(),        suf: '%', l: 'Satisfaction rate',      src: '3' },
          ].map((k, i) => (
            <div key={i} className="px-6 first:pl-0 last:pr-0">
              <p className="sm-eyebrow mb-2">Metric · 0{i + 1}</p>
              <div className="flex items-baseline gap-1">
                <span className="sm-num text-5xl font-semibold">{k.v}</span>
                <span className="sm-num text-2xl text-[var(--terra)]">{k.suf}</span>
              </div>
              <p className="text-sm mt-1">{k.l}</p>
              <p className="sm-footnote mt-2">Source: NEO Gents internal<sup>{k.src}</sup></p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES — newspaper columns ── */}
      <section id="features" className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-14">
            <div className="col-span-12 md:col-span-3">
              <p className="sm-eyebrow mb-3">Section A · Platform</p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="sm-serif text-4xl md:text-6xl font-medium leading-[1.05] max-w-3xl">
                Tools designed to get out of your way and let your art speak for itself.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
            {FEATURES.slice(0, 6).map(({ Icon, title, desc }, i) => (
              <article key={i} className="sm-card-flush">
                <div className="flex items-center justify-between mb-3">
                  <span className="sm-eyebrow">No. {String(i + 1).padStart(2, '0')}</span>
                  <Icon className="w-4 h-4 text-[var(--muted)]" />
                </div>
                <h3 className="sm-serif text-2xl mb-2 font-medium">{title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{desc}</p>
                <a href="#" className="sm-link sm-mono text-xs mt-3 inline-flex" style={{ color: 'var(--terra)' }}>Read more →</a>
              </article>
            ))}
          </div>

          {/* Wide feature */}
          <div className="mt-12 sm-card">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-8">
                <p className="sm-eyebrow mb-3">Feature · No. 07</p>
                <h3 className="sm-serif text-3xl md:text-4xl font-medium mb-3">
                  <span className="sm-drop">N</span>.O.R.I. Voice Intelligence speaks 47 languages with zero settings. Yoruba, Korean, Portuguese, English — auto-detected.
                </h3>
              </div>
              <div className="col-span-12 md:col-span-4 border-l pl-6" style={{ borderColor: 'var(--rule)' }}>
                <p className="sm-eyebrow mb-3">Specs</p>
                <ul className="space-y-2 sm-mono text-xs">
                  <li className="flex justify-between"><span>Languages</span><span>47</span></li>
                  <li className="flex justify-between"><span>Latency</span><span>0.18s</span></li>
                  <li className="flex justify-between"><span>Auto-detect</span><span style={{ color: 'var(--sage)' }}>YES</span></li>
                  <li className="flex justify-between"><span>Status</span><span style={{ color: 'var(--sage)' }}><span className="sm-status-dot" /> LIVE</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="py-24 px-6 md:px-10 border-t" style={{ borderColor: 'var(--rule)', background: 'var(--paper)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-12">
            <div className="col-span-12 md:col-span-3"><p className="sm-eyebrow">Section B · Verticals</p></div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="sm-serif text-4xl md:text-5xl font-medium">Five focused dashboards.</h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2 mb-6">
            {INDUSTRIES.map(({ label, Icon }, i) => (
              <button
                key={label}
                onClick={() => setIndustryIdx(i)}
                className="col-span-6 md:col-span-2 lg:col-span-2 text-left p-4 transition-all"
                style={industryIdx === i
                  ? { background: 'var(--ink)', color: 'var(--cream)', borderRadius: 4 }
                  : { border: '1px solid var(--rule)', borderRadius: 4 }}
              >
                <Icon className="w-4 h-4 mb-2" />
                <div className="sm-mono text-[10px] tracking-widest uppercase opacity-60">{String(i + 1).padStart(2, '0')}</div>
                <div className="sm-serif text-sm mt-1">{label}</div>
              </button>
            ))}
          </div>

          <div className="sm-card">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-5">
                <p className="sm-eyebrow mb-3">Dashboard {String(industryIdx + 1).padStart(2, '0')}</p>
                <h3 className="sm-serif text-3xl font-medium mb-3">{ind.label}</h3>
                <p className="text-sm text-[var(--muted)] mb-5">Industry-specific dashboard tuned to your exact workflow.</p>
                <a href={ind.route} className="sm-btn">View live demo <ArrowRight className="w-3.5 h-3.5" /></a>
              </div>
              <div className="col-span-12 md:col-span-7 md:border-l md:pl-6" style={{ borderColor: 'var(--rule)' }}>
                <p className="sm-eyebrow mb-4">Modules included</p>
                <ul className="divide-y" style={{ borderColor: 'var(--rule)' }}>
                  {ind.features.map((f, i) => (
                    <li key={i} className="flex items-center justify-between py-2.5">
                      <span className="flex items-center gap-3 text-sm">
                        <span className="sm-mono text-[10px] text-[var(--muted)]">0{i + 1}</span>
                        {f}
                      </span>
                      <Check className="w-4 h-4" style={{ color: 'var(--sage)' }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PULLED QUOTE ── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="sm-eyebrow mb-6">Field Report</p>
          <blockquote className="sm-serif text-3xl md:text-5xl leading-[1.15] italic font-medium mb-8">
            "{TESTIMONIALS[0].text}"
          </blockquote>
          <div className="inline-flex items-center gap-3 sm-mono text-xs">
            <span className="w-8 h-px bg-[var(--ink)]" />
            {TESTIMONIALS[0].name} · {TESTIMONIALS[0].role}
            <span className="w-8 h-px bg-[var(--ink)]" />
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6 md:px-10 border-t" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 md:col-span-3"><p className="sm-eyebrow">Section C · Pricing</p></div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="sm-serif text-4xl md:text-5xl font-medium">Start free.<br />Scale when you're ready.</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING.map((p, i) => (
              <div key={i} className="sm-card flex flex-col" style={p.popular ? { borderColor: 'var(--ink)', background: '#fff' } : {}}>
                <div className="flex items-center justify-between mb-4">
                  <span className="sm-eyebrow">Plan · {p.tier}</span>
                  {p.popular && <span className="sm-mono text-[10px] tracking-widest uppercase px-2 py-0.5" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>Recommended</span>}
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="sm-serif text-5xl font-medium">${p.price}</span>
                  <span className="sm-mono text-xs text-[var(--muted)]">/mo</span>
                </div>
                <p className="text-sm text-[var(--muted)] mb-5">{p.blurb}</p>
                <ul className="space-y-2 flex-1 mb-5 sm-mono text-xs">
                  {p.feats.map(f => (
                    <li key={f} className="flex items-start gap-2"><span style={{ color: 'var(--terra)' }}>+</span> <span className="text-[var(--ink)]">{f}</span></li>
                  ))}
                </ul>
                <button className={p.popular ? 'sm-btn w-full justify-center' : 'sm-btn-ghost w-full justify-center'}>{p.cta} <ArrowRight className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="py-28 px-6 md:px-10 border-t" style={{ borderColor: 'var(--rule)', background: 'var(--paper)' }}>
        <div className="max-w-2xl mx-auto">
          <p className="sm-eyebrow mb-3">Editor's note</p>
          <h2 className="sm-serif text-4xl md:text-5xl font-medium mb-4">Subscribe to the brief.</h2>
          <p className="text-[var(--muted)] mb-6">Early adopters get 3 months free on any paid plan. No spam, ever.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="you@studio.com" className="sm-mono flex-1 px-4 py-3 text-sm bg-white" style={{ border: '1px solid var(--rule)', borderRadius: 4 }} />
            <button className="sm-btn">Request invite <ArrowRight className="w-3.5 h-3.5" /></button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 md:px-10 border-t" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4 sm-mono text-xs text-[var(--muted)]">
          <span>NEO Gents — Vol. I, No. 01 · © 2026</span>
          <span className="flex items-center gap-1.5"><span className="sm-status-dot" /> Powered by N.O.R.I.</span>
        </div>
      </footer>
    </div>
  );
}
