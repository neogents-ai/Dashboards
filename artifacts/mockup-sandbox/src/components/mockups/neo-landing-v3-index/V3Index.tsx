import { ArrowUpRight } from 'lucide-react';

type Mockup = {
  slug: string;
  letter: string;
  title: string;
  tagline: string;
  font: string;
  radius: string;
  vibe: string;
  bg: string;
  fg: string;
  accent: string;
  fontFamily: string;
};

const MOCKUPS: Mockup[] = [
  {
    slug: 'editorial',
    letter: 'A',
    title: 'Editorial Grotesque',
    tagline: 'Linear / Vercel / Ramp',
    font: 'Geist',
    radius: '8 / 12 / 20',
    vibe: 'Modern SaaS. Warm charcoal + bone. Signal orange.',
    bg: '#f6f5f1', fg: '#0f0f10', accent: '#ff5b1f',
    fontFamily: "'Geist', 'Inter', sans-serif",
  },
  {
    slug: 'serif-mono',
    letter: 'B',
    title: 'Editorial Magazine',
    tagline: 'Stripe Press / Pitch / Field guide',
    font: 'Source Serif 4 + JetBrains Mono',
    radius: '4 (sharp)',
    vibe: 'Newspaper rhythm. Cream + ink. Sage + terracotta.',
    bg: '#f5f1ea', fg: '#15161a', accent: '#b3553a',
    fontFamily: "'Source Serif 4', Georgia, serif",
  },
  {
    slug: 'condensed',
    letter: 'C',
    title: 'Condensed Display',
    tagline: 'Replit / Framer / Arc',
    font: 'Oxanium + Space Grotesk',
    radius: '6 / 16 / 28',
    vibe: 'Bento + marquee. Indigo + electric green.',
    bg: '#f1f0ec', fg: '#0c0a1f', accent: '#b8ff3a',
    fontFamily: "'Oxanium', 'Space Grotesk', sans-serif",
  },
  {
    slug: 'deepmind',
    letter: 'D',
    title: 'DeepMind × Apple Glass',
    tagline: 'Liquid glass · intelligence orb',
    font: 'Plus Jakarta Sans (thin)',
    radius: '24 / pill',
    vibe: 'Pearlescent gradients. Cursor-reactive glass. NORI orb.',
    bg: 'radial-gradient(800px 500px at 10% -10%, #e0e7ff 0%, transparent 60%), radial-gradient(700px 500px at 100% 30%, #fce7f3 0%, transparent 60%), #f8fafc',
    fg: '#0b1020',
    accent: '#8a5cf6',
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
  },
];

function MockupCard({ m }: { m: Mockup }) {
  return (
    <a
      href={`/v3/${m.slug}`}
      className="group block relative overflow-hidden border transition-all"
      style={{
        background: m.bg,
        color: m.fg,
        borderColor: '#00000018',
        borderRadius: 18,
        padding: '2rem',
        minHeight: 360,
        textDecoration: 'none',
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <span
          className="inline-block text-xs px-2 py-0.5 border"
          style={{ borderColor: m.fg + '33', color: m.fg, borderRadius: 4, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.15em' }}
        >
          MOCKUP · {m.letter}
        </span>
        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>

      <h3 style={{ fontFamily: m.fontFamily, fontSize: '2.25rem', lineHeight: 1.05, fontWeight: m.slug === 'deepmind' ? 300 : 600, letterSpacing: '-0.03em', marginBottom: 6 }}>
        {m.title}
      </h3>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 16 }}>
        ref · {m.tagline}
      </p>

      <p style={{ fontSize: '.9rem', lineHeight: 1.55, opacity: 0.75, marginBottom: 18, maxWidth: 380 }}>{m.vibe}</p>

      <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 12, rowGap: 4, fontSize: '.78rem', fontFamily: 'JetBrains Mono, monospace' }}>
        <dt style={{ opacity: 0.45 }}>font</dt><dd>{m.font}</dd>
        <dt style={{ opacity: 0.45 }}>radius</dt><dd>{m.radius}</dd>
        <dt style={{ opacity: 0.45 }}>accent</dt>
        <dd style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: m.accent }} />
          {m.accent}
        </dd>
      </dl>

      {/* visual preview strip */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ background: `linear-gradient(90deg, ${m.accent}, transparent)` }} />
    </a>
  );
}

export function V3Index() {
  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0c', color: '#fff', padding: '4rem 1.5rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <header style={{ marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffffff55', marginBottom: 12 }}>
            / Landing redesign · de-vibe-coded
          </p>
          <h1 style={{ fontFamily: 'Geist, Inter, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: 14 }}>
            Pick a direction.
          </h1>
          <p style={{ color: '#ffffff80', maxWidth: 580, lineHeight: 1.55 }}>
            Four full landing-page mockups. Same content, same Deep Field Gallery header — different visual language. Click into each to feel the difference; come back when you've picked.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 16 }}>
          {MOCKUPS.map(m => <MockupCard key={m.slug} m={m} />)}
        </div>

        <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #ffffff14', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: '.78rem', color: '#ffffff55' }}>
          <span>Pick a winner — or pick a hybrid (e.g. "A's type with D's glass").</span>
          <a href="/" style={{ color: '#ffffffaa', textDecoration: 'underline' }}>← back to current landing (v2)</a>
        </footer>
      </div>
    </div>
  );
}
