import { useEffect, useRef } from 'react';
import { HERO_IMAGES } from '../../data/landing';

const NUM_CARDS = 26;

type Props = {
  bg?: string;
  radius?: number;
  cardW?: number;
  cardH?: number;
};

export function DeepFieldGallery({ bg = '#0c0c0c', radius = 8, cardW = 170, cardH = 230 }: Props) {
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
      img.src = HERO_IMAGES[i % HERO_IMAGES.length];
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      el.appendChild(img);
      el.style.cssText = `position:absolute;left:50%;top:50%;width:${cardW}px;height:${cardH}px;margin-left:-${cardW / 2}px;margin-top:-${cardH / 2}px;border-radius:${radius}px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.45);will-change:transform,opacity,filter;`;
      container.appendChild(el);
      cards.push({
        el,
        x: (Math.random() - 0.5) * w * 3,
        y: (Math.random() - 0.5) * h * 3,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.0006,
        rot: (Math.random() - 0.5) * 24,
        op: 1,
      });
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
  }, [radius, cardW, cardH]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ background: bg, perspective: '1200px', perspectiveOrigin: '50% 40%' }}
    />
  );
}
