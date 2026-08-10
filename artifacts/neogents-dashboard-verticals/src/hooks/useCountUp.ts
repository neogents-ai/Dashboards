import { useEffect, useState } from 'react';

export function useCountUp(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.round(cur));
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return val;
}
