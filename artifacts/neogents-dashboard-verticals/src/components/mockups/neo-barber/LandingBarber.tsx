import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, ShoppingBag, BookOpen, Calendar, Clock, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';
import './_group.css';

interface PhotoCard {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotation: number;
  image: string;
  baseOpacity: number;
}

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

function DeepFieldGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<PhotoCard[]>([]);
  const requestRef = useRef<number>(0);
  const [, setFrame] = useState(0);

  useEffect(() => {
    const numCards = 26;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const extW = w * 3;
    const extH = h * 3;

    cardsRef.current = Array.from({ length: numCards }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * extW,
      y: (Math.random() - 0.5) * extH,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.0006,
      rotation: (Math.random() - 0.5) * 24,
      image: IMAGES[i % IMAGES.length],
      baseOpacity: 1
    }));

    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const extW = w * 3;
      const extH = h * 3;
      
      const cards = cardsRef.current;
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        
        card.x += card.vx;
        card.y += card.vy;
        card.z += card.vz;

        if (card.z < 0) card.z = 1.0;
        else if (card.z > 1.1) card.z = 0.0;

        let outOfBounds = false;
        if (card.x < -extW / 2) { card.x = extW / 2; outOfBounds = true; }
        if (card.x > extW / 2) { card.x = -extW / 2; outOfBounds = true; }
        if (card.y < -extH / 2) { card.y = extH / 2; outOfBounds = true; }
        if (card.y > extH / 2) { card.y = -extH / 2; outOfBounds = true; }

        if (outOfBounds) {
          card.baseOpacity = 0;
        } else {
          card.baseOpacity = Math.min(1, card.baseOpacity + 0.02);
        }
      }

      setFrame(f => f + 1);
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div 
      className="absolute inset-0 bg-[#060608] overflow-hidden pointer-events-none z-0"
      style={{ perspective: '1200px', perspectiveOrigin: '50% 40%' }}
    >
      {cardsRef.current.map(card => {
        const scale = 0.25 + card.z * 1.15;
        const blur = Math.max(0, 12 - card.z * 17);
        let depthOpacity = 1.0;
        if (card.z < 0.2) depthOpacity = 0.25;
        else if (card.z < 0.6) depthOpacity = 0.65;
        
        const opacity = depthOpacity * card.baseOpacity;
        const zIndex = Math.round(card.z * 100);

        return (
          <div key={card.id} style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 170,
            height: 230,
            marginLeft: -85,
            marginTop: -115,
            transform: `translate3d(${card.x}px, ${card.y}px, 0) scale(${scale}) rotate(${card.rotation}deg)`,
            filter: `blur(${blur}px)`,
            opacity: opacity,
            zIndex: zIndex,
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'none'
          }}>
            <img src={card.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(140, 110, 30, 0.15)', mixBlendMode: 'multiply' }}></div>
          </div>
        );
      })}
    </div>
  );
}

