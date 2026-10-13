'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './HeroSection.module.css';

export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const wantsPlayback = useRef(false);
  const inView = useRef(true);
  const manuallyControlled = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  const start = useCallback(() => {
    wantsPlayback.current = true;
    setEnabled(true);
    if (video.current?.src) void video.current.play().catch(() => setPlaying(false));
  }, []);

  useEffect(() => {
    if (enabled && wantsPlayback.current) {
      void video.current?.play().catch(() => setPlaying(false));
    }
  }, [enabled]);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    let idle: number | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      if (window.innerWidth < 768 || reducedMotion.matches || connection?.saveData ||
          /(^|-)2g$/.test(connection?.effectiveType || '')) return;
      const autoplay = () => {
        if (!manuallyControlled.current && inView.current && !document.hidden) start();
      };
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(autoplay, { timeout: 3000 });
      else timeout = setTimeout(autoplay, 1500);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      if (!entry.isIntersecting) element.pause();
      else if (wantsPlayback.current && element.currentSrc && !document.hidden) {
        void element.play().catch(() => setPlaying(false));
      }
    });
    observer.observe(element);
    const visibility = () => {
      if (document.hidden) element.pause();
      else if (inView.current && wantsPlayback.current && element.currentSrc) {
        void element.play().catch(() => setPlaying(false));
      }
    };
    const motionChanged = () => {
      if (reducedMotion.matches) { wantsPlayback.current = false; element.pause(); }
    };
    document.addEventListener('visibilitychange', visibility);
    reducedMotion.addEventListener('change', motionChanged);
    return () => {
      observer.disconnect();
      window.removeEventListener('load', schedule);
      document.removeEventListener('visibilitychange', visibility);
      reducedMotion.removeEventListener('change', motionChanged);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timeout) clearTimeout(timeout);
      element.pause();
    };
  }, [start]);

  return <>
    <div className={styles.imageWrapper} aria-hidden="true">
      <picture>
        <source media="(max-width: 640px)" srcSet="/images/brand/together-mobile.avif" type="image/avif" />
        <source media="(max-width: 640px)" srcSet="/images/brand/together-mobile.webp" type="image/webp" />
        <source srcSet="/images/brand/together-exterior.avif" type="image/avif" />
        <Image src="/images/brand/together-exterior.webp" alt="" fill loading="eager"
          fetchPriority="high" sizes="100vw" className={styles.image} />
      </picture>
      <video ref={video} className={`${styles.video} ${playing ? styles.videoPlaying : ''}`}
        src={enabled ? '/images/brand/together-brand-film.mp4' : undefined}
        muted loop playsInline preload="none"
        tabIndex={-1} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => { wantsPlayback.current = false; setPlaying(false); }} />
      <div className={styles.overlay} />
      <div className={styles.vignette} />
    </div>
    <div className={styles.filmToolbar}>
      <span className={styles.mediaNote}>Conceptual brand imagery</span>
      <button type="button" className={styles.filmControl} aria-pressed={playing}
        onClick={() => {
          manuallyControlled.current = true;
          if (playing) { wantsPlayback.current = false; video.current?.pause(); }
          else start();
        }}>
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span>
        {playing ? 'Pause film' : 'Play brand film'}
      </button>
    </div>
  </>;
}
