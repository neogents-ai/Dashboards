import React, { useEffect, useRef } from 'react';
import { Camera, Calendar, Share2, ArrowRight } from 'lucide-react';
import './_group.css';

const IMAGES = [
  "/images/neo_1.png",
  "/images/neo_2.png",
  "/images/neo_3.png",
  "/images/neo_4.png",
  "/images/neo_5.png",
  "/images/neo_6.png",
  "/images/neo_7.png",
  "/images/neo_8.png",
  "/images/neo_9.png",
  "/images/neo_10.png"
];

const NUM_CARDS = 26;

function DeepFieldGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.offsetWidth || window.innerWidth;
    const h = container.offsetHeight || window.innerHeight;
    const extW = w * 3;
    const extH = h * 3;

    type Card = { el: HTMLDivElement; x: number; y: number; z: number; vx: number; vy: number; vz: number; rot: number; opacity: number };
    const cards: Card[] = [];

    for (let i = 0; i < NUM_CARDS; i++) {
      const el = document.createElement('div');
      const img = document.createElement('img');
      img.src = IMAGES[i % IMAGES.length];
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      el.appendChild(img);
      el.style.cssText = `position:absolute;left:50%;top:50%;width:170px;height:230px;margin-left:-85px;margin-top:-115px;border-radius:8px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.4);will-change:transform,opacity,filter;`;
      container.appendChild(el);
      cards.push({
        el,
        x: (Math.random() - 0.5) * extW,
        y: (Math.random() - 0.5) * extH,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.0006,
        rot: (Math.random() - 0.5) * 24,
        opacity: 1,
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
        if (c.x > ew / 2) { c.x = -ew / 2; oob = true; }
        if (c.y < -eh / 2) { c.y = eh / 2; oob = true; }
        if (c.y > eh / 2) { c.y = -eh / 2; oob = true; }
        c.opacity = oob ? 0 : Math.min(1, c.opacity + 0.02);

        const scale = 0.25 + c.z * 1.15;
        const blur = Math.max(0, 12 - c.z * 17);
        const depthOp = c.z < 0.2 ? 0.25 : c.z < 0.6 ? 0.65 : 1.0;
        const op = depthOp * c.opacity;
        const zi = Math.round(c.z * 100);

        c.el.style.transform = `translate3d(${c.x}px,${c.y}px,0) scale(${scale}) rotate(${c.rot}deg)`;
        c.el.style.filter = blur > 0 ? `blur(${blur.toFixed(1)}px)` : '';
        c.el.style.opacity = op.toFixed(3);
        c.el.style.zIndex = String(zi);
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
      className="absolute inset-0 bg-[#0c0c0c] overflow-hidden pointer-events-none z-0"
      style={{ perspective: '1200px', perspectiveOrigin: '50% 40%' }}
    />
  );
}

export function NeoLandingCopyJcC_vBQK() {
  return (
    <div className="neo-font-sans w-full min-h-screen overflow-x-hidden bg-[#fafaf8]">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-end pb-16 md:pb-24">
        <DeepFieldGallery />
        
        {/* NAV OVERLAY */}
        <nav className="absolute top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-20">
          <div className="neo-font-sans font-bold tracking-widest text-white text-lg">NEO GENTS</div>
          <div className="hidden md:flex items-center gap-6 text-white/80 text-sm">
            <span>For Photographers · Aestheticians · Barbers · Realtors</span>
            <button className="neo-btn-amber py-2 px-5 text-sm">Join the Waitlist <ArrowRight className="w-4 h-4 ml-1"/></button>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div className="neo-glass-card rounded-2xl p-8 md:p-12 flex flex-col items-center text-center shadow-2xl">
            <div className="neo-accent text-xs md:text-sm font-semibold tracking-[0.2em] mb-4">PHOTOGRAPHY</div>
            <h1 className="neo-font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Your Studio.<br/>
              Your Brand.<br/>
              Your Empire.
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
              The operating system creative professionals actually want to open every morning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="neo-btn-amber">Get Early Access</button>
              <button className="neo-btn-ghost">See How It Works</button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto neo-text-dark">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="neo-font-serif text-4xl md:text-5xl font-bold mb-6">Built for how you actually work</h2>
          <p className="text-black/60 text-lg">Tools designed to get out of your way and let your art speak for itself.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#f59e0b]/10 flex items-center justify-center mb-6 text-[#f59e0b]">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-font-serif">AI Gallery Sort</h3>
            <p className="text-black/60 leading-relaxed">
              Style-tag your entire shoot in seconds. Intelligent curation that feels like having an assistant.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#f59e0b]/10 flex items-center justify-center mb-6 text-[#f59e0b]">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-font-serif">Smart Booking</h3>
            <p className="text-black/60 leading-relaxed">
              Clients book, pay, and get reminders automatically. Zero friction, complete elegance.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#f59e0b]/10 flex items-center justify-center mb-6 text-[#f59e0b]">
              <Share2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-font-serif">Social Engine</h3>
            <p className="text-black/60 leading-relaxed">
              From gallery to published post in one click. Turn your portfolio into a growth machine.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="py-24 bg-white px-6 md:px-12 neo-text-dark border-y border-black/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="neo-font-serif text-4xl md:text-5xl font-bold mb-16 text-center">Industries we serve</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Photographers", desc: "Galleries, booking, and seamless client handoffs." },
              { title: "Aestheticians & Barbers", desc: "Chair-side payments and recurring appointments." },
              { title: "Popup Chefs", desc: "Event ticketing, menus, and guest management." },
              { title: "Realtors", desc: "Listing showcases, showing schedules, and CRM." }
            ].map((ind, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#fafaf8] border border-black/5 hover:border-black/10 transition-colors flex flex-col items-start text-left">
                <h3 className="text-lg font-bold mb-2 neo-font-serif">{ind.title}</h3>
                <p className="text-black/60 text-sm mb-6 flex-grow">{ind.desc}</p>
                <a href="#" className="neo-accent font-medium text-sm flex items-center hover:opacity-80 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4 ml-1"/>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-3xl mx-auto neo-text-dark">
        <div className="text-center mb-12">
          <h2 className="neo-font-serif text-4xl md:text-5xl font-bold mb-4">Be first when we launch.</h2>
          <p className="text-black/60 text-lg">Join the waitlist. Invitations are highly limited.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="neo-input-light" />
            <input type="text" placeholder="Last Name" className="neo-input-light" />
          </div>
          <input type="email" placeholder="Email Address" className="neo-input-light" />
          
          <select className="neo-input-light text-black/60" defaultValue="">
            <option value="" disabled>Select Industry</option>
            <option value="Photographer">Photographer</option>
            <option value="Aesthetician">Aesthetician</option>
            <option value="Barber">Barber</option>
            <option value="Popup Chef">Popup Chef</option>
            <option value="Realtor">Realtor</option>
          </select>

          <textarea placeholder="Message (optional)" rows={4} className="neo-input-light resize-none"></textarea>

          <button className="neo-btn-amber w-full py-4 text-base font-bold shadow-lg">Join the Waitlist</button>
          
          <p className="text-center text-xs text-black/40 mt-4">
            No spam. Early adopters get 3 months free.
          </p>
        </form>
      </section>

      {/* PRICING SECTION */}
      <section className="py-24 px-6 md:px-12 bg-[#0c0c0c] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-amber-500 uppercase mb-4 border border-amber-500/30 px-3 py-1 rounded-full">Simple Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Start free. Scale when you're ready.</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Your first 20 leads are on us. No credit card. No contracts. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Starter</p>
                <div className="flex items-end gap-1 mb-2"><span className="text-5xl font-black text-white">$0</span><span className="text-white/40 mb-2">/mo</span></div>
                <p className="text-white/40 text-sm">Your first 20 AI-scraped leads, free forever.</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {['20 leads/month via Firecrawl AI','1 industry dashboard','Basic CRM (25 contacts)','5 scheduled social posts','Community support'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/60"><span className="text-amber-500 mt-0.5 flex-shrink-0">✓</span>{f}</li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/20 text-white/70 font-semibold hover:border-white/40 hover:text-white transition-all text-sm">Get Started Free</button>
            </div>
            {/* Pro — highlighted */}
            <div className="relative bg-[#141414] border-2 border-amber-500 rounded-2xl p-8 flex flex-col shadow-[0_0_40px_rgba(245,158,11,0.15)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-amber-500 uppercase tracking-wider mb-2">Pro</p>
                <div className="flex items-end gap-1 mb-2"><span className="text-5xl font-black text-white">$49</span><span className="text-white/40 mb-2">/mo</span></div>
                <p className="text-white/40 text-sm">Everything you need to run and grow your business.</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {['Unlimited AI lead scraping','Full 9-tab dashboard','Unlimited CRM contacts','Content Studio (all formats)','Model Dev / signature feature','Social media scheduler','Review request automation','Email support'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/80"><span className="text-amber-500 mt-0.5 flex-shrink-0">✓</span>{f}</li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition-all text-sm shadow-lg">Start Pro — $49/mo</button>
            </div>
            {/* Agency */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Agency</p>
                <div className="flex items-end gap-1 mb-2"><span className="text-5xl font-black text-white">$97</span><span className="text-white/40 mb-2">/mo</span></div>
                <p className="text-white/40 text-sm">Run multiple verticals. Build a team.</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {['Everything in Pro','All 5 industry verticals','3 team seats included','White-label branding','Advanced analytics','Priority support + onboarding','Early access to new features'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/60"><span className="text-amber-500 mt-0.5 flex-shrink-0">✓</span>{f}</li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/20 text-white/70 font-semibold hover:border-amber-500/50 hover:text-amber-500 transition-all text-sm">Contact Sales</button>
            </div>
          </div>
          <p className="text-center text-white/30 text-xs mt-10">Competitors charge $499+/mo for less. GlossGenius is $48/mo with no lead generation. kvCORE is $499+/mo. NEO Gents is $49/mo with unlimited AI scraping built in.</p>
        </div>
      </section>

      {/* SECTION 5 */}
      <footer className="py-12 px-6 md:px-12 border-t border-black/5 bg-white text-black/60 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold tracking-widest text-black mb-1">NEO GENTS</div>
            <div>The operating platform for creative professionals.</div>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>

          <div>© 2026 NEO Gents. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e5e5' }}>
            <img src="/images/nori_nobg.png" alt="NORI mascot" className="nori-animated" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            <span style={{ color: '#00B359', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'monospace' }}>Powered by N.O.R.I.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
