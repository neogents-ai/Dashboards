import React, { useEffect, useRef, useState } from 'react';
import './_group.css';

interface Card {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number; // 0 to 1
  image: string;
  rotation: number;
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

function PhysicsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Card[]>([]);
  const requestRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    
    // Initialize cards
    cardsRef.current = IMAGES.map((img, i) => {
      const z = Math.random();
      return {
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        z,
        image: img,
        rotation: (Math.random() - 0.5) * 16 // -8 to 8
      };
    });

    const update = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const cards = cardsRef.current;

      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];

        // Apply gentle boundary repulsion
        const margin = 100;
        if (card.x < -margin) card.vx += 0.01;
        if (card.x > width + margin) card.vx -= 0.01;
        if (card.y < -margin) card.vy += 0.01;
        if (card.y > height + margin) card.vy -= 0.01;

        // Apply mouse repulsion
        const dxM = card.x + 90 - mouseRef.current.x; // center of card approx
        const dyM = card.y + 120 - mouseRef.current.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 300) {
          const force = (300 - distM) / 300;
          card.vx += (dxM / distM) * force * 0.5;
          card.vy += (dyM / distM) * force * 0.5;
        }

        // Apply card-to-card repulsion
        for (let j = i + 1; j < cards.length; j++) {
          const other = cards[j];
          const dx = card.x - other.x;
          const dy = card.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            const force = (250 - dist) / 250;
            const fx = (dx / dist) * force * 0.05;
            const fy = (dy / dist) * force * 0.05;
            card.vx += fx;
            card.vy += fy;
            other.vx -= fx;
            other.vy -= fy;
          }
        }

        // Friction / dampening
        card.vx *= 0.98;
        card.vy *= 0.98;

        // Minimum random drift to keep alive
        card.vx += (Math.random() - 0.5) * 0.02;
        card.vy += (Math.random() - 0.5) * 0.02;

        card.x += card.vx;
        card.y += card.vy;
      }

      // Render update
      cards.forEach(card => {
        const el = document.getElementById(`neo-card-${card.id}`);
        if (el) {
          const scale = 0.8 + card.z * 0.35; // 0.8 to 1.15
          el.style.transform = `translate(${card.x}px, ${card.y}px) scale(${scale}) rotate(${card.rotation}deg)`;
        }
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <div 
      ref={containerRef} 
      className="neo-gallery-container relative w-full h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none neo-glass bg-black/20">
        <h1 className="neo-heading text-6xl md:text-8xl lg:text-9xl tracking-tighter text-[#F4F0EA] mb-6 drop-shadow-2xl text-center">
          NEO Gents
        </h1>
        <p className="text-xl md:text-2xl text-[#C7BBA5] max-w-lg text-center font-light drop-shadow-md">
          The operational standard for creative visionaries.
        </p>
      </div>

      {cardsRef.current.map((card) => {
        const blur = (1 - card.z) * 4; // up to 4px blur for far cards
        const opacity = 0.6 + card.z * 0.4;
        const zIndex = Math.floor(card.z * 100);

        return (
          <div
            key={card.id}
            id={`neo-card-${card.id}`}
            className="neo-gallery-card absolute"
            style={{
              zIndex,
              opacity,
              filter: `blur(${blur}px)`,
              // Initial transform to avoid flash of top-left corner
              transform: `translate(${card.x}px, ${card.y}px) scale(${0.8 + card.z * 0.35}) rotate(${card.rotation}deg)`
            }}
          >
            <img src={card.image} alt="Gallery item" />
          </div>
        );
      })}
    </div>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`neo-section ${className}`}>
      {children}
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="neo-landing min-h-screen text-[#F4F0EA]">
      <PhysicsGallery />

      <main className="bg-[#0A0A0A] relative z-20">
        <Section className="text-center py-32">
          <h2 className="neo-heading text-3xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight text-[#EAE6DF]">
            Not a SaaS tool.<br/>
            <span className="text-[#C7BBA5] italic">An operating system for people who make art for a living.</span>
          </h2>
        </Section>

        <Section className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Lead Capture",
                desc: "Hushed, elegant intake forms that feel like a private consultation."
              },
              {
                title: "Client CRM",
                desc: "Every detail remembered. Every interaction cataloged in perfect order."
              },
              {
                title: "Booking",
                desc: "Seamless scheduling without the transactional friction."
              },
              {
                title: "Content Pipeline",
                desc: "Manage your editorial workflow from shoot to final delivery."
              },
              {
                title: "Review Automation",
                desc: "Collect and curate testimonials with quiet sophistication."
              },
              {
                title: "Gallery Delivery",
                desc: "Present your work in a digital foyer worthy of your art."
              }
            ].map((feature, idx) => (
              <div key={idx} className="border-t border-[#1A1A1A] pt-6">
                <h3 className="neo-heading text-2xl mb-4 text-[#EAE6DF]">{feature.title}</h3>
                <p className="text-[#888] leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section className="py-32">
          <div className="max-w-2xl mx-auto neo-glass p-12 md:p-16 rounded-sm">
            <h2 className="neo-heading text-4xl mb-2 text-[#EAE6DF]">Request Access</h2>
            <p className="text-[#888] mb-12 font-light">Join the waitlist for NEO Gents. Invitations are highly limited.</p>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input type="text" placeholder="First Name" className="neo-input" />
                </div>
                <div>
                  <input type="text" placeholder="Last Name" className="neo-input" />
                </div>
              </div>
              
              <div>
                <input type="email" placeholder="Email Address" className="neo-input" />
              </div>
              
              <div>
                <select className="neo-input text-[#666] bg-transparent appearance-none rounded-none" defaultValue="">
                  <option value="" disabled>Select Profession</option>
                  <option value="photographer">Photographer</option>
                  <option value="barber">Barber</option>
                  <option value="aesthetician">Aesthetician</option>
                  <option value="chef">Chef</option>
                  <option value="realtor">Realtor</option>
                  <option value="other">Other Creative</option>
                </select>
              </div>

              <div>
                <textarea 
                  placeholder="Tell us about your work" 
                  className="neo-input resize-none h-24"
                ></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" className="neo-btn w-full">
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </Section>
      </main>

      <footer className="bg-[#050505] py-12 border-t border-[#111]">
        <div className="max-w-1200 mx-auto px-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#555]">
          <div className="neo-heading text-xl text-[#888] mb-4 md:mb-0">NEO Gents</div>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-[#C7BBA5] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#C7BBA5] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#C7BBA5] transition-colors">Journal</a>
          </div>
          <div className="mt-4 md:mt-0 font-light">
            &copy; {new Date().getFullYear()} NEO Gents. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
