import { useEffect, useState } from 'react';

/** True when viewport width is at most maxPx (default: mobile contact breakpoint). */
export function useMaxWidth(maxPx = 767) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxPx}px)`);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [maxPx]);

  return matches;
}
