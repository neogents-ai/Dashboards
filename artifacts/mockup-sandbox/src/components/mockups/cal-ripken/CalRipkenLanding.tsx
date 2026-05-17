import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Camera, Calendar, Share2, Zap,
  TrendingUp, Sparkles, Menu, X, Check,
} from 'lucide-react';
import './_group.css';

/* ── Cal's 6 portfolio photos ── */
const CAL_IMAGES = [
  '/images/cal/cal1.jpg',
  '/images/cal/cal2.jpg',
  '/images/cal/cal3.jpg',
  '/images/cal/cal4.jpg',
  '/images/cal/cal5.jpg',
  '/images/cal/cal6.jpg',
];

/* ─────────────────────────────────────────────────
   Deep Field Gallery — pure DOM animation, zero
   React re-renders per tick (same pattern as
   other dashboards that fixed the blank-page bug)
───────────────────────────────────────────────── */
const NUM_CARDS = 20;

function DeepFieldGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.offsetWidth || window.innerWidth;
    const h = container.offsetHeight || window.innerHeight;

    type Card = {
      el: HTMLDivElement;
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      rot: number; op: number;
    };

    const cards: Card[] = [];

    for (let i = 0; i < NUM_CARDS; i++) {
      const el = document.createElement('div');
      const img = document.createElement('img');
      img.src = CAL_IMAGES[i % CAL_IMAGES.length];
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      el.appendChild(img);
      el.style.cssText = `
        position:absolute;left:50%;top:50%;
        width:175px;height:235px;
        margin-left:-87px;margin-top:-117px;
        border-radius:2px;overflow:hidden;
        box-shadow:0 18px 52px rgba(0,0,0,0.72);
        will-change:transform,opacity,filter;
      `;
      container.appendChild(el);
      cards.push({
        el,
        x: (Math.random() - 0.5) * w * 3,
        y: (Math.random() - 0.5) * h * 3,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        vz: (Math.random() - 0.5) * 0.0006,
        rot: (Math.random() - 0.5) * 20,
        op: 1,
      });
    }

    const tick = () => {
      const cw = container.offsetWidth || window.innerWidth;
      const ch = container.offsetHeight || window.innerHeight;
      const ew = cw * 3, eh = ch * 3;

      for (const c of cards) {
        c.x += c.vx; c.y += c.vy; c.z += c.vz;
        if (c.z < 0) c.z = 1.0;
        else if (c.z > 1.1) c.z = 0.0;

        let oob = false;
        if (c.x < -ew / 2) { c.x = ew / 2; oob = true; }
        if (c.x > ew / 2)  { c.x = -ew / 2; oob = true; }
        if (c.y < -eh / 2) { c.y = eh / 2; oob = true; }
        if (c.y > eh / 2)  { c.y = -eh / 2; oob = true; }
        c.op = oob ? 0 : Math.min(1, c.op + 0.02);

        const scale = 0.25 + c.z * 1.2;
        const blur  = Math.max(0, 10 - c.z * 14);
        const dop   = c.z < 0.2 ? 0.15 : c.z < 0.5 ? 0.5 : 1.0;

        c.el.style.transform = `translate3d(${c.x}px,${c.y}px,0) scale(${scale}) rotate(${c.rot}deg)`;
        c.el.style.filter    = blur > 0 ? `blur(${blur.toFixed(1)}px)` : '';
        c.el.style.opacity   = (dop * c.op).toFixed(3);
        c.el.style.zIndex    = String(Math.round(c.z * 100));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      cards.forEach(c => c.el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ background: '#080808' }}
    />
  );
}

/* ── Features data ── */
const FEATURES = [
  {
    Icon: Camera,
    title: 'AI Gallery Sort',
    desc: 'Style-tag your entire shoot in seconds. Intelligent curation that feels like having a full-time assistant.',
  },
  {
    Icon: Calendar,
    title: 'Smart Booking',
    desc: 'Clients book, pay, and get reminders automatically. Zero friction, complete elegance.',
  },
  {
    Icon: Share2,
    title: 'Social Engine',
    desc: 'From gallery to published post in one click. Turn your portfolio into a content growth machine.',
  },
  {
    Icon: Zap,
    title: 'Lead Radar',
    desc: 'N.O.R.I. finds wedding directories, event planners, and agencies actively hunting for your work.',
  },
  {
    Icon: TrendingUp,
    title: 'Revenue Dashboard',
    desc: 'Track invoices, retainers, and packages in real-time. Know exactly where your business stands.',
  },
  {
    Icon: Sparkles,
    title: 'Model Dev Studio',
    desc: 'Build and manage your talent roster. Track test shoots, agency submissions, and portfolio growth.',
  },
];

