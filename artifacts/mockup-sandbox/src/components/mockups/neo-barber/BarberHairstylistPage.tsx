import { useState, useEffect } from 'react';
import { Scissors, Sparkles } from 'lucide-react';
import './_group.css';
import { DashboardBarber, type BarberVariant } from './DashboardBarber';

export function BarberHairstylistPage({
  initialVariant = 'barber',
}: {
  initialVariant?: BarberVariant;
} = {}) {
  const [variant, setVariant] = useState<BarberVariant>(initialVariant);

  useEffect(() => {
    const targetPath = variant === 'hairstylist' ? '/hairstylist' : '/barber';
    if (window.location.pathname !== targetPath) {
      window.history.replaceState({}, '', targetPath);
    }
  }, [variant]);

  return (
    <div className="min-h-[100dvh] bg-[#09090b] flex flex-col">
      <div className="neo-splash-toggle-bar w-full px-4 py-4 flex items-center justify-center gap-3 sticky top-0 z-30">
        <button
          type="button"
          aria-pressed={variant === 'barber'}
          onClick={() => setVariant('barber')}
          className={`neo-splash-toggle-btn ${variant === 'barber' ? 'is-active' : 'is-inactive'} flex items-center gap-2 text-sm`}
        >
          <Scissors className="w-4 h-4" />
          Barber
        </button>
        <button
          type="button"
          aria-pressed={variant === 'hairstylist'}
          onClick={() => setVariant('hairstylist')}
          className={`neo-splash-toggle-btn ${variant === 'hairstylist' ? 'is-active' : 'is-inactive'} flex items-center gap-2 text-sm`}
        >
          <Sparkles className="w-4 h-4" />
          Hairstylist
        </button>
      </div>
      <div className="flex-1">
        <DashboardBarber variant={variant} />
      </div>
    </div>
  );
}

export default BarberHairstylistPage;
