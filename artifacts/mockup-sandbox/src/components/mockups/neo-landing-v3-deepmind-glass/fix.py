with open('LandingPageV3.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('#3b6bff', '#1e3a5f')
content = content.replace('<span className=\"dm-thinking-dot\" /><span className=\"dm-thinking-dot\" /><span className=\"dm-thinking-dot\" />\n              <span className=\"text-[var(--muted)]\">N.O.R.I. is thinking \u2014 47 languages online</span>', '<span className=\"text-[var(--muted)]\">Multilingual Intelligence \u00b7 47 Languages Supported</span>')
content = content.replace('<span className=\"dm-thinking-dot\" /> LIVE \u00b7 1H', 'LIVE \u00b7 1H')
content = content.replace('<div className=\"dm-glass-strip\"><span className=\"dm-thinking-dot\" /><span className=\"dm-thinking-dot\" /><span className=\"dm-thinking-dot\" /><span className=\"text-[var(--muted)]\">Listening \u00b7 47 langs</span></div>', '<div className=\"dm-glass-strip\"><span className=\"text-[var(--muted)]\">Multilingual Support \u00b7 47 Languages</span></div>')
content = content.replace('<span className=\"dm-grad-text dm-display\">We find them at scale</span>', '<span className=\"dm-display text-[#1e3a5f]\">We find them at scale</span>')
content = content.replace('<span className=\"dm-grad-text dm-display\">intelligence</span>', '<span className=\"dm-display text-[#1e3a5f]\">intelligence</span>')
content = content.replace('<span className=\"dm-grad-text dm-display\">One mind.</span>', '<span className=\"dm-display text-[#1e3a5f]\">One mind.</span>')
content = content.replace('<div className=\"dm-orb\" style={{ width: 90, height: 90 }} />', '<div className=\"w-[90px] h-[90px] rounded-full bg-[#1e3a5f]/10 flex items-center justify-center\"><Star className=\"w-8 h-8 text-[#1e3a5f]\" /></div>')
content = content.replace('\ud83d\udd12 2,400+ creators joined. Unsubscribe anytime.', '2,400+ creators joined. Unsubscribe anytime.')
content = content.replace('<span className=\"flex items-center gap-2\"><span className=\"dm-thinking-dot\" /><span className=\"dm-thinking-dot\" /><span className=\"dm-thinking-dot\" /> NORI online</span>', '<span className=\"flex items-center gap-2 text-[var(--muted)]\">System Online</span>')

with open('LandingPageV3.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
