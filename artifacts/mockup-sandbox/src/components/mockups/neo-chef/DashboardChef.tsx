import React, { useState } from 'react';

/* ───────────────────────────────────────────────────────────
   DashboardChef — LineSight Coming Soon placeholder
   White background, centered layout, email capture
   ─────────────────────────────────────────────────────────── */

export function DashboardChef() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6 py-12 relative">
      <a
        href="#/"
        className="absolute top-4 left-4 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
      >
        ← Back to site
      </a>
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center">
          <img
            src="/images/linesight-logo.png"
            alt="LineSight"
            className="h-16 object-contain"
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = "none";
              const fallback = el.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          {/* Fallback if logo not found */}
          <div
            className="hidden items-center gap-3"
            style={{ display: "none" }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-bold text-xl text-white">L</div>
            <span className="text-3xl font-bold text-gray-900 tracking-tight">LineSight</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500 mb-3">
          Ai Ops Copilot
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Intelligence for the<br />Kitchen Line.
        </h1>
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          Prep timers, inventory alerts, vendor coordination, and menu costing — powered by NORI. Built for popup chefs, food trucks, and private dining operators.
        </p>

        {/* Coming Soon badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full mb-10">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-sm font-semibold text-amber-700">Coming Soon</span>
        </div>

        {/* Email capture */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-sm transition-colors whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3 text-emerald-600 font-semibold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            You're on the list. We'll reach out soon.
          </div>
        )}

        <p className="mt-4 text-xs text-gray-400">
          No spam. Just a heads-up when LineSight launches.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-16 text-xs text-gray-300 flex items-center gap-1">
        <span>Powered by</span>
        <span className="font-semibold" style={{ color: '#00B359', fontFamily: 'monospace' }}>N.O.R.I.</span>
        <span>— a NEO Gents product</span>
      </div>
    </div>
  );
}
