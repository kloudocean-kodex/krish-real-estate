'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Cinematic scroll-reveal hook using IntersectionObserver.
 * Adds the `.revealed` class when elements enter the viewport,
 * creating a staggered fade-up animation sequence.
 * 
 * Usage: const ref = useScrollReveal();
 *        <section ref={ref} className="reveal"> ... </section>
 */
export function useScrollReveal(
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px'
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Collect all `.reveal` children plus the container itself
    const targets: Element[] = [];
    if (el.classList.contains('reveal')) targets.push(el);
    el.querySelectorAll('.reveal').forEach((child) => targets.push(child));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return containerRef;
}

/**
 * Lightweight hook for a single element reveal.
 */
export function useRevealOnce(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
