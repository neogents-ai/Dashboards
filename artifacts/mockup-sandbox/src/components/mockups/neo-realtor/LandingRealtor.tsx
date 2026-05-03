import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Target, Image as ImageIcon, MessageSquare, LayoutDashboard, Calendar, MapPin, Star } from 'lucide-react';
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
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ backgroundColor: '#050607', perspective: '1200px', perspectiveOrigin: '50% 40%' }}
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
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(30, 80, 50, 0.20)', mixBlendMode: 'multiply' }} />
          </div>
        );
      })}
    </div>
  );
}

export function LandingRealtor() {
  return (
    <div className="neo-realtor-font-sans w-full min-h-screen overflow-x-hidden neo-realtor-bg-light">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-end pb-16 md:pb-24">
        <DeepFieldGallery />
        
        {/* NAV OVERLAY */}
        <nav className="absolute top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-20">
          <div className="neo-realtor-font-sans font-bold tracking-widest text-white text-lg">NEO GENTS</div>
          <div className="hidden md:flex items-center gap-6 text-white/80 text-sm">
            <span>For Realtors</span>
            <button className="neo-realtor-btn-accent py-2 px-5 text-sm">Book a Demo <ArrowRight className="w-4 h-4 ml-1"/></button>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div className="neo-realtor-glass-card rounded-2xl p-8 md:p-12 flex flex-col items-center text-center shadow-2xl">
            <div className="neo-realtor-accent text-xs md:text-sm font-semibold tracking-[0.2em] mb-4">REALTOR</div>
            <h1 className="neo-realtor-font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Your Listings.<br/>
              Your Leads.<br/>
              Your Legacy.
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
              The operating system for realtors who are done living in spreadsheets and ready to run their business like a brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="neo-realtor-btn-accent">Get Early Access</button>
              <button className="neo-realtor-btn-ghost">See How It Works</button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto neo-realtor-text-dark">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="neo-realtor-font-serif text-4xl md:text-5xl font-bold mb-6">Built for how you actually close deals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center mb-6 text-[#2d6a4f]">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-realtor-font-serif">Lead Intelligence Engine</h3>
            <p className="text-black/60 leading-relaxed">
              Know which leads are hot, which need nurturing, and which to let go — automatically.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center mb-6 text-[#2d6a4f]">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-realtor-font-serif">Listing Content Machine</h3>
            <p className="text-black/60 leading-relaxed">
              From listing photos to social posts, emails, and open house flyers in one click.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center mb-6 text-[#2d6a4f]">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 neo-realtor-font-serif">Follow-Up Automation</h3>
            <p className="text-black/60 leading-relaxed">
              Every inquiry gets a personal-feeling response within minutes, not days.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="py-24 bg-white px-6 md:px-12 neo-realtor-text-dark border-y border-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-[#f9faf8] border border-black/5 hover:border-[#2d6a4f]/30 transition-colors flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-[#2d6a4f]">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 neo-realtor-font-serif">Pipeline Board</h3>
              <p className="text-black/60 leading-relaxed">
                Visualize every lead from first contact to closed deal in a clean Kanban view.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#f9faf8] border border-black/5 hover:border-[#2d6a4f]/30 transition-colors flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-[#2d6a4f]">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 neo-realtor-font-serif">Showing Coordinator</h3>
              <p className="text-black/60 leading-relaxed">
                Schedule, confirm, and send reminders for showings automatically.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#f9faf8] border border-black/5 hover:border-[#2d6a4f]/30 transition-colors flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-[#2d6a4f]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 neo-realtor-font-serif">Neighborhood Content</h3>
              <p className="text-black/60 leading-relaxed">
                Become the go-to realtor for your area with hyper-local content generated weekly.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#f9faf8] border border-black/5 hover:border-[#2d6a4f]/30 transition-colors flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-[#2d6a4f]">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 neo-realtor-font-serif">Review & Referral Engine</h3>
              <p className="text-black/60 leading-relaxed">
                Post-close review requests and referral incentive programs that actually work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-3xl mx-auto neo-realtor-text-dark">
        <div className="text-center mb-12">
          <h2 className="neo-realtor-font-serif text-4xl md:text-5xl font-bold mb-4">Join realtors building a business that runs itself.</h2>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="neo-realtor-input-light" />
            <input type="text" placeholder="Last Name" className="neo-realtor-input-light" />
          </div>
          <input type="email" placeholder="Email Address" className="neo-realtor-input-light" />
          
          <select className="neo-realtor-input-light text-black/60" defaultValue="">
            <option value="" disabled>Select Role</option>
            <option value="Independent Realtor">Independent Realtor</option>
            <option value="Buyer's Agent">Buyer's Agent</option>
            <option value="Listing Agent">Listing Agent</option>
            <option value="Real Estate Team">Real Estate Team</option>
            <option value="Broker Owner">Broker Owner</option>
          </select>

          <textarea placeholder="Message (optional)" rows={4} className="neo-realtor-input-light resize-none"></textarea>

          <button className="neo-realtor-btn-accent w-full py-4 text-base font-bold shadow-lg">Join the Waitlist</button>
          
          <p className="text-center text-xs text-black/40 mt-4">
            Early members get 3 months free and a personalized onboarding session.
          </p>
        </form>
      </section>

      {/* SECTION 5 */}
      <footer className="py-12 px-6 md:px-12 border-t border-black/5 bg-white text-black/60 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold tracking-widest text-black mb-1">NEO GENTS</div>
            <div>The operating system for realtors who are done living in spreadsheets and ready to run their business like a brand.</div>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>

          <div>© 2026 NEO Gents. All rights reserved.</div>
        </div>
      </footer>

    </div>
  );
}