export function LandingBarber() {
  return (
    <div className="neo-barber-font-sans w-full min-h-screen overflow-x-hidden bg-[#f8f8f6]">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-end pb-16 md:pb-24">
        <DeepFieldGallery />
        
        {/* NAV OVERLAY */}
        <nav className="absolute top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-20">
          <div className="neo-barber-font-sans font-bold tracking-widest text-white text-lg">NEO GENTS</div>
          <div className="hidden md:flex items-center gap-6 text-white/80 text-sm">
            <span>For Barbers</span>
            <button className="neo-barber-btn-gold py-2 px-5 text-sm">Book a Demo <ArrowRight className="w-4 h-4 ml-1"/></button>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div className="neo-barber-glass-card rounded-2xl p-8 md:p-12 flex flex-col items-center text-center shadow-2xl">
            <div className="text-[#c8a84b] text-xs md:text-sm font-semibold tracking-[0.2em] mb-4">BARBER</div>
            <h1 className="neo-barber-font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Your Chair.<br/>
              Your Craft.<br/>
              Your Empire.
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
              The operating system for barbers who know their worth and are ready to run their shop like a business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="neo-barber-btn-gold">Get Early Access</button>
              <button className="neo-barber-btn-ghost">See How It Works</button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-[#060608]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="neo-barber-font-serif text-4xl md:text-5xl font-bold mb-6">Built for how you actually run your shop</h2>
          <p className="text-[#060608]/60 text-lg">Tools designed to get out of your way and let your art speak for itself.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#c8a84b]/10 flex items-center justify-center mb-6 text-[#c8a84b]">
              <CalendarDays className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-barber-font-serif">Chair Scheduling</h3>
            <p className="text-[#060608]/60 leading-relaxed">
              Every barber's calendar in one view. No double-books, no chaos.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#c8a84b]/10 flex items-center justify-center mb-6 text-[#c8a84b]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-barber-font-serif">Retail & Upsell Tracker</h3>
            <p className="text-[#060608]/60 leading-relaxed">
              Pomade, tools, bundles — track inventory and commissions effortlessly.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#c8a84b]/10 flex items-center justify-center mb-6 text-[#c8a84b]">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-barber-font-serif">Client History & Notes</h3>
            <p className="text-[#060608]/60 leading-relaxed">
              Fades, lineups, allergies, preferred styles — always remembered.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="py-24 bg-white px-6 md:px-12 text-[#060608] border-y border-[#060608]/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="neo-barber-font-serif text-4xl md:text-5xl font-bold mb-16 text-center">What you get</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-[#f8f8f6] border border-[#060608]/5 hover:border-[#c8a84b]/30 transition-colors flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-[#c8a84b]">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 neo-barber-font-serif">Online Booking</h3>
              <p className="text-[#060608]/60 text-base mb-2 flex-grow">
                Real-time availability, deposits, and instant confirmations. Let clients book 24/7 without interrupting your flow.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#f8f8f6] border border-[#060608]/5 hover:border-[#c8a84b]/30 transition-colors flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-[#c8a84b]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 neo-barber-font-serif">Walk-In Queue Manager</h3>
              <p className="text-[#060608]/60 text-base mb-2 flex-grow">
                Digital waitlist so clients check in from their phone. Keep the shop clear and clients happy while they wait.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#f8f8f6] border border-[#060608]/5 hover:border-[#c8a84b]/30 transition-colors flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-[#c8a84b]">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 neo-barber-font-serif">Loyalty & Rebooking</h3>
              <p className="text-[#060608]/60 text-base mb-2 flex-grow">
                Automated reminders that bring clients back before they drift. Lock in the next cut before they even leave the chair.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#f8f8f6] border border-[#060608]/5 hover:border-[#c8a84b]/30 transition-colors flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-[#c8a84b]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 neo-barber-font-serif">Content Engine</h3>
              <p className="text-[#060608]/60 text-base mb-2 flex-grow">
                Turn every cut into a post, story, or reel in one click. Seamlessly share your best work to social media.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-3xl mx-auto text-[#060608]">
        <div className="text-center mb-12">
          <h2 className="neo-barber-font-serif text-4xl md:text-5xl font-bold mb-4">Join barbers who are leveling up their business.</h2>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="neo-barber-input-light" />
            <input type="text" placeholder="Last Name" className="neo-barber-input-light" />
          </div>
          <input type="email" placeholder="Email Address" className="neo-barber-input-light" />
          
          <select className="neo-barber-input-light text-[#060608]/60" defaultValue="">
            <option value="" disabled>Select Role</option>
            <option value="Solo Barber">Solo Barber</option>
            <option value="Shop Owner">Shop Owner</option>
            <option value="Suite Renter">Suite Renter</option>
            <option value="Barbershop Chain">Barbershop Chain</option>
          </select>

          <textarea placeholder="Message (optional)" rows={4} className="neo-barber-input-light resize-none"></textarea>

          <button className="neo-barber-btn-gold w-full py-4 text-base font-bold shadow-lg text-[#060608]">Join the Waitlist</button>
          
          <p className="text-center text-sm font-medium text-[#060608]/50 mt-4">
            Early members get 3 months free and priority onboarding.
          </p>
        </form>
      </section>

      {/* PRICING SECTION */}
      <section className="py-24 px-6 md:px-12 bg-[#06080c] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-[#3B82F6] uppercase mb-4 border border-[#3B82F6]/30 px-3 py-1 rounded-full">Simple Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Start free. Scale when you're ready.</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Your first 20 leads are on us. No credit card. No contracts. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0e1014] border border-white/10 rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Starter</p>
                <div className="flex items-end gap-1 mb-2"><span className="text-5xl font-black text-white">$0</span><span className="text-white/40 mb-2">/mo</span></div>
                <p className="text-white/40 text-sm">Your first 20 AI-scraped leads, free forever.</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {['20 leads/month via Firecrawl AI','1 industry dashboard','Basic CRM (25 contacts)','5 scheduled social posts','Community support'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/60"><span className="text-[#3B82F6] mt-0.5 flex-shrink-0">✓</span>{f}</li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/20 text-white/70 font-semibold hover:border-white/40 hover:text-white transition-all text-sm">Get Started Free</button>
            </div>
            <div className="relative bg-[#0e1014] border-2 border-[#3B82F6] rounded-2xl p-8 flex flex-col shadow-[0_0_40px_rgba(59,130,246,0.15)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#3B82F6] text-white text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-[#3B82F6] uppercase tracking-wider mb-2">Pro</p>
                <div className="flex items-end gap-1 mb-2"><span className="text-5xl font-black text-white">$49</span><span className="text-white/40 mb-2">/mo</span></div>
                <p className="text-white/40 text-sm">Everything you need to run and grow your shop.</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {['Unlimited AI lead scraping','Full 9-tab dashboard','Unlimited CRM contacts','Cut Library — per-client fade history','Chair & staff management','Social media scheduler','Review request automation','Email support'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/80"><span className="text-[#3B82F6] mt-0.5 flex-shrink-0">✓</span>{f}</li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl font-bold transition-all text-sm shadow-lg text-white" style={{background:'#3B82F6'}}>Start Pro — $49/mo</button>
            </div>
            <div className="bg-[#0e1014] border border-white/10 rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Agency</p>
                <div className="flex items-end gap-1 mb-2"><span className="text-5xl font-black text-white">$97</span><span className="text-white/40 mb-2">/mo</span></div>
                <p className="text-white/40 text-sm">Run multiple verticals. Build a team.</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {['Everything in Pro','All 5 industry verticals','3 team seats included','White-label branding','Advanced analytics','Priority support + onboarding','Early access to new features'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/60"><span className="text-[#3B82F6] mt-0.5 flex-shrink-0">✓</span>{f}</li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/20 text-white/70 font-semibold hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-all text-sm">Contact Sales</button>
            </div>
          </div>
          <p className="text-center text-white/30 text-xs mt-10">Booksy is $29.99/mo with booking only — no lead gen, no CRM. Squire is $30–$200/mo with no AI. NEO Gents is $49/mo with unlimited AI scraping built in.</p>
        </div>
      </section>

      {/* SECTION 5 */}
      <footer className="py-12 px-6 md:px-12 border-t border-[#060608]/5 bg-white text-[#060608]/60 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold tracking-widest text-[#060608] mb-1">NEO GENTS</div>
            <div>The operating system for barbers who know their worth.</div>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#c8a84b] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#c8a84b] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#c8a84b] transition-colors">Contact</a>
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