/* ── Portfolio grid ── */
const PORTFOLIO = [
  { src: '/images/cal/cal1.jpg', label: 'Portraits' },
  { src: '/images/cal/cal2.jpg', label: 'Artistic' },
  { src: '/images/cal/cal3.jpg', label: 'Boudoir' },
  { src: '/images/cal/cal4.jpg', label: 'Editorial' },
  { src: '/images/cal/cal5.jpg', label: 'Fashion' },
  { src: '/images/cal/cal6.jpg', label: 'Magazine' },
];

type FormData   = { name: string; email: string; service: string; date: string; notes: string };
type FormStatus = 'idle' | 'submitting' | 'success';

/* ─────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────── */
export function CalRipkenLanding() {
  const [navOpen,    setNavOpen]    = useState(false);
  const [form,       setForm]       = useState<FormData>({ name: '', email: '', service: '', date: '', notes: '' });
  const [errors,     setErrors]     = useState<Partial<FormData>>({});
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
  };

  const setField = (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [k]: e.target.value }));
      if (errors[k]) setErrors(ex => { const n = { ...ex }; delete n[k]; return n; });
    };

  const validate = (): Partial<FormData> => {
    const e: Partial<FormData> = {};
    if (!form.name.trim())  e.name  = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.service)      e.service = 'Please select a service';
    return e;
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setFormStatus('submitting');
    await new Promise(r => setTimeout(r, 1800));
    setFormStatus('success');
  };

  /* ── NAV links ── */
  const NAV = [['Work', 'portfolio'], ['Services', 'services'], ['Contact', 'booking']] as const;

  return (
    <div className="cal-font-body w-full min-h-screen overflow-x-hidden" style={{ background: '#F7F4EF', color: '#080808' }}>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <DeepFieldGallery />

        {/* gradient overlay */}
        <div className="absolute inset-0 z-[1]" style={{
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.22) 0%, rgba(8,8,8,0.52) 50%, rgba(8,8,8,0.72) 100%)',
        }} />

        {/* ── Nav ── */}
        <nav className="absolute top-0 left-0 w-full px-8 md:px-16 py-8 flex justify-between items-center z-20">
          <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.6)' }}>
            CalRipken Experience
          </span>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.5)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = 'rgba(247,244,239,0.9)')}
                onMouseOut={e  => (e.currentTarget.style.color = 'rgba(247,244,239,0.5)')}
              >
                {label}
              </button>
            ))}
            <button className="cal-btn-primary" style={{ padding: '10px 22px', fontSize: '10px' }} onClick={() => scrollTo('booking')}>
              Book a Session
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white z-30" onClick={() => setNavOpen(o => !o)}>
            {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile nav overlay */}
        {navOpen && (
          <div className="absolute inset-0 z-[25] flex flex-col items-center justify-center gap-10" style={{ background: 'rgba(8,8,8,0.97)' }}>
            {NAV.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="cal-font-heading text-3xl font-light text-white"
                style={{ fontStyle: 'italic', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseOut={e  => (e.currentTarget.style.color = 'white')}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* ── Hero copy — centered, editorial ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="cal-label mb-8">Photography · Boudoir · Editorial</div>

          <h1
            className="cal-font-heading font-light text-white leading-[0.9]"
            style={{ fontSize: 'clamp(58px, 9vw, 112px)', letterSpacing: '-0.02em', marginBottom: '28px' }}
          >
            CalRipken<br />
            <span style={{ fontStyle: 'italic' }}>Experience</span>
          </h1>

          <p style={{ color: 'rgba(247,244,239,0.48)', fontSize: '15px', fontWeight: 300, maxWidth: '320px', lineHeight: 1.8, marginBottom: '44px' }}>
            Every frame tells the story<br />you've always wanted told.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="cal-btn-primary" onClick={() => scrollTo('booking')}>
              Book a Session <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="cal-btn-outline-light" onClick={() => scrollTo('portfolio')}>
              View Work
            </button>
          </div>
        </div>

        {/* scroll line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, transparent, rgba(247,244,239,0.28))' }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STUDIO INTRO
      ═══════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-8 md:px-20" style={{ background: '#F7F4EF' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">
          <div>
            <div className="cal-label mb-6">About the Studio</div>
            <h2 className="cal-font-heading font-light leading-tight" style={{ fontSize: 'clamp(38px, 5vw, 60px)', marginBottom: '32px' }}>
              Where Vision<br /><span style={{ fontStyle: 'italic' }}>Meets Light</span>
            </h2>
            <p style={{ color: '#5a5652', fontSize: '15px', lineHeight: '1.9', marginBottom: '18px' }}>
              CalRipken Experience is a creative studio built for bold subjects. From senior portraits to high-fashion editorial, every session is crafted with intention — no presets, no cookie-cutter posing.
            </p>
            <p style={{ color: '#5a5652', fontSize: '15px', lineHeight: '1.9', marginBottom: '44px' }}>
              Powered by the NEO Gents platform, your entire client experience — booking, galleries, delivery — runs seamlessly so you can focus on the work that matters.
            </p>
            <button className="cal-btn-outline-dark" onClick={() => scrollTo('portfolio')}>
              View Portfolio <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Featured photo — Vogue/editorial */}
          <div style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '3/4' }}>
            <img
              src="/images/cal/cal6.jpg"
              alt="CalRipken Photography"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </section>

      <hr className="cal-rule" style={{ margin: '0 32px' }} />

      {/* ═══════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════ */}
      <section id="services" className="py-24 md:py-36 px-8 md:px-20" style={{ background: '#F7F4EF' }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ marginBottom: '64px', maxWidth: '520px' }}>
            <div className="cal-label" style={{ marginBottom: '20px' }}>Client Experience</div>
            <h2 className="cal-font-heading font-light leading-tight" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)' }}>
              Everything You Need.<br />
              <span style={{ fontStyle: 'italic' }}>Built for how you actually work.</span>
            </h2>
            <p style={{ color: '#706b65', fontSize: '15px', marginTop: '16px', lineHeight: '1.7' }}>
              Tools designed to get out of your way and let your art speak for itself.
            </p>
          </div>

          {/* 3-col feature grid with clean border dividers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                style={{
                  padding: '40px 32px',
                  borderTop: '1px solid #e8e5e0',
                  borderRight: i % 3 !== 2 ? '1px solid #e8e5e0' : 'none',
                  borderBottom: i >= 3 ? '1px solid #e8e5e0' : 'none',
                }}
              >
                <Icon style={{ width: '20px', height: '20px', color: '#C9A84C', marginBottom: '24px' }} />
                <h3 className="cal-font-heading" style={{ fontSize: '20px', fontWeight: 500, color: '#080808', marginBottom: '12px' }}>
                  {title}
                </h3>
                <p style={{ color: '#706b65', fontSize: '13.5px', lineHeight: '1.85' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PORTFOLIO
      ═══════════════════════════════════════ */}
      <section id="portfolio" style={{ background: '#080808' }}>
        {/* Header */}
        <div style={{ padding: '80px 64px 48px', maxWidth: '1152px', margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="cal-label" style={{ marginBottom: '12px' }}>Portfolio</div>
            <h2 className="cal-font-heading font-light text-white" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
              The Work <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Speaks</span>
            </h2>
          </div>
          <button className="cal-btn-outline-light" style={{ display: 'none' }} onClick={() => scrollTo('booking')}>
            Book a Session
          </button>
        </div>

        {/* Photo grid — 2×3, each 3:4 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {PORTFOLIO.map((p, i) => (
            <div key={i} style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}
              onMouseOver={e => { const ov = e.currentTarget.querySelector<HTMLDivElement>('.cal-port-ov'); if (ov) ov.style.opacity = '1'; }}
              onMouseOut={e  => { const ov = e.currentTarget.querySelector<HTMLDivElement>('.cal-port-ov'); if (ov) ov.style.opacity = '0'; }}
            >
              <img
                src={p.src}
                alt={p.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseOut={e  => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div
                className="cal-port-ov"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(8,8,8,0.68) 0%, transparent 55%)',
                  display: 'flex', alignItems: 'flex-end', padding: '24px',
                  opacity: 0, transition: 'opacity 0.28s ease',
                }}
              >
                <span className="cal-label" style={{ color: 'rgba(247,244,239,0.75)' }}>{p.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOOKING FORM
      ═══════════════════════════════════════ */}
      <section id="booking" style={{ background: '#F7F4EF', padding: '96px 64px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ marginBottom: '56px' }}>
            <div className="cal-label" style={{ marginBottom: '16px' }}>Ready to Shoot</div>
            <h2 className="cal-font-heading font-light" style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: '1.05' }}>
              Book Your<br /><span style={{ fontStyle: 'italic' }}>Session</span>
            </h2>
            <p style={{ color: '#706b65', fontSize: '14px', marginTop: '14px' }}>
              Select a service and I'll be in touch within 24 hours.
            </p>
          </div>

          {formStatus === 'success' ? (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '3px', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <Check style={{ width: '22px', height: '22px', color: '#C9A84C' }} />
              </div>
              <h3 className="cal-font-heading" style={{ fontSize: '32px', fontWeight: 300, marginBottom: '10px' }}>Inquiry received.</h3>
              <p style={{ color: '#706b65', fontSize: '14px' }}>
                Expect a response within 24 hours at <span style={{ color: '#080808' }}>{form.email}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                {/* Row 1 — Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                  <div>
                    <input
                      type="text" placeholder="Full Name" className="cal-input"
                      value={form.name} onChange={setField('name')}
                      style={errors.name ? { borderBottomColor: '#ef4444' } : {}}
                    />
                    {errors.name && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email" placeholder="Email Address" className="cal-input"
                      value={form.email} onChange={setField('email')}
                      style={errors.email ? { borderBottomColor: '#ef4444' } : {}}
                    />
                    {errors.email && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2 — Service + Date */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                  <div style={{ position: 'relative' }}>
                    <select
                      className="cal-select"
                      value={form.service} onChange={setField('service')}
                      style={{ color: form.service ? '#080808' : '#b0aca7', ...(errors.service ? { borderBottomColor: '#ef4444' } : {}) }}
                    >
                      <option value="" disabled>Select Service</option>
                      <option value="Portrait">Senior / Portrait Session</option>
                      <option value="Boudoir">Boudoir Session</option>
                      <option value="Fashion">Fashion Editorial</option>
                      <option value="Brand">Brand / Content Day</option>
                      <option value="Event">Event Coverage</option>
                    </select>
                    {/* chevron */}
                    <svg viewBox="0 0 12 8" fill="none" style={{ position: 'absolute', right: 0, bottom: '14px', width: '10px', pointerEvents: 'none' }}>
                      <path d="M1 1l5 5 5-5" stroke="#b0aca7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {errors.service && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.service}</p>}
                  </div>
                  <div>
                    <input
                      type="date" className="cal-input"
                      value={form.date} onChange={setField('date')}
                      style={{ color: form.date ? '#080808' : '#b0aca7' }}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <textarea
                    placeholder="Tell me about your vision (optional)"
                    rows={3} className="cal-textarea"
                    value={form.notes} onChange={setField('notes')}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="cal-btn-primary"
                  style={{ justifyContent: 'center', padding: '17px 32px', fontSize: '11px', width: '100%', opacity: formStatus === 'submitting' ? 0.65 : 1, transition: 'opacity 0.2s' }}
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting'
                    ? <><span className="cal-spinner" /> Sending…</>
                    : <>Submit Inquiry <ArrowRight className="w-3.5 h-3.5" /></>
                  }
                </button>

              </div>
            </form>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer style={{ background: '#080808', borderTop: '1px solid rgba(247,244,239,0.07)', padding: '40px 64px' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.25)' }}>
            CalRipken Experience
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {NAV.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.3)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = 'rgba(247,244,239,0.7)')}
                onMouseOut={e  => (e.currentTarget.style.color = 'rgba(247,244,239,0.3)')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* NORI badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/images/nori_nobg.png" alt="NORI" className="cal-nori-animated" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <span style={{ color: '#00B359', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'monospace' }}>
              Powered by N.O.R.I.
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
