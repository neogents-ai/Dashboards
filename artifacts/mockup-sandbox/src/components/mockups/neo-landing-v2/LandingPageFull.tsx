import React, { useEffect, useRef, useState } from 'react';
import {
  Camera, Calendar, Share2, ArrowRight, X, Menu, Star,
  ChevronLeft, ChevronRight, Check, Zap, Users, TrendingUp,
  Scissors, ChefHat, Home, Sparkles, Play, Mic
} from 'lucide-react';
import '../neo-landing/_group.css';

/* ── Deep Field Gallery (DOM-based, zero React re-renders) ── */
const IMAGES = Array.from({ length: 10 }, (_, i) => `/images/neo_${i + 1}.png`);
const NUM_CARDS = 26;

function DeepFieldGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const w = container.offsetWidth || window.innerWidth;
    const h = container.offsetHeight || window.innerHeight;
    type Card = { el: HTMLDivElement; x: number; y: number; z: number; vx: number; vy: number; vz: number; rot: number; op: number };
    const cards: Card[] = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      const el = document.createElement('div');
      const img = document.createElement('img');
      img.src = IMAGES[i % IMAGES.length];
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      el.appendChild(img);
      el.style.cssText = `position:absolute;left:50%;top:50%;width:170px;height:230px;margin-left:-85px;margin-top:-115px;border-radius:8px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.45);will-change:transform,opacity,filter;`;
      container.appendChild(el);
      cards.push({ el, x: (Math.random() - 0.5) * w * 3, y: (Math.random() - 0.5) * h * 3, z: Math.random(), vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, vz: (Math.random() - 0.5) * 0.0006, rot: (Math.random() - 0.5) * 24, op: 1 });
    }
    const tick = () => {
      const cw = container.offsetWidth || window.innerWidth;
      const ch = container.offsetHeight || window.innerHeight;
      const ew = cw * 3, eh = ch * 3;
      for (const c of cards) {
        c.x += c.vx; c.y += c.vy; c.z += c.vz;
        if (c.z < 0) c.z = 1.0; else if (c.z > 1.1) c.z = 0.0;
        let oob = false;
        if (c.x < -ew / 2) { c.x = ew / 2; oob = true; } if (c.x > ew / 2) { c.x = -ew / 2; oob = true; }
        if (c.y < -eh / 2) { c.y = eh / 2; oob = true; } if (c.y > eh / 2) { c.y = -eh / 2; oob = true; }
        c.op = oob ? 0 : Math.min(1, c.op + 0.02);
        const scale = 0.25 + c.z * 1.15;
        const blur = Math.max(0, 12 - c.z * 17);
        const dop = c.z < 0.2 ? 0.25 : c.z < 0.6 ? 0.65 : 1.0;
        c.el.style.transform = `translate3d(${c.x}px,${c.y}px,0) scale(${scale}) rotate(${c.rot}deg)`;
        c.el.style.filter = blur > 0 ? `blur(${blur.toFixed(1)}px)` : '';
        c.el.style.opacity = (dop * c.op).toFixed(3);
        c.el.style.zIndex = String(Math.round(c.z * 100));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); cards.forEach(c => c.el.remove()); };
  }, []);
  return <div ref={containerRef} className="absolute inset-0 bg-[#0c0c0c] overflow-hidden pointer-events-none z-0" style={{ perspective: '1200px', perspectiveOrigin: '50% 40%' }} />;
}

/* ── Count-up hook ── */
function useCountUp(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.round(cur));
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return val;
}

/* ── Data ── */
const TESTIMONIALS = [
  { name: 'Marcus L.', role: 'Wedding Photographer · Atlanta', text: 'I was spending 4 hours a week on client communication. NEO Gents cut that to 20 minutes. The AI lead scraper alone paid for 6 months of the subscription in the first week.', rating: 5 },
  { name: 'Zara M.', role: 'Aesthetician · Los Angeles', text: 'The Skin Tracker is unlike anything I\'ve seen. My clients love the visual treatment timeline. Rebooking rates are up 40% since I started using it.', rating: 5 },
  { name: 'René D.', role: 'Popup Chef · Chicago', text: 'Managing 3 popup events a week used to be chaos. Now everything — tickets, menus, guest lists — runs through one dashboard. I\'ve doubled my events without doubling my stress.', rating: 5 },
];

