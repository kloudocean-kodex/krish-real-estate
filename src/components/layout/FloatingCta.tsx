'use client';

import { useState, useEffect } from 'react';
import styles from './FloatingCta.module.css';

/**
 * Floating Contact Bar — appears after user scrolls past the hero.
 * Drives direct lead capture via phone + WhatsApp.
 * Proven conversion tactic used by Ray White, McGrath, and Harcourts.
 */
export function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phone = '0479092216';
  const displayPhone = '0479 092 216';
  const whatsAppMsg = encodeURIComponent(
    "Hi Chirag, I'd like to discuss a property. Can we connect?"
  );
  const whatsAppUrl = `https://wa.me/61${phone.replace(/^0/, '')}?text=${whatsAppMsg}`;

  return (
    <div
      className={`${styles.wrapper} ${visible ? styles.wrapperVisible : ''}`}
      aria-label="Quick contact options"
    >
      {/* Expandable options */}
      {expanded && (
        <div className={styles.optionStack} role="group" aria-label="Contact methods">
          <a
            href={`tel:${phone}`}
            className={`${styles.option} ${styles.optionPhone}`}
            aria-label={`Call Chirag on ${displayPhone}`}
          >
            <span className={styles.optionIcon} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span className={styles.optionLabel}>Call Now</span>
          </a>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.option} ${styles.optionWhatsApp}`}
            aria-label="Message Chirag on WhatsApp"
          >
            <span className={styles.optionIcon} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2C8.28 2 2 8.28 2 16c0 2.5.67 4.84 1.84 6.86L2 30l7.36-1.82A13.9 13.9 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.4c-2.2 0-4.27-.6-6.04-1.65l-.43-.26-4.37 1.08 1.1-4.26-.28-.44A11.35 11.35 0 0 1 4.62 16C4.62 9.72 9.72 4.62 16 4.62S27.38 9.72 27.38 16 22.28 27.4 16 27.4zm6.24-8.52c-.34-.17-2.02-1-2.33-1.11-.32-.11-.55-.17-.78.17-.23.34-.9 1.11-1.1 1.34-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.7-1.01-.9-1.7-2.01-1.9-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6l-.67-.01c-.23 0-.6.09-.91.43-.32.34-1.2 1.17-1.2 2.86s1.23 3.32 1.4 3.55c.17.23 2.42 3.7 5.86 5.18.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.02-.83 2.31-1.63.28-.8.28-1.49.2-1.63-.09-.14-.31-.23-.65-.4z"/>
              </svg>
            </span>
            <span className={styles.optionLabel}>WhatsApp</span>
          </a>
        </div>
      )}

      {/* Main FAB trigger */}
      <button
        className={`${styles.fab} ${expanded ? styles.fabActive : ''}`}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label={expanded ? 'Close contact options' : 'Open quick contact'}
      >
        <span className={`${styles.fabIcon} ${expanded ? styles.fabIconClose : ''}`} aria-hidden="true">
          {expanded ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          )}
        </span>
        {!expanded && <span className={styles.fabPulse} aria-hidden="true" />}
      </button>
    </div>
  );
}
