import React, { useEffect, useRef, useState } from 'react';
import { Camera, Calendar, Share2, ArrowRight } from 'lucide-react';
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
      className="absolute inset-0 bg-[#0c0c0c] overflow-hidden pointer-events-none z-0"
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
          </div>
        );
      })}
    </div>
  );
}

export function LandingPage() {
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
            <img src="/__mockup/images/nori.jpg" alt="NORI mascot" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid #00B359', boxShadow: '0 0 8px rgba(0,179,89,0.4)' }} />
            <span style={{ color: '#00B359', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'monospace' }}>Powered by N.O.R.I.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