const HOW_STEPS = [
  { n: '01', title: 'Connect Your Profiles', desc: 'Link your social media, booking platforms, and portfolio sites. NEO Gents pulls everything into one unified dashboard in seconds.' },
  { n: '02', title: 'AI Finds Your Leads', desc: 'N.O.R.I. Agent scrapes the web for warm, qualified leads in your area and industry. Wake up to a fresh pipeline every morning.' },
  { n: '03', title: 'Book, Create & Grow', desc: 'Manage bookings, publish content, and track your revenue — all from one beautiful, industry-tailored workspace.' },
];

const FEATURES: Array<{ Icon: React.ElementType; title: string; desc: string; wide?: boolean }> = [
  { Icon: Zap, title: 'Lead Radar', desc: 'N.O.R.I. Agent scrapes directories, social profiles, and listings every morning. Wake up to a fresh, scored pipeline — for any industry.' },
  { Icon: Users, title: 'Agentic CRM', desc: 'Kanban pipeline, contact profiles, and automated follow-ups. Every lead tracked from first touch to booked, paid client.' },
  { Icon: TrendingUp, title: 'Revenue Dashboard', desc: 'Live revenue across invoices, retainers, and packages. Know exactly where your business stands — always.' },
  { Icon: Share2, title: 'Social Engine', desc: 'Schedule and publish across Instagram, TikTok, Facebook, and LinkedIn from one hub. Turn every job into content.' },
  { Icon: Calendar, title: 'Smart Booking', desc: 'Clients book, pay deposits, and get automated reminders. Your calendar fills itself — no back-and-forth.' },
  { Icon: Sparkles, title: 'Content Studio', desc: 'AI-generated captions, emails, and ad copy tailored to your industry. Go from raw idea to published post in seconds.' },
  { Icon: Mic, title: 'N.O.R.I. Voice Intelligence', desc: 'Speak any command in any language — N.O.R.I. auto-detects it. Yoruba, Korean, Portuguese, English. Zero settings. Your clients speak their language; your platform speaks it back.', wide: true },
];

const INDUSTRIES = [
  { label: 'Photography', Icon: Camera, color: '#f59e0b', features: ['AI Gallery Sort & Culling', 'Wedding Lead Scraper', 'Smart Booking & Contracts', 'Model Dev Studio', 'Content Studio'] },
  { label: 'Aesthetician', Icon: Sparkles, color: '#EC4899', features: ['Skin Tracker Timeline', 'Beauty Lead Scraper', 'Appointment Scheduling', 'Product Inventory', 'Review Automation'] },
  { label: 'Barber', Icon: Scissors, color: '#3B82F6', features: ['Cut Library & Portfolio', 'Booksy Lead Sync', 'Chair-Side Payments', 'Staff & Chairs Mgmt', 'Social Scheduler'] },
  { label: 'Popup Chef', Icon: ChefHat, color: '#F97316', features: ['Menu Drop Engine', 'Event Lead Scraper', 'Ticket Management', 'Ingredient Costing', 'Guest Management'] },
  { label: 'Realtor', Icon: Home, color: '#6366F1', features: ['Neighborhood Intel', 'FSBO & Expired Leads', 'Listing Showcase', 'Showing Scheduler', 'Transaction Tracker'] },
];

