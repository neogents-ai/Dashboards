import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ShoppingBag, Send, ArrowRight } from 'lucide-react';
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
  "/__mockup/images/neo_1.png",
  "/__mockup/images/neo_2.png",
  "/__mockup/images/neo_3.png",
  "/__mockup/images/neo_4.png",
  "/__mockup/images/neo_5.png",
  "/__mockup/images/neo_6.png",
  "/__mockup/images/neo_7.png",
  "/__mockup/images/neo_8.png",
  "/__mockup/images/neo_9.png",
  "/__mockup/images/neo_10.png"
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
      className="absolute inset-0 bg-[#070604] overflow-hidden pointer-events-none z-0"
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
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(160, 70, 20, 0.18)', mixBlendMode: 'multiply' }} />
          </div>
        );
      })}
    </div>
  );
}

export function LandingChef() {
  return (
    <div className="neo-chef-font-sans w-full min-h-screen overflow-x-hidden bg-[#faf9f7]">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-end pb-16 md:pb-24">
        <DeepFieldGallery />
        
        {/* NAV OVERLAY */}
        <nav className="absolute top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-20">
          <div className="neo-chef-font-sans font-bold tracking-widest text-white text-lg">NEO GENTS</div>
          <div className="hidden md:flex items-center gap-6 text-white/80 text-sm">
            <span>For Chefs & Vendors</span>
            <button className="neo-chef-btn-amber py-2 px-5 text-sm">Book a Demo <ArrowRight className="w-4 h-4 ml-1"/></button>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div className="neo-chef-glass-card rounded-2xl p-8 md:p-12 flex flex-col items-center text-center shadow-2xl">
            <div className="neo-chef-accent text-xs md:text-sm font-semibold tracking-[0.2em] mb-4">POPUP CHEF</div>
            <h1 className="neo-chef-font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Your Menu.<br/>
              Your Moment.<br/>
              Your Movement.
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
              The operating system for popup chefs and food vendors who are ready to stop winging it and start building something real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="neo-chef-btn-amber">Get Early Access</button>
              <button className="neo-chef-btn-ghost">See How It Works</button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto neo-chef-text-dark">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="neo-chef-font-serif text-4xl md:text-5xl font-bold mb-6">Built for how you actually run your operation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#e05c2a]/10 flex items-center justify-center mb-6 text-[#e05c2a]">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-chef-font-serif">Event & Pop-Up Calendar</h3>
            <p className="text-black/60 leading-relaxed">
              Manage drops, markets, and private events without the group chat chaos.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#e05c2a]/10 flex items-center justify-center mb-6 text-[#e05c2a]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-chef-font-serif">Pre-Order Engine</h3>
            <p className="text-black/60 leading-relaxed">
              Let customers order and pay before your next drop goes live.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#e05c2a]/10 flex items-center justify-center mb-6 text-[#e05c2a]">
              <Send className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-chef-font-serif">Menu Drop Campaigns</h3>
            <p className="text-black/60 leading-relaxed">
              Announce new items via SMS and email to your entire following in one click.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="py-24 bg-white px-6 md:px-12 neo-chef-text-dark border-y border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Vendor Applications", desc: "Apply to markets and events with a saved profile, fast." },
              { title: "Inventory & COGS Tracker", desc: "Know exactly what each dish costs you and what you made." },
              { title: "Review & Loyalty Loop", desc: "Post-event reviews, repeat customer perks, and referral incentives." },
              { title: "Social Content Engine", desc: "Turn every event into content: reels, posts, stories, email recaps." }
            ].map((ind, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#faf9f7] border border-black/5 hover:border-black/10 transition-colors flex flex-col items-start text-left">
                <h3 className="text-lg font-bold mb-2 neo-chef-font-serif">{ind.title}</h3>
                <p className="text-black/60 text-sm mb-6 flex-grow">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-3xl mx-auto neo-chef-text-dark">
        <div className="text-center mb-12">
          <h2 className="neo-chef-font-serif text-4xl md:text-5xl font-bold mb-4">Join chefs and vendors building something that lasts.</h2>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Name" className="neo-chef-input-light" />
            <input type="email" placeholder="Email Address" className="neo-chef-input-light" />
          </div>
          
          <select className="neo-chef-input-light text-black/60" defaultValue="">
            <option value="" disabled>Select Role</option>
            <option value="Popup Chef">Popup Chef</option>
            <option value="Food Truck Owner">Food Truck Owner</option>
            <option value="Catering Company">Catering Company</option>
            <option value="Market Vendor">Market Vendor</option>
            <option value="Private Events Chef">Private Events Chef</option>
          </select>

          <textarea placeholder="Message (optional)" rows={4} className="neo-chef-input-light resize-none"></textarea>

          <button className="neo-chef-btn-amber w-full py-4 text-base font-bold shadow-lg">Join the Waitlist</button>
          
          <p className="text-center text-xs text-black/40 mt-4">
            Early members get 3 months free and dedicated setup support.
          </p>
        </form>
      </section>

      {/* SECTION 5 */}
      <footer className="py-12 px-6 md:px-12 border-t border-black/5 bg-white text-black/60 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold tracking-widest text-black mb-1">NEO GENTS</div>
            <div>The operating platform for popup chefs and food vendors.</div>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>

          <div>© 2026 NEO Gents. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e5e5' }}>
            <img src="/__mockup/images/nori_nobg.png" alt="NORI mascot" className="nori-animated" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            <span style={{ color: '#00B359', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'monospace' }}>Powered by N.O.R.I.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}