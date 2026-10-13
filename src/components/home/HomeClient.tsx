'use client';

import { useScrollReveal } from '@/lib/useScrollReveal';
import type { ReactNode } from 'react';

/**
 * Client wrapper that mounts the IntersectionObserver for
 * all `.reveal` elements across the homepage sections.
 */
export function HomeClient({ children }: { children: ReactNode }) {
  const scrollRef = useScrollReveal(0.1, '0px 0px -80px 0px');

  return (
    <div ref={scrollRef as React.RefObject<HTMLDivElement>}>
      {children}
    </div>
  );
}