type FormData = { firstName: string; lastName: string; email: string; industry: string; message: string };
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/* ── Main Component ── */
export function LandingPageFull() {
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [industryIdx, setIndustryIdx] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>({ firstName: '', lastName: '', email: '', industry: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const clients  = useCountUp(2400,  statsVisible, 1800);
  const leads    = useCountUp(98000, statsVisible, 2200);
  const rating   = useCountUp(98,    statsVisible, 1200);

  /* Intersection observer → trigger stat counter */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Auto-advance testimonials */
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  /* Smooth scroll */
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
  };

  /* Form validation */
  const validate = (): Partial<FormData> => {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.industry) e.industry = 'Please select an industry';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setFormStatus('submitting');
    await new Promise(r => setTimeout(r, 1800));
    setFormStatus('success');
  };

  const setField = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(ex => { const n = { ...ex }; delete n[k]; return n; });
  };

  const ind = INDUSTRIES[industryIdx];

  return (
    <div className="neo-font-sans w-full min-h-screen overflow-x-hidden bg-[#fafaf8]">

      {/* ── HOW IT WORKS MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <div
            className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 md:p-12 max-w-2xl w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white"
              onClick={() => setModalOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center">
                <Play className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="neo-font-serif text-2xl font-bold text-white">How NEO Gents Works</h3>
            </div>
            <div className="space-y-8">
              {HOW_STEPS.map((s, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center flex-shrink-0 text-amber-500 font-black text-xs">{s.n}</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{s.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="neo-btn-amber w-full mt-10 py-3"
              onClick={() => { setModalOpen(false); scrollTo('waitlist'); }}
            >
              Get Early Access <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" className="relative w-full h-screen overflow-hidden flex flex-col justify-end pb-16 md:pb-24">
        <DeepFieldGallery />

        {/* Nav */}
        <nav className="absolute top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-20">
          <div className="neo-font-sans font-bold tracking-widest text-white text-lg select-none">NEO GENTS</div>
          <div className="hidden md:flex items-center gap-7 text-sm">
            {(['features', 'industries', 'pricing', 'waitlist'] as const).map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="text-white/70 hover:text-white transition-colors capitalize">{id === 'waitlist' ? 'Join Waitlist' : id.charAt(0).toUpperCase() + id.slice(1)}</button>
            ))}
            <button onClick={() => scrollTo('waitlist')} className="neo-btn-amber py-2 px-5 text-sm">
              Get Early Access <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <button className="md:hidden text-white z-30" onClick={() => setNavOpen(o => !o)}>
            {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile nav drawer */}
        {navOpen && (
          <div className="absolute inset-0 bg-black/95 z-[25] flex flex-col items-center justify-center gap-8">
            {[['Features', 'features'], ['Industries', 'industries'], ['Pricing', 'pricing'], ['Join Waitlist', 'waitlist']].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-white text-2xl hover:text-amber-400 transition-colors font-medium">{label}</button>
            ))}
          </div>
        )}

        {/* Hero card */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div className="neo-glass-card rounded-2xl p-8 md:p-12 flex flex-col items-center text-center shadow-2xl w-full">
            <div className="neo-accent text-xs md:text-sm font-bold tracking-[0.22em] mb-4 uppercase">Creatives</div>
            <h1 className="neo-font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Your Studio.<br />Your Brand.<br />Your Empire.
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
              The operating system creative professionals actually want to open every morning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="neo-btn-amber text-base px-8 py-3" onClick={() => scrollTo('waitlist')}>
                Get Early Access
              </button>
              <button className="neo-btn-ghost text-base px-8 py-3 flex items-center gap-2" onClick={() => setModalOpen(true)}>
                <Play className="w-4 h-4" /> See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div ref={statsRef} className="bg-[#0c0c0c] py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { val: clients.toLocaleString() + '+', label: 'Creative professionals' },
            { val: leads.toLocaleString() + '+', label: 'Leads AI-scraped' },
            { val: rating + '%', label: 'Satisfaction rate' },
          ].map(({ val, label }, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-black text-amber-500 tabular-nums">{val}</div>
              <div className="text-white/40 text-sm mt-2">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-amber-600 uppercase border border-amber-500/30 px-3 py-1 rounded-full mb-4">Everything You Need</span>
          <h2 className="neo-font-serif text-4xl md:text-5xl font-bold text-[#0c0c0c] mb-5">Built for how you actually work</h2>
          <p className="text-black/55 text-lg leading-relaxed">Tools designed to get out of your way and let your art speak for itself.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map(({ Icon, title, desc, wide }, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden p-8 rounded-2xl bg-white border border-black/5 hover:border-amber-500/30 hover:shadow-lg transition-all duration-300 ${wide ? 'lg:col-span-2' : ''}`}
            >
              {wide && (
                <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity">
                  <svg viewBox="0 0 256 96" preserveAspectRatio="none" className="w-full h-full" fill="none">
                    <polyline points="0,48 16,32 32,56 48,24 64,60 80,20 96,52 112,28 128,48 144,36 160,54 176,18 192,62 208,30 224,50 240,40 256,48" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="0,48 16,40 32,60 48,34 64,56 80,30 96,58 112,36 128,48 144,42 160,60 176,26 192,58 208,38 224,54 240,44 256,48" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                  </svg>
                </div>
              )}
              <div className={`${wide ? 'w-16 h-16' : 'w-14 h-14'} rounded-xl bg-amber-500/10 flex items-center justify-center mb-5 text-amber-500 group-hover:bg-amber-500/20 transition-colors`}>
                <Icon className={wide ? 'w-8 h-8' : 'w-7 h-7'} />
              </div>
              <h3 className={`font-bold mb-2 neo-font-serif text-[#0c0c0c] ${wide ? 'text-xl' : 'text-lg'}`}>{title}</h3>
              <p className="text-black/55 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="py-24 bg-[#0c0c0c] px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase border px-3 py-1 rounded-full mb-4" style={{ color: ind.color, borderColor: ind.color + '40' }}>5 Verticals</span>
            <h2 className="neo-font-serif text-4xl md:text-5xl font-bold text-white mb-4">Industries we serve</h2>
            <p className="text-white/40 text-lg">One platform. Five focused dashboards. Your exact workflow.</p>
          </div>

          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {INDUSTRIES.map(({ label, Icon, color }, i) => (
              <button
                key={label}
                onClick={() => setIndustryIdx(i)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={industryIdx === i
                  ? { background: color, color: '#000', boxShadow: `0 0 20px ${color}50` }
                  : { background: '#1a1a1a', color: '#ffffff80', border: '1px solid #ffffff15' }
                }
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>

          {/* Feature list */}
          <div className="bg-[#111] border border-white/8 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: ind.color + '20' }}>
                <ind.Icon className="w-6 h-6" style={{ color: ind.color }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl neo-font-serif">{ind.label} Dashboard</h3>
                <p className="text-white/40 text-sm">Industry-specific features built for your workflow</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ind.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/4 border border-white/5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ind.color + '20' }}>
                    <Check className="w-3 h-3" style={{ color: ind.color }} />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
            <button
              className="mt-8 w-full sm:w-auto px-8 py-3 rounded-full font-bold text-sm transition-all hover:opacity-90"
              style={{ background: ind.color, color: '#000' }}
              onClick={() => {
                const slug = ind.label === 'Popup Chef' ? 'chef' : ind.label.toLowerCase();
                window.location.href = `/dashboard/${slug}`;
              }}
            >
              View {ind.label} Demo <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 md:px-12 bg-white border-y border-black/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest text-amber-600 uppercase border border-amber-500/30 px-3 py-1 rounded-full mb-4">Real Professionals</span>
            <h2 className="neo-font-serif text-4xl font-bold text-[#0c0c0c]">What our early users say</h2>
          </div>

          <div className="relative">
            {/* Card */}
            <div className="bg-[#fafaf8] border border-black/6 rounded-2xl p-8 md:p-12 text-center">
              <div className="flex justify-center mb-5">
                {Array.from({ length: TESTIMONIALS[testimonialIdx].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <blockquote className="text-black/75 text-lg md:text-xl leading-relaxed mb-8 italic neo-font-serif max-w-2xl mx-auto">
                "{TESTIMONIALS[testimonialIdx].text}"
              </blockquote>
              <div>
                <div className="font-bold text-[#0c0c0c] text-sm">{TESTIMONIALS[testimonialIdx].name}</div>
                <div className="text-black/40 text-xs mt-1">{TESTIMONIALS[testimonialIdx].role}</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setTestimonialIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:border-amber-500 hover:text-amber-600 transition-colors text-black/50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className="rounded-full transition-all duration-300"
                    style={{ width: testimonialIdx === i ? 24 : 8, height: 8, background: testimonialIdx === i ? '#f59e0b' : '#0c0c0c20' }}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length)}
                className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:border-amber-500 hover:text-amber-600 transition-colors text-black/50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6 md:px-12 bg-[#0c0c0c] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-amber-500 uppercase border border-amber-500/30 px-3 py-1 rounded-full mb-4">Simple Pricing</span>
            <h2 className="neo-font-serif text-4xl md:text-5xl font-bold mb-4">Start free. Scale when you're ready.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">Your first 20 leads are on us. No credit card. No contracts. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 flex flex-col">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Starter</p>
              <div className="flex items-end gap-1 mb-2"><span className="text-5xl font-black">$0</span><span className="text-white/35 mb-1.5">/mo</span></div>
              <p className="text-white/35 text-sm mb-7">Your first 20 AI-scraped leads, free forever.</p>
              <ul className="space-y-3 flex-1 mb-8">
                {['20 leads/month via N.O.R.I. Agent', '1 industry dashboard', 'Basic CRM (25 contacts)', '5 scheduled social posts', 'Community support'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/55">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo('waitlist')}
                className="w-full py-3 rounded-xl border border-white/15 text-white/60 font-semibold hover:border-white/35 hover:text-white transition-all text-sm"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro */}
            <div className="relative bg-[#141414] border-2 border-amber-500 rounded-2xl p-8 flex flex-col shadow-[0_0_40px_rgba(245,158,11,0.18)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">Most Popular</div>
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">Pro</p>
              <div className="flex items-end gap-1 mb-2"><span className="text-5xl font-black">$49</span><span className="text-white/35 mb-1.5">/mo</span></div>
              <p className="text-white/35 text-sm mb-7">Everything you need to run and grow your business.</p>
              <ul className="space-y-3 flex-1 mb-8">
                {['Unlimited AI lead scraping', 'Full 9-tab dashboard', 'Unlimited CRM contacts', 'Content Studio (all formats)', 'Signature industry feature', 'Social media scheduler', 'Review request automation', 'Email support'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo('waitlist')}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition-all text-sm shadow-lg"
              >
                Start Pro — $49/mo
              </button>
            </div>

            {/* Agency */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 flex flex-col">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Agency</p>
              <div className="flex items-end gap-1 mb-2"><span className="text-5xl font-black">$97</span><span className="text-white/35 mb-1.5">/mo</span></div>
              <p className="text-white/35 text-sm mb-7">Run multiple verticals. Build a team.</p>
              <ul className="space-y-3 flex-1 mb-8">
                {['Everything in Pro', 'All 5 industry verticals', '3 team seats included', 'White-label branding', 'Advanced analytics', 'Priority support + onboarding', 'Early access to new features'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/55">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo('waitlist')}
                className="w-full py-3 rounded-xl border border-white/15 text-white/60 font-semibold hover:border-amber-500/50 hover:text-amber-400 transition-all text-sm"
              >
                Contact Sales
              </button>
            </div>
          </div>
          <p className="text-center text-white/25 text-xs mt-10 max-w-xl mx-auto">
            Competitors charge $499+/mo for less. GlossGenius is $48/mo with no lead gen. kvCORE is $499+/mo. NEO Gents is $49/mo with unlimited AI scraping built in.
          </p>
        </div>
      </section>

      {/* ── WAITLIST FORM ── */}
      <section id="waitlist" className="py-24 md:py-32 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest text-amber-600 uppercase border border-amber-500/30 px-3 py-1 rounded-full mb-4">Limited Invites</span>
          <h2 className="neo-font-serif text-4xl md:text-5xl font-bold text-[#0c0c0c] mb-4">Be first when we launch.</h2>
          <p className="text-black/50 text-lg">Early adopters get 3 months free. No spam, ever.</p>
        </div>

        {formStatus === 'success' ? (
          <div className="text-center py-16 px-8 bg-white border border-black/6 rounded-2xl shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="neo-font-serif text-3xl font-bold text-[#0c0c0c] mb-3">You're on the list!</h3>
            <p className="text-black/55 text-lg mb-2">We'll be in touch with your early access invite.</p>
            <p className="text-black/35 text-sm">Check your inbox at <span className="font-medium text-black/60">{form.email}</span></p>
          </div>
        ) : (
          <form className="space-y-5 bg-white border border-black/6 rounded-2xl p-8 shadow-sm" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="neo-input-light"
                  style={errors.firstName ? { borderColor: '#ef4444' } : {}}
                  value={form.firstName}
                  onChange={setField('firstName')}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="neo-input-light"
                  style={errors.lastName ? { borderColor: '#ef4444' } : {}}
                  value={form.lastName}
                  onChange={setField('lastName')}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="neo-input-light"
                style={errors.email ? { borderColor: '#ef4444' } : {}}
                value={form.email}
                onChange={setField('email')}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>}
            </div>
            <div>
              <select
                className="neo-input-light"
                style={errors.industry ? { borderColor: '#ef4444' } : { color: form.industry ? '#0c0c0c' : '#9ca3af' }}
                value={form.industry}
                onChange={setField('industry')}
              >
                <option value="" disabled>Select Your Industry</option>
                <option value="Photographer">Photographer</option>
                <option value="Aesthetician">Aesthetician</option>
                <option value="Barber">Barber</option>
                <option value="Popup Chef">Popup Chef</option>
                <option value="Realtor">Realtor</option>
              </select>
              {errors.industry && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.industry}</p>}
            </div>
            <textarea
              placeholder="Anything you'd like us to know? (optional)"
              rows={3}
              className="neo-input-light resize-none"
              value={form.message}
              onChange={setField('message')}
            />
            <button
              type="submit"
              className="neo-btn-amber w-full py-4 text-base font-bold shadow-md"
              disabled={formStatus === 'submitting'}
              style={formStatus === 'submitting' ? { opacity: 0.7, cursor: 'not-allowed', transform: 'none' } : {}}
            >
              {formStatus === 'submitting' ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Joining the list…
                </span>
              ) : (
                <>Join the Waitlist — It's Free</>
              )}
            </button>
            <p className="text-center text-xs text-black/35 mt-2">No spam. Early adopters get 3 months free on any paid plan.</p>
          </form>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 md:px-12 border-t border-black/6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-black/50">
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="font-bold tracking-widest text-[#0c0c0c] text-base">NEO GENTS</div>
              <div>The operating platform for creative professionals.</div>
            </div>
            <div className="flex items-center gap-6">
              {['Features', 'Industries', 'Pricing', 'Waitlist'].map(label => (
                <button key={label} onClick={() => scrollTo(label.toLowerCase())} className="hover:text-black transition-colors">{label}</button>
              ))}
            </div>
            <div className="flex items-center gap-5">
              {['Privacy', 'Terms', 'Contact'].map(l => <a key={l} href="#" className="hover:text-black transition-colors">{l}</a>)}
            </div>
            <div className="text-xs">© 2026 NEO Gents. All rights reserved.</div>
          </div>
          <div className="flex items-center justify-center gap-2.5 mt-8 pt-8 border-t border-black/5">
            <img src="/images/nori_nobg.png" alt="NORI" className="nori-animated" style={{ width: 44, height: 44, objectFit: 'contain' }} />
            <span style={{ color: '#00B359', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'monospace' }}>Powered by N.O.R.I.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
