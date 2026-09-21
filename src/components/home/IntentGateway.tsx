'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';
import styles from './IntentGateway.module.css';

const INTENTS = [
  {
    label: 'Sell a Property',
    description: 'Get a market appraisal and a personal sales strategy.',
    href: '/sell',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'Find a Home',
    description: 'Browse properties for sale across Melbourne\'s north.',
    href: '/buy',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    label: 'Lease My Property',
    description: 'Professional management and reliable tenant selection.',
    href: '/property-management',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    label: 'Find a Rental',
    description: 'Quality homes for rent in the northern suburbs.',
    href: '/rent',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export function IntentGateway() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section
      className={`${styles.section} section section--surface`}
      aria-label="How can we help you?"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <p className="overline">How can we help?</p>
          <h2 className={styles.title}>I want to&hellip;</h2>
        </div>
        <div className={styles.grid}>
          {INTENTS.map((intent, index) => (
            <Link
              key={intent.href}
              href={intent.href}
              className={`${styles.card} ${isRevealed ? styles.cardRevealed : ''}`}
              style={{ transitionDelay: `${index * 80 + 100}ms` }}
            >
              <div className={styles.cardIcon}>{intent.icon}</div>
              <h3 className={styles.cardLabel}>{intent.label}</h3>
              <p className={styles.cardDescription}>{intent.description}</p>
              <span className={styles.cardArrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